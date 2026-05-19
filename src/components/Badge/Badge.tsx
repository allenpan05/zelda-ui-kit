import React from 'react';
import classNames from 'classnames';
import './style.less';

export type BadgeVariant = 'default' | 'primary' | 'success' | 'warning' | 'danger' | 'info';
export type BadgeSize = 'sm' | 'md';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** 徽章變體 */
  variant?: BadgeVariant;
  /** 尺寸 */
  size?: BadgeSize;
  /** 是否帶圓點 */
  dot?: boolean;
  /** 數量 */
  count?: number;
  /** 最大數量 */
  overflowCount?: number;
  /** 子元素 */
  children?: React.ReactNode;
}

const Badge: React.FC<BadgeProps> = ({
  variant = 'default',
  size = 'md',
  dot = false,
  count,
  overflowCount = 99,
  children,
  className,
  ...rest
}) => {
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
    <span className={classes} {...rest}>
      {children}
      {(dot || count !== undefined) && (
        <span className="zelda-badge__count">
          {!dot && renderCount()}
        </span>
      )}
    </span>
  );
};

Badge.displayName = 'Badge';

export default Badge;
