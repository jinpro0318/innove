"use client";

import { motion } from "framer-motion";
import { useLocale } from "@/hooks/useLocale";

const fadeUp = { initial: { opacity: 0, y: 30 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true, margin: "-50px" } };

export default function Features() {
  const { t, tArray } = useLocale();
  const cards = tArray("features.cards") as { emoji: string; title: string; desc: string }[];

  return (
    <section id="features" className="relative py-20 lg:py-28">
      <div className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 h-[500px] w-[700px] rounded-full bg-primary/5 blur-[120px]" />
      <div className="relative mx-auto max-w-7xl px-6">
        <motion.div {...fadeUp} transition={{ duration: 0.5 }}>
          <span className="text-sm font-semibold uppercase tracking-wider text-purple-400">{t("features.label")}</span>
        </motion.div>
        <motion.h2 {...fadeUp} transition={{ duration: 0.5, delay: 0.1 }} className="mt-4 text-3xl font-bold md:text-4xl lg:text-5xl">{t("features.title")}</motion.h2>
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {cards.map((f, i) => (
            <motion.div key={i} {...fadeUp} transition={{ duration: 0.5, delay: 0.1 * i }} whileHover={{ y: -6 }} className="group relative overflow-hidden rounded-2xl border border-white/[0.06] bg-white/[0.03] p-6 md:p-8 transition-all duration-300 hover:border-purple-500/30">
              <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-primary to-accent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              <span className="text-4xl">{f.emoji}</span>
              <h3 className="mt-4 text-lg font-semibold">{f.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-gray-400">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
