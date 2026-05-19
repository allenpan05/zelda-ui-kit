import React, { forwardRef, useRef, useEffect, useCallback } from 'react';
import classNames from 'classnames';
import { useMergedRef } from '@/hooks/useMergedRef';
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

const FOCUSABLE = 'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])';

export const Modal = forwardRef<HTMLDivElement, ModalProps>(
    ({ open, title, footer, closable = true, maskClosable = true, width = 520, onClose, className, children }, ref) => {
        const innerRef = useRef<HTMLDivElement>(null);
        const mergedRef = useMergedRef(innerRef, ref);

        const handleKeyDown = useCallback(
            (e: KeyboardEvent) => {
                if (e.key === 'Escape' && onClose) {
                    onClose();
                    return;
                }

                if (e.key === 'Tab' && innerRef.current) {
                    const focusable = innerRef.current.querySelectorAll<HTMLElement>(FOCUSABLE);
                    if (focusable.length === 0) return;

                    const first = focusable[0];
                    const last = focusable[focusable.length - 1];

                    if (e.shiftKey) {
                        if (document.activeElement === first) {
                            e.preventDefault();
                            last.focus();
                        }
                    } else {
                        if (document.activeElement === last) {
                            e.preventDefault();
                            first.focus();
                        }
                    }
                }
            },
            [onClose],
        );

        useEffect(() => {
            if (open) {
                document.addEventListener('keydown', handleKeyDown);
                document.body.style.overflow = 'hidden';

                const timer = setTimeout(() => {
                    if (innerRef.current) {
                        const focusable = innerRef.current.querySelectorAll<HTMLElement>(FOCUSABLE);
                        if (focusable.length > 0) focusable[0].focus();
                    }
                }, 0);

                return () => {
                    clearTimeout(timer);
                    document.removeEventListener('keydown', handleKeyDown);
                    document.body.style.overflow = '';
                };
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
                    ref={mergedRef}
                    className={classNames(styles.modal, className)}
                    style={{ width }}
                    role="dialog"
                    aria-modal
                    aria-label={typeof title === 'string' ? title : undefined}
                >
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
    },
);

Modal.displayName = 'Modal';
