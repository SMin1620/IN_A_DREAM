package com.dream.dream.statistic.repository;

import com.dream.dream.recommend.entity.DiaryElastic;
import com.dream.dream.statistic.entity.Statistic;
import org.springframework.data.elasticsearch.annotations.Query;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

import java.util.List;

public interface StatisticRepository extends ElasticsearchRepository<DiaryElastic, String> {

}
