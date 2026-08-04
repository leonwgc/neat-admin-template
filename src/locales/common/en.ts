/**
 * @file locales/common/en.ts
 * @author leon.wang
 */

/**
 * Common translations shared across the application
 * Including menu items, common actions, and global UI text
 */
export default {
  // Common actions and UI
  language: 'Language',
  signOut: 'Sign Out',
  yes: 'Yes',
  no: 'No',
  reload: 'Reload',
  errorBoundaryTitle: 'Something went wrong',
  errorBoundaryDescription:
    'Sorry, this page encountered an unexpected problem',
  noPermissionTitle: 'You do not have permission to view this page',
  noPermissionDescription: 'Please contact your administrator',
  notFoundTitle: 'Unable to find the page you are looking for',
  notFoundDescription: 'Something went wrong or the page does not exist',
  backHome: 'Back Home',

  // Global Search
  search: 'Search',

  // Footer
  footer: {
    company: 'DerbySoft Inc.',
    copyright: 'All rights reserved,',
    privacyPolicy: 'Privacy Policy',
  },

  // HTTP error messages
  error: {
    badRequest: 'Bad Request',
    unauthorized: 'Unauthorized, please login again',
    forbidden: 'Access Forbidden',
    notFound: 'Resource Not Found',
    timeout: 'Request Timeout',
    serverError: 'Server Error',
    badGateway: 'Bad Gateway',
    serviceUnavailable: 'Service Unavailable',
    gatewayTimeout: 'Gateway Timeout',
    unknown: 'Unknown Error',
    networkError: 'Network Error',
    requestFailed: 'Request Failed',
    defaultMessageTitle: 'Server or network exception',
    defaultMessage:
      'Unable to connect to the server. Please check your internet connection or try again later.',
  },

  // Menu translations
  menu: {
    forms: 'Forms',
    responsiveForm: 'Responsive Form',
    table: 'Table',
    components: 'Components',
    imageUpload: 'ImageUpload',
    imageCropper: 'ImageCropper',
    apiRequest: 'API Request',
    apiDemo: 'API Demo',
    resultPage: 'Result Page',
    noPermission: 'No Permission 403',
    notFound: 'Not Found 404',
    mantainance: 'Maintenance 503',
    selectIMEDemo: 'Select IME Demo',
  },
};
