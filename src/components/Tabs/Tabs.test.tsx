import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Tabs } from './Tabs';

const items = [
    { key: 'a', label: 'Tab A', children: <div>Content A</div> },
    { key: 'b', label: 'Tab B', children: <div>Content B</div> },
    { key: 'c', label: 'Tab C', children: <div>Content C</div>, disabled: true },
];

describe('Tabs', () => {
    it('renders all tab labels', () => {
        render(<Tabs items={items} />);
        expect(screen.getByRole('tab', { name: 'Tab A' })).toBeInTheDocument();
        expect(screen.getByRole('tab', { name: 'Tab B' })).toBeInTheDocument();
        expect(screen.getByRole('tab', { name: 'Tab C' })).toBeInTheDocument();
    });

    it('shows first tab content by default', () => {
        render(<Tabs items={items} />);
        expect(screen.getByText('Content A')).toBeInTheDocument();
        expect(screen.queryByText('Content B')).not.toBeInTheDocument();
    });

    it('switches tab on click', async () => {
        render(<Tabs items={items} />);
        await userEvent.click(screen.getByRole('tab', { name: 'Tab B' }));
        expect(screen.getByText('Content B')).toBeInTheDocument();
        expect(screen.queryByText('Content A')).not.toBeInTheDocument();
    });

    it('does not switch to disabled tab', async () => {
        render(<Tabs items={items} />);
        await userEvent.click(screen.getByRole('tab', { name: 'Tab C' }));
        expect(screen.getByText('Content A')).toBeInTheDocument();
    });

    it('calls onChange when tab clicked', async () => {
        const onChange = vi.fn();
        render(<Tabs items={items} onChange={onChange} />);
        await userEvent.click(screen.getByRole('tab', { name: 'Tab B' }));
        expect(onChange).toHaveBeenCalledWith('b');
    });

    it('supports controlled activeKey', () => {
        render(<Tabs items={items} activeKey="b" />);
        expect(screen.getByText('Content B')).toBeInTheDocument();
    });

    it('supports defaultActiveKey', () => {
        render(<Tabs items={items} defaultActiveKey="b" />);
        expect(screen.getByText('Content B')).toBeInTheDocument();
    });

    it('disables tab', () => {
        render(<Tabs items={items} />);
        expect(screen.getByRole('tab', { name: 'Tab C' })).toBeDisabled();
    });

    it('has proper ARIA attributes', () => {
        render(<Tabs items={items} />);
        const tablist = screen.getByRole('tablist');
        expect(tablist).toBeInTheDocument();

        const tabA = screen.getByRole('tab', { name: 'Tab A' });
        expect(tabA).toHaveAttribute('aria-selected', 'true');
        expect(tabA).toHaveAttribute('aria-controls', 'tab-panel-a');

        const tabB = screen.getByRole('tab', { name: 'Tab B' });
        expect(tabB).toHaveAttribute('aria-selected', 'false');

        const panel = screen.getByRole('tabpanel');
        expect(panel).toHaveAttribute('aria-labelledby', 'tab-a');
    });

    it('navigates tabs with arrow keys', async () => {
        render(<Tabs items={items} />);
        const tabA = screen.getByRole('tab', { name: 'Tab A' });
        tabA.focus();
        await userEvent.keyboard('{ArrowRight}');
        expect(screen.getByRole('tab', { name: 'Tab B' })).toHaveAttribute('aria-selected', 'true');
    });

    it('skips disabled tabs with arrow keys', async () => {
        render(<Tabs items={items} defaultActiveKey="b" />);
        const tabB = screen.getByRole('tab', { name: 'Tab B' });
        tabB.focus();
        await userEvent.keyboard('{ArrowRight}');
        // ArrowRight from Tab B should skip disabled Tab C and wrap to Tab A
        expect(screen.getByRole('tab', { name: 'Tab A' })).toHaveAttribute('aria-selected', 'true');
    });
});
