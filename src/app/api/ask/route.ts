// AI 养生顾问 API（仅服务端运行）
export const runtime = "edge";

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    const apiKey = process.env.DEEPSEEK_API_KEY;
    if (!apiKey) {
      return Response.json(
        { reply: "⚠️ AI服务暂未配置（缺少 DEEPSEEK_API_KEY）。请联系站长配置 API Key 后再试。\n\n💡 如需快速体验，可联系素问居管理员获取内测资格。" },
        { status: 200 }
      );
    }

    const formatted = messages.map((m: { role: string; text?: string }) => ({
      role: m.role,
      content: m.text || "",
    }));

    const res = await fetch("https://api.deepseek.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "deepseek-chat",
        messages: formatted,
        temperature: 0.7,
        max_tokens: 1200,
      }),
    });

    if (!res.ok) {
      const err = await res.text();
      return Response.json({ reply: `AI服务暂时不可用 (${res.status})，请稍后再试。` }, { status: 200 });
    }

    const data = await res.json();
    const reply = data.choices?.[0]?.message?.content || "抱歉，暂时无法回答。";
    return Response.json({ reply });
  } catch (err: any) {
    return Response.json({ reply: `网络错误: ${err.message}` }, { status: 200 });
  }
}
