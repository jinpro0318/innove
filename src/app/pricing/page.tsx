"use client";

import { motion } from "framer-motion";
import { Check, Gift } from "lucide-react";
import Link from "next/link";
import { useLocale } from "@/hooks/useLocale";

const fadeUp = { initial: { opacity: 0, y: 30 }, animate: { opacity: 1, y: 0 } };

const features = {
  ko: [
    "AI 창업 진단 무제한",
    "사업자등록 가이드",
    "상권분석 지도",
    "세금 달력",
    "정부 지원사업 매칭",
    "12개국 글로벌 가이드",
    "비용 계산기",
  ],
  en: [
    "Unlimited AI Diagnosis",
    "Business Registration Guide",
    "Market Analysis Map",
    "Tax Calendar",
    "Government Grant Matching",
    "12-Country Global Guide",
    "Cost Calculator",
  ],
};

const futureFeatures = {
  ko: {
    free: ["AI 창업 진단 (월 2회)", "기본 사업자등록 가이드", "세금 달력"],
    pro: ["AI 창업 진단 무제한", "상권분석 지도", "정부 지원사업 매칭", "12개국 글로벌 가이드", "비용 계산기", "우선 지원"],
  },
  en: {
    free: ["AI Diagnosis (2/month)", "Basic Registration Guide", "Tax Calendar"],
    pro: ["Unlimited AI Diagnosis", "Market Analysis Map", "Government Grant Matching", "12-Country Global Guide", "Cost Calculator", "Priority Support"],
  },
};

export default function PricingPage() {
  const { locale } = useLocale();
  const isKo = locale === "ko";
  const featureList = isKo ? features.ko : features.en;
  const future = isKo ? futureFeatures.ko : futureFeatures.en;

  return (
    <div className="min-h-screen bg-[#09090B] pt-28 pb-20">
      <div className="mx-auto max-w-2xl px-4 md:px-6">
        {/* Header */}
        <motion.div {...fadeUp} transition={{ duration: 0.5 }} className="text-center">
          <h1 className="text-3xl font-bold text-zinc-100 md:text-4xl lg:text-5xl">
            {isKo ? "베타 기간, 모든 기능 무료" : "All Features Free During Beta"}
          </h1>
          <p className="mt-4 text-lg text-zinc-400 leading-relaxed">
            {isKo
              ? "지금 가입하시면 정식 출시 후에도 특별 혜택을 드립니다"
              : "Sign up now for exclusive benefits after official launch"}
          </p>
        </motion.div>

        {/* Beta free card */}
        <motion.div
          {...fadeUp}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="mt-12 rounded-2xl border border-zinc-700/50 bg-zinc-800/40 p-8 md:p-10"
        >
          {/* Badge */}
          <div className="flex justify-center mb-6">
            <div className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-violet-500/20 to-blue-500/20 border border-violet-500/30 px-4 py-1.5 text-sm font-semibold text-violet-300">
              <Gift size={16} />
              🎁 BETA
            </div>
          </div>

          {/* Price */}
          <div className="flex items-baseline gap-3 justify-center">
            <span className="text-5xl font-bold text-zinc-100">
              {isKo ? "₩0" : "$0"}
            </span>
            <span className="text-zinc-500 text-lg">
              / {isKo ? "월" : "mo"}
            </span>
          </div>
          <p className="mt-1 text-center text-sm text-zinc-500 line-through">
            {isKo ? "₩9,900/월" : "$9.90/mo"}
          </p>

          {/* Features */}
          <ul className="mt-8 space-y-3">
            {featureList.map((feat, i) => (
              <li key={i} className="flex items-center gap-3 text-sm text-zinc-200">
                <Check size={16} className="shrink-0 text-emerald-400" />
                {feat}
              </li>
            ))}
          </ul>

          {/* CTA */}
          <Link
            href="/diagnose"
            className="mt-8 flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-violet-500 to-blue-500 px-8 py-4 text-lg font-semibold text-white shadow-lg shadow-violet-500/25 transition-all duration-200 hover:from-violet-400 hover:to-blue-400 hover:scale-[1.02] active:scale-[0.98]"
          >
            {isKo ? "무료로 시작하기 →" : "Get Started Free →"}
          </Link>

          <p className="mt-4 text-center text-xs text-zinc-500">
            {isKo ? "베타 종료 시 사전에 안내드립니다" : "You will be notified before beta ends"}
          </p>
        </motion.div>

        {/* Future pricing reference */}
        <motion.div
          {...fadeUp}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-16"
        >
          <h2 className="text-center text-lg font-semibold text-zinc-500 mb-8">
            {isKo ? "정식 출시 후 요금제 (참고)" : "Post-Launch Plans (Reference)"}
          </h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {/* Free plan */}
            <div className="rounded-2xl border border-zinc-700/30 bg-zinc-800/20 p-6 opacity-60">
              <h3 className="text-sm font-semibold text-zinc-400">Free</h3>
              <p className="mt-2 text-2xl font-bold text-zinc-500">{isKo ? "₩0" : "$0"}</p>
              <ul className="mt-4 space-y-2">
                {future.free.map((feat, i) => (
                  <li key={i} className="flex items-center gap-2 text-xs text-zinc-500">
                    <Check size={12} className="shrink-0" />
                    {feat}
                  </li>
                ))}
              </ul>
            </div>
            {/* Pro plan */}
            <div className="rounded-2xl border border-zinc-700/30 bg-zinc-800/20 p-6 opacity-60">
              <h3 className="text-sm font-semibold text-zinc-400">Pro</h3>
              <p className="mt-2 text-2xl font-bold text-zinc-500">{isKo ? "₩9,900/월" : "$9.90/mo"}</p>
              <ul className="mt-4 space-y-2">
                {future.pro.map((feat, i) => (
                  <li key={i} className="flex items-center gap-2 text-xs text-zinc-500">
                    <Check size={12} className="shrink-0" />
                    {feat}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <p className="mt-4 text-center text-xs text-zinc-600">
            {isKo ? "정식 요금제는 추후 안내됩니다" : "Official pricing will be announced later"}
          </p>
        </motion.div>
      </div>
    </div>
  );
}
