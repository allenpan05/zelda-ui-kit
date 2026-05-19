import React, { useState, useEffect, useCallback, forwardRef } from 'react';
import classNames from 'classnames';
import './style.less';

export interface DialogueBoxProps extends React.HTMLAttributes<HTMLDivElement> {
  speaker?: string;
  children: React.ReactNode;
  typewriter?: boolean;
  typeSpeed?: number;
  onClose?: () => void;
  closable?: boolean;
  avatar?: React.ReactNode;
  visible?: boolean;
}

export const DialogueBox = forwardRef<HTMLDivElement, DialogueBoxProps>(({
  speaker,
  children,
  typewriter = false,
  typeSpeed = 30,
  onClose,
  closable = true,
  avatar,
  visible = true,
  className,
  ...rest
}, ref) => {
  const [displayText, setDisplayText] = useState<string>('');
  const [isTyping, setIsTyping] = useState(false);

  const getTextContent = useCallback((node: React.ReactNode): string => {
    if (typeof node === 'string') return node;
    if (typeof node === 'number') return String(node);
    if (React.isValidElement(node)) {
      const element = node as React.ReactElement<{ children?: React.ReactNode }>;
      return getTextContent(element.props.children);
    }
    if (Array.isArray(node)) {
      return node.map(getTextContent).join('');
    }
    return '';
  }, []);

  useEffect(() => {
    if (!typewriter || !visible) {
      setDisplayText('');
      setIsTyping(false);
      return;
    }

    const fullText = getTextContent(children);
    let currentIndex = 0;
    setDisplayText('');
    setIsTyping(true);

    const timer = setInterval(() => {
      if (currentIndex < fullText.length) {
        setDisplayText(fullText.slice(0, currentIndex + 1));
        currentIndex++;
      } else {
        setIsTyping(false);
        clearInterval(timer);
      }
    }, typeSpeed);

    return () => clearInterval(timer);
  }, [children, typewriter, typeSpeed, visible, getTextContent]);

  const handleSkip = () => {
    if (isTyping) {
      setDisplayText(getTextContent(children));
      setIsTyping(false);
    }
  };

  if (!visible) return null;

  const classes = classNames(
    'zelda-dialogue',
    {
      'zelda-dialogue--typing': isTyping,
    },
    className
  );

  return (
    <div ref={ref} className={classes} {...rest}>
      {avatar && <div className="zelda-dialogue__avatar">{avatar}</div>}
      <div className="zelda-dialogue__content">
        {speaker && (
          <div className="zelda-dialogue__speaker">{speaker}</div>
        )}
        <div className="zelda-dialogue__text" onClick={handleSkip}>
          {typewriter ? displayText : children}
          {isTyping && <span className="zelda-dialogue__cursor">|</span>}
        </div>
        {!isTyping && (
          <div className="zelda-dialogue__hint">
            {closable ? (
              <button className="zelda-dialogue__close" onClick={onClose}>
                關閉
              </button>
            ) : (
              <span className="zelda-dialogue__continue">▼</span>
            )}
          </div>
        )}
      </div>
    </div>
  );
});

DialogueBox.displayName = 'DialogueBox';

