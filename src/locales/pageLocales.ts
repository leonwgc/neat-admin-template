/**
 * @file src/locales/pageLocales.ts
 * @author leon.wang
 */

export interface PageLocaleEntry {
  namespace: string;
  namespacePath: string[];
  locale: Record<string, unknown>;
}

interface LocaleModule {
  default: Record<string, unknown>;
}

const pageLocalesContext = require.context(
  '../pages',
  true,
  /\/locales\/(en|zh)\.ts$/,
);

const toNamespacePath = (filePath: string): string[] => {
  const normalizedPath = filePath.replace(/^\.\//, '');
  const pathParts = normalizedPath.split('/');
  const localesIndex = pathParts.indexOf('locales');

  if (localesIndex <= 0) {
    return [];
  }

  return pathParts.slice(0, localesIndex).map((segment) => {
    if (!segment) {
      return segment;
    }

    return segment.charAt(0).toLowerCase() + segment.slice(1);
  });
};

const setNestedValue = (
  target: Record<string, unknown>,
  namespacePath: string[],
  value: Record<string, unknown>,
): void => {
  let cursor = target;

  namespacePath.forEach((segment, index) => {
    const isLeaf = index === namespacePath.length - 1;

    if (isLeaf) {
      cursor[segment] = value;
      return;
    }

    const next = cursor[segment];
    if (!next || typeof next !== 'object' || Array.isArray(next)) {
      cursor[segment] = {};
    }

    cursor = cursor[segment] as Record<string, unknown>;
  });
};

export const loadPageLocaleEntries = (lang: 'en' | 'zh'): PageLocaleEntry[] => {
  return pageLocalesContext
    .keys()
    .filter((filePath) => filePath.endsWith(`/locales/${lang}.ts`))
    .sort()
    .map((filePath) => {
      const namespacePath = toNamespacePath(filePath);
      const localeModule = pageLocalesContext(filePath) as LocaleModule;

      return {
        namespace: `pages.${namespacePath.join('.')}`,
        namespacePath,
        locale: localeModule.default,
      };
    })
    .filter((entry) => entry.namespacePath.length > 0);
};

export const buildPageLocalesTree = (
  entries: PageLocaleEntry[],
): Record<string, unknown> => {
  const pages: Record<string, unknown> = {};

  entries.forEach((entry) => {
    setNestedValue(pages, entry.namespacePath, entry.locale);
  });

  return pages;
};
