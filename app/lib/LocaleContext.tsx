"use client";

import { createContext, useContext } from "react";
import type { Locale } from "@/app/lib/i18n";

const LocaleContext = createContext<Locale>("ko");

export function LocaleProvider({ locale, children }: { locale: Locale; children: React.ReactNode }) {
  return <LocaleContext.Provider value={locale}>{children}</LocaleContext.Provider>;
}

// For client components; server components receive `locale` as a prop instead.
export function useLocale() {
  return useContext(LocaleContext);
}
