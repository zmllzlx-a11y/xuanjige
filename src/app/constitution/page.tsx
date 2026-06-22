"use client";

import { useState } from "react";

// 九种体质数据
const CONSTITUTIONS = [
  {
    id: "pinghe",
    name: "平和质",
    desc: "阴阳气血调和，体态适中，面色润泽，目光有神，精力充沛。",
    traits: ["面色红润", "睡眠良好", "适应力强", "不易生病"],
    diet: "均衡饮食，规律作息。可适量食用山药、莲子、枸杞等平补食材。",
    avoid: "忌偏食、暴饮暴食，保持适度运动。",
    color: "#5D8A66",
  },
  {
    id: "qixu",
    name: "气虚质",
    desc: "元气不足，容易疲乏，气短懒言，说话声音低弱，容易出汗。",
    traits: ["容易疲劳", "说话声音低", "易出虚汗", "抵抗力差"],
    diet: "宜吃人参、黄芪、山药、红枣、鸡肉等补气食物。少食耗气之品如萝卜、茶叶。",
    avoid: "避免过度劳累和剧烈运动，忌熬夜伤气。",
    color: "#8FBC9A",
  },
  {
    id: "yangxu",
    name: "阳虚质",
    desc: "阳气不足，畏寒怕冷，手足不温，喜欢热饮，精神不振。",
    traits: ["手脚冰凉", "畏寒喜暖", "精神萎靡", "小便清长"],
    diet: "宜吃羊肉、核桃、桂圆、生姜、肉桂等温补食材。",
    avoid: "忌食生冷寒凉，如冰品、西瓜、苦瓜等。",
    color: "#C9A35A",
  },
  {
    id: "yinxu",
    name: "阴虚质",
    desc: "阴液不足，手足心热，口燥咽干，鼻微干，喜冷饮。",
    traits: ["手足心热", "口干咽燥", "喜冷饮", "大便干燥"],
    diet: "宜吃银耳、百合、麦冬、石斛、梨、蜂蜜等滋阴润燥食物。",
    avoid: "忌食辛辣温热之品，如辣椒、生姜、大蒜等。",
    color: "#D4956A",
  },
  {
    id: "tanshi",
    name: "痰湿质",
    desc: "痰湿内蕴，体形肥胖，腹部肥满松软，面部皮肤油脂较多。",
    traits: ["体型偏胖", "腹部肥软", "皮肤油腻", "痰多胸闷"],
    diet: "宜吃薏苡仁、赤小豆、冬瓜、白萝卜、陈皮等化痰祛湿食物。",
    avoid: "忌食甜腻油腻，如蛋糕、肥肉、糯米等。",
    color: "#7A9E7E",
  },
  {
    id: "shire",
    name: "湿热质",
    desc: "湿热内蕴，面垢油光，易生痤疮，口苦口干，身重困倦。",
    traits: ["面部油光", "易长痘", "口苦口干", "大便黏滞"],
    diet: "宜吃绿豆、薏米、苦瓜、冬瓜、莲子心等清热利湿食物。",
    avoid: "忌食辛辣油腻、煎炸烧烤，忌饮酒。",
    color: "#C4A35A",
  },
  {
    id: "xueyu",
    name: "血瘀质",
    desc: "血行不畅，肤色晦暗，色素沉着，易出现瘀斑，口唇暗淡。",
    traits: ["肤色晦暗", "容易瘀斑", "口唇暗淡", "健忘易烦"],
    diet: "宜吃山楂、玫瑰花、黑木耳、洋葱、红糖等活血化瘀食物。",
    avoid: "忌食寒凉生冷之物，保持适度运动促进血行。",
    color: "#C07060",
  },
  {
    id: "qiyu",
    name: "气郁质",
    desc: "气机郁滞，神情抑郁，忧虑脆弱，烦闷不乐，容易失眠。",
    traits: ["情绪抑郁", "忧虑多思", "烦闷不乐", "睡眠较差"],
    diet: "宜吃黄花菜、玫瑰花、陈皮、佛手、橙子等疏肝理气食物。",
    avoid: "忌食收敛酸涩之物，如乌梅、杨桃等。多户外活动。",
    color: "#5A8FAF",
  },
  {
    id: "tebing",
    name: "特禀质",
    desc: "先天失常，以生理缺陷、过敏反应等为主要特征。",
    traits: ["过敏体质", "先天缺陷", "适应力差", "因人而异"],
    diet: "饮食需因人制宜，避开已知过敏原，多吃健脾补肺食物。",
    avoid: "忌海鲜、芒果等易过敏食物，避免接触已知过敏原。",
    color: "#9B8BB4",
  },
];

