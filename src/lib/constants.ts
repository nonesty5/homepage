export const siteConfig = {
  name: "메리디안 택스 어드바이저리",
  title: "MERIDIAN",
  tagline: "기장에서 가치평가까지, 가장 가까운 파트너",
  description:
    "법인 · 개인사업자의 세무 기장 · 세무 조정 · 세무 자문부터 기업가치평가 · M&A · IPO 자문까지. Big4 회계법인 · 자본시장 IB 경력의 공인회계사가 직접 수행합니다.",
  url: "https://meridian-advisory.com",
  email: "mscpa@dscpa.co.kr",
  phone: "010-3300-7339",
  location: "Seoul · Online Meeting",
  founder: "박민상",
  affiliation:
    "박민상 공인회계사는 동성회계법인 소속이며, 본 사이트는 자문 · 인사이트 활동을 소개하기 위한 개인 브랜드 공간입니다. 회계감사 · 세무 기장 · 세무 조정 · 세무 신고 등 법정 업무는 모두 동성회계법인 명의로 정식 수행됩니다.",
  clientPortalUrl: "https://hometax-dashboard.vercel.app",
  pricingUrl: "https://pricemodule-gules.vercel.app",
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

/**
 * Image credits — CC BY/CC BY-SA 사진의 attribution.
 * 사진을 다시 추가할 때 채워주세요.
 */
export const imageCredits: Array<{
  title: string;
  photographer: string;
  license: string;
  source: string;
  sourceUrl: string;
}> = [];

export const navLinks = [
  { href: "/", label: "HOME" },
  { href: "/about", label: "ABOUT" },
  { href: "/services", label: "PRACTICE" },
  { href: "/members", label: "PEOPLE" },
  { href: "/clients", label: "WHO" },
  { href: "/blog", label: "INSIGHTS" },
  { href: "/contact", label: "CONTACT" },
];
