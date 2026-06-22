const { app, BrowserWindow, Tray, Menu, globalShortcut, clipboard, nativeImage, ipcMain, nativeTheme } = require("electron");
const path = require("path");
const fs = require("fs");
const clipboardListener = require("clipboard-event");

// ============ sql.js 妯″潡鍋ュ．鍔犺浇 ============
// 浣跨敤 try-catch 鍖呰９ require("sql.js")锛岄槻姝㈠洜渚濊禆缂哄け瀵艰嚧杩涚▼鐩存帴宕╂簝銆?// 鍥犱负鍦?npm install 鏈墽琛屾垨 node_modules 鎹熷潖鏃讹紝require 浼氭姏鍑?MODULE_NOT_FOUND 閿欒锛?// 濡傛灉涓嶅湪椤跺眰鎹曡幏锛屾暣涓繘绋嬩細鍦?app.whenReady() 涔嬪墠灏辩粓姝紝鐢ㄦ埛鐪嬩笉鍒颁换浣曟湁鐢ㄦ彁绀恒€?let initSqlJs = null;
try {
  initSqlJs = require("sql.js");
} catch (err) {
  // 鎵撳嵃閱掔洰鐨勭孩鑹查敊璇锛屾槑纭寚寮曠敤鎴锋墽琛?npm install
  const R = "\x1b[31m";        // ANSI 绾㈣壊鍓嶆櫙
  const X = "\x1b[0m";          // 閲嶇疆鏍峰紡
  console.error(R + "鈺斺晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晽" + X);
  console.error(R + "鈺? 鉂?鑷村懡閿欒锛氭棤娉曞姞杞?sql.js 妯″潡锛?               鈺? + X);
  console.error(R + "鈺?                                                   鈺? + X);
  console.error(R + "鈺? 璇峰厛杩愯 npm install 瀹夎椤圭洰渚濊禆銆?              鈺? + X);
  console.error(R + "鈺? 濡傛灉闂渚濇棫锛岃鍒犻櫎 node_modules 鍚庨噸鏂板畨瑁咃細    鈺? + X);
  console.error(R + "鈺?   rm -rf node_modules && npm install               鈺? + X);
  console.error(R + "鈺氣晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨暆" + X);
}

// ============ i18n 璇█鍖?============
// 鎵€鏈夌晫闈㈡枃鏈泦涓鐞嗭紝閫氳繃 t(key) 鍑芥暟鏍规嵁 settings.language 鍔ㄦ€佽幏鍙栥€?// 娣诲姞鏂拌瑷€鍙渶鍦ㄦ瀵硅薄涓拷鍔犱竴涓瑷€鏉＄洰鍗冲彲銆?const locales = {
  "zh-CN": {
    app_name: "Clippin",
    menu_show: "鏄剧ず/闅愯棌",
    menu_exit: "閫€鍑?,
    menu_auto_start: "寮€鏈鸿嚜鍚?,
    menu_language: "璇█",
    lang_zh_CN: "绠€浣撲腑鏂?,
    lang_zh_TW: "绻侀珨涓枃",
    lang_ja_JP: "鏃ユ湰瑾?,
    lang_en_US: "English"
  },
  "zh-TW": {
    app_name: "Clippin",
    menu_show: "椤ず/闅辫棌",
    menu_exit: "閫€鍑?,
    menu_auto_start: "闁嬫鑷暉",
    menu_language: "瑾炶█",
    lang_zh_CN: "绠€浣撲腑鏂?,
    lang_zh_TW: "绻侀珨涓枃",
    lang_ja_JP: "鏃ユ湰瑾?,
    lang_en_US: "English"
  },
  "ja-JP": {
    app_name: "Clippin",
    menu_show: "琛ㄧず/闈炶〃绀?,
    menu_exit: "绲備簡",
    menu_auto_start: "鑷嫊璧峰嫊",
    menu_language: "瑷€瑾?,
    lang_zh_CN: "绠€浣撲腑鏂?,
    lang_zh_TW: "绻侀珨涓枃",
    lang_ja_JP: "鏃ユ湰瑾?,
    lang_en_US: "English"
  },
  "en-US": {
    app_name: "Clippin",
    menu_show: "Show/Hide",
    menu_exit: "Exit",
    menu_auto_start: "Start with Windows",
    menu_language: "Language",
    lang_zh_CN: "绠€浣撲腑鏂?,
    lang_zh_TW: "绻侀珨涓枃",
    lang_ja_JP: "鏃ユ湰瑾?,
    lang_en_US: "English"
  }
};

// 鏍规嵁褰撳墠璇█杩斿洖瀵瑰簲缈昏瘧鏂囨湰锛屾壘涓嶅埌鏃跺洖閫€鍒拌嫳鏂囷紝鍐嶆壘涓嶅埌杩斿洖 key 鏈韩
function t(key) {
  const lang = settings.language || "en-US";
  const dict = locales[lang] || locales["en-US"];
  return dict[key] || (locales["en-US"][key] || key);
}

// ============ CONFIG ============
let isQuitting = false;
let mainWindow = null;
let tray = null;
// 榛樿璇█涓鸿嫳鏂囷紝棣栨鍚姩鍚庣敤鎴峰彲鍒囨崲
let settings = { autoStart: false, language: "en-US" };
let db = null;

// ============ PATHS ============
const userDataPath = app.getPath("userData");
const settingsPath = path.join(userDataPath, "settings.json");
const dbPath = path.join(userDataPath, "clippin.db");

// ============ SETTINGS ============
function loadSettings() {
  try {
    if (fs.existsSync(settingsPath)) {
      settings = JSON.parse(fs.readFileSync(settingsPath, "utf8"));
    }
  } catch (e) { settings = { autoStart: false, language: "en-US" }; }
  // 纭繚 language 瀛楁瀛樺湪锛堝吋瀹规棫鐗堟湰閰嶇疆鏂囦欢锛?  if (!settings.language) settings.language = "en-US";
}

function saveSettings() {
  fs.writeFileSync(settingsPath, JSON.stringify(settings, null, 2));
}

// 淇敼寮€鏈鸿嚜鍚缃悗鑷姩鍒锋柊鎵樼洏鑿滃崟锛岀‘淇濆閫夋鐘舵€佸悓姝?function setAutoStart(enable) {
  settings.autoStart = enable;
  saveSettings();
  // AppX 娌欑洅鐜涓?app.setLoginItemSettings() 浼氳绯荤粺闅旂锛屼粎鎸佷箙鍖?autoStart 瀛楁
  if (!process.windowsStore) {
    app.setLoginItemSettings({
      openAtLogin: enable,
      path: process.execPath,
      args: app.isPackaged ? [] : [__dirname]
    });
  }
  updateTrayMenu();
}

// ============ DATABASE ============
// sql.js 鐨?initSqlJs 鏄竴涓紓姝ュ伐鍘傚嚱鏁帮紝瀹冮渶瑕佸厛涓嬭浇/瀹氫綅 WebAssembly 浜岃繘鍒舵枃浠?(sql-wasm.wasm)锛?// 鐒跺悗鎵嶈兘瀹炰緥鍖?SQL 寮曟搸銆傚洜姝?initDatabase 蹇呴』鏄?async 鍑芥暟锛岀‘淇?WASM 灏辩华鍚庡啀鍒涘缓鏁版嵁搴撱€?async function initDatabase() {
  const SQL = await initSqlJs({
    // locateFile: 鑷€傚簲 WASM 鏂囦欢璺緞瑙ｆ瀽
    // 鐢熶骇鐜 (鎵撳寘鍚?.exe)锛歱rocess.resourcesPath 涓嬪寘鍚€氳繃 extraResources 鎷疯礉鐨?sql-wasm.wasm
    // 寮€鍙戠幆澧?(npm start)锛氫粠 node_modules/sql.js/dist/ 鐩綍涓姞杞?    locateFile: filename => {
      if (filename === "sql-wasm.wasm") {
        // 浼樺厛绾?锛氭鏌ユ墦鍖呭悗鐨?resources 鐩綍锛堝寘鎷?AppX 娌欑洅锛?        const prodPath = path.join(process.resourcesPath, filename);
        if (fs.existsSync(prodPath)) return prodPath;
        // 浼樺厛绾?锛氬洖閫€鍒板紑鍙戠幆澧冪殑 node_modules 鐩綍
        const devPath = path.join(path.dirname(require.resolve("sql.js")), filename);
        if (fs.existsSync(devPath)) return devPath;
        // 浼樺厛绾?锛氬簲鐢ㄥ畨瑁呯洰褰曚笅鐨勭浉瀵硅矾寰勶紙鏌愪簺 AppX 閮ㄧ讲鍦烘櫙锛?        const appPath = path.join(app.getAppPath(), filename);
        if (fs.existsSync(appPath)) return appPath;
        // 鏈€缁堝洖閫€
        return filename;
      }
      return filename;
    }
  });
  let dbInstance;
  if (fs.existsSync(dbPath)) {
    const buffer = fs.readFileSync(dbPath);
    dbInstance = new SQL.Database(buffer);
  } else {
    dbInstance = new SQL.Database();
  }
  // WAL 妯″紡鎻愬崌骞跺彂璇诲啓鎬ц兘锛屽悓鏃朵繚璇佹暟鎹畨鍏?  dbInstance.run("PRAGMA journal_mode=WAL");
  dbInstance.run(`
    CREATE TABLE IF NOT EXISTS clips (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      text TEXT NOT NULL,
      pinned INTEGER DEFAULT 0,
      created_at TEXT
    )
  `);

  // ========== 鍔熻兘1锛氭敞鍐岃嚜瀹氫箟 REGEXP 鍑芥暟 ==========
  // sql.js 榛樿涓嶆敮鎸?SQLite 鐨?REGEXP 璇硶锛岄€氳繃 create_function 娉ㄥ叆 JS 瀹炵幇銆?  // 姝ｅ垯鍖归厤涓嶅尯鍒嗗ぇ灏忓啓锛岄潪娉曟鍒欒〃杈惧紡浼氬畨鍏ㄦ崟鑾峰苟杩斿洖 0锛堜笉鍖归厤锛夛紝闃叉寮曟搸宕╂簝銆?  try {
    dbInstance.create_function("regexp", (regexStr, text) => {
      try {
        if (!text) return 0;
        const regex = new RegExp(regexStr, "i");
        return regex.test(text) ? 1 : 0;
      } catch (e) {
        // 姝ｅ垯琛ㄨ揪寮忚娉曢敊璇椂杩斿洖 0锛屼笉鎶涘紓甯镐繚璇?SQL 鏌ヨ缁х画鎵ц
        return 0;
      }
    });
  } catch (e) {
    console.error("娉ㄥ唽 regexp 鍑芥暟澶辫触:", e.message);
  }

  return dbInstance;
}

