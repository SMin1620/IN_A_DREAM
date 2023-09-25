package com.dream.dream.recommend.service;

import com.dream.dream.exception.BusinessLogicException;
import com.dream.dream.exception.ExceptionCode;
import com.dream.dream.member.entity.Member;
import com.dream.dream.member.repository.MemberRepository;
import com.dream.dream.recommend.entity.DiaryElastic;
import com.dream.dream.recommend.mapper.RecommendMapper;
import com.dream.dream.recommend.repository.ElasticRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.elasticsearch.action.search.SearchRequest;
import org.elasticsearch.action.search.SearchResponse;
import org.elasticsearch.client.RequestOptions;
import org.elasticsearch.client.RestHighLevelClient;
import org.elasticsearch.index.query.QueryBuilders;
import org.elasticsearch.index.query.TermQueryBuilder;
import org.elasticsearch.search.aggregations.*;
import org.elasticsearch.search.aggregations.bucket.terms.ParsedStringTerms;
import org.elasticsearch.search.aggregations.bucket.terms.Terms;
import org.elasticsearch.search.builder.SearchSourceBuilder;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
@Transactional(readOnly = true)
public class ElasticService {

    private final ElasticRepository elasticRepository;
    private final RestHighLevelClient client;
    private final MemberRepository memberRepository;

    @Value(value = "${message.topic.recommendName}")
    private String recommendTopic;


    /**
     * 사용자 맞춤 일기 추천
     * :: 사용자 로그 데이터 기반 -> index : log_recommend
     */
    public List<DiaryElastic> listRecommend(Long memberId) throws IOException {


        TermQueryBuilder filter = QueryBuilders.termQuery("member_id", memberId);
        SearchSourceBuilder sourceBuilder = new SearchSourceBuilder();
        sourceBuilder.query(QueryBuilders.boolQuery().filter(filter));
        sourceBuilder.size(100);

        sourceBuilder.aggregation(AggregationBuilders.terms("content_keywords").field("content_nori").size(10));

        SearchRequest searchRequest = new SearchRequest();
        searchRequest.indices(recommendTopic);
        searchRequest.source(sourceBuilder);

        SearchResponse searchResponse = client.search(searchRequest, RequestOptions.DEFAULT);

        ParsedStringTerms agg = searchResponse.getAggregations().get("content_keywords");
        HashMap<String, Long> result = new HashMap<>();
        String key = null;
        for (Terms.Bucket bucket : agg.getBuckets()) {
            key = bucket.getKeyAsString();
            long docCount = bucket.getDocCount();
            System.out.println(String.format("Key: %s, Doc Count: %d", key, docCount));
            System.out.println("key : " + key);
            result.put(key, result.getOrDefault(key, docCount) + 1);
        }

        sourceBuilder.aggregation(AggregationBuilders.terms("title_keywords").field("title_nori").size(10));

        searchRequest = new SearchRequest();
        searchRequest.indices(recommendTopic);
        searchRequest.source(sourceBuilder);

        searchResponse = client.search(searchRequest, RequestOptions.DEFAULT);

        agg = searchResponse.getAggregations().get("title_keywords");

        key = null;
        for (Terms.Bucket bucket : agg.getBuckets()) {
            key = bucket.getKeyAsString();
            long docCount = bucket.getDocCount();
            System.out.println(String.format("Key: %s, Doc Count: %d", key, docCount));
            System.out.println("key : " + key);
            result.put(key, result.getOrDefault(key, docCount) + 1);
            System.out.println(result);
        }

        System.out.println(result);

        if (! result.isEmpty()) {
            Long maxValue = Collections.max(result.values());

            for (String getKey : result.keySet()) {
                if (maxValue.equals(result.get(getKey))) {
                    key = getKey;
                    break;
                }
            }

            System.out.println("key : " + key);

            List<DiaryElastic> diaryElastics = new ArrayList<>();
            for (DiaryElastic diary : elasticRepository.findByDairy(key)) {

                Member member = memberRepository.findById(diary.getMemberId())
                        .orElseThrow(() -> new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND));
                System.out.println("diary : " + diary.toString());
                diary.setMember(member);
                diaryElastics.add(diary);
            }
            return diaryElastics;
        }

        else {
            throw new BusinessLogicException(ExceptionCode.DIARY_NOT_FOUND);
        }
    }


    /**
     * 꿈 일기 관련 추천
     * :: 해당 꿈과 비슷한 꿈 추천 -> index : mysql_diary
     */
    public List<DiaryElastic> listDiary(Long diaryId) throws IOException {
        TermQueryBuilder filter = QueryBuilders.termQuery("diary_id", diaryId);
        SearchSourceBuilder sourceBuilder = new SearchSourceBuilder();
        sourceBuilder.query(QueryBuilders.boolQuery().filter(filter));
        sourceBuilder.size(100);

        sourceBuilder.aggregation(AggregationBuilders.terms("content_keywords").field("content_nori").size(10));

        SearchRequest searchRequest = new SearchRequest();
        searchRequest.indices(recommendTopic);
        searchRequest.source(sourceBuilder);

        SearchResponse searchResponse = client.search(searchRequest, RequestOptions.DEFAULT);

        ParsedStringTerms agg = searchResponse.getAggregations().get("content_keywords");
        HashMap<String, Long> result = new HashMap<>();
        String key = null;
        for (Terms.Bucket bucket : agg.getBuckets()) {
            key = bucket.getKeyAsString();
            long docCount = bucket.getDocCount();
            System.out.println(String.format("Key: %s, Doc Count: %d", key, docCount));
            System.out.println("key : " + key);
            result.put(key, result.getOrDefault(key, docCount) + 1);
        }

        sourceBuilder.aggregation(AggregationBuilders.terms("title_keywords").field("title_nori").size(10));

        searchRequest = new SearchRequest();
        searchRequest.indices(recommendTopic);
        searchRequest.source(sourceBuilder);

        searchResponse = client.search(searchRequest, RequestOptions.DEFAULT);

        agg = searchResponse.getAggregations().get("title_keywords");

        key = null;
        for (Terms.Bucket bucket : agg.getBuckets()) {
            key = bucket.getKeyAsString();
            long docCount = bucket.getDocCount();
            System.out.println(String.format("Key: %s, Doc Count: %d", key, docCount));
            System.out.println("key : " + key);
            result.put(key, result.getOrDefault(key, docCount) + 1);
            System.out.println(result);
        }

        System.out.println(result);

        if (! result.isEmpty()) {
            Long maxValue = Collections.max(result.values());

            for (String getKey : result.keySet()) {
                if (maxValue.equals(result.get(getKey))) {
                    key = getKey;
                    break;
                }
            }

            System.out.println("key : " + key);

            List<DiaryElastic> diaryElastics = null;
            for (DiaryElastic diary : elasticRepository.findByDairy(key)) {

                Member member = memberRepository.findById(diary.getMemberId())
                        .orElseThrow(() -> new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND));
                diary.setMember(member);
                diaryElastics.add(diary);
            }

            return diaryElastics;
        }

        else {
            throw new BusinessLogicException(ExceptionCode.DIARY_NOT_FOUND);
        }
    }
}
