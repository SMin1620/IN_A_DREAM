package com.dream.dream.diary.mapper;

import com.dream.dream.diary.dto.DiaryDto;
import com.dream.dream.diary.entity.Diary;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface DiaryMapper {

    DiaryDto.DiaryResponseDto diaryToResponseDto(Diary diary);
}
