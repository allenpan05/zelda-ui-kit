import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Input } from './Input';

describe('Input', () => {
    it('renders an input element', () => {
        render(<Input />);
        expect(screen.getByRole('textbox')).toBeInTheDocument();
    });

    it('supports placeholder', () => {
        render(<Input placeholder="Enter name" />);
        expect(screen.getByPlaceholderText('Enter name')).toBeInTheDocument();
    });

    it('handles value change', async () => {
        const onChange = vi.fn();
        render(<Input onChange={onChange} />);
        await userEvent.type(screen.getByRole('textbox'), 'abc');
        expect(onChange).toHaveBeenCalled();
    });

    it('renders prefix and suffix', () => {
        render(<Input prefix={<span>$</span>} suffix={<span>.00</span>} />);
        expect(screen.getByText('$')).toBeInTheDocument();
        expect(screen.getByText('.00')).toBeInTheDocument();
    });

    it('renders helper text', () => {
        render(<Input helperText="Required field" />);
        expect(screen.getByText('Required field')).toBeInTheDocument();
    });

    it('renders as disabled', () => {
        render(<Input disabled />);
        expect(screen.getByRole('textbox')).toBeDisabled();
    });

    it('renders error state', () => {
        const { container } = render(<Input error />);
        expect(container.querySelector('[class*="error"]')).toBeInTheDocument();
    });

    it('forwards ref', () => {
        const ref = { current: null };
        render(<Input ref={ref} />);
        expect(ref.current).toBeInstanceOf(HTMLInputElement);
    });
});
