export default function Home() {
  const features = [
    {
      href: "/almanac",
      icon: (
        <svg viewBox="0 0 40 40" width="36" height="36" fill="none">
          <rect x="6" y="8" width="28" height="28" rx="4" stroke="currentColor" strokeWidth="1.5" opacity="0.7"/>
          <path d="M12 16h16M12 22h10M12 28h12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.6"/>
          <circle cx="28" cy="12" r="3" fill="currentColor" opacity="0.5"/>
        </svg>
      ),
      tag: "每日免费",
      title: "今日黄历",
      desc: "干支宜忌、神煞冲煞、十二时辰，传统择吉一目了然。",
      color: "#c9a05e",
    },
    {
      href: "/lottery",
      icon: (
        <svg viewBox="0 0 40 40" width="36" height="36" fill="none">
          <path d="M20 4L20 28" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.6"/>
          <path d="M20 28L20 36" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          <path d="M12 10L28 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.5"/>
          <path d="M10 18L30 18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.5"/>
          <path d="M14 26L26 26" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.5"/>
        </svg>
      ),
      tag: "传统签谱",
      title: "关帝灵签",
      desc: "心诚则灵，一签一事。100 支签文出自传统签谱。",
      color: "#8b6914",
    },
    {
      href: "/bazi",
      icon: (
        <svg viewBox="0 0 40 40" width="36" height="36" fill="none">
          <circle cx="20" cy="20" r="14" stroke="currentColor" strokeWidth="1.5" opacity="0.6"/>
          <circle cx="20" cy="20" r="6" stroke="currentColor" strokeWidth="1.5" opacity="0.8"/>
          <path d="M20 6V20M20 20L34 20M20 20L6 20M20 20L20 34" stroke="currentColor" strokeWidth="1" opacity="0.4"/>
          <circle cx="20" cy="20" r="2" fill="currentColor" opacity="0.8"/>
        </svg>
      ),
      tag: "AI 精批",
      title: "八字精批",
      desc: "立春节气真排盘，AI 引经据典解读命格根骨与气运。",
      color: "#c9a05e",
    },
    {
      href: "/dream",
      icon: (
        <svg viewBox="0 0 40 40" width="36" height="36" fill="none">
          <path d="M20 6C12 6 8 14 8 20C8 26 12 34 20 34C28 34 32 26 32 20C32 14 28 6 20 6Z" stroke="currentColor" strokeWidth="1.5" opacity="0.6"/>
          <path d="M14 18C14 18 16 22 20 22C24 22 26 18 26 18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.7"/>
          <circle cx="14" cy="14" r="1.5" fill="currentColor" opacity="0.5"/>
          <circle cx="26" cy="14" r="1.5" fill="currentColor" opacity="0.5"/>
          <path d="M10 30C10 30 14 26 20 28C26 30 30 26 30 26" stroke="currentColor" strokeWidth="1" strokeLinecap="round" opacity="0.4"/>
        </svg>
      ),
      tag: "经典解梦",
      title: "周公解梦",
      desc: "百梦皆有意，古今相参证。AI 帮你解读梦境吉凶。",
      color: "#9b7ec9",
    },
    {
      href: "/liuyao",
      icon: (
        <svg viewBox="0 0 40 40" width="36" height="36" fill="none">
          <path d="M20 6L24 14L32 16L26 22L28 30L20 26L12 30L14 22L8 16L16 14L20 6Z" stroke="currentColor" strokeWidth="1.5" opacity="0.7" strokeLinejoin="round"/>
          <circle cx="20" cy="18" r="3" stroke="currentColor" strokeWidth="1.5" opacity="0.6"/>
        </svg>
      ),
      tag: "周易卦例",
      title: "六爻占卜",
      desc: "心起一念，三铜起卦，观爻象之变，定一时之趋避。",
      color: "#5e8bc9",
    },
    {
      href: "/pay",
      icon: (
        <svg viewBox="0 0 40 40" width="36" height="36" fill="none">
          <circle cx="20" cy="20" r="13" stroke="currentColor" strokeWidth="1.5" opacity="0.5"/>
          <path d="M20 8V20L26 26" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.7"/>
          <circle cx="20" cy="20" r="2" fill="currentColor" opacity="0.9"/>
        </svg>
      ),
      tag: "深度解读",
      title: "付费精批",
      desc: "DeepSeek AI 深度解读，三位师父风格任选，引文皆有出处。",
      color: "#c95e7a",
    },
  ];

  return (
    <div className="mx-auto max-w-5xl px-4">
      {/* Hero */}
      <section className="flex min-h-[calc(80vh)] flex-col items-center justify-center gap-8 text-center py-16">
        <div
          className="space-y-6 animate-float-up"
          style={{ animationDelay: "0s" }}
        >
          {/* 旋转光环图标 */}
          <div className="hero-icon mx-auto mb-2">
            <span className="text-5xl" style={{ position: "relative", zIndex: 1 }}>☯️</span>
          </div>

          {/* 主标题 */}
          <h1
            className="text-5xl md:text-7xl font-display gold-text tracking-widest"
            style={{
              textShadow: "0 0 40px rgba(201,160,94,0.3), 0 0 80px rgba(201,160,94,0.1)",
            }}
          >
            玄机阁
          </h1>

          {/* 副标题 */}
          <p
            className="text-base md:text-lg leading-loose"
            style={{ color: "rgba(212, 196, 160, 0.7)" }}
          >
            以古籍为根，以 AI 为引
            <br />
            <span style={{ letterSpacing: "0.3em" }}>祈福 · 求签 · 八字 · 解梦</span>
          </p>

          {/* 装饰线 */}
          <div
            className="mx-auto h-px w-48"
            style={{
              background: "linear-gradient(90deg, transparent, rgba(201,160,94,0.5), transparent)",
            }}
          />
        </div>

        {/* CTA 按钮 */}
        <div
          className="flex flex-col gap-4 sm:flex-row animate-float-up"
          style={{ animationDelay: "0.2s" }}
        >
          <a
            href="/lottery"
            className="btn-primary min-w-[180px] text-base"
          >
            🎋 求一支灵签
          </a>
          <a
            href="/bazi"
            className="btn-gold min-w-[180px] text-base"
          >
            ☯️ 八字精批
          </a>
        </div>

        {/* 底部提示 */}
        <p
          className="text-xs animate-float-up"
          style={{ animationDelay: "0.35s", color: "rgba(201,160,94,0.25)" }}
        >
          🎵 点击任意处开启背景音乐
        </p>
      </section>

      {/* 六大法门 */}
      <section className="pb-16">
        <div className="section-heading">
          <span className="badge-gold mb-3">✨ 六大法门</span>
          <h2>命理六术</h2>
        </div>

        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {features.map((f, i) => (
            <a
              key={f.href}
              href={f.href}
              className="card-featured group feature-card"
              style={{ animationDelay: `${i * 0.07}s` }}
            >
              <div className="flex items-start justify-between mb-4">
                <div
                  className="feature-icon text-paper-dark"
                  style={{ color: f.color }}
                >
                  {f.icon}
                </div>
                <span className="badge-gold flex-shrink-0">{f.tag}</span>
              </div>
              <h3
                className="text-2xl font-display mb-2"
                style={{
                  color: f.color,
                  textShadow: `0 0 20px ${f.color}33`,
                }}
              >
                {f.title}
              </h3>
              <p
                className="text-sm leading-relaxed"
                style={{ color: "rgba(212, 196, 160, 0.6)" }}
              >
                {f.desc}
              </p>
              {/* 悬停时的金色底部指示线 */}
              <div
                className="mt-4 h-px transition-all duration-300"
                style={{
                  background: `linear-gradient(90deg, ${f.color}66, transparent)`,
                  width: "40%",
                }}
              />
            </a>
          ))}
        </div>
      </section>

      {/* 为什么选玄机阁 */}
      <section className="pb-16">
        <div className="card-glass p-8 md:p-10 text-center">
          <span className="badge-gold mb-4">真排盘 · 古籍为据 · AI 开示</span>
          <h2
            className="text-2xl md:text-3xl font-display gold-text mb-8"
            style={{ letterSpacing: "0.1em" }}
          >
            为何选玄机阁
          </h2>

          <div className="grid gap-5 md:grid-cols-3">
            {[
              {
                title: "古籍为根",
                desc: "引用《渊海子平》《滴天髓》《周易》等经典，引文皆有出处。",
                icon: "📜",
              },
              {
                title: "AI 开示",
                desc: "DeepSeek 大模型深度学习命理古籍，三位师父风格任选。",
                icon: "🤖",
              },
              {
                title: "心诚为本",
                desc: "仅供参考，不替代医疗、法律、投资建议。心诚则灵。",
                icon: "🙏",
              },
            ].map((item, i) => (
              <div
                key={item.title}
                className="rounded-xl p-5 text-left"
                style={{
                  background: "rgba(201, 160, 94, 0.04)",
                  border: "1px solid rgba(201, 160, 94, 0.1)",
                }}
              >
                <p
                  className="text-2xl mb-3"
                  style={{ filter: "drop-shadow(0 0 6px rgba(201,160,94,0.4))" }}
                >
                  {item.icon}
                </p>
                <p className="text-lg text-gold font-display mb-2">{item.title}</p>
                <p
                  className="text-sm leading-relaxed"
                  style={{ color: "rgba(212, 196, 160, 0.6)" }}
                >
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 免责声明 */}
      <section className="pb-12">
        <div
          className="mx-auto max-w-2xl rounded-xl p-5 text-center"
          style={{
            background: "rgba(201, 48, 48, 0.04)",
            border: "1px solid rgba(201, 48, 48, 0.1)",
          }}
        >
          <p
            className="text-xs leading-relaxed"
            style={{ color: "rgba(212, 196, 160, 0.3)" }}
          >
            ⚠️ 本网站所有 AI 解读仅供参考娱乐，不构成任何形式的命理咨询、医疗建议、法律建议或投资建议。
            命运由心而生，请理性对待。
          </p>
        </div>
      </section>
    </div>
  );
}
