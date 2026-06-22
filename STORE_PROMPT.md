# Clippin 鈥?寰蒋鍟嗗簵涓婃灦鍚堣鎬ч噸鏋勶紙Codex 鎻愮ず璇嶏級

> **浣跨敤璇存槑**锛氬皢涓嬫柟 `---BEGIN PROMPT---` 鍒?`---END PROMPT---` 涔嬮棿鐨勫唴瀹瑰畬鏁村鍒讹紝绮樿创缁?Codex 鍗冲彲銆?> 鏈彁绀鸿瘝宸查拡瀵?Codex 鐨勪笂涓嬫枃绐楀彛鍋氫簡绮剧‘瑁佸壀锛屽彧娑夊強闇€瑕佷慨鏀圭殑 `main.js` 鍜?`package.json`锛屼笉瑙︾鍓嶇鏂囦欢銆?
---BEGIN PROMPT---

## 瑙掕壊

浣犳槸涓€浣嶇簿閫?Electron 33.x銆乄indows 妗岄潰 API銆丯ode.js 杩愯鏃朵互鍙婂井杞晢搴?AppX 娌欑洅瑙勮寖鐨勯珮绾у伐绋嬪笀銆?
## 浠诲姟

瀵?Clippin 椤圭洰杩涜寰蒋鍟嗗簵涓婃灦鍚堣鎬ч噸鏋勩€?*浠呬慨鏀?`main.js` 鍜?`package.json` 涓や釜鏂囦欢**銆俙preload.js` 鍜?`pinclip-ui.html` 缁濆涓嶅彲淇敼銆?
## 閾佸緥

1. **瀹屾暣鎬?*锛氳緭鍑?`main.js` 鍜?`package.json` 鐨?100% 鍏ㄩ噺浠ｇ爜锛屼弗绂佷娇鐢?`// ... existing code ...` 绛夌渷鐣ュ崰浣嶇銆?2. **闆跺姛鑳介€€鍖?*锛氬繀椤诲畬濂戒繚鐣欐墍鏈夊師鏈変笟鍔￠€昏緫锛屽寘鎷絾涓嶉檺浜庯細
   - `locales` 瀛楀吀涓洓绉嶈瑷€锛坺h-CN, zh-TW, ja-JP, en-US锛夌殑鍏ㄩ儴缈昏瘧鏂囨湰
   - `detectType(text)` 鍑芥暟鍙婂叾鍐呴儴鎵€鏈夋鍒欒鍒?   - sql.js 鐨?try-catch 鍋ュ．鍔犺浇涓庣孩鑹叉帶鍒跺彴鎶ラ敊妗?   - 鏁版嵁搴?`regexp` 鑷畾涔夊嚱鏁扮殑娉ㄥ唽涓庡紓甯告崟鑾?   - 鎵€鏈?IPC 鍙ユ焺锛坈lips:list, clips:copy, window:set-always-on-top 绛夛級
   - 7 澶╄嚜鍔ㄦ竻鐞嗛€昏緫
   - 鎵€鏈夌獥鍙ｃ€佹墭鐩樸€佸揩鎹烽敭閫昏緫
3. **杈圭晫闅旂**锛氭湰娆℃敼閫犱粎闄愪富杩涚▼锛坢ain.js锛変笌鎵撳寘閰嶇疆锛坧ackage.json锛夈€?
---

