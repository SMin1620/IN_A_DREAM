package com.dream.dream.recommend.repository;

import com.dream.dream.recommend.entity.DiaryElastic;
import org.springframework.data.elasticsearch.annotations.Query;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

import java.util.List;

public interface ElasticRepository extends ElasticsearchRepository<DiaryElastic, String> {

//    @Query("{\"match\": {\"title_nori\": {\"query\": \"?0\"}}}")
//    List<DiaryElastic> findAllByTitle(String keyword);

//    List<DiaryElastic> findAll();

//    @Query("{\"match\": {\"title_nori\": {\"query\": \"?0\"}}}")
//    @Query("{\"bool\": {\"must\": [{\"term\": {\"member_id\" : \"?0\"}}]}}")
//    List<DiaryElastic> findAllByMemberId(Long memberId);

    /**
     * nori 형태소 분석 결과를 검색해서 가져옴
     */
    @Query("{\"bool\": {\"should\": [{\"match\": {\"content_nori\" : \"?0\"}}, {\"match\": {\"title_nori\" : \"?0\"}}]}}")
    List<DiaryElastic> findByKeyword(String keyword);

    /**
     * 단어가 포함된 결과를 가져옴
     */
    @Query("{\"bool\": {\"should\": [{\"match\": {\"content\" : \"?0\"}}, {\"match\": {\"title\" : \"?0\"}}, {\"match\": {\"title_nori\" : \"?0\"}}, {\"match\": {\"content_nori\" : \"?0\"}}]}}")
    List<DiaryElastic> findByDairy(String keyword);
}
