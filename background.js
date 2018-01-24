// unique query for compatibility mode
var id = 100;

// Listen for a click on browser action icon
chrome.browserAction.onClicked.addListener(function(theTab) {

    chrome.storage.sync.get({
        magnifierStrength: 4,
        magnifierSize: 275,
        magnifierAA: false,
        magnifierCM: false
    }, function(items){
        // Check if compatibility mode is enabled
        if(items.magnifierCM){
            // Close the tab if it's a magnifier tab
            if (theTab.title.indexOf("_Magnifying_Glass")==0){
                chrome.tabs.remove(theTab.id);
                return;
            }
            // Capture the image in loseless format
            chrome.tabs.captureVisibleTab({format: "png"}, function(screenshotUrl) {
                var viewTabUrl = chrome.extension.getURL('snapshot.html?id=' + id++)
                var targetId = null;

                chrome.tabs.onUpdated.addListener(function listener(tabId, changedProps) {
                    // Wait for the tab we opened to finish loading.
                    if (tabId != targetId || changedProps.status != "complete") return;

                    chrome.tabs.onUpdated.removeListener(listener);
                    // Look through all views to find the window which will display the screenshot
                    var views = chrome.extension.getViews();
                    for (var i = 0; i < views.length; i++) {
                        var view = views[i];
                        if (view.location.href == viewTabUrl) {
                            // Setup the image
                            view.setScreenshotUrl(screenshotUrl);
                            view.setMagnifier(items.magnifierStrength, items.magnifierSize, items.magnifierAA);
                            break;
                        }
                    }
                })
                // Open the magnifier tab at appropriate position
                chrome.tabs.create({url: viewTabUrl, index: theTab.index}, function(tab) {
                    targetId = tab.id;
                })
            })
        } else {
            // Capture the current viewport
            chrome.tabs.captureVisibleTab({format: "png"}, function(screenshotUrl) {
                chrome.tabs.insertCSS(theTab.id, {file: "snapshot2.css"}, function () {
                    chrome.tabs.executeScript(theTab.id, {file: "jquery-3.2.1.min.js"}, function () {
                        chrome.tabs.executeScript(theTab.id, {file: "magnifying-glass.js"}, function () {
                            chrome.tabs.getZoom(theTab.id, function(zoomFactor){
                                chrome.tabs.sendMessage(theTab.id, {
                                    snapshot_url: screenshotUrl, magnifier_str: items.magnifierStrength,
                                    magnifier_size: items.magnifierSize, magnifier_aa: items.magnifierAA,
                                    page_zoom: zoomFactor
                                })
                            })
                        })
                    })
                })
            })
        }
    })
})
