export type Locale = "ko" | "en";

// Korean lives at the root ("/about"), English under "/en" ("/en/about").
export function localePath(locale: Locale, path: string) {
  if (locale === "ko") return path;
  if (path === "/") return "/en";
  if (path.startsWith("/#")) return `/en${path.slice(1)}`;
  return `/en${path}`;
}

// Same page in the other language: "/projects/x" <-> "/en/projects/x".
export function switchLocalePath(pathname: string, to: Locale) {
  const base = pathname.replace(/^\/en(?=\/|$)/, "") || "/";
  return localePath(to, base);
}

export const ui = {
  ko: {
    home: "홈으로",
    mainNav: "주요 메뉴",
    viewProjects: "프로젝트 보기 ↓",
    allProjects: "← 전체 프로젝트",
    moreProjects: "다른 프로젝트",
    nameSuffix: "김지연",
    switchLabel: "Read in English",
  },
  en: {
    home: "Home",
    mainNav: "Main menu",
    viewProjects: "View projects ↓",
    allProjects: "← All projects",
    moreProjects: "More projects",
    nameSuffix: "Jiyeon Kim",
    switchLabel: "한국어로 보기",
  },
} as const;
