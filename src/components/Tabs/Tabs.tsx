import React, { forwardRef, useCallback } from 'react';
import styles from './tabs.module.less';

export interface TabItem {
    key: string;
    label: React.ReactNode;
    children?: React.ReactNode;
    disabled?: boolean;
}

export interface TabsProps {
    items: TabItem[];
    activeKey?: string;
    defaultActiveKey?: string;
    onChange?: (key: string) => void;
    className?: string;
}

export const Tabs = forwardRef<HTMLDivElement, TabsProps>(
    ({ items, activeKey: controlledKey, defaultActiveKey, onChange, className }, ref) => {
        const [internalKey, setInternalKey] = React.useState(defaultActiveKey ?? items[0]?.key);
        const activeKey = controlledKey !== undefined ? controlledKey : internalKey;
        const activeItem = items.find((i) => i.key === activeKey);

        const handleChange = (key: string) => {
            if (controlledKey === undefined) setInternalKey(key);
            onChange?.(key);
        };

        const handleKeyDown = useCallback(
            (e: React.KeyboardEvent) => {
                const enabledItems = items.filter((i) => !i.disabled);
                const currentIdx = enabledItems.findIndex((i) => i.key === activeKey);
                let nextIdx = currentIdx;

                if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
                    e.preventDefault();
                    nextIdx = (currentIdx + 1) % enabledItems.length;
                } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
                    e.preventDefault();
                    nextIdx = (currentIdx - 1 + enabledItems.length) % enabledItems.length;
                } else if (e.key === 'Home') {
                    e.preventDefault();
                    nextIdx = 0;
                } else if (e.key === 'End') {
                    e.preventDefault();
                    nextIdx = enabledItems.length - 1;
                } else {
                    return;
                }

                const nextKey = enabledItems[nextIdx].key;
                if (controlledKey === undefined) setInternalKey(nextKey);
                onChange?.(nextKey);
            },
            [items, activeKey, controlledKey, onChange],
        );

        const activeId = `tab-panel-${activeKey}`;

        return (
            <div ref={ref} className={[styles.tabs, className].filter(Boolean).join(' ')}>
                <div className={styles.nav} role="tablist" onKeyDown={handleKeyDown}>
                    {items.map((item) => {
                        const isActive = item.key === activeKey;
                        return (
                            <button
                                key={item.key}
                                role="tab"
                                id={`tab-${item.key}`}
                                aria-selected={isActive}
                                aria-controls={isActive ? activeId : undefined}
                                tabIndex={isActive ? 0 : -1}
                                className={[
                                    styles.tab,
                                    isActive && styles['tab-active'],
                                    item.disabled && styles['tab-disabled'],
                                ]
                                    .filter(Boolean)
                                    .join(' ')}
                                onClick={() => !item.disabled && handleChange(item.key)}
                                disabled={item.disabled}
                            >
                                {item.label}
                                {isActive && <span className={styles.indicator} />}
                            </button>
                        );
                    })}
                </div>
                {activeItem?.children && (
                    <div
                        className={styles.content}
                        key={activeKey}
                        id={activeId}
                        role="tabpanel"
                        aria-labelledby={`tab-${activeKey}`}
                        tabIndex={0}
                    >
                        {activeItem.children}
                    </div>
                )}
            </div>
        );
    },
);

Tabs.displayName = 'Tabs';
