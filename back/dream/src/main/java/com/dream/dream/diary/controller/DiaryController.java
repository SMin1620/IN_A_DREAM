package com.dream.dream.diary.controller;

import com.dream.dream.common.BaseResponse;
import com.dream.dream.diary.dto.DiaryDto;
import com.dream.dream.diary.entity.Diary;
import com.dream.dream.diary.mapper.DiaryMapper;
import com.dream.dream.diary.service.DiaryService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Tag(name = "Diary")
@RestController
@RequiredArgsConstructor
@Slf4j
@RequestMapping("/api/diary")
public class DiaryController {

    private final DiaryService diaryService;
    private final DiaryMapper diaryMapper;


    /**
     * 꿈 일기 생성 컨트롤러
     */
    @Operation(summary = "일기 생성")
    @PostMapping()
    public BaseResponse diaryCreate(@RequestBody DiaryDto.DiaryCreateRequestDto requestBody)  {

        System.out.println("일기 생성 컨트롤러");


        Diary diary = diaryService.diaryCreate(requestBody);

        return new BaseResponse(HttpStatus.OK, "굿", diaryMapper.diaryToResponseDto(diary));
    }
}
