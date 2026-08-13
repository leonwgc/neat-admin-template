/**
 * @file src/components/DotStatus/DotStatus.tsx
 * @author leon.wang
 */

import React, { FC } from 'react';
import './DotStatus.scss';

interface DotStatusProps {
  text: string;
  description?: string;
  iconColor?: string;
  textColor?: string;
  className?: string;
  style?: React.CSSProperties;
}

export const DotStatus: FC<DotStatusProps> = ({
  text,
  description,
  iconColor = '#EFA610',
  textColor = '#333',
  className = '',
  style,
}) => {
  return (
    <div
      className={`dot-status ${className} ${
        description ? 'dot-status--with-description' : ''
      }`}
      style={style}
    >
      <span
        className="dot-status__icon"
        style={{ backgroundColor: iconColor }}
      />
      <div className="dot-status__content">
        <span className="dot-status__text" style={{ color: textColor }}>
          {text}
        </span>
        {description && (
          <span className="dot-status__description">{description}</span>
        )}
      </div>
    </div>
  );
};

export default DotStatus;
