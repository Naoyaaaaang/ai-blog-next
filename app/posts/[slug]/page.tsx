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
  return { title: `${post.title} | AIニュース最前線` }
}

export default async function PostPage({ params }: Props) {
  const { slug } = await params
  const post = getPostBySlug(slug)
  if (!post) notFound()

  return (
    <main className="max-w-3xl mx-auto px-4 py-10">
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-4">
          <span className="text-xs bg-blue-50 text-blue-600 border border-blue-100 px-2 py-0.5 rounded">
            {post.source}
          </span>
          <time className="text-xs text-gray-400">
            {new Date(post.publishedAt).toLocaleDateString('ja-JP')}
          </time>
        </div>
        <h1 className="text-2xl font-bold text-gray-900 leading-snug mb-4">
          {post.title}
        </h1>
        {post.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-6">
            {post.tags.map(tag => (
              <span key={tag} className="text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded">
                #{tag}
              </span>
            ))}
          </div>
        )}
      </div>

      <div
        className="prose prose-gray max-w-none text-sm leading-relaxed"
        dangerouslySetInnerHTML={{ __html: post.content }}
      />

      <div className="mt-10 pt-6 border-t border-gray-100">
        <Link href="/" className="text-sm text-gray-400 hover:text-gray-600 transition-colors">
          ← 記事一覧に戻る
        </Link>
      </div>
    </main>
  )
}
