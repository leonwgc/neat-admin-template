/**
 * @file src/locales/en.ts
 * @author leon.wang
 */

import commonEn from './common/en';
import { buildPageLocalesTree, loadPageLocaleEntries } from './pageLocales';

export const enPageLocaleEntries = loadPageLocaleEntries('en');
const enPageLocales = buildPageLocalesTree(enPageLocaleEntries);

/**
 * English translations
 * Aggregates translations from all modules, organized by namespaces
 */
const en = {
  // Common translations (global)
  ...commonEn,

  // Page-specific translations, using namespaces
  pages: enPageLocales,
};

export default en;
