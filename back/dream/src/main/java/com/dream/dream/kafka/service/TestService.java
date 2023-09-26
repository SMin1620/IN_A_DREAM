package com.dream.dream.kafka.service;

import com.dream.dream.common.BaseResponse;
import com.dream.dream.diary.dto.DiaryDto;
import com.dream.dream.diary.entity.Diary;
import com.dream.dream.diary.mapper.DiaryMapper;
import com.dream.dream.diary.repository.DiaryRepository;
import com.dream.dream.exception.BusinessLogicException;
import com.dream.dream.exception.ExceptionCode;
import com.dream.dream.member.entity.Member;
import com.dream.dream.member.repository.MemberRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.kafka.clients.consumer.ConsumerConfig;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;
import org.springframework.web.context.request.async.DeferredResult;

import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.net.URL;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.StandardOpenOption;
import java.util.Map;
import java.util.UUID;
import java.util.concurrent.ConcurrentHashMap;


@Service
@RequiredArgsConstructor
@Slf4j
public class TestService {
    private final MemberRepository memberRepository;
    private final DiaryRepository diaryRepository;
    private final DiaryMapper diaryMapper;
    private final KafkaTemplate<String, Object> kafkaTemplate;
    private final Map<Long, DeferredResult<Diary>> deferredResults = new ConcurrentHashMap<>();

    @Value("${app.fileupload.uploadDir}")
    String uploadFolder;

    @Value("${app.fileupload.uploadPath}")
    String uploadPath;

    @Value(value = "${message.topic.sparkDiaryName}")
    String sparkDiaryTopic;

    @Transactional
    public Diary diaryCreate(DiaryDto.DiaryCreateRequestDto requestBody, String memberEmail) {
        Member member = memberRepository.findByEmail(memberEmail).orElseThrow(() -> new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND));

        // 이미지 저장 결로
        File uploadDir = new File(uploadPath + File.separator + uploadFolder);
        log.error(uploadDir.getAbsolutePath());
        if (!uploadDir.exists()) {
            boolean e = uploadDir.mkdirs();
            String er = e ? "OK" : "NO";
            log.error(er);
        }

        Path rollback = null;
        String fileUrl = null;

        try {
            // 이미지 다운로드
            URL url = new URL(requestBody.getImage());
            UUID uuid = UUID.randomUUID();
            String extension = "jpg";
            String savingFileName = uuid + "." + extension;
            Path outputPath = Path.of(uploadDir.getAbsolutePath(), savingFileName);
            System.out.println(outputPath.toString());
            fileUrl = uploadFolder + "/" + savingFileName;
            System.out.println(fileUrl);
            rollback = outputPath;
            try (InputStream in = url.openStream();
                 OutputStream out = Files.newOutputStream(outputPath, StandardOpenOption.CREATE)) {

                byte[] buffer = new byte[1024];
                int lengthRead;

                while ((lengthRead = in.read(buffer)) > 0) {
                    out.write(buffer, 0, lengthRead);
                    out.flush();
                }
            }

        } catch (IOException e) {
            e.printStackTrace();
            if (rollback != null) {
                try {
                    Files.deleteIfExists(rollback);
                } catch (IOException ex) {
                    throw new RuntimeException(ex);
                }
            }

            throw new BusinessLogicException(ExceptionCode.FAILED_TO_UPDATE_FILE);
        }

        Diary diary = Diary.builder()
                .image(fileUrl)
                .title(requestBody.getTitle())
                .content(requestBody.getContent())
                .open(requestBody.isOpen())
                .sale(requestBody.isSale())
                .build();

        DiaryDto.SparkProduce kafkaProduce = diaryMapper.toEntityDto(diary);
        kafkaProduce.setMemberId(member.getId());
        DeferredResult<Diary> deferredResult = new DeferredResult<>();
        this.deferredResults.put(member.getId(), deferredResult);

        kafkaTemplate.send(sparkDiaryTopic, kafkaProduce);

        System.out.println("###########################deferredResult");
        System.out.println(deferredResult.getResult());
        System.out.println("#########################################");

        return (Diary) deferredResult.getResult();
    }

    @Transactional
    @KafkaListener(topics = "${message.topic.sparkListenerName}", groupId = ConsumerConfig.GROUP_ID_CONFIG, containerFactory = "diaryListener")
    public void listen(DiaryDto.SparkConsume message) {

        System.out.println(message);

        Diary diary = diaryMapper.sparkConsumeToDiary(message);

        System.out.println("####################################");
        System.out.println(diary);
        System.out.println("####################################");

        if (this.deferredResults.containsKey(message.getMemberId())) {

            this.deferredResults.get(message.getMemberId()).setResult(diary);
            this.deferredResults.remove(message.getMemberId());
        }
    }
}