// 测试题（简化版，每种体质2题，共18题）
const QUESTIONS = [
  // 气虚质
  { q: "你经常感到疲劳乏力吗？", type: "qixu", score: { yes: 2, no: 0 } },
  { q: "你说话声音低弱，不愿多言吗？", type: "qixu", score: { yes: 2, no: 0 } },
  // 阳虚质
  { q: "你经常手脚冰凉，畏寒怕冷吗？", type: "yangxu", score: { yes: 2, no: 0 } },
  { q: "你更喜欢喝热饮而不是冷饮吗？", type: "yangxu", score: { yes: 1, no: 0 } },
  // 阴虚质
  { q: "你经常口干咽燥，喜欢喝冷开水吗？", type: "yinxu", score: { yes: 2, no: 0 } },
  { q: "你容易失眠，睡眠较浅吗？", type: "yinxu", score: { yes: 1, no: 0 } },
  // 痰湿质
  { q: "你体型偏胖，腹部肥软吗？", type: "tanshi", score: { yes: 2, no: 0 } },
  { q: "你面部或头部容易出油吗？", type: "tanshi", score: { yes: 1, no: 0 } },
  // 湿热质
  { q: "你容易长痘痘或痤疮吗？", type: "shire", score: { yes: 2, no: 0 } },
  { q: "你经常感到口苦或有异味吗？", type: "shire", score: { yes: 1, no: 0 } },
  // 血瘀质
  { q: "你容易出现瘀斑或青紫吗？", type: "xueyu", score: { yes: 2, no: 0 } },
  { q: "你的肤色较晦暗，容易长斑吗？", type: "xueyu", score: { yes: 1, no: 0 } },
  // 气郁质
  { q: "你经常感到忧虑、闷闷不乐吗？", type: "qiyu", score: { yes: 2, no: 0 } },
  { q: "你容易失眠或睡眠质量差吗？", type: "qiyu", score: { yes: 1, no: 0 } },
  // 特禀质
  { q: "你对某些食物或环境容易过敏吗？", type: "tebing", score: { yes: 2, no: 0 } },
  { q: "你有哮喘、鼻炎等过敏性疾病史吗？", type: "tebing", score: { yes: 2, no: 0 } },
  // 平和质（反向计分）
  { q: "你精力充沛，面色红润，睡眠质量好吗？", type: "pinghe", score: { yes: 1, no: 0 } },
  { q: "你很少生病，适应能力很强吗？", type: "pinghe", score: { yes: 1, no: 0 } },
];