## 浠诲姟 1锛氬皢鍓创鏉胯疆璇㈡浛鎹负浜嬩欢椹卞姩鐩戝惉锛堜娇鐢?clipboard-event锛?
### 鐜扮姸
`main.js` 绗?83 琛屽畾涔変簡 `CLIPBOARD_POLL_INTERVAL = 1000`锛岀 490-520 琛岀殑 `startClipboardMonitor()` 浣跨敤 `setInterval` 姣忕杞 `clipboard.readText()`銆傝繖浼氬鑷存寔缁?CPU 鍞ら啋锛屾棤娉曢€氳繃寰蒋鍟嗗簵鐨勮兘鑰楀悎瑙勫鏍搞€?
### 瑕佹眰
1. **鍒犻櫎** `CLIPBOARD_POLL_INTERVAL` 甯搁噺銆?2. **鍒犻櫎** `startClipboardMonitor()` 鍑芥暟涓殑 `setInterval` 杞閫昏緫銆?3. **寮曞叆** `clipboard-event` npm 鍖咃紙涓€涓浂鍘熺敓缂栬瘧銆佺湡姝ｄ簨浠堕┍鍔ㄧ殑鍓创鏉跨洃鍚簱锛學indows 涓婂熀浜?`AddClipboardFormatListener` API锛夈€?   - 瀹夎鍛戒护锛歚npm install clipboard-event`
   - 鐢ㄦ硶锛?     ```javascript
     const clipboardListener = require("clipboard-event");
     
     // 寮€濮嬬洃鍚?     clipboardListener.startListening();
     
     // 鐩戝惉鍓创鏉垮彉鍖栦簨浠?     clipboardListener.on("change", () => {
       const text = clipboard.readText();  // 闇€瑕佷粠 electron 瀵煎叆 clipboard
       // 澶勭悊閫昏緫...
     });
     
     // 鍋滄鐩戝惉
     clipboardListener.stopListening();
     ```
4. **閲嶅啓** `startClipboardMonitor()` 鍑芥暟锛?   - 鍦ㄥ嚱鏁板紑澶磋皟鐢?`clipboardListener.startListening()`
   - 娉ㄥ唽 `clipboardListener.on("change", ...)` 浜嬩欢澶勭悊鍣?   - 浜嬩欢澶勭悊鍣ㄥ唴閮ㄧ殑閫昏緫蹇呴』涓庡師 `setInterval` 鍥炶皟**瀹屽叏涓€鑷?*锛屽寘鎷細
     - 璇诲彇 `clipboard.readText()`
     - 姣旇緝 `text !== lastClipboardText`
     - 鏇存柊 `lastClipboardText`
     - 鏁版嵁搴撳幓閲嶆煡璇紙SELECT id, pinned FROM clips WHERE text = ?锛?     - 宸插瓨鍦ㄥ垯鏇存柊 `created_at` 鏃堕棿鎴筹紝涓嶅瓨鍦ㄥ垯 `dbInsert`
     - 璋冪敤 `formatClip()` 鏍煎紡鍖?     - 閫氳繃 `mainWindow.webContents.send("new-clip", clip)` 鎺ㄩ€佸埌娓叉煋杩涚▼
     - try-catch 鍖呰９鏁翠釜鍥炶皟浣?5. 鍦?`app.on("will-quit", ...)` 涓皟鐢?`clipboardListener.stopListening()` 娓呯悊鐩戝惉鍣ㄣ€?6. 鍦?`package.json` 鐨?`dependencies` 涓坊鍔?`"clipboard-event": "^1.6.0"`銆?
---

## 浠诲姟 2锛氶€傞厤 AppX 娌欑洅鐜涓嬬殑寮€鏈鸿嚜鍚笌闈欓粯鍚姩

### 鐜扮姸
- `setAutoStart()` 鍑芥暟锛堢 112-122 琛岋級鐩存帴璋冪敤 `app.setLoginItemSettings()`锛屽湪 AppX 娌欑洅涓細琚郴缁熼殧绂汇€?- `app.whenReady()` 涓紙绗?656-658 琛岋級涔熺洿鎺ヨ皟鐢?`app.setLoginItemSettings()`銆?- 绐楀彛鍒涘缓鏃舵病鏈?`show: false`锛屽惎鍔ㄦ椂浼氱珛鍗虫樉绀恒€?
### 瑕佹眰

#### 2.1 寮€鏈鸿嚜鍚殑 AppX 闅旂
鍦?`setAutoStart()` 鍑芥暟鍜?`app.whenReady()` 鐨勮嚜鍚€昏緫涓紝娣诲姞鐜鍒ゆ柇锛?
```javascript
if (!process.windowsStore) {
  app.setLoginItemSettings({ openAtLogin: enable, path: process.execPath, args: app.isPackaged ? [] : [__dirname] });
}
```

鍦?Store 鐜涓嬶紝浠呬慨鏀瑰苟淇濆瓨 `settings.json` 涓殑 `autoStart` 瀛楁锛屼笉璋冪敤 `app.setLoginItemSettings()`銆傝繖鏍锋墭鐩樿彍鍗曠殑澶嶉€夋鐘舵€佷粛浼氭纭悓姝ャ€?
#### 2.2 闈欓粯鍚姩
1. 鍦?`createWindow()` 鐨?`BrowserWindow` 鏋勯€犲弬鏁颁腑娣诲姞 `show: false`銆?2. 鍦?`app.whenReady().then(...)` 涓紝妫€鏌ュ惎鍔ㄥ弬鏁帮細
   ```javascript
   const isStartupLaunch = process.argv.includes("--startup");
   ```
   濡傛灉 `isStartupLaunch` 涓?`true`锛屼繚鎸佺獥鍙ｉ殣钘忥紙涓嶈皟鐢?`mainWindow.show()`锛夛紝浠呮墭鐩橀┗鐣欍€?   濡傛灉涓?`false`锛堟櫘閫氬弻鍑诲惎鍔級锛屽湪 `mainWindow.once('ready-to-show', () => mainWindow.show())` 涓樉绀虹獥鍙ｃ€?
---

## 浠诲姟 3锛氬湪 package.json 涓ˉ鍏?AppX 鎵撳寘閰嶇疆

### 瑕佹眰
鍦?`package.json` 鐨?`build` 鏍瑰潡涓紝娣诲姞 `appx` 閰嶇疆鍧楋細

```json
"appx": {
  "publisher": "CN=YOUR_PUBLISHER_ID_PLACEHOLDER",
  "publisherDisplayName": "Clippin Studio",
  "identityName": "auiie.Clippin",
  "applicationId": "Clippin",
  "displayName": "Clippin",
  "showNameOnTiles": true,
  "languages": ["en-US", "zh-CN", "zh-TW", "ja-JP"]
}
```

鍦?`build.win.target` 鏁扮粍涓紝淇濈暀 `"portable"` 鍜?`"nsis"`锛岃拷鍔?`"appx"`銆?
鍦?`scripts` 涓柊澧烇細`"build:store": "electron-builder --win appx"`銆?
纭繚 `extraResources` 鎷疯礉 `sql-wasm.wasm` 鐨勯€昏緫瀹屽ソ鏃犳崯銆?
---

## 浠诲姟 4锛歐ASM 璺緞娌欑洅绋冲仴鎬?
### 瑕佹眰
妫€鏌?`initDatabase()` 涓殑 `locateFile` 璺緞瑙ｆ瀽閫昏緫銆傚綋鍓嶅凡閫氳繃 `process.resourcesPath` 瀹氫綅 WASM 鏂囦欢锛岃繖宸插吋瀹?AppX 娌欑洅鐜銆?
浣嗛渶澧炲姞涓€灞傞槻寰★細鍦?`process.resourcesPath` 璺緞涔嬪锛岄澶栨鏌?`app.getAppPath()` 涓嬬殑鐩稿璺緞浣滀负绗笁浼樺厛绾у洖閫€锛?
```javascript
locateFile: filename => {
  if (filename === "sql-wasm.wasm") {
    // 浼樺厛绾?锛氭墦鍖呭悗鐨?resources 鐩綍锛堝寘鎷?AppX 娌欑洅锛?    const prodPath = path.join(process.resourcesPath, filename);
    if (fs.existsSync(prodPath)) return prodPath;
    // 浼樺厛绾?锛氬紑鍙戠幆澧冪殑 node_modules 鐩綍
    const devPath = path.join(path.dirname(require.resolve("sql.js")), filename);
    if (fs.existsSync(devPath)) return devPath;
    // 浼樺厛绾?锛氬簲鐢ㄥ畨瑁呯洰褰曚笅鐨勭浉瀵硅矾寰勶紙鏌愪簺 AppX 閮ㄧ讲鍦烘櫙锛?    const appPath = path.join(app.getAppPath(), filename);
    if (fs.existsSync(appPath)) return appPath;
    // 鏈€缁堝洖閫€
    return filename;
  }
  return filename;
}
```

---

## 杈撳嚭鏍煎紡

璇蜂緷娆¤緭鍑轰互涓嬩袱涓枃浠剁殑瀹屾暣鍐呭锛岀敤鏂囦欢璺緞浣滀负鏍囬鍒嗛殧锛?
### 鏂囦欢 1锛歚main.js`
锛堣緭鍑?100% 瀹屾暣鐨?main.js 鍏ㄩ噺浠ｇ爜锛?
### 鏂囦欢 2锛歚package.json`
锛堣緭鍑?100% 瀹屾暣鐨?package.json 鍏ㄩ噺浠ｇ爜锛?
---

## 鎵ц瀹屾垚鍚庨渶瑕佹墜鍔ㄨ繍琛岀殑鍛戒护

```bash
npm install
npm start
```

---END PROMPT---



