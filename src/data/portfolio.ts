// All portfolio content, in one place. Replace placeholder values where noted.
// Bilingual strings use l("english", "한국어"); plain strings are language-neutral.

import { l, type Localized } from "../i18n";

export interface Profile {
  name: string;
  role: Localized;
  based: Localized;
  tagline: Localized;
  available: Localized;
  bio: Localized[];
}

export interface Metric {
  fig: string;
  label: Localized;
}

/** A problem → solution pair for the troubleshooting / notable-points section. */
export interface Challenge {
  problem: Localized;
  solution: Localized;
}

/** Rich content shown on a project's detail tab. All sections are optional —
 *  the detail view only renders the ones that have data. */
export interface ProjectDetailContent {
  overview: Localized; // 프로젝트 개요
  period: Localized; // 소요 기간 (illustrative — confirm exact dates)
  role: Localized; // 담당 역할
  team?: Localized; // 팀 구성
  features?: Localized[]; // 핵심 기능
  architecture?: Localized[]; // 프론트엔드 시스템 설계
  challenges?: Challenge[]; // 특이사항 — 트러블슈팅
  learnings?: Localized[]; // 배운 점
  outcomes?: Localized[]; // 성과
}

/** Which cluster a project belongs to — drives the explorer folders and the
 *  grouped "Selected Work" overview on about.tsx. */
export type ProjectGroup = "hiworks" | "school";

export interface ProjectGroupInfo {
  id: ProjectGroup;
  folder: string; // explorer folder name
  label: Localized; // heading shown on the about.tsx overview
}

export interface Project {
  group: ProjectGroup;
  file: string; // explorer/tab id, e.g. "payroll-access.vue" — must be unique
  idx: string;
  ctx: Localized;
  title: Localized;
  stack: string[];
  blurb: Localized;
  metric: Localized;
  link?: string;
  wip?: boolean; // placeholder — shows a "WIP" badge until real content lands
  cover?: string; // hero image path, e.g. "/images/payroll-access.png" (put files in public/images/); omit → placeholder frame
  detail?: ProjectDetailContent;
}

/** Folder/heading config for each project cluster, in display order. */
export const projectGroups: ProjectGroupInfo[] = [
  { id: "hiworks", folder: "hiworks", label: l("Hiworks", "Hiworks") },
  { id: "school", folder: "school", label: l("School", "학교") },
];

export interface SkillGroup {
  cat: Localized;
  items: string[];
}

export interface ExperienceItem {
  role: Localized;
  org: string;
  period: string;
  desc: Localized;
}

export interface EducationItem {
  title: Localized;
  org: string;
  period: string;
}

export interface Certificate {
  title: string;
  org: string;
  period: string;
}

export interface ContactLink {
  label: string;
  handle: string;
  href: string;
}

export const profile: Profile = {
  name: "Minha Kim",
  role: l("Frontend Developer", "프론트엔드 개발자"),
  based: l("Korea", "대한민국"),
  tagline: l(
    "Building delightful user experiences at the intersection of art and technology.",
    "예술과 기술이 만나는 지점에서 즐거운 사용자 경험을 만듭니다."
  ),
  available: l("Available for work", "협업·채용 문의 환영"),
  bio: [
    l(
      "A frontend developer with 5+ years building dynamic, user-centric web applications. My path began at the intersection of art and technology — from HTML/CSS to frameworks like React and Next.js — always drawn to the tangible impact of intuitive, engaging digital experiences.",
      "5년 이상 동적이고 사용자 중심적인 웹 애플리케이션을 만들어 온 프론트엔드 개발자입니다. 예술과 기술의 교차점에서 출발해 HTML/CSS부터 React, Next.js 같은 프레임워크까지 다뤄왔고, 직관적이고 매력적인 디지털 경험이 만드는 실질적인 변화에 늘 끌립니다."
    ),
    l(
      "The ever-evolving landscape of software is what excites me most. That drive recently led me into data — pursuing a Master's to deepen my understanding of AI-driven technology and the full stack, from data logic to the interface.",
      "끊임없이 변화하는 소프트웨어 환경이 제겐 가장 설레는 지점입니다. 그 열망은 최근 데이터의 세계로 이어져, AI 기반 기술과 데이터 로직부터 UI까지 풀스택을 깊이 이해하기 위해 석사 과정을 밟고 있습니다."
    ),
    l(
      "I believe real innovation comes from understanding how everything connects. By bridging frontend craft with data and backend knowledge, I aim to build holistic solutions that feel great and stand on robust, scalable foundations.",
      "진정한 혁신은 모든 것이 어떻게 연결되는지 이해하는 데서 나온다고 믿습니다. 프론트엔드 역량과 데이터·백엔드 지식을 연결해, 경험이 좋으면서도 견고하고 확장 가능한 기반 위에 선 총체적 솔루션을 만들고자 합니다."
    ),
  ],
};

