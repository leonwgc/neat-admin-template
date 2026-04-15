/**
 * @file src/pages/ApiDemo/types.ts
 * @author leon.wang
 */

/**
 * 用户数据类型
 */
export interface User {
  id: string;
  username: string;
  email: string;
  phone?: string;
  avatar?: string;
  role?: string;
  status: 'active' | 'inactive';
  createdAt?: string;
  updatedAt?: string;
}

/**
 * 统计数据类型
 */
export interface Stats {
  totalUsers: number;
  activeUsers: number;
  inactiveUsers: number;
}

/**
 * 配置数据类型
 */
export interface Config {
  apiVersion: string;
  environment: string;
  features: string[];
}
