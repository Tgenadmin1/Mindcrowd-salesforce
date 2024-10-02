({
    myAction: function (component, event, helper) {
        helper.preventLeaving();
        if (!window.location.toString().includes("live-preview")) {
            if (localStorage.getItem('consent') != "true") {
                window.location.href = $A.get("$Label.c.Community_Url") + "/s/" + $A.get("$Label.c.url_testlanguage");
            } else if (localStorage.getItem('c__id') == '' && localStorage.getItem('consent') == "true") {
                window.location.href = $A.get("$Label.c.Community_Url") + "/s/" + $A.get("$Label.c.url_aboutyourbrain");
            } else {
                var lastBrain = localStorage.getItem('LastPage').substring(localStorage.getItem('LastPage').lastIndexOf("/") + 1, localStorage.getItem('LastPage').length);
                //updated By Raj hard code conditions with Custom Labels
                var pageName9 = $A.get("$Label.c.url_memorytest_page_9").substring($A.get("$Label.c.url_memorytest_page_9").lastIndexOf("/") + 1, $A.get("$Label.c.url_memorytest_page_9").length);
                const elMainContent = document.getElementById('mainContent');
                if (lastBrain != pageName9 && lastBrain != $A.get("$Label.c.url_memorytestcompleted")) {
                    console.log("last my page: ", localStorage.getItem('LastPage'));
                    window.location.href = localStorage.getItem('LastPage');
                }
                else if (localStorage.getItem('memoryGame9') == 'true') {
                    localStorage.setItem('LastPage', document.URL);
                    if (elMainContent) {
                        elMainContent.classList.remove('opacity');
                    }
                }
                else {
                    window.location.href = localStorage.getItem('LastPage');
                }
            }
        }
        document.documentElement.addEventListener('keydown', function (e) {
            if ((e.keycode || e.which) == 32) {
                helper.allowLeaving();
                window.location.href = $A.get("$Label.c.Community_Url") + "/s/" + $A.get("$Label.c.url_additionalquestions");
                e.preventDefault();
            }
        }, false);
        var device = helper.getDeviceType(component, event, helper);
        var macTouch = localStorage.getItem('macTouch');
        var ua = window.navigator.userAgent;
        var iOS = !!ua.match(/Mac OS/i);
        var isKeyboad;
        if (iOS) {
            isKeyboad = (macTouch == 'false');
            if (macTouch == 'true' && device == "DESKTOP") {
                device = 'TABLET';
            }
        } else if (device == "DESKTOP" && macTouch != 'true') {
            isKeyboad = true;
        } else {
            isKeyboad = false;
            if (macTouch == 'true' && device == "DESKTOP") {
                device = 'TABLET';
            }

        }
        document.getElementById('mainContent').addEventListener('click', function (e) {
            if (!isKeyboad) {
                helper.allowLeaving();
                window.location.href = $A.get("$Label.c.Community_Url") + "/s/" + $A.get("$Label.c.url_additionalquestions");
            }

        }, false);

        document.getElementById("datablock").innerHTML = '<div class="title">' + $A.get("$Label.c.paired_Game_Text_62_a") + '</div>' +
            '<div class="title">' + $A.get("$Label.c.paired_Game_Text_62_b") + '</div>' +
            '<div class="title">' + $A.get("$Label.c.paired_Game_Text_62_c") + '</div>' +
            '<div class="title">' + $A.get("$Label.c.paired_Game_Text_62_d") + '</div>' +
            '<div class="title">' + $A.get("$Label.c.paired_Game_Text_62_e") + '</div>' +
            '<p class="mb10 centers s-b-instraction">' + $A.get("$Label.c.games_spacebar_text_1") + '</p>'

    },

})