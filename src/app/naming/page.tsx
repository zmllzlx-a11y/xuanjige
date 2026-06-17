"use client";

import { useState } from "react";

const surnames = [
  "李", "王", "张", "刘", "陈", "杨", "赵", "黄", "周", "吴",
  "徐", "孙", "马", "朱", "胡", "郭", "何", "高", "林", "罗",
  "郑", "梁", "谢", "宋", "唐", "韩", "曹", "许", "邓", "冯",
  "萧", "程", "蔡", "彭", "潘", "袁", "于", "董", "余", "苏",
  "叶", "吕", "魏", "蒋", "田", "杜", "丁", "沈", "任", "姚",
];

const namePool = {
  boy: [
    { name: "子轩", meaning: "气宇轩昂，器宇不凡" },
    { name: "宇轩", meaning: "气宇轩昂，志向高远" },
    { name: "浩宇", meaning: "浩然正气，气冲云霄" },
    { name: "奕辰", meaning: "光明璀璨，日月星辰" },
    { name: "铭泽", meaning: "铭记恩泽，德润四方" },
    { name: "俊哲", meaning: "才智卓越，明理通达" },
    { name: "昊天", meaning: "广阔无边，志向远大" },
    { name: "思远", meaning: "深思远虑，格局宏大" },
    { name: "景行", meaning: "高山景行，品德高尚" },
    { name: "承志", meaning: "继承志向，光宗耀祖" },
    { name: "明远", meaning: "明察秋毫，远见卓识" },
    { name: "睿渊", meaning: "睿智深沉，学识渊博" },
    { name: "翰林", meaning: "文采斐然，翰林学士" },
    { name: "天佑", meaning: "上天庇佑，福泽绵长" },
    { name: "文轩", meaning: "文采斐然，气宇不凡" },
    { name: "云帆", meaning: "长风破浪，直挂云帆" },
    { name: "泽宇", meaning: "恩泽广布，气宇轩昂" },
    { name: "嘉懿", meaning: "嘉言懿行，品德高尚" },
    { name: "修远", meaning: "路漫漫其修远兮，求索不止" },
    { name: "君昊", meaning: "君子之风，昊天广阔" },
  ],
  girl: [
    { name: "语涵", meaning: "言语温婉，内涵丰富" },
    { name: "诗琪", meaning: "如诗如画，琪玉般美好" },
    { name: "婉晴", meaning: "温婉贤淑，晴空万里" },
    { name: "梦瑶", meaning: "如梦如幻，瑶池仙子" },
    { name: "思琪", meaning: "才思敏捷，琪玉温润" },
    { name: "雪婷", meaning: "冰雪聪明，婷婷玉立" },
    { name: "紫萱", meaning: "紫气东来，萱草忘忧" },
    { name: "沐妍", meaning: "如沐春风，笑靥如花" },
    { name: "芷若", meaning: "芬芳高雅，若水柔情" },
    { name: "清荷", meaning: "清雅如荷，出淤泥不染" },
    { name: "灵犀", meaning: "心有灵犀，聪慧过人" },
    { name: "嫣然", meaning: "嫣然一笑，倾国倾城" },
    { name: "若曦", meaning: "若水柔情，晨曦初露" },
    { name: "知画", meaning: "知书达理，画中仙姿" },
    { name: "芷兰", meaning: "芝兰玉树，芬芳四溢" },
    { name: "雨桐", meaning: "雨润梧桐，凤凰栖止" },
    { name: "瑾瑜", meaning: "怀瑾握瑜，品德如玉" },
    { name: "雅琪", meaning: "雅致大方，琪玉生辉" },
    { name: "书瑶", meaning: "书卷多情，瑶华璀璨" },
    { name: "芸熙", meaning: "芸香浓郁，熙光普照" },
  ],
};

