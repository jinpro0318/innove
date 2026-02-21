"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, CreditCard, Mail, Check, Loader2 } from "lucide-react";
import { useLocale } from "@/hooks/useLocale";

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  countryCode?: string;
}

export default function PaymentModal({ isOpen, onClose, countryCode }: PaymentModalProps) {
  const { t } = useLocale();
  const isKorea = countryCode === "KR" || !countryCode;
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const formspreeId = process.env.NEXT_PUBLIC_FORMSPREE_ID || "YOUR_FORM_ID";

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    setLoading(true); setError("");
    try {
      const res = await fetch(`https://formspree.io/f/${formspreeId}`, {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, type: "payment_waitlist", country: countryCode || "KR", plan: "pro" }),
      });
      if (res.ok) { setSubmitted(true); } else { setError(t("payment.error")); }
    } catch { setError(t("payment.error")); }
    finally { setLoading(false); }
  }

  function handleClose() { setSubmitted(false); setEmail(""); setError(""); onClose(); }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm px-6" onClick={handleClose}>
          <motion.div initial={{ opacity: 0, scale: 0.95, y: 10 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 10 }} onClick={(e) => e.stopPropagation()} className="w-full max-w-md rounded-2xl border border-white/10 bg-[#111118] overflow-hidden">
            <div className="flex items-center justify-between border-b border-white/5 px-6 py-4">
              <div className="flex items-center gap-2"><CreditCard size={18} className="text-primary" /><h3 className="text-base font-semibold">{t("payment.title")}</h3></div>
              <button onClick={handleClose} className="text-gray-400 hover:text-white transition-colors duration-200"><X size={18} /></button>
            </div>
            <div className="p-6">
              {submitted ? (
                <div className="text-center py-4">
                  <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-accent/15"><Check size={24} className="text-accent" /></div>
                  <h4 className="text-lg font-semibold">{t("payment.done_title")}</h4>
                  <p className="mt-2 text-sm text-gray-400">{t("payment.done_desc")}</p>
                </div>
              ) : (
                <>
                  <div className="mb-5 rounded-xl bg-white/5 border border-white/[0.06] p-4 text-center">
                    {isKorea ? (
                      <>{/* TODO: 토스페이먼츠 SDK 연동 — https://docs.tosspayments.com/ — .env.local NEXT_PUBLIC_TOSS_CLIENT_KEY */}
                        <p className="text-sm font-medium">{t("payment.toss")}</p><p className="mt-1 text-xs text-gray-500">{t("payment.toss_methods")}</p></>
                    ) : (
                      <>{/* TODO: Stripe Checkout 연동 — https://stripe.com/docs/payments/checkout — .env.local NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY */}
                        <p className="text-sm font-medium">{t("payment.stripe")}</p><p className="mt-1 text-xs text-gray-500">{t("payment.stripe_methods")}</p></>
                    )}
                  </div>
                  <div className="mb-5 rounded-xl border border-primary/20 bg-primary/5 px-4 py-3"><p className="text-sm text-center">{t("payment.earlybird")}</p></div>
                  <form onSubmit={handleSubmit}>
                    <label className="block text-sm text-gray-400 mb-2"><Mail size={14} className="inline mr-1.5" />{t("payment.email_label")}</label>
                    <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="email@example.com" className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-gray-500 outline-none transition-colors duration-200 focus:border-primary/50" />
                    {error && <p className="mt-2 text-xs text-red-400">{error}</p>}
                    <button type="submit" disabled={loading} className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-purple-600 to-purple-500 py-3 text-sm font-semibold text-white shadow-lg shadow-purple-500/25 transition-all duration-200 hover:from-purple-500 hover:to-purple-400 disabled:opacity-50">
                      {loading ? <Loader2 size={16} className="animate-spin" /> : t("payment.cta")}
                    </button>
                  </form>
                  <p className="mt-3 text-center text-xs text-gray-500">{t("payment.price_note")}</p>
                </>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
