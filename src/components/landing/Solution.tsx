"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useLocale } from "@/hooks/useLocale";

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-50px" },
};

export default function Solution() {
  const { t, tArray } = useLocale();
  const cards = tArray("solution.cards") as {
    emoji: string;
    title: string;
    desc: string;
    tags: string[];
    mini_label: string;
  }[];

  return (
    <section className="relative py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-6">
        <motion.h2
          {...fadeUp}
          transition={{ duration: 0.5 }}
          className="text-3xl font-bold text-zinc-100 md:text-4xl lg:text-5xl"
        >
          {t("solution.title")}
        </motion.h2>
        <motion.p
          {...fadeUp}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mt-4 text-base text-zinc-400 md:text-lg"
        >
          {t("solution.subtitle")}
        </motion.p>

        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          {cards.map((card, i) => {
            const content = (
              <>
                <span className="text-3xl">{card.emoji}</span>
                <h3 className="mt-4 text-xl font-bold text-zinc-100">{card.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-zinc-400">{card.desc}</p>

                {/* Mini UI */}
                <div className="mt-5 rounded-xl border border-zinc-800 bg-zinc-950/50 p-4">
                  {i === 0 && (
                    <div className="flex items-center gap-2">
                      {[1, 2, 3, 4].map((step) => (
                        <div key={step} className="flex items-center gap-1">
                          <div
                            className={`h-6 w-6 rounded-full flex items-center justify-center text-xs font-bold ${
                              step === 1
                                ? "bg-violet-500 text-white"
                                : "bg-zinc-800 text-zinc-500"
                            }`}
                          >
                            {step}
                          </div>
                          {step < 4 && <div className="h-px w-4 bg-zinc-700" />}
                        </div>
                      ))}
                    </div>
                  )}
                  {i === 1 && (
                    <div className="flex items-center gap-2">
                      <div className="flex gap-1">
                        <div className="h-2 w-2 rounded-full bg-red-400" />
                        <div className="h-2 w-2 rounded-full bg-blue-400" />
                        <div className="h-2 w-2 rounded-full bg-green-400" />
                      </div>
                      <span className="ml-auto text-[10px] text-zinc-600">Map</span>
                    </div>
                  )}
                  {i === 2 && (
                    <div className="space-y-1.5">
                      <div className="flex items-center gap-2">
                        <div className="h-3 w-3 rounded border border-emerald-500 bg-emerald-500/20 flex items-center justify-center">
                          <span className="text-[8px] text-emerald-400">✓</span>
                        </div>
                        <div className="h-1.5 flex-1 rounded-full bg-zinc-800">
                          <div className="h-full w-[35%] rounded-full bg-gradient-to-r from-violet-500 to-blue-500" />
                        </div>
                      </div>
                    </div>
                  )}
                  <p className="mt-2 text-xs text-zinc-500">{card.mini_label}</p>
                </div>

                {/* Tags */}
                <div className="mt-4 flex flex-wrap gap-2">
                  {card.tags.map((tag, j) => (
                    <span
                      key={j}
                      className="rounded-full border border-zinc-700 bg-zinc-800/50 px-3 py-1 text-[11px] text-zinc-400"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </>
            );

            const linkMap: Record<number, string> = { 0: "/register-guide", 1: "/location", 2: "/diagnose" };

            return (
              <motion.div
                key={i}
                {...fadeUp}
                transition={{ duration: 0.5, delay: 0.15 + i * 0.1 }}
                whileHover={{ y: -4 }}
                className="group rounded-2xl border border-zinc-700/50 bg-zinc-800/40 p-7 transition-all duration-300 hover:border-violet-500/30 hover:shadow-lg hover:shadow-violet-500/5"
              >
                {linkMap[i] ? (
                  <Link href={linkMap[i]} className="block">{content}</Link>
                ) : (
                  content
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
