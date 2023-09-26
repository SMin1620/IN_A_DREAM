package com.dream.dream.recommend.service;

import com.dream.dream.exception.BusinessLogicException;
import com.dream.dream.exception.ExceptionCode;
import com.dream.dream.member.entity.Member;
import com.dream.dream.member.repository.MemberRepository;
import com.dream.dream.recommend.dto.RecommendDto;
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
    private final RecommendMapper recommendMapper;

    @Value(value = "${message.topic.recommendName}")
    private String recommendTopic;

    @Value(value = "${message.topic.diaryName}")
    private String diaryTopic;


    /**
     * 사용자 맞춤 일기 추천
     * :: 사용자 로그 데이터 기반 -> index : log_recommend
     */
    public List<RecommendDto.DiaryRecommendResponseDto> listRecommend(Long memberId) throws IOException {


        TermQueryBuilder filter = QueryBuilders.termQuery("memberId", memberId);
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

            List<RecommendDto.DiaryRecommendResponseDto> diaries = new ArrayList<>();
            for (DiaryElastic diary : elasticRepository.findByDairy(key)) {

                Member member = memberRepository.findById(diary.getMemberId())
                        .orElseThrow(() -> new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND));

                diaries.add(RecommendDto.DiaryRecommendResponseDto.builder()
                        .id(diary.getDiaryId())
                        .title(diary.getTitle())
                        .content(diary.getContent())
                        .image(diary.getImage())
                        .emotion(diary.getEmotion())
                        .positive(diary.getPositive())
                        .neutral(diary.getNeutral())
                        .negative(diary.getNegative())
                        .likeCount(diary.getLikeCount())
                                .open(diary.isOpen())
                        .createdAt(diary.getCreatedAt())
                        .member(RecommendDto.DiaryRecommendMemberResponseDto.builder()
                                .id(member.getId())
                                .email(member.getEmail())
                                .nickname(member.getNickname())
                                .gender(member.getGender())
                                .build()).build());
            }
            return diaries;
        }

        else {
            throw new BusinessLogicException(ExceptionCode.DIARY_NOT_FOUND);
        }
    }


    /**
     * 꿈 일기 관련 추천
     * :: 해당 꿈과 비슷한 꿈 추천 -> index : mysql_diary
     */
    public List<RecommendDto.DiaryRecommendResponseDto> listDiary(Long diaryId) throws IOException {
        TermQueryBuilder filter = QueryBuilders.termQuery("diary_id", diaryId);
        SearchSourceBuilder sourceBuilder = new SearchSourceBuilder();
        sourceBuilder.query(QueryBuilders.boolQuery().filter(filter));
        sourceBuilder.size(100);

        sourceBuilder.aggregation(AggregationBuilders.terms("content_keywords").field("content_nori").size(10));

        SearchRequest searchRequest = new SearchRequest();
        searchRequest.indices(diaryTopic);
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
        searchRequest.indices(diaryTopic);
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

            List<RecommendDto.DiaryRecommendResponseDto> diaries = new ArrayList<>();
            for (DiaryElastic diary : elasticRepository.findByDairy(key)) {

                Member member = memberRepository.findById(diary.getMemberId())
                        .orElseThrow(() -> new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND));

                diaries.add(RecommendDto.DiaryRecommendResponseDto.builder()
                        .id(diary.getDiaryId())
                        .title(diary.getTitle())
                        .content(diary.getContent())
                        .image(diary.getImage())
                        .emotion(diary.getEmotion())
                        .positive(diary.getPositive())
                        .neutral(diary.getNeutral())
                        .negative(diary.getNegative())
                        .likeCount(diary.getLikeCount())
                        .open(diary.isOpen())
                        .createdAt(diary.getCreatedAt())
                        .member(RecommendDto.DiaryRecommendMemberResponseDto.builder()
                                .id(member.getId())
                                .email(member.getEmail())
                                .nickname(member.getNickname())
                                .gender(member.getGender())
                                .build()).build());
            }

            return diaries;
        }

        else {
            throw new BusinessLogicException(ExceptionCode.DIARY_NOT_FOUND);
        }
    }
}
