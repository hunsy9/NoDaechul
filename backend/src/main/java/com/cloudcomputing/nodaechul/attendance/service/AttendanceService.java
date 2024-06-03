package com.cloudcomputing.nodaechul.attendance.service;

import com.cloudcomputing.nodaechul.attendance.domain.model.*;
import com.cloudcomputing.nodaechul.attendance.domain.model.entity.Attendance;
import com.cloudcomputing.nodaechul.attendance.domain.model.entity.AttendanceMetaData;
import com.cloudcomputing.nodaechul.attendance.domain.model.entity.AttendanceUserRecord;
import com.cloudcomputing.nodaechul.attendance.domain.model.entity.LectureImageBoundingBox;
import com.cloudcomputing.nodaechul.attendance.domain.model.enums.AttendanceStatus;
import com.cloudcomputing.nodaechul.attendance.domain.repository.AttendanceRepository;
import com.cloudcomputing.nodaechul.lecture.domain.model.dto.StudentAttendanceDto;
import com.cloudcomputing.nodaechul.lecture.service.LectureService;
import com.cloudcomputing.nodaechul.rekognition.service.RekognitionService;
import com.cloudcomputing.nodaechul.s3.domain.enums.BucketNameEnum;
import com.cloudcomputing.nodaechul.s3.service.S3Service;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;
import software.amazon.awssdk.services.rekognition.model.BoundingBox;
import software.amazon.awssdk.services.rekognition.model.FaceMatch;

import java.io.IOException;
import java.util.List;
import java.util.Map;
import java.util.function.Function;
import java.util.stream.Collectors;

@Service
@Slf4j
@RequiredArgsConstructor
public class AttendanceService {

    @Value("${attendance.standard}")
    private String attendanceStandard;

    private final RekognitionService rekognitionService;
    private final S3Service s3Service;
    private final AttendanceRepository attendanceRepository;
    private final LectureService lectureService;

    public Long createAttendance(CreateAttendanceRequestDto attendanceRequestDto){
        // 출석부 생성
        Long createdAttendanceId = attendanceRepository.createAttendance(attendanceRequestDto);
        log.info("Created attendance with id {}", createdAttendanceId);
        return createdAttendanceId;
    }

    @Transactional
    public void createStudentAttendanceRecord(CreateAttendanceRequestDto attendanceRequestDto, MultipartFile mFile, Long createdAttendanceId) throws IOException {
        // 강의 전경 사진 S3 업로드 후, 키 반환
        String s3Key = s3Service.UploadToS3(mFile, BucketNameEnum.LECTURE);
        log.info("Uploaded lecture Image to S3 {}", s3Key);

        // 수업 내 모든 학생들의 정보 가져오기
        List<StudentAttendanceDto> studentsInLecture = lectureService.getStudentInLectureById(attendanceRequestDto.getLectureId());
        log.info("Found {} students in lecture", studentsInLecture.size());

        // Lecture의 CollectionId 가져오기
        String collectionId = lectureService.getLectureCollectionId(attendanceRequestDto.getLectureId());
        log.info("Found lecture collection with id {}", collectionId);

        // Lecture Collection 내부에 얼굴이 몇 개 있는지를 반환 (디버깅 용)
        int response = rekognitionService.listIndexedFacesInCollection(collectionId);
        log.info("Found {} indexed faces in collection {}", response, collectionId);

        // SearchFacesAPI 호출
        List<FaceMatch> faceImageMatches = rekognitionService.SearchFaceMatchingImageCollection(s3Key, collectionId);
        log.info("Found {} matching face images", faceImageMatches.size());

        //감지된 정보들을 리스트로 저장
        List<DetectedInfo> detectedInfo = faceImageMatches.stream()
                .map(faceMatch -> DetectedInfo.builder()
                        .boundingBox(faceMatch.face().boundingBox())
                        .similarity(faceMatch.similarity())
                        .externalImageId(faceMatch.face().externalImageId())
                        .build())
                .toList();
        log.info("Found {} detected info", detectedInfo.size());

        // 전체 학생 중 감지된 학생 추출
        List<DetectedStudent> detectedStudents = getDetectedStudents(studentsInLecture, createdAttendanceId , detectedInfo);

        // 입력한 수업전경 사진에 대한 Bounding Box
        List<BoundingBox> boundingBoxes = faceImageMatches.stream()
                .map(faceMatch -> faceMatch.face().boundingBox())
                .toList();
        log.info("Found {} entire bounding boxes", boundingBoxes.size());

        // 각 학생의 출석 레코드 저장
        storeStudentAttendance(detectedStudents);
        log.info("Student Attendance Record Created");

        // 현 출석부에 대해 detection 끝난 BoundingBox 저장
        storeAttendanceBoundingBox(createdAttendanceId, boundingBoxes);
        log.info("Attendance BoundingBox Created");
    }

    private List<DetectedStudent> getDetectedStudents(List<StudentAttendanceDto> allStudents, Long createdAttendanceId ,List<DetectedInfo> detectedInfo) {
        Map<String, DetectedInfo> detectedInfoMap = detectedInfo.stream()
                .collect(Collectors.toMap(DetectedInfo::getExternalImageId, Function.identity()));

        return allStudents.stream()
                .filter(student -> detectedInfoMap.containsKey(student.getAvatar()))
                .map(student -> {
                    DetectedInfo info = detectedInfoMap.get(student.getAvatar());

                    // 유사도와 출석 기준 비교하여 출석 상태 결정
                    AttendanceStatus status = info.getSimilarity() >= Float.parseFloat(attendanceStandard) ? AttendanceStatus.ATTEND : AttendanceStatus.ABSENT;
                    return DetectedStudent.from(student, createdAttendanceId, info, status);
                })
                .toList();
    }

    private void storeStudentAttendance(List<DetectedStudent> detectedStudents) {
        attendanceRepository.createStudentAttendanceRecord(detectedStudents);
    }

    private void storeAttendanceBoundingBox(Long id, List<BoundingBox> boundingBoxes){
        attendanceRepository.createAttendanceBoundingBoxes(id, boundingBoxes);
    }

}
