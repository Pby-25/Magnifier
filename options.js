// Saves options to chrome.storage.sync.
function save_options() {
    var magStr = document.getElementById('strength').value;
    var magSize = document.getElementById('size').value;
    chrome.storage.sync.set({
        magnifierStrength: magStr,
        magnifierSize: magSize
    }, function() {
        // Update status to let user know options were saved.
        var status = document.getElementById('status');
        status.textContent = 'Options saved.';
        setTimeout(function() {
            status.textContent = '';
        }, 1150);
    });
};

// Restores select box and checkbox state using the preferences
// stored in chrome.storage.
function restore_options() {
    chrome.storage.sync.get({
        magnifierStrength: 4,
        magnifierSize: 275
    }, function(items) {
        document.getElementById('strength').value = items.magnifierStrength;
        document.getElementById('size').value = items.magnifierSize;
    });
};

function reset_options(){
    chrome.storage.sync.clear(function(){
        restore_options();
        var status = document.getElementById('status');
        status.textContent = 'Options reset.';
        setTimeout(function() {
            status.textContent = '';
        }, 1150);
    });
};

document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click', save_options);
document.getElementById('reset').addEventListener('click', reset_options);