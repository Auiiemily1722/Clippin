<div align="center">

# PinClip

**A lightweight, gorgeous Windows clipboard manager with fluid animations and Mica/Acrylic aesthetics.**

Built with Vibe Coding & fine-tuned with human craftsmanship.

[简体中文](README.md) · [English](README_EN.md) · [繁體中文](README_ZH-TW.md) · [日本語](README_JA.md)

[![GitHub release](https://img.shields.io/github/v/release/Auiiemily1722/PinClip?style=flat-square)](https://github.com/Auiiemily1722/PinClip/releases)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg?style=flat-square)](LICENSE)

</div>

---

## ✨ デモ

### 📋 クリップボードキャプチャ
何でもコピー — PinClip が瞬時に記憶します。

![クリップボードキャプチャ](github演示/demo-clipboard.gif)

### 🔍 スマート検索 & 複数選択
ミリ秒で検索。一括ピン留め・削除。

![検索 & 複数選択](github演示/demo-search.gif)

---

## 🎯 PinClip の特徴

| 機能 | 説明 |
|------|------|
| 🪟 **Mica / Acrylic ガラス** | ネイティブ Windows 11 のすりガラス美学 |
| ⚡ **インスタントキャプチャ** | クリップボードの変更を自動保存 |
| 🔍 **リアルタイム検索** | 入力してすぐにフィルタリング |
| 📌 **ピン留め** | 重要なアイテムを常に表示 |
| ✅ **複数選択** | 一括削除・ピン留め |
| 🌙 **ダーク / ライトモード** | システムに追従 or 手動切替 |
| 🌐 **多言語対応** | English, 简体中文, 繁體中文, 日本語 |
| ⌨️ **グローバルホットキー** | `Ctrl+Shift+V` で即座に起動 |
| 🎬 **滑らかなアニメーション** | FLIPベースのトランジション |

---

## 🛠 技術スタック

| レイヤー | 技術 |
|---------|------|
| UI | HTML + CSS + JavaScript（単一ファイル） |
| ランタイム | Electron |
| データベース | SQLite via sql.js（WebAssembly） |

---

## 🚀 クイックスタート

### ダウンロード
[Releases](https://github.com/Auiiemily1722/PinClip/releases) から最新のポータブル版 `.exe` を取得 — インストール不要。

### ソースからビルド
```bash
git clone https://github.com/Auiiemily1722/PinClip.git
cd PinClip
npm install
npm start
```

### パッケージ化
```bash
npm run build:portable   # ポータブル版
npm run build:installer # インストーラー
npm run build           # 両方
```

---

## 🎨 デザイン詳細

- **グラスモーフィズム**: `backdrop-filter: blur(40px) saturate(180%)`
- **アニメーション曲線**: `cubic-bezier(0.25, 0.1, 0.25, 1)`
- **ウィンドウ角丸**: 10px
- **macOSスタイルコントロール**: 赤（閉じる）· 黄（最小化）· 緑（ピン留め）

---

## 📄 ライセンス

[MIT](LICENSE) © 2026 Auiie

---

<div align="center">

**PinClip を気に入ったら、⭐ をお願いします！**

</div>
