import Link from 'next/link'
import { getPostsByPage, SOURCE_SLUGS } from '@/lib/posts'
import { siteConfig } from '@/lib/site-config'
import { PostCard } from '@/components/PostCard'

export default function HomePage() {
  const { posts, totalPages } = getPostsByPage(1)

  return (
    <main className="max-w-6xl mx-auto px-4 py-8">
      {/* ai-news: ニューステッカー */}
      {siteConfig.siteId === 'ai-news' && (
        <div className="mb-6 overflow-hidden rounded-sm flex items-center gap-0" style={{ backgroundColor: 'var(--card-bg)', border: `1px solid var(--border)` }}>
          <span className="shrink-0 text-xs font-mono font-bold px-3 py-2 text-white" style={{ backgroundColor: 'var(--accent)' }}>
            LATEST
          </span>
          <div className="overflow-hidden flex-1 py-2">
            <div className="news-ticker text-xs font-mono whitespace-nowrap" style={{ color: 'var(--text-secondary)' }}>
              {posts.slice(0, 5).map(p => p.title).join('　　　◆　　　')}
            </div>
          </div>
        </div>
      )}

      {/* crypto-news: マーケットヘッダー */}
      {siteConfig.siteId === 'crypto-news' && (
        <div className="mb-6 rounded overflow-hidden flex items-stretch" style={{ border: `1px solid var(--border)` }}>
          {['BTC', 'ETH', 'SOL', 'BNB'].map((coin, i) => (
            <div key={coin} className="flex-1 px-4 py-3 text-center" style={{ backgroundColor: 'var(--card-bg)', borderRight: i < 3 ? `1px solid var(--border)` : 'none' }}>
              <div className="text-xs font-mono font-bold" style={{ color: 'var(--accent)' }}>{coin}</div>
              <div className="text-xs font-mono mt-0.5" style={{ color: 'var(--text-secondary)' }}>LIVE</div>
            </div>
          ))}
        </div>
      )}

      <div className="flex gap-8">
        <div className="flex-1 min-w-0">

          {/* セクションヘッダー */}
          <div className="flex items-center gap-3 mb-5">
            <div className="w-1 h-6 rounded" style={{ backgroundColor: 'var(--accent)' }}></div>
            <h2 className="text-lg font-bold" style={{ color: 'var(--text-primary)' }}>{siteConfig.categoryLabel}</h2>
            {siteConfig.siteId === 'crypto-news' && (
              <span className="flex items-center gap-1 text-xs font-mono ml-2">
                <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: 'var(--accent)' }}></span>
                <span style={{ color: 'var(--accent)' }}>LIVE</span>
              </span>
            )}
          </div>

          {posts.length === 0 ? (
            <p className="text-sm rounded-lg p-8 text-center" style={{ backgroundColor: 'var(--card-bg)', color: 'var(--text-secondary)' }}>
              記事を準備中です...
            </p>
          ) : (
            <PostsGrid posts={posts} totalPages={totalPages} />
          )}
        </div>

        <Sidebar />
      </div>
    </main>
  )
}

function PostsGrid({ posts, totalPages }: { posts: ReturnType<typeof getPostsByPage>['posts']; totalPages: number }) {
  const siteId = siteConfig.siteId

  const paginationEl = totalPages > 1 && (
    <div className="flex justify-center mt-8">
      <Link
        href="/page/2"
        className="px-6 py-2 text-white text-sm rounded-lg transition-opacity hover:opacity-80"
        style={{ backgroundColor: 'var(--accent)' }}
      >
        次のページ →
      </Link>
    </div>
  )

  // ── ai-news: バナー1枚 + コンパクトリスト ──
  if (siteId === 'ai-news') {
    return (
      <>
        <div className="mb-3">
          <PostCard post={posts[0]} large={true} />
        </div>
        <div className="flex flex-col gap-2">
          {posts.slice(1).map(post => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
        {paginationEl}
      </>
    )
  }

  // ── crypto-news: 2カラムグリッド ──
  if (siteId === 'crypto-news') {
    return (
      <>
        <div className="grid grid-cols-2 gap-5 mb-6">
          {posts.slice(0, 2).map(post => (
            <PostCard key={post.slug} post={post} large />
          ))}
        </div>
        <div className="grid grid-cols-2 gap-5">
          {posts.slice(2).map(post => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
        {paginationEl}
      </>
    )
  }

  // ── nisa-blog: フィーチャー1枚 + 2カラムグリッド ──
  if (siteId === 'nisa-blog') {
    return (
      <>
        <div className="mb-6">
          <PostCard post={posts[0]} large={true} />
        </div>
        <div className="grid grid-cols-2 gap-6">
          {posts.slice(1).map(post => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
        {paginationEl}
      </>
    )
  }

  // ── ai-image: マソンリーギャラリー ──
  if (siteId === 'ai-image') {
    return (
      <>
        <div className="posts-masonry">
          {posts.map((post, i) => (
            <div key={post.slug} className="posts-masonry-item">
              <PostCard post={post} large={i === 0 || i === 3} />
            </div>
          ))}
        </div>
        {paginationEl}
      </>
    )
  }

  // ── overseas-tools: 横カードリスト ──
  if (siteId === 'overseas-tools') {
    return (
      <>
        <div className="flex flex-col gap-4">
          {posts.slice(0, 2).map(post => (
            <PostCard key={post.slug} post={post} large />
          ))}
          {posts.slice(2).map(post => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
        {paginationEl}
      </>
    )
  }

  // ── default: 3カラムグリッド ──
  return (
    <>
      <div className="grid grid-cols-3 gap-4 mb-6">
        {posts.slice(0, 3).map(post => (
          <PostCard key={post.slug} post={post} large />
        ))}
      </div>
      {posts.slice(3).length > 0 && (
        <div className="grid grid-cols-3 gap-4">
          {posts.slice(3).map(post => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      )}
      {paginationEl}
    </>
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
