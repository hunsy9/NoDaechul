FROM amazoncorretto:17
COPY . .
RUN ["./gradlew", "clean", "build"]
EXPOSE 5555
ENTRYPOINT ["java", "-jar", "./build/libs/ndc.jar"]
