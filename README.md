# 哔哩哔哩去广告 · Loon

抓包确认，iPhone 版 B 站会在 `/x/v2/splash/list` 下发京东直跳地址和摇动参数。插件对开屏广告列表、展示列表和品牌开屏返回同结构的空数据，避免继续下载广告配置。v3 使用 Loon 经典复写语法，所有开屏 Mock 数据都在插件里。

## 安装

1. 打开 [一键导入 Loon](https://www.nsloon.com/openloon/import?plugin=https%3A%2F%2Fraw.githubusercontent.com%2Fzhuchen458%2Fbilibiliads-loon%2Fmain%2FBilibiliAds.plugin%3Frev%3Dv3)。也可以在 Loon 手动添加下方地址。
2. 确认插件列表里显示并启用了「哔哩哔哩去广告 · 开屏兼容版 v3」。如果有旧版或同类开屏去广告插件，测试时先停用，避免重复复写。
3. 开启 Loon 的复写和 MitM。已经能抓到 `app.bilibili.com` 的 HTTPS 响应正文时，证书已对这条流量生效。
4. 在哔哩哔哩里清理缓存，从多任务界面划掉 App 后重新打开。

```text
https://raw.githubusercontent.com/zhuchen458/bilibiliads-loon/main/BilibiliAds.plugin?rev=v3
```

## 确认规则命中

在 Loon 的新请求记录里打开 `app.bilibili.com/x/v2/splash/list` 或 `/x/v2/splash/show`，查看「复写」和响应正文。命中后，`data.list` 或 `data.show` 为 `[]`。如果复写列表为空且仍有原始广告数据，先核对插件名称、启用状态和全局复写开关。若正文已是空列表但仍跳转，保留从冷启动到跳转这段的新记录，便于区分客户端缓存和其他请求。

## 覆盖范围

| 场景 | 接口 |
| --- | --- |
| 开屏广告和外跳配置 | `/x/v2/splash/list`、`/x/v2/splash/show`、`/x/v2/splash/brand/list` |
| 开屏活动 | `/x/v2/splash/event/list2`，保留账户状态 |
| 首页推荐 | `/x/v2/feed/index`，仅过滤明确标记的广告 |

只匹配 `app.bilibili.com` 和 `app.biliapi.net` 上列出的 HTTPS 路径。

- [Loon 经典复写文档](https://nsloon.app/docs/Rewrite/)
- [app2smile 的 B 站广告卡片参考](https://github.com/app2smile/rules/blob/master/js/bilibili-json.js)
