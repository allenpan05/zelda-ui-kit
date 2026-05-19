import React, { useEffect, useCallback } from 'react';
import styles from './modal.module.less';

export interface ModalProps {
    open: boolean;
    title?: React.ReactNode;
    footer?: React.ReactNode | null;
    closable?: boolean;
    maskClosable?: boolean;
    width?: number | string;
    onClose?: () => void;
    className?: string;
    children?: React.ReactNode;
}

export const Modal: React.FC<ModalProps> = ({
    open,
    title,
    footer,
    closable = true,
    maskClosable = true,
    width = 520,
    onClose,
    className,
    children,
}) => {
    const handleKeyDown = useCallback(
        (e: KeyboardEvent) => {
            if (e.key === 'Escape' && onClose) onClose();
        },
        [onClose],
    );

    useEffect(() => {
        if (open) {
            document.addEventListener('keydown', handleKeyDown);
            document.body.style.overflow = 'hidden';
        }
        return () => {
            document.removeEventListener('keydown', handleKeyDown);
            document.body.style.overflow = '';
        };
    }, [open, handleKeyDown]);

    if (!open) return null;

    return (
        <div className={styles.overlay}>
            <div
                className={styles.mask}
                onClick={maskClosable ? onClose : undefined}
            />
            <div
                className={[styles.modal, className].filter(Boolean).join(' ')}
                style={{ width }}
                role="dialog"
                aria-modal
            >
                {/* Sheikah corner decorations */}
                <span className={`${styles.corner} ${styles['corner-tl']}`} />
                <span className={`${styles.corner} ${styles['corner-tr']}`} />
                <span className={`${styles.corner} ${styles['corner-bl']}`} />
                <span className={`${styles.corner} ${styles['corner-br']}`} />

                {(title || closable) && (
                    <div className={styles.header}>
                        {title && <div className={styles.title}>{title}</div>}
                        {closable && (
                            <button className={styles.close} onClick={onClose} aria-label="Close">
                                ✕
                            </button>
                        )}
                    </div>
                )}
                <div className={styles.body}>{children}</div>
                {footer !== null && (
                    <div className={styles.footer}>
                        {footer ?? (
                            <button className={styles['default-close']} onClick={onClose}>
                                Close
                            </button>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

Modal.displayName = 'Modal';
