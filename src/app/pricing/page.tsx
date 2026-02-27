"use client";

import { motion } from "framer-motion";
import { Check, Sparkles } from "lucide-react";
import Link from "next/link";
import { useLocale } from "@/hooks/useLocale";

const fadeUp = { initial: { opacity: 0, y: 30 }, animate: { opacity: 1, y: 0 } };

const features = {
  ko: [
    "AI 창업 진단 무제한",
    "맞춤형 사업 로드맵",
    "사업자등록 가이드",
    "상권 분석 지도",
    "경쟁업체 분석",
    "AI 인사이트 리포트",
    "매출 추정 분석",
    "정부 지원사업 매칭",
    "12개국 글로벌 가이드",
    "우선 지원",
  ],
  en: [
    "Unlimited AI Diagnosis",
    "Custom Business Roadmap",
    "Business Registration Guide",
    "Market Analysis Map",
    "Competitor Analysis",
    "AI Insight Reports",
    "Revenue Estimation",
    "Government Grant Matching",
    "12-Country Global Guides",
    "Priority Support",
  ],
};

export default function PricingPage() {
  const { locale } = useLocale();
  const isKo = locale === "ko";
  const featureList = isKo ? features.ko : features.en;

  return (
    <div className="min-h-screen bg-[#0A0A0F] pt-28 pb-20">
      <div className="mx-auto max-w-2xl px-6">
        <motion.div {...fadeUp} transition={{ duration: 0.5 }} className="text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-4 py-1.5 text-sm font-medium text-emerald-400 mb-6">
            <Sparkles size={16} />
            {isKo ? "베타 기간 모든 기능 무료" : "All Features Free During Beta"}
          </div>
          <h1 className="text-3xl font-bold md:text-4xl lg:text-5xl">
            {isKo ? "모든 기능, 완전 무료" : "All Features, Completely Free"}
          </h1>
          <p className="mt-4 text-gray-400 leading-relaxed">
            {isKo
              ? "현재 베타 테스트 기간 동안 모든 프리미엄 기능을\n무료로 이용하실 수 있습니다."
              : "All premium features are available for free\nduring our beta testing period."}
          </p>
        </motion.div>

        <motion.div
          {...fadeUp}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="mt-12 rounded-2xl border border-emerald-500/20 bg-white/[0.03] p-8 md:p-10"
        >
          <div className="flex items-baseline gap-2 justify-center">
            <span className="text-5xl font-bold">
              {isKo ? "₩0" : "$0"}
            </span>
            <span className="text-gray-500 text-lg">
              / {isKo ? "월" : "mo"}
            </span>
          </div>
          <p className="mt-2 text-center text-sm text-emerald-400 font-medium">
            {isKo ? "모든 기능 포함" : "All features included"}
          </p>

          <ul className="mt-8 space-y-3">
            {featureList.map((feat, i) => (
              <li key={i} className="flex items-center gap-3 text-sm text-gray-300">
                <Check size={16} className="shrink-0 text-emerald-400" />
                {feat}
              </li>
            ))}
          </ul>

          <Link
            href="/diagnose"
            className="mt-8 flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 to-blue-600 py-3.5 text-sm font-semibold text-white shadow-lg shadow-violet-500/25 transition-all duration-200 hover:from-violet-500 hover:to-blue-500 hover:scale-[1.02] active:scale-[0.98]"
          >
            {isKo ? "무료로 시작하기" : "Get Started Free"}
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
