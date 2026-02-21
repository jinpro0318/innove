"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  type ReactNode,
} from "react";
import { translations, type Locale } from "@/lib/i18n";

interface LocaleContextType {
  locale: Locale;
  toggleLocale: () => void;
  t: (key: string) => string;
  tArray: (key: string) => unknown[];
  tObj: (key: string) => Record<string, unknown>;
}

const LocaleContext = createContext<LocaleContextType | null>(null);

function getNestedValue(obj: unknown, path: string): unknown {
  return path.split(".").reduce((acc: unknown, key: string) => {
    if (acc && typeof acc === "object" && key in (acc as Record<string, unknown>)) {
      return (acc as Record<string, unknown>)[key];
    }
    return undefined;
  }, obj);
}

export function LocaleProvider({ children }: { children: ReactNode }) {
  const [locale, setLocale] = useState<Locale>("ko");

  useEffect(() => {
    const saved = localStorage.getItem("locale") as Locale | null;
    if (saved === "ko" || saved === "en") {
      setLocale(saved);
    }
  }, []);

  const toggleLocale = useCallback(() => {
    setLocale((prev) => {
      const next = prev === "ko" ? "en" : "ko";
      localStorage.setItem("locale", next);
      return next;
    });
  }, []);

  const t = useCallback(
    (key: string): string => {
      const val = getNestedValue(translations[locale], key);
      if (typeof val === "string") return val;
      return key;
    },
    [locale]
  );

  const tArray = useCallback(
    (key: string): unknown[] => {
      const val = getNestedValue(translations[locale], key);
      if (Array.isArray(val)) return val;
      return [];
    },
    [locale]
  );

  const tObj = useCallback(
    (key: string): Record<string, unknown> => {
      const val = getNestedValue(translations[locale], key);
      if (val && typeof val === "object" && !Array.isArray(val))
        return val as Record<string, unknown>;
      return {};
    },
    [locale]
  );

  return (
    <LocaleContext.Provider value={{ locale, toggleLocale, t, tArray, tObj }}>
      {children}
    </LocaleContext.Provider>
  );
}

export function useLocale() {
  const ctx = useContext(LocaleContext);
  if (!ctx) throw new Error("useLocale must be used within LocaleProvider");
  return ctx;
}
