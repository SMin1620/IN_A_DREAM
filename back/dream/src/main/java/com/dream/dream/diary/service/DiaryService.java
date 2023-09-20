package com.dream.dream.diary.service;

import com.dream.dream.diary.dto.DiaryDto;
import com.dream.dream.diary.entity.Diary;
import com.dream.dream.diary.repository.DiaryRepository;
import com.dream.dream.exception.BusinessLogicException;
import com.dream.dream.exception.ExceptionCode;
import com.dream.dream.member.entity.Member;
import com.dream.dream.member.repository.MemberRepository;
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
import java.util.UUID;

@Service
@Slf4j
@RequiredArgsConstructor
public class DiaryService {

    private final DiaryRepository diaryRepository;
    private final MemberRepository memberRepository;


    /**
     * 꿈 일기 생성 서비스
     */
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
            if (rollback != null) {
                try {
                    Files.deleteIfExists(rollback);
                } catch (IOException ex) {
                    throw new RuntimeException(ex);
                }
            }

            throw new BusinessLogicException(ExceptionCode.FAILED_TO_UPDATE_FILE);
        }

        // 일기 내용 RDB에 저장
        Diary diary = Diary.builder()
                .image("classpath:/media/" + rollback.getFileName().toString())
                .title(requestBody.getTitle())
                .content(requestBody.getContent())
                .positive(requestBody.getPositive())
                .neutral(requestBody.getNeutral())
                .negative(requestBody.getNegative())
                .member(member)
                .emotion(requestBody.getEmotion())
                .build();

        diaryRepository.save(diary);

        return diary;
    }

    /**
     * 일기 목록 조회
     */
    public List<Diary> getDiaryList() {
        return diaryRepository.findAll();
    }

    /**
     * 내 일기 목록 조회
     */
    public Page<Diary> getDiaryList(String memberEmail, Pageable pageable){
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
}
