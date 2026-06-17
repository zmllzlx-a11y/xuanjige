"use client";

import { useState } from "react";

const lineTypes = [
  {
    name: "生命线",
    en: "Life Line",
    icon: "🌿",
    desc: "从虎口到手腕，主健康与生命力。",
    details: [
      "清晰绵长 → 体质好，生命力旺盛",
      "短而浅 → 需注意劳逸结合",
      "分叉多 → 精力分散，宜专一",
      "有岛纹 → 注意阶段性健康波动",
      "双重线 → 生命力强，贵人相助",
    ],
  },
  {
    name: "智慧线",
    en: "Head Line",
    icon: "🧠",
    desc: "横贯掌心，主思维与智慧。",
    details: [
      "长而直 → 思维清晰，逻辑强",
      "下垂至月丘 → 想象力丰富，有艺术天赋",
      "短平 → 务实果断，喜简厌繁",
      "波浪形 → 思维灵活，善变通",
      "分叉（文昌叉）→ 文采出众，创意佳",
    ],
  },
  {
    name: "感情线",
    en: "Heart Line",
    icon: "❤️",
    desc: "从小指下到食指根，主感情与人缘。",
    details: [
      "长而连贯 → 感情专一，人缘好",
      "链状 → 感情细腻丰富，易多愁善感",
      "下垂 → 重感情，为情所困",
      "直而短 → 理性务实，不喜纠缠",
      "双线并行 → 桃花旺，异性缘佳",
    ],
  },
  {
    name: "事业线",
    en: "Fate Line",
    icon: "⭐",
    desc: "从手腕向中指延伸，主事业与成就。",
    details: [
      "清晰直达中指 → 事业有成，目标明确",
      "中断 → 事业有转折或变动",
      "起于月丘 → 靠人脉助力成功",
      "起于手腕 → 自力更生，白手起家",
      "多叉线 → 多方向发展，副业有成",
    ],
  },
  {
    name: "婚姻线",
    en: "Marriage Line",
    icon: "💍",
    desc: "小指根部下方的横纹，主姻缘感情。",
    details: [
      "清晰深长 → 婚姻美满，感情稳定",
      "多条 → 感情经历丰富",
      "向上弯 → 晚婚或婚姻幸福",
      "向下弯 → 感情上付出较多",
      "岛纹 → 注意感情中的波折",
    ],
  },
];

