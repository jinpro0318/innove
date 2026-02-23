import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI 창업 진단",
  description: "AI가 분석하는 맞춤 창업 로드맵. 2분이면 나만의 창업 가이드를 받아보세요.",
};

export default function DiagnoseLayout({ children }: { children: React.ReactNode }) {
  return children;
}
