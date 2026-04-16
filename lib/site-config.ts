export type SiteConfig = {
  siteId: string
  siteName: string
  siteNamePrefix: string  // サイト名の強調部分（先頭）
  siteNameSuffix: string  // サイト名の残り部分
  tagline: string
  description: string
  baseUrl: string
  accentColor: string
  headerBg: string
  categories: Array<{ name: string; slug: string }>
  tags: string[]
  categoryLabel: string
}

const configs: Record<string, SiteConfig> = {
  'ai-news': {
    siteId: 'ai-news',
    siteName: 'AIニュース最前線',
    siteNamePrefix: 'AI',
    siteNameSuffix: 'ニュース最前線',
    tagline: 'OpenAI・Google・Anthropicなど最新のAIツール・機能情報を毎日お届け',
    description: 'OpenAI・Google・Anthropicなど最新のAIツール・機能情報を毎日お届けするブログ',
    baseUrl: 'https://ai-blog-next-eight.vercel.app',
    accentColor: '#3BB8D4',
    headerBg: '#253947',
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
    siteName: '仮想通貨最新情報',
    siteNamePrefix: '仮想通貨',
    siteNameSuffix: '最新情報',
    tagline: 'Bitcoin・Ethereum・アルトコインの最新ニュースを毎日お届け',
    description: 'Bitcoin・Ethereum・アルトコインの最新仮想通貨ニュースを毎日お届けするブログ',
    baseUrl: 'https://crypto-news-blog-next.vercel.app',
    accentColor: '#F7931A',
    headerBg: '#1a1a2e',
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
    siteName: 'NISA・投資情報まとめ',
    siteNamePrefix: 'NISA',
    siteNameSuffix: '・投資情報まとめ',
    tagline: '新NISA・投資信託・株式の最新情報をわかりやすく解説',
    description: '新NISA・投資信託・株式の最新情報をわかりやすく解説するブログ',
    baseUrl: 'https://nisa-blog-next.vercel.app',
    accentColor: '#2E7D32',
    headerBg: '#1B5E20',
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
    siteName: 'AI画像生成まとめ',
    siteNamePrefix: 'AI',
    siteNameSuffix: '画像生成まとめ',
    tagline: 'Stable Diffusion・Midjourney・ComfyUIの最新情報を毎日お届け',
    description: 'Stable Diffusion・Midjourney・ComfyUIなどAI画像生成の最新情報ブログ',
    baseUrl: 'https://ai-image-blog-next.vercel.app',
    accentColor: '#9C27B0',
    headerBg: '#4A148C',
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
    siteName: '海外ツール最新情報',
    siteNamePrefix: '海外ツール',
    siteNameSuffix: '最新情報',
    tagline: '話題の海外SaaS・AIツールを日本語でわかりやすく紹介',
    description: '話題の海外SaaS・AIツールを日本語でわかりやすく紹介するブログ',
    baseUrl: 'https://overseas-tools-blog-next.vercel.app',
    accentColor: '#FF5722',
    headerBg: '#BF360C',
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
