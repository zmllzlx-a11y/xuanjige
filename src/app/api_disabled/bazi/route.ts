import { NextRequest, NextResponse } from "next/server";
import { buildBaziPrompt } from "@/lib/bazi";

export async function POST(req: NextRequest) {
  const { bazi, gender, question } = await req.json();

  // DeepSeek API 调用
  const apiKey = process.env.DEEPSEEK_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { content: "🔮 服务配置中，请稍后再试。" },
      { status: 200 }
    );
  }

  const prompt = buildBaziPrompt(bazi, gender, question);

  try {
    const res = await fetch("https://api.deepseek.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "deepseek-chat",
        messages: [
          { role: "system", content: "你是玄机阁的命理师父，精通八字命理，以古籍为据，语气温和如师。" },
          { role: "user", content: prompt },
        ],
        max_tokens: 2000,
        temperature: 0.8,
      }),
    });

    const data = await res.json();
    const content = data.choices?.[0]?.message?.content || "解读生成失败";

    return NextResponse.json({ content });
  } catch {
    return NextResponse.json(
      { content: "🔮 AI 服务暂时不可用，请稍后再试。" },
      { status: 200 }
    );
  }
}
