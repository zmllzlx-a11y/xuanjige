import { NextResponse } from "next/server";

export const runtime = "edge";

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

export async function POST(req: Request) {
  try {
    const { prompt } = await req.json();
    const apiKey = process.env.DEEPSEEK_API_KEY;

    if (!apiKey) {
      return NextResponse.json(
        { error: "未配置 DeepSeek API Key" },
        { status: 500 }
      );
    }

    const response = await fetch("https://api.deepseek.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "deepseek-chat",
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          { role: "user", content: prompt },
        ],
        temperature: 0.7,
        max_tokens: 1500,
      }),
    });

    if (!response.ok) {
      const err = await response.text();
      return NextResponse.json({ error: `API错误 ${response.status}` }, { status: 500 });
    }

    const data = await response.json();
    const reply = data.choices?.[0]?.message?.content || "分析失败，请稍后重试。";
    return NextResponse.json({ reply });
  } catch (e: any) {
    return NextResponse.json({ error: e.message || "服务器错误" }, { status: 500 });
  }
}
