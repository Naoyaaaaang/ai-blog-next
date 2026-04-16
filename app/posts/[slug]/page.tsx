import { getPostBySlug, getAllPosts } from '@/lib/posts'
import { siteConfig } from '@/lib/site-config'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import type { Metadata } from 'next'

type Props = { params: Promise<{ slug: string }> }

export async function generateStaticParams() {
  return getAllPosts().map(p => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const post = getPostBySlug(slug)
  if (!post) return {}
  const description = post.content.replace(/<[^>]+>/g, '').slice(0, 120)
  return {
    title: `${post.title} | ${siteConfig.siteName}`,
    description,
    openGraph: {
      title: post.title,
      description,
      type: 'article',
      publishedTime: post.publishedAt,
      tags: post.tags,
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description,
    },
  }
}

export default async function PostPage({ params }: Props) {
  const { slug } = await params
  const post = getPostBySlug(slug)
  if (!post) notFound()

  return (
    <main className="max-w-6xl mx-auto px-4 py-8">
      <div className="flex gap-8">
        {/* メインコンテンツ */}
        <article className="flex-1 min-w-0">
          <div className="rounded-lg shadow-sm overflow-hidden" style={{ backgroundColor: 'var(--card-bg)' }}>
            {/* ヘッダー画像エリア */}
            <div
              className="h-32 flex items-end p-6"
              style={{ background: `linear-gradient(135deg, var(--header-bg), color-mix(in srgb, var(--accent) 30%, var(--header-bg) 70%))` }}
            >
              <div className="flex flex-wrap gap-2">
                {post!.tags.map(tag => (
                  <span key={tag} className="text-xs bg-white/20 text-white px-2 py-0.5 rounded">
                    #{tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="p-6 md:p-8">
              {/* メタ情報 */}
              <div className="flex items-center gap-3 mb-4">
                <span
                  className="text-xs border px-3 py-1 rounded-full font-medium"
                  style={{ color: 'var(--accent)', borderColor: 'var(--accent)', backgroundColor: 'var(--tag-bg)' }}
                >
                  {post!.source}
                </span>
                <time className="text-xs" style={{ color: 'var(--text-secondary)' }}>
                  {new Date(post!.publishedAt).toLocaleDateString('ja-JP', { year: 'numeric', month: 'long', day: 'numeric' })}
                </time>
              </div>

              {/* タイトル */}
              <h1 className="text-2xl font-bold leading-snug mb-6" style={{ color: 'var(--text-primary)' }}>
                {post!.title}
              </h1>

              {/* 本文 */}
              <div
                className="article-body text-sm leading-relaxed max-w-none"
                dangerouslySetInnerHTML={{ __html: post!.content }}
              />
            </div>
          </div>

          <div className="mt-6">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-sm transition-opacity hover:opacity-70"
              style={{ color: 'var(--text-secondary)' }}
            >
              ← 記事一覧に戻る
            </Link>
          </div>
        </article>

        {/* サイドバー */}
        <aside className="w-64 shrink-0 hidden lg:block">
          <div className="rounded-lg shadow-sm overflow-hidden sidebar-widget" style={{ backgroundColor: 'var(--card-bg)' }}>
            <div className="text-white px-4 py-3" style={{ backgroundColor: 'var(--sidebar-header-bg)' }}>
              <h3 className="text-sm font-bold">新着記事</h3>
            </div>
            <div>
              {getAllPosts().slice(0, 6).map(p => (
                <Link
                  key={p.slug}
                  href={`/posts/${p.slug}`}
                  className={`block p-3 transition-colors group hover-item ${p.slug === slug ? 'opacity-50 pointer-events-none' : ''}`}
                  style={{ borderBottom: `1px solid var(--border)` }}
                >
                  <p className="text-xs leading-snug line-clamp-2 mb-1 group-hover:opacity-70 transition-opacity" style={{ color: 'var(--text-primary)' }}>
                    {p.title}
                  </p>
                  <time className="text-xs" style={{ color: 'var(--text-secondary)' }}>
                    {new Date(p.publishedAt).toLocaleDateString('ja-JP')}
                  </time>
                </Link>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </main>
  )
}
