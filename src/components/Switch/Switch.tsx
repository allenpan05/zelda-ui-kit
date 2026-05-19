import React, { useState } from 'react';
import styles from './switch.module.less';

export interface SwitchProps {
    checked?: boolean;
    defaultChecked?: boolean;
    disabled?: boolean;
    size?: 'small' | 'middle';
    onChange?: (checked: boolean) => void;
    className?: string;
}

export const Switch: React.FC<SwitchProps> = ({
    checked: controlledChecked,
    defaultChecked = false,
    disabled = false,
    size = 'middle',
    onChange,
    className,
}) => {
    const [internalChecked, setInternalChecked] = useState(defaultChecked);
    const checked = controlledChecked !== undefined ? controlledChecked : internalChecked;

    const handleClick = () => {
        if (disabled) return;
        const next = !checked;
        if (controlledChecked === undefined) setInternalChecked(next);
        onChange?.(next);
    };

    const classNames = [
        styles.switch,
        styles[`switch-${size}`],
        checked && styles['switch-checked'],
        disabled && styles['switch-disabled'],
        className,
    ]
        .filter(Boolean)
        .join(' ');

    return (
        <button
            type="button"
            role="switch"
            aria-checked={checked}
            className={classNames}
            onClick={handleClick}
            disabled={disabled}
        >
            <span className={styles.track}>
                <span className={styles.thumb} />
                {/* Sheikah rune glow when on */}
                {checked && <span className={styles.glow} />}
            </span>
        </button>
    );
};

Switch.displayName = 'Switch';
