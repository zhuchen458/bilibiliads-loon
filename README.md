# 哔哩哔哩去广告 · Loon

v6 恢复经过实机抓包验证的分流拦截。开屏广告配置和已识别的视频素材由 Loon 分流规则拦截，无需远程脚本。飞行模式也能出现的广告由 B 站本机已有内容触发，需要在设备上另行处理。

## 先关闭摇一摇跳转

- B 站「我的 → 设置 → 隐私权限设置」里，如果有「允许哔哩哔哩开屏广告访问传感器」，将它关闭。入口名称可能因版本而异。
- 如果 iPhone 有「设置 → 隐私与安全性 → 运动与健身 → 限制动作数据」，将哔哩哔哩加入限制名单。

以上设置针对晃动触发的跳转。联网广告由下面的插件处理。

## 安装和验证

1. [一键导入 v6](https://www.nsloon.com/openloon/import?plugin=https%3A%2F%2Fraw.githubusercontent.com%2Fzhuchen458%2Fbilibiliads-loon%2Fmain%2FBilibiliAds.plugin%3Frev%3Dv6)，启用「哔哩哔哩去广告 · 开屏版 v6」，停用旧版。Loon 使用分流模式，并保持 MitM 开启。首页推荐过滤另外需要开启复写。
2. 联网打开 B 站，在 Loon 请求记录中查看 `app.bilibili.com/x/v2/splash/list` 或 `/show`。命中 v6 的开屏分流规则时，策略为 `REJECT-DICT`，通常返回 `{}`。若仍为 `DIRECT` 并收到广告列表，检查插件和分流模式。
3. 确认拦截生效后再清 B 站缓存，测试一次断网冷启动。若断网仍展示广告，而你需要清除 App 本机旧数据，可在确认本地下载、草稿及登录资料已处理后，从 iOS 选择「删除 App」并重装。iOS 的「卸载 App」会保留文稿和数据。

```text
https://raw.githubusercontent.com/zhuchen458/bilibiliads-loon/main/BilibiliAds.plugin?rev=v6
```

- [Loon HTTP 规则](https://nsloon.app/docs/Rule/http_rule/)
- [Loon 拒绝策略](https://nsloon.app/docs/Policy/)
- [Apple 关于删除 App 和卸载 App 的说明](https://support.apple.com/zh-cn/108429)
