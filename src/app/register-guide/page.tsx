"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ChevronDown } from "lucide-react";

import ChatBubble, { TypingIndicator } from "@/components/diagnose/ChatBubble";
import OptionSelector, { SelectorOption } from "@/components/diagnose/OptionSelector";
import ProgressBar from "@/components/diagnose/ProgressBar";
import { businessCategories, type BusinessCode } from "@/data/business-codes";
import { useLocale } from "@/hooks/useLocale";

const TOTAL_STEPS = 4;

interface ChatEntry {
  role: "ai" | "user";
  text: string;
  widget?: "codes" | "tax" | "location";
}

interface Answers {
  category: string;
  businessCode: string;
  taxType: string;
  locationType: string;
}

interface RegistrationResult {
  summary: string;
  steps: { title: string; description: string; where: string; documents: string; time: string; cost: string; isRequired: boolean }[];
  totalTime: string;
  totalCost: string;
  tips: string[];
  warnings: string[];
}

export default function RegisterGuidePage() {
  const bottomRef = useRef<HTMLDivElement>(null);
  const { locale, t, tArray } = useLocale();
  const tips = tArray("register_guide.step4_tips") as string[];
  const isEn = locale === "en";

  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Partial<Answers>>({});
  const [chatHistory, setChatHistory] = useState<ChatEntry[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [showOptions, setShowOptions] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingPct, setLoadingPct] = useState(0);
  const [tipIndex, setTipIndex] = useState(0);
  const [loadingError, setLoadingError] = useState<string | null>(null);
  const [selectedCodes, setSelectedCodes] = useState<BusinessCode[]>([]);
  const [result, setResult] = useState<RegistrationResult | null>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatHistory, isTyping, showOptions, result]);

  useEffect(() => {
    pushAI(t("register_guide.step1_ask"));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function pushAI(text: string, widget?: ChatEntry["widget"]) {
    setIsTyping(true);
    setShowOptions(false);
    setTimeout(() => {
      setChatHistory((h) => [...h, { role: "ai", text, widget }]);
      setIsTyping(false);
      setShowOptions(true);
    }, 800);
  }

  const handleSelect = useCallback(
    (value: string, label: string) => {
      setChatHistory((h) => [...h, { role: "user", text: label }]);
      setShowOptions(false);
      const nextStep = currentStep + 1;
      const keys: (keyof Answers)[] = ["category", "businessCode", "taxType", "locationType"];
      const updated = { ...answers, [keys[currentStep]]: value };
      setAnswers(updated);
      setCurrentStep(nextStep);

      if (nextStep === 1) {
        // Show business codes for selected category
        const cat = businessCategories.find((c) => c.id === value);
        if (cat) {
          setSelectedCodes(cat.codes);
          pushAI(t("register_guide.step1_codes_title") + "\n" + t("register_guide.step1_codes_sub"), "codes");
        }
      } else if (nextStep === 2) {
        // Show tax type comparison
        pushAI(t("register_guide.step2_ask"), "tax");
      } else if (nextStep === 3) {
        // Show location options
        pushAI(t("register_guide.step3_ask"), "location");
      } else if (nextStep >= TOTAL_STEPS) {
        startLoading(updated as Answers);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [currentStep, answers, locale]
  );

  function handleBack() {
    if (currentStep <= 0) return;
    setChatHistory((h) => {
      const c = [...h];
      if (c.length && c[c.length - 1].role === "user") c.pop();
      if (c.length && c[c.length - 1].role === "ai") c.pop();
      return c;
    });
    const keys: (keyof Answers)[] = ["category", "businessCode", "taxType", "locationType"];
    const prev = currentStep - 1;
    const updated = { ...answers };
    delete updated[keys[prev]];
    setAnswers(updated);
    setCurrentStep(prev);
    setShowOptions(true);
    setIsTyping(false);
    if (prev === 0) setSelectedCodes([]);
  }

  async function startLoading(finalAnswers: Answers) {
    setIsLoading(true);
    setLoadingPct(0);
    setTipIndex(0);
    setLoadingError(null);

    let pct = 0;
    const progressInterval = setInterval(() => {
      pct += 1;
      setLoadingPct(Math.min(pct, 90));
      if (pct >= 90) clearInterval(progressInterval);
    }, 120);
    let tip = 0;
    const tipInterval = setInterval(() => {
      tip = (tip + 1) % tips.length;
      setTipIndex(tip);
    }, 2000);

    try {
      const cat = businessCategories.find((c) => c.id === finalAnswers.category);
      const code = cat?.codes.find((c) => c.code === finalAnswers.businessCode);

      const { GoogleGenerativeAI } = await import("@google/generative-ai");
      const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY ?? "");
      const model = genAI.getGenerativeModel({
        model: "gemini-2.5-flash-lite",
        systemInstruction: `너는 한국 사업자등록 전문 컨설턴트 AI야.
사용자의 업종, 과세유형, 사업장 유형에 맞는 사업자등록 가이드를 생성해.

반드시 아래 JSON 형식으로만 응답해. 마크다운 코드블록이나 다른 텍스트 절대 포함하지 마.

{
  "summary": "한 줄 요약 (예: 간이과세 통신판매업 자택 사업자등록 가이드)",
  "steps": [
    {
      "title": "절차 제목",
      "description": "구체적 설명 (실제 사이트, 기관명 포함)",
      "where": "어디서 (홈택스, 세무서 등)",
      "documents": "필요 서류",
      "time": "소요 시간",
      "cost": "비용",
      "isRequired": true
    }
  ],
  "totalTime": "전체 예상 소요 시간",
  "totalCost": "전체 예상 비용",
  "tips": ["실용적인 꿀팁 3~5개"],
  "warnings": ["주의사항 2~3개"]
}

steps는 5~8개, 실제 한국 사업자등록 절차를 반영.
사용자 locale에 맞는 언어로 응답.`,
      });

      const langInstruction =
        locale === "en" ? "Respond entirely in English." : "한국어로 응답해줘.";

      const userPrompt = `업종: ${isEn ? code?.name_en : code?.name_ko} (${code?.code}), 과세유형: ${finalAnswers.taxType}, 사업장: ${finalAnswers.locationType}. 맞춤 사업자등록 가이드를 JSON으로 생성해줘. ${langInstruction}`;

      const aiResult = await model.generateContent(userPrompt);
      const text = aiResult.response.text();
      let cleaned = text.trim();
      cleaned = cleaned.replace(/^```(?:json)?\s*\n?/i, "");
      cleaned = cleaned.replace(/\n?\s*```$/i, "");
      const parsed: RegistrationResult = JSON.parse(cleaned.trim());

      clearInterval(progressInterval);
      setLoadingPct(100);
      clearInterval(tipInterval);

      setTimeout(() => {
        setIsLoading(false);
        setResult(parsed);
      }, 600);
    } catch (err) {
      console.error("Gemini API error:", err);
      clearInterval(progressInterval);
      clearInterval(tipInterval);
      setLoadingError(t("register_guide.error"));
    }
  }

  function getCurrentOptions(): { options: SelectorOption[]; layout: "grid-2" | "grid-4" | "buttons" } {
    if (currentStep === 0) {
      return {
        options: businessCategories.map((cat) => ({
          value: cat.id,
          label: isEn ? cat.label_en : cat.label_ko,
          icon: cat.icon,
        })),
        layout: "grid-2",
      };
    }
    if (currentStep === 1) {
      return {
        options: selectedCodes.map((code) => ({
          value: code.code,
          label: isEn ? code.name_en : code.name_ko,
          sub: `${code.code} · ${isEn ? code.desc_en : code.desc_ko}`,
        })),
        layout: "buttons",
      };
    }
    if (currentStep === 2) {
      return {
        options: [
          { value: "simplified", label: t("register_guide.simplified.name"), icon: "📊" },
          { value: "general", label: t("register_guide.general.name"), icon: "📈" },
          { value: "corporation", label: t("register_guide.corporation.name"), icon: "🏢" },
        ],
        layout: "buttons",
      };
    }
    // Step 3
    return {
      options: [
        { value: "home", label: t("register_guide.home.name"), icon: "🏠" },
        { value: "virtual", label: t("register_guide.virtual.name"), icon: "📮" },
        { value: "office", label: t("register_guide.office.name"), icon: "🏢" },
      ],
      layout: "buttons",
    };
  }

  // --- Result view ---
  if (result) {
    return (
      <div className="min-h-screen bg-[#0A0A0F] pb-20">
        <div className="mx-auto max-w-3xl px-4 pt-24 sm:px-6">
          <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <Link href="/register-guide" onClick={() => { setResult(null); setCurrentStep(0); setAnswers({}); setChatHistory([]); setSelectedCodes([]); setTimeout(() => pushAI(t("register_guide.step1_ask")), 100); }} className="inline-flex items-center gap-1 text-sm text-zinc-400 hover:text-zinc-200 mb-6 transition-colors">
              <ArrowLeft size={16} />
              {t("register_guide.back")}
            </Link>
            <h1 className="text-2xl font-bold sm:text-3xl">🧭 {t("register_guide.result_steps")}</h1>
            <p className="mt-3 text-base text-zinc-400 leading-relaxed">{result.summary}</p>
          </motion.section>

          {/* Summary cards */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }} className="mt-8 grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-5">
              <p className="text-xs text-zinc-500">{t("register_guide.result_total_time")}</p>
              <p className="mt-1 text-xl font-bold text-violet-400">{result.totalTime}</p>
            </div>
            <div className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-5">
              <p className="text-xs text-zinc-500">{t("register_guide.result_total_cost")}</p>
              <p className="mt-1 text-xl font-bold text-emerald-400">{result.totalCost}</p>
            </div>
          </motion.div>

          {/* Steps */}
          <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }} className="mt-10">
            <h2 className="text-lg font-bold mb-5">{t("register_guide.result_steps")}</h2>
            <div className="space-y-4">
              {result.steps.map((step, i) => (
                <StepCard key={i} step={step} index={i} t={t} />
              ))}
            </div>
          </motion.section>

          {/* Tips */}
          {result.tips?.length > 0 && (
            <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.3 }} className="mt-10">
              <h2 className="text-lg font-bold mb-4">💡 {t("register_guide.result_tips")}</h2>
              <div className="space-y-2">
                {result.tips.map((tip, i) => (
                  <div key={i} className="rounded-xl border border-zinc-800 bg-zinc-900/50 px-5 py-3 text-sm text-zinc-300">{tip}</div>
                ))}
              </div>
            </motion.section>
          )}

          {/* Warnings */}
          {result.warnings?.length > 0 && (
            <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.4 }} className="mt-10">
              <h2 className="text-lg font-bold mb-4">⚠️ {t("register_guide.result_warnings")}</h2>
              <div className="space-y-2">
                {result.warnings.map((w, i) => (
                  <div key={i} className="rounded-xl border border-amber-500/20 bg-amber-500/5 px-5 py-3 text-sm text-amber-300">{w}</div>
                ))}
              </div>
            </motion.section>
          )}

          {/* Bottom CTAs */}
          <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.5 }} className="mt-12 space-y-3">
            <Link href={answers.category ? `/location?industry=${answers.category}` : "/location"} className="flex items-center justify-center gap-2 rounded-2xl border border-violet-500/20 bg-violet-500/5 p-4 text-sm text-violet-300 transition-colors duration-200 hover:bg-violet-500/10 hover:text-violet-200">
              {t("register_guide.result_cta_location")}
            </Link>
            <Link href="/diagnose" className="flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-violet-600 to-blue-600 p-4 text-sm font-semibold text-white shadow-lg shadow-violet-500/20 transition-all hover:from-violet-500 hover:to-blue-500">
              {t("register_guide.result_cta_diagnose")}
            </Link>
          </motion.section>
        </div>
      </div>
    );
  }

  // --- Loading ---
  if (isLoading) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center px-6">
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="w-full max-w-md text-center">
          <motion.div animate={{ rotate: 360 }} transition={{ duration: 2, repeat: Infinity, ease: "linear" }} className="mx-auto mb-6 text-5xl w-fit">🧭</motion.div>
          <h2 className="text-xl font-bold">{t("register_guide.step4_loading")}</h2>
          <div className="mx-auto mt-8 max-w-xs">
            <div className="h-2 w-full overflow-hidden rounded-full bg-white/5">
              <motion.div className="h-full rounded-full bg-gradient-to-r from-violet-500 to-blue-500" style={{ width: `${loadingPct}%` }} />
            </div>
            <p className="mt-2 text-sm text-zinc-400">{loadingPct}%</p>
          </div>
          {!loadingError && (
            <AnimatePresence mode="wait">
              <motion.p key={tipIndex} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.3 }} className="mt-8 text-sm text-zinc-500">{tips[tipIndex]}</motion.p>
            </AnimatePresence>
          )}
          {loadingError && (
            <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="mt-8">
              <p className="text-sm text-red-400">{loadingError}</p>
              <button
                onClick={() => {
                  setIsLoading(false);
                  setCurrentStep(TOTAL_STEPS - 1);
                  setShowOptions(true);
                  setChatHistory((h) => {
                    const c = [...h];
                    if (c.length && c[c.length - 1].role === "user") c.pop();
                    return c;
                  });
                }}
                className="mt-4 rounded-xl border border-zinc-700 px-6 py-2 text-sm text-zinc-300 transition-colors duration-200 hover:bg-zinc-800"
              >
                {t("register_guide.back")}
              </button>
            </motion.div>
          )}
        </motion.div>
      </div>
    );
  }

  // --- Chat ---
  const opts = getCurrentOptions();
  return (
    <div className="flex min-h-screen flex-col bg-[#0A0A0F]">
      <div className="sticky top-0 z-40 border-b border-zinc-800/50 bg-[#0A0A0F]/90 backdrop-blur-xl px-4 py-3 sm:px-6">
        <div className="mx-auto flex max-w-2xl items-center gap-3">
          {currentStep > 0 ? (
            <button onClick={handleBack} className="flex h-8 w-8 items-center justify-center rounded-xl text-zinc-400 transition-colors duration-200 hover:bg-zinc-800 hover:text-white">
              <ArrowLeft size={18} />
            </button>
          ) : (
            <Link href="/" className="flex h-8 w-8 items-center justify-center rounded-xl text-zinc-400 transition-colors duration-200 hover:bg-zinc-800 hover:text-white">
              <ArrowLeft size={18} />
            </Link>
          )}
          <div className="flex-1">
            <ProgressBar current={Math.min(currentStep, TOTAL_STEPS)} total={TOTAL_STEPS} />
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        <div className="mx-auto max-w-2xl px-4 py-6 sm:px-6">
          <div className="space-y-4">
            {chatHistory.map((entry, i) => (
              <div key={i}>
                <ChatBubble role={entry.role}>
                  {entry.text.split("\n").map((line, j) => (
                    <span key={j}>
                      {line}
                      {j < entry.text.split("\n").length - 1 && <br />}
                    </span>
                  ))}
                </ChatBubble>
                {/* Tax comparison widget */}
                {entry.widget === "tax" && entry.role === "ai" && (
                  <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.2 }}
                    className="mt-3 ml-10"
                  >
                    <TaxComparison t={t} />
                  </motion.div>
                )}
                {/* Location info widget */}
                {entry.widget === "location" && entry.role === "ai" && (
                  <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.2 }}
                    className="mt-3 ml-10"
                  >
                    <LocationInfo t={t} selectedCategory={answers.category} />
                  </motion.div>
                )}
              </div>
            ))}
            <AnimatePresence>{isTyping && <TypingIndicator />}</AnimatePresence>
            {showOptions && !isTyping && currentStep < TOTAL_STEPS && (
              <div className="pt-2">
                <OptionSelector options={opts.options} layout={opts.layout} onSelect={handleSelect} />
              </div>
            )}
            <div ref={bottomRef} />
          </div>
        </div>
      </div>
    </div>
  );
}

