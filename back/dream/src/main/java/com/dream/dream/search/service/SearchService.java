package com.dream.dream.search.service;

import com.dream.dream.exception.BusinessLogicException;
import com.dream.dream.exception.ExceptionCode;
import com.dream.dream.member.entity.Member;
import com.dream.dream.member.repository.MemberRepository;
import com.dream.dream.recommend.entity.DiaryElastic;
import com.dream.dream.search.repository.SearchRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
@Transactional(readOnly = true)
public class SearchService {

    private final SearchRepository searchRepository;
    private final MemberRepository memberRepository;


    /**
     * 꿈 검색
     */
    public List<DiaryElastic> searchDiary(Long memberId, String keyword) {

        List<DiaryElastic> diaryElastics = new ArrayList<>();

        for (DiaryElastic diary : searchRepository.findByDairy(keyword)) {
            Member member = memberRepository.findById(diary.getMemberId())
                    .orElseThrow(() -> new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND));
            System.out.println("diary : " + diary.toString());
            diary.setMember(member);
            diaryElastics.add(diary);
        }

        if (diaryElastics.isEmpty()) throw new BusinessLogicException(ExceptionCode.DIARY_NOT_FOUND);

        return diaryElastics;
    }
}
