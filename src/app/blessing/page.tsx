"use client";

import { useState, useEffect } from "react";

const deities = [
  { name: "文殊菩萨", blessing: "智慧增长，学业精进", icon: "📚" },
  { name: "观世音菩萨", blessing: "闻声救苦，平安顺遂", icon: "🌸" },
  { name: "地藏王菩萨", blessing: "消灾延寿，超度亡灵", icon: "🪷" },
  { name: "关圣帝君", blessing: "招财进宝，护佑平安", icon: "⚔️" },
  { name: "财神爷", blessing: "财运亨通，事业有成", icon: "💰" },
  { name: "月老", blessing: "姻缘美满，百年好合", icon: "❤️" },
];

const wishes = [
  "阖家安康，诸事顺遂",
  "事业腾飞，财源广进",
  "学业精进，金榜题名",
  "姻缘美满，早结良缘",
  "消灾延寿，福寿绵长",
  "出入平安，万事如意",
];

function BurningIncense() {
  const [phase, setPhase] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setPhase((p) => (p + 1) % 60), 800);
    return () => clearInterval(t);
  }, []);
  return (
    <div className="flex flex-col items-center gap-1 select-none" style={{ minHeight: 80 }}>
      {/* 香烟 */}
      <div className="flex gap-6 justify-center" style={{ height: 40 }}>
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="w-1 rounded-full"
            style={{
              height: 20 + Math.sin((phase + i * 20) * 0.2) * 8,
              background: "linear-gradient(to top, rgba(201,160,94,0.6), transparent)",
              transform: `translateX(${Math.sin((phase + i * 15) * 0.15) * 4}px)`,
              transition: "all 0.8s ease",
            }}
          />
        ))}
      </div>
      {/* 香身 */}
      <div className="flex gap-8">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="w-0.5 rounded-full"
            style={{
              height: 50 + i * 5,
              background: "linear-gradient(to bottom, #e8a040, #a06020)",
            }}
          />
        ))}
      </div>
      {/* 香炉 */}
      <div
        className="w-20 h-4 rounded-b-lg"
        style={{
          background: "linear-gradient(to bottom, #8b6914, #5c4510)",
          borderTop: "2px solid #c9a05e66",
        }}
      />
    </div>
  );
}

export default function BlessingPage() {
  const [selectedDeity, setSelectedDeity] = useState(0);
  const [customWish, setCustomWish] = useState("");
  const [blessCount, setBlessCount] = useState(0);
  const [lit, setLit] = useState(false);
  const [kneeling, setKneeling] = useState(false);

  const lightIncense = () => {
    setLit(true);
    setBlessCount((c) => c + 1);
    setTimeout(() => setLit(false), 6000);
  };

  const kneel = () => {
    setKneeling(true);
    setTimeout(() => setKneeling(false), 2000);
  };

  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <div className="text-center mb-10 animate-float-up">
        <div className="hero-icon mx-auto mb-4" style={{ width: 64, height: 64 }}>
          <span className="text-4xl">🪷</span>
        </div>
        <h1 className="text-4xl font-display gold-text tracking-widest mb-2" style={{ textShadow: "0 0 30px rgba(201,160,94,0.3)" }}>
          在线祈福
        </h1>
        <p style={{ color: "rgba(212, 196, 160, 0.5)" }}>一柱心香，虔心许愿</p>
        <div className="divider-gold mx-auto mt-6 w-32" />
      </div>

      {/* 礼佛区 */}
      <div className="card-featured p-8 text-center mb-6 animate-float-up" style={{ animationDelay: "0.1s" }}>
        <BurningIncense />
        <div className="mt-6 space-y-4">
          <p className="text-lg font-display gold-text">{deities[selectedDeity].name}</p>
          <p className="text-sm" style={{ color: "rgba(212,196,160,0.5)" }}>{deities[selectedDeity].blessing}</p>
          <div className="flex gap-2 justify-center flex-wrap">
            {deities.map((d, i) => (
              <button
                key={d.name}
                onClick={() => setSelectedDeity(i)}
                className={`px-3 py-1.5 rounded-lg text-xs transition-all ${
                  i === selectedDeity ? "ring-2" : "opacity-50 hover:opacity-80"
                }`}
                style={{
                  border: `1px solid ${i === selectedDeity ? "#c9a05e" : "rgba(201,160,94,0.2)"}`,
                  background: i === selectedDeity ? "rgba(201,160,94,0.12)" : "transparent",
                  color: "#c9a05e",
                }}
              >
                {d.icon} {d.name}
              </button>
            ))}
          </div>
        </div>

        {/* 许愿框 */}
        <textarea
          value={customWish}
          onChange={(e) => setCustomWish(e.target.value)}
          placeholder="在此写下您的愿望..."
          className="mt-5 w-full rounded-xl p-4 text-sm resize-none"
          style={{
            background: "rgba(255,255,255,0.03)",
            border: "1px solid rgba(201,160,94,0.15)",
            color: "#d4c4a0",
            minHeight: 80,
          }}
        />

        {/* 上香/叩首 */}
        <div className="flex gap-3 justify-center mt-5">
          <button
            onClick={lightIncense}
            disabled={lit}
            className="btn-ritual flex items-center gap-2"
            style={{
              background: lit ? "rgba(201,160,94,0.05)" : "rgba(201,160,94,0.12)",
              border: "1px solid rgba(201,160,94,0.3)",
              color: lit ? "rgba(212,196,160,0.3)" : "#c9a05e",
            }}
          >
            {lit ? "🙏 香烟袅袅..." : "🕯️ 上香"}
          </button>
          <button
            onClick={kneel}
            disabled={kneeling}
            className="btn-ritual flex items-center gap-2"
            style={{
              background: kneeling ? "rgba(201,160,94,0.05)" : "rgba(201,160,94,0.12)",
              border: "1px solid rgba(201,160,94,0.3)",
              color: kneeling ? "rgba(212,196,160,0.3)" : "#c9a05e",
            }}
          >
            {kneeling ? "🙇 三叩首" : "🙏 叩首祈福"}
          </button>
        </div>
      </div>

      {/* 功德记录 */}
      <div className="card-glass p-5 animate-float-up" style={{ animationDelay: "0.2s" }}>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gold font-display">📿 今日功德</p>
            <p className="text-xs mt-1" style={{ color: "rgba(212,196,160,0.4)" }}>
              已上香 {blessCount} 次
            </p>
          </div>
          <div className="text-right">
            <p className="text-sm" style={{ color: "rgba(212,196,160,0.5)" }}>供奉</p>
            <p className="font-display text-lg gold-text">{deities[selectedDeity].name}</p>
          </div>
        </div>
      </div>

      {/* 经典许愿 */}
      <div className="mt-6 animate-float-up" style={{ animationDelay: "0.3s" }}>
        <p className="text-xs text-center mb-3" style={{ color: "rgba(212,196,160,0.3)" }}>
          或从经典许愿中选择
        </p>
        <div className="grid grid-cols-2 gap-2">
          {wishes.map((w) => (
            <button
              key={w}
              onClick={() => setCustomWish(w)}
              className="p-3 rounded-xl text-xs text-left transition-all hover:bg-white/5"
              style={{
                border: "1px solid rgba(201,160,94,0.1)",
                color: "rgba(212,196,160,0.6)",
              }}
            >
              {w}
            </button>
          ))}
        </div>
      </div>

      <p className="text-center text-xs mt-10" style={{ color: "rgba(212,196,160,0.2)" }}>
        心诚则灵 · 诸恶莫作 · 众善奉行
      </p>
    </div>
  );
}
