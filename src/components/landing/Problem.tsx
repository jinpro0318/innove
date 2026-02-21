"use client";

import { motion } from "framer-motion";
import { useLocale } from "@/hooks/useLocale";

const fadeUp = { initial: { opacity: 0, y: 30 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true, margin: "-50px" } };

export default function Problem() {
  const { t, tArray } = useLocale();
  const cards = tArray("problem.cards") as { emoji: string; title: string; desc: string }[];

  return (
    <section className="relative py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-6">
        <motion.div {...fadeUp} transition={{ duration: 0.5 }}>
          <span className="text-sm font-semibold uppercase tracking-wider text-purple-400">{t("problem.label")}</span>
        </motion.div>
        <motion.h2 {...fadeUp} transition={{ duration: 0.5, delay: 0.1 }} className="mt-4 max-w-2xl text-3xl font-bold leading-snug md:text-4xl lg:text-5xl">
          {t("problem.title1")}<br /><span className="text-gray-400">{t("problem.title2")}</span>
        </motion.h2>
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {cards.map((card, i) => (
            <motion.div key={i} {...fadeUp} transition={{ duration: 0.5, delay: 0.15 * i }} whileHover={{ y: -6 }} className="group rounded-2xl border border-white/[0.06] bg-white/[0.03] p-6 md:p-8 transition-all duration-300 hover:border-purple-500/30">
              <span className="text-4xl">{card.emoji}</span>
              <h3 className="mt-4 text-lg font-semibold">{card.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-gray-400">{card.desc}</p>
            </motion.div>
          ))}
        </div>
        <motion.div {...fadeUp} transition={{ duration: 0.5, delay: 0.3 }} className="mt-12">
          <div className="rounded-2xl border border-transparent bg-gradient-to-r from-primary/20 via-accent/20 to-primary/20 p-[1px]">
            <div className="rounded-2xl bg-[#0A0A0F] px-6 py-5 sm:px-8 sm:py-6">
              <p className="text-center text-sm sm:text-base">
                <span className="font-semibold text-white">{t("problem.bottom_label")}</span>{" "}
                <span className="text-gray-400">{t("problem.bottom")}</span>
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
