package com.dream.dream.search.service;

import com.dream.dream.exception.BusinessLogicException;
import com.dream.dream.exception.ExceptionCode;
import com.dream.dream.member.entity.Member;
import com.dream.dream.member.repository.MemberRepository;
import com.dream.dream.recommend.dto.RecommendDto;
import com.dream.dream.recommend.entity.DiaryElastic;
import com.dream.dream.search.repository.SearchRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.elasticsearch.action.search.SearchRequest;
import org.elasticsearch.action.search.SearchResponse;
import org.elasticsearch.client.RequestOptions;
import org.elasticsearch.client.RestHighLevelClient;
import org.elasticsearch.search.builder.SearchSourceBuilder;
import org.elasticsearch.search.suggest.Suggest;
import org.elasticsearch.search.suggest.SuggestBuilder;
import org.elasticsearch.search.suggest.SuggestBuilders;
import org.elasticsearch.search.suggest.term.TermSuggestion;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;
import java.util.stream.Collectors;

import static org.elasticsearch.search.suggest.term.TermSuggestionBuilder.StringDistanceImpl.JARO_WINKLER;

@Service
@RequiredArgsConstructor
@Slf4j
@Transactional(readOnly = true)
public class SearchService {

    private static enum CodeType { chosung, jungsung, jongsung };
    private static String ignoreChars = "`1234567890-=[]\\;',./~!@#$%^&*()_+{}|:\"<>? ";

    private final SearchRepository searchRepository;
    private final MemberRepository memberRepository;
    private final RestHighLevelClient client;


    /**
     * 한글 오타 교정 검증 로직
     */
    public String getBestSuggestion(SearchResponse searchResponse, String originalText) {

        // Get the suggest result from the response.
        Suggest suggest = searchResponse.getSuggest();

        // Get the 'combined-suggestion' result.
        TermSuggestion termSuggestion = suggest.getSuggestion("combined-suggestion");

        // If there are no suggestions, return the original text.
        if (termSuggestion.getEntries().isEmpty()) {
            return originalText;
        }

        // Get the first suggestion entry (since we only made one suggestion request).
        TermSuggestion.Entry firstEntry = termSuggestion.getEntries().get(0);

        // If there are no options for this entry, return the original text.
        if (firstEntry.getOptions().isEmpty()) {
            return originalText;
        }

        // Sort the options by score in descending order and get the highest scoring option.
        TermSuggestion.Entry.Option bestOption = firstEntry.getOptions().stream()
                .max(Comparator.comparingDouble(TermSuggestion.Entry.Option::getScore))
                .orElse(null);


        // Return the text of the best option.
        System.out.println("originalText >>> " + originalText + " " + bestOption.getText());
        return bestOption == null ? originalText : bestOption.getText().string();

    }



    /**
     * 꿈 검색
     */
    public List<RecommendDto.DiaryRecommendResponseDto> searchDiary(Long memberId, String keyword) throws IOException {

        boolean isEnglish = true;
        Pattern p = Pattern.compile("[a-zA-Z0-9]");
        Matcher m = p.matcher(keyword);

        isEnglish = m.find();
        if (isEnglish) keyword = engToKor(keyword);
        else {

            // Create a new SearchSourceBuilder instance.
            SearchSourceBuilder sourceBuilder = new SearchSourceBuilder();

            // Create a new SuggestionBuilder instance.
            SuggestBuilder suggestBuilder = new SuggestBuilder();

            // Add the suggestion to the builder.
            suggestBuilder.addSuggestion("combined-suggestion",
                    SuggestBuilders.termSuggestion("combined_title_content.spell")
                            .text(keyword)
                            .stringDistance(JARO_WINKLER));

            // Add the suggestion builder to the search source builder.
            sourceBuilder.suggest(suggestBuilder);

            // Create a new SearchRequest and set the index.
            SearchRequest searchRequest = new SearchRequest("mysql_diary");
            searchRequest.requestCache(false); // Disable request cache
            searchRequest.source(sourceBuilder);

            System.out.println("searchRequest >>> " + searchRequest);

            ////// 한글 오타교정
            // 한글 오타교정
            SearchResponse searchResponse = client.search(searchRequest, RequestOptions.DEFAULT);
            keyword = getBestSuggestion(searchResponse, keyword);
            System.out.println("한글 오타 교정 >>> " + keyword);  // Print out the best suggestion.

        }

        System.out.println("한/영 교정된 단어 >>> " + keyword);

        List<RecommendDto.DiaryRecommendResponseDto> diaries = new ArrayList<>();
        System.out.println("newKeyword >>>" + keyword);
        for (DiaryElastic diary : searchRepository.findByDairy(keyword)) {

            System.out.println("쿼리 시작");

            System.out.println("search diary >>> " + diary.toString());

            Member member = memberRepository.findById(diary.getMemberId())
                    .orElseThrow(() -> new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND));

            diaries.add(RecommendDto.DiaryRecommendResponseDto.builder()
                    .id(diary.getDiaryId())
                    .title(diary.getTitle())
                    .content(diary.getContent())
                    .image(diary.getImage())
                    .emotion(diary.getEmotion())
                    .positive(diary.getPositive())
                    .neutral(diary.getNeutral())
                    .negative(diary.getNegative())
                    .likeCount(diary.getLikeCount())
                    .open(diary.isOpen())
                    .createdAt(diary.getCreatedAt())
                    .member(RecommendDto.DiaryRecommendMemberResponseDto.builder()
                            .id(member.getId())
                            .email(member.getEmail())
                            .nickname(member.getNickname())
                            .gender(member.getGender())
                            .build()).build());
        }

