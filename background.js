chrome.runtime.onInstalled.addListener(() => {
    chrome.storage.local.set({
        name: "0%"
    });
});

chrome.action.onClicked.addListener((tabId) => {
        // if (document.getElementById("ce_name") == undefined) {
            chrome.scripting.executeScript({
                target: {tabId: tabId.id},
                files: ["./foreground.js"],
            })
                .then(() => {
                    chrome.scripting.insertCSS({
                        target: {tabId: tabId.id},
                        files: ["./foreground_styles.css"],   // ./foreground_styles
                    })
                        .then(() => {
                            console.log("Injected foreground script");
                        });
                })
                .catch(err => console.log(err));
        // }
        // else {
        //     chrome.scripting.removeCSS({
        //         target: {tabId: tabId.id},
        //         files: ["./foreground_styles.css"]
        //     })
        // }
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