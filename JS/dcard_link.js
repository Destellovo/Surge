/*
 * Surge HTTP Response Script — LURL / MyPPT / Imgus / Drrop 短網址頁去廣告
 * Targets: https://lurl.cc/<short-code>
 *          https://myppt.cc/<short-code>
 *          https://imgus.cc/<short-code>
 *          https://drrop.cc/v/<short-code>
 *
 * 移除短網址頁面的廣告載入器、廣告版位、底部固定橫幅與動態廣告節點；
 * 優先讀取公開密碼提示，否則從頁面顯示的上傳日期產生 MMDD 並預填到密碼欄；
 * 不使用本機日期；此功能只預填、不提交，使用者可手動修改或按原頁面按鈕驗證；
 * 同時移除 imgus.cc 頁面下方的推薦文章，保留密碼表單、影片、圖片和頁面正文。
 */
let body = $response.body || "";
const requestURL = ($request && $request.url) || "";
const responseHeaders = $response.headers || {};
const contentType = responseHeaders["Content-Type"] || responseHeaders["content-type"] || "";
const isLurlMypptPage = /^https?:\/\/(?:lurl|myppt)\.cc\/[A-Za-z0-9_-]+(?:[?#][^/]*)?$/i.test(requestURL);
const isImgusPage = /^https?:\/\/imgus\.cc\/[A-Za-z0-9_-]+(?:[?#][^/]*)?$/i.test(requestURL);
const isDrropPage = /^https?:\/\/drrop\.cc\/v\/[A-Za-z0-9_-]+(?:[?#][^/]*)?$/i.test(requestURL);
const isTargetPage = isLurlMypptPage || isImgusPage || isDrropPage;
const isHTML = !contentType || /(?:text\/html|application\/xhtml\+xml)/i.test(contentType);

// 双重保护：即使模块正则配置错误，也绝不改写 CSS、JS、图片、视频等资源。
if (!isTargetPage || !isHTML) {
  $done({});
} else {

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

  // 其他网站的广告/统计脚本；Drrop 的 Next.js 应用脚本不在这里处理.
  if (!isDrropPage && src && /(?:googletagmanager\.com|googlesyndication\.com|doubleclick\.net|taboola\.com|tblcontent\.com|qovani\.com|anymind360\.com|4dex\.io|pbstck\.com|criteo\.com|onetag-sys\.com|openx\.net|fundingchoicesmessages\.google\.com|connect\.facebook\.net|facebook\.com\/tr)/i.test(src)) {
    return true;
  }

  // Drrop 页面会在 Next.js 水合期间从 API 获取内容；保留所有应用脚本，只清理明确的广告节点。
  if (isDrropPage && src && /(?:static\.cloudflareinsights\.com|s\.pemsrv\.com)/i.test(src)) {
    return true;
  }

  // imgus.cc 页面中的 Facebook/Google 统计初始化也不是页面功能所需。
  if (isImgusPage && code && /(?:fbq|gtag|dataLayer|facebook|googletag|adsbygoogle)/i.test(code)) {
    return true;
  }

  // 删除内嵌的广告初始化代码，避免响应改写后广告再次建立版位。
  return code && /(?:googletag|gptAdSlots|defineSlot|adsbygoogle|_taboola|taboola|AdAAnchor|anymind|prebid|adagio|ads_Overlay)/i.test(code);
}

// 先移除外部广告脚本及内嵌广告初始化程序。
body = body.replace(/<script\b[^>]*>[\s\S]*?<\/script\s*>/gi, function (tag) {
  return isAdScript(tag) ? "" : tag;
});

// imgus.cc 的推薦資料只服務於廣告推薦區；改成空結果，避免額外請求 re-news.tw。
// 同時加上頁面標記，讓 imgus 專用 CSS 不影響 LURL / MyPPT。
if (isImgusPage) {
  // recommendations are loaded by renews.js; return an empty list to avoid the feed request.
  body = body.replace(/<script\b[^>]*src=["'][^"']*\/renews\.js(?:\?[^"']*)?["'][^>]*>\s*<\/script\s*>/gi,
    '<script>function getRenewsFeeds(){return Promise.resolve([])}</script>');
  body = body.replace(/<noscript>[\s\S]*?facebook\.com\/tr[\s\S]*?<\/noscript>/gi, '');
  // imgus 的推薦文章位於兩個分隔線之後、使用方式之前，直接從 HTML 移除，避免先閃現再消失。
  body = body.replace(/(?:<hr\b[^>]*>\s*){2}<div class="row text-center">\s*<div class="col-12"><span class="lead">推薦文章<\/span><\/div>\s*<\/div>\s*<div class="row">[\s\S]*?(?=<div class="row">\s*<div class="col-12 text-center"><h3>使用方式<\/h3>)/i, '');
  // 兼容页面结构变化：给推荐列表加标记，供注入的 DOM 清理逻辑处理。
  body = body.replace(/(<div class="row">)(<div class="col-md-6[^>]*v-for=["']post in latestPosts["'])/i,
    '<div class="row" data-dcard-recommendations="1">$2');
  body = body.replace(/<body\b([^>]*)>/i, '<body$1 data-dcard-imgus-clean="1">');
}

if (isDrropPage) {
  // Drrop 是 Next.js 页面；只添加标记，不删除应用脚本，避免密码表单无法水合。
  body = body.replace(/<body\b([^>]*)>/i, '<body$1 data-dcard-drrop-clean="1">');
  // 移除服务器传给 Player 的广告链接，避免解锁时打开广告标签页；不改动 API 验证流程。
  body = body.replace(/(\\?"adUrl\\?"\s*:\s*)\\?"[^\"]*\\?"/gi, '$1null');
}

// CSS 先于 body 生效，避免顶部广告、底部悬浮广告和全屏 vignette 闪现。
const payload = `<style id="lurl-myppt-ad-clean">
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
iframe[src*="onetag-sys.com"],
body[data-dcard-imgus-clean="1"] [id*="banner"],
body[data-dcard-imgus-clean="1"] [id*="Banner"],
body[data-dcard-imgus-clean="1"] [class*="banner"],
body[data-dcard-imgus-clean="1"] [class*="Banner"],
body[data-dcard-imgus-clean="1"] [id*="ad-container"],
body[data-dcard-imgus-clean="1"] [class*="ad-container"],
body[data-dcard-imgus-clean="1"] #app > [data-dcard-recommendations="1"],
body[data-dcard-imgus-clean="1"] #app > .row[data-dcard-recommendations="1"],
body[data-dcard-imgus-clean="1"] #app > hr,
body[data-dcard-imgus-clean="1"] img[src*="googlesyndication.com"],
body[data-dcard-drrop-clean="1"] [data-ad],
body[data-dcard-drrop-clean="1"] [data-ad-slot],
body[data-dcard-drrop-clean="1"] [id="ad"],
body[data-dcard-drrop-clean="1"] [id^="ad-"],
body[data-dcard-drrop-clean="1"] [id^="ad_"],
body[data-dcard-drrop-clean="1"] [id*="ad-slot" i],
body[data-dcard-drrop-clean="1"] [id="oneadMICSPEEDDFPTag"],
body[data-dcard-drrop-clean="1"] [class^="ad-"],
body[data-dcard-drrop-clean="1"] [class*=" ad-"],
body[data-dcard-drrop-clean="1"] [class^="ads-"],
body[data-dcard-drrop-clean="1"] [class*=" ads-"],
body[data-dcard-drrop-clean="1"] [class*="ad-slot" i],
body[data-dcard-drrop-clean="1"] .adsbygoogle,
body[data-dcard-drrop-clean="1"] iframe[src*="google"],
body[data-dcard-drrop-clean="1"] iframe[src*="doubleclick"],
body[data-dcard-drrop-clean="1"] iframe[src*="pemsrv"] {
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
var isImgus = host === 'imgus.cc' || /\\.imgus\\.cc$/.test(host);
var isDrrop = host === 'drrop.cc' || /\\.drrop\\.cc$/.test(host);

var datePasswordTimer = 0;

function getDatePassword(){
  // 优先使用公开密码提示；否则从页面显示的上传日期提取 MMDD，绝不使用本机日期。
  var text = (document.body && (document.body.innerText || document.body.textContent)) || '';
  var hint = text.match(/(?:密碼提示|密码提示|上傳者留的提示)\\s*[：:]?\\s*(\\d{4})/i);
  if(hint) return hint[1];

  // 支持 LURL / MyPPT 的「上傳日期：2026-08-27 16:26:00」及常见的中文/斜线日期写法。
  var upload = text.match(/(?:上傳日期|上传日期|上傳時間|上传时间|建立日期|创建日期|發佈日期|发布日期)\\s*[：:]?\\s*(\\d{4})\\s*[-/.年]\\s*(\\d{1,2})\\s*[-/.月]\\s*(\\d{1,2})/i);
  if(upload){
    var month = parseInt(upload[2],10);
    var day = parseInt(upload[3],10);
    if(month >= 1 && month <= 12 && day >= 1 && day <= 31){
      return (month < 10 ? '0' : '') + month + (day < 10 ? '0' : '') + day;
    }
  }
  return '';
}

function getPasswordInput(){
  if(isDrrop){
    return document.querySelector('#pw,input[type="password"]');
  }
  if(isMyPpt){
    return document.querySelector('#pasahaicsword,input[name="pasahaicsword"]');
  }
  return document.querySelector('#password,input[name="password"]');
}

function bindDatePassword(){
  var input = getPasswordInput();
  if(!input) return false;
  if(!input.__dcardDateBound){
    input.__dcardDateBound = true;
    ['keydown','beforeinput','paste','drop'].forEach(function(name){
      input.addEventListener(name,function(){input.__dcardManualPassword = true;});
    });
    input.addEventListener('input',function(){
      // React/Vue 等框架会在用户输入时同步状态；不主动覆盖用户修改。
      if(!input.__dcardFilling && input.value !== input.__dcardDateValue){
        input.__dcardManualPassword = true;
      }
    });
  }
  var value = getDatePassword();
  if(!value || input.__dcardManualPassword) return true;
  // 允许页面稍后出现公开提示时，替换此前临时填入的当前日期；不覆盖其他来源或用户输入的值。
  if(input.value && input.value !== input.__dcardDateValue) return true;
  input.__dcardFilling = true;
  try{
    var setter = Object.getOwnPropertyDescriptor(HTMLInputElement.prototype,'value');
    if(setter && setter.set) setter.set.call(input,value);
    else input.value = value;
  }catch(_){ input.value = value; }
  input.__dcardFilling = false;
  input.setAttribute('data-dcard-date-filled','1');
  input.__dcardDateValue = value;
  try{
    if(input._valueTracker) input._valueTracker.setValue('');
    input.dispatchEvent(new Event('input',{bubbles:true}));
    input.dispatchEvent(new Event('change',{bubbles:true}));
  }catch(_){ }
  return true;
}

function scheduleDatePassword(){
  // MutationObserver 可能连续触发；共用一个重试计时器，避免重复创建定时器。
  if(datePasswordTimer) return;
  var attempts = 0;
  function retry(){
    datePasswordTimer = 0;
    if(bindDatePassword() || ++attempts >= 20) return;
    datePasswordTimer = setTimeout(retry,250);
  }
  retry();
}

function remove(e){
  try{e.remove()}catch(_){if(e.parentNode)e.parentNode.removeChild(e)}
}

function clean(root){
  scheduleDatePassword();

  // imgus.cc：移除推薦文章標題、卡片列表及分隔線；不影響密碼表單與媒體內容。
  if(isImgus){
    try{
      var app = document.getElementById('app');
      if(app){
        Array.prototype.forEach.call(app.querySelectorAll('[data-dcard-recommendations="1"]'),remove);
        Array.prototype.forEach.call(app.querySelectorAll('.row'),function(row){
          if(row.querySelector('.card a[href*="re-news.tw"], .card-img.cropped')) remove(row);
        });
        Array.prototype.forEach.call(app.querySelectorAll('.row.text-center'),function(row){
          if(/推薦文章|recommend/i.test(row.textContent || '')) remove(row);
        });
        Array.prototype.forEach.call(app.querySelectorAll('hr'),remove);
      }
    }catch(_){ }
  }

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
  if(isDrrop){
    try{Array.prototype.forEach.call(document.querySelectorAll('[data-ad],[data-ad-slot],[id="ad"],[id^="ad-"],[id^="ad_"],[id*="ad-slot" i],[id="oneadMICSPEEDDFPTag"],[class^="ad-"],[class*=" ad-"],[class^="ads-"],[class*=" ads-"],[class*="ad-slot" i],.adsbygoogle,iframe[src*="google"],iframe[src*="doubleclick"],iframe[src*="pemsrv"]'),remove)}catch(_){ }
  }

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
    window.__comicAdObserver.observe(document.documentElement,{childList:true,subtree:true});
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
}
