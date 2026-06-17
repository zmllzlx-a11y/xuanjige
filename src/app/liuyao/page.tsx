"use client";

import { useState, useCallback } from "react";

// 六十四卦（简化版 - 卦名 + 吉凶 + 卦辞）
const trigrams = ["乾", "兑", "离", "震", "巽", "坎", "艮", "坤"];

const hexagramNames: Record<string, { name: string; fortune: string; meaning: string }> = {
  "111111": { name: "乾为天", fortune: "上上", meaning: "天行健，君子以自强不息。大吉之象，积极进取。" },
  "000000": { name: "坤为地", fortune: "中上", meaning: "地势坤，君子以厚德载物。柔顺包容，厚积薄发。" },
  "010001": { name: "水雷屯", fortune: "中平", meaning: "刚柔始交而难生，动乎险中。创业维艰，宜守正。" },
  "010100": { name: "山水蒙", fortune: "中平", meaning: "山下有泉，启蒙之象。求知问道，宜虚心求教。" },
  "111010": { name: "水天需", fortune: "中平", meaning: "云上于天，待时而动。耐心等待，时机将至。" },
  "010111": { name: "天水讼", fortune: "中下", meaning: "天与水违行，争讼之象。宜和解，不宜争斗。" },
  "010110": { name: "地水师", fortune: "中平", meaning: "地中有水，聚众之象。行师之道，需得人心。" },
  "011010": { name: "水地比", fortune: "中上", meaning: "地上有水，亲比之象。团结互助，得道多助。" },
  "111011": { name: "风天小畜", fortune: "中平", meaning: "风行天上，小蓄之象。积少成多，蓄势待发。" },
  "110111": { name: "天泽履", fortune: "中平", meaning: "上天下泽，履礼之象。循规蹈矩，步步为营。" },
  "000111": { name: "地天泰", fortune: "上上", meaning: "天地交泰，万事亨通。吉昌之象，诸事顺遂。" },
  "111000": { name: "天地否", fortune: "中下", meaning: "天地不交，闭塞不通。宜守不宜进，静待转机。" },
  "101111": { name: "天火同人", fortune: "中上", meaning: "天火相应，同心之象。志同道合，众志成城。" },
  "111101": { name: "火天大有", fortune: "上上", meaning: "火在天上，光明普照。大有收获，丰盛之年。" },
  "000100": { name: "地山谦", fortune: "上上", meaning: "山藏于地，谦虚之象。谦谦君子，卑以自牧。" },
  "001000": { name: "雷地豫", fortune: "中上", meaning: "雷出地奋，悦乐之象。顺时而动，和乐安康。" },
  "011001": { name: "泽雷随", fortune: "中平", meaning: "雷在泽下，随顺之象。随势而为，不可固执。" },
  "100110": { name: "山风蛊", fortune: "中下", meaning: "山下有风，蛊坏之象。整顿积弊，革故鼎新。" },
  "110010": { name: "地泽临", fortune: "中上", meaning: "泽上有地，临下之象。以上临下，以尊临卑。" },
  "010011": { name: "风地观", fortune: "中平", meaning: "风行地上，观察之象。审时度势，明察秋毫。" },
  "100101": { name: "火雷噬嗑", fortune: "中平", meaning: "雷电交合，啮合之象。破除障碍，沟通融合。" },
  "101001": { name: "山火贲", fortune: "中平", meaning: "山下有火，文饰之象。文质彬彬，内外兼修。" },
  "000001": { name: "山地剥", fortune: "中下", meaning: "山崩于地，剥落之象。盛极而衰，宜守不宜进。" },
  "100000": { name: "地雷复", fortune: "中上", meaning: "雷在地中，复归之象。一阳来复，万象更新。" },
  "100111": { name: "天雷无妄", fortune: "中上", meaning: "天下雷行，无妄之象。顺其自然，不可妄为。" },
  "111001": { name: "山天大畜", fortune: "中上", meaning: "天在山中，大蓄之象。蓄积德才，厚积薄发。" },
  "100001": { name: "山雷颐", fortune: "中平", meaning: "山下有雷，颐养之象。自食其力，养正修身。" },
  "011110": { name: "泽风大过", fortune: "中下", meaning: "泽灭木舟，大过之象。非常之举，需非常之勇。" },
  "010010": { name: "坎为水", fortune: "中平", meaning: "两坎相重，险难之象。履险如夷，诚信可通。" },
  "101101": { name: "离为火", fortune: "中上", meaning: "两离相重，光明之象。文明昌盛，附丽得正。" },
};

function getDefaultHexagram(key: string): { name: string; fortune: string; meaning: string } {
  return {
    name: `卦象 ${key}`,
    fortune: "中平",
    meaning: "此卦变化无穷，宜静观其变，不可妄动。",
  };
}

function tossCoins(): number[] {
  // 模拟3个硬币6次，1=正面（阳），0=反面（阴）
  // 三正为老阳（变爻），三反为老阴（变爻）
  return Array.from({ length: 6 }, () => {
    const coins = Array.from({ length: 3 }, () => Math.random() > 0.5);
    const yang = coins.filter(Boolean).length;
    // yang=3 → 老阳（变）, yang=0 → 老阴（变）, yang=2 → 少阳, yang=1 → 少阴
    return yang >= 2 ? 1 : 0;
  });
}

