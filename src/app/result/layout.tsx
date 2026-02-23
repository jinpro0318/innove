import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "진단 결과",
  description: "AI 맞춤 창업 로드맵. 단계별 체크리스트, 세금 달력, 정부 지원사업을 확인하세요.",
};

export default function ResultLayout({ children }: { children: React.ReactNode }) {
  return children;
}
