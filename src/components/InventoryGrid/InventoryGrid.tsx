import React, { useCallback, useMemo, forwardRef } from 'react';
import classNames from 'classnames';
import './style.less';

export interface InventoryItem {
  id: string;
  icon: React.ReactNode;
  name: string;
  count?: number;
  isNew?: boolean;
  durability?: number;
  type?: string;
}

export interface InventoryGridProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onSelect'> {
  items: InventoryItem[];
  columns?: number;
  totalSlots?: number;
  selectedId?: string | null;
  onSelect?: (item: InventoryItem | null) => void;
  showEmpty?: boolean;
  cellSize?: 'sm' | 'md' | 'lg';
}

export const InventoryGrid = forwardRef<HTMLDivElement, InventoryGridProps>(({
  items,
  columns = 5,
  totalSlots = 20,
  selectedId,
  onSelect,
  showEmpty = true,
  cellSize = 'md',
  className,
  ...rest
}, ref) => {
  const slots = useMemo(
    () => Array.from({ length: totalSlots }, (_, i) => items[i] || null),
    [items, totalSlots],
  );

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLDivElement>) => {
      const target = e.target as HTMLElement;
      const cellEls = Array.from(
        (e.currentTarget as HTMLElement).querySelectorAll<HTMLElement>('[role="gridcell"]'),
      );
      const currentIdx = cellEls.indexOf(target);
      if (currentIdx === -1) return;

      let nextIdx = currentIdx;
      if (e.key === 'ArrowRight') {
        e.preventDefault();
        nextIdx = Math.min(currentIdx + 1, cellEls.length - 1);
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        nextIdx = Math.max(currentIdx - 1, 0);
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        nextIdx = Math.min(currentIdx + columns, cellEls.length - 1);
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        nextIdx = Math.max(currentIdx - columns, 0);
      } else if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        onSelect?.(slots[currentIdx] ?? null);
        return;
      } else {
        return;
      }

      cellEls[nextIdx].focus();
    },
    [columns, slots, onSelect],
  );

  return (
    <div
      ref={ref}
      className={classNames('zelda-inventory', `zelda-inventory--${cellSize}`, className)}
      style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}
      role="grid"
      onKeyDown={handleKeyDown}
      {...rest}
    >
      {slots.map((item, index) => {
        const isSelected = item && item.id === selectedId;
        
        return (
          <div
            key={item?.id || `empty-${index}`}
            className={classNames('zelda-inventory__cell', {
              'zelda-inventory__cell--empty': !item,
              'zelda-inventory__cell--selected': isSelected,
              'zelda-inventory__cell--new': item?.isNew,
            })}
            onClick={() => onSelect?.(item)}
            role="gridcell"
            tabIndex={isSelected ? 0 : index === 0 ? 0 : -1}
            aria-label={item?.name || 'Empty slot'}
            aria-selected={isSelected || undefined}
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
});

InventoryGrid.displayName = 'InventoryGrid';

export default InventoryGrid;
