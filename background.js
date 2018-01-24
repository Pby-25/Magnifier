// Listen for a click on browser action icon
chrome.browserAction.onClicked.addListener(function(theTab) {

    // Capture the current viewport
    chrome.tabs.captureVisibleTab({format: "png"}, function(screenshotUrl) {
        // Setup the magnifier
        chrome.storage.sync.get({
            magnifierStrength: 4,
            magnifierSize: 275
        }, function(items){
            chrome.tabs.insertCSS(theTab.id, {file: "snapshot2.css"}, function(){
                chrome.tabs.executeScript(theTab.id, {file: "jquery-3.2.1.min.js"}, function(){
                    chrome.tabs.executeScript(theTab.id, {file: "magnifying-glass.js"}, function(){
                        chrome.tabs.sendMessage(theTab.id, {snapshot_url: screenshotUrl, magnifier_str: items.magnifierStrength,
                            magnifier_size: items.magnifierSize})
                    })
                })
            })

        });
    })



    // Capture the image in loseless format
    chrome.tabs.captureVisibleTab({format: "png"}, function(screenshotUrl) {
        var viewTabUrl = chrome.extension.getURL('snapshot.html?id=' + id++)
        var targetId = null;

        chrome.tabs.onUpdated.addListener(function listener(tabId, changedProps) {
            // Wait for the tab we opened to finish loading.
            if (tabId != targetId || changedProps.status != "complete")
                return;

            chrome.tabs.onUpdated.removeListener(listener);

            // Look through all views to find the window which will display the screenshot
            var views = chrome.extension.getViews();
            for (var i = 0; i < views.length; i++) {
                var view = views[i];
                if (view.location.href == viewTabUrl) {
                    // Setup the image
                    view.setScreenshotUrl(screenshotUrl);

                    break;
                }
            }

        });

        // Open the magnifier tab at appropriate position
        chrome.tabs.create({url: viewTabUrl, index: theTab.index}, function(tab) {
            targetId = tab.id;
        });
    });
});