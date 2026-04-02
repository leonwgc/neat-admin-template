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
    'pages.components': en.pages.components, // 注册命名空间
    'pages.dashboard': en.pages.dashboard, // 注册命名空间
  },
  zh: {
    [defaultNS]: zh,
    'pages.form': zh.pages.form, // 注册命名空间
    'pages.components': zh.pages.components, // 注册命名空间
    'pages.dashboard': zh.pages.dashboard, // 注册命名空间
  },
} as const;

export default resources;
