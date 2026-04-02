/**
 * @file src/i18next.d.ts
 * @author leon.wang
 * @description i18next TypeScript 类型声明，支持智能提示
 */

import 'i18next';
import { defaultNS, resources } from './locales';

declare module 'i18next' {
  interface CustomTypeOptions {
    // 默认命名空间
    defaultNS: typeof defaultNS;
    // 资源类型，从实际的翻译资源推断
    resources: (typeof resources)['zh'];
    // 返回对象而非字符串
    returnObjects: false;
    // 键分隔符
    keySeparator: '.';
    // 命名空间分隔符
    nsSeparator: ':';
  }
}
