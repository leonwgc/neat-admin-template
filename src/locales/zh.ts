/**
 * @file src/locales/zh.ts
 * @author leon.wang
 */

import commonZh from './common/zh';
import userZh from './pages/user/zh';
import formZh from './pages/form/zh';
import hotelZh from './pages/hotel/zh';
import componentsZh from './pages/components/zh';
import systemZh from './pages/system/zh';
import securityZh from './pages/security/zh';
import aiZh from './pages/ai/zh';
import dashboardZh from './pages/dashboard/zh';
import flowZh from './pages/flow/zh';
import pdfZh from './pages/pdf/zh';

/**
 * 中文翻译
 * 汇总所有模块的翻译，使用命名空间组织
 */
const zh = {
  // 通用翻译（全局）
  ...commonZh,

  // 页面专属翻译，使用命名空间
  pages: {
    user: userZh,
    form: formZh,
    hotel: hotelZh,
    components: componentsZh,
    system: systemZh,
    security: securityZh,
    ai: aiZh,
    dashboard: dashboardZh,
    flow: flowZh,
    pdf: pdfZh,
  },
};

export default zh;
