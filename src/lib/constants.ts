export const siteConfig = {
  name: "메리디안 택스 어드바이저리",
  title: "MERIDIAN",
  tagline: "세무부터 거래 자문까지, 한 사람이 끝까지 보는 부티크 자문.",
  description:
    "매일의 기장에서 시작해 세무 신고로 정리되고, 그 숫자 위에서 가치평가와 M&A 자문으로 이어집니다. 이 흐름이 끊기지 않도록, 박민상 공인회계사가 직접 책임집니다.",
  url: "https://meridian-advisory.com",
  email: "mscpa@dscpa.co.kr",
  phone: "010-3300-7339",
  location: "Seoul · Online Meeting",
  founder: "박민상",
  affiliation:
    "박민상 공인회계사는 동성회계법인 소속이며, 본 사이트는 자문 · 인사이트 활동을 소개하기 위한 개인 브랜드 공간입니다. 회계감사 · 세무 기장 · 세무 조정 · 세무 신고 등 법정 업무는 모두 동성회계법인 명의로 정식 수행됩니다.",
  clientPortalUrl: "https://hometax-dashboard.vercel.app",
  pricingUrl: "/pricing",
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
