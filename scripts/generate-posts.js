require('dotenv').config({ path: '.env.local' })

const Anthropic = require('@anthropic-ai/sdk')
const Parser = require('rss-parser')
const fs = require('fs')
const path = require('path')
const siteConfigs = require('./site-configs')

const SITE_ID = process.env.SITE_ID || 'ai-news'
const siteConfig = siteConfigs[SITE_ID]
if (!siteConfig) {
  console.error(`❌ Unknown SITE_ID: "${SITE_ID}". Available: ${Object.keys(siteConfigs).join(', ')}`)
  process.exit(1)
}
console.log(`📌 サイト: ${SITE_ID}`)

const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })
const parser = new Parser({
  customFields: {
    item: [
      ['media:content', 'mediaContent', { keepArray: false }],
      ['media:thumbnail', 'mediaThumbnail', { keepArray: false }],
      ['enclosure', 'enclosure', { keepArray: false }],
    ],
  },
})

const ARTICLES_PER_RUN = 3
const POSTS_DIR = path.join(__dirname, '..', 'posts')

const RSS_SOURCES = siteConfig.rssSources

function slugify(text) {
  const now = new Date()
  const date = now.toISOString().slice(0, 10).replace(/-/g, '')
  const time = now.getTime()
  return `${date}-${time}`
}

function extractImageUrl(item) {
  // media:content
  if (item.mediaContent && item.mediaContent.$ && item.mediaContent.$.url) {
    return item.mediaContent.$.url
  }
  // media:thumbnail
  if (item.mediaThumbnail && item.mediaThumbnail.$ && item.mediaThumbnail.$.url) {
    return item.mediaThumbnail.$.url
  }
  // enclosure（画像のみ）
  if (item.enclosure && item.enclosure.type && item.enclosure.type.startsWith('image/')) {
    return item.enclosure.url
  }
  // content内の最初のimgタグ
  const content = item.content || item['content:encoded'] || ''
  const match = content.match(/<img[^>]+src=["']([^"']+)["']/i)
  if (match) return match[1]

  return null
}

function stripCodeFences(text) {
  return text
    .replace(/^```[\w]*\r?\n?/, '')  // 先頭の```を除去
    .replace(/\r?\n?```\s*$/, '')    // 末尾の```を除去
    .trim()
}

async function fetchRecentItems() {
  const allItems = []
  for (const source of RSS_SOURCES) {
    try {
      const feed = await parser.parseURL(source.url)
      const recent = feed.items.slice(0, 5).map(item => ({
        title: item.title,
        summary: item.contentSnippet || item.content || '',
        link: item.link,
        source: source.name,
        imageUrl: extractImageUrl(item),
      }))
      allItems.push(...recent)
    } catch (e) {
      console.log(`⚠ ${source.name} 取得失敗: ${e.message}`)
    }
  }
  allItems.sort(() => Math.random() - 0.5)
  return allItems.slice(0, ARTICLES_PER_RUN)
}

async function generateArticle(item) {
  const [contentMsg, titleMsg] = await Promise.all([
    anthropic.messages.create({
      model: 'claude-haiku-4-5-20251001',
      max_tokens: 1500,
      messages: [{
        role: 'user',
        content: siteConfig.contentPrompt(item),
      }],
    }),
    anthropic.messages.create({
      model: 'claude-haiku-4-5-20251001',
      max_tokens: 100,
      messages: [{
        role: 'user',
        content: siteConfig.titlePrompt(item.title),
      }],
    }),
  ])

  const rawContent = contentMsg.content[0].type === 'text' ? contentMsg.content[0].text : ''
  const content = stripCodeFences(rawContent)
  const title = titleMsg.content[0].type === 'text' ? titleMsg.content[0].text.trim() : item.title

  return { title, content }
}

async function main() {
  if (!fs.existsSync(POSTS_DIR)) fs.mkdirSync(POSTS_DIR, { recursive: true })

  console.log('🚀 記事生成開始')
  const items = await fetchRecentItems()
  console.log(`✅ ${items.length}件取得`)

  for (let i = 0; i < items.length; i++) {
    const item = items[i]
    console.log(`\n[${i + 1}/${items.length}] 生成中: ${item.title}`)

    try {
      const { title, content } = await generateArticle(item)
      const slug = slugify(title)
      const post = {
        slug,
        title,
        content,
        imageUrl: item.imageUrl || null,
        source: item.source,
        sourceUrl: item.link,
        publishedAt: new Date().toISOString(),
        tags: siteConfig.tags(item.source),
      }

      fs.writeFileSync(
        path.join(POSTS_DIR, `${slug}.json`),
        JSON.stringify(post, null, 2),
        'utf-8'
      )
      console.log(`  ✅ 保存: ${slug}.json (画像: ${item.imageUrl ? 'あり' : 'なし'})`)
      await new Promise(r => setTimeout(r, 1000))
    } catch (e) {
      console.error(`  ❌ エラー: ${e.message}`)
    }
  }

  console.log('\n🎉 完了！')
}

main().then(() => process.exit(0)).catch(e => { console.error(e); process.exit(1) })
