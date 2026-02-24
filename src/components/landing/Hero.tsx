"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useLocale } from "@/hooks/useLocale";

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
};

export default function Hero() {
  const { t } = useLocale();

  return (
    <section className="relative overflow-hidden pt-28 pb-16 lg:pt-36 lg:pb-24">
      {/* Background glows */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 h-[600px] w-[800px] rounded-full bg-violet-500/8 blur-[150px]" />
        <div className="absolute top-40 right-0 h-[300px] w-[300px] rounded-full bg-emerald-500/6 blur-[120px]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Left: Text */}
          <div>
            <motion.div {...fadeUp} transition={{ duration: 0.5 }}>
              <span className="inline-block rounded-full bg-violet-500/10 px-4 py-1.5 text-sm font-medium text-violet-300 border border-violet-500/20">
                {t("hero.badge")}
              </span>
            </motion.div>

            <motion.h1
              {...fadeUp}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="mt-6 text-4xl font-bold leading-tight tracking-tight text-zinc-100 md:text-5xl lg:text-[3.5rem]"
            >
              {t("hero.title1")}
              <br />
              <span className="bg-gradient-to-r from-emerald-400 to-green-400 bg-clip-text text-transparent">
                {t("hero.title2")}
              </span>
            </motion.h1>

            <motion.p
              {...fadeUp}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mt-6 max-w-lg text-base leading-relaxed text-zinc-400 md:text-lg"
            >
              {t("hero.subtitle")}
            </motion.p>

            <motion.div
              {...fadeUp}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="mt-8 flex flex-wrap items-center gap-4"
            >
              <Link
                href="/diagnose"
                className="inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-violet-600 to-violet-500 px-7 py-3.5 text-base font-semibold text-white shadow-lg shadow-violet-500/25 transition-all duration-200 hover:from-violet-500 hover:to-violet-400 hover:scale-105 active:scale-95"
              >
                {t("hero.cta_primary")}
              </Link>
              <a
                href="#features"
                className="inline-flex items-center gap-2 rounded-2xl border border-zinc-700 px-7 py-3.5 text-base font-semibold text-zinc-300 transition-all duration-200 hover:border-zinc-500 hover:text-white hover:bg-white/5"
              >
                {t("hero.cta_secondary")}
              </a>
            </motion.div>
          </div>

          {/* Right: Phone Mockup */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="flex justify-center lg:justify-end"
          >
            <motion.div
              animate={{ y: [0, -12, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            >
              <PhoneMockup t={t} />
            </motion.div>
          </motion.div>
        </div>

        {/* Stats */}
        <motion.div
          {...fadeUp}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-16 grid grid-cols-2 gap-4 sm:grid-cols-4 lg:mt-20"
        >
          {(
            [
              ["stat1_value", "stat1_label"],
              ["stat2_value", "stat2_label"],
              ["stat3_value", "stat3_label"],
              ["stat4_value", "stat4_label"],
            ] as const
          ).map(([vKey, lKey]) => (
            <div
              key={vKey}
              className="rounded-2xl border border-zinc-800/60 bg-zinc-900/40 px-5 py-4 text-center backdrop-blur-sm"
            >
              <p className="text-2xl font-bold bg-gradient-to-r from-violet-400 to-emerald-400 bg-clip-text text-transparent">
                {t(`hero.${vKey}`)}
              </p>
              <p className="mt-1 text-xs text-zinc-500">{t(`hero.${lKey}`)}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* ── CSS Phone Mockup ── */
function PhoneMockup({ t }: { t: (key: string) => string }) {
  return (
    <div className="relative w-[280px] sm:w-[320px]">
      {/* Phone frame */}
      <div className="rounded-[2.5rem] border-2 border-zinc-700/80 bg-[#111118] p-2 shadow-2xl shadow-black/50">
        {/* Notch */}
        <div className="mx-auto mb-2 h-6 w-28 rounded-full bg-zinc-900 border border-zinc-800" />

        {/* Screen */}
        <div className="rounded-[2rem] bg-[#0A0A0F] px-4 py-4 min-h-[420px] sm:min-h-[460px] flex flex-col">
          {/* Header */}
          <div className="flex items-center gap-2 pb-3 border-b border-zinc-800/60">
            <span className="text-lg">🚀</span>
            <span className="text-sm font-bold text-zinc-200">
              {t("hero.phone_title")}
            </span>
            <span className="ml-auto flex items-center gap-1">
              <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-[10px] text-emerald-400">
                {t("hero.phone_status")}
              </span>
            </span>
          </div>

          {/* Chat area */}
          <div className="mt-4 flex-1 space-y-3">
            {/* AI message 1 */}
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8, duration: 0.4 }}
            >
              <div className="max-w-[85%] rounded-2xl rounded-tl-md bg-zinc-800/80 px-3.5 py-2.5">
                <p className="text-xs leading-relaxed text-zinc-200">
                  {t("hero.phone_ai1")}
                </p>
              </div>
            </motion.div>

            {/* Chips */}
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2, duration: 0.4 }}
              className="flex flex-wrap gap-1.5 pl-1"
            >
              {(["phone_chip1", "phone_chip2", "phone_chip3"] as const).map(
                (key, i) => (
                  <span
                    key={key}
                    className={`rounded-full border px-2.5 py-1 text-[10px] transition-colors ${
                      i === 1
                        ? "border-violet-500/40 bg-violet-500/10 text-violet-300"
                        : "border-zinc-700 bg-zinc-800/50 text-zinc-400"
                    }`}
                  >
                    {t(`hero.${key}`)}
                  </span>
                )
              )}
            </motion.div>

            {/* User message */}
            <motion.div
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.8, duration: 0.4 }}
              className="flex justify-end"
            >
              <div className="max-w-[75%] rounded-2xl rounded-tr-md bg-violet-600 px-3.5 py-2.5">
                <p className="text-xs text-white">{t("hero.phone_user")}</p>
              </div>
            </motion.div>

            {/* AI message 2 */}
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 2.4, duration: 0.4 }}
            >
              <div className="max-w-[85%] rounded-2xl rounded-tl-md bg-zinc-800/80 px-3.5 py-2.5">
                <p className="text-xs leading-relaxed text-zinc-200">
                  {t("hero.phone_ai2")}
                </p>
              </div>
            </motion.div>

            {/* Loading indicator */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 3.0, duration: 0.4 }}
              className="flex items-center gap-2 pl-1"
            >
              <div className="flex gap-1">
                <span className="h-1.5 w-1.5 rounded-full bg-violet-400 animate-bounce [animation-delay:0ms]" />
                <span className="h-1.5 w-1.5 rounded-full bg-violet-400 animate-bounce [animation-delay:150ms]" />
                <span className="h-1.5 w-1.5 rounded-full bg-violet-400 animate-bounce [animation-delay:300ms]" />
              </div>
              <span className="text-[10px] text-zinc-500">
                로드맵 생성 중...
              </span>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Glow behind phone */}
      <div className="pointer-events-none absolute -inset-8 -z-10 rounded-full bg-violet-500/10 blur-3xl" />
    </div>
  );
}
