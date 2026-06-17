"use client";

import { useState } from "react";

// 年龄自动计算
function calcAge(birthday: string): number {
  if (!birthday) return 0;
  const birth = new Date(birthday);
  const today = new Date();
  let age = today.getFullYear() - birth.getFullYear();
  const m = today.getMonth() - birth.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) age--;
  return age;
}

// 生肖
const zodiacMap: Record<string, { name: string; element: string }> = {
  "0": { name: "鼠", element: "水" },
  "1": { name: "牛", element: "土" },
  "2": { name: "虎", element: "木" },
  "3": { name: "兔", element: "木" },
  "4": { name: "龙", element: "土" },
  "5": { name: "蛇", element: "火" },
  "6": { name: "马", element: "火" },
  "7": { name: "羊", element: "土" },
  "8": { name: "猴", element: "金" },
  "9": { name: "鸡", element: "金" },
  "10": { name: "狗", element: "土" },
  "11": { name: "猪", element: "水" },
};

function getZodiac(year: number): string {
  return zodiacMap[String(year % 12)]?.name ?? "未知";
}

// 五行互补评分模拟
function scoreCompatibility(b1: string, b2: string): { score: number; desc: string; details: string[] } {
  const elements = ["金", "木", "水", "火", "土"];
  // 生克关系
  const generates: Record<string, string> = { "金": "水", "水": "木", "木": "火", "火": "土", "土": "金" };
  const overcomes: Record<string, string> = { "金": "木", "木": "土", "土": "水", "水": "火", "火": "金" };

  const e1 = b1; // 简化：直接用生肖五行
  const e2 = b2;

  const details: string[] = [];
  let score = 70; // 基础分

  // 五行相生加分
  if (generates[e1] === e2 || generates[e2] === e1) {
    score += 15;
    details.push("✅ 五行相生，互补增益");
  } else if (overcomes[e1] === e2 || overcomes[e2] === e1) {
    score -= 10;
    details.push("⚠️ 五行相克，需互补调节");
  } else {
    details.push("✓ 五行平和，互不冲犯");
  }

  // 生肖三合六合
  const sanhe: Record<string, string[]> = {
    "鼠": ["猴", "龙"], "牛": ["蛇", "鸡"], "虎": ["马", "狗"],
    "兔": ["猪", "羊"], "龙": ["鼠", "猴"], "蛇": ["牛", "鸡"],
    "马": ["虎", "狗"], "羊": ["兔", "猪"], "猴": ["鼠", "龙"],
    "鸡": ["牛", "蛇"], "狗": ["虎", "马"], "猪": ["兔", "羊"],
  };

  const z1 = getZodiac(parseInt(b1) || 1995);
  const z2 = getZodiac(parseInt(b2) || 1995);

  if (sanhe[z1]?.includes(z2)) {
    score += 10;
    details.push(`🈴 ${z1}${z2}三合，天作之合`);
  }

  if (score > 95) score = 95;
  if (score < 40) score = 40;

  const scoreDesc = score >= 85 ? "上等婚配" : score >= 70 ? "中等婚配" : score >= 55 ? "中下婚配" : "需要磨合";
  return { score, desc: scoreDesc, details };
}

