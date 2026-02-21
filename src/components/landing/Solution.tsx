"use client";

import { motion } from "framer-motion";
import { useLocale } from "@/hooks/useLocale";

const fadeUp = { initial: { opacity: 0, y: 30 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true, margin: "-50px" } };

export default function Solution() {
  const { t, tArray } = useLocale();
  const beforeItems = tArray("solution.before_items") as string[];
  const afterItems = tArray("solution.after_items") as string[];

  return (
    <section className="relative py-20 lg:py-28">
      <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[500px] w-[600px] rounded-full bg-accent/5 blur-[120px]" />
      <div className="relative mx-auto max-w-7xl px-6">
        <motion.div {...fadeUp} transition={{ duration: 0.5 }}>
          <span className="text-sm font-semibold uppercase tracking-wider text-accent">{t("solution.label")}</span>
        </motion.div>
        <motion.h2 {...fadeUp} transition={{ duration: 0.5, delay: 0.1 }} className="mt-4 max-w-2xl text-3xl font-bold leading-snug md:text-4xl lg:text-5xl">
          {t("solution.title")}<br />
          <span className="bg-gradient-to-r from-accent to-[#00B884] bg-clip-text text-transparent">{t("solution.subtitle")}</span>
        </motion.h2>
        <div className="mt-12 grid gap-6 md:grid-cols-2">
          <motion.div {...fadeUp} transition={{ duration: 0.5, delay: 0.15 }} className="rounded-2xl border border-red-500/10 bg-white/[0.03] p-6 md:p-8">
            <div className="mb-5 flex items-center gap-2">
              <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-red-500/10 text-sm">😩</span>
              <span className="text-sm font-semibold text-red-400">{t("solution.before_title")}</span>
            </div>
            <div className="space-y-4">
              {beforeItems.map((item, i) => (
                <div key={i} className="flex items-start gap-3 rounded-xl bg-red-500/5 px-4 py-3">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-red-500/15 text-xs text-red-400">✕</span>
                  <span className="text-sm text-gray-300">{item}</span>
                </div>
              ))}
            </div>
          </motion.div>
          <motion.div {...fadeUp} transition={{ duration: 0.5, delay: 0.25 }} className="rounded-2xl border border-accent/15 bg-white/[0.03] p-6 md:p-8">
            <div className="mb-5 flex items-center gap-2">
              <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-accent/10 text-sm">🚀</span>
              <span className="text-sm font-semibold text-accent">{t("solution.after_title")}</span>
            </div>
            <div className="space-y-4">
              {afterItems.map((item, i) => (
                <div key={i} className="flex items-start gap-3 rounded-xl bg-accent/5 px-4 py-3">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent/15 text-xs text-accent">✓</span>
                  <span className="text-sm text-gray-300">{item}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
