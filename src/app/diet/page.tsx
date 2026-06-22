"use client";

import { useState } from "react";

const RECIPES = [
  {
    name: "四君子汤",
    dynasty: "宋代《太平惠民和剂局方》",
    ingredients: ["人参9g", "白术9g", "茯苓9g", "甘草6g"],
    method: "将药材洗净，加水1000ml，煎煮30分钟，分2-3次温服。",
    effect: "益气健脾。主治脾胃气虚、面色萎黄、食少便溏。",
    suitable: "气虚体质、脾胃虚弱者",
    taboo: "阴虚内热、实热证忌用",
    season: "春",
    tags: ["补气", "健脾"],
    color: "#C9A35A",
  },
  {
    name: "四物汤",
    dynasty: "宋代《太平惠民和剂局方》",
    ingredients: ["当归10g", "川芎8g", "白芍12g", "熟地12g"],
    method: "将药材洗净，加水1000ml，煎煮30分钟，滤渣取汁，分早晚温服。",
    effect: "补血调经。主治血虚面色萎黄、头晕心悸、月经不调。",
    suitable: "血虚体质、月经不调者",
    taboo: "阴虚发热、便溏泄泻者慎用",
    season: "冬",
    tags: ["补血", "调经"],
    color: "#C07060",
  },
  {
    name: "银耳百合羹",
    dynasty: "现代养生方",
    ingredients: ["银耳10g", "百合20g", "枸杞10g", "冰糖适量"],
    method: "银耳泡发撕小朵，百合洗净，加水800ml炖煮1小时，加入冰糖融化。",
    effect: "滋阴润肺，养心安神。主治肺阴不足、干咳少痰、虚烦失眠。",
    suitable: "阴虚体质、秋冬季节能",
    taboo: "风寒咳嗽、脾胃虚寒者忌用",
    season: "秋",
    tags: ["滋阴", "润肺"],
    color: "#5D8A66",
  },
  {
    name: "当归生姜羊肉汤",
    dynasty: "汉代《金匮要略》",
    ingredients: ["当归15g", "生姜30g", "羊肉500g", "料酒、盐适量"],
    method: "羊肉切块焯水，与当归、生姜同炖2小时，加料酒盐调味。",
    effect: "温中补血，祛寒止痛。主治寒疝腹痛、产后血虚、冬季怕冷。",
    suitable: "阳虚体质、冬季滋补",
    taboo: "阴虚内热、实热证忌用",
    season: "冬",
    tags: ["温补", "祛寒"],
    color: "#D4956A",
  },
  {
    name: "枸杞菊花茶",
    dynasty: "现代养生方",
    ingredients: ["枸杞10g", "菊花6g", "蜂蜜适量（可选）"],
    method: "枸杞菊花用沸水冲泡，焖5分钟后饮用，可加蜂蜜调味。",
    effect: "清肝明目，滋补肝肾。主治肝火上炎、目赤肿痛、头晕眼花。",
    suitable: "用眼过度、肝火旺盛者",
    taboo: "脾胃虚寒、腹泻便溏者少用",
    season: "春",
    tags: ["清肝", "明目"],
    color: "#8FBC9A",
  },
  {
    name: "薏米赤小豆汤",
    dynasty: "现代养生方",
    ingredients: ["薏米30g", "赤小豆30g", "冰糖适量"],
    method: "薏米赤小豆提前浸泡2小时，加水1000ml煮1小时，加糖融化。",
    effect: "健脾祛湿，清热消肿。主治湿气重、身体困倦、水肿。",
    suitable: "痰湿体质、湿热体质",
    taboo: "阴虚津亏、孕妇慎用",
    season: "夏",
    tags: ["祛湿", "健脾"],
    color: "#7A9E7E",
  },
  {
    name: "酸梅汤",
    dynasty: "清代宫廷方",
    ingredients: ["乌梅30g", "山楂20g", "甘草5g", "陈皮5g", "冰糖适量"],
    method: "药材浸泡30分钟后煮30分钟，滤渣加冰糖，冷热均可饮用。",
    effect: "生津止渴，清热解暑，开胃消食。主治暑热伤津、食欲不振。",
    suitable: "夏季防暑、大汗后",
    taboo: "胃酸过多、空腹慎用",
    season: "夏",
    tags: ["解暑", "生津"],
    color: "#D4956A",
  },
  {
    name: "山药莲子粥",
    dynasty: "现代养生方",
    ingredients: ["山药30g", "莲子20g", "粳米50g", "冰糖适量"],
    method: "山药切块，莲子去芯，与粳米同煮成粥，早晚服用。",
    effect: "健脾养心，补肾固精。主治脾虚食少、心悸失眠、遗精带下。",
    suitable: "脾虚体质、心肾不交者",
    taboo: "便秘腹胀者少用",
    season: "秋",
    tags: ["健脾", "养心"],
    color: "#8FBC9A",
  },
];

const SEASONS = ["全部", "春", "夏", "秋", "冬"];
const SEASON_COLORS: Record<string, string> = { "春": "#5D8A66", "夏": "#C4A35A", "秋": "#D4956A", "冬": "#5A8FAF" };

