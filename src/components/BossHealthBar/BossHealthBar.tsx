import React, { forwardRef } from 'react';
import classNames from 'classnames';
import './style.less';

export type BossHealthBarSize = 'sm' | 'md' | 'lg';

export interface BossHealthBarProps extends React.HTMLAttributes<HTMLDivElement> {
  name: string;
  value: number;
  max?: number;
  segments?: number;
  size?: BossHealthBarSize;
  showIcon?: boolean;
  icon?: React.ReactNode;
  phase?: number;
  staggered?: boolean;
}

export const BossHealthBar = forwardRef<HTMLDivElement, BossHealthBarProps>(({
  name,
  value,
  max = 100,
  segments = 5,
  size = 'md',
  showIcon = true,
  icon,
  phase,
  staggered = false,
  className,
  ...rest
}, ref) => {
  const percentage = Math.min(100, Math.max(0, (value / max) * 100));
  const segmentWidth = 100 / segments;
  const filledSegments = Math.ceil(percentage / segmentWidth);

  const classes = classNames(
    'zelda-boss-health',
    `zelda-boss-health--${size}`,
    {
      'zelda-boss-health--staggered': staggered,
      'zelda-boss-health--low': percentage <= 25,
    },
    className
  );

  return (
    <div ref={ref} className={classes} {...rest}>
      <div className="zelda-boss-health__header">
        {showIcon && (
          <div className="zelda-boss-health__icon">
            {icon || (
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
              </svg>
            )}
          </div>
        )}
        <div className="zelda-boss-health__title">
          <h3 className="zelda-boss-health__name">{name}</h3>
          {phase !== undefined && (
            <span className="zelda-boss-health__phase">Phase {phase}</span>
          )}
        </div>
        <span className="zelda-boss-health__value">
          {Math.round(value)}/{max}
        </span>
      </div>

      <div className="zelda-boss-health__bar">
        {Array.from({ length: segments }, (_, i) => {
          const segmentStart = i * segmentWidth;
          const segmentEnd = (i + 1) * segmentWidth;
          const isFilled = i < filledSegments;
          const isCurrent = i === filledSegments - 1;

          let fillPercent = 0;
          if (isFilled) {
            if (isCurrent) {
              fillPercent = ((percentage - segmentStart) / segmentWidth) * 100;
            } else {
              fillPercent = 100;
            }
          }

          return (
            <div
              key={i}
              className={classNames('zelda-boss-health__segment', {
                'zelda-boss-health__segment--filled': isFilled,
                'zelda-boss-health__segment--current': isCurrent,
              })}
            >
              <div
                className="zelda-boss-health__segment-fill"
                style={{ width: `${fillPercent}%` }}
              />
              {i < segments - 1 && (
                <div className="zelda-boss-health__segment-divider" />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
});

BossHealthBar.displayName = 'BossHealthBar';

export default BossHealthBar;
