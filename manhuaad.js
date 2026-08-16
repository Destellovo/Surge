/* Surge HTTP Response Script — manwa.wang 去横幅 */
let body = $response.body || "";

// 去掉页面源码中已知的第三方广告加载器；域名和路径会轮换。
body = body
  .replace(/<script\b[^>]*src=["'][^"']*(?::9179\/|\/poster\/zj-ding\.js)[^"']*["'][^>]*><\/script>/gi, "")
  .replace(/<script\b[^>]*>[\s\S]*?damage_loop\.html[\s\S]*?<\/script>/gi, "");

const payload = `<style id="mw-ad-clean">
[style*="z-index: 2147483646"],
iframe[src*="damage_loop.html"] { display:none!important; width:0!important; height:0!important; }
</style><script>(function(){
function clean(){
  document.querySelectorAll('[style*="z-index: 2147483646"],iframe[src*="damage_loop.html"]').forEach(e=>e.remove());
  const e=document.body&&document.body.firstElementChild;
  if(e&&!/^(HEADER|DIV|MAIN|SECTION|SCRIPT|STYLE)$/i.test(e.tagName)&&e.getBoundingClientRect().height>=100&&e.getBoundingClientRect().height<=160)e.remove();
}
new MutationObserver(clean).observe(document.documentElement,{childList:true,subtree:true,attributes:true,attributeFilter:['style']});
document.addEventListener('DOMContentLoaded',clean); clean();
})();<\/script>`;
body = /<\/head>/i.test(body) ? body.replace(/<\/head>/i, payload + "</head>") : payload + body;
$done({body});