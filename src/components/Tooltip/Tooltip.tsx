import React, { useState, useRef, forwardRef } from 'react';
import styles from './tooltip.module.less';

export type TooltipPlacement = 'top' | 'bottom' | 'left' | 'right';

export interface TooltipProps {
    title: React.ReactNode;
    placement?: TooltipPlacement;
    className?: string;
    children: React.ReactElement;
}

export const Tooltip = forwardRef<HTMLDivElement, TooltipProps>(
    ({ title, placement = 'top', className, children }, ref) => {
        const [visible, setVisible] = useState(false);
        const timeoutRef = useRef<ReturnType<typeof setTimeout>>();

        const show = () => {
            clearTimeout(timeoutRef.current);
            setVisible(true);
        };

        const hide = () => {
            timeoutRef.current = setTimeout(() => setVisible(false), 100);
        };

        return (
            <div
                ref={ref}
                className={[styles.wrapper, className].filter(Boolean).join(' ')}
                onMouseEnter={show}
                onMouseLeave={hide}
                onFocus={show}
                onBlur={hide}
            >
                {children}
                {visible && (
                    <div
                        className={[styles.tooltip, styles[`tooltip-${placement}`]].filter(Boolean).join(' ')}
                        role="tooltip"
                    >
                        <span className={styles.content}>{title}</span>
                        <span className={styles.arrow} />
                    </div>
                )}
            </div>
        );
    },
);

Tooltip.displayName = 'Tooltip';
