"use client";

import { useState } from "react";
import { getRandomSign } from "@/lib/lottery";

export default function LotteryPage() {
  const [sign, setSign] = useState<ReturnType<typeof getRandomSign> | null>(null);
  const [shaking, setShaking] = useState(false);

  const draw = () => {
    setShaking(true);
    setTimeout(() => {
      setSign(getRandomSign());
      setShaking(false);
    }, 800);
  };

  const levelStyle: Record<string, { badge: string; border: string; bg: string }> = {
    "上上签": { badge: "text-yellow-300 border-yellow-300/50 bg-yellow-300/10", border: "#eab308", bg: "rgba(234,179,8,0.06)" },
    "上吉签": { badge: "text-yellow-200 border-yellow-200/50 bg-yellow-200/10", border: "#fde047", bg: "rgba(253,224,71,0.05)" },
    "中吉签": { badge: "text-green-300 border-green-300/50 bg-green-300/10", border: "#4ade80", bg: "rgba(74,222,128,0.05)" },
    "中平签": { badge: "text-blue-300 border-blue-300/50 bg-blue-300/10", border: "#60a5fa", bg: "rgba(96,165,250,0.05)" },
    "下下签": { badge: "text-red-300 border-red-300/50 bg-red-300/10", border: "#f87171", bg: "rgba(248,113,113,0.05)" },
  };

  const style = sign ? levelStyle[sign.level] : null;

  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      {/* 页面标题 */}
      <div className="text-center mb-10 animate-float-up">
        <div className="hero-icon mx-auto mb-4" style={{ width: 64, height: 64 }}>
          <span className="text-4xl">🎋</span>
        </div>
        <h1 className="text-4xl font-display gold-text tracking-widest mb-2" style={{ textShadow: "0 0 30px rgba(201,160,94,0.3)" }}>
          关帝灵签
        </h1>
        <p style={{ color: "rgba(212, 196, 160, 0.5)" }}>心诚则灵，一签一事</p>
        <div className="divider-gold mx-auto mt-6 w-32" />
      </div>

      {/* 摇签区 */}
      <div className="card-featured mb-8 text-center animate-float-up" style={{ animationDelay: "0.1s" }}>
        <div className={`text-8xl mb-6 select-none ${shaking ? "animate-shake" : ""}`}>
          🎋
        </div>
        <p className="mb-6 text-sm" style={{ color: "rgba(212,196,160,0.5)" }}>
          心中默念所问之事，轻触下方按钮
        </p>
        <button
          onClick={draw}
          disabled={shaking}
          className="btn-primary min-w-[200px] text-base disabled:opacity-50"
        >
          {shaking ? "🙏 摇签中..." : "🙏 诚心求签"}
        </button>
      </div>

      {/* 签文 */}
      {sign && (
        <div
          className="card-featured space-y-6 animate-float-up"
          style={{
            borderColor: style?.border ? `${style.border}44` : undefined,
            boxShadow: style?.border ? `0 0 30px ${style.border}22` : undefined,
          }}
        >
          {/* 签号 & 等级 */}
          <div className="flex items-center justify-center gap-4">
            <div>
              <p
                className="text-2xl font-display gold-text"
                style={{ textShadow: "0 0 20px rgba(201,160,94,0.3)" }}
              >
                第 {sign.number} 签
              </p>
            </div>
            <span
              className={`rounded-full border px-4 py-1 text-sm font-medium ${style?.badge}`}
            >
              {sign.level}
            </span>
          </div>

          {/* 签诗 */}
          <div
            className="rounded-2xl p-6 md:p-8 text-center"
            style={{
              border: "1px solid rgba(201,160,94,0.2)",
              background: "rgba(201,160,94,0.03)",
            }}
          >
            <p
              className="text-xl md:text-2xl leading-relaxed text-paper-dark font-display tracking-wider"
              style={{ textShadow: "0 0 20px rgba(201,160,94,0.15)" }}
            >
              {sign.poem}
            </p>
          </div>

          {/* 解签 */}
          <p
            className="leading-relaxed text-center"
            style={{ color: "rgba(212,196,160,0.7)" }}
          >
            {sign.interpretation}
          </p>

          <div className="divider-gold" />

          {/* 各项指引 */}
          <div className="grid grid-cols-2 gap-4">
            {[
              { icon: "💼", label: "事业", text: sign.career },
              { icon: "💰", label: "财运", text: sign.wealth },
              { icon: "💕", label: "感情", text: sign.love },
              { icon: "🏥", label: "健康", text: sign.health },
            ].map((item) => (
              <div
                key={item.label}
                className="rounded-xl p-4"
                style={{
                  border: "1px solid rgba(201,160,94,0.1)",
                  background: "rgba(34,27,20,0.4)",
                }}
              >
                <p className="text-gold text-sm mb-1 flex items-center gap-1.5">
                  <span>{item.icon}</span> {item.label}
                </p>
                <p className="text-sm" style={{ color: "rgba(212,196,160,0.6)" }}>
                  {item.text}
                </p>
              </div>
            ))}
          </div>

          {/* AI 深度解签引导 */}
          <div
            className="rounded-xl p-5 text-center"
            style={{
              border: "1px solid rgba(197,48,48,0.2)",
              background: "rgba(197,48,48,0.04)",
            }}
          >
            <p className="mb-3 text-sm" style={{ color: "#e53e3e" }}>
              🔮 想要 AI 深度解读此签？
            </p>
            <a href="/pay" className="btn-primary inline-block px-6 py-2 text-sm">
              付费精批 · 5.9 元
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
