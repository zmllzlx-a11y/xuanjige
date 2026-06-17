import { getAlmanac } from "@/lib/almanac";

export default function AlmanacPage() {
  const today = new Date();
  const cal = getAlmanac(today);

  return (
    <div className="mx-auto max-w-4xl px-4 py-10">
      {/* 页面标题 */}
      <div className="text-center mb-10 animate-float-up">
        <div className="hero-icon mx-auto mb-4" style={{ width: 64, height: 64 }}>
          <span className="text-4xl">📅</span>
        </div>
        <h1 className="text-4xl font-display gold-text tracking-widest mb-2" style={{ textShadow: "0 0 30px rgba(201,160,94,0.3)" }}>
          今日黄历
        </h1>
        <div className="divider-gold mx-auto mt-6 w-32" />
      </div>

      <div className="card-featured space-y-6 animate-float-up" style={{ animationDelay: "0.1s" }}>
        {/* 日期 */}
        <div className="text-center space-y-2">
          <p
            className="text-2xl"
            style={{ color: "rgba(212,196,160,0.8)" }}
          >
            {cal.date}
          </p>
          <p
            className="text-xl font-display gold-text"
            style={{ textShadow: "0 0 15px rgba(201,160,94,0.25)" }}
          >
            {cal.zodiac}年 · {cal.yearGZ}年 {cal.monthGZ}月 {cal.dayGZ}日
          </p>
          <p className="text-sm" style={{ color: "rgba(212,196,160,0.4)" }}>
            五行 {cal.wuxing} · 纳音 {cal.nayin}
          </p>
        </div>

        <div className="divider-gold" />

        {/* 宜忌 */}
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-lg font-display mb-3" style={{ color: "#4ade80" }}>✅ 宜</h2>
            <div className="flex flex-wrap gap-2">
              {cal.yi.map((item) => (
                <span
                  key={item}
                  className="rounded-full border px-3 py-1 text-sm"
                  style={{
                    color: "#4ade80",
                    borderColor: "rgba(74,222,128,0.3)",
                    background: "rgba(74,222,128,0.06)",
                  }}
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
          <div>
            <h2 className="text-lg font-display mb-3" style={{ color: "#f87171" }}>❌ 忌</h2>
            <div className="flex flex-wrap gap-2">
              {cal.ji.map((item) => (
                <span
                  key={item}
                  className="rounded-full border px-3 py-1 text-sm"
                  style={{
                    color: "#f87171",
                    borderColor: "rgba(248,113,113,0.3)",
                    background: "rgba(248,113,113,0.06)",
                  }}
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="divider-gold" />

        {/* 冲煞 */}
        <div
          className="text-center rounded-xl p-4"
          style={{
            border: "1px solid rgba(201,160,94,0.15)",
            background: "rgba(201,160,94,0.04)",
          }}
        >
          <p className="text-gold font-display text-lg">
            {cal.chong} · {cal.sha}
          </p>
        </div>

        <div className="divider-gold" />

        {/* 十二时辰 */}
        <div>
          <h2 className="text-lg text-gold font-display text-center mb-5">⏰ 十二时辰</h2>
          <div className="grid grid-cols-3 md:grid-cols-4 gap-3">
            {cal.hours.map((h) => (
              <div
                key={h.zhi}
                className="rounded-xl p-3 text-center"
                style={{
                  border: "1px solid rgba(201,160,94,0.12)",
                  background: "rgba(34,27,20,0.5)",
                }}
              >
                <p className="text-gold font-display text-lg">{h.gan}{h.zhi}</p>
                <p className="text-xs mt-1" style={{ color: "rgba(212,196,160,0.35)" }}>{h.time}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <p className="text-center text-xs mt-8" style={{ color: "rgba(212,196,160,0.2)" }}>
        黄历仅供参考，不作为决策依据
      </p>
    </div>
  );
}
