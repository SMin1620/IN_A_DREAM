package com.dream.dream.transaction.repository;

import com.dream.dream.diary.entity.Diary;
import com.dream.dream.member.entity.Member;
import com.dream.dream.transaction.entity.Transaction;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface TransactionRepository extends JpaRepository<Transaction, Long> {

    @Query(value = "SELECT t FROM Transaction t WHERE t.buyer.id = :id")
    List<Transaction> findAllByBuyer(Long id);

    @Query(value = "SELECT t FROM Transaction t WHERE t.seller.id = :id")
    List<Transaction> findAllBySeller(Long id);


    @Query(value = "SELECT d FROM Diary d WHERE d.owner.email = :email")
    Page<Diary> findAllByOwnerEmail(String email, Pageable pageable);
//    Page<Diary> findAllByMemberEmail(String email, Pageable pageable);
}
