/**
 * @file components/ErrorBoundary/ErrorBoundary.tsx
 * @author leon.wang
 */
import React, { Component, ReactNode, ErrorInfo } from 'react';
import { Button, Result } from '@derbysoft/neat-design';
import { ReloadOutlined, HomeOutlined } from '@ant-design/icons';
import './ErrorBoundary.scss';

export interface ErrorBoundaryProps {
  /** Child components */
  children: ReactNode;
  /** Fallback UI when error occurs */
  fallback?: ReactNode | ((error: Error, errorInfo: ErrorInfo) => ReactNode);
  /** Callback when error is caught */
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
  /** Callback when go home button is clicked */
  onGoHome?: () => void;
  /** Custom error title */
  errorTitle?: string;
  /** Custom error subtitle */
  errorSubtitle?: string;
  /** Whether to show reload button */
  showReload?: boolean;
  /** Whether to show home button */
  showHome?: boolean;
  /** Home page path */
  homePath?: string;
}

export interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

/**
 * Error Boundary component
 * Catches JavaScript errors anywhere in the child component tree
 * and displays a fallback UI instead of crashing the whole app
 */
export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  static defaultProps = {
    errorTitle: '页面出错了',
    errorSubtitle: '抱歉，页面遇到了一些问题',
    showReload: true,
    showHome: true,
    homePath: '/',
  };

  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
    };
  }

  static getDerivedStateFromError(error: Error): Partial<ErrorBoundaryState> {
    // Update state so the next render will show the fallback UI
    return {
      hasError: true,
      error,
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    // Log error to console in development
    if (process.env.NODE_ENV === 'development') {
      // eslint-disable-next-line no-console
      console.error('ErrorBoundary caught an error:', error, errorInfo);
    }

    // Update state with error details
    this.setState({
      error,
      errorInfo,
    });

    // Call onError callback if provided
    this.props.onError?.(error, errorInfo);

    // In production, you might want to log to an error reporting service
    // e.g., Sentry, LogRocket, etc.
    // logErrorToService(error, errorInfo);
  }

  handleReload = (): void => {
    window.location.reload();
  };

  handleGoHome = (): void => {
    if (this.props.onGoHome) {
      // Reset error state first, then navigate after re-render
      this.setState(
        {
          hasError: false,
          error: null,
          errorInfo: null,
        },
        () => {
          // Execute navigation callback after state reset
          this.props.onGoHome!();
        }
      );
    } else {
      window.location.href = this.props.homePath || '/';
    }
  };

  handleReset = (): void => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null,
    });
  };

  render(): ReactNode {
    const {
      children,
      fallback,
      errorTitle,
      errorSubtitle,
      showReload,
      showHome,
    } = this.props;
    const { hasError, error, errorInfo } = this.state;

    if (hasError) {
      // If custom fallback is provided, use it
      if (fallback) {
        if (typeof fallback === 'function' && error && errorInfo) {
          return fallback(error, errorInfo) as ReactNode;
        }
        return fallback as ReactNode;
      }

      // Default fallback UI
      return (
        <div className="error-boundary">
          <Result
            status="error"
            title={errorTitle}
            subTitle={errorSubtitle}
            extra={
              <div className="error-boundary__actions">
                {showReload && (
                  <Button type="primary" icon={<ReloadOutlined />} onClick={this.handleReload}>
                    重新加载
                  </Button>
                )}
                {showHome && (
                  <Button icon={<HomeOutlined />} onClick={this.handleGoHome}>
                    返回首页
                  </Button>
                )}
                <Button onClick={this.handleReset}>重试</Button>
              </div>
            }
          />
        </div>
      );
    }

    return children;
  }
}
