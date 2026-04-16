import type { Metadata } from 'next'
import Link from 'next/link'
import { siteConfig } from '@/lib/site-config'

export const metadata: Metadata = {
  title: `プライバシーポリシー | ${siteConfig.siteName}`,
}

export default function PrivacyPage() {
  return (
    <main className="max-w-3xl mx-auto px-4 py-10">
      <div className="rounded-lg shadow-sm p-8" style={{ backgroundColor: 'var(--card-bg)' }}>
        <h1 className="text-2xl font-bold mb-8 pb-4 border-b" style={{ color: 'var(--text-primary)', borderColor: 'var(--border)' }}>
          プライバシーポリシー
        </h1>

        <div className="space-y-8 text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>

          <section>
            <h2 className="text-base font-bold mb-3 pl-3 border-l-4" style={{ color: 'var(--text-primary)', borderColor: 'var(--accent)' }}>
              個人情報の収集について
            </h2>
            <p>{siteConfig.siteName}（以下「当サイト」）では、お問い合わせフォームの利用時に、お名前・メールアドレス等の個人情報をご提供いただく場合があります。収集した個人情報は、お問い合わせへの回答のみに使用し、第三者への提供は行いません。</p>
          </section>

          <section>
            <h2 className="text-base font-bold mb-3 pl-3 border-l-4" style={{ color: 'var(--text-primary)', borderColor: 'var(--accent)' }}>
              アクセス解析ツールについて
            </h2>
            <p>当サイトでは、Googleによるアクセス解析ツール「Googleアナリティクス」を使用する場合があります。このGoogleアナリティクスはデータ収集のためにCookieを使用しています。このデータは匿名で収集されており、個人を特定するものではありません。</p>
            <p className="mt-2">Cookieを無効にすることで収集を拒否することができますので、お使いのブラウザの設定をご確認ください。</p>
          </section>

          <section>
            <h2 className="text-base font-bold mb-3 pl-3 border-l-4" style={{ color: 'var(--text-primary)', borderColor: 'var(--accent)' }}>
              広告について
            </h2>
            <p>当サイトでは、第三者配信の広告サービス（Google AdSense）を利用する予定があります。広告配信事業者はCookieを使用して、当サイトへの過去のアクセス情報に基づいた広告を配信します。</p>
            <p className="mt-2">
              Googleによる広告掲載に関しては、
              <a href="https://policies.google.com/technologies/ads?hl=ja" className="underline ml-1" style={{ color: 'var(--accent)' }} target="_blank" rel="noopener noreferrer">
                Googleの広告に関するポリシー
              </a>
              をご確認ください。
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold mb-3 pl-3 border-l-4" style={{ color: 'var(--text-primary)', borderColor: 'var(--accent)' }}>
              免責事項
            </h2>
            <p>当サイトの情報は、可能な限り正確な情報を掲載するよう努めておりますが、正確性・安全性を保証するものではありません。当サイトに掲載された情報によって生じた損害等について、一切の責任を負いかねます。</p>
            <p className="mt-2">また、当サイトからリンクやバナーなどによって他のサイトに移動した場合、移動先サイトで提供される情報・サービス等については責任を負いかねますので、ご了承ください。</p>
          </section>

          <section>
            <h2 className="text-base font-bold mb-3 pl-3 border-l-4" style={{ color: 'var(--text-primary)', borderColor: 'var(--accent)' }}>
              著作権について
            </h2>
            <p>当サイトに掲載されている文章・画像等のコンテンツの著作権は、当サイト運営者に帰属します。無断転載・複製は禁止します。</p>
            <p className="mt-2">なお、各記事の参照元として表示している外部サイトのコンテンツの著作権は、それぞれの権利者に帰属します。</p>
          </section>

          <section>
            <h2 className="text-base font-bold mb-3 pl-3 border-l-4" style={{ color: 'var(--text-primary)', borderColor: 'var(--accent)' }}>
              プライバシーポリシーの変更
            </h2>
            <p>当サイトは、必要に応じて本プライバシーポリシーを変更することがあります。変更後のポリシーは本ページに掲載した時点で効力を生じるものとします。</p>
          </section>

          <div className="pt-4 border-t text-xs" style={{ borderColor: 'var(--border)', color: 'var(--text-secondary)' }}>
            <p>制定日：2026年4月13日</p>
          </div>
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
