# Clippin - 剪貼簿歷史記錄工具

[简体中文](README.md) | [English](README_EN.md) | [日本語](README_JA.md)

## 演示

### 剪貼簿擷取

![Clippin 剪貼簿擷取](github演示/demo-clipboard.gif)

### 搜尋歷史

![Clippin 搜尋歷史](github演示/demo-search.gif)

### 批量操作

![Clippin 批量操作](github演示/batch-ops.gif)

## 專案概述

Clippin 是一款輕量、現代的 Windows 剪貼簿歷史管理工具，採用 Glassmorphism 玻璃擬態設計語言，支援快速搜尋、置頂、批量操作與全域快捷鍵喚起。

## 技術棧

- **前端**：HTML + CSS + JavaScript（單檔介面）
- **桌面框架**：Electron
- **資料庫**：SQLite（sql.js）

## 功能特性

| 功能 | 說明 |
|------|------|
| 視窗操作 | 可拖曳、可縮放（八向邊角調整） |
| 最小化 | macOS 風格飛入 Windows 工作列動畫 |
| 關閉 | 縮放淡出動畫 |
| 日期篩選 | 全部 / 今天 / 昨天 / 前天 / 更早前 |
| 搜尋 | 即時過濾剪貼簿歷史 |
| 卡片分組 | 按時間分組顯示 |
| 置頂 | 點擊圖釘圖示，卡片置頂並播放 FLIP 動畫 |
| 複製 | 點擊複製圖示或卡片空白處，顯示勾號回饋動畫 |
| 刪除 | 卡片向左滑出並消失 |
| 預覽 | 懸停展開長文字內容 |
| 批量操作 | 多選模式下支援批量置頂 / 刪除 |

## 設計細節

- 視窗圓角：10px
- 玻璃效果：`backdrop-filter: blur(40px) saturate(180%)`
- 動畫曲線：`cubic-bezier(0.25, 0.1, 0.25, 1)`
- 配色：深色漸層背景 + 白色玻璃卡片
- 控制按鈕：紅色關閉、黃色最小化、綠色置頂（macOS 風格）

## 安裝執行

```bash
npm install
npm start
```

## 打包建構

```bash
npm run build:installer  # 安裝版
npm run build:portable   # 便攜版
npm run build:store      # Microsoft Store / AppX
npm run build            # 全部
```

## 技術亮點

- **FLIP 動畫**：列表重排與置頂動畫流暢自然
- **Glassmorphism**：使用 backdrop-filter 實現毛玻璃效果
- **多語言支援**：繁體中文 / 简体中文 / 日本語 / English
- **深色模式**：支援跟隨系統或手動切換
- **全域快捷鍵**：`Ctrl + Shift + V` 快速喚起視窗

## 授權條款

MIT
