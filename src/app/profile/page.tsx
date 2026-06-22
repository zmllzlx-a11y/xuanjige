"use client";

import { useAuth } from "@/components/AuthProvider";
import { getHistory, clearHistory, HistoryItem } from "@/lib/auth";
import { useState } from "react";

const KIND_LABELS: Record<string, string> = {
  lottery: "灵签",
  bazi: "八字",
  dream: "解梦",
  almanac: "黄历",
  qifu: "祈福",
  constitution: "体质测评",
  season: "节气养生",
  herb: "草药百科",
  diet: "药膳食谱",
  acupoint: "经络穴位",
  ask: "AI顾问",
};

const KIND_ICONS: Record<string, string> = {
  lottery: "🎋",
  bazi: "☯️",
  dream: "🌙",
  almanac: "📅",
  qifu: "🙏",
  constitution: "🍃",
  season: "🌿",
  herb: "🌿",
  diet: "🍲",
  acupoint: "🧘",
  ask: "🤖",
};

export default function ProfilePage() {
  const { user, loading, openRestore, logout } = useAuth();
  const [activeTab, setActiveTab] = useState<string>("all");
  const [history, setHistory] = useState<HistoryItem[]>([]);

  // 加载历史记录
  useState(() => {
    setHistory(getHistory(activeTab === "all" ? undefined : activeTab));
  });

  const refreshHistory = () => {
    setHistory(getHistory(activeTab === "all" ? undefined : activeTab));
  };

  if (loading) {
    return (
      <div className="mx-auto max-w-lg px-4 py-10 text-center">
        <p style={{ color: "rgba(212,196,160,0.5)" }}>加载中...</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="mx-auto max-w-lg px-4 py-10 text-center">
        <p style={{ color: "rgba(212,196,160,0.5)" }}>无法获取用户信息</p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-lg px-4 py-10">
      {/* 吉祥号卡片 */}
      <div
        className="card-glass p-6 text-center animate-float-up"
      >
        <div
          className="mx-auto mb-4 flex size-16 items-center justify-center rounded-full"
          style={{
            border: "2px solid rgba(201,160,94,0.4)",
            background: "rgba(201,160,94,0.1)",
          }}
        >
          <span className="text-3xl">🍀</span>
        </div>
        <h2 className="font-display text-xl gold-text mb-1">我的吉祥号</h2>
        <p
          className="text-3xl font-display tracking-[0.2em] mb-2"
          style={{
            color: "#c9a05e",
            textShadow: "0 0 20px rgba(201,160,94,0.4)",
          }}
        >
          {user.lucky_code}
        </p>
        <p className="text-xs" style={{ color: "rgba(212,196,160,0.4)" }}>
          这是您在玄机阁的唯一标识，可用于换设备找回记录
        </p>

        {/* 操作按钮 */}
        <div className="flex gap-3 mt-4 justify-center">
          <button
            onClick={() => openRestore("在新设备上输入此吉祥号可恢复记录")}
            className="px-4 py-2 rounded-xl text-sm font-medium transition-all"
            style={{
              border: "1px solid rgba(201,160,94,0.3)",
              color: "#c9a05e",
              background: "rgba(201,160,94,0.05)",
            }}
          >
            🔑 找回记录
          </button>
          <button
            onClick={() => {
              if (confirm("退出将生成新的吉祥号，当前记录仅保存在本设备")) {
                logout();
                refreshHistory();
              }
            }}
            className="px-4 py-2 rounded-xl text-sm transition-all"
            style={{
              border: "1px solid rgba(212,196,160,0.2)",
              color: "rgba(212,196,160,0.4)",
              background: "rgba(212,196,160,0.03)",
            }}
          >
            退出登录
          </button>
        </div>
      </div>

      {/* 已付费 */}
      {user.paid_products && user.paid_products.length > 0 && (
        <div
          className="card-glass mt-4 p-4 animate-float-up"
          style={{ animationDelay: "0.1s" }}
        >
          <h3 className="text-sm font-display text-gold mb-3">✅ 已解锁服务</h3>
          <div className="flex gap-2 flex-wrap">
            {user.paid_products.map((p) => (
              <span
                key={p}
                className="px-3 py-1 rounded-lg text-xs"
                style={{
                  border: "1px solid rgba(201,160,94,0.2)",
                  background: "rgba(201,160,94,0.05)",
                  color: "#c9a05e",
                }}
              >
                {p}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* 历史记录 */}
      <div
        className="card-glass mt-4 animate-float-up"
        style={{ animationDelay: "0.15s" }}
      >
        <div className="p-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-display text-gold">📜 操作记录</h3>
            {history.length > 0 && (
              <button
                onClick={() => {
                  if (confirm("确认清空所有记录？")) {
                    clearHistory();
                    refreshHistory();
                  }
                }}
                className="text-xs"
                style={{ color: "rgba(212,196,160,0.3)" }}
              >
                清空
              </button>
            )}
          </div>

          {/* 分类筛选 */}
          <div className="flex gap-2 mb-3 flex-wrap">
            <button
              onClick={() => { setActiveTab("all"); refreshHistory(); }}
              className="px-2.5 py-1 rounded-lg text-xs transition-colors"
              style={{
                color: activeTab === "all" ? "#c9a05e" : "rgba(212,196,160,0.4)",
                background: activeTab === "all" ? "rgba(201,160,94,0.1)" : "transparent",
                border: `1px solid ${activeTab === "all" ? "rgba(201,160,94,0.3)" : "rgba(201,160,94,0.1)"}`,
              }}
            >
              全部
            </button>
            {Object.entries(KIND_LABELS).map(([kind, label]) => (
              <button
                key={kind}
                onClick={() => { setActiveTab(kind); refreshHistory(); }}
                className="px-2.5 py-1 rounded-lg text-xs transition-colors"
                style={{
                  color: activeTab === kind ? "#c9a05e" : "rgba(212,196,160,0.4)",
                  background: activeTab === kind ? "rgba(201,160,94,0.1)" : "transparent",
                  border: `1px solid ${activeTab === kind ? "rgba(201,160,94,0.3)" : "rgba(201,160,94,0.1)"}`,
                }}
              >
                {KIND_ICONS[kind]} {label}
              </button>
            ))}
          </div>

          {/* 记录列表 */}
          {history.length === 0 ? (
            <p className="text-center text-xs py-4" style={{ color: "rgba(212,196,160,0.3)" }}>
              暂无记录，去抽签或算命吧 🎋
            </p>
          ) : (
            <div className="space-y-2 max-h-[300px] overflow-y-auto">
              {history.map((h) => (
                <div
                  key={h.id}
                  className="flex items-center gap-2 py-2 px-3 rounded-lg"
                  style={{ background: "rgba(201,160,94,0.03)" }}
                >
                  <span className="text-base">{KIND_ICONS[h.kind] || "📝"}</span>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm truncate" style={{ color: "rgba(212,196,160,0.7)" }}>
                      {h.title}
                    </p>
                    <p className="text-xs truncate" style={{ color: "rgba(212,196,160,0.4)" }}>
                      {h.subtitle}
                    </p>
                  </div>
                  <span className="text-xs shrink-0" style={{ color: "rgba(212,196,160,0.3)" }}>
                    {new Date(h.created_at).toLocaleDateString("zh-CN")}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* 分享赚钱 */}
      <div
        className="card-glass mt-4 p-4 text-center animate-float-up"
        style={{ animationDelay: "0.2s" }}
      >
        <h3 className="text-sm font-display text-gold mb-2">💰 分享赚钱</h3>
        <p className="text-xs mb-3" style={{ color: "rgba(212,196,160,0.4)" }}>
          把玄机阁分享给朋友，朋友付费后您可获得返佣
        </p>
        <button
          className="px-4 py-2 rounded-xl text-sm transition-all"
          style={{
            border: "1px solid rgba(201,160,94,0.3)",
            color: "#c9a05e",
            background: "rgba(201,160,94,0.05)",
          }}
          onClick={() => {
            const url = `${window.location.origin}?invite=${user.lucky_code}`;
            const text = `玄机阁 · 国学命理 AI 解读 — 帮你算卦解梦看黄历 ${url}`;
            if (navigator.share) {
              navigator.share({ title: "玄机阁", text, url });
            } else {
              navigator.clipboard.writeText(text);
              alert("链接已复制到剪贴板！");
            }
          }}
        >
          📤 分享给朋友
        </button>
      </div>
    </div>
  );
}
