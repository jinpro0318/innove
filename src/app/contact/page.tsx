"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Send, Loader2 } from "lucide-react";
import { useLocale } from "@/hooks/useLocale";

const fadeUp = { initial: { opacity: 0, y: 30 }, animate: { opacity: 1, y: 0 } };

export default function ContactPage() {
  const { t, tArray } = useLocale();
  const types = tArray("contact.types") as string[];
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [type, setType] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const formspreeId = process.env.NEXT_PUBLIC_FORMSPREE_ID || "YOUR_FORM_ID";

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault(); setStatus("loading");
    try {
      const res = await fetch(`https://formspree.io/f/${formspreeId}`, {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, type: type || types[0], message }),
      });
      if (res.ok) { setStatus("success"); setName(""); setEmail(""); setType(""); setMessage(""); } else { setStatus("error"); }
    } catch { setStatus("error"); }
  }

  return (
    <div className="min-h-screen bg-[#09090B] pt-28 pb-20">
      <div className="mx-auto max-w-xl px-4 md:px-6">
        <motion.div {...fadeUp} transition={{ duration: 0.5 }}>
          <h1 className="text-3xl font-bold text-zinc-100 md:text-4xl">{t("contact.title")}</h1>
          <p className="mt-2 text-zinc-400">{t("contact.subtitle")}</p>
        </motion.div>
        <motion.form {...fadeUp} transition={{ duration: 0.5, delay: 0.1 }} onSubmit={handleSubmit} className="mt-8 space-y-5">
          <div>
            <label className="block text-sm text-zinc-300 mb-1.5">{t("contact.name")} <span className="text-red-400">*</span></label>
            <input type="text" required value={name} onChange={(e) => setName(e.target.value)} placeholder={t("contact.name_placeholder")} className="w-full rounded-lg border border-zinc-700 bg-zinc-800/60 px-4 py-3 text-sm text-white placeholder-zinc-500 outline-none transition-all duration-200 focus:border-violet-500 focus:ring-1 focus:ring-violet-500/20" />
          </div>
          <div>
            <label className="block text-sm text-zinc-300 mb-1.5">{t("contact.email")} <span className="text-red-400">*</span></label>
            <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="email@example.com" className="w-full rounded-lg border border-zinc-700 bg-zinc-800/60 px-4 py-3 text-sm text-white placeholder-zinc-500 outline-none transition-all duration-200 focus:border-violet-500 focus:ring-1 focus:ring-violet-500/20" />
          </div>
          <div>
            <label className="block text-sm text-zinc-300 mb-1.5">{t("contact.type")}</label>
            <select value={type} onChange={(e) => setType(e.target.value)} className="w-full rounded-lg border border-zinc-700 bg-zinc-800/60 px-4 py-3 text-sm text-white outline-none transition-all duration-200 focus:border-violet-500 focus:ring-1 focus:ring-violet-500/20 appearance-none">
              {types.map((tp) => (<option key={tp} value={tp} className="bg-zinc-900">{tp}</option>))}
            </select>
          </div>
          <div>
            <label className="block text-sm text-zinc-300 mb-1.5">{t("contact.message")} <span className="text-red-400">*</span></label>
            <textarea required rows={5} value={message} onChange={(e) => setMessage(e.target.value)} placeholder={t("contact.message_placeholder")} className="w-full rounded-lg border border-zinc-700 bg-zinc-800/60 px-4 py-3 text-sm text-white placeholder-zinc-500 outline-none transition-all duration-200 focus:border-violet-500 focus:ring-1 focus:ring-violet-500/20 resize-none" />
          </div>
          <button type="submit" disabled={status === "loading"} className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-violet-500 to-blue-500 px-8 py-4 text-lg font-semibold text-white shadow-lg shadow-violet-500/25 transition-all duration-200 hover:from-violet-400 hover:to-blue-400 disabled:opacity-50">
            {status === "loading" ? <Loader2 size={16} className="animate-spin" /> : <><Send size={16} />{t("contact.submit")}</>}
          </button>
          {status === "success" && <motion.p initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="text-center text-sm text-accent">{t("contact.success")}</motion.p>}
          {status === "error" && <motion.p initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="text-center text-sm text-red-400">{t("contact.error")}</motion.p>}
        </motion.form>
      </div>
    </div>
  );
}
