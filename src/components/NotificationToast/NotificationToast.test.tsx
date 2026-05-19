import { describe, it, expect, vi } from 'vitest';
import { render, screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { NotificationToast } from './NotificationToast';

describe('NotificationToast', () => {
    it('renders with title', () => {
        render(<NotificationToast title="Item found!" />);
        expect(screen.getByText('Item found!')).toBeInTheDocument();
    });

    it('renders description', () => {
        render(<NotificationToast title="Quest" description="Defeat Ganon" />);
        expect(screen.getByText('Defeat Ganon')).toBeInTheDocument();
    });

    it('has role="alert"', () => {
        render(<NotificationToast title="Alert" />);
        expect(screen.getByRole('alert')).toBeInTheDocument();
    });

    it('renders close button', () => {
        render(<NotificationToast title="Closable" />);
        expect(screen.getByRole('button', { name: 'Close' })).toBeInTheDocument();
    });

    it('calls onClose when close clicked', async () => {
        const onClose = vi.fn();
        render(<NotificationToast title="Bye" onClose={onClose} />);
        await userEvent.click(screen.getByRole('button', { name: 'Close' }));
        expect(onClose).toHaveBeenCalledOnce();
    });

    it('auto-closes after duration', async () => {
        vi.useFakeTimers();
        const afterClose = vi.fn();
        render(<NotificationToast title="Gone" duration={1000} afterClose={afterClose} />);
        expect(screen.getByText('Gone')).toBeInTheDocument();

        act(() => { vi.advanceTimersByTime(1000); });
        // closing animation starts
        act(() => { vi.advanceTimersByTime(300); });
        expect(afterClose).toHaveBeenCalledOnce();

        vi.useRealTimers();
    });

    it('does not auto-close when duration=0', async () => {
        vi.useFakeTimers();
        render(<NotificationToast title="Stays" duration={0} />);
        act(() => { vi.advanceTimersByTime(10000); });
        expect(screen.getByText('Stays')).toBeInTheDocument();
        vi.useRealTimers();
    });

    it('supports controlled visible prop', () => {
        const { rerender } = render(<NotificationToast title="Ctrl" visible={false} />);
        expect(screen.queryByText('Ctrl')).not.toBeInTheDocument();

        rerender(<NotificationToast title="Ctrl" visible />);
        expect(screen.getByText('Ctrl')).toBeInTheDocument();
    });
});
