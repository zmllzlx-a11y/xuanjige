export default function Home() {
  const features = [
    {
      href: "/constitution",
      icon: (
        <svg viewBox="0 0 40 40" width="36" height="36" fill="none">
          <circle cx="20" cy="20" r="14" stroke="currentColor" strokeWidth="1.5" opacity="0.7"/>
          <circle cx="20" cy="20" r="7" stroke="currentColor" strokeWidth="1.5" opacity="0.5"/>
          <circle cx="20" cy="20" r="2.5" fill="currentColor" opacity="0.9"/>
          <path d="M20 6V20M20 20L32 28M20 20L8 28M20 20L20 34" stroke="currentColor" strokeWidth="1" opacity="0.4"/>
        </svg>
      ),
      tag: "免费测评",
      title: "九种体质测评",
      desc: "基于《黄帝内经》体质分类，9道题辨明自身体质类型，获取个性化养生方案。",
      color: "#5D8A66",
    },
    {
      href: "/season",
      icon: (
        <svg viewBox="0 0 40 40" width="36" height="36" fill="none">
          <circle cx="20" cy="16" r="7" stroke="currentColor" strokeWidth="1.5" opacity="0.7"/>
          <path d="M20 23V34" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.6"/>
          <path d="M14 28H26" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.5"/>
          <path d="M20 6L23 9M20 6L17 9" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" opacity="0.4"/>
          <circle cx="8" cy="12" r="1.5" fill="currentColor" opacity="0.3"/>
          <circle cx="32" cy="10" r="1" fill="currentColor" opacity="0.25"/>
        </svg>
      ),
      tag: "每日更新",
      title: "二十四节气养生",
      desc: "春生夏长，秋收冬藏。顺应节气变换，调整饮食起居，养护身心健康。",
      color: "#8FBC9A",
    },
    {
      href: "/herb",
      icon: (
        <svg viewBox="0 0 40 40" width="36" height="36" fill="none">
          <path d="M20 6C20 6 12 14 12 22C12 27.5 15.5 32 20 32C24.5 32 28 27.5 28 22C28 14 20 6 20 6Z" stroke="currentColor" strokeWidth="1.5" opacity="0.7"/>
          <path d="M20 12V28" stroke="currentColor" strokeWidth="1" opacity="0.4"/>
          <path d="M16 18C18 20 22 20 24 18" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" opacity="0.5"/>
          <path d="M15 24C17.5 26 22.5 26 25 24" stroke="currentColor" strokeWidth="1" strokeLinecap="round" opacity="0.4"/>
        </svg>
      ),
      tag: "经典药典",
      title: "草药百科",
      desc: "人参、黄芪、枸杞……每味草药的性味归经、功效用法、配伍禁忌，一查便知。",
      color: "#7A9E7E",
    },
    {
      href: "/diet",
      icon: (
        <svg viewBox="0 0 40 40" width="36" height="36" fill="none">
          <path d="M12 30C12 30 14 10 20 8C26 10 28 30 28 30" stroke="currentColor" strokeWidth="1.5" opacity="0.7"/>
          <ellipse cx="20" cy="30" rx="8" ry="3" stroke="currentColor" strokeWidth="1.5" opacity="0.5"/>
          <path d="M16 18C16 18 18 20 20 20C22 20 24 18 24 18" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" opacity="0.4"/>
          <path d="M18 14C18 14 19 15 20 15C21 15 22 14 22 14" stroke="currentColor" strokeWidth="1" strokeLinecap="round" opacity="0.3"/>
        </svg>
      ),
      tag: "美味养生",
      title: "药膳食谱",
      desc: "药食同源，吃出健康。百种药膳方子，覆盖四季养生、调理体质、日常滋补。",
      color: "#C9A35A",
    },
    {
      href: "/acupoint",
      icon: (
        <svg viewBox="0 0 40 40" width="36" height="36" fill="none">
          <path d="M20 6V34" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.5"/>
          <path d="M12 14H28" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.5"/>
          <circle cx="20" cy="14" r="4" stroke="currentColor" strokeWidth="1.5" opacity="0.7"/>
          <circle cx="20" cy="14" r="1.5" fill="currentColor" opacity="0.9"/>
          <circle cx="20" cy="22" r="3" stroke="currentColor" strokeWidth="1.2" opacity="0.5"/>
          <circle cx="20" cy="22" r="1" fill="currentColor" opacity="0.8"/>
          <circle cx="20" cy="30" r="3.5" stroke="currentColor" strokeWidth="1.2" opacity="0.4"/>
        </svg>
      ),
      tag: "循经取穴",
      title: "经络穴位",
      desc: "十二正经、奇经八脉，全身经络循行路线、常用穴位定位与功效，一目了然。",
      color: "#5A8FAF",
    },
    {
      href: "/ask",
      icon: (
        <svg viewBox="0 0 40 40" width="36" height="36" fill="none">
          <path d="M20 6C12 6 8 12 8 18C8 22 10 25 13 27V30H27V27C30 25 32 22 32 18C32 12 28 6 20 6Z" stroke="currentColor" strokeWidth="1.5" opacity="0.6"/>
          <circle cx="20" cy="18" r="5" stroke="currentColor" strokeWidth="1.5" opacity="0.7"/>
          <circle cx="20" cy="18" r="2" fill="currentColor" opacity="0.9"/>
          <path d="M16 32H24" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.5"/>
        </svg>
      ),
      tag: "AI顾问",
      title: "AI养生顾问",
      desc: "DeepSeek大模型驱动，基于中医经典理论，回答你的养生困惑，给出辨证建议。",
      color: "#D4956A",
    },
  ];

  return (
    <div className="mx-auto max-w-5xl px-4">
      {/* Hero */}
      <section className="flex min-h-[calc(80vh)] flex-col items-center justify-center gap-8 text-center py-16">
        <div className="space-y-6 animate-float-up" style={{ animationDelay: "0s" }}>
          {/* 品牌图标 */}
          <div className="hero-icon mx-auto mb-2">
            <span className="text-5xl" style={{ position: "relative", zIndex: 1 }}>🌿</span>
          </div>

          {/* 主标题 */}
          <h1
            className="text-5xl md:text-7xl font-display green-text tracking-widest"
            style={{ textShadow: "0 0 40px rgba(93,138,102,0.3), 0 0 80px rgba(93,138,102,0.1)" }}
          >
            素问居
          </h1>

          {/* 副标题 */}
          <p className="text-base md:text-lg leading-loose" style={{ color: "rgba(232,228,218,0.6)" }}>
            以《黄帝内经》为根，以 AI 为引
            <br />
            <span style={{ letterSpacing: "0.3em" }}>体质 · 节气 · 药膳 · 经络</span>
          </p>

          {/* 装饰线 */}
          <div className="mx-auto h-px w-48"
            style={{ background: "linear-gradient(90deg, transparent, rgba(93,138,102,0.5), transparent)" }} />

          {/* 引用 */}
          <p className="text-xs italic" style={{ color: "rgba(93,138,102,0.4)", maxWidth: 400 }}>
            「上医治未病，中医治欲病，下医治已病」
          </p>
        </div>

        {/* CTA 按钮 */}
        <div className="flex flex-col gap-4 sm:flex-row animate-float-up"
          style={{ animationDelay: "0.2s" }}>
          <a href="/constitution" className="btn-primary min-w-[180px] text-base">
            🔍 免费体质测评
          </a>
          <a href="/season" className="btn-gold min-w-[180px] text-base">
            📅 今日节气养生
          </a>
        </div>

        {/* 底部提示 */}
        <p className="text-xs animate-float-up" style={{ animationDelay: "0.35s", color: "rgba(93,138,102,0.25)" }}>
          🎵 点击任意处开启背景音乐
        </p>
      </section>

      {/* 六大模块 */}
      <section className="pb-16">
        <div className="section-heading">
          <span className="badge-green mb-3">✨ 养生六法</span>
          <h2>中医养生指南</h2>
        </div>

        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {features.map((f, i) => (
            <a key={f.href} href={f.href}
              className="card-featured group feature-card"
              style={{ animationDelay: `${i * 0.07}s` }}>
              <div className="flex items-start justify-between mb-4">
                <div className="feature-icon" style={{ color: f.color }}>
                  {f.icon}
                </div>
                <span className="badge-green flex-shrink-0">{f.tag}</span>
              </div>
              <h3 className="text-2xl font-display mb-2"
                style={{ color: f.color, textShadow: `0 0 20px ${f.color}33` }}>
                {f.title}
              </h3>
              <p className="text-sm leading-relaxed" style={{ color: "rgba(232,228,218,0.55)" }}>
                {f.desc}
              </p>
              <div className="mt-4 h-px transition-all duration-300"
                style={{ background: `linear-gradient(90deg, ${f.color}66, transparent)`, width: "40%" }} />
            </a>
          ))}
        </div>
      </section>

      {/* 体质测评展示 */}
      <section className="pb-16">
        <div className="card-glass p-8 md:p-10">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <span className="badge-green mb-3">🔥 热门功能</span>
              <h2 className="text-2xl md:text-3xl font-display green-text mb-4" style={{ letterSpacing: "0.08em" }}>
                九种体质，辨明根源
              </h2>
              <p className="text-sm leading-relaxed mb-6" style={{ color: "rgba(232,228,218,0.6)" }}>
                依据《黄帝内经》经典理论，将人体体质分为九种：平和质、气虚质、阳虚质、阴虚质、痰湿质、湿热质、血瘀质、气郁质、特禀质。
                通过科学的问卷评估，帮你精准识别自身体质类型。
              </p>
              <ul className="space-y-2 text-sm" style={{ color: "rgba(232,228,218,0.5)" }}>
                {["3分钟完成测评", "基于国家标准体质问卷", "立即获取个性化养生方案", "免费使用"].map(t => (
                  <li key={t} className="flex items-center gap-2">
                    <span style={{ color: "var(--color-swen-green)" }}>✓</span> {t}
                  </li>
                ))}
              </ul>
              <a href="/constitution" className="btn-primary mt-6 inline-flex">
                开始测评 →
              </a>
            </div>
            <div className="flex justify-center">
              <div className="relative">
                {/* 雷达图示意 */}
                <div className="w-64 h-64 rounded-full border border-swen-green/20 flex items-center justify-center"
                  style={{ background: "radial-gradient(circle, rgba(93,138,102,0.08) 0%, transparent 70%)" }}>
                  {Array.from({ length: 9 }, (_, i) => (
                    <div key={i} className="absolute w-full h-px bg-swen-green/10"
                      style={{ transform: `rotate(${i * 40}deg)`, transformOrigin: "center" }} />
                  ))}
                  {[0.3, 0.55, 0.8].map((r, i) => (
                    <div key={r} className="absolute rounded-full border border-swen-green/10"
                      style={{ width: `${r * 256}px`, height: `${r * 256}px` }} />
                  ))}
                  {/* 模拟数据多边形 */}
                  <svg className="absolute inset-0 w-full h-full" viewBox="0 0 256 256">
                    <polygon
                      points="128,28 178,68 178,148 128,188 78,148 78,68"
                      fill="rgba(93,138,102,0.2)"
                      stroke="rgba(93,138,102,0.6)"
                      strokeWidth="1.5"
                    />
                    <polygon
                      points="128,60 160,82 160,128 128,150 96,128 96,82"
                      fill="rgba(93,138,102,0.3)"
                      stroke="rgba(93,138,102,0.8)"
                      strokeWidth="1.5"
                    />
                  </svg>
                  <div className="text-center">
                    <p className="text-2xl font-display green-text">气虚质</p>
                    <p className="text-xs mt-1" style={{ color: "rgba(93,138,102,0.6)" }}>示例结果</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 为什么选素问居 */}
      <section className="pb-16">
        <div className="card-glass p-8 md:p-10 text-center">
          <span className="badge-green mb-4">经典 · AI · 实用</span>
          <h2 className="text-2xl md:text-3xl font-display green-text mb-8" style={{ letterSpacing: "0.1em" }}>
            为何选择素问居
          </h2>
          <div className="grid gap-5 md:grid-cols-3">
            {[
              {
                title: "经典为据",
                desc: "所有养生建议均源自《黄帝内经》《伤寒论》等中医经典，引文有出处。",
                icon: "📜",
              },
              {
                title: "AI辨证",
                desc: "DeepSeek大模型深度学习中医古籍，结合你的体质与症状，给出个性化建议。",
                icon: "🤖",
              },
              {
                title: "实用导向",
                desc: "不空谈理论，给你可操作的养生方案：吃什么、怎么做、什么时候做。",
                icon: "🍃",
              },
            ].map((item) => (
              <div key={item.title} className="rounded-xl p-5 text-left"
                style={{ background: "rgba(93,138,102,0.04)", border: "1px solid rgba(93,138,102,0.1)" }}>
                <p className="text-2xl mb-3" style={{ filter: "drop-shadow(0 0 6px rgba(93,138,102,0.4))" }}>
                  {item.icon}
                </p>
                <p className="text-lg font-display" style={{ color: "var(--color-swen-green-light)" }}>{item.title}</p>
                <p className="text-sm leading-relaxed mt-2" style={{ color: "rgba(232,228,218,0.55)" }}>
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 免责声明 */}
      <section className="pb-12">
        <div className="mx-auto max-w-2xl rounded-xl p-5 text-center"
          style={{ background: "rgba(93,138,102,0.03)", border: "1px solid rgba(93,138,102,0.08)" }}>
          <p className="text-xs leading-relaxed" style={{ color: "rgba(232,228,218,0.25)" }}>
            ⚠️ 本网站所有内容仅供养生参考，不构成任何医疗诊断、治疗或处方建议。
            如有疾病症状，请及时就医。AI建议仅供参考，心诚则灵，理性对待。
          </p>
        </div>
      </section>
    </div>
  );
}
