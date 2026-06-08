const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("electronAPI", {
    // ========== 剪贴板 ==========
    listClips: (filters) => ipcRenderer.invoke("clips:list", filters),
    togglePin: (id) => ipcRenderer.invoke("clips:toggle-pin", id),
    deleteClip: (id) => ipcRenderer.invoke("clips:delete", id),
    copyToClipboard: (id) => ipcRenderer.invoke("clips:copy", id),
    batchDelete: (ids) => ipcRenderer.invoke("clips:batch-delete", ids),
    batchPin: (ids) => ipcRenderer.invoke("clips:batch-pin", ids),
    batchTogglePin: (ids) => ipcRenderer.invoke("clips:batch-toggle-pin", ids),
    clearUnpinned: () => ipcRenderer.invoke("clips:clear-unpinned"),
    pinSelectedClips: (ids) => ipcRenderer.invoke("clips:pin-selected", ids),
    deleteAllUnpinned: () => ipcRenderer.invoke("clips:delete-all-unpinned"),

    // ========== 窗口 ==========
    minimizeWindow: () => ipcRenderer.invoke("window:minimize"),
    closeWindow: () => ipcRenderer.invoke("window:close"),
    quitApp: () => ipcRenderer.invoke("app:quit"),
    setAlwaysOnTop: (isAlwaysOnTop) => ipcRenderer.invoke("window:set-always-on-top", isAlwaysOnTop),

    // ========== 事件监听 ==========
    onNewClip: (callback) => {
        ipcRenderer.on("new-clip", (_event, clip) => callback(clip));
    },
    onWindowShown: (callback) => {
        ipcRenderer.on("window-shown", () => callback());
    },
    onSystemThemeChange: (callback) => {
        ipcRenderer.on("system-theme-changed", (_event, theme) => callback(theme));
    },
    // 语言变更监听：当用户在托盘菜单切换语言时，主进程会推送此事件
    onLanguageChanged: (callback) => {
        ipcRenderer.on("language-changed", (_event, code) => callback(code));
    },

    // ========== 设置 ==========
    getAutoStart: () => ipcRenderer.invoke("settings:get-auto-start"),
    setAutoStart: (enable) => ipcRenderer.invoke("settings:set-auto-start", enable),
    getSettings: () => ipcRenderer.invoke("settings:get"),
    // 语言设置
    getLanguage: () => ipcRenderer.invoke("settings:get-language"),
    setLanguage: (code) => ipcRenderer.invoke("settings:set-language", code),

    // ========== 主题 ==========
    getSystemTheme: () => ipcRenderer.invoke("theme:get-system")
});