function saveDatabase() {
  if (!db) return;
  // db.export() 杩斿洖鏁翠釜鏁版嵁搴撶殑浜岃繘鍒舵暟鎹?(Uint8Array)锛岀洿鎺ュ啓鍏ョ鐩樺嵆鍙寔涔呭寲
  const data = db.export();
  fs.writeFileSync(dbPath, Buffer.from(data));
}

function dbInsert(text) {
  db.run("INSERT INTO clips (text, created_at) VALUES (?, datetime(\"now\",\"localtime\"))", [text]);
  const result = db.exec("SELECT last_insert_rowid() as id");
  const id = result[0].values[0][0];
  saveDatabase();
  return dbGetById(id);
}

function dbDelete(id) {
  db.run("DELETE FROM clips WHERE id = ?", [id]);
  saveDatabase();
}

function dbTogglePin(id) {
  db.run("UPDATE clips SET pinned = CASE WHEN pinned = 1 THEN 0 ELSE 1 END WHERE id = ?", [id]);
  saveDatabase();
  return dbGetById(id);
}

function dbGetById(id) {
  const stmt = db.prepare("SELECT * FROM clips WHERE id = ?");
  stmt.bind([id]);
  if (stmt.step()) {
    const row = stmt.getAsObject();
    stmt.free();
    return row;
  }
  stmt.free();
  return null;
}

