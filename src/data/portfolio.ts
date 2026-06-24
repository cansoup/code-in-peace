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

export interface Project {
  idx: string;
  ctx: Localized;
  title: Localized;
  stack: string[];
  blurb: Localized;
  metric: Localized;
  link?: string;
}

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
  },
  {
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
  },
  {
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
