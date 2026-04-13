import type { Metadata } from "next";
import "./globals.css";
import Link from "next/link";

export const metadata: Metadata = {
  title: "AIニュース最前線 | 最新AI情報まとめ",
  description: "OpenAI・Google・Anthropicなど最新のAIツール・機能情報を毎日お届けするブログ",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja" className="h-full">
      <body className="min-h-full flex flex-col bg-[#f4f6f8] text-gray-900 antialiased">
        {/* ヘッダー */}
        <header className="bg-[#253947] text-white sticky top-0 z-50">
          <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
            <Link href="/" className="font-bold text-xl tracking-tight hover:opacity-80 transition-opacity">
              <span className="text-[#3BB8D4]">AI</span>ニュース最前線
            </Link>
            <nav className="flex items-center gap-6 text-sm">
              <Link href="/" className="hover:text-[#3BB8D4] transition-colors">ニュース</Link>
              <Link href="/contact" className="hover:text-[#3BB8D4] transition-colors">お問い合わせ</Link>
            </nav>
          </div>
        </header>

        {/* カテゴリーバー */}
        <div className="bg-white border-b border-gray-200">
          <div className="max-w-6xl mx-auto px-4 h-10 flex items-center gap-6 text-sm overflow-x-auto">
            {['OpenAI', 'Google AI', 'Hugging Face', 'TechCrunch AI', 'VentureBeat AI'].map(cat => (
              <span key={cat} className="text-gray-600 hover:text-[#3BB8D4] cursor-pointer whitespace-nowrap transition-colors">
                {cat}
              </span>
            ))}
          </div>
        </div>

        <div className="flex-1">
          {children}
        </div>

        <footer className="bg-[#253947] text-white mt-12">
          <div className="max-w-6xl mx-auto px-4 py-8">
            <div className="flex flex-col md:flex-row justify-between items-start gap-6">
              <div>
                <p className="font-bold text-lg mb-2">
                  <span className="text-[#3BB8D4]">AI</span>ニュース最前線
                </p>
                <p className="text-sm text-gray-400">OpenAI・Google・Anthropicなど最新のAI情報を毎日お届け</p>
              </div>
              <div className="flex gap-6 text-sm text-gray-400">
                <Link href="/contact" className="hover:text-white transition-colors">お問い合わせ</Link>
                <Link href="/privacy" className="hover:text-white transition-colors">プライバシーポリシー</Link>
              </div>
            </div>
            <div className="mt-6 pt-6 border-t border-gray-700 text-sm text-gray-500 text-center">
              © 2026 AIニュース最前線
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
