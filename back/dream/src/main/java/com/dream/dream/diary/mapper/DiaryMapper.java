package com.dream.dream.diary.mapper;

import com.dream.dream.diary.dto.DiaryDto;
import com.dream.dream.diary.entity.Diary;
import com.dream.dream.member.mapper.MemberMapper;
import lombok.AllArgsConstructor;
import org.mapstruct.Mapper;

import java.util.List;
import java.util.stream.IntStream;

@Mapper(componentModel = "spring")
public interface DiaryMapper {

    DiaryDto.DiaryResponseDto diaryToResponseDto(Diary diary);
    default DiaryDto.DiaryResponseDto diaryToResponseDto(Diary diary, boolean liked){
        DiaryDto.DiaryResponseDto result = diaryToResponseDto(diary);
        result.setLiked(liked);
        return result;
    }

    List<DiaryDto.DiaryResponseDto> toResponseDtos(List<Diary> diaryList);
    default List<DiaryDto.DiaryResponseDto> toResponseDtos(List<Diary> diaryList, List<Boolean> liked){
        List<DiaryDto.DiaryResponseDto> result = toResponseDtos(diaryList);

        IntStream.range(0, result.size())
                .forEach(i -> result.get(i).setLiked(liked.get(i)));
        return result;
    }

    DiaryDto.SparkProduce toSparkProduce(Diary diary);

    Diary sparkConsumeToDiary(DiaryDto.SparkConsume diary);

    DiaryDto.DiaryListResponseDto toListResponseDto(List<DiaryDto.DiaryResponseDto> diaryList, long totalPage, long currPage);

}
