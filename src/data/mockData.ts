import { CreatorProfile, CoffeeGoal, SupporterMessage, ShopItem, MembershipTier, DevlogPost, GalleryItem } from '../types';
import zencoderAvatar from '../assets/images/zencoder_avatar_1788055537920.jpg';

export const initialCreatorProfile: CreatorProfile = {
  name: 'ZenCoder',
  handle: 'zencoder',
  avatar: zencoderAvatar,
  coverImage: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1600&q=80',
  category: 'Obsidian & Developer Tools',
  tagline: 'Building ultra-fast Obsidian plugins, self-hosted sync services, and note-taking utilities 🚀',
  bio: 'Hi! I am ZenCoder, creator of "VaultSync Pro" and "Custom Image Auto Uploader" for Obsidian. I build high-performance sync pipelines, git automation, and cloud storage integrations for power users. Buying me a coffee directly helps fund relay server hosting (Tokyo/Frankfurt), S3 cloud backups, and open-source maintenance!',
  location: 'Global / Remote',
  website: 'https://github.com/lengedliu',
  githubUrl: 'https://github.com/lengedliu',
  obsidianPluginUrl: 'https://obsidian.md/plugins?search=vault%20sync%20pro',
  discordUrl: 'https://discord.gg/obsidian',
  coffeesCount: 1420,
  supportersCount: 348,
  monthlyIncome: 680,
  coffeePrice: 3,
  verified: true,
  paypalEmail: 'lychuan_007@163.com',
  paypalHandle: 'lychuan_007@163.com',
};

export const initialGoal: CoffeeGoal = {
  id: 'goal-1',
  title: 'August Sync Relay Server & Multi-Region Backup Fund',
  description: 'Funding dedicated high-speed Redis + S3 sync nodes in Tokyo & Frankfurt for low-latency cross-platform vault syncing (Mac, Windows, iOS, Android).',
  currentAmount: 435,
  targetAmount: 500,
  currency: '$',
  deadlineDaysLeft: 6,
};

export const initialSupporters: SupporterMessage[] = [
  {
    id: 'sup-1',
    name: 'Marcus Vance',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
    isAnonymous: false,
    coffees: 5,
    amount: 15,
    message: 'VaultSync Pro literally saved my 10,000 note Obsidian vault during my thesis! The conflict resolution auto-merge is wizardry. Thanks for all your hard work!',
    timestamp: '2 hours ago',
    tierName: 'VIP Sync Member',
    isMonthly: true,
    likes: 12,
    hasLiked: false,
    pinned: true,
    creatorReply: {
      text: 'Thank you so much Marcus! Hearing this makes the late-night protocol debugging worth it. Really appreciate your ongoing VIP support! 🙏',
      timestamp: '1 hour ago',
    },
  },
  {
    id: 'sup-2',
    name: 'Elena Rostova',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80',
    isAnonymous: false,
    coffees: 3,
    amount: 9,
    message: 'Bought 3 coffees! The Image Auto Uploader to Cloudflare R2 works like a charm on mobile Obsidian.',
    timestamp: 'Yesterday',
    isMonthly: false,
    likes: 8,
    hasLiked: false,
  },
  {
    id: 'sup-3',
    name: 'Obsidian Power User',
    isAnonymous: true,
    coffees: 10,
    amount: 30,
    message: 'Happy to support your server hosting costs! Keep pushing updates for multi-storage git automation.',
    timestamp: '3 days ago',
    tierName: 'Server Host Patron',
    isMonthly: true,
    likes: 19,
    hasLiked: false,
    creatorReply: {
      text: 'Thank you anonymous patron! Dedicated S3 mirror server bandwidth is fully locked in for next month thanks to you!',
      timestamp: '2 days ago',
    },
  },
  {
    id: 'sup-4',
    name: 'Devon Chen',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80',
    isAnonymous: false,
    coffees: 1,
    amount: 3,
    message: 'Coffee for a great Obsidian developer! Cheers ☕',
    timestamp: '4 days ago',
    isMonthly: false,
    likes: 4,
    hasLiked: false,
  },
  {
    id: 'sup-5',
    name: 'Sarah K.',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
    isAnonymous: false,
    coffees: 3,
    amount: 9,
    message: 'The new REST API pipeline for VaultSync Pro service is lightning fast. Sending energy your way!',
    timestamp: '5 days ago',
    tierName: 'Vault Explorer',
    isMonthly: true,
    likes: 7,
    hasLiked: false,
  },
];

