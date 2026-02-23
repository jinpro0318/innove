"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useLocale } from "@/hooks/useLocale";

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-50px" },
};

export default function CTA() {
  const { t } = useLocale();

  return (
    <section className="relative py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <motion.div
          {...fadeUp}
          transition={{ duration: 0.6 }}
          className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-violet-600 to-blue-600"
        >
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(255,255,255,0.1),transparent)]" />
          <div className="relative px-8 py-16 md:px-16 md:py-20 text-center">
            <motion.p
              {...fadeUp}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-base text-white/70 md:text-lg"
            >
              {t("cta_section.top")}
            </motion.p>
            <motion.h2
              {...fadeUp}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="mt-3 text-3xl font-bold text-white md:text-4xl lg:text-5xl"
            >
              {t("cta_section.title")}
            </motion.h2>
            <motion.div {...fadeUp} transition={{ duration: 0.5, delay: 0.25 }} className="mt-10">
              <Link
                href="/diagnose"
                className="inline-flex items-center gap-2 rounded-2xl bg-white px-10 py-4 text-base font-semibold text-zinc-900 shadow-lg transition-all duration-200 hover:bg-zinc-100 hover:scale-105 active:scale-95"
              >
                {t("cta_section.button")}
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
