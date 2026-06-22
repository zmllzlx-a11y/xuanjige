"use client";

import { useState } from "react";
import { useEffect } from "react";

// 草药数据（扩展版）
const HERBS = [
  {
    name: "人参", latin: "Panax ginseng",
    nature: "平", flavor: "甘、微苦", channel: "脾、肺、心",
    effect: "大补元气，复脉固脱，补脾益肺，生津养血，安神益智。",
    use: "气虚欲脱、脾肺气虚、津伤口渴、虚热消渴、心悸失眠。",
    caution: "不宜与藜芦、五灵脂同用。实证、热证忌服。",
    category: "补气药",
    color: "#C9A35A",
  },
  {
    name: "黄芪", latin: "Astragalus membranaceus",
    nature: "微温", flavor: "甘", channel: "脾、肺",
    effect: "补气升阳，固表止汗，利水消肿，托毒排脓，生津养血。",
    use: "气虚乏力、脾虚泄泻、表虚自汗、气虚水肿、痈疽难溃。",
    caution: "表实邪盛、气滞湿阻、阴虚阳亢忌服。",
    category: "补气药",
    color: "#8FBC9A",
  },
  {
    name: "枸杞子", latin: "Lycium barbarum",
    nature: "平", flavor: "甘", channel: "肝、肾",
    effect: "滋补肝肾，益精明目。用于虚劳精亏、腰膝酸痛、眩晕耳鸣。",
    use: "肝肾阴虚、视力减退、头晕目眩、腰膝酸软、遗精消渴。",
    caution: "脾虚便溏者慎用。",
    category: "补阴药",
    color: "#C4A35A",
  },
  {
    name: "当归", latin: "Angelica sinensis",
    nature: "温", flavor: "甘、辛", channel: "肝、心、脾",
    effect: "补血活血，调经止痛，润肠通便。",
    use: "血虚萎黄、月经不调、经闭痛经、虚寒腹痛、血虚肠燥。",
    caution: "湿盛中满、大便泄泻者忌服。",
    category: "补血药",
    color: "#C07060",
  },
  {
    name: "川芎", latin: "Ligusticum chuanxiong",
    nature: "温", flavor: "辛", channel: "肝、胆、心包",
    effect: "活血行气，祛风止痛。用于月经不调、痛经、胸胁刺痛。",
    use: "血瘀气滞、头痛眩晕、风湿痹痛、痈疽疮疡。",
    caution: "阴虚火旺、月经过多及出血性疾病慎用。",
    category: "活血药",
    color: "#5A8FAF",
  },
  {
    name: "茯苓", latin: "Poria cocos",
    nature: "平", flavor: "甘、淡", channel: "心、肺、脾、肾",
    effect: "利水渗湿，健脾宁心。用于水肿尿少、脾虚食少、心神不安。",
    use: "水湿停滞、脾虚泄泻、心悸失眠、痰饮眩晕。",
    caution: "虚寒滑精、气虚下陷者慎用。",
    category: "利水药",
    color: "#7A9E7E",
  },
  {
    name: "陈皮", latin: "Citrus reticulata",
    nature: "温", flavor: "辛、苦", channel: "脾、肺",
    effect: "理气健脾，燥湿化痰。用于脘腹胀满、食少吐泻、咳嗽痰多。",
    use: "脾胃气滞、湿痰咳嗽、恶心呕吐、胸痹。",
    caution: "阴虚燥咳、内热实火者慎用。",
    category: "理气药",
    color: "#D4956A",
  },
  {
    name: "甘草", latin: "Glycyrrhiza uralensis",
    nature: "平", flavor: "甘", channel: "心、肺、脾、胃",
    effect: "补脾益气，清热解毒，祛痰止咳，缓急止痛，调和诸药。",
    use: "脾胃虚弱、倦怠乏力、心悸气短、咳嗽痰多、脘腹疼痛。",
    caution: "不宜与甘遂、大戟、海藻、芫花同用。湿盛胀满者忌用。",
    category: "补气药",
    color: "#C9A35A",
  },
  {
    name: "金银花", latin: "Lonicera japonica",
    nature: "寒", flavor: "甘、寒", channel: "肺、心、胃",
    effect: "清热解毒，疏散风热。用于痈肿疔疮、风热感冒、温病初起。",
    use: "热毒疮疡、风热感冒、咽喉肿痛、热毒血痢。",
    caution: "脾胃虚寒及疮疡属阴证者慎用。",
    category: "清热药",
    color: "#5D8A66",
  },
  {
    name: "菊花", latin: "Chrysanthemum morifolium",
    nature: "微寒", flavor: "甘、苦", channel: "肺、肝",
    effect: "散风清热，平肝明目，清热解毒。用于风热感冒、目赤肿痛。",
    use: "风热感冒、头痛眩晕、目赤肿痛、眼目昏花。",
    caution: "气虚胃寒、食少泄泻者慎用。",
    category: "清热药",
    color: "#A8C69F",
  },
  {
    name: "山药", latin: "Dioscorea opposita",
    nature: "平", flavor: "甘", channel: "脾、肺、肾",
    effect: "补脾养胃，生津益肺，补肾涩精。用于脾虚食少、肺虚喘咳。",
    use: "脾虚泄泻、肺虚咳嗽、肾虚遗精、带下尿频、虚热消渴。",
    caution: "湿盛中满、积滞便秘者忌用。",
    category: "补气药",
    color: "#8FBC9A",
  },
  {
    name: "百合", latin: "Lilium brownii",
    nature: "微寒", flavor: "甘", channel: "心、肺",
    effect: "养阴润肺，清心安神。用于阴虚燥咳、劳嗽咳血、虚烦惊悸。",
    use: "肺阴不足、燥咳少痰、咯血、虚烦不安、失眠多梦。",
    caution: "风寒咳嗽、脾胃虚寒者慎用。",
    category: "补阴药",
    color: "#D4956A",
  },
];

