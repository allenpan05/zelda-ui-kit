import React from 'react';
import classNames from 'classnames';
import './style.less';

export interface SheikahPanelProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
  /** 標題 */
  title?: React.ReactNode;
  /** 副標題 */
  subtitle?: React.ReactNode;
  /** 子元素 */
  children: React.ReactNode;
  /** 底部 */
  footer?: React.ReactNode;
  /** 是否帶邊框裝飾 */
  decorated?: boolean;
  /** 是否發光 */
  glowing?: boolean;
  /** 關閉回調 */
  onClose?: () => void;
  /** 是否可關閉 */
  closable?: boolean;
}

const SheikahPanel: React.FC<SheikahPanelProps> = ({
  title,
  subtitle,
  children,
  footer,
  decorated = true,
  glowing = false,
  onClose,
  closable = false,
  className,
  ...rest
}) => {
  const classes = classNames(
    'zelda-sheikah-panel',
    {
      'zelda-sheikah-panel--decorated': decorated,
      'zelda-sheikah-panel--glowing': glowing,
    },
    className
  );

  return (
    <div className={classes} {...rest}>
      {/* 裝飾角 */}
      {decorated && (
        <>
          <div className="zelda-sheikah-panel__corner zelda-sheikah-panel__corner--tl" />
          <div className="zelda-sheikah-panel__corner zelda-sheikah-panel__corner--tr" />
          <div className="zelda-sheikah-panel__corner zelda-sheikah-panel__corner--bl" />
          <div className="zelda-sheikah-panel__corner zelda-sheikah-panel__corner--br" />
        </>
      )}

      {/* 標題欄 */}
      {(title || closable) && (
        <div className="zelda-sheikah-panel__header">
          <div className="zelda-sheikah-panel__header-text">
            {title && <div className="zelda-sheikah-panel__title">{title}</div>}
            {subtitle && <div className="zelda-sheikah-panel__subtitle">{subtitle}</div>}
          </div>
          {closable && (
            <button className="zelda-sheikah-panel__close" onClick={onClose}>
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z" />
              </svg>
            </button>
          )}
        </div>
      )}

      {/* 內容 */}
      <div className="zelda-sheikah-panel__content">
        {children}
      </div>

      {/* 底部 */}
      {footer && (
        <div className="zelda-sheikah-panel__footer">
          {footer}
        </div>
      )}

      {/* 掃描線效果 */}
      {decorated && <div className="zelda-sheikah-panel__scanline" />}
    </div>
  );
};

SheikahPanel.displayName = 'SheikahPanel';

export default SheikahPanel;
