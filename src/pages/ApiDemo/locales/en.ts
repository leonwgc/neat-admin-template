/**
 * @file src/pages/ApiDemo/locales/en.ts
 * @author leon.wang
 */

export default {
  title: 'HTTP Request Wrapper Demo',
  description: 'Demonstrates enterprise-level HTTP request wrapper features based on Axios, including auto loading, error handling, request cancellation, retry mechanism, etc.',

  // Feature Overview
  overview: {
    title: 'Feature Overview',
  },
  feature: {
    autoLoading: 'Auto Loading',
    errorHandling: 'Error Handling',
    cancel: 'Request Cancellation',
    retry: 'Auto Retry',
    debounce: 'Debounce',
    polling: 'Polling',
    concurrent: 'Concurrent Requests',
    i18n: 'Internationalization',
  },

  // Example Titles
  example1: {
    title: 'Example 1: Basic List Request (Auto Execute)',
    description: 'Using useRequest to automatically initiate requests with loading state, error handling, and refresh functionality.',
  },
  example2: {
    title: 'Example 2: Manual Request Trigger',
    description: 'Configure manual: true to trigger requests manually, suitable for on-demand loading scenarios.',
  },
  example3: {
    title: 'Example 3: Create User (POST Request)',
    description: 'Demonstrates POST request, automatically refreshes list after successful creation.',
  },
  example4: {
    title: 'Example 4: Search (Debounce)',
    description: 'Use debounceWait to configure debounce delay, avoiding frequent requests.',
  },
  example5: {
    title: 'Example 5: Concurrent Requests',
    description: 'Use Promise.all to initiate multiple requests simultaneously, improving loading efficiency.',
  },
  example6: {
    title: 'Example 6: Retry Mechanism',
    description: 'Automatically retry on request failure, configure retryCount to control retry attempts (this API has 50% failure rate).',
  },
  example7: {
    title: 'Example 7: Polling Request',
    description: 'Use pollingInterval to configure polling interval for real-time data updates.',
  },

  // Table Columns
  table: {
    name: 'Username',
    email: 'Email',
    status: 'Status',
  },

  // Status
  active: 'Active',
  inactive: 'Inactive',

  // Buttons and Actions
  refresh: 'Refresh',
  loadDetail: 'Load Detail',
  createUser: 'Create User',
  batchFetch: 'Batch Fetch',
  testRetry: 'Test Retry',
  startPolling: 'Start Polling',
  stopPolling: 'Stop Polling',

  // Input Placeholders
  enterUserId: 'Enter User ID',
  searchPlaceholder: 'Search by username or email',

  // Messages
  loadSuccess: 'Load Success',
  loadFailed: 'Load Failed',
  detailLoadSuccess: 'Detail Loaded',
  createSuccess: 'Created Successfully',
  createFailed: 'Create Failed',
  batchSuccess: 'Batch Request Completed',
  retrySuccess: 'Request Succeeded',
  retryFailed: 'Retry Failed',

  // Others
  userInfo: 'User Information',
  totalUsers: 'Total Users',
  activeUsers: 'Active Users',
};
