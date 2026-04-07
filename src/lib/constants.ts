export const siteConfig = {
  name: "메리디안 어드바이저리",
  title: "MERIDIAN",
  tagline: "재무 의사결정의 가장 가까운 파트너",
  description:
    "스타트업 · 사업가 · 자산가를 위한 회계 · 재무 자문 부티크. Big4 감사 · 자본시장 IB · 가치평가 경력의 공인회계사가 함께합니다.",
  url: "https://meridian-advisory.com",
  email: "mscpa@dscpa.co.kr",
  phone: "010-3300-7339",
  location: "Seoul · Online Meeting",
  founder: "박민상",
  founderTitle: "Founder & Principal",
  affiliation:
    "박민상 공인회계사는 동성회계법인 소속이며, 본 사이트는 자문 · 인사이트 활동을 소개하기 위한 개인 브랜드 공간입니다. 회계감사 · 세무신고 등 법정 업무는 동성회계법인을 통해 수행됩니다.",
};

/**
 * Hero background images.
 * 빌딩숲 사진을 public/images/ 아래에 올린 후 경로를 채워주세요.
 * null이면 현재처럼 솔리드 다크 배경 유지.
 *
 * 권장 파일 경로:
 *   public/images/hero-home.jpg     — 1920x1080+ 가로 (홈 히어로)
 *   public/images/hero-about.jpg    — 1920x1080+ 가로 (어바웃 히어로)
 *   public/images/hero-cta.jpg      — 1920x1080+ 가로 (CTA 야경)
 */
export const heroImages = {
  home: null as string | null,
  about: null as string | null,
  cta: null as string | null,
};

export const navLinks = [
  { href: "/", label: "HOME" },
  { href: "/about", label: "ABOUT" },
  { href: "/services", label: "PRACTICE" },
  { href: "/members", label: "PEOPLE" },
  { href: "/clients", label: "WHO" },
  { href: "/blog", label: "INSIGHTS" },
  { href: "/contact", label: "CONTACT" },
];
