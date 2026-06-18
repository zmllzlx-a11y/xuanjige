"use client";

import { useState, useEffect, useCallback, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";

const PRODUCTS: Record<string, { name: string; price: string }> = {
  "bazi-deep": { name: "八字精批（深度解读）", price: "9.9" },
  "lottery-deep": { name: "灵签深度解签", price: "5.9" },
  "dream-deep": { name: "周公解梦（深度）", price: "5.9" },
  "naming": { name: "宝宝起名", price: "19.9" },
};

const COUNTDOWN_SECONDS = 5 * 60;

function CheckoutContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const productId = searchParams.get("product") || "";
  const product = PRODUCTS[productId];

  const [secondsLeft, setSecondsLeft] = useState(COUNTDOWN_SECONDS);
  const [copied, setCopied] = useState(false);
  const [expired, setExpired] = useState(false);

  useEffect(() => {
    if (expired) return;
    if (secondsLeft <= 0) {
      setExpired(true);
      return;
    }
    const t = setTimeout(() => setSecondsLeft((s) => s - 1), 1000);
    return () => clearTimeout(t);
  }, [secondsLeft, expired]);

  const mm = String(Math.floor(secondsLeft / 60)).padStart(2, "0");
  const ss = String(secondsLeft % 60).padStart(2, "0");

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(product ? product.price : "");
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      const ta = document.createElement("textarea");
      ta.value = product?.price || "";
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }, [product]);

  // 无效产品
  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: "#0a0a0f" }}>
        <div className="text-center px-6">
          <p className="text-2xl mb-4">🔮</p>
          <h1 className="text-xl font-display gold-text mb-3">未找到商品</h1>
          <p className="text-sm mb-6" style={{ color: "rgba(212,196,160,0.5)" }}>
            请从付费页面选择商品后进入结算
          </p>
          <button
            onClick={() => router.push("/pay")}
            className="px-6 py-2.5 rounded-xl text-sm font-medium transition-all"
            style={{
              background: "linear-gradient(135deg, #c9a05edd, #c9a05e88)",
              color: "#fff",
              boxShadow: "0 4px 16px rgba(201,160,94,0.33)",
            }}
          >
            返回付费页
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center px-4 py-10"
      style={{ background: "#0a0a0f" }}
    >
      {/* 倒计时 */}
      <div
        className="w-full max-w-sm rounded-2xl p-6 mb-5 text-center"
        style={{
          border: "1px solid rgba(201,160,94,0.25)",
          background: "rgba(201,160,94,0.06)",
        }}
      >
        <p className="text-sm mb-1 flex items-center justify-center gap-1.5" style={{ color: "rgba(212,196,160,0.6)" }}>
          <span>🕐</span> 剩余付款时间
        </p>
        <p
          className="text-4xl font-display tracking-widest mt-1"
          style={{
            color: expired ? "#e53e3e" : "#c9a05e",
            textShadow: expired ? "0 0 20px rgba(229,62,62,0.3)" : "0 0 20px rgba(201,160,94,0.3)",
          }}
        >
          {expired ? "已过期" : `${mm}:${ss}`}
        </p>
        <p className="text-xs mt-2" style={{ color: "rgba(212,196,160,0.35)" }}>
          请在 5 分钟内完成付款。
        </p>
      </div>

      {/* 收款码卡片 */}
      <div
        className="w-full max-w-sm rounded-2xl p-6 text-center"
        style={{ background: "#f5efe0", boxShadow: "0 8px 32px rgba(0,0,0,0.35)" }}
      >
        <div className="rounded-xl overflow-hidden mx-auto mb-4" style={{ maxWidth: 260 }}>
          <img
            src="/images/wechat-qr.jpg"
            alt="微信收款码"
            className="w-full h-auto"
            style={{ display: "block" }}
          />
        </div>

        <p className="text-base font-medium mb-0.5" style={{ color: "#4a3728" }}>
          收款方：玄机阁
        </p>
        <p className="text-xs mb-4" style={{ color: "#8b7355" }}>
          长按二维码可保存到相册
        </p>

        <div className="border-t my-4" style={{ borderColor: "rgba(74,55,40,0.15)" }} />

        <p className="text-sm mb-1" style={{ color: "#6b5344" }}>商品：{product.name}</p>
        <div className="flex items-center justify-center gap-2 mt-2">
          <span className="text-xs" style={{ color: "#8b7355" }}>请按此金额付款（用于核验到账）</span>
        </div>
        <div className="flex items-center justify-center gap-2 mt-1">
          <span className="text-3xl font-display" style={{ color: "#c0392b", fontWeight: 700 }}>
            ¥{product.price}
          </span>
          <button
            onClick={handleCopy}
            className="ml-1 px-2.5 py-1 rounded-lg text-xs font-medium transition-all active:scale-95"
            style={{
              background: copied ? "#27ae60" : "rgba(192,57,43,0.1)",
              color: copied ? "#fff" : "#c0392b",
              border: "1px solid " + (copied ? "#27ae60" : "rgba(192,57,43,0.25)"),
            }}
          >
            {copied ? "已复制 ✓" : "复制"}
          </button>
        </div>
      </div>

      {/* 提示信息 */}
      <div className="max-w-sm mt-5 text-center space-y-2">
        <p className="text-xs leading-relaxed" style={{ color: "rgba(212,196,160,0.4)" }}>
          ① 扫描上方二维码，付款 <strong style={{ color: "#c9a05e" }}>¥{product.price}</strong>
        </p>
        <p className="text-xs leading-relaxed" style={{ color: "rgba(212,196,160,0.4)" }}>
          ② 付款成功后，截图发送给站长确认
        </p>
        <p className="text-xs leading-relaxed" style={{ color: "rgba(212,196,160,0.4)" }}>
          ③ 确认到账后，站长将发送 AI 解读结果给您
        </p>
      </div>

      <button
        onClick={() => router.push("/pay")}
        className="mt-6 px-6 py-2 rounded-xl text-xs transition-all"
        style={{
          border: "1px solid rgba(201,160,94,0.25)",
          color: "rgba(201,160,94,0.6)",
          background: "transparent",
        }}
      >
        ← 返回选择其他商品
      </button>
    </div>
  );
}

export default function CheckoutPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center" style={{ background: "#0a0a0f" }}>
        <p className="text-gold text-sm">加载中...</p>
      </div>
    }>
      <CheckoutContent />
    </Suspense>
  );
}
