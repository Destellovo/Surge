// ==UserScript==
// @name        Twitter/X(网页版)视频/原始图片/gif一键下载.
// @name:ja     Twitter/X (Web 版) のビデオ/写真/GIF をワンクリックでダウンロード。
// @name:zh-cn  Twitter/X(网页版)视频/原始图片/gif一键下载.
// @name:zh-tw  Twitter/X(網頁版)影片/原始圖片/gif一鍵下載.
// @name:en     Twitter/X(web version)videos/4kPhotos/gif download.
// @name:ko     Twitter/X(웹버전) 동영상/사진/gif 원클릭 다운로드.
// @name:ru     Twitter/X (веб-версия) — загрузка видео/изображений/гифок в один клик.
// @version      0.1.5.20
// @description Twitter/X(网页版)视频/图片/gif一键下载. / 一键下载推文4k/原始图片并按用户名进行保存
// @description:zh-cn  Twitter/X(网页版)视频/图片/gif一键下载. / 一键下载推文4k/原始图片并按用户名进行保存/将推文内容生成图片/Stay iOS兼容修正版
// @description:ja Twitter/X (Web 版) のビデオ/写真/GIF をワンクリックでダウンロード。 / ワンクリックでツイート画像をダウンロードし、ユーザー名で保存します/ツイートの内容から画像を生成する
// @description:zh-tw Twitter/X(網頁版)影片/圖片/gif一鍵下載. / 一鍵下載推文4k/原始圖片並按使用者名稱儲存/將推文內容產生圖片
// @description:en Twitter/X(web version)videos/4kPhotos/gif download. / Download tweet original images(4k) with one click and save by username/Generate images from tweet content
// @description:ru Twitter/X (веб-версия) — загрузка видео/изображений/гифок в один клик. / Загрузите изображения твитов одним щелчком мыши и сохраните их по имени пользователя./Генерация изображений из содержимого твита
// @description:ko Twitter/X(웹버전) 동영상/사진/gif 원클릭 다운로드. / 한 번의 클릭으로 트윗 이미지를 다운로드하고 사용자 이름으로 저장/트윗 콘텐츠에서 이미지 생성
// @license MIT
// @match        https://twitter.com/*
// @match        https://x.com/*
// @match        https://twittervideodownloader.com/*
// @match        https://twittervid.com/*
// @match        https://tweeload.com/*
// @match        https://twittervideomp4.com/zh-tw/*
// @match        https://twittervideomp4.com/*
// @match        https://snapvid.net/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=twitter.com
//// @required      https://cdn.jsdelivr.net/npm/qrcode/build/qrcode.min.js
// @grant        none
// ==/UserScript==


// 引入全局 CSS
var twdlcss_pc = ".twdlimgs {cursor:pointer;} #custom-alert p {color:black;font-size:inherit;} .twdlContainerDown > a {padding:4px 0px 4px 0px} .twdlContainerDown {display:grid;gap:1px;} .twdlhidden { cursor:pointer; background: #adb5bd;/*#6c757d;*/} .twdlhidden:hover {cursor:pointer; background-color: #6c757d;/*#adb5bd;*/ transition: 0.7s;}  .twdlshare { background: #8a63d2; /*background: #6f42c1;*/}  .twdlshare:hover {background:rgb(105, 42, 223);/*#8a63d2;*/transition: 0.7s;} div.contentBox,ins.adsbygoogle[data-ad-slot],ins.adsbygoogle[data-ad-client] {display:none !important;}, span[id^=\"ezoic-pub-ad-placeholder-\"], .ez-sidebar-wall, span[data-ez-ph-id], .ez-sidebar-wall-ad,.ez-sidebar-wall {display:none !important} .download_pics:hover { font-weight:bolder; background:rgb(0, 21, 255); /*background-color: #339dff;*/ transition: 0.7s;} .atx {display:none;} .houseab {position:absolute;top:5%;} .house { background-color:inherit; gap:1px;opacity:0.5;font-size:xx-small;z-index:114154 !important; max-width:235px; display:flex; flex-direction:row; flex-wrap:wrap; margin-top:5px;} .help{top:80px !important;/*background:teal;*/} .house:hover {opacity:1;font-size:xx-small;z-index:114154 !important; max-width:235px; display:flex; flex-direction:row; flex-wrap:wrap; margin-top:5px;} .help{background: #6c757d; top:80px !important;/*background:teal;*/} .twdl { border:0px; text-align:center; width:75px; align-content: center; z-index:114154 !important; line-height:normal; /*font-size:xx-small;*/ font-size:inherit; text-decoration:none; position:sticky; top:5px; /*text-transform:uppercase;*/ padding:4px 8px; color:white; z-index:114154;} .twittervideodownloader {background:#28a745;} .twittervideodownloader:hover {background-color: #5dd17a; transition: 0.7s;} .twittervid {background:linear-gradient(to bottom, #66BB6A 0%, #43A047 100%); box-shadow:inset 0 2px 2px #388E3C;} .twee {background: #28a745;} .twee:hover { background-color: #5dd17a; /* 更亮的颜色 */ transition: 0.7s;} .download_pics {font-weight:bolder; background-color: #339dff; /*background: #007bff;*/} .greasyfork {cursor:help; right:295px;background:linear-gradient(rgb(62 53 53) 0%, rgb(31 29 29) 100%);box-shadow:rgb(0 0 0) 0px 2px 2px inset;}"
var twdlcss_mobile = ".twdlimgs {cursor:pointer;} #custom-alert p {color:black;font-size:inherit;} .twdlContainerDown > a {padding:4px 0px 4px 0px} .twdlContainerDown {display:grid;gap:1px;} .twdlhidden {cursor:pointer; background: #adb5bd;/*#6c757d;*/} .twdlhidden:hover {cursor:pointer; background-color: #6c757d;/*#adb5bd;*/ transition: 0.7s;}  .twdlshare {background: #8a63d2; /*background: #6f42c1;*/} .twdlshare:hover {background: rgb(105, 42, 223); /*#8a63d2;*/transition: 0.7s;}  div.contentBox,ins.adsbygoogle[data-ad-slot],ins.adsbygoogle[data-ad-client] {display:none !important;}, span[id^=\"ezoic-pub-ad-placeholder-\"], .ez-sidebar-wall, span[data-ez-ph-id], .ez-sidebar-wall-ad,.ez-sidebar-wall {display:none !important} .download_pics:hover {font-weight:bolder; background:rgb(0, 21, 255); /*background-color: #339dff;*/ transition: 0.7s;} .atx {display:none;} .house { background-color:inherit; gap:1px;opacity:0.5;font-size:xx-small;z-index:114154 !important; max-width:235px; display:flex; flex-direction:row; flex-wrap:wrap; margin-top:5px;} .house:hover {opacity:1;font-size:xx-small;z-index:114154 !important; max-width:235px; display:flex; flex-direction:row; flex-wrap:wrap; margin-top:5px;} .help{background: #6c757d; top:80px !important;/*background:teal;*/} .help{ background: #6c757d; top:80px !important;/*background: teal;*/} .twdl { border:0px; text-align:center; width:75px; align-content: center; z-index:114154 !important; line-height:normal; /*font-size:xx-small;*/ font-size:inherit; text-decoration:none; position:sticky; top:5px; /*text-transform:uppercase;*/ padding:6px 12px; color:white; z-index:114154;} .twittervideodownloader {background:#28a745;} .twittervideodownloader:hover {background-color: #5dd17a; transition: 0.7s;} .twittervid {background:linear-gradient(to bottom, #66BB6A 0%, #43A047 100%); box-shadow:inset 0 2px 2px #388E3C;} .twee {background: #28a745;} .twee:hover { background-color: #5dd17a; /* 更亮的颜色 */ transition: 0.7s;} .download_pics {font-weight:bolder; background-color: #339dff; /*background: #007bff;*/} .greasyfork {cursor:help; right:295px;background:linear-gradient(rgb(62 53 53) 0%, rgb(31 29 29) 100%);box-shadow:rgb(0 0 0) 0px 2px 2px inset;}"
var newstyle = document.createElement('style')
newstyle.id = 'twdlcss'


if (window.navigator.userAgent.toLowerCase().indexOf('mobile') !== -1) {
    newstyle.innerHTML = twdlcss_mobile
} else {
    newstyle.innerHTML = twdlcss_pc
}

document.querySelector('head').parentNode.insertBefore(newstyle, document.querySelector('head')) // 载入

var twURL_regex = new RegExp(/^https:\/\/x\.com\/.*?\/status\/\d{10,100}(\/.*)?$/gi) // 正则匹配对的 Tweet url
// var twURL_regex = new RegExp(/^https:\/\/x\.com\/.*?\/status\/\d{10,100}$/gi) // 正则匹配对的 Tweet url
function twdl_div(article, downloaderURL, className, textContent) { // article = article[i]
    let a = document.createElement('a')
    article.querySelectorAll('a').forEach((x) => { // 获取 twitter url
        if (x.href.match(twURL_regex)) {
            //// console.log(x.href);
            a.href = downloaderURL + "#" + x.href;
            //// console.log(a.href)
        }
    })

    a.className = className;
    a.target = '_blank';
    a.zIndex = '114154';
    a.textContent = textContent;
    return a;
}

