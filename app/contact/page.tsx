import type { Metadata } from 'next'
import Link from 'next/link'
import { siteConfig } from '@/lib/site-config'

export const metadata: Metadata = {
  title: `お問い合わせ | ${siteConfig.siteName}`,
}

export default function ContactPage() {
  return (
    <main className="max-w-3xl mx-auto px-4 py-10">
      <div className="rounded-lg shadow-sm p-8" style={{ backgroundColor: 'var(--card-bg)' }}>
        <h1 className="text-2xl font-bold mb-2" style={{ color: 'var(--text-primary)' }}>お問い合わせ</h1>
        <p className="text-sm mb-8" style={{ color: 'var(--text-secondary)' }}>ご質問・ご意見・掲載内容に関するご指摘などはこちらからお送りください。</p>

        <form
          action="https://formspree.io/f/YOUR_FORM_ID"
          method="POST"
          className="space-y-6"
        >
          <div>
            <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text-primary)' }} htmlFor="name">
              お名前 <span className="text-red-400">*</span>
            </label>
            <input
              id="name"
              type="text"
              name="name"
              required
              className="w-full border rounded-lg px-4 py-2.5 text-sm focus:outline-none transition"
              style={{ borderColor: 'var(--border)', backgroundColor: 'var(--bg)', color: 'var(--text-primary)' }}
              placeholder="山田 太郎"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text-primary)' }} htmlFor="email">
              メールアドレス <span className="text-red-400">*</span>
            </label>
            <input
              id="email"
              type="email"
              name="email"
              required
              className="w-full border rounded-lg px-4 py-2.5 text-sm focus:outline-none transition"
              style={{ borderColor: 'var(--border)', backgroundColor: 'var(--bg)', color: 'var(--text-primary)' }}
              placeholder="example@email.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text-primary)' }} htmlFor="subject">
              件名
            </label>
            <input
              id="subject"
              type="text"
              name="subject"
              className="w-full border rounded-lg px-4 py-2.5 text-sm focus:outline-none transition"
              style={{ borderColor: 'var(--border)', backgroundColor: 'var(--bg)', color: 'var(--text-primary)' }}
              placeholder="お問い合わせの件名"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text-primary)' }} htmlFor="message">
              メッセージ <span className="text-red-400">*</span>
            </label>
            <textarea
              id="message"
              name="message"
              required
              rows={6}
              className="w-full border rounded-lg px-4 py-2.5 text-sm focus:outline-none transition resize-none"
              style={{ borderColor: 'var(--border)', backgroundColor: 'var(--bg)', color: 'var(--text-primary)' }}
              placeholder="お問い合わせ内容をご記入ください"
            />
          </div>

          <button
            type="submit"
            className="w-full text-white font-medium py-3 rounded-lg text-sm transition-opacity hover:opacity-80"
            style={{ backgroundColor: 'var(--accent)' }}
          >
            送信する
          </button>
        </form>

        <div className="mt-8">
          <Link href="/" className="text-sm transition-opacity hover:opacity-60" style={{ color: 'var(--text-secondary)' }}>
            ← トップに戻る
          </Link>
        </div>
      </div>
    </main>
  )
}
