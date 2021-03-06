# Wanted Pre OnBoarding

## Response Entity

```
{
  status: "OK",
  message: "",
  data: {
    id: 1,
    name: "test",
  }
}
```

## Database Setup

Mysql 데이터베이스 컨테이너 추가

```bash
# 추가
npm run db:up --env=development
npm run db:up --env=test
# 제거
npm run db:down --env=development
npm run db:down --env=test
```

## Enviroment

필요한 환경에 맞는 env파일 필요합니다.

- 개발용: `.env.development`
- 테스트용: `.env.test`
- 프로덕션 환경에서는 직접 환경변수를 세팅하도록 생각했습니다.

```
// .env.development or .env.test

PORT=3000

MYSQL_HOSTNAME=localhost
MYSQL_USERNAME=root
MYSQL_PASSWORD=admin
MYSQL_PORT=3306
MYSQL_DATABASE=development

```

## Nest Setup

- API versioning 추가
- Global ExceptionFilter 추가
- Global Validation Pipe and Serialize 추가
- Global Response Serializer 추가

## DB 설계

요구사항 분석

- 회사(`company`)가 여러개의 채용공고(`job_vacancy`)를 생성할 수 있으므로 회사와 채용공고는 1:N 관계를 갖는다.
- 사용자(`user`)는 여러 채용공고에 지원할 수 있고 하나의 채용공고에는 여러명의 지원자가 있을 수 있다. 따라서 N:M 관계이다. 하지만 지원내역 및 지원에 대한 결과 및 추가적인 사항들이 사용자와 채용공고 사이에 필요할 것이다. (최소한 신청날짜라도 필요할 것이다) 따라서 단순히 typeORM의 N:M관계를 위한 ManyToMany를 통해 Relation table을 생성하는 것이아니라 지원이력(`job_application`)이라는 별도의 테이블을 두어야 한다. 따라서 사용자와 지원이력 사이는 1:N, 지원이력과 채용공고 사이에는 N:1이 되도록 테이블을 설계한다. 또한 사용자는 채용공고에 한번만 지원할 수 있기 때문에 유저아이디와 채용공고아이디에 유니크 인덱스를 걸어준다.

<img width="500" alt="스크린샷 2022-06-15 오후 10 15 40" src="https://user-images.githubusercontent.com/67570061/173836572-d2241211-7bd7-41df-af94-ee1885f1ce7b.png">

## 엔티티 설계

우선 외래키관계에 있는 모든 컬럼을 연관관계로 설정하였다.
하지만 개발이후 불필요한 연관관계인 경우 제거하는 것이 의존성 관리에 더 좋다고 생각합니다.

## RESTAPI 설계

모든 회사의 채용공고를 지원하기 때문에 company/:companyId/job-vacancy로 계층적인 URL이 아닌 별도로 분리하였습니다.

- POST /v1/job-vacancies 채용공고 등록
- PUT /v1/job-vacancies/:jobVacancyId 채용공고 수정
- GET /v1/job-vacancies 채용공고 목록 조회
- GET /v1/job-vacancies/:jobVacancyId 채용공고 상세 조회
- DELETE /v1/job-vacancies/:jobVacancyId 채용공고 삭제

- POST /v1/job-applications 채용공고 지원

## Commit Message Convention

- `feat` : 새로운 기능 추가
- `test` : 테스트 추가
- `chore` : 간단한 테스트 처리
- `docs`: 문서 및 명세 작성
