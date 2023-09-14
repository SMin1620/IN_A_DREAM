package com.dream.dream.kafka.controller;

import com.dream.dream.kafka.dto.DiaryDto;
import com.dream.dream.kafka.dto.LogDto;
import com.dream.dream.kafka.dto.PointHistoryDto;
import com.dream.dream.kafka.service.KafkaProducerService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.kafka.clients.consumer.ConsumerConfig;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.elasticsearch.core.ElasticsearchRestTemplate;
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

    private final KafkaProducerService kafkaProducerService;

    private final Map<Long, DeferredResult<ResponseEntity>> deferredResults = new ConcurrentHashMap<>();


    @PostMapping("/logtest")
    public DeferredResult<ResponseEntity> getLog(@RequestBody(required = false) LogDto diary){

        DeferredResult<ResponseEntity> deferredResult = new DeferredResult<>();

        this.deferredResults.put(diary.getDiaryId(), deferredResult);

        kafkaProducerService.sendLogDto(diary);



        return deferredResult;
    }

    @KafkaListener(topics = "member_log", groupId = ConsumerConfig.GROUP_ID_CONFIG, containerFactory = "logDtoListener")
    public void logListen(LogDto message){

        System.out.println(message);

//        StringTokenizer st = new StringTokenizer(message);
//        int id = Integer.parseInt(st.nextToken());
//        String diary = st.nextToken() + "이것은 받은 메세지";



        if (this.deferredResults.containsKey(message.getDiaryId())) {
            ResponseEntity responseEntity = new ResponseEntity(message, HttpStatus.OK);
            this.deferredResults.get(message.getDiaryId()).setResult(responseEntity);
            this.deferredResults.remove(message.getDiaryId());
        }
    }

    @PostMapping("/diarytest")
    public DeferredResult<ResponseEntity> getDiary(@RequestBody DiaryDto diary){

        DeferredResult<ResponseEntity> deferredResult = new DeferredResult<>();

        this.deferredResults.put(diary.getMemberId(), deferredResult);

        kafkaProducerService.sendMyTopic(diary);



        return deferredResult;
    }

    @KafkaListener(topics = "diary", groupId = ConsumerConfig.GROUP_ID_CONFIG, containerFactory = "diaryListener")
    public void listen(DiaryDto message){

        System.out.println(message);

//        StringTokenizer st = new StringTokenizer(message);
//        int id = Integer.parseInt(st.nextToken());
//        String diary = st.nextToken() + "이것은 받은 메세지";



        if (this.deferredResults.containsKey(message.getMemberId())) {
            ResponseEntity responseEntity = new ResponseEntity(message, HttpStatus.OK);
            this.deferredResults.get(message.getMemberId()).setResult(responseEntity);
            this.deferredResults.remove(message.getMemberId());
        }
    }

    /**
     * 테스트 로그 생성 컨트롤러
     */
    @PostMapping(value = "/message")
    public PointHistoryDto sendMessage(@RequestBody PointHistoryDto pointHistoryDto){

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
