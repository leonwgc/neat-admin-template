/**
 * @file src/pages/ApiDemo/api.ts
 * @author leon.wang
 */

import request, { type ApiResponse, type PaginationResponse } from '~/req';
import type { User, Stats, Config } from './types';

/**
 * 模拟延迟
 */
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

/**
 * 生成模拟用户数据
 */
const generateMockUsers = (count: number): User[] => {
  return Array.from({ length: count }, (_, i) => ({
    id: `${i + 1}`,
    username: `User ${i + 1}`,
    email: `user${i + 1}@example.com`,
    phone: `1380000${String(i + 1).padStart(4, '0')}`,
    avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${i}`,
    role: i % 3 === 0 ? 'admin' : 'user',
    status: i % 4 === 0 ? 'inactive' : 'active',
    createdAt: new Date(Date.now() - Math.random() * 90 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date().toISOString(),
  }));
};

// 模拟数据库
let mockUsers = generateMockUsers(50);

/**
 * API Demo 接口
 */
export const demoApi = {
  /**
   * 获取用户列表（分页）
   *
   * 注意：这是一个模拟接口，实际项目中替换为真实的 API 端点
   */
  getList: async (params: {
    page: number;
    pageSize: number;
  }): Promise<{ data: ApiResponse<PaginationResponse<User>> }> => {
    await delay(800); // 模拟网络延迟

    const { page, pageSize } = params;
    const start = (page - 1) * pageSize;
    const end = start + pageSize;
    const list = mockUsers.slice(start, end);

    return {
      data: {
        code: 200,
        message: 'Success',
        success: true,
        data: {
          list,
          total: mockUsers.length,
          page,
          pageSize,
          totalPages: Math.ceil(mockUsers.length / pageSize),
        },
      },
    };
  },

  /**
   * 获取用户详情
   */
  getDetail: async (id: string): Promise<{ data: ApiResponse<User> }> => {
    await delay(600);

    const user = mockUsers.find((u) => u.id === id);

    if (!user) {
      return {
        data: {
          code: 404,
          message: 'User not found',
          success: false,
          data: {} as User,
        },
      };
    }

    return {
      data: {
        code: 200,
        message: 'Success',
        success: true,
        data: user,
      },
    };
  },

  /**
   * 创建用户
   */
  create: async (userData: Partial<User>): Promise<{ data: ApiResponse<User> }> => {
    await delay(1000);

    const newUser: User = {
      id: `${mockUsers.length + 1}`,
      username: userData.username || `User ${mockUsers.length + 1}`,
      email: userData.email || `user${mockUsers.length + 1}@example.com`,
      phone: userData.phone,
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${mockUsers.length}`,
      role: userData.role || 'user',
      status: userData.status || 'active',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    mockUsers.unshift(newUser);

    return {
      data: {
        code: 200,
        message: 'User created successfully',
        success: true,
        data: newUser,
      },
    };
  },

  /**
   * 搜索用户
   */
  search: async (keyword: string): Promise<{ data: ApiResponse<User[]> }> => {
    await delay(500);

    const results = mockUsers.filter(
      (user) =>
        user.username.toLowerCase().includes(keyword.toLowerCase()) ||
        user.email.toLowerCase().includes(keyword.toLowerCase())
    );

    return {
      data: {
        code: 200,
        message: 'Success',
        success: true,
        data: results.slice(0, 10),
      },
    };
  },

  /**
   * 获取统计数据
   */
  getStats: async (): Promise<{ data: ApiResponse<Stats> }> => {
    await delay(400);

    const stats: Stats = {
      totalUsers: mockUsers.length,
      activeUsers: mockUsers.filter((u) => u.status === 'active').length,
      inactiveUsers: mockUsers.filter((u) => u.status === 'inactive').length,
    };

    return {
      data: {
        code: 200,
        message: 'Success',
        success: true,
        data: stats,
      },
    };
  },

  /**
   * 获取配置
   */
  getConfig: async (): Promise<{ data: ApiResponse<Config> }> => {
    await delay(300);

    const config: Config = {
      apiVersion: '1.0.0',
      environment: process.env.NODE_ENV || 'development',
      features: ['auto-loading', 'error-handling', 'retry', 'debounce', 'polling'],
    };

    return {
      data: {
        code: 200,
        message: 'Success',
        success: true,
        data: config,
      },
    };
  },

  /**
   * 不稳定的 API（用于测试重试）
   * 50% 概率失败
   */
  unstableApi: async (): Promise<{ data: ApiResponse<{ message: string }> }> => {
    await delay(800);

    const shouldFail = Math.random() > 0.5;

    if (shouldFail) {
      throw new Error('Simulated API failure');
    }

    return {
      data: {
        code: 200,
        message: 'Success after retry',
        success: true,
        data: { message: 'API call succeeded!' },
      },
    };
  },
};
