# 哔哩哔哩去广告 · Loon

v4 在三次启动的抓包中拦截了开屏广告接口和素材下载。开屏接口收到的是 `{}`，未收到带 `code: 0` 的空广告列表。v5 改由 Loon 请求脚本返回完整的空开屏响应，包含空的素材列表、展示列表和保留 ID 列表。脚本只处理开屏广告的 list、show 和 brand/list。广告视频路径拦截、开屏活动和首页推荐过滤仍保留。

## 安装与验证

1. [一键导入 v5](https://www.nsloon.com/openloon/import?plugin=https%3A%2F%2Fraw.githubusercontent.com%2Fzhuchen458%2Fbilibiliads-loon%2Fmain%2FBilibiliAds.plugin%3Frev%3Dv5)，也可以在 Loon 插件页添加下方链接。停用 v4 和主配置中手动添加的开屏 `REJECT-DICT` 规则，以免请求被旧规则提前截断。保留分流模式、MitM 和脚本功能。
2. 打开 B 站后，在 Loon 查看 `/x/v2/splash/list` 或 `/x/v2/splash/show`。脚本栏应显示 `BilibiliSplashV5`，响应头为 `X-BilibiliAds-Loon: splash-v5`，正文的 `data.list` 或 `data.show` 应为 `[]`。
3. 确认脚本命中后，在 B 站清理缓存一次，连续冷启动三次，中间无需再次清缓存。

```text
https://raw.githubusercontent.com/zhuchen458/bilibiliads-loon/main/BilibiliAds.plugin?rev=v5
```

如果仍看到 `{}` 和 `REJECT-DICT`，检查是否还有旧开屏规则。若仍收到原始广告列表，检查 Loon 的脚本执行和下载日志。若已经收到 v5 的空列表但仍出现广告，可在断网状态冷启动一次，判断广告能否在没有新请求的情况下出现。

- [Loon 请求脚本 API](https://nsloon.app/docs/Script/script_api/)
- [Loon 经典脚本语法](https://nsloon.app/docs/Script/)
