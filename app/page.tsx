import Link from 'next/link'
import { getAllPosts } from '@/lib/posts'

export default function HomePage() {
  const posts = getAllPosts()

  return (
    <main className="max-w-3xl mx-auto px-4 py-10">
      <div className="mb-10">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">AIニュース最前線</h1>
        <p className="text-gray-500 text-sm">OpenAI・Google・Anthropicなど最新のAI情報を毎日お届け</p>
      </div>

      {posts.length === 0 ? (
        <p className="text-gray-400 text-sm">記事を準備中です...</p>
      ) : (
        <div className="divide-y divide-gray-100">
          {posts.map((post) => (
            <article key={post.slug} className="py-6">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs bg-blue-50 text-blue-600 border border-blue-100 px-2 py-0.5 rounded">
                  {post.source}
                </span>
                <time className="text-xs text-gray-400">
                  {new Date(post.publishedAt).toLocaleDateString('ja-JP')}
                </time>
              </div>
              <h2 className="text-lg font-bold text-gray-900 mb-2 hover:text-blue-600 transition-colors">
                <Link href={`/posts/${post.slug}`}>{post.title}</Link>
              </h2>
              <div
                className="text-sm text-gray-600 line-clamp-3 leading-relaxed"
                dangerouslySetInnerHTML={{ __html: post.content.slice(0, 300) }}
              />
              <Link
                href={`/posts/${post.slug}`}
                className="inline-block mt-3 text-sm text-blue-600 hover:underline font-medium"
              >
                続きを読む →
              </Link>
            </article>
          ))}
        </div>
      )}
    </main>
  )
}
