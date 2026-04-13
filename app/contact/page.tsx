import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'お問い合わせ | AIニュース最前線',
}

export default function ContactPage() {
  return (
    <main className="max-w-3xl mx-auto px-4 py-10">
      <div className="bg-white rounded-lg shadow-sm p-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">お問い合わせ</h1>
        <p className="text-sm text-gray-500 mb-8">ご質問・ご意見・掲載内容に関するご指摘などはこちらからお送りください。</p>

        <form
          action="https://formspree.io/f/YOUR_FORM_ID"
          method="POST"
          className="space-y-6"
        >
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="name">
              お名前 <span className="text-red-400">*</span>
            </label>
            <input
              id="name"
              type="text"
              name="name"
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-[#3BB8D4] focus:ring-1 focus:ring-[#3BB8D4] transition"
              placeholder="山田 太郎"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="email">
              メールアドレス <span className="text-red-400">*</span>
            </label>
            <input
              id="email"
              type="email"
              name="email"
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-[#3BB8D4] focus:ring-1 focus:ring-[#3BB8D4] transition"
              placeholder="example@email.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="subject">
              件名
            </label>
            <input
              id="subject"
              type="text"
              name="subject"
              className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-[#3BB8D4] focus:ring-1 focus:ring-[#3BB8D4] transition"
              placeholder="お問い合わせの件名"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="message">
              メッセージ <span className="text-red-400">*</span>
            </label>
            <textarea
              id="message"
              name="message"
              required
              rows={6}
              className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-[#3BB8D4] focus:ring-1 focus:ring-[#3BB8D4] transition resize-none"
              placeholder="お問い合わせ内容をご記入ください"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-[#3BB8D4] hover:bg-[#2da5bf] text-white font-medium py-3 rounded-lg text-sm transition-colors"
          >
            送信する
          </button>
        </form>

        <div className="mt-8">
          <Link href="/" className="text-sm text-gray-400 hover:text-[#3BB8D4] transition-colors">← トップに戻る</Link>
        </div>
      </div>
    </main>
  )
}
