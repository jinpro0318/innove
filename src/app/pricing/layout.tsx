import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "요금제",
  description: "StartupMate 요금제. 무료로 시작하고, Pro로 업그레이드하세요.",
};

export default function PricingLayout({ children }: { children: React.ReactNode }) {
  return children;
}
