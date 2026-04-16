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
            <div className="w-1 h-6 rounded" style={{ backgroundColor: 'var(--accent)' }}></div>
            <h2 className="text-lg font-bold" style={{ color: 'var(--text-primary)' }}>{siteConfig.categoryLabel}</h2>
          </div>

          {posts.length === 0 ? (
            <p className="text-sm rounded-lg p-8 text-center" style={{ backgroundColor: 'var(--card-bg)', color: 'var(--text-secondary)' }}>
              記事を準備中です...
            </p>
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
                    className="px-6 py-2 text-white text-sm rounded-lg transition-opacity hover:opacity-80"
                    style={{ backgroundColor: 'var(--accent)' }}
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
      <div className="rounded-lg shadow-sm overflow-hidden sidebar-widget" style={{ backgroundColor: 'var(--card-bg)' }}>
        <div className="text-white px-4 py-3" style={{ backgroundColor: 'var(--sidebar-header-bg)' }}>
          <h3 className="text-sm font-bold">注目記事</h3>
        </div>
        <div>
          {posts.slice(0, 5).map((post, i) => (
            <Link
              key={post.slug}
              href={`/posts/${post.slug}`}
              className="flex gap-3 p-3 transition-colors group hover-item"
              style={{ borderBottom: `1px solid var(--border)` }}
            >
              <span className="text-2xl font-bold leading-none w-6 shrink-0 opacity-20" style={{ color: 'var(--text-primary)' }}>{i + 1}</span>
              <p className="text-xs leading-snug line-clamp-3 group-hover:opacity-70 transition-opacity" style={{ color: 'var(--text-primary)' }}>
                {post.title}
              </p>
            </Link>
          ))}
        </div>
      </div>

      <div className="rounded-lg shadow-sm overflow-hidden sidebar-widget" style={{ backgroundColor: 'var(--card-bg)' }}>
        <div className="text-white px-4 py-3" style={{ backgroundColor: 'var(--sidebar-header-bg)' }}>
          <h3 className="text-sm font-bold">カテゴリー</h3>
        </div>
        <div className="p-3 flex flex-col gap-1">
          {Object.entries(SOURCE_SLUGS).map(([name, slug]) => (
            <Link
              key={slug}
              href={`/category/${slug}`}
              className="text-sm px-2 py-1.5 rounded transition-opacity hover:opacity-60 hover-item"
              style={{ color: 'var(--text-primary)' }}
            >
              {name}
            </Link>
          ))}
        </div>
      </div>
    </aside>
  )
}
