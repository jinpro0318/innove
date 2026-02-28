"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ChevronDown } from "lucide-react";
import { Suspense } from "react";

import ChatBubble, { TypingIndicator } from "@/components/diagnose/ChatBubble";
import OptionSelector, { SelectorOption } from "@/components/diagnose/OptionSelector";
import ProgressBar from "@/components/diagnose/ProgressBar";
import { businessCategories, type BusinessCode } from "@/data/business-codes";
import { countries } from "@/data/countries";
import { getCountryStartupInfo, type BusinessStructure, type CountryStartupInfo } from "@/data/country-startup-info";
import { buildRegisterGuidePrompt } from "@/lib/gemini";
import { useLocale } from "@/hooks/useLocale";

const TOTAL_STEPS = 5; // 0: country, 1: category, 2: code/detail, 3: structure, 4: location

interface ChatEntry {
  role: "ai" | "user";
  text: string;
  widget?: "codes" | "tax" | "location" | "structure";
}

interface Answers {
  country: string;
  category: string;
  businessCode: string;
  structureType: string;
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

function RegisterGuideContent() {
  const searchParams = useSearchParams();
  const bottomRef = useRef<HTMLDivElement>(null);
  const { locale, t, tArray } = useLocale();
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
  const [countryInfo, setCountryInfo] = useState<CountryStartupInfo | null>(null);
  const [autoCountry, setAutoCountry] = useState<string | null>(null);

  // auto-detect country from URL params or localStorage
  useEffect(() => {
    const urlCountry = searchParams.get("country");
    const savedCountry = typeof window !== "undefined" ? localStorage.getItem("selected_country") : null;
    if (urlCountry && countries.find((c) => c.code === urlCountry)) {
      setAutoCountry(urlCountry);
    } else if (savedCountry && countries.find((c) => c.code === savedCountry)) {
      setAutoCountry(savedCountry);
    }
  }, [searchParams]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatHistory, isTyping, showOptions, result]);

