import React, { forwardRef } from 'react';
import classNames from 'classnames';
import './style.less';

export type MapMarkerType = 'tower' | 'shrine' | 'stable' | 'village' | 'custom';

export interface MapMarkerProps extends React.HTMLAttributes<HTMLDivElement> {
  type?: MapMarkerType;
  label?: string;
  active?: boolean;
  discovered?: boolean;
  icon?: React.ReactNode;
  onClick?: () => void;
}

const markerIcons: Record<MapMarkerType, React.ReactNode> = {
  tower: (
    <svg viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2L8 6v6l-2 2v6h8v-6l-2-2V6l-4-4zm0 2.5L14 7v5l-2 2V4.5zM10 7v5l-2 2V7h2z" />
    </svg>
  ),
  shrine: (
    <svg viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z" />
    </svg>
  ),
  stable: (
    <svg viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 3L2 12h3v8h14v-8h3L12 3zm0 2.5L18 12h-1v8h-4v-6H9v6H5v-8h-1l6-6.5z" />
    </svg>
  ),
  village: (
    <svg viewBox="0 0 24 24" fill="currentColor">
      <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8h5z" />
    </svg>
  ),
  custom: (
    <svg viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
    </svg>
  ),
};

export const MapMarker = forwardRef<HTMLDivElement, MapMarkerProps>(({
  type = 'custom',
  label,
  active = false,
  discovered = true,
  icon,
  onClick,
  className,
  ...rest
}, ref) => {
  const classes = classNames(
    'zelda-map-marker',
    `zelda-map-marker--${type}`,
    {
      'zelda-map-marker--active': active,
      'zelda-map-marker--discovered': discovered,
      'zelda-map-marker--undiscovered': !discovered,
    },
    className
  );

  return (
    <div
      ref={ref}
      className={classes}
      onClick={onClick}
      role="button"
      tabIndex={0}
      aria-label={label || type}
      {...rest}
    >
      <div className="zelda-map-marker__icon">
        {icon || markerIcons[type]}
      </div>
      {label && <div className="zelda-map-marker__label">{label}</div>}
      {active && <div className="zelda-map-marker__pulse" />}
    </div>
  );
});

MapMarker.displayName = 'MapMarker';

