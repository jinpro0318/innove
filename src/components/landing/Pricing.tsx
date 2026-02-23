"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { useLocale } from "@/hooks/useLocale";

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-50px" },
};

export default function Pricing() {
  const { t, tArray } = useLocale();
  const freeFeatures = tArray("pricing_section.free_features") as string[];
  const proFeatures = tArray("pricing_section.pro_features") as string[];

  return (
    <section id="pricing" className="relative py-24 md:py-32 bg-zinc-950/30">
      <div className="mx-auto max-w-7xl px-6">
        <motion.h2
          {...fadeUp}
          transition={{ duration: 0.5 }}
          className="text-center text-4xl font-bold text-zinc-100 md:text-5xl lg:text-6xl"
        >
          {t("pricing_section.title")}
        </motion.h2>

        <div className="mx-auto mt-14 grid max-w-3xl gap-6 md:grid-cols-2">
          {/* Free */}
          <motion.div
            {...fadeUp}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-7"
          >
            <h3 className="text-lg font-bold text-zinc-100">{t("pricing_section.free_name")}</h3>
            <div className="mt-3 text-3xl font-bold text-zinc-100">{t("pricing_section.free_price")}</div>
            <ul className="mt-6 space-y-3">
              {freeFeatures.map((feat, i) => (
                <li key={i} className="flex items-center gap-3 text-sm text-zinc-400">
                  <Check size={16} className="shrink-0 text-zinc-600" />
                  {feat}
                </li>
              ))}
            </ul>
            <Link
              href="/diagnose"
              className="mt-8 flex w-full items-center justify-center rounded-xl border border-zinc-700 bg-zinc-800/50 py-3 text-sm font-semibold text-zinc-300 transition-all duration-200 hover:bg-zinc-800 hover:text-white"
            >
              {t("pricing_section.free_cta")}
            </Link>
          </motion.div>

          {/* Pro */}
          <motion.div
            {...fadeUp}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="relative rounded-2xl border border-violet-500/30 bg-zinc-900/50 p-7"
          >
            <span className="absolute -top-3 left-6 rounded-full bg-gradient-to-r from-violet-500 to-blue-500 px-3 py-1 text-xs font-bold text-white">
              {t("pricing_section.pro_badge")}
            </span>
            <h3 className="text-lg font-bold text-zinc-100">{t("pricing_section.pro_name")}</h3>
            <div className="mt-3 flex items-baseline gap-1">
              <span className="text-3xl font-bold text-zinc-100">{t("pricing_section.pro_price")}</span>
            </div>
            <p className="mt-1 text-sm text-accent font-medium">{t("pricing_section.pro_trial")}</p>
            <ul className="mt-6 space-y-3">
              {proFeatures.map((feat, i) => (
                <li key={i} className="flex items-center gap-3 text-sm text-zinc-300">
                  <Check size={16} className="shrink-0 text-accent" />
                  {feat}
                </li>
              ))}
            </ul>
            <Link
              href="/pricing"
              className="mt-8 flex w-full items-center justify-center rounded-xl bg-gradient-to-r from-violet-600 to-blue-600 py-3 text-sm font-semibold text-white shadow-lg shadow-violet-500/20 transition-all duration-200 hover:from-violet-500 hover:to-blue-500 hover:scale-[1.02] active:scale-[0.98]"
            >
              {t("pricing_section.pro_cta")}
            </Link>
            <p className="mt-3 text-center text-xs text-zinc-500">{t("pricing_section.cancel_note")}</p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
