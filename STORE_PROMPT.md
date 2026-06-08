# PinClip — 微软商店上架合规性重构（Codex 提示词）

> **使用说明**：将下方 `---BEGIN PROMPT---` 到 `---END PROMPT---` 之间的内容完整复制，粘贴给 Codex 即可。
> 本提示词已针对 Codex 的上下文窗口做了精确裁剪，只涉及需要修改的 `main.js` 和 `package.json`，不触碰前端文件。

---BEGIN PROMPT---

## 角色

你是一位精通 Electron 33.x、Windows 桌面 API、Node.js 运行时以及微软商店 AppX 沙盒规范的高级工程师。

## 任务

对 PinClip 项目进行微软商店上架合规性重构。**仅修改 `main.js` 和 `package.json` 两个文件**。`preload.js` 和 `pinclip-ui.html` 绝对不可修改。

## 铁律

1. **完整性**：输出 `main.js` 和 `package.json` 的 100% 全量代码，严禁使用 `// ... existing code ...` 等省略占位符。
2. **零功能退化**：必须完好保留所有原有业务逻辑，包括但不限于：
   - `locales` 字典中四种语言（zh-CN, zh-TW, ja-JP, en-US）的全部翻译文本
   - `detectType(text)` 函数及其内部所有正则规则
   - sql.js 的 try-catch 健壮加载与红色控制台报错框
   - 数据库 `regexp` 自定义函数的注册与异常捕获
   - 所有 IPC 句柄（clips:list, clips:copy, window:set-always-on-top 等）
   - 7 天自动清理逻辑
   - 所有窗口、托盘、快捷键逻辑
3. **边界隔离**：本次改造仅限主进程（main.js）与打包配置（package.json）。

---

## 任务 1：将剪贴板轮询替换为事件驱动监听（使用 clipboard-event）

### 现状
`main.js` 第 83 行定义了 `CLIPBOARD_POLL_INTERVAL = 1000`，第 490-520 行的 `startClipboardMonitor()` 使用 `setInterval` 每秒轮询 `clipboard.readText()`。这会导致持续 CPU 唤醒，无法通过微软商店的能耗合规审核。

### 要求
1. **删除** `CLIPBOARD_POLL_INTERVAL` 常量。
2. **删除** `startClipboardMonitor()` 函数中的 `setInterval` 轮询逻辑。
3. **引入** `clipboard-event` npm 包（一个零原生编译、真正事件驱动的剪贴板监听库，Windows 上基于 `AddClipboardFormatListener` API）。
   - 安装命令：`npm install clipboard-event`
   - 用法：
     ```javascript
     const clipboardListener = require("clipboard-event");
     
     // 开始监听
     clipboardListener.startListening();
     
     // 监听剪贴板变化事件
     clipboardListener.on("change", () => {
       const text = clipboard.readText();  // 需要从 electron 导入 clipboard
       // 处理逻辑...
     });
     
     // 停止监听
     clipboardListener.stopListening();
     ```
4. **重写** `startClipboardMonitor()` 函数：
   - 在函数开头调用 `clipboardListener.startListening()`
   - 注册 `clipboardListener.on("change", ...)` 事件处理器
   - 事件处理器内部的逻辑必须与原 `setInterval` 回调**完全一致**，包括：
     - 读取 `clipboard.readText()`
     - 比较 `text !== lastClipboardText`
     - 更新 `lastClipboardText`
     - 数据库去重查询（SELECT id, pinned FROM clips WHERE text = ?）
     - 已存在则更新 `created_at` 时间戳，不存在则 `dbInsert`
     - 调用 `formatClip()` 格式化
     - 通过 `mainWindow.webContents.send("new-clip", clip)` 推送到渲染进程
     - try-catch 包裹整个回调体
5. 在 `app.on("will-quit", ...)` 中调用 `clipboardListener.stopListening()` 清理监听器。
6. 在 `package.json` 的 `dependencies` 中添加 `"clipboard-event": "^1.6.0"`。

