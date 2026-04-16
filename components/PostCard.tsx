import Link from 'next/link'
import Image from 'next/image'
import type { Post } from '@/lib/posts'
import { siteConfig } from '@/lib/site-config'

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('ja-JP', { month: '2-digit', day: '2-digit' })
}

function formatDateTime(dateStr: string) {
  const d = new Date(dateStr)
  return `${d.getMonth() + 1}/${d.getDate()} ${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`
}

function Excerpt({ content }: { content: string }) {
  return <>{content.replace(/<[^>]+>/g, '').slice(0, 80)}...</>
}

function PlaceholderBg({ source }: { source: string }) {
  return (
    <div
      className="w-full h-full flex items-end p-3"
      style={{ background: `linear-gradient(135deg, var(--sidebar-header-bg), color-mix(in srgb, var(--accent) 50%, var(--sidebar-header-bg) 50%))` }}
    >
      <span className="text-white text-xs font-bold opacity-60 uppercase tracking-wider">{source}</span>
    </div>
  )
}

// ──────────────────────────────────────────────
// ai-news: ファーストビューは横長バナー、残りはコンパクト横カード
// ──────────────────────────────────────────────
function NewsBannerCard({ post }: { post: Post }) {
  return (
    <Link
      href={`/posts/${post.slug}`}
      className="post-card group flex h-56 rounded-sm overflow-hidden"
      style={{ backgroundColor: 'var(--card-bg)' }}
    >
      <div className="relative w-2/5 shrink-0 overflow-hidden">
        {post.imageUrl
          ? <Image src={post.imageUrl} alt={post.title} fill className="object-cover group-hover:scale-105 transition-transform duration-300" unoptimized />
          : <PlaceholderBg source={post.source} />
        }
      </div>
      <div className="flex-1 p-6 flex flex-col justify-center border-l-2" style={{ borderColor: 'var(--accent)' }}>
        <div className="flex items-center gap-2 mb-3">
          <span className="text-xs font-mono font-bold px-2 py-0.5 rounded-sm text-white" style={{ backgroundColor: 'var(--accent)' }}>
            BREAKING
          </span>
          <span className="text-xs font-mono uppercase" style={{ color: 'var(--accent)' }}>{post.source}</span>
          <time className="text-xs font-mono ml-auto" style={{ color: 'var(--text-secondary)' }}>{formatDateTime(post.publishedAt)}</time>
        </div>
        <h2 className="text-xl font-bold leading-snug mb-3 group-hover:opacity-70 transition-opacity" style={{ color: 'var(--text-primary)' }}>
          {post.title}
        </h2>
        <p className="text-sm line-clamp-2" style={{ color: 'var(--text-secondary)' }}>
          <Excerpt content={post.content} />
        </p>
      </div>
    </Link>
  )
}

function NewsCard({ post }: { post: Post }) {
  return (
    <Link
      href={`/posts/${post.slug}`}
      className="post-card group flex gap-3 rounded-sm overflow-hidden p-3"
      style={{ backgroundColor: 'var(--card-bg)' }}
    >
      <div className="relative w-24 h-20 shrink-0 overflow-hidden rounded-sm">
        {post.imageUrl
          ? <Image src={post.imageUrl} alt={post.title} fill className="object-cover group-hover:scale-105 transition-transform duration-300" unoptimized />
          : <PlaceholderBg source={post.source} />
        }
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-xs font-mono uppercase font-bold" style={{ color: 'var(--accent)' }}>{post.source}</span>
          <time className="text-xs font-mono ml-auto shrink-0" style={{ color: 'var(--text-secondary)' }}>{formatDateTime(post.publishedAt)}</time>
        </div>
        <h2 className="text-sm font-bold leading-snug line-clamp-2 group-hover:opacity-70 transition-opacity" style={{ color: 'var(--text-primary)' }}>
          {post.title}
        </h2>
        <div className="mt-1.5 flex gap-1">
          {post.tags.slice(0, 2).map(tag => (
            <span key={tag} className="text-xs px-1.5 py-0.5 rounded-sm" style={{ backgroundColor: 'var(--tag-bg)', color: 'var(--tag-text)' }}>
              {tag}
            </span>
          ))}
        </div>
      </div>
    </Link>
  )
}

