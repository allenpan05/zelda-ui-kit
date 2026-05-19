import React, { forwardRef } from 'react';
import classNames from 'classnames';
import './style.less';

export type SelectionArrowsPosition = 'top' | 'bottom' | 'left' | 'right' | 'all';

export interface SelectionArrowsProps extends React.HTMLAttributes<HTMLDivElement> {
  position?: SelectionArrowsPosition;
  visible?: boolean;
  speed?: 'slow' | 'normal' | 'fast';
  color?: string;
}

export const SelectionArrows = forwardRef<HTMLDivElement, SelectionArrowsProps>(({
  position = 'all',
  visible = true,
  speed = 'normal',
  color,
  className,
  style,
  ...rest
}, ref) => {
  if (!visible) return null;

  const classes = classNames(
    'zelda-arrows',
    `zelda-arrows--${position}`,
    `zelda-arrows--${speed}`,
    className
  );

  const mergedStyle: React.CSSProperties = { ...style };
  if (color) {
    (mergedStyle as Record<string, unknown>)['--arrow-color'] = color;
  }

  const showArrow = (dir: string) =>
    position === 'all' || position === dir;

  return (
    <div ref={ref} className={classes} style={mergedStyle} {...rest}>
      {showArrow('top') && (
        <div className="zelda-arrows__arrow zelda-arrows__arrow--top">
          <div className="zelda-arrows__triangle" />
        </div>
      )}
      {showArrow('bottom') && (
        <div className="zelda-arrows__arrow zelda-arrows__arrow--bottom">
          <div className="zelda-arrows__triangle" />
        </div>
      )}
      {showArrow('left') && (
        <div className="zelda-arrows__arrow zelda-arrows__arrow--left">
          <div className="zelda-arrows__triangle" />
        </div>
      )}
      {showArrow('right') && (
        <div className="zelda-arrows__arrow zelda-arrows__arrow--right">
          <div className="zelda-arrows__triangle" />
        </div>
      )}
    </div>
  );
});

SelectionArrows.displayName = 'SelectionArrows';