const CATEGORIES = ["全部", "补气药", "补血药", "补阴药", "清热药", "利水药", "理气药", "活血药"];
const CATEGORY_COLORS: Record<string, string> = {
  "补气药": "#C9A35A", "补血药": "#C07060", "补阴药": "#5D8A66",
  "清热药": "#5D8A66", "利水药": "#7A9E7E", "理气药": "#D4956A",
  "活血药": "#5A8FAF",
};

export default function HerbPage() {
  const [category, setCategory] = useState("全部");
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<typeof HERBS[0] | null>(null);

  const filtered = HERBS.filter(h => {
    const matchCat = category === "全部" || h.category === category;
    const matchSearch = !search || h.name.includes(search) || h.latin.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <div className="mx-auto max-w-5xl px-4 py-10">
      {/* 标题 */}
      <div className="text-center mb-8">
        <span className="badge-green mb-3">🌿 中医草药</span>
        <h1 className="text-3xl md:text-4xl font-display green-text mb-2">草药百科</h1>
        <p className="text-sm" style={{ color: "rgba(232,228,218,0.5)" }}>
          性味归经、功效用法、配伍禁忌，一查便知
        </p>
      </div>

      {/* 搜索 */}
      <div className="card-glass p-4 mb-6">
        <input
          type="text"
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="搜索草药名称或拉丁学名..."
          className="input-base"
        />
      </div>

      {/* 分类筛选 */}
      <div className="flex flex-wrap gap-2 mb-6">
        {CATEGORIES.map(cat => (
          <button key={cat} onClick={() => setCategory(cat)}
            className="px-3 py-1.5 rounded-full text-xs transition-all"
            style={{
              background: category === cat ? (cat === "全部" ? "rgba(93,138,102,0.12)" : `${CATEGORY_COLORS[cat]}22`)
                : "rgba(93,138,102,0.04)",
              border: `1px solid ${category === cat ? (cat === "全部" ? "rgba(93,138,102,0.4)" : `${CATEGORY_COLORS[cat]}55`)
                : "rgba(93,138,102,0.1)"}`,
              color: category === cat ? (cat === "全部" ? "var(--color-swen-green)" : CATEGORY_COLORS[cat])
                : "rgba(232,228,218,0.45)",
            }}>
            {cat}
          </button>
        ))}
      </div>

      {/* 草药列表 */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map(herb => (
          <button key={herb.name} onClick={() => setSelected(herb)}
            className="card-base text-left p-5 cursor-pointer group"
            style={{ borderColor: selected?.name === herb.name ? `${herb.color}66` : undefined }}>
            <div className="flex items-start justify-between mb-3">
              <div>
                <h3 className="text-lg font-display" style={{ color: herb.color }}>
                  {herb.name}
                </h3>
                <p className="text-xs italic" style={{ color: "rgba(232,228,218,0.35)" }}>
                  {herb.latin}
                </p>
              </div>
              <span className="text-xs badge-green flex-shrink-0">{herb.category}</span>
            </div>
            <div className="grid grid-cols-3 gap-2 mb-3 text-center">
              <div className="rounded-lg p-2" style={{ background: `${herb.color}11` }}>
                <p className="text-xs" style={{ color: "rgba(232,228,218,0.4)" }}>性</p>
                <p className="text-sm font-medium" style={{ color: herb.color }}>{herb.nature}</p>
              </div>
              <div className="rounded-lg p-2" style={{ background: `${herb.color}11` }}>
                <p className="text-xs" style={{ color: "rgba(232,228,218,0.4)" }}>味</p>
                <p className="text-sm font-medium" style={{ color: herb.color }}>{herb.flavor}</p>
              </div>
              <div className="rounded-lg p-2" style={{ background: `${herb.color}11` }}>
                <p className="text-xs" style={{ color: "rgba(232,228,218,0.4)" }}>归经</p>
                <p className="text-xs font-medium" style={{ color: herb.color }}>{herb.channel.split("、")[0]}</p>
              </div>
            </div>
            <p className="text-xs line-clamp-2 leading-relaxed" style={{ color: "rgba(232,228,218,0.5)" }}>
              {herb.effect}
            </p>
            <p className="text-xs mt-2 opacity-0 group-hover:opacity-100 transition-opacity"
              style={{ color: "var(--color-swen-green)" }}>
              点击查看详情 →
            </p>
          </button>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-12" style={{ color: "rgba(232,228,218,0.3)" }}>
          <p className="text-2xl mb-2">🌿</p>
          <p>未找到相关草药</p>
        </div>
      )}

      {/* 详情弹窗 */}
      {selected && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ background: "rgba(9,13,8,0.8)", backdropFilter: "blur(8px)" }}
          onClick={() => setSelected(null)}>
          <div className="card-featured w-full max-w-lg p-6 max-h-[80vh] overflow-y-auto"
            style={{ borderColor: `${selected.color}55` }}
            onClick={e => e.stopPropagation()}>
            <div className="flex items-start justify-between mb-4">
              <div>
                <h2 className="text-2xl font-display" style={{ color: selected.color }}>
                  {selected.name}
                </h2>
                <p className="text-sm italic" style={{ color: "rgba(232,228,218,0.4)" }}>
                  {selected.latin}
                </p>
              </div>
              <button onClick={() => setSelected(null)}
                className="text-swen-muted hover:text-swen-text transition-colors text-xl">✕</button>
            </div>
            <span className="badge-green text-xs mb-4">{selected.category}</span>

            <div className="grid grid-cols-3 gap-3 mb-5">
              {[
                { label: "药性", value: selected.nature },
                { label: "五味", value: selected.flavor },
                { label: "归经", value: selected.channel },
              ].map(item => (
                <div key={item.label} className="text-center p-3 rounded-xl"
                  style={{ background: `${selected.color}11`, border: `1px solid ${selected.color}22` }}>
                  <p className="text-xs mb-1" style={{ color: "rgba(232,228,218,0.4)" }}>{item.label}</p>
                  <p className="text-sm font-medium" style={{ color: selected.color }}>{item.value}</p>
                </div>
              ))}
            </div>

            {[
              { label: "功效", value: selected.effect, icon: "💪" },
              { label: "主治", value: selected.use, icon: "📋" },
              { label: "禁忌", value: selected.caution, icon: "⚠️" },
            ].map(item => (
              <div key={item.label} className="mb-4">
                <h4 className="text-sm font-medium mb-1" style={{ color: "var(--color-swen-green-light)" }}>
                  {item.icon} {item.label}
                </h4>
                <p className="text-sm leading-relaxed" style={{ color: "rgba(232,228,218,0.6)" }}>
                  {item.value}
                </p>
              </div>
            ))}

            <div className="mt-5 pt-4 border-t" style={{ borderColor: "rgba(93,138,102,0.1)" }}>
              <a href="/ask" className="btn-primary w-full text-center block">
                🤖 咨询AI如何使用此药
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
