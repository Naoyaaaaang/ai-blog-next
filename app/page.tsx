import Link from 'next/link'
import { getAllPosts } from '@/lib/posts'

const SOURCE_COLORS: Record<string, string> = {
  'OpenAI': 'bg-emerald-500',
  'Google AI': 'bg-blue-500',
  'Hugging Face': 'bg-yellow-500',
  'TechCrunch AI': 'bg-green-600',
  'VentureBeat AI': 'bg-purple-500',
}

const SOURCE_BG: Record<string, string> = {
  'OpenAI': 'from-emerald-600 to-emerald-800',
  'Google AI': 'from-blue-600 to-blue-800',
  'Hugging Face': 'from-yellow-500 to-orange-600',
  'TechCrunch AI': 'from-green-600 to-green-800',
  'VentureBeat AI': 'from-purple-600 to-purple-800',
}

function PostCard({ post, large = false }: { post: any; large?: boolean }) {
  const bg = SOURCE_BG[post.source] ?? 'from-gray-600 to-gray-800'
  const dot = SOURCE_COLORS[post.source] ?? 'bg-gray-500'

  return (
    <Link href={`/posts/${post.slug}`} className="group block bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
      {/* サムネイル */}
      <div className={`bg-gradient-to-br ${bg} ${large ? 'h-48' : 'h-36'} flex items-end p-3`}>
        <span className="text-white text-xs font-bold opacity-70 uppercase tracking-wider">{post.source}</span>
      </div>
      {/* コンテンツ */}
      <div className="p-4">
        <div className="flex items-center gap-2 mb-2">
          <span className={`inline-block w-2 h-2 rounded-full ${dot}`}></span>
          <span className="text-xs text-[#3BB8D4] font-medium">{post.source}</span>
          <time className="text-xs text-gray-400 ml-auto">
            {new Date(post.publishedAt).toLocaleDateString('ja-JP', { year: 'numeric', month: '2-digit', day: '2-digit' })}
          </time>
        </div>
        <h2 className={`font-bold text-gray-900 group-hover:text-[#3BB8D4] transition-colors leading-snug ${large ? 'text-lg' : 'text-sm'} line-clamp-2`}>
          {post.title}
        </h2>
        {large && (
          <p className="mt-2 text-sm text-gray-500 line-clamp-2 leading-relaxed">
            {post.content.replace(/<[^>]+>/g, '').slice(0, 100)}...
          </p>
        )}
        <div className="mt-2 flex flex-wrap gap-1">
          {post.tags.slice(0, 2).map((tag: string) => (
            <span key={tag} className="text-xs bg-gray-100 text-gray-500 px-2 py-0.5 rounded">#{tag}</span>
          ))}
        </div>
      </div>
    </Link>
  )
}

export default function HomePage() {
  const posts = getAllPosts()
  const featuredPosts = posts.slice(0, 3)
  const recentPosts = posts.slice(3)
  const sidebarPosts = posts.slice(0, 5)

  return (
    <main className="max-w-6xl mx-auto px-4 py-8">
      <div className="flex gap-8">
        {/* メインコンテンツ */}
        <div className="flex-1 min-w-0">
          {/* 最新ニュース見出し */}
          <div className="flex items-center gap-3 mb-6">
            <div className="w-1 h-6 bg-[#3BB8D4] rounded"></div>
            <h2 className="text-lg font-bold text-gray-800">最新AIニュース</h2>
          </div>

          {posts.length === 0 ? (
            <p className="text-gray-400 text-sm bg-white rounded-lg p-8 text-center">記事を準備中です...</p>
          ) : (
            <>
              {/* TOP 3 グリッド */}
              <div className="grid grid-cols-3 gap-4 mb-8">
                {featuredPosts.map(post => (
                  <PostCard key={post.slug} post={post} large />
                ))}
              </div>

              {/* それ以降のリスト */}
              {recentPosts.length > 0 && (
                <>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-1 h-5 bg-gray-300 rounded"></div>
                    <h3 className="text-base font-bold text-gray-700">新着記事</h3>
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    {recentPosts.map(post => (
                      <PostCard key={post.slug} post={post} />
                    ))}
                  </div>
                </>
              )}
            </>
          )}
        </div>

        {/* サイドバー */}
        <aside className="w-64 shrink-0 hidden lg:block">
          {/* PVランキング */}
          <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-6">
            <div className="bg-[#253947] text-white px-4 py-3">
              <h3 className="text-sm font-bold">注目記事</h3>
            </div>
            <div className="divide-y divide-gray-100">
              {sidebarPosts.map((post, i) => (
                <Link key={post.slug} href={`/posts/${post.slug}`} className="flex gap-3 p-3 hover:bg-gray-50 transition-colors group">
                  <span className="text-2xl font-bold text-gray-200 leading-none w-6 shrink-0">{i + 1}</span>
                  <p className="text-xs text-gray-700 group-hover:text-[#3BB8D4] transition-colors leading-snug line-clamp-3">
                    {post.title}
                  </p>
                </Link>
              ))}
            </div>
          </div>

          {/* ソース一覧 */}
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="bg-[#253947] text-white px-4 py-3">
              <h3 className="text-sm font-bold">情報ソース</h3>
            </div>
            <div className="p-3 flex flex-col gap-2">
              {Object.entries(SOURCE_COLORS).map(([name, dot]) => (
                <div key={name} className="flex items-center gap-2 text-sm text-gray-600">
                  <span className={`w-2 h-2 rounded-full ${dot} shrink-0`}></span>
                  {name}
                </div>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </main>
  )
}
