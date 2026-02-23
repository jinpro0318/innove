"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useLocale } from "@/hooks/useLocale";

const fadeUp = { initial: { opacity: 0, y: 30 }, animate: { opacity: 1, y: 0 } };

export default function Hero() {
  const { t } = useLocale();

  return (
    <section className="relative overflow-hidden pt-28 pb-12 lg:pt-36 lg:pb-20">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 h-[600px] w-[800px] rounded-full bg-violet-500/8 blur-[150px]" />
        <div className="absolute top-40 right-0 h-[300px] w-[300px] rounded-full bg-blue-500/6 blur-[120px]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Left: Text */}
          <div>
            <motion.div {...fadeUp} transition={{ duration: 0.5 }}>
              <span className="inline-block rounded-full bg-gradient-to-r from-violet-500/15 to-blue-500/15 px-4 py-1.5 text-sm font-semibold text-violet-400 border border-violet-500/20">
                {t("hero.badge")}
              </span>
            </motion.div>

            <motion.h1
              {...fadeUp}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="mt-6 text-4xl font-bold leading-tight tracking-tight text-zinc-100 md:text-5xl lg:text-6xl"
            >
              {t("hero.title1")}
              <br />
              <span className="bg-gradient-to-r from-violet-400 to-blue-400 bg-clip-text text-transparent">
                {t("hero.title2")}
              </span>
            </motion.h1>

            <motion.p
              {...fadeUp}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mt-6 max-w-lg text-base leading-relaxed text-zinc-400 md:text-lg"
            >
              {t("hero.subtitle").split("\n").map((line, i) => (
                <span key={i}>
                  {line}
                  {i === 0 && <br />}
                </span>
              ))}
            </motion.p>

            <motion.div {...fadeUp} transition={{ duration: 0.5, delay: 0.3 }} className="mt-8">
              <Link
                href="/diagnose"
                className="inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-violet-600 to-blue-600 px-8 py-4 text-base font-semibold text-white shadow-lg shadow-violet-500/20 transition-all duration-200 hover:from-violet-500 hover:to-blue-500 hover:scale-105 active:scale-95"
              >
                {t("hero.cta_primary")}
              </Link>
              <p className="mt-4 text-sm text-zinc-500">{t("hero.trust")}</p>
            </motion.div>
          </div>

          {/* Right: Product Preview Cards */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="relative flex justify-center lg:justify-end"
          >
            <div className="relative w-full max-w-[420px] h-[380px] sm:h-[420px]">
              {/* Card 3 (back) - Cost */}
              <motion.div
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute top-0 right-0 w-[240px] sm:w-[260px] rotate-2 z-10"
              >
                <div className="rounded-2xl border border-zinc-800 bg-zinc-900/80 p-5 shadow-2xl backdrop-blur-sm">
                  <p className="text-sm font-semibold text-zinc-300">{t("hero.card3_title")}</p>
                  <p className="mt-3 text-lg font-bold text-zinc-100">{t("hero.card3_total")}</p>
                  <div className="mt-4 space-y-2.5">
                    <BarItem label={t("hero.card3_bar1")} width="70%" color="from-violet-500 to-violet-400" />
                    <BarItem label={t("hero.card3_bar2")} width="50%" color="from-blue-500 to-blue-400" />
                    <BarItem label={t("hero.card3_bar3")} width="30%" color="from-cyan-500 to-cyan-400" />
                  </div>
                </div>
              </motion.div>

              {/* Card 2 (middle) - Commercial Analysis */}
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                className="absolute top-16 right-12 sm:right-16 w-[240px] sm:w-[260px] rotate-1 z-20"
              >
                <div className="rounded-2xl border border-zinc-800 bg-zinc-900/80 p-5 shadow-2xl backdrop-blur-sm">
                  <p className="text-sm font-semibold text-zinc-300">{t("hero.card2_title")}</p>
                  <div className="mt-3 rounded-xl bg-zinc-800/50 p-3 border border-zinc-700/50">
                    <div className="flex items-center gap-2">
                      <div className="h-2 w-2 rounded-full bg-red-400" />
                      <div className="h-2 w-2 rounded-full bg-blue-400" />
                      <div className="h-2 w-2 rounded-full bg-green-400" />
                      <span className="ml-auto text-[10px] text-zinc-500">Map</span>
                    </div>
                    <div className="mt-2 h-12 rounded-lg bg-zinc-700/30 flex items-center justify-center">
                      <span className="text-xs text-zinc-500">📍 🗺️</span>
                    </div>
                  </div>
                  <p className="mt-3 text-xs text-zinc-400">{t("hero.card2_desc")}</p>
                </div>
              </motion.div>

              {/* Card 1 (front, largest) - Checklist */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-32 left-0 w-[270px] sm:w-[300px] z-30"
              >
                <div className="rounded-2xl border border-zinc-700 bg-zinc-900/90 p-5 shadow-2xl backdrop-blur-sm">
                  <p className="text-sm font-semibold text-zinc-200">{t("hero.card1_title")}</p>
                  <div className="mt-4 space-y-2.5">
                    <p className="text-xs text-emerald-400">{t("hero.card1_item1")}</p>
                    <p className="text-xs text-zinc-500">{t("hero.card1_item2")}</p>
                    <p className="text-xs text-zinc-500">{t("hero.card1_item3")}</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function BarItem({ label, width, color }: { label: string; width: string; color: string }) {
  return (
    <div>
      <div className="flex justify-between text-xs mb-1">
        <span className="text-zinc-500">{label}</span>
      </div>
      <div className="h-2 rounded-full bg-zinc-800">
        <div className={`h-full rounded-full bg-gradient-to-r ${color}`} style={{ width }} />
      </div>
    </div>
  );
}
