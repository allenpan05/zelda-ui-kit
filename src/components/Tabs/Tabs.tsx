import React, { useState } from 'react';
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

export const Tabs: React.FC<TabsProps> = ({
    items,
    activeKey: controlledKey,
    defaultActiveKey,
    onChange,
    className,
}) => {
    const [internalKey, setInternalKey] = useState(defaultActiveKey ?? items[0]?.key);
    const activeKey = controlledKey !== undefined ? controlledKey : internalKey;
    const activeItem = items.find((i) => i.key === activeKey);

    const handleChange = (key: string) => {
        if (controlledKey === undefined) setInternalKey(key);
        onChange?.(key);
    };

    return (
        <div className={[styles.tabs, className].filter(Boolean).join(' ')}>
            <div className={styles.nav}>
                {items.map((item) => (
                    <button
                        key={item.key}
                        className={[
                            styles.tab,
                            item.key === activeKey && styles['tab-active'],
                            item.disabled && styles['tab-disabled'],
                        ]
                            .filter(Boolean)
                            .join(' ')}
                        onClick={() => !item.disabled && handleChange(item.key)}
                        disabled={item.disabled}
                    >
                        {item.label}
                        {item.key === activeKey && <span className={styles.indicator} />}
                    </button>
                ))}
            </div>
            {activeItem?.children && (
                <div className={styles.content} key={activeKey}>
                    {activeItem.children}
                </div>
            )}
        </div>
    );
};

Tabs.displayName = 'Tabs';
