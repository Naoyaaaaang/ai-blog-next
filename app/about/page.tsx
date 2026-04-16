import type { Metadata } from 'next'
import Link from 'next/link'
import { siteConfig } from '@/lib/site-config'

export const metadata: Metadata = {
  title: `このサイトについて | ${siteConfig.siteName}`,
}

export default function AboutPage() {
  return (
    <main className="max-w-3xl mx-auto px-4 py-10">
      <div className="rounded-lg shadow-sm p-8" style={{ backgroundColor: 'var(--card-bg)' }}>
        <h1 className="text-2xl font-bold mb-8 pb-4 border-b" style={{ color: 'var(--text-primary)', borderColor: 'var(--border)' }}>
          このサイトについて
        </h1>

        <div className="space-y-8 text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
          <section>
            <h2 className="text-base font-bold mb-3 pl-3 border-l-4" style={{ color: 'var(--text-primary)', borderColor: 'var(--accent)' }}>
              {siteConfig.siteName}とは
            </h2>
            <p>{siteConfig.description}</p>
            <p className="mt-2">{siteConfig.tagline}</p>
          </section>

          <section>
            <h2 className="text-base font-bold mb-3 pl-3 border-l-4" style={{ color: 'var(--text-primary)', borderColor: 'var(--accent)' }}>
              情報ソース
            </h2>
            <p>以下の信頼性の高いメディア・公式ブログから情報を収集しています。</p>
            <ul className="mt-3 space-y-2">
              {siteConfig.categories.map(cat => (
                <li key={cat.slug} className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: 'var(--accent)' }}></span>
                  <span style={{ color: 'var(--text-primary)' }}>{cat.name}</span>
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="text-base font-bold mb-3 pl-3 border-l-4" style={{ color: 'var(--text-primary)', borderColor: 'var(--accent)' }}>
              更新頻度
            </h2>
            <p>毎日自動で新しい記事を追加しています。最新情報をいち早くお届けします。</p>
          </section>

          <section>
            <h2 className="text-base font-bold mb-3 pl-3 border-l-4" style={{ color: 'var(--text-primary)', borderColor: 'var(--accent)' }}>
              免責事項
            </h2>
            <p>本サイトの記事は、海外ニュースをもとにAIが自動生成したものです。内容の正確性については最大限配慮していますが、情報の利用による損害について責任を負いかねます。最新・正確な情報は各情報ソースの公式サイトをご確認ください。</p>
          </section>

          <section>
            <h2 className="text-base font-bold mb-3 pl-3 border-l-4" style={{ color: 'var(--text-primary)', borderColor: 'var(--accent)' }}>
              お問い合わせ
            </h2>
            <p>
              ご質問・ご意見・記事内容に関するご指摘は
              <Link href="/contact" className="underline ml-1" style={{ color: 'var(--accent)' }}>お問い合わせページ</Link>
              からお送りください。
            </p>
          </section>
        </div>

        <div className="mt-8">
          <Link href="/" className="text-sm transition-opacity hover:opacity-60" style={{ color: 'var(--text-secondary)' }}>
            ← トップに戻る
          </Link>
        </div>
      </div>
    </main>
  )
}
