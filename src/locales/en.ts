/**
 * @file src/locales/en.ts
 * @author leon.wang
 */

import commonEn from './common/en';
import formEn from '../pages/Form/locales/en';
import tableEn from '../pages/Table/locales/en';

/**
 * English translations
 * Aggregates translations from all modules, organized by namespaces
 */
const en = {
  // Common translations (global)
  ...commonEn,

  // Page-specific translations, using namespaces
  pages: {
    form: formEn,
    table: tableEn,
  },
};

export default en;
