package com.dream.dream.member.service;

import com.dream.dream.exception.BusinessLogicException;
import com.dream.dream.exception.ExceptionCode;
import com.dream.dream.jwt.JwtTokenProvider;
import com.dream.dream.member.dto.MemberDto;
import com.dream.dream.member.dto.TokenDto;
import com.dream.dream.member.entity.Member;
import com.dream.dream.member.repository.MemberRepository;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.Optional;

@Service
@Transactional
@RequiredArgsConstructor
public class MemberService {

    private final MemberRepository memberRepository;
    private final RedisTemplate<String, String> redisTemplate;
    private final AuthenticationManager authenticationManager;
    private final JwtTokenProvider jwtTokenProvider;
    private final PasswordEncoder passwordEncoder;


    public TokenDto memberLogin(
            HttpServletResponse response,
            MemberDto.MemberLoginRequestDto requestBody
    ) throws Exception {

//        Optional<Member> member = memberRepository.findByEmailAndPassword(requestBody.getEmail(), requestBody.getPassword());

        Optional<Member> member = memberRepository.findByEmail(requestBody.getEmail());
        System.out.println(member.get());

        if(member.isPresent()){

            System.out.println("로그인 시작 ");
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            requestBody.getEmail(),
                            requestBody.getPassword()
                    )
            );

            String accessToken = jwtTokenProvider.createAccessToken(authentication);
            String refreshToken = jwtTokenProvider.createRefreshToken(authentication);

            TokenDto tokenDto =TokenDto.builder()
                    .accessToken(accessToken)
                    .refreshToken(refreshToken)
                    .memberId(member.get().getId())
                    .build();
            // 헤더에 토큰 담기
            jwtTokenProvider.setHeaderAccessToken(response, accessToken);
            jwtTokenProvider.setHeaderRefreshToken(response, refreshToken);

            return tokenDto;
        }else{
            throw new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND);
        }
    }

    public Member memberRegister(MemberDto.MemberRegisterRequestDto requestBody) {

        long temp = 0;
        Member member = Member.builder()
                .email(requestBody.getEmail())
                .password(passwordEncoder.encode(requestBody.getPassword()))
                .nickname(requestBody.getNickname())
                .gender(requestBody.getGender())
                .positivePoint(temp)
                .negativePoint(temp)
                .neutralPoint(temp)
                .birth(requestBody.getBirth())
                .createAt(LocalDateTime.now())
                .build();

        memberRepository.save(member);
        return member;

    }

    public boolean emailDoubleCheck(String email) {

        Optional<Member> member = memberRepository.findByEmail(email);
        return member.isPresent();
    }

    public boolean nicknameDoubleCheck(String nickname) {
        Optional<Member> member = memberRepository.findByNickname(nickname);
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
