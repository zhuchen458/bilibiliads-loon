# 哔哩哔哩去广告 · Loon

第二次冷启动的抓包显示，B 站开屏接口已经过 MitM，仍有请求按直连策略取得了原始广告配置。随后手机请求了一条配置里指向京东的广告视频。v4 保留返回空开屏列表的复写，并增加两条 URL 分流规则，分别拦截开屏广告接口与这类视频素材。

## 安装

1. [一键导入 Loon](https://www.nsloon.com/openloon/import?plugin=https%3A%2F%2Fraw.githubusercontent.com%2Fzhuchen458%2Fbilibiliads-loon%2Fmain%2FBilibiliAds.plugin%3Frev%3Dv4)，或在 Loon 插件页面手动添加下方地址。
2. 确认「哔哩哔哩去广告 · 开屏版 v4」已启用，停用旧版。Loon 使用分流模式，开启复写和 MitM。
3. 在 B 站清理缓存，从多任务界面划掉 B 站后重新打开。再划掉并打开第二次，中间无需再次清缓存。

```text
https://raw.githubusercontent.com/zhuchen458/bilibiliads-loon/main/BilibiliAds.plugin?rev=v4
```

## 确认是否命中

在第二次启动的 Loon 记录里查看 `app.bilibili.com/x/v2/splash/list` 或 `/x/v2/splash/show`：

- 正文里的 `data.list` 或 `data.show` 为 `[]`，表示复写返回了空列表。
- 策略为 `REJECT-DICT`，正文为 `{}`，表示分流规则拦截了请求。
- 策略仍为 `DIRECT`，正文也仍有广告条目，表示请求未被拦截。确认 v4 已启用且当前为分流模式。若本地直连规则先命中，可将下方两行放到主配置 `[Rule]` 的直连规则之前，然后重新加载配置。

```ini
URL-REGEX,^https://app\.(?:bilibili\.com|biliapi\.net)(?::443)?/x/v2/splash/(?:list|show|brand/list)(?:[?]|$),REJECT-DICT
URL-REGEX,^https://upos-sz-static\.bilivideo\.com(?::443)?/ssaxcode/[^/?]{2}/[^/?]{2}/[^/?]+\.mp4(?:[?]|$),REJECT
```

Loon 只能处理经过它的请求。B 站已经缓存的素材需要通过 App 的清理缓存功能处理，开屏广告是否消失以连续两次冷启动为准。

## 覆盖范围

| 场景 | 范围 |
| --- | --- |
| 开屏配置与外跳地址 | `app.bilibili.com`、`app.biliapi.net` 的 `/x/v2/splash/list`、`/show`、`/brand/list` |
| 广告视频下载 | `upos-sz-static.bilivideo.com/ssaxcode/` 下与抓包格式一致的 MP4 路径 |
| 开屏活动 | `/x/v2/splash/event/list2`，保留账户状态 |
| 首页推荐 | `/x/v2/feed/index`，仅过滤明确标记的广告 |

- [Loon HTTP 规则](https://nsloon.app/docs/Rule/http_rule/)
- [Loon 拒绝策略](https://nsloon.app/docs/Policy/)
- [Loon 经典复写](https://nsloon.app/docs/Rewrite/)
- [app2smile 的 B 站广告卡片参考](https://github.com/app2smile/rules/blob/master/js/bilibili-json.js)
