/**
 * @file utils/requestDeduplicator.ts
 * @author leon.wang
 */

/**
 * 请求去重器
 * 防止相同请求在短时间内重复发送
 */
export class RequestDeduplicator {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private pendingRequests: Map<string, Promise<any>> = new Map();
  private enabled: boolean;

  constructor(enabled: boolean = true) {
    this.enabled = enabled;
  }

  /**
   * 生成请求唯一标识
   * @param url 请求URL
   * @param method 请求方法
   * @param data 请求数据
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private generateKey(url: string, method: string, data?: any): string {
    const dataStr = data ? JSON.stringify(data) : '';
    return `${method.toUpperCase()}:${url}:${dataStr}`;
  }

  /**
   * 执行请求（带去重）
   * @param url 请求URL
   * @param method 请求方法
   * @param requestFn 实际的请求函数
   * @param data 请求数据
   */
  async execute<T>(
    url: string,
    method: string,
    requestFn: () => Promise<T>,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    data?: any,
  ): Promise<T> {
    if (!this.enabled) {
      return requestFn();
    }

    const key = this.generateKey(url, method, data);

    // 如果相同请求正在进行中，返回已有的Promise
    const existingRequest = this.pendingRequests.get(key);
    if (existingRequest) {
      // console.log(`[RequestDeduplicator] 拦截重复请求: ${key}`);
      return existingRequest as Promise<T>;
    }

    // 执行新请求
    const requestPromise = requestFn()
      .then((response) => {
        this.pendingRequests.delete(key);
        return response;
      })
      .catch((error) => {
        this.pendingRequests.delete(key);
        throw error;
      });

    this.pendingRequests.set(key, requestPromise);
    return requestPromise;
  }

  /**
   * 取消所有pending的请求
   */
  clearAll(): void {
    this.pendingRequests.clear();
  }

  /**
   * 获取当前pending请求数量
   */
  getPendingCount(): number {
    return this.pendingRequests.size;
  }

  /**
   * 启用/禁用去重
   */
  setEnabled(enabled: boolean): void {
    this.enabled = enabled;
    if (!enabled) {
      this.clearAll();
    }
  }
}

/**
 * 创建全局请求去重器实例
 */
export const globalRequestDeduplicator = new RequestDeduplicator(true);
