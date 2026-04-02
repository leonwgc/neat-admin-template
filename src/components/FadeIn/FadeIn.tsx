/**
 * @file src/components/FadeIn/FadeIn.tsx
 * @author leon.wang
 */

import React, { useEffect, useState } from 'react';
import './FadeIn.scss';

interface FadeInProps {
  /** Children elements to apply fade-in animation */
  children: React.ReactNode;
  /** Animation duration in milliseconds */
  duration?: number;
  /** Delay before animation starts in milliseconds */
  delay?: number;
  /** Custom className */
  className?: string;
  /** Animation timing function */
  timingFunction?: 'ease' | 'ease-in' | 'ease-out' | 'ease-in-out' | 'linear';
}

const FadeIn: React.FC<FadeInProps> = ({
  children,
  duration = 600,
  delay = 0,
  className = '',
  timingFunction = 'ease-in-out',
}) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, delay);

    return () => clearTimeout(timer);
  }, [delay]);

  return (
    <div
      className={`fade-in ${isVisible ? 'fade-in--visible' : ''} ${className}`}
      style={{
        transitionDuration: `${duration}ms`,
        transitionTimingFunction: timingFunction,
      }}
    >
      {children}
    </div>
  );
};

export default FadeIn;
