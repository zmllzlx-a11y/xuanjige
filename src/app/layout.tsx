import type { Metadata, Viewport } from "next";
import "./globals.css";
import MusicPlayer from "@/components/MusicPlayer";
import { AuthProvider } from "@/components/AuthProvider";

export const metadata: Metadata = {
  title: "玄机阁 · 国学命理 AI 解读",
  description: "以古籍为根，AI 为引。祈福求签、八字精批、周公解梦、黄历择吉。",
  keywords: "算卦,八字,求签,黄历,周公解梦,国学,命理,AI算命",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#0e0b08",
};

// 星空粒子组件（纯静态，生成随机位置的星点）
function Starfield() {
  const stars = Array.from({ length: 40 }, (_, i) => ({
    id: i,
    left: `${(i * 37 + 13) % 100}%`,
    top: `${(i * 53 + 7) % 100}%`,
    size: i % 5 === 0 ? "star--bright" : i % 7 === 0 ? "star--gold" : "",
    duration: `${3 + (i % 5)}s`,
    delay: `${(i * 0.3) % 4}s`,
    maxOpacity: `${0.3 + (i % 4) * 0.15}`,
  }));

  return (
    <div className="starfield" aria-hidden="true">
      {stars.map((s) => (
        <div
          key={s.id}
          className={`star ${s.size}`}
          style={{
            left: s.left,
            top: s.top,
            animationDuration: s.duration,
            animationDelay: s.delay,
            ["--max-opacity" as string]: s.maxOpacity,
          }}
        />
      ))}
      {Array.from({ length: 6 }, (_, i) => (
        <div
          key={`p${i}`}
          className="floating-particle"
          style={{
            width: `${8 + (i % 3) * 6}px`,
            height: `${8 + (i % 3) * 6}px`,
            left: `${10 + i * 15}%`,
            top: `${60 + (i % 3) * 12}%`,
            animationDuration: `${12 + i * 3}s`,
            animationDelay: `${i * 2}s`,
            opacity: 0.04 + (i % 3) * 0.02,
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
        <div className="bg-xuan-layer bg-xuan-layer-1" />
        <div className="bg-xuan-layer bg-xuan-layer-2" />
        <div className="bg-xuan-layer bg-xuan-layer-3" />
        <div className="bg-xuan-layer bg-xuan-layer-4" />
        <Starfield />

        {/* 顶部导航 */}
        <header className="fixed top-0 z-50 w-full">
          <div
            className="mx-auto flex h-14 max-w-5xl items-center justify-between px-4"
            style={{
              background: "rgba(14, 11, 8, 0.8)",
              backdropFilter: "blur(16px)",
              WebkitBackdropFilter: "blur(16px)",
              borderBottom: "1px solid rgba(201, 160, 94, 0.08)",
            }}
          >
            <a href="/" className="flex items-center gap-2 group">
              <span
                className="text-2xl font-display gold-text tracking-widest transition-all duration-300 group-hover:drop-shadow-[0_0_8px_rgba(201,160,94,0.6)]"
                style={{ textShadow: "0 0 20px rgba(201,160,94,0.3)" }}
              >
                玄机阁
              </span>
            </a>

            <nav className="hidden md:flex items-center gap-4 text-sm">
              {[
                { href: "/almanac", label: "今日黄历" },
                { href: "/lottery", label: "求灵签" },
                { href: "/bazi", label: "八字精批" },
                { href: "/dream", label: "解梦" },
              ].map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="relative text-paper-dark/70 hover:text-gold transition-colors duration-200 group"
                >
                  {item.label}
                  <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-gold transition-all duration-300 group-hover:w-full" />
                </a>
              ))}
              {/* 更多功能下拉 */}
              <div className="relative group">
                <button className="relative text-paper-dark/70 hover:text-gold transition-colors duration-200 flex items-center gap-1 group-hover:text-gold cursor-pointer">
                  更多
                  <svg className="w-3 h-3 transition-transform group-hover:rotate-180" viewBox="0 0 10 6" fill="none">
                    <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
                <div className="absolute top-full right-0 mt-2 w-44 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 translate-y-1 group-hover:translate-y-0" style={{ zIndex: 100 }}>
                  <div className="p-2 rounded-xl" style={{ background: "rgba(14, 11, 8, 0.95)", border: "1px solid rgba(201,160,94,0.12)", backdropFilter: "blur(16px)" }}>
                    {[
                      { href: "/blessing", label: "🪷 在线祈福" },
                      { href: "/liuyao", label: "🪙 六爻占卜" },
                      { href: "/palmistry", label: "🤚 看手相" },
                      { href: "/naming", label: "📖 宝宝起名" },
                      { href: "/company-naming", label: "🏢 公司起名" },
                      { href: "/marriage", label: "💑 八字合婚" },
                      { href: "/meditation", label: "🧘 静心禅坐" },
                    ].map((item) => (
                      <a
                        key={item.href}
                        href={item.href}
                        className="block px-3 py-2 rounded-lg text-xs transition-all hover:bg-white/5"
                        style={{ color: "rgba(212,196,160,0.6)" }}
                      >
                        {item.label}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
              <a
                href="/pay"
                className="relative text-gold hover:text-gold-light transition-colors duration-200"
                style={{ textShadow: "0 0 10px rgba(201,160,94,0.2)" }}
              >
                🔮 付费
                <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-gold transition-all duration-300 group-hover:w-full" />
              </a>
              <a
                href="/profile"
                className="relative text-paper-dark/70 hover:text-gold transition-colors duration-200 group"
              >
                我的
                <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-gold transition-all duration-300 group-hover:w-full" />
              </a>
            </nav>

            {/* 移动端菜单按钮 */}
            <button
              className="md:hidden text-gold text-xl px-2 py-1"
              aria-label="菜单"
            >
              ☰
            </button>
          </div>
        </header>

        {/* 主内容 */}
        <main className="relative z-10 pt-14 pb-20">{children}</main>

        {/* 移动端底栏 */}
        <nav
          className="fixed inset-x-0 bottom-0 z-40 md:hidden"
          style={{
            background: "rgba(14, 11, 8, 0.9)",
            backdropFilter: "blur(16px)",
            WebkitBackdropFilter: "blur(16px)",
            borderTop: "1px solid rgba(201, 160, 94, 0.1)",
          }}
        >
          <div
            className="grid grid-cols-5 gap-1 px-2 py-2"
            style={{ paddingBottom: "max(0.5rem, env(safe-area-inset-bottom))" }}
          >
            {[
              { href: "/", label: "首页", icon: "🏠" },
              { href: "/almanac", label: "黄历", icon: "📅" },
              { href: "/lottery", label: "灵签", icon: "🎋" },
              { href: "/bazi", label: "八字", icon: "☯️" },
              { href: "/profile", label: "我的", icon: "🍀" },
            ].map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="flex flex-col items-center gap-0.5 text-xs text-paper-dark/60 active:text-gold transition-colors"
              >
                <span className="text-lg leading-none">{item.icon}</span>
                <span>{item.label}</span>
              </a>
            ))}
          </div>
        </nav>

        {/* Footer */}
        <footer className="relative z-10" style={{ borderTop: "1px solid rgba(201, 160, 94, 0.06)" }}>
          <div className="mx-auto max-w-5xl px-4 pt-10 pb-24 text-center">
            <p
              className="text-sm leading-relaxed"
              style={{ color: "rgba(201, 160, 94, 0.4)" }}
            >
              命自我立，福自我求。诸恶莫作，众善奉行。
            </p>
            <p className="mt-3 text-xs" style={{ color: "rgba(212, 196, 160, 0.2)" }}>
              玄机阁 · 传统文化 AI 参考，不替代专业建议
            </p>
          </div>
        </footer>

        {/* 背景音乐播放器 */}
        <MusicPlayer />
        </AuthProvider>
      </body>
    </html>
  );
}
