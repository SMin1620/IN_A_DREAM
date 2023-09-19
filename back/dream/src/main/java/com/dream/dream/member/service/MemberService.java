package com.dream.dream.member.service;

import com.dream.dream.member.dto.MemberDto;
import com.dream.dream.member.entity.Member;
import com.dream.dream.member.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@Transactional
@RequiredArgsConstructor
public class MemberService {

    private final MemberRepository memberRepository;
    public Member memberLogin(MemberDto.MemberLoginRequestDto requestBody) throws Exception {

        Optional<Member> member = memberRepository.findByEmailAndPassword(requestBody.getEmail(), requestBody.getPassword());
        if(member.isPresent()){
            return member.get();
        }else{
            throw new Exception("유저가 존재하지 않습니다"); // 우짜쓰카잉
        }
    }

    public Member memberRegister(MemberDto.MemberRegisterRequestDto requestBody) {

        Member member = Member.builder()
                .email(requestBody.getEmail())
                .password(requestBody.getPassword())
                .gender(requestBody.getGender())
                .birth(requestBody.getBirth())
                .build();

        memberRepository.save(member);
        return member;

    }

    public boolean emailDoubleCheck(String email) {

        Optional<Member> member = memberRepository.findByEmail(email);
        return member.isPresent();
    }

    public boolean nicknameDoubleCheck(String nickname) {
        Optional<Member> member = memberRepository.findByEmail(nickname);
        return member.isPresent();

    }

    public Member memberInfo(Long id) throws Exception {
        Optional<Member> member = memberRepository.findById(id);
        if(member.isPresent()){
            return member.get();
        }else{
            throw new Exception("유저가 존재하지 않습니다");
        }
    }
}
