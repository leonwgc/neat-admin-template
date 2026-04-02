/**
 * @file src/pages/Components/ChatBot.tsx
 * @author leon.wang
 */

import React, { useState, useRef, useEffect, useMemo } from 'react';
import {
  Card,
  Input,
  Button,
  Space,
  Avatar,
  Tag,
  Empty,
  Divider,
  Tooltip,
  message,
  App,
} from '@derbysoft/neat-design';
import {
  SendOutlined,
  RobotOutlined,
  UserOutlined,
  QuestionCircleOutlined,
  DeleteOutlined,
  CopyOutlined,
  LikeOutlined,
  DislikeOutlined,
  DownloadOutlined,
  BulbOutlined,
} from '@ant-design/icons';
import { useBoolean, useLocalStorageState } from 'ahooks';
import './ChatBot.scss';

/**
 * Message interface
 */
interface Message {
  id: string;
  type: 'user' | 'bot';
  content: string;
  timestamp: Date;
  feedback?: 'like' | 'dislike';
  relatedQuestions?: string[];
}

/**
 * Predefined question and answer pair
 */
interface QAPair {
  keywords: string[];
  question: string;
  answer: string;
  category?: string;
}

/**
 * Predefined questions and answers database
 */
const qaDatabase: QAPair[] = [
  {
    keywords: ['hello', 'hi', 'hey', '你好', '嗨'],
    question: 'Hello',
    answer: 'Hello! I am your AI assistant. How can I help you today?',
    category: 'greeting',
  },
  {
    keywords: ['how are you', '怎么样', '如何'],
    question: 'How are you?',
    answer: 'I am doing great! Thank you for asking. How can I assist you?',
    category: 'greeting',
  },
  {
    keywords: ['name', 'who are you', '名字', '你是谁'],
    question: 'What is your name?',
    answer: 'I am ChatBot, your intelligent assistant powered by AI.',
    category: 'about',
  },
  {
    keywords: ['help', 'support', '帮助', '支持'],
    question: 'How can you help me?',
    answer:
      'I can answer questions about our services, provide technical support, and help with general inquiries. Just ask me anything!',
    category: 'support',
  },
  {
    keywords: ['price', 'cost', 'pricing', '价格', '费用'],
    question: 'What are your pricing plans?',
    answer:
      'We offer flexible pricing plans: Basic ($9/month), Professional ($29/month), and Enterprise (custom pricing). Contact sales for details.',
    category: 'pricing',
  },
  {
    keywords: ['feature', 'function', 'capability', '功能', '特性'],
    question: 'What features do you offer?',
    answer:
      'Our platform offers: Real-time analytics, Team collaboration, API integration, Custom workflows, and 24/7 support.',
    category: 'features',
  },
  {
    keywords: ['contact', 'email', 'phone', '联系', '邮箱', '电话'],
    question: 'How can I contact support?',
    answer:
      'You can reach us via email at support@example.com or call us at +1-800-123-4567. Our team is available 24/7.',
    category: 'contact',
  },
  {
    keywords: ['api', 'integration', '接口', '集成'],
    question: 'Do you have API documentation?',
    answer:
      'Yes! Our comprehensive API documentation is available at https://api.example.com/docs. We support REST and GraphQL APIs.',
    category: 'technical',
  },
  {
    keywords: ['security', 'privacy', 'safe', '安全', '隐私'],
    question: 'Is my data secure?',
    answer:
      'Absolutely! We use bank-level encryption (AES-256), comply with GDPR and SOC 2, and perform regular security audits.',
    category: 'security',
  },
  {
    keywords: ['refund', 'cancel', 'subscription', '退款', '取消', '订阅'],
    question: 'What is your refund policy?',
    answer:
      'We offer a 30-day money-back guarantee. You can cancel your subscription anytime with no questions asked.',
    category: 'billing',
  },
  {
    keywords: ['start', 'begin', 'getting started', '开始', '入门'],
    question: 'How do I get started?',
    answer:
      'Getting started is easy! 1) Sign up for free, 2) Complete the onboarding tutorial, 3) Invite your team, 4) Start building!',
    category: 'onboarding',
  },
  {
    keywords: ['demo', 'trial', 'test', '演示', '试用', '测试'],
    question: 'Can I try before buying?',
    answer:
      'Yes! We offer a 14-day free trial with full access to all features. No credit card required.',
    category: 'trial',
  },
];

