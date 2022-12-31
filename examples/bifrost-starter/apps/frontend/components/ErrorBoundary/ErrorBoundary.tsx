import { Component, ErrorInfo } from 'react';

type ErrorBoundaryProps = {
  FallbackComponent: () => JSX.Element;
  children: JSX.Element;
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

  static getDerivedStateFromError(): { hasError: boolean } {
    return { hasError: true };
  }
  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    // You can use your own error logging service here like sentry
    console.error({ error, errorInfo });
  }
  render(): JSX.Element {
    const { hasError } = this.state;
    const { FallbackComponent, children } = this.props;

    return hasError ? <FallbackComponent /> : children;
  }
}
