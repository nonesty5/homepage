# 프로젝트 검증 요청서 (AI Handoff Review)

## 1. 프로젝트 개요

| 항목 | 내용 |
|------|------|
| **프로젝트명** | 한결회계법인 홈페이지 (HANGYEOL) |
| **목적** | 공인회계사(CPA)의 전문 홈페이지. 세무·감사 관련 글/정보 업데이트, 업무경험 소개 |
| **벤치마킹** | https://mstacc.com (회계법인 마일스톤) — 전체 구조 참고 |
| **배포** | Vercel — https://homepage-pink-one.vercel.app |
| **GitHub** | https://github.com/nonesty5/homepage |
| **디자인 컨셉** | 모던 블랙(#0a0a0a) + 화이트(#fafafa), 미니멀리즘 |

---

## 2. 기술 스택

| 레이어 | 기술 | 버전 |
|--------|------|------|
| 프레임워크 | Next.js (App Router) | 16.2.1 |
| 언어 | TypeScript | ^5 |
| UI 라이브러리 | React | 19.2.4 |
| 스타일링 | Tailwind CSS | v4 (@theme inline 방식) |
| 콘텐츠 파싱 | gray-matter | ^4.0.3 |
| MDX 렌더링 | next-mdx-remote | ^6.0.0 |
| 이메일 발송 | Resend | ^6.9.4 |
| 린터 | ESLint + eslint-config-next | ^9 / 16.2.1 |
| 배포 | Vercel (Turbopack 빌드) | — |

---

## 3. 커밋 히스토리

```
7b6fca7 redesign: 디자인 대폭 개선 및 콘텐츠 실제화
484de7a feat: 회계사 전문 홈페이지 초기 구축
```

- **1차 커밋 (484de7a)**: Next.js 프로젝트 초기화, 7개 페이지 생성, MDX 콘텐츠 시스템, 플레이스홀더 콘텐츠
- **2차 커밋 (7b6fca7)**: 디자인 전면 개선 (20개 파일, +2,076줄/-616줄), 콘텐츠 실제화

---

## 4. 파일 구조 및 역할

```
Homepage/
├── content/posts/                    # MDX 블로그 콘텐츠 (DB 대체)
│   ├── tax-reform-2026.mdx           # 2026년 법인세 개정사항
│   ├── audit-checklist.mdx           # 외부감사 준비 가이드
│   └── startup-tax-tips.mdx          # 신설법인 세무 체크리스트
│
├── src/
│   ├── app/
│   │   ├── layout.tsx                # 루트 레이아웃 (HTML lang="ko", Pretendard CDN, Header/Footer)
│   │   ├── globals.css               # Tailwind v4 @theme, 애니메이션, prose 스타일
│   │   ├── page.tsx                  # 홈 — Hero, Stats, Services, Clients(marquee), Blog, CTA
│   │   ├── about/page.tsx            # 소개 — 비전, Why Us, Approach, Timeline, Values, Location
│   │   ├── services/page.tsx         # 서비스 목록 — 번호 기반 교차 레이아웃
│   │   ├── services/[slug]/page.tsx  # 서비스 상세 — 사이드 네비게이션, 관련 서비스
│   │   ├── members/page.tsx          # 멤버 — 리드멤버 하이라이트 + 카드 그리드
│   │   ├── clients/page.tsx          # 클라이언트 — 산업별 필터, gap-px 그리드
│   │   ├── blog/page.tsx             # 블로그 목록 — 피처드 포스트, 카테고리 필터
│   │   ├── blog/[slug]/page.tsx      # 블로그 상세 — 읽기시간, 관련글, 공유
│   │   ├── contact/page.tsx          # 문의 — 폼 + 연락처 정보
│   │   ├── api/contact/route.ts      # POST API — Resend 이메일 발송
│   │   └── api/posts/route.ts        # GET API — 블로그 목록 JSON
│   │
│   ├── components/
│   │   ├── layout/header.tsx         # 스크롤 반응형 헤더 (투명→블러), 풀스크린 모바일 메뉴
│   │   ├── layout/footer.tsx         # 4컬럼 푸터, 브랜드 스테이트먼트
│   │   ├── contact/contact-form.tsx  # 문의 폼 (바텀보더 인풋, 스피너, 성공 애니메이션)
│   │   ├── mdx/mdx-content.tsx       # MDX 렌더러 (next-mdx-remote/rsc)
│   │   └── ui/section-heading.tsx    # 재사용 섹션 제목 (label, line, subtitle 지원)
│   │
│   └── lib/
│       ├── constants.ts              # 사이트 설정 (사무소명, 연락처, 주소 등)
│       ├── data.ts                   # 서비스(6), 멤버(4), 클라이언트(12), 통계(4) 데이터
│       └── posts.ts                  # MDX 파일 읽기/파싱 유틸리티
│
├── .env.local                        # RESEND_API_KEY (git ignored)
├── next.config.ts
├── package.json
├── tsconfig.json
└── tailwind은 v4이므로 tailwind.config 없음 (globals.css의 @theme inline 사용)
```

---

## 5. 핵심 아키텍처 결정 사항

### 5-1. DB 대체: 파일 기반 콘텐츠

- 블로그 글은 `content/posts/*.mdx` 파일로 관리
- `gray-matter`로 frontmatter 파싱, `next-mdx-remote`로 서버 사이드 렌더링
- 서비스/멤버/클라이언트는 `src/lib/data.ts`에 정적 데이터로 관리
- **글 추가 워크플로우**: MDX 파일 추가 → `git push` → Vercel 자동 빌드

### 5-2. 블로그 목록 페이지의 "use client" + API 패턴

- `blog/page.tsx`는 `"use client"` 컴포넌트
- `useEffect`에서 `/api/posts` API를 fetch하여 포스트 목록을 가져옴
- **이유**: 카테고리 필터링을 클라이언트 사이드에서 인터랙티브하게 처리하기 위함
- **검증 필요**: SSG로 전환하고 `searchParams` 또는 클라이언트 필터링만 사용하는 것이 더 적절한지 검토

### 5-3. Tailwind CSS v4

- `tailwind.config.ts` 없이 `globals.css`의 `@theme inline { }` 블록에서 커스텀 토큰 정의
- 커스텀 색상: `--color-background`, `--color-foreground`, `--color-muted`, `--color-border`, `--color-card`, `--color-surface`, `--color-subtle`

### 5-4. 이메일 발송 (Resend)

- `POST /api/contact` → Resend API로 이메일 발송
- 현재 `from` 주소: `onboarding@resend.dev` (Resend 기본 테스트 도메인)
- **프로덕션 전환 시**: 커스텀 도메인 인증 후 실제 발신 주소로 변경 필요
- **환경변수**: `RESEND_API_KEY`가 Vercel에 설정되어 있어야 작동

---

## 6. 검증 체크리스트

### 6-1. 빌드 및 배포

- [ ] `npm install` 정상 완료
- [ ] `npm run build` 에러 없이 21개 페이지 생성 확인
- [ ] TypeScript 타입 에러 없음 확인
- [ ] Vercel 프로덕션 배포 정상 동작 확인
- [ ] `.env.local`이 `.gitignore`에 포함되어 Git에 커밋되지 않았는지 확인

### 6-2. 페이지별 기능 검증

| 페이지 | 경로 | 검증 항목 |
|--------|------|-----------|
| 홈 | `/` | Hero 렌더링, Stats 섹션, 서비스 카드 6개, 클라이언트 마키, 블로그 3개, CTA |
| About | `/about` | 비전/철학, Why Us 3개, Approach 4단계, 타임라인 5개, 핵심가치 4개, 오시는 길 |
| Services | `/services` | 6개 서비스 교차 레이아웃, 번호(01~06) 표시 |
| Service Detail | `/services/[slug]` | 사이드 네비게이션, 상세 항목, 관련 서비스 3개, CTA |
| Members | `/members` | 리드 멤버 하이라이트, 나머지 3명 카드 |
| Clients | `/clients` | 산업별 필터, 12개 클라이언트, Trust 섹션 |
| Blog | `/blog` | 피처드 포스트, 카테고리 필터(세무/감사), 나머지 포스트 그리드 |
| Blog Detail | `/blog/[slug]` | Breadcrumb, 읽기시간, MDX 렌더링, 관련글 3개, 공유 버튼 |
| Contact | `/contact` | 문의 폼 제출, 성공 상태 UI, 연락처 정보 5개 |

### 6-3. 반응형 디자인

- [ ] **모바일 (375px)**: 햄버거 메뉴 → 풀스크린 오버레이, 단일 컬럼 레이아웃
- [ ] **태블릿 (768px)**: 2컬럼 그리드, 네비게이션 전환점
- [ ] **데스크톱 (1280px+)**: 풀 레이아웃, 서비스 상세 사이드 네비게이션

### 6-4. 인터랙션 및 애니메이션

- [ ] 헤더 스크롤 시 투명 → 흰색 블러 전환
- [ ] 모바일 메뉴 열기/닫기 애니메이션 + body 스크롤 잠금
- [ ] 서비스 카드 hover 시 border-left 악센트
- [ ] 클라이언트 마키(무한 스크롤) 애니메이션
- [ ] 문의 폼 전송 시 스피너, 성공 시 체크마크 애니메이션
- [ ] 블로그 카드 hover-lift 효과

### 6-5. SEO 및 메타데이터

- [ ] `<html lang="ko">` 설정
- [ ] 각 페이지별 `<title>` 및 `<meta description>` 고유 설정
- [ ] OpenGraph / Twitter Card 메타태그
- [ ] `generateMetadata`가 동적 라우트(`[slug]`)에서 올바르게 작동
- [ ] Pretendard 폰트 CDN 로드 및 적용

### 6-6. 보안

- [ ] 문의 폼 API (`/api/contact`)에 입력값 서버사이드 검증 존재 확인
- [ ] XSS 취약점: 이메일 HTML 템플릿에 사용자 입력이 직접 삽입됨 — **이스케이핑 필요 여부 검토**
- [ ] Rate limiting 미구현 — 스팸 방지 대책 검토
- [ ] CSRF 보호 여부 확인
- [ ] `RESEND_API_KEY`가 클라이언트에 노출되지 않는지 확인

### 6-7. 성능

- [ ] Lighthouse Performance 점수 (목표: 90+)
- [ ] Pretendard 폰트 로딩 전략 (preconnect, dynamic subset) 적절성
- [ ] 불필요한 클라이언트 번들 크기 검토 (`"use client"` 최소화)
- [ ] 이미지 최적화 (현재 이미지 없음, 향후 추가 시 `next/image` 사용 필요)

### 6-8. 콘텐츠 품질

- [ ] 블로그 3편의 세무/감사 전문 내용 정확성 검토
- [ ] 법인세율 표, 부가세 신고기한 등 수치 데이터 정확성
- [ ] 한국어 맞춤법/문법 검수
- [ ] 플레이스홀더 정보(사무소명, 주소, 전화번호)가 명확히 식별 가능한지

---

## 7. 알려진 이슈 및 개선 필요 사항

### 즉시 검토 필요

| # | 이슈 | 심각도 | 설명 |
|---|------|--------|------|
| 1 | XSS 위험 | **높음** | `/api/contact/route.ts`에서 사용자 입력(`name`, `message` 등)이 HTML 이메일 템플릿에 이스케이핑 없이 직접 삽입됨 |
| 2 | Rate Limiting 없음 | **중간** | 문의 폼 API에 요청 횟수 제한이 없어 스팸/남용 가능 |
| 3 | 블로그 목록 아키텍처 | **낮음** | `blog/page.tsx`가 CSR + API fetch 패턴인데, SSG + 클라이언트 필터링이 더 적절할 수 있음 |

### 향후 개선 권장

| # | 항목 | 설명 |
|---|------|------|
| 1 | 이미지 에셋 | 멤버 프로필 사진, 클라이언트 로고, OG 이미지 추가 |
| 2 | sitemap.xml | `app/sitemap.ts` 추가하여 SEO 크롤링 지원 |
| 3 | robots.txt | `app/robots.ts` 추가 |
| 4 | 404 페이지 | 커스텀 not-found 페이지 디자인 |
| 5 | 로딩 상태 | `loading.tsx` 또는 Suspense 바운더리 추가 |
| 6 | 접근성(a11y) | 키보드 네비게이션, aria 속성, 색상 대비 검증 |
| 7 | Resend 도메인 | `onboarding@resend.dev` → 커스텀 도메인 발신 주소로 전환 |
| 8 | 스팸 방지 | Honeypot 필드 또는 Turnstile CAPTCHA 추가 |

---

## 8. 로컬 실행 방법

```bash
# 1. 클론
git clone https://github.com/nonesty5/homepage.git
cd homepage

# 2. 의존성 설치
npm install

# 3. 환경변수 설정
cp .env.local.example .env.local  # 또는 직접 생성
# RESEND_API_KEY=re_your_key_here

# 4. 개발 서버
npm run dev          # http://localhost:3000

# 5. 프로덕션 빌드 검증
npm run build        # 에러 없이 21 pages 생성 확인
```

---

## 9. 검증 후 기대하는 피드백

1. **보안 취약점**: 위 체크리스트 6-6 항목에 대한 구체적 발견사항 및 수정 코드
2. **코드 품질**: 안티패턴, 불필요한 복잡성, 타입 안전성 미비 등
3. **성능 이슈**: 번들 크기, 렌더링 성능, 폰트 로딩 관련
4. **아키텍처 의견**: 파일 기반 콘텐츠 시스템의 적절성, 블로그 CSR 패턴 등
5. **디자인/UX 피드백**: 반응형 브레이크포인트, 인터랙션, 접근성
6. **콘텐츠 정확성**: 세무/회계 관련 수치 및 법적 정보의 정확도

---

*작성일: 2026-03-31*
*작업 도구: Claude Opus 4.6 (1M context)*
*작업 시간: 2 세션에 걸쳐 진행 (초기 구축 + 디자인 리뉴얼)*
