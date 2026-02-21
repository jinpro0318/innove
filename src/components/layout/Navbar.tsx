"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Globe } from "lucide-react";
import { useLocale } from "@/hooks/useLocale";

export default function Navbar() {
  const { locale, toggleLocale, t } = useLocale();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const navLinks = [
    { label: t("nav.features"), href: "/#features" },
    { label: t("nav.pricing"), href: "/pricing" },
    { label: t("nav.faq"), href: "/#faq" },
  ];

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isMobileOpen]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-[#0A0A0F]/90 backdrop-blur-xl border-b border-white/[0.06] shadow-lg shadow-black/20"
          : "bg-transparent backdrop-blur-sm"
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link href="/" className="flex items-center gap-2 group">
          <span className="text-2xl transition-transform duration-200 group-hover:scale-110">🚀</span>
          <span className="text-xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            {t("nav.logo")}
          </span>
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm text-gray-300 transition-colors duration-200 hover:text-white relative group"
            >
              {link.label}
              <span className="absolute -bottom-1 left-0 h-0.5 w-0 bg-primary transition-all duration-200 group-hover:w-full" />
            </Link>
          ))}

          <button
            onClick={toggleLocale}
            className="flex items-center gap-1.5 rounded-full border border-white/10 px-3 py-1.5 text-xs text-gray-300 transition-all duration-200 hover:border-primary/50 hover:text-white"
          >
            <Globe size={14} />
            {locale === "ko" ? "🇰🇷 KR" : "🇺🇸 EN"}
          </button>

          <Link
            href="/diagnose"
            className="rounded-xl bg-gradient-to-r from-purple-600 to-purple-500 px-6 py-2.5 text-sm font-semibold text-white shadow-lg shadow-purple-500/25 transition-all duration-200 hover:from-purple-500 hover:to-purple-400 hover:scale-105 active:scale-95"
          >
            {t("nav.cta")}
          </Link>
        </div>

        <button
          onClick={() => setIsMobileOpen(!isMobileOpen)}
          className="text-white md:hidden p-1"
          aria-label="Menu"
        >
          {isMobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden border-t border-white/[0.06] bg-[#0A0A0F]/95 backdrop-blur-xl md:hidden"
          >
            <div className="flex flex-col gap-1 px-6 py-4">
              {navLinks.map((link, i) => (
                <motion.div key={link.href} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1 }}>
                  <Link href={link.href} onClick={() => setIsMobileOpen(false)} className="block rounded-xl px-4 py-3 text-gray-300 transition-colors duration-200 hover:bg-white/5 hover:text-white">
                    {link.label}
                  </Link>
                </motion.div>
              ))}

              <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }} className="mt-2">
                <button onClick={toggleLocale} className="flex items-center gap-1.5 rounded-full border border-white/10 px-3 py-1.5 text-xs text-gray-300">
                  <Globe size={14} />
                  {locale === "ko" ? "🇰🇷 KR" : "🇺🇸 EN"}
                </button>
              </motion.div>

              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="mt-3">
                <Link href="/diagnose" onClick={() => setIsMobileOpen(false)} className="block rounded-xl bg-gradient-to-r from-purple-600 to-purple-500 px-5 py-3 text-center text-sm font-semibold text-white shadow-lg shadow-purple-500/25">
                  {t("nav.cta")}
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
