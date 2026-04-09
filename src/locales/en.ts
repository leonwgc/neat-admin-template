/**
 * @file src/locales/en.ts
 * @author leon.wang
 */

import commonEn from './common/en';
import formEn from './pages/form/en';
import componentsEn from './pages/components/en';
import dashboardEn from './pages/dashboard/en';
import tableEn from './pages/table/en';

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
    components: componentsEn,
    dashboard: dashboardEn,
    table: tableEn,
  },
};

export default en;
