/**
 * @file src/locales/zh.ts
 * @author leon.wang
 */

import commonZh from './common/zh';
import { buildPageLocalesTree, loadPageLocaleEntries } from './pageLocales';

export const zhPageLocaleEntries = loadPageLocaleEntries('zh');
const zhPageLocales = buildPageLocalesTree(zhPageLocaleEntries);

/**
 * 中文翻译
 * 汇总所有模块的翻译，使用命名空间组织
 */
const zh = {
  // 通用翻译（全局）
  ...commonZh,

  // 页面专属翻译，使用命名空间
  pages: zhPageLocales,
};

export default zh;
