import React from 'react';
import classNames from 'classnames';
import './style.less';

export type SheikahLetter =
  | 'a' | 'b' | 'c' | 'g' | 'y' | 'x'
  | '0' | '1' | '2'
  | 'question' | 'exclamation' | 'spot' | 'hyphen';

export interface SheikahTextProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** 要顯示的文字（支援的字母） */
  text: string;
  /** 字符大小 */
  size?: number;
  /** 顏色 */
  color?: string;
  /** 是否發光 */
  glowing?: boolean;
}

const validLetters = new Set<string>([
  'a', 'b', 'c', 'g', 'y', 'x',
  '0', '1', '2',
  'question', 'exclamation', 'spot', 'hyphen',
]);

const letterAliases: Record<string, SheikahLetter> = {
  '?': 'question',
  '!': 'exclamation',
  '.': 'spot',
  '-': 'hyphen',
};

function resolveLetter(ch: string): SheikahLetter | null {
  if (validLetters.has(ch)) return ch as SheikahLetter;
  if (letterAliases[ch]) return letterAliases[ch];
  return null;
}

const SheikahText: React.FC<SheikahTextProps> = ({
  text,
  size = 24,
  color,
  glowing = false,
  className,
  style,
  ...rest
}) => {
  const classes = classNames(
    'zelda-sheikah-text',
    {
      'zelda-sheikah-text--glowing': glowing,
    },
    className
  );

  const mergedStyle: React.CSSProperties = {
    ...style,
    fontSize: `${size}px`,
  };
  if (color) {
    mergedStyle.color = color;
  }

  const letters = text.split('').map((ch, idx) => {
    const letter = resolveLetter(ch);
    if (!letter) {
      // 不支援的字符用空白佔位
      return <span key={idx} className="zelda-sheikah-text__space" style={{ width: size * 0.6 }} />;
    }
    return (
      <i
        key={idx}
        className={classNames('zelda-sheikah-text__letter', `zelda-sheikah-text__letter--${letter}`)}
        aria-hidden="true"
      />
    );
  });

  return (
    <span className={classes} style={mergedStyle} {...rest}>
      {letters}
    </span>
  );
};

SheikahText.displayName = 'SheikahText';

export default SheikahText;
