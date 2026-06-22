"use client";

import { useState, useEffect } from "react";

// 二十四节气数据
const SOLAR_TERMS = [
  {
    name: "立春", month: 2, day: 3-5,
    season: "春", element: "木",
    advice: "春捂秋冻，宜早起散步，调畅情志。饮食少酸多甘，助养阳气。",
    recipe: "枸杞菊花茶 — 枸杞10g、菊花6g，沸水冲泡，清肝明目。",
    herbs: ["枸杞", "菊花", "红枣"],
    avoid: "不宜过早减衣，忌辛辣刺激。"
  },
  {
    name: "雨水", month: 2, day: 18-20,
    season: "春", element: "木",
    advice: "天气转暖但变化大，健脾祛湿为主。适当运动，助阳气升发。",
    recipe: "山药薏米粥 — 山药30g、薏米20g、粳米50g，煮粥早晚服用，健脾祛湿。",
    herbs: ["山药", "薏米", "茯苓"],
    avoid: "忌食生冷油腻，慎防倒春寒。"
  },
  {
    name: "惊蛰", month: 3, day: 5-7,
    season: "春", element: "木",
    advice: "万物复苏，肝气旺盛，宜疏肝理气。多到户外活动，晒晒太阳。",
    recipe: "玫瑰陈皮茶 — 玫瑰花6g、陈皮3g，沸水冲泡，疏肝解郁。",
    herbs: ["玫瑰花", "陈皮", "柴胡"],
    avoid: "忌情绪抑郁，忌熬夜伤肝。"
  },
  {
    name: "春分", month: 3, day: 20-22,
    season: "春", element: "木",
    advice: "昼夜平分，阴阳平衡。宜平补阴阳，多食时令蔬菜。",
    recipe: "荠菜豆腐汤 — 鲜荠菜100g、嫩豆腐1块，煮汤，清肝明目。",
    herbs: ["荠菜", "菠菜", "胡萝卜"],
    avoid: "忌大热大寒之物，宜平衡膳食。"
  },
  {
    name: "清明", month: 4, day: 4-6,
    season: "春", element: "木",
    advice: "天清气明，宜养肝明目。踏青郊游，调畅气机。",
    recipe: "菊花枸杞饮 — 菊花8g、枸杞15g、蜂蜜适量，清肝火。",
    herbs: ["菊花", "决明子", "桑叶"],
    avoid: "忌忧思恼怒，忌食用动风之物。"
  },
  {
    name: "谷雨", month: 4, day: 19-21,
    season: "春", element: "土",
    advice: "雨生百谷，宜祛湿健脾。适当运动出汗，排出湿气。",
    recipe: "冬瓜薏米排骨汤 — 冬瓜200g、薏米30g、排骨适量，健脾利湿。",
    herbs: ["薏米", "冬瓜", "赤小豆"],
    avoid: "忌潮湿环境，忌肥甘厚腻。"
  },
  {
    name: "立夏", month: 5, day: 5-7,
    season: "夏", element: "火",
    advice: "夏季开始，宜养心安神。昼长夜短，宜午睡小憩。",
    recipe: "莲子百合粥 — 莲子30g、百合20g、粳米60g，煮粥，养心安神。",
    herbs: ["莲子", "百合", "麦冬"],
    avoid: "忌大喜大悲，忌在烈日下长时间暴晒。"
  },
  {
    name: "小满", month: 5, day: 20-22,
    season: "夏", element: "火",
    advice: "小麦灌浆，湿热渐盛。清热利湿，健脾和胃。",
    recipe: "绿豆薏米汤 — 绿豆50g、薏米30g，煮汤，清热祛湿。",
    herbs: ["绿豆", "薏米", "荷叶"],
    avoid: "忌贪凉饮冷，忌暴饮暴食。"
  },
  {
    name: "芒种", month: 6, day: 5-7,
    season: "夏", element: "土",
    advice: "收种忙碌，清补为主。补充水分，防止中暑。",
    recipe: "酸梅汤 — 乌梅30g、山楂20g、甘草5g、冰糖适量，生津止渴。",
    herbs: ["乌梅", "山楂", "甘草"],
    avoid: "忌过度劳累，忌在高温时段剧烈运动。"
  },
  {
    name: "夏至", month: 6, day: 21-22,
    season: "夏", element: "火",
    advice: "阳气至极，宜养阴护阳。早睡早起，午间小憩。",
    recipe: "百合银耳羹 — 百合20g、银耳10g、冰糖适量，滋阴润肺。",
    herbs: ["百合", "银耳", "莲子"],
    avoid: "忌烈日暴晒，忌过度贪凉。"
  },
  {
    name: "小暑", month: 7, day: 6-8,
    season: "夏", element: "火",
    advice: "暑气渐盛，宜清热解暑。适当出汗，排出毒素。",
    recipe: "西瓜翠衣饮 — 西瓜皮30g、绿茶5g，消暑利尿。",
    herbs: ["西瓜翠衣", "绿豆", "薄荷"],
    avoid: "忌长时间待在空调房，忌冷饮无度。"
  },
  {
    name: "大暑", month: 7, day: 22-24,
    season: "夏", element: "火",
    advice: "一年最热，防暑降温。多喝汤水，补水养阴。",
    recipe: "荷叶冬瓜汤 — 鲜荷叶1张、冬瓜200g，煮汤，清热解暑。",
    herbs: ["荷叶", "冬瓜", "西洋参"],
    avoid: "忌在高温下剧烈运动，忌大量食用冷饮。"
  },
  {
    name: "立秋", month: 8, day: 7-9,
    season: "秋", element: "金",
    advice: "秋季开始，宜润燥养肺。少辛多酸，收敛肺气。",
    recipe: "银耳雪梨羹 — 银耳10g、雪梨1个、冰糖适量，润肺止咳。",
    herbs: ["银耳", "雪梨", "蜂蜜"],
    avoid: "忌辛辣刺激，忌过早进补。"
  },
  {
    name: "处暑", month: 8, day: 22-24,
    season: "秋", element: "金",
    advice: "暑气渐消，宜养阴润燥。早睡早起，适应秋收。",
    recipe: "百合莲子粥 — 百合20g、莲子30g、粳米50g，润肺养心。",
    herbs: ["百合", "莲子", "沙参"],
    avoid: "忌秋燥伤津，忌过早穿厚衣。"
  },
  {
    name: "白露", month: 9, day: 7-9,
    season: "秋", element: "金",
    advice: "露凝而白，宜补脾益肺。早晚添衣，防止受凉。",
    recipe: "山药红枣粥 — 山药30g、红枣10枚、粳米50g，健脾补肺。",
    herbs: ["山药", "红枣", "黄芪"],
    avoid: "忌受凉咳嗽，忌辛辣发散之物。"
  },
  {
    name: "秋分", month: 9, day: 22-24,
    season: "秋", element: "金",
    advice: "昼夜平分，阴阳平衡。宜平补，润肺养阴。",
    recipe: "蜂蜜柚子茶 — 柚子肉100g、蜂蜜30g，温水冲泡，生津润燥。",
    herbs: ["柚子", "蜂蜜", "百合"],
    avoid: "忌辛辣，忌情绪抑郁伤感。"
  },
  {
    name: "寒露", month: 10, day: 8-9,
    season: "秋", element: "金",
    advice: "露气寒冷，宜养阴润燥。早睡养阴，增强体质。",
    recipe: "枸杞核桃粥 — 枸杞15g、核桃30g、粳米50g，补肾益精。",
    herbs: ["枸杞", "核桃", "黑芝麻"],
    avoid: "忌受寒着凉，忌食用寒凉之物。"
  },
  {
    name: "霜降", month: 10, day: 23-24,
    season: "秋", element: "土",
    advice: "气肃露凝，宜补肾养胃。进补好时节，但忌峻补。",
    recipe: "板栗炖鸡 — 板栗100g、鸡肉200g，炖汤，补肾强身。",
    herbs: ["板栗", "山药", "枸杞"],
    avoid: "忌受寒，忌过度进补油腻。"
  },
  {
    name: "立冬", month: 11, day: 7-8,
    season: "冬", element: "水",
    advice: "冬季开始，宜养藏固本。早睡晚起，避寒就温。",
    recipe: "当归生姜羊肉汤 — 当归10g、生姜30g、羊肉300g，温补气血。",
    herbs: ["当归", "羊肉", "生姜"],
    avoid: "忌过度出汗，忌在寒风中久立。"
  },
  {
    name: "小雪", month: 11, day: 22-23,
    season: "冬", element: "水",
    advice: "初雪降临，宜温补肾阳。适度运动，增强御寒能力。",
    recipe: "杜仲腰花汤 — 杜仲15g、猪腰1个，补肾强腰。",
    herbs: ["杜仲", "核桃", "黑豆"],
    avoid: "忌受寒感冒，忌过量食用辛辣。"
  },
  {
    name: "大雪", month: 12, day: 6-8,
    season: "冬", element: "水",
    advice: "雪量增大，宜补肾温阳。多晒太阳，温通经脉。",
    recipe: "红参枸杞茶 — 红参3g、枸杞10g，沸水冲泡，大补元气。",
    herbs: ["红参", "枸杞", "桂圆"],
    avoid: "忌受寒，忌剧烈运动大汗伤阳。"
  },
  {
    name: "冬至", month: 12, day: 21-23,
    season: "冬", element: "水",
    advice: "阴极阳生，宜补肾助阳。一年最宜进补时节，温补为宜。",
    recipe: "当归羊肉汤 — 当归15g、羊肉500g、生姜30g，冬至温补首选。",
    herbs: ["当归", "羊肉", "肉桂"],
    avoid: "忌受寒，忌峻补伤正。"
  },
  {
    name: "小寒", month: 1, day: 5-7,
    season: "冬", element: "水",
    advice: "一年最冷，宜温阳驱寒。暖头暖足，固护阳气。",
    recipe: "黄芪红枣茶 — 黄芪15g、红枣5枚，益气固表。",
    herbs: ["黄芪", "红枣", "肉桂"],
    avoid: "忌受寒，忌在寒风中剧烈运动。"
  },
  {
    name: "大寒", month: 1, day: 20-21,
    season: "冬", element: "水",
    advice: "寒气至极，宜温补肾阳。春不远，静待阳气升。",
    recipe: "八珍鸡汤 — 党参10g、白术10g、茯苓10g、当归10g、川芎5g、白芍10g、熟地15g、枸杞15g，炖鸡，气血双补。",
    herbs: ["党参", "当归", "熟地", "枸杞"],
    avoid: "忌受寒，忌大补峻补。"
  },
];

