package com.dream.dream.member.service;

import com.dream.dream.exception.BusinessLogicException;
import com.dream.dream.exception.ExceptionCode;
import com.dream.dream.jwt.JwtTokenProvider;
import com.dream.dream.member.dto.MemberDto;
import com.dream.dream.member.dto.TokenDto;
import com.dream.dream.member.entity.Member;
import com.dream.dream.member.repository.MemberRepository;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
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


    public TokenDto memberLogin(HttpServletResponse response, MemberDto.MemberLoginRequestDto requestBody) {
        Member member = memberRepository.findByEmail(requestBody.getEmail()).orElseThrow(() -> new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND));

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
                .memberId(member.getId())
                .build();
        // 헤더에 토큰 담기
        jwtTokenProvider.setHeaderAccessToken(response, accessToken);
        jwtTokenProvider.setHeaderRefreshToken(response, refreshToken);

        return tokenDto;
    }

    public Member memberRegister(MemberDto.MemberRegisterRequestDto requestBody) {
        Member member = Member.builder()
                .email(requestBody.getEmail())
                .password(passwordEncoder.encode(requestBody.getPassword()))
                .nickname(requestBody.getNickname())
                .gender(requestBody.getGender())
                .positiveCoin(0)
                .negativeCoin(0)
                .neutralCoin(0)
                .birth(requestBody.getBirth())
                .createAt(LocalDateTime.now())
                .isWrite(1)
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

    public Member memberInfo(String memberEmail) {
        Member member = memberRepository.findByEmail(memberEmail).orElseThrow(() -> new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND));
        return member;
    }


    /**
     * 리프레시 토큰으로 엑세스 토큰 재발급
     */
    /**
     * 리프레시 토큰 발급
     */
    public TokenDto refresh(
            HttpServletRequest request,
            HttpServletResponse response
    ){
        // 1. Request Header 에서 JWT Token 추출
//        String token = jwtTokenProvider.resolveToken(request);
        String token = jwtTokenProvider.resolveRefreshToken(request);

        // 2.엑세스 토큰 유효성 검사
//        if(token == null || !jwtTokenProvider.validateToken(token)){
//            throw new IllegalArgumentException("엑세스 토큰이 잘못 됨");
//        }

        // 3. 엑세스 토큰에서 email 가져옴
        String email = jwtTokenProvider.getUserEmail(token);

        // 4. 레디스의 refresh token 을 가져온다.
        String refresh = redisTemplate.opsForValue().get(email);

        System.out.println("refresh token >>> "+ refresh);

        // 5. 레디스의 리프레시 토큰과 요청 리프레시 토큰을 비교
        String headerRefreshToken = jwtTokenProvider.resolveRefreshToken(request);
        System.out.println("header refresh >>> " + headerRefreshToken);
        if(headerRefreshToken == null || !jwtTokenProvider.validateToken(headerRefreshToken)){
            throw new IllegalArgumentException("리프레시 토큰이 잘못 됨");
        }

        // 6. 엑세스 토큰 재발급 :: 리프레시 토큰은 재발급 하지 않을 것임.
        Optional<Member> member = memberRepository.findByEmail(email);
        Authentication authentication = jwtTokenProvider.getAuthenticationByUsername(member.get().getEmail());

        String newAccessToken = jwtTokenProvider.createAccessToken(authentication);

        // 7. 토큰 헤더에 담기
        jwtTokenProvider.setHeaderAccessToken(response, newAccessToken);
//        jwtTokenProvider.setHeaderRefreshToken(response, headerRefreshToken);

        // 8. 토큰 생성
        TokenDto tokenDto = TokenDto.builder()
                .accessToken(newAccessToken)
                .refreshToken(headerRefreshToken)
                .memberId(member.get().getId())
                .build();
        return tokenDto;
    }

    public long getMemberId(String email) {
        Member member = memberRepository.findByEmail(email).orElseThrow(() -> new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND));
        return member.getId();
    }

    /**
     * reroll
     */
    public Member reroll(String email) {
        Member member = memberRepository.findByEmail(email).orElseThrow(() -> new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND));
        if(member.getPositiveCoin() < 5 || member.getNegativeCoin() < 5 || member.getNeutralCoin() < 5){
            throw new BusinessLogicException(ExceptionCode.COIN_LACK);
        }
        member.setPositiveCoin(member.getPositiveCoin() - 5);
        member.setNegativeCoin(member.getNegativeCoin() - 5);
        member.setNeutralCoin(member.getNeutralCoin() - 5);

        return member;
    }


    @Scheduled(cron = "0 1 * * * *")
    public void resetMemberIsWrite(){
        System.out.println("######################스케줄러 발동#######################");
        List<Member> memberList = memberRepository.findMembersByIsWrite(0);
        memberList.stream().forEach(member -> member.setIsWrite(1));
        memberRepository.saveAll(memberList);
    }
}