// ──────────────────────────────────────────────
// crypto-news: LIVE バッジ付きダークカード
// ──────────────────────────────────────────────
function CryptoCard({ post, large }: { post: Post; large: boolean }) {
  return (
    <Link
      href={`/posts/${post.slug}`}
      className="post-card group block rounded overflow-hidden"
      style={{ backgroundColor: 'var(--card-bg)' }}
    >
      <div className={`relative ${large ? 'h-52' : 'h-40'} overflow-hidden`}>
        {post.imageUrl
          ? <Image src={post.imageUrl} alt={post.title} fill className="object-cover group-hover:scale-105 transition-transform duration-300" unoptimized />
          : <PlaceholderBg source={post.source} />
        }
        <div className="absolute top-3 left-3 flex items-center gap-1.5 px-2 py-1 rounded" style={{ backgroundColor: 'rgba(0,0,0,0.72)' }}>
          <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: 'var(--accent)' }}></span>
          <span className="text-xs font-mono uppercase font-bold" style={{ color: 'var(--accent)' }}>{post.source}</span>
        </div>
      </div>
      <div className="p-4">
        <h2 className={`font-bold leading-snug group-hover:opacity-70 transition-opacity line-clamp-2 ${large ? 'text-base' : 'text-sm'}`} style={{ color: 'var(--text-primary)' }}>
          {post.title}
        </h2>
        {large && (
          <p className="mt-2 text-xs line-clamp-2" style={{ color: 'var(--text-secondary)' }}>
            <Excerpt content={post.content} />
          </p>
        )}
        <div className="mt-3 flex items-center justify-between">
          <div className="flex gap-1">
            {post.tags.slice(0, 2).map(tag => (
              <span key={tag} className="text-xs px-2 py-0.5 rounded-sm" style={{ backgroundColor: 'var(--tag-bg)', color: 'var(--tag-text)' }}>
                #{tag}
              </span>
            ))}
          </div>
          <time className="text-xs font-mono" style={{ color: 'var(--text-secondary)' }}>{formatDate(post.publishedAt)}</time>
        </div>
      </div>
    </Link>
  )
}

// ──────────────────────────────────────────────
// nisa-blog: FP解説バッジ＋読書時間＋ゴールド上ボーダー
// ──────────────────────────────────────────────
function FinanceCard({ post, large }: { post: Post; large: boolean }) {
  return (
    <Link
      href={`/posts/${post.slug}`}
      className="post-card group block rounded-xl overflow-hidden"
      style={{ backgroundColor: 'var(--card-bg)' }}
    >
      <div className={`relative ${large ? 'h-44' : 'h-32'} overflow-hidden`}>
        {post.imageUrl
          ? <Image src={post.imageUrl} alt={post.title} fill className="object-cover group-hover:scale-105 transition-transform duration-300" unoptimized />
          : <PlaceholderBg source={post.source} />
        }
        <div className="absolute top-3 right-3">
          <span className="text-xs px-2 py-1 rounded font-medium text-white" style={{ backgroundColor: 'var(--accent)' }}>
            FP解説
          </span>
        </div>
      </div>
      <div className="p-4">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-xs font-medium" style={{ color: 'var(--accent)' }}>{post.source}</span>
          <span className="text-xs" style={{ color: 'var(--text-secondary)' }}>• 約3分</span>
          <time className="text-xs ml-auto" style={{ color: 'var(--text-secondary)' }}>{formatDate(post.publishedAt)}</time>
        </div>
        <h2 className={`font-bold leading-snug line-clamp-2 group-hover:opacity-70 transition-opacity ${large ? 'text-lg' : 'text-sm'}`} style={{ color: 'var(--text-primary)' }}>
          {post.title}
        </h2>
        {large && (
          <p className="mt-2 text-sm line-clamp-2" style={{ color: 'var(--text-secondary)' }}>
            <Excerpt content={post.content} />
          </p>
        )}
        <div className="mt-3 flex items-center justify-between">
          <div className="flex gap-1">
            {post.tags.slice(0, 2).map(tag => (
              <span key={tag} className="text-xs px-2 py-0.5 rounded" style={{ backgroundColor: 'var(--tag-bg)', color: 'var(--tag-text)' }}>
                #{tag}
              </span>
            ))}
          </div>
          <span className="text-xs font-medium" style={{ color: 'var(--accent)' }}>詳しく読む →</span>
        </div>
      </div>
    </Link>
  )
}

