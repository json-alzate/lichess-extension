document.addEventListener('DOMContentLoaded', function () {
    // Check if user is on lichess.org/training page
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        var currentTab = tabs[0];
        if (currentTab.url.indexOf("https://lichess.org/training") === -1) {
            document.getElementById("status").innerHTML = "This extension can only be used on the chess puzzle training page on lichess.org.";
        } else {
            document.getElementById("status").innerHTML = "This extension is active on the chess puzzle training page on lichess.org.";
        }
    });
});
