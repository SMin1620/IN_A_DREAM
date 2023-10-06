package com.dream.dream.diary.repository;

import com.dream.dream.diary.entity.Diary;
import com.dream.dream.diary.entity.Like;
import com.dream.dream.member.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface LikeRepository extends JpaRepository<Like, Long> {
    Optional<Like> findLikeByMemberAndDiary(Member member, Diary diary);
    List<Like> findLikesByMemberAndDiaryIn(Member member, List<Diary> diaryList);
}
