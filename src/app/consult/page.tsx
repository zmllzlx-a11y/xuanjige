"use client";

import { useState } from "react";

type Step = 1 | 2 | 3 | 4;

interface FormData {
  name: string;
  age: string;
  gender: string;
  chiefComplaint: string;
  duration: string;
  severity: string;
  symptoms: string[];
  lifestyle: {
    diet: string;
    sleep: string;
    exercise: string;
    emotions: string;
  };
  tongue: string;
  pulse: string;
}

const SYMPTOM_OPTIONS = [
  "失眠", "疲劳", "焦虑", "抑郁", "头痛", "头晕",
  "胃痛", "腹胀", "便秘", "腹泻", "食欲不振",
  "心慌", "气短", "胸闷", "腰痛", "关节痛",
  "手脚凉", "手脚热", "盗汗", "自汗", "口干",
  "口苦", "眼干", "耳鸣", "记忆力下降",
  "月经不调", "痛经", "更年期症状",
  "体重变化", "免疫力下降",
];

const DIET_OPTIONS = ["规律清淡", "偏油甘", "嗜辣", "嗜冷饮", "素食为主", "肉食为主", "不定时"];
const SLEEP_OPTIONS = ["23点前睡", "23-1点睡", "凌晨1点后睡", "失眠多梦", "早醒", "睡眠尚可"];
const EXERCISE_OPTIONS = ["每天运动", "偶尔运动", "久坐少动", "体力劳动"];
const EMOTION_OPTIONS = ["平和", "易焦虑", "易抑郁", "易怒", "压力大", "情绪起伏大"];

const SYSTEM_PROMPT = `你是一位资深中医师，擅长《黄帝内经》辨证论治。请根据用户提供的问诊信息，以繁体中文给出专业的养生分析。

分析要求包含四部分，严格按以下格式输出（每部分用 ===== 标题分隔）：

===== 体质推断 =====
根据症状推断最可能的体质类型（九种：平和质、气虚质、阳虚质、阴虚质、痰湿质、湿热质、血瘀质、气郁质、特禀质），给出置信度分析。

===== 饮食调理 =====
根据体质推荐应多吃的食物、少吃或不吃的食物、以及一道经典食疗方（名称+做法+功效）。

===== 经络穴位 =====
推荐3个调理穴位（名称+定位+按揉方法），附经脉归属。

===== 起居养生 =====
给出季节养生建议、情志调节方法、运动建议。

===== 特别提示 =====
注明本分析仅供养生参考，不构成医疗诊断。如症状严重请就医。

语气温和专业，像一位慈祥的老中医在细心叮嘱。`;