function dbQuery(filters = {}) {
  const { page = 1, limit = 20, date = "all", search = "", sort = "pinned-first", isRegex = false } = filters;
  const offset = (parseInt(page) - 1) * parseInt(limit);

  let whereClause = "";
  const params = [];

  if (search) {
    if (isRegex) {
      whereClause += "AND regexp(?, text) ";
      params.push(search);
    } else {
      whereClause += "AND text LIKE ? ";
      params.push("%" + search + "%");
    }
  }

  if (date && date !== "all") {
    const now = new Date();
    const pad = (n) => String(n).padStart(2, "0");
    const fmt = (d) => d.getFullYear() + "-" + pad(d.getMonth() + 1) + "-" + pad(d.getDate());

    if (date === "today") {
      const s = fmt(now) + " 00:00:00";
      const t = new Date(now); t.setDate(t.getDate() + 1);
      const e = fmt(t) + " 00:00:00";
      whereClause += "AND created_at >= ? AND created_at < ? ";
      params.push(s, e);
    } else if (date === "yesterday") {
      const d = new Date(now); d.setDate(d.getDate() - 1);
      const s = fmt(d) + " 00:00:00";
      const e = fmt(now) + " 00:00:00";
      whereClause += "AND created_at >= ? AND created_at < ? ";
      params.push(s, e);
    } else if (date === "daybefore") {
      const d = new Date(now); d.setDate(d.getDate() - 2);
      const y = new Date(now); y.setDate(y.getDate() - 1);
      const s = fmt(d) + " 00:00:00";
      const e = fmt(y) + " 00:00:00";
      whereClause += "AND created_at >= ? AND created_at < ? ";
      params.push(s, e);
    } else if (date === "3day") {
      const d = new Date(now); d.setDate(d.getDate() - 7);
      const y = new Date(now); y.setDate(y.getDate() - 2);
      const s = fmt(d) + " 00:00:00";
      const e = fmt(y) + " 00:00:00";
      whereClause += "AND created_at >= ? AND created_at < ? ";
      params.push(s, e);
    }
  }

  const orderBy = sort === "pinned-first" ? "pinned DESC, created_at DESC" : "created_at DESC";

  const countStmt = db.prepare("SELECT COUNT(*) as total FROM clips WHERE 1=1 " + whereClause);
  countStmt.bind(params);
  countStmt.step();
  const total = countStmt.getAsObject().total;
  countStmt.free();

  const queryStmt = db.prepare(
    "SELECT * FROM clips WHERE 1=1 " + whereClause + " ORDER BY " + orderBy + " LIMIT ? OFFSET ?"
  );
  const allParams = [...params, parseInt(limit), offset];
  queryStmt.bind(allParams);

  const rows = [];
  while (queryStmt.step()) {
    rows.push(queryStmt.getAsObject());
  }
  queryStmt.free();

  return { rows, total };
}

