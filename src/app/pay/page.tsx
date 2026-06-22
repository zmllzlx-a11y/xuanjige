
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

// ============ 付费产品定义 ============

interface Product {
  id: string;
  name: string;
  subtitle: string;
  price: string;
  originalPrice?: string;
  desc: string;
  features: string[];
  tags: string[];
  color: string;
  icon: string;
  layer: "身" | "心" | "灵";
  difficulty: "入门" | "进阶" | "深度";
}

const PRODUCTS: Product[] = [
  // === 身：中医调理 ===
  {
    id: "insomnia-healing",
    name: "安眠调理方案",
    subtitle: "中医安神 · 心理疏导 · 禅修助眠",
    price: "29.9",
    originalPrice: "99",
    desc: "三层调理失眠：中药安神方+CBT-I认知行为疗法+禅修呼吸法，从身体、心理、灵性三个维度根除睡眠障碍。",
    features: [
      "中医辨证分型（心脾两虚/心肾不交/肝火扰心）",
      "定制药膳食疗方（酸枣仁汤/甘麦大枣汤）",
      "穴位按摩方案（神门·安眠·三阴交）",
      "CBT-I 睡眠限制与刺激控制法",
      "禅修呼吸法引导音频",
      "21天调理跟踪计划",
    ],
    tags: ["失眠", "焦虑", "入睡困难", "多梦易醒"],
    color: "#5D8A66",
    icon: "🌙",
    layer: "身",
    difficulty: "入门",
  },
  {
    id: "stomach-healing",
    name: "脾胃调养方案",
    subtitle: "健脾和胃 · 情志调畅 · 正念饮食",
    price: "39.9",
    originalPrice: "129",
    desc: "中医讲'思伤脾'，脾胃病根源常在情志。本方案融合健脾方药、情绪管理、正念饮食，从根调理脾胃虚寒。",
    features: [
      "脾胃证型分析（虚寒/湿热/气滞/食积）",
      "四季健脾药膳食谱",
      "经络穴位调理（足三里·中脘·脾俞）",
      "情绪-脾胃关联分析与疏导",
      "正念饮食训练法",
      "30天调养日历",
    ],
    tags: ["胃痛", "消化不良", "腹胀", "食欲不振", "脾虚"],
    color: "#C9A35A",
    icon: "🍲",
    layer: "身",
    difficulty: "入门",
  },
  {
    id: "menopause-healing",
    name: "更年期调和方案",
    subtitle: "滋肾平肝 · 心理调适 · 冥想静心",
    price: "49.9",
    originalPrice: "159",
    desc: "更年期是'天癸竭'的自然过程。中医滋肾平肝+激素认知重建+禅修静心，让更年期成为生命的'第二春'。",
    features: [
      "肾阴阳偏盛辨证分析",
      "二仙汤/知柏地黄丸加减方",
      "潮热盗汗穴位调理",
      "更年期认知重建（CBT）",
      "身体接纳与禅修引导",
      "60天阶段性调养方案",
    ],
    tags: ["更年期", "潮热", "心烦", "失眠", "情绪波动"],
    color: "#C07060",
    icon: "🌸",
    layer: "身",
    difficulty: "进阶",
  },
  {
    id: "pain-healing",
    name: "慢性疼痛调理方案",
    subtitle: "通络止痛 · 认知重构 · 禅观疼痛",
    price: "49.9",
    originalPrice: "159",
    desc: "痛则不通，通则不活。中医通络活血+现代疼痛认知重构+内观禅修，三层破除慢性疼痛的身心循环。",
    features: [
      "疼痛经络辨证（颈肩/腰膝/头痛）",
      "活血通络中药方+外敷方",
      "阿是穴·循经取穴方案",
      "疼痛认知重构（基于ACT接纳承诺疗法）",
      "内观禅修：与疼痛和平共处",
      "90天渐进式康复计划",
    ],
    tags: ["颈椎病", "腰痛", "关节痛", "头痛", "纤维肌痛"],
    color: "#5A8FAF",
    icon: "🦴",
    layer: "身",
    difficulty: "进阶",
  },

  // === 心：心理疗愈 ===
  {
    id: "anxiety-healing",
    name: "焦虑疗愈方案",
    subtitle: "疏肝理气 · 认知疗法 · 观息法",
    price: "49.9",
    originalPrice: "159",
    desc: "中医'肝主疏泄'，焦虑多因肝气郁结。柴胡疏肝散+CBT认知重构+观息法，三层化解焦虑困局。",
    features: [
      "肝气郁结/心胆气虚辨证",
      "柴胡疏肝散/甘麦大枣汤加减",
      "太冲·期门·膻中疏肝穴位",
      "CBT认知重构五步法",
      "内观观息法（葛印卡传承）",
      "42天焦虑自评跟踪",
    ],
    tags: ["焦虑", "心慌", "恐惧", "紧张", "过度思虑"],
    color: "#8FBC9A",
    icon: "🫁",
    layer: "心",
    difficulty: "进阶",
  },
  {
    id: "depression-healing",
    name: "情志郁结化解方案",
    subtitle: "解郁安神 · 人本疗愈 · 慈悲禅",
    price: "69.9",
    originalPrice: "199",
    desc: "抑郁非'病'而是'结'。中医解郁安神+以人为中心疗法+慈悲禅修，从心开解，重见光明。",
    features: [
      "肝郁脾虚/心脾两虚/肾阳不足辨证",
      "逍遥散/归脾汤/四逆汤加减方",
      "百会·印堂·神门安神穴位",
      "以人为中心疗法（罗杰斯流派）",
      "慈悲禅修（慈心冥想）",
      "90天心灯重启计划",
    ],
    tags: ["抑郁", "低落", "无力", "丧失兴趣", "自我否定"],
    color: "#7A9E7E",
    icon: "🕯️",
    layer: "心",
    difficulty: "深度",
  },
  {
    id: "grief-healing",
    name: "哀伤转化方案",
    subtitle: "养心润肺 · 哀伤辅导 · 中阴禅修",
    price: "59.9",
    originalPrice: "179",
    desc: "悲伤'伤肺'，哀思'耗心'。中医养心润肺+哀伤辅导五阶段+中阴禅修，转化哀伤为生命智慧。",
    features: [
      "心肺气虚/阴虚火旺辨证",
      "百合地黄汤/生脉散加减",
      "太渊·列缺·内关养心穴",
      "库伯勒-罗斯哀伤五阶段引导",
      "中阴禅修（生死观照）",
      "49天哀伤转化修行",
    ],
    tags: ["丧亲", "失恋", "离别", "哀伤", "思念"],
    color: "#5A8FAF",
    icon: "🕊️",
    layer: "心",
    difficulty: "深度",
  },

  // === 灵：灵性疗愈 ===
  {
    id: "burnout-healing",
    name: "耗竭重生方案",
    subtitle: "培元固本 · 意义重构 · 启悟禅修",
    price: "79.9",
    originalPrice: "249",
    desc: "职业倦怠本质是'精气神'耗竭。中医培元固本+存在主义意义重构+禅宗公案启悟，三层点燃生命之火。",
    features: [
      "精气神三耗辨证分析",
      "培元固本方（人参·黄芪·五味子）",
      "命门·关元·气海培元穴位",
      "存在主义意义重构（弗兰克尔流派）",
      "禅宗公案启悟对话",
      "120天精气神重建计划",
    ],
    tags: ["职业倦怠", "内耗", "无意义感", "疲惫", "麻木"],
    color: "#C9A35A",
    icon: "🔥",
    layer: "灵",
    difficulty: "深度",
  },
  {
    id: "relationship-healing",
    name: "关系和解方案",
    subtitle: "调和气血 · 非暴力沟通 · 家排禅观",
    price: "59.9",
    originalPrice: "179",
    desc: "关系困境多因'气血不和'。中医调和气血+非暴力沟通+家庭系统排列禅观，三层打通关系能量流。",
    features: [
      "肝胃不和/心肾不交辨证",
      "四逆散/交泰丸加减方",
      "太冲·合谷·内关调气穴位",
      "非暴力沟通四步法（马歇尔·卢森堡）",
      "家庭系统排列禅观法",
      "60天关系觉察日记",
    ],
    tags: ["夫妻矛盾", "亲子冲突", "人际困扰", "沟通障碍"],
    color: "#D4956A",
    icon: "🤝",
    layer: "灵",
    difficulty: "进阶",
  },
  {
    id: "self-discovery",
    name: "自性觉醒方案",
    subtitle: "培补元气 · 阴影整合 · 见性禅修",
    price: "99.9",
    originalPrice: "299",
    desc: "最高阶方案。中医培补先天元气+荣格阴影整合+禅宗见性法门，从'我是谁'到'我即自性'的终极探索。",
    features: [
      "先天元气评估与培补方案",
      "河车搬运·周天功法引导",
      "命门·涌泉·百会三穴归元",
      "荣格阴影整合（主动想象法）",
      "禅宗见性法门（参话头）",
      "180天觉知修行地图",
    ],
    tags: ["自我探索", "灵性成长", "存在困惑", "生命意义"],
    color: "#5D8A66",
    icon: "🪷",
    layer: "灵",
    difficulty: "深度",
  },
];