export const initialShopItems: ShopItem[] = [
  {
    id: 'shop-1',
    title: 'VaultSync Pro Service - Pro License Key (1 Year)',
    price: 18,
    originalPrice: 25,
    category: 'License',
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=600&q=80',
    description: 'Unlock high-speed dedicated relay nodes, unlimited attachment vault sync, end-to-end zero-knowledge AES-256 encryption, and instant web dashboard access.',
    features: [
      'Unlimited Devices (Mac, Windows, Linux, iOS, Android)',
      'Sub-second delta synchronization',
      'Zero-knowledge AES-256 client-side encryption',
      'Dedicated high-bandwidth relay servers in Tokyo & Frankfurt',
      'Automated multi-storage backup (AWS S3, R2, Aliyun OSS)',
    ],
    salesCount: 412,
    badge: 'BESTSELLER',
    requiresKey: true,
  },
  {
    id: 'shop-2',
    title: 'Self-Hosted Note Sync Server (Docker & K8s Package)',
    price: 29,
    originalPrice: 40,
    category: 'Plugin',
    image: 'https://images.unsplash.com/photo-1607799279861-4dd421887fb3?auto=format&fit=crop&w=600&q=80',
    description: 'Complete production-ready Docker Compose & Kubernetes helm charts to run your own private VaultSync Pro server backend on your NAS, VPS, or home server.',
    features: [
      'Includes Redis queue + PostgreSQL storage schemas',
      'Web Dashboard for managing synced vaults & tokens',
      'One-command installation script for Docker & Unraid',
      'Lifetime updates & step-by-step setup documentation',
    ],
    salesCount: 189,
    badge: 'POPULAR',
    requiresKey: false,
  },
  {
    id: 'shop-3',
    title: 'Obsidian Image Auto Uploader Pro - Enterprise Pack',
    price: 12,
    category: 'Plugin',
    image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=600&q=80',
    description: 'Advanced media processor for Obsidian that automatically compresses images (WebP/AVIF), converts clipboard screenshots, and uploads to S3/OSS/MinIO.',
    features: [
      'Automated WebP/AVIF image compression before upload',
      'Multi-bucket fallback & custom CNAME CDN domain support',
      'Drag-and-drop auto-rename template engine',
      'Batch local image migration tool for existing vaults',
    ],
    salesCount: 275,
    badge: 'FEATURED',
    requiresKey: true,
  },
  {
    id: 'shop-4',
    title: 'Ultimate Obsidian Vault Git & Sync Automation Guide',
    price: 8,
    category: 'Guide',
    image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=600&q=80',
    description: 'In-depth guide and shell/cron scripts to setup zero-conflict background Git backups, multi-repo synchronization, and automated markdown note publishing.',
    features: [
      'Includes bash, PowerShell, and iOS Shortcuts scripts',
      'How to avoid Git merge conflicts on mobile devices',
      'Automated Git LFS configuration for large PDF & media vaults',
    ],
    salesCount: 134,
    requiresKey: false,
  },
];

export const initialTiers: MembershipTier[] = [
  {
    id: 'tier-1',
    name: 'Coffee Supporter ☕',
    price: 3,
    billingPeriod: 'month',
    color: '#F59E0B',
    description: 'Support ongoing plugin maintenance and get a special supporter badge on Ko-fi & Discord.',
    badgeIcon: '☕',
    perks: [
      'Exclusive Supporter Discord role',
      'Access to supporter-only devlog posts',
      'My everlasting gratitude & coffee boost',
    ],
    membersCount: 142,
  },
  {
    id: 'tier-2',
    name: 'Vault Explorer 🚀',
    price: 5,
    billingPeriod: 'month',
    color: '#3B82F6',
    description: 'For active Obsidian users who want early access to plugin beta builds and feature previews.',
    badgeIcon: '🚀',
    perks: [
      'All Coffee Supporter perks',
      'Early access to pre-release Obsidian plugin builds',
      'Vote on upcoming plugin features in monthly polls',
      'Direct priority issue triage on GitHub repository',
    ],
    membersCount: 98,
    popular: true,
  },
  {
    id: 'tier-3',
    name: 'VIP Sync Member ⚡',
    price: 10,
    billingPeriod: 'month',
    color: '#8B5CF6',
    description: 'Includes 1x VaultSync Pro Cloud Node activation for high-speed multi-device vault syncing.',
    badgeIcon: '⚡',
    perks: [
      'All Vault Explorer perks',
      'Free VaultSync Pro Cloud Node subscription included',
      'Dedicated Tokyo/Frankfurt high-speed sync channel',
      '1-on-1 setup help via Discord DM',
    ],
    membersCount: 76,
  },
  {
    id: 'tier-4',
    name: 'Server Host Patron 👑',
    price: 25,
    billingPeriod: 'month',
    color: '#EC4899',
    description: 'Become a key sponsor funding server infrastructure, bandwidth, and open-source R&D.',
    badgeIcon: '👑',
    perks: [
      'All VIP Sync Member perks',
      'Your name/logo listed as Official Sponsor on GitHub README & Plugin Docs',
      'Custom plugin feature request priority',
      'Private 45-min workflow & sync server consulting call',
    ],
    membersCount: 32,
  },
];

