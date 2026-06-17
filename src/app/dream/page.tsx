"use client";

import { useState } from "react";

const dreamKeywords: Record<string, { meaning: string; detail: string }> = {
  "水": { meaning: "水主财", detail: "梦见清水主财源，浑水则防口舌。大水入宅主吉昌。" },
  "蛇": { meaning: "蛇主蜕变", detail: "蛇主蜕变与重生。被蛇咬防小人，杀蛇则胜。" },
  "鱼": { meaning: "鱼主余", detail: "鱼跃龙门主功名，捕鱼得财，鱼死则防损。" },
  "鸟": { meaning: "鸟主信", detail: "飞鸟入宅有佳音，鸟鸣报喜，笼中鸟主困。" },
  "树": { meaning: "树主生长", detail: "大树繁茂事业旺，枯树落叶运暂低，花开结果皆吉兆。" },
  "火": { meaning: "火主旺", detail: "火光明亮事业旺，野火防口舌，灶火主家宅安。" },
  "月亮": { meaning: "月主阴", detail: "明月高照有贵人，月缺防感情波折，水中月防虚。" },
  "飞": { meaning: "飞主升", detail: "飞翔主志向高远，飞越高山事业成，飞不高则需努力。" },
  "掉牙": { meaning: "牙主骨肉", detail: "掉牙防亲人有恙，上牙为长辈下牙为晚辈，无血则轻。" },
  "考试": { meaning: "试主验", detail: "梦考试主现实考验，考过则吉，不及格需反思。" },
  "死亡": { meaning: "死主新生", detail: "梦死主旧事终结新生开始，并非凶兆，反多为转运之象。" },
  "结婚": { meaning: "婚主合", detail: "梦婚主合作或感情变化，未婚者主良缘，已婚者防争执。" },
  "怀孕": { meaning: "孕主生", detail: "孕主新事将成，非必真孕，可指新项目、新机遇。" },
  "鬼": { meaning: "鬼主疑", detail: "梦鬼主心中有疑虑或未了之事，正面面对可化解。" },
};

export default function DreamPage() {
  const [dream, setDream] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  const interpret = () => {
    setLoading(true);
    const matched = Object.entries(dreamKeywords).filter(([k]) => dream.includes(k));
    let text = "";
    if (matched.length > 0) {
      matched.forEach(([, v]) => {
        text += `【${v.meaning}】${v.detail}\n\n`;
      });
    } else {
      text = "梦境未在经典解梦库中匹配。🔮 可用 AI 深度解梦（¥5.9）获取个性化解读。\n";
    }
    setResult(text);
    setLoading(false);
  };

  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      {/* 页面标题 */}
      <div className="text-center mb-10 animate-float-up">
        <div className="hero-icon mx-auto mb-4" style={{ width: 64, height: 64 }}>
          <span className="text-4xl">🌙</span>
        </div>
        <h1 className="text-4xl font-display gold-text tracking-widest mb-2" style={{ textShadow: "0 0 30px rgba(201,160,94,0.3)" }}>
          周公解梦
        </h1>
        <p style={{ color: "rgba(212, 196, 160, 0.5)" }}>百梦皆有意，古今相参证</p>
        <div className="divider-gold mx-auto mt-6 w-32" />
      </div>

      {/* 解梦输入 */}
      <div className="card-featured space-y-5 animate-float-up" style={{ animationDelay: "0.1s" }}>
        <textarea
          value={dream}
          onChange={(e) => setDream(e.target.value)}
          placeholder="描述你的梦境...（如：梦见一条大蛇在水中游，醒来后感到平静）"
          className="input-base min-h-[120px] resize-y leading-relaxed"
          style={{ fontSize: "0.9375rem" }}
        />
        <div className="flex gap-3 justify-center flex-wrap">
          <button
            onClick={interpret}
            disabled={loading || !dream.trim()}
            className="btn-gold px-6 py-2.5 disabled:opacity-40"
          >
            {loading ? "🔍 解梦中..." : "📖 免费查解"}
          </button>
          <button
            onClick={() => setResult("🔮 AI 深度解梦（¥5.9）即将上线，通过彩虹发卡自动交付。")}
            className="btn-primary px-6 py-2.5"
          >
            🔮 AI 深度解梦 ¥5.9
          </button>
        </div>
      </div>

      {/* 解梦结果 */}
      {result && (
        <div className="card-featured mt-6 animate-float-up">
          <div className="text-center mb-4">
            <span className="text-3xl">🌙</span>
            <h2 className="text-xl text-gold font-display mt-1">解梦结果</h2>
          </div>
          <div
            className="leading-relaxed whitespace-pre-wrap"
            style={{ color: "rgba(212,196,160,0.8)" }}
          >
            {result}
          </div>
        </div>
      )}

      {/* 常见梦境提示 */}
      <div className="card-glass mt-8 p-6 animate-float-up" style={{ animationDelay: "0.2s" }}>
        <h3 className="text-gold font-display text-center mb-4">💡 常见梦境关键词</h3>
        <div className="flex flex-wrap gap-2 justify-center">
          {Object.keys(dreamKeywords).map((k) => (
            <button
              key={k}
              onClick={() => setDream(prev => prev ? `${prev}、${k}` : k)}
              className="text-xs px-2.5 py-1 rounded-full"
              style={{
                border: "1px solid rgba(201,160,94,0.2)",
                color: "rgba(201,160,94,0.6)",
                background: "rgba(201,160,94,0.04)",
              }}
            >
              {k}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
