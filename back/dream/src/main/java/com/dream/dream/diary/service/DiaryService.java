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
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

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



        // 일기 내용 RDB에 저장
        Diary diary = Diary.builder()
                .image(requestBody.getImage())
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
