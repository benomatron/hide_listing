$( document ).ready(function() {
    var content = $(this).find(".content");
    var hiddenBucket = '<span class="hidden-bucket" id="hidden-bucket" style="display: none"></span>';
    var userLinks = $(this).find(".userlinks");
    var hiddenLinksLi = '<li class="user hiddens"><em>[ </em>show hidden posts<em> ]</em></li>';
    userLinks.prepend(hiddenLinksLi);
    content.append(hiddenBucket);
    listingStuff.hideShowListings();

    $(".hiddens").on('click', function() {
        var $el = $(this);
        listingStuff.toggleShowHide($el);
    });
});

var hiddenListings = [];
var dogMonkey = [];

var listingStuff = {

    hideShowListings: function() {

        chrome.storage.local.get("hidden_listings", function (obj) {
            var listings = obj.hidden_listings;
            hiddenListings = listings;
            for (i in hiddenListings) {
                var pid = hiddenListings[i];
                var p = $("p[data-pid|='" + pid + "']")
                p.css("display", "none");
                p.addClass('hid'); 
            } 

            $(".row").each(function(index) {
                var txt = $(this).find(".txt");
                var hideSpan = '<span class="hider" data-pid="' + $(this).attr("data-pid") + '" title="hide this post from results">X</span>';
                txt.prepend(hideSpan)
            });

            $(".hider").on('click', function() {
                var pid = $(this).attr("data-pid");
                p = $(this).parent().parent()
                if (p.hasClass('hid')) {
                    listingStuff.removeListing(pid);
                    p.css('display', '');
                    p.removeClass('hid');
                } else {
                    listingStuff.addListing(pid);
                    p.css('display', 'none');
                    p.addClass('hid');
                }
            });
        });
        
    },

    getListings: function() {
        chrome.storage.local.get("hidden_listings", function (obj) {
            var listings = obj.hidden_listings;
            hiddenListings = listings;
        });
    },

    addListing: function(listing) {
        var listings = hiddenListings; 
        listings.push(listing);
        chrome.storage.local.set({"hidden_listings":listings}, function () {
        });
    },
    
    removeListing: function(listing) {
        var listings = hiddenListings;
        var index = hiddenListings.indexOf(listing);
        if (index > -1) {
            hiddenListings.splice(index, 1);
        }
        chrome.storage.local.set({"hidden_listings":listings}, function () {
        });
    },

    toggleShowHide: function($el) {
        listingStuff.getListings();
        if ($el.text() == '[ show hidden posts ]') {
            $el.text('[ hide unwanted posts ]');
            for (i in hiddenListings) {
                var pid = hiddenListings[i];
                var p = $("p[data-pid|='" + pid + "']").css("display", "");
            }; 
        } else if ($el.text() == '[ hide unwanted posts ]') {
            $el.text('[ show hidden posts ]');
            for (i in hiddenListings) {
                var pid = hiddenListings[i];
                var p = $("p[data-pid|='" + pid + "']").css("display", "none");
            }; 
        };
    }
};
