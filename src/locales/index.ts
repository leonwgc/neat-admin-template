/**
 * @file src/locales/index.ts
 * @author leon.wang
 */

import zh from './zh';
import en from './en';

/** 默认命名空间 */
export const defaultNS = 'common';

/** i18n 资源配置 */
export const resources = {
  en: {
    [defaultNS]: en,
    'pages.form': en.pages.form, // 注册命名空间
    'pages.table': en.pages.table,
  },
  zh: {
    [defaultNS]: zh,
    'pages.form': zh.pages.form, // 注册命名空间
    'pages.table': zh.pages.table,
  },
} as const;

export default resources;
