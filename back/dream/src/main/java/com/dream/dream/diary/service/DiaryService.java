package com.dream.dream.diary.service;

import com.dream.dream.common.BaseResponse;
import com.dream.dream.diary.dto.DiaryDto;
import com.dream.dream.diary.entity.Diary;
import com.dream.dream.diary.entity.Emotion;
import com.dream.dream.diary.entity.Like;
import com.dream.dream.diary.mapper.DiaryMapper;
import com.dream.dream.diary.repository.DiaryRepository;
import com.dream.dream.diary.repository.LikeRepository;
import com.dream.dream.exception.BusinessLogicException;
import com.dream.dream.exception.ExceptionCode;
import com.dream.dream.kafka.service.KafkaProducerService;
import com.dream.dream.member.entity.Member;
import com.dream.dream.member.repository.MemberRepository;
import com.dream.dream.recommend.dto.RecommendDto;
import com.dream.dream.recommend.mapper.RecommendMapper;
import com.dream.dream.recommend.service.LogService;
import com.dream.dream.statistic.dto.StatisticDto;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.kafka.clients.consumer.ConsumerConfig;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.scheduling.annotation.Async;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.util.FileCopyUtils;
import org.springframework.web.context.request.async.DeferredResult;


import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.net.MalformedURLException;
import java.net.URL;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.StandardOpenOption;
import java.time.LocalDateTime;
import java.util.*;
import java.util.concurrent.ConcurrentHashMap;
import java.util.stream.Collectors;

@Service
@Slf4j
@RequiredArgsConstructor
public class DiaryService {

    private final DiaryRepository diaryRepository;
    private final MemberRepository memberRepository;
    private final LikeRepository likeRepository;
    private final LogService logService;
    private final KafkaProducerService kafkaProducerService;
    private final DiaryMapper diaryMapper;

    private final Map<Long, DeferredResult<BaseResponse>> deferredResults = new ConcurrentHashMap<>();

    @Value("${app.fileupload.uploadDir}")
    String uploadFolder;

    @Value("${app.fileupload.uploadPath}")
    String uploadPath;

    /**
     * 꿈 일기 생성 -> kafka를 통해 spark
     */
    @Transactional
    public DeferredResult<BaseResponse> diaryCreate(DiaryDto.DiaryCreateRequestDto requestBody, String memberEmail) {
        Member member = memberRepository.findByEmail(memberEmail).orElseThrow(() -> new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND));

        // 이미지 저장 결로
        File uploadDir = new File(uploadPath + File.separator + uploadFolder);
        log.error(uploadDir.getAbsolutePath());
        if (!uploadDir.exists()) {
            boolean e = uploadDir.mkdirs();
            String er = e ? "OK" : "NO";
            log.error(er);
        }

        Path rollback = null;
        String fileUrl = null;

        try {
            // 이미지 다운로드
            URL url = new URL(requestBody.getImage());
            UUID uuid = UUID.randomUUID();
            String extension = "jpg";
            String savingFileName = uuid + "." + extension;
            Path outputPath = Path.of(uploadDir.getAbsolutePath(), savingFileName);
            System.out.println(outputPath.toString());
            fileUrl = uploadFolder + "/" + savingFileName;
            System.out.println(fileUrl);
            rollback = outputPath;
            try (InputStream in = url.openStream();
                 OutputStream out = Files.newOutputStream(outputPath, StandardOpenOption.CREATE)) {

                byte[] buffer = new byte[1024];
                int lengthRead;

                while ((lengthRead = in.read(buffer)) > 0) {
                    out.write(buffer, 0, lengthRead);
                    out.flush();
                }
            }

        } catch (IOException e) {
            e.printStackTrace();
            if (rollback != null) {
                try {
                    Files.deleteIfExists(rollback);
                } catch (IOException ex) {
                    throw new RuntimeException(ex);
                }
            }

            throw new BusinessLogicException(ExceptionCode.FAILED_TO_UPDATE_FILE);
        }

        Diary diary = Diary.builder()
                .image(fileUrl)
                .title(requestBody.getTitle())
                .content(requestBody.getContent())
                .open(requestBody.isOpen())
                .sale(requestBody.isSale())
                .build();

        DiaryDto.SparkProduce kafkaProduce = diaryMapper.toSparkProduce(diary);
        kafkaProduce.setMemberId(member.getId());
        DeferredResult<BaseResponse> deferredResult = new DeferredResult<>();
        this.deferredResults.put(member.getId(), deferredResult);
        kafkaProducerService.sendDiary(kafkaProduce);

        // 잔디 로그 생성
        System.out.println("=== 일기 생성 -> 잔디 깎아버렷 ===");
        logService.strictLog(member);

