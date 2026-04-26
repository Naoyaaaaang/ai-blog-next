const TAG_TO_KEYWORD = {
  'AI': 'technology',
  'テクノロジー': 'technology',
  '仮想通貨': 'cryptocurrency',
  'ビットコイン': 'bitcoin',
  'イーサリアム': 'ethereum',
  'ブロックチェーン': 'blockchain',
  '投資': 'investment',
  'NISA': 'finance',
  '株式': 'stock',
  '経済': 'economy',
  'AI画像': 'art',
  '画像生成': 'art',
  'ツール': 'software',
  '海外ツール': 'software',
  'スタートアップ': 'startup',
  'セキュリティ': 'security',
  'ロボット': 'robot',
  'ゲーム': 'gaming',
}

const SITE_DEFAULTS = {
  'ai-news': 'technology',
  'crypto-news': 'cryptocurrency',
  'nisa-blog': 'finance',
  'ai-image': 'art',
  'overseas-tools': 'software',
}

function getKeyword(tags, siteId) {
  const mapped = (tags || []).map(t => TAG_TO_KEYWORD[t]).filter(Boolean)
  return mapped[0] || SITE_DEFAULTS[siteId] || 'technology'
}

// slug から決定的なlock番号を生成して同一記事は常に同じ画像
function lockFromSlug(slug) {
  const digits = (slug || '').replace(/\D/g, '')
  return digits.length > 4 ? parseInt(digits.slice(-4)) : Math.floor(Math.random() * 1000)
}

function fetchUnsplashUrl(tags, siteId, slug) {
  const keyword = getKeyword(tags, siteId)
  const lock = lockFromSlug(slug)
  // loremflickr.com: 無料・API不要・キーワード対応・lock番号で画像固定
  return Promise.resolve(`https://loremflickr.com/1200/630/${keyword}?lock=${lock}`)
}

module.exports = { fetchUnsplashUrl }
