package com.dream.dream.elk.service;

import com.dream.dream.elk.dto.DiaryElastic;
import com.dream.dream.elk.repository.ElasticRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.Transient;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
@Transactional(readOnly = true)
public class ElasticService {

    private final ElasticRepository elasticRepository;


    public List<DiaryElastic> list(String keyword) {
        List<DiaryElastic> diaryElastics = elasticRepository.findAllByTitle(keyword);
        for (DiaryElastic diaryElastic : diaryElastics) {
            System.out.println(diaryElastic.toString());
            System.out.println("id " + diaryElastic.getId() + " " + diaryElastic.getTitle());
        }
        return diaryElastics;
    }
}
