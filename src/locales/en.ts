/**
 * @file src/locales/en.ts
 * @author leon.wang
 */

import commonEn from './common/en';
import userEn from './pages/user/en';
import formEn from './pages/form/en';
import hotelEn from './pages/hotel/en';
import componentsEn from './pages/components/en';
import systemEn from './pages/system/en';
import securityEn from './pages/security/en';
import aiEn from './pages/ai/en';
import dashboardEn from './pages/dashboard/en';
import flowEn from './pages/flow/en';
import pdfEn from './pages/pdf/en';

/**
 * English translations
 * Aggregates translations from all modules, organized by namespaces
 */
const en = {
  // Common translations (global)
  ...commonEn,

  // Page-specific translations, using namespaces
  pages: {
    user: userEn,
    form: formEn,
    hotel: hotelEn,
    components: componentsEn,
    system: systemEn,
    security: securityEn,
    ai: aiEn,
    dashboard: dashboardEn,
    flow: flowEn,
    pdf: pdfEn,
  },
};

export default en;
