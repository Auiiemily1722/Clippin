# PinClip - Clipboard History Manager

[简体中文](README.md) | [繁體中文](README_ZH-TW.md) | [日本語](README_JA.md)

## Overview

A modern clipboard history management tool with Glassmorphism design language.

## Tech Stack

- **Frontend**: HTML + CSS + JavaScript (Single File)
- **Backend**: Electron
- **Database**: SQLite (sql.js)

## Features

| Feature | Description |
|---------|-------------|
| Window Operations | Draggable, resizable (8-direction corners) |
| Minimize | macOS-style fly-in animation to Windows taskbar |
| Close | Scale fade-out animation |
| Date Filter | Dropdown: All/Today/Yesterday/Day Before/Earlier |
| Search | Real-time filtering |
| Card Grouping | Grouped by time |
| Pin | Click pin icon to pin card with FLIP animation |
| Copy | Click copy icon or card, shows checkmark animation (1.2s) |
| Delete | Card slides left and disappears |
| Preview | Hover to expand long text (glass effect) |
| Batch Operations | Multi-select mode, batch pin/delete |

### Design Details

- Window corner radius: 10px
- Glass effect: `backdrop-filter: blur(40px) saturate(180%)`
- Animation curve: `cubic-bezier(0.25, 0.1, 0.25, 1)`
- Color scheme: Dark gradient background + White glass cards
- Traffic lights: Red close, Yellow minimize, Green pin (macOS style)

## Installation

```bash
npm install
npm start
```

## Build

```bash
npm run build:installer  # Installer
npm run build:portable   # Portable
npm run build            # All
```

## Highlights

- **FLIP Animation**: Smooth position animations for all list operations
- **Glassmorphism**: Backdrop-filter for frosted glass effect
- **Multi-language**: EN / ZH-CN / ZH-TW / JA
- **Dark Mode**: Auto-follow system or manual toggle
- **Global Hotkey**: Ctrl+Shift+V to quick launch

## License

MIT
