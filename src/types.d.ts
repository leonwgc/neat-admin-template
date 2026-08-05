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
    NODE_ENV: 'development' | 'production' | 'uat' | 'qa';
  }

  interface Process {
    env: ProcessEnv;
  }
}

declare const process: NodeJS.Process;

interface WebpackRequireContext {
  keys(): string[];
  <T = unknown>(id: string): T;
}

interface WebpackContextOptions {
  recursive?: boolean;
  regExp?: RegExp;
}

interface ImportMeta {
  webpackContext(
    directory: string,
    options?: WebpackContextOptions,
  ): WebpackRequireContext;
}

interface NodeRequire {
  context(
    directory: string,
    useSubdirectories?: boolean,
    regExp?: RegExp,
  ): WebpackRequireContext;
}

declare const require: NodeRequire;

declare interface Window {
  ENV?: string;
  gtag: (...args: unknown[]) => void;
}

declare const process: {
  env: {
    NODE_ENV: string;
  };
};

declare type RequestHandler = (
  data: unknown,
  params: unknown[],
  fullData?: unknown,
) => void;
