# 哔哩哔哩去广告 · Loon

适用于 iPhone 上的哔哩哔哩。实机抓包显示，开屏 `/x/v2/splash/list` 会返回包含京东跳转及摇动参数的广告项。插件对广告预取、展示和品牌开屏直接返回空列表，不依赖解压或解析服务器的大响应。开屏活动接口保留账户状态，只清空活动列表。首页继续按明确的广告标记过滤推广卡片和横幅。

## 安装

1. 使用 Loon **3.5.1 (978)** 或更新版本。
2. 已安装的用户在 Loon 插件页面手动更新本插件。首次安装时，添加下方远程地址并启用。
3. 开启复写和 MitM，安装并在 iOS「设置 → 通用 → 关于本机 → 证书信任设置」里完全信任自己生成的 Loon 证书。
4. 在哔哩哔哩里清理缓存，从多任务界面划掉 App 后重新打开。已有的开屏素材可能来自旧缓存。

```text
https://raw.githubusercontent.com/zhuchen458/bilibiliads-loon/main/BilibiliAds.plugin
```

## 覆盖范围

| 场景 | 接口 |
| --- | --- |
| 开屏广告与外跳配置 | `/x/v2/splash/list`、`/x/v2/splash/show`、`/x/v2/splash/event/list2`、`/x/v2/splash/brand/list` |
| 首页推荐 | `/x/v2/feed/index` |

规则只匹配 `app.bilibili.com` 和 `app.biliapi.net` 的对应 HTTPS GET 请求。京东域名不在复写或 MitM 范围内。iOS 本地唤起 App 的动作可能没有独立 HTTP 请求，因此插件在 B 站下发广告配置时处理。当前覆盖 JSON 接口，gRPC 和其他广告位需以实际抓包确认。

如果手机仍然能复现摇一摇跳转，导出一次从冷启动到跳转的 Loon 记录，优先保留命中的 `splash` 请求路径和响应正文。分享前请移除 Cookie、Authorization、access_key、设备标识和签名。

## 确认规则命中

在 Loon 请求记录中打开 `app.bilibili.com/x/v2/splash/list` 或 `/x/v2/splash/show`。命中后响应头会出现 `X-BilibiliAds-Loon: splash-v2`，正文对应的广告列表为 `[]`。如果看到原始广告列表，检查插件是否已经更新，复写和 MitM 是否开启，以及是否还有其他插件处理同一开屏接口。

## 参考

- [Loon 复写文档](https://nsloon.app/docs/Rewrite/rewrite_v2/)
- [公开的 B 站开屏接口结构](https://github.com/Kaangnakamuyi/MisakaMikoto/blob/master/docs/APP_widget/splash.md)
- [app2smile 的 B 站 JSON 接口和广告卡片参考](https://github.com/app2smile/rules/blob/master/js/bilibili-json.js)
