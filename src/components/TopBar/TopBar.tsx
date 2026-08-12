/**
 * @file src/components/TopBar/TopBar.tsx
 * @author leon.wang
 */

import React from 'react';
import './TopBar.scss';

export interface TopBarProps {
  /** Header title */
  title: React.ReactNode;
  cat?: React.ReactNode;
  /** Optional right-side action area */
  extra?: React.ReactNode;
  /** Additional class name */
  className?: string;
}

const TopBar: React.FC<TopBarProps> = ({ title, cat, extra, className = '' }) => {
  return (
    <div className={`top-bar ${className}`.trim()}>
      <div className="top-bar__title">
        {title}
        {cat ? <div className="top-bar__cat">{cat}</div> : null}
      </div>
      {extra ? <div className="top-bar__extra">{extra}</div> : null}
    </div>
  );
};

export default TopBar;
