package com.dream.dream.recommend.service;

import com.dream.dream.recommend.dto.DiaryElastic;
import com.dream.dream.recommend.repository.ElasticRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.elasticsearch.action.search.SearchRequest;
import org.elasticsearch.action.search.SearchResponse;
import org.elasticsearch.client.RequestOptions;
import org.elasticsearch.client.RestHighLevelClient;
import org.elasticsearch.index.query.QueryBuilders;
import org.elasticsearch.search.aggregations.Aggregation;
import org.elasticsearch.search.aggregations.AggregationBuilder;
import org.elasticsearch.search.aggregations.AggregationBuilders;
import org.elasticsearch.search.aggregations.Aggregations;
import org.elasticsearch.search.aggregations.bucket.terms.TermsAggregationBuilder;
import org.elasticsearch.search.builder.SearchSourceBuilder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.io.IOException;
import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
@Transactional(readOnly = true)
public class ElasticService {

    private final ElasticRepository elasticRepository;
    private  final RestHighLevelClient client;


    /**
     * 사용자 별 일기 추천 -> 로그 데이터 기반
     */
    public List<DiaryElastic> listRecommend(Long memberId) throws IOException {


        TermsAggregationBuilder aggregation = AggregationBuilders.terms("content_keyword").field("content_nori").size(1);
        SearchSourceBuilder builder = new SearchSourceBuilder()
                .query(QueryBuilders.termQuery("member_id", 153))
                .aggregation(aggregation);

        SearchRequest request = new SearchRequest("diary-recommend-log");
        request.source(builder);

        SearchResponse response = client.search(request, RequestOptions.DEFAULT);

        System.out.println(response.getAggregations());

        Aggregations agges = response.getAggregations();
        for (Aggregation agge : agges) {
            System.out.println("agge : " + agges.get("content_keywords"));
        }

        List<DiaryElastic> diaryElastics = elasticRepository.findAllByMemberId(153L);
        return diaryElastics;
    }
}
