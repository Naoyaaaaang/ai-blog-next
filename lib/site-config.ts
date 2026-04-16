export type SiteConfig = {
  siteId: string
  siteName: string
  siteNamePrefix: string
  siteNameSuffix: string
  tagline: string
  description: string
  baseUrl: string
  accentColor: string
  accentHover: string
  headerBg: string
  bgColor: string
  cardBg: string
  textPrimary: string
  textSecondary: string
  borderColor: string
  tagBg: string
  tagText: string
  categoryBarBg: string
  sidebarHeaderBg: string
  isDark: boolean
  categories: Array<{ name: string; slug: string }>
  tags: string[]
  categoryLabel: string
}

const configs: Record<string, SiteConfig> = {
  'ai-news': {
    siteId: 'ai-news',
    siteName: 'AIフラッシュ',
    siteNamePrefix: 'AI',
    siteNameSuffix: 'フラッシュ',
    tagline: '最新AIニュースを速報でお届け — OpenAI・Google・Anthropicの動向を毎日更新',
    description: 'OpenAI・Google・Anthropicなど最新AIニュースを速報形式で毎日お届けするテックメディア',
    baseUrl: 'https://ai-blog-next-eight.vercel.app',
    accentColor: '#0062FF',
    accentHover: '#0048CC',
    headerBg: '#040E1A',
    bgColor: '#EEF2F7',
    cardBg: '#FFFFFF',
    textPrimary: '#111827',
    textSecondary: '#6B7280',
    borderColor: '#DDE4ED',
    tagBg: '#EBF3FF',
    tagText: '#0062FF',
    categoryBarBg: '#FFFFFF',
    sidebarHeaderBg: '#040E1A',
    isDark: false,
    categories: [
      { name: 'OpenAI', slug: 'openai' },
      { name: 'Google AI', slug: 'google-ai' },
      { name: 'Hugging Face', slug: 'hugging-face' },
      { name: 'TechCrunch AI', slug: 'techcrunch-ai' },
      { name: 'VentureBeat AI', slug: 'venturebeat-ai' },
    ],
    tags: ['AI', 'テクノロジー'],
    categoryLabel: '最新AIニュース',
  },

  'crypto-news': {
    siteId: 'crypto-news',
    siteName: 'クリプトバーン',
    siteNamePrefix: 'クリプト',
    siteNameSuffix: 'バーン',
    tagline: 'Bitcoin・Ethereum・DeFi — 仮想通貨市場の熱狂をリアルタイムで',
    description: 'Bitcoin・Ethereum・アルトコインの最新ニュースをガチ勢目線で毎日お届けする仮想通貨メディア',
    baseUrl: 'https://ai-blog-crypto.vercel.app',
    accentColor: '#FF6B00',
    accentHover: '#E05C00',
    headerBg: '#03000D',
    bgColor: '#06001A',
    cardBg: '#100030',
    textPrimary: '#F0E6FF',
    textSecondary: '#9B8AB8',
    borderColor: 'rgba(255,107,0,0.25)',
    tagBg: 'rgba(255,107,0,0.15)',
    tagText: '#FF8C3A',
    categoryBarBg: '#0D0024',
    sidebarHeaderBg: '#03000D',
    isDark: true,
    categories: [
      { name: 'CoinDesk', slug: 'coindesk' },
      { name: 'CoinTelegraph', slug: 'cointelegraph' },
      { name: 'Decrypt', slug: 'decrypt' },
      { name: 'Bitcoin', slug: 'bitcoin' },
      { name: 'DeFi', slug: 'defi' },
    ],
    tags: ['仮想通貨', '暗号資産', 'ブロックチェーン'],
    categoryLabel: '最新仮想通貨ニュース',
  },

  'nisa-blog': {
    siteId: 'nisa-blog',
    siteName: 'かぶろぐ',
    siteNamePrefix: 'かぶ',
    siteNameSuffix: 'ろぐ',
    tagline: 'NISAと投資信託をわかりやすく — 資産づくりの第一歩をサポート',
    description: '新NISA・投資信託・株式の最新情報をFP目線でわかりやすく解説するブログ',
    baseUrl: 'https://ai-blog-nisa.vercel.app',
    accentColor: '#B8860B',
    accentHover: '#9A7009',
    headerBg: '#1B3A6B',
    bgColor: '#F7F5F0',
    cardBg: '#FFFFFF',
    textPrimary: '#1A1A2E',
    textSecondary: '#666B7A',
    borderColor: '#E6E0D4',
    tagBg: '#FBF3E0',
    tagText: '#8B6914',
    categoryBarBg: '#FFFFFF',
    sidebarHeaderBg: '#1B3A6B',
    isDark: false,
    categories: [
      { name: '新NISA', slug: 'nisa' },
      { name: '投資信託', slug: 'fund' },
      { name: '株式', slug: 'stock' },
      { name: 'ETF', slug: 'etf' },
      { name: '節税', slug: 'tax' },
    ],
    tags: ['NISA', '投資', '資産運用'],
    categoryLabel: '最新投資情報',
  },

  'ai-image': {
    siteId: 'ai-image',
    siteName: 'IMAGINE LAB',
    siteNamePrefix: 'IMAGINE',
    siteNameSuffix: ' LAB',
    tagline: 'Stable Diffusion・Midjourney・ComfyUI — クリエイターのためのAI画像生成最前線',
    description: 'Stable Diffusion・Midjourney・ComfyUIなどAI画像生成の最新情報をクリエイター目線で紹介',
    baseUrl: 'https://ai-blog-ai-image.vercel.app',
    accentColor: '#FF00AA',
    accentHover: '#CC0088',
    headerBg: '#03000D',
    bgColor: '#07001A',
    cardBg: '#130030',
    textPrimary: '#F5E6FF',
    textSecondary: '#B89CD0',
    borderColor: 'rgba(255,0,170,0.2)',
    tagBg: 'rgba(255,0,170,0.1)',
    tagText: '#FF55CC',
    categoryBarBg: '#0D0020',
    sidebarHeaderBg: '#03000D',
    isDark: true,
    categories: [
      { name: 'Stable Diffusion', slug: 'stable-diffusion' },
      { name: 'Midjourney', slug: 'midjourney' },
      { name: 'ComfyUI', slug: 'comfyui' },
      { name: 'FLUX', slug: 'flux' },
      { name: 'LoRA', slug: 'lora' },
    ],
    tags: ['AI画像生成', 'Stable Diffusion', 'ComfyUI'],
    categoryLabel: 'AI画像生成ニュース',
  },

  'overseas-tools': {
    siteId: 'overseas-tools',
    siteName: 'ツールハンター',
    siteNamePrefix: 'ツール',
    siteNameSuffix: 'ハンター',
    tagline: '世界の最前線ツールを日本語で — ProductHunt・SaaS・AI最新ツールを毎日発掘',
    description: '話題の海外SaaS・AIツールを日本語でわかりやすく紹介する発見系ブログ',
    baseUrl: 'https://ai-blog-overseas.vercel.app',
    accentColor: '#E63946',
    accentHover: '#C42D3A',
    headerBg: '#1D3557',
    bgColor: '#F4F6FA',
    cardBg: '#FFFFFF',
    textPrimary: '#1A1A2E',
    textSecondary: '#5C6680',
    borderColor: '#E0E4EF',
    tagBg: '#FFEEEF',
    tagText: '#C42D3A',
    categoryBarBg: '#FFFFFF',
    sidebarHeaderBg: '#1D3557',
    isDark: false,
    categories: [
      { name: 'ProductHunt', slug: 'producthunt' },
      { name: 'SaaS', slug: 'saas' },
      { name: 'AI Tools', slug: 'ai-tools' },
      { name: 'Dev Tools', slug: 'dev-tools' },
      { name: 'No-code', slug: 'no-code' },
    ],
    tags: ['海外ツール', 'SaaS', 'AIツール'],
    categoryLabel: '海外ツール最新情報',
  },
}

const SITE_ID = process.env.SITE_ID || 'ai-news'

export const siteConfig: SiteConfig = configs[SITE_ID] ?? configs['ai-news']

export const SOURCE_SLUGS: Record<string, string> = Object.fromEntries(
  siteConfig.categories.map(c => [c.name, c.slug])
)

export const SLUG_TO_SOURCE: Record<string, string> = Object.fromEntries(
  siteConfig.categories.map(c => [c.slug, c.name])
)
