import AllInOneHelpWidget from '@derbysoft/derbysoft-all-in-one-help-widget';

// 获取当前环境变量
const env = process.env.NODE_ENV;

/**
 * 获取 GA ID
 * @returns {string}
 */
export function getGAId() {
  if (env.startsWith('production')) {
    return 'G-21QFQ9F1N8';
  } else if (env === 'qa' || env === 'uat') {
    return 'G-G9FH2SXZ6W';
  }
}

/**
 * 初始化 All In One Help Widget
 * @returns {*}
 */
export function initHelpWidgets() {
  // 创建实例
  const helpWidget = new AllInOneHelpWidget();
  // 初始化 Google Analytics
  const GAId = getGAId();
  if (GAId) {
    // 初始化 GA
    helpWidget.initConfig(AllInOneHelpWidget.GoogleAnalytics, {
      id: GAId,
      status: 'enabled',
    });

    // 添加全局参数
    window?.gtag?.('config', GAId);
  }

  // 初始化 Smartlook
  if (env.startsWith('production')) {
    helpWidget.initConfig(AllInOneHelpWidget.Smartlook, {
      id: 'b4eddaa6c10f03c9a63962cda250506d842c7d5e',
      status: 'enabled',
    });
  }

  // 初始化 Feedback
  if (!env.startsWith('development')) {
    helpWidget.initConfig(AllInOneHelpWidget.Feedback, {
      id: '9180|60182|r8ZZqVDmCa0OBrmxWiAIfP5ab6JrZ1NldoVR1bxPIydgc32PzQ',
      status: 'enabled',
      canGeneralFeedback: true,
      canReportBugs: true,
      canSubmitIdea: true,
      // canContactUs: true,
      onClickContactUs: () => {
        // console.log('onClickContactUs');
      },
    });
  }

  // 初始化 KnowledgeBase
  helpWidget.initConfig(AllInOneHelpWidget.KnowledgeBase, {
    id: '70000063993',
    status: 'enabled',
    loginArticleIds: [],
    suggestArticleIds: [70000661520, 70000650225, 70000653517],
    onClickViewAll: () => {
      window.open('/app/help-center', '_blank');
    },
    onClickGotoArticleDetail: (article) => {
      window.open(
        `/app/help-center?url=/solutions/articles/${article.id}`,
        '_blank',
      );
    },
  });

  // One Trust
  if (env.startsWith('production')) {
    (function (id) {
      const parentNode = document.head || document.body;
      const s = document.createElement('script');
      s.async = true;
      s.src = 'https://cdn.cookielaw.org/scripttemplates/otSDKStub.js';
      s.dataset.domainScript = id;
      parentNode.appendChild(s);
    })('b9a947e3-4ce6-4965-88e3-7ee232646a86');
  }

  helpWidget.render();

  return helpWidget;
}

let instance: ReturnType<typeof initHelpWidgets> | undefined;

export default function configureHelpWidgets() {
  if (!instance) {
    instance = initHelpWidgets();
  }
  return instance;
}