// ========== 鍔熻兘2锛氬唴瀹规櫤鑳藉垎绫绘爣绛?==========
// 鍚彂寮忔娴嬪壀璐存澘鍐呭鐨勭被鍨嬶紝杩斿洖瀵瑰簲鍒嗙被瀛楃涓层€?// 妫€娴嬩紭鍏堢骇浠庨珮鍒颁綆锛歭ink > email > phone > code > number > text
function detectType(text) {
  if (!text || typeof text !== "string") return "text";
  const t = text.trim();
  if (!t) return "text";

  // 1) 閾炬帴锛氫互 http:// 鎴?https:// 寮€澶达紝鎴栧尮閰嶅父瑙佸煙鍚嶆牸寮?  if (/^https?:\/\//i.test(t) || /^[a-zA-Z0-9][-a-zA-Z0-9]*\.[a-zA-Z]{2,}(\/|$)/.test(t)) {
    return "link";
  }

  // 2) 閭锛氭爣鍑?email 鏍煎紡
  if (/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(t)) {
    return "email";
  }

  // 3) 鐢佃瘽锛氬浗鍐呮墜鏈哄彿锛? 寮€澶?11 浣嶏級鎴栧甫鍖哄彿鐨勫浐瀹氱數璇?  if (/^1[3-9]\d{9}$/.test(t.replace(/[\s\-()锛堬級]/g, "")) ||
      /^0\d{2,3}[-\s]?\d{7,8}$/.test(t.replace(/[\s\-()锛堬級]/g, ""))) {
    return "phone";
  }

  // 4) 绾暟瀛楋紙鏁存暟鎴栨诞鐐规暟锛屽彲鑳藉甫绗﹀彿锛?  if (/^[+-]?(\d+\.?\d*|\.\d+)$/.test(t)) {
    return "number";
  }

  // 5) 浠ｇ爜鐗瑰緛锛氬寘鍚姳鎷彿 + 甯歌缂栫▼鍏抽敭瀛楋紝鎴栧琛屼互鍒嗗彿缁撳熬
  const codeKeywords = /\b(const|let|var|function|import|export|return|public|private|class|if|for|while|switch|try|catch|require|module|extends|implements|interface|async|await|yield|throw|new|delete|typeof|instanceof|void|this|super|static|get|set|enum|namespace|type|interface|def|print|select|from|where|insert|update|delete|create|alter|drop)\b/i;
  const hasBraces = /[{}]/.test(t);
  const hasSemicolons = /;/.test(t) && t.split("\n").filter(l => l.trim().endsWith(";")).length >= 2;
  const hasIndentation = /^[ \t]{2,}/m.test(t);

  if ((hasBraces && codeKeywords.test(t)) || hasSemicolons || (hasIndentation && codeKeywords.test(t))) {
    return "code";
  }

  // 6) 榛樿鏂囨湰
  return "text";
}

