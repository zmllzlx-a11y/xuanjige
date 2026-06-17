"use client";

import { createContext, useContext, useState, useEffect, useCallback, ReactNode } from "react";
import {
  XuanjigeUser,
  createAnonymousUser,
  getStoredUser,
  setStoredUser,
  clearStoredUser,
  getToken,
  setToken,
  clearToken,
  getDeviceId,
  getInviteCode,
  setInviteCode,
  clearInviteCode,
} from "@/lib/auth";

// ===== Context 类型 =====

interface AuthContextType {
  user: XuanjigeUser | null;
  loading: boolean;
  openRestore: (reason?: string) => void;
  logout: () => void;
  refresh: () => void;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  openRestore: () => {},
  logout: () => {},
  refresh: () => {},
});

export function useAuth() {
  return useContext(AuthContext);
}

// ===== Restore Modal =====

function RestoreModal({
  open,
  onClose,
  onSuccess,
  reason,
}: {
  open: boolean;
  onClose: () => void;
  onSuccess: (user: XuanjigeUser) => void;
  reason?: string;
}) {
  const [mode, setMode] = useState<"lucky" | "phone">("lucky");
  const [luckyInput, setLuckyInput] = useState("");
  const [phoneInput, setPhoneInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!open) {
      setLuckyInput("");
      setPhoneInput("");
      setError(null);
      setMode("lucky");
    }
  }, [open]);

  const handleRestore = async () => {
    setError(null);
    setLoading(true);

    try {
      if (mode === "lucky") {
        const code = luckyInput.trim();
        if (code.length < 2) throw new Error("请输入完整的吉祥号");

        // 阶段 1：本地匹配（尝试调用后端 API，失败则本地查找）
        try {
          const res = await fetch("/api/auth/restore", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ lucky_code: code, device_id: getDeviceId() }),
          });
          const data = await res.json();
          if (data.user) {
            onSuccess(data.user);
            return;
          }
        } catch {
          // API 不可用，降级到本地
        }

        // 本地查找：检查 localStorage 中的用户
        const localUser = getStoredUser();
        if (localUser && localUser.lucky_code.replace(/[\s\-]/g, "") === code.replace(/[\s\-]/g, "")) {
          onSuccess(localUser);
          return;
        }
        throw new Error("未找到该吉祥号，请确认后重试（当前仅支持本设备找回）");
      } else {
        const phone = phoneInput.trim();
        if (!/^1[3-9]\d{9}$/.test(phone)) throw new Error("请输入正确的手机号");

        try {
          const res = await fetch("/api/auth/restore", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ phone, device_id: getDeviceId() }),
          });
          const data = await res.json();
          if (data.user) {
            onSuccess(data.user);
            return;
          }
        } catch {
          // API 不可用
        }
        throw new Error("手机号找回需后端支持，当前尚未开通");
      }
    } catch (e) {
      setError(e instanceof Error ? e.message : "找回失败");
    } finally {
      setLoading(false);
    }
  };

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center px-3 pb-[calc(env(safe-area-inset-bottom)+90px)] md:pb-4"
      style={{ background: "rgba(14, 11, 8, 0.95)", backdropFilter: "blur(8px)" }}
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-md max-h-full overflow-y-auto rounded-2xl p-5 sm:p-6"
        style={{
          border: "1px solid rgba(201,160,94,0.3)",
          background: "rgba(20, 16, 12, 0.95)",
          boxShadow: "0 20px 60px rgba(0,0,0,0.5)",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* 关闭按钮 */}
        <button
          onClick={onClose}
          className="absolute right-3 top-3 rounded-md p-1 text-paper-dark/60 hover:text-gold transition-colors"
          aria-label="关闭"
        >
          ✕
        </button>

        {/* 标题区 */}
        <div className="text-center mb-5">
          <div
            className="mx-auto mb-3 flex size-14 items-center justify-center rounded-full"
            style={{
              border: "1px solid rgba(201,160,94,0.3)",
              background: "rgba(201,160,94,0.1)",
            }}
          >
            <span className="text-2xl">🔑</span>
          </div>
          <h2 className="font-display text-2xl gold-text">找回我的记录</h2>
          <p className="mt-1 text-sm" style={{ color: "rgba(212,196,160,0.55)" }}>
            {reason || "在新手机/换浏览器后，输入您的吉祥号即可恢复全部记录"}
          </p>
        </div>

        {/* Tab 切换 */}
        <div
          className="flex h-12 overflow-hidden rounded-xl"
          style={{ border: "1px solid rgba(201,160,94,0.3)", background: "rgba(201,160,94,0.04)" }}
        >
          <button
            onClick={() => setMode("lucky")}
            className="flex flex-1 items-center justify-center gap-1.5 transition-colors"
            style={{
              color: mode === "lucky" ? "#c9a05e" : "rgba(212,196,160,0.5)",
              background: mode === "lucky" ? "rgba(201,160,94,0.15)" : "transparent",
            }}
          >
            <span className="text-base">🍀</span>吉祥号
          </button>
          <button
            onClick={() => setMode("phone")}
            className="flex flex-1 items-center justify-center gap-1.5 transition-colors"
            style={{
              color: mode === "phone" ? "#c9a05e" : "rgba(212,196,160,0.5)",
              background: mode === "phone" ? "rgba(201,160,94,0.15)" : "transparent",
            }}
          >
            <span className="text-base">📱</span>手机号
          </button>
        </div>

        {/* 输入区 */}
        <div className="mt-4 space-y-3">
          {mode === "lucky" ? (
            <>
              <input
                value={luckyInput}
                onChange={(e) => setLuckyInput(e.target.value)}
                placeholder="例如：莲心088"
                maxLength={20}
                className="h-14 w-full rounded-xl border border-gold/20 bg-xuan-surface px-3 text-center font-display text-2xl tracking-[0.15em] text-paper-dark placeholder:text-ink-muted focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold/30 transition-all"
              />
              <p className="text-xs leading-relaxed" style={{ color: "rgba(212,196,160,0.5)" }}>
                吉祥号是「中文词 + 3 位数字」的组合，如
                <span className="mx-1 font-display text-gold">莲心088</span>、
                <span className="mx-1 font-display text-gold">紫云315</span>。
                您第一次进入玄机阁时已自动获得，可在「我的」页面查看。
              </p>
            </>
          ) : (
            <>
              <input
                type="tel"
                inputMode="numeric"
                pattern="[0-9]*"
                value={phoneInput}
                onChange={(e) => setPhoneInput(e.target.value.replace(/\D/g, ""))}
                placeholder="请输入手机号"
                maxLength={11}
                className="h-14 w-full rounded-xl border border-gold/20 bg-xuan-surface px-3 text-center text-2xl tracking-widest text-paper-dark placeholder:text-ink-muted focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold/30 transition-all"
              />
              <p className="text-xs leading-relaxed" style={{ color: "rgba(212,196,160,0.5)" }}>
                若您之前在付费时留过手机号，可用手机号找回。暂不发送验证码。
              </p>
            </>
          )}

          {error && (
            <p className="rounded-md border border-vermillion/30 bg-vermillion/10 px-3 py-2 text-sm" style={{ color: "#e53e3e" }}>
              {error}
            </p>
          )}

          <button
            onClick={handleRestore}
            disabled={loading}
            className="h-12 w-full rounded-xl text-lg font-medium transition-all duration-200 disabled:opacity-50"
            style={{
              background: "linear-gradient(135deg, #c9a05edd, #c9a05e88)",
              color: "#fff",
              boxShadow: "0 4px 16px rgba(201,160,94,0.33)",
            }}
          >
            {loading ? "⏳ 查找中..." : "找回我的记录"}
          </button>

          <p className="pt-1 text-center text-xs" style={{ color: "rgba(212,196,160,0.4)" }}>
            初次使用？无需操作，您已自动获得一个吉祥号。关闭本窗口即可继续使用。
          </p>
        </div>
      </div>
    </div>
  );
}

