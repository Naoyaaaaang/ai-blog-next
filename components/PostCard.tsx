import Link from 'next/link'
import Image from 'next/image'
import type { Post } from '@/lib/posts'

export function PostCard({ post, large = false }: { post: Post; large?: boolean }) {
  const imgHeight = large ? 'h-48' : 'h-36'

  return (
    <Link
      href={`/posts/${post.slug}`}
      className={`group block rounded-lg overflow-hidden shadow-sm post-card`}
      style={{ backgroundColor: 'var(--card-bg)' }}
    >
      {/* サムネイル */}
      <div className={`relative ${imgHeight} overflow-hidden`}>
        {post.imageUrl ? (
          <Image
            src={post.imageUrl}
            alt={post.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            unoptimized
          />
        ) : (
          <div
            className="w-full h-full flex items-end p-3"
            style={{ background: `linear-gradient(135deg, var(--sidebar-header-bg), color-mix(in srgb, var(--accent) 40%, var(--sidebar-header-bg) 60%))` }}
          >
            <span className="text-white text-xs font-bold opacity-60 uppercase tracking-wider">{post.source}</span>
          </div>
        )}
      </div>

      <div className="p-4">
        <div className="flex items-center gap-2 mb-2">
          <span className="inline-block w-2 h-2 rounded-full" style={{ backgroundColor: 'var(--accent)' }}></span>
          <span className="text-xs font-medium" style={{ color: 'var(--accent)' }}>{post.source}</span>
          <time className="text-xs ml-auto" style={{ color: 'var(--text-secondary)' }}>
            {new Date(post.publishedAt).toLocaleDateString('ja-JP', { year: 'numeric', month: '2-digit', day: '2-digit' })}
          </time>
        </div>
        <h2
          className={`font-bold leading-snug transition-opacity group-hover:opacity-70 ${large ? 'text-lg' : 'text-sm'} line-clamp-2`}
          style={{ color: 'var(--text-primary)' }}
        >
          {post.title}
        </h2>
        {large && (
          <p className="mt-2 text-sm line-clamp-2 leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
            {post.content.replace(/<[^>]+>/g, '').slice(0, 100)}...
          </p>
        )}
        <div className="mt-2 flex flex-wrap gap-1">
          {post.tags.slice(0, 2).map((tag: string) => (
            <span
              key={tag}
              className="text-xs px-2 py-0.5 rounded"
              style={{ backgroundColor: 'var(--tag-bg)', color: 'var(--tag-text)' }}
            >
              #{tag}
            </span>
          ))}
        </div>
      </div>
    </Link>
  )
}
