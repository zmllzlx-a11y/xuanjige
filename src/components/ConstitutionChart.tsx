"use client";
// 纯 React/SVG 实现的草药性味可视化（无需 matplotlib）
interface HerbPoint {
  name: string;
  taste: number;  // 1-5
  effect: number; // 1-10
  organ: string;
  freq: number;
}

const SAMPLE_HERBS: HerbPoint[] = [
  { name: "人参", taste: 3, effect: 8, organ: "脾", freq: 9 },
  { name: "黄芪", taste: 2, effect: 7, organ: "脾", freq: 8 },
  { name: "枸杞", taste: 3, effect: 6, organ: "肝", freq: 7 },
  { name: "当归", taste: 3, effect: 7, organ: "肝", freq: 8 },
  { name: "川芎", taste: 2, effect: 6, organ: "肝", freq: 6 },
  { name: "茯苓", taste: 2, effect: 5, organ: "心", freq: 7 },
  { name: "陈皮", taste: 2, effect: 4, organ: "脾", freq: 5 },
  { name: "甘草", taste: 3, effect: 6, organ: "心", freq: 10 },
  { name: "金银花", taste: 2, effect: 7, organ: "肺", freq: 5 },
  { name: "菊花", taste: 2, effect: 6, organ: "肝", freq: 6 },
  { name: "山药", taste: 3, effect: 5, organ: "脾", freq: 7 },
  { name: "百合", taste: 3, effect: 5, organ: "肺", freq: 5 },
];

const ORGAN_COLORS: Record<string, string> = {
  "脾": "#5D8A66",
  "肝": "#C4A35A",
  "心": "#C07060",
  "肺": "#5A8FAF",
};

export function HerbPropertiesViz() {
  const W = 400, H = 320;
  const pad = 50;
  const scaleX = (v: number) => pad + ((v - 1) / 4) * (W - pad * 2);
  const scaleY = (v: number) => H - pad - ((v - 3) / 8) * (H - pad * 2);

  return (
    <div className="card-glass p-6 mb-5">
      <h3 className="font-display mb-4 text-center" style={{ color: "var(--color-swen-green-light)" }}>
        草药性味归经图（示意）
      </h3>
      <div className="flex justify-center">
        <svg width={W} height={H} style={{ maxWidth: "100%" }}>
          {/* 网格 */}
          {[1, 2, 3, 4, 5].map(v => (
            <g key={v}>
              <line x1={scaleX(v)} y1={pad} x2={scaleX(v)} y2={H - pad}
                stroke="rgba(93,138,102,0.1)" strokeWidth="1" />
              <text x={scaleX(v)} y={H - pad + 16} textAnchor="middle"
                fontSize="10" fill="rgba(232,228,218,0.3)">
                {v === 1 ? "酸" : v === 2 ? "苦" : v === 3 ? "甘" : v === 4 ? "辛" : "咸"}
              </text>
            </g>
          ))}
          {[4, 5, 6, 7, 8, 9, 10].map(v => (
            <g key={v}>
              <line x1={pad} y1={scaleY(v)} x2={W - pad} y2={scaleY(v)}
                stroke="rgba(93,138,102,0.08)" strokeWidth="1" />
              <text x={pad - 6} y={scaleY(v) + 4} textAnchor="end"
                fontSize="10" fill="rgba(232,228,218,0.3)">{v}</text>
            </g>
          ))}

          {/* 轴标签 */}
          <text x={W / 2} y={H - 6} textAnchor="middle"
            fontSize="11" fill="rgba(232,228,218,0.4)">五味</text>
          <text x={12} y={H / 2} textAnchor="middle"
            fontSize="11" fill="rgba(232,228,218,0.4)"
            transform={`rotate(-90, 12, ${H / 2})`}>功效强度</text>

          {/* 数据点 */}
          {SAMPLE_HERBS.map(h => (
            <g key={h.name}>
              <circle
                cx={scaleX(h.taste)} cy={scaleY(h.effect)}
                r={8 + h.freq / 3}
                fill={ORGAN_COLORS[h.organ] || "#888"}
                opacity={0.7}
                stroke="white"
                strokeWidth="1"
              />
              <text
                x={scaleX(h.taste)} y={scaleY(h.effect) - 10 - h.freq / 4}
                textAnchor="middle"
                fontSize="10"
                fill="rgba(232,228,218,0.7)"
                fontWeight="bold"
              >
                {h.name}
              </text>
            </g>
          ))}
        </svg>
      </div>

      {/* 图例 */}
      <div className="flex flex-wrap gap-4 justify-center mt-3">
        {Object.entries(ORGAN_COLORS).map(([organ, color]) => (
          <div key={organ} className="flex items-center gap-1.5 text-xs">
            <div className="w-3 h-3 rounded-full" style={{ background: color }} />
            <span style={{ color: "rgba(232,228,218,0.5)" }}>{organ}经</span>
          </div>
        ))}
      </div>
    </div>
  );
}
