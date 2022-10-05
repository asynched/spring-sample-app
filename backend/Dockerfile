FROM openjdk:8-jdk-alpine

RUN addgroup -S spring && adduser -S spring -G spring

USER spring:spring

RUN mvn package -Dmaven.test.skip=true

ENTRYPOINT ["java", "-jar", "/app.jar"]
