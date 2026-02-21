"use client";

import { motion } from "framer-motion";
import { useLocale } from "@/hooks/useLocale";

const fadeUp = { initial: { opacity: 0, y: 30 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true, margin: "-50px" } };

export default function Reviews() {
  const { t, tArray } = useLocale();
  const items = tArray("reviews.items") as { name: string; info: string; text: string }[];

  return (
    <section className="relative py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-6">
        <motion.h2 {...fadeUp} transition={{ duration: 0.5 }} className="text-center text-3xl font-bold md:text-4xl lg:text-5xl">
          {t("reviews.title1")}<br /><span className="text-gray-400">{t("reviews.title2")}</span>
        </motion.h2>
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((r, i) => (
            <motion.div key={i} {...fadeUp} transition={{ duration: 0.5, delay: 0.15 * i }} className="rounded-2xl border border-white/[0.06] bg-white/[0.03] p-6 md:p-8 transition-all duration-300 hover:border-purple-500/30 hover:-translate-y-1">
              <div className="flex gap-0.5 text-warm">{Array.from({ length: 5 }).map((_, j) => (<span key={j} className="text-sm">★</span>))}</div>
              <p className="mt-4 text-sm leading-relaxed text-gray-300">&ldquo;{r.text}&rdquo;</p>
              <div className="mt-5 flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/15 text-sm font-bold text-primary">{r.name[0]}</div>
                <div><div className="text-sm font-medium">{r.name}</div><div className="text-xs text-gray-500">{r.info}</div></div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