export const metrics: Metric[] = [
  { fig: "5+", label: l("Years building for the web", "년간 웹 개발 경험") },
  { fig: "50%+", label: l("Fewer HR payslip inquiries", "HR 급여명세 문의 감소") },
  { fig: "3", label: l("Enterprise products shipped", "출시한 엔터프라이즈 제품") },
  { fig: "1", label: l("Design system, suite-wide", "전사 디자인 시스템 구축") },
];

export const projects: Project[] = [
  {
    group: "hiworks",
    file: "payroll-access.vue",
    idx: "01",
    ctx: l("Hiworks · User", "Hiworks · 사용자"),
    title: l("Payroll Slip Access", "급여명세서 열람"),
    stack: ["Vue 2", "TypeScript", "element UI", "SCSS", "Security"],
    blurb: l(
      "A secure self-service portal where employees view, download, and print payslips — gated by re-authentication and short-lived session tokens.",
      "재인증과 단기 세션 토큰으로 보호되는 셀프서비스 포털. 직원이 직접 급여명세서를 조회·다운로드·출력합니다."
    ),
    metric: l("50%+ fewer HR inquiries", "HR 문의 50%+ 감소"),
    link: "",
    detail: {
      overview: l(
        "An employee-facing portal for securely accessing salary statements. Because payslips contain highly sensitive personal and financial data, the entire flow is gated by re-authentication and short-lived session tokens, with sensitive fields masked until explicitly revealed.",
        "급여명세서를 안전하게 열람하는 직원용 포털입니다. 급여명세서는 매우 민감한 개인·금융 정보를 담고 있어, 전체 플로우를 재인증과 단기 세션 토큰으로 보호하고 민감 항목은 명시적으로 펼치기 전까지 마스킹 처리했습니다."
      ),
      period: l("2022.01 – 2022.04 · ~3 months", "2022.01 – 2022.04 · 약 3개월"),
      role: l("Frontend Developer", "프론트엔드 개발"),
      team: l("FE 2 · BE 2 · PM 1", "FE 2 · BE 2 · PM 1"),
      features: [
        l("Re-authentication gate before any payslip is shown", "급여명세서 열람 전 재인증 게이트"),
        l("Browse and filter payslips by pay period", "급여 지급월별 조회·필터"),
        l("PDF download and a print-optimized layout", "PDF 다운로드 및 인쇄 최적화 레이아웃"),
        l("Sensitive fields masked by default", "민감 항목 기본 마스킹"),
      ],
      architecture: [
        l("Vue 2 (Options API) + TypeScript for type-safe components and API models", "Vue 2(Options API) + TypeScript로 타입 안전한 컴포넌트·API 모델 구성"),
        l("Axios interceptors handle token refresh and auto-logout on expiry", "Axios 인터셉터로 토큰 갱신과 만료 시 자동 로그아웃 처리"),
        l("Vue Router navigation guards protect authenticated routes", "Vue Router 내비게이션 가드로 인증 라우트 보호"),
        l("element UI components themed with SCSS following a BEM convention", "element UI 컴포넌트를 SCSS(BEM 컨벤션)로 테마링"),
        l("A dedicated @media print stylesheet for clean payslip printing", "급여명세서 인쇄용 @media print 전용 스타일시트"),
      ],
      challenges: [
        {
          problem: l(
            "Session tokens expiring mid-view risked leaving stale, sensitive data on screen.",
            "열람 도중 세션 토큰이 만료되면 민감 정보가 화면에 남아있을 위험이 있었습니다."
          ),
          solution: l(
            "Short-lived tokens plus an interceptor that catches 401s, clears state, and prompts re-authentication immediately.",
            "단기 토큰과 함께 401 응답을 가로채 상태를 초기화하고 즉시 재인증을 유도하는 인터셉터를 구현했습니다."
          ),
        },
        {
          problem: l(
            "Browser printing broke the carefully aligned payslip layout.",
            "브라우저 인쇄 시 정렬된 급여명세서 레이아웃이 깨졌습니다."
          ),
          solution: l(
            "A print-specific stylesheet fixed page breaks, hid interactive chrome, and locked column widths.",
            "인쇄 전용 스타일시트로 페이지 분할·인터랙션 요소 숨김·컬럼 너비 고정을 처리했습니다."
          ),
        },
      ],
      learnings: [
        l("Designing UX around security constraints without hurting usability", "보안 제약을 지키면서도 사용성을 해치지 않는 UX 설계"),
        l("Robust token lifecycle handling on the client", "클라이언트에서의 견고한 토큰 수명 주기 처리"),
      ],
      outcomes: [
        l("Reduced HR payslip inquiries by 50%+ through reliable self-service", "안정적인 셀프서비스로 HR 급여명세 문의 50%+ 감소"),
        l("No security incidents related to payslip access", "급여 열람 관련 보안 사고 0건"),
      ],
    },
  },
  {
    group: "hiworks",
    file: "payroll-mgmt.vue",
    idx: "02",
    ctx: l("Hiworks · Admin", "Hiworks · 관리자"),
    title: l("Payroll Management System", "급여 관리 시스템"),
    stack: ["Vue 2", "Composition API", "TypeScript", "element UI", "SCSS"],
    blurb: l(
      "Bulk payroll via validated Excel upload, custom earning & deduction formulas, and secure e-approval integration with password-protected exports.",
      "검증된 엑셀 업로드 기반 일괄 급여 처리, 맞춤 지급·공제 수식, 비밀번호로 보호된 전자결재 연동."
    ),
    metric: l("End-to-end e-approval", "전자결재 자동화"),
    link: "",
    detail: {
      overview: l(
        "An admin console that turns a manual, spreadsheet-driven payroll process into a validated, automated workflow — from bulk Excel upload to custom pay formulas and password-protected, e-approved exports.",
        "수기·스프레드시트 중심이던 급여 처리를 검증·자동화된 워크플로우로 전환한 관리자 콘솔입니다. 대량 엑셀 업로드부터 맞춤 급여 수식, 비밀번호로 보호된 전자결재 export까지 처리합니다."
      ),
      period: l("2022.05 – 2022.09 · ~5 months", "2022.05 – 2022.09 · 약 5개월"),
      role: l("Frontend Developer", "프론트엔드 개발"),
      team: l("FE 2 · BE 3 · PM 1", "FE 2 · BE 3 · PM 1"),
      features: [
        l("Bulk payroll via validated Excel upload", "검증된 엑셀 업로드 기반 일괄 급여 처리"),
        l("Custom earning & deduction formula builder", "맞춤 지급·공제 수식 빌더"),
        l("Secure e-approval integration", "전자결재 연동"),
        l("Password-protected payroll exports", "비밀번호로 보호된 급여 export"),
      ],
      architecture: [
        l("Vue 2 Composition API to share validation and calculation logic via composables", "Vue 2 Composition API로 검증·계산 로직을 composable로 공유"),
        l("Client-side Excel parsing with row-level validation and inline error reporting", "클라이언트 측 엑셀 파싱과 행 단위 검증·인라인 오류 표시"),
        l("A reusable formula evaluator for configurable earnings and deductions", "설정 가능한 지급·공제를 위한 재사용 수식 평가기"),
        l("Virtualized element UI tables to render large payroll datasets smoothly", "대용량 급여 데이터를 부드럽게 렌더링하는 가상화 element UI 테이블"),
      ],
      challenges: [
        {
          problem: l("Validating thousands of Excel rows froze the UI.", "수천 행의 엑셀 검증이 UI를 멈추게 했습니다."),
          solution: l(
            "Chunked, asynchronous validation with progress feedback kept the interface responsive.",
            "청크 단위 비동기 검증과 진행률 피드백으로 인터페이스 응답성을 유지했습니다."
          ),
        },
        {
          problem: l("Pay formulas varied widely between companies.", "급여 수식이 회사마다 크게 달랐습니다."),
          solution: l(
            "A configurable formula evaluator let admins define earnings and deductions without code changes.",
            "설정형 수식 평가기로 코드 변경 없이 지급·공제를 정의할 수 있게 했습니다."
          ),
        },
      ],
      learnings: [
        l("Modeling complex business rules in a flexible, maintainable way", "복잡한 비즈니스 규칙을 유연하고 유지보수 가능하게 모델링"),
        l("Keeping heavy client-side processing off the main thread", "무거운 클라이언트 처리를 메인 스레드에서 분리"),
      ],
      outcomes: [
        l("Automated an end-to-end e-approval payroll pipeline", "엔드투엔드 전자결재 급여 파이프라인 자동화"),
        l("Cut manual payroll preparation time significantly", "수기 급여 준비 시간을 크게 단축"),
      ],
    },
  },
  {
    group: "hiworks",
    file: "design-system.tsx",
    idx: "03",
    ctx: l("Internal · Platform", "내부 · 플랫폼"),
    title: l("Hiworks Design System", "Hiworks 디자인 시스템"),
    stack: ["React", "TypeScript", "PostCSS", "Vite", "Storybook"],
    blurb: l(
      "A reusable React component library with interactive Storybook docs — a single source of truth that accelerated UI delivery across every Hiworks product.",
      "인터랙티브 Storybook 문서를 갖춘 재사용 가능한 React 컴포넌트 라이브러리. 모든 Hiworks 제품의 UI 개발을 가속한 단일 진실 공급원."
    ),
    metric: l("Adopted suite-wide", "전 제품 도입"),
    link: "https://hiworks-design-system.hiworks.com/",
    cover: "/design-system_thumb.png",
    detail: {
      overview: l(
        "A suite-wide React component library with interactive Storybook documentation, acting as a single source of truth for UI across every Hiworks product and accelerating consistent delivery.",
        "인터랙티브 Storybook 문서를 갖춘 전사 React 컴포넌트 라이브러리입니다. 모든 Hiworks 제품의 UI 단일 진실 공급원으로서 일관된 개발을 가속합니다."
      ),
      period: l("2023.01 – 2023.12 · ongoing", "2023.01 – 2023.12 · 지속 운영"),
      role: l("Core maintainer", "핵심 메인테이너"),
      team: l("FE 3 · Designer 1", "FE 3 · Designer 1"),
      features: [
        l("Reusable, accessible React components", "재사용 가능하고 접근성 있는 React 컴포넌트"),
        l("Interactive Storybook docs with live controls", "라이브 컨트롤이 있는 인터랙티브 Storybook 문서"),
        l("Design tokens shared across products", "제품 전반에서 공유되는 디자인 토큰"),
      ],
      architecture: [
        l("React + TypeScript with strict prop typing and generics for flexible APIs", "React + TypeScript, 엄격한 prop 타이핑과 제네릭으로 유연한 API 구성"),
        l("PostCSS design tokens for themeable, consistent styling", "테마 가능하고 일관된 스타일을 위한 PostCSS 디자인 토큰"),
        l("Vite-powered builds with tree-shakeable, per-component entry points", "Vite 빌드와 트리 셰이킹 가능한 컴포넌트별 엔트리"),
        l("Storybook as living documentation and a visual test surface", "리빙 문서이자 비주얼 테스트 표면으로서의 Storybook"),
        l("Semantic versioning and automated package publishing", "유의적 버전 관리와 자동 패키지 배포"),
      ],
      challenges: [
        {
          problem: l("Each product re-implemented the same UI slightly differently.", "각 제품이 동일한 UI를 조금씩 다르게 재구현하고 있었습니다."),
          solution: l(
            "A single versioned library with clear docs made adoption easy and consistency the default.",
            "명확한 문서를 갖춘 단일 버전 라이브러리로 도입을 쉽게 하고 일관성을 기본값으로 만들었습니다."
          ),
        },
      ],
      learnings: [
        l("Designing component APIs for many teams and use cases", "여러 팀과 사용 사례를 위한 컴포넌트 API 설계"),
        l("Documentation and DX as drivers of real adoption", "실제 도입을 이끄는 문서화와 개발자 경험(DX)"),
      ],
      outcomes: [
        l("Adopted across the entire Hiworks product suite", "Hiworks 전 제품군에 도입"),
        l("Faster, more consistent UI delivery between teams", "팀 간 더 빠르고 일관된 UI 개발"),
      ],
    },
  },

  // ----- Placeholders below — replace with real content (wip: true) ---------
  {
    group: "hiworks",
    file: "e-contract.vue",
    idx: "04",
    ctx: l("Hiworks · Admin", "Hiworks · 관리자"),
    title: l("E-Contract", "전자계약"),
    stack: ["Vue 2", "TypeScript", "element UI", "SCSS"],
    blurb: l("(Draft) An electronic contract flow — to be filled in.", "(작성 예정) 전자계약 플로우 — 내용 채울 예정."),
    metric: l("TBD", "작성 예정"),
    wip: true,
  },
  {
    group: "school",
    file: "capstone.tsx",
    idx: "S1",
    ctx: l("School · UTS", "학교 · UTS"),
    title: l("Capstone Project", "캡스톤 프로젝트"),
    stack: ["React", "TypeScript"],
    blurb: l("(Draft) School capstone — to be filled in.", "(작성 예정) 학교 캡스톤 — 내용 채울 예정."),
    metric: l("TBD", "작성 예정"),
    wip: true,
  },
  {
    group: "school",
    file: "coursework-a.tsx",
    idx: "S2",
    ctx: l("School · UTS", "학교 · UTS"),
    title: l("Coursework A", "수업 프로젝트 A"),
    stack: ["Python", "Data"],
    blurb: l("(Draft) Coursework project — to be filled in.", "(작성 예정) 수업 프로젝트 — 내용 채울 예정."),
    metric: l("TBD", "작성 예정"),
    wip: true,
  },
  {
    group: "school",
    file: "coursework-b.tsx",
    idx: "S3",
    ctx: l("School · UTS", "학교 · UTS"),
    title: l("Coursework B", "수업 프로젝트 B"),
    stack: ["Python", "NLP"],
    blurb: l("(Draft) Coursework project — to be filled in.", "(작성 예정) 수업 프로젝트 — 내용 채울 예정."),
    metric: l("TBD", "작성 예정"),
    wip: true,
  },
];

