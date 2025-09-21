export interface AdBanner {
  id: string;
  name: string;
  type: 'image' | 'card' | 'text';
  content: {
    image?: string;
    title: string;
    description: string;
    price?: string;
    cta: string;
    url: string;
  };
  targeting: {
    positions: string[];
    categories: string[];
    tags: string[];
    pages: string[];
  };
  schedule: {
    startDate: string;
    endDate: string;
    enabled: boolean;
  };
  styling: {
    theme: 'light' | 'primary' | 'custom';
    customColors?: {
      background: string;
      text: string;
      button: string;
    };
  };
}

export interface AdPosition {
  enabled: boolean;
  priority: number;
}

export interface AdSettings {
  defaultTheme: 'light' | 'primary' | 'custom';
  brandColors: {
    primary: string;
    secondary: string;
    accent: string;
  };
  rotation: {
    type: 'random' | 'sequential';
    enabled: boolean;
  };
}

export interface AdConfig {
  banners: AdBanner[];
  positions: Record<string, AdPosition>;
  settings: AdSettings;
}

export interface AdTargetingContext {
  currentPage: string;
  currentCategory?: string;
  currentTags?: string[];
  position: string;
}
