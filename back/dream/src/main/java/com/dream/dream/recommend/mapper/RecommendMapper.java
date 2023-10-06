package com.dream.dream.recommend.mapper;

import com.dream.dream.diary.entity.Diary;
import com.dream.dream.member.dto.MemberDto;
import com.dream.dream.member.entity.Member;
import com.dream.dream.recommend.dto.RecommendDto;
import com.dream.dream.recommend.entity.DiaryElastic;
import com.dream.dream.transaction.entity.Transaction;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface RecommendMapper {
    List<RecommendDto.DiaryRecommendResponseDto> memberRecommendResponseDto(List<DiaryElastic> diaryElastics);

    RecommendDto.DiaryDetailLog recommendLogDto(Diary diary);

    RecommendDto.TransactionLog recommendTransactionLogDto(Transaction transaction);
}
