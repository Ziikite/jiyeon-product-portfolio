import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "김지연 — Service Planner",
  description:
    "사용자 데이터와 맥락을 연결해 실행 가능한 경험을 설계하는 서비스 기획자 김지연의 포트폴리오입니다.",
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
