import React, { forwardRef } from 'react';
import classNames from 'classnames';
import './style.less';

export type BadgeVariant = 'default' | 'primary' | 'success' | 'warning' | 'danger' | 'info';
export type BadgeSize = 'sm' | 'md';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
  size?: BadgeSize;
  dot?: boolean;
  count?: number;
  overflowCount?: number;
  children?: React.ReactNode;
}

export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(({
  variant = 'default',
  size = 'md',
  dot = false,
  count,
  overflowCount = 99,
  children,
  className,
  ...rest
}, ref) => {
  const classes = classNames(
    'zelda-badge',
    `zelda-badge--${variant}`,
    `zelda-badge--${size}`,
    {
      'zelda-badge--dot': dot,
      'zelda-badge--has-children': !!children,
    },
    className
  );

  const renderCount = () => {
    if (count === undefined) return null;
    if (count > overflowCount) {
      return `${overflowCount}+`;
    }
    return count;
  };

  return (
    <span ref={ref} className={classes} {...rest}>
      {children}
      {(dot || count !== undefined) && (
        <span className="zelda-badge__count">
          {!dot && renderCount()}
        </span>
      )}
    </span>
  );
});

Badge.displayName = 'Badge';

