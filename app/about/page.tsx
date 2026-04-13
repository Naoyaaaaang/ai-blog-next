import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'このサイトについて | AIニュース最前線',
}

export default function AboutPage() {
  return (
    <main className="max-w-3xl mx-auto px-4 py-10">
      <div className="bg-white rounded-lg shadow-sm p-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-8 pb-4 border-b border-gray-200">このサイトについて</h1>

        <div className="space-y-8 text-sm text-gray-700 leading-relaxed">
          <section>
            <h2 className="text-base font-bold text-gray-900 mb-3 pl-3 border-l-4 border-[#3BB8D4]">AIニュース最前線とは</h2>
            <p>「AIニュース最前線」は、OpenAI・Google・Anthropic・Hugging Faceなど、世界の最前線で起きているAI関連の最新情報を、日本語でわかりやすくお届けするブログです。</p>
            <p className="mt-2">海外メディアで報じられたAIニュースを毎日自動で収集・翻訳・要約し、日本語のブログ記事として公開しています。専門的な内容も、できるだけわかりやすい言葉で解説することを心がけています。</p>
          </section>

          <section>
            <h2 className="text-base font-bold text-gray-900 mb-3 pl-3 border-l-4 border-[#3BB8D4]">情報ソース</h2>
            <p>以下の信頼性の高いメディア・公式ブログから情報を収集しています。</p>
            <ul className="mt-3 space-y-2">
              {[
                { name: 'OpenAI Blog', url: 'https://openai.com/blog' },
                { name: 'Google AI Blog', url: 'https://blog.google/technology/ai/' },
                { name: 'Hugging Face Blog', url: 'https://huggingface.co/blog' },
                { name: 'TechCrunch AI', url: 'https://techcrunch.com/category/artificial-intelligence/' },
                { name: 'VentureBeat AI', url: 'https://venturebeat.com/category/ai/' },
              ].map(s => (
                <li key={s.name} className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-[#3BB8D4] rounded-full"></span>
                  <a href={s.url} target="_blank" rel="noopener noreferrer" className="text-[#3BB8D4] underline">{s.name}</a>
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="text-base font-bold text-gray-900 mb-3 pl-3 border-l-4 border-[#3BB8D4]">更新頻度</h2>
            <p>毎日自動で新しい記事を追加しています。最新のAIトレンドをいち早くお届けします。</p>
          </section>

          <section>
            <h2 className="text-base font-bold text-gray-900 mb-3 pl-3 border-l-4 border-[#3BB8D4]">免責事項</h2>
            <p>本サイトの記事は、海外ニュースをもとにAIが自動生成したものです。内容の正確性については最大限配慮していますが、情報の利用による損害について責任を負いかねます。最新・正確な情報は各情報ソースの公式サイトをご確認ください。</p>
          </section>

          <section>
            <h2 className="text-base font-bold text-gray-900 mb-3 pl-3 border-l-4 border-[#3BB8D4]">お問い合わせ</h2>
            <p>ご質問・ご意見・記事内容に関するご指摘は<Link href="/contact" className="text-[#3BB8D4] underline">お問い合わせページ</Link>からお送りください。</p>
          </section>
        </div>

        <div className="mt-8">
          <Link href="/" className="text-sm text-gray-400 hover:text-[#3BB8D4] transition-colors">← トップに戻る</Link>
        </div>
      </div>
    </main>
  )
}
