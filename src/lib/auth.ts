/**
 * 吉祥号 + 认证系统
 * 
 * 纯 localStorage 模式（阶段 1）：
 *   - 用户首次访问 → 自动生成吉祥号
 *   - 所有记录保存在 localStorage
 *   - 恢复：输入吉祥号（本地匹配）
 * 
 * 后续可迁移到 Vercel KV / Supabase
 */

// ===== 吉祥号生成 =====

const LUCKY_PREFIXES = [
  "莲心", "紫云", "清风", "明月", "菩提", "禅音",
  "云水", "松风", "竹影", "兰香", "鹤鸣", "渔歌",
  "梅雪", "兰若", "灵泉", "妙音", "善缘", "福慧",
  "慧光", "静心", "明悟", "悟真", "道心", "慈航",
  "宝莲", "金莲", "银莲", "玉莲", "青莲", "白莲",
  "丹心", "素心", "玄妙", "太玄", "灵犀", "仙踪",
  "云深", "松涛", "竹韵", "梅骨", "兰意", "菊品",
];

/** 生成吉祥号（中文词 + 3位数字） */
export function generateLuckyCode(): string {
  const prefix = LUCKY_PREFIXES[Math.floor(Math.random() * LUCKY_PREFIXES.length)];
  const num = String(Math.floor(Math.random() * 1000)).padStart(3, "0");
  return `${prefix}${num}`;
}

// ===== localStorage 键名 =====

const KEYS = {
  TOKEN: "xuanjige_token_v2",
  USER: "xuanjige_user_v2",
  DEVICE_ID: "xuanjige_device_id",
  INVITE_CODE: "xuanjige_invite_code",
} as const;

// ===== 设备 ID =====

export function getDeviceId(): string {
  if (typeof window === "undefined") return "ssr_preview";
  let id = localStorage.getItem(KEYS.DEVICE_ID);
  if (!id) {
    id = `web_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 10)}`;
    localStorage.setItem(KEYS.DEVICE_ID, id);
  }
  return id;
}

// ===== 用户数据 =====

export interface XuanjigeUser {
  id: string;
  lucky_code: string;
  nickname: string;
  created_at: number;
  phone?: string;
  paid_products?: string[];
}

/** 生成完整用户对象 */
export function createAnonymousUser(): XuanjigeUser {
  return {
    id: `u_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 8)}`,
    lucky_code: generateLuckyCode(),
    nickname: "",
    created_at: Date.now(),
    paid_products: [],
  };
}

// ===== Token（简单 JWT 替代：base64 编码的用户 ID） =====

export function getToken(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(KEYS.TOKEN);
}

export function setToken(token: string): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(KEYS.TOKEN, token);
}

export function clearToken(): void {
  if (typeof window === "undefined") return;
  localStorage.removeItem(KEYS.TOKEN);
  localStorage.removeItem(KEYS.USER);
}

// ===== 用户存储 =====

export function getStoredUser(): XuanjigeUser | null {
  if (typeof window === "undefined") return null;
  const raw = localStorage.getItem(KEYS.USER);
  if (!raw) return null;
  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

export function setStoredUser(user: XuanjigeUser): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(KEYS.USER, JSON.stringify(user));
}

export function clearStoredUser(): void {
  if (typeof window === "undefined") return;
  localStorage.removeItem(KEYS.USER);
}

// ===== 是否已初始化 =====

export function hasAuth(): boolean {
  return !!getToken() && !!getStoredUser();
}

// ===== 历史记录 =====

export interface HistoryItem {
  id: string;
  kind: string; // "lottery" | "bazi" | "dream" | "almanac" | "qifu"
  title: string;
  subtitle: string;
  payload: Record<string, unknown>;
  created_at: number;
}

const HISTORY_KEY = "xuanjige_history";

export function pushHistory(item: HistoryItem): void {
  if (typeof window === "undefined") return;
  const history = getHistory();
  history.unshift(item); // 最新的在前
  // 限制最多 100 条
  if (history.length > 100) history.length = 100;
  localStorage.setItem(HISTORY_KEY, JSON.stringify(history));
}

export function getHistory(kind?: string): HistoryItem[] {
  if (typeof window === "undefined") return [];
  const raw = localStorage.getItem(HISTORY_KEY);
  if (!raw) return [];
  try {
    const all: HistoryItem[] = JSON.parse(raw);
    return kind ? all.filter((h) => h.kind === kind) : all;
  } catch {
    return [];
  }
}

export function clearHistory(kind?: string): void {
  if (typeof window === "undefined") return;
  if (!kind) {
    localStorage.removeItem(HISTORY_KEY);
  } else {
    const all = getHistory().filter((h) => h.kind !== kind);
    localStorage.setItem(HISTORY_KEY, JSON.stringify(all));
  }
}

// ===== 已付费产品 =====

export function addPaidProduct(productId: string): void {
  const user = getStoredUser();
  if (!user) return;
  if (!user.paid_products) user.paid_products = [];
  if (!user.paid_products.includes(productId)) {
    user.paid_products.push(productId);
    setStoredUser(user);
  }
}

export function hasPaid(productId: string): boolean {
  const user = getStoredUser();
  return !!user?.paid_products?.includes(productId);
}

// ===== 邀请码 =====

export function getInviteCode(): string {
  if (typeof window === "undefined") return "";
  return localStorage.getItem(KEYS.INVITE_CODE) || "";
}

export function setInviteCode(code: string): void {
  if (typeof window === "undefined") return;
  const trimmed = (code || "").trim();
  if (trimmed) localStorage.setItem(KEYS.INVITE_CODE, trimmed);
}

export function clearInviteCode(): void {
  if (typeof window === "undefined") return;
  localStorage.removeItem(KEYS.INVITE_CODE);
}
