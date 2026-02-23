"use client";

import { motion } from "framer-motion";
import { useLocale } from "@/hooks/useLocale";

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-50px" },
};

export default function Features() {
  const { t, tArray } = useLocale();
  const bento = tArray("features.bento") as {
    emoji: string;
    title: string;
    desc: string;
    size: string;
    highlight?: string;
    flags?: string;
  }[];

  return (
    <section id="features" className="relative py-24 md:py-32 bg-zinc-950/30">
      <div className="mx-auto max-w-7xl px-6">
        <motion.h2
          {...fadeUp}
          transition={{ duration: 0.5 }}
          className="text-4xl font-bold text-zinc-100 md:text-5xl lg:text-6xl"
        >
          {t("features.title")}
        </motion.h2>

        {/* Bento Grid */}
        <div className="mt-14 grid gap-4 sm:grid-cols-3">
          {/* Row 1: large (2/3) + small (1/3) */}
          <motion.div
            {...fadeUp}
            transition={{ duration: 0.5, delay: 0.1 }}
            whileHover={{ y: -4 }}
            className="sm:col-span-2 group rounded-2xl border border-zinc-800 bg-zinc-900/50 p-7 md:p-9 transition-all duration-300 hover:border-violet-500/30 hover:shadow-lg hover:shadow-violet-500/5"
          >
            <span className="text-3xl">{bento[0].emoji}</span>
            <h3 className="mt-4 text-xl font-bold text-zinc-100">{bento[0].title}</h3>
            <p className="mt-2 text-sm text-zinc-400">{bento[0].desc}</p>
            {/* Mini step UI */}
            <div className="mt-5 flex items-center gap-2">
              {["업종코드", "과세유형", "사업장", "신청"].map((s, i) => (
                <div key={i} className="flex items-center gap-1.5">
                  <div className={`h-7 rounded-lg px-3 flex items-center text-xs font-medium ${i === 0 ? "bg-violet-500/20 text-violet-300 border border-violet-500/30" : "bg-zinc-800 text-zinc-500"}`}>
                    {s}
                  </div>
                  {i < 3 && <span className="text-zinc-700 text-xs">→</span>}
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            {...fadeUp}
            transition={{ duration: 0.5, delay: 0.15 }}
            whileHover={{ y: -4 }}
            className="group rounded-2xl border border-zinc-800 bg-zinc-900/50 p-7 transition-all duration-300 hover:border-blue-500/30 hover:shadow-lg hover:shadow-blue-500/5"
          >
            <span className="text-3xl">{bento[1].emoji}</span>
            <h3 className="mt-4 text-lg font-bold text-zinc-100">{bento[1].title}</h3>
            <p className="mt-2 text-sm text-zinc-400">{bento[1].desc}</p>
            {bento[1].highlight && (
              <p className="mt-4 text-2xl font-bold text-zinc-200">{bento[1].highlight}</p>
            )}
          </motion.div>

          {/* Row 2: 3 small cards */}
          {bento.slice(2, 5).map((item, i) => (
            <motion.div
              key={i}
              {...fadeUp}
              transition={{ duration: 0.5, delay: 0.2 + i * 0.08 }}
              whileHover={{ y: -4 }}
              className="group rounded-2xl border border-zinc-800 bg-zinc-900/50 p-7 transition-all duration-300 hover:border-violet-500/30 hover:shadow-lg hover:shadow-violet-500/5"
            >
              <span className="text-3xl">{item.emoji}</span>
              <h3 className="mt-4 text-lg font-bold text-zinc-100">{item.title}</h3>
              <p className="mt-2 text-sm text-zinc-400">{item.desc}</p>
              {/* Mini calendar for tax */}
              {i === 1 && (
                <div className="mt-4 grid grid-cols-7 gap-1">
                  {Array.from({ length: 7 }).map((_, d) => (
                    <div
                      key={d}
                      className={`h-5 rounded text-center text-[9px] leading-5 ${
                        d === 3 ? "bg-violet-500/20 text-violet-300 font-bold" : "bg-zinc-800 text-zinc-600"
                      }`}
                    >
                      {d + 1}
                    </div>
                  ))}
                </div>
              )}
            </motion.div>
          ))}

          {/* Row 3: full-width */}
          <motion.div
            {...fadeUp}
            transition={{ duration: 0.5, delay: 0.4 }}
            whileHover={{ y: -4 }}
            className="sm:col-span-3 group rounded-2xl border border-zinc-800 bg-zinc-900/50 p-7 md:p-9 transition-all duration-300 hover:border-violet-500/30 hover:shadow-lg hover:shadow-violet-500/5"
          >
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <span className="text-3xl">{bento[5].emoji}</span>
                <h3 className="mt-3 text-xl font-bold text-zinc-100">{bento[5].title}</h3>
                <p className="mt-2 text-sm text-zinc-400">{bento[5].desc}</p>
              </div>
              {bento[5].flags && (
                <p className="text-2xl tracking-widest">{bento[5].flags}</p>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
