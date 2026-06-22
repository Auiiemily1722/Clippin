# Clippin Microsoft Store 发布检查提示

这份文件用于记录 Clippin 上架 Microsoft Store 前的关键检查点，避免在发布前遗漏打包、隐私和品牌一致性问题。

## 品牌与入口

- 应用公开名称统一为 `Clippin`。
- Electron 主进程入口为 `main.js`。
- 渲染界面文件为 `clippin-ui.html`。
- Microsoft Store 包身份使用 Partner Center 提供的正式值。

## 发布前检查

1. `package.json` 可以被 Node 正常解析。
2. `build.productName` 为 `Clippin`。
3. `build.appx.displayName` 为 `Clippin`。
4. `build.appx.identityName` 为 `auiie.Clippin`。
5. `build.appx.publisher` 与 Partner Center 中的 Publisher 完全一致。
6. 隐私政策 URL 可以公开访问。
7. README、隐私政策、用户手册中的公开品牌均为 `Clippin`。

## 构建命令

```bash
npm install
npm run build:store
```

生成的 AppX 包应位于 `dist/` 目录，并在 Microsoft Partner Center 的程序包页面上传验证。