export default function LiuyaoPage() {
  const [hexagram, setHexagram] = useState<number[] | null>(null);
  const [shaking, setShaking] = useState(false);
  const [history, setHistory] = useState<{ time: string; hexagram: number[] }[]>([]);

  const shake = useCallback(() => {
    setShaking(true);
    // 模拟摇卦动画
    setTimeout(() => {
      const result = tossCoins();
      setHexagram(result);
      setShaking(false);
      setHistory((h) => [{ time: new Date().toLocaleString("zh-CN"), hexagram: result }, ...h].slice(0, 10));
    }, 1500);
  }, []);

  const key = hexagram?.join("") ?? "";
  const info = hexagram ? (hexagramNames[key] ?? getDefaultHexagram(key)) : null;

  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <div className="text-center mb-10 animate-float-up">
        <div className="hero-icon mx-auto mb-4" style={{ width: 64, height: 64 }}>
          <span className="text-4xl">🪙</span>
        </div>
        <h1 className="text-4xl font-display gold-text tracking-widest mb-2" style={{ textShadow: "0 0 30px rgba(201,160,94,0.3)" }}>
          六爻占卜
        </h1>
        <p style={{ color: "rgba(212, 196, 160, 0.5)" }}>三枚铜钱，六次摇动，洞悉天机</p>
        <div className="divider-gold mx-auto mt-6 w-32" />
      </div>

      {/* 摇卦区 */}
      <div className="card-featured p-8 text-center animate-float-up" style={{ animationDelay: "0.1s" }}>
        {/* 摇卦动画 */}
        <div
          className={`w-32 h-32 mx-auto rounded-full flex items-center justify-center transition-all duration-300 ${
            shaking ? "animate-spin" : ""
          }`}
          style={{
            border: "2px solid rgba(201,160,94,0.2)",
            background: shaking
              ? "radial-gradient(circle, rgba(201,160,94,0.2), transparent)"
              : "radial-gradient(circle, rgba(201,160,94,0.05), transparent)",
          }}
        >
          <span className="text-5xl" style={{ animation: shaking ? "none" : "float 3s ease-in-out infinite" }}>
            {shaking ? "🌀" : "🪙"}
          </span>
        </div>

        <p className="text-sm mt-4 mb-6" style={{ color: "rgba(212,196,160,0.4)" }}>
          {shaking ? "卦象显现中..." : hexagram ? "可再摇一卦" : "点击铜钱起卦"}
        </p>

        <button
          onClick={shake}
          disabled={shaking}
          className="btn-ritual px-8 py-3"
          style={{
            background: shaking ? "rgba(201,160,94,0.05)" : "rgba(201,160,94,0.12)",
            border: "1px solid rgba(201,160,94,0.3)",
            color: shaking ? "rgba(212,196,160,0.3)" : "#c9a05e",
            fontSize: "1rem",
          }}
        >
          {shaking ? "🌊 摇动中..." : "🪙 摇卦"}
        </button>

        {/* 卦象显示 */}
        {hexagram && info && (
          <div className="mt-8 animate-float-up">
            <div className="divider-gold mx-auto w-16 mb-6" />

            {/* 卦象图（从下往上） */}
            <div className="flex justify-center mb-6">
              <div className="space-y-1">
                {[...hexagram].reverse().map((line, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-center gap-1"
                  >
                    {line === 1 ? (
                      <>
                        <div className="w-6 h-1 rounded" style={{ background: "#c9a05e" }} />
                        <div className="w-6 h-1 rounded" style={{ background: "#c9a05e" }} />
                      </>
                    ) : (
                      <div className="w-14 h-1 rounded" style={{ background: "#8b6914" }} />
                    )}
                  </div>
                ))}
                <p className="text-xs mt-2" style={{ color: "rgba(212,196,160,0.3)" }}>
                  从下往上 · 初爻至上爻
                </p>
              </div>
            </div>

            {/* 卦名 */}
            <p className="text-3xl font-display gold-text mb-2">{info.name}</p>
            <p className="text-sm mb-1" style={{ color: info.fortune === "上上" ? "#e53e3e" : info.fortune === "中下" ? "#8b6914" : "#c9a05e" }}>
              【{info.fortune}】
            </p>
            <p className="text-sm leading-relaxed max-w-md mx-auto" style={{ color: "rgba(212,196,160,0.6)" }}>
              {info.meaning}
            </p>

            {/* AI解读入口 */}
            <div className="mt-6 p-4 rounded-xl" style={{ border: "1px dashed rgba(201,160,94,0.15)", background: "rgba(201,160,94,0.04)" }}>
              <p className="text-xs" style={{ color: "rgba(212,196,160,0.4)" }}>
                💡 AI 深度解读卦象（即将上线）
              </p>
            </div>
          </div>
        )}
      </div>

      {/* 历史记录 */}
      {history.length > 0 && (
        <div className="card-glass mt-6 p-5 animate-float-up" style={{ animationDelay: "0.2s" }}>
          <p className="text-sm text-gold font-display mb-3">📜 摇卦记录</p>
          <div className="space-y-2">
            {history.map((h, i) => (
              <div key={i} className="flex items-center justify-between text-xs" style={{ color: "rgba(212,196,160,0.5)" }}>
                <span>
                  {h.hexagram.map((b) => (b ? "▬" : "▬▬")).join(" ")}
                </span>
                <span>{h.time}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 说明 */}
      <div className="card-glass mt-6 p-5 animate-float-up" style={{ animationDelay: "0.3s" }}>
        <p className="text-xs text-gold font-display mb-2">📖 六爻占卜说明</p>
        <ul className="space-y-1 text-xs" style={{ color: "rgba(212,196,160,0.4)" }}>
          <li>• 每次起卦需诚心静念，专注所问之事</li>
          <li>• 同一件事请勿反复占卜，一日不过三卦</li>
          <li>• 本服务为传统文化参考，不替代专业决策</li>
        </ul>
      </div>
    </div>
  );
}
