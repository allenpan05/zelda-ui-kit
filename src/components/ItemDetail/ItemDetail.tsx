import React, { forwardRef } from 'react';
import classNames from 'classnames';
import './style.less';

export type ItemDetailRarity = 'common' | 'uncommon' | 'rare' | 'legendary';

export interface ItemDetailProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
  name: string;
  description?: string;
  icon?: React.ReactNode;
  rarity?: ItemDetailRarity;
  stats?: Array<{ label: string; value: string | number; icon?: React.ReactNode }>;
  effect?: string;
  sellPrice?: number;
  buyPrice?: number;
  count?: number;
  closable?: boolean;
  onClose?: () => void;
}

const rarityColors: Record<ItemDetailRarity, string> = {
  common: '#B2BEC3',
  uncommon: '#2ED573',
  rare: '#1E90FF',
  legendary: '#FFD700',
};

export const ItemDetail = forwardRef<HTMLDivElement, ItemDetailProps>(({
  name,
  description,
  icon,
  rarity = 'common',
  stats = [],
  effect,
  sellPrice,
  buyPrice,
  count,
  closable = false,
  onClose,
  className,
  ...rest
}, ref) => {
  const classes = classNames(
    'zelda-item-detail',
    `zelda-item-detail--${rarity}`,
    className
  );

  return (
    <div ref={ref} className={classes} {...rest}>
      <div className="zelda-item-detail__header">
        <div className="zelda-item-detail__icon-wrapper">
          {icon ? (
            <div className="zelda-item-detail__icon">{icon}</div>
          ) : (
            <div className="zelda-item-detail__icon-placeholder" />
          )}
          {count !== undefined && count > 1 && (
            <span className="zelda-item-detail__count">x{count}</span>
          )}
        </div>
        <div className="zelda-item-detail__title-area">
          <h3 className="zelda-item-detail__name">{name}</h3>
          <span
            className="zelda-item-detail__rarity"
            style={{ color: rarityColors[rarity] }}
          >
            {rarity.charAt(0).toUpperCase() + rarity.slice(1)}
          </span>
        </div>
        {closable && (
          <button
            className="zelda-item-detail__close"
            onClick={onClose}
            aria-label="Close"
          >
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
            </svg>
          </button>
        )}
      </div>

      {description && (
        <p className="zelda-item-detail__desc">{description}</p>
      )}

      {stats.length > 0 && (
        <div className="zelda-item-detail__stats">
          {stats.map((stat, index) => (
            <div key={index} className="zelda-item-detail__stat">
              {stat.icon && (
                <span className="zelda-item-detail__stat-icon">{stat.icon}</span>
              )}
              <span className="zelda-item-detail__stat-label">{stat.label}</span>
              <span className="zelda-item-detail__stat-value">{stat.value}</span>
            </div>
          ))}
        </div>
      )}

      {effect && (
        <div className="zelda-item-detail__effect">
          <span className="zelda-item-detail__effect-label">Effect:</span>
          <span className="zelda-item-detail__effect-text">{effect}</span>
        </div>
      )}

      {(sellPrice !== undefined || buyPrice !== undefined) && (
        <div className="zelda-item-detail__prices">
          {buyPrice !== undefined && (
            <div className="zelda-item-detail__price">
              <span className="zelda-item-detail__price-label">Buy</span>
              <span className="zelda-item-detail__price-value">{buyPrice}</span>
            </div>
          )}
          {sellPrice !== undefined && (
            <div className="zelda-item-detail__price">
              <span className="zelda-item-detail__price-label">Sell</span>
              <span className="zelda-item-detail__price-value">{sellPrice}</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
});

ItemDetail.displayName = 'ItemDetail';

export default ItemDetail;
