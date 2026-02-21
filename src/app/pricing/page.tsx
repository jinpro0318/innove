"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Check, X as XIcon } from "lucide-react";
import PaymentModal from "@/components/payment/PaymentModal";
import { useLocale } from "@/hooks/useLocale";

const fadeUp = { initial: { opacity: 0, y: 30 }, animate: { opacity: 1, y: 0 } };

export default function PricingPage() {
  const { t, tArray } = useLocale();
  const [showPayment, setShowPayment] = useState(false);
  const freeFeatures = tArray("pricing_page.free_features") as { text: string; on: boolean }[];
  const proFeatures = tArray("pricing_page.pro_features") as string[];

  return (
    <div className="min-h-screen bg-[#0A0A0F] pt-28 pb-20">
      <div className="mx-auto max-w-5xl px-6">
        <motion.div {...fadeUp} transition={{ duration: 0.5 }} className="text-center">
          <h1 className="text-3xl font-bold md:text-4xl lg:text-5xl">{t("pricing_page.title")}</h1>
          <p className="mt-3 text-gray-400">{t("pricing_page.subtitle")}</p>
        </motion.div>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 max-w-3xl mx-auto">
          {/* FREE */}
          <motion.div {...fadeUp} transition={{ duration: 0.5, delay: 0.1 }} className="rounded-2xl border border-white/[0.06] bg-white/[0.03] p-7 md:p-8">
            <h3 className="text-lg font-bold">{t("pricing_page.free_name")}</h3>
            <div className="mt-3 flex items-baseline gap-1"><span className="text-3xl font-bold">{t("pricing_page.free_price")}</span></div>
            <p className="mt-1 text-sm text-gray-500">{t("pricing_page.free_desc")}</p>
            <ul className="mt-6 space-y-3">
              {freeFeatures.map((f, i) => (
                <li key={i} className="flex items-center gap-3 text-sm">
                  {f.on ? <Check size={16} className="shrink-0 text-accent" /> : <XIcon size={16} className="shrink-0 text-gray-600" />}
                  <span className={f.on ? "text-gray-300" : "text-gray-600"}>{f.text}</span>
                </li>
              ))}
            </ul>
            <button disabled className="mt-7 flex w-full items-center justify-center rounded-xl border border-white/10 py-3 text-sm text-gray-500 cursor-not-allowed">{t("pricing_page.free_cta")}</button>
          </motion.div>
          {/* PRO */}
          <motion.div {...fadeUp} transition={{ duration: 0.5, delay: 0.2 }} className="relative rounded-2xl border border-primary/30 bg-white/[0.03] overflow-hidden">
            <div className="h-[3px] bg-gradient-to-r from-primary to-accent" />
            <div className="p-7 md:p-8">
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-bold">{t("pricing_page.pro_name")}</h3>
                <span className="rounded-full bg-warm/15 border border-warm/20 px-2 py-0.5 text-[10px] font-semibold text-warm">{t("pricing_page.pro_badge")}</span>
              </div>
              <div className="mt-3 flex items-baseline gap-2">
                <span className="text-3xl font-bold">{t("pricing_page.pro_price")}</span>
                <span className="text-sm text-gray-500">{t("pricing_page.pro_price_usd")}</span>
              </div>
              <p className="mt-1 text-sm text-accent font-medium">{t("pricing_page.pro_trial")}</p>
              <ul className="mt-6 space-y-3">
                {proFeatures.map((f, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm text-gray-300"><Check size={16} className="shrink-0 text-accent" />{f}</li>
                ))}
              </ul>
              <button onClick={() => setShowPayment(true)} className="mt-7 flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-purple-600 to-purple-500 py-3 text-sm font-semibold text-white shadow-lg shadow-purple-500/25 transition-all duration-200 hover:from-purple-500 hover:to-purple-400 hover:scale-[1.02] active:scale-[0.98]">
                {t("pricing_page.pro_cta")}
              </button>
              <p className="mt-3 text-center text-xs text-gray-500">{t("pricing_page.cancel_note")}</p>
            </div>
          </motion.div>
        </div>
      </div>
      <PaymentModal isOpen={showPayment} onClose={() => setShowPayment(false)} />
    </div>
  );
}
