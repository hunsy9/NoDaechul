package com.cloudcomputing.nodaechul.rekognition.service;

import com.cloudcomputing.nodaechul.s3.domain.enums.BucketNameEnum;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import software.amazon.awssdk.services.rekognition.RekognitionClient;
import software.amazon.awssdk.services.rekognition.model.*;

import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class RekognitionService {

    private final RekognitionClient rekognitionClient;

    public static final String defaultCollectionId = "MyCollection";

    public void createCollection(String collectionId){
        log.info("Creating collection: {}", collectionId);

        CreateCollectionRequest request = CreateCollectionRequest.builder()
                .collectionId(collectionId)
                .build();

        CreateCollectionResponse createCollectionResult = rekognitionClient.createCollection(request);

        log.trace("CollectionArn : {}", createCollectionResult.collectionArn());
        log.trace("Status code : {}", createCollectionResult.statusCode().toString());
    }

    public int addFaceToCollection(String avatar, String collectionId){
        Image image = Image.builder()
                .s3Object(S3Object
                        .builder()
                        .bucket(BucketNameEnum.AVATAR.getBucketName())
                        .name(avatar)
                        .build())
                .build();

        IndexFacesRequest indexFacesRequest = IndexFacesRequest.builder()
                .image(image)
                .qualityFilter(QualityFilter.AUTO)
                .collectionId(collectionId)
                .externalImageId(avatar)
                .detectionAttributesWithStrings("DEFAULT")
                .build();

        IndexFacesResponse indexFacesResult = rekognitionClient.indexFaces(indexFacesRequest);

        for (FaceRecord faceRecord : indexFacesResult.faceRecords()) {
            log.info("  Face external S3 key: {}", faceRecord.face().externalImageId());
            log.info("  Location:{}", faceRecord.faceDetail().boundingBox().toString());
        }

        return indexFacesResult.faceRecords().size();
    }

    public int listIndexedFacesInCollection(String collectionId) throws JsonProcessingException {

        ListFacesResponse listFacesResult = null;
        System.out.println("Faces in collection " + collectionId);

        String paginationToken = null;
        do {
            if (listFacesResult != null) {
                paginationToken = listFacesResult.nextToken();
            }

            ListFacesRequest listFacesRequest = ListFacesRequest.builder()
                    .collectionId(collectionId)
                    .maxResults(30)
                    .nextToken(paginationToken)
                    .build();

            listFacesResult = rekognitionClient.listFaces(listFacesRequest);
        } while (listFacesResult.nextToken() != null);

        return listFacesResult.faces().size();
    }

    public List<FaceMatch> SearchFaceMatchingImageCollection(String s3Key, String collectionId) throws JsonProcessingException {
        Image image = Image.builder()
                .s3Object(S3Object
                        .builder()
                        .bucket(BucketNameEnum.LECTURE.getBucketName())
                        .name(s3Key)
                        .build())
                .build();

        // 이미지 내 가장 큰 얼굴부터 collection 검색을 시작
        SearchFacesByImageRequest searchFacesByImageRequest = SearchFacesByImageRequest.builder()
                .collectionId(collectionId)
                .image(image)
                .faceMatchThreshold(50F)
                .qualityFilter(QualityFilter.AUTO)
                .maxFaces(30)
                .build();

        SearchFacesByImageResponse searchFacesByImageResult = rekognitionClient.searchFacesByImage(searchFacesByImageRequest);

        log.info("faceMatches: {}", searchFacesByImageResult.faceMatches().size());
        log.info("faceMatches boolean: {}", searchFacesByImageResult.hasFaceMatches());
        log.info("faceMatches confidence: {}", searchFacesByImageResult.searchedFaceConfidence());

        return searchFacesByImageResult.faceMatches();
    }

    public Boolean checkValidFace(String key){
        Image image = Image.builder()
                .s3Object(S3Object
                        .builder()
                        .bucket(BucketNameEnum.AVATAR.getBucketName())
                        .name(key)
                        .build())
                .build();

        IndexFacesRequest indexFacesRequest = IndexFacesRequest.builder()
                .image(image)
                .qualityFilter(QualityFilter.AUTO)
                .collectionId(defaultCollectionId)
                .externalImageId(key)
                .detectionAttributesWithStrings("DEFAULT")
                .build();

        IndexFacesResponse indexFacesResult = rekognitionClient.indexFaces(indexFacesRequest);
        List<FaceRecord> faceRecords = indexFacesResult.faceRecords();

        return faceRecords.size() == 1;
    }

}
