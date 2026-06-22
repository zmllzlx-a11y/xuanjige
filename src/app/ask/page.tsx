"use client";

import { useState } from "react";

const EXAMPLES = [
  { q: "我是气虚体质，秋冬季节应该如何养生？", tag: "体质养生" },
  { q: "经常失眠，中医有什么调理方法？", tag: "睡眠调理" },
  { q: "冬季进补吃什么最合适？", tag: "季节养生" },
  { q: "经常感到疲劳乏力，是什么原因？", tag: "健康咨询" },
  { q: "女性痛经，有什么食疗方法？", tag: "妇科调理" },
  { q: "脾胃虚弱，食欲不振怎么办？", tag: "脾胃调理" },
];

const SYSTEM_PROMPT = `你是一位资深的中医养生顾问，精通《黄帝内经》、《伤寒论》、《金匮要略》等中医经典。你为人温和、专业、耐心，始终以"上医治未病"的理念提供养生建议。

回复风格要求：
1. 结合中医理论（阴阳五行、脏腑经络）进行辨证分析
2. 给出具体可操作的养生方案（饮食、运动、起居、情志）
3. 推荐经典食疗方或中草药（需注明宜忌）
4. 强调因人制宜，根据体质差异调整方案
5. 重要提示：仅供参考，不构成医疗诊断，有病请及时就医

如果用户描述的症状较重或疑似疾病，务必提醒其就医，不代为诊断。`;

export default function AskPage() {
  const [question, setQuestion] = useState("");
  const [messages, setMessages] = useState<{ role: string; text: string }[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const askQuestion = async (q: string) => {
    if (!q.trim()) return;
    setLoading(true);
    setError(null);
    const userQ = q.trim();
    setMessages(prev => [...prev, { role: "user", text: userQ }]);
    setQuestion("");

    try {
      const res = await fetch("/api/ask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [
            { role: "system", text: SYSTEM_PROMPT },
            ...messages.map(m => ({ role: m.role, text: m.text })),
            { role: "user", text: userQ },
          ],
        }),
      });

      if (!res.ok) throw new Error(`请求失败 (${res.status})`);
      const data = await res.json();
      setMessages(prev => [...prev, { role: "ai", text: data.reply || "抱歉，暂时无法回答，请稍后再试。" }]);
    } catch (err: any) {
      setError(err.message || "网络错误，请检查连接后重试。");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <div className="text-center mb-8">
        <div className="hero-icon mx-auto mb-4" style={{ width: 72, height: 72 }}>
          <span className="text-4xl">🤖</span>
        </div>
        <h1 className="text-3xl md:text-4xl font-display green-text mb-2">AI养生顾问</h1>
        <p className="text-sm" style={{ color: "rgba(232,228,218,0.5)" }}>
          基于中医经典，辨证论治 · DeepSeek大模型驱动
        </p>
      </div>

      {/* 免责声明 */}
      <div className="card-glass p-4 mb-6 text-xs text-center"
        style={{ color: "rgba(201,163,90,0.6)", borderColor: "rgba(201,163,90,0.1)" }}>
        ⚠️ AI建议仅供参考，不构成医疗诊断。如有疾病症状，请及时就医。
      </div>

      {/* 示例问题 */}
      <div className="mb-6">
        <p className="text-xs mb-3 text-center" style={{ color: "rgba(232,228,218,0.3)" }}>
          👇 点击快速提问，或直接输入您的问题
        </p>
        <div className="flex flex-wrap gap-2 justify-center">
          {EXAMPLES.map(ex => (
            <button key={ex.q} onClick={() => askQuestion(ex.q)}
              className="px-3 py-2 rounded-xl text-xs transition-all text-left"
              style={{
                background: "rgba(93,138,102,0.05)",
                border: "1px solid rgba(93,138,102,0.12)",
                color: "rgba(232,228,218,0.55)",
              }}>
              {ex.q}
            </button>
          ))}
        </div>
      </div>

      {/* 对话历史 */}
      <div className="space-y-4 mb-6">
        {messages.map((m, i) => (
          <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
            <div className={`max-w-[80%] rounded-2xl p-4 text-sm leading-relaxed ${
              m.role === "user"
                ? "rounded-br-md"
                : "rounded-bl-md"
            }`}
              style={
                m.role === "user"
                  ? { background: "linear-gradient(135deg, rgba(93,138,102,0.2), rgba(93,138,102,0.1))", border: "1px solid rgba(93,138,102,0.2)", color: "var(--color-swen-text)" }
                  : { background: "rgba(17,24,17,0.8)", border: "1px solid rgba(93,138,102,0.08)", color: "rgba(232,228,218,0.75)" }
              }>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs">{m.role === "ai" ? "🍃 素问居" : "👤 您"}</span>
              </div>
              <div style={{ whiteSpace: "pre-wrap" }}>{m.text}</div>
            </div>
          </div>
        ))}

        {loading && (
          <div className="flex justify-start">
            <div className="card-base rounded-2xl rounded-bl-md p-4 max-w-[80%]"
              style={{ borderColor: "rgba(93,138,102,0.08)" }}>
              <div className="flex items-center gap-2">
                <span className="text-xs" style={{ color: "rgba(93,138,102,0.5)" }}>🍃 素问居</span>
                <span className="flex gap-1">
                  {[0, 1, 2].map(i => (
                    <span key={i} className="w-1.5 h-1.5 rounded-full animate-breathe"
                      style={{
                        background: "var(--color-swen-green)",
                        animationDelay: `${i * 0.3}s`,
                        opacity: 0.6,
                      }} />
                  ))}
                </span>
              </div>
            </div>
          </div>
        )}

        {error && (
          <div className="card-base p-4 text-center"
            style={{ borderColor: "rgba(200,100,80,0.3)" }}>
            <p className="text-xs" style={{ color: "rgba(200,100,80,0.7)" }}>❌ {error}</p>
          </div>
        )}
      </div>

      {/* 输入框 */}
      <div className="sticky bottom-20">
        <div className="card-glass p-4">
          <div className="flex gap-3">
            <textarea
              value={question}
              onChange={e => setQuestion(e.target.value)}
              onKeyDown={e => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  askQuestion(question);
                }
              }}
              placeholder="输入您的中医养生问题...（Enter发送，Shift+Enter换行）"
              rows={2}
              className="input-base resize-none flex-1"
              disabled={loading}
            />
            <button
              onClick={() => askQuestion(question)}
              disabled={loading || !question.trim()}
              className="btn-primary px-5 flex-shrink-0 self-end disabled:opacity-50"
            >
              {loading ? "..." : "发送"}
            </button>
          </div>
          <p className="text-xs mt-2" style={{ color: "rgba(232,228,218,0.2)" }}>
            💡 提问示例：气虚体质如何调理 / 冬季养生吃什么 / 失眠怎么调
          </p>
        </div>
      </div>
    </div>
  );
}
