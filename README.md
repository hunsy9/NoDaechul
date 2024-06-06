<h1 style="display: flex; align-items: center;">DaechulNoh<img height="28" style=" margin-left: 1rem; padding: 0;" src=".\backend\asset\daechulNohLogo.png"></h1>

- Developed an in-class facial recognition attendance system to prevent proxy attendance.
- Ensuring the integrity of the attendance process and promoting a fair learning environment.
---
## 프로젝트 멤버 및 담당파트
- 유승훈(BE & Infra)
  - 기획 및 디자인
  - 웹 백엔드 개발 (회원 CRUD API 개발)
  - AWS Rekognition 연결
- 김종훈(FE)
  - 웹 프론트 개발 (React Component 연결 및 JS-Fetch를 이용한 BE와 통신)
- 이상준(BE)
  - 웹 백엔드 개발 (수업 CRUD API 개발)
- 최세영(FE)
  - 웹 프론트 개발 (React Component 개발)

## 프로젝트 소개
### DaechulNoh - AWS Rekognition을 활용한 얼굴 인식 출석 체크 시스템
- 위 서비스는 편리하고 신뢰할 수 있는 출석 체크 시스템을 제공하는 것을 목표로, 현재 강의실의 사진을 AWS에서 제공하는 Rekognition 서비스를 통해 수업에 참여중인 학생을 추출한 후 DB에 저장된 학생의 사진과 비교함으로써 학생이 출석했는지 확인할 수 있음.
- 서비스의 대략적인 동작 과정)
  1. 사전 설정 단계 : 각 수업의 생성 단계에서 교수는 해당 수업에 참가할 학생들의 정보를 등록하여 수업에 추가.
  2. 출석 체크 : 각 수업시간 마다, 교수는 강의실 사진을 촬영. AWS Rekognition의 얼굴 인식 기술을 활용해 서비스는 사전에 설정한 학생과 비교하여 출석한 학생을 확인.

## 프로젝트 필요성 소개
기존의 플라토 시스템의 경우, 스마트 출석부 시스템은 교수가 코드를 학생들에게 알려주고, 학생이 입력을 함으로써 출석이 되는 방식이다.
그러나 수업에 참여한 학생이 수업에 참여하지 않은 학생에게 코드를 알려줌으로써, 일종의 “대리출석"이 가능하다는 약점이 있다.
또한, 교수가 직접 호명하여 출석부에 체크하는 방식도 있지만 사람이 많은 수업의 경우 출석체크에만 시간이 오래 걸린다는 단점이 있다.

따라서, AWS Rekognition을 활용한 얼굴 인식 출석 체크 시스템인 DaechulNoh를 이용하면, 대리출석을 방지하고 출석체크에 소요되는 시간도 단축된다는 장점이 있다.

## 관련 기술/논문/특허 조사 내용 소개
### 선행 연구
  1. [Face Recognition based Attendance Management System](https://www.researchgate.net/publication/341876647_Face_Recognition_based_Attendance_Management_System) 논문에 따르면 데이터 베이스 생성, 얼굴 감지, 얼굴 인식, 출석 업데이트로 총 4 단계를 거쳐 학생들의 출석 여부를 감지한다. 이때 데이터 베이스는 출석한 학생들의 이미지들로 구성되며 얼굴 감지와 얼굴 인식은 각각 Haar-Cascade  classifier  와 Local  Binary Pattern  Histogram  알고리즘을 수행한다. 얼굴은 수업의 live streaming을 통해 감지되며 수업이 끝난 후에 교수님께 출석부 명단을 이메일로 전송한다. . 이 시스템은 zoom과 같은 온라인 수업 환경에서 출석을 체크하기 위해 개발되었다.
  2. [Face Recognition Based Attendance System](https://ieeexplore.ieee.org/document/10146718) 에서도 위와 비슷한 서비스를 위한 기술을 소개하고 있음. 여기서도 위와 비슷하게 OpenCV 라이브러리와 LBPH 알고리즘과 Harr-Cascade 알고리즘을 사용해서 얼굴인식 시스템을 구현하고 있음.
## 프로젝트 개발 결과물
<p align="center">
  <img width="500" alt="image" src="https://github.com/hunsy9/DaechulNoh/assets/101303791/aaaa8a05-3383-4d8a-a74e-d79ea60da1c2">
</p><br>

1. 학생들의 정보(이름, 학번, 사진 등)을 시스템과 AWS S3에 저장
2. AWS Rekognition의 IndexFaces API를 호출
   - 얼굴 사진을 분석하고, 얼굴 특징 벡터를 추출하여 컬렉션에 저장
3. 매 수업 시작 시, 출석 체크를 위한 강의실 전경 사진을 촬영 후 S3로 업로드 
4. S3에 업로드된 출석 체크 사진에 대해 AWS Rekognition의 SearchFacesByImage API 호출 
5. 매칭된 얼굴의 정보(등록된 학생 이름, 학번 등)를 반환, 교수자는 웹 인터페이스를 통해 매 수업 별 출석 결과를 확인

## 개발 결과물을 사용하는 방법
[//]: # (todo)

## 개발 결과물의 활용방안
앞서 언급한 기존 플라토 시스템의 단점을 보안하기 위해 AWS Rekognition을 활용한 얼굴 인식 출석 체크 시스템인 DaechulNoh를 제안함으로써 대리출석을 방지하고 출석체크에 소요되는 시간 또한 단축될 것으로 기대함.
