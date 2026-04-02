/**
 * @file locales/pages/security/zh.ts
 * @author leon.wang
 */

export default {
  // 安全设置页面
  securityTitle: '安全设置',
  securityDescription: '配置密码策略、登录安全、会话管理等安全相关设置',

  // 密码策略
  securityPasswordPolicyTitle: '密码策略',
  securityPasswordMinLength: '最小长度',
  securityPasswordMinLengthRequired: '请输入最小长度',
  securityPasswordExpiryDays: '密码过期天数',
  securityPasswordExpiryDaysTip: '密码过期后需要强制修改，设为0表示永不过期',
  securityPasswordHistoryCount: '密码历史记录数',
  securityPasswordHistoryCountTip: '防止用户重复使用最近使用过的密码',
  securityPasswordComplexity: '密码复杂度要求',
  securityPasswordRequireUppercase: '必须包含大写字母',
  securityPasswordRequireLowercase: '必须包含小写字母',
  securityPasswordRequireNumber: '必须包含数字',
  securityPasswordRequireSpecialChar: '必须包含特殊字符',

  // 登录安全
  securityLoginSecurityTitle: '登录安全',
  securityLoginMaxFailedAttempts: '最大失败次数',
  securityLoginMaxFailedAttemptsTip: '连续登录失败超过此次数后锁定账号',
  securityLoginLockoutDuration: '锁定时长',
  securityLoginLockoutDurationTip: '账号被锁定后需要等待的时间',
  securityLoginRequireCaptcha: '启用验证码',
  securityLoginCaptchaAfterAttempts: '失败N次后要求验证码',
  securityLoginEnableIpWhitelist: '启用IP白名单',
  securityLoginIpWhitelist: 'IP白名单',
  securityLoginIpWhitelistTip: '每行一个IP地址或IP段（如：192.168.1.0/24）',
  securityLoginIpWhitelistPh: '192.168.1.1\n192.168.1.0/24\n10.0.0.0/8',

  // Session管理
  securitySessionManagementTitle: 'Session管理',
  securitySessionTimeout: 'Session超时时间',
  securitySessionTimeoutTip: '用户无操作超过此时间后自动退出',
  securitySessionMaxConcurrent: '最大并发Session数',
  securitySessionMaxConcurrentTip: '同一用户允许同时登录的最大设备数',
  securitySessionEnableSSO: '启用单点登录（SSO）',
  securitySessionEnableSSOTip: '一个账号在多个应用间共享登录状态',
  securitySessionAutoLogout: '关闭浏览器自动退出',

  // 通用
  securityDays: '天',
  securityMinutes: '分钟',
  securityBtnSave: '保存设置',
  securityMsgSaveSuccess: '保存成功',
  securityMsgSaveFailed: '保存失败',
};
