"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Check, Gift } from "lucide-react";
import { useLocale } from "@/hooks/useLocale";

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-50px" },
};

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

export default function Pricing() {
  const { locale } = useLocale();
  const isKo = locale === "ko";
  const featureList = isKo ? features.ko : features.en;

  return (
    <section id="pricing" className="relative py-20 md:py-28 border-t border-zinc-800/50">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <motion.div {...fadeUp} transition={{ duration: 0.5 }} className="text-center">
          <h2 className="text-3xl font-bold text-zinc-100 md:text-4xl lg:text-5xl">
            {isKo ? "베타 기간, 모든 기능 무료" : "All Features Free During Beta"}
          </h2>
          <p className="mt-4 text-lg text-zinc-400">
            {isKo
              ? "지금 가입하시면 정식 출시 후에도 특별 혜택을 드립니다"
              : "Sign up now for exclusive benefits after official launch"}
          </p>
        </motion.div>

        <div className="mx-auto mt-14 max-w-lg">
          <motion.div
            {...fadeUp}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="rounded-2xl border border-zinc-700/50 bg-zinc-800/40 p-8 text-center hover:border-violet-500/40 transition-all duration-300"
          >
            {/* BETA badge */}
            <div className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-violet-500/20 to-blue-500/20 border border-violet-500/30 px-4 py-1.5 text-sm font-semibold text-violet-300 mb-6">
              <Gift size={16} />
              {isKo ? "🎁 BETA" : "🎁 BETA"}
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-3 justify-center">
              <span className="text-5xl font-bold text-zinc-100">{isKo ? "₩0" : "$0"}</span>
              <span className="text-zinc-500 text-lg">/ {isKo ? "월" : "mo"}</span>
            </div>
            <p className="mt-1 text-sm text-zinc-500 line-through">
              {isKo ? "₩9,900/월" : "$9.90/mo"}
            </p>

            {/* Features */}
            <ul className="mt-8 space-y-3 text-left">
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
              className="mt-8 flex w-full items-center justify-center rounded-xl bg-gradient-to-r from-violet-500 to-blue-500 px-8 py-4 text-lg font-semibold text-white shadow-lg shadow-violet-500/20 transition-all duration-200 hover:from-violet-400 hover:to-blue-400 hover:scale-[1.02] active:scale-[0.98]"
            >
              {isKo ? "무료로 시작하기 →" : "Get Started Free →"}
            </Link>

            <p className="mt-4 text-xs text-zinc-500">
              {isKo ? "베타 종료 시 사전에 안내드립니다" : "You will be notified before beta ends"}
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
