//package com.dream.dream.auth.handler;
//
//import com.google.gson.Gson;
//
//import jakarta.servlet.ServletException;
//import jakarta.servlet.http.HttpServletRequest;
//import jakarta.servlet.http.HttpServletResponse;
//import lombok.extern.slf4j.Slf4j;
//import org.springframework.http.MediaType;
//import org.springframework.security.authentication.BadCredentialsException;
//import org.springframework.security.core.AuthenticationException;
//import org.springframework.security.web.authentication.AuthenticationFailureHandler;
//
//import java.io.IOException;
//
//@Slf4j
//public class MemberAuthenticationFailureHandler implements AuthenticationFailureHandler {
//
//
//    // Authentication 이 실패했을 때의 핸들러
//    // https://velog.io/@ewan/Spring-security-success-failure-handler
//    // BadCredentialsException : 비밀번호불일치
//    //UsernameNotFoundException : 계정없음
//    //AccountExpiredException : 계정만료
//    //CredentialsExpiredException : 비밀번호만료
//    //DisabledException : 계정비활성화
//    //LockedException : 계정잠김
//
//
//    @Override
//    public void onAuthenticationFailure(HttpServletRequest request, HttpServletResponse response, AuthenticationException exception) throws IOException, ServletException {
//        log.error("# Authentication failed: {}", exception.getMessage());
//
//        sendErrorResponse(response,exception);
//    }
//
//    private void sendErrorResponse(HttpServletResponse response,AuthenticationException exception)throws IOException{
//        Gson gson  = new Gson();
//
//
//        ErrorResponse errorResponse;
//
//        response.setContentType(MediaType.APPLICATION_JSON_VALUE);
//        if(exception instanceof BadCredentialsException){
//            errorResponse = ErrorResponse.of(ExceptionCode.WRONG_PASSWORD);
//            response.setStatus(ExceptionCode.WRONG_PASSWORD.getStatus());
//        }else{
//            errorResponse = ErrorResponse.of(ExceptionCode.MEMBER_NOT_FOUND);
//            response.setStatus(ExceptionCode.MEMBER_NOT_FOUND.getStatus());
//        }
//        response.getWriter().write(gson.toJson(errorResponse,ErrorResponse.class));
//
//
//    }
//}
