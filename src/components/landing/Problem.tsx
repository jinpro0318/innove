"use client";

import { motion } from "framer-motion";
import { Square } from "lucide-react";
import { useLocale } from "@/hooks/useLocale";

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-50px" },
};

export default function Problem() {
  const { t, tArray } = useLocale();
  const checklist = tArray("problem.checklist") as string[];
  const stats = tArray("problem.stats") as { value: string; label: string }[];

  return (
    <section className="relative py-20 md:py-28 bg-zinc-950/30">
      <div className="mx-auto max-w-7xl px-6">
        <motion.h2
          {...fadeUp}
          transition={{ duration: 0.5 }}
          className="text-3xl font-bold text-zinc-100 md:text-4xl lg:text-5xl"
        >
          {t("problem.title")}
        </motion.h2>
        <motion.p
          {...fadeUp}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mt-4 text-base text-zinc-400 md:text-lg"
        >
          {t("problem.subtitle")}
        </motion.p>

        <div className="mt-14 grid gap-8 lg:grid-cols-5">
          {/* Left: Checklist (3/5) */}
          <motion.div
            {...fadeUp}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="lg:col-span-3 rounded-2xl border border-zinc-700/50 bg-zinc-800/40 p-7 md:p-9"
          >
            <h3 className="text-xl font-bold text-zinc-100">{t("problem.checklist_title")}</h3>
            <div className="mt-6 space-y-4">
              {checklist.map((item, i) => (
                <div key={i} className="flex items-start gap-3">
                  <Square size={16} className="mt-0.5 shrink-0 text-zinc-600" />
                  <span className="text-base text-zinc-300">{item}</span>
                </div>
              ))}
            </div>
            <p className="mt-8 text-sm text-violet-400 font-medium">
              {t("problem.checklist_bottom")}
            </p>
          </motion.div>

          {/* Right: Stat cards (2/5) */}
          <div className="lg:col-span-2 flex flex-col gap-4">
            {stats.map((stat, i) => (
              <motion.div
                key={i}
                {...fadeUp}
                transition={{ duration: 0.5, delay: 0.2 + i * 0.1 }}
                className="rounded-2xl border border-zinc-700/50 bg-zinc-800/40 p-6"
              >
                <div className="text-3xl font-bold text-zinc-100">{stat.value}</div>
                <p className="mt-2 text-sm text-zinc-500">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
