"use client";

import { motion } from "framer-motion";
import { useLocale } from "@/hooks/useLocale";

export default function FeatureStrip() {
  const { t } = useLocale();

  return (
    <section className="border-y border-zinc-800/80 bg-zinc-950/50 py-4">
      <div className="mx-auto max-w-7xl px-6">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center text-sm text-zinc-500 tracking-wide"
        >
          {t("feature_strip.items")}
        </motion.p>
      </div>
    </section>
  );
}
