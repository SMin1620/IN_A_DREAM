package com.dream.dream.member.controller;

import com.dream.dream.common.BaseResponse;
import com.dream.dream.member.entity.Member;
import com.dream.dream.member.dto.MemberDto;
import com.dream.dream.member.mapper.MemberMapper;
import com.dream.dream.member.service.MemberService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

@RestController
@Slf4j
@RequiredArgsConstructor
@RequestMapping("/api/members")
public class MemberController {

    private final MemberService memberService;
    private final MemberMapper memberMapper;

    /**
     * 로그인 (닉네임만 보내주기)
     *
     */
    @PostMapping("/login")
    public BaseResponse login(@RequestBody MemberDto.MemberLoginRequestDto requestBody) throws Exception {

        Member member = memberService.memberLogin(requestBody);

        return new BaseResponse(HttpStatus.OK, "로그인 성공", memberMapper.memberToResponseDto(member));
    }

    /**
     * 회원 가입
     */
    @PostMapping("/register")
    public BaseResponse register(@RequestBody MemberDto.MemberRegisterRequestDto requestBody){

        Member member =  memberService.memberRegister(requestBody);
        return new BaseResponse(HttpStatus.OK, "회원가입 성공", memberMapper.memberToResponseDto(member));
    }

    /**
     * 이메일 중복 확인
     */
    @GetMapping("/email")
    public BaseResponse emailDoubleCheck(@RequestParam String email){

        boolean isDouble = memberService.emailDoubleCheck(email);

        if(isDouble){
            return new BaseResponse(HttpStatus.OK, "이메일 중복 체크 성공", true);
        }else{
            return new BaseResponse(HttpStatus.OK, "이메일 중복 체크 성공", false);
        }
    }

    /**
     * 닉네임 중복 확인(api 명세서랑 다름)
     */
    @GetMapping("/nickname")
    public BaseResponse nicknameDoubleCheck(@RequestParam String nickname){

        boolean isDouble = memberService.nicknameDoubleCheck(nickname);

        if(isDouble){
            return new BaseResponse(HttpStatus.OK, "닉네임 중복 체크 성공", true);
        }else{
            return new BaseResponse(HttpStatus.OK, "닉네임 중복 체크 성공", false);
        }
    }

    /**
     * 멤버 정보 확인(api 명세서랑 다름)
     */
    @GetMapping
    public BaseResponse getMemberInfo() throws Exception {
        Long id = Long.parseLong(SecurityContextHolder.getContext().getAuthentication().getName());

        Member member = memberService.memberInfo(id);

        return new BaseResponse(HttpStatus.OK, "로그인 성공", memberMapper.memberToResponseDto(member));
    }

    /**
     * 멤버 정보 확인
     */
    @GetMapping("/test")
    public BaseResponse test() {
        return new BaseResponse(HttpStatus.OK, "테스트", "라이따");
    }

}
