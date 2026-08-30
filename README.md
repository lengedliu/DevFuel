# DevFuel - HaierKeys 创作者赞助与打赏平台 ⚡ / Creator Support & Sponsorship Platform

[中文说明](#中文说明) | [English](#english)

---

<a name="中文说明"></a>
## 中文说明

**DevFuel** 是专为 **HaierKeys**（Obsidian 知名插件如 *Fast Note Sync* 和 *Custom Image Auto Uploader* 的开发者）量身定制的高性能创作者赞助与打赏平台。

作为 Ko-fi 的现代化高质感重现与升级版，DevFuel 旨在帮助开发者和开源创作者收取单次打赏与按月赞助、销售数字产品（Pro 授权码、Docker 部署包、工作流指南）、管理每月服务器托管目标、发布技术开发日志，并与支持者进行深度互动。

### 🌟 核心功能

#### ☕ 1. 动态 DevFuel 赞助小部件 (Support Widget)
* **自定义咖啡数量**：支持选择 1 杯 ($3)、3 杯 ($9)、5 杯 ($15) 或输入自定义数量。
* **灵活频次**：支持单次打赏或按月订阅赞助。
* **匿名与个性留言**：支持者可撰写支持留言或选择匿名。
* **庆祝特效**：赞助成功时即时触发五彩礼花（Confetti）粒子动画。

#### 🎯 2. 服务器托管目标实时追踪 (Live Goal Tracker)
* 实时展示东京与法兰克福中继节点服务器及 S3 备份费用的筹款进度（如 $435 / $500）。
* 动态展示完成度百分比、剩余天数与支持者数量统计。

#### 💬 3. 支持者留言墙 (Supporter Feed)
* **分类与搜索**：支持按带留言、按月赞助、置顶留言及关键字全局搜索。
* **互动点赞**：支持者留言爱心点赞数统计。
* **创作者回复**：创作者模式下可直接在留言下方回复粉丝。

#### 🛒 4. 数字商店与 Pro 授权密钥生成器 (Digital Shop)
* **数字产品**：出售 Pro 授权码、Docker Compose 自建部署包、Git 自动备份指南。
* **自动激活码**：购买后自动生成唯一的许可证密钥（如 `HNK-2026-XXXX-XXXX`）。
* **模拟沙盒支付**：内置测试模拟结账弹窗，无需真实扣款即可测试完整流程。

#### 🚀 5. 月度会员阶梯 (Membership Tiers)
* 提供 4 个订阅阶梯（$3/月 至 $25/mo），附带专属权益列表（如早期 Beta 测试、专属高速同步节点通道、Discord 身份组）。

#### 📰 6. 开发日志与版本更新 (Devlogs)
* 技术更新日志、版本发布公告与服务器账单公开报告。
* 支持展开全文阅读，包含支持者评论互动区。

#### 🖼️ 7. 插件展示画廊 (Showcase Gallery)
* 包含多端实时同步演示与架构图，支持全屏 Lightbox 大图预览。

#### 👁️ 8. 创作者管理后台 (Creator Mode)
* 一键切换 **粉丝视角** 与 **创作者视角**。
* 创作者后台支持调整筹款目标、上架新商品、发布新日志并查看收益统计。

---

### 🛠️ 技术栈

* **前端框架**：React 19 + TypeScript
* **构建工具**：Vite 6
* **样式框架**：Tailwind CSS v4
* **图标库**：Lucide React
* **特效**：Canvas Confetti
* **状态持久化**：Browser `localStorage`（带初始化容错防护）

---

### 🚀 快速开始

#### 安装依赖

```bash
npm install
```

#### 启动开发服务器 (绑定 3000 端口)

```bash
npm run dev
```

#### 代码检查与 TypeScript 类型校验

```bash
npm run lint
```

#### 生产环境打包构建

```bash
npm run build
```

---

<a name="english"></a>
## English

**DevFuel** is a high-performance creator support and sponsorship platform built for **HaierKeys**, developer of popular Obsidian plugins including **Fast Note Sync** and **Custom Image Auto Uploader**.

Designed as a modern, feature-rich alternative to Ko-fi, DevFuel empowers developers and open-source creators to receive one-time and monthly support, sell digital products (pro licenses, Docker packages, workflow guides), manage monthly server funding goals, publish technical devlogs, and interact directly with supporters.

---

### 🌟 Key Features

#### ☕ 1. Interactive DevFuel Support Widget
* **Custom Coffee Count**: Select 1, 3, 5, or enter a custom number of coffees ($3 per coffee).
* **Flexible Frequency**: Choose between One-Time Support or Recurring Monthly Support.
* **Anonymous & Personalized**: Supporters can leave messages or keep contributions anonymous.
* **Celebratory Effects**: Instant canvas confetti particle animation upon contribution.

#### 🎯 2. Live Infrastructure Goal Tracker
* Real-time progress tracker for relay server hosting (Tokyo EC2 & Frankfurt nodes) and cold S3 backups.
* Visual percentage bar with remaining days and supporter counters.

#### 💬 3. Supporter Message Feed
* **Search & Filters**: Filter feed by notes, monthly supporters, pinned posts, or keyword search.
* **Like & Interactions**: Heart count for supporter messages.
* **Creator Replies**: Creator Mode enables direct responses to supporter notes.

#### 🛒 4. Digital Shop & Pro License Key Generator
* **Digital Products**: Purchase Pro licenses, Docker Compose packages, or workflow guides.
* **Instant Key Generation**: Automatic generation of unique activation keys (e.g. `HNK-2026-XXXX-XXXX`) for license purchases.
* **Simulated Checkout**: Built-in test sandbox modal for instant verification.

#### 🚀 5. Monthly Membership Tiers
* Four subscription tiers ranging from $3/mo to $25/mo with detailed perk lists (e.g. Early Plugin Betas, Dedicated High-Speed Sync Channels, Discord Roles).

#### 📰 6. Devlog & Release Updates
* Technical logs, release notes, and server transparency reports.
* Expandable full-article views with supporter comment threads.

#### 🖼️ 7. Plugin Showcase Gallery
* High-res workflow screenshots and sync architecture diagrams with full-screen Lightbox preview.

#### 👁️ 8. Creator Mode Management Dashboard
* Toggle between **Fan View** and **Creator View**.
* Live dashboard to update funding goals, publish shop items, post devlog updates, and review monthly revenue statistics.

---

### 🛠️ Tech Stack

* **Framework**: React 19 + TypeScript
* **Build Tool**: Vite 6
* **Styling**: Tailwind CSS v4
* **Icons**: Lucide React
* **Effects**: Canvas Confetti
* **State Persistence**: Browser `localStorage` with fallback initialization

---

### 🚀 Getting Started

#### Installation

```bash
npm install
```

#### Development Server

Run the Vite development server (runs on port 3000):

```bash
npm run dev
```

#### Type Checking & Linting

```bash
npm run lint
```

#### Production Build

Compile TypeScript and build static assets into `dist/`:

```bash
npm run build
```

---

## 📄 License

Apache-2.0 © 2026 HaierKeys / DevFuel Engine
