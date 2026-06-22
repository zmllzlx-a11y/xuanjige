// DeepSeek API 客户端（客户端直连，密钥存储在 .env.local）
const DEEPSEEK_KEY = process.env.DEEPSEEK_API_KEY || "";
const DEEPSEEK_URL = "https://api.deepseek.com/v1/chat/completions";

export async function askDeepSeek(
  messages: { role: string; text?: string; content?: string }[],
  apiKey?: string
): Promise<string> {
  const key = apiKey || DEEPSEEK_KEY;
  if (!key) {
    throw new Error("未配置 DeepSeek API Key");
  }

  const formatted = messages.map(m => ({
    role: m.role,
    content: m.text || m.content || "",
  }));

  const res = await fetch(DEEPSEEK_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${key}`,
    },
    body: JSON.stringify({
      model: "deepseek-chat",
      messages: formatted,
      temperature: 0.7,
      max_tokens: 1024,
    }),
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`DeepSeek API 错误: ${res.status} - ${err}`);
  }

  const data = await res.json();
  return data.choices?.[0]?.message?.content || "暂无回复";
}