/**
 * Quick question categories
 */
const categories = [
  { label: 'All', value: 'all' },
  { label: 'Greeting', value: 'greeting' },
  { label: 'About', value: 'about' },
  { label: 'Support', value: 'support' },
  { label: 'Pricing', value: 'pricing' },
  { label: 'Features', value: 'features' },
  { label: 'Contact', value: 'contact' },
  { label: 'Technical', value: 'technical' },
  { label: 'Security', value: 'security' },
  { label: 'Billing', value: 'billing' },
];

/**
 * ChatBot component
 */
const ChatBot: React.FC = () => {
  // Use localStorage to persist messages
  const [messages, setMessages] = useLocalStorageState<Message[]>('chatbot-messages', {
    defaultValue: [
      {
        id: '1',
        type: 'bot',
        content: 'Hello! I am your AI assistant. How can I help you today?',
        timestamp: new Date(),
      },
    ],
  });
  const [inputValue, setInputValue] = useState('');
  const [isTyping, { setTrue: startTyping, setFalse: stopTyping }] = useBoolean(false);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef(null);
  const { modal } = App.useApp();

  /**
   * Scroll to bottom of messages
   */
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  /**
   * Calculate match score for a question
   */
  const calculateMatchScore = (question: string, qa: QAPair): number => {
    const normalizedQuestion = question.toLowerCase().trim();
    let score = 0;

    qa.keywords.forEach((keyword) => {
      const normalizedKeyword = keyword.toLowerCase();
      if (normalizedQuestion === normalizedKeyword) {
        score += 10; // Exact match
      } else if (normalizedQuestion.includes(normalizedKeyword)) {
        score += 5; // Partial match
      } else if (normalizedKeyword.includes(normalizedQuestion)) {
        score += 3; // Keyword contains question
      }
    });

    return score;
  };

  /**
   * Find matching answer from database with smart matching
   */
  const findAnswer = (
    question: string
  ): { answer: string; relatedQuestions: string[]; confidence: number } => {
    // Calculate scores for all QA pairs
    const scoredResults = qaDatabase.map((qa) => ({
      qa,
      score: calculateMatchScore(question, qa),
    }));

    // Sort by score
    scoredResults.sort((a, b) => b.score - a.score);

    // Get best match
    const bestMatch = scoredResults[0];

    if (bestMatch.score >= 5) {
      // Good match found
      // Get related questions (same category, different questions)
      const relatedQuestions = qaDatabase
        .filter((qa) => qa.category === bestMatch.qa.category && qa !== bestMatch.qa)
        .slice(0, 3)
        .map((qa) => qa.question);

      return {
        answer: bestMatch.qa.answer,
        relatedQuestions,
        confidence: Math.min(bestMatch.score / 10, 1),
      };
    }

    // No good match - suggest related questions
    const suggestions = scoredResults
      .slice(0, 3)
      .filter((result) => result.score > 0)
      .map((result) => result.qa.question);

    return {
      answer:
        "I'm sorry, I don't have an exact answer to that question. Here are some related topics I can help with:",
      relatedQuestions:
        suggestions.length > 0 ? suggestions : ['How can you help me?', 'What features do you offer?'],
      confidence: 0,
    };
  };

  /**
   * Handle sending a message
   */
  const handleSend = () => {
    if (!inputValue.trim()) return;

    const userInput = inputValue;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: userInput,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev!, userMessage]);
    setInputValue('');

    // Simulate bot typing
    startTyping();

    // Find and send bot response
    setTimeout(() => {
      const { answer, relatedQuestions, confidence } = findAnswer(userInput);

      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        type: 'bot',
        content: answer,
        timestamp: new Date(),
        relatedQuestions: relatedQuestions.length > 0 ? relatedQuestions : undefined,
      };

      setMessages((prev) => [...prev!, botResponse]);
      stopTyping();

      // Show suggestion if low confidence
      if (confidence < 0.5 && relatedQuestions.length === 0) {
        message.info('Tip: Try using keywords like "price", "feature", or "help"');
      }
    }, 800 + Math.random() * 1200);
  };

  /**
   * Handle quick question click
   */
  const handleQuickQuestion = (question: string) => {
    setInputValue(question);
    inputRef.current?.focus();
  };

  /**
   * Clear chat history
   */
  const handleClearChat = () => {
    modal.confirm({
      title: 'Clear Chat History',
      content: 'Are you sure you want to clear all chat messages? This action cannot be undone.',
      okText: 'Clear',
      cancelText: 'Cancel',
      onOk: () => {
        setMessages([
          {
            id: '1',
            type: 'bot',
            content: 'Chat history cleared. How can I help you today?',
            timestamp: new Date(),
          },
        ]);
        message.success('Chat history cleared');
      },
    });
  };

  /**
   * Copy message content
   */
  const handleCopyMessage = (content: string) => {
    navigator.clipboard.writeText(content).then(() => {
      message.success('Message copied to clipboard');
    });
  };

  /**
   * Handle message feedback
   */
  const handleFeedback = (messageId: string, feedback: 'like' | 'dislike') => {
    setMessages((prev) =>
      prev!.map((msg) => (msg.id === messageId ? { ...msg, feedback } : msg))
    );
    message.success(feedback === 'like' ? 'Thanks for your feedback!' : 'We will improve!');
  };

  /**
   * Export chat history
   */
  const handleExportChat = () => {
    const chatText = messages!
      .map((msg) => {
        const sender = msg.type === 'bot' ? 'Bot' : 'You';
        const time = formatTime(msg.timestamp);
        return `[${time}] ${sender}: ${msg.content}`;
      })
      .join('\n\n');

    const blob = new Blob([chatText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `chat-history-${new Date().toISOString().split('T')[0]}.txt`;
    a.click();
    URL.revokeObjectURL(url);
    message.success('Chat history exported');
  };

  /**
   * Get filtered questions by category
   */
  const getFilteredQuestions = () => {
    if (selectedCategory === 'all') {
      return qaDatabase;
    }
    return qaDatabase.filter((qa) => qa.category === selectedCategory);
  };

  /**
   * Format timestamp
   */
  const formatTime = (date: Date | string) => {
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    return dateObj.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  /**
   * Get statistics
   */
  const stats = useMemo(() => {
    const totalMessages = messages?.length || 0;
    const userMessages = messages?.filter((m) => m.type === 'user').length || 0;
    const botMessages = messages?.filter((m) => m.type === 'bot').length || 0;
    return { totalMessages, userMessages, botMessages };
  }, [messages]);

  return (
    <div className="chatbot">
      <div className="chatbot__container">
        <div className="chatbot__sidebar">
          <Card className="chatbot__menu" title="Quick Questions">
            <div className="chatbot__categories">
              {categories.map((category) => (
                <Tag
                  key={category.value}
                  color={selectedCategory === category.value ? 'blue' : undefined}
                  className="chatbot__category-tag"
                  onClick={() => setSelectedCategory(category.value)}
                  style={{ cursor: 'pointer' }}
                >
                  {category.label}
                </Tag>
              ))}
            </div>

            <Divider />

            <div className="chatbot__questions">
              {getFilteredQuestions().length > 0 ? (
                getFilteredQuestions().map((qa, index) => (
                  <div
                    key={index}
                    className="chatbot__question-item"
                    onClick={() => handleQuickQuestion(qa.question)}
                  >
                    <QuestionCircleOutlined className="chatbot__question-icon" />
                    <span>{qa.question}</span>
                  </div>
                ))
              ) : (
                <Empty description="No questions available" image={Empty.PRESENTED_IMAGE_SIMPLE} />
              )}
            </div>
          </Card>
        </div>

        <div className="chatbot__main">
          <Card
            className="chatbot__chat-card"
            title={
              <Space>
                <RobotOutlined />
                <span>AI Assistant</span>
                <Tag color="green">Online</Tag>
              </Space>
            }
            extra={
              <Space>
                <Tooltip title="Chat Statistics">
                  <Tag color="blue">{stats.totalMessages} messages</Tag>
                </Tooltip>
                <Tooltip title="Export Chat">
                  <Button
                    type="link"
                    icon={<DownloadOutlined />}
                    onClick={handleExportChat}
                    size="small"
                  />
                </Tooltip>
                <Tooltip title="Clear Chat">
                  <Button
                    type="link"
                    danger
                    icon={<DeleteOutlined />}
                    onClick={handleClearChat}
                    size="small"
                  />
                </Tooltip>
              </Space>
            }
          >
            <div className="chatbot__messages">
              {messages?.map((message) => (
                <div key={message.id}>
                  <div className={`chatbot__message chatbot__message--${message.type}`}>
                    <div className="chatbot__message-avatar">
                      <Avatar
                        icon={message.type === 'bot' ? <RobotOutlined /> : <UserOutlined />}
                        style={{
                          backgroundColor: message.type === 'bot' ? '#1890ff' : '#52c41a',
                        }}
                      />
                    </div>
                    <div className="chatbot__message-content">
                      <div className="chatbot__message-bubble">
                        <div className="chatbot__message-text">{message.content}</div>
                        <div className="chatbot__message-footer">
                          <span className="chatbot__message-time">{formatTime(message.timestamp)}</span>
                          <Space className="chatbot__message-actions" size={4}>
                            <Tooltip title="Copy">
                              <Button
                                type="link"
                                size="small"
                                icon={<CopyOutlined />}
                                onClick={() => handleCopyMessage(message.content)}
                              />
                            </Tooltip>
                            {message.type === 'bot' && (
                              <>
                                <Tooltip title="Helpful">
                                  <Button
                                    type="link"
                                    size="small"
                                    icon={<LikeOutlined />}
                                    onClick={() => handleFeedback(message.id, 'like')}
                                    className={message.feedback === 'like' ? 'active-feedback' : ''}
                                  />
                                </Tooltip>
                                <Tooltip title="Not helpful">
                                  <Button
                                    type="link"
                                    size="small"
                                    icon={<DislikeOutlined />}
                                    onClick={() => handleFeedback(message.id, 'dislike')}
                                    className={message.feedback === 'dislike' ? 'active-feedback' : ''}
                                  />
                                </Tooltip>
                              </>
                            )}
                          </Space>
                        </div>
                      </div>

                      {/* Related questions suggestions */}
                      {message.type === 'bot' && message.relatedQuestions && (
                        <div className="chatbot__suggestions">
                          <div className="chatbot__suggestions-title">
                            <BulbOutlined /> You might also ask:
                          </div>
                          {message.relatedQuestions.map((question, idx) => (
                            <Button
                              key={idx}
                              type="link"
                              size="small"
                              className="chatbot__suggestion-btn"
                              onClick={() => {
                                setInputValue(question);
                                inputRef.current?.focus();
                              }}
                            >
                              {question}
                            </Button>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className="chatbot__message chatbot__message--bot">
                  <div className="chatbot__message-avatar">
                    <Avatar icon={<RobotOutlined />} style={{ backgroundColor: '#1890ff' }} />
                  </div>
                  <div className="chatbot__message-content">
                    <div className="chatbot__message-bubble">
                      <div className="chatbot__typing">
                        <span></span>
                        <span></span>
                        <span></span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            <div className="chatbot__input-area">
              <Input
                ref={inputRef}
                placeholder="Type your message... (Press Enter to send)"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onPressEnter={handleSend}
                size="large"
                maxLength={500}
                showCount
                suffix={
                  <Button
                    type="primary"
                    icon={<SendOutlined />}
                    onClick={handleSend}
                    disabled={!inputValue.trim() || isTyping}
                    loading={isTyping}
                  >
                    Send
                  </Button>
                }
              />
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ChatBot;