        if (diaries.isEmpty()) throw new BusinessLogicException(ExceptionCode.DIARY_NOT_FOUND);

        return diaries;
    }

    /**
     * 한 -> 영 변환
     */
    public String engToKor(String eng) {
        StringBuffer sb = new StringBuffer();
        int initialCode = 0, medialCode = 0, finalCode = 0;
        int tempMedialCode, tempFinalCode;

        for (int i = 0; i < eng.length(); i++) { // 숫자특수문자 처리
            if(ignoreChars.indexOf(eng.substring(i, i + 1)) > -1){
                sb.append(eng.substring(i, i + 1));
                continue;
            }
            // 초성코드 추출
            initialCode = getCode(CodeType.chosung, eng.substring(i, i + 1));
            i++;

            // 다음문자로
            // 중성코드 추출
            tempMedialCode = getDoubleMedial(i, eng);
            // 두 자로 이루어진 중성코드 추출
            if (tempMedialCode != -1) {
                medialCode = tempMedialCode; i += 2;
            } else {
                // 없다면,
                medialCode = getSingleMedial(i, eng);
                // 한 자로 이루어진 중성코드 추출
                i++;
            }

            // 종성코드 추출
            tempFinalCode = getDoubleFinal(i, eng);
            // 두 자로 이루어진 종성코드 추출
            if (tempFinalCode != -1) {
                finalCode = tempFinalCode;
                // 그 다음의 중성 문자에 대한 코드를 추출한다.
                tempMedialCode = getSingleMedial(i + 2, eng);
                if (tempMedialCode != -1) {
                    // 코드 값이 있을 경우
                    finalCode = getSingleFinal(i, eng);
                    // 종성 코드 값을 저장한다.
                } else {
                    i++;
                }
            } else {
                // 코드 값이 없을 경우 ,
                tempMedialCode = getSingleMedial(i + 1, eng);
                // 그 다음의 중성 문자에 대한 코드 추출.
                if (tempMedialCode != -1) {
                    // 그 다음에 중성 문자가 존재할 경우,
                    finalCode = 0; // 종성 문자는 없음.
                    i--;
                }
                else {
                    finalCode = getSingleFinal(i, eng);
                    // 종성 문자 추출
                    if (finalCode == -1){
                        finalCode = 0; i--;
                        // 초성,중성 + 숫자,특수문자,
                        //기호가 나오는 경우 index를 줄임.
                    }
                }
            }

            // 추출한 초성 문자 코드,
            //중성 문자 코드, 종성 문자 코드를 합한 후 변환하여 스트링버퍼에 넘김
            sb.append((char) (0xAC00 + initialCode + medialCode + finalCode));
        }
        return sb.toString();
    }

    /** * 해당 문자에 따른 코드를 추출한다. * * @param type * 초성 : chosung, 중성 : jungsung, 종성 : jongsung 구분 * @param char 해당 문자 */
    private static int getCode(CodeType type, String c) {
        // 초성
        String init = "rRseEfaqQtTdwWczxvg";
        // 중성
        String[] mid = { "k", "o", "i", "O", "j", "p", "u", "P", "h", "hk", "ho", "hl", "y", "n", "nj", "np", "nl", "b", "m", "ml", "l" };
        // 종성
        String[] fin = { "r", "R", "rt", "s", "sw", "sg", "e", "f", "fr", "fa", "fq", "ft", "fx", "fv", "fg", "a", "q", "qt", "t", "T", "d", "w", "c", "z", "x", "v", "g" };
        switch (type) {
            case chosung:
                int index = init.indexOf(c);
                if (index != -1) { return index * 21 * 28; }
                break;
            case jungsung:
                for (int i = 0; i < mid.length; i++) {
                    if (mid[i].equals(c)) {
                        return i * 28;
                    }
                }
                break;
            case jongsung:
                for (int i = 0; i < fin.length; i++) {
                    if (fin[i].equals(c)) {
                        return i + 1;
                    }
                }
                break;
            default:
                System.out.println("잘못된 타입 입니다");
        }
        return -1;
    }


    // 한 자로 된 중성값을 리턴한다
    // 인덱스를 벗어낫다면 -1을 리턴
    static private int getSingleMedial(int i, String eng) {
        if ((i + 1) <= eng.length()) {
            return getCode(CodeType.jungsung, eng.substring(i, i + 1));
        } else {
            return -1;
        }
    }
    // 두 자로 된 중성을 체크하고, 있다면 값을 리턴한다.
    // 없으면 리턴값은 -1
    private static int getDoubleMedial(int i, String eng) {
        int result; if ((i + 2) > eng.length()) {
            return -1;
        } else {
            result = getCode(CodeType.jungsung, eng.substring(i, i + 2));
            if (result != -1) { return result; } else { return -1;
            }
        }
    }
    // 한 자로된 종성값을 리턴한다
    // 인덱스를 벗어낫다면 -1을 리턴
    private static int getSingleFinal(int i, String eng) {
        if ((i + 1) <= eng.length()) {
            return getCode(CodeType.jongsung, eng.substring(i, i + 1));
        } else {
            return -1;
        }
    }
    // 두 자로된 종성을 체크하고, 있다면 값을 리턴한다.
    // 없으면 리턴값은 -1
    private static int getDoubleFinal(int i, String eng) {
        if ((i + 2) > eng.length()) {
            return -1;
        } else {
            return getCode(CodeType.jongsung, eng.substring(i, i + 2));
        }
    }
}
