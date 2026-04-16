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

const cssVars = {
  '--accent': siteConfig.accentColor,
  '--accent-hover': siteConfig.accentHover,
  '--header-bg': siteConfig.headerBg,
  '--bg': siteConfig.bgColor,
  '--card-bg': siteConfig.cardBg,
  '--text-primary': siteConfig.textPrimary,
  '--text-secondary': siteConfig.textSecondary,
  '--border': siteConfig.borderColor,
  '--tag-bg': siteConfig.tagBg,
  '--tag-text': siteConfig.tagText,
  '--cat-bar-bg': siteConfig.categoryBarBg,
  '--sidebar-header-bg': siteConfig.sidebarHeaderBg,
} as React.CSSProperties

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja" className={`h-full site-${siteConfig.siteId}`} style={cssVars}>
      <body className="min-h-full flex flex-col antialiased" style={{ backgroundColor: 'var(--bg)', color: 'var(--text-primary)' }}>

        {/* ヘッダー */}
        <header className="text-white sticky top-0 z-50" style={{ backgroundColor: 'var(--header-bg)' }}>
          <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
            <Link href="/" className="font-bold text-xl tracking-tight hover:opacity-80 transition-opacity flex items-center gap-1">
              <span style={{ color: 'var(--accent)' }}>{siteConfig.siteNamePrefix}</span>
              <span className="text-white">{siteConfig.siteNameSuffix}</span>
            </Link>
            <nav className="flex items-center gap-6 text-sm text-white/80">
              <Link href="/" className="hover:text-white transition-colors">ニュース</Link>
              <Link href="/about" className="hover:text-white transition-colors">サイトについて</Link>
              <Link href="/contact" className="hover:text-white transition-colors">お問い合わせ</Link>
            </nav>
          </div>
        </header>

        {/* カテゴリーバー */}
        <div className="border-b" style={{ backgroundColor: 'var(--cat-bar-bg)', borderColor: 'var(--border)' }}>
          <div className="max-w-6xl mx-auto px-4 h-10 flex items-center gap-6 text-sm overflow-x-auto">
            {siteConfig.categories.map(cat => (
              <Link
                key={cat.slug}
                href={`/category/${cat.slug}`}
                className="whitespace-nowrap transition-colors hover:opacity-100 opacity-70"
                style={{ color: 'var(--text-primary)' }}
              >
                {cat.name}
              </Link>
            ))}
          </div>
        </div>

        <div className="flex-1">
          {children}
        </div>

        <footer className="text-white mt-12" style={{ backgroundColor: 'var(--header-bg)' }}>
          <div className="max-w-6xl mx-auto px-4 py-8">
            <div className="flex flex-col md:flex-row justify-between items-start gap-6">
              <div>
                <p className="font-bold text-lg mb-1">
                  <span style={{ color: 'var(--accent)' }}>{siteConfig.siteNamePrefix}</span>
                  <span>{siteConfig.siteNameSuffix}</span>
                </p>
                <p className="text-sm text-white/50 max-w-xs">{siteConfig.tagline}</p>
              </div>
              <div className="flex gap-6 text-sm text-white/50">
                <Link href="/contact" className="hover:text-white transition-colors">お問い合わせ</Link>
                <Link href="/privacy" className="hover:text-white transition-colors">プライバシーポリシー</Link>
              </div>
            </div>
            <div className="mt-6 pt-6 border-t border-white/10 text-sm text-white/30 text-center">
              © 2026 {siteConfig.siteName}
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
