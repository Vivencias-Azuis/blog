'use client';

import Link from 'next/link';
import { AdBanner } from '@/types/ads';

interface AdBannerProps {
  banner: AdBanner;
  className?: string;
}

export default function AdBanner({ banner, className = '' }: AdBannerProps) {
  const getThemeColors = () => {
    if (banner.styling.theme === 'custom' && banner.styling.customColors) {
      return banner.styling.customColors;
    }

    switch (banner.styling.theme) {
      case 'primary':
        return {
          background: '#E3F2FD',
          text: '#1976D2',
          button: '#FFD066'
        };
      default: // light
        return {
          background: '#FFFFFF',
          text: '#374151',
          button: '#7DB8E5'
        };
    }
  };

  const colors = getThemeColors();

  const handleClick = () => {
    // Aqui você pode adicionar lógica de tracking se necessário
    console.log(`Banner clicked: ${banner.id}`);
  };

  const renderBannerContent = () => {
    switch (banner.type) {
      case 'image':
        return (
          <div className="relative group overflow-hidden rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
            {banner.content.image && (
              <div className="aspect-video bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                <img
                  src={banner.content.image}
                  alt={banner.content.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  onError={(e) => {
                    // Fallback para imagem quebrada
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                    target.parentElement!.innerHTML = `
                      <div class="flex items-center justify-center h-full">
                        <div class="text-6xl opacity-20">📢</div>
                      </div>
                    `;
                  }}
                />
              </div>
            )}
            <div className="p-4" style={{ backgroundColor: colors.background }}>
              <h3 className="font-bold text-lg mb-2" style={{ color: colors.text }}>
                {banner.content.title}
              </h3>
              <p className="text-sm mb-4 opacity-80" style={{ color: colors.text }}>
                {banner.content.description}
              </p>
              <Link
                href={banner.content.url}
                onClick={handleClick}
                className="inline-flex items-center justify-center w-full px-4 py-2 rounded-lg font-semibold text-sm transition-all duration-200 hover:opacity-90"
                style={{ 
                  backgroundColor: colors.button,
                  color: colors.text
                }}
              >
                {banner.content.cta}
                <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
            </div>
          </div>
        );

      case 'card':
        return (
          <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100">
            {banner.content.image && (
              <div className="aspect-video bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                <img
                  src={banner.content.image}
                  alt={banner.content.title}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                    target.parentElement!.innerHTML = `
                      <div class="flex items-center justify-center h-full">
                        <div class="text-6xl opacity-20">🎓</div>
                      </div>
                    `;
                  }}
                />
              </div>
            )}
            <div className="p-5" style={{ backgroundColor: colors.background }}>
              <div className="flex justify-between items-start mb-3">
                <h3 className="font-bold text-lg leading-tight" style={{ color: colors.text }}>
                  {banner.content.title}
                </h3>
                {banner.content.price && (
                  <span className="text-sm font-bold px-2 py-1 rounded-full bg-amarelo-quente text-primary-dark">
                    {banner.content.price}
                  </span>
                )}
              </div>
              <p className="text-sm mb-4 opacity-80" style={{ color: colors.text }}>
                {banner.content.description}
              </p>
              <Link
                href={banner.content.url}
                onClick={handleClick}
                className="inline-flex items-center justify-center w-full px-4 py-3 rounded-lg font-semibold transition-all duration-200 hover:opacity-90"
                style={{ 
                  backgroundColor: colors.button,
                  color: colors.text
                }}
              >
                {banner.content.cta}
                <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
            </div>
          </div>
        );

      case 'text':
        return (
          <div 
            className="rounded-xl p-5 shadow-lg hover:shadow-xl transition-all duration-300 border-l-4 border-secondary"
            style={{ backgroundColor: colors.background }}
          >
            <h3 className="font-bold text-lg mb-2" style={{ color: colors.text }}>
              {banner.content.title}
            </h3>
            <p className="text-sm mb-4 opacity-80" style={{ color: colors.text }}>
              {banner.content.description}
            </p>
            <Link
              href={banner.content.url}
              onClick={handleClick}
              className="inline-flex items-center text-sm font-semibold transition-all duration-200 hover:opacity-80"
              style={{ color: colors.button }}
            >
              {banner.content.cta}
              <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className={`ad-banner ${className}`}>
      <div className="relative">
        {renderBannerContent()}
        {/* Badge de anúncio */}
        <div className="absolute top-2 right-2">
          <span className="text-xs px-2 py-1 rounded-full bg-primary/20 text-primary-dark font-medium">
            Anúncio
          </span>
        </div>
      </div>
    </div>
  );
}
