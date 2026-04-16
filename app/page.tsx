import Link from 'next/link'
import { getPostsByPage, SOURCE_SLUGS } from '@/lib/posts'
import { siteConfig } from '@/lib/site-config'
import { PostCard } from '@/components/PostCard'

export default function HomePage() {
  const { posts, totalPages } = getPostsByPage(1)

  return (
    <main className="max-w-6xl mx-auto px-4 py-8">
      <div className="flex gap-8">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-1 h-6 bg-[#3BB8D4] rounded"></div>
            <h2 className="text-lg font-bold text-gray-800">{siteConfig.categoryLabel}</h2>
          </div>

          {posts.length === 0 ? (
            <p className="text-gray-400 text-sm bg-white rounded-lg p-8 text-center">記事を準備中です...</p>
          ) : (
            <>
              <div className="grid grid-cols-3 gap-4 mb-6">
                {posts.slice(0, 3).map(post => (
                  <PostCard key={post.slug} post={post} large />
                ))}
              </div>
              {posts.slice(3).length > 0 && (
                <div className="grid grid-cols-3 gap-4 mb-6">
                  {posts.slice(3).map(post => (
                    <PostCard key={post.slug} post={post} />
                  ))}
                </div>
              )}
              {totalPages > 1 && (
                <div className="flex justify-center mt-8">
                  <Link
                    href="/page/2"
                    className="px-6 py-2 bg-[#3BB8D4] text-white text-sm rounded-lg hover:bg-[#2da5bf] transition-colors"
                  >
                    次のページ →
                  </Link>
                </div>
              )}
            </>
          )}
        </div>

        <Sidebar />
      </div>
    </main>
  )
}

function Sidebar() {
  const { posts } = getPostsByPage(1)
  return (
    <aside className="w-64 shrink-0 hidden lg:block space-y-6">
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="bg-[#253947] text-white px-4 py-3">
          <h3 className="text-sm font-bold">注目記事</h3>
        </div>
        <div className="divide-y divide-gray-100">
          {posts.slice(0, 5).map((post, i) => (
            <Link key={post.slug} href={`/posts/${post.slug}`} className="flex gap-3 p-3 hover:bg-gray-50 transition-colors group">
              <span className="text-2xl font-bold text-gray-200 leading-none w-6 shrink-0">{i + 1}</span>
              <p className="text-xs text-gray-700 group-hover:text-[#3BB8D4] transition-colors leading-snug line-clamp-3">
                {post.title}
              </p>
            </Link>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="bg-[#253947] text-white px-4 py-3">
          <h3 className="text-sm font-bold">カテゴリー</h3>
        </div>
        <div className="p-3 flex flex-col gap-1">
          {Object.entries(SOURCE_SLUGS).map(([name, slug]) => (
            <Link
              key={slug}
              href={`/category/${slug}`}
              className="text-sm text-gray-600 hover:text-[#3BB8D4] hover:bg-gray-50 px-2 py-1.5 rounded transition-colors"
            >
              {name}
            </Link>
          ))}
        </div>
      </div>
    </aside>
  )
}
