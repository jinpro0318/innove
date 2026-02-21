"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Download, X } from "lucide-react";
import { useLocale } from "@/hooks/useLocale";

interface BeforeInstallPromptEvent extends Event {
  prompt(): Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

export default function InstallBanner() {
  const { t } = useLocale();
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(display-mode: standalone)").matches) return;
    if (localStorage.getItem("pwa_dismissed") === "1") return;
    const handler = (e: Event) => { e.preventDefault(); setDeferredPrompt(e as BeforeInstallPromptEvent); setShow(true); };
    window.addEventListener("beforeinstallprompt", handler);
    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  async function handleInstall() {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === "accepted") setShow(false);
    setDeferredPrompt(null);
  }

  function handleDismiss() { setShow(false); localStorage.setItem("pwa_dismissed", "1"); }

  return (
    <AnimatePresence>
      {show && (
        <motion.div initial={{ y: 100, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 100, opacity: 0 }} transition={{ duration: 0.3 }} className="fixed bottom-0 left-0 right-0 z-50 border-t border-white/10 bg-[#111118]/95 backdrop-blur-xl px-4 py-3">
          <div className="mx-auto flex max-w-lg items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/15"><Download size={20} className="text-primary" /></div>
            <p className="flex-1 min-w-0 text-sm font-medium">{t("install.message")}</p>
            <button onClick={handleInstall} className="shrink-0 rounded-xl bg-primary px-4 py-2 text-xs font-semibold text-white transition-all duration-200 hover:bg-primary/90">{t("install.button")}</button>
            <button onClick={handleDismiss} className="shrink-0 text-gray-500 hover:text-white transition-colors duration-200"><X size={18} /></button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
