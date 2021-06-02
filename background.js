chrome.runtime.onInstalled.addListener(() => {
    chrome.storage.local.set({
        name: "0%"
    });
});



// chrome.tabs.onUpdated.addListener((tabId, changeInfo, 
//     tab) => {
//         if (changeInfo.status == "complete" && /^http/.test(tab.url)) {
//             chrome.scripting.insertCSS({
//                 target: { tabId: tabId},
//                 files: ["./button_styles.css"]   // ./foreground_styles
//             })
//                 .then(() => {
//                     chrome.scripting.executeScript({
//                         target: { tabId: tabId},
//                         files: ["button_script.js"]   // ./foreground
//                     })
//                         .then(() => {
//                             console.log("Injected button script")

//                             // chrome.tabs.sendMessage(tabId, {
//                             //     message: "change_name",
//                             //     payload: "John"
//                             // })
//                         });
//                 })
//                 .catch(err => console.log(err));
//         }
// });

chrome.action.onClicked.addListener((tabId) => {
        console.log(tabId);
        // if (changeInfo.status == "complete" && /^http/.test(tab.url)) {
            chrome.scripting.insertCSS({
                target: {tabId: tabId},
                files: ["button_styles.css"]   // ./foreground_styles
            })
                .then(() => {
                    chrome.scripting.executeScript({
                        target: {tabId: tabId},
                        files: ["button_script.js"]   // ./foreground
                    })
                        .then(() => {
                            console.log("Injected foreground script");
                        });
                })
                .catch(err => console.log(err));
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