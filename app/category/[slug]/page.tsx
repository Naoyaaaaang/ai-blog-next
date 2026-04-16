import Link from 'next/link'
import { getPostsBySource, SLUG_TO_SOURCE, SOURCE_SLUGS } from '@/lib/posts'
import { siteConfig } from '@/lib/site-config'
import { PostCard } from '@/components/PostCard'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'

type Props = { params: Promise<{ slug: string }> }

export async function generateStaticParams() {
  return Object.values(SOURCE_SLUGS).map(slug => ({ slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const source = SLUG_TO_SOURCE[slug]
  if (!source) return {}
  return { title: `${source}のニュース | ${siteConfig.siteName}` }
}

export default async function CategoryPage({ params }: Props) {
  const { slug } = await params
  const source = SLUG_TO_SOURCE[slug]
  if (!source) notFound()

  const posts = getPostsBySource(source)

  return (
    <main className="max-w-6xl mx-auto px-4 py-8">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-1 h-6 rounded" style={{ backgroundColor: 'var(--accent)' }}></div>
        <h2 className="text-lg font-bold" style={{ color: 'var(--text-primary)' }}>{source} のニュース</h2>
        <span className="text-sm" style={{ color: 'var(--text-secondary)' }}>（{posts.length}件）</span>
      </div>

      {posts.length === 0 ? (
        <div className="rounded-lg p-8 text-center text-sm" style={{ backgroundColor: 'var(--card-bg)', color: 'var(--text-secondary)' }}>
          まだ記事がありません
        </div>
      ) : (
        <div className="grid grid-cols-3 gap-4">
          {posts.map(post => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      )}

      <div className="mt-8">
        <Link
          href="/"
          className="text-sm transition-opacity hover:opacity-60"
          style={{ color: 'var(--text-secondary)' }}
        >
          ← トップに戻る
        </Link>
      </div>
    </main>
  )
}
