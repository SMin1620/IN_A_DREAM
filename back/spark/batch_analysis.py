)

# 불리언 변수 'sale'이 False일 때의 평균
avg_when_false = df.filter(F.col('sale') == False).agg(
    F.avg('negative').alias('avgNegativeWhenFalse'),
    F.avg('positive').alias('avgPositiveWhenFalse'),
    F.avg('neutral').alias('avgNeutralWhenFalse')
)

# 결과 출력
print("Average when sale is true:")
for row in avg_when_true.collect():
    print(row)

print("\nAverage when sale is false:")
for row in avg_when_false.collect():
    print(row)


# avg_when_true와 avg_when_false의 결과를 Python dict로 변환
avg_when_true_dict = {name: value for name, value in avg_when_true.collect()[0].asDict().items()}
avg_when_false_dict = {name: value for name, value in avg_when_false.collect()[0].asDict().items()}

# 두 dict을 합침
combined_dict = avg_when_true_dict.copy()  # 원본 dict을 변경하지 않기 위해 복사본을 만듦
combined_dict.update(avg_when_false_dict)  # 다른 dict의 내용을 추가

# 합쳐진 dict을 JSON 문자열로 직렬화하고 "statistics" 토픽에 publish
producer.send('statistics', combined_dict)

# 모든 메시지가 전송될 때까지 대기
producer.flush()
