package com.dream.dream.statistic.service;

import com.dream.dream.statistic.dto.StatisticDto;
import com.dream.dream.statistic.entity.Statistic;
import com.dream.dream.statistic.repository.StatisticRepository;
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
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
public class StatisticService {

    private final RestHighLevelClient client;
    private final StatisticRepository statisticRepository;

    @Value(value = "${message.topic.statisticDailyName}")
    private String statisticDailyName;

    @Value(value = "${message.topic.diaryName}")
    private String diaryName;


    /**
     * 키워드 통계 비즈니스 로직
     */
    public List<StatisticDto.keywordDto> dailyStatistic(String from, String to) throws IOException {

        from = from + "T00:00:00";
        to = to + "T00:00:00";

        SearchRequest searchRequest = new SearchRequest(statisticDailyName);
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

        from = from + "T00:00:00";
        to = to + "T00:00:00";

        SearchRequest searchRequest = new SearchRequest(diaryName);
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

    /**
     * 잔디잔디잔디
     */
    public List<StatisticDto.strictResponseDto> strictStatistic(Long memberId) {
        String currentDate = LocalDateTime.now().toString().substring(0, 7);

        System.out.println("currentDate : " + currentDate);
        List<Statistic> statistics = statisticRepository.findByStrict(memberId, currentDate);

        List<StatisticDto.strictResponseDto> strictDtos = new ArrayList<>();
        for (Statistic statistic : statistics) {
            strictDtos.add(StatisticDto.strictResponseDto.builder()
                    .id(statistic.getMemberId())
                    .registDate(statistic.getRegistDate())
                    .build());
        }

        return strictDtos;
    }
}
