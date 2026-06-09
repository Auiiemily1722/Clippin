<div align="center">

# PinClip

**A lightweight, gorgeous Windows clipboard manager with fluid animations and Mica/Acrylic aesthetics.**

[简体中文](README.md) · [English](README_EN.md) · [繁體中文](README_ZH-TW.md) · [日本語](README_JA.md)

[![GitHub release](https://img.shields.io/github/v/release/Auiiemily1722/PinClip?style=flat-square)](https://github.com/Auiiemily1722/PinClip/releases)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg?style=flat-square)](LICENSE)

</div>

---

## ✨ Demo

### 📋 Clipboard Capture
Copy anything — PinClip remembers it instantly.

![Clipboard Capture](github演示/clipboard-capture.gif)

### 🔍 Smart Search
Find what you need in milliseconds. Filter as you type.

![Smart Search](github演示/search.gif)

### ✅ Batch Operations
Multi-select, pin, or delete in bulk. Double the efficiency.

![Batch Operations](github演示/batch-ops.gif)

---

## 🎯 Why PinClip?

| Feature | Description |
|---------|-------------|
| 🪟 **Mica / Acrylic Glass** | Native Windows 11 frosted glass aesthetics |
| ⚡ **Instant Capture** | Automatically saves every clipboard change |
| 🔍 **Real-time Search** | Filter history as you type |
| 📌 **Pin to Top** | Keep important clips always visible |
| ✅ **Multi-Select** | Batch delete or pin multiple items |
| 🌙 **Dark / Light Mode** | Follows system theme or manual toggle |
| 🌐 **Multi-Language** | English, 简体中文, 繁體中文, 日本語 |
| ⌨️ **Global Hotkey** | `Ctrl+Shift+V` to summon instantly |
| 🎬 **Fluid Animations** | FLIP-based transitions, smooth scaling & fading |

---

## 🛠 Tech Stack

| Layer | Technology |
|-------|-----------|
| UI | HTML + CSS + JavaScript (single file) |
| Runtime | Electron |
| Database | SQLite via sql.js (WebAssembly) |

---

## 🚀 Quick Start

### Download
Grab the latest portable `.exe` from [Releases](https://github.com/Auiiemily1722/PinClip/releases) — no installation needed.

### Build from Source
```bash
git clone https://github.com/Auiiemily1722/PinClip.git
cd PinClip
npm install
npm start
```

### Package
```bash
npm run build:portable   # Portable .exe
npm run build:installer # Installer
npm run build           # Both
```

---

## 🎨 Design Details

- **Glassmorphism**: `backdrop-filter: blur(40px) saturate(180%)`
- **Animation Curve**: `cubic-bezier(0.25, 0.1, 0.25, 1)`
- **Window Radius**: 10px rounded corners
- **macOS-style Controls**: Red (close) · Yellow (minimize) · Green (pin)

---

## 📄 License

[MIT](LICENSE) © 2026 Auiie

---

<div align="center">

**If you find PinClip useful, consider giving it a ⭐!**

</div>
