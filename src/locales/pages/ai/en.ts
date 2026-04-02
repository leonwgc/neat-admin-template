/**
 * @file locales/pages/ai/en.ts
 * @author leon.wang
 */
export default {
  // AI Assistant page
  aiAssistantTitle: 'AI Assistant',
  aiAssistantDesc: 'Your intelligent work partner, ready to help anytime',

  // AI Settings page
  aiSettingsTitle: 'AI Assistant Settings',
  aiSettingsDesc: 'Configure AI assistant behavior and parameters',

  // Form fields
  aiSettingsFormUseMock: 'Use Mock Mode',
  aiSettingsFormUseMockHelp: 'Mock mode works without API key, suitable for testing and demo',
  aiSettingsFormApiKey: 'API Key',
  aiSettingsFormApiKeyPh: 'Enter your OpenAI API key',
  aiSettingsFormModel: 'AI Model',
  aiSettingsFormModelPh: 'Select AI model',
  aiSettingsFormTemperature: 'Temperature',
  aiSettingsFormTemperaturePh: 'Control randomness (0-2)',
  aiSettingsFormMaxTokens: 'Max Tokens',
  aiSettingsFormMaxTokensPh: 'Maximum response length',
  aiSettingsFormSystemPrompt: 'System Prompt',
  aiSettingsFormSystemPromptPh: 'Define AI assistant role and behavior',
  aiSettingsFormEnabled: 'Enable AI Assistant',

  // Buttons
  aiSettingsBtnSave: 'Save Settings',
  aiSettingsBtnTest: 'Test Connection',
  aiSettingsBtnReset: 'Reset to Default',

  // Chat interface
  aiChatPlaceholder: 'Type your question...',
  aiChatBtnSend: 'Send',
  aiChatBtnClear: 'Clear Chat',
  aiChatBtnClose: 'Close',
  aiChatBtnOpen: 'AI Assistant',
  aiChatThinking: 'Thinking',
  aiChatWelcome: 'Hello! I\'m your AI assistant. How can I help you?',

  // Quick actions
  aiQuickActions: 'Quick Actions',
  aiQuickActionExplain: 'Explain this code',
  aiQuickActionOptimize: 'Optimize this code',
  aiQuickActionDebug: 'Help me debug',
  aiQuickActionTranslate: 'Translate text',
  aiQuickActionSummarize: 'Summarize content',

  // Messages
  aiMsgSaveSuccess: 'Settings saved successfully',
  aiMsgSaveError: 'Failed to save settings',
  aiMsgTestSuccess: 'API connection test successful',
  aiMsgTestError: 'API connection test failed',
  aiMsgApiKeyRequired: 'Please configure API key first',
  aiMsgNetworkError: 'Network request failed, please check your connection',
  aiMsgClearSuccess: 'Chat cleared',

  // Model options
  aiModelGpt4: 'GPT-4 (Most Powerful)',
  aiModelGpt35: 'GPT-3.5 Turbo (Balanced)',
  aiModelGpt4Mini: 'GPT-4 Mini (Fast)',

  // Settings help
  aiSettingsHelpUseMock: 'When enabled, uses local mock data to simulate AI responses without consuming API credits',
  aiSettingsHelpApiKey: 'API key for authentication, available from OpenAI website (not required in Mock mode)',
  aiSettingsHelpTemperature: 'Lower temperature makes output more deterministic, higher makes it more random and creative',
  aiSettingsHelpMaxTokens: 'Controls response length, 1 token ≈ 0.75 English words',
  aiSettingsHelpSystemPrompt: 'Define AI role, expertise, and response style',
};
