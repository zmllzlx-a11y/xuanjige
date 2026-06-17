# 玄机阁 · 部署指南

## 目录
1. [一键部署到 Vercel](#一键部署到-vercel)
2. [收款方式（手动扫码）](#收款方式手动扫码)
3. [日常运营](#日常运营)
4. [本地开发](#本地开发)

---

## 一键部署到 Vercel

### 步骤 1：上传代码到 GitHub

```powershell
cd F:\suangua
git init
git add .
git commit -m "玄机阁 v1.0"
# 在 github.com 新建仓库 xuanjige，获取 URL
git remote add origin https://github.com/你的用户名/xuanjige.git
git branch -M main
git push -u origin main
```

### 步骤 2：Vercel 部署

1. 打开 [vercel.com](https://vercel.com)，用 GitHub 登录
2. Add New → Project → 选择 `xuanjige` 仓库
3. Framework Preset: **Next.js**
4. **Environment Variables** 添加：

| 变量名 | 值 | 说明 |
|--------|-----|------|
| `DEEPSEEK_API_KEY` | `sk-xxx` | DeepSeek API Key |

5. 点击 **Deploy** → 等待 2-3 分钟
6. 获得免费地址：`https://xuanjige.vercel.app`

---

## 收款方式（手动扫码）

无需对接任何发卡平台或支付接口。**你收到转账后，手动发给用户 AI 解读结果。**

### 用户操作流程

1. 进入 /pay 页 → 选择商品 → 扫码付款
2. 添加你的微信/支付宝 → 发送付款截图
3. 你确认到账后 → 手动发送 AI 解读结果

### 配置收款码

修改 `src/app/pay/page.tsx`，将占位的两处收款码图片替换为真实的微信/支付宝收款码图片（建议传到 `public/` 目录）。

修改联系方式：编辑 `.env.local` 或在 Vercel 环境变量中设置：

```
NEXT_PUBLIC_WECHAT_ID=你的微信号
NEXT_PUBLIC_ALIPAY_PHONE=你的支付宝手机号
```

---

## 日常运营

- **新用户付款** → 扫码转账，你确认到账 → 手动发送 AI 解读结果
- **建议批量用**：收到用户八字信息后，在本地运行 DeepSeek 生成解读，复制后发回

---

## 本地开发

```powershell
cd F:\suangua
npm run dev
```

访问 http://localhost:3000

---

## 常见问题

### Q: 网站免费吗？
A: Vercel 免费版每月 100GB 带宽，个人使用完全够用。

### Q: 如何更新网站内容？
A: 修改代码 → `git push` → Vercel 自动部署（约 2 分钟生效）。

### Q: 用户扫码付了款提示什么？
A: 付款后截图联系你。你确认后，手动把 DeepSeek AI 生成的解析内容发给用户。
