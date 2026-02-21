"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useLocale } from "@/hooks/useLocale";

const fadeUp = { initial: { opacity: 0, y: 30 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true, margin: "-50px" } };

export default function CTA() {
  const { t, tArray } = useLocale();
  const failItems = tArray("cta_section.fail_items") as string[];
  const successItems = tArray("cta_section.success_items") as string[];

  return (
    <section className="relative py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-6">
        <motion.h2 {...fadeUp} transition={{ duration: 0.5 }} className="text-center text-3xl font-bold md:text-4xl lg:text-5xl">
          {t("cta_section.title1")}<br />{t("cta_section.title2")}
        </motion.h2>
        <div className="mx-auto mt-12 grid max-w-3xl gap-5 sm:grid-cols-2">
          <motion.div {...fadeUp} transition={{ duration: 0.5, delay: 0.1 }} className="rounded-2xl border border-red-500/10 bg-white/[0.03] p-6 md:p-8">
            <span className="text-4xl">😰</span>
            <h3 className="mt-4 text-lg font-semibold text-red-400">{t("cta_section.fail_title")}</h3>
            <ul className="mt-4 space-y-2.5 text-sm text-gray-400">
              {failItems.map((item, i) => (<li key={i} className="flex items-start gap-2"><span className="mt-0.5 text-red-400/60">✕</span>{item}</li>))}
            </ul>
          </motion.div>
          <motion.div {...fadeUp} transition={{ duration: 0.5, delay: 0.2 }} className="rounded-2xl border border-accent/15 bg-white/[0.03] p-6 md:p-8">
            <span className="text-4xl">🚀</span>
            <h3 className="mt-4 text-lg font-semibold text-accent">{t("cta_section.success_title")}</h3>
            <ul className="mt-4 space-y-2.5 text-sm text-gray-300">
              {successItems.map((item, i) => (<li key={i} className="flex items-start gap-2"><span className="mt-0.5 text-accent">✓</span>{item}</li>))}
            </ul>
          </motion.div>
        </div>
        <motion.div {...fadeUp} transition={{ duration: 0.5, delay: 0.3 }} className="mt-12 text-center">
          <Link href="/diagnose" className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-purple-600 to-purple-500 px-8 py-4 text-base font-semibold text-white shadow-lg shadow-purple-500/25 transition-all duration-200 hover:from-purple-500 hover:to-purple-400 hover:scale-105 active:scale-95">
            {t("cta_section.button")}
          </Link>
          <p className="mt-3 text-sm text-gray-500">{t("cta_section.bottom")}</p>
        </motion.div>
      </div>
    </section>
  );
}
