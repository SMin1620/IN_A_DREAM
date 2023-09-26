package com.dream.dream.search.service;

import com.dream.dream.exception.BusinessLogicException;
import com.dream.dream.exception.ExceptionCode;
import com.dream.dream.member.entity.Member;
import com.dream.dream.member.repository.MemberRepository;
import com.dream.dream.recommend.dto.RecommendDto;
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
    public List<RecommendDto.DiaryRecommendResponseDto> searchDiary(Long memberId, String keyword) {

        List<RecommendDto.DiaryRecommendResponseDto> diaries = new ArrayList<>();
        for (DiaryElastic diary : searchRepository.findByDairy(keyword)) {

            Member member = memberRepository.findById(diary.getMemberId())
                    .orElseThrow(() -> new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND));

            diaries.add(RecommendDto.DiaryRecommendResponseDto.builder()
                    .id(diary.getDiaryId())
                    .title(diary.getTitle())
                    .content(diary.getContent())
                    .image(diary.getImage())
                    .emotion(diary.getEmotion())
                    .positive(diary.getPositive())
                    .neutral(diary.getNeutral())
                    .negative(diary.getNegative())
                    .likeCount(diary.getLikeCount())
                    .open(diary.isOpen())
                    .createdAt(diary.getCreatedAt())
                    .member(RecommendDto.DiaryRecommendMemberResponseDto.builder()
                            .id(member.getId())
                            .email(member.getEmail())
                            .nickname(member.getNickname())
                            .gender(member.getGender())
                            .build()).build());
        }

        if (diaries.isEmpty()) throw new BusinessLogicException(ExceptionCode.DIARY_NOT_FOUND);

        return diaries;
    }
}
