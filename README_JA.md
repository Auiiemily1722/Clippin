# Clippin - クリップボード履歴管理ツール

[简体中文](README.md) | [English](README_EN.md) | [繁體中文](README_ZH-TW.md)

## デモ

![Clippin デモ](github演示/test1.png)

![Clippin インターフェース](github演示/test2.png)

## 概要

Clippin は、Windows 向けの軽量でモダンなクリップボード履歴管理ツールです。Glassmorphism スタイルの UI、素早い検索、ピン留め、一括操作、グローバルショートカットを備えています。

## 技術スタック

- **フロントエンド**: HTML + CSS + JavaScript（単一ファイル UI）
- **デスクトップフレームワーク**: Electron
- **データベース**: SQLite（sql.js）

## 主な機能

| 機能 | 説明 |
|------|------|
| ウィンドウ操作 | ドラッグ可能、リサイズ可能（8方向） |
| 最小化 | macOS 風のタスクバー最小化アニメーション |
| 閉じる | 拡大縮小フェードアウトアニメーション |
| 日付フィルター | すべて / 今日 / 昨日 / 一昨日 / それ以前 |
| 検索 | リアルタイム検索 |
| カードグループ化 | 時間ごとに履歴を表示 |
| ピン留め | FLIP アニメーション付きでカードを固定 |
| コピー | アイコンまたはカードクリックでコピー |
| 削除 | 左方向スライドで削除 |
| プレビュー | 長文をホバーで展開表示 |
| 一括操作 | 複数選択で一括ピン留め / 削除 |

## デザインの特徴

- ウィンドウ角丸: 10px
- ガラス効果: `backdrop-filter: blur(40px) saturate(180%)`
- アニメーション曲線: `cubic-bezier(0.25, 0.1, 0.25, 1)`
- 配色: ダークグラデーション背景 + 白いガラスカード
- 操作ボタン: 赤（閉じる）、黄（最小化）、緑（ピン留め）

## インストール

```bash
npm install
npm start
```

## ビルド

```bash
npm run build:installer  # インストーラー版
npm run build:portable   # ポータブル版
npm run build:store      # Microsoft Store / AppX
npm run build            # すべて
```

## ハイライト

- **FLIP アニメーション**による滑らかな並び替え
- **Glassmorphism UI** の視覚表現
- **多言語対応**: 日本語 / English / 简体中文 / 繁體中文
- **ダークモード**対応
- **グローバルショートカット**: `Ctrl + Shift + V`

## ライセンス

MIT
