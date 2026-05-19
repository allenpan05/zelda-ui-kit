import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Tooltip } from './Tooltip';

describe('Tooltip', () => {
    it('shows tooltip on hover', async () => {
        render(
            <Tooltip title="Helpful tip">
                <button>Hover me</button>
            </Tooltip>,
        );
        expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();
        await userEvent.hover(screen.getByRole('button', { name: 'Hover me' }));
        expect(screen.getByRole('tooltip')).toBeInTheDocument();
        expect(screen.getByText('Helpful tip')).toBeInTheDocument();
    });

    it('hides tooltip on mouse leave', async () => {
        render(
            <Tooltip title="Gone soon">
                <button>Hover me</button>
            </Tooltip>,
        );
        const trigger = screen.getByRole('button', { name: 'Hover me' });
        await userEvent.hover(trigger);
        expect(screen.getByRole('tooltip')).toBeInTheDocument();

        await userEvent.unhover(trigger);
        // Tooltip has 100ms hide delay
        await new Promise((r) => setTimeout(r, 150));
        expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();
    });

    it('shows tooltip on focus', async () => {
        render(
            <Tooltip title="Focus tip">
                <button>Focus me</button>
            </Tooltip>,
        );
        await userEvent.tab();
        expect(screen.getByRole('tooltip')).toBeInTheDocument();
    });
});
