// Save options to chrome.storage.sync.
function save_options() {
    var magStr = document.getElementById('strength').value;
    var magSize = document.getElementById('size').value;
    var magAA = document.getElementById('aa').checked;
    var magCM = document.getElementById('cm').checked;
    var magShape = document.getElementById('shape').value;
    chrome.storage.sync.set({
        magnifierStrength: magStr,
        magnifierSize: magSize,
        magnifierAA: magAA,
        magnifierCM: magCM,
        magnifierShape: magShape
    }, function() {
        // Update status to let user know options were saved.
        var status = document.getElementById('status');
        if (magStr <= 0 || magSize <= 0 ){
            status.textContent = 'Non-positive number detected, the magnifier might not behave as expected.'
        } else {
            status.textContent = 'Options saved.';
        }
        setTimeout(function() {
            status.textContent = '';
        }, 1550);
    });
};

// Restore data using the preferences stored in chrome.storage.
function restore_options() {
    chrome.storage.sync.get({
        magnifierStrength: 2,
        magnifierSize: 425,
        magnifierAA: true,
        magnifierCM: false,
        magnifierShape: 100
    }, function(items) {
        document.getElementById('strength').value = items.magnifierStrength;
        document.getElementById('size').value = items.magnifierSize;
        document.getElementById('aa').checked = items.magnifierAA;
        document.getElementById('cm').checked = items.magnifierCM;
        document.getElementById('shape').value = items.magnifierShape;
    });
};

// Reset the preference to default values
function reset_options(){
    chrome.storage.sync.clear(function(){
        restore_options();
        var status = document.getElementById('status');
        status.textContent = 'Options reset.';
        setTimeout(function() {
            status.textContent = '';
        }, 1200);
    });
};

// Set the page to appropriate language
function init(){
    document.getElementById("label_str").innerText = chrome.i18n.getMessage("label_str");
    document.getElementById("label_times").innerText = chrome.i18n.getMessage("label_times");
    document.getElementById("label_size").innerText = chrome.i18n.getMessage("label_size");
    document.getElementById("label_pixels").innerText = chrome.i18n.getMessage("label_pixels");
    document.getElementById("label_aa").innerText = chrome.i18n.getMessage("label_aa");
    document.getElementById("label_mode").innerText = chrome.i18n.getMessage("label_mode");
    document.getElementById("label_shape").innerText = chrome.i18n.getMessage("label_shape");
    document.getElementById("label_rect").innerText = chrome.i18n.getMessage("label_rect");
    document.getElementById("label_circ").innerText = chrome.i18n.getMessage("label_circ");
    document.getElementById("label_default").innerText = chrome.i18n.getMessage("label_default");
    document.getElementById("label_save").innerText = chrome.i18n.getMessage("label_save");
}

document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click', save_options);
document.getElementById('reset').addEventListener('click', reset_options);
init();