export default function MarriagePage() {
  const [personA, setPersonA] = useState({ name: "", birthday: "" });
  const [personB, setPersonB] = useState({ name: "", birthday: "" });
  const [result, setResult] = useState<ReturnType<typeof scoreCompatibility> | null>(null);

  const analyze = () => {
    if (!personA.birthday || !personB.birthday) return;
    const yearA = new Date(personA.birthday).getFullYear();
    const yearB = new Date(personB.birthday).getFullYear();
    const comp = scoreCompatibility(String(yearA), String(yearB));
    setResult(comp);
  };

  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <div className="text-center mb-10 animate-float-up">
        <div className="hero-icon mx-auto mb-4" style={{ width: 64, height: 64 }}>
          <span className="text-4xl">💑</span>
        </div>
        <h1 className="text-4xl font-display gold-text tracking-widest mb-2" style={{ textShadow: "0 0 30px rgba(201,160,94,0.3)" }}>
          八字合婚
        </h1>
        <p style={{ color: "rgba(212, 196, 160, 0.5)" }}>天赐良缘，命定今生</p>
        <div className="divider-gold mx-auto mt-6 w-32" />
      </div>

      {/* 输入区 */}
      <div className="card-featured p-6 animate-float-up" style={{ animationDelay: "0.1s" }}>
        <div className="grid md:grid-cols-2 gap-5">
          {/* 男方/一方 */}
          <div className="space-y-3">
            <div
              className="text-center py-2 rounded-lg text-sm font-display"
              style={{ background: "rgba(201,160,94,0.08)", color: "#c9a05e" }}
            >
              ☯️ 乾造（男方）
            </div>
            <input
              type="text"
              placeholder="姓名"
              value={personA.name}
              onChange={(e) => setPersonA({ ...personA, name: e.target.value })}
              className="w-full rounded-xl px-4 py-2 text-sm"
              style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(201,160,94,0.1)", color: "#d4c4a0" }}
            />
            <input
              type="date"
              value={personA.birthday}
              onChange={(e) => setPersonA({ ...personA, birthday: e.target.value })}
              className="w-full rounded-xl px-4 py-2 text-sm"
              style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(201,160,94,0.1)", color: "#d4c4a0" }}
            />
            {personA.birthday && (
              <p className="text-xs" style={{ color: "rgba(212,196,160,0.3)" }}>
                生肖：{getZodiac(new Date(personA.birthday).getFullYear())} ｜ {calcAge(personA.birthday)}岁
              </p>
            )}
          </div>

          {/* 女方/另一方 */}
          <div className="space-y-3">
            <div
              className="text-center py-2 rounded-lg text-sm font-display"
              style={{ background: "rgba(201,160,94,0.08)", color: "#c9a05e" }}
            >
              🌸 坤造（女方）
            </div>
            <input
              type="text"
              placeholder="姓名"
              value={personB.name}
              onChange={(e) => setPersonB({ ...personB, name: e.target.value })}
              className="w-full rounded-xl px-4 py-2 text-sm"
              style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(201,160,94,0.1)", color: "#d4c4a0" }}
            />
            <input
              type="date"
              value={personB.birthday}
              onChange={(e) => setPersonB({ ...personB, birthday: e.target.value })}
              className="w-full rounded-xl px-4 py-2 text-sm"
              style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(201,160,94,0.1)", color: "#d4c4a0" }}
            />
            {personB.birthday && (
              <p className="text-xs" style={{ color: "rgba(212,196,160,0.3)" }}>
                生肖：{getZodiac(new Date(personB.birthday).getFullYear())} ｜ {calcAge(personB.birthday)}岁
              </p>
            )}
          </div>
        </div>

        <button
          onClick={analyze}
          disabled={!personA.birthday || !personB.birthday}
          className="w-full mt-5 py-3 rounded-xl text-sm transition-all"
          style={{
            background: (personA.birthday && personB.birthday) ? "rgba(201,160,94,0.12)" : "rgba(255,255,255,0.02)",
            border: `1px solid ${(personA.birthday && personB.birthday) ? "rgba(201,160,94,0.3)" : "rgba(201,160,94,0.05)"}`,
            color: (personA.birthday && personB.birthday) ? "#c9a05e" : "rgba(212,196,160,0.2)",
          }}
        >
          ❤️ 合婚测算
        </button>
      </div>

      {/* 结果 */}
      {result && (
        <div className="mt-6 animate-float-up" style={{ animationDelay: "0.2s" }}>
          {/* 评分 */}
          <div className="card-featured p-6 text-center">
            <p className="text-xs text-gold font-display mb-4">💞 合婚评分</p>
            <div
              className="w-32 h-32 mx-auto rounded-full flex items-center justify-center mb-4"
              style={{
                border: `4px solid ${result.score >= 80 ? "#e53e3e" : result.score >= 65 ? "#c9a05e" : "#8b6914"}`,
                background: `radial-gradient(circle, ${result.score >= 80 ? "rgba(229,62,62,0.1)" : "rgba(201,160,94,0.08)"}, transparent)`,
              }}
            >
              <div>
                <p className="text-4xl font-display" style={{ color: result.score >= 80 ? "#e53e3e" : "#c9a05e" }}>
                  {result.score}
                </p>
                <p className="text-xs" style={{ color: "rgba(212,196,160,0.4)" }}>分</p>
              </div>
            </div>
            <p className="text-lg font-display gold-text mb-4">{result.desc}</p>

            <div className="space-y-2 text-left">
              {result.details.map((d, i) => (
                <div key={i} className="flex items-center gap-2 text-sm" style={{ color: "rgba(212,196,160,0.6)" }}>
                  <span className="text-gold">{d.startsWith("✅") || d.startsWith("🈴") ? "✓" : "·"}</span>
                  <span>{d}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="card-glass mt-4 p-5">
            <p className="text-xs text-gold font-display mb-3">📖 合婚信息</p>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div>
                <p className="text-xs" style={{ color: "rgba(212,196,160,0.3)" }}>{personA.name || "男方"}</p>
                <p className="text-gold/80">{getZodiac(new Date(personA.birthday).getFullYear())} · {calcAge(personA.birthday)}岁</p>
              </div>
              <div>
                <p className="text-xs" style={{ color: "rgba(212,196,160,0.3)" }}>{personB.name || "女方"}</p>
                <p className="text-gold/80">{getZodiac(new Date(personB.birthday).getFullYear())} · {calcAge(personB.birthday)}岁</p>
              </div>
            </div>
          </div>

          <div className="p-4 mt-4 rounded-xl text-center" style={{ border: "1px dashed rgba(201,160,94,0.1)", background: "rgba(201,160,94,0.02)" }}>
            <p className="text-xs" style={{ color: "rgba(212,196,160,0.4)" }}>
              💡 AI 深度合婚分析（即将上线 ¥29.9）
            </p>
          </div>
        </div>
      )}

      <p className="text-center text-xs mt-10" style={{ color: "rgba(212,196,160,0.2)" }}>
        缘定三生 · 婚姻大事 · 慎重参考
      </p>
    </div>
  );
}
