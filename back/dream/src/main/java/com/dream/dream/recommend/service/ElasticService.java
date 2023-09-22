package com.dream.dream.recommend.service;

import com.dream.dream.recommend.dto.DiaryElastic;
import com.dream.dream.recommend.repository.ElasticRepository;
import io.lettuce.core.ScriptOutputType;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.elasticsearch.action.search.SearchRequest;
import org.elasticsearch.action.search.SearchResponse;
import org.elasticsearch.client.RequestOptions;
import org.elasticsearch.client.RestHighLevelClient;
import org.elasticsearch.index.query.QueryBuilder;
import org.elasticsearch.index.query.QueryBuilders;
import org.elasticsearch.index.query.TermQueryBuilder;
import org.elasticsearch.search.aggregations.*;
import org.elasticsearch.search.aggregations.bucket.terms.ParsedStringTerms;
import org.elasticsearch.search.aggregations.bucket.terms.Terms;
import org.elasticsearch.search.aggregations.bucket.terms.TermsAggregationBuilder;
import org.elasticsearch.search.aggregations.metrics.Cardinality;
import org.elasticsearch.search.aggregations.pipeline.BucketSortPipelineAggregationBuilder;
import org.elasticsearch.search.builder.SearchSourceBuilder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
@Transactional(readOnly = true)
public class ElasticService {

    private final ElasticRepository elasticRepository;
    private final RestHighLevelClient client;


    /**
     * 사용자 별 일기 추천 -> 로그 데이터 기반
     */
    public List<DiaryElastic> listRecommend(Long memberId) throws IOException {


        TermQueryBuilder filter = QueryBuilders.termQuery("member_id", memberId);
        SearchSourceBuilder sourceBuilder = new SearchSourceBuilder();
        sourceBuilder.query(QueryBuilders.boolQuery().filter(filter));
        sourceBuilder.size(1);

        sourceBuilder.aggregation(AggregationBuilders.terms("content_keywords").field("content").size(3));

        SearchRequest searchRequest = new SearchRequest();
        searchRequest.indices("diary-recommend-log");
        searchRequest.source(sourceBuilder);

        SearchResponse searchResponse = client.search(searchRequest, RequestOptions.DEFAULT);

        ParsedStringTerms agg = searchResponse.getAggregations().get("content_keywords");
        String key = null;
        for (Terms.Bucket bucket : agg.getBuckets()) {
            key = bucket.getKeyAsString(); // get the key
            long docCount = bucket.getDocCount(); // get the doc count
            System.out.println(String.format("Key: %s, Doc Count: %d", key, docCount));
            System.out.println("key : " + key);
        }


//        TermsAggregationBuilder aggregation = AggregationBuilders.terms("content_keyword").field("content_nori").size(2);
//
//        SearchSourceBuilder sourceBuilder = new SearchSourceBuilder();
//        sourceBuilder.aggregation(aggregation);
//
//        SearchRequest searchRequest = new SearchRequest();
//        searchRequest.indices("diary-recommend-log");
//        searchRequest.source(sourceBuilder);
//
//        SearchResponse response = client.search(searchRequest, RequestOptions.DEFAULT);
//
//        System.out.println("response : " + response);
//
//        Terms terms = response.getAggregations().get("content_keyword");
//
//        System.out.println("terms : " + terms);
//
//        String keyword = null;
//        for (Terms.Bucket bucket : terms.getBuckets()) {
//            keyword = (String)bucket.getKey();
//            System.out.println("keyword : " + keyword);
//        }

//        List<DiaryElastic> diaryElastics = elasticRepository.findAllByMemberId(153L);
        List<DiaryElastic> diaryElastics = elasticRepository.findByKeyword(key);
        return diaryElastics;
    }
}