export default function PalmistryPage() {
  const [activeLine, setActiveLine] = useState(0);

  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <div className="text-center mb-10 animate-float-up">
        <div className="hero-icon mx-auto mb-4" style={{ width: 64, height: 64 }}>
          <span className="text-4xl">🤚</span>
        </div>
        <h1 className="text-4xl font-display gold-text tracking-widest mb-2" style={{ textShadow: "0 0 30px rgba(201,160,94,0.3)" }}>
          看手相
        </h1>
        <p style={{ color: "rgba(212, 196, 160, 0.5)" }}>掌中藏乾坤，纹路见玄机</p>
        <div className="divider-gold mx-auto mt-6 w-32" />
      </div>

      {/* 手掌图示 */}
      <div
        className="card-featured p-8 text-center animate-float-up mb-6"
        style={{ animationDelay: "0.1s" }}
      >
        {/* 抽象手掌 SVG */}
        <svg viewBox="0 0 200 240" className="w-48 h-56 mx-auto" style={{ filter: "drop-shadow(0 0 20px rgba(201,160,94,0.1))" }}>
          {/* 手掌轮廓 */}
          <path
            d="M60 60 Q40 80, 20 140 Q10 180, 30 210 Q50 230, 100 235 Q150 230, 170 210 Q190 180, 180 140 Q160 80, 140 60"
            fill="none"
            stroke="rgba(201,160,94,0.3)"
            strokeWidth="1.5"
          />
          {/* 手指 */}
          {[
            { x: 50, y: 55, rot: -8, w: 18 }, // 小指
            { x: 82, y: 45, rot: -3, w: 20 }, // 无名指
            { x: 116, y: 42, rot: 3, w: 22 }, // 中指
            { x: 148, y: 52, rot: 10, w: 20 }, // 食指
            { x: 168, y: 78, rot: 25, w: 16 }, // 拇指
          ].map((f, i) => (
            <rect
              key={i}
              x={f.x}
              y={f.y}
              width={f.w}
              height={i === 4 ? 50 : 70}
              rx={9}
              transform={`rotate(${f.rot}, ${f.x + f.w / 2}, ${f.y})`}
              fill="none"
              stroke="rgba(201,160,94,0.2)"
              strokeWidth="1.2"
            />
          ))}

          {/* 高亮主线 */}
          {activeLine === 0 && (
            <path d="M35 180 Q60 165, 100 170 Q130 175, 155 160" fill="none" stroke="#e53e3e" strokeWidth="2" opacity={0.8} />
          )}
          {activeLine === 1 && (
            <path d="M30 130 Q80 110, 120 115 Q150 120, 170 130" fill="none" stroke="#c9a05e" strokeWidth="2" opacity={0.8} />
          )}
          {activeLine === 2 && (
            <path d="M40 80 Q80 95, 120 90 Q150 85, 170 95" fill="none" stroke="#ff6b9d" strokeWidth="2" opacity={0.8} />
          )}
          {activeLine === 3 && (
            <path d="M90 50 Q95 100, 100 160 Q105 190, 115 220" fill="none" stroke="#5e8bc9" strokeWidth="2" opacity={0.8} />
          )}
          {activeLine === 4 && (
            <path d="M40 50 Q45 65, 48 85" fill="none" stroke="#9b7ec9" strokeWidth="2" opacity={0.8} />
          )}
        </svg>

        <p className="text-xs mt-2" style={{ color: "rgba(212,196,160,0.3)" }}>
          点击下方主纹查看详解
        </p>
      </div>

      {/* 主纹选择 */}
      <div className="grid grid-cols-5 gap-2 mb-6">
        {lineTypes.map((l, i) => (
          <button
            key={l.name}
            onClick={() => setActiveLine(i)}
            className="p-3 rounded-xl text-center transition-all"
            style={{
              border: `1px solid ${i === activeLine ? "rgba(201,160,94,0.4)" : "rgba(201,160,94,0.08)"}`,
              background: i === activeLine ? "rgba(201,160,94,0.1)" : "transparent",
            }}
          >
            <p className="text-xl mb-1">{l.icon}</p>
            <p className="text-xs" style={{ color: i === activeLine ? "#c9a05e" : "rgba(212,196,160,0.4)" }}>
              {l.name}
            </p>
          </button>
        ))}
      </div>

      {/* 当前主纹详解 */}
      {lineTypes.map((l, i) => (
        <div
          key={l.name}
          className={`card-featured p-6 animate-float-up ${i === activeLine ? "" : "hidden"}`}
          style={{ animationDelay: "0.2s" }}
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="text-2xl">{l.icon}</span>
            <div>
              <h2 className="text-lg font-display gold-text">{l.name}</h2>
              <p className="text-xs" style={{ color: "rgba(212,196,160,0.4)" }}>{l.en}</p>
            </div>
          </div>
          <p className="text-sm mb-4" style={{ color: "rgba(212,196,160,0.6)" }}>{l.desc}</p>
          <ul className="space-y-2">
            {l.details.map((d) => {
              const [title, rest] = d.split(" → ");
              return (
                <li key={d} className="text-sm flex items-start gap-2" style={{ color: "rgba(212,196,160,0.5)" }}>
                  <span className="text-gold shrink-0 mt-0.5">•</span>
                  <span><span className="text-gold/80">{title}</span> → <span style={{ color: "rgba(212,196,160,0.4)" }}>{rest}</span></span>
                </li>
              );
            })}
          </ul>

          {/* AI解读入口 */}
          <div className="mt-5 p-3 rounded-xl text-center" style={{ border: "1px dashed rgba(201,160,94,0.15)", background: "rgba(201,160,94,0.04)" }}>
            <p className="text-xs" style={{ color: "rgba(212,196,160,0.4)" }}>
              🤖 上传手相照片获取 AI 深度解读（即将上线 ¥19.9）
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
