/**
 * POST /api/auth/restore — 吉祥号/手机号找回
 * 
 * 接受：{ lucky_code?: string, phone?: string, device_id?: string }
 * 返回：{ user, token } 或 { message }
 */

import { NextRequest, NextResponse } from "next/server";
import { readFileSync, writeFileSync, existsSync } from "fs";
import { join } from "path";

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
    return JSON.parse(readFileSync(getDataPath(), "utf-8"));
  } catch {
    return [];
  }
}

function saveUsers(users: StoredUser[]): void {
  writeFileSync(getDataPath(), JSON.stringify(users, null, 2), "utf-8");
}

export async function POST(req: NextRequest) {
  try {
    const { lucky_code, phone, device_id } = await req.json() as {
      lucky_code?: string;
      phone?: string;
      device_id?: string;
    };

    const users = loadUsers();

    // 吉祥号找回
    if (lucky_code) {
      const normalized = lucky_code.trim().replace(/[\s\-]/g, "");
      const found = users.find((u) => u.lucky_code.replace(/[\s\-]/g, "") === normalized);
      if (!found) {
        return NextResponse.json({ message: "未找到该吉祥号，请确认后重试" }, { status: 404 });
      }
      if (device_id) found.device_id = device_id;
      saveUsers(users);
      return NextResponse.json({ user: found, token: `xj_${found.id}` });
    }

    // 手机号找回
    if (phone) {
      const found = users.find((u) => u.phone === phone);
      if (!found) {
        return NextResponse.json({ message: "未找到该手机号关联的记录" }, { status: 404 });
      }
      if (device_id) found.device_id = device_id;
      saveUsers(users);
      return NextResponse.json({ user: found, token: `xj_${found.id}` });
    }

    return NextResponse.json({ message: "请提供吉祥号或手机号" }, { status: 400 });
  } catch (err) {
    console.error("[Restore API] 异常:", err);
    return NextResponse.json({ message: "服务器异常" }, { status: 500 });
  }
}
