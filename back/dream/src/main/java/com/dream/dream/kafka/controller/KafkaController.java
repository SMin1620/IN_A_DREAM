package com.dream.dream.kafka.controller;


import com.dream.dream.common.BaseResponse;
import com.dream.dream.diary.dto.DiaryDto;
import com.dream.dream.diary.entity.Diary;
import com.dream.dream.diary.mapper.DiaryMapper;
import com.dream.dream.diary.service.DiaryService;
import com.dream.dream.jwt.JwtTokenProvider;
import com.dream.dream.kafka.dto.PointHistoryDto;
import com.dream.dream.kafka.service.KafkaProducerService;
import com.dream.dream.kafka.service.TestService;
import com.dream.dream.member.service.MemberService;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.kafka.clients.consumer.ConsumerConfig;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.context.request.async.DeferredResult;

import java.time.LocalDateTime;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

@Slf4j
@CrossOrigin("*")
@RestController
@RequiredArgsConstructor
@RequestMapping("/kafka")
public class KafkaController {

    private final KafkaProducerService kafkaProducerService;
    private final MemberService memberService;
    private final DiaryService diaryService;
    private final JwtTokenProvider jwtTokenProvider;
    private final DiaryMapper diaryMapper;
    private final TestService testService;

    private final Map<Long, DeferredResult<BaseResponse>> deferredResults = new ConcurrentHashMap<>();

    @PostMapping("/diarytest")
    public DeferredResult<BaseResponse> getDiary(
            HttpServletRequest request,
            @RequestBody DiaryDto.DiaryCreateRequestDto requestBody) {

        String token = jwtTokenProvider.resolveToken(request);
        jwtTokenProvider.validateToken(token);
        String memberEmail = jwtTokenProvider.getUserEmail(token);

        return testService.diaryCreate(requestBody, memberEmail);
    }

    @PostMapping("/diarytest2")
    public DeferredResult<BaseResponse> getDiary2(
            HttpServletRequest request,
            @RequestBody DiaryDto.DiaryCreateRequestDto requestBody){

        DeferredResult<BaseResponse> deferredResult = new DeferredResult<>();

        String token = jwtTokenProvider.resolveToken(request);
        jwtTokenProvider.validateToken(token);
        String memberEmail = jwtTokenProvider.getUserEmail(token);

        long memberId = memberService.getMemberId(memberEmail);

        this.deferredResults.put(memberId, deferredResult);

        Diary diary = Diary.builder()
                .image(requestBody.getImage())
                .title(requestBody.getTitle())
                .content(requestBody.getContent())
                .open(requestBody.isOpen())
                .sale(requestBody.isSale())
                .build();

        DiaryDto.SparkProduce sparkProduce = diaryMapper.toSparkProduce(diary);
        sparkProduce.setMemberId(memberId);

        kafkaProducerService.sendDiary(sparkProduce);


        return deferredResult;
    }


    @KafkaListener(topics = "spark_diary_result", groupId = ConsumerConfig.GROUP_ID_CONFIG, containerFactory = "diaryListener")
    public void listen(DiaryDto.SparkConsume message) {

        System.out.println(message);

        Diary diary = diaryMapper.sparkConsumeToDiary(message);

        System.out.println("####################################");
        System.out.println(diary);
        System.out.println("####################################");

        if (this.deferredResults.containsKey(message.getMemberId())) {
            BaseResponse baseResponse = new BaseResponse(HttpStatus.OK, "스파크 처리 완료", diaryMapper.diaryToResponseDto(diary));
            this.deferredResults.get(message.getMemberId()).setResult(baseResponse);
            this.deferredResults.remove(message.getMemberId());
        }
    }

//    @PostMapping("/logtest")
//    public DeferredResult<ResponseEntity> getLog(@RequestBody(required = false) LogDto diary){
//
//        DeferredResult<ResponseEntity> deferredResult = new DeferredResult<>();
//
//        this.deferredResults.put(diary.getDiaryId(), deferredResult);
//
//        kafkaProducerService.sendLogDto(diary);
//
//
//
//        return deferredResult;
//    }
//
//    @KafkaListener(topics = "member_log", groupId = ConsumerConfig.GROUP_ID_CONFIG, containerFactory = "logDtoListener")
//    public void logListen(LogDto message){
//
//        System.out.println(message);
//
////        StringTokenizer st = new StringTokenizer(message);
////        int id = Integer.parseInt(st.nextToken());
////        String diary = st.nextToken() + "이것은 받은 메세지";
//
//
//
//        if (this.deferredResults.containsKey(message.getDiaryId())) {
//            ResponseEntity responseEntity = new ResponseEntity(message, HttpStatus.OK);
//            this.deferredResults.get(message.getDiaryId()).setResult(responseEntity);
//            this.deferredResults.remove(message.getDiaryId());
//        }
//    }
//


    /**
     * 테스트 로그 생성 컨트롤러
     */
    @PostMapping(value = "/message")
    public PointHistoryDto sendMessage(@RequestBody PointHistoryDto pointHistoryDto) {

        // 로그 생성 날짜
        pointHistoryDto.setBuyer(1L);
        pointHistoryDto.setSeller(22L);
        pointHistoryDto.setPoint(1150);

        LocalDateTime currentTime = LocalDateTime.now();
        pointHistoryDto.setTimestamp(currentTime);


        kafkaProducerService.sendPointLogDto(pointHistoryDto);

        return pointHistoryDto;
    }
}