// --- Tax Comparison Widget ---
function TaxComparison({ t }: { t: (key: string) => string }) {
  const types = ["simplified", "general", "corporation"] as const;
  return (
    <div className="space-y-3">
      {types.map((type) => (
        <div key={type} className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-4">
          <h4 className="text-sm font-bold text-zinc-100">{t(`register_guide.${type}.name`)}</h4>
          <div className="mt-2 space-y-1.5 text-xs text-zinc-400">
            <div className="flex gap-2">
              <span className="shrink-0 text-zinc-500 w-20">{t("register_guide.step2_condition")}</span>
              <span>{t(`register_guide.${type}.condition`)}</span>
            </div>
            <div className="flex gap-2">
              <span className="shrink-0 text-zinc-500 w-20">{t("register_guide.step2_vat")}</span>
              <span>{t(`register_guide.${type}.vat`)}</span>
            </div>
            <div className="flex gap-2">
              <span className="shrink-0 text-zinc-500 w-20">{t("register_guide.step2_invoice")}</span>
              <span>{t(`register_guide.${type}.invoice`)}</span>
            </div>
            <div className="flex gap-2">
              <span className="shrink-0 text-zinc-500 w-20">{t("register_guide.step2_pros")}</span>
              <span className="text-emerald-400">{t(`register_guide.${type}.pros`)}</span>
            </div>
            <div className="flex gap-2">
              <span className="shrink-0 text-zinc-500 w-20">{t("register_guide.step2_cons")}</span>
              <span className="text-red-400">{t(`register_guide.${type}.cons`)}</span>
            </div>
          </div>
          <p className="mt-2 text-[11px] text-violet-400">{t("register_guide.step2_recommend")}: {t(`register_guide.${type}.recommend`)}</p>
        </div>
      ))}
      <p className="text-[11px] text-zinc-500 px-1">{t("register_guide.step2_disclaimer")}</p>
    </div>
  );
}

