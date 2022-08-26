import { Component, ErrorInfo, FunctionComponent, ReactNode } from 'react';

type ErrorBoundaryProps = {
  FallbackComponent: FunctionComponent<Record<never, unknown>>;
  children: ReactNode;
};

type ErrorBoundaryState = {
  hasError: boolean;
};

export class ErrorBoundary extends Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  state = {
    hasError: false,
  };

  static getDerivedStateFromError() {
    return { hasError: true };
  }
  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // You can use your own error logging service here like sentry
    console.error({ error, errorInfo });
  }
  render() {
    const { hasError } = this.state;
    const { FallbackComponent, children } = this.props;

    return hasError ? <FallbackComponent /> : children;
  }
}
