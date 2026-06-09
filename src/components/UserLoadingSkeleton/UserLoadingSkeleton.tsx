/**
 * @file src/components/UserLoadingSkeleton/UserLoadingSkeleton.tsx
 * @author leon.wang
 */

import { useEffect, useState, type ReactNode } from 'react';
import { Skeleton } from '@derbysoft/neat-design';
import useUserInfo from '~/global/useUserInfo';

export interface UserLoadingSkeletonProps {
  /** Child content to render when loading completes */
  children: ReactNode;
  /** Delay before showing skeleton to avoid flash on short loading */
  delay?: number;
}

const UserLoadingSkeleton: React.FC<UserLoadingSkeletonProps> = ({
  children,
  delay = 120,
}) => {
  const { loading } = useUserInfo();
  const [showLoading, setShowLoading] = useState(false);

  useEffect(() => {
    if (!loading) {
      setShowLoading(false);
      return;
    }

    const timer = window.setTimeout(() => {
      setShowLoading(true);
    }, delay);

    return () => window.clearTimeout(timer);
  }, [loading, delay]);

  return <Skeleton loading={showLoading}>{children}</Skeleton>;
};

export default UserLoadingSkeleton;
