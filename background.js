// TODO
// chrome.runtime.onInstalled.addListener(function() {});
// Simplified browser action first

var id = 100;

// Listen for a click on browser action icon
// XXX might required tabs and <all_urls> permissions
chrome.browserAction.onClicked.addListener(function() {

    // Capture the image in a loseless format
    chrome.tabs.captureVisibleTab({"format":"png"}, function(screenshotUrl) {
        var viewTabUrl = chrome.extension.getURL('snapshot.html?id=' + id++)
        var targetId = null;

        chrome.tabs.onUpdated.addListener(function listener(tabId, changedProps) {
            // Wait for the tab we opened to finish loading.
            if (tabId != targetId || changedProps.status != "complete")
                return;
            chrome.tabs.onUpdated.removeListener(listener);

            // Look through all views to find the window which will display
            // the screenshot.  The url of the tab which will display the
            // screenshot includes a query parameter with a unique id, which
            // ensures that exactly one view will have the matching URL.
            var views = chrome.extension.getViews();
            for (var i = 0; i < views.length; i++) {
                var view = views[i];
                if (view.location.href == viewTabUrl) {
                    view.setScreenshotUrl(screenshotUrl);
                    break;
                }
            }
        });

        chrome.tabs.create({url: viewTabUrl}, function(tab) {
            targetId = tab.id;
        });
    });
});