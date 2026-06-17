"use client";

import { useState } from "react";
import { getBazi, buildBaziPrompt, type BaziResult } from "@/lib/bazi";

export default function BaziPage() {
  const [year, setYear] = useState(1990);
  const [month, setMonth] = useState(1);
  const [day, setDay] = useState(1);
  const [hour, setHour] = useState(12);
  const [gender, setGender] = useState("男");
  const [question, setQuestion] = useState("");
  const [result, setResult] = useState<BaziResult | null>(null);
  const [aiResult, setAiResult] = useState("");
  const [loading, setLoading] = useState(false);

  const paiPan = () => {
    const r = getBazi(year, month, day, hour);
    setResult(r);
  };

  const aiInterpret = async () => {
    if (!result) return;
    setLoading(true);
    setAiResult("");

    try {
      const res = await fetch("/api/bazi", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ bazi: result, gender, question }),
      });
      const data = await res.json();
      if (data.content) {
        setAiResult(data.content);
      } else {
        setAiResult("解读生成失败，请稍后再试。");
      }
    } catch {
      setAiResult("🔮 AI 精批需付费解锁（9.9 元），即将接入彩虹发卡自动交付。");
    }
    setLoading(false);
  };

  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      {/* 页面标题 */}
      <div className="text-center mb-10 animate-float-up">
        <div className="hero-icon mx-auto mb-4" style={{ width: 64, height: 64 }}>
          <span className="text-4xl">☯️</span>
        </div>
        <h1 className="text-4xl font-display gold-text tracking-widest mb-2" style={{ textShadow: "0 0 30px rgba(201,160,94,0.3)" }}>
          八字精批
        </h1>
        <p style={{ color: "rgba(212, 196, 160, 0.5)" }}>立春节气真排盘，AI 引经据典解读</p>
        <div className="divider-gold mx-auto mt-6 w-32" />
      </div>

      {/* 输入区 */}
      <div className="card-featured mb-8 animate-float-up" style={{ animationDelay: "0.1s" }}>
        <h2 className="text-xl text-gold font-display text-center mb-5">输入出生信息</h2>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
          <div>
            <label className="text-sm block mb-1.5" style={{ color: "rgba(212,196,160,0.5)" }}>年</label>
            <input
              type="number"
              value={year}
              onChange={(e) => setYear(Number(e.target.value))}
              className="input-base text-center"
              min={1940}
              max={2030}
            />
          </div>
          <div>
            <label className="text-sm block mb-1.5" style={{ color: "rgba(212,196,160,0.5)" }}>月</label>
            <select
              value={month}
              onChange={(e) => setMonth(Number(e.target.value))}
              className="input-base text-center"
            >
              {Array.from({ length: 12 }, (_, i) => (
                <option key={i} value={i + 1}>{i + 1}月</option>
              ))}
            </select>
          </div>
          <div>
            <label className="text-sm block mb-1.5" style={{ color: "rgba(212,196,160,0.5)" }}>日</label>
            <input
              type="number"
              value={day}
              onChange={(e) => setDay(Number(e.target.value))}
              className="input-base text-center"
              min={1}
              max={31}
            />
          </div>
          <div>
            <label className="text-sm block mb-1.5" style={{ color: "rgba(212,196,160,0.5)" }}>时</label>
            <select
              value={hour}
              onChange={(e) => setHour(Number(e.target.value))}
              className="input-base text-center"
            >
              {Array.from({ length: 24 }, (_, i) => (
                <option key={i} value={i}>{String(i).padStart(2, "0")}:00</option>
              ))}
            </select>
          </div>
          <div>
            <label className="text-sm block mb-1.5" style={{ color: "rgba(212,196,160,0.5)" }}>性别</label>
            <select
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              className="input-base text-center"
            >
              <option value="男">男</option>
              <option value="女">女</option>
            </select>
          </div>
        </div>

        <div className="mt-4">
          <label className="text-sm block mb-1.5" style={{ color: "rgba(212,196,160,0.5)" }}>想问什么（选填）</label>
          <input
            type="text"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="如：事业、财运、感情..."
            className="input-base"
          />
        </div>

        <div className="flex gap-3 justify-center mt-6">
          <button onClick={paiPan} className="btn-gold px-6 py-2.5">
            📋 免费排盘
          </button>
          <button
            onClick={aiInterpret}
            disabled={!result || loading}
            className="btn-primary px-6 py-2.5 disabled:opacity-40"
          >
            {loading ? "🔮 AI 解读中..." : "🔮 AI 精批 ¥9.9"}
          </button>
        </div>
      </div>

      {/* 排盘结果 */}
      {result && (
        <div className="card-featured space-y-6 animate-float-up">
          <h2 className="text-xl text-gold font-display text-center">八字排盘</h2>

          {/* 四柱 */}
          <div className="grid grid-cols-4 gap-3">
            {[
              { label: "年柱", data: result.year },
              { label: "月柱", data: result.month },
              { label: "日柱", data: result.day },
              { label: "时柱", data: result.hour },
            ].map((pillar) => (
              <div
                key={pillar.label}
                className="rounded-xl text-center p-4"
                style={{
                  border: "1px solid rgba(201,160,94,0.2)",
                  background: "rgba(34,27,20,0.6)",
                }}
              >
                <p className="text-xs mb-2" style={{ color: "rgba(201,160,94,0.5)" }}>{pillar.label}</p>
                <p className="text-2xl text-paper-dark font-display">{pillar.data.ganZhi}</p>
                <p className="text-xs mt-1" style={{ color: "rgba(212,196,160,0.4)" }}>{pillar.data.wuxing}</p>
              </div>
            ))}
          </div>

          {/* 日主信息 */}
          <div className="text-center space-y-2 p-4 rounded-xl" style={{ background: "rgba(201,160,94,0.04)", border: "1px solid rgba(201,160,94,0.1)" }}>
            <p className="text-gold text-lg font-display">
              日主：{result.dayMaster}（{result.dayMasterWuxing}）
            </p>
            <p className="text-sm" style={{ color: "rgba(212,196,160,0.5)" }}>
              木{result.wuxingCount["木"]} · 火{result.wuxingCount["火"]} · 土{result.wuxingCount["土"]} · 金{result.wuxingCount["金"]} · 水{result.wuxingCount["水"]}
            </p>
            <p className="text-sm" style={{ color: "#e53e3e" }}>
              {result.lacking !== "五行俱全" ? `五行缺：${result.lacking}` : "五行俱全，格局均衡"}
            </p>
          </div>
        </div>
      )}

      {/* AI 解读结果 */}
      {aiResult && (
        <div className="card-featured mt-6 animate-float-up">
          <div className="text-center mb-4">
            <span className="text-3xl">🔮</span>
            <h2 className="text-xl text-gold font-display mt-1">AI 师父开示</h2>
          </div>
          <div
            className="leading-relaxed whitespace-pre-wrap text-sm md:text-base"
            style={{ color: "rgba(212, 196, 160, 0.8)" }}
          >
            {aiResult}
          </div>
        </div>
      )}
    </div>
  );
}
