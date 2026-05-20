import React, { forwardRef } from 'react';
import classNames from 'classnames';
import styles from './switch.module.less';

export interface SwitchProps {
    checked?: boolean;
    defaultChecked?: boolean;
    disabled?: boolean;
    size?: 'sm' | 'md';
    onChange?: (checked: boolean) => void;
    className?: string;
}

export const Switch = forwardRef<HTMLButtonElement, SwitchProps>(
    ({ checked: controlledChecked, defaultChecked = false, disabled = false, size = 'md', onChange, className }, ref) => {
        const [internalChecked, setInternalChecked] = React.useState(defaultChecked);
        const checked = controlledChecked !== undefined ? controlledChecked : internalChecked;

        const handleClick = () => {
            if (disabled) return;
            const next = !checked;
            if (controlledChecked === undefined) setInternalChecked(next);
            onChange?.(next);
        };

        return (
            <button
                ref={ref}
                type="button"
                role="switch"
                aria-checked={checked}
                className={classNames(styles.switch, styles[`switch-${size}`], {
                    [styles['switch-checked']]: checked,
                    [styles['switch-disabled']]: disabled,
                }, className)}
                onClick={handleClick}
                disabled={disabled}
            >
                <span className={styles.track}>
                    <span className={styles.thumb} />
                    {checked && <span className={styles.glow} />}
                </span>
            </button>
        );
    },
);

Switch.displayName = 'Switch';
