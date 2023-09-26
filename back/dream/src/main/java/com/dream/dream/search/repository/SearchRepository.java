package com.dream.dream.search.repository;

import com.dream.dream.recommend.entity.DiaryElastic;
import org.springframework.data.elasticsearch.annotations.Query;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

import java.util.List;

public interface SearchRepository extends ElasticsearchRepository<DiaryElastic, String> {

    /**
     * 검색
     */
    @Query("{\"bool\": {\"should\": [{\"match\": {\"title_nori\" : \"?0\"}}, {\"match\": {\"content_nori\" : \"?0\"}}], \"filter\": [{\"term\": {\"open\":true}}]}}")
    List<DiaryElastic> findByDairy(String keyword);
}
