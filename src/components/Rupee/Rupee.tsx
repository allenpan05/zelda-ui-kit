import React from 'react';
import classNames from 'classnames';
import './style.less';

export type RupeeColor = 'green' | 'blue' | 'red' | 'purple' | 'gold';
export type RupeeSize = 'sm' | 'md' | 'lg';

export interface RupeeProps extends React.HTMLAttributes<HTMLDivElement> {
  /** 數量 */
  value: number;
  /** 寶石顏色 */
  color?: RupeeColor;
  /** 尺寸 */
  size?: RupeeSize;
  /** 是否顯示動畫 */
  animated?: boolean;
  /** 是否顯示圖標 */
  showIcon?: boolean;
}

const Rupee: React.FC<RupeeProps> = ({
  value,
  color = 'green',
  size = 'md',
  animated = false,
  showIcon = true,
  className,
  ...rest
}) => {
  const classes = classNames(
    'zelda-rupee',
    `zelda-rupee--${color}`,
    `zelda-rupee--${size}`,
    {
      'zelda-rupee--animated': animated,
    },
    className
  );

  // 格式化數字
  const formatNumber = (num: number): string => {
    if (num >= 10000) {
      return `${(num / 1000).toFixed(0)}k`;
    }
    return num.toLocaleString();
  };

  return (
    <div className={classes} {...rest}>
      {showIcon && (
        <div className="zelda-rupee__icon">
          <div className="zelda-rupee__gem">
            <div className="zelda-rupee__gem-inner" />
          </div>
        </div>
      )}
      <span className="zelda-rupee__value">{formatNumber(value)}</span>
    </div>
  );
};

Rupee.displayName = 'Rupee';

export default Rupee;
