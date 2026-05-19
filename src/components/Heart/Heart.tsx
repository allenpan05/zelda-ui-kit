import React from 'react';
import classNames from 'classnames';
import './style.less';

export type HeartSize = 'sm' | 'md' | 'lg';

export interface HeartProps extends React.HTMLAttributes<HTMLDivElement> {
  /** 當前值 */
  value: number;
  /** 最大值 */
  max?: number;
  /** 尺寸 */
  size?: HeartSize;
  /** 是否顯示動畫 */
  animated?: boolean;
  /** 是否顯示數字 */
  showValue?: boolean;
}

const Heart: React.FC<HeartProps> = ({
  value,
  max = 10,
  size = 'md',
  animated = false,
  showValue = false,
  className,
  ...rest
}) => {
  const classes = classNames(
    'zelda-heart',
    `zelda-heart--${size}`,
    {
      'zelda-heart--animated': animated,
    },
    className
  );

  // 生成心形數組
  const hearts = Array.from({ length: max }, (_, index) => {
    const heartValue = value - index;
    let fill: 'full' | 'half' | 'empty' = 'empty';
    
    if (heartValue >= 1) {
      fill = 'full';
    } else if (heartValue >= 0.5) {
      fill = 'half';
    }

    return (
      <div
        key={index}
        className={classNames(
          'zelda-heart__item',
          `zelda-heart__item--${fill}`,
          {
            'zelda-heart__item--low': value <= max * 0.25 && fill !== 'empty',
          }
        )}
      >
        <div className="zelda-heart__shape">
          <div className="zelda-heart__fill" />
        </div>
      </div>
    );
  });

  return (
    <div className={classes} {...rest}>
      <div className="zelda-heart__container">
        {hearts}
      </div>
      {showValue && (
        <span className="zelda-heart__value">
          {Math.ceil(value)}/{max}
        </span>
      )}
    </div>
  );
};

Heart.displayName = 'Heart';

export default Heart;