function formatClip(row) {
  const now = new Date();
  const d = new Date(row.created_at);
  // Compare by calendar date boundary, not elapsed hours
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const created = new Date(d.getFullYear(), d.getMonth(), d.getDate());
  const diffDays = Math.floor((today - created) / (1000 * 60 * 60 * 24));
  let dateGroup = "older";
  if (diffDays === 0) dateGroup = "today";
  else if (diffDays === 1) dateGroup = "yesterday";
  else if (diffDays === 2) dateGroup = "daybefore";
  else if (diffDays <= 7) dateGroup = "3day";
  return {
    id: row.id,
    text: row.text,
    pinned: !!row.pinned,
    dateGroup: dateGroup,
    createdAt: row.created_at,
    type: detectType(row.text)
  };
}

// ============ IPC HANDLERS ============
ipcMain.handle("clips:list", (_, filters) => {
  const { rows, total } = dbQuery(filters);
  const data = rows.map(formatClip);
  return { data, total, page: parseInt(filters.page || 1), limit: parseInt(filters.limit || 20) };
});

ipcMain.handle("clips:create", (_, text) => {
  if (!text || !text.trim()) throw new Error("content empty");
  return formatClip(dbInsert(text.trim()));
});

ipcMain.handle("clips:delete", (_, id) => {
  dbDelete(id);
  return { success: true };
});

ipcMain.handle("clips:toggle-pin", (_, id) => {
  return formatClip(dbTogglePin(id));
});

ipcMain.handle("clips:copy", (_, id) => {
  const clip = dbGetById(id);
  if (!clip) throw new Error("not found");
  // 鍚屾鏇存柊鏃堕棿鎴冲拰 lastClipboardText锛岀‘淇?fetchClips 绔嬪嵆鎷垮埌鏈€鏂版帓搴?  lastClipboardText = clip.text;
  db.run("UPDATE clips SET created_at = datetime(\"now\",\"localtime\") WHERE id = ?", [id]);
  saveDatabase();
  clipboard.writeText(clip.text);
  return { success: true };
});

ipcMain.handle("clips:batch-delete", async (_, ids) => {
  ids.forEach(id => db.run("DELETE FROM clips WHERE id = ?", [id]));
  saveDatabase();
  return { success: true };
});

ipcMain.handle("clips:batch-pin", async (_, ids) => {
  ids.forEach(id => db.run("UPDATE clips SET pinned = 1 WHERE id = ?", [id]));
  saveDatabase();
  return { success: true };
});