// ===== AuthProvider =====

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<XuanjigeUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [restoreOpen, setRestoreOpen] = useState(false);
  const [restoreReason, setRestoreReason] = useState<string | undefined>();

  // 初始化：检查 localStorage 中是否有用户，没有则自动创建
  useEffect(() => {
    const existing = getStoredUser();
    if (existing) {
      setUser(existing);
      // 确保有 token
      if (!getToken()) {
        setToken(`xj_${existing.id}_${Date.now().toString(36)}`);
      }
      setLoading(false);
      return;
    }

    // 首次访问 → 自动创建匿名用户
    const newUser = createAnonymousUser();
    setStoredUser(newUser);
    setToken(`xj_${newUser.id}_${Date.now().toString(36)}`);
    setUser(newUser);

    // 处理 URL 中的 invite 参数
    const url = new URL(window.location.href);
    const invite = url.searchParams.get("invite") || url.searchParams.get("share");
    if (invite) {
      setInviteCode(invite);
      url.searchParams.delete("invite");
      url.searchParams.delete("share");
      window.history.replaceState({}, "", url.toString());
    }

    setLoading(false);
  }, []);

  // 邀请码应用（当用户有 lucky_code 后检查）
  useEffect(() => {
    if (!user?.id || !user?.lucky_code) return;
    const invite = getInviteCode();
    if (!invite) return;
    // 阶段 1：本地存储邀请码即可（后端 API 日后对接）
    // 清除 invite 以防重复
    clearInviteCode();
  }, [user?.id, user?.lucky_code]);

  const openRestore = useCallback((reason?: string) => {
    setRestoreReason(reason);
    setRestoreOpen(true);
  }, []);

  const logout = useCallback(() => {
    clearToken();
    clearStoredUser();
    // 重新创建匿名用户
    const newUser = createAnonymousUser();
    setStoredUser(newUser);
    setToken(`xj_${newUser.id}_${Date.now().toString(36)}`);
    setUser(newUser);
  }, []);

  const refresh = useCallback(() => {
    const stored = getStoredUser();
    if (stored) setUser(stored);
  }, []);

  const handleRestoreSuccess = useCallback((restoredUser: XuanjigeUser) => {
    setStoredUser(restoredUser);
    setToken(`xj_${restoredUser.id}_${Date.now().toString(36)}`);
    setUser(restoredUser);
    setRestoreOpen(false);
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, openRestore, logout, refresh }}>
      {children}
      <RestoreModal
        open={restoreOpen}
        onClose={() => setRestoreOpen(false)}
        onSuccess={handleRestoreSuccess}
        reason={restoreReason}
      />
    </AuthContext.Provider>
  );
}
