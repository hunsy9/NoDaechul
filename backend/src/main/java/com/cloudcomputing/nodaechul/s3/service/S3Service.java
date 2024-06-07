package com.cloudcomputing.nodaechul.s3.service;

import com.cloudcomputing.nodaechul.s3.domain.enums.BucketNameEnum;
import com.cloudcomputing.nodaechul.s3.domain.enums.S3keyPrefix;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import software.amazon.awssdk.core.sync.RequestBody;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.model.*;

import java.io.File;
import java.io.IOException;
import java.net.URL;
import java.util.*;

@Service
@RequiredArgsConstructor
public class S3Service {

    private final S3Client s3Client;

    private static final String TEMP_DIR = System.getProperty("java.io.tmpdir");

    public String UploadToS3(MultipartFile mFile, BucketNameEnum bucketNameEnum) throws IOException {

        File file = new File(TEMP_DIR + Objects.requireNonNull(mFile.getOriginalFilename()));
        mFile.transferTo(file);

        String keyPrefix = bucketNameEnum == BucketNameEnum.AVATAR ? S3keyPrefix.AVATAR.getPrefix() : S3keyPrefix.LECTURE.getPrefix();
        String s3Key = keyPrefix + UUID.randomUUID();

        try {
            Map<String, String> metadata = new HashMap<>();
            PutObjectRequest putOb = PutObjectRequest.builder()
                    .bucket(bucketNameEnum.getBucketName())
                    .key(s3Key)
                    .metadata(metadata)
                    .acl(ObjectCannedACL.PUBLIC_READ)
                    .build();

            PutObjectResponse response = s3Client.putObject(putOb, RequestBody.fromFile(file));

            System.out.println("Successfully placed " + s3Key + " into bucket " + bucketNameEnum.getBucketName());

        } catch (S3Exception e) {
            System.err.println(e.getMessage());
            System.exit(1);
        }
        return s3Key;
    }

    public String getS3ObjectPublicUrl(String objectKey, BucketNameEnum bucketNameEnum) {
        return s3Client.utilities().getUrl(GetUrlRequest.builder()
                .bucket(bucketNameEnum.getBucketName())
                .key(objectKey).build()).toString();
    }
}
