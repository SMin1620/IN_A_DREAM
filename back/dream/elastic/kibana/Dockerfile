#FROM kibana:7.16.3
FROM amazon/opendistro-for-elasticsearch-kibana:1.13.2
# open distro
RUN /usr/share/kibana/bin/kibana-plugin remove opendistroSecurityKibana
COPY ./config/kibana.yml /usr/share/elasticsearch/config/kibana.yml