var twdl_Kurl = '';
var twURL_regex = new RegExp(/\b^https:\/\/x\.com\/.*?\/status\/\d{10,100}\b/gi) // 正则匹配对的 Tweet url

function twdl_url(article) {

    article.querySelectorAll('a').forEach((x) => { // 获取 twitter url
        var length = x.href.length
        if (x.href.replace(twURL_regex, '').length < length) {
            twdl_Kurl = x.href.match(twURL_regex)[0]
        }
    })
    return twdl_Kurl;
}



function snapvid_url() { // snapvid_url
    var language = document.querySelector('html').lang; // en/ja/zh/ru/zh-Hant
    var snapvid_url = '';
    switch (language) { //
        case 'zh':
            snapvid_url = "https://snapvid.net/zh-cn1/twitter-downloader"
            return snapvid_url;
            break;
        case 'zh-CN':
            snapvid_url = "https://snapvid.net/zh-cn1/twitter-downloader";
            return snapvid_url;
            break;
        case 'zh-Hant':
            snapvid_url = "https://snapvid.net/zh-cn1/twitter-downloader";
            return snapvid_url;
            break;
        case 'en':
            snapvid_url = "https://snapvid.net/en2/twitter-downloader";
            return snapvid_url;
            break;

        default:
            snapvid_url = "https://snapvid.net/en2/twitter-downloader";
            return snapvid_url;
            break;
    }
}


function tweeload_url() { // tweeload_url
    var language = document.querySelector('html').lang; // en/ja/zh/ru/zh-Hant
    var tweeload_url = '';
    switch (language) { //
        case 'zh':
            tweeload_url = "https://tweeload.com/zh-cn"
            return tweeload_url;
            break;
        case 'zh-Hant':
            tweeload_url = "https://tweeload.com/zh-cn";
            return tweeload_url;
            break;
        case 'zh-cn':
            tweeload_url = "https://tweeload.com/zh-cn";
            return tweeload_url;
            break;
        case 'zh-CN':
            tweeload_url = "https://tweeload.com/zh-cn";
            return tweeload_url;
            break;
        case 'en':
            tweeload_url = "https://tweeload.com/en";
            return tweeload_url;
            break;

        default:
            tweeload_url = "https://tweeload.com/en";
            return tweeload_url;
            break;
    }
}



// 2. 显式挂载到 window 对象，实现全局及控制台调用
window.snapvid_url = snapvid_url;


// twdl_url(document.querySelectorAll('[data-testid="cellInnerDiv"]')[0])

function iftwnopics_innerText() {
    var language = document.querySelector('html').lang; // en/ja/zh/ru/zh-Hant
    var textContent = '';
    switch (language) { //
        case 'zh':
            textContent = "该推文内容不存在图片!";
            return textContent;
            break;
        case 'zh-Hant':
            textContent = "該推文內容不存在圖片!";
            return textContent;
            break;
        case 'en':
            textContent = "There is no image in this tweet!";
            return textContent;
            break;

        default:
            textContent = "There is no image in this tweet!";
            return textContent;
            break;
    }
}


function downloader_innerText(x) { // [LOADER]/[VID]
    // 判断当前网页语言
    var language = document.querySelector('html').lang; // en/ja/zh/ru/zh-Hant
    var textContent = '';

    switch (language) { //
        case 'zh':
            textContent = "⏬ 视频等" + x;
            return textContent;
            break;
        case 'zh-Hant':
            textContent = "⏬ 影片等" + x;
            return textContent;
            break;

        case 'en':
            textContent = "⏬ Vid etc." + x;
            return textContent;
            break;

        default:
            textContent = "⏬ Vid etc." + x;
            return textContent;
            break;
    }

}


function dlpics_shareTweetAsImg() { // [LOADER]/[VID]
    // 判断当前网页语言
    var language = document.querySelector('html').lang; // en/ja/zh/ru/zh-Hant
    var textContent = '';
    switch (language) { //
        case 'zh':
            textContent = "✍️ 推文生成图片 🎨";
            // textContent = "🎨 以图片形式分享推文内容";
            return textContent;
            break;
        case 'zh-Hant':
            textContent = "✍️ 推文生成图片 🎨";
            // textContent = "🎨 以圖片形式分享推文內容";
            return textContent;
            break;
        /*
    case 'ja':
        textContent = "写真をダウンロードする";
        return textContent;
        break;
        */
        case 'en':
            textContent = '✍️ Tweet to Image 🎨';
            return textContent;
            break;
        /*
    case 'ru':
        textContent = "Скачать картинки";
        return textContent;
        break;
        */
        default:
            textContent = '✍️ Tweet to Image 🎨';
            return textContent;
            break;
    }
}


function dlpics_innerText() { // [LOADER]/[VID]
    // 判断当前网页语言
    var language = document.querySelector('html').lang; // en/ja/zh/ru/zh-Hant
    var textContent = '';
    switch (language) { //
        case 'zh':
            textContent = "⏬ 仅图片";
            return textContent;
            break;
        case 'zh-Hant':
            textContent = "⏬ 僅圖片";
            return textContent;
            break;
        /*
    case 'ja':
        textContent = "写真をダウンロードする";
        return textContent;
        break;
        */
        case 'en':
            textContent = '⏬ Photo.';
            return textContent;
            break;
        /*
    case 'ru':
        textContent = "Скачать картинки";
        return textContent;
        break;
        */
        default:
            textContent = '⏬ Photo.';
            return textContent;
            break;
    }
}


function promp_innerText() { // [LOADER]/[VID]
    // 判断当前网页语言
    var language = document.querySelector('html').lang; // en/ja/zh/ru/zh-Hant
    var textContent = '';
    switch (language) { //
        case 'zh':
            textContent = "手机端用户：当浏览器提示保存/下载图片时，请尽可能快的点击确认按钮!（在本次会话中，本信息只会出现两次，累计会出现五次，以便你可以很好的了解如何操作下载图片）";
            return textContent;
            break;
        case 'zh-Hant':
            textContent = "手機端用戶：當瀏覽器提示儲存/下載圖片時，請盡可能快的點擊確認按鈕!（在本次會話中，本資訊只會出現兩次，累計會出現五次，以便你可以很好的了解如何操作下載圖片）";
            return textContent;
            break;
        case 'en':
            textContent = 'Mobile users: When the browser prompts you to save/download the image, please click the confirmation button as quickly as possible! (In this session, this message will only appear twice, and it will appear five times in total, so that you can Learn how to download images)';
            return textContent;
            break;
        default:
            textContent = 'Mobile users: When the browser prompts you to save/download the image, please click the confirmation button as quickly as possible! (In this session, this message will only appear twice, and it will appear five times in total, so that you can Learn how to download images)';
            return textContent;
            break;
    }
}

if (localStorage.getItem('clickcount') == '' || localStorage.getItem('clickcount') == null) {
    var twdl_clickCount = 0;
    console.log("twdl_clickCount 设置 为 " + '0')
} else {
    var twdl_clickCount = localStorage.getItem('clickcount');
    console.log("twdl_clickCount 设置 为 " + localStorage.getItem('clickcount'))
}


function showCustomAlert(message) {
    // 检查是否已经存在悬浮窗，避免重复创建
    if (document.getElementById('custom-alert')) return;

    // 创建悬浮窗容器
    const alertBox = document.createElement('div');
    alertBox.id = 'custom-alert';
    alertBox.style.position = 'fixed';
    alertBox.style.top = '50%';
    alertBox.style.left = '50%';
    alertBox.style.transform = 'translate(-50%, -50%)';
    alertBox.style.backgroundColor = '#fff';
    alertBox.style.padding = '20px';
    alertBox.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.2)';
    alertBox.style.zIndex = '1000';
    alertBox.style.textAlign = 'center';

    // 添加提示信息
    const messageText = document.createElement('p');
    messageText.textContent = message;
    alertBox.appendChild(messageText);

    // 添加确认按钮
    const closeButton = document.createElement('button');
    closeButton.textContent = '确认';
    closeButton.style.marginTop = '10px';
    closeButton.style.padding = '10px 20px';
    closeButton.style.border = 'none';
    closeButton.style.backgroundColor = '#007BFF';
    closeButton.style.color = '#fff';
    closeButton.style.borderRadius = '4px';
    closeButton.style.cursor = 'pointer';

    closeButton.onclick = () => {
        document.body.removeChild(alertBox);
    };

    alertBox.appendChild(closeButton);

    // 将悬浮窗添加到页面
    document.body.appendChild(alertBox);
}