export default function NamingPage() {
  const [surname, setSurname] = useState("");
  const [gender, setGender] = useState<"boy" | "girl">("boy");
  const [results, setResults] = useState<typeof namePool.boy>([]);
  const [generated, setGenerated] = useState(false);

  const generate = () => {
    if (!surname.trim()) return;
    const pool = namePool[gender];
    // 随机选5个
    const shuffled = [...pool].sort(() => Math.random() - 0.5).slice(0, 5);
    setResults(shuffled.map((n) => ({ ...n, name: n.name })));
    setGenerated(true);
  };

  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <div className="text-center mb-10 animate-float-up">
        <div className="hero-icon mx-auto mb-4" style={{ width: 64, height: 64 }}>
          <span className="text-4xl">📖</span>
        </div>
        <h1 className="text-4xl font-display gold-text tracking-widest mb-2" style={{ textShadow: "0 0 30px rgba(201,160,94,0.3)" }}>
          宝宝起名
        </h1>
        <p style={{ color: "rgba(212, 196, 160, 0.5)" }}>好名伴一生，音形义俱佳</p>
        <div className="divider-gold mx-auto mt-6 w-32" />
      </div>

      {/* 输入区 */}
      <div className="card-featured p-6 animate-float-up" style={{ animationDelay: "0.1s" }}>
        <div className="space-y-5">
          {/* 姓氏 */}
          <div>
            <label className="block text-sm text-gold font-display mb-2">姓氏</label>
            <div className="flex gap-2 flex-wrap">
              {surnames.map((s) => (
                <button
                  key={s}
                  onClick={() => setSurname(s)}
                  className={`px-3 py-1.5 rounded-lg text-sm transition-all ${
                    surname === s ? "ring-2 ring-gold/40" : "opacity-50 hover:opacity-80"
                  }`}
                  style={{
                    border: `1px solid ${surname === s ? "rgba(201,160,94,0.4)" : "rgba(201,160,94,0.1)"}`,
                    background: surname === s ? "rgba(201,160,94,0.12)" : "transparent",
                    color: surname === s ? "#c9a05e" : "rgba(212,196,160,0.5)",
                  }}
                >
                  {s}
                </button>
              ))}
            </div>
            <input
              type="text"
              value={surname}
              onChange={(e) => setSurname(e.target.value)}
              placeholder="或手动输入姓氏"
              className="mt-2 w-full rounded-xl px-4 py-2 text-sm"
              style={{
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(201,160,94,0.1)",
                color: "#d4c4a0",
              }}
            />
          </div>

          {/* 性别 */}
          <div>
            <label className="block text-sm text-gold font-display mb-2">性别</label>
            <div className="flex gap-3">
              {[
                { value: "boy" as const, label: "👦 男宝宝", icon: "☯️" },
                { value: "girl" as const, label: "👧 女宝宝", icon: "🌸" },
              ].map((g) => (
                <button
                  key={g.value}
                  onClick={() => setGender(g.value)}
                  className="flex-1 py-3 rounded-xl text-sm transition-all"
                  style={{
                    border: `1px solid ${gender === g.value ? "rgba(201,160,94,0.4)" : "rgba(201,160,94,0.1)"}`,
                    background: gender === g.value ? "rgba(201,160,94,0.1)" : "transparent",
                    color: gender === g.value ? "#c9a05e" : "rgba(212,196,160,0.5)",
                  }}
                >
                  {g.label}
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={generate}
            disabled={!surname.trim()}
            className="w-full py-3 rounded-xl text-sm transition-all"
            style={{
              background: surname.trim() ? "rgba(201,160,94,0.12)" : "rgba(255,255,255,0.02)",
              border: `1px solid ${surname.trim() ? "rgba(201,160,94,0.3)" : "rgba(201,160,94,0.05)"}`,
              color: surname.trim() ? "#c9a05e" : "rgba(212,196,160,0.2)",
            }}
          >
            📜 生成名字
          </button>
        </div>
      </div>

      {/* 结果展示 */}
      {generated && (
        <div className="mt-6 space-y-4 animate-float-up" style={{ animationDelay: "0.2s" }}>
          <div className="card-glass p-5">
            <p className="text-xs text-gold font-display mb-4">🎯 推荐名字（{surname}姓 · {gender === "boy" ? "男" : "女"}宝宝）</p>
            <div className="space-y-3">
              {results.map((r, i) => (
                <div
                  key={r.name}
                  className="flex items-center justify-between p-4 rounded-xl"
                  style={{
                    border: "1px solid rgba(201,160,94,0.08)",
                    background: "rgba(201,160,94,0.03)",
                    animationDelay: `${0.3 + i * 0.1}s`,
                  }}
                >
                  <div>
                    <p className="text-lg font-display gold-text">{surname}{r.name}</p>
                    <p className="text-xs mt-1" style={{ color: "rgba(212,196,160,0.4)" }}>{r.meaning}</p>
                  </div>
                  <span className="text-xl" style={{ opacity: 0.3 }}>✨</span>
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={generate}
            className="w-full py-3 rounded-xl text-sm transition-all"
            style={{
              border: "1px dashed rgba(201,160,94,0.2)",
              color: "rgba(212,196,160,0.4)",
            }}
          >
            🔄 换一批推荐
          </button>

          <div
            className="p-4 rounded-xl text-center"
            style={{ border: "1px dashed rgba(201,160,94,0.1)", background: "rgba(201,160,94,0.02)" }}
          >
            <p className="text-xs" style={{ color: "rgba(212,196,160,0.4)" }}>
              💡 AI 结合八字五行深度取名（即将上线 ¥19.9）
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
