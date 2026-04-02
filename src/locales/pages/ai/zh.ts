/**
 * @file locales/pages/ai/zh.ts
 * @author leon.wang
 */
export default {
  // AI 助手页面
  aiAssistantTitle: 'AI 智能助手',
  aiAssistantDesc: '您的智能工作伙伴，随时为您提供帮助',

  // AI 配置页面
  aiSettingsTitle: 'AI 助手配置',
  aiSettingsDesc: '配置 AI 助手的行为和参数',

  // 表单字段
  aiSettingsFormUseMock: '使用 Mock 模式',
  aiSettingsFormUseMockHelp: 'Mock 模式无需 API 密钥，适合测试和演示',
  aiSettingsFormApiKey: 'API 密钥',
  aiSettingsFormApiKeyPh: '请输入您的 OpenAI API 密钥',
  aiSettingsFormModel: 'AI 模型',
  aiSettingsFormModelPh: '选择 AI 模型',
  aiSettingsFormTemperature: '温度参数',
  aiSettingsFormTemperaturePh: '控制回复的随机性（0-2）',
  aiSettingsFormMaxTokens: '最大令牌数',
  aiSettingsFormMaxTokensPh: '单次回复的最大长度',
  aiSettingsFormSystemPrompt: '系统提示词',
  aiSettingsFormSystemPromptPh: '定义 AI 助手的角色和行为',
  aiSettingsFormEnabled: '启用 AI 助手',

  // 按钮
  aiSettingsBtnSave: '保存配置',
  aiSettingsBtnTest: '测试连接',
  aiSettingsBtnReset: '重置为默认',

  // 聊天界面
  aiChatPlaceholder: '输入您的问题...',
  aiChatBtnSend: '发送',
  aiChatBtnClear: '清空对话',
  aiChatBtnClose: '关闭',
  aiChatBtnOpen: 'AI 助手',
  aiChatThinking: '思考中',
  aiChatWelcome: '您好！我是 AI 助手，有什么可以帮您？',

  // 快捷功能
  aiQuickActions: '快捷操作',
  aiQuickActionExplain: '解释这段代码',
  aiQuickActionOptimize: '优化这段代码',
  aiQuickActionDebug: '帮我调试',
  aiQuickActionTranslate: '翻译文本',
  aiQuickActionSummarize: '总结内容',

  // 消息提示
  aiMsgSaveSuccess: '配置保存成功',
  aiMsgSaveError: '配置保存失败',
  aiMsgTestSuccess: 'API 连接测试成功',
  aiMsgTestError: 'API 连接测试失败',
  aiMsgApiKeyRequired: '请先配置 API 密钥',
  aiMsgNetworkError: '网络请求失败，请检查网络连接',
  aiMsgClearSuccess: '对话已清空',

  // 模型选项
  aiModelGpt4: 'GPT-4 (最强大)',
  aiModelGpt35: 'GPT-3.5 Turbo (平衡)',
  aiModelGpt4Mini: 'GPT-4 Mini (快速)',

  // 配置说明
  aiSettingsHelpUseMock: '开启后将使用本地 Mock 数据模拟 AI 回答，无需消耗 API 额度',
  aiSettingsHelpApiKey: 'API 密钥用于身份验证，可在 OpenAI 官网获取（Mock 模式下无需配置）',
  aiSettingsHelpTemperature: '较低的温度使输出更确定，较高的温度使输出更随机和创造性',
  aiSettingsHelpMaxTokens: '控制单次回复的长度，1 token ≈ 0.75 个英文单词',
  aiSettingsHelpSystemPrompt: '定义 AI 的角色、专业领域和回复风格',
};
