export interface CreatorProfile {
  name: string;
  handle: string;
  avatar: string;
  coverImage: string;
  category: string;
  bio: string;
  tagline: string;
  location: string;
  website: string;
  githubUrl: string;
  obsidianPluginUrl: string;
  discordUrl: string;
  coffeesCount: number;
  supportersCount: number;
  monthlyIncome: number;
  coffeePrice: number; // default $3
  verified: boolean;
  paypalEmail?: string;
  paypalHandle?: string;
}

export interface CoffeeGoal {
  id: string;
  title: string;
  description: string;
  currentAmount: number;
  targetAmount: number;
  currency: string;
  deadlineDaysLeft: number;
}

export interface SupporterMessage {
  id: string;
  name: string;
  avatar?: string;
  isAnonymous: boolean;
  coffees: number;
  amount: number;
  message: string;
  timestamp: string;
  tierName?: string;
  isMonthly: boolean;
  likes: number;
  hasLiked?: boolean;
  creatorReply?: {
    text: string;
    timestamp: string;
  };
  pinned?: boolean;
}

export interface ShopItem {
  id: string;
  title: string;
  price: number;
  originalPrice?: number;
  category: 'Plugin' | 'License' | 'Guide' | 'Template';
  image: string;
  description: string;
  features: string[];
  salesCount: number;
  badge?: string;
  downloadUrl?: string;
  requiresKey: boolean;
}

export interface MembershipTier {
  id: string;
  name: string;
  price: number;
  billingPeriod: 'month' | 'year';
  color: string;
  description: string;
  badgeIcon: string;
  perks: string[];
  membersCount: number;
  popular?: boolean;
}

export interface DevlogPost {
  id: string;
  title: string;
  slug: string;
  publishedAt: string;
  category: 'Update' | 'Release' | 'Tutorial' | 'Roadmap';
  summary: string;
  content: string;
  image?: string;
  likes: number;
  commentsCount: number;
  isSupporterOnly?: boolean;
  tags: string[];
}

export interface GalleryItem {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  category: string;
}

export type ActiveTab = 'feed' | 'shop' | 'tiers' | 'posts' | 'gallery';
