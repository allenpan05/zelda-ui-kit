import React, { Component, ErrorInfo, ReactNode } from 'react';

export interface ErrorBoundaryProps {
    /** Fallback UI to render when an error occurs */
    fallback?: ReactNode | ((error: Error, reset: () => void) => ReactNode);
    /** Callback when an error is caught */
    onError?: (error: Error, errorInfo: ErrorInfo) => void;
    /** Content to wrap */
    children: ReactNode;
}

export interface ErrorBoundaryState {
    hasError: boolean;
    error: Error | null;
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
    static displayName = 'ErrorBoundary';

    state: ErrorBoundaryState = { hasError: false, error: null };

    static getDerivedStateFromError(error: Error): ErrorBoundaryState {
        return { hasError: true, error };
    }

    componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        this.props.onError?.(error, errorInfo);
    }

    reset = () => {
        this.setState({ hasError: false, error: null });
    };

    render() {
        if (this.state.hasError && this.state.error) {
            const { fallback } = this.props;
            if (typeof fallback === 'function') {
                return fallback(this.state.error, this.reset);
            }
            if (fallback !== undefined) return fallback;
            return (
                <div style={{ padding: 16, color: '#ff4757' }}>
                    <h2>Something went wrong</h2>
                    <p>{this.state.error.message}</p>
                    <button onClick={this.reset}>Try again</button>
                </div>
            );
        }
        return this.props.children;
    }
}
