import React, { forwardRef } from 'react';
import classNames from 'classnames';
import './style.less';

export type ButtonType = 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'type'> {
  type?: ButtonType;
  size?: ButtonSize;
  loading?: boolean;
  icon?: React.ReactNode;
  children?: React.ReactNode;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(({
  type = 'primary',
  size = 'md',
  loading = false,
  icon,
  children,
  className,
  disabled,
  ...rest
}, ref) => {
  const classes = classNames(
    'zelda-button',
    `zelda-button--${type}`,
    `zelda-button--${size}`,
    {
      'zelda-button--loading': loading,
      'zelda-button--icon-only': !children && icon,
    },
    className
  );

  return (
    <button
      ref={ref}
      className={classes}
      disabled={disabled || loading}
      {...rest}
    >
      {loading && (
        <span className="zelda-button__spinner">
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeDasharray="31.4 31.4" />
          </svg>
        </span>
      )}
      {!loading && icon && (
        <span className="zelda-button__icon">{icon}</span>
      )}
      {children && <span className="zelda-button__text">{children}</span>}
    </button>
  );
});

Button.displayName = 'Button';

