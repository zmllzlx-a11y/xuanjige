/**
 * 认证 API — 阶段 1（JSON 文件存储）
 * 
 * 端点：
 *   POST /api/auth/init     — 匿名初始化
 *   POST /api/auth/restore   — 吉祥号/手机号找回
 *   POST /api/auth/me        — 获取当前用户
 * 
 * 阶段 2 可迁移到 Vercel KV / Supabase
 */

import { NextRequest, NextResponse } from "next/server";
import { readFileSync, writeFileSync, existsSync } from "fs";
import { join } from "path";

// ===== 吉祥号前缀 =====

const LUCKY_PREFIXES = [
  "莲心", "紫云", "清风", "明月", "菩提", "禅音",
  "云水", "松风", "竹影", "兰香", "鹤鸣", "渔歌",
  "梅雪", "兰若", "灵泉", "妙音", "善缘", "福慧",
  "慧光", "静心", "明悟", "悟真", "道心", "慈航",
];

function generateLuckyCode(): string {
  const prefix = LUCKY_PREFIXES[Math.floor(Math.random() * LUCKY_PREFIXES.length)];
  const num = String(Math.floor(Math.random() * 1000)).padStart(3, "0");
  return `${prefix}${num}`;
}

// ===== 文件存储 =====

interface StoredUser {
  id: string;
  lucky_code: string;
  nickname: string;
  created_at: number;
  phone?: string;
  paid_products?: string[];
  device_id?: string;
}

function getDataPath(): string {
  return join(process.cwd(), "data", "users.json");
}

function loadUsers(): StoredUser[] {
  if (!existsSync(getDataPath())) return [];
  try {
    const content = readFileSync(getDataPath(), "utf-8");
    return JSON.parse(content);
  } catch {
    return [];
  }
}

function saveUsers(users: StoredUser[]): void {
  const dir = join(process.cwd(), "data");
  if (!existsSync(dir)) {
    // 简单创建目录（仅本地开发）
    try {
      const { mkdirSync } = require("fs");
      mkdirSync(dir, { recursive: true });
    } catch {}
  }
  writeFileSync(getDataPath(), JSON.stringify(users, null, 2), "utf-8");
}

// ===== POST /api/auth/init =====

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { action, lucky_code, phone, device_id } = body as {
      action?: string;
      lucky_code?: string;
      phone?: string;
      device_id?: string;
    };

    const users = loadUsers();

    // 匿名初始化
    if (!action || action === "init") {
      // 检查 device_id 是否已有用户
      if (device_id) {
        const existing = users.find((u) => u.device_id === device_id);
        if (existing) {
          return NextResponse.json({ user: existing, token: `xj_${existing.id}` });
        }
      }

      const newUser: StoredUser = {
        id: `u_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 8)}`,
        lucky_code: generateLuckyCode(),
        nickname: "",
        created_at: Date.now(),
        device_id: device_id || undefined,
        paid_products: [],
      };

      users.push(newUser);
      saveUsers(users);

      return NextResponse.json({ user: newUser, token: `xj_${newUser.id}` });
    }

    // 吉祥号找回
    if (action === "restore" && lucky_code) {
      const normalized = lucky_code.replace(/[\s\-]/g, "");
      const found = users.find((u) => u.lucky_code.replace(/[\s\-]/g, "") === normalized);
      if (!found) {
        return NextResponse.json(
          { message: "未找到该吉祥号" },
          { status: 404 }
        );
      }
      // 更新 device_id
      if (device_id) found.device_id = device_id;
      saveUsers(users);
      return NextResponse.json({ user: found, token: `xj_${found.id}` });
    }

    // 手机号找回
    if (action === "restore" && phone) {
      const found = users.find((u) => u.phone === phone);
      if (!found) {
        return NextResponse.json(
          { message: "未找到该手机号" },
          { status: 404 }
        );
      }
      if (device_id) found.device_id = device_id;
      saveUsers(users);
      return NextResponse.json({ user: found, token: `xj_${found.id}` });
    }

    // 获取当前用户（通过 token/header）
    if (action === "me") {
      const authHeader = req.headers.get("Authorization");
      const token = authHeader?.replace("Bearer ", "");
      if (!token) {
        return NextResponse.json({ message: "未登录" }, { status: 401 });
      }
      const userId = token.replace("xj_", "").split("_")[0];
      // 简单查找（token 格式：xj_u_xxxx_rest）
      const found = users.find((u) => u.id.startsWith(`u_${userId}`));
      if (!found) {
        return NextResponse.json({ message: "用户不存在" }, { status: 404 });
      }
      return NextResponse.json({ user: found });
    }

    return NextResponse.json({ message: "未知操作" }, { status: 400 });
  } catch (err) {
    console.error("[Auth API] 异常:", err);
    return NextResponse.json({ message: "服务器异常" }, { status: 500 });
  }
}
