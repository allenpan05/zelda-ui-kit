import React from 'react';
import styles from './divider.module.less';

export interface DividerProps {
    orientation?: 'left' | 'center' | 'right';
    dashed?: boolean;
    className?: string;
    children?: React.ReactNode;
}

export const Divider: React.FC<DividerProps> = ({
    orientation = 'center',
    dashed = false,
    className,
    children,
}) => {
    const classNames = [
        styles.divider,
        children && styles['divider-with-text'],
        children && styles[`divider-${orientation}`],
        dashed && styles['divider-dashed'],
        className,
    ]
        .filter(Boolean)
        .join(' ');

    return (
        <div className={classNames} role="separator">
            {children && <span className={styles.text}>{children}</span>}
        </div>
    );
};

Divider.displayName = 'Divider';
