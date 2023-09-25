package com.dream.dream.diary.mapper;

import com.dream.dream.diary.dto.DiaryDto;
import com.dream.dream.diary.entity.Diary;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface DiaryMapper {

    DiaryDto.DiaryResponseDto diaryToResponseDto(Diary diary);

    List<DiaryDto.DiaryResponseDto> toResponseDtos(List<Diary> diaryList);

    DiaryDto.DiaryDetailResponseDto diaryToDetailResponseDto(Diary diary);

    DiaryDto.DiaryListResponseDto toListResponseDto(Diary diary);
    List<DiaryDto.DiaryListResponseDto> toListResponseDtos(List<Diary> diaryList);

    DiaryDto.KafkaProduce toKafkaProduce(Diary diary);
}
