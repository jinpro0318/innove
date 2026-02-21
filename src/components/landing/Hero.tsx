"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useLocale } from "@/hooks/useLocale";

const fadeUp = { initial: { opacity: 0, y: 30 }, animate: { opacity: 1, y: 0 } };

export default function Hero() {
  const { t } = useLocale();
  const stats = [
    { value: t("hero.stat1_value"), label: t("hero.stat1_label") },
    { value: t("hero.stat2_value"), label: t("hero.stat2_label") },
    { value: t("hero.stat3_value"), label: t("hero.stat3_label") },
    { value: t("hero.stat4_value"), label: t("hero.stat4_label") },
  ];

  return (
    <section className="relative overflow-hidden pt-28 pb-16 lg:pt-36 lg:pb-24">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 h-[600px] w-[800px] rounded-full bg-primary/10 blur-[120px]" />
        <div className="absolute top-40 right-0 h-[400px] w-[400px] rounded-full bg-accent/8 blur-[100px]" />
      </div>
      <div className="relative mx-auto max-w-7xl px-6">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <motion.div {...fadeUp} transition={{ duration: 0.5 }} className="mb-6">
              <span className="inline-block rounded-full bg-primary/15 px-4 py-1.5 text-sm font-medium text-primary border border-primary/20">{t("hero.badge")}</span>
            </motion.div>
            <motion.h1 {...fadeUp} transition={{ duration: 0.5, delay: 0.1 }} className="text-3xl font-bold leading-tight tracking-tight sm:text-4xl lg:text-5xl">
              {t("hero.title1")}<br />
              <span className="bg-gradient-to-r from-[#00D2A0] to-[#00B884] bg-clip-text text-transparent">{t("hero.title2")}</span>
            </motion.h1>
            <motion.p {...fadeUp} transition={{ duration: 0.5, delay: 0.2 }} className="mt-5 max-w-lg text-base leading-relaxed text-gray-400 sm:text-lg">
              {t("hero.subtitle").split("\n").map((line, i) => (<span key={i}>{line}{i === 0 && <br className="hidden sm:block" />}</span>))}
            </motion.p>
            <motion.div {...fadeUp} transition={{ duration: 0.5, delay: 0.3 }} className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link href="/diagnose" className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-purple-600 to-purple-500 px-8 py-4 text-sm font-semibold text-white shadow-lg shadow-purple-500/25 transition-all duration-200 hover:from-purple-500 hover:to-purple-400 hover:scale-105 active:scale-95">
                {t("hero.cta_primary")}
              </Link>
              <a href="#features" className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/20 px-8 py-4 text-sm font-semibold text-gray-300 transition-all duration-200 hover:bg-white/5 hover:text-white">
                {t("hero.cta_secondary")}
              </a>
            </motion.div>
            <motion.div {...fadeUp} transition={{ duration: 0.5, delay: 0.4 }} className="mt-12 grid grid-cols-4 gap-4">
              {stats.map((stat, i) => (
                <div key={i} className="text-center sm:text-left">
                  <div className="text-xl font-bold text-white sm:text-2xl">{stat.value}</div>
                  <div className="mt-0.5 text-xs text-gray-500">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </div>
          <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.3 }} className="flex justify-center lg:justify-end">
            <PhoneMockup />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function PhoneMockup() {
  const { t } = useLocale();
  const chatMessages = [
    { type: "ai" as const, text: t("hero.phone_ai1") },
    { type: "chips" as const, items: [t("hero.phone_chip1"), t("hero.phone_chip2"), t("hero.phone_chip3")] },
    { type: "user" as const, text: t("hero.phone_user") },
    { type: "ai" as const, text: t("hero.phone_ai2") },
  ];

  return (
    <motion.div animate={{ y: [0, -12, 0] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }} className="relative">
      <div className="absolute inset-0 rounded-[3rem] bg-gradient-to-br from-primary/20 to-accent/20 blur-2xl scale-95" />
      <div className="relative w-[280px] rounded-[2.5rem] border border-white/10 bg-[#111118] p-2 shadow-2xl sm:w-[300px]">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 h-6 w-28 rounded-b-2xl bg-[#111118] z-10" />
        <div className="rounded-[2rem] bg-[#0A0A0F] px-4 pb-5 pt-8 min-h-[480px] flex flex-col">
          <div className="mb-4 flex items-center gap-2">
            <span className="text-lg">🚀</span>
            <span className="text-sm font-bold text-white">{t("hero.phone_title")}</span>
            <span className="ml-auto flex items-center gap-1 text-xs text-accent">
              <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse" />{t("hero.phone_status")}
            </span>
          </div>
          <div className="flex flex-1 flex-col gap-3">
            {chatMessages.map((msg, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 + i * 0.4, duration: 0.4 }}>
                {msg.type === "ai" && <div className="max-w-[85%] rounded-2xl rounded-tl-md bg-[#1A1A2E] px-3.5 py-2.5 text-xs leading-relaxed text-gray-200">{msg.text}</div>}
                {msg.type === "user" && <div className="ml-auto max-w-[75%] rounded-2xl rounded-tr-md bg-gradient-to-r from-purple-600 to-purple-500 px-3.5 py-2.5 text-xs leading-relaxed text-white">{msg.text}</div>}
                {msg.type === "chips" && <div className="flex flex-wrap gap-1.5">{msg.items!.map((chip, j) => (<span key={j} className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[10px] text-gray-300">{chip}</span>))}</div>}
              </motion.div>
            ))}
          </div>
          <div className="mt-3 flex items-center gap-2 rounded-full bg-white/5 border border-white/10 px-3 py-2">
            <span className="text-xs text-gray-500 flex-1">{t("hero.phone_placeholder")}</span>
            <div className="h-6 w-6 rounded-full bg-primary flex items-center justify-center"><span className="text-[10px] text-white">↑</span></div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