// iOS Safari/Stay 不允许通过异步的 data: 链接模拟下载。
// 这里改用用户主动点击触发的系统分享面板；不支持分享时可长按图片保存。
function twdlIsIOS() {
    var ua = navigator.userAgent || '';
    return /iPad|iPhone|iPod/.test(ua) ||
        (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
}

function twdlFileName(userName, nickName) {
    var base = nickName || userName || 'photo';
    return (base + '-' + formatTimetoNumber()).replace(/[\\/:*?"<>|]/g, '_') + '.jpeg';
}

function twdlDataURLToFile(dataURL, fileName) {
    var match = dataURL.match(/^data:([^;]+);base64,(.*)$/);
    if (!match) return null;
    var binary = atob(match[2]);
    var bytes = new Uint8Array(binary.length);
    for (var i = 0; i < binary.length; i++) {
        bytes[i] = binary.charCodeAt(i);
    }
    return new File([bytes], fileName, { type: match[1] || 'image/jpeg' });
}

function twdlCanvasToDataURL(image) {
    var canvas = document.createElement('canvas');
    canvas.width = image.naturalWidth || image.width;
    canvas.height = image.naturalHeight || image.height;
    var context = canvas.getContext('2d');
    context.drawImage(image, 0, 0, canvas.width, canvas.height);
    var dataURL = canvas.toDataURL('image/jpeg', 1.0);
    context.clearRect(0, 0, canvas.width, canvas.height);
    canvas.remove();
    return dataURL;
}

function twdlIOSImageGallery(items) {
    if (!items || items.length === 0) return;

    var previous = document.getElementById('twdl-ios-save-overlay');
    if (previous) previous.remove();

    var index = 0;
    var overlay = document.createElement('div');
    overlay.id = 'twdl-ios-save-overlay';
    overlay.style.cssText = 'position:fixed;inset:0;background:rgba(0,0,0,.92);z-index:2147483647;display:flex;flex-direction:column;align-items:center;justify-content:center;padding:18px;box-sizing:border-box;color:#fff;font-family:-apple-system,BlinkMacSystemFont,sans-serif;';

    var tip = document.createElement('div');
    tip.style.cssText = 'width:100%;max-width:640px;text-align:center;font-size:15px;line-height:1.45;margin-bottom:10px;';
    tip.textContent = 'iOS Safari 不支持脚本后台直接保存 data: 图片。请点“分享/存储”，或长按图片保存。';

    var counter = document.createElement('div');
    counter.style.cssText = 'font-size:14px;color:#bbb;margin-bottom:8px;';

    var image = document.createElement('img');
    image.style.cssText = 'max-width:100%;max-height:68vh;object-fit:contain;border-radius:10px;background:#333;';

    var buttons = document.createElement('div');
    buttons.style.cssText = 'display:flex;align-items:center;justify-content:center;gap:8px;flex-wrap:wrap;margin-top:14px;';

    function button(text, background) {
        var b = document.createElement('button');
        b.type = 'button';
        b.textContent = text;
        b.style.cssText = 'border:0;border-radius:8px;padding:10px 14px;color:#fff;font-size:15px;background:' + background + ';';
        return b;
    }

    var previousButton = button('上一张', '#555');
    var saveButton = button('分享/存储', '#147ef5');
    var nextButton = button('下一张', '#555');
    var closeButton = button('关闭', '#d33');

    function render() {
        var item = items[index];
        image.src = item.dataURL || item.sourceURL;
        counter.textContent = (index + 1) + ' / ' + items.length + '　' + item.fileName;
        previousButton.disabled = index === 0;
        nextButton.disabled = index === items.length - 1;
        previousButton.style.opacity = previousButton.disabled ? '.45' : '1';
        nextButton.style.opacity = nextButton.disabled ? '.45' : '1';
    }

    previousButton.onclick = function () {
        if (index > 0) { index--; render(); }
    };
    nextButton.onclick = function () {
        if (index < items.length - 1) { index++; render(); }
    };
    closeButton.onclick = function () { overlay.remove(); };

    saveButton.onclick = async function () {
        var item = items[index];
        if (!item.ready || !item.dataURL) {
            showCustomAlert('图片仍在加载，请稍等片刻后再点“分享/存储”。');
            return;
        }
        var file = twdlDataURLToFile(item.dataURL, item.fileName);
        var canShareFile = file && typeof navigator.share === 'function' &&
            (!navigator.canShare || navigator.canShare({ files: [file] }));

        if (canShareFile) {
            try {
                // 必须在这个用户点击处理函数中直接调用，不能再套 setTimeout。
                await navigator.share({ files: [file], title: item.fileName });
                return;
            } catch (error) {
                if (error && error.name === 'AbortError') return;
                console.warn('系统分享失败，请长按图片保存:', error);
            }
        }

        showCustomAlert('当前Safari未提供文件分享功能，请直接长按上方图片，选择“存储到照片”或“存储到文件”。');
    };

    buttons.appendChild(previousButton);
    buttons.appendChild(saveButton);
    buttons.appendChild(nextButton);
    buttons.appendChild(closeButton);
    overlay.appendChild(tip);
    overlay.appendChild(counter);
    overlay.appendChild(image);
    overlay.appendChild(buttons);
    document.body.appendChild(overlay);
    render();
}

function dlpicsfromURL(imgsrcURL, userName, article, nickName) {

    console.log(nickName + ' ' + userName + ' ' + imgsrcURL)

    if (imgsrcURL.length == 0) {
        //// alert(iftwnopics_innerText())
        showCustomAlert(iftwnopics_innerText());
    } else {
        if (navigator.userAgent.toString().toLowerCase().search(/android|iphone|mobile/) !== -1) {
            sessionStorage.setItem('clickcount', twdl_clickCount += 1) // 点击下载图片按钮次数统计
            localStorage.setItem('clickcount', twdl_clickCount) // 点击下载图片按钮次数统计
            if (sessionStorage.getItem('clickcount') < 3 && localStorage.getItem('clickcount') < 5) { // 如果已经提示了两次则之后不会在在本次session提示
                //// alert(promp_innerText())
                showCustomAlert(promp_innerText());
            }
        }

        // iOS Safari 需要保留图片供用户在一次明确点击中分享，不能在异步回调中触发 a.download。
        if (twdlIsIOS()) {
            var iosItems = imgsrcURL.map(function (sourceURL, index) {
                var preload = new Image();
                preload.crossOrigin = 'anonymous';
                preload.src = sourceURL;
                var item = {
                    sourceURL: sourceURL,
                    dataURL: null,
                    fileName: twdlFileName(userName, nickName),
                    ready: false
                };
                preload.onload = function () {
                    try {
                        item.dataURL = twdlCanvasToDataURL(preload);
                    } catch (error) {
                        console.warn('图片转换失败，将使用原图:', error);
                    }
                    item.ready = true;
                };
                return item;
            });
            twdlIOSImageGallery(iosItems);
            return;
        }

        // Part of the code is modified from CodeingShare
        // https://ww4k.com/CodeingShare/donwload_image_difference_domain.html
        // 解决跨域 Canvas 污染问题

        var timeloop = 0;

        console.log(imgsrcURL.length + ' length')

        imgsrcURL.forEach((x) => {
            console.log("imgsrcURL" + x)
        })

        //imgsrcURL.forEach((x, index) => {

        for (var i = 0; i < imgsrcURL.length; i++) {

            console.log("i=" + i + ' atx')

            if (navigator.userAgent.toString().toLowerCase().search(/android|iphone|mobile/) !== -1) { //  如果当前浏览器代理为手机代理
                timeloop = 1
                console.log('userAgent: Mobile')
            } else if (navigator.userAgent.toString().toLowerCase().search(/chrome/) !== -1) {
                timeloop = 0
                console.log('userAgent: Not Mobile but chrome')
            } else {
                timeloop = 1
                console.log('userAgent: Not Mobile but Safari')
            }

            function timeDelay(i) {

                function dlTime(pic) {
                    var img = new Image() // 设置延时

                    try {
                        img.src = document.querySelector("[src='" + imgsrcURL[pic] + "']").src
                    } catch (error) {

                    }

                    var dltime = (Math.ceil(img.width * img.height / 1048576) * 1000)

                    if (dltime == 1000) {
                        dltime = 2500
                    } else {
                        dltime = (dltime * 0.25 + 2000)
                    }

                    if (img.complete) {
                        console.log('图片大小已计算；图片已销毁🏅')
                        img = null;
                    }

                    console.log('dltime:' + dltime + 'ms')
                    return dltime
                }

                if (i == 0) {
                    console.log(0 + "ms")
                    return 0;
                } else if (i == 1) {
                    console.log(dlTime(i - 1) + 'ms' + '后开始下载第' + (i + 1) + "张图片")
                    return dlTime(i - 1)
                } else if (i == 2) {
                    console.log((dlTime(i - 1) + dlTime(i - 2)) + 'ms' + '后开始下载第' + (i + 1) + "张")
                    return (dlTime(i - 1) + dlTime(i - 2))
                } else {
                    console.log((dlTime(i - 1) + dlTime(i - 2) + dlTime(i - 3)) + 'ms' + '后开始下载第' + (i + 1) + "张")
                    return (dlTime(i - 1) + dlTime(i - 2) + dlTime(i - 3))
                }

            }

            (function (index) {
                setTimeout(() => {
                    var image = new Image()
                    image.setAttribute("crossOrigin", "anonymous");
                    image.src = imgsrcURL[index];
                    image.onload = function () {
                        var canvas = document.createElement("canvas");
                        canvas.id = 'twdl'
                        canvas.width = image.width;
                        canvas.height = image.height;
                        var context = canvas.getContext("2d");
                        context.drawImage(image, 0, 0, image.width, image.height);
                        var url = canvas.toDataURL("image/jpeg", 1.0);
                        var a = document.createElement("a");
                        a.download = nickName + "-" + formatTimetoNumber() || userName + "-" + formatTimetoNumber() || "photo" + "-" + formatTimetoNumber();
                        a.href = url;
                        // a.textContent = userName + ' '
                        // article.querySelector('div.house').appendChild(a)

                        if (typeof GM_download === 'function') {
                            GM_download(url, a.download);
                        } else {
                            var event = new MouseEvent("click");
                            event.initEvent('click', true, true);
                            a.dispatchEvent(event);
                        }
                        // 清除整个Canvas
                        context.clearRect(0, 0, image.width, image.height);
                        canvas.remove()
                        canvas = null;
                        context = null;

                        if (image.complete) {
                            console.log('图片已下载；图片已销毁🏅')
                            image = null;
                        }

                    }
                }, timeDelay(i) * timeloop)
            })(i)
        }

        // })

    }
}


function formatTimetoNumber() {
    const now = new Date();
    const pad = (n) => n.toString().padStart(2, '0');
    const currentPureNumber =
        now.getFullYear().toString() +
        pad(now.getMonth() + 1) +
        pad(now.getDate()) +
        pad(now.getHours()) +
        pad(now.getMinutes()) +
        pad(now.getSeconds());
    console.log(currentPureNumber);
    return currentPureNumber;
}


function get_imgsURL(article, userName) {
    var url = [];
    var large_regex = new RegExp(/name=.*/ig)

    article.querySelectorAll('a[class=' + userName + ']').forEach((x) => {
        url.push((x.toString().replace(large_regex, 'name=4096x4096'))) // 默认下载最大化图片
    })

    url.forEach((x) => {
        console.log('get_imgsURL ->' + x)
    })
    return url;
}

var regex_name = new RegExp(/\/status\/\d{10,100}.*/gi) // 正则匹配对的 Tweet url
var twURL_regex = new RegExp(/\b^https:\/\/x\.com\/.*?\/status\/\d{10,100}\b/gi) // 正则匹配对的 Tweet url

function userName(article, nickName) {
    var fileName = ''; // 获取推文用户名
    if (nickName !== 'nickName') {

        article.querySelectorAll('a').forEach((x) => { // 获取 twitter url
            if (x.href.match(twURL_regex)) {
                fileName = x.href.replaceAll('https://x.com/', '').replaceAll(regex_name, '')
            }
        })
    } else {
        if (article.querySelectorAll('a')[1].textContent !== '') {
            fileName = article.querySelectorAll('a')[1].textContent.replaceAll('.', '')
        } else {
            fileName = article.querySelectorAll('a')[2].textContent.replaceAll('.', '')
        }
        console.log('fileName: ' + fileName)
    }

    return fileName;
}

// userName(document.querySelectorAll('[data-testid="cellInnerDiv"]')[0],'nickName')

async function twdl() {
    if (document.querySelectorAll('[data-testid="cellInnerDiv"]')) {
        var large_regex = new RegExp(/name=.*/ig)
        var article = document.querySelectorAll('[data-testid="cellInnerDiv"]')
        for (let i = 0; i < article.length; i++) { // twittervid

            if (article[i].querySelector('.house') == null && (article[i].querySelector('[data-testid="videoPlayer"]') || article[i].querySelectorAll('[dir=auto][lang]')[0] || article[i].querySelectorAll("img[src*='name=']").length >= 1)) { // 如果 article[i] 不包含 .house ，但 article[i] 包含图片或视频，那么创建 .house


                var house = document.createElement('div')
                house.className = 'house'

                // var vid = twdl_div(article[i], 'https://twittervid.com/', 'twdl twittervid', downloader_innerText('[VID]'))
                var loader_ = twdl_div(article[i], 'https://twittervideodownloader.com/', 'twdl download_pics', downloader_innerText(''))
                var twee = twdl_div(article[i], tweeload_url(), 'twdl download_pics', downloader_innerText(''))
                var snapvid = twdl_div(article[i], snapvid_url(), 'twdl download_pics', downloader_innerText(''))
                var twittervideomp = twdl_div(article[i], 'https://twittervideomp4.com/', 'twdl download_pics', downloader_innerText(''))
                var help = twdl_div(article[i], '#', 'twdl twdlhidden', '❓ Need Help?')



                // 分享推文截图按钮 以图片形式分享推文
                var tw2Canvas2Share = document.createElement('button')
                tw2Canvas2Share.className = 'twdl twdlshare'
                tw2Canvas2Share.innerText = dlpics_shareTweetAsImg()

                tw2Canvas2Share.onclick = function () {

                    var fcNumber = '';
                    var timeRight = '';
                    if (article[i].querySelector('time').textContent.search(/2025/) !== -1) {
                        timeRight = article[i].querySelector('time').textContent
                    } else {
                        timeRight = article[i].querySelector('time').getAttribute('datetime')
                    }

                    // 替换推文内容中的Emoji为文本
                    function twEmojiToText(article) {
                        console.log('twEmojiToTexting')
                        console.log(article)

                        if (article !== '') {
                            var twparentElement = article.querySelectorAll('[dir="auto"][lang]')[0].childNodes
                            twparentElement.forEach((node) => {
                                console.log(node.nodeName);
                                if (node.nodeName === "IMG") {
                                    // 创建一个文本节点，值为 alt 的内容
                                    const textNode = document.createTextNode(node.alt);
                                    node.parentNode.insertBefore(textNode, node);
                                    // 删除原有的图片节点
                                    node.parentNode.removeChild(node);
                                }
                            });
                        }

                    }


                    try { twEmojiToText(article[i]) } catch (e) {
                        console.log('没有找到推文文本内容')
                    }

                    var twContent_ori = getTweetContent(article[i], 'content') // 获取推文内容
                    var twAvatar = article[i].querySelectorAll('div[data-testid="Tweet-User-Avatar"]')[0].querySelector('div[style*="background-image"]');
                    var twAvatarUrl = '';
                    //var twAvatar = document.querySelectorAll('[data-testid="cellInnerDiv"]')[0].querySelectorAll('div[data-testid="Tweet-User-Avatar"]')[0].querySelector('div[style*="background-image"]');
                    if (twAvatar) {
                        twAvatarUrl = twAvatar.style.backgroundImage.replace(/url\(['"]?(.*?)['"]?\)/i, '$1');
                        console.log("提取到的 URL:", twAvatarUrl);
                    } // 推特头像

                    function getTweetContent(article, x) { // 获取推文内容及引用
                        //xx twEmojiToText(article) // 替换推文内容中的Emoji为文本
                        var tweetContent = '';
                        var tweetContentlength = article.querySelectorAll('[dir="auto"][lang]').length
                        try {

                            if (x == 'reply') {
                                if (tweetContentlength == 3) {
                                    tweetContent = article.querySelectorAll('[dir="auto"][lang]')[2].textContent + "\n\n";
                                } else if (tweetContentlength == 2 && article.querySelector('[aria-expanded="true"]') == null) { // 判断是否有翻译按钮 存在翻译
                                    tweetContent = article.querySelectorAll('[dir="auto"][lang]')[1].textContent + "\n\n";
                                } else {
                                    console.log('没有找到推文文本内容')
                                }
                            }

                            if (x == 'content') {
                                if (tweetContentlength == 3) {
                                    for (var i = 0; i < 2; i++) {
                                        tweetContent += article.querySelectorAll('[dir="auto"][lang]')[i].textContent + "\n\n";
                                    }
                                } else if (tweetContentlength == 2 && article.querySelector('[aria-expanded="true"]') == null) {
                                    tweetContent = article.querySelectorAll('[dir="auto"][lang]')[0].textContent + "\n\n";
                                } else {

                                    for (var i = 0; i < tweetContentlength; i++) {
                                        tweetContent += article.querySelectorAll('[dir="auto"][lang]')[i].textContent + "\n\n";
                                    }

                                    if (tweetContent.length == 0) {
                                        tweetContent += '发现一条推文，\n分享给你！'
                                        console.log('没有找到推文文本内容')
                                    }

                                }
                            }

                            console.log('tweetContent: ' + tweetContent)

                        } catch (e) {
                            console.log('没有找到推文文本内容')
                            tweetContent = '发现一条推文，\n分享给你！'
                        }

                        return tweetContent;

                    }

                    var twContent_reply = '' // 获取推文内容

                    // twContent_reply
                    if (document.querySelectorAll("main[role='main']")[0].querySelectorAll('[data-testid="primaryColumn"]').length == 1) {
                        console.log('推文存在转发评论')

                        var masterline = document.querySelectorAll("main[role='main']")[0].querySelectorAll('[data-testid="primaryColumn"]')[0] ? document.querySelectorAll("main[role='main']")[0].querySelectorAll('[data-testid="primaryColumn"]')[0] : '';
                        var xp_ori = document.querySelectorAll("main[role='main']")[0].querySelectorAll('[data-testid="primaryColumn"]')[0].querySelectorAll('[data-testid="cellInnerDiv"]')[0] ? masterline.querySelectorAll('[data-testid="cellInnerDiv"]')[0] : ''; // 获取推文内容
                        var xp_reply = document.querySelectorAll("main[role='main']")[0].querySelectorAll('[data-testid="primaryColumn"]')[0].querySelectorAll('[data-testid="cellInnerDiv"]')[1] ? masterline.querySelectorAll('[data-testid="cellInnerDiv"]')[1] : '';
                        var xp_replybyreply = document.querySelectorAll("main[role='main']")[0].querySelectorAll('[data-testid="primaryColumn"]')[0].querySelectorAll('[data-testid="cellInnerDiv"]')[2] ? masterline.querySelectorAll('[data-testid="cellInnerDiv"]')[2] : ''; // 获取推文内容


                        [xp_ori, xp_reply, xp_replybyreply].forEach((x, index, array) => {
                            if (x !== '') {
                                console.log(`xp_ 索引: ${index}`);
                                console.log('xp_' + masterline.querySelectorAll('[dir="auto"][lang]').length + ' 个回复↩️')
                            } else {
                                console.log(`xp_ 索引: ${index}`);
                                console.log('xp_ ' + masterline.querySelectorAll('[dir="auto"][lang]').length + ' 个回复↩️')
                            }
                        })

                        console.log('xp_window.location.href:' + window.location.href)

                        if (regex_name.test(window.location.href) && article[i] !== xp_ori && (twdl_url(xp_ori) == window.location.href || twdl_url(xp_replybyreply) == window.location.href || twdl_url(xp_reply) == window.location.href)) { // 判断是否存在转发评论

                            var test = ''

                            if (twdl_url(xp_ori) == window.location.href) {
                                test = xp_ori
                                console.log('xp_ori: ' + twdl_url(xp_ori))
                            } else if (twdl_url(xp_reply) == window.location.href) {
                                test = xp_ori
                                console.log('xp_reply: ' + twdl_url(xp_reply))
                            } else if (twdl_url(xp_replybyreply) == window.location.href) {
                                test = xp_ori
                                console.log('xp_replybyreply: ' + twdl_url(xp_replybyreply))
                            } else {
                                console.log('无法匹配!')
                            }

                            twContent_reply = "✍️ Reply Quote from " + userName(xp_ori, 'nickName') + "@" + userName(xp_ori) + ":\n" + getTweetContent(test, 'content')// 获取推文内容

                        } else {
                            twContent_reply = '';
                        }
                    }

                    function getQuote(article, x) {
                        // twEmojiToText(article) // 替换推文内容中的Emoji为文本
                        var getQuote = ''
                        if (x == 'reply') { // reply
                            getQuote = article.querySelectorAll('[dir="auto"][lang]')[0].parentElement.parentElement.textContent
                            //// getQuote = "@" + userName(article) + " " + userName(article, 'nickName') + ": " + article.querySelectorAll('[dir="auto"][lang]')[0].parentElement.parentElement.textContent
                            console.log('getQuote: ' + getQuote)
                        } else { // retweet
                            if (article.querySelectorAll('[dir="auto"][lang]').length == 2) {
                                console.log(article.querySelectorAll('[dir="auto"][lang]').length + ' length')
                                if (article.querySelector('[aria-expanded="true"]') !== null) { // 存在翻译
                                    if (article.querySelectorAll('[dir="auto"][lang]')[1]) {
                                    }
                                } else { // 存在回复

                                    try {

                                        if (article.querySelectorAll('[dir="auto"][lang]')[1].parentElement.parentElement.querySelector('[dir="ltr"][aria-hidden="true"]').textContent == ' · ') { } else {
                                            article.querySelectorAll('[dir="auto"][lang]')[1].parentElement.parentElement.querySelector('[dir="ltr"][aria-hidden="true"]').textContent = " · "
                                            article.querySelectorAll('[dir="auto"][lang]')[1].parentElement.parentElement.querySelector('time').textContent = " " + article.querySelectorAll('[dir="auto"][lang]')[1].parentElement.parentElement.querySelector('time').textContent + " · "
                                            article.querySelectorAll('[dir="auto"][lang]')[1].parentElement.parentElement.querySelector('span[dir="ltr"]').textContent = " · " + article.querySelectorAll('[dir="auto"][lang]')[1].parentElement.parentElement.querySelector('span[dir="ltr"]').textContent + " · " // 修改引用回复内容 + ·
                                        }
                                    } catch (e) {
                                        console.log('没有发现 . ')
                                    }
                                    getQuote = article.querySelectorAll('[dir="auto"][lang]')[1].parentElement.parentElement.textContent // effect
                                    console.log('getQuote: ' + getQuote)
                                }
                            } else if (article.querySelectorAll('[dir="auto"][lang]').length == 3) { // 存在翻译 回复
                                try { // span[dir="ltr"]
                                    if (article.querySelectorAll('[dir="auto"][lang]')[1].parentElement.parentElement.querySelector('[dir="ltr"][aria-hidden="true"]').textContent == ' · ') { } else {
                                        article.querySelectorAll('[dir="auto"][lang]')[1].parentElement.parentElement.querySelector('[dir="ltr"][aria-hidden="true"]').textContent = " · "
                                        article.querySelectorAll('[dir="auto"][lang]')[1].parentElement.parentElement.querySelector('time').textContent = " " + article.querySelectorAll('[dir="auto"][lang]')[1].parentElement.parentElement.querySelector('time').textContent + " · "
                                        article.querySelectorAll('[dir="auto"][lang]')[1].parentElement.parentElement.querySelector('span[dir="ltr"]').textContent = " · " + article.querySelectorAll('[dir="auto"][lang]')[1].parentElement.parentElement.querySelector('span[dir="ltr"]').textContent + " · " // 修改引用回复内容 + ·
                                    }
                                } catch (e) {
                                    console.log('没有发现 . ')
                                }

                                getQuote = article.querySelectorAll('[dir="auto"][lang]')[2].parentElement.parentElement.textContent // efect

                                try {
                                    console.log(article.querySelectorAll('[dir="auto"][lang]')[1].parentElement.parentElement.querySelector('time').textContent)
                                } catch (e) {
                                    console.log('没有发现时间')
                                }
                                console.log('getQuote: ' + getQuote)
                            } else {
                                console.log(article.querySelectorAll('[dir="auto"][lang]').length + ' length')
                            }
                            console.log('twContent_retweetComments: ' + getQuote)
                        }
                        return getQuote
                    }

                    if (fcNumber == '1') {
                        alert('没有找到推文文本内容!')
                    } else {

                        var twContent_ori = getTweetContent(article[i], 'content') // 获取推文内容
                        var twContent_retweetComments = getQuote(article[i]);
                        var twlikesCount = article[i].querySelector('div[aria-label][role="group"]').getAttribute('aria-label');
                        var twvideosCount = article[i].querySelectorAll('[data-testid="videoPlayer"]').length;
                        var twimgsCount = article[i].querySelectorAll("img[src*='name=']").length;
                        var twimgsElement = article[i].querySelectorAll("img[src*='name=']");
                        var twUrl = twdl_url(article[i])
                        var dlNmae = userName(article[i])
                        var twTime = timeRight;
                        var twUsername = userName(article[i], 'nickName') + "@" + userName(article[i]);

                        tw2Canvas_fc(twContent_ori, twUsername, twTime, dlNmae, twUrl, twimgsCount, twvideosCount, twlikesCount, twContent_retweetComments, twContent_reply, twimgsElement, twAvatar, twAvatarUrl)
                        console.log('以图片形式分享推文文本内容')
                    }

                }


                // 隐藏所有按钮
                var hiddenDiv = document.createElement('button')
                hiddenDiv.className = 'twdl twdlhidden'
                hiddenDiv.innerText = '隐藏'
                hiddenDiv.onclick = function () {
                    article[i].querySelector('.house').style.display = 'none'
                    // alert('已隐藏')
                }

                var imgsdownloader = document.createElement('a')
                imgsdownloader.className = 'twdl download_pics twdlimgs'
                imgsdownloader.innerText = dlpics_innerText()

                article[i].querySelectorAll("img[src*='name=']").forEach((x) => {
                    var a = document.createElement('a')
                    a.href = x.src
                    a.className = "twdl_" + userName(article[i])
                    house.appendChild(a)
                    console.log("图片地址: " + a.href)
                })



                // 创建按钮容器
                var twdlContainerDown = document.createElement('div')
                twdlContainerDown.className = 'twdlContainerDown'

                var twdlContainerHelp = twdlContainerDown.cloneNode(true)



                var arrayContainer = [imgsdownloader, snapvid, twee /*twittervideomp*/] // 下载器集中一处
                arrayContainer.forEach((x) => {
                    twdlContainerDown.appendChild(x)
                })

                var arrayContainerClone = [help, hiddenDiv]
                arrayContainerClone.forEach((x) => {
                    twdlContainerHelp.appendChild(x)
                })

                var array = [twdlContainerDown, tw2Canvas2Share, twdlContainerHelp]

                array.forEach((x) => {
                    house.appendChild(x)
                })


                if (article[i].querySelectorAll("div.css-175oi2r.r-12kyg2d")[0] && article[i].querySelector('[data-testid="videoPlayer"]') && article[i].querySelectorAll('[dir=auto][lang]')[0] == undefined) { // 推文存在文字图片且有视频的情况下
                    //article[i].querySelectorAll("div.css-175oi2r.r-12kyg2d")[0].appendChild(house);
                    article[i].querySelector('[data-testid="videoPlayer"]').parentElement.parentElement.appendChild(house);
                    ////article[i].querySelectorAll('[dir=auto][lang]')[0].parentElement.appendChild(house);
                    console.log('//x 推文存在文字图片且有视频的情况下')

                } else if (article[i].querySelectorAll('[dir=auto][lang]')[0] && article[i].querySelector('[data-testid="videoPlayer"]')) {  // 推文存在文字且有视频的情况下
                    article[i].querySelectorAll('[dir=auto][lang]')[0].parentElement.appendChild(house);
                    console.log('//x 推文存在文字且有视频的情况下')

                } else if (article[i].querySelector('[data-testid="videoPlayer"]')) { // 推文没有文字图片仅有视频的情况下
                    article[i].querySelector("[data-testid='videoComponent']").appendChild(house);
                    console.log('//x 推文没有文字图片仅有视频的情况下')

                } else if (article[i].querySelectorAll('[dir=auto][lang]')[0] && article[i].querySelectorAll("img[src*='name=']").length >= 1) { // 有图片也有文字的情况下
                    article[i].querySelectorAll('[dir=auto][lang]')[0].parentElement.appendChild(house);
                    article[i].querySelectorAll("img[src*='name=']").forEach((x) => {
                        x.src = x.src.replace(large_regex, 'name=4096x4096')
                        console.log('4096x4096')
                    })

                } else if (article[i].querySelectorAll("img[src*='name=']").length >= 1 && article[i].querySelectorAll("img")[1] !== null) { // 仅只有图片的情况下
                    // article[i].querySelectorAll("img[src*='name=']")[0].parentNode.appendChild(house);
                    house.classList.add('houseab');
                    article[i].querySelectorAll("div[aria-labelledby]")[0].parentNode.insertBefore(house, article[i].querySelectorAll("div[aria-labelledby]")[0].nextElementSibling)

                    article[i].querySelectorAll("img[src*='name=']").forEach((x) => {
                        x.src = x.src.replace(large_regex, 'name=4096x4096')
                        console.log('//x name=4096x4096')
                    })
                    console.log('//x 只有图片的情况下')
                } else {
                    article[i].querySelectorAll('[dir=auto][lang]')[0].parentElement.append(house);
                    // document.querySelectorAll('[data-testid="cellInnerDiv"]')[0].querySelectorAll('[dir=auto][lang]')[0].parentElement.append(house);
                    console.log('//x [dir=auto][lang]') // 2333

                }

                // } catch (error) { }

                imgsdownloader.addEventListener('click', () => {
                    dlpicsfromURL(get_imgsURL(article[i], "twdl_" + userName(article[i])), userName(article[i]), '', userName(article[i], 'nickName'))
                })


            } else {
                console.log(userName(article[i]) + " " + twdl_url(article[i]) + " 啥也没有...")
            }

        }

    }
}

window.addEventListener('load', function () {
    console.log('页面加载成功🏅...')
    twdl()
});

window.onpopstate = function (event) {
    twdl()
    console.log("URL has changed!");
}

setInterval(() => {
    var scrollY = window.pageYOffset;
    setTimeout(() => {
        if (scrollY !== window.pageYOffset) {
            twdl()
            console.log('滚动条动了...')
        } else {
            console.log('滚动条未动...')
        }
    }, 2500)
}, 1500)



function getTwitterUrlFromHash() {
    // 1. 定义匹配规则
    var twURL_regex = new RegExp(/^https:\/\/x\.com\/.*?\/status\/\d{10,100}(\/.*)?$/gi);

    // 2. 获取当前 URL 中 # 后面的部分
    var targetUrl = window.location.hash.substring(1);

    // 3. 重置 RegExp 的 lastIndex（避免带有 /g 标识时连续调用的匹配状态残留）
    twURL_regex.lastIndex = 0;

    // 4. 校验并返回结果
    if (twURL_regex.test(targetUrl)) {
        return targetUrl;
    } else {
        console.warn("Hash 中的 URL 不符合推特链接格式:", targetUrl);
        return null;
    }
}

// 调用示例
var twitterUrl = getTwitterUrlFromHash();
console.log("提取到的合法推特链接:", twitterUrl);


function inDownloaderPage() { // 获取当前网页 url -> 给 input 赋值 -> 点击下载按钮
    // 当前网页是下载器页面时，获取当前网页 url -> 给 input 赋值 -> 点击下载按钮

    if (window.location.href.match(/(snapvid\.net)/gi) && document.querySelector('.btn-red') !== null) { // snapvid 
        if (document.querySelector('#s_input') !== null) {
            document.querySelector('#s_input').value = getTwitterUrlFromHash()
            setTimeout(() => {
                if (document.querySelector('#s_input').value == window.location.href) {
                } else if (document.querySelector('#s_input').value.match(twURL_regex)) {
                    document.querySelector('.btn-red').click()
                }
            }, 500)
        }
    }


    if (window.location.href.match(/(twittervid\.com)/gi)) { // vid
        if (document.querySelector('#tweetUrl') !== null && document.querySelector('#loadVideos') !== null) {
            document.querySelector('#tweetUrl').value = window.location.href.replace('https://twittervid.com/#', '')
            if (document.querySelector('#tweetUrl').value == 'https://twittervid.com/') {
            } else if (document.querySelector('#tweetUrl').value.match(twURL_regex)) {
                document.querySelector('#loadVideos').click()
            }

        }
    }

    if (window.location.href.match(/(twittervideodownloader\.com)/gi)) { // loader 获取url 并点击下载按钮
        if (document.querySelector('#tweetURL') !== null && document.querySelector('#submitBtn') !== null) {
            document.querySelector('#tweetURL').value = window.location.href.replace('https://twittervideodownloader.com/#', '')
            if (document.querySelector('#tweetURL').value == 'https://twittervideodownloader.com/') {
            } else if (document.querySelector('#tweetUrl').value.match(twURL_regex)) {
                document.querySelector('#submitBtn').click()
            }
        }
    }

    if (window.location.href.match(/(tweeload\.com)/gi)) { // twee 获取url 并点击下载按钮

        setTimeout(() => {

            // 立即执行的函数，避免污染全局作用域
            (function () {
                // 获取当前 URL 中 # 后面的部分
                const urlHash = window.location.hash;

                // 检查 hash 是否存在并且看起来像一个推文/X的链接
                // 我们检查它是否包含 /status/ 来判断
                if (urlHash && urlHash.includes('/status/')) {

                    // 使用正则表达式来提取纯数字的状态ID
                    // 这样做比分割字符串更可靠，可以处理像 /analytics 这样的尾部
                    const match = urlHash.match(/\/status\/(\d+)/);

                    // 检查是否成功匹配到了 ID
                    if (match && match[1]) {
                        const statusId = match[1];

                        // 构建新的目标 URL
                        const newUrl = tweeload_url() + `/i/status/${statusId}`;

                        // 执行重定向
                        window.location.href = newUrl;
                    }
                }
            })();

        }, 1000)
    }

    if (window.location.href.match(/(twittervideomp4\.com)/gi)) { // twittervideomp4 获取url 并点击下载按钮
        setTimeout(() => {
            if (document.querySelector('#txt-url') !== null && document.querySelector('button#btn-submit') !== null) {
                document.querySelector('#txt-url').value = window.location.href.replace('https://twittervideomp4.com/#', '')
                if (document.querySelector('#txt-url').value == 'https://twittervideomp4.com/') {
                } else if (document.querySelector('#txt-url').value.match(twURL_regex)) {
                    document.querySelector('button#btn-submit').click()
                }
            }
        }, 1000)
    }

}

if (window.location.href.match(/(twittervid\.com|twittervideodownloader|tweeload|snapvid|twittervideomp4)/gi) !== null) {
    inDownloaderPage()
}


// 23333
// 分享推文截图按钮
// 以图片形式分享推文文本内容

async function getTweetImageSource(url) {
    return new Promise((resolve) => {
        const img = new Image();
        img.setAttribute("crossOrigin", "anonymous");
        img.src = url.replace("name=small", "name=large"); // 转换为高清图
        img.onload = () => resolve(img);
        img.onerror = () => resolve(null);
    });
}

async function tw2Canvas_fc(twContent_ori, twUsername, twTime, dlNmae, twUrl, twimgsCount, twvideosCount, twlikesCount, twContent_retweetComments, twContent_reply, twimgsElement, twAvatar, twAvatarUrl) {
    console.log("Message//" + twContent_ori, twUsername, twTime, dlNmae, twUrl, twContent_reply, twAvatar, twAvatarUrl);


    /**
     * 绘制圆形头像并居中
     * @param {CanvasRenderingContext2D} ctx - 画布上下文
     * @param {string} url - 头像地址
     * @param {number} canvasWidth - 画布宽度
     * @param {number} y - 起始纵坐标
     * @param {number} size - 头像尺寸（直径）
     */
    async function drawCenteredAvatar(ctx, url, canvasWidth, y, size) {
        if (!url) return y;

        return new Promise((resolve) => {
            const img = new Image();
            img.setAttribute("crossOrigin", "anonymous"); // 必须处理跨域
            img.src = url;

            img.onload = () => {
                const radius = size / 2;
                const x = (canvasWidth - size) / 2; // 计算居中 X 坐标

                ctx.save();
                // 1. 创建圆形路径
                ctx.beginPath();
                ctx.arc(x + radius, y + radius, radius, 0, Math.PI * 2);
                ctx.closePath();

                // 2. 裁切并绘制
                ctx.clip();
                ctx.drawImage(img, x, y, size, size);

                // 3. 恢复上下文并添加白色边框（可选，增加美观度）
                ctx.restore();
                ctx.strokeStyle = "rgba(255, 255, 255, 0.8)";
                ctx.lineWidth = 4;
                ctx.beginPath();
                ctx.arc(x + radius, y + radius, radius, 0, Math.PI * 2);
                ctx.stroke();

                resolve(y + size + 20); // 返回更新后的 currentY，增加 20px 间距
            };

            img.onerror = () => {
                console.warn("头像加载失败，跳过绘制");
                resolve(y);
            };
        });
    }

    const twContent_ori_segments = twContent_ori
        .split(/\n+/)           // 匹配一个或多个换行符，将文本切分为纯段落
        .map(s => s.trim())     // 去除每一行前后的不可见空格
        .filter(s => s !== ""); // 过滤掉彻底的空行

    console.log("twContent_ori:", twContent_ori);
    /* console.log("resultArray_ori:", resultArray_ori); */
    console.log("twContent_ori_segments:", twContent_ori_segments);

    // 创建画布元素
    var canvas = document.createElement("canvas");
    canvas.id = "tweetCanvas";
    canvas.style.zIndex = "-9999";
    canvas.style.position = "absolute";
    const context = canvas.getContext("2d");

    // 设置画布宽度和默认配置
    canvas.width = 1170;
    var paddingbottom = 125 * 1.3;

    if (typeof QRCode !== 'undefined') {
        paddingbottom = 150 * 2.4;
    }

    const padding = { left: 32 * 1.8, right: 32 * 1.8, top: 125 * 1.8, bottom: paddingbottom }; // 上下左右内边距
    const lineSpacing = 7; // 行高设置为 12px 7


    if (twimgsCount >= 1) {
    } else {
        twimgsCount = 0;
    }

    if (twvideosCount >= 1) {
    } else {
        twvideosCount = 0;
    }

    var twContent_retweetComments_true = ''
    if (twContent_retweetComments == '') {
    } else {
        twContent_retweetComments_true = '✍️ Retweet Quote from "' + twContent_retweetComments + '"'
    }

    var twContent_reply_true = ''
    if (twContent_reply == '') {
        twContent_reply_true = []
    } else {

        try { var tempArr_reply = twContent_reply.split('\n\n') } catch (e) {
        }


        // --- 修正为：纯净的段落拆分 ---
        const twContent_reply_segments = twContent_reply
            .split(/\n+/)           // 匹配一个或多个换行符，将文本切分为纯段落
            .map(s => s.trim())     // 去除每一行前后的不可见空格
            .filter(s => s !== ""); // 过滤掉彻底的空行

        twContent_reply_true = twContent_reply_segments;
        console.log("twContent_reply:", twContent_reply);


        // twContent_reply_true = 'reply Quote✍️ "' + twContent_reply + '"'
    }

    // 文本主体

    const textsMain = [
        ...twContent_ori_segments.map(segment => ({
            content: segment,
            fontSize: 40 * 1.8,
            isParagraph: true // 标记这是一个主要段落
        })),
        // 只有在有转发/回复内容时才加入
        ...(twContent_retweetComments_true ? [{ content: twContent_retweetComments_true, fontSize: 22 * 1.8 }] : []),
        ...twContent_reply_true.map(segment => ({ content: segment, fontSize: 22 * 1.8 })),
    ];


    // 文本内容及其样式
    const textsSec = [ // 内容
        { content: " ", fontSize: 15 * 1.8 },
        { content: "————————————————", fontSize: 15 * 1.8 },
        { content: "图片 " + twimgsCount + " 张、 " + "视频 " + twvideosCount + " 个; ", fontSize: 15 * 1.8 },
        { content: twlikesCount + ";", fontSize: 15 * 1.8 },
        { content: " ", fontSize: 15 * 1.8 },
        { content: twUsername, fontSize: 25 * 1.8 },
        { content: twUrl, fontSize: 15 * 1.8 },
        { content: twTime, fontSize: 15 * 1.8 },
    ];


    // 计算画板🎨高度
    let totalImgsHeight = 0;
    const loadedImgObjects = [];
    // const contentWidth = 600 * 2 - padding.left - padding.right;
    const contentWidth = canvas.width - padding.left - padding.right;
    const gap = 8 * 2; // 图片间的缝隙

    if (twimgsCount > 0 && typeof twimgsElement !== 'undefined') {
        const imgNodes = Array.from(twimgsElement);

        // 预加载所有图片
        for (let node of imgNodes) {
            const img = await new Promise((resolve) => {
                const tempImg = new Image();
                tempImg.setAttribute("crossOrigin", "anonymous");
                tempImg.src = node.src.replace(/&name=[a-zA-Z0-9]+/, '&name=large');
                tempImg.onload = () => resolve(tempImg);
                tempImg.onerror = () => resolve(null);
            });
            if (img) loadedImgObjects.push(img);
        }

        // 根据图片数量计算总占用高度
        if (loadedImgObjects.length === 1) {
            const ratioH = (loadedImgObjects[0].height / loadedImgObjects[0].width) * contentWidth;
            totalImgsHeight = Math.min(ratioH, 400 * 2); // 单图限高 400px
        } else if (loadedImgObjects.length === 2) {
            totalImgsHeight = 200 * 2; // 两图并排，总高仅 200px
        } else if (loadedImgObjects.length === 3) {
            totalImgsHeight = (200 * 2) + gap + (120 * 2); // 上大下小
        } else if (loadedImgObjects.length >= 4) {
            totalImgsHeight = (150 * 2) * 2 + gap; // 2x2 网格
        }
    }



    // 计算每段文本的行数及总高度

    function calculateTextHeight() {
        // 1. 定义与渲染逻辑完全一致的安全宽度
        const safeContentWidth = canvas.width - padding.left - padding.right - 80;
        let currentTotalHeight = padding.top + padding.bottom;

        // 2. 计算 textsMain 的物理高度
        textsMain.forEach((text, index) => {
            const lines = wrapText(context, text.content, safeContentWidth, text.fontSize);
            // 行高 + 行间距
            currentTotalHeight += lines.length * (text.fontSize + lineSpacing);
            // 段落间距修正：必须与渲染循环中的 currentY += text.fontSize * 0.5 完全一致
            if (index < textsMain.length - 1) {
                currentTotalHeight += text.fontSize * 0.5;
            }
        });

        // 3. 计算 textsSec (回复/转发内容) 的物理高度
        textsSec.forEach((text, index) => {
            const lines = wrapText(context, text.content, safeContentWidth, text.fontSize);
            currentTotalHeight += lines.length * (text.fontSize + lineSpacing);
            if (index < textsSec.length - 1) {
                currentTotalHeight += text.fontSize * 0.5;
            }
        });

        // 4. 加上图片、间距以及底部的固定元素（二维码等）
        // 建议 totalImgsHeight 后面额外加 100px 的缓冲带
        const finalHeight = currentTotalHeight + totalImgsHeight + 50;

        return finalHeight;
    }


    // 自动换行

    // --- 修改 v3.js 中的 wrapText 函数 ---
    function wrapText(ctx, text, maxWidth, fontSize) {
        ctx.font = `${fontSize}px Arial`;

        // 核心修正：不再分词，直接按字符/Emoji 拆分
        const words = Array.from(text);
        const lines = [];
        let currentLine = "";

        words.forEach((word) => {
            const testLine = currentLine + word;
            const testWidth = ctx.measureText(testLine).width;

            // 如果加上这个字就超了，则换行
            if (testWidth > maxWidth && currentLine !== '') {
                lines.push(currentLine);
                currentLine = word;
            } else {
                currentLine = testLine;
            }
        });

        if (currentLine) lines.push(currentLine.trim());
        return lines;
    }


    // 设置画布高度
    canvas.height = calculateTextHeight();

    // 1. 创建垂直渐变（垂直渐变比对角线更具平衡感）
    const dpr = window.devicePixelRatio || 2;
    const gradient = context.createLinearGradient(0, 0, 0, canvas.height);
    gradient.addColorStop(0, "red");
    gradient.addColorStop(1, "blue");
    context.fillStyle = gradient;
    context.fillRect(0, 0, canvas.width, canvas.height);

    // 2. 注入“胶片颗粒”质感层 (Film Grain)
    // 这一步能消除纯色块的塑料感，让背景看起来像昂贵的纸张或屏幕
    context.save();
    context.globalCompositeOperation = 'screen';
    context.globalAlpha = 0.03; // 极低透明度，若有若无
    for (let i = 0; i < 800; i++) {
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        const radius = Math.random() * 1.5 * dpr;
        context.fillStyle = "#ffffff";
        context.beginPath();
        context.arc(x, y, radius, 0, Math.PI * 2);
        context.fill();
    }
    context.restore();


    // 绘制文本主体

    let currentY = padding.top;

    textsMain.forEach((text, index) => {
        // 修正：额外减去 40 像素作为安全缓冲区，防止文字戳出装饰线
        const safeMaxWidth = canvas.width - padding.left - padding.right - 80;
        const lines = wrapText(context, text.content, canvas.width - padding.left - padding.right - 80, text.fontSize);
        context.font = `${text.fontSize}px Arial`;
        context.fillStyle = "white";

        lines.forEach((line) => {
            const x = padding.left;
            context.fillText(line, x, currentY);
            currentY += text.fontSize + lineSpacing; // 行间距
        });

        // --- 核心修正：段落间距逻辑 ---
        // 只有当不是最后一个元素时，才增加段落间的额外间距
        if (index < textsMain.length - 1) {
            currentY += text.fontSize * 0.5; // 这里 0.5 可以根据审美调整段落间距
        }
    });


    // 绘制推文内图片 (截取模式：保持比例，超出隐藏)
    // --- 阶段 B：执行网格绘制逻辑 ---
    const drawCoverImage = (img, x, y, w, h) => {
        const targetRatio = w / h;
        let sx, sy, sw, sh;
        if (img.width / img.height > targetRatio) {
            sh = img.height;
            sw = img.height * targetRatio;
            sx = (img.width - sw) / 2;
            sy = 0;
        } else {
            sw = img.width;
            sh = img.width / targetRatio;
            sx = 0;
            sy = (img.height - sh) / 2;
        }
        context.save();
        context.beginPath();
        context.roundRect(x, y, w, h, 10 * 2);
        context.clip();
        context.drawImage(img, sx, sy, sw, sh, x, y, w, h);
        context.restore();
    };

    // 建议在 drawCoverImage 附近添加
    function drawCircleAvatar(ctx, img, x, y, size) {
        if (!img) return;
        ctx.save(); // 1. 物理状态隔离
        ctx.beginPath();

        // 2. 建立圆形路径（这等同于 radius 为 50% 的 drawRoundRect）
        const centerX = x + size / 2;
        const centerY = y + size / 2;
        const radius = size / 2;
        ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);

        // 3. 锁定裁切区域
        ctx.clip();

        // 4. 绘制头像（假设头像是 1:1，直接拉伸填充）
        ctx.drawImage(img, x, y, size, size);

        ctx.restore(); // 5. 状态释放，防止影响后续绘图
    }

    // 具体的排列策略
    if (loadedImgObjects.length === 1) {
        drawCoverImage(loadedImgObjects[0], padding.left, currentY, contentWidth, totalImgsHeight);
        currentY += totalImgsHeight + gap;
    } else if (loadedImgObjects.length === 2) {
        const w = (contentWidth - gap) / 2;
        drawCoverImage(loadedImgObjects[0], padding.left, currentY, w, totalImgsHeight);
        drawCoverImage(loadedImgObjects[1], padding.left + w + gap, currentY, w, totalImgsHeight);
        currentY += totalImgsHeight + gap;
    } else if (loadedImgObjects.length === 3) {
        // 上一 下二
        const topH = 200 * 2;
        const bottomH = 120 * 2;
        const w2 = (contentWidth - gap) / 2;
        drawCoverImage(loadedImgObjects[0], padding.left, currentY, contentWidth, topH);
        currentY += topH + gap;
        drawCoverImage(loadedImgObjects[1], padding.left, currentY, w2, bottomH);
        drawCoverImage(loadedImgObjects[2], padding.left + w2 + gap, currentY, w2, bottomH);
        currentY += bottomH + gap;
    } else if (loadedImgObjects.length >= 4) {
        // 2x2 网格
        const w = (contentWidth - gap) / 2;
        const h = 150 * 2;
        drawCoverImage(loadedImgObjects[0], padding.left, currentY, w, h);
        drawCoverImage(loadedImgObjects[1], padding.left + w + gap, currentY, w, h);
        currentY += h + gap;
        drawCoverImage(loadedImgObjects[2], padding.left, currentY, w, h);
        drawCoverImage(loadedImgObjects[3], padding.left + w + gap, currentY, w, h);
        currentY += h + gap;
    }


    // 绘制文本 喜欢 收藏 评价

    textsSec.forEach((text, index) => {
        const lines = wrapText(context, text.content, canvas.width - padding.left - padding.right, text.fontSize);
        // context.font = `${text.fontSize}px Arial`;
        context.fillStyle = "white";

        lines.forEach((line) => {
            const textWidth = context.measureText(line).width;
            // const x = (canvas.width - textWidth) / 2; // 居中
            const x = padding.left; // 左对齐 居左
            context.fillText(line, x, currentY);
            currentY += text.fontSize + lineSpacing;
        });

        currentY += lineSpacing;
    });



    // 在 tw2Canvas_fc 函数末尾添加以下代码，用于生成二维码并绘制到画布上
    function drawQRCode(url, canvas, context, currentY) {

        // 检查 qrcode 库是否已加载
        // 目前默认不加载 qrcode 
        typeof QRCode === 'undefined' && console.error('QRCode is not defined. Please ensure the qrcode library is loaded.');

        if (typeof QRCode === 'undefined') {
            console.error('QRCode library is not loaded.');
            return;
        } else {
            console.log('QRCode library is loaded.');
            // 创建二维码画布

            const qrCanvas = document.createElement("canvas");
            const qrSize = 200; // 二维码大小
            qrCanvas.width = qrSize;
            qrCanvas.height = qrSize;

            // 使用 qrcode 库生成二维码
            QRCode.toCanvas(qrCanvas, url, { width: qrSize, margin: 1 }, (error) => {
                if (error) {
                    console.error("生成二维码失败:", error);
                    return;
                }

                // 将二维码绘制到主画布上
                const qrX = (canvas.width - qrSize) / 2; // 居中
                context.drawImage(qrCanvas, qrX, currentY);

                // 在二维码下方添加两行小字
                const textFontSize = 14; // 小字字体大小
                context.font = `${textFontSize}px Arial`;
                context.fillStyle = "white";
                const text1 = "保存至相册->长按二维码识别";
                const text2 = "跳转查看";

                // 计算文本位置
                const textY1 = currentY + qrSize + 20; // 第一行文字的 Y 坐标
                const textY2 = textY1 + textFontSize + 5; // 第二行文字的 Y 坐标
                const textX1 = (canvas.width - context.measureText(text1).width) / 2; // 居中
                const textX2 = (canvas.width - context.measureText(text2).width) / 2; // 居中

                // 绘制文字
                context.fillText(text1, textX1, textY1);
                context.fillText(text2, textX2, textY2);
            });

        }
    }



    // 在绘制二维码之前，先绘制头像
    if (twAvatarUrl) {
        // 使用 await 确保头像绘制完成后再执行二维码绘制
        currentY += 30; // 预留 10px 间距
        currentY = await drawCenteredAvatar(context, twAvatarUrl, canvas.width, currentY, 120);
    }


    // 调用 drawQRCode 函数，将二维码和文字绘制到画布最下方
    try {
        drawQRCode(twUrl, canvas, context, currentY);
        console.log('生成二维码...');
    } catch (e) {
        console.log('没有找到二维码');
    }

    // 将画布内容转换为图片
    const imageData = canvas.toDataURL("image/jpeg", 1.0)

    // 修改后的悬浮层代码
    const overlay = document.createElement("div");
    overlay.id = "imageOverlay";
    overlay.style.position = "fixed";
    overlay.style.top = "0";
    overlay.style.left = "0";
    overlay.style.width = "100%";
    overlay.style.height = "100%";
    overlay.style.backgroundColor = "rgba(0, 0, 0, 0.8)";
    overlay.style.display = "flex";
    overlay.style.justifyContent = "center";
    overlay.style.alignItems = "center";
    overlay.style.zIndex = "9999";
    overlay.style.pointerEvents = "auto"; // 确保悬浮层可以响应鼠标事件

    // 添加点击事件，点击空白处关闭悬浮层
    function isMobile() {
        return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    }

    if (isMobile()) {
        console.log("当前浏览器为手机端");
    } else {
        console.log("当前浏览器为PC端");
        overlay.onclick = (event) => {
            if (event.target === overlay) {
                document.body.removeChild(overlay);
            }
        };
    }

    // 创建图片元素
    const img = document.createElement("img");
    img.src = imageData;
    img.style.maxWidth = "90%";
    img.style.maxHeight = "90%";
    img.style.borderRadius = "0px";

    // 创建关闭按钮
    const closeButton = document.createElement("button");
    closeButton.innerText = "关闭";
    closeButton.style.position = "absolute";
    closeButton.style.top = "20px";
    closeButton.style.right = "20px"; // 调整位置，避免与下载按钮重叠
    closeButton.style.padding = "10px 20px";
    closeButton.style.fontSize = "16px";
    closeButton.style.color = "white";
    closeButton.style.backgroundColor = "red";
    closeButton.style.border = "none";
    closeButton.style.borderRadius = "5px";
    closeButton.style.cursor = "pointer";

    // 关闭按钮点击事件
    closeButton.onclick = () => {
        document.body.removeChild(overlay);
    };

    // 创建下载按钮
    const downloadButton = document.createElement("button");
    downloadButton.innerText = "下载";
    downloadButton.style.position = "absolute";
    downloadButton.style.top = "20px";
    downloadButton.style.right = "100px";
    downloadButton.style.padding = "10px 20px";
    downloadButton.style.fontSize = "16px";
    downloadButton.style.color = "white";
    downloadButton.style.backgroundColor = "green";
    downloadButton.style.border = "none";
    downloadButton.style.borderRadius = "5px";
    downloadButton.style.cursor = "pointer";

    // 下载按钮点击事件
    downloadButton.onclick = () => {
        const fileName = twUsername.replace(/[\\/:*?"<>|]/g, "_") + ".jpg";
        if (typeof GM_download === "function") {
            GM_download(imageData, fileName);
        } else {
            const link = document.createElement("a");
            link.download = fileName;
            link.href = imageData;
            link.click();
        }
    };

    // 将按钮按顺序添加到悬浮层
    overlay.appendChild(downloadButton); // 下载按钮
    overlay.appendChild(closeButton); // 关闭按钮

    // 将图片添加到悬浮层
    overlay.appendChild(img);

    // 将悬浮层添加到页面
    document.body.appendChild(overlay);

}