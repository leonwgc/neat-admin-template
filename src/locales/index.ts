/**
 * @file src/locales/index.ts
 * @author leon.wang
 */

import zh from './zh';
import en from './en';
import { enPageLocaleEntries } from './en';
import { zhPageLocaleEntries } from './zh';

/** 默认命名空间 */
export const defaultNS = 'common';

const buildPageNamespaceResources = (
  entries: Array<{ namespace: string; locale: Record<string, unknown> }>,
) => {
  return entries.reduce<Record<string, Record<string, unknown>>>(
    (accumulator, entry) => {
      accumulator[entry.namespace] = entry.locale;
      return accumulator;
    },
    {},
  );
};

const enPageNamespaces = buildPageNamespaceResources(enPageLocaleEntries);
const zhPageNamespaces = buildPageNamespaceResources(zhPageLocaleEntries);

/** i18n 资源配置 */
export const resources = {
  en: {
    [defaultNS]: en,
    ...enPageNamespaces,
  },
  zh: {
    [defaultNS]: zh,
    ...zhPageNamespaces,
  },
} as const;

export default resources;
