package com.dream.dream.kafka.controller;


import com.dream.dream.common.BaseResponse;
import com.dream.dream.diary.dto.DiaryDto;
import com.dream.dream.diary.entity.Diary;
import com.dream.dream.diary.mapper.DiaryMapper;
import com.dream.dream.diary.service.DiaryService;
import com.dream.dream.jwt.JwtTokenProvider;
import com.dream.dream.kafka.dto.LogDto;
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
import java.time.format.DateTimeFormatter;
import java.time.temporal.ChronoUnit;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

@Slf4j
@CrossOrigin("*")
@RestController
@RequiredArgsConstructor
@RequestMapping("/kafka")
public class KafkaController {
    //
    private final KafkaProducerService kafkaProducerService;
    private final MemberService memberService;
    private final DiaryService diaryService;
    private final JwtTokenProvider jwtTokenProvider;
    private final DiaryMapper diaryMapper;
    private final TestService testService;

    @PostMapping("/diarytest")
    public BaseResponse getDiary(
            HttpServletRequest request,
            @RequestBody DiaryDto.DiaryCreateRequestDto requestBody) {

        String token = jwtTokenProvider.resolveToken(request);
        jwtTokenProvider.validateToken(token);
        String memberEmail = jwtTokenProvider.getUserEmail(token);

        Diary diary = testService.diaryCreate(requestBody, memberEmail);

        System.out.println(diary);

        return new BaseResponse(HttpStatus.OK, "스파크 스트리밍 처리 완료", diaryMapper.diaryToResponseDto(diary));
    }

//    @KafkaListener(topics = "diary_result", groupId = ConsumerConfig.GROUP_ID_CONFIG, containerFactory = "diaryListener")
//    public void listen(DiaryDto message) {
//
//        System.out.println(message);

//        StringTokenizer st = new StringTokenizer(message);
//        int id = Integer.parseInt(st.nextToken());
//        String diary = st.nextToken() + "이것은 받은 메세지";


//        if (this.deferredResults.containsKey(message.getMemberId())) {
//            ResponseEntity responseEntity = new ResponseEntity(message, HttpStatus.OK);
//            this.deferredResults.get(message.getMemberId()).setResult(responseEntity);
//            this.deferredResults.remove(message.getMemberId());
//        }
//    }

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
