import React, { forwardRef } from 'react';
import styles from './tag.module.less';

export type TagColor = 'default' | 'gold' | 'sheikah' | 'success' | 'warning' | 'error';

export interface TagProps {
    color?: TagColor;
    closable?: boolean;
    onClose?: () => void;
    className?: string;
    children?: React.ReactNode;
}

export const Tag = forwardRef<HTMLSpanElement, TagProps>(
    ({ color = 'default', closable = false, onClose, className, children }, ref) => {
        return (
            <span ref={ref} className={[styles.tag, styles[`tag-${color}`], className].filter(Boolean).join(' ')}>
                {children}
                {closable && (
                    <button className={styles.close} onClick={onClose} aria-label="Remove">
                        ✕
                    </button>
                )}
            </span>
        );
    },
);

Tag.displayName = 'Tag';
