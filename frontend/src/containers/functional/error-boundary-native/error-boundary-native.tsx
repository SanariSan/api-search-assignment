import type { ErrorInfo, ReactNode } from 'react';
import { Component } from 'react';

type TProps = {
  children: ReactNode;
};

type TState = {
  hasError: boolean;
  error?: Error | undefined;
  errorInfo?: ErrorInfo | undefined;
};

class ErrorBoundaryNativeContainer extends Component<TProps, TState> {
  public state: TState = {
    hasError: false,
    error: undefined,
    errorInfo: undefined,
  };

  static getDerivedStateFromError(error: Error) {
    return {
      hasError: true,
      error,
    };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    this.setState({ hasError: true, error, errorInfo });
  }

  render() {
    if (
      this.state.hasError &&
      this.state.error !== undefined &&
      this.state.errorInfo !== undefined
    ) {
      return (
        <div>
          <h2>Error in component lifecycle</h2>
          <details style={{ whiteSpace: 'pre-wrap' }}>
            {this.state.error.message}
            <hr />
            {this.state.errorInfo.componentStack}
          </details>
        </div>
      );
    }

    return this.props.children;
  }
}

export { ErrorBoundaryNativeContainer };