export default function ConsultPage() {
  const [step, setStep] = useState<Step>(1);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [form, setForm] = useState<FormData>({
    name: "", age: "", gender: "",
    chiefComplaint: "", duration: "", severity: "轻",
    symptoms: [],
    lifestyle: { diet: "", sleep: "", exercise: "", emotions: "" },
    tongue: "", pulse: "",
  });

  const toggleSymptom = (s: string) =>
    setForm(f => ({
      ...f,
      symptoms: f.symptoms.includes(s)
        ? f.symptoms.filter(x => x !== s)
        : [...f.symptoms, s],
    }));

  const buildPrompt = () => `
【素问居AI问诊单】

一、基本信息
姓名：${form.name || "未提供"}
年龄：${form.age || "未提供"}岁
性别：${form.gender || "未提供"}

二、主要症状
${form.chiefComplaint || "未填写"}

三、病程与严重程度
持续时间：${form.duration || "未填写"}
严重程度：${form.severity}

四、伴随症状（多选）
${form.symptoms.join("、") || "未选择"}

五、生活习惯
饮食习惯：${form.lifestyle.diet || "未填写"}
睡眠情况：${form.lifestyle.sleep || "未填写"}
运动情况：${form.lifestyle.exercise || "未填写"}
情志状态：${form.lifestyle.emotions || "未填写"}

六、舌象（可选）
${form.tongue || "未填写"}

七、脉象（可选）
${form.pulse || "未填写"}
`;

  const submit = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/consult", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: buildPrompt() }),
      });
      if (!res.ok) throw new Error(`服务器错误 (${res.status})`);
      const data = await res.json();
      setResult(data.reply || "抱歉，暂时无法分析，请稍后再试。");
      setStep(4);
    } catch (e: any) {
      setError(e.message || "网络错误，请检查网络连接后重试。");
    } finally {
      setLoading(false);
    }
  };

  const ProgressBar = () => (
    <div className="flex items-center gap-1 mb-8">
      {[1, 2, 3].map(s => (
        <div key={s} className="flex-1 flex items-center gap-1">
          <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 transition-all ${
            step >= s ? "bg-green-700 text-white" : "bg-[rgba(93,138,102,0.1)] text-[rgba(232,228,218,0.2)]"
          }`}>
            {step > s ? "✓" : s}
          </div>
          {s < 3 && <div className={`flex-1 h-0.5 ${step > s ? "bg-green-700" : "bg-[rgba(93,138,102,0.08)]"}`} />}
        </div>
      ))}
    </div>
  );

  return (
    <div className="mx-auto max-w-2xl px-4 py-8">
      <div className="text-center mb-6">
        <span className="text-4xl mb-3 block">🩺</span>
        <h1 className="text-3xl font-display green-text mb-1">AI智能问诊</h1>
        <p className="text-sm" style={{ color: "rgba(232,228,218,0.35)" }}>
          辨证论治 · 《黄帝内经》体系 · DeepSeek驱动
        </p>
      </div>

      <ProgressBar />

      {/* ====== STEP 1: 基本信息 ====== */}
      {step === 1 && (
        <div className="space-y-5">
          <div className="card-glass p-5 space-y-4">
            <h2 className="text-lg font-display green-text flex items-center gap-2">
              <span>📋</span> 基本信息
            </h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="label">姓名（可选）</label>
                <input className="input-base" value={form.name}
                  onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                  placeholder="不填也可" />
              </div>
              <div>
                <label className="label required">年龄</label>
                <input className="input-base" type="number" min="1" max="120"
                  value={form.age} onChange={e => setForm(f => ({ ...f, age: e.target.value }))}
                  placeholder="请输入年龄" />
              </div>
            </div>
            <div>
              <label className="label required">性别</label>
              <div className="flex gap-3">
                {["男", "女", "其他"].map(g => (
                  <button key={g} onClick={() => setForm(f => ({ ...f, gender: g }))}
                    className={`flex-1 py-2.5 rounded-xl text-sm font-medium transition-all border ${
                      form.gender === g
                        ? "border-green-600 text-white"
                        : "border-[rgba(93,138,102,0.1)] text-[rgba(232,228,218,0.4)]"
                    }`}
                    style={form.gender === g
                      ? { background: "rgba(93,138,102,0.15)" }
                      : {}}>
                    {g}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="card-glass p-5 space-y-4">
            <h2 className="text-lg font-display green-text flex items-center gap-2">
              <span>🩹</span> 主要症状
            </h2>
            <div>
              <label className="label required">您现在最想解决的问题是什么？</label>
              <textarea className="input-base resize-none" rows={3}
                value={form.chiefComplaint}
                onChange={e => setForm(f => ({ ...f, chiefComplaint: e.target.value }))}
                placeholder="如：最近总是失眠，凌晨1-3点才能入睡，白天很疲惫..." />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="label">持续多长时间？</label>
                <select className="input-base"
                  value={form.duration}
                  onChange={e => setForm(f => ({ ...f, duration: e.target.value }))}>
                  <option value="">请选择</option>
                  <option value="几天">几天</option>
                  <option value="1-2周">1-2周</option>
                  <option value="1个月">1个月</option>
                  <option value="3个月内">3个月内</option>
                  <option value="半年内">半年内</option>
                  <option value="一年以上">一年以上</option>
                </select>
              </div>
              <div>
                <label className="label">严重程度</label>
                <select className="input-base"
                  value={form.severity}
                  onChange={e => setForm(f => ({ ...f, severity: e.target.value }))}>
                  <option value="轻">轻 — 偶尔发生，不影响生活</option>
                  <option value="中">中 — 经常发生，有些影响</option>
                  <option value="重">重 — 严重影响日常生活</option>
                </select>
              </div>
            </div>
          </div>

          <button className="btn-primary w-full py-3.5 text-base disabled:opacity-40"
            disabled={!form.age || !form.gender || !form.chiefComplaint.trim()}
            onClick={() => setStep(2)}>
            下一步 →
          </button>
        </div>
      )}

      {/* ====== STEP 2: 伴随症状 ====== */}
      {step === 2 && (
        <div className="space-y-5">
          <div className="card-glass p-5 space-y-4">
            <h2 className="text-lg font-display green-text flex items-center gap-2">
              <span>🔍</span> 伴随症状（可多选）
            </h2>
            <p className="text-xs" style={{ color: "rgba(232,228,218,0.3)" }}>
              选择所有符合您目前情况的症状，帮助AI更准确辨证
            </p>
            <div className="flex flex-wrap gap-2">
              {SYMPTOM_OPTIONS.map(s => (
                <button key={s} onClick={() => toggleSymptom(s)}
                  className={`px-3 py-1.5 rounded-full text-xs transition-all border ${
                    form.symptoms.includes(s)
                      ? "border-green-500 text-white"
                      : "border-[rgba(93,138,102,0.1)] text-[rgba(232,228,218,0.4)]"
                  }`}
                  style={form.symptoms.includes(s)
                    ? { background: "rgba(93,138,102,0.2)" }
                    : {}}>
                  {s}
                </button>
              ))}
            </div>
          </div>

          <div className="card-glass p-5 space-y-4">
            <h2 className="text-lg font-display green-text flex items-center gap-2">
              <span>👅</span> 舌象 & 脉象（可选）
            </h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="label">您的舌苔有什么特点？</label>
                <select className="input-base"
                  value={form.tongue}
                  onChange={e => setForm(f => ({ ...f, tongue: e.target.value }))}>
                  <option value="">不确定/不记得</option>
                  <option value="舌淡">舌淡（颜色偏淡）</option>
                  <option value="舌红">舌红（颜色偏红）</option>
                  <option value="苔白">苔白</option>
                  <option value="苔黄">苔黄</option>
                  <option value="苔厚">苔厚</option>
                  <option value="苔薄">苔薄</option>
                  <option value="有齿痕">有齿痕</option>
                  <option value="有裂纹">有裂纹</option>
                </select>
              </div>
              <div>
                <label className="label">您感觉自己的脉象？</label>
                <select className="input-base"
                  value={form.pulse}
                  onChange={e => setForm(f => ({ ...f, pulse: e.target.value }))}>
                  <option value="">不确定/不记得</option>
                  <option value="脉细">脉细（较微弱）</option>
                  <option value="脉数">脉数（较快）</option>
                  <option value="脉弦">脉弦（紧绷如弦）</option>
                  <option value="脉滑">脉滑（流畅）</option>
                  <option value="脉沉">脉沉（不易按到）</option>
                  <option value="脉浮">脉浮（轻按即得）</option>
                </select>
              </div>
            </div>
          </div>

          <div className="flex gap-3">
            <button className="btn-ghost flex-1 py-3.5" onClick={() => setStep(1)}>← 上一步</button>
            <button className="btn-primary flex-1 py-3.5" onClick={() => setStep(3)}>下一步 →</button>
          </div>
        </div>
      )}

      {/* ====== STEP 3: 生活习惯 ====== */}
      {step === 3 && (
        <div className="space-y-5">
          <div className="card-glass p-5 space-y-5">
            <h2 className="text-lg font-display green-text flex items-center gap-2">
              <span>🍽️</span> 生活习惯
            </h2>
            <p className="text-xs" style={{ color: "rgba(232,228,218,0.3)" }}>
              中医讲"三因制宜"，生活习惯是辨证的重要参考
            </p>

            <div>
              <label className="label">饮食习惯</label>
              <div className="flex flex-wrap gap-2">
                {DIET_OPTIONS.map(o => (
                  <button key={o} onClick={() => setForm(f => ({ ...f, lifestyle: { ...f.lifestyle, diet: o } }))}
                    className={`px-3 py-1.5 rounded-full text-xs transition-all border ${
                      form.lifestyle.diet === o
                        ? "border-green-500 text-white"
                        : "border-[rgba(93,138,102,0.1)] text-[rgba(232,228,218,0.4)]"
                    }`}
                    style={form.lifestyle.diet === o ? { background: "rgba(93,138,102,0.2)" } : {}}>
                    {o}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="label">睡眠情况</label>
              <div className="flex flex-wrap gap-2">
                {SLEEP_OPTIONS.map(o => (
                  <button key={o} onClick={() => setForm(f => ({ ...f, lifestyle: { ...f.lifestyle, sleep: o } }))}
                    className={`px-3 py-1.5 rounded-full text-xs transition-all border ${
                      form.lifestyle.sleep === o
                        ? "border-green-500 text-white"
                        : "border-[rgba(93,138,102,0.1)] text-[rgba(232,228,218,0.4)]"
                    }`}
                    style={form.lifestyle.sleep === o ? { background: "rgba(93,138,102,0.2)" } : {}}>
                    {o}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="label">运动习惯</label>
              <div className="flex flex-wrap gap-2">
                {EXERCISE_OPTIONS.map(o => (
                  <button key={o} onClick={() => setForm(f => ({ ...f, lifestyle: { ...f.lifestyle, exercise: o } }))}
                    className={`px-3 py-1.5 rounded-full text-xs transition-all border ${
                      form.lifestyle.exercise === o
                        ? "border-green-500 text-white"
                        : "border-[rgba(93,138,102,0.1)] text-[rgba(232,228,218,0.4)]"
                    }`}
                    style={form.lifestyle.exercise === o ? { background: "rgba(93,138,102,0.2)" } : {}}>
                    {o}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="label">情志状态</label>
              <div className="flex flex-wrap gap-2">
                {EMOTION_OPTIONS.map(o => (
                  <button key={o} onClick={() => setForm(f => ({ ...f, lifestyle: { ...f.lifestyle, emotions: o } }))}
                    className={`px-3 py-1.5 rounded-full text-xs transition-all border ${
                      form.lifestyle.emotions === o
                        ? "border-green-500 text-white"
                        : "border-[rgba(93,138,102,0.1)] text-[rgba(232,228,218,0.4)]"
                    }`}
                    style={form.lifestyle.emotions === o ? { background: "rgba(93,138,102,0.2)" } : {}}>
                    {o}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* 摘要预览 */}
          <div className="card-base p-4 text-xs space-y-1.5" style={{ borderColor: "rgba(93,138,102,0.1)" }}>
            <p className="text-green-500 font-display mb-2">📋 问诊信息预览</p>
            <p>年龄：{form.age || "—"}岁　性别：{form.gender || "—"}</p>
            <p>主诉：{form.chiefComplaint}</p>
            <p>伴随：{form.symptoms.length > 0 ? form.symptoms.join("、") : "无"}</p>
            <p>舌象：{form.tongue || "—"}　脉象：{form.pulse || "—"}</p>
          </div>

          {error && (
            <div className="card-base p-3 text-center text-xs" style={{ borderColor: "rgba(200,80,80,0.3)" }}>
              <span style={{ color: "rgba(200,100,80,0.8)" }}>❌ {error}</span>
            </div>
          )}

          <div className="flex gap-3">
            <button className="btn-ghost flex-1 py-3.5" onClick={() => setStep(2)}>← 上一步</button>
            <button className="btn-primary flex-1 py-3.5 disabled:opacity-50" disabled={loading}
              onClick={submit}>
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="animate-spin">⚙️</span> AI分析中...
                </span>
              ) : "🩺 开始AI辨证分析"}
            </button>
          </div>

          <p className="text-xs text-center" style={{ color: "rgba(232,228,218,0.2)" }}>
            分析由DeepSeek大模型提供，基于《黄帝内经》辨证论治体系
          </p>
        </div>
      )}

      {/* ====== STEP 4: 结果 ====== */}
      {step === 4 && (
        <div className="space-y-5">
          <div className="text-center mb-4">
            <span className="text-4xl block mb-2">🍃</span>
            <h2 className="text-xl font-display green-text">辨证分析已完成</h2>
            <p className="text-xs" style={{ color: "rgba(232,228,218,0.3)" }}>
              以下内容由AI生成，仅供养生参考
            </p>
          </div>

          {loading ? (
            <div className="card-glass p-8 text-center space-y-4">
              <div className="text-3xl animate-bounce">🌀</div>
              <p className="text-sm" style={{ color: "rgba(232,228,218,0.5)" }}>
                AI正在仔细分析您的情况...
              </p>
            </div>
          ) : (
            <>
              <div className="card-glass p-5" style={{ borderColor: "rgba(93,138,102,0.15)" }}>
                <div className="space-y-1 text-sm leading-relaxed" style={{ color: "rgba(232,228,218,0.8)", whiteSpace: "pre-wrap" }}>
                  {result}
                </div>
              </div>

              <div className="card-base p-4 text-xs text-center space-y-2"
                style={{ borderColor: "rgba(201,163,90,0.15)" }}>
                <p style={{ color: "rgba(201,163,90,0.5)" }}>
                  ⚠️ 本分析仅供养生参考，不构成医疗诊断
                </p>
                <p style={{ color: "rgba(232,228,218,0.2)" }}>
                  如有疾病症状，请及时就医。心理健康紧急情况：400-161-9995
                </p>
              </div>

              <div className="space-y-3">
                <a href="/pay" className="btn-primary w-full py-3.5 text-center block">
                  💰 查看定制调理方案
                </a>
                <button className="btn-ghost w-full py-3" onClick={() => { setStep(1); setForm(f => ({ ...f, name: "", age: "", gender: "", chiefComplaint: "", duration: "", severity: "轻", symptoms: [], tongue: "", pulse: "", lifestyle: { diet: "", sleep: "", exercise: "", emotions: "" } })); setResult(""); }}>
                  🔄 重新问诊
                </button>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}
