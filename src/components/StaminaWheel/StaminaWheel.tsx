import React, { forwardRef } from 'react';
import classNames from 'classnames';
import './style.less';

export type StaminaWheelSize = 'sm' | 'md' | 'lg';

export interface StaminaWheelProps extends React.HTMLAttributes<HTMLDivElement> {
  value: number;
  max?: number;
  size?: StaminaWheelSize;
  showValue?: boolean;
  lowWarning?: boolean;
  strokeWidth?: number;
}

export const StaminaWheel = forwardRef<HTMLDivElement, StaminaWheelProps>(({
  value,
  max = 100,
  size = 'md',
  showValue = false,
  lowWarning = true,
  strokeWidth = 6,
  className,
  ...rest
}, ref) => {
  const percentage = Math.min(100, Math.max(0, (value / max) * 100));
  const isLow = percentage <= 25 && percentage > 0;

  const classes = classNames(
    'zelda-stamina',
    `zelda-stamina--${size}`,
    {
      'zelda-stamina--low': isLow && lowWarning,
      'zelda-stamina--empty': percentage <= 0,
    },
    className
  );

  const svgSize = 48;
  const radius = (svgSize - strokeWidth * 2) / 2;
  const circumference = 2 * Math.PI * radius;
  const dashOffset = circumference * (1 - percentage / 100);

  return (
    <div ref={ref} className={classes} {...rest}>
      <svg
        className="zelda-stamina__svg"
        viewBox={`0 0 ${svgSize} ${svgSize}`}
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle
          className="zelda-stamina__bg"
          cx={svgSize / 2}
          cy={svgSize / 2}
          r={radius}
          fill="none"
          strokeWidth={strokeWidth}
        />
        <circle
          className="zelda-stamina__fill"
          cx={svgSize / 2}
          cy={svgSize / 2}
          r={radius}
          fill="none"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={dashOffset}
          transform={`rotate(-90 ${svgSize / 2} ${svgSize / 2})`}
        />
      </svg>
      {showValue && (
        <span className="zelda-stamina__value">{Math.round(percentage)}%</span>
      )}
    </div>
  );
});

StaminaWheel.displayName = 'StaminaWheel';

