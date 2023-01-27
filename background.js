chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
    if (changeInfo.status == 'complete' && tab.active && tab.url.includes("https://lichess.org/training")) {
        chrome.tabs.executeScript({
            file: 'content.js'
        });
    }
});
