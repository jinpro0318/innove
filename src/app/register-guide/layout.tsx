import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "사업자등록 가이드",
  description: "업종코드, 과세유형, 사업장 유형까지. 사업자등록 절차를 단계별로 안내합니다.",
};

export default function RegisterGuideLayout({ children }: { children: React.ReactNode }) {
  return children;
}
