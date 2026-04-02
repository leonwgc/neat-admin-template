/**
 * @file locales/pages/security/en.ts
 * @author leon.wang
 */

export default {
  // Security Settings Page
  securityTitle: 'Security Settings',
  securityDescription:
    'Configure password policies, login security, session management, and other security settings',

  // Password Policy
  securityPasswordPolicyTitle: 'Password Policy',
  securityPasswordMinLength: 'Minimum Length',
  securityPasswordMinLengthRequired: 'Please enter minimum length',
  securityPasswordExpiryDays: 'Password Expiry Days',
  securityPasswordExpiryDaysTip:
    'Force password change after expiry. Set to 0 for no expiry',
  securityPasswordHistoryCount: 'Password History Count',
  securityPasswordHistoryCountTip: 'Prevent users from reusing recent passwords',
  securityPasswordComplexity: 'Password Complexity Requirements',
  securityPasswordRequireUppercase: 'Require uppercase letters',
  securityPasswordRequireLowercase: 'Require lowercase letters',
  securityPasswordRequireNumber: 'Require numbers',
  securityPasswordRequireSpecialChar: 'Require special characters',

  // Login Security
  securityLoginSecurityTitle: 'Login Security',
  securityLoginMaxFailedAttempts: 'Max Failed Attempts',
  securityLoginMaxFailedAttemptsTip: 'Lock account after consecutive failed attempts',
  securityLoginLockoutDuration: 'Lockout Duration',
  securityLoginLockoutDurationTip: 'How long account remains locked',
  securityLoginRequireCaptcha: 'Enable CAPTCHA',
  securityLoginCaptchaAfterAttempts: 'Require CAPTCHA After N Attempts',
  securityLoginEnableIpWhitelist: 'Enable IP Whitelist',
  securityLoginIpWhitelist: 'IP Whitelist',
  securityLoginIpWhitelistTip: 'One IP address or range per line (e.g., 192.168.1.0/24)',
  securityLoginIpWhitelistPh: '192.168.1.1\n192.168.1.0/24\n10.0.0.0/8',

  // Session Management
  securitySessionManagementTitle: 'Session Management',
  securitySessionTimeout: 'Session Timeout',
  securitySessionTimeoutTip: 'Auto logout after period of inactivity',
  securitySessionMaxConcurrent: 'Max Concurrent Sessions',
  securitySessionMaxConcurrentTip: 'Maximum simultaneous logins per user',
  securitySessionEnableSSO: 'Enable Single Sign-On (SSO)',
  securitySessionEnableSSOTip: 'Share login state across multiple applications',
  securitySessionAutoLogout: 'Auto Logout on Browser Close',

  // Common
  securityDays: 'days',
  securityMinutes: 'minutes',
  securityBtnSave: 'Save Settings',
  securityMsgSaveSuccess: 'Settings saved successfully',
  securityMsgSaveFailed: 'Failed to save settings',
};
