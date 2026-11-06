// Loon request script. Return an empty success payload before going upstream.
(function () {
  var route = /^https:\/\/app\.(?:bilibili\.com|biliapi\.net)(?::443)?\/x\/v2\/splash\/(list|show|brand\/list)(?:\?|$)/.exec($request.url);
  if ($request.method !== "GET" || !route) {
    $done({});
    return;
  }

  var data = {
    list: {
      max_time: 0, min_interval: 600, pull_interval: 900,
      keep_ids: [], list: [], show: [], splash_request_id: ""
    },
    show: { show: [], splash_request_id: "" },
    "brand/list": {
      pull_interval: 1800, forcibly: false, rule: "", list: [], preload: [],
      has_new_splash_set: false, new_splash_hash: "", force_show_times: 0,
      show_hash: "", badge_from: "", query_list: null
    }
  };

  $done({
    response: {
      status: 200,
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        "Cache-Control": "no-store",
        "X-BilibiliAds-Loon": "splash-v5"
      },
      body: JSON.stringify({ code: 0, message: "OK", ttl: 1, data: data[route[1]] })
    }
  });
})();
