package com.dream.dream.diary.repository;

import com.dream.dream.diary.entity.Diary;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface DiaryRepository extends JpaRepository<Diary, Long> {
    /**
     * 일기 전체 조회
     */
    public List<Diary> findAll();
}
