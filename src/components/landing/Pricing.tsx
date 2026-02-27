"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Check, Sparkles } from "lucide-react";
import { useLocale } from "@/hooks/useLocale";

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-50px" },
};

const features = {
  ko: [
    "AI 창업 진단 무제한",
    "맞춤형 사업 로드맵",
    "사업자등록 가이드",
    "상권 분석 지도",
    "경쟁업체 분석",
    "AI 인사이트 리포트",
    "정부 지원사업 매칭",
  ],
  en: [
    "Unlimited AI Diagnosis",
    "Custom Business Roadmap",
    "Business Registration Guide",
    "Market Analysis Map",
    "Competitor Analysis",
    "AI Insight Reports",
    "Government Grant Matching",
  ],
};

export default function Pricing() {
  const { locale } = useLocale();
  const isKo = locale === "ko";
  const featureList = isKo ? features.ko : features.en;

  return (
    <section id="pricing" className="relative py-24 md:py-32 bg-zinc-950/30">
      <div className="mx-auto max-w-7xl px-6">
        <motion.h2
          {...fadeUp}
          transition={{ duration: 0.5 }}
          className="text-center text-4xl font-bold text-zinc-100 md:text-5xl lg:text-6xl"
        >
          {isKo ? "모든 기능, 완전 무료" : "All Features, Completely Free"}
        </motion.h2>

        <div className="mx-auto mt-14 max-w-lg">
          <motion.div
            {...fadeUp}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="rounded-2xl border border-emerald-500/20 bg-zinc-900/50 p-8 text-center"
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-4 py-1.5 text-sm font-medium text-emerald-400 mb-4">
              <Sparkles size={16} />
              {isKo ? "베타 기간 무료" : "Free During Beta"}
            </div>
            <div className="flex items-baseline gap-2 justify-center">
              <span className="text-4xl font-bold text-zinc-100">{isKo ? "₩0" : "$0"}</span>
              <span className="text-zinc-500">/ {isKo ? "월" : "mo"}</span>
            </div>
            <p className="mt-2 text-sm text-emerald-400 font-medium">
              {isKo ? "모든 프리미엄 기능 포함" : "All premium features included"}
            </p>
            <ul className="mt-6 space-y-3 text-left">
              {featureList.map((feat, i) => (
                <li key={i} className="flex items-center gap-3 text-sm text-zinc-300">
                  <Check size={16} className="shrink-0 text-emerald-400" />
                  {feat}
                </li>
              ))}
            </ul>
            <Link
              href="/diagnose"
              className="mt-8 flex w-full items-center justify-center rounded-xl bg-gradient-to-r from-violet-600 to-blue-600 py-3 text-sm font-semibold text-white shadow-lg shadow-violet-500/20 transition-all duration-200 hover:from-violet-500 hover:to-blue-500 hover:scale-[1.02] active:scale-[0.98]"
            >
              {isKo ? "무료로 시작하기" : "Get Started Free"}
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
