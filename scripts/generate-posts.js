require('dotenv').config({ path: '.env.local' })

const Anthropic = require('@anthropic-ai/sdk')
const Parser = require('rss-parser')
const fs = require('fs')
const path = require('path')

const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })
const parser = new Parser()

const ARTICLES_PER_RUN = 3
const POSTS_DIR = path.join(__dirname, '..', 'posts')

const RSS_SOURCES = [
  { url: 'https://openai.com/blog/rss.xml', name: 'OpenAI' },
  { url: 'https://blog.google/technology/ai/rss/', name: 'Google AI' },
  { url: 'https://huggingface.co/blog/feed.xml', name: 'Hugging Face' },
  { url: 'https://techcrunch.com/category/artificial-intelligence/feed/', name: 'TechCrunch AI' },
  { url: 'https://venturebeat.com/category/ai/feed/', name: 'VentureBeat AI' },
]

function slugify(text) {
  const now = new Date()
  const date = now.toISOString().slice(0, 10).replace(/-/g, '')
  const time = now.getTime()
  return `${date}-${time}`
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
        content: `以下の海外AIニュースをもとに、日本語のブログ記事をHTMLで書いてください。

ソース: ${item.source}
タイトル: ${item.title}
概要: ${item.summary}
URL: ${item.link}

条件:
- h2タグで見出し（2〜3個）
- pタグで本文
- 最後に参照元リンク
- 600〜800字
- 専門用語をわかりやすく解説
- HTMLのみ出力（マークダウン不要）`,
      }],
    }),
    anthropic.messages.create({
      model: 'claude-haiku-4-5-20251001',
      max_tokens: 100,
      messages: [{
        role: 'user',
        content: `以下を日本語の魅力的なブログタイトルに変換。30文字以内。タイトルのみ出力。\n\n${item.title}`,
      }],
    }),
  ])

  const content = contentMsg.content[0].type === 'text' ? contentMsg.content[0].text : ''
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
        source: item.source,
        sourceUrl: item.link,
        publishedAt: new Date().toISOString(),
        tags: ['AI', 'テクノロジー', item.source],
      }

      fs.writeFileSync(
        path.join(POSTS_DIR, `${slug}.json`),
        JSON.stringify(post, null, 2),
        'utf-8'
      )
      console.log(`  ✅ 保存: ${slug}.json`)
      await new Promise(r => setTimeout(r, 1000))
    } catch (e) {
      console.error(`  ❌ エラー: ${e.message}`)
    }
  }

  console.log('\n🎉 完了！')
}

main().catch(console.error)
