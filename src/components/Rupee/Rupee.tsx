import React, { forwardRef } from 'react';
import classNames from 'classnames';
import './style.less';

export type RupeeColor = 'green' | 'blue' | 'red' | 'purple' | 'gold';
export type RupeeSize = 'sm' | 'md' | 'lg';

export interface RupeeProps extends React.HTMLAttributes<HTMLDivElement> {
  value: number;
  color?: RupeeColor;
  size?: RupeeSize;
  animated?: boolean;
  showIcon?: boolean;
}

export const Rupee = forwardRef<HTMLDivElement, RupeeProps>(({
  value,
  color = 'green',
  size = 'md',
  animated = false,
  showIcon = true,
  className,
  ...rest
}, ref) => {
  const classes = classNames(
    'zelda-rupee',
    `zelda-rupee--${color}`,
    `zelda-rupee--${size}`,
    {
      'zelda-rupee--animated': animated,
    },
    className
  );

  const formatNumber = (num: number): string => {
    if (num >= 10000) {
      return `${(num / 1000).toFixed(0)}k`;
    }
    return num.toLocaleString();
  };

  return (
    <div ref={ref} className={classes} {...rest}>
      {showIcon && (
        <div className="zelda-rupee__icon">
          <div className="zelda-rupee__gem">
            <div className="zelda-rupee__gem-inner" />
          </div>
        </div>
      )}
      <span className="zelda-rupee__value">{formatNumber(value)}</span>
    </div>
  );
});

Rupee.displayName = 'Rupee';

