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
    <footer className="border-t border-zinc-800/80 bg-zinc-950">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-10 md:grid-cols-3">
          <motion.div {...fadeInUp}>
            <Link href="/" className="mb-4 flex items-center gap-2">
              <Rocket className="text-violet-400" size={20} />
              <span className="text-lg font-bold bg-gradient-to-r from-violet-400 to-blue-400 bg-clip-text text-transparent">
                {t("nav.logo")}
              </span>
            </Link>
            <p className="text-sm leading-relaxed text-zinc-500">{t("footer.company")}</p>
            <p className="mt-1 text-sm text-zinc-600">{t("footer.desc")}</p>
          </motion.div>

          <motion.div {...fadeInUp} transition={{ duration: 0.5, delay: 0.1 }}>
            <h3 className="mb-4 text-sm font-semibold text-zinc-300">{t("footer.links_title")}</h3>
            <ul className="space-y-2.5">
              {links.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-zinc-500 transition-colors duration-200 hover:text-violet-400">{link.label}</Link>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div {...fadeInUp} transition={{ duration: 0.5, delay: 0.2 }}>
            <h3 className="mb-4 text-sm font-semibold text-zinc-300">{t("footer.contact_title")}</h3>
            <a href="mailto:innove.startup@gmail.com" className="flex items-center gap-2 text-sm text-zinc-500 transition-colors duration-200 hover:text-accent">
              <Mail size={16} />
              innove.startup@gmail.com
            </a>
          </motion.div>
        </div>

        <div className="mt-12 border-t border-zinc-800/50 pt-6 text-center">
          <p className="text-xs text-zinc-600">&copy; 2026 INNOVE. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
