import React, { forwardRef } from 'react';
import styles from './input.module.less';

export type InputSize = 'sm' | 'md' | 'lg';

export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size' | 'prefix'> {
    size?: InputSize;
    prefix?: React.ReactNode;
    suffix?: React.ReactNode;
    error?: boolean;
    helperText?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
    (
        {
            size = 'md',
            prefix,
            suffix,
            error = false,
            helperText,
            disabled = false,
            className,
            ...rest
        },
        ref,
    ) => {
        const wrapperClass = [
            styles.wrapper,
            styles[`wrapper-${size}`],
            error && styles['wrapper-error'],
            disabled && styles['wrapper-disabled'],
            className,
        ]
            .filter(Boolean)
            .join(' ');

        return (
            <div className={wrapperClass}>
                {prefix && <span className={styles.prefix}>{prefix}</span>}
                <input
                    ref={ref}
                    className={styles.input}
                    disabled={disabled}
                    {...rest}
                />
                {suffix && <span className={styles.suffix}>{suffix}</span>}
                {helperText && (
                    <span className={styles.helper}>{helperText}</span>
                )}
            </div>
        );
    },
);

Input.displayName = 'Input';
