"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Mail, Rocket } from "lucide-react";
import { useLocale } from "@/hooks/useLocale";

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5 },
};

export default function Footer() {
  const { t, tArray } = useLocale();
  const serviceLinks = tArray("footer.service_links") as { label: string; href: string }[];
  const infoLinks = tArray("footer.info_links") as { label: string; href: string }[];
  const legalLinks = tArray("footer.legal_links") as { label: string; href: string }[];

  return (
    <footer className="border-t border-zinc-700/50 bg-[#09090B]">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-10 md:grid-cols-5">
          {/* Brand */}
          <motion.div {...fadeInUp} className="md:col-span-2">
            <Link href="/" className="mb-4 flex items-center gap-2">
              <Rocket className="text-violet-400" size={20} />
              <span className="text-lg font-bold bg-gradient-to-r from-violet-400 to-blue-400 bg-clip-text text-transparent">
                {t("nav.logo")}
              </span>
            </Link>
            <p className="text-sm leading-relaxed text-zinc-400">{t("footer.company")}</p>
            <p className="mt-1 text-sm text-zinc-500">{t("footer.desc")}</p>
            <a href="mailto:innove.startup@gmail.com" className="mt-4 flex items-center gap-2 text-sm text-zinc-400 transition-colors duration-200 hover:text-violet-400">
              <Mail size={16} />
              innove.startup@gmail.com
            </a>
          </motion.div>

          {/* Service links */}
          <motion.div {...fadeInUp} transition={{ duration: 0.5, delay: 0.1 }}>
            <h3 className="mb-4 text-sm font-semibold text-zinc-200">{t("footer.service_title")}</h3>
            <ul className="space-y-2.5">
              {serviceLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-zinc-400 transition-colors duration-200 hover:text-violet-400">{link.label}</Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Info links */}
          <motion.div {...fadeInUp} transition={{ duration: 0.5, delay: 0.15 }}>
            <h3 className="mb-4 text-sm font-semibold text-zinc-200">{t("footer.info_title")}</h3>
            <ul className="space-y-2.5">
              {infoLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-zinc-400 transition-colors duration-200 hover:text-violet-400">{link.label}</Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Legal links */}
          <motion.div {...fadeInUp} transition={{ duration: 0.5, delay: 0.2 }}>
            <h3 className="mb-4 text-sm font-semibold text-zinc-200">{t("footer.legal_title")}</h3>
            <ul className="space-y-2.5">
              {legalLinks.map((link) => (
                <li key={link.href + link.label}>
                  <Link href={link.href} className="text-sm text-zinc-400 transition-colors duration-200 hover:text-violet-400">{link.label}</Link>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        <div className="mt-12 border-t border-zinc-700/50 pt-6 text-center">
          <p className="text-xs text-zinc-500">&copy; 2026 INNOVE. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
