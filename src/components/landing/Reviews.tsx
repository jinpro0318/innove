"use client";

import { motion } from "framer-motion";
import { useLocale } from "@/hooks/useLocale";

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-50px" },
};

export default function TargetUsers() {
  const { t, tArray } = useLocale();
  const cards = tArray("target.cards") as {
    emoji: string;
    title: string;
    desc: string;
    action: string;
  }[];

  return (
    <section className="relative py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-6">
        <motion.h2
          {...fadeUp}
          transition={{ duration: 0.5 }}
          className="text-center text-3xl font-bold text-zinc-100 md:text-4xl lg:text-5xl"
        >
          {t("target.title")}
        </motion.h2>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {cards.map((card, i) => (
            <motion.div
              key={i}
              {...fadeUp}
              transition={{ duration: 0.5, delay: 0.15 + i * 0.1 }}
              whileHover={{ y: -4 }}
              className="group rounded-2xl border border-zinc-700/50 bg-zinc-800/40 p-7 transition-all duration-300 hover:border-violet-500/30"
            >
              <span className="text-4xl">{card.emoji}</span>
              <h3 className="mt-5 text-xl font-bold text-zinc-100">{card.title}</h3>
              <p className="mt-2 text-sm text-zinc-400">{card.desc}</p>
              <p className="mt-5 text-sm font-medium text-violet-400">{card.action}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
