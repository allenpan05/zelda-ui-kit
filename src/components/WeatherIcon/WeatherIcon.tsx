import React, { forwardRef } from 'react';
import classNames from 'classnames';
import './style.less';

export type WeatherType = 'sunny' | 'cloudy' | 'rainy' | 'stormy' | 'snowy' | 'foggy' | 'windy';
export type WeatherIconSize = 'sm' | 'md' | 'lg';

export interface WeatherIconProps extends React.HTMLAttributes<HTMLDivElement> {
  weather: WeatherType;
  size?: WeatherIconSize;
  animated?: boolean;
  showLabel?: boolean;
  temperature?: number;
}

const weatherIcons: Record<WeatherType, React.ReactNode> = {
  sunny: (
    <svg viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 7c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5zM2 13h2c.55 0 1-.45 1-1s-.45-1-1-1H2c-.55 0-1 .45-1 1s.45 1 1 1zm18 0h2c.55 0 1-.45 1-1s-.45-1-1-1h-2c-.55 0-1 .45-1 1s.45 1 1 1zM11 2v2c0 .55.45 1 1 1s1-.45 1-1V2c0-.55-.45-1-1-1s-1 .45-1 1zm0 18v2c0 .55.45 1 1 1s1-.45 1-1v-2c0-.55-.45-1-1-1s-1 .45-1 1zM5.99 4.58a.996.996 0 00-1.41 0 .996.996 0 000 1.41l1.06 1.06c.39.39 1.03.39 1.41 0s.39-1.03 0-1.41L5.99 4.58zm12.37 12.37a.996.996 0 00-1.41 0 .996.996 0 000 1.41l1.06 1.06c.39.39 1.03.39 1.41 0a.996.996 0 000-1.41l-1.06-1.06zm1.06-10.96a.996.996 0 000-1.41.996.996 0 00-1.41 0l-1.06 1.06c-.39.39-.39 1.03 0 1.41s1.03.39 1.41 0l1.06-1.06zM7.05 18.36a.996.996 0 000-1.41.996.996 0 00-1.41 0l-1.06 1.06c-.39.39-.39 1.03 0 1.41s1.03.39 1.41 0l1.06-1.06z" />
    </svg>
  ),
  cloudy: (
    <svg viewBox="0 0 24 24" fill="currentColor">
      <path d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96z" />
    </svg>
  ),
  rainy: (
    <svg viewBox="0 0 24 24" fill="currentColor">
      <path d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96zM17 13l-1.5 4.5H14l1.5-4.5H17zm-3 0l-1.5 4.5H9.5L11 13h3zm-5 0l-1.5 4.5H6L7.5 13H9z" />
    </svg>
  ),
  stormy: (
    <svg viewBox="0 0 24 24" fill="currentColor">
      <path d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96zM13 18h-2v-4l-3 6h2.5l1.5-3.5L14.5 20H17l-3-6v4zm-1-6l-1.5 4.5H9l1.5-4.5H12z" />
    </svg>
  ),
  snowy: (
    <svg viewBox="0 0 24 24" fill="currentColor">
      <path d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96zM17 13h-2v-2h2v2zm-4 0h-2v-2h2v2zm-4 0H7v-2h2v2zm8-3h-2V8h2v2zm-4 0h-2V8h2v2zm-4 0H7V8h2v2z" />
    </svg>
  ),
  foggy: (
    <svg viewBox="0 0 24 24" fill="currentColor">
      <path d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96zM19 16H5v-2h14v2zm0-4H5v-2h14v2z" />
    </svg>
  ),
  windy: (
    <svg viewBox="0 0 24 24" fill="currentColor">
      <path d="M14.5 17c0 1.65-1.35 3-3 3s-3-1.35-3-3h2c0 .55.45 1 1 1s1-.45 1-1-.45-1-1-1H2v-2h9.5c1.65 0 3 1.35 3 3zM19 6.5C19 4.57 17.43 3 15.5 3S12 4.57 12 6.5h2c0-.83.67-1.5 1.5-1.5s1.5.67 1.5 1.5S16.33 8 15.5 8H2v2h13.5c1.93 0 3.5-1.57 3.5-3.5zm-.5 4.5H2v2h16.5c.83 0 1.5.67 1.5 1.5s-.67 1.5-1.5 1.5S17 15.33 17 14.5h-2c0 1.93 1.57 3.5 3.5 3.5s3.5-1.57 3.5-3.5-1.57-3.5-3.5-3.5z" />
    </svg>
  ),
};

const weatherLabels: Record<WeatherType, string> = {
  sunny: 'Sunny',
  cloudy: 'Cloudy',
  rainy: 'Rainy',
  stormy: 'Stormy',
  snowy: 'Snowy',
  foggy: 'Foggy',
  windy: 'Windy',
};

export const WeatherIcon = forwardRef<HTMLDivElement, WeatherIconProps>(({
  weather,
  size = 'md',
  animated = true,
  showLabel = false,
  temperature,
  className,
  ...rest
}, ref) => {
  const classes = classNames(
    'zelda-weather',
    `zelda-weather--${size}`,
    `zelda-weather--${weather}`,
    {
      'zelda-weather--animated': animated,
    },
    className
  );

  return (
    <div ref={ref} className={classes} {...rest}>
      <div className="zelda-weather__icon">
        {weatherIcons[weather]}
      </div>
      {showLabel && (
        <span className="zelda-weather__label">{weatherLabels[weather]}</span>
      )}
      {temperature !== undefined && (
        <span className="zelda-weather__temp">{Math.round(temperature)}°C</span>
      )}
    </div>
  );
});

WeatherIcon.displayName = 'WeatherIcon';

export default WeatherIcon;
