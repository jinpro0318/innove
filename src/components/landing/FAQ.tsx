"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useLocale } from "@/hooks/useLocale";

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-50px" },
};

export default function FAQ() {
  const { t, tArray } = useLocale();
  const faqs = tArray("faq.items") as { q: string; a: string }[];
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="faq" className="relative py-20 md:py-28">
      <div className="mx-auto max-w-3xl px-4 md:px-6">
        <motion.h2
          {...fadeUp}
          transition={{ duration: 0.5 }}
          className="text-center text-3xl font-bold text-zinc-100 md:text-4xl lg:text-5xl"
        >
          {t("faq.title")}
        </motion.h2>

        <div className="mt-12 space-y-3">
          {faqs.map((faq, i) => (
            <motion.div key={i} {...fadeUp} transition={{ duration: 0.5, delay: 0.06 * i }}>
              <div className="rounded-2xl border border-zinc-700/50 bg-zinc-800/40 overflow-hidden transition-all duration-300 hover:border-violet-500/40">
                <button
                  onClick={() => setOpenIndex(openIndex === i ? null : i)}
                  className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left transition-colors duration-200 hover:bg-zinc-800/60"
                >
                  <span className="text-sm font-medium text-zinc-200 sm:text-base">{faq.q}</span>
                  <motion.div
                    animate={{ rotate: openIndex === i ? 180 : 0 }}
                    transition={{ duration: 0.25 }}
                    className="shrink-0"
                  >
                    <ChevronDown size={18} className="text-zinc-400" />
                  </motion.div>
                </button>
                <AnimatePresence initial={false}>
                  {openIndex === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <div className="border-t border-zinc-700/50 px-6 pb-5 pt-4">
                        <p className="text-sm leading-relaxed text-zinc-300">{faq.a}</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
