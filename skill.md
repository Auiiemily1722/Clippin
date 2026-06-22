# Clippin Microsoft Store 发布助手

本文件记录 Clippin 项目的商店发布上下文，供后续继续上架流程时快速恢复状态。

## 项目状态

- 产品名称：`Clippin`
- 桌面框架：Electron
- 主进程文件：`main.js`
- 渲染界面文件：`clippin-ui.html`
- 隐私政策文件：`privacy-policy.html`
- GitHub Pages 隐私政策：`docs/privacy-policy.html`
- 用户手册：`Clippin_User_Guide.pdf`

## Microsoft Store 身份

- Package/Identity/Name：`auiie.Clippin`
- Package/Identity/Publisher：`CN=61262BB7-F097-446C-84E0-2FAD8CD5A68C`
- PublisherDisplayName：`auiie`

## 发布命令

```bash
npm run build:store
```

生成 AppX 后，在 Partner Center 的“程序包”页面上传并等待验证通过。

## 注意事项

- 不要随意修改 Partner Center 的付款、税务、身份验证信息。
- 隐私政策应说明剪贴板数据保存在本地，不上传服务器。
- 上架前确保 Store 一览、年龄分级、价格和可用性均保存完成。
