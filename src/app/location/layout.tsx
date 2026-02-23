import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "상권분석 지도",
  description: "Google Maps 기반 상권분석. 경쟁업체, 매출 추정, AI 인사이트를 한눈에 확인하세요.",
};

export default function LocationLayout({ children }: { children: React.ReactNode }) {
  return children;
}
