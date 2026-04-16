import fs from 'fs'
import path from 'path'
import { SOURCE_SLUGS, SLUG_TO_SOURCE } from './site-config'

export type Post = {
  slug: string
  title: string
  content: string
  imageUrl: string | null
  source: string
  sourceUrl: string
  publishedAt: string
  tags: string[]
}

const POSTS_DIR = path.join(process.cwd(), 'posts')
export const POSTS_PER_PAGE = 9

export { SOURCE_SLUGS, SLUG_TO_SOURCE }

export function getAllPosts(): Post[] {
  if (!fs.existsSync(POSTS_DIR)) return []
  const files = fs.readdirSync(POSTS_DIR)
    .filter(f => f.endsWith('.json'))
    .sort((a, b) => b.localeCompare(a))
  return files.map(f => {
    const raw = fs.readFileSync(path.join(POSTS_DIR, f), 'utf-8')
    return JSON.parse(raw) as Post
  })
}

export function getPostsByPage(page: number): { posts: Post[]; totalPages: number } {
  const all = getAllPosts()
  const totalPages = Math.max(1, Math.ceil(all.length / POSTS_PER_PAGE))
  const posts = all.slice((page - 1) * POSTS_PER_PAGE, page * POSTS_PER_PAGE)
  return { posts, totalPages }
}

export function getPostsBySource(source: string): Post[] {
  return getAllPosts().filter(p => p.source === source)
}

export function getPostBySlug(slug: string): Post | null {
  const filePath = path.join(POSTS_DIR, `${slug}.json`)
  if (!fs.existsSync(filePath)) return null
  const raw = fs.readFileSync(filePath, 'utf-8')
  return JSON.parse(raw) as Post
}
