document.addEventListener('DOMContentLoaded', function () {
    document.getElementById("clear-hidden-list").addEventListener("click", function() {
        chrome.storage.local.set({'hidden_listings':[]}, function (obj) {
        });
        chrome.tabs.getSelected(null, function(tab) {
        var code = 'window.location.reload();';
        chrome.tabs.executeScript(tab.id, {code: code});
        });
    }); 
});
