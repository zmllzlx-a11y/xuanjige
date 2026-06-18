#!/usr/bin/env node
/**
 * 卡密生成工具 — 玄机阁
 *
 * 用法:
 *   node scripts/gen-codes.mjs                         生成 10 张通用卡密
 *   node scripts/gen-codes.mjs -c 5                    生成 5 张
 *   node scripts/gen-codes.mjs -c 3 -p bazi-deep       生成 3 张八字精批卡密
 *   node scripts/gen-codes.mjs --deploy                同步卡密到 public/codes/manifest.json 并部署
 *   node scripts/gen-codes.mjs --list                  列出所有卡密状态
 *
 * 商品: bazi-deep, lottery-deep, dream-deep, naming
 */

import { readFileSync, writeFileSync, existsSync, mkdirSync, copyFileSync } from "node:fs";
import { randomBytes } from "node:crypto";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const CODES_PATH = join(__dirname, "..", "data", "codes.json");
const MANIFEST_PATH = join(__dirname, "..", "public", "codes", "manifest.json");

const PRODUCTS = ["bazi-deep", "lottery-deep", "dream-deep", "naming"];

function genCode() {
  const raw = randomBytes(5).toString("hex").toUpperCase();
  return `XJ-${raw}`;
}

function load() {
  if (!existsSync(CODES_PATH)) return { codes: [] };
  return JSON.parse(readFileSync(CODES_PATH, "utf-8"));
}

function save(data) {
  const dir = join(dirname(CODES_PATH));
  if (!existsSync(dir)) mkdirSync(dir, { recursive: true });
  writeFileSync(CODES_PATH, JSON.stringify(data, null, 2), "utf-8");
}

function generate(count, product = null) {
  if (product && !PRODUCTS.includes(product)) {
    console.error(`❌ 无效商品。可选: ${PRODUCTS.join(", ")}`);
    process.exit(1);
  }

  const data = load();
  const now = Date.now();
  const batch = [];

  for (let i = 0; i < count; i++) {
    const code = genCode();
    batch.push({ code, product: product || "通用", used: false, used_by: null, used_at: null, created_at: now });
    data.codes.push(batch[batch.length - 1]);
  }

  save(data);

  console.log(`\n🎴 已生成 ${count} 张卡密:`);
  batch.forEach((c) => console.log(`   ${c.product === "通用" ? "[通用]" : `[${c.product}]`}  ${c.code}`));

  const unused = data.codes.filter((c) => !c.used).length;
  console.log(`\n📊 总计: ${data.codes.length} 张 | 未使用: ${unused} | 已使用: ${data.codes.length - unused}`);
}

function deploy() {
  const data = load();
  if (data.codes.length === 0) {
    console.error("❌ data/codes.json 为空，请先生成卡密");
    process.exit(1);
  }

  const dir = join(dirname(MANIFEST_PATH));
  if (!existsSync(dir)) mkdirSync(dir, { recursive: true });

  // 只部署未使用的 & 已使用但需要公开信息的
  // manifest 只包含 code + product，不暴露 used_by 等隐私
  const manifest = {
    codes: data.codes
      .filter((c) => !c.used)  // 已使用的从 manifest 移除
      .map((c) => ({ code: c.code, product: c.product })),
  };

  writeFileSync(MANIFEST_PATH, JSON.stringify(manifest, null, 2), "utf-8");
  console.log(`\n🚀 已生成 public/codes/manifest.json（${manifest.codes.length} 张可用卡密）`);
  console.log("   运行 git add public/codes/manifest.json 并推送到 Cloudflare 即可生效");
}

function listCodes() {
  const data = load();
  const unused = data.codes.filter((c) => !c.used);
  const used = data.codes.filter((c) => c.used);

  console.log(`\n📊 卡密统计:`);
  console.log(`   总计: ${data.codes.length}`);
  console.log(`   未使用: ${unused.length}`);
  console.log(`   已使用: ${used.length}\n`);

  if (unused.length > 0) {
    console.log("🟢 未使用:");
    for (const c of unused) console.log(`   ${c.product === "通用" ? "[通用]" : `[${c.product}]`}  ${c.code}`);
  }
  if (used.length > 0) {
    console.log("\n🔴 已使用:");
    for (const c of used.slice(-10)) {
      console.log(`   ${c.product === "通用" ? "[通用]" : `[${c.product}]`}  ${c.code} → ${c.used_by} (${new Date(c.used_at).toLocaleString("zh-CN")})`);
    }
  }
}

// ---- CLI ----
const args = process.argv.slice(2);

if (args.includes("--list") || args.includes("-l")) { listCodes(); }
else if (args.includes("--deploy") || args.includes("-d")) { deploy(); }
else {
  const ci = args.indexOf("-c") >= 0 ? args.indexOf("-c") : args.indexOf("--count");
  const count = ci >= 0 ? parseInt(args[ci + 1], 10) : 10;

  const pi = args.indexOf("-p") >= 0 ? args.indexOf("-p") : args.indexOf("--product");
  const product = pi >= 0 ? args[pi + 1] : null;

  generate(count, product);
}
