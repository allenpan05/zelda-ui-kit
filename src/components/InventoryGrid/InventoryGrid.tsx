import React from 'react';
import classNames from 'classnames';
import './style.less';

export interface InventoryItem {
  /** 唯一標識 */
  id: string;
  /** 圖標 */
  icon: React.ReactNode;
  /** 名稱 */
  name: string;
  /** 數量 */
  count?: number;
  /** 是否新物品 */
  isNew?: boolean;
  /** 耐久度 (0-100) */
  durability?: number;
  /** 類型 */
  type?: string;
}

export interface InventoryGridProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onSelect'> {
  /** 物品列表 */
  items: InventoryItem[];
  /** 列數 */
  columns?: number;
  /** 總格數 */
  totalSlots?: number;
  /** 選中的物品 ID */
  selectedId?: string | null;
  /** 選中回調 */
  onSelect?: (item: InventoryItem | null) => void;
  /** 是否顯示空格 */
  showEmpty?: boolean;
  /** 格子尺寸 */
  cellSize?: 'sm' | 'md' | 'lg';
}

const InventoryGrid: React.FC<InventoryGridProps> = ({
  items,
  columns = 5,
  totalSlots = 20,
  selectedId,
  onSelect,
  showEmpty = true,
  cellSize = 'md',
  className,
  ...rest
}) => {
  // 填充空格
  const slots = Array.from({ length: totalSlots }, (_, index) => {
    return items[index] || null;
  });

  const handleSelect = (item: InventoryItem | null, index: number) => {
    if (onSelect) {
      onSelect(item);
    }
  };

  const classes = classNames(
    'zelda-inventory',
    `zelda-inventory--${cellSize}`,
    className
  );

  return (
    <div
      className={classes}
      style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}
      {...rest}
    >
      {slots.map((item, index) => {
        const isSelected = item && item.id === selectedId;
        
        return (
          <div
            key={item?.id || `empty-${index}`}
            className={classNames(
              'zelda-inventory__cell',
              {
                'zelda-inventory__cell--empty': !item,
                'zelda-inventory__cell--selected': isSelected,
                'zelda-inventory__cell--new': item?.isNew,
              }
            )}
            onClick={() => handleSelect(item, index)}
            role="button"
            tabIndex={0}
            aria-label={item?.name || 'Empty slot'}
          >
            {item ? (
              <>
                <div className="zelda-inventory__icon">{item.icon}</div>
                {item.count !== undefined && item.count > 1 && (
                  <span className="zelda-inventory__count">{item.count}</span>
                )}
                {item.durability !== undefined && (
                  <div className="zelda-inventory__durability">
                    <div
                      className="zelda-inventory__durability-bar"
                      style={{
                        width: `${item.durability}%`,
                        backgroundColor: item.durability > 50 ? '#2ED573' : item.durability > 25 ? '#FFA502' : '#FF4757',
                      }}
                    />
                  </div>
                )}
                {isSelected && (
                  <div className="zelda-inventory__selection">
                    <div className="zelda-inventory__arrow zelda-inventory__arrow--top" />
                    <div className="zelda-inventory__arrow zelda-inventory__arrow--bottom" />
                  </div>
                )}
              </>
            ) : (
              showEmpty && <div className="zelda-inventory__empty-icon" />
            )}
          </div>
        );
      })}
    </div>
  );
};

InventoryGrid.displayName = 'InventoryGrid';

export default InventoryGrid;
