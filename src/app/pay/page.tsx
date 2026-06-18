"use client";

import { useRouter } from "next/navigation";

const PRODUCTS = [
  {
    id: "bazi-deep",
    name: "八字精批（深度解读）",
    price: "9.9",
    desc: "DeepSeek AI 引经据典，三位师父风格解读命格、事业、财运、感情、健康。",
    features: ["命格强弱分析", "事业方向指引", "财运偏正分析", "感情姻缘解读", "健康提醒", "流年运势"],
    color: "#c9a05e",
    icon: "☯️",
  },
  {
    id: "lottery-deep",
    name: "灵签深度解签",
    price: "5.9",
    desc: "AI 师父逐句解读签诗，结合当前运势给出详细指引。",
    features: ["签诗逐句解读", "结合八字运势", "具体建议指引"],
    color: "#8b6914",
    icon: "🎋",
  },
  {
    id: "dream-deep",
    name: "周公解梦（深度）",
    price: "5.9",
    desc: "AI 结合传统解梦学与现代心理学深度解读梦境。",
    features: ["传统解梦分析", "心理层面解读", "近期运势提示"],
    color: "#9b7ec9",
    icon: "🌙",
  },
  {
    id: "naming",
    name: "宝宝起名",
    price: "19.9",
    desc: "结合八字喜忌、音韵笔画、典故诗词，给出 5 个精选好名。",
    features: ["八字喜忌分析", "5 个精选名字", "名字详解与出处"],
    color: "#5e8bc9",
    icon: "📖",
  },
];