// --- Location Info Widget ---
function LocationInfo({ t, selectedCategory }: { t: (key: string) => string; selectedCategory?: string }) {
  const types = ["home", "virtual", "office"] as const;
  const locationHref = selectedCategory ? `/location?industry=${selectedCategory}` : "/location";
  return (
    <div className="space-y-3">
      {types.map((type) => (
        <div key={type} className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-4">
          <h4 className="text-sm font-bold text-zinc-100">{t(`register_guide.${type}.name`)}</h4>
          <div className="mt-2 space-y-1.5 text-xs text-zinc-400">
            <div className="flex gap-2">
              <span className="shrink-0 text-zinc-500 w-16">{t("register_guide.step3_cost")}</span>
              <span className="text-emerald-400">{t(`register_guide.${type}.cost`)}</span>
            </div>
            <div className="flex gap-2">
              <span className="shrink-0 text-zinc-500 w-16">{t("register_guide.step3_caution")}</span>
              <span>{t(`register_guide.${type}.caution`)}</span>
            </div>
            <div className="flex gap-2">
              <span className="shrink-0 text-zinc-500 w-16">{t("register_guide.step3_suitable")}</span>
              <span>{t(`register_guide.${type}.suitable`)}</span>
            </div>
          </div>
          {(type === "virtual" || type === "office") && (
            <Link href={locationHref} className="mt-3 inline-block text-xs text-violet-400 hover:text-violet-300 transition-colors">
              {t(`register_guide.${type}.cta`)}
            </Link>
          )}
        </div>
      ))}
    </div>
  );
}

