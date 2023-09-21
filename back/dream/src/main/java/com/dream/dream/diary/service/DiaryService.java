package com.dream.dream.diary.service;

import com.dream.dream.diary.dto.DiaryDto;
import com.dream.dream.diary.entity.Diary;
import com.dream.dream.diary.entity.Emotion;
import com.dream.dream.diary.entity.Like;
import com.dream.dream.diary.repository.DiaryRepository;
import com.dream.dream.diary.repository.LikeRepository;
import com.dream.dream.exception.BusinessLogicException;
import com.dream.dream.exception.ExceptionCode;
import com.dream.dream.member.entity.Member;
import com.dream.dream.member.repository.MemberRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.util.FileCopyUtils;


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
import java.util.List;
import java.util.Random;
import java.util.UUID;

@Service
@Slf4j
@RequiredArgsConstructor
public class DiaryService {

    private final DiaryRepository diaryRepository;
    private final MemberRepository memberRepository;
    private final LikeRepository likeRepository;


    /**
     * 꿈 일기 생성 서비스
     */
    @Transactional
    public Diary diaryCreate(DiaryDto.DiaryCreateRequestDto requestBody, String memberEmail) {
        Member member = memberRepository.findByEmail(memberEmail).orElseThrow(() -> new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND));

        // 이미지 저장 결로
        File uploadDir = new File("src" + File.separator + "main" + File.separator + "resources" + File.separator + "media");
        log.error(uploadDir.getAbsolutePath());
        if (!uploadDir.exists()) {
            boolean e = uploadDir.mkdirs();
            String er = e ? "OK" : "NO";
            log.error(er);
        }
        Path rollback = null;

        try {
            // 이미지 다운로드
            URL url = new URL(requestBody.getImage());
            UUID uuid = UUID.randomUUID();
            String extension = "jpg";
            Path outputPath = Path.of(uploadDir.getAbsolutePath(), uuid + "." + extension);
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
                .image("classpath:/media/" + rollback.getFileName().toString())
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
                .build();

        if (number1 >= number2 && number1 >= number3) {
            diary.setEmotion(Emotion.POSITIVE);
        } else if (number2 >= number1 && number2 >= number3) {
            diary.setEmotion(Emotion.NEUTRAL);
        } else {
            diary.setEmotion(Emotion.NEGATIVE);
        }

        diaryRepository.save(diary);

        member.setPositivePoint(member.getPositivePoint() + number1);
        member.setNeutralPoint(member.getNeutralPoint() + number2);
        member.setNegativePoint(member.getNegativePoint() + number3);

        memberRepository.save(member);

        return diary;
    }

    /**
     * 일기 목록 조회
     */
    public Page<Diary> getDiaryList(Pageable pageable) {
        return diaryRepository.findAll(pageable);
    }

    /**
     * 내 일기 목록 조회
     */
    public Page<Diary> getDiaryList(String memberEmail, Pageable pageable) {
        Page<Diary> diaryPage = diaryRepository.findAllByMemberEmail(memberEmail, pageable);

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

}
