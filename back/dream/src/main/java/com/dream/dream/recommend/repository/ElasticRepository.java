package com.dream.dream.recommend.repository;

import com.dream.dream.recommend.dto.DiaryElastic;
import org.springframework.data.elasticsearch.annotations.Query;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

import java.util.List;

public interface ElasticRepository extends ElasticsearchRepository<DiaryElastic, String> {

//    @Query("{\"match\": {\"title_nori\": {\"query\": \"?0\"}}}")
//    List<DiaryElastic> findAllByTitle(String keyword);

    List<DiaryElastic> findAll();
    List<DiaryElastic> findAllByMemberId(Long memberId);
}
