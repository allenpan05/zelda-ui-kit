import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Checkbox } from './Checkbox';

describe('Checkbox', () => {
    it('renders unchecked by default', () => {
        const { container } = render(<Checkbox />);
        expect(container.querySelector('[class*="checked"]')).not.toBeInTheDocument();
    });

    it('renders with label', () => {
        render(<Checkbox>Accept</Checkbox>);
        expect(screen.getByText('Accept')).toBeInTheDocument();
    });

    it('toggles on click', async () => {
        const onChange = vi.fn();
        render(<Checkbox onChange={onChange}>Check</Checkbox>);
        await userEvent.click(screen.getByText('Check'));
        expect(onChange).toHaveBeenCalledWith(true);
    });

    it('toggles from checked to unchecked', async () => {
        const onChange = vi.fn();
        render(<Checkbox defaultChecked onChange={onChange}>Check</Checkbox>);
        await userEvent.click(screen.getByText('Check'));
        expect(onChange).toHaveBeenCalledWith(false);
    });

    it('does not toggle when disabled', async () => {
        const onChange = vi.fn();
        render(<Checkbox disabled onChange={onChange}>Check</Checkbox>);
        await userEvent.click(screen.getByText('Check'));
        expect(onChange).not.toHaveBeenCalled();
    });

    it('supports controlled checked', () => {
        const { container } = render(<Checkbox checked>On</Checkbox>);
        expect(container.querySelector('[class*="checked"]')).toBeInTheDocument();
    });

    it('supports defaultChecked', () => {
        const { container } = render(<Checkbox defaultChecked>On</Checkbox>);
        expect(container.querySelector('[class*="checked"]')).toBeInTheDocument();
    });
});
