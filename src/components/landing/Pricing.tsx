"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { useLocale } from "@/hooks/useLocale";

const fadeUp = { initial: { opacity: 0, y: 30 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true, margin: "-50px" } };

export default function Pricing() {
  const { t, tArray } = useLocale();
  const features = tArray("pricing_section.features") as string[];

  return (
    <section id="pricing" className="relative py-20 lg:py-28">
      <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[400px] w-[500px] rounded-full bg-primary/5 blur-[100px]" />
      <div className="relative mx-auto max-w-7xl px-6">
        <motion.h2 {...fadeUp} transition={{ duration: 0.5 }} className="text-center text-3xl font-bold md:text-4xl lg:text-5xl">
          {t("pricing_section.title1")}<br /><span className="text-gray-400">{t("pricing_section.title2")}</span>
        </motion.h2>
        <motion.div {...fadeUp} transition={{ duration: 0.5, delay: 0.15 }} className="mx-auto mt-12 max-w-md">
          <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03]">
            <div className="h-[3px] bg-gradient-to-r from-primary to-accent" />
            <div className="p-7 sm:p-8">
              <span className="inline-block rounded-full bg-warm/15 px-3 py-1 text-xs font-semibold text-warm border border-warm/20">{t("pricing_section.earlybird")}</span>
              <div className="mt-5 flex items-baseline gap-2"><span className="text-4xl font-bold">{t("pricing_section.price")}</span></div>
              <p className="mt-1 text-sm text-accent font-medium">{t("pricing_section.free_trial")}</p>
              <ul className="mt-7 space-y-3">
                {features.map((perk, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm text-gray-300"><Check size={16} className="shrink-0 text-accent" />{perk}</li>
                ))}
              </ul>
              <Link href="/pricing" className="mt-8 flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-purple-600 to-purple-500 py-3.5 text-sm font-semibold text-white shadow-lg shadow-purple-500/25 transition-all duration-200 hover:from-purple-500 hover:to-purple-400 hover:scale-[1.02] active:scale-[0.98]">
                {t("pricing_section.cta")}
              </Link>
              <p className="mt-3 text-center text-xs text-gray-500">{t("pricing_section.cancel_note")}</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
