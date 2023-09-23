package com.dream.dream.transaction.repository;

import com.dream.dream.member.entity.Member;
import com.dream.dream.transaction.entity.Transaction;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TransactionRepository extends JpaRepository<Transaction, Long> {

    List<Transaction> findAllByBuyer(Member member);
    List<Transaction> findAllBySeller(Member member);


}
