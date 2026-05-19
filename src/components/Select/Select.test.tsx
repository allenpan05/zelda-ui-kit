import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Select } from './Select';

const options = [
    { label: 'Master Sword', value: 'sword' },
    { label: 'Hylian Shield', value: 'shield' },
    { label: 'Bow of Light', value: 'bow', disabled: true },
];

describe('Select', () => {
    it('renders placeholder by default', () => {
        render(<Select options={options} />);
        expect(screen.getByText('Select...')).toBeInTheDocument();
    });

    it('renders custom placeholder', () => {
        render(<Select options={options} placeholder="Pick weapon" />);
        expect(screen.getByText('Pick weapon')).toBeInTheDocument();
    });

    it('opens dropdown on click', async () => {
        render(<Select options={options} />);
        await userEvent.click(screen.getByRole('combobox'));
        expect(screen.getByText('Master Sword')).toBeInTheDocument();
        expect(screen.getByText('Hylian Shield')).toBeInTheDocument();
    });

    it('selects an option', async () => {
        const onChange = vi.fn();
        render(<Select options={options} onChange={onChange} />);
        await userEvent.click(screen.getByRole('combobox'));
        await userEvent.click(screen.getByText('Master Sword'));
        expect(onChange).toHaveBeenCalledWith('sword');
    });

    it('shows selected value', async () => {
        render(<Select options={options} defaultValue="shield" />);
        expect(screen.getByText('Hylian Shield')).toBeInTheDocument();
    });

    it('does not select disabled option', async () => {
        const onChange = vi.fn();
        render(<Select options={options} onChange={onChange} />);
        await userEvent.click(screen.getByRole('combobox'));
        await userEvent.click(screen.getByText('Bow of Light'));
        expect(onChange).not.toHaveBeenCalled();
    });

    it('closes dropdown after selection', async () => {
        render(<Select options={options} />);
        await userEvent.click(screen.getByRole('combobox'));
        await userEvent.click(screen.getByText('Master Sword'));
        expect(screen.queryByText('Hylian Shield')).not.toBeInTheDocument();
    });

    it('sets aria-expanded correctly', async () => {
        render(<Select options={options} />);
        expect(screen.getByRole('combobox')).toHaveAttribute('aria-expanded', 'false');
        await userEvent.click(screen.getByRole('combobox'));
        expect(screen.getByRole('combobox')).toHaveAttribute('aria-expanded', 'true');
    });

    it('does not open when disabled', async () => {
        render(<Select options={options} disabled />);
        await userEvent.click(screen.getByRole('combobox'));
        expect(screen.queryByText('Master Sword')).not.toBeInTheDocument();
    });

    it('supports controlled value', () => {
        render(<Select options={options} value="sword" />);
        expect(screen.getByText('Master Sword')).toBeInTheDocument();
    });
});
