import React from 'react';
import styles from './tag.module.less';

export type TagColor = 'default' | 'gold' | 'sheikah' | 'success' | 'warning' | 'error';

export interface TagProps {
    color?: TagColor;
    closable?: boolean;
    onClose?: () => void;
    className?: string;
    children?: React.ReactNode;
}

export const Tag: React.FC<TagProps> = ({
    color = 'default',
    closable = false,
    onClose,
    className,
    children,
}) => {
    return (
        <span className={[styles.tag, styles[`tag-${color}`], className].filter(Boolean).join(' ')}>
            {children}
            {closable && (
                <button className={styles.close} onClick={onClose} aria-label="Remove">
                    ✕
                </button>
            )}
        </span>
    );
};

Tag.displayName = 'Tag';
