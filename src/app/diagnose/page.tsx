"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";

import ChatBubble, { TypingIndicator } from "@/components/diagnose/ChatBubble";
import OptionSelector, { SelectorOption } from "@/components/diagnose/OptionSelector";
import ProgressBar from "@/components/diagnose/ProgressBar";
import { countries } from "@/data/countries";
import { industries } from "@/data/industries";
import { questions } from "@/data/questions";
import { generateRoadmap } from "@/lib/gemini";
import type { DiagnosisInput } from "@/lib/types";
import { incrementDiagnosisCount } from "@/lib/plan";
import { useLocale } from "@/hooks/useLocale";

interface ChatEntry { role: "ai" | "user"; text: string; }
interface Answers { country: string; industry: string; team_size: string; location_type: string; budget: string; experience: string; }

const TOTAL_STEPS = 6;

export default function DiagnosePage() {
  const router = useRouter();
  const bottomRef = useRef<HTMLDivElement>(null);
  const { locale, t, tArray } = useLocale();
  const tips = tArray("diagnose.tips") as string[];

  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Partial<Answers>>({});
  const [chatHistory, setChatHistory] = useState<ChatEntry[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [showOptions, setShowOptions] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingPct, setLoadingPct] = useState(0);
  const [tipIndex, setTipIndex] = useState(0);
  const [loadingError, setLoadingError] = useState<string | null>(null);

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: "smooth" }); }, [chatHistory, isTyping, showOptions]);
  useEffect(() => { pushAI(t("diagnose.welcome")); /* eslint-disable-next-line react-hooks/exhaustive-deps */ }, []);

  function pushAI(text: string) {
    setIsTyping(true); setShowOptions(false);
    setTimeout(() => { setChatHistory((h) => [...h, { role: "ai", text }]); setIsTyping(false); setShowOptions(true); }, 800);
  }

  function getCountryFlag(code: string) { return countries.find((c) => c.code === code)?.flag ?? ""; }
  function getCountryName(code: string) { const c = countries.find((c) => c.code === code); return locale === "en" ? c?.name_en ?? "" : c?.name_ko ?? ""; }

  const handleSelect = useCallback((value: string, label: string) => {
    setChatHistory((h) => [...h, { role: "user", text: label }]);
    setShowOptions(false);
    const nextStep = currentStep + 1;
    const keys: (keyof Answers)[] = ["country", "industry", "team_size", "location_type", "budget", "experience"];
    const updated = { ...answers, [keys[currentStep]]: value };
    setAnswers(updated);
    setCurrentStep(nextStep);

    if (nextStep === 1) {
      pushAI(`${getCountryFlag(value)} ${getCountryName(value)}${t("diagnose.country_ask")}`);
    } else if (nextStep === 2) { pushAI(t("diagnose.industry_ask"));
    } else if (nextStep === 3) { pushAI(t("diagnose.team_ask"));
    } else if (nextStep === 4) { pushAI(t("diagnose.location_ask"));
    } else if (nextStep === 5) { pushAI(t("diagnose.budget_ask"));
    } else if (nextStep >= TOTAL_STEPS) { startLoading(updated as Answers); }
    /* eslint-disable-next-line react-hooks/exhaustive-deps */
  }, [currentStep, answers, locale]);

  function handleBack() {
    if (currentStep <= 0) return;
    setChatHistory((h) => { const c = [...h]; if (c.length && c[c.length - 1].role === "user") c.pop(); if (c.length && c[c.length - 1].role === "ai") c.pop(); return c; });
    const keys: (keyof Answers)[] = ["country", "industry", "team_size", "location_type", "budget", "experience"];
    const prev = currentStep - 1;
    const updated = { ...answers }; delete updated[keys[prev]];
    setAnswers(updated); setCurrentStep(prev); setShowOptions(true); setIsTyping(false);
  }

  async function startLoading(finalAnswers: Answers) {
    incrementDiagnosisCount();
    setIsLoading(true); setLoadingPct(0); setTipIndex(0); setLoadingError(null);
    let pct = 0;
    const progressInterval = setInterval(() => { pct += 1; setLoadingPct(Math.min(pct, 90)); if (pct >= 90) clearInterval(progressInterval); }, 120);
    let tip = 0;
    const tipInterval = setInterval(() => { tip = (tip + 1) % tips.length; setTipIndex(tip); }, 2000);

    try {
      const input: DiagnosisInput = {
        country: finalAnswers.country, industry: finalAnswers.industry, locale,
        answers: { team_size: finalAnswers.team_size, location_type: finalAnswers.location_type, budget: finalAnswers.budget, experience: finalAnswers.experience },
      };
      const roadmap = await generateRoadmap(input);
      localStorage.setItem(`roadmap_${roadmap.id}`, JSON.stringify(roadmap));
      clearInterval(progressInterval); setLoadingPct(100); clearInterval(tipInterval);
      setTimeout(() => { router.push(`/result?id=${roadmap.id}`); }, 600);
    } catch (err) {
      console.error("Gemini API error:", err);
      clearInterval(progressInterval); clearInterval(tipInterval);
      setLoadingError(t("diagnose.error"));
    }
  }

  function getCurrentOptions(): { options: SelectorOption[]; layout: "grid-2" | "grid-4" | "buttons" } {
    const isEn = locale === "en";
    if (currentStep === 0) return { options: countries.map((c) => ({ value: c.code, label: isEn ? c.name_en : c.name_ko, icon: c.flag, sub: c.currency })), layout: "grid-4" };
    if (currentStep === 1) return { options: industries.map((ind) => ({ value: ind.id, label: isEn ? ind.label_en : ind.label_ko, icon: ind.icon })), layout: "grid-2" };
    const q = questions[currentStep - 2];
    return { options: q.options.map((o) => ({ value: o.value, label: isEn ? o.label_en : o.label_ko, icon: o.icon })), layout: "buttons" };
  }

  // --- loading ---
  if (isLoading) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center px-6">
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="w-full max-w-md text-center">
          <motion.div animate={{ rotate: 360 }} transition={{ duration: 2, repeat: Infinity, ease: "linear" }} className="mx-auto mb-6 text-5xl w-fit">✨</motion.div>
          <h2 className="text-xl font-bold">{t("diagnose.loading")}</h2>
          <div className="mx-auto mt-8 max-w-xs">
            <div className="h-2 w-full overflow-hidden rounded-full bg-white/5"><motion.div className="h-full rounded-full bg-gradient-to-r from-primary to-accent" style={{ width: `${loadingPct}%` }} /></div>
            <p className="mt-2 text-sm text-gray-400">{loadingPct}%</p>
          </div>
          {!loadingError && (
            <AnimatePresence mode="wait">
              <motion.p key={tipIndex} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.3 }} className="mt-8 text-sm text-gray-500">{tips[tipIndex]}</motion.p>
            </AnimatePresence>
          )}
          {loadingError && (
            <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="mt-8">
              <p className="text-sm text-red-400">{loadingError}</p>
              <button onClick={() => { setIsLoading(false); setCurrentStep(TOTAL_STEPS - 1); setShowOptions(true); setChatHistory((h) => { const c = [...h]; if (c.length && c[c.length - 1].role === "user") c.pop(); return c; }); }} className="mt-4 rounded-xl border border-white/10 px-6 py-2 text-sm text-gray-300 transition-colors duration-200 hover:bg-white/5">{t("diagnose.back")}</button>
            </motion.div>
          )}
        </motion.div>
      </div>
    );
  }

  // --- chat ---
  const opts = getCurrentOptions();
  return (
    <div className="flex min-h-screen flex-col bg-[#0A0A0F]">
      <div className="sticky top-0 z-40 border-b border-white/[0.06] bg-[#0A0A0F]/90 backdrop-blur-xl px-4 py-3 sm:px-6">
        <div className="mx-auto flex max-w-2xl items-center gap-3">
          {currentStep > 0 ? (
            <button onClick={handleBack} className="flex h-8 w-8 items-center justify-center rounded-xl text-gray-400 transition-colors duration-200 hover:bg-white/5 hover:text-white"><ArrowLeft size={18} /></button>
          ) : (
            <Link href="/" className="flex h-8 w-8 items-center justify-center rounded-xl text-gray-400 transition-colors duration-200 hover:bg-white/5 hover:text-white"><ArrowLeft size={18} /></Link>
          )}
          <div className="flex-1"><ProgressBar current={Math.min(currentStep, TOTAL_STEPS)} total={TOTAL_STEPS} /></div>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto">
        <div className="mx-auto max-w-2xl px-4 py-6 sm:px-6">
          <div className="space-y-4">
            {chatHistory.map((entry, i) => (
              <ChatBubble key={i} role={entry.role}>
                {entry.text.split("\n").map((line, j) => (<span key={j}>{line}{j < entry.text.split("\n").length - 1 && <br />}</span>))}
              </ChatBubble>
            ))}
            <AnimatePresence>{isTyping && <TypingIndicator />}</AnimatePresence>
            {showOptions && !isTyping && currentStep < TOTAL_STEPS && (
              <div className="pt-2"><OptionSelector options={opts.options} layout={opts.layout} onSelect={handleSelect} /></div>
            )}
            <div ref={bottomRef} />
          </div>
        </div>
      </div>
    </div>
  );
}
