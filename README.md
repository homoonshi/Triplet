<h1 style="text-align: center;">Triplet</h1>

## 팀 소개
<table>
  <tr>
    <td style="text-align: center; padding: 10px;">
      <a href="https://github.com/jinseobYun" target="_blank">
      <img src="https://avatars.githubusercontent.com/u/103829767?v=4" alt="윤진섭" height="150" width="150" style="border-radius: 50%;"/>
      <h4>윤진섭</h4>
      <p><strong>역할:</strong> 팀장, 인프라, 백엔드 개발 </p>
    </td>
    <td style="text-align: center; padding: 10px;">
      <a href="https://github.com/lshyunee" target="_blank">
      <img src="https://avatars.githubusercontent.com/u/147044110?v=4" alt="이수현" height="150" width="150" style="border-radius: 50%;"/>
      <h4>이수현</h4>
      <p><strong>역할:</strong> 백엔드 개발 </p>
    </td>
    <td style="text-align: center; padding: 10px;">
      <a href="https://github.com/homoonshi" target="_blank">
      <img src="https://avatars.githubusercontent.com/u/131606854?v=4" alt="김문희" height="150" width="150" style="border-radius: 50%;"/>
      <h4>김문희</h4>
      <p><strong>역할:</strong> 프론트엔드 개발 </p>
    </td>
  </tr>
  <tr>
    <td style="text-align: center; padding: 10px;">
      <a href="https://github.com/jung18" target="_blank">
      <img src="https://avatars.githubusercontent.com/u/81799517?v=4" alt="김문희" height="150" width="150" style="border-radius: 50%;"/>
      <h4>정두홍</h4>
      <p><strong>역할:</strong> 백엔드 개발 </p>
    </td>
    <td style="text-align: center; padding: 10px;">
      <h4>김고은</h4>
      <p><strong>역할:</strong> 프론트엔드 개발 </p>
    </td>
  </tr>
</table>

## 프로젝트 소개
#### Triplet은 여행 예산 계획과 여행 결제 내역을 카테고리 별로 분류해 예산 관리를 돕고, 다른 사람의 여행 예산 사용 내역을 참고할 수 있어 예산 계획에 도움을 주는 여행 예산 관리 애플리케이션 입니다. 

### 주요 기능

- 여행 계좌 개설
- QR 간편 결제
- 환전, 외화 계좌 관리
- 모임 통장
- 카테고리별 예산 설정
- 결제 시 카테고리 자동 분류, 여행 중 실시간 지출 내역 확인
- 여행 예산 내역 공유

### 서비스 화면
| 로그인 화면 | 메인 화면 | 내 여행 목록 |
|----------|-----------| ---------- |
| <img src="https://github.com/user-attachments/assets/acd1eb6c-11ad-410e-8050-5c17e5526d1f" width="250" height="500" /> | <img src="https://github.com/user-attachments/assets/2de0769e-848f-41b3-b331-bd104ef34ba0" width="250" height="500" /> | <img src="https://github.com/user-attachments/assets/13f66f50-4b07-4232-8aa8-16bd28bd7edc" width="250" height="500" /> |

| 여행 계좌 | 여행 상세 | 여행 상세 지출 내역 그래프 |
|----------|-----------| ------------- |
| <img src="https://github.com/user-attachments/assets/5f98c715-6cbc-4010-b3d7-f0fe511c4990" width="250" height="500" /> | <img src="https://github.com/user-attachments/assets/892c725a-9898-4e68-a79f-6a853f18d98b" width="250" height="500" /> |  <img src="https://github.com/user-attachments/assets/d31814d5-33ca-4e4f-a474-0fb56c12ec4d" width="250" height="500" /> |

| 여행 피드 | 마이페이지 |
|---------------|---------------|
| <img src="https://github.com/user-attachments/assets/ecd3e245-9d21-4ca2-b6ce-407025912b83" width="250" height="500" /> | <img src="https://github.com/user-attachments/assets/807a1238-48c7-4f2a-9747-87f6289eaa76" width="250" height="500" /> |