// --- Step Card for Result ---
function StepCard({ step, index, t }: { step: RegistrationResult["steps"][0]; index: number; t: (key: string) => string }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="rounded-2xl border border-zinc-800 bg-zinc-900/50 overflow-hidden">
      <button onClick={() => setIsOpen(!isOpen)} className="flex w-full items-center gap-3 px-5 py-4 text-left transition-colors hover:bg-zinc-800/30">
        <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-violet-500/20 text-xs font-bold text-violet-400">
          {index + 1}
        </div>
        <div className="flex-1 min-w-0">
          <span className="text-sm font-semibold text-zinc-100">{step.title}</span>
          {step.isRequired && (
            <span className="ml-2 text-[10px] text-red-400">{t("register_guide.result_required")}</span>
          )}
        </div>
        <motion.div animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.2 }}>
          <ChevronDown size={16} className="text-zinc-500" />
        </motion.div>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.25 }} className="overflow-hidden">
            <div className="border-t border-zinc-800 px-5 py-4 space-y-2 text-sm">
              <p className="text-zinc-300 leading-relaxed">{step.description}</p>
              <div className="grid grid-cols-2 gap-2 mt-3">
                <div className="rounded-lg bg-zinc-800/50 px-3 py-2">
                  <p className="text-[10px] text-zinc-500">{t("register_guide.result_where")}</p>
                  <p className="text-xs text-zinc-300 mt-0.5">{step.where}</p>
                </div>
                <div className="rounded-lg bg-zinc-800/50 px-3 py-2">
                  <p className="text-[10px] text-zinc-500">{t("register_guide.result_time")}</p>
                  <p className="text-xs text-zinc-300 mt-0.5">{step.time}</p>
                </div>
                <div className="rounded-lg bg-zinc-800/50 px-3 py-2">
                  <p className="text-[10px] text-zinc-500">{t("register_guide.result_cost")}</p>
                  <p className="text-xs text-emerald-400 mt-0.5">{step.cost}</p>
                </div>
                <div className="rounded-lg bg-zinc-800/50 px-3 py-2">
                  <p className="text-[10px] text-zinc-500">{t("register_guide.result_documents")}</p>
                  <p className="text-xs text-zinc-300 mt-0.5">{step.documents}</p>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
