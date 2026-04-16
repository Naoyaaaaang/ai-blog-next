import Link from 'next/link'
import { getPostsByPage, getAllPosts, POSTS_PER_PAGE } from '@/lib/posts'
import { siteConfig } from '@/lib/site-config'
import { PostCard } from '@/components/PostCard'
import type { Metadata } from 'next'

type Props = { params: Promise<{ page: string }> }

export async function generateStaticParams() {
  const total = getAllPosts().length
  const totalPages = Math.max(1, Math.ceil(total / POSTS_PER_PAGE))
  return Array.from({ length: totalPages - 1 }, (_, i) => ({ page: String(i + 2) }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { page } = await params
  return { title: `記事一覧（${page}ページ目） | ${siteConfig.siteName}` }
}

export default async function PagedListPage({ params }: Props) {
  const { page } = await params
  const pageNum = Number(page)
  const { posts, totalPages } = getPostsByPage(pageNum)

  return (
    <main className="max-w-6xl mx-auto px-4 py-8">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-1 h-6 rounded" style={{ backgroundColor: 'var(--accent)' }}></div>
        <h2 className="text-lg font-bold" style={{ color: 'var(--text-primary)' }}>記事一覧（{pageNum}ページ目）</h2>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-8">
        {posts.map(post => (
          <PostCard key={post.slug} post={post} />
        ))}
      </div>

      {/* ページネーション */}
      <div className="flex justify-center items-center gap-4">
        {pageNum > 1 && (
          <Link
            href={pageNum === 2 ? '/' : `/page/${pageNum - 1}`}
            className="px-5 py-2 border text-sm rounded-lg transition-opacity hover:opacity-70"
            style={{ borderColor: 'var(--border)', color: 'var(--text-primary)' }}
          >
            ← 前のページ
          </Link>
        )}
        <span className="text-sm" style={{ color: 'var(--text-secondary)' }}>{pageNum} / {totalPages}</span>
        {pageNum < totalPages && (
          <Link
            href={`/page/${pageNum + 1}`}
            className="px-5 py-2 text-white text-sm rounded-lg transition-opacity hover:opacity-80"
            style={{ backgroundColor: 'var(--accent)' }}
          >
            次のページ →
          </Link>
        )}
      </div>
    </main>
  )
}
