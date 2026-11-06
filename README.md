# 哔哩哔哩去广告 · Loon

适用于 iPhone 上的哔哩哔哩。插件清理已知 JSON 开屏接口下发的广告素材和展示列表，广告项里的摇一摇及外跳配置也会一并移除。首页推荐按明确的广告标记过滤推广卡片和横幅。

## 安装

1. 使用 Loon **3.5.1 (978)** 或更新版本。
2. 在 Loon 的插件页面添加远程插件，粘贴下方地址并启用。
3. 开启复写和 MitM，安装并在 iOS「设置 → 通用 → 关于本机 → 证书信任设置」里完全信任自己生成的 Loon 证书。
4. 从多任务界面划掉哔哩哔哩，重新打开。如果还出现之前的开屏广告，可先用哔哩哔哩的「清理缓存」，再重新打开两次。

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

## 参考

- [Loon 复写文档](https://nsloon.app/docs/Rewrite/rewrite_v2/)
- [公开的 B 站开屏接口结构](https://github.com/Kaangnakamuyi/MisakaMikoto/blob/master/docs/APP_widget/splash.md)
- [app2smile 的 B 站 JSON 接口和广告卡片参考](https://github.com/app2smile/rules/blob/master/js/bilibili-json.js)