// ──────────────────────────────────────────────
// ai-image: 画像全面＋グラデーションオーバーレイ＋テキストオーバーレイ
// ──────────────────────────────────────────────
function GalleryCard({ post, large }: { post: Post; large: boolean }) {
  return (
    <Link
      href={`/posts/${post.slug}`}
      className="post-card group block rounded-lg overflow-hidden relative"
      style={{ aspectRatio: large ? '16/10' : '4/5' }}
    >
      {post.imageUrl
        ? <Image src={post.imageUrl} alt={post.title} fill className="object-cover group-hover:scale-110 transition-transform duration-500" unoptimized />
        : <div className="absolute inset-0" style={{ background: `linear-gradient(135deg, var(--sidebar-header-bg) 0%, color-mix(in srgb, var(--accent) 70%, var(--sidebar-header-bg) 30%) 100%)` }} />
      }
      {/* グラデーションオーバーレイ */}
      <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.25) 55%, rgba(0,0,0,0.05) 100%)' }} />
      {/* ソースバッジ */}
      <div className="absolute top-3 left-3">
        <span className="text-xs font-mono uppercase font-bold px-2 py-1 rounded" style={{ backgroundColor: 'var(--accent)', color: '#fff' }}>
          {post.source}
        </span>
      </div>
      {/* 下部コンテンツ */}
      <div className="absolute bottom-0 left-0 right-0 p-4">
        <h2 className={`font-bold text-white leading-snug line-clamp-2 mb-2 ${large ? 'text-lg' : 'text-sm'}`}>
          {post.title}
        </h2>
        <div className="flex gap-1">
          {post.tags.slice(0, 2).map(tag => (
            <span key={tag} className="text-xs px-2 py-0.5 rounded-full" style={{ backgroundColor: 'var(--tag-bg)', color: 'var(--tag-text)' }}>
              #{tag}
            </span>
          ))}
        </div>
      </div>
    </Link>
  )
}

// ──────────────────────────────────────────────
// overseas-tools: ProductHunt風横並びカード
// ──────────────────────────────────────────────
function ToolCard({ post, large }: { post: Post; large: boolean }) {
  return (
    <Link
      href={`/posts/${post.slug}`}
      className="post-card group flex rounded-lg overflow-hidden"
      style={{ backgroundColor: 'var(--card-bg)' }}
    >
      <div className={`relative ${large ? 'w-48 h-36' : 'w-32 h-28'} shrink-0 overflow-hidden`}>
        {post.imageUrl
          ? <Image src={post.imageUrl} alt={post.title} fill className="object-cover group-hover:scale-105 transition-transform duration-300" unoptimized />
          : <PlaceholderBg source={post.source} />
        }
      </div>
      <div className="flex-1 p-4 min-w-0">
        <div className="flex items-start gap-2 mb-1.5">
          <span className="text-xs font-medium" style={{ color: 'var(--text-secondary)' }}>{post.source}</span>
          <span className="text-xs px-2 py-0.5 rounded-full ml-auto shrink-0 font-medium bg-emerald-100 text-emerald-700">
            無料あり
          </span>
        </div>
        <h2 className={`font-bold leading-snug line-clamp-2 group-hover:opacity-70 transition-opacity ${large ? 'text-base' : 'text-sm'}`} style={{ color: 'var(--text-primary)' }}>
          {post.title}
        </h2>
        {large && (
          <p className="mt-1.5 text-xs line-clamp-2" style={{ color: 'var(--text-secondary)' }}>
            <Excerpt content={post.content} />
          </p>
        )}
        <div className="mt-2 flex items-center justify-between">
          <div className="flex gap-1">
            {post.tags.slice(0, 2).map(tag => (
              <span key={tag} className="text-xs px-1.5 py-0.5 rounded" style={{ backgroundColor: 'var(--tag-bg)', color: 'var(--tag-text)' }}>
                #{tag}
              </span>
            ))}
          </div>
          <time className="text-xs shrink-0" style={{ color: 'var(--text-secondary)' }}>{formatDate(post.publishedAt)}</time>
        </div>
      </div>
    </Link>
  )
}

// ──────────────────────────────────────────────
// エントリーポイント
// ──────────────────────────────────────────────
export function PostCard({ post, large = false }: { post: Post; large?: boolean }) {
  switch (siteConfig.siteId) {
    case 'ai-news':
      return large ? <NewsBannerCard post={post} /> : <NewsCard post={post} />
    case 'crypto-news':
      return <CryptoCard post={post} large={large} />
    case 'nisa-blog':
      return <FinanceCard post={post} large={large} />
    case 'ai-image':
      return <GalleryCard post={post} large={large} />
    case 'overseas-tools':
      return <ToolCard post={post} large={large} />
    default:
      return <FinanceCard post={post} large={large} />
  }
}
