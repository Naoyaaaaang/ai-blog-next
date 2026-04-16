import type { Metadata } from "next";
import "./globals.css";
import Link from "next/link";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: `${siteConfig.siteName} | ${siteConfig.tagline}`,
  description: siteConfig.description,
  metadataBase: new URL(siteConfig.baseUrl),
  openGraph: {
    title: `${siteConfig.siteName} | ${siteConfig.tagline}`,
    description: siteConfig.description,
    url: siteConfig.baseUrl,
    siteName: siteConfig.siteName,
    locale: "ja_JP",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.siteName,
    description: siteConfig.description,
  },
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
        <header className="text-white sticky top-0 z-50" style={{ backgroundColor: siteConfig.headerBg }}>
          <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
            <Link href="/" className="font-bold text-xl tracking-tight hover:opacity-80 transition-opacity">
              <span style={{ color: siteConfig.accentColor }}>{siteConfig.siteNamePrefix}</span>
              {siteConfig.siteNameSuffix}
            </Link>
            <nav className="flex items-center gap-6 text-sm">
              <Link href="/" className="hover:opacity-80 transition-opacity">ニュース</Link>
              <Link href="/about" className="hover:opacity-80 transition-opacity">サイトについて</Link>
              <Link href="/contact" className="hover:opacity-80 transition-opacity">お問い合わせ</Link>
            </nav>
          </div>
        </header>

        {/* カテゴリーバー */}
        <div className="bg-white border-b border-gray-200">
          <div className="max-w-6xl mx-auto px-4 h-10 flex items-center gap-6 text-sm overflow-x-auto">
            {siteConfig.categories.map(cat => (
              <Link
                key={cat.slug}
                href={`/category/${cat.slug}`}
                className="text-gray-600 hover:text-gray-900 whitespace-nowrap transition-colors"
              >
                {cat.name}
              </Link>
            ))}
          </div>
        </div>

        <div className="flex-1">
          {children}
        </div>

        <footer className="text-white mt-12" style={{ backgroundColor: siteConfig.headerBg }}>
          <div className="max-w-6xl mx-auto px-4 py-8">
            <div className="flex flex-col md:flex-row justify-between items-start gap-6">
              <div>
                <p className="font-bold text-lg mb-2">
                  <span style={{ color: siteConfig.accentColor }}>{siteConfig.siteNamePrefix}</span>
                  {siteConfig.siteNameSuffix}
                </p>
                <p className="text-sm text-gray-400">{siteConfig.tagline}</p>
              </div>
              <div className="flex gap-6 text-sm text-gray-400">
                <Link href="/contact" className="hover:text-white transition-colors">お問い合わせ</Link>
                <Link href="/privacy" className="hover:text-white transition-colors">プライバシーポリシー</Link>
              </div>
            </div>
            <div className="mt-6 pt-6 border-t border-gray-700 text-sm text-gray-500 text-center">
              © 2026 {siteConfig.siteName}
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