ipcMain.handle("clips:clear-unpinned", async () => {
  db.run("DELETE FROM clips WHERE pinned = 0");
  saveDatabase();
  return { success: true };
});

ipcMain.handle("clips:batch-toggle-pin", async (_, ids) => {
  ids.forEach(id => db.run("UPDATE clips SET pinned = CASE WHEN pinned = 1 THEN 0 ELSE 1 END WHERE id = ?", [id]));
  saveDatabase();
  return { success: true };
});

ipcMain.handle("clips:pin-selected", async (_, ids) => {
  ids.forEach(id => db.run("UPDATE clips SET pinned = 1 WHERE id = ?", [id]));
  saveDatabase();
  return { success: true };
});

ipcMain.handle("clips:delete-all-unpinned", async () => {
  db.run("DELETE FROM clips WHERE pinned = 0");
  saveDatabase();
  return { success: true };
});

ipcMain.handle("window:minimize", () => {
  if (mainWindow) mainWindow.minimize();
});

ipcMain.handle("window:close", () => {
  if (mainWindow) mainWindow.hide();
});

// 绐楀彛缃《鍒囨崲锛堝搴?UI 椤堕儴澶уご閽夋寜閽級
ipcMain.handle("window:set-always-on-top", (_, flag) => {
  if (mainWindow && !mainWindow.isDestroyed()) {
    mainWindow.setAlwaysOnTop(!!flag);
    return flag;
  }
  return false;
});

ipcMain.handle("app:quit", () => {
  isQuitting = true;
  app.quit();
});

ipcMain.handle("settings:get", () => settings);

ipcMain.handle("settings:get-auto-start", () => settings.autoStart);

ipcMain.handle("settings:set-auto-start", (_, enable) => {
  setAutoStart(enable);
  return settings.autoStart;
});

// 璇█鍒囨崲锛氭寔涔呭寲璁剧疆骞堕噸寤烘墭鐩樿彍鍗曪紝鍚屾椂閫氱煡娓叉煋杩涚▼鍒锋柊鐣岄潰
ipcMain.handle("settings:set-language", (_, code) => {
  const validLangs = ["zh-CN", "zh-TW", "ja-JP", "en-US"];
  if (!validLangs.includes(code)) return settings.language;
  settings.language = code;
  saveSettings();
  setImmediate(() => updateTrayMenu());  // 寤惰繜閲嶅缓锛岄伩鍏嶄笌褰撳墠鑿滃崟浜や簰鍐茬獊
  // 閫氱煡娓叉煋杩涚▼璇█宸插彉鏇达紝UI 灞傚簲鐩戝惉 "language-changed" 骞跺埛鏂版枃鏈?  if (mainWindow && !mainWindow.isDestroyed()) {
    mainWindow.webContents.send("language-changed", code);
  }
  return code;
});

ipcMain.handle("settings:get-language", () => settings.language);


// ============ 7-DAY AUTO CLEANUP ============
function cleanupOldClips() {
  try {
    const cutoff = new Date();
    cutoff.setDate(cutoff.getDate() - 7);
    const pad = (n) => String(n).padStart(2, "0");
    const cutoffStr = cutoff.getFullYear() + "-" + pad(cutoff.getMonth() + 1) + "-" + pad(cutoff.getDate()) + " 00:00:00";
    db.run("DELETE FROM clips WHERE pinned = 0 AND created_at < ?", [cutoffStr]);
    saveDatabase();
  } catch (e) { }
}

// ============ CLIPBOARD MONITOR (浜嬩欢椹卞姩) ============
let lastClipboardText = "";

