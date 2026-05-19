import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Alert } from './Alert';

describe('Alert', () => {
    it('renders with default info type', () => {
        const { container } = render(<Alert title="Heads up" />);
        expect(screen.getByText('Heads up')).toBeInTheDocument();
        expect(container.querySelector('[class*="info"]')).toBeInTheDocument();
    });

    it('renders all types', () => {
        for (const type of ['info', 'success', 'warning', 'error'] as const) {
            const { unmount } = render(<Alert title={type} type={type} />);
            expect(screen.getByText(type)).toBeInTheDocument();
            unmount();
        }
    });

    it('renders description', () => {
        render(<Alert title="Title" description="Details here" />);
        expect(screen.getByText('Details here')).toBeInTheDocument();
    });

    it('shows close button when closable', () => {
        render(<Alert title="Closable" closable />);
        expect(screen.getByRole('button', { name: 'Close' })).toBeInTheDocument();
    });

    it('hides close button by default', () => {
        render(<Alert title="Not closable" />);
        expect(screen.queryByRole('button', { name: 'Close' })).not.toBeInTheDocument();
    });

    it('calls onClose and hides when close clicked', async () => {
        const onClose = vi.fn();
        render(<Alert title="Go away" closable onClose={onClose} />);
        await userEvent.click(screen.getByRole('button', { name: 'Close' }));
        expect(onClose).toHaveBeenCalledOnce();
        expect(screen.queryByText('Go away')).not.toBeInTheDocument();
    });

    it('hides icon when showIcon=false', () => {
        const { container } = render(<Alert title="No icon" showIcon={false} />);
        expect(container.querySelector('[class*="icon"]')).not.toBeInTheDocument();
    });
});
