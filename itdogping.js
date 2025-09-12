// == Nezha Dashboard IP Ping 按钮（稳定版，按钮在 IP 上方，并排显示）==
(function(){
    'use strict';

    if (!location.href.includes('/dashboard')) return;

    // 样式
    const style = document.createElement('style');
    style.textContent = `
        .nezha-ping-btn {
            display:inline-flex;
            align-items:center;
            justify-content:center;
            height:18px;
            line-height:18px;
            font-size:11px;
            padding:0 6px;
            margin-right:4px;
            border-radius:6px;
            cursor:pointer;
            user-select:none;
            border:1px solid #ccc;
            background:#f5f5f5;
            color:#000;
            text-decoration:none;
            white-space:nowrap;
        }
        .nezha-ping-btn:hover { filter:brightness(0.95); }
        html.dark .nezha-ping-btn {
            border:1px solid #555;
            background:#2f2f2f;
            color:#fff;
        }
        .nezha-ping-wrap {
            display:flex;
            flex-direction:row;
            flex-wrap:nowrap;
            gap:4px;
            margin-bottom:2px; /* 挤到 IP 上方 */
        }
    `;
    document.head.appendChild(style);

    function createPingButton(ip, isIPv4){
        const a = document.createElement('a');
        a.className='nezha-ping-btn';
        a.textContent = isIPv4 ? 'Pingv4' : 'Pingv6';
        a.href = isIPv4
            ? `https://www.itdog.cn/ping/${ip}`
            : `https://www.itdog.cn/ping_ipv6/${ip}`;
        a.target='_blank';
        a.rel='noopener noreferrer';
        return a;
    }

    function appendPingButtons(cell){
        if(!cell) return;
        if(cell.dataset.nzPingProcessed==='1') return;

        const text = cell.textContent.trim();
        if(!text) return;

        // 拆分 IPv4/IPv6
        const parts = text.split('/');
        const v4 = parts[0] && /^\d{1,3}(\.\d{1,3}){3}$/.test(parts[0]) ? parts[0] : null;
        const v6 = parts[1] && parts[1].includes(':') ? parts[1] : (text.includes(':') ? text : null);

        const wrap = document.createElement('div');
        wrap.className = 'nezha-ping-wrap';

        if(v4){
            const btn4 = createPingButton(v4, true);
            wrap.appendChild(btn4);
        }
        if(v6){
            const btn6 = createPingButton(v6, false);
            wrap.appendChild(btn6);
        }

        if(wrap.children.length > 0){
            cell.insertAdjacentElement('afterbegin', wrap); // 保证在 IP 上方
        }

        cell.dataset.nzPingProcessed='1';
    }

    function processTable(){
        document.querySelectorAll('tbody tr td').forEach(td => appendPingButtons(td));
    }

    function init(){
        processTable();
        // MutationObserver 监听异步渲染
        const observer = new MutationObserver(processTable);
        observer.observe(document.body, {childList:true, subtree:true, characterData:true});
        // 初始延迟兜底，保证 Vue 异步渲染的表格也处理
        setTimeout(processTable, 200);
    }

    if (document.readyState === 'loading') {
        window.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();