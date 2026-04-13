import fs from 'fs'
import path from 'path'

export type Post = {
  slug: string
  title: string
  content: string
  source: string
  sourceUrl: string
  publishedAt: string
  tags: string[]
}

const POSTS_DIR = path.join(process.cwd(), 'posts')

export function getAllPosts(): Post[] {
  if (!fs.existsSync(POSTS_DIR)) return []
  const files = fs.readdirSync(POSTS_DIR)
    .filter(f => f.endsWith('.json'))
    .sort((a, b) => b.localeCompare(a)) // 新しい順
  return files.map(f => {
    const raw = fs.readFileSync(path.join(POSTS_DIR, f), 'utf-8')
    return JSON.parse(raw) as Post
  })
}

export function getPostBySlug(slug: string): Post | null {
  const filePath = path.join(POSTS_DIR, `${slug}.json`)
  if (!fs.existsSync(filePath)) return null
  const raw = fs.readFileSync(filePath, 'utf-8')
  return JSON.parse(raw) as Post
}
