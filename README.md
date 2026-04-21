# Bong's Portfolio

## 1. 프로젝트 소개

Next.js App Router 기반으로 구축한 인증 중심 포트폴리오 프로젝트입니다.

단순 로그인 기능 구현을 넘어,
실제 서비스에서 발생하는 인증 흐름(세션 유지, 보호 페이지 접근 제어, 사용자 상태 분기)을 고려하여 설계했습니다.

포트폴리오는 로그인 없이 열람 가능하며,
로그인 시 인증 상태에 따른 UI 변화와 보호된 라우팅 흐름을 직접 체험할 수 있습니다.

## 2. 주요 기능

- 공개 포트폴리오 페이지 (비로그인 접근 가능)
- Credentials / GitHub OAuth 로그인 지원
- JWT / Session 커스터마이징 (uid 유지)
- Middleware(Proxy) 기반 보호 라우트 제어
- 로그인 상태에 따른 UI 분기 처리
- 세션 유지 및 인증 상태 관리

## 3. 기술적 설계 포인트

### 1. 인증 방식 통합 처리

- Credentials 로그인과 GitHub OAuth를 하나의 인증 흐름으로 통합
- 사용자 정보(uid)를 기준으로 일관된 세션 구조 설계

### 2. JWT / Session 커스터마이징

- NextAuth JWT 콜백을 활용하여 사용자 uid 유지
- session에서 uid를 활용할 수 있도록 구조 설계

### 3. middleware(proxy) 기반 접근 제어

- 클라이언트가 아닌 서버 레벨에서 보호 페이지 접근 제어
- 미인증 사용자는 /login으로 리다이렉트

### 4. 사용자 상태 기반 UI 구성

- Header 및 페이지에서 session 상태에 따른 UI 분기 처리
- 인증 여부에 따라 사용자 정보 및 인터랙션 변화

## 4. 인증 흐름

Client  
→ 로그인 요청

NextAuth (Credentials / OAuth)  
→ JWT 발급

Session 유지

Proxy (middleware)  
→ 인증됨: 접근 허용  
→ 미인증: /login 리다이렉트

## 5. Middleware(Proxy) 사용이유

- 클라이언트에서만 보호할 경우 초기 렌더링 시 UI 깜빡임 발생
- 서버 레벨에서 라우트 접근을 제어하여 불필요한 렌더링 방지
- 실제 서비스와 유사한 인증 구조 구현 목적

### 6. 설계 의도

- 포트폴리오는 로그인 없이 바로 확인 가능하도록 설계
- 인증은 필수 기능이 아닌 “UX 체험 요소”로 구성
- 인증 상태에 따라 자연스럽게 UI가 변화하도록 구현

### 7. 기술 스택

- Next.js (App Router)
- NextAuth v5
- TypeScript
- Prisma + Neon (PostgreSQL)
- Vercel
