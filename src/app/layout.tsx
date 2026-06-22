import type { Metadata, Viewport } from "next";
import "./globals.css";
import MusicPlayer from "@/components/MusicPlayer";
import { AuthProvider } from "@/components/AuthProvider";

export const metadata: Metadata = {
  title: "素问居 · 中医养生AI",
  description: "以经典为据，AI辨证养生。九种体质测评、二十四节气养生、药膳食谱、经络穴位——中医养生，一站搞定。",
  keywords: "中医,养生,体质测评,节气养生,药膳,经络,穴位,黄帝内经,素问",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#090D08",
};

// 竹林粒子背景
function BambooField() {
  const particles = Array.from({ length: 30 }, (_, i) => ({
    id: i,
    left: `${(i * 37 + 13) % 100}%`,
    top: `${(i * 53 + 7) % 100}%`,
    isGold: i % 5 === 0,
    size: i % 7 === 0 ? 4 : 3,
    duration: `${10 + (i % 8)}s`,
    delay: `${(i * 0.4) % 5}s`,
  }));
  const leaves = Array.from({ length: 8 }, (_, i) => ({
    id: i,
    left: `${8 + i * 12}%`,
    top: `${55 + (i % 3) * 15}%`,
    duration: `${16 + i * 2}s`,
    delay: `${i * 2.5}s`,
  }));

  return (
    <div className="swen-particles" aria-hidden="true">
      {particles.map((p) => (
        <div
          key={p.id}
          className="swen-particle"
          style={{
            left: p.left,
            top: p.top,
            width: p.size,
            height: p.size,
            background: p.isGold ? 'var(--color-swen-gold)' : 'var(--color-swen-bamboo)',
            animationDuration: p.duration,
            animationDelay: p.delay,
          }}
        />
      ))}
      {leaves.map((l) => (
        <div
          key={`leaf-${l.id}`}
          className="swen-leaf"
          style={{
            left: l.left,
            top: l.top,
            animationDuration: l.duration,
            animationDelay: l.delay,
          }}
        />
      ))}
    </div>
  );
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-CN">
      <body className="antialiased min-h-screen">
        <AuthProvider>
          {/* 背景层 */}
          <div className="bg-swen-layer bg-swen-layer-1" />
          <div className="bg-swen-layer bg-swen-layer-2" />
          <div className="bg-swen-layer bg-swen-layer-3" />
          <div className="bg-swen-layer bg-swen-layer-4" />
          <BambooField />

          {/* 顶部导航 */}
          <header className="fixed top-0 z-50 w-full">
            <div
              className="mx-auto flex h-14 max-w-5xl items-center justify-between px-4"
              style={{
                background: "rgba(9, 13, 8, 0.85)",
                backdropFilter: "blur(16px)",
                WebkitBackdropFilter: "blur(16px)",
                borderBottom: "1px solid rgba(93, 138, 102, 0.08)",
              }}
            >
              <a href="/" className="flex items-center gap-2 group">
                <span
                  className="text-2xl font-display green-text"
                  style={{ letterSpacing: "0.15em" }}
                >
                  素问居
                </span>
              </a>

              <nav className="hidden md:flex items-center gap-4 text-sm">
                {[
                  { href: "/season", label: "节气养生" },
                  { href: "/constitution", label: "体质测评" },
                  { href: "/herb", label: "草药百科" },
                  { href: "/diet", label: "药膳食谱" },
                ].map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    className="relative text-swen-text/70 hover:text-swen-green transition-colors duration-200 group"
                  >
                    {item.label}
                    <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-swen-green transition-all duration-300 group-hover:w-full" />
                  </a>
                ))}
                {/* 更多下拉 */}
                <div className="relative group">
                  <button className="relative text-swen-text/70 hover:text-swen-green transition-colors duration-200 flex items-center gap-1 cursor-pointer">
                    更多
                    <svg className="w-3 h-3 transition-transform group-hover:rotate-180" viewBox="0 0 10 6" fill="none">
                      <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </button>
                  <div className="absolute top-full right-0 mt-2 w-44 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 translate-y-1 group-hover:translate-y-0"
                    style={{ zIndex: 100 }}>
                    <div className="p-2 rounded-xl"
                      style={{ background: "rgba(9, 13, 8, 0.95)", border: "1px solid rgba(93,138,102,0.12)", backdropFilter: "blur(16px)" }}>
                      {[
                        { href: "/acupoint", label: "🌿 经络穴位" },
                        { href: "/ask", label: "🍃 AI养生顾问" },
                        { href: "/meditation", label: "🧘 静心禅坐" },
                      ].map((item) => (
                        <a key={item.href} href={item.href}
                          className="block px-3 py-2 rounded-lg text-xs transition-all hover:bg-white/5"
                          style={{ color: "rgba(232, 228, 218, 0.6)" }}>
                          {item.label}
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
                <a href="/pay"
                  className="relative text-swen-gold hover:text-swen-gold-light transition-colors duration-200">
                  💰 付费
                  <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-swen-gold transition-all duration-300 group-hover:w-full" />
                </a>
                <a href="/profile"
                  className="relative text-swen-text/70 hover:text-swen-green transition-colors duration-200 group">
                  我的
                  <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-swen-green transition-all duration-300 group-hover:w-full" />
                </a>
              </nav>

              {/* 移动端菜单按钮 */}
              <button className="md:hidden text-swen-green text-xl px-2 py-1" aria-label="菜单">☰</button>
            </div>
          </header>

          {/* 主内容 */}
          <main className="relative z-10 pt-14 pb-20">{children}</main>

          {/* 移动端底栏 */}
          <nav className="fixed inset-x-0 bottom-0 z-40 md:hidden"
            style={{
              background: "rgba(9, 13, 8, 0.9)",
              backdropFilter: "blur(16px)",
              WebkitBackdropFilter: "blur(16px)",
              borderTop: "1px solid rgba(93, 138, 102, 0.1)",
            }}>
            <div className="grid grid-cols-5 gap-1 px-2 py-2"
              style={{ paddingBottom: "max(0.5rem, env(safe-area-inset-bottom))" }}>
              {[
                { href: "/", label: "首页", icon: "🌿" },
                { href: "/constitution", label: "体质", icon: "🔍" },
                { href: "/season", label: "节气", icon: "📅" },
                { href: "/herb", label: "草药", icon: "🍃" },
                { href: "/profile", label: "我的", icon: "🍀" },
              ].map((item) => (
                <a key={item.href} href={item.href}
                  className="flex flex-col items-center gap-0.5 text-xs text-swen-text/60 active:text-swen-green transition-colors">
                  <span className="text-lg leading-none">{item.icon}</span>
                  <span>{item.label}</span>
                </a>
              ))}
            </div>
          </nav>

          {/* Footer */}
          <footer className="relative z-10" style={{ borderTop: "1px solid rgba(93, 138, 102, 0.06)" }}>
            <div className="mx-auto max-w-5xl px-4 pt-10 pb-24 text-center">
              <p className="text-sm leading-relaxed" style={{ color: "rgba(93,138,102,0.4)" }}>
                上医治未病，中医治欲病，下医治已病。
              </p>
              <p className="mt-3 text-xs" style={{ color: "rgba(232, 228, 218, 0.2)" }}>
                素问居 · 源自《黄帝内经》 · AI辅助养生参考，不构成医疗诊断
              </p>
            </div>
          </footer>

          <MusicPlayer />
        </AuthProvider>
      </body>
    </html>
  );
}
