# DevFuel - HaierKeys Creator Support & Sponsorship Platform ⚡

**DevFuel** is a high-performance creator support and sponsorship platform built for **HaierKeys**, developer of popular Obsidian plugins including **Fast Note Sync** and **Custom Image Auto Uploader**.

Designed as a modern, feature-rich alternative to Ko-fi, DevFuel empowers developers and open-source creators to receive one-time and monthly support, sell digital products (pro licenses, Docker packages, workflow guides), manage monthly server funding goals, publish technical devlogs, and interact directly with supporters.

---

## 🌟 Key Features

### ☕ 1. Interactive DevFuel Support Widget
* **Custom Coffee Count**: Select 1, 3, 5, or enter a custom number of coffees ($3 per coffee).
* **Flexible Frequency**: Choose between One-Time Support or Recurring Monthly Support.
* **Anonymous & Personalized**: Supporter messages or anonymous contributions.
* **Celebratory Effects**: Instant canvas confetti particle animation upon contribution.

### 🎯 2. Live Infrastructure Goal Tracker
* Real-time progress tracker for relay server hosting (Tokyo EC2 & Frankfurt nodes) and cold S3 backups.
* Visual percentage bar with remaining days and supporter counters.

### 💬 3. Supporter Message Feed
* **Search & Filters**: Filter feed by notes, monthly supporters, pinned posts, or keyword search.
* **Like & Interactions**: Heart count for supporter messages.
* **Creator Replies**: Creator Mode enables direct responses to supporter notes.

### 🛒 4. Digital Shop & Pro License Key Generator
* **Digital Products**: Purchase Pro licenses, Docker Compose packages, or workflow guides.
* **Instant Key Generation**: Automatic generation of unique activation keys (e.g. `HNK-2026-XXXX`) for license purchases.
* **Simulated Checkout**: Built-in test sandbox modal for instant verification.

### 🚀 5. Monthly Membership Tiers
* Four subscription tiers ranging from $3/mo to $25/mo with detailed perk lists (e.g. Early Plugin Betas, Dedicated High-Speed Sync Channels, Discord Roles).

### 📰 6. Devlog & Release Updates
* Technical logs, release notes, and server transparency reports.
* Expandable full-article views with supporter comment threads.

### 🖼️ 7. Plugin Showcase Gallery
* High-res workflow screenshots and sync architecture diagrams with full-screen Lightbox preview.

### 👁️ 8. Creator Mode Management Dashboard
* Toggle between **Fan View** and **Creator View**.
* Live dashboard to update funding goals, publish shop items, post devlog updates, and review monthly revenue statistics.

---

## 🛠️ Tech Stack

* **Framework**: React 19 + TypeScript
* **Build Tool**: Vite 6
* **Styling**: Tailwind CSS v4
* **Icons**: Lucide React
* **Effects**: Canvas Confetti
* **State Persistence**: Browser `localStorage` with fallback initialization

---

## 🚀 Getting Started

### Installation

```bash
npm install
```

### Development Server

Run the Vite development server (runs on port 3000):

```bash
npm run dev
```

### Type Checking & Linting

```bash
npm run lint
```

### Production Build

Compile TypeScript and build static assets into `dist/`:

```bash
npm run build
```

---

## 📄 License

Apache-2.0 © 2026 HaierKeys / DevFuel Engine
