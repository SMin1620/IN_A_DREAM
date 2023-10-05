        okt = Okt()

        title_nouns = okt.nouns(title)
        content_nouns = okt.nouns(content)
        nouns = title_nouns + content_nouns

        morpho_list = []

        for noun in nouns:
            morpho = {}
            morpho.update({
                "memberId": diary['memberId'],
                "keyword": noun
            })

            producer.send('mysql_daily_statistic', morpho)

            # list에 추가
            morpho_list.append(morpho)

        # list -> DataFrame
        result_morpho_df = spark.createDataFrame(Row(**x) for x in morpho_list)

        # HDFS에 저장
        result_morpho_df.write.parquet("hdfs://master:9000/data/diary/morph_result.parquet", mode="append")

    return None


query = df.writeStream.foreachBatch(sentiment).start()
query.awaitTermination()
