import { MetadataRoute } from 'next'
import { getAllPosts, SOURCE_SLUGS } from '@/lib/posts'

const BASE_URL = 'https://ai-blog-next-eight.vercel.app'

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getAllPosts()

  const staticPages: MetadataRoute.Sitemap = [
    { url: BASE_URL, lastModified: new Date(), changeFrequency: 'daily', priority: 1.0 },
    { url: `${BASE_URL}/about`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.5 },
    { url: `${BASE_URL}/contact`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.5 },
    { url: `${BASE_URL}/privacy`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.3 },
  ]

  const categoryPages: MetadataRoute.Sitemap = Object.values(SOURCE_SLUGS).map(slug => ({
    url: `${BASE_URL}/category/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'daily' as const,
    priority: 0.7,
  }))

  const postPages: MetadataRoute.Sitemap = posts.map(post => ({
    url: `${BASE_URL}/posts/${post.slug}`,
    lastModified: new Date(post.publishedAt),
    changeFrequency: 'never' as const,
    priority: 0.8,
  }))

  return [...staticPages, ...categoryPages, ...postPages]
}
