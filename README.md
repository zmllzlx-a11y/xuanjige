# 玄机阁 · 国学命理 AI 网站

以古籍为根，以 AI 为引。祈福求签、八字精批、周公解梦、黄历择吉。

## 功能

- 📅 **今日黄历** — 干支宜忌、神煞冲煞、十二时辰
- 🎋 **关帝灵签** — 100 支传统签谱，心诚则灵
- ☯️ **八字精批** — 立春真排盘 + DeepSeek AI 深度解读
- 🌙 **周公解梦** — 关键词匹配 + AI 深度解读
- 💳 **付费解读** — 彩虹发卡自动交付

## 技术栈

- **前端**: Next.js 15 (App Router) + Tailwind CSS 4 + TypeScript
- **AI**: DeepSeek API
- **支付**: 彩虹发卡（卡密自动交付）
- **字体**: MaShanZheng (Google Fonts)

## 快速开始

### 本地开发

```bash
cd F:\suangua
npm install          # 已安装，可跳过
npm run dev          # 启动开发服务器
```

访问 http://localhost:3000

### 生产部署

详见 [DEPLOYMENT.md](./DEPLOYMENT.md)

## 环境变量

复制 `.env.example` 为 `.env.local` 并填写：

```bash
DEEPSEEK_API_KEY=sk-xxx          # DeepSeek API 密钥
RAINBOW_API_URL=https://...       # 彩虹发卡 API 地址
RAINBOW_API_KEY=xxx              # 彩虹发卡 API Key
RAINBOW_API_SECRET=xxx           # 彩虹发卡 API Secret
NEXT_PUBLIC_BAZI_LINK=https://...  # 八字商品购买链接
```

## 目录结构

```
suangua/
├── src/
│   ├── app/                    # Next.js App Router 页面
│   │   ├── page.tsx           # 首页
│   │   ├── almanac/           # 黄历
│   │   ├── lottery/           # 灵签
│   │   ├── bazi/              # 八字
│   │   ├── dream/             # 解梦
│   │   ├── pay/               # 付费页
│   │   └── api/               # API 路由
│   │       ├── bazi/          # 八字 AI 解读 API
│   │       └── verify/        # 卡密验证 API
│   ├── components/            # React 组件
│   │   └── MusicPlayer.tsx   # 背景音乐播放器
│   └── lib/                   # 工具函数
│       ├── almanac.ts        # 黄历排盘
│       ├── bazi.ts           # 八字排盘
│       └── lottery.ts        # 灵签数据
├── public/
│   └── music.mp3              # 观音灵感歌（背景音乐）
└── DEPLOYMENT.md              # 详细部署指南
```

## 开发说明

- 使用 `node .\node_modules\next\dist\bin\next dev --turbopack` 启动（PowerShell 脚本限制问题）
- 生产构建：`npm run build`
- 生产启动：`npm run start`
