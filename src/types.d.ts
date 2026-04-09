/**
 * @file src/types.d.ts
 * @author leon.wang
 */

declare module '*.png' {
  const value: string;
  export default value;
}

declare namespace NodeJS {
  interface ProcessEnv {
    NODE_ENV?: 'development' | 'production' | 'uat' | 'qa';
    [key: string]: string | undefined;
  }

  interface Process {
    env: ProcessEnv;
  }
}

declare const process: NodeJS.Process;
