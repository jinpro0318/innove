"use client";

import { useEffect, useState, useCallback, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Check, ChevronDown, Share2, Link2, X, RefreshCw, Crown, Calendar, Gift } from "lucide-react";
import type { RoadmapResult, RoadmapPhase, ChecklistItem } from "@/lib/types";
import { countries } from "@/data/countries";
import { industries } from "@/data/industries";
import { useLocale } from "@/hooks/useLocale";

const fadeUp = { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 } };

function ResultContent() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id") ?? "";
  const { locale, t } = useLocale();

  const [result, setResult] = useState<RoadmapResult | null>(null);
  const [notFound, setNotFound] = useState(false);
  const [openPhases, setOpenPhases] = useState<Set<number>>(new Set([0]));
  const [openItems, setOpenItems] = useState<Set<string>>(new Set());
  const [checkedItems, setCheckedItems] = useState<Set<string>>(new Set());
  const [showShareModal, setShowShareModal] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!id) { setNotFound(true); return; }
    const raw = localStorage.getItem(`roadmap_${id}`);
    if (!raw) { setNotFound(true); return; }
    try { const parsed: RoadmapResult = JSON.parse(raw); setResult(parsed); const saved = localStorage.getItem(`checks_${id}`); if (saved) setCheckedItems(new Set(JSON.parse(saved))); } catch { setNotFound(true); }
  }, [id]);

  const persistChecks = useCallback((next: Set<string>) => { localStorage.setItem(`checks_${id}`, JSON.stringify([...next])); }, [id]);
  function togglePhase(idx: number) { setOpenPhases((prev) => { const next = new Set(prev); next.has(idx) ? next.delete(idx) : next.add(idx); return next; }); }
  function toggleItem(key: string) { setOpenItems((prev) => { const next = new Set(prev); next.has(key) ? next.delete(key) : next.add(key); return next; }); }
  function toggleCheck(key: string) { setCheckedItems((prev) => { const next = new Set(prev); next.has(key) ? next.delete(key) : next.add(key); persistChecks(next); return next; }); }
  function getPhaseProgress(phase: RoadmapPhase, phaseIdx: number) { let done = 0; phase.items.forEach((_, i) => { if (checkedItems.has(`${phaseIdx}-${i}`)) done++; }); return { done, total: phase.items.length }; }

  async function handleCopyLink() { try { await navigator.clipboard.writeText(window.location.href); setCopied(true); setTimeout(() => setCopied(false), 2000); } catch { /* */ } }
  function handleShareTwitter() {
    const text = locale === "en" ? "I created my custom startup roadmap with StartupMate AI! 🚀" : "AI 창업 비서 StartupMate로 맞춤 창업 로드맵을 만들었어요! 🚀";
    window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(window.location.href)}`, "_blank");
  }

  if (notFound) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center px-6 text-center">
        <span className="text-5xl mb-4">🔍</span>
        <h1 className="text-2xl font-bold">{t("result.not_found")}</h1>
        <p className="mt-2 text-gray-400">{t("result.not_found_desc")}</p>
        <Link href="/diagnose" className="mt-6 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-purple-600 to-purple-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-purple-500/25">{t("result.new_start")}</Link>
      </div>
    );
  }

  if (!result) return <div className="flex min-h-screen items-center justify-center"><div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" /></div>;

  const country = countries.find((c) => c.code === result.input.country);
  const industry = industries.find((i) => i.id === result.input.industry);

  return (
    <div className="min-h-screen bg-[#0A0A0F] pb-20">
      <div className="mx-auto max-w-3xl px-4 pt-24 sm:px-6">
        {/* Header */}
        <motion.section {...fadeUp} transition={{ duration: 0.5 }}>
          <h1 className="text-2xl font-bold sm:text-3xl">{t("result.title")}</h1>
          <p className="mt-3 text-base text-gray-400 leading-relaxed">{result.summary}</p>
          <div className="mt-4 flex flex-wrap gap-2">
            {country && <span className="inline-flex items-center gap-1 rounded-full bg-white/5 border border-white/[0.06] px-3 py-1 text-xs">{country.flag} {locale === "en" ? country.name_en : country.name_ko}</span>}
            {industry && <span className="inline-flex items-center gap-1 rounded-full bg-white/5 border border-white/[0.06] px-3 py-1 text-xs">{industry.icon} {locale === "en" ? industry.label_en : industry.label_ko}</span>}
            {Object.entries(result.input.answers).map(([k, v]) => (<span key={k} className="rounded-full bg-white/5 border border-white/[0.06] px-3 py-1 text-xs text-gray-400">{v}</span>))}
          </div>
        </motion.section>

        {/* Cost */}
        <motion.section {...fadeUp} transition={{ duration: 0.5, delay: 0.1 }} className="mt-8">
          <div className="rounded-2xl border border-white/[0.06] bg-white/[0.03] p-6 md:p-8">
            <p className="text-sm text-gray-400">{t("result.cost_label")}</p>
            <p className="mt-1 text-3xl font-bold text-accent">{result.totalEstimatedCost}</p>
            <p className="mt-2 text-xs text-gray-500">{t("result.cost_note")}</p>
          </div>
        </motion.section>

        {/* Roadmap */}
        <motion.section {...fadeUp} transition={{ duration: 0.5, delay: 0.2 }} className="mt-10">
          <h2 className="text-lg font-bold mb-5">{t("result.roadmap_title")}</h2>
          <div className="space-y-4">
            {result.phases.map((phase, phaseIdx) => {
              const { done, total } = getPhaseProgress(phase, phaseIdx);
              const isOpen = openPhases.has(phaseIdx);
              return (
                <motion.div key={phaseIdx} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.1 * phaseIdx }} className="overflow-hidden rounded-2xl border border-white/[0.06] bg-white/[0.03]" style={{ borderLeft: `4px solid ${phase.color}` }}>
                  <button onClick={() => togglePhase(phaseIdx)} className="flex w-full items-center gap-3 px-5 py-4 text-left transition-colors duration-200 hover:bg-white/[0.02]">
                    <span className="text-xl">{phase.icon}</span>
                    <div className="flex-1 min-w-0">
                      <span className="text-sm font-semibold">{phase.phase}</span>
                      <div className="mt-1 flex items-center gap-2">
                        <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-white/5"><div className="h-full rounded-full bg-accent transition-all duration-300" style={{ width: total > 0 ? `${(done / total) * 100}%` : "0%" }} /></div>
                        <span className="text-xs text-gray-500 shrink-0">{done}/{total}</span>
                      </div>
                    </div>
                    <motion.div animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.2 }}><ChevronDown size={18} className="text-gray-500" /></motion.div>
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.25 }} className="overflow-hidden">
                        <div className="border-t border-white/5 px-5 py-3 space-y-1">
                          {phase.items.map((item, itemIdx) => (
                            <ChecklistRow key={itemIdx} item={item} itemKey={`${phaseIdx}-${itemIdx}`} isChecked={checkedItems.has(`${phaseIdx}-${itemIdx}`)} isDescOpen={openItems.has(`${phaseIdx}-${itemIdx}`)} onToggleCheck={() => toggleCheck(`${phaseIdx}-${itemIdx}`)} onToggleDesc={() => toggleItem(`${phaseIdx}-${itemIdx}`)} requiredLabel={t("result.required")} />
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>
        </motion.section>

        {/* Tax Calendar */}
        {result.taxCalendar?.length > 0 && (
          <motion.section {...fadeUp} transition={{ duration: 0.5, delay: 0.3 }} className="mt-10">
            <h2 className="text-lg font-bold mb-5 flex items-center gap-2"><Calendar size={20} className="text-warm" />{t("result.tax_title")}</h2>
            <div className="rounded-2xl border border-white/[0.06] bg-white/[0.03] divide-y divide-white/5">
              {result.taxCalendar.map((tax, i) => (
                <div key={i} className="flex items-center gap-4 px-5 py-3.5">
                  <span className="shrink-0 w-10 text-sm font-semibold text-gray-300">{tax.month}</span>
                  <span className="flex-1 text-sm text-gray-400">{tax.event}</span>
                  <span className={`shrink-0 rounded-full px-2.5 py-0.5 text-xs font-medium ${tax.type === "필수" || tax.type === "Required" ? "bg-red-500/10 text-red-400 border border-red-500/20" : "bg-yellow-500/10 text-yellow-400 border border-yellow-500/20"}`}>{tax.type}</span>
                </div>
              ))}
            </div>
          </motion.section>
        )}

        {/* Government Support */}
        {result.governmentSupport?.length > 0 && (
          <motion.section {...fadeUp} transition={{ duration: 0.5, delay: 0.4 }} className="mt-10">
            <h2 className="text-lg font-bold mb-5 flex items-center gap-2"><Gift size={20} className="text-primary" />{t("result.support_title")}</h2>
            <div className="space-y-3">
              {result.governmentSupport.map((prog, i) => (
                <div key={i} className="rounded-2xl border border-white/[0.06] bg-white/[0.03] p-5 md:p-6">
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="text-sm font-semibold">{prog.name}</h3>
                    <span className="shrink-0 rounded-full bg-accent/10 border border-accent/20 px-3 py-0.5 text-xs font-medium text-accent">{prog.amount}</span>
                  </div>
                  <p className="mt-2 text-sm text-gray-400 leading-relaxed">{prog.description}</p>
                </div>
              ))}
            </div>
          </motion.section>
        )}

        {/* Share */}
        <motion.section {...fadeUp} transition={{ duration: 0.5, delay: 0.5 }} className="mt-10 text-center">
          <button onClick={() => setShowShareModal(true)} className="inline-flex items-center gap-2 rounded-xl border border-white/10 px-6 py-2.5 text-sm text-gray-300 transition-all duration-200 hover:bg-white/5 hover:text-white">
            <Share2 size={16} />{t("result.share")}
          </button>
        </motion.section>

        {/* Next Steps */}
        <motion.section {...fadeUp} transition={{ duration: 0.5, delay: 0.6 }} className="mt-12">
          <h2 className="text-lg font-bold mb-5">{t("result.next_steps_title")}</h2>
          <div className="grid gap-4 sm:grid-cols-3">
            <Link href="/register-guide" className="group rounded-2xl border border-zinc-800 bg-zinc-900/50 p-6 transition-all duration-300 hover:border-violet-500/30 hover:-translate-y-1">
              <span className="text-2xl">🧭</span>
              <h3 className="mt-3 text-sm font-bold text-zinc-100">{t("result.next_steps_register")}</h3>
              <p className="mt-1 text-xs text-zinc-400 leading-relaxed">{t("result.next_steps_register_desc")}</p>
            </Link>
            <Link href="/location" className="group rounded-2xl border border-zinc-800 bg-zinc-900/50 p-6 transition-all duration-300 hover:border-violet-500/30 hover:-translate-y-1">
              <span className="text-2xl">🗺️</span>
              <h3 className="mt-3 text-sm font-bold text-zinc-100">{t("result.next_steps_location")}</h3>
              <p className="mt-1 text-xs text-zinc-400 leading-relaxed">{t("result.next_steps_location_desc")}</p>
            </Link>
            <Link href="/diagnose" className="group rounded-2xl border border-zinc-800 bg-zinc-900/50 p-6 transition-all duration-300 hover:border-violet-500/30 hover:-translate-y-1">
              <span className="text-2xl">🔄</span>
              <h3 className="mt-3 text-sm font-bold text-zinc-100">{t("result.next_steps_retry")}</h3>
              <p className="mt-1 text-xs text-zinc-400 leading-relaxed">{t("result.next_steps_retry_desc")}</p>
            </Link>
          </div>
        </motion.section>

        {/* Bottom CTAs */}
        <motion.section {...fadeUp} transition={{ duration: 0.5, delay: 0.7 }} className="mt-8 space-y-4">
          <Link href="/pricing" className="flex items-center gap-3 rounded-2xl border border-violet-500/20 bg-violet-500/5 p-5 transition-colors duration-200 hover:bg-violet-500/10">
            <Crown size={20} className="text-violet-400 shrink-0" />
            <div className="flex-1 min-w-0"><p className="text-sm font-semibold text-zinc-100">{t("result.upgrade_title")}</p><p className="text-xs text-zinc-400 mt-0.5">{t("result.upgrade_desc")}</p></div>
          </Link>
        </motion.section>
      </div>

      {/* Share Modal */}
      <AnimatePresence>
        {showShareModal && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm px-6" onClick={() => setShowShareModal(false)}>
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} onClick={(e) => e.stopPropagation()} className="w-full max-w-sm rounded-2xl border border-white/10 bg-[#111118] p-6">
              <div className="flex items-center justify-between mb-5"><h3 className="text-base font-semibold">{t("result.share")}</h3><button onClick={() => setShowShareModal(false)} className="text-gray-400 hover:text-white"><X size={18} /></button></div>
              <div className="space-y-3">
                <button onClick={handleCopyLink} className="flex w-full items-center gap-3 rounded-xl border border-white/[0.06] bg-white/[0.03] px-4 py-3 text-sm transition-colors duration-200 hover:bg-white/5">
                  <Link2 size={18} className="text-accent shrink-0" /><span className="flex-1 text-left">{copied ? t("result.share_copied") : t("result.share_copy")}</span>{copied && <Check size={16} className="text-accent" />}
                </button>
                <button onClick={handleShareTwitter} className="flex w-full items-center gap-3 rounded-xl border border-white/[0.06] bg-white/[0.03] px-4 py-3 text-sm transition-colors duration-200 hover:bg-white/5">
                  <span className="text-base shrink-0">𝕏</span><span className="flex-1 text-left">{t("result.share_twitter")}</span>
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function ResultPage() {
  return (
    <Suspense fallback={<div className="flex min-h-screen items-center justify-center"><div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" /></div>}>
      <ResultContent />
    </Suspense>
  );
}

function ChecklistRow({ item, itemKey, isChecked, isDescOpen, onToggleCheck, onToggleDesc, requiredLabel }: { item: ChecklistItem; itemKey: string; isChecked: boolean; isDescOpen: boolean; onToggleCheck: () => void; onToggleDesc: () => void; requiredLabel: string }) {
  return (
    <div className="rounded-xl transition-colors duration-200 hover:bg-white/[0.02]">
      <div className="flex items-start gap-3 px-3 py-2.5">
        <button onClick={onToggleCheck} className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded border transition-all duration-200 min-h-[44px] min-w-[44px] -m-2.5 p-2.5 ${isChecked ? "border-accent bg-accent/20" : "border-white/20 hover:border-white/40"}`}>
          {isChecked && <Check size={12} className="text-accent" />}
        </button>
        <button onClick={onToggleDesc} className="flex-1 min-w-0 text-left">
          <span className={`text-sm transition-all duration-200 ${isChecked ? "text-accent/60 line-through" : "text-gray-200"}`}>{item.title}</span>
          <div className="mt-1 flex flex-wrap items-center gap-2">
            {item.tag && <span className="rounded bg-white/5 px-1.5 py-0.5 text-[10px] text-gray-500">{item.tag}</span>}
            {item.estimatedCost && <span className="text-[10px] text-accent/70">{item.estimatedCost}</span>}
            {item.isRequired && <span className="text-[10px] text-red-400/70">{requiredLabel}</span>}
          </div>
        </button>
        <motion.div animate={{ rotate: isDescOpen ? 180 : 0 }} transition={{ duration: 0.2 }} className="mt-1 shrink-0">
          <ChevronDown size={14} className="text-gray-600 cursor-pointer" onClick={onToggleDesc} />
        </motion.div>
      </div>
      <AnimatePresence initial={false}>
        {isDescOpen && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.2 }} className="overflow-hidden">
            <p className="px-11 pb-3 text-xs leading-relaxed text-gray-500">{item.description}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
