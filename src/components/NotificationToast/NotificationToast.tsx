import React, { useState, useEffect, useCallback, useRef } from 'react';
import classNames from 'classnames';
import './style.less';

export type NotificationToastType = 'item' | 'quest' | 'info' | 'success' | 'warning';

export interface NotificationToastProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
  /** 通知類型 */
  type?: NotificationToastType;
  /** 標題 */
  title: string;
  /** 描述 */
  description?: string;
  /** 圖標 */
  icon?: React.ReactNode;
  /** 是否可見 */
  visible?: boolean;
  /** 自動關閉時間 (ms)，0 = 不自動關閉 */
  duration?: number;
  /** 關閉回調 */
  onClose?: () => void;
  /** 關閉動畫完成回調 */
  afterClose?: () => void;
}

const defaultIcons: Record<NotificationToastType, React.ReactNode> = {
  item: (
    <svg viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
      <path d="M20 2H4c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-2 14H6v-2h12v2zm0-4H6v-2h12v2zm0-4H6V6h12v2z" />
    </svg>
  ),
  quest: (
    <svg viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
    </svg>
  ),
  info: (
    <svg viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z" />
    </svg>
  ),
  success: (
    <svg viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
      <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
    </svg>
  ),
  warning: (
    <svg viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
      <path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z" />
    </svg>
  ),
};

const NotificationToast: React.FC<NotificationToastProps> = ({
  type = 'info',
  title,
  description,
  icon,
  visible: controlledVisible,
  duration = 3000,
  onClose,
  afterClose,
  className,
  ...rest
}) => {
  const [internalVisible, setInternalVisible] = useState(true);
  const [closing, setClosing] = useState(false);
  const closeTimerRef = useRef<ReturnType<typeof setTimeout>>();

  const isVisible = controlledVisible !== undefined ? controlledVisible : internalVisible;

  const handleClose = useCallback(() => {
    setClosing(true);
    onClose?.();
    closeTimerRef.current = setTimeout(() => {
      setInternalVisible(false);
      setClosing(false);
      afterClose?.();
    }, 300);
  }, [onClose, afterClose]);

  // 清理計時器
  useEffect(() => {
    return () => {
      if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
    };
  }, []);

  // 自動關閉
  useEffect(() => {
    if (!isVisible || duration <= 0) return;
    const timer = setTimeout(handleClose, duration);
    return () => clearTimeout(timer);
  }, [isVisible, duration, handleClose]);

  if (!isVisible && !closing) return null;

  const classes = classNames(
    'zelda-toast',
    `zelda-toast--${type}`,
    {
      'zelda-toast--closing': closing,
    },
    className
  );

  return (
    <div className={classes} role="alert" {...rest}>
      <div className="zelda-toast__icon">
        {icon || defaultIcons[type]}
      </div>
      <div className="zelda-toast__body">
        <div className="zelda-toast__title">{title}</div>
        {description && (
          <div className="zelda-toast__desc">{description}</div>
        )}
      </div>
      <button className="zelda-toast__close" onClick={handleClose} aria-label="Close">
        <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
          <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z" />
        </svg>
      </button>
    </div>
  );
};

NotificationToast.displayName = 'NotificationToast';

export default NotificationToast;