function startClipboardMonitor() {
  // 鍚姩鍩轰簬 Windows AddClipboardFormatListener API 鐨勪簨浠堕┍鍔ㄧ洃鍚紙闆?CPU 杞锛?  clipboardListener.startListening();
  clipboardListener.on("change", () => {
    try {
      const text = clipboard.readText();
      if (text && text !== lastClipboardText) {
        lastClipboardText = text;
        // 妫€鏌ユ槸鍚﹀凡瀛樺湪鐩稿悓鏂囨湰锛堥伩鍏嶄粠鍘嗗彶澶嶅埗鏃朵骇鐢熼噸澶嶏級
        const stmt = db.prepare("SELECT id, pinned FROM clips WHERE text = ? ORDER BY created_at DESC LIMIT 1");
        stmt.bind([text]);
        let existingId = null;
        if (stmt.step()) {
          existingId = stmt.getAsObject().id;
        }
        stmt.free();

        let clip;
        if (existingId !== null) {
          // 宸插瓨鍦細鏇存柊鏃堕棿鎴筹紝绉诲埌鏈疆椤跺唴瀹圭殑鏈€涓婃柟
          db.run("UPDATE clips SET created_at = datetime(\"now\",\"localtime\") WHERE id = ?", [existingId]);
          saveDatabase();
          clip = formatClip(dbGetById(existingId));
        } else {
          clip = formatClip(dbInsert(text));
        }
        if (mainWindow && !mainWindow.isDestroyed()) {
          mainWindow.webContents.send("new-clip", clip);
        }
      }
    } catch (e) { }
  });
}

// ============ WINDOW ============
function createWindow() {
  mainWindow = new BrowserWindow({
    width: 460,
    height: 380,
    minWidth: 360,
    minHeight: 240,
    show: false,
    frame: false,
    transparent: true,
    backgroundColor: "#00000000",
    resizable: true,
    skipTaskbar: false,
    title: "Clippin",
    icon: path.join(__dirname, "assets", "icon.png"),
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      contextIsolation: true,
      nodeIntegration: false
    }
  });

  mainWindow.loadFile(path.join(__dirname, "pinclip-ui.html"));

  nativeTheme.on("updated", () => {
    if (mainWindow && !mainWindow.isDestroyed()) {
      mainWindow.webContents.send("system-theme-changed", nativeTheme.shouldUseDarkColors ? "dark" : "light");
    }
  });
  // if (!app.isPackaged) mainWindow.webContents.openDevTools();

  mainWindow.webContents.on("did-finish-load", () => {
    mainWindow.webContents.insertCSS(`
      .taskbar, .system-tray { display: none !important; }
      .titlebar { -webkit-app-region: drag; }
      .titlebar input, .titlebar button, .titlebar .dropdown, .titlebar .dropdown-item,
      .titlebar .date-selector, .titlebar .title-pin-btn, .titlebar .search-box, .titlebar .window-controls, .titlebar .control-btn { -webkit-app-region: no-drag; }
    `);

  });

  mainWindow.on("close", (e) => {
    if (!isQuitting) {
      e.preventDefault();
      mainWindow.hide();
    }
  });
}

function toggleWindow() {
  if (!mainWindow || mainWindow.isDestroyed()) {
    createWindow();
    // 绐楀彛浠?show:false 鍒涘缓锛岀敤鎴蜂富鍔ㄨЕ鍙戞椂闇€鍦?ready-to-show 鍚庢樉绀?    mainWindow.once('ready-to-show', () => {
      mainWindow.show();
      mainWindow.focus();
      mainWindow.webContents.send("window-shown");
    });
    return;
  }
  if (mainWindow.isVisible()) {
    mainWindow.hide();
  } else {
    mainWindow.show();
    mainWindow.focus();
    mainWindow.webContents.send("window-shown");
  }
}

// ============ TRAY ============
function createTray() {
  const icon = nativeImage.createFromPath(
    path.join(__dirname, "assets", "tray-icon.png")
  );
  tray = new Tray(icon);
  tray.setToolTip("Clippin");
  updateTrayMenu();
  tray.on("click", toggleWindow);
}

