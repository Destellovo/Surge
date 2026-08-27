/*
 * Surge HTTP Response Script — 漫画站横幅广告清理
 * 支持：manwa.wang、www.mxs11.cc
 */
let body = $response.body || "";
const url = ($request && $request.url) || "";
const isManwa = /^https?:\/\/manwa\.wang\//i.test(url);
const isMxs = /^https?:\/\/(?:www\.)?mxs11\.cc\//i.test(url);

// 防止压缩响应在改写后继续携带失效的校验/长度字段。
const headers = Object.assign({}, $response.headers || {});
Object.keys(headers).forEach(function (key) {
  if (/^(?:content-length|content-encoding|etag|content-md5)$/i.test(key)) delete headers[key];
});

function stripScripts(html) {
  return html.replace(/<script\b[^>]*>[\s\S]*?<\/script\s*>/gi, function (tag) {
    const src = ((tag.match(/\bsrc\s*=\s*["']([^"']+)["']/i) || [])[1] || "").replace(/&amp;/g, "&");
    const code = src ? "" : tag;

    // 两站都会轮换第三方域名和路径，固定端口及代码特征相对稳定。
    if (src && (
      /\/poster\/zj-ding\.js(?:[?#]|$)/i.test(src) ||
      /:\d+\/(?:w2u4v5w3gf|y3j0trtgl4|d|sc)\//i.test(src) ||
      /:20110\/(?:js|news|script)\//i.test(src) ||
      /(?:pagead2\.googlesyndication\.com|googletagmanager\.com)\//i.test(src)
    )) return "";

    if (code && (
      /damage_loop\.html|decide-obscure\.html/i.test(code) ||
      /\bads_codes\s*:|\brandoms\.init\s*\(/i.test(code) ||
      /_idx\s*=\s*["'](?:w2u4v5w3gf|y3j0trtgl4)["']/i.test(code)
    )) return "";

    return tag;
  });
}

body = stripScripts(body);

const payload = `<style id="comic-ad-clean">
[style*="z-index: 2147483646"],
iframe[src*="damage_loop.html"],iframe[src*="decide-obscure.html"],
ins.adsbygoogle,.adsbygoogle {display:none!important;width:0!important;height:0!important;min-height:0!important}
</style><script>(function(){
'use strict';
var standard=/^(HTML|HEAD|BODY|HEADER|MAIN|SECTION|ARTICLE|NAV|FOOTER|DIV|P|A|IMG|SPAN|UL|OL|LI|SCRIPT|STYLE|LINK|META|TITLE|INS|IFRAME|FORM|INPUT|BUTTON|H[1-6]|BR|I|EM|STRONG|TEXTAREA)$/;
function remove(e){try{e.remove()}catch(_){}}
function customBanner(e){
 if(!e||e.nodeType!==1||standard.test(e.tagName))return false;
 var s=e.getAttribute('style')||'',r=e.getBoundingClientRect();
 return (/width\\s*:\\s*100%/i.test(s)&&/height\\s*:\\s*124px/i.test(s)) ||
        (r.width>=innerWidth*.9&&r.height>=100&&r.height<=160&&r.top<=500);
}
function adNode(e){
 if(!e||e.nodeType!==1)return false;
 var s=e.getAttribute('style')||'',src=e.getAttribute('src')||'';
 if(/damage_loop\\.html|decide-obscure\\.html/i.test(src))return true;
 if(/z-index\\s*:\\s*2147483646/i.test(s))return true;
 if(customBanner(e))return true;
 // mxs11 的透明点击覆盖层：同 class 批量生成，固定在顶部且透明度约 0.01。
 if(location.hostname.endsWith('mxs11.cc')&&e.tagName==='DIV'&&/position\\s*:\\s*fixed/i.test(s)&&/opacity\\s*:\\s*0\\.0?1/i.test(s)&&/vw/i.test(s))return true;
 return false;
}
function clean(root){
 var q=(root&&root.querySelectorAll)?root:document;
 q.querySelectorAll('[style*="z-index: 2147483646"],iframe[src*="damage_loop.html"],iframe[src*="decide-obscure.html"],ins.adsbygoogle,.adsbygoogle').forEach(remove);
 (document.body?[].slice.call(document.body.children):[]).forEach(function(e){if(adNode(e))remove(e)});
}
var mo=new MutationObserver(function(ms){ms.forEach(function(m){[].forEach.call(m.addedNodes,function(n){if(adNode(n))remove(n);else if(n.nodeType===1)clean(n)})});clean(document)});
mo.observe(document.documentElement,{childList:true,subtree:true,attributes:true,attributeFilter:['style','src']});
document.addEventListener('DOMContentLoaded',function(){clean(document)});clean(document);
})();<\/script>`;

body = /<\/head\s*>/i.test(body)
  ? body.replace(/<\/head\s*>/i, payload + "</head>")
  : payload + body;

$done({ body, headers });