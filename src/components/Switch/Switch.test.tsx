import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Switch } from './Switch';

describe('Switch', () => {
    it('renders unchecked by default', () => {
        render(<Switch />);
        expect(screen.getByRole('switch')).toHaveAttribute('aria-checked', 'false');
    });

    it('renders checked with defaultChecked', () => {
        render(<Switch defaultChecked />);
        expect(screen.getByRole('switch')).toHaveAttribute('aria-checked', 'true');
    });

    it('toggles on click', async () => {
        const onChange = vi.fn();
        render(<Switch onChange={onChange} />);
        await userEvent.click(screen.getByRole('switch'));
        expect(onChange).toHaveBeenCalledWith(true);
    });

    it('toggles from checked to unchecked', async () => {
        const onChange = vi.fn();
        render(<Switch defaultChecked onChange={onChange} />);
        await userEvent.click(screen.getByRole('switch'));
        expect(onChange).toHaveBeenCalledWith(false);
    });

    it('does not toggle when disabled', async () => {
        const onChange = vi.fn();
        render(<Switch disabled onChange={onChange} />);
        await userEvent.click(screen.getByRole('switch'));
        expect(onChange).not.toHaveBeenCalled();
    });

    it('supports controlled checked', () => {
        render(<Switch checked />);
        expect(screen.getByRole('switch')).toHaveAttribute('aria-checked', 'true');
    });

    it('renders as disabled', () => {
        render(<Switch disabled />);
        expect(screen.getByRole('switch')).toBeDisabled();
    });
});