// 鎵樼洏鍙抽敭鑿滃崟锛氭墍鏈夋爣绛鹃€氳繃 t() 鍑芥暟瀹炵幇鍥介檯鍖栥€?// 鑿滃崟缁撴瀯锛氭樉绀?闅愯棌 鈫?寮€鏈鸿嚜鍚?澶嶉€夋) 鈫?璇█(瀛愯彍鍗?鍗曢€? 鈫?閫€鍑?function updateTrayMenu() {
  // 鍥涚鏀寔鐨勮瑷€锛岃瑷€鍚嶇О閫氳繃 t("lang_xx_XX") 鑾峰彇锛堣瑷€鍖呬腑鐨?key 浣跨敤涓嬪垝绾匡級
  const langList = ["zh-CN", "zh-TW", "ja-JP", "en-US"];

  const contextMenu = Menu.buildFromTemplate([
    {
      label: t("menu_show") + " Clippin",
      click: toggleWindow
    },
    { type: "separator" },
    {
      label: t("menu_auto_start"),
      type: "checkbox",
      checked: settings.autoStart,
      click: (item) => { setAutoStart(item.checked); }
    },
    {
      label: t("menu_language"),
      submenu: langList.map(code => ({
        label: t("lang_" + code.replace(/-/g, "_")),
        type: "radio",
        checked: settings.language === code,
        click: () => {
          settings.language = code;
          saveSettings();
          setImmediate(() => updateTrayMenu());  // 寤惰繜鍒板綋鍓嶈彍鍗曞叧闂悗鍐嶉噸寤猴紝閬垮厤 Windows 涓嬫浛鎹㈠啿绐?          // 閫氱煡娓叉煋杩涚▼鍚屾鏇存柊鐣岄潰璇█
          if (mainWindow && !mainWindow.isDestroyed()) {
            mainWindow.webContents.send("language-changed", code);
          }
        }
      }))
    },
    { type: "separator" },
    {
      label: t("menu_exit"),
      click: () => { isQuitting = true; app.quit(); }
    }
  ]);
  tray.setContextMenu(contextMenu);
}

// ============ APP LIFECYCLE ============
app.whenReady().then(async () => {
  Menu.setApplicationMenu(null);

  // 濡傛灉 sql.js 鍔犺浇澶辫触锛屽畨鍏ㄩ€€鍑轰互閬垮厤鍚庣画浠ｇ爜璁块棶 null 寮曠敤瀵艰嚧浜屾宕╂簝
  if (!initSqlJs) {
    console.error("\x1b[31m鈿?搴旂敤鍗冲皢閫€鍑猴細sql.js 渚濊禆缂哄け锛岃杩愯 npm install 鍚庨噸璇曘€俓x1b[0m");
    app.quit();
    return;
  }

  loadSettings();
  createWindow();
  createTray();

  globalShortcut.register("Ctrl+Shift+V", toggleWindow);

  // 寮€鏈鸿嚜鍚細AppX 娌欑洅鐜涓嬩粎鎸佷箙鍖?autoStart 瀛楁锛屼笉璋冪敤绯荤粺 API
  if (settings.autoStart) {
    if (!process.windowsStore) {
      app.setLoginItemSettings({ openAtLogin: true, path: process.execPath, args: app.isPackaged ? [] : [__dirname] });
    }
  }

  // 闈欓粯鍚姩妫€娴嬶細--startup 鍙傛暟琛ㄧず鐢辩郴缁熷紑鏈鸿嚜鍚Е鍙戯紝绐楀彛淇濇寔闅愯棌鎬?  const isStartupLaunch = process.argv.includes("--startup");
  if (!isStartupLaunch) {
    // 鏅€氬弻鍑诲惎鍔細鍦ㄩ〉闈㈡覆鏌撳氨缁悗鏄剧ず绐楀彛
    mainWindow.once('ready-to-show', () => {
      mainWindow.show();
    });
  }
  // 寮€鏈鸿嚜鍚惎鍔細绐楀彛淇濇寔闅愯棌锛坰how: false锛夛紝浠呮墭鐩橀┗鐣?
  // 寮傛鍒濆鍖栨暟鎹簱锛屼笉闃诲绐楀彛鏄剧ず
  db = await initDatabase();
  cleanupOldClips();
  startClipboardMonitor();
});

app.on("window-all-closed", (e) => {
  e.preventDefault();
});

app.on("before-quit", () => {
  isQuitting = true;
  globalShortcut.unregisterAll();
  saveDatabase();
});

app.on("will-quit", () => {
  clipboardListener.stopListening();
  if (db) db.close();
})
