package com.dream.dream.statistic.service;

import com.dream.dream.statistic.dto.RelationDto;
import com.dream.dream.statistic.dto.StatisticDto;
import com.dream.dream.statistic.entity.Relation;
import com.dream.dream.statistic.entity.Statistic;
import com.dream.dream.statistic.repository.RelationRepository;
import com.dream.dream.statistic.repository.StatisticRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.kafka.clients.consumer.ConsumerConfig;
import org.elasticsearch.action.search.SearchRequest;
import org.elasticsearch.action.search.SearchResponse;
import org.elasticsearch.client.RequestOptions;
import org.elasticsearch.client.RestHighLevelClient;
import org.elasticsearch.index.query.BoolQueryBuilder;
import org.elasticsearch.index.query.QueryBuilders;
import org.elasticsearch.index.query.RangeQueryBuilder;
import org.elasticsearch.index.query.TermQueryBuilder;
import org.elasticsearch.search.aggregations.AggregationBuilders;
import org.elasticsearch.search.aggregations.bucket.terms.ParsedStringTerms;
import org.elasticsearch.search.aggregations.bucket.terms.Terms;
import org.elasticsearch.search.builder.SearchSourceBuilder;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.kafka.annotation.KafkaListener;
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
    private final RelationRepository relationRepository;

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

        if (! from.equals("nullT00:00:00") && ! to.equals("nullT00:00:00")) {
            searchRequest.source().query(QueryBuilders.rangeQuery("@timestamp").gte(from).lt(to));
        }
//        searchRequest.source().query(QueryBuilders.rangeQuery("@timestamp").gte(from).lt(to));
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
     * 사용자별 키워드 통계 비즈니스 로직
     */
    public List<StatisticDto.keywordDto> keywordMyStatistic(Long memberId, String from, String to) throws IOException {
        from = from + "T00:00:00";
        to = to + "T00:00:00";

        TermQueryBuilder filter = QueryBuilders.termQuery("memberId", memberId);

        BoolQueryBuilder boolQueryBuilder = null;
        if (from.equals("nullT00:00:00") && to.equals("nullT00:00:00")) {

            boolQueryBuilder = QueryBuilders.boolQuery()
                    .must(filter);
        } else {
            RangeQueryBuilder rangeFilter = QueryBuilders.rangeQuery("@timestamp").gte(from).lt(to);

            boolQueryBuilder = QueryBuilders.boolQuery()
                    .must(filter)
                    .must(rangeFilter);
        }
//        RangeQueryBuilder rangeFilter = QueryBuilders.rangeQuery("@timestamp").gte(from).lt(to);
//
//        BoolQueryBuilder boolQueryBuilder = QueryBuilders.boolQuery()
//                .must(filter)
//                .must(rangeFilter);

        SearchSourceBuilder sourceBuilder = new SearchSourceBuilder();
        sourceBuilder.query(boolQueryBuilder);

        SearchRequest searchRequest = new SearchRequest(statisticDailyName);
        searchRequest.source(sourceBuilder);
        searchRequest.source().size(0);
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

        System.out.println("new from, to : " + from + " " + to);

        SearchRequest searchRequest = new SearchRequest(diaryName);
        searchRequest.source().size(0);

        if (! from.equals("nullT00:00:00") && !to.equals("nullT00:00:00")) {
            searchRequest.source().query(QueryBuilders.rangeQuery("created_at").gte(from).lt(to));
        }

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
     * 나의 감정 기간 통계
     */
    public List<StatisticDto.emotionDto> emotionMyStatistic(Long memberId, String from, String to) throws IOException {
        from = from + "T00:00:00";
        to = to + "T00:00:00";

        TermQueryBuilder filter = QueryBuilders.termQuery("member_id", memberId);

        BoolQueryBuilder boolQueryBuilder = null;
        RangeQueryBuilder rangeFilter = null;
        if (from.equals("nullT00:00:00") && to.equals("nullT00:00:00")) {

            boolQueryBuilder = QueryBuilders.boolQuery()
                    .must(filter);
        } else {
            rangeFilter = QueryBuilders.rangeQuery("created_at").gte(from).lt(to);

            boolQueryBuilder = QueryBuilders.boolQuery()
                    .must(filter)
                    .must(rangeFilter);
        }

//        boolQueryBuilder = QueryBuilders.boolQuery()
//                .must(filter)
//                .must(rangeFilter);

        SearchSourceBuilder sourceBuilder = new SearchSourceBuilder();
        sourceBuilder.query(boolQueryBuilder);

        SearchRequest searchRequest = new SearchRequest(diaryName);
        searchRequest.source(sourceBuilder);
        searchRequest.source().size(0);
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


    @KafkaListener(topics = "${message.topic.sparkDiaryStatisticName}", groupId = ConsumerConfig.GROUP_ID_CONFIG, containerFactory = "diaryRelationListener")
    public void diaryRelation(RelationDto.Statistic statisticDto){

        System.out.println("#####################################################");
        System.out.println(statisticDto);

        Relation relation = Relation.builder()
                .avgPositiveWhenTrue(statisticDto.getAvgPositiveWhenTrue())
                .avgNegativeWhenTrue(statisticDto.getAvgNegativeWhenTrue())
                .avgNeutralWhenTrue(statisticDto.getAvgNeutralWhenTrue())
                .avgPositiveWhenFalse(statisticDto.getAvgPositiveWhenFalse())
                .avgNegativeWhenFalse(statisticDto.getAvgNegativeWhenFalse())
                .avgNeutralWhenFalse(statisticDto.getAvgNeutralWhenFalse())
                .build();

        relationRepository.save(relation);
    }

    public RelationDto.StatisticResponseDto relation() {
        Relation relation = relationRepository.findTop1ByOrderByIdDesc();

        RelationDto.StatisticResponseDto statisticResponseDto = RelationDto.StatisticResponseDto.builder().
                avgPositiveWhenTrue(relation.getAvgPositiveWhenTrue()).
                avgPositiveWhenFalse(relation.getAvgPositiveWhenFalse()).
                avgNeutralWhenFalse(relation.getAvgNeutralWhenFalse()).
                avgNegativeWhenFalse(relation.getAvgNegativeWhenFalse()).
                avgNegativeWhenTrue(relation.getAvgNegativeWhenTrue()).
                avgNeutralWhenTrue(relation.getAvgNeutralWhenTrue()).build();

        return statisticResponseDto;
    }
}
