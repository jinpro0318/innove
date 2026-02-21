"use client";

import { useLocale } from "@/hooks/useLocale";

export default function Ticker() {
  const { tArray } = useLocale();
  const items = tArray("ticker.items") as string[];
  const repeated = [...items, ...items];

  return (
    <section className="relative overflow-hidden border-y border-white/[0.06] bg-[#08080D] py-4">
      <div className="ticker-wrapper">
        <div className="ticker-track">
          {repeated.map((item, i) => (
            <span key={i} className="ticker-item">{item}</span>
          ))}
        </div>
      </div>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-[#08080D] to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-[#08080D] to-transparent" />
      <style jsx>{`
        .ticker-wrapper { overflow: hidden; width: 100%; }
        .ticker-track { display: flex; width: max-content; animation: ticker-scroll 25s linear infinite; }
        .ticker-item { flex-shrink: 0; padding: 0 2rem; font-size: 0.875rem; color: #9ca3af; white-space: nowrap; }
        @keyframes ticker-scroll { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
      `}</style>
    </section>
  );
}