  useEffect(() => {
    if (autoCountry) {
      const c = countries.find((co) => co.code === autoCountry);
      const name = isEn ? c?.name_en : c?.name_ko;
      pushAI(`${c?.flag} ${name} ${t("register_guide.country_auto_detected")}\n\n${t("register_guide.step1_ask")}`);
      const info = getCountryStartupInfo(autoCountry);
      setCountryInfo(info);
      setAnswers({ country: autoCountry });
      setCurrentStep(1);
    } else {
      pushAI(t("register_guide.step0_ask"));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const tips = countryInfo
    ? (isEn ? countryInfo.loadingTips_en : countryInfo.loadingTips_ko)
    : (tArray("register_guide.step4_tips") as string[]);

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
      const keys: (keyof Answers)[] = ["country", "category", "businessCode", "structureType", "locationType"];
      const updated = { ...answers, [keys[currentStep]]: value };
      setAnswers(updated);
      const nextStep = currentStep + 1;
      setCurrentStep(nextStep);

      if (currentStep === 0) {
        // Country selected → load country info, ask category
        const info = getCountryStartupInfo(value);
        setCountryInfo(info);
        pushAI(t("register_guide.step1_ask"));
      } else if (currentStep === 1) {
        // Category selected → show codes/details
        const isKR = updated.country === "KR";
        if (isKR) {
          const cat = businessCategories.find((c) => c.id === value);
          if (cat) {
            setSelectedCodes(cat.codes);
            pushAI(t("register_guide.step1_codes_title") + "\n" + t("register_guide.step1_codes_sub"), "codes");
          }
        } else {
          // For non-KR countries, use country-specific categories as detail selection
          const info = countryInfo;
          if (info) {
            const cat = info.businessCategories.find((c) => c.id === value);
            const desc = isEn ? cat?.desc_en : cat?.desc_ko;
            pushAI(`${desc ? desc + "\n\n" : ""}${t("register_guide.step2_detail_ask")}`, "codes");
          }
        }
      } else if (currentStep === 2) {
        // Code/detail selected → show business structure comparison
        pushAI(t("register_guide.step3_structure_ask"), "structure");
      } else if (currentStep === 3) {
        // Structure selected → show location options
        pushAI(t("register_guide.step3_ask"), "location");
      } else if (nextStep >= TOTAL_STEPS) {
        startLoading(updated as Answers);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [currentStep, answers, locale, countryInfo]
  );

  function handleBack() {
    if (currentStep <= 0 || (currentStep <= 1 && autoCountry)) return;
    setChatHistory((h) => {
      const c = [...h];
      if (c.length && c[c.length - 1].role === "user") c.pop();
      if (c.length && c[c.length - 1].role === "ai") c.pop();
      return c;
    });
    const keys: (keyof Answers)[] = ["country", "category", "businessCode", "structureType", "locationType"];
    const prev = currentStep - 1;
    const updated = { ...answers };
    delete updated[keys[prev]];
    setAnswers(updated);
    setCurrentStep(prev);
    setShowOptions(true);
    setIsTyping(false);
    if (prev <= 1) setSelectedCodes([]);
    if (prev === 0) setCountryInfo(null);
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
    const curTips = tips;
    const tipInterval = setInterval(() => {
      tip = (tip + 1) % curTips.length;
      setTipIndex(tip);
    }, 2000);

    try {
      const isKR = finalAnswers.country === "KR";

      // Get category/code label for prompt
      let categoryLabel = "";
      let codeLabel = "";
      if (isKR) {
        const cat = businessCategories.find((c) => c.id === finalAnswers.category);
        const code = cat?.codes.find((c) => c.code === finalAnswers.businessCode);
        categoryLabel = isEn ? (cat?.label_en ?? "") : (cat?.label_ko ?? "");
        codeLabel = `${isEn ? code?.name_en : code?.name_ko} (${code?.code})`;
      } else {
        const info = countryInfo;
        const cat = info?.businessCategories.find((c) => c.id === finalAnswers.category);
        categoryLabel = isEn ? (cat?.label_en ?? "") : (cat?.label_ko ?? "");
        codeLabel = finalAnswers.businessCode; // the detail value
      }

      // Get structure label
      const structure = countryInfo?.businessStructures.find((s) => s.id === finalAnswers.structureType);
      const structureLabel = isEn ? (structure?.name_en ?? finalAnswers.structureType) : (structure?.name_ko ?? finalAnswers.structureType);

      const { GoogleGenerativeAI } = await import("@google/generative-ai");
      const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY ?? "");
      const systemPrompt = buildRegisterGuidePrompt(finalAnswers.country, locale);
      const model = genAI.getGenerativeModel({
        model: "gemini-2.5-flash-lite",
        systemInstruction: systemPrompt,
      });

      const langInstruction =
        locale === "en" ? "Respond entirely in English." : "한국어로 응답해줘.";

      const userPrompt = `업종: ${categoryLabel} - ${codeLabel}, 사업자유형: ${structureLabel}, 사업장: ${finalAnswers.locationType}. 맞춤 사업자등록 가이드를 JSON으로 생성해줘. ${langInstruction}`;

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
    // Step 0: Country selection
    if (currentStep === 0) {
      return {
        options: countries.map((c) => ({
          value: c.code,
          label: isEn ? c.name_en : c.name_ko,
          icon: c.flag,
          sub: c.currency,
        })),
        layout: "grid-4",
      };
    }

    // Step 1: Category selection (country-specific or KR default)
    if (currentStep === 1) {
      const isKR = answers.country === "KR";
      if (isKR) {
        return {
          options: businessCategories.map((cat) => ({
            value: cat.id,
            label: isEn ? cat.label_en : cat.label_ko,
            icon: cat.icon,
          })),
          layout: "grid-2",
        };
      }
      // Non-KR: use country-specific categories
      if (countryInfo) {
        return {
          options: countryInfo.businessCategories.map((cat) => ({
            value: cat.id,
            label: isEn ? cat.label_en : cat.label_ko,
            icon: cat.icon,
          })),
          layout: "grid-2",
        };
      }
      return { options: [], layout: "grid-2" };
    }

    // Step 2: Code/detail selection
    if (currentStep === 2) {
      const isKR = answers.country === "KR";
      if (isKR) {
        return {
          options: selectedCodes.map((code) => ({
            value: code.code,
            label: isEn ? code.name_en : code.name_ko,
            sub: `${code.code} · ${isEn ? code.desc_en : code.desc_ko}`,
          })),
          layout: "buttons",
        };
      }
      // Non-KR: show sub-details based on selected category
      if (countryInfo) {
        const cat = countryInfo.businessCategories.find((c) => c.id === answers.category);
        if (cat) {
          return {
            options: [
              { value: isEn ? cat.desc_en : cat.desc_ko, label: isEn ? cat.label_en : cat.label_ko, icon: cat.icon },
            ],
            layout: "buttons",
          };
        }
      }
      return { options: [], layout: "buttons" };
    }

    // Step 3: Business structure comparison
    if (currentStep === 3) {
      if (countryInfo) {
        return {
          options: countryInfo.businessStructures.map((s) => ({
            value: s.id,
            label: isEn ? s.name_en : s.name_ko,
            icon: s.name_local ? undefined : "🏢",
            sub: s.name_local,
          })),
          layout: "buttons",
        };
      }
      // Fallback for KR (already in countryInfo, but just in case)
      return {
        options: [
          { value: "simplified", label: t("register_guide.simplified.name"), icon: "📊" },
          { value: "general", label: t("register_guide.general.name"), icon: "📈" },
          { value: "corporation", label: t("register_guide.corporation.name"), icon: "🏢" },
        ],
        layout: "buttons",
      };
    }

    // Step 4: Location type
    if (countryInfo) {
      return {
        options: countryInfo.locationTypes.map((loc) => ({
          value: loc.id,
          label: isEn ? loc.name_en : loc.name_ko,
          icon: loc.icon,
        })),
        layout: "buttons",
      };
    }
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
      <div className="min-h-screen bg-[#09090B] pb-20">
        <div className="mx-auto max-w-3xl px-4 pt-24 sm:px-6">
          <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <Link href="/register-guide" onClick={() => { setResult(null); setCurrentStep(autoCountry ? 1 : 0); setAnswers(autoCountry ? { country: autoCountry } : {}); setChatHistory([]); setSelectedCodes([]); setTimeout(() => pushAI(autoCountry ? t("register_guide.step1_ask") : t("register_guide.step0_ask")), 100); }} className="inline-flex items-center gap-1 text-sm text-zinc-400 hover:text-zinc-200 mb-6 transition-colors">
              <ArrowLeft size={16} />
              {t("register_guide.back")}
            </Link>
            <h1 className="text-2xl font-bold sm:text-3xl">🧭 {t("register_guide.result_steps")}</h1>
            <p className="mt-3 text-base text-zinc-400 leading-relaxed">{result.summary}</p>
          </motion.section>

          {/* Summary cards */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }} className="mt-8 grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl border border-zinc-700/50 bg-zinc-800/40 p-5">
              <p className="text-xs text-zinc-500">{t("register_guide.result_total_time")}</p>
              <p className="mt-1 text-xl font-bold text-violet-400">{result.totalTime}</p>
            </div>
            <div className="rounded-2xl border border-zinc-700/50 bg-zinc-800/40 p-5">
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
                  <div key={i} className="rounded-xl border border-zinc-700/50 bg-zinc-800/40 px-5 py-3 text-sm text-zinc-300">{tip}</div>
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
  const canGoBack = autoCountry ? currentStep > 1 : currentStep > 0;

  return (
    <div className="flex min-h-screen flex-col bg-[#09090B]">
      <div className="sticky top-0 z-40 border-b border-zinc-700/50 bg-[#09090B]/90 backdrop-blur-xl px-4 py-3 sm:px-6">
        <div className="mx-auto flex max-w-2xl items-center gap-3">
          {canGoBack ? (
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
                {/* Business structure comparison widget */}
                {entry.widget === "structure" && entry.role === "ai" && countryInfo && (
                  <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.2 }}
                    className="mt-3 ml-10"
                  >
                    <BusinessStructureComparison structures={countryInfo.businessStructures} isEn={isEn} t={t} />
                  </motion.div>
                )}
                {/* Legacy tax comparison widget for KR backward compat */}
                {entry.widget === "tax" && entry.role === "ai" && (
                  <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.2 }}
                    className="mt-3 ml-10"
                  >
                    {countryInfo ? (
                      <BusinessStructureComparison structures={countryInfo.businessStructures} isEn={isEn} t={t} />
                    ) : (
                      <TaxComparison t={t} />
                    )}
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
                    {countryInfo ? (
                      <CountryLocationInfo info={countryInfo} isEn={isEn} selectedCategory={answers.category} />
                    ) : (
                      <LocationInfo t={t} selectedCategory={answers.category} />
                    )}
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

export default function RegisterGuidePage() {
  return (
    <Suspense fallback={<div className="flex min-h-screen items-center justify-center"><div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" /></div>}>
      <RegisterGuideContent />
    </Suspense>
  );
}

// --- Business Structure Comparison Widget (country-agnostic) ---
function BusinessStructureComparison({ structures, isEn, t }: { structures: BusinessStructure[]; isEn: boolean; t: (key: string) => string }) {
  return (
    <div className="space-y-3">
      {structures.map((s) => (
        <div key={s.id} className="rounded-xl border border-zinc-700/50 bg-zinc-800/40 p-4">
          <h4 className="text-sm font-bold text-zinc-100">
            {isEn ? s.name_en : s.name_ko}
            {s.name_local && <span className="ml-2 text-xs text-zinc-500">({s.name_local})</span>}
          </h4>
          <div className="mt-2 space-y-1.5 text-xs text-zinc-400">
            <div className="flex gap-2">
              <span className="shrink-0 text-zinc-500 w-20">{t("register_guide.step2_liability")}</span>
              <span>{isEn ? s.liability_en : s.liability_ko}</span>
            </div>
            <div className="flex gap-2">
              <span className="shrink-0 text-zinc-500 w-20">{t("register_guide.step2_setup_cost")}</span>
              <span className="text-emerald-400">{isEn ? s.setup_cost_en : s.setup_cost_ko}</span>
            </div>
            <div className="flex gap-2">
              <span className="shrink-0 text-zinc-500 w-20">{t("register_guide.step2_setup_time")}</span>
              <span>{isEn ? s.setup_time_en : s.setup_time_ko}</span>
            </div>
            <div className="flex gap-2">
              <span className="shrink-0 text-zinc-500 w-20">{t("register_guide.step2_pros")}</span>
              <span className="text-emerald-400">{isEn ? s.pros_en : s.pros_ko}</span>
            </div>
            <div className="flex gap-2">
              <span className="shrink-0 text-zinc-500 w-20">{t("register_guide.step2_cons")}</span>
              <span className="text-red-400">{isEn ? s.cons_en : s.cons_ko}</span>
            </div>
          </div>
          <p className="mt-2 text-[11px] text-violet-400">{t("register_guide.step2_recommend")}: {isEn ? s.recommend_en : s.recommend_ko}</p>
        </div>
      ))}
    </div>
  );
}

// --- Legacy Tax Comparison Widget (KR backward compat) ---
function TaxComparison({ t }: { t: (key: string) => string }) {
  const types = ["simplified", "general", "corporation"] as const;
  return (
    <div className="space-y-3">
      {types.map((type) => (
        <div key={type} className="rounded-xl border border-zinc-700/50 bg-zinc-800/40 p-4">
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

// --- Country Location Info Widget ---
function CountryLocationInfo({ info, isEn, selectedCategory }: { info: CountryStartupInfo; isEn: boolean; selectedCategory?: string }) {
  const locationHref = selectedCategory ? `/location?industry=${selectedCategory}` : "/location";
  return (
    <div className="space-y-3">
      {info.locationTypes.map((loc) => (
        <div key={loc.id} className="rounded-xl border border-zinc-700/50 bg-zinc-800/40 p-4">
          <h4 className="text-sm font-bold text-zinc-100">{loc.icon} {isEn ? loc.name_en : loc.name_ko}</h4>
          <div className="mt-2 space-y-1.5 text-xs text-zinc-400">
            <div className="flex gap-2">
              <span className="shrink-0 text-zinc-500 w-16">{isEn ? "Cost" : "비용"}</span>
              <span className="text-emerald-400">{isEn ? loc.cost_en : loc.cost_ko}</span>
            </div>
            <div className="flex gap-2">
              <span className="shrink-0 text-zinc-500 w-16">{isEn ? "Note" : "주의"}</span>
              <span>{isEn ? loc.caution_en : loc.caution_ko}</span>
            </div>
            <div className="flex gap-2">
              <span className="shrink-0 text-zinc-500 w-16">{isEn ? "Suitable" : "적합"}</span>
              <span>{isEn ? loc.suitable_en : loc.suitable_ko}</span>
            </div>
          </div>
          {(loc.id === "virtual" || loc.id === "office") && (
            <Link href={locationHref} className="mt-3 inline-block text-xs text-violet-400 hover:text-violet-300 transition-colors">
              🗺️ {isEn ? "Find location →" : "위치 찾기 →"}
            </Link>
          )}
        </div>
      ))}
    </div>
  );
}

// --- Legacy Location Info Widget (KR backward compat) ---
function LocationInfo({ t, selectedCategory }: { t: (key: string) => string; selectedCategory?: string }) {
  const types = ["home", "virtual", "office"] as const;
  const locationHref = selectedCategory ? `/location?industry=${selectedCategory}` : "/location";
  return (
    <div className="space-y-3">
      {types.map((type) => (
        <div key={type} className="rounded-xl border border-zinc-700/50 bg-zinc-800/40 p-4">
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
    <div className="rounded-2xl border border-zinc-700/50 bg-zinc-800/40 overflow-hidden">
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
