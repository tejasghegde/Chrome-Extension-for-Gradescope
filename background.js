chrome.action.onClicked.addListener((tabId) => {
        chrome.scripting.executeScript({
            target: {tabId: tabId.id},
            files: ["foreground.js"],
        },
        (injectionResults) => {
            if (chrome.runtime.lastError || 
                !injectionResults || !injectionResults.length) {
                return;
            }
            if (injectionResults[0].result !== true) {
                chrome.scripting.insertCSS({
                    target: {tabId: tabId.id},
                    files: ["foreground_styles.css"]
                })
            }
            else if (injectionResults[0].result === true) {
                chrome.tabs.query({active: true, lastFocusedWindow: true}, tabs => {
                    chrome.tabs.reload(tabId.id);
                });
                // chrome.scripting.removeCSS({
                //     target: {tabId: tabId.id},
                //     files: ["foreground_styles.css"]
                // })
            }
        });
});
