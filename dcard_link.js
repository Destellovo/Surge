/*
 * Surge HTTP Response Script — LURL / MyPPT 短網址頁去廣告
 * Targets: https://lurl.cc/<short-code>
 *          https://myppt.cc/<short-code>
 *
 * 移除 Google/AnyMind/Taboola 等廣告載入器、GPT/AdSense 版位、
 * Google 自動插入廣告、底部固定橫幅與動態建立的廣告節點；
 * 保留密碼表單、影片、圖片和頁面正文。
 */
let body = $response.body || "";

// 改寫正文後清除可能失效的 HTTP 實體標頭。
const headers = Object.assign({}, $response.headers || {});
Object.keys(headers).forEach(function (key) {
  if (/^(?:content-length|content-encoding|etag|content-md5)$/i.test(key)) {
    delete headers[key];
  }
});

function isAdScript(tag) {
  const src = ((tag.match(/\bsrc\s*=\s*["']([^"']+)["']/i) || [])[1] || "")
    .replace(/&amp;/g, "&");
  const code = src ? "" : tag;

  // 广告/竞价网络。域名通常会随广告供应商变化，但这些资源是本页实测来源。
  if (src && /(?:googletagmanager\.com|googlesyndication\.com|doubleclick\.net|taboola\.com|tblcontent\.com|qovani\.com|anymind360\.com|4dex\.io|pbstck\.com|criteo\.com|onetag-sys\.com|openx\.net|fundingchoicesmessages\.google\.com)/i.test(src)) {
    return true;
  }

  // 删除内嵌的广告初始化代码，避免响应改写后广告再次建立版位。
  return code && /(?:googletag|gptAdSlots|defineSlot|adsbygoogle|_taboola|taboola|AdAAnchor|anymind|prebid|adagio|ads_Overlay)/i.test(code);
}

// 先移除外部广告脚本及内嵌广告初始化程序。
body = body.replace(/<script\b[^>]*>[\s\S]*?<\/script\s*>/gi, function (tag) {
  return isAdScript(tag) ? "" : tag;
});

// CSS 先于 body 生效，避免顶部广告、底部悬浮广告和全屏 vignette 闪现。
const payload = `<style id="lurl-myppt-ad-clean">
#TW_lurl_cc_res_urlpage_top_new,
#TW_lurl_cc_res_urlpage_top,
#TW_lurl_cc_res_urlpage_mid,
#AdAAnchor,
.AdAAnchor_Bot,
.AdAAnchor_Top,
#taboola-mid-article-textlinks,
.google-auto-placed,
ins.adsbygoogle,
.adsbygoogle,
[id^="google_ads_iframe_"],
[id^="div-gpt-ad-"],
[id^="aswift_"],
[id*="adg-"],
[data-ad-slot],
[data-vignette-loaded],
iframe[id="google_esf"],
iframe[src*="doubleclick.net"],
iframe[src*="googlesyndication.com"],
iframe[src*="taboola.com"],
iframe[src*="criteo.com"],
iframe[src*="onetag-sys.com"] {
  display:none!important;
  width:0!important;
  height:0!important;
  min-height:0!important;
  max-height:0!important;
  visibility:hidden!important;
  pointer-events:none!important;
}
</style><script>(function(){
'use strict';
var selectors = [
  '#TW_lurl_cc_res_urlpage_top_new',
  '#TW_lurl_cc_res_urlpage_top',
  '#TW_lurl_cc_res_urlpage_mid',
  '#AdAAnchor',
  '.AdAAnchor_Bot',
  '.AdAAnchor_Top',
  '#taboola-mid-article-textlinks',
  '.google-auto-placed',
  'ins.adsbygoogle',
  '.adsbygoogle',
  '.google-auto-placed',
  '[id^="google_ads_iframe_"]',
  '[id^="div-gpt-ad-"]',
  '[id^="aswift_"]',
  '[id*="adg-"]',
  '[data-ad-slot]',
  '[data-vignette-loaded]',
  'iframe[id="google_esf"]',
  'iframe[src*="doubleclick.net"]',
  'iframe[src*="googlesyndication.com"]',
  'iframe[src*="taboola.com"]',
  'iframe[src*="criteo.com"]',
  'iframe[src*="onetag-sys.com"]'
];
var host = (location.hostname || '').toLowerCase();
var isMyPpt = host === 'myppt.cc' || /\\.myppt\\.cc$/.test(host);

function remove(e){
  try{e.remove()}catch(_){if(e.parentNode)e.parentNode.removeChild(e)}
}

function clean(root){
  // MyPPT 明确的顶部/底部 AdSense section 没有正文，连同外层一起移除，避免留下 390px 空白。
  if(isMyPpt){
    try{Array.prototype.forEach.call(document.querySelectorAll('section.gameIn'),function(section){
      var ad = section.querySelector('ins.adsbygoogle,[data-ad-slot],[id^="google_ads_iframe_"],[id^="aswift_"]');
      var text = (section.textContent || '').replace(/\\s+/g,'').trim();
      if(ad && !text) remove(section);
    })}catch(_){ }
  }

  var q=(root&&root.querySelectorAll)?root:document;
  try{Array.prototype.forEach.call(q.querySelectorAll(selectors.join(',')),remove)}catch(_){ }
  // Google 可能把广告节点包在自动插入容器中；若容器只含广告，也一并移除。
  if(isMyPpt){
    try{Array.prototype.forEach.call(document.querySelectorAll('.google-auto-placed'),function(e){
      if(e.querySelector('ins.adsbygoogle,[data-ad-slot],[id^="aswift_"]')) remove(e);
    })}catch(_){ }
  }
}

function install(){
  clean(document);
  if(window.MutationObserver && document.documentElement && !window.__comicAdObserver){
    window.__comicAdObserver = new MutationObserver(function(){clean(document)});
    window.__comicAdObserver.observe(document.documentElement,{
      childList:true,
      subtree:true,
      attributes:true,
      attributeFilter:['id','class','src','style','data-ad-status','data-vignette-loaded']
    });
  }
}

// 在 head 阶段就安装观察器，处理 body 后续插入的 Google 广告节点。
install();
document.addEventListener('DOMContentLoaded',clean);
window.addEventListener('load',clean);
})();<\/script>`;

if (/<\/head\s*>/i.test(body)) {
  body = body.replace(/<\/head\s*>/i, payload + "</head>");
} else {
  body = payload + body;
}

$done({ body, headers });
