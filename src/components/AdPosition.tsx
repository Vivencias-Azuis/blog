'use client';

import { useAdTargeting } from '@/hooks/useAdTargeting';
import { AdTargetingContext } from '@/types/ads';
import AdBanner from './AdBanner';

interface AdPositionProps {
  position: string;
  currentPage: string;
  currentCategory?: string;
  currentTags?: string[];
  className?: string;
  maxBanners?: number;
}

export default function AdPosition({
  position,
  currentPage,
  currentCategory,
  currentTags,
  className = '',
  maxBanners = 1
}: AdPositionProps) {
  const targetingContext: AdTargetingContext = {
    currentPage,
    currentCategory,
    currentTags,
    position
  };

  const { selectedBanner, availableBanners, hasBanners } = useAdTargeting(targetingContext);

  if (!hasBanners || !selectedBanner) {
    return null;
  }

  const bannersToShow = availableBanners.slice(0, maxBanners);

  return (
    <div className={`ad-position ad-position-${position} ${className}`}>
      {bannersToShow.map((banner) => (
        <div key={banner.id} className="mb-4 last:mb-0">
          <AdBanner banner={banner} />
        </div>
      ))}
    </div>
  );
}