### 서비스 아키텍처
![image](https://github.com/user-attachments/assets/8867cb41-0003-47a2-8960-9de6eb21367c)
![image](https://github.com/user-attachments/assets/0c73f0d0-0ada-4683-9927-f6d65499c6cc)

## 프로젝트 구조
### EC2
```
📁home/ubuntu
├── 📁 certbot
│   ├── 📁conf
│   └── 📁www
├── 📄 docker-compose.yml
├── 📁 elasticsearch
├── 📁 elk
│   ├── 📁 elasticsearch
│   ├── 📁 kibana
│   ├── 📁 logstash
│   └── 📁 setup
├── 📄 init-letsencrypt.sh
├── 📁 jenkins-data
├── 📁 nginx
│   └── default.conf
└── 📁 redis-data
    ├── data
    └── redis.conf
:folder
```
### BackEnd
```
.
├── 📄 Dockerfile
├── 📁 build
├── 📄 build.gradle
├── 📄 build_image.sh
├── 📁 gradle
├── 📄 gradlew
├── 📄 gradlew.bat
├── 📄settings.gradle
└── 📁 src
    ├──📁 main
    │   ├── 📁 java
    │   │   └── 📁 com
    │   │       └── 📁 ssafy
    │   │           └── 📁 triplet
    │   │               ├── 📄 TripletApplication.java
    │   │               ├──📁 account
    │   │               │   ├── 📁 controller
    │   │               │   ├──📁 dto
    │   │               │   ├──📁 entity
    │   │               │   ├──📁 repository
    │   │               │   └──📁 service
    │   │               ├── 📁 auth
    │   │               │   ├──📁 controller
    │   │               │   ├──📁 dto
    │   │               │   ├──📁 jwt
    │   │               │   └──📁 service
    │   │               ├── 📁 config
    │   │               │   ├──📄 ElasticsearchConfig.java
    │   │               │   ├──📄 MultipartJackson2HttpMessageConverter.java
    │   │               │   ├──📄 RedisConfig.java
    │   │               │   ├──📄 ScriptConfig.java
    │   │               │   ├──📄 SecurityConfig.java
    │   │               │   └──📄 WebConfig.java
    │   │               ├── 📁 exception
    │   │               │   ├──📄 CustomErrorCode.java
    │   │               │   ├──📄 CustomException.java
    │   │               │   └──📁 controller
    │   │               ├──📁 exchange
    │   │               │   ├──📁 controller
    │   │               │   ├──📁 dto
    │   │               │   ├──📁 entity
    │   │               │   ├──📁 repository
    │   │               │   ├──📁 service
    │   │               │   └──📁 util
    │   │               ├──📁 member
    │   │               │   ├──📁 controller
    │   │               │   ├──📁 dto
    │   │               │   ├──📁 entity
    │   │               │   ├──📁 repository
    │   │               │   └──📁 service
    │   │               ├──📁 notification
    │   │               │   ├──📄 FcmTokenController.java
    │   │               │   ├──📁 config
    │   │               │   ├──📁 dto
    │   │               │   └──📁 service
    │   │               ├──📁 payment
    │   │               │   ├──📁 controller
    │   │               │   ├──📁 dto
    │   │               │   └──📁 service
    │   │               ├──📁 response
    │   │               │   └──📄 ApiResponse.java
    │   │               ├──📁 scheduler
    │   │               │   └──📄 ScheduledTasks.java
    │   │               ├──📁 sms
    │   │               │   ├──📁 controller
    │   │               │   ├──📁 dto
    │   │               │   ├──📁 repository
    │   │               │   ├──📁 service
    │   │               │   └──📁 util
    │   │               ├──📁 travel
    │   │               │   ├──📁 controller
    │   │               │   ├──📁 dto
    │   │               │   ├──📁 entity
    │   │               │   ├──📁 repository
    │   │               │   ├──📁 service
    │   │               │   ├──📁 specification
    │   │               │   └──📁 util
    │   │               └──📁 validation
    │   │                   └──📄 CustomValidator.java
    │   └──📁 resources
    │       ├──📄 application-secret.properties
    │       ├──📄 application.properties
    │       ├──📄 certification.json
    │       ├──📄 defaultImages.json
    │       ├──📄 elastic-member-mapping.json
    │       ├──📄 elastic-travel-mapping.json
    │       └──📁 scripts
    │           └──📄 refreshExchangeRates.lua
    └──📁 test
        └──📁 java
            └──📁 com
                └──📁 ssafy
                    └──📁 triplet
                        └──📁 TripletApplicationTests.java

```
### FrontEnd
```
.
├──📄 Dockerfile
├──📄 README.md
├──📄 build_image.sh
├──📁 conf
│   └── conf.d
├──📄 package-lock.json
├──📄 package.json
├──📁 public
│   ├──📁 assets
│   ├──📄 favicon.ico
│   ├──📄 firebase-messaging-sw.js
│   ├──📁 fonts
│   ├──📄 index.html
│   ├──📄 logo192.png
│   ├──📄 logo512.png
│   ├──📄 manifest.json
│   ├──📄 robots.txt
│   └──📄 service-worker.js
├──📁 src
│   ├──📄 App.css
│   ├──📄 App.test.tsx
│   ├──📄 App.tsx
│   ├──📁 assets
│   ├──📁 components
│   ├──📁 features
│   ├──📁 firebaseNotification
│   ├──📁 hooks
│   ├──📄 index.css
│   ├──📄 index.tsx
│   ├──📄 logo.svg
│   ├──📁 pages
│   ├──📄 react-app-env.d.ts
│   ├──📄 reportWebVitals.ts
│   ├──📁 routes
│   ├──📄 serviceWorkerRegistration.ts
│   ├──📁 services
│   ├──📄 setupTests.ts
│   ├──📄 store.ts
│   └──📁 types
└──📄 tsconfig.json
```
