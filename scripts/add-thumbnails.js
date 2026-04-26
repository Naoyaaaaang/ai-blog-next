const fs = require('fs')
const path = require('path')
const { fetchUnsplashUrl } = require('./image-helper')

const POSTS_DIR = path.join(__dirname, '..', 'posts')
const SITE_ID = process.env.SITE_ID || 'ai-news'
const DELAY_MS = 600

async function fetchOgImage(url) {
  try {
    const res = await fetch(url, {
      headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36', Accept: 'text/html' },
      signal: AbortSignal.timeout(10000),
    })
    if (!res.ok) return null
    const html = await res.text()
    const ogMatch = html.match(/<meta[^>]+property=["']og:image["'][^>]+content=["']([^"']+)["']/i)
      || html.match(/<meta[^>]+content=["']([^"']+)["'][^>]+property=["']og:image["']/i)
    if (ogMatch) return ogMatch[1]
    const twMatch = html.match(/<meta[^>]+name=["']twitter:image["'][^>]+content=["']([^"']+)["']/i)
      || html.match(/<meta[^>]+content=["']([^"']+)["'][^>]+name=["']twitter:image["']/i)
    if (twMatch) return twMatch[1]
    return null
  } catch {
    return null
  }
}

async function main() {
  const files = fs.readdirSync(POSTS_DIR).filter(f => f.endsWith('.json'))
  const targets = files.filter(f => {
    const post = JSON.parse(fs.readFileSync(path.join(POSTS_DIR, f), 'utf-8'))
    return post.imageUrl === null || post.imageUrl === undefined
  })

  console.log(`対象: ${targets.length}件`)
  let ogOk = 0, unsplashOk = 0

  for (let i = 0; i < targets.length; i++) {
    const file = targets[i]
    const filePath = path.join(POSTS_DIR, file)
    const post = JSON.parse(fs.readFileSync(filePath, 'utf-8'))

    process.stdout.write(`[${i + 1}/${targets.length}] ${post.title.slice(0, 35)}... `)

    let imgUrl = await fetchOgImage(post.sourceUrl)
    if (imgUrl) {
      console.log(`✅(OG) ${imgUrl.slice(0, 55)}`)
      ogOk++
    } else {
      imgUrl = await fetchUnsplashUrl(post.tags, SITE_ID, post.slug)
      console.log(`🖼(Unsplash) ${imgUrl.slice(0, 55)}`)
      unsplashOk++
    }

    post.imageUrl = imgUrl
    fs.writeFileSync(filePath, JSON.stringify(post, null, 2))

    if (i < targets.length - 1) await new Promise(r => setTimeout(r, DELAY_MS))
  }

  console.log(`\n完了: OG ${ogOk}件 / Unsplash ${unsplashOk}件`)
}

main().catch(console.error)
