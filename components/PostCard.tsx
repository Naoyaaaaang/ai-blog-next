import Link from 'next/link'
import Image from 'next/image'
import type { Post } from '@/lib/posts'

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

export function PostCard({ post, large = false }: { post: Post; large?: boolean }) {
  const bg = SOURCE_BG[post.source] ?? 'from-gray-600 to-gray-800'
  const dot = SOURCE_COLORS[post.source] ?? 'bg-gray-500'
  const imgHeight = large ? 'h-48' : 'h-36'

  return (
    <Link href={`/posts/${post.slug}`} className="group block bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
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
          <div className={`w-full h-full bg-gradient-to-br ${bg} flex items-end p-3`}>
            <span className="text-white text-xs font-bold opacity-70 uppercase tracking-wider">{post.source}</span>
          </div>
        )}
      </div>

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
