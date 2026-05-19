import React, { useState } from 'react';
import styles from './checkbox.module.less';

export interface CheckboxProps {
    checked?: boolean;
    defaultChecked?: boolean;
    disabled?: boolean;
    onChange?: (checked: boolean) => void;
    className?: string;
    children?: React.ReactNode;
}

export const Checkbox: React.FC<CheckboxProps> = ({
    checked: controlledChecked,
    defaultChecked = false,
    disabled = false,
    onChange,
    className,
    children,
}) => {
    const [internalChecked, setInternalChecked] = useState(defaultChecked);
    const checked = controlledChecked !== undefined ? controlledChecked : internalChecked;

    const handleChange = () => {
        if (disabled) return;
        const next = !checked;
        if (controlledChecked === undefined) setInternalChecked(next);
        onChange?.(next);
    };

    const classNames = [
        styles.checkbox,
        checked && styles['checkbox-checked'],
        disabled && styles['checkbox-disabled'],
        className,
    ]
        .filter(Boolean)
        .join(' ');

    return (
        <label className={classNames} onClick={handleChange}>
            <span className={styles.box}>
                {checked && (
                    <svg className={styles.check} width="12" height="12" viewBox="0 0 12 12" fill="none">
                        <path d="M2 6L5 9L10 3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                )}
            </span>
            {children && <span className={styles.label}>{children}</span>}
        </label>
    );
};

Checkbox.displayName = 'Checkbox';
