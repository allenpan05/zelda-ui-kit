import React, { forwardRef, useState, useRef, useEffect } from 'react';
import classNames from 'classnames';
import { useMergedRef } from '@/hooks/useMergedRef';
import styles from './select.module.less';

export interface SelectOption {
    label: React.ReactNode;
    value: string | number;
    disabled?: boolean;
}

export interface SelectProps {
    value?: string | number;
    defaultValue?: string | number;
    options?: SelectOption[];
    placeholder?: string;
    disabled?: boolean;
    size?: 'small' | 'middle' | 'large';
    onChange?: (value: string | number) => void;
    className?: string;
}

export const Select = forwardRef<HTMLDivElement, SelectProps>(
    ({ value: controlledValue, defaultValue, options = [], placeholder = 'Select...', disabled = false, size = 'middle', onChange, className }, ref) => {
        const [open, setOpen] = useState(false);
        const [internalValue, setInternalValue] = useState(defaultValue);
        const wrapperRef = useRef<HTMLDivElement>(null);
        const mergedRef = useMergedRef(wrapperRef, ref);

        const value = controlledValue !== undefined ? controlledValue : internalValue;
        const selectedOption = options.find((o) => o.value === value);

        useEffect(() => {
            const handleClickOutside = (e: MouseEvent) => {
                if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
                    setOpen(false);
                }
            };
            document.addEventListener('mousedown', handleClickOutside);
            return () => document.removeEventListener('mousedown', handleClickOutside);
        }, []);

        const handleSelect = (opt: SelectOption) => {
            if (opt.disabled) return;
            if (controlledValue === undefined) setInternalValue(opt.value);
            onChange?.(opt.value);
            setOpen(false);
        };

        return (
            <div ref={mergedRef} className={classNames(
                styles.wrapper,
                styles[`wrapper-${size}`],
                { [styles['wrapper-open']]: open, [styles['wrapper-disabled']]: disabled },
                className,
            )}>
                <div
                    className={styles.trigger}
                    onClick={() => !disabled && setOpen(!open)}
                    role="combobox"
                    aria-expanded={open}
                >
                    <span className={selectedOption ? styles.value : styles.placeholder}>
                        {selectedOption?.label ?? placeholder}
                    </span>
                    <span className={classNames(styles.arrow, { [styles['arrow-up']]: open })}>
                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                            <path d="M3 4.5L6 7.5L9 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                    </span>
                </div>
                {open && (
                    <div className={styles.dropdown}>
                        {options.map((opt) => (
                            <div
                                key={opt.value}
                                className={classNames(styles.option, {
                                    [styles['option-active']]: opt.value === value,
                                    [styles['option-disabled']]: opt.disabled,
                                })}
                                onClick={() => handleSelect(opt)}
                            >
                                {opt.label}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        );
    },
);

Select.displayName = 'Select';
