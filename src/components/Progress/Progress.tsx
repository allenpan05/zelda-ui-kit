import React from 'react';
import styles from './progress.module.less';

export interface ProgressProps {
    percent: number;
    status?: 'normal' | 'success' | 'error';
    showInfo?: boolean;
    size?: 'small' | 'default';
    color?: 'gold' | 'sheikah';
    className?: string;
}

export const Progress: React.FC<ProgressProps> = ({
    percent,
    status = 'normal',
    showInfo = true,
    size = 'default',
    color = 'sheikah',
    className,
}) => {
    const clampedPercent = Math.min(100, Math.max(0, percent));

    return (
        <div className={[styles.wrapper, className].filter(Boolean).join(' ')}>
            <div className={[styles.track, styles[`track-${size}`]].filter(Boolean).join(' ')}>
                <div
                    className={[
                        styles.bar,
                        styles[`bar-${color}`],
                        status === 'success' && styles['bar-success'],
                        status === 'error' && styles['bar-error'],
                    ]
                        .filter(Boolean)
                        .join(' ')}
                    style={{ width: `${clampedPercent}%` }}
                >
                    {size === 'default' && <span className={styles.glow} />}
                </div>
            </div>
            {showInfo && (
                <span className={styles.text}>
                    {status === 'success' ? '✓' : status === 'error' ? '✕' : `${Math.round(clampedPercent)}%`}
                </span>
            )}
        </div>
    );
};

Progress.displayName = 'Progress';
