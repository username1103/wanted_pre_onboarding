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

## Commit Message Convention

- `feat` : 새로운 기능 추가
- `test` : 테스트 추가
- `chore` : 간단한 테스트 처리
- `docs`: 문서 및 명세 작성
