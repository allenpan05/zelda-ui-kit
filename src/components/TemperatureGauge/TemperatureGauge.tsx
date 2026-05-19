import React, { forwardRef } from 'react';
import classNames from 'classnames';
import './style.less';

export type TemperatureGaugeSize = 'sm' | 'md' | 'lg';
export type TemperatureUnit = 'celsius' | 'fahrenheit';

export interface TemperatureGaugeProps extends React.HTMLAttributes<HTMLDivElement> {
  value: number;
  min?: number;
  max?: number;
  unit?: TemperatureUnit;
  size?: TemperatureGaugeSize;
  showIcon?: boolean;
  showValue?: boolean;
  dangerLow?: number;
  dangerHigh?: number;
}

export const TemperatureGauge = forwardRef<HTMLDivElement, TemperatureGaugeProps>(({
  value,
  min = -40,
  max = 60,
  unit = 'celsius',
  size = 'md',
  showIcon = true,
  showValue = true,
  dangerLow = -10,
  dangerHigh = 40,
  className,
  ...rest
}, ref) => {
  const percentage = Math.min(100, Math.max(0, ((value - min) / (max - min)) * 100));
  const isCold = value <= dangerLow;
  const isHot = value >= dangerHigh;
  const isComfortable = !isCold && !isHot;

  const classes = classNames(
    'zelda-temp',
    `zelda-temp--${size}`,
    {
      'zelda-temp--cold': isCold,
      'zelda-temp--hot': isHot,
      'zelda-temp--comfortable': isComfortable,
    },
    className
  );

  const displayValue = unit === 'fahrenheit'
    ? Math.round((value * 9) / 5 + 32)
    : Math.round(value);

  const unitSymbol = unit === 'fahrenheit' ? '°F' : '°C';

  return (
    <div ref={ref} className={classes} {...rest}>
      {showIcon && (
        <div className="zelda-temp__icon">
          <svg viewBox="0 0 24 24" fill="currentColor">
            {isCold ? (
              <path d="M22 11h-4.17l2.54-2.54-1.42-1.42L15 11h-2V9l3.96-3.96-1.42-1.42L13 6.17V2h-2v4.17L8.46 3.63 7.04 5.04 11 9v2H9L5.04 7.04 3.63 8.46 6.17 11H2v2h4.17l-2.54 2.54 1.42 1.42L9 13h2v2l-3.96 3.96 1.42 1.42L11 17.83V22h2v-4.17l2.54 2.54 1.42-1.42L13 15v-2h2l3.96 3.96 1.42-1.42L17.83 13H22v-2z" />
            ) : isHot ? (
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
            ) : (
              <path d="M15 13V5c0-1.66-1.34-3-3-3S9 3.34 9 5v8c-1.21.91-2 2.37-2 4 0 2.76 2.24 5 5 5s5-2.24 5-5c0-1.63-.79-3.09-2-4zm-4-8c0-.55.45-1 1-1s1 .45 1 1h-1v1h1v2h-1v1h1v2h-2V5z" />
            )}
          </svg>
        </div>
      )}
      <div className="zelda-temp__bar">
        <div className="zelda-temp__track">
          <div
            className="zelda-temp__fill"
            style={{ width: `${percentage}%` }}
          />
          <div
            className="zelda-temp__marker"
            style={{ left: `${((dangerLow - min) / (max - min)) * 100}%` }}
          />
          <div
            className="zelda-temp__marker"
            style={{ left: `${((dangerHigh - min) / (max - min)) * 100}%` }}
          />
        </div>
      </div>
      {showValue && (
        <span className="zelda-temp__value">
          {displayValue}{unitSymbol}
        </span>
      )}
    </div>
  );
});

TemperatureGauge.displayName = 'TemperatureGauge';

export default TemperatureGauge;