export default function ConstitutionPage() {
  const [step, setStep] = useState<"intro" | "test" | "result">("intro");
  const [currentQ, setCurrentQ] = useState(0);
  const [scores, setScores] = useState<Record<string, number>>({});
  const [result, setResult] = useState<typeof CONSTITUTIONS[0] | null>(null);

  const handleAnswer = (answer: "yes" | "no") => {
    const q = QUESTIONS[currentQ];
    const point = q.score[answer];
    const newScores = { ...scores, [q.type]: (scores[q.type] || 0) + point };
    setScores(newScores);

    if (currentQ < QUESTIONS.length - 1) {
      setCurrentQ(currentQ + 1);
    } else {
      // 计算最终结果
      const maxType = Object.entries(newScores).sort((a, b) => b[1] - a[1])[0];
      const found = CONSTITUTIONS.find((c) => c.id === maxType[0]) || CONSTITUTIONS[0];
      setResult(found);
      setStep("result");
    }
  };

  const progress = ((currentQ + 1) / QUESTIONS.length) * 100;

  // ========== 介绍页 ==========
  if (step === "intro") {
    return (
      <div className="mx-auto max-w-3xl px-4 py-12">
        <div className="text-center mb-10">
          <div className="hero-icon mx-auto mb-4" style={{ width: 72, height: 72 }}>
            <span className="text-4xl">🔍</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-display green-text mb-4">九种体质测评</h1>
          <p className="text-sm leading-relaxed" style={{ color: "rgba(232,228,218,0.6)" }}>
            依据《黄帝内经》体质分类理论，通过科学的问卷评估，
            <br />帮你辨明自身体质类型，获取专属养生方案。
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-4 mb-10">
          {CONSTITUTIONS.slice(0, 6).map((c) => (
            <div key={c.id} className="card-base text-center p-4">
              <p className="text-lg font-display" style={{ color: c.color }}>{c.name}</p>
              <p className="text-xs mt-1" style={{ color: "rgba(232,228,218,0.4)" }}>
                {c.traits.slice(0, 2).join(" · ")}
              </p>
            </div>
          ))}
        </div>

        <div className="card-glass p-6 text-center">
          <div className="grid md:grid-cols-3 gap-4 text-sm mb-6" style={{ color: "rgba(232,228,218,0.6)" }}>
            <div>
              <p className="text-2xl mb-1" style={{ color: "var(--color-swen-green)" }}>18</p>
              <p>道测试题</p>
            </div>
            <div>
              <p className="text-2xl mb-1" style={{ color: "var(--color-swen-green)" }}>3</p>
              <p>分钟完成</p>
            </div>
            <div>
              <p className="text-2xl mb-1" style={{ color: "var(--color-swen-green)" }}>0</p>
              <p>免费使用</p>
            </div>
          </div>
          <button onClick={() => { setStep("test"); setCurrentQ(0); setScores({}); }}
            className="btn-primary px-10 py-3 text-base">
            开始测评 →
          </button>
          <p className="text-xs mt-3" style={{ color: "rgba(232,228,218,0.3)" }}>
            测评结果仅供参考，不构成医疗诊断
          </p>
        </div>
      </div>
    );
  }

  // ========== 测试页 ==========
  if (step === "test") {
    const q = QUESTIONS[currentQ];
    return (
      <div className="mx-auto max-w-2xl px-4 py-8">
        {/* 进度条 */}
        <div className="mb-8">
          <div className="flex justify-between text-xs mb-2" style={{ color: "rgba(232,228,218,0.4)" }}>
            <span>第 {currentQ + 1} / {QUESTIONS.length} 题</span>
            <span>{Math.round(progress)}%</span>
          </div>
          <div className="h-1.5 rounded-full" style={{ background: "rgba(93,138,102,0.15)" }}>
            <div className="h-full rounded-full transition-all duration-500"
              style={{ width: `${progress}%`, background: "linear-gradient(90deg, #5D8A66, #8FBC9A)" }} />
          </div>
        </div>

        {/* 题目卡片 */}
        <div className="card-featured p-8 text-center">
          <p className="text-xl md:text-2xl font-medium leading-relaxed mb-8"
            style={{ color: "var(--color-swen-text)" }}>
            {q.q}
          </p>
          <div className="flex flex-col gap-4 sm:flex-row justify-center">
            <button onClick={() => handleAnswer("yes")}
              className="btn-primary flex-1 max-w-48 mx-auto py-4 text-base">
              ✓ 是的，符合
            </button>
            <button onClick={() => handleAnswer("no")}
              className="btn-outline flex-1 max-w-48 mx-auto py-4 text-base">
              ✗ 不是，不符合
            </button>
          </div>
        </div>

        {/* 提示 */}
        <p className="text-center text-xs mt-6" style={{ color: "rgba(232,228,218,0.3)" }}>
          请根据你近三个月到半年的真实感受作答
        </p>
      </div>
    );
  }

  // ========== 结果页 ==========
  if (step === "result" && result) {
    const score = scores[result.id] || 0;
    const maxPossible = QUESTIONS.filter((q) => q.type === result.id)
      .reduce((sum, q) => sum + q.score.yes, 0);
    const confidence = Math.min(100, Math.round((score / maxPossible) * 100));

    return (
      <div className="mx-auto max-w-3xl px-4 py-8">
        {/* 结果头 */}
        <div className="text-center mb-8">
          <p className="text-xs uppercase tracking-widest mb-3" style={{ color: "rgba(93,138,102,0.6)" }}>
            你的体质类型
          </p>
          <h1 className="text-4xl md:text-5xl font-display mb-3"
            style={{ color: result.color, textShadow: `0 0 30px ${result.color}44` }}>
            {result.name}
          </h1>
          <p className="text-sm" style={{ color: "rgba(93,138,102,0.6)" }}>
            匹配度约 {confidence}%
          </p>
        </div>

        {/* 体质描述 */}
        <div className="card-featured p-6 mb-5" style={{ borderColor: `${result.color}44` }}>
          <h2 className="text-lg font-display mb-3" style={{ color: result.color }}>体质特征</h2>
          <p className="text-sm leading-relaxed mb-4" style={{ color: "rgba(232,228,218,0.7)" }}>
            {result.desc}
          </p>
          <div className="flex flex-wrap gap-2">
            {result.traits.map((t) => (
              <span key={t} className="badge-green text-xs">{t}</span>
            ))}
          </div>
        </div>

        {/* 养生方案 */}
        <div className="grid md:grid-cols-2 gap-5 mb-5">
          <div className="card-base p-5">
            <h3 className="font-display mb-3" style={{ color: "var(--color-swen-green-light)" }}>
              🍃 宜食推荐
            </h3>
            <p className="text-sm leading-relaxed" style={{ color: "rgba(232,228,218,0.6)" }}>
              {result.diet}
            </p>
          </div>
          <div className="card-base p-5">
            <h3 className="font-display mb-3" style={{ color: "var(--color-swen-amber)" }}>
              ⚠️ 养生禁忌
            </h3>
            <p className="text-sm leading-relaxed" style={{ color: "rgba(232,228,218,0.6)" }}>
              {result.avoid}
            </p>
          </div>
        </div>

        {/* 雷达图示意 */}
        <div className="card-glass p-6 mb-5">
          <h3 className="font-display mb-4 text-center" style={{ color: "var(--color-swen-green-light)" }}>
            体质分布参考
          </h3>
          <div className="flex justify-center">
            <div className="relative w-56 h-56">
              {[0.3, 0.55, 0.8].map((r) => (
                <div key={r} className="absolute rounded-full border"
                  style={{
                    width: `${r * 224}px`, height: `${r * 224}px`,
                    borderColor: "rgba(93,138,102,0.12)",
                    left: `${(1 - r) * 112}px`, top: `${(1 - r) * 112}px`,
                  }} />
              ))}
              <svg className="absolute inset-0 w-full h-full" viewBox="0 0 224 224">
                {/* 9个方向的轴线 */}
                {CONSTITUTIONS.map((c, i) => {
                  const angle = (i * 40 - 90) * (Math.PI / 180);
                  const x2 = 112 + 100 * Math.cos(angle);
                  const y2 = 112 + 100 * Math.sin(angle);
                  return (
                    <line key={c.id} x1="112" y1="112" x2={x2} y2={y2}
                      stroke="rgba(93,138,102,0.15)" strokeWidth="1" />
                  );
                })}
                {/* 当前体质的分数 */}
                {CONSTITUTIONS.map((c, i) => {
                  const angle = (i * 40 - 90) * (Math.PI / 180);
                  const s = scores[c.id] || 0;
                  const maxS = QUESTIONS.filter(q => q.type === c.id)
                    .reduce((sum, q) => sum + q.score.yes, 0);
                  const r = maxS > 0 ? (s / maxS) * 100 : 0;
                  const x = 112 + r * Math.cos(angle);
                  const y = 112 + r * Math.sin(angle);
                  return (
                    <circle key={c.id} cx={x} cy={y} r="3"
                      fill={c.id === result.id ? result.color : "rgba(93,138,102,0.4)"}
                      opacity={c.id === result.id ? 1 : 0.5}
                    />
                  );
                })}
                {/* 连接线 */}
                <polygon
                  points={CONSTITUTIONS.map((c, i) => {
                    const angle = (i * 40 - 90) * (Math.PI / 180);
                    const s = scores[c.id] || 0;
                    const maxS = QUESTIONS.filter(q => q.type === c.id)
                      .reduce((sum, q) => sum + q.score.yes, 0);
                    const r = maxS > 0 ? (s / maxS) * 100 : 0;
                    return `${112 + r * Math.cos(angle)},${112 + r * Math.sin(angle)}`;
                  }).join(" ")}
                  fill="rgba(93,138,102,0.2)"
                  stroke="rgba(93,138,102,0.6)"
                  strokeWidth="1.5"
                />
              </svg>
              {/* 中心文字 */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <p className="text-sm font-display" style={{ color: result.color }}>
                    {result.name}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-wrap justify-center gap-3 mt-4">
            {CONSTITUTIONS.map((c) => (
              <div key={c.id} className="flex items-center gap-1.5 text-xs"
                style={{ color: c.id === result.id ? c.color : "rgba(232,228,218,0.4)" }}>
                <div className="w-2 h-2 rounded-full" style={{ background: c.color }} />
                {c.name}
              </div>
            ))}
          </div>
        </div>

        {/* 操作 */}
        <div className="text-center">
          <a href="/ask" className="btn-primary mr-3 mb-3">🤖 咨询AI养生顾问</a>
          <a href="/" className="btn-gold mr-3 mb-3">🏠 返回首页</a>
          <button onClick={() => { setStep("intro"); setScores({}); setCurrentQ(0); }}
            className="btn-outline mb-3">
            🔄 重新测评
          </button>
        </div>

        <p className="text-center text-xs mt-4" style={{ color: "rgba(232,228,218,0.25)" }}>
          ⚠️ 结果仅供参考，不构成医疗诊断。如有身体不适请及时就医。
        </p>
      </div>
    );
  }

  return null;
}
