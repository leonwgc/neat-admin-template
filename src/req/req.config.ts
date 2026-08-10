export const notVerifyLocation = ['/nav/no-permission', '/nav/404', '/nav/500'];

// 获取 SSO 前端地址
export const getSSOFrontendURI = () => {
  switch (process.env.NODE_ENV) {
    case 'development':
      return 'http://localhost:5010';
    case 'qa':
      return 'https://sso.qa.derbysoft-test.com';
    case 'uat':
      return 'https://sso-uat.derbysoft-test.com';
    case 'production':
      return 'https://sso.derbysoftsec.com';
    default:
      return 'https://sso.derbysoftsec.com';
  }
};

export const getBaseURL = (): string => {
  if (process.env.NODE_ENV === 'qa') {
    return '/unifyplatform-backend-qa';
  }
  return '';
};