        return deferredResult;
    }

    /**
     * sprak -> kafka 메세지 consume
     */
    @Transactional
    @KafkaListener(topics = "${message.topic.sparkListenerName}", groupId = ConsumerConfig.GROUP_ID_CONFIG, containerFactory = "diaryListener")
    public void listen(DiaryDto.SparkConsume message) {

        long memberId = message.getMemberId();
        Member member = memberRepository.findById(memberId).orElseThrow(() -> new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND));

        // 인증 객체 생성
        Authentication auth = new UsernamePasswordAuthenticationToken(member.getEmail(), null, null);

        // Security Context 설정
        SecurityContextHolder.getContext().setAuthentication(auth);

        Diary diary = diaryMapper.sparkConsumeToDiary(message);

        diary.setPositivePoint(Math.round(message.getPositive()));
        diary.setNegativePoint(Math.round(message.getNegative()));
        diary.setNeutralPoint(Math.round(message.getNeutral()));

        int number1 = diary.getPositivePoint();
        int number2 = diary.getNeutralPoint();
        int number3 = diary.getNegativePoint();

        if (number1 >= number2 && number1 >= number3) {
            diary.setEmotion(Emotion.POSITIVE);
        } else if (number2 >= number1 && number2 >= number3) {
            diary.setEmotion(Emotion.NEUTRAL);
        } else {
            diary.setEmotion(Emotion.NEGATIVE);
        }

        diary.setMember(member);
        diary.setOwner(member);

        diaryRepository.save(diary);

        member.setPositiveCoin(member.getPositiveCoin() + number1);
        member.setNeutralCoin(member.getNeutralCoin() + number2);
        member.setNegativeCoin(member.getNegativeCoin() + number3);

        memberRepository.save(member);

        if (this.deferredResults.containsKey(memberId)) {
            BaseResponse baseResponse = new BaseResponse(HttpStatus.OK, "스파크 처리 완료", diaryMapper.diaryToResponseDto(diary));
            this.deferredResults.get(memberId).setResult(baseResponse);
            System.out.println("##########################-------------------------------");
            System.out.println(deferredResults.get(memberId).getResult());
            System.out.println("##########################-------------------------------");
            this.deferredResults.remove(memberId);
        }
    }

    /**
     * 꿈 일기 생성 서비스 임시사용
     */
    @Transactional
    public Diary diaryCreateTemp(DiaryDto.DiaryCreateRequestDto requestBody, String memberEmail) {
        Member member = memberRepository.findByEmail(memberEmail).orElseThrow(() -> new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND));

        // 이미지 저장 결로
        File uploadDir = new File(uploadPath + File.separator + uploadFolder);
        log.error(uploadDir.getAbsolutePath());
        if (!uploadDir.exists()) {
            boolean e = uploadDir.mkdirs();
            String er = e ? "OK" : "NO";
            log.error(er);
        }

        Path rollback = null;
        String fileUrl = null;

        try {
            // 이미지 다운로드
            URL url = new URL(requestBody.getImage());
            UUID uuid = UUID.randomUUID();
            String extension = "jpg";
            String savingFileName = uuid + "." + extension;
            Path outputPath = Path.of(uploadDir.getAbsolutePath(), savingFileName);
            System.out.println(outputPath.toString());
            fileUrl = uploadFolder + "/" + savingFileName;
            System.out.println(fileUrl);
            rollback = outputPath;
            try (InputStream in = url.openStream();
                 OutputStream out = Files.newOutputStream(outputPath, StandardOpenOption.CREATE)) {

                byte[] buffer = new byte[1024];
                int lengthRead;

                while ((lengthRead = in.read(buffer)) > 0) {
                    out.write(buffer, 0, lengthRead);
                    out.flush();
                }
            }

        } catch (IOException e) {
            e.printStackTrace();
            if (rollback != null) {
                try {
                    Files.deleteIfExists(rollback);
                } catch (IOException ex) {
                    throw new RuntimeException(ex);
                }
            }

            throw new BusinessLogicException(ExceptionCode.FAILED_TO_UPDATE_FILE);
        }

        // 일기 감정 분석 더미 데이터 생성
        Random random = new Random();

        int number1 = random.nextInt(100); // 0부터 99까지의 난수 생성
        int number2 = random.nextInt(100 - number1); // 0부터 (100 - number1)까지의 난수 생성
        int number3 = 100 - number1 - number2; // 난수 3개의 합이 100이 되도록 계산


        // 일기 내용 RDB에 저장
        Diary diary = Diary.builder()
                .image(fileUrl)
                .title(requestBody.getTitle())
                .content(requestBody.getContent())
                .positive(number1)
                .neutral(number2)
                .negative(number3)
                .positivePoint(number1)
                .neutralPoint(number2)
                .negativePoint(number3)
                .open(requestBody.isOpen())
                .sale(requestBody.isSale())
                .member(member)
                .owner(member)
                .createdAt(LocalDateTime.now().plusHours(9))
                .build();

        if (number1 >= number2 && number1 >= number3) {
            diary.setEmotion(Emotion.POSITIVE);
        } else if (number2 >= number1 && number2 >= number3) {
            diary.setEmotion(Emotion.NEUTRAL);
        } else {
            diary.setEmotion(Emotion.NEGATIVE);
        }

        diaryRepository.save(diary);

        member.setPositiveCoin(member.getPositiveCoin() + number1);
        member.setNeutralCoin(member.getNeutralCoin() + number2);
        member.setNegativeCoin(member.getNegativeCoin() + number3);

        memberRepository.save(member);

        return diary;
    }


    /**
     * 일기 목록 조회
     */
    public Page<Diary> getDiaryList(Pageable pageable) {
        return diaryRepository.findDiariesByOpenIsTrue(pageable);
    }

    /**
     * 내 일기 목록 조회
     */
    public Page<Diary> getDiaryList(String memberEmail, Pageable pageable) {
        Page<Diary> diaryPage = diaryRepository.findAllByOwnerEmail(memberEmail, pageable);

        return diaryPage;
    }

    /**
     * 일기 상세 조회
     *
     * @param diaryId
     * @return
     */
    public Diary getDiary(Long diaryId) {
        Diary diary = diaryRepository.findById(diaryId).orElseThrow(() -> new BusinessLogicException(ExceptionCode.DIARY_NOT_FOUND));

        // 로그 생성
        logService.diaryLog(diary);

        return diary;
    }

    /**
     * 일기 좋아요 처리
     */
    @Transactional
    public Diary likeDiary(String email, DiaryDto.DiaryLikeDto requestBody) {
        Member member = memberRepository.findByEmail(email).orElseThrow(() -> new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND));
        Diary diary = diaryRepository.findById(requestBody.getDiaryId()).orElseThrow(() -> new BusinessLogicException(ExceptionCode.DIARY_NOT_FOUND));


        // 이미 like를 눌렀는지 확인
        Like like = likeRepository.findLikeByMemberAndDiary(member, diary).orElse(null);

        if (like == null) {
            like = Like.builder().diary(diary).member(member).build();
            likeRepository.save(like);
            // diary의 like count를 올림
            diary.setLikeCount(diary.getLikeCount() + 1);
            diaryRepository.save(diary);
        } else {
            likeRepository.delete(like);
            // diary의 like count를 내림
            diary.setLikeCount(diary.getLikeCount() - 1);
            diaryRepository.save(diary);
        }

        return diary;
    }

    /**
     * 일기 공개 설정
     */
    public Diary openCheck(String email, DiaryDto.openDto requestBody) {
        Member member = memberRepository.findByEmail(email).orElseThrow(() -> new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND));
        Diary diary = diaryRepository.findById(requestBody.getDiaryId()).orElseThrow(() -> new BusinessLogicException(ExceptionCode.DIARY_NOT_FOUND));

        // 소유자, 작성자 구분 필요하면 수정해야함

        diary.setOpen(requestBody.isOpen());
        diaryRepository.save(diary);

        return diary;
    }

    /**
     * 일기 거래 설정
     */
    public Diary saleCheck(String email, DiaryDto.saleDto requestBody) {
        Member member = memberRepository.findByEmail(email).orElseThrow(() -> new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND));
        Diary diary = diaryRepository.findById(requestBody.getDiaryId()).orElseThrow(() -> new BusinessLogicException(ExceptionCode.DIARY_NOT_FOUND));

        // 소유자, 작성자 구분 필요하면 수정해야함

        diary.setSale(requestBody.isSale());
        diaryRepository.save(diary);

        return diary;
    }

    /**
     * 사용자의 좋아요 여부 반환 (여러개)
     */
    public List<Boolean> getMyLikes(String email, List<Diary> diaryList) {
        Member member = memberRepository.findByEmail(email).orElseThrow(() -> new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND));

        // 내가 좋아요한 일기의 Like 를 가져옴
        List<Like> likes = likeRepository.findLikesByMemberAndDiaryIn(member, diaryList);

        // Set 으로 변환
        Set<Diary> likedDiaries = likes.stream().map(Like::getDiary).collect(Collectors.toSet());

        return diaryList.stream().map(diary -> likedDiaries.contains(diary)).collect(Collectors.toList());
    }

    /**
     * 사용자의 좋아요 여부 반환(1개)
     */
    public boolean getMyLike(String email, Diary diary) {
        Member member = memberRepository.findByEmail(email).orElseThrow(() -> new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND));

        // 내가 좋아요한 일기의 Like 를 가져옴
        Like likes = likeRepository.findLikeByMemberAndDiary(member, diary).orElse(null);

        return likes != null;
    }



}
