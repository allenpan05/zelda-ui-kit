import React from 'react';
import classNames from 'classnames';
import './style.less';

export type CardVariant = 'default' | 'elevated' | 'outlined' | 'sheikah';
export type CardPadding = 'none' | 'sm' | 'md' | 'lg';

export interface CardProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
  /** 卡片變體 */
  variant?: CardVariant;
  /** 內邊距 */
  padding?: CardPadding;
  /** 是否可懸停 */
  hoverable?: boolean;
  /** 標題 */
  title?: React.ReactNode;
  /** 副標題 */
  subtitle?: React.ReactNode;
  /** 額外操作 */
  extra?: React.ReactNode;
  /** 封面圖 */
  cover?: React.ReactNode;
  /** 底部操作 */
  footer?: React.ReactNode;
  /** 子元素 */
  children?: React.ReactNode;
}

const Card: React.FC<CardProps> = ({
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
}) => {
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
    <div className={classes} {...rest}>
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
};

Card.displayName = 'Card';

export default Card;
