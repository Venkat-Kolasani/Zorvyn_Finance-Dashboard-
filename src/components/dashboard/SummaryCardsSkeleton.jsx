import React from 'react';
import { Skeleton } from '../ui/Skeleton';
import './SummaryCardsSkeleton.css';

const SummaryCardSkeleton = () => {
  return (
    <div className="summary-card-skeleton">
      <Skeleton width="80px" height="12px" />
      <Skeleton width="140px" height="28px" />
      <div className="summary-card-skeleton-trend">
        <Skeleton width="60px" height="14px" />
        <Skeleton width="80px" height="14px" />
      </div>
    </div>
  );
};

export const SummaryCardsSkeleton = () => {
  return (
    <div className="summary-cards-grid">
      <SummaryCardSkeleton />
      <SummaryCardSkeleton />
      <SummaryCardSkeleton />
      <SummaryCardSkeleton />
    </div>
  );
};

export default SummaryCardsSkeleton;
