import React, { forwardRef } from 'react';
import classNames from 'classnames';
import './style.less';

export type CompassSize = 'sm' | 'md' | 'lg';

export interface CompassProps extends React.HTMLAttributes<HTMLDivElement> {
  heading: number;
  size?: CompassSize;
  showDirections?: boolean;
  showDegrees?: boolean;
  markers?: Array<{ angle: number; label: string; active?: boolean }>;
}

const directions = [
  { label: 'N', angle: 0 },
  { label: 'NE', angle: 45 },
  { label: 'E', angle: 90 },
  { label: 'SE', angle: 135 },
  { label: 'S', angle: 180 },
  { label: 'SW', angle: 225 },
  { label: 'W', angle: 270 },
  { label: 'NW', angle: 315 },
];

export const Compass = forwardRef<HTMLDivElement, CompassProps>(({
  heading,
  size = 'md',
  showDirections = true,
  showDegrees = false,
  markers = [],
  className,
  ...rest
}, ref) => {
  const classes = classNames(
    'zelda-compass',
    `zelda-compass--${size}`,
    className
  );

  const normalizedHeading = ((heading % 360) + 360) % 360;

  return (
    <div ref={ref} className={classes} {...rest}>
      <svg
        className="zelda-compass__svg"
        viewBox="0 0 120 120"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle
          className="zelda-compass__ring"
          cx="60"
          cy="60"
          r="56"
          fill="none"
        />
        <circle
          className="zelda-compass__inner"
          cx="60"
          cy="60"
          r="48"
          fill="none"
        />
        <g
          className="zelda-compass__face"
          transform={`rotate(${-normalizedHeading} 60 60)`}
        >
          {directions.map(({ label, angle }) => {
            const isPrimary = ['N', 'S', 'E', 'W'].includes(label);
            const radians = (angle * Math.PI) / 180;
            const tickStart = isPrimary ? 42 : 45;
            const tickEnd = 48;
            const labelRadius = 36;

            return (
              <g key={label}>
                <line
                  className={classNames('zelda-compass__tick', {
                    'zelda-compass__tick--primary': isPrimary,
                  })}
                  x1={60 + tickStart * Math.sin(radians)}
                  y1={60 - tickStart * Math.cos(radians)}
                  x2={60 + tickEnd * Math.sin(radians)}
                  y2={60 - tickEnd * Math.cos(radians)}
                />
                {showDirections && isPrimary && (
                  <text
                    className={classNames('zelda-compass__label', {
                      'zelda-compass__label--north': label === 'N',
                    })}
                    x={60 + labelRadius * Math.sin(radians)}
                    y={60 - labelRadius * Math.cos(radians)}
                    textAnchor="middle"
                    dominantBaseline="central"
                  >
                    {label}
                  </text>
                )}
              </g>
            );
          })}
          {markers.map(({ angle, label, active }) => {
            const radians = (angle * Math.PI) / 180;
            const markerRadius = 52;
            return (
              <g key={`marker-${label}`}>
                <circle
                  className={classNames('zelda-compass__marker', {
                    'zelda-compass__marker--active': active,
                  })}
                  cx={60 + markerRadius * Math.sin(radians)}
                  cy={60 - markerRadius * Math.cos(radians)}
                  r={3}
                />
                <text
                  className="zelda-compass__marker-label"
                  x={60 + (markerRadius - 8) * Math.sin(radians)}
                  y={60 - (markerRadius - 8) * Math.cos(radians)}
                  textAnchor="middle"
                  dominantBaseline="central"
                >
                  {label}
                </text>
              </g>
            );
          })}
        </g>
        <polygon
          className="zelda-compass__needle"
          points="60,16 56,60 64,60"
        />
        <circle
          className="zelda-compass__center"
          cx="60"
          cy="60"
          r="4"
        />
      </svg>
      {showDegrees && (
        <span className="zelda-compass__degrees">{Math.round(normalizedHeading)}°</span>
      )}
    </div>
  );
});

Compass.displayName = 'Compass';

export default Compass;
