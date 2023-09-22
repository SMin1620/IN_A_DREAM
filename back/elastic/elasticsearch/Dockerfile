#FROM elasticsearch:7.16.3
FROM amazon/opendistro-for-elasticsearch:1.13.2
RUN bin/elasticsearch-plugin install --batch analysis-nori ## 한글 형태소 분석기

# Elasticsearch configuration file from host to image
COPY ./config/elasticsearch.yml /usr/share/elasticsearch/config/elasticsearch.yml

RUN ./bin/elasticsearch-plugin install --batch repository-azure