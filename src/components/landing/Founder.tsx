"use client";

import { motion } from "framer-motion";
import { useLocale } from "@/hooks/useLocale";

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-50px" },
};

export default function Founder() {
  const { t, tArray } = useLocale();
  const tags = tArray("founder.tags") as string[];

  return (
    <section className="relative py-24 md:py-32 overflow-hidden">
      {/* Purple glow */}
      <div className="pointer-events-none absolute top-1/2 left-0 -translate-y-1/2 h-[400px] w-[300px] rounded-full bg-violet-500/5 blur-[120px]" />
      <div className="pointer-events-none absolute top-1/2 right-0 -translate-y-1/2 h-[400px] w-[300px] rounded-full bg-violet-500/5 blur-[120px]" />

      <div className="relative mx-auto max-w-7xl px-6">
        <div className="rounded-3xl border border-zinc-800 bg-zinc-900/30 p-8 md:p-14">
          <div className="grid gap-10 lg:grid-cols-5 items-center">
            {/* Left: Quote (3/5) */}
            <motion.div {...fadeUp} transition={{ duration: 0.5 }} className="lg:col-span-3">
              <span className="text-5xl text-violet-500/30 font-serif leading-none">&ldquo;</span>
              <blockquote className="mt-2 text-lg leading-relaxed text-zinc-300 md:text-xl">
                {t("founder.quote")}
              </blockquote>
            </motion.div>

            {/* Right: Profile (2/5) */}
            <motion.div
              {...fadeUp}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="lg:col-span-2"
            >
              <div className="rounded-2xl border border-zinc-800 bg-zinc-950/50 p-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-violet-500 to-blue-500 text-xl font-bold text-white">
                    K
                  </div>
                  <div>
                    <div className="text-lg font-bold text-zinc-100">{t("founder.name")}</div>
                    <p className="text-xs text-zinc-500 leading-relaxed">{t("founder.credentials")}</p>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2">
                  {tags.map((tag, i) => (
                    <span
                      key={i}
                      className="rounded-full border border-zinc-700 bg-zinc-800/50 px-3 py-1 text-xs text-zinc-400"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
