#FROM logstash:7.16.3
FROM docker.elastic.co/logstash/logstash-oss:7.10.2

COPY ./config/logstash.yml /usr/share/logstash/config/logstash.yml
COPY ./pipeline/logstash.conf /usr/share/logstash/pipeline/logstash.conf

RUN bin/logstash-plugin install logstash-output-opsgenie
RUN bin/logstash-plugin install logstash-output-opensearch