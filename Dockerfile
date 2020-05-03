FROM openjdk:8-jdk-alpine

EXPOSE 8080

ARG JAR_FILE=target/*.jar

COPY ${JAR_FILE} aws-user-profile.jar

ENTRYPOINT ["java","-jar","/aws-user-profile.jar"]