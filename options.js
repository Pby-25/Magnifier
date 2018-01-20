// Saves options to chrome.storage.sync.
function save_options() {
    var magStr = document.getElementById('strength').value;
    chrome.storage.sync.set({
        magnifierStrength: magStr
    }, function() {
        // Update status to let user know options were saved.
        var status = document.getElementById('status');
        status.textContent = 'Options saved.';
        setTimeout(function() {
            status.textContent = '';
        }, 750);
    });
}

// Restores select box and checkbox state using the preferences
// stored in chrome.storage.
function restore_options() {
    // Use default value color = 'red' and likesColor = true.
    chrome.storage.sync.get({
        magnifierStrength: 4
    }, function(items) {
        document.getElementById('strength').value = items.magnifierStrength;
    });
}
document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click', save_options);