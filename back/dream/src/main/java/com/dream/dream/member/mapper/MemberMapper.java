package com.dream.dream.member.mapper;

import com.dream.dream.member.dto.MemberDto;
import com.dream.dream.member.entity.Member;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface MemberMapper {

    MemberDto.MemberLoginResponseDto memberToResponseDto(Member member);

    MemberDto.Response toResponse(Member member);
}
