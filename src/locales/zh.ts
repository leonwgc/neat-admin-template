/**
 * @file src/locales/zh.ts
 * @author leon.wang
 */

import commonZh from './common/zh';
import formZh from '~/pages/Form/locales/zh';
import tableZh from '~/pages/Table/locales/zh';

/**
 * 中文翻译
 * 汇总所有模块的翻译，使用命名空间组织
 */
const zh = {
  // 通用翻译（全局）
  ...commonZh,

  // 页面专属翻译，使用命名空间
  pages: {
    form: formZh,
    table: tableZh,
  },
};

export default zh;
