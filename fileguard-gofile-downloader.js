// ==UserScript==
// @name         FileGuard & Gofile Otomatik İndirici
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  fileguard.cc sayfalarında gofile linklerini bulur, seçilen linki açar ve gofile.io'da otomatik indirme başlatır.
// @author       xmtaha
// @match        https://fileguard.cc/*
// @match        https://gofile.io/*
// @grant        GM_openInTab
// ==/UserScript==

(function() {
    'use strict';

    if (window.location.hostname.includes('fileguard.cc')) {
        function findGofileLinks() {
            const links = Array.from(document.querySelectorAll('a[href*="gofile.io"]'));
            return links.map(link => link.href);
        }

        function showLinks(links) {
            if (links.length === 0) return;
            if (document.getElementById('auto-downloader-container')) return;
            const container = document.createElement('div');
            container.id = 'auto-downloader-container';
            container.style.position = 'fixed';
            container.style.top = '30px';
            container.style.right = '30px';
            container.style.background = '#f6fff6';
            container.style.border = '2px solid #4CAF50';
            container.style.borderRadius = '8px';
            container.style.padding = '20px';
            container.style.zIndex = 9999;
            container.style.maxWidth = '500px';
            container.style.boxShadow = '0 2px 8px rgba(0,0,0,0.1)';
            const title = document.createElement('div');
            title.textContent = 'Otomatik İndirme Yardımcısı';
            title.style.fontWeight = 'bold';
            title.style.fontSize = '20px';
            title.style.marginBottom = '10px';
            container.appendChild(title);
            const list = document.createElement('div');
            list.style.marginBottom = '15px';
            const checkboxes = [];
            links.forEach((link, idx) => {
                const row = document.createElement('div');
                row.style.marginBottom = '6px';
                const checkbox = document.createElement('input');
                checkbox.type = 'checkbox';
                checkbox.id = 'gofile_link_' + idx;
                checkbox.value = link;
                checkboxes.push(checkbox);
                const label = document.createElement('label');
                label.htmlFor = checkbox.id;
                let fileName = link.split('/').pop() || link;
                label.textContent = decodeURIComponent(fileName);
                label.style.marginLeft = '6px';
                row.appendChild(checkbox);
                row.appendChild(label);
                list.appendChild(row);
            });
            container.appendChild(list);
            const btnSelectAll = document.createElement('button');
            btnSelectAll.textContent = 'TÜMÜNÜ SEÇ';
            btnSelectAll.style.background = '#2196F3';
            btnSelectAll.style.color = 'white';
            btnSelectAll.style.border = 'none';
            btnSelectAll.style.padding = '8px 16px';
            btnSelectAll.style.marginRight = '10px';
            btnSelectAll.style.borderRadius = '4px';
            btnSelectAll.style.cursor = 'pointer';
            let allSelected = false;
            btnSelectAll.onclick = () => {
                allSelected = !allSelected;
                checkboxes.forEach(cb => cb.checked = allSelected);
                btnSelectAll.textContent = allSelected ? 'TÜMÜNÜ KALDIR' : 'TÜMÜNÜ SEÇ';
            };
            const btnDownload = document.createElement('button');
            btnDownload.textContent = 'SEÇİLENLERİ İNDİR';
            btnDownload.style.background = '#4CAF50';
            btnDownload.style.color = 'white';
            btnDownload.style.border = 'none';
            btnDownload.style.padding = '8px 16px';
            btnDownload.style.borderRadius = '4px';
            btnDownload.style.cursor = 'pointer';
            btnDownload.onclick = async () => {
                const checked = checkboxes.filter(cb => cb.checked);
                if (checked.length === 0) {
                    showMessage('Lütfen önce indirilecek dosyaları seçin!');
                    return;
                }
                btnDownload.disabled = true;
                btnDownload.textContent = 'Sırayla açılıyor...';
                for (const cb of checked) {
                    GM_openInTab(cb.value, {active: true, insert: true, setParent: true});
                    await new Promise(res => setTimeout(res, 1000));
                }
                btnDownload.disabled = false;
                btnDownload.textContent = 'SEÇİLENLERİ İNDİR';
            };
            container.appendChild(btnSelectAll);
            container.appendChild(btnDownload);
            document.body.appendChild(container);
            function showMessage(msg) {
                const messageBox = document.createElement('div');
                messageBox.style.cssText = `
                    position: fixed;
                    top: 20px;
                    left: 50%;
                    transform: translateX(-50%);
                    background-color: #ffc107;
                    color: #333;
                    padding: 15px 30px;
                    border-radius: 8px;
                    box-shadow: 0 4px 6px rgba(0,0,0,0.1);
                    z-index: 9999;
                    font-family: sans-serif;
                    opacity: 0;
                    transition: opacity 0.5s ease-in-out;
                `;
                messageBox.innerText = msg;
                document.body.appendChild(messageBox);
                setTimeout(() => { messageBox.style.opacity = '1'; }, 10);
                setTimeout(() => {
                    messageBox.style.opacity = '0';
                    messageBox.addEventListener('transitionend', () => {
                        messageBox.remove();
                    });
                }, 3000);
            }
        }

        showLinks(findGofileLinks());
    }
    else if (window.location.hostname.includes('gofile.io')) {
        window.addEventListener('load', () => {
            setTimeout(() => {
                const buttons = document.querySelectorAll('button');
                for (let btn of buttons) {
                    if (btn.textContent.includes('Download')) {
                        btn.click();
                        setTimeout(() => window.close(), 1500);
                        break;
                    }
                }
            }, 2000);
        });
    }
})();

