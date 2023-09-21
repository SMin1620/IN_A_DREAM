package com.dream.dream.diary.repository;

import com.dream.dream.diary.entity.Diary;
import com.dream.dream.diary.entity.Like;
import com.dream.dream.member.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface LikeRepository extends JpaRepository<Like, Long> {
    Optional<Like> findLikeByMemberAndDiary(Member member, Diary diary);
}
