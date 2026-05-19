import React, { forwardRef } from 'react';
import classNames from 'classnames';
import './style.less';

export type RuneCooldownSize = 'sm' | 'md' | 'lg';
export type RuneType = 'magnesis' | 'stasis' | 'cryonis' | 'bombs' | 'camera';

export interface RuneCooldownProps extends React.HTMLAttributes<HTMLDivElement> {
  rune: RuneType;
  cooldown: number;
  maxCooldown?: number;
  size?: RuneCooldownSize;
  showLabel?: boolean;
  ready?: boolean;
  icon?: React.ReactNode;
}

const runeIcons: Record<RuneType, React.ReactNode> = {
  magnesis: (
    <svg viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" />
    </svg>
  ),
  stasis: (
    <svg viewBox="0 0 24 24" fill="currentColor">
      <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z" />
    </svg>
  ),
  cryonis: (
    <svg viewBox="0 0 24 24" fill="currentColor">
      <path d="M22 11h-4.17l2.54-2.54-1.42-1.42L15 11h-2V9l3.96-3.96-1.42-1.42L13 6.17V2h-2v4.17L8.46 3.63 7.04 5.04 11 9v2H9L5.04 7.04 3.63 8.46 6.17 11H2v2h4.17l-2.54 2.54 1.42 1.42L9 13h2v2l-3.96 3.96 1.42 1.42L11 17.83V22h2v-4.17l2.54 2.54 1.42-1.42L13 15v-2h2l3.96 3.96 1.42-1.42L17.83 13H22v-2z" />
    </svg>
  ),
  bombs: (
    <svg viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
    </svg>
  ),
  camera: (
    <svg viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
    </svg>
  ),
};

const runeLabels: Record<RuneType, string> = {
  magnesis: 'Magnesis',
  stasis: 'Stasis',
  cryonis: 'Cryonis',
  bombs: 'Bombs',
  camera: 'Camera',
};

export const RuneCooldown = forwardRef<HTMLDivElement, RuneCooldownProps>(({
  rune,
  cooldown,
  maxCooldown = 100,
  size = 'md',
  showLabel = false,
  ready = false,
  icon,
  className,
  ...rest
}, ref) => {
  const percentage = Math.min(100, Math.max(0, (cooldown / maxCooldown) * 100));
  const isReady = ready || percentage >= 100;

  const classes = classNames(
    'zelda-rune',
    `zelda-rune--${size}`,
    `zelda-rune--${rune}`,
    {
      'zelda-rune--ready': isReady,
      'zelda-rune--cooldown': !isReady,
    },
    className
  );

  const svgSize = 48;
  const strokeWidth = 4;
  const radius = (svgSize - strokeWidth * 2) / 2;
  const circumference = 2 * Math.PI * radius;
  const dashOffset = circumference * (1 - percentage / 100);

  return (
    <div ref={ref} className={classes} {...rest}>
      <div className="zelda-rune__circle">
        <svg
          className="zelda-rune__svg"
          viewBox={`0 0 ${svgSize} ${svgSize}`}
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle
            className="zelda-rune__bg"
            cx={svgSize / 2}
            cy={svgSize / 2}
            r={radius}
            fill="none"
            strokeWidth={strokeWidth}
          />
          {!isReady && (
            <circle
              className="zelda-rune__fill"
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
          )}
        </svg>
        <div className="zelda-rune__icon">
          {icon || runeIcons[rune]}
        </div>
        {isReady && (
          <div className="zelda-rune__ready-indicator">
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
            </svg>
          </div>
        )}
      </div>
      {showLabel && (
        <span className="zelda-rune__label">{runeLabels[rune]}</span>
      )}
    </div>
  );
});

RuneCooldown.displayName = 'RuneCooldown';

export default RuneCooldown;
