/**
 * @file src/i18n.ts
 * @author leon.wang
 */
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import resources, { defaultNS } from './locales';

/** Supported language types */
export type Language = 'zh' | 'en';

/** Supported languages list */
export const SUPPORTED_LANGUAGES: Language[] = ['zh', 'en'];

/** Default language */
const DEFAULT_LANGUAGE: Language = 'zh';

/** LocalStorage key for language preference */
const LANGUAGE_STORAGE_KEY = 'app_language';

/**
 * Detect language with priority:
 * 1. URL query parameter (?lang=en)
 * 2. LocalStorage saved preference
 * 3. Browser language
 * 4. Default language (zh)
 */
function detectLanguage(): Language {
  // 1. Check URL parameter
  const urlParams = new URLSearchParams(window.location.search);
  const urlLang = urlParams.get('lang');
  if (urlLang && SUPPORTED_LANGUAGES.includes(urlLang as Language)) {
    return urlLang as Language;
  }

  // 2. Check localStorage
  const storedLang = localStorage.getItem(LANGUAGE_STORAGE_KEY);
  if (storedLang && SUPPORTED_LANGUAGES.includes(storedLang as Language)) {
    return storedLang as Language;
  }

  // 3. Check browser language
  const browserLang = navigator.language.toLowerCase();
  if (browserLang.startsWith('en')) {
    return 'en';
  }
  if (browserLang.startsWith('zh')) {
    return 'zh';
  }

  // 4. Default
  return DEFAULT_LANGUAGE;
}

/** Current detected language */
export const language: Language = detectLanguage();

// Initialize i18next
i18n.use(initReactI18next).init({
  resources,
  lng: language,
  fallbackLng: DEFAULT_LANGUAGE,

  // Default namespace
  defaultNS,

  // Debug mode (only in development)
  debug: process.env.NODE_ENV === 'development',

  interpolation: {
    escapeValue: false, // React already escapes values
  },
});

/**
 * Change language and persist to localStorage
 * @param lang Target language
 * @returns Promise that resolves when language is changed
 */
export const changeLanguage = async (lang: Language): Promise<void> => {
  if (!SUPPORTED_LANGUAGES.includes(lang)) {
    // eslint-disable-next-line no-console
    console.warn(`Language "${lang}" is not supported. Using default.`);
    lang = DEFAULT_LANGUAGE;
  }

  await i18n.changeLanguage(lang);
  localStorage.setItem(LANGUAGE_STORAGE_KEY, lang);
};

export default i18n;
