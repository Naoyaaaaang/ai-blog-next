import { getPostBySlug, getAllPosts } from '@/lib/posts'
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
    title: `${post.title} | AIニュース最前線`,
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
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            {/* ヘッダー画像エリア */}
            <div className="bg-gradient-to-br from-[#253947] to-[#1a2a35] h-32 flex items-end p-6">
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
                <span className="text-xs bg-[#3BB8D4]/10 text-[#3BB8D4] border border-[#3BB8D4]/20 px-3 py-1 rounded-full font-medium">
                  {post!.source}
                </span>
                <time className="text-xs text-gray-400">
                  {new Date(post!.publishedAt).toLocaleDateString('ja-JP', { year: 'numeric', month: 'long', day: 'numeric' })}
                </time>
              </div>

              {/* タイトル */}
              <h1 className="text-2xl font-bold text-gray-900 leading-snug mb-6">
                {post!.title}
              </h1>

              {/* 本文 */}
              <div
                className="prose prose-gray max-w-none text-sm leading-relaxed
                  [&_h2]:text-lg [&_h2]:font-bold [&_h2]:text-gray-800 [&_h2]:mt-8 [&_h2]:mb-3
                  [&_h2]:border-l-4 [&_h2]:border-[#3BB8D4] [&_h2]:pl-3
                  [&_p]:text-gray-700 [&_p]:mb-4 [&_p]:leading-relaxed
                  [&_a]:text-[#3BB8D4] [&_a]:underline"
                dangerouslySetInnerHTML={{ __html: post!.content }}
              />
            </div>
          </div>

          <div className="mt-6">
            <Link href="/" className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-[#3BB8D4] transition-colors">
              ← 記事一覧に戻る
            </Link>
          </div>
        </article>

        {/* サイドバー */}
        <aside className="w-64 shrink-0 hidden lg:block">
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="bg-[#253947] text-white px-4 py-3">
              <h3 className="text-sm font-bold">新着記事</h3>
            </div>
            <div className="divide-y divide-gray-100">
              {getAllPosts().slice(0, 6).map(p => (
                <Link
                  key={p.slug}
                  href={`/posts/${p.slug}`}
                  className={`block p-3 hover:bg-gray-50 transition-colors group ${p.slug === slug ? 'bg-blue-50' : ''}`}
                >
                  <p className="text-xs text-gray-700 group-hover:text-[#3BB8D4] transition-colors leading-snug line-clamp-2 mb-1">
                    {p.title}
                  </p>
                  <time className="text-xs text-gray-400">
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
