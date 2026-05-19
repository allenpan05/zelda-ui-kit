import React from 'react';
import classNames from 'classnames';
import './style.less';

export type SheikahIconName =
  | 'force'
  | 'triforce'
  | 'eye'
  | 'sheikah'
  | 'gerudo'
  | 'kokiri'
  | 'zora'
  | 'goron'
  | 'royal'
  | 'din'
  | 'farore'
  | 'nayru'
  | 'light'
  | 'forest'
  | 'water'
  | 'spirit'
  | 'shadow'
  | 'heart'
  | 'drop'
  | 'question'
  | 'exclamation';

const iconMap: Record<SheikahIconName, string> = {
  force: 'a',
  triforce: 'b',
  drop: 'c',
  eye: 'd',
  sheikah: 'f',
  gerudo: 'g',
  kokiri: 'h',
  zora: 'i',
  goron: 'j',
  royal: 'k',
  din: 'l',
  farore: 'm',
  nayru: 'n',
  light: 'o',
  forest: 'p',
  water: 'q',
  spirit: 'r',
  shadow: 's',
  heart: '\u2764',
  question: '?',
  exclamation: '!',
};

export type SheikahIconSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

export interface SheikahIconProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** 圖標名稱 */
  name: SheikahIconName;
  /** 尺寸 */
  size?: SheikahIconSize;
  /** 是否發光 */
  glowing?: boolean;
  /** 顏色 (CSS color) */
  color?: string;
}

const SheikahIcon: React.FC<SheikahIconProps> = ({
  name,
  size = 'md',
  glowing = false,
  color,
  className,
  style,
  ...rest
}) => {
  const classes = classNames(
    'zelda-sheikah-icon',
    `zelda-sheikah-icon--${size}`,
    {
      'zelda-sheikah-icon--glowing': glowing,
    },
    className
  );

  const mergedStyle: React.CSSProperties = { ...style };
  if (color) {
    mergedStyle.color = color;
  }

  return (
    <span className={classes} style={mergedStyle} aria-hidden="true" {...rest}>
      {iconMap[name]}
    </span>
  );
};

SheikahIcon.displayName = 'SheikahIcon';

export default SheikahIcon;
