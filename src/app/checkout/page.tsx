"use client";

import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import { Suspense, useState, useEffect } from "react";

// 产品数据（与 pay 页面一致）
const PRODUCTS: Record<string, {
  name: string; price: string; icon: string; color: string; layer: string;
}> = {
  "insomnia-healing": { name: "安眠调理方案", price: "29.9", icon: "🌙", color: "#5D8A66", layer: "身" },
  "stomach-healing": { name: "脾胃调养方案", price: "39.9", icon: "🍲", color: "#C9A35A", layer: "身" },
  "menopause-healing": { name: "更年期调和方案", price: "49.9", icon: "🌸", color: "#C07060", layer: "身" },
  "pain-healing": { name: "慢性疼痛调理方案", price: "49.9", icon: "🦴", color: "#5A8FAF", layer: "身" },
  "anxiety-healing": { name: "焦虑疗愈方案", price: "49.9", icon: "🫁", color: "#8FBC9A", layer: "心" },
  "depression-healing": { name: "情志郁结化解方案", price: "69.9", icon: "🕯️", color: "#7A9E7E", layer: "心" },
  "grief-healing": { name: "哀伤转化方案", price: "59.9", icon: "🕊️", color: "#5A8FAF", layer: "心" },
  "burnout-healing": { name: "耗竭重生方案", price: "79.9", icon: "🔥", color: "#C9A35A", layer: "灵" },
  "relationship-healing": { name: "关系和解方案", price: "59.9", icon: "🤝", color: "#D4956A", layer: "灵" },
  "self-discovery": { name: "自性觉醒方案", price: "99.9", icon: "🪷", color: "#5D8A66", layer: "灵" },
};

function CheckoutContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const productId = searchParams.get("product") || "";
  const product = PRODUCTS[productId];
  const [timeLeft, setTimeLeft] = useState(900); // 15分钟倒计时

  useEffect(() => {
    if (timeLeft <= 0) return;
    const timer = setInterval(() => setTimeLeft(t => t - 1), 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  if (!product) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center px-4">
        <span className="text-4xl mb-4">🪷</span>
        <h2 className="text-xl font-display green-text mb-2">未选择方案</h2>
        <p className="text-sm mb-6" style={{ color: "rgba(232,228,218,0.5)" }}>
          请先从疗愈方案页选择适合您的方案
        </p>
        <button onClick={() => router.push("/pay")} className="btn-primary">
          浏览疗愈方案
        </button>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-lg px-4 py-10">
      {/* 倒计时 */}
      <div className="text-center mb-6">
        <p className="text-xs mb-1" style={{ color: "rgba(232,228,218,0.35)" }}>
          请在倒计时内完成支付
        </p>
        <p className="text-2xl font-display" style={{
          color: timeLeft < 300 ? "#c95050" : "var(--color-swen-green)",
        }}>
          {minutes.toString().padStart(2, "0")}:{seconds.toString().padStart(2, "0")}
        </p>
      </div>

      {/* 商品信息 */}
      <div className="card-featured p-5 mb-5" style={{ borderColor: `${product.color}44` }}>
        <div className="flex items-center gap-3 mb-3">
          <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl"
            style={{ background: `${product.color}18`, border: `1px solid ${product.color}33` }}>
            {product.icon}
          </div>
          <div>
            <h2 className="text-lg font-display" style={{ color: product.color }}>{product.name}</h2>
            <span className="text-xs badge-green">{product.layer}·层调理</span>
          </div>
        </div>
        <div className="flex items-center justify-between pt-3 border-t" style={{ borderColor: "rgba(93,138,102,0.1)" }}>
          <span className="text-sm" style={{ color: "rgba(232,228,218,0.5)" }}>支付金额</span>
          <span className="text-2xl font-display" style={{ color: "#c95050" }}>¥{product.price}</span>
        </div>
      </div>

      {/* 收款码 */}
      <div className="card-glass p-6 mb-5 text-center">
        <h3 className="text-sm font-display green-text mb-4">📱 微信扫码支付</h3>
        <div className="w-48 h-48 mx-auto rounded-xl flex items-center justify-center mb-4"
          style={{ background: "rgba(255,255,255,0.95)" }}>
          {/* 微信收款码图片 */}
          <img src="/images/wechat-qr.jpg" alt="微信收款码"
            className="w-full h-full object-contain rounded-xl"
            onError={e => { (e.target as HTMLImageElement).style.display = "none"; }} />
          <span className="text-black text-xs" style={{ display: "none" }}
            id="qr-fallback">收款码加载中...</span>
        </div>
        <p className="text-xs" style={{ color: "rgba(232,228,218,0.4)" }}>
          请使用微信扫描上方二维码支付 ¥{product.price}
        </p>
      </div>

      {/* 金额复制 */}
      <div className="card-base p-4 mb-5 flex items-center justify-between">
        <span className="text-sm" style={{ color: "rgba(232,228,218,0.5)" }}>
          支付金额：¥{product.price}
        </span>
        <button
          onClick={() => navigator.clipboard?.writeText(product.price)}
          className="text-xs px-3 py-1.5 rounded-lg transition-all"
          style={{
            background: "rgba(93,138,102,0.1)",
            border: "1px solid rgba(93,138,102,0.2)",
            color: "var(--color-swen-green)",
          }}>
          复制金额
        </button>
      </div>

      {/* 支付步骤 */}
      <div className="card-glass p-5 mb-5">
        <h4 className="text-sm font-display green-text mb-3">💡 支付步骤</h4>
        <div className="space-y-2">
          {[
            "长按保存上方收款码图片",
            "打开微信扫一扫，选择相册中的收款码",
            `输入金额 ¥${product.price}，完成支付`,
            "截图支付凭证，联系站长确认",
          ].map((step, i) => (
            <div key={i} className="flex items-start gap-2 text-xs" style={{ color: "rgba(232,228,218,0.55)" }}>
              <span className="shrink-0 w-5 h-5 rounded-full flex items-center justify-center"
                style={{ background: "rgba(93,138,102,0.1)", color: "var(--color-swen-green)" }}>
                {i + 1}
              </span>
              <span className="mt-0.5">{step}</span>
            </div>
          ))}
        </div>
      </div>

      {/* 返回按钮 */}
      <button onClick={() => router.push("/pay")}
        className="w-full py-3 rounded-xl text-sm transition-all"
        style={{
          background: "rgba(93,138,102,0.08)",
          border: "1px solid rgba(93,138,102,0.15)",
          color: "var(--color-swen-green)",
        }}>
        ← 返回方案列表
      </button>
    </div>
  );
}

export default function CheckoutPage() {
  return (
    <Suspense fallback={
      <div className="min-h-[60vh] flex items-center justify-center">
        <p style={{ color: "rgba(232,228,218,0.3)" }}>加载中...</p>
      </div>
    }>
      <CheckoutContent />
    </Suspense>
  );
}
