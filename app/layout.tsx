import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import Link from "next/link";

const geist = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

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
    <html lang="ja" className={`${geist.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-gray-50 text-gray-900">
        <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
          <div className="max-w-3xl mx-auto px-4 h-14 flex items-center justify-between">
            <Link href="/" className="font-bold text-lg text-gray-900 hover:text-blue-600 transition-colors">
              AIニュース最前線
            </Link>
            <nav className="flex items-center gap-4 text-sm text-gray-500">
              <Link href="/" className="hover:text-gray-900 transition-colors">記事一覧</Link>
            </nav>
          </div>
        </header>

        <div className="flex-1">
          {children}
        </div>

        <footer className="border-t border-gray-200 bg-white mt-16">
          <div className="max-w-3xl mx-auto px-4 py-8 text-sm text-gray-400 flex justify-between">
            <p>AIニュース最前線</p>
            <p>©2026</p>
          </div>
        </footer>
      </body>
    </html>
  );
}