export default function DietPage() {
  const [season, setSeason] = useState("全部");
  const [selected, setSelected] = useState<typeof RECIPES[0] | null>(null);

  const filtered = season === "全部" ? RECIPES : RECIPES.filter(r => r.season === season);

  return (
    <div className="mx-auto max-w-5xl px-4 py-10">
      <div className="text-center mb-8">
        <span className="badge-green mb-3">🍲 药食同源</span>
        <h1 className="text-3xl md:text-4xl font-display green-text mb-2">药膳食谱</h1>
        <p className="text-sm" style={{ color: "rgba(232,228,218,0.5)" }}>
          吃出健康 · 源自经典 · 四季皆宜
        </p>
      </div>

      {/* 季节筛选 */}
      <div className="flex flex-wrap gap-2 justify-center mb-8">
        {SEASONS.map(s => (
          <button key={s} onClick={() => setSeason(s)}
            className="px-4 py-1.5 rounded-full text-xs transition-all"
            style={{
              background: season === s ? (s === "全部" ? "rgba(93,138,102,0.12)" : `${SEASON_COLORS[s]}22`)
                : "rgba(93,138,102,0.04)",
              border: `1px solid ${season === s ? (s === "全部" ? "rgba(93,138,102,0.4)" : `${SEASON_COLORS[s]}55`)
                : "rgba(93,138,102,0.1)"}`,
              color: season === s ? (s === "全部" ? "var(--color-swen-green)" : SEASON_COLORS[s])
                : "rgba(232,228,218,0.45)",
            }}>
            {s === "全部" ? "🌿 全部" : s === "春" ? "🌱 春" : s === "夏" ? "☀️ 夏" : s === "秋" ? "🍂 秋" : "❄️ 冬"}
          </button>
        ))}
      </div>

      {/* 食谱网格 */}
      <div className="grid md:grid-cols-2 gap-5">
        {filtered.map(recipe => (
          <button key={recipe.name} onClick={() => setSelected(recipe)}
            className="card-base text-left cursor-pointer"
            style={{ borderColor: selected?.name === recipe.name ? `${recipe.color}55` : undefined }}>
            <div className="flex items-start gap-3 mb-3">
              <div className="w-10 h-10 rounded-full flex items-center justify-center text-lg flex-shrink-0"
                style={{ background: `${recipe.color}22` }}>
                🍲
              </div>
              <div className="flex-1">
                <h3 className="text-base font-display" style={{ color: recipe.color }}>{recipe.name}</h3>
                <p className="text-xs" style={{ color: "rgba(232,228,218,0.35)" }}>{recipe.dynasty}</p>
              </div>
              <span className="text-xs badge-green flex-shrink-0">{recipe.season}季</span>
            </div>
            <p className="text-xs leading-relaxed line-clamp-2 mb-3" style={{ color: "rgba(232,228,218,0.55)" }}>
              {recipe.effect}
            </p>
            <div className="flex flex-wrap gap-1">
              {recipe.tags.map(tag => (
                <span key={tag} className="text-xs px-2 py-0.5 rounded-full"
                  style={{ background: `${recipe.color}11`, color: `${recipe.color}99`, border: `1px solid ${recipe.color}22` }}>
                  {tag}
                </span>
              ))}
            </div>
          </button>
        ))}
      </div>

      {/* 详情弹窗 */}
      {selected && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ background: "rgba(9,13,8,0.8)", backdropFilter: "blur(8px)" }}
          onClick={() => setSelected(null)}>
          <div className="card-featured w-full max-w-lg p-6 max-h-[85vh] overflow-y-auto"
            style={{ borderColor: `${selected.color}55` }}
            onClick={e => e.stopPropagation()}>
            <div className="flex items-start justify-between mb-4">
              <div>
                <h2 className="text-2xl font-display" style={{ color: selected.color }}>{selected.name}</h2>
                <p className="text-xs mt-1" style={{ color: "rgba(232,228,218,0.4)" }}>{selected.dynasty}</p>
              </div>
              <button onClick={() => setSelected(null)}
                className="text-swen-muted hover:text-swen-text transition-colors text-xl flex-shrink-0">✕</button>
            </div>

            <div className="grid grid-cols-3 gap-3 mb-5">
              {[
                { label: "适宜季节", value: selected.season + "季" },
                { label: "适宜体质", value: selected.tags[0] },
                { label: "主要功效", value: selected.tags.join("·") },
              ].map(item => (
                <div key={item.label} className="text-center p-2 rounded-lg"
                  style={{ background: `${selected.color}11`, border: `1px solid ${selected.color}22` }}>
                  <p className="text-xs" style={{ color: "rgba(232,228,218,0.4)" }}>{item.label}</p>
                  <p className="text-xs font-medium" style={{ color: selected.color }}>{item.value}</p>
                </div>
              ))}
            </div>

            {[
              { label: "配方", value: selected.ingredients.join("、"), icon: "📋" },
              { label: "做法", value: selected.method, icon: "🍳" },
              { label: "功效", value: selected.effect, icon: "💪" },
              { label: "宜忌", value: `宜：${selected.suitable}\n忌：${selected.taboo}`, icon: "⚠️" },
            ].map(item => (
              <div key={item.label} className="mb-4">
                <h4 className="text-sm font-medium mb-1" style={{ color: "var(--color-swen-green-light)" }}>
                  {item.icon} {item.label}
                </h4>
                <p className="text-sm leading-relaxed whitespace-pre-line" style={{ color: "rgba(232,228,218,0.6)" }}>
                  {item.value}
                </p>
              </div>
            ))}

            <div className="mt-5 pt-4 border-t" style={{ borderColor: "rgba(93,138,102,0.1)" }}>
              <a href="/ask" className="btn-primary w-full text-center block">
                🤖 咨询AI适合我的食疗方案
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
