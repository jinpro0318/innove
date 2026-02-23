import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "문의하기",
  description: "StartupMate에 문의하세요. 일반 문의, 기능 제안, 제휴 문의를 환영합니다.",
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children;
}
