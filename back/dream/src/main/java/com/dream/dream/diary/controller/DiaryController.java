package com.dream.dream.diary.controller;

import com.dream.dream.common.BaseResponse;
import com.dream.dream.diary.dto.DiaryDto;
import com.dream.dream.diary.entity.Diary;
import com.dream.dream.diary.mapper.DiaryMapper;
import com.dream.dream.diary.service.DiaryService;
import com.dream.dream.jwt.JwtTokenProvider;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@Tag(name = "Diary")
@RestController
@RequiredArgsConstructor
@Slf4j
@RequestMapping("/api/diary")
public class DiaryController {

    private final JwtTokenProvider jwtTokenProvider;
    private final DiaryService diaryService;
    private final DiaryMapper diaryMapper;


    /**
     * 꿈 일기 생성 컨트롤러
     */
    @Operation(summary = "일기 생성")
    @PostMapping()
    public BaseResponse diaryCreate(
            HttpServletRequest request,
            @RequestBody DiaryDto.DiaryCreateRequestDto requestBody) {

        String token = jwtTokenProvider.resolveToken(request);

        jwtTokenProvider.validateToken(token);

        String memberEmail = jwtTokenProvider.getUserEmail(token);

        Diary diary = diaryService.diaryCreate(requestBody, memberEmail);

        DiaryDto.DiaryResponseDto diaryResponseDto = diaryMapper.diaryToResponseDto(diary);

        return new BaseResponse(HttpStatus.OK, "굿", diaryResponseDto);
    }

    /**
     * 일기 목록 조회
     */
    @Operation(summary = "전체 일기 목록 조회")
    @GetMapping()
    public BaseResponse diaryListCheck(
            HttpServletRequest request,
            @PageableDefault(size = 3, sort = "id", direction = Sort.Direction.DESC) Pageable pageable) {
        String token = jwtTokenProvider.resolveToken(request);
        jwtTokenProvider.validateToken(token);

        String memberEmail = jwtTokenProvider.getUserEmail(token);

        Page<Diary> diaryPage = diaryService.getDiaryList(pageable);
        List<Diary> diaryList = diaryPage.getContent();

//        diaryService.getMyLike(memberEmail, diaryList);

        return new BaseResponse(HttpStatus.OK, "일기 목록 반환 성공", diaryMapper.toResponseDtos(diaryList));
    }

    /**
     * 내 일기 목록 조회
     */
    @Operation(summary = "내 일기 목록 조회")
    @GetMapping("/my")
    public BaseResponse myDiaryList(
            HttpServletRequest request,
            @PageableDefault(size = 3, sort = "id", direction = Sort.Direction.DESC) Pageable pageable) {
        String token = jwtTokenProvider.resolveToken(request);
        jwtTokenProvider.validateToken(token);

        String memberEmail = jwtTokenProvider.getUserEmail(token);
        Page<Diary> diaryPage = diaryService.getDiaryList(memberEmail, pageable);
        List<Diary> diaryList = diaryPage.getContent();

        return new BaseResponse(HttpStatus.OK, "내 일기 목록 반환 성공", diaryMapper.toResponseDtos(diaryList));
    }

    /**
     * 일기 상세 조회
     */
    @Operation(summary = "일기 상세 조회")
    @GetMapping("/{diaryId}")
    public BaseResponse diaryDetail(@PathVariable Long diaryId) {
        Diary diary = diaryService.getDiary(diaryId);
        return new BaseResponse(HttpStatus.OK, "일기 상세 조회 성공", diaryMapper.diaryToDetailResponseDto(diary));
    }

    /**
     * 좋아요
     */
    @Operation(summary = "좋아요, 좋아요 취소")
    @PostMapping("/like")
    public BaseResponse diaryLike(
            HttpServletRequest request,
            @RequestBody DiaryDto.DiaryLikeDto requestBody) {
        String token = jwtTokenProvider.resolveToken(request);
        jwtTokenProvider.validateToken(token);

//        System.out.println(token);

        String memberEmail = jwtTokenProvider.getUserEmail(token);

        Diary diary = diaryService.likeDiary(memberEmail, requestBody);

        return new BaseResponse(HttpStatus.OK, "좋아요 수정", diaryMapper.diaryToResponseDto(diary));
    }

    /**
     * 일기 공개 설정
     */
    @Operation(summary = "일기 공개 설정")
    @PutMapping("/open")
    public BaseResponse openCheck(
            HttpServletRequest request,
            @RequestBody DiaryDto.openDto requestBody) {
        String token = jwtTokenProvider.resolveToken(request);
        jwtTokenProvider.validateToken(token);

        String memberEmail = jwtTokenProvider.getUserEmail(token);

        Diary diary = diaryService.openCheck(memberEmail, requestBody);

        return new BaseResponse(HttpStatus.OK, "공개 변경", diaryMapper.diaryToResponseDto(diary));
    }

    /**
     * 일기 판매 설정
     */
    @Operation(summary = "일기 판매 설정")
    @PutMapping("/sale")
    public BaseResponse saleCheck(
            HttpServletRequest request,
            @RequestBody DiaryDto.saleDto requestBody) {
        String token = jwtTokenProvider.resolveToken(request);
        jwtTokenProvider.validateToken(token);

        String memberEmail = jwtTokenProvider.getUserEmail(token);

        Diary diary = diaryService.saleCheck(memberEmail, requestBody);

        return new BaseResponse(HttpStatus.OK, "거래 변경", diaryMapper.diaryToResponseDto(diary));
    }

}
