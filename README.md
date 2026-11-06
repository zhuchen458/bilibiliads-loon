# 哔哩哔哩去广告 · Loon

v6 用 Loon 分流规则拦截联网开屏广告配置和已识别的视频素材，无需远程脚本。

## 已有广告的排查

实机抓包中，`/x/v2/splash/list`、`/show` 和 `/brand/list` 共 14 条请求均命中 `REJECT-DICT`，只收到 `{}`。同一份记录中，B 站仍上报了开屏视频播放和缓存事件，广告上报中的素材路径与早先下载的京东开屏广告配置一致。飞行模式下也出现了广告。Loon 能挡住这些接口重新下载广告，已存进 B 站本机数据的素材需要从设备端清理。

## 先关闭摇一摇跳转

- B 站「我的 → 设置 → 隐私权限设置」里，如果有「允许哔哩哔哩开屏广告访问传感器」，将它关闭。入口名称可能因版本而异。
- 如果 iPhone 有「设置 → 隐私与安全性 → 运动与健身 → 限制动作数据」，将哔哩哔哩加入限制名单。

以上设置针对晃动触发的跳转。联网广告由下面的插件处理。

## 安装和验证

1. [一键导入 v6](https://www.nsloon.com/openloon/import?plugin=https%3A%2F%2Fraw.githubusercontent.com%2Fzhuchen458%2Fbilibiliads-loon%2Fmain%2FBilibiliAds.plugin%3Frev%3Dv6)，启用「哔哩哔哩去广告 · 开屏版 v6」，停用旧版。Loon 使用分流模式，并保持 MitM 开启。首页推荐过滤另外需要开启复写。
2. 联网打开 B 站，在 Loon 请求记录中查看 `app.bilibili.com/x/v2/splash/list` 或 `/show`。命中 v6 的开屏分流规则时，策略为 `REJECT-DICT`，通常返回 `{}`。若仍为 `DIRECT` 并收到广告列表，检查插件和分流模式。
3. 确认拦截生效后，先用 B 站内的清理缓存功能，再断网冷启动。如果此前已清过缓存，且断网仍出现广告，可以先保存需要保留的本地草稿、下载和登录资料，再用 iOS 的「删除 App」后重装。「卸载 App」会保留文稿和数据。
4. 装好后先别打开 B 站。关闭 Wi‑Fi 和蜂窝网络，测试第一次打开时是否还有广告。随后恢复联网，保持 v6 启用，再冷启动验证。若全新安装后的首次断网启动仍出现同一广告，记录画面和是否真的唤起外部 App，这种情况下开屏请求的抓包无法定位本机展示逻辑。

```text
https://raw.githubusercontent.com/zhuchen458/bilibiliads-loon/main/BilibiliAds.plugin?rev=v6
```

- [Loon HTTP 规则](https://nsloon.app/docs/Rule/http_rule/)
- [Loon 拒绝策略](https://nsloon.app/docs/Policy/)
- [Apple 关于删除 App 和卸载 App 的说明](https://support.apple.com/zh-cn/108429)
