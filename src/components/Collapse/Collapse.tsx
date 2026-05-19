import React, { useState } from 'react';
import styles from './collapse.module.less';

export interface CollapseItem {
    key: string;
    title: React.ReactNode;
    children: React.ReactNode;
    disabled?: boolean;
}

export interface CollapseProps {
    items: CollapseItem[];
    activeKeys?: string[];
    defaultActiveKeys?: string[];
    accordion?: boolean;
    onChange?: (keys: string[]) => void;
    className?: string;
}

export const Collapse: React.FC<CollapseProps> = ({
    items,
    activeKeys: controlledKeys,
    defaultActiveKeys = [],
    accordion = false,
    onChange,
    className,
}) => {
    const [internalKeys, setInternalKeys] = useState<string[]>(defaultActiveKeys);
    const activeKeys = controlledKeys !== undefined ? controlledKeys : internalKeys;

    const toggle = (key: string) => {
        let next: string[];
        if (activeKeys.includes(key)) {
            next = activeKeys.filter((k) => k !== key);
        } else {
            next = accordion ? [key] : [...activeKeys, key];
        }
        if (controlledKeys === undefined) setInternalKeys(next);
        onChange?.(next);
    };

    return (
        <div className={[styles.collapse, className].filter(Boolean).join(' ')}>
            {items.map((item) => {
                const isActive = activeKeys.includes(item.key);
                return (
                    <div
                        key={item.key}
                        className={[
                            styles.item,
                            isActive && styles['item-active'],
                            item.disabled && styles['item-disabled'],
                        ]
                            .filter(Boolean)
                            .join(' ')}
                    >
                        <button
                            className={styles.header}
                            onClick={() => !item.disabled && toggle(item.key)}
                            disabled={item.disabled}
                        >
                            <span className={styles.title}>{item.title}</span>
                            <span className={`${styles.arrow} ${isActive ? styles['arrow-up'] : ''}`}>
                                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                                    <path d="M3 4.5L6 7.5L9 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                            </span>
                        </button>
                        {isActive && (
                            <div className={styles.body}>
                                {item.children}
                            </div>
                        )}
                    </div>
                );
            })}
        </div>
    );
};

Collapse.displayName = 'Collapse';
