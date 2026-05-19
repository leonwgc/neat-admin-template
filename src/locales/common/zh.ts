/**
 * @file locales/common/zh.ts
 * @author leon.wang
 */

/**
 * 全局通用翻译
 * 包括菜单项、通用操作和全局 UI 文本
 */
export default {
  // 通用操作和 UI
  language: '语言',
  signOut: '退出登录',
  yes: '确认',
  no: '取消',
  reload: '重新加载',
  errorBoundaryTitle: '页面出错了',
  errorBoundaryDescription: '抱歉，页面遇到了一些问题',
  noPermissionTitle: '你没有权限浏览此网页',
  noPermissionDescription: '请联系你的管理员',
  notFoundTitle: '无法找到你正在寻找的网页',
  notFoundDescription: '哪里出了问题或者网页不存在',
  backHome: '返回主页',

  // 全局搜索
  search: '搜索',

  // HTTP 错误消息
  error: {
    badRequest: '请求参数错误',
    unauthorized: '未授权，请重新登录',
    forbidden: '没有权限访问',
    notFound: '请求的资源不存在',
    timeout: '请求超时',
    serverError: '服务器错误',
    badGateway: '网关错误',
    serviceUnavailable: '服务不可用',
    gatewayTimeout: '网关超时',
    unknown: '未知错误',
    networkError: '网络连接失败',
    requestFailed: '请求失败',
  },

  // 菜单翻译
  menu: {
    forms: '表单',
    responsiveForm: '响应式表单',
    table: '表格',
    components: '组件',
    imageUpload: '图片上传',
    imageCropper: '图片裁剪',
    apiRequest: '接口请求',
    apiDemo: 'API 示例',
    resultPage: '结果页',
    noPermission: '无权限 403',
    notFound: '未找到 404',
    mantainance: '维护中 503',
    selectIMEDemo: 'Select IME 输入法',
  },
};
