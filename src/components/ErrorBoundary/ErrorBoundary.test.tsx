import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { ErrorBoundary } from './ErrorBoundary';

function ThrowingComponent({ shouldThrow }: { shouldThrow: boolean }) {
    if (shouldThrow) throw new Error('Test error');
    return <div>No error</div>;
}

describe('ErrorBoundary', () => {
    it('renders children when no error', () => {
        render(
            <ErrorBoundary>
                <div>Child content</div>
            </ErrorBoundary>,
        );
        expect(screen.getByText('Child content')).toBeInTheDocument();
    });

    it('renders default fallback on error', () => {
        const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
        render(
            <ErrorBoundary>
                <ThrowingComponent shouldThrow />
            </ErrorBoundary>,
        );
        expect(screen.getByText('Something went wrong')).toBeInTheDocument();
        expect(screen.getByText('Test error')).toBeInTheDocument();
        expect(screen.getByRole('button', { name: 'Try again' })).toBeInTheDocument();
        consoleSpy.mockRestore();
    });

    it('renders custom ReactNode fallback', () => {
        const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
        render(
            <ErrorBoundary fallback={<div>Custom fallback</div>}>
                <ThrowingComponent shouldThrow />
            </ErrorBoundary>,
        );
        expect(screen.getByText('Custom fallback')).toBeInTheDocument();
        consoleSpy.mockRestore();
    });

    it('renders function fallback with error and reset', () => {
        const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
        render(
            <ErrorBoundary fallback={(error, reset) => <button onClick={reset}>{error.message}</button>}>
                <ThrowingComponent shouldThrow />
            </ErrorBoundary>,
        );
        expect(screen.getByRole('button', { name: 'Test error' })).toBeInTheDocument();
        consoleSpy.mockRestore();
    });

    it('calls onError when error occurs', () => {
        const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
        const onError = vi.fn();
        render(
            <ErrorBoundary onError={onError}>
                <ThrowingComponent shouldThrow />
            </ErrorBoundary>,
        );
        expect(onError).toHaveBeenCalledOnce();
        expect(onError.mock.calls[0][0].message).toBe('Test error');
        consoleSpy.mockRestore();
    });

    it('resets error state when reset is called', async () => {
        const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
        let resetFn: (() => void) | undefined;

        function Wrapper() {
            const [throwError, setThrowError] = React.useState(true);
            return (
                <ErrorBoundary
                    fallback={(_error, reset) => {
                        resetFn = () => {
                            setThrowError(false);
                            reset();
                        };
                        return <button onClick={resetFn}>Try again</button>;
                    }}
                >
                    {throwError ? <ThrowingComponent shouldThrow /> : <div>No error</div>}
                </ErrorBoundary>
            );
        }

        render(<Wrapper />);
        expect(screen.getByText('Try again')).toBeInTheDocument();
        await userEvent.click(screen.getByRole('button', { name: 'Try again' }));
        expect(screen.getByText('No error')).toBeInTheDocument();
        consoleSpy.mockRestore();
    });
});
