package com.dream.dream.statistic.service;

import com.dream.dream.statistic.dto.StatisticDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.elasticsearch.action.search.SearchRequest;
import org.elasticsearch.action.search.SearchResponse;
import org.elasticsearch.client.RequestOptions;
import org.elasticsearch.client.RestHighLevelClient;
import org.elasticsearch.index.query.QueryBuilders;
import org.elasticsearch.index.query.TermQueryBuilder;
import org.elasticsearch.search.aggregations.AggregationBuilders;
import org.elasticsearch.search.aggregations.bucket.terms.ParsedStringTerms;
import org.elasticsearch.search.aggregations.bucket.terms.Terms;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class StatisticService {

    private final RestHighLevelClient client;


    /**
     * 키워드 통계 비즈니스 로직
     */
    public List<StatisticDto.keywordDto> dailyStatistic(String from, String to) throws IOException {

        from = from.substring(0, 19);
        to = to.substring(0, 19);

        SearchRequest searchRequest = new SearchRequest("mysql_daily_statistic");
        searchRequest.source().size(0);
        searchRequest.source().query(QueryBuilders.rangeQuery("@timestamp").gte(from).lt(to));
        searchRequest.source().aggregation(AggregationBuilders.terms("keywords").field("keyword").size(20));

        SearchResponse searchResponse = client.search(searchRequest, RequestOptions.DEFAULT);

        ParsedStringTerms agg = searchResponse.getAggregations().get("keywords");

        List<StatisticDto.keywordDto> statisticDtos = new ArrayList<>();
        for (Terms.Bucket bucket: agg.getBuckets()) {
            statisticDtos.add(
                    StatisticDto.keywordDto.builder()
                            .count(bucket.getDocCount())
                            .keyword(bucket.getKeyAsString())
                            .build()
            );
        }

        return statisticDtos;
    }

    /**
     * 감정통계 비즈니스 로직
     */
    public List<StatisticDto.emotionDto> emotionStatistic(String from, String to) throws IOException {

        from = from.substring(0, 19);
        to = to.substring(0, 19);

        SearchRequest searchRequest = new SearchRequest("mysql_diary");
        searchRequest.source().size(0);
        searchRequest.source().query(QueryBuilders.rangeQuery("@timestamp").gte(from).lt(to));
        searchRequest.source().aggregation(AggregationBuilders.terms("keywords").field("emotion").size(20));

        SearchResponse searchResponse = client.search(searchRequest, RequestOptions.DEFAULT);

        ParsedStringTerms agg = searchResponse.getAggregations().get("keywords");

        List<StatisticDto.emotionDto> statisticDtos = new ArrayList<>();
        for (Terms.Bucket bucket: agg.getBuckets()) {
            statisticDtos.add(
                    StatisticDto.emotionDto.builder()
                            .count(bucket.getDocCount())
                            .emotion(bucket.getKeyAsString())
                            .build()
            );
        }

        return statisticDtos;
    }
}