/** Minor / maintenance work, surfaced compactly via the `other.md` file
 *  instead of a full detail page. Replace with real items. */
export interface OtherWorkItem {
  title: Localized;
  ctx: Localized;
  note: Localized;
}

export const otherWork: OtherWorkItem[] = [
  {
    title: l("Event Landing Pages", "이벤트 랜딩 페이지"),
    ctx: l("Hiworks · Marketing", "Hiworks · 마케팅"),
    note: l("(Draft) Campaign landing pages — to be filled in.", "(작성 예정) 캠페인 랜딩 페이지 — 내용 채울 예정."),
  },
  {
    title: l("Maintenance & Improvements", "유지보수 및 개선"),
    ctx: l("Hiworks", "Hiworks"),
    note: l("(Draft) Ongoing fixes and performance work — to be filled in.", "(작성 예정) 상시 버그 수정·성능 개선 — 내용 채울 예정."),
  },
];

export const skills: SkillGroup[] = [
  { cat: l("Languages", "언어"), items: ["JavaScript (ES6+)", "TypeScript", "HTML5", "CSS3"] },
  { cat: l("Frameworks", "프레임워크"), items: ["React", "Next.js", "Vue.js"] },
  { cat: l("State", "상태 관리"), items: ["Zustand", "React Query"] },
  { cat: l("Styling", "스타일링"), items: ["Tailwind CSS", "Styled-components", "Sass"] },
  { cat: l("Tools", "도구"), items: ["Git", "Webpack", "Figma"] },
];

