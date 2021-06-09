chrome.runtime.onInstalled.addListener(() => {
    chrome.storage.local.set({
        name: "0%"
    });
});

chrome.action.onClicked.addListener((tabId) => {
        chrome.scripting.executeScript({
            target: {tabId: tabId.id},
            files: ["foreground.js"],
        })
        chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
            if (request.message === "remove") {
                console.log("rajendra singh");
                chrome.scripting.removeCSS({
                    target: {tabId: tabId.id},
                    files: ["foreground_styles.css"]
                })
                console.log("done");
            } else {
                chrome.scripting.insertCSS({
                    target: {tabId: tabId.id},
                    files: ["foreground_styles.css"],
                })
            }
        })
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.message === "get_name") {
        chrome.storage.local.get("name", data => {
            if (chrome.runtime.lastError) {
                sendResponse({
                    message: "fail"
                });
                return;
            }
            sendResponse({
                message: "success",
                payload: data.name
            })
        });

        return true;
    } else if (request.message === "change_name") {
        chrome.storage.local.set({
            name: request.payload
        }, () => {
            if (chrome.runtime.lastError) {
                sendResponse({ message: "fail"});
                return;
            }
            sendResponse({message: "success"});
        })

        return true;
    }
});