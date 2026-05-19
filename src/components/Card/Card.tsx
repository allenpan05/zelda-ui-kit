import React, { forwardRef } from 'react';
import classNames from 'classnames';
import './style.less';

export type CardVariant = 'default' | 'elevated' | 'outlined' | 'sheikah';
export type CardPadding = 'none' | 'sm' | 'md' | 'lg';

export interface CardProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
  variant?: CardVariant;
  padding?: CardPadding;
  hoverable?: boolean;
  title?: React.ReactNode;
  subtitle?: React.ReactNode;
  extra?: React.ReactNode;
  cover?: React.ReactNode;
  footer?: React.ReactNode;
  children?: React.ReactNode;
}

export const Card = forwardRef<HTMLDivElement, CardProps>(({
  variant = 'default',
  padding = 'md',
  hoverable = false,
  title,
  subtitle,
  extra,
  cover,
  footer,
  children,
  className,
  ...rest
}, ref) => {
  const classes = classNames(
    'zelda-card',
    `zelda-card--${variant}`,
    `zelda-card--padding-${padding}`,
    {
      'zelda-card--hoverable': hoverable,
    },
    className
  );

  return (
    <div ref={ref} className={classes} {...rest}>
      {cover && <div className="zelda-card__cover">{cover}</div>}
      <div className="zelda-card__body">
        {(title || extra) && (
          <div className="zelda-card__header">
            <div className="zelda-card__header-text">
              {title && <div className="zelda-card__title">{title}</div>}
              {subtitle && <div className="zelda-card__subtitle">{subtitle}</div>}
            </div>
            {extra && <div className="zelda-card__extra">{extra}</div>}
          </div>
        )}
        {children && <div className="zelda-card__content">{children}</div>}
      </div>
      {footer && <div className="zelda-card__footer">{footer}</div>}
    </div>
  );
});

Card.displayName = 'Card';