// 根据日期找当前节气
function getCurrentTerm(): typeof SOLAR_TERMS[0] {
  const now = new Date();
  const month = now.getMonth() + 1;
  const day = now.getDate();

  // 找到最近的节气
  let best = SOLAR_TERMS[0];
  let bestDiff = 999;

  for (const term of SOLAR_TERMS) {
    const diff = Math.abs(term.month - month) * 30 + Math.abs(term.day - day);
    if (diff < bestDiff) {
      bestDiff = diff;
      best = term;
    }
  }
  return best;
}

export default function SeasonPage() {
  const [term, setTerm] = useState<typeof SOLAR_TERMS[0] | null>(null);
  const [selectedTerm, setSelectedTerm] = useState<string | null>(null);

  useEffect(() => {
    setTerm(getCurrentTerm());
  }, []);

  const display = selectedTerm
    ? SOLAR_TERMS.find(t => t.name === selectedTerm)!
    : term;

  const seasonColors: Record<string, string> = {
    "春": "#5D8A66",
    "夏": "#C4A35A",
    "秋": "#D4956A",
    "冬": "#5A8FAF",
  };

  const seasonBg: Record<string, string> = {
    "春": "rgba(93,138,102,0.08)",
    "夏": "rgba(196,163,90,0.08)",
    "秋": "rgba(212,149,106,0.08)",
    "冬": "rgba(90,143,175,0.08)",
  };

  if (!display) return null;

  const color = seasonColors[display.season] || "#5D8A66";

  return (
    <div className="mx-auto max-w-4xl px-4 py-10">
      {/* 页面标题 */}
      <div className="text-center mb-8">
        <span className="badge-green mb-3">📅 每日更新</span>
        <h1 className="text-3xl md:text-4xl font-display green-text mb-2">二十四节气养生</h1>
        <p className="text-sm" style={{ color: "rgba(232,228,218,0.5)" }}>
          春生夏长，秋收冬藏。顺应节气，健康自来。
        </p>
      </div>

      {/* 节气选择器 */}
      <div className="card-glass p-4 mb-8">
        <div className="flex flex-wrap gap-2 justify-center">
          {["春", "夏", "秋", "冬"].map(s => (
            <div key={s} className="text-xs text-muted mb-1 mr-2 self-center"
              style={{ color: "rgba(232,228,218,0.3)" }}>{s}季</div>
          ))}
          {SOLAR_TERMS.map(t => (
            <button key={t.name}
              onClick={() => setSelectedTerm(t.name)}
              className="px-3 py-1.5 rounded-full text-xs transition-all"
              style={{
                background: selectedTerm === t.name
                  ? seasonBg[t.season]
                  : "rgba(93,138,102,0.05)",
                border: `1px solid ${selectedTerm === t.name ? seasonColors[t.season] + "55" : "rgba(93,138,102,0.12)"}`,
                color: selectedTerm === t.name ? seasonColors[t.season]
                  : "rgba(232,228,218,0.5)",
              }}>
              {t.name}
            </button>
          ))}
        </div>
      </div>

      {/* 当前节气卡片 */}
      <div className="card-featured p-8 mb-6" style={{ borderColor: `${color}44` }}>
        <div className="flex items-start gap-4 mb-5">
          <div className="flex-shrink-0 w-16 h-16 rounded-full flex items-center justify-center text-2xl"
            style={{ background: `${color}22`, border: `2px solid ${color}44` }}>
            {display.season === "春" ? "🌱" : display.season === "夏" ? "☀️" : display.season === "秋" ? "🍂" : "❄️"}
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs badge-green">{display.season}季</span>
              <span className="text-xs" style={{ color: `${color}88` }}>属{display.element}行</span>
            </div>
            <h2 className="text-3xl font-display" style={{ color }}>{display.name}</h2>
            <p className="text-xs" style={{ color: "rgba(232,228,218,0.4)" }}>
              约 {display.month}月{display.day}日
            </p>
          </div>
        </div>

        <div className="divider-green mb-5" />

        <div className="grid md:grid-cols-2 gap-5">
          <div>
            <h3 className="text-sm font-display mb-2" style={{ color: "var(--color-swen-green-light)" }}>
              🍃 节气养生
            </h3>
            <p className="text-sm leading-relaxed" style={{ color: "rgba(232,228,218,0.65)" }}>
              {display.advice}
            </p>
          </div>
          <div>
            <h3 className="text-sm font-display mb-2" style={{ color: "var(--color-swen-gold)" }}>
              🍲 推荐食方
            </h3>
            <p className="text-sm leading-relaxed" style={{ color: "rgba(232,228,218,0.65)" }}>
              {display.recipe}
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4 mt-5">
          <div>
            <h4 className="text-xs font-medium mb-2" style={{ color: "rgba(232,228,218,0.5)" }}>
              宜用草药
            </h4>
            <div className="flex flex-wrap gap-2">
              {display.herbs.map(h => (
                <span key={h} className="badge-green text-xs">{h}</span>
              ))}
            </div>
          </div>
          <div>
            <h4 className="text-xs font-medium mb-2" style={{ color: "rgba(232,228,218,0.5)" }}>
              养生禁忌
            </h4>
            <p className="text-xs" style={{ color: "rgba(232,228,218,0.45)" }}>
              {display.avoid}
            </p>
          </div>
        </div>
      </div>

      {/* 四季概览 */}
      <div className="section-heading mt-10">
        <span className="badge-green mb-3">🌿 四季养生总览</span>
        <h2>春养肝 · 夏养心 · 秋养肺 · 冬养肾</h2>
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { season: "春", icon: "🌱", color: "#5D8A66",
            desc: "春属木，与肝相应。宜早起散步，广步于庭，助肝气升发。少酸多甘，以养脾气。" },
          { season: "夏", icon: "☀️", color: "#C4A35A",
            desc: "夏属火，与心相应。宜静心养神，午后小憩。清热解暑，忌大喜大悲。" },
          { season: "秋", icon: "🍂", color: "#D4956A",
            desc: "秋属金，与肺相应。宜润燥养肺，早睡早起。少辛多酸，收敛肺气。" },
          { season: "冬", icon: "❄️", color: "#5A8FAF",
            desc: "冬属水，与肾相应。宜早睡晚起，避寒就温。适度进补，温肾助阳。" },
        ].map(s => (
          <div key={s.season} className="card-base p-5">
            <p className="text-2xl mb-2" style={{ filter: `drop-shadow(0 0 6px ${s.color}66)` }}>
              {s.icon}
            </p>
            <h3 className="text-lg font-display mb-2" style={{ color: s.color }}>
              {s.season}季养生
            </h3>
            <p className="text-xs leading-relaxed" style={{ color: "rgba(232,228,218,0.5)" }}>
              {s.desc}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
