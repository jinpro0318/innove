"use client";

import { motion } from "framer-motion";
import { useLocale } from "@/hooks/useLocale";

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-50px" },
};

export default function HowItWorks() {
  const { t, tArray } = useLocale();
  const steps = tArray("how_it_works.steps") as {
    num: string;
    emoji: string;
    title: string;
    desc: string;
    time: string;
  }[];

  return (
    <section className="relative py-24 md:py-32 bg-zinc-950/30">
      <div className="mx-auto max-w-7xl px-6">
        <motion.h2
          {...fadeUp}
          transition={{ duration: 0.5 }}
          className="text-center text-4xl font-bold text-zinc-100 md:text-5xl lg:text-6xl"
        >
          {t("how_it_works.title")}
        </motion.h2>

        <div className="mt-16 relative">
          {/* Desktop connection line */}
          <div className="hidden lg:block absolute top-20 left-[16.67%] right-[16.67%] h-px bg-gradient-to-r from-violet-500/30 via-blue-500/30 to-violet-500/30" />

          <div className="grid gap-8 lg:grid-cols-3">
            {steps.map((step, i) => (
              <motion.div
                key={i}
                {...fadeUp}
                transition={{ duration: 0.5, delay: 0.15 + i * 0.12 }}
                className="relative text-center"
              >
                <div className="relative mx-auto mb-6">
                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl border border-zinc-800 bg-zinc-900/80 text-2xl shadow-lg">
                    {step.emoji}
                  </div>
                  <span className="absolute -top-2 -right-2 flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-r from-violet-500 to-blue-500 text-[10px] font-bold text-white">
                    {step.num}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-zinc-100">{step.title}</h3>
                <p className="mt-2 text-sm text-zinc-400 max-w-xs mx-auto">{step.desc}</p>
                <span className="mt-3 inline-block rounded-full border border-zinc-800 bg-zinc-900/50 px-3 py-1 text-xs text-zinc-500">
                  {step.time}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
