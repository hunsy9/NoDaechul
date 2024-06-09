FROM amazoncorretto:17
COPY . .
RUN ["./gradlew", "clean", "build"]
EXPOSE 5555
CMD ["chmod", "+x", "./gradlew"]
ENTRYPOINT ["java", "-jar", "./build/libs/ndc.jar"]