const LAYER_INFO = {
  "身": { label: "身 · 中医调理", desc: "从身体入手，辨证施治，通经活络", color: "#5D8A66", icon: "🫀" },
  "心": { label: "心 · 心理疗愈", desc: "情志为根，认知重构，化解心结", color: "#8FBC9A", icon: "🧠" },
  "灵": { label: "灵 · 灵性成长", desc: "见性明心，意义重构，自性觉醒", color: "#C9A35A", icon: "✨" },
};

export default function PayPage() {
  const router = useRouter();
  const [activeLayer, setActiveLayer] = useState<"全部" | "身" | "心" | "灵">("全部");

  const filtered = activeLayer === "全部"
    ? PRODUCTS
    : PRODUCTS.filter(p => p.layer === activeLayer);

  return (
    <div className="mx-auto max-w-5xl px-4 py-10">
      {/* 页面标题 */}
      <div className="text-center mb-10">
        <span className="badge-green mb-3">🪷 身·心·灵 · 深度调理</span>
        <h1 className="text-3xl md:text-4xl font-display green-text mb-3">
          定制疗愈方案
        </h1>
        <p className="text-sm max-w-lg mx-auto" style={{ color: "rgba(232,228,218,0.5)" }}>
          中医辨证 · 心理疏导 · 禅修启悟<br />
          三层深度调理，不治已病治未病，不止于疗愈更走向觉醒
        </p>
      </div>

      {/* 三层理念 */}
      <div className="grid md:grid-cols-3 gap-4 mb-8">
        {(["身", "心", "灵"] as const).map(layer => {
          const info = LAYER_INFO[layer];
          return (
            <button key={layer} onClick={() => setActiveLayer(activeLayer === layer ? "全部" : layer)}
              className="card-base p-5 text-left transition-all cursor-pointer"
              style={{
                borderColor: activeLayer === layer ? `${info.color}55` : undefined,
                background: activeLayer === layer ? `${info.color}08` : undefined,
              }}>
              <div className="flex items-center gap-3 mb-2">
                <span className="text-2xl">{info.icon}</span>
                <h3 className="text-base font-display" style={{ color: info.color }}>{info.label}</h3>
              </div>
              <p className="text-xs" style={{ color: "rgba(232,228,218,0.4)" }}>{info.desc}</p>
            </button>
          );
        })}
      </div>

      {/* 层级筛选 */}
      <div className="flex gap-2 mb-6 justify-center">
        {(["全部", "身", "心", "灵"] as const).map(layer => (
          <button key={layer} onClick={() => setActiveLayer(layer)}
            className="px-4 py-1.5 rounded-full text-xs transition-all"
            style={{
              background: activeLayer === layer
                ? (layer === "全部" ? "rgba(93,138,102,0.12)" : `${LAYER_INFO[layer as keyof typeof LAYER_INFO]?.color || "#5D8A66"}22`)
                : "rgba(93,138,102,0.04)",
              border: `1px solid ${activeLayer === layer
                ? (layer === "全部" ? "rgba(93,138,102,0.4)" : `${LAYER_INFO[layer as keyof typeof LAYER_INFO]?.color || "#5D8A66"}55`)
                : "rgba(93,138,102,0.1)"}`,
              color: activeLayer === layer
                ? (layer === "全部" ? "var(--color-swen-green)" : LAYER_INFO[layer as keyof typeof LAYER_INFO]?.color)
                : "rgba(232,228,218,0.45)",
            }}>
            {layer === "全部" ? "🌿 全部" : `${LAYER_INFO[layer as keyof typeof LAYER_INFO]?.icon} ${layer}·${LAYER_INFO[layer as keyof typeof LAYER_INFO]?.label.split("·")[1]}`}
          </button>
        ))}
      </div>

      {/* 产品列表 */}
      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {filtered.map((p, i) => (
          <div key={p.id}
            className="card-base p-5 flex flex-col transition-all hover:scale-[1.01]"
            style={{ borderLeft: `3px solid ${p.color}` }}>
            {/* 头部 */}
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl"
                  style={{ background: `${p.color}18`, border: `1px solid ${p.color}33` }}>
                  {p.icon}
                </div>
                <div>
                  <span className="text-xs badge-green">{p.layer}·{p.difficulty}</span>
                </div>
              </div>
              <div className="text-right">
                <span className="text-xl font-display" style={{ color: "#c95050" }}>¥{p.price}</span>
                {p.originalPrice && (
                  <span className="text-xs line-through ml-1" style={{ color: "rgba(232,228,218,0.25)" }}>
                    ¥{p.originalPrice}
                  </span>
                )}
              </div>
            </div>

            {/* 名称和描述 */}
            <h3 className="text-base font-display mb-1" style={{ color: p.color }}>{p.name}</h3>
            <p className="text-xs mb-2" style={{ color: "rgba(232,228,218,0.4)" }}>{p.subtitle}</p>
            <p className="text-xs leading-relaxed mb-3" style={{ color: "rgba(232,228,218,0.55)" }}>
              {p.desc}
            </p>

            {/* 标签 */}
            <div className="flex flex-wrap gap-1 mb-3">
              {p.tags.map(tag => (
                <span key={tag} className="text-xs px-2 py-0.5 rounded-full"
                  style={{ background: `${p.color}11`, color: `${p.color}88`, border: `1px solid ${p.color}22` }}>
                  {tag}
                </span>
              ))}
            </div>

            {/* 功能列表 */}
            <ul className="space-y-1 mb-4 flex-1">
              {p.features.map(f => (
                <li key={f} className="text-xs flex items-start gap-1.5" style={{ color: "rgba(232,228,218,0.55)" }}>
                  <span className="mt-0.5" style={{ color: p.color }}>✓</span>
                  <span>{f}</span>
                </li>
              ))}
            </ul>

            {/* 购买按钮 */}
            <button
              onClick={() => router.push(`/checkout?product=${p.id}`)}
              className="w-full py-2.5 rounded-xl text-sm font-medium transition-all active:scale-[0.98]"
              style={{
                background: `linear-gradient(135deg, ${p.color}dd, ${p.color}88)`,
                color: "#fff",
                boxShadow: `0 4px 16px ${p.color}22`,
              }}>
              立即购买 ¥{p.price}
            </button>
          </div>
        ))}
      </div>

      {/* 三层调理理念说明 */}
      <div className="card-featured p-6 mt-10">
        <h2 className="text-xl font-display green-text mb-4 text-center">🪷 为什么是"身·心·灵"三层？</h2>
        <div className="grid md:grid-cols-3 gap-5">
          <div className="text-center">
            <div className="text-3xl mb-2">🫀</div>
            <h3 className="text-sm font-display mb-1" style={{ color: "#5D8A66" }}>身 · 辨证施治</h3>
            <p className="text-xs leading-relaxed" style={{ color: "rgba(232,228,218,0.5)" }}>
              《黄帝内经》云："上工治未病"。中医辨证，药膳食疗，经络穴位——先调身，让气血运行通畅，身体是修行的根基。
            </p>
          </div>
          <div className="text-center">
            <div className="text-3xl mb-2">🧠</div>
            <h3 className="text-sm font-display mb-1" style={{ color: "#8FBC9A" }}>心 · 认知重构</h3>
            <p className="text-xs leading-relaxed" style={{ color: "rgba(232,228,218,0.5)" }}>
              中医云"七情内伤"，西方心理学亦证"认知决定情绪"。CBT、ACT、人本疗法——解开心结，让心不再困于执念。
            </p>
          </div>
          <div className="text-center">
            <div className="text-3xl mb-2">✨</div>
            <h3 className="text-sm font-display mb-1" style={{ color: "#C9A35A" }}>灵 · 见性明心</h3>
            <p className="text-xs leading-relaxed" style={{ color: "rgba(232,228,218,0.5)" }}>
              禅宗六祖云："何期自性，本自具足"。当身已调、心已安，灵性自然显现。公案、冥想、慈悲禅——从疗愈走向觉醒。
            </p>
          </div>
        </div>
      </div>

      {/* 购买流程 */}
      <div className="card-glass p-6 mt-6 text-center">
        <h3 className="text-base font-display green-text mb-4">💳 购买流程</h3>
        <div className="max-w-md mx-auto space-y-2 text-left">
          {[
            { step: "①", text: "选择方案，点击「立即购买」" },
            { step: "②", text: "跳转支付页面，扫描微信收款码付款" },
            { step: "③", text: "付款后截图，联系站长确认" },
            { step: "④", text: "确认到账后，获取定制调理方案" },
          ].map(s => (
            <div key={s.step} className="flex items-start gap-2 text-sm" style={{ color: "rgba(232,228,218,0.55)" }}>
              <span className="shrink-0" style={{ color: "var(--color-swen-green)" }}>{s.step}</span>
              <span>{s.text}</span>
            </div>
          ))}
        </div>
      </div>

      {/* 免责声明 */}
      <p className="text-center text-xs mt-8" style={{ color: "rgba(232,228,218,0.2)" }}>
        * 本服务融合中医养生、心理疏导与禅修引导，仅供身心调养参考，不替代专业医疗诊断。<br />
        如有严重疾病，请及时就医。心理健康紧急情况请拨打24小时热线：400-161-9995
      </p>
    </div>
  );
}
