let header = $request.headers;
const isQuanX = typeof $task !== "undefined";

if (isQuanX) {
  header["MConfig-Info"] = '你的数据';
  header["User-Agent"] = '你的数据';
  header["Cookie"] = '你的数据';
} else {
  headers["mconfig-info"] = '你的数据';
  headers["user-agent"] = '你的数据';
  headers["cookie"] = '你的数据';
}

$done({ headers: header });
