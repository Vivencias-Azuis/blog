import { useMemo } from 'react';
import { AdBanner, AdConfig, AdTargetingContext } from '@/types/ads';
import adsConfig from '@/config/ads-config.json';

export function useAdTargeting(context: AdTargetingContext) {
  const config = adsConfig as AdConfig;

  const availableBanners = useMemo(() => {
    const now = new Date();
    const today = now.toISOString().split('T')[0];

    return config.banners.filter(banner => {
      // Verificar se está habilitado
      if (!banner.schedule.enabled) return false;

      // Verificar datas de início e fim
      if (banner.schedule.startDate > today || banner.schedule.endDate < today) {
        return false;
      }

      // Verificar posição
      if (!banner.targeting.positions.includes(context.position)) {
        return false;
      }

      // Verificar página
      if (!banner.targeting.pages.includes(context.currentPage)) {
        return false;
      }

      // Verificar categoria se fornecida
      if (context.currentCategory && !banner.targeting.categories.includes(context.currentCategory)) {
        return false;
      }

      // Verificar tags se fornecidas
      if (context.currentTags && context.currentTags.length > 0) {
        const hasMatchingTag = banner.targeting.tags.some(tag => 
          context.currentTags?.includes(tag)
        );
        if (!hasMatchingTag) return false;
      }

      return true;
    });
  }, [config.banners, context]);

  const selectedBanner = useMemo(() => {
    if (availableBanners.length === 0) return null;

    // Rotação aleatória
    if (config.settings.rotation.enabled && config.settings.rotation.type === 'random') {
      const randomIndex = Math.floor(Math.random() * availableBanners.length);
      return availableBanners[randomIndex];
    }

    // Rotação sequencial (baseada no índice da posição)
    const positionIndex = context.position.length;
    const sequentialIndex = positionIndex % availableBanners.length;
    return availableBanners[sequentialIndex];
  }, [availableBanners, config.settings.rotation, context.position]);

  const getBannersForPosition = (position: string) => {
    return availableBanners.filter(banner => 
      banner.targeting.positions.includes(position)
    );
  };

  return {
    selectedBanner,
    availableBanners,
    getBannersForPosition,
    hasBanners: availableBanners.length > 0
  };
}
