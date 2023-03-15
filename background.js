chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
    if (
        changeInfo.status == 'complete'
        && tab.active && tab.url.includes("https://lichess.org/training")
        && !tab.url.endsWith(document.querySelector(".infos.puzzle a").getAttribute("href"))
    ) {
        chrome.tabs.executeScript({
            file: 'content.js'
        });
    }
});
