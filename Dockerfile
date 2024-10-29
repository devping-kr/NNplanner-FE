# Step 1: Node.js 환경에서 빌드
FROM --platform=linux/amd64 node:16 AS build

# 작업 디렉토리 설정
WORKDIR /app

# 패키지 파일 복사 및 의존성 설치
COPY package*.json ./
RUN npm install

# 애플리케이션 코드 복사
COPY . .

# 빌드 실행
RUN npm run build

# Step 2: Nginx 설정 및 빌드 파일 복사
FROM nginx:alpine

# 빌드 결과물을 Nginx 기본 경로로 복사
COPY --from=build /app/build /usr/share/nginx/html

# Nginx 시작
CMD ["nginx", "-g", "daemon off;"]