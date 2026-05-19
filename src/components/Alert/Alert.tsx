import React, { forwardRef } from 'react';
import styles from './alert.module.less';

export type AlertType = 'info' | 'success' | 'warning' | 'error';

export interface AlertProps {
    type?: AlertType;
    title?: React.ReactNode;
    description?: React.ReactNode;
    closable?: boolean;
    showIcon?: boolean;
    onClose?: () => void;
    className?: string;
}

const iconMap: Record<AlertType, React.ReactNode> = {
    info: <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.5"/><path d="M8 5v4M8 11v0.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>,
    success: <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.5"/><path d="M4.5 8L7 10.5L11.5 5.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>,
    warning: <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M8 2L15 14H1L8 2Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/><path d="M8 6.5V9.5M8 11.5V12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>,
    error: <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.5"/><path d="M5.5 5.5L10.5 10.5M10.5 5.5L5.5 10.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>,
};

export const Alert = forwardRef<HTMLDivElement, AlertProps>(
    ({ type = 'info', title, description, closable = false, showIcon = true, onClose, className }, ref) => {
        const [visible, setVisible] = React.useState(true);

        if (!visible) return null;

        const handleClose = () => {
            setVisible(false);
            onClose?.();
        };

        return (
            <div ref={ref} className={[styles.alert, styles[`alert-${type}`], className].filter(Boolean).join(' ')}>
                {showIcon && <span className={styles.icon}>{iconMap[type]}</span>}
                <div className={styles.content}>
                    {title && <div className={styles.title}>{title}</div>}
                    {description && <div className={styles.description}>{description}</div>}
                </div>
                {closable && (
                    <button className={styles.close} onClick={handleClose} aria-label="Close">
                        ✕
                    </button>
                )}
            </div>
        );
    },
);

Alert.displayName = 'Alert';
