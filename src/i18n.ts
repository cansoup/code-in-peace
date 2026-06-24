// Tiny i18n layer. Two languages: 'en' (default) and 'ko'.
// A localized string is stored as { en, ko }; pick() resolves it.

import { createContext, useContext } from "react";

export type Lang = "en" | "ko";

/** A bilingual string. */
export type Localized = { en: string; ko: string };

/** Helper to author a bilingual string inline: l("Hello", "안녕") */
export const l = (en: string, ko: string): Localized => ({ en, ko });

/** Resolve a Localized (or plain string) against the active language. */
export const pick = (v: Localized | string, lang: Lang): string =>
  typeof v === "string" ? v : v[lang];

interface LangCtx {
  lang: Lang;
  setLang: (l: Lang) => void;
}

export const LangContext = createContext<LangCtx>({
  lang: "en",
  setLang: () => {},
});

export const useLang = () => useContext(LangContext);

/** Convenience hook: returns a `t` that resolves bilingual values. */
export function useT() {
  const { lang } = useLang();
  return (v: Localized | string) => pick(v, lang);
}

// Persist the choice (matches the prototype's localStorage behavior).
export const LANG_STORAGE_KEY = "pf_lang";

export function readStoredLang(fallback: Lang = "en"): Lang {
  try {
    const v = localStorage.getItem(LANG_STORAGE_KEY);
    if (v === "en" || v === "ko") return v;
  } catch {}
  return fallback;
}

export function storeLang(lang: Lang) {
  try {
    localStorage.setItem(LANG_STORAGE_KEY, lang);
  } catch {}
}