---

## 任务 2：适配 AppX 沙盒环境下的开机自启与静默启动

### 现状
- `setAutoStart()` 函数（第 112-122 行）直接调用 `app.setLoginItemSettings()`，在 AppX 沙盒中会被系统隔离。
- `app.whenReady()` 中（第 656-658 行）也直接调用 `app.setLoginItemSettings()`。
- 窗口创建时没有 `show: false`，启动时会立即显示。

### 要求

#### 2.1 开机自启的 AppX 隔离
在 `setAutoStart()` 函数和 `app.whenReady()` 的自启逻辑中，添加环境判断：

```javascript
if (!process.windowsStore) {
  app.setLoginItemSettings({ openAtLogin: enable, path: process.execPath, args: app.isPackaged ? [] : [__dirname] });
}
```

在 Store 环境下，仅修改并保存 `settings.json` 中的 `autoStart` 字段，不调用 `app.setLoginItemSettings()`。这样托盘菜单的复选框状态仍会正确同步。

#### 2.2 静默启动
1. 在 `createWindow()` 的 `BrowserWindow` 构造参数中添加 `show: false`。
2. 在 `app.whenReady().then(...)` 中，检查启动参数：
   ```javascript
   const isStartupLaunch = process.argv.includes("--startup");
   ```
   如果 `isStartupLaunch` 为 `true`，保持窗口隐藏（不调用 `mainWindow.show()`），仅托盘驻留。
   如果为 `false`（普通双击启动），在 `mainWindow.once('ready-to-show', () => mainWindow.show())` 中显示窗口。

---

## 任务 3：在 package.json 中补全 AppX 打包配置

### 要求
在 `package.json` 的 `build` 根块中，添加 `appx` 配置块：

```json
"appx": {
  "publisher": "CN=YOUR_PUBLISHER_ID_PLACEHOLDER",
  "publisherDisplayName": "PinClip Studio",
  "identityName": "com.pinclip.app",
  "applicationId": "PinClip",
  "displayName": "PinClip",
  "showNameOnTiles": true,
  "languages": ["en-US", "zh-CN", "zh-TW", "ja-JP"]
}
```

在 `build.win.target` 数组中，保留 `"portable"` 和 `"nsis"`，追加 `"appx"`。

在 `scripts` 中新增：`"build:store": "electron-builder --win appx"`。

确保 `extraResources` 拷贝 `sql-wasm.wasm` 的逻辑完好无损。

---

## 任务 4：WASM 路径沙盒稳健性

### 要求
检查 `initDatabase()` 中的 `locateFile` 路径解析逻辑。当前已通过 `process.resourcesPath` 定位 WASM 文件，这已兼容 AppX 沙盒环境。

但需增加一层防御：在 `process.resourcesPath` 路径之外，额外检查 `app.getAppPath()` 下的相对路径作为第三优先级回退：

```javascript
locateFile: filename => {
  if (filename === "sql-wasm.wasm") {
    // 优先级1：打包后的 resources 目录（包括 AppX 沙盒）
    const prodPath = path.join(process.resourcesPath, filename);
    if (fs.existsSync(prodPath)) return prodPath;
    // 优先级2：开发环境的 node_modules 目录
    const devPath = path.join(path.dirname(require.resolve("sql.js")), filename);
    if (fs.existsSync(devPath)) return devPath;
    // 优先级3：应用安装目录下的相对路径（某些 AppX 部署场景）
    const appPath = path.join(app.getAppPath(), filename);
    if (fs.existsSync(appPath)) return appPath;
    // 最终回退
    return filename;
  }
  return filename;
}
```

---

## 输出格式

请依次输出以下两个文件的完整内容，用文件路径作为标题分隔：

### 文件 1：`main.js`
（输出 100% 完整的 main.js 全量代码）

### 文件 2：`package.json`
（输出 100% 完整的 package.json 全量代码）

---

## 执行完成后需要手动运行的命令

```bash
npm install
npm start
```

---END PROMPT---
