<div align="center">

# PinClip

**一款轻量、精美的 Windows 剪贴板管理工具，拥有丝滑动画与 Mica/Acrylic 磨砂玻璃美学。**

由 Vibe Coding 注入灵魂，由人类手工打磨细节。

[简体中文](README.md) · [English](README_EN.md) · [繁體中文](README_ZH-TW.md) · [日本語](README_JA.md)

[![GitHub release](https://img.shields.io/github/v/release/Auiiemily1722/PinClip?style=flat-square)](https://github.com/Auiiemily1722/PinClip/releases)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg?style=flat-square)](LICENSE)

</div>

---

## ✨ 演示

### 📋 剪贴板捕获
复制任何内容 — PinClip 瞬间记住。

![剪贴板捕获](github演示/demo-clipboard.gif)

### 🔍 智能搜索与多选
毫秒级查找。批量置顶、删除。

![搜索与多选](github演示/demo-search.gif)

---

## 🎯 为什么选择 PinClip？

| 功能 | 说明 |
|------|------|
| 🪟 **Mica / Acrylic 玻璃效果** | 原生 Windows 11 磨砂玻璃美学 |
| ⚡ **即时捕获** | 自动保存每一次剪贴板变化 |
| 🔍 **实时搜索** | 输入即过滤 |
| 📌 **置顶功能** | 重要内容始终可见 |
| ✅ **多选操作** | 批量删除或置顶 |
| 🌙 **深色/浅色模式** | 跟随系统或手动切换 |
| 🌐 **多语言** | 简体中文、English、繁體中文、日本語 |
| ⌨️ **全局快捷键** | `Ctrl+Shift+V` 一键唤出 |
| 🎬 **丝滑动画** | FLIP 动效，流畅缩放与淡入淡出 |

---

## 🛠 技术栈

| 层级 | 技术 |
|------|------|
| 界面 | HTML + CSS + JavaScript（单文件） |
| 运行时 | Electron |
| 数据库 | SQLite via sql.js（WebAssembly） |

---

## 🚀 快速开始

### 下载
从 [Releases](https://github.com/Auiiemily1722/PinClip/releases) 获取最新便携版 `.exe` — 无需安装。

### 从源码构建
```bash
git clone https://github.com/Auiiemily1722/PinClip.git
cd PinClip
npm install
npm start
```

### 打包
```bash
npm run build:portable   # 便携版
npm run build:installer # 安装包
npm run build           # 全部
```

---

## 🎨 设计细节

- **玻璃拟态**：`backdrop-filter: blur(40px) saturate(180%)`
- **动画曲线**：`cubic-bezier(0.25, 0.1, 0.25, 1)`
- **窗口圆角**：10px
- **macOS 风格控制按钮**：红色（关闭）· 黄色（最小化）· 绿色（置顶）

---

## 📄 许可证

[MIT](LICENSE) © 2026 Auiie

---

<div align="center">

**觉得 PinClip 好用？给个 ⭐ 吧！**

</div>
