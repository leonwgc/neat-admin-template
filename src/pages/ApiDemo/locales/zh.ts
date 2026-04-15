/**
 * @file src/pages/ApiDemo/locales/zh.ts
 * @author leon.wang
 */

export default {
  title: 'HTTP 请求封装示例',
  description: '展示基于 Axios 的企业级 HTTP 请求封装功能，包括自动 loading、错误处理、请求取消、重试机制等。',

  // 功能概览
  overview: {
    title: '功能概览',
  },
  feature: {
    autoLoading: '自动 Loading',
    errorHandling: '错误处理',
    cancel: '请求取消',
    retry: '自动重试',
    debounce: '防抖处理',
    polling: '轮询请求',
    concurrent: '并发请求',
    i18n: '国际化',
  },

  // 示例标题
  example1: {
    title: '示例 1: 基础列表请求（自动执行）',
    description: '使用 useRequest 自动发起请求，支持 loading 状态、错误处理和刷新功能。',
  },
  example2: {
    title: '示例 2: 手动触发请求',
    description: '通过 manual: true 配置手动触发请求，适用于按需加载的场景。',
  },
  example3: {
    title: '示例 3: 创建用户（POST 请求）',
    description: '演示 POST 请求，创建成功后自动刷新列表。',
  },
  example4: {
    title: '示例 4: 搜索（防抖）',
    description: '使用 debounceWait 配置防抖延迟，避免频繁请求。',
  },
  example5: {
    title: '示例 5: 并发请求',
    description: '使用 Promise.all 同时发起多个请求，提高加载效率。',
  },
  example6: {
    title: '示例 6: 重试机制',
    description: '请求失败时自动重试，配置 retryCount 控制重试次数（此 API 有 50% 概率失败）。',
  },
  example7: {
    title: '示例 7: 轮询请求',
    description: '使用 pollingInterval 配置轮询间隔，实时更新数据。',
  },

  // 表格列
  table: {
    name: '用户名',
    email: '邮箱',
    status: '状态',
  },

  // 状态
  active: '活跃',
  inactive: '未激活',

  // 按钮和操作
  refresh: '刷新',
  loadDetail: '加载详情',
  createUser: '创建用户',
  batchFetch: '并发请求',
  testRetry: '测试重试',
  startPolling: '开始轮询',
  stopPolling: '停止轮询',

  // 输入框
  enterUserId: '请输入用户 ID',
  searchPlaceholder: '搜索用户名或邮箱',

  // 消息提示
  loadSuccess: '加载成功',
  loadFailed: '加载失败',
  detailLoadSuccess: '详情加载成功',
  createSuccess: '创建成功',
  createFailed: '创建失败',
  batchSuccess: '并发请求完成',
  retrySuccess: '请求成功',
  retryFailed: '重试失败',

  // 其他
  userInfo: '用户信息',
  totalUsers: '总用户数',
  activeUsers: '活跃用户',
};
