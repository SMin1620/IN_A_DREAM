FROM openjdk:17-alpine

WORKDIR /

ARG JAR_PATH=./build/libs

COPY ./build/libs/dream-0.0.1-SNAPSHOT.jar /build/libs/dream-0.0.1-SNAPSHOT.jar

CMD ["java","-jar","/build/libs/dream-0.0.1-SNAPSHOT.jar"]
