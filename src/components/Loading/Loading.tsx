import React, { forwardRef } from 'react';
import styles from './loading.module.less';

export interface LoadingProps {
    spinning?: boolean;
    tip?: React.ReactNode;
    size?: 'small' | 'default' | 'large';
    className?: string;
    children?: React.ReactNode;
}

export const Loading = forwardRef<HTMLDivElement, LoadingProps>(
    ({ spinning = true, tip, size = 'default', className, children }, ref) => {
        const spinner = (
            <div className={[styles.spinner, styles[`spinner-${size}`], className].filter(Boolean).join(' ')}>
                <svg className={styles.ring} viewBox="0 0 50 50">
                    <circle cx="25" cy="25" r="20" fill="none" stroke="currentColor" strokeWidth="3" strokeDasharray="80 40" strokeLinecap="round" />
                </svg>
                {tip && <span className={styles.tip}>{tip}</span>}
            </div>
        );

        if (!children) return spinner;

        return (
            <div ref={ref} className={styles.container}>
                {spinning && <div className={styles.mask}>{spinner}</div>}
                <div className={spinning ? styles.content : undefined}>{children}</div>
            </div>
        );
    },
);

Loading.displayName = 'Loading';