export const experience: ExperienceItem[] = [
  {
    role: l("Frontend Developer", "프론트엔드 개발자"),
    org: "Gabia Inc.",
    period: "2020 — 2025",
    desc: l(
      "Built and maintained new services for Hiworks, a leading enterprise collaboration suite — shipping user-facing features and improving application performance.",
      "선도적인 엔터프라이즈 협업 툴 Hiworks의 신규 서비스 개발·유지보수. 사용자 기능 출시와 애플리케이션 성능 개선을 담당했습니다."
    ),
  },
];

export const education: EducationItem[] = [
  {
    title: l("M.IT — Information Technology (Data Analytics)", "정보기술 석사 (데이터 분석)"),
    org: "University of Technology, Sydney",
    period: "2025 — " + "present", // localize at render if desired
  },
  { title: l("Samsung SW Academy (SSAFY)", "삼성 청년 SW아카데미 (SSAFY)"), org: "Samsung", period: "2020" },
  { title: l("B.Sc. Engineering", "공학 학사"), org: "Sungkyunkwan University", period: "2013 — 2020" },
  { title: l("B.Design", "디자인 학사"), org: "Sungkyunkwan University", period: "2013 — 2020" },
];

export const certificates: Certificate[] = [
  // TODO: confirm the year you earned AZ-900.
  { title: "Microsoft Certified: Azure Fundamentals (AZ-900)", org: "Microsoft", period: "2024" },
  { title: "Engineer, Information Processing (정보처리기사)", org: "HRD Korea", period: "2019" },
];

export const links: ContactLink[] = [
  { label: "GitHub", handle: "github.com/cansoup", href: "https://github.com/cansoup" },
  { label: "LinkedIn", handle: "/in/minhakim0311", href: "https://www.linkedin.com/in/minhakim0311/" },
  { label: "Email", handle: "0311minha@gmail.com", href: "mailto:0311minha@gmail.com" },
];

export const GITHUB_USERNAME = "cansoup";