export const initialDevlogs: DevlogPost[] = [
  {
    id: 'post-1',
    title: 'VaultSync Pro v2.5.0 Released: Reconstructed Sync Protocol & Pipeline ⚡',
    slug: 'vault-sync-pro-v25-released',
    publishedAt: '2 days ago',
    category: 'Release',
    summary: 'Major performance overhaul! We reconstructed the synchronization protocol engine from scratch using streaming binary deltas. Sync latency dropped from 850ms to under 120ms.',
    content: `Hey everyone! Excited to announce that **VaultSync Pro v2.5.0** is officially live for Obsidian users!

### Key Improvements in v2.5.0:

1. **Streaming Delta Protocol**: Instead of transmitting entire modified note files, the client now computes diff chunk hashing. Note updates are sent as lightweight binary micro-deltas.
2. **Multi-Storage Backup Mirroring**: You can now configure simultaneous backup mirrors to AWS S3, Cloudflare R2, or local NAS while syncing to our high-speed relay nodes.
3. **Offline Auto-Merge Matrix**: Improved 3-way AST merge strategy for Obsidian canvas (.canvas) files and Markdown tables. Conflict prompts are virtually eliminated even when editing on mobile while offline!
4. **Improved Share Links**: Share specific rendered notes directly with temporary password-protected links.

Special thanks to all our **VIP Sync Members** and **Server Host Patrons** who helped test the beta build on our Tokyo relay node over the past two weeks!

Update directly inside your Obsidian Plugin Settings menu or grab the latest release on GitHub.`,
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1000&q=80',
    likes: 47,
    commentsCount: 14,
    tags: ['Obsidian', 'Sync', 'Release', 'Performance'],
  },
  {
    id: 'post-2',
    title: 'Custom Image Auto Uploader: Adding WebP / AVIF Compression & Cloudflare R2 Support 🖼️',
    slug: 'image-auto-uploader-avif-r2',
    publishedAt: '1 week ago',
    category: 'Update',
    summary: 'The latest update to our Image Auto Uploader plugin brings instant browser-side WebP/AVIF image compression before uploading to S3 or Cloudflare R2.',
    content: `When inserting screenshots or high-res photos into Obsidian notes, vault sizes can balloon rapidly.

With the new update:
- Images are automatically re-encoded to crisp **WebP** or **AVIF** format right inside Obsidian before uploading.
- Saves up to 80% bandwidth and storage space on your cloud bucket.
- Added native zero-egress fee **Cloudflare R2** preset alongside Alibaba Cloud OSS and AWS S3.

Try it out in the settings tab under *Compress & Transform*!`,
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1000&q=80',
    likes: 32,
    commentsCount: 8,
    tags: ['Obsidian', 'Images', 'Cloudflare', 'Plugin'],
  },
  {
    id: 'post-3',
    title: 'August Infrastructure & Server Bandwidth Report 🌐',
    slug: 'august-infrastructure-report',
    publishedAt: '2 weeks ago',
    category: 'Roadmap',
    summary: 'A transparent look at server traffic, sync node hardware upgrades, and where your coffee funding goes every month.',
    content: `Transparency is super important to me! Here is a breakdown of our current infrastructure stack funded by Ko-fi supporters:

- **Tokyo Relay Node (AWS EC2 c6g.large)**: $140/mo
- **Frankfurt Relay Node (Hetzner Dedicated)**: $95/mo
- **Redis Sync Queue & Global CDN**: $65/mo
- **S3 Cold Vault Backup Storage**: $85/mo
- **Domain & SSL Certificates**: $15/mo

Total monthly hosting cost is approximately **$400 - $450**. Thanks to our **348 supporters**, we are currently 87% funded for this month's hosting goal!

If you use VaultSync Pro daily, consider grabbing a coffee or joining a monthly tier to help keep our relay nodes blazing fast.`,
    likes: 65,
    commentsCount: 21,
    tags: ['Server', 'Infrastructure', 'OpenSource', 'Transparency'],
  },
];

export const initialGallery: GalleryItem[] = [
  {
    id: 'gal-1',
    title: 'VaultSync Pro - Realtime Multi-Device Sync Demo',
    description: 'Instant side-by-side note editing between macOS Obsidian and Android mobile app.',
    imageUrl: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=800&q=80',
    category: 'VaultSync Pro',
  },
  {
    id: 'gal-2',
    title: 'Custom Image Auto Uploader Settings Panel',
    description: 'Clean settings dashboard with S3, Cloudflare R2, MinIO, and OSS configuration options.',
    imageUrl: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=80',
    category: 'Image Uploader',
  },
  {
    id: 'gal-3',
    title: 'Sync Server Health & Protocol Dashboard',
    description: 'Real-time WebSocket connection monitoring and zero-knowledge encryption status.',
    imageUrl: 'https://images.unsplash.com/photo-1607799279861-4dd421887fb3?auto=format&fit=crop&w=800&q=80',
    category: 'Server Architecture',
  },
  {
    id: 'gal-4',
    title: 'Git Automation & Vault Auto-Backup',
    description: 'Automated background Git commits with conflict-free merge tree visualization.',
    imageUrl: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80',
    category: 'Git Backup',
  },
];
