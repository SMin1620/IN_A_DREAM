package com.dream.dream.statistic.repository;

import com.dream.dream.statistic.entity.Relation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface RelationRepository extends JpaRepository<Relation, Long> {
    @Query(value = "SELECT r FROM Relation r ORDER BY r.createdAt DESC limit 1")
    Relation getRelation();

}
