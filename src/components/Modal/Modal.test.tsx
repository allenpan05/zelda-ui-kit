import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Modal } from './Modal';

describe('Modal', () => {
    it('renders nothing when closed', () => {
        render(<Modal open={false}>Content</Modal>);
        expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    });

    it('renders content when open', () => {
        render(<Modal open>Test Content</Modal>);
        expect(screen.getByRole('dialog')).toBeInTheDocument();
        expect(screen.getByText('Test Content')).toBeInTheDocument();
    });

    it('renders title', () => {
        render(<Modal open title="My Title" />);
        expect(screen.getByText('My Title')).toBeInTheDocument();
    });

    it('renders header close button by default', () => {
        render(<Modal open title="T" />);
        const buttons = screen.getAllByRole('button');
        const headerClose = buttons.find((b) => b.textContent === '✕');
        expect(headerClose).toBeInTheDocument();
    });

    it('hides header close button when closable=false', () => {
        render(<Modal open closable={false} title="T" />);
        const buttons = screen.getAllByRole('button');
        const headerClose = buttons.find((b) => b.textContent === '✕');
        expect(headerClose).toBeUndefined();
    });

    it('calls onClose when header close button clicked', async () => {
        const onClose = vi.fn();
        render(<Modal open title="T" onClose={onClose} />);
        const buttons = screen.getAllByRole('button');
        const headerClose = buttons.find((b) => b.textContent === '✕')!;
        await userEvent.click(headerClose);
        expect(onClose).toHaveBeenCalledOnce();
    });

    it('calls onClose when mask clicked and maskClosable=true', async () => {
        const onClose = vi.fn();
        const { container } = render(<Modal open onClose={onClose} maskClosable />);
        const mask = container.querySelector('[class*="mask"]');
        expect(mask).toBeTruthy();
        await userEvent.click(mask!);
        expect(onClose).toHaveBeenCalledOnce();
    });

    it('does not call onClose when mask clicked and maskClosable=false', async () => {
        const onClose = vi.fn();
        const { container } = render(<Modal open onClose={onClose} maskClosable={false} />);
        const mask = container.querySelector('[class*="mask"]');
        await userEvent.click(mask!);
        expect(onClose).not.toHaveBeenCalled();
    });

    it('calls onClose on Escape key', async () => {
        const onClose = vi.fn();
        render(<Modal open onClose={onClose} />);
        await userEvent.keyboard('{Escape}');
        expect(onClose).toHaveBeenCalledOnce();
    });

    it('renders custom footer', () => {
        render(<Modal open footer={<button>Custom</button>} />);
        expect(screen.getByRole('button', { name: 'Custom' })).toBeInTheDocument();
    });

    it('renders default footer with Close button', () => {
        render(<Modal open title="T" closable={false} />);
        expect(screen.getByRole('button', { name: 'Close' })).toBeInTheDocument();
    });

    it('hides footer when footer=null', () => {
        const { container } = render(<Modal open footer={null} />);
        expect(container.querySelector('[class*="footer"]')).not.toBeInTheDocument();
    });

    it('sets aria-modal on dialog', () => {
        render(<Modal open />);
        expect(screen.getByRole('dialog')).toHaveAttribute('aria-modal', 'true');
    });

    it('locks body scroll when open', () => {
        render(<Modal open />);
        expect(document.body.style.overflow).toBe('hidden');
    });

    it('restores body scroll when closed', () => {
        const { unmount } = render(<Modal open />);
        unmount();
        expect(document.body.style.overflow).toBe('');
    });
});