export default function PayPage() {
  const router = useRouter();
  return (
    <div className="mx-auto max-w-4xl px-4 py-10">
      {/* 页面标题 */}
      <div className="text-center mb-12 animate-float-up">
        <div className="hero-icon mx-auto mb-4" style={{ width: 64, height: 64 }}>
          <span className="text-4xl">🔮</span>
        </div>
        <h1
          className="text-4xl font-display gold-text tracking-widest mb-2"
          style={{ textShadow: "0 0 30px rgba(201,160,94,0.3)" }}
        >
          付费精批
        </h1>
        <p style={{ color: "rgba(212, 196, 160, 0.5)" }}>AI 引经据典，深度解读</p>
        <div className="divider-gold mx-auto mt-6 w-32" />
      </div>

      {/* 产品列表 */}
      <div className="grid gap-5 md:grid-cols-2">
        {PRODUCTS.map((p, i) => (
          <div
            key={p.id}
            className="card-featured space-y-4 animate-float-up"
            style={{ animationDelay: `${i * 0.08}s` }}
          >
            {/* 头部 */}
            <div className="flex items-start justify-between">
              <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center text-3xl"
                style={{
                  background: `${p.color}15`,
                  border: `1px solid ${p.color}33`,
                }}
              >
                {p.icon}
              </div>
              <span className="text-3xl font-display" style={{ color: "#e53e3e" }}>
                ¥{p.price}
              </span>
            </div>

            {/* 名称和描述 */}
            <div>
              <h2
                className="text-xl font-display mb-2"
                style={{ color: p.color, textShadow: `0 0 15px ${p.color}44` }}
              >
                {p.name}
              </h2>
              <p className="text-sm leading-relaxed" style={{ color: "rgba(212,196,160,0.6)" }}>
                {p.desc}
              </p>
            </div>

            {/* 功能列表 */}
            <ul className="space-y-1.5">
              {p.features.map((f) => (
                <li
                  key={f}
                  className="text-sm flex items-center gap-2"
                  style={{ color: "rgba(201,160,94,0.7)" }}
                >
                  <span style={{ color: p.color }}>✓</span> {f}
                </li>
              ))}
            </ul>

            {/* 立即购买按钮 */}
            <button
              onClick={() => router.push(`/checkout?product=${p.id}`)}
              className="w-full py-3 rounded-xl text-sm font-medium transition-all active:scale-[0.98]"
              style={{
                background: `linear-gradient(135deg, ${p.color}dd, ${p.color}88)`,
                color: "#fff",
                boxShadow: `0 4px 16px ${p.color}33`,
              }}
            >
              立即购买 ¥{p.price}
            </button>
          </div>
        ))}
      </div>

      {/* 付款方式 */}
      <div
        className="card-glass mt-10 p-7 animate-float-up"
        style={{ animationDelay: "0.4s" }}
      >
        <h2 className="text-xl text-gold font-display text-center mb-5">💳 付款方式</h2>

        <div className="grid md:grid-cols-2 gap-6 max-w-xl mx-auto">
          {/* 微信收款码 */}
          <div
            className="rounded-xl p-4 text-center"
            style={{
              border: "1px solid rgba(7,193,96,0.3)",
              background: "rgba(7,193,96,0.04)",
            }}
          >
            <p className="font-display text-lg mb-1" style={{ color: "#07c160" }}>● 微信支付</p>
            <p className="text-xs mb-3" style={{ color: "rgba(212,196,160,0.4)" }}>
              扫码付款 · 备注商品名称
            </p>
            <div className="mx-auto w-48 h-48 rounded-xl overflow-hidden">
              <img
                src="/images/wechat-qr.jpg"
                alt="微信收款码"
                className="w-full h-full object-contain"
              />
            </div>
          </div>

          {/* 其他方式 */}
          <div
            className="rounded-xl p-4 text-center"
            style={{
              border: "1px solid rgba(201,160,94,0.3)",
              background: "rgba(201,160,94,0.04)",
            }}
          >
            <p className="font-display text-lg mb-1" style={{ color: "#c9a05e" }}>● 其他方式</p>
            <p className="text-xs mb-3" style={{ color: "rgba(212,196,160,0.4)" }}>
              需要其他支付方式？联系站长协商
            </p>
            <div
              className="mx-auto w-48 h-48 rounded-xl flex items-center justify-center"
              style={{
                border: "2px dashed rgba(201,160,94,0.3)",
                background: "rgba(201,160,94,0.05)",
              }}
            >
              <p className="text-xs text-center" style={{ color: "rgba(212,196,160,0.4)" }}>
                请在右侧<br />联系站长
              </p>
            </div>
          </div>
        </div>

        <div className="divider-gold mx-auto my-6 w-24" />

        {/* 购买流程说明 */}
        <div className="max-w-md mx-auto space-y-3">
          <h3 className="text-sm font-display text-gold text-center mb-3">📋 购买流程</h3>
          {[
            { step: "①", text: "选择商品，扫码支付对应金额，备注商品名称方便核对" },
            { step: "②", text: "付款后将「付款截图」发送给站长确认" },
            { step: "③", text: "确认到账后，站长手动发送 AI 解读结果给您" },
          ].map((s) => (
            <div
              key={s.step}
              className="flex items-start gap-2 text-sm"
              style={{ color: "rgba(212,196,160,0.6)" }}
            >
              <span className="shrink-0 text-gold">{s.step}</span>
              <span>{s.text}</span>
            </div>
          ))}
        </div>
      </div>

      {/* 联系站长 */}
      <div
        className="card-glass mt-6 p-6 animate-float-up text-center"
        style={{ animationDelay: "0.5s" }}
      >
        <h3 className="text-base text-gold font-display mb-3">💬 联系站长</h3>
        <p className="text-sm" style={{ color: "rgba(212,196,160,0.5)" }}>
          付款后请通过以下方式联系站长，发送付款截图：
        </p>
        <div className="flex justify-center gap-6 mt-4">
          <span className="text-sm" style={{ color: "#07c160" }}>微信：扫码上方收款码 → 截图发给我确认</span>
        </div>
      </div>

      {/* 免责声明 */}
      <p
        className="text-center text-xs mt-8"
        style={{ color: "rgba(212,196,160,0.2)" }}
      >
        * 本服务仅供传统文化参考，不替代专业医疗、法律、投资建议
      </p>
    </div>
  );
}
