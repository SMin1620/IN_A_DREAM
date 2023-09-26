package com.dream.dream.statistic.service;

import com.dream.dream.statistic.dto.StatisticDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.elasticsearch.action.search.SearchRequest;
import org.elasticsearch.action.search.SearchResponse;
import org.elasticsearch.client.RequestOptions;
import org.elasticsearch.client.RestHighLevelClient;
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


    public List<StatisticDto> dailyStatistic() throws IOException {

        SearchRequest searchRequest = new SearchRequest("mysql_daily_statistic");
        searchRequest.source().size(0);
        searchRequest.source().aggregation(AggregationBuilders.terms("keywords").field("keyword").size(20));

        SearchResponse searchResponse = client.search(searchRequest, RequestOptions.DEFAULT);

        ParsedStringTerms agg = searchResponse.getAggregations().get("keywords");

        List<StatisticDto> statisticDtos = new ArrayList<>();
        for (Terms.Bucket bucket: agg.getBuckets()) {
            statisticDtos.add(
                    StatisticDto.builder()
                            .count(bucket.getDocCount())
                            .keyword(bucket.getKeyAsString())
                            .build()
            );
        }

        return statisticDtos;
    }
}
