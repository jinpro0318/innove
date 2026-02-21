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
  const links = tArray("footer.links") as { label: string; href: string }[];

  return (
    <footer className="border-t border-white/[0.06] bg-[#06060A]">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-10 md:grid-cols-3">
          <motion.div {...fadeInUp}>
            <Link href="/" className="mb-4 flex items-center gap-2">
              <Rocket className="text-primary" size={20} />
              <span className="text-lg font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                StartupMate
              </span>
            </Link>
            <p className="text-sm leading-relaxed text-gray-400">{t("footer.company")}</p>
            <p className="mt-1 text-sm text-gray-500">{t("footer.desc")}</p>
          </motion.div>

          <motion.div {...fadeInUp} transition={{ duration: 0.5, delay: 0.1 }}>
            <h3 className="mb-4 text-sm font-semibold text-white">{t("footer.links_title")}</h3>
            <ul className="space-y-2.5">
              {links.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-gray-400 transition-colors duration-200 hover:text-primary">{link.label}</Link>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div {...fadeInUp} transition={{ duration: 0.5, delay: 0.2 }}>
            <h3 className="mb-4 text-sm font-semibold text-white">{t("footer.contact_title")}</h3>
            <a href="mailto:innove.startup@gmail.com" className="flex items-center gap-2 text-sm text-gray-400 transition-colors duration-200 hover:text-accent">
              <Mail size={16} />
              innove.startup@gmail.com
            </a>
          </motion.div>
        </div>

        <div className="mt-12 border-t border-white/5 pt-6 text-center">
          <p className="text-xs text-gray-500">&copy; 2026 INNOVE. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
