package com.dream.dream.diary.repository;

import com.dream.dream.diary.entity.Diary;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface DiaryRepository extends JpaRepository<Diary, Long> {
    /**
     * 일기 전체 조회
     */
    Page<Diary> findAll(Pageable pageable);

    @Query(value = "SELECT d FROM Diary d WHERE d.member.email = :email")
    Page<Diary> findAllByMemberEmail(String email, Pageable pageable);
//    Page<Diary> findAllByMemberEmail(String email, Pageable pageable);
}
