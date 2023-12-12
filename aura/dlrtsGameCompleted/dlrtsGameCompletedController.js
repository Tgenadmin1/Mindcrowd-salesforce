({
    myAction: function (component, event, helper) {
        helper.preventLeaving();
        const urlParams = new URLSearchParams(document.location.search.substring(1));
        const skip = urlParams.get('skip');
        if (!window.location.toString().includes("live-preview")) {
            if (skip != 'true') {

                if (localStorage.getItem('consent') != "true") {
                    window.location.href = $A.get("$Label.c.Community_Url") + "/s/" + $A.get("$Label.c.url_testlanguage");
                } else if (localStorage.getItem('c__id') == '' && localStorage.getItem('consent') == "true") {
                    window.location.href = $A.get("$Label.c.Community_Url") + "/s/" + $A.get("$Label.c.url_aboutyourbrain");
                } else {
                    const elMainContent = document.getElementById('mainContent');
                    var lastBrain = localStorage.getItem('LastPage').substring(localStorage.getItem('LastPage').lastIndexOf("/") + 1, localStorage.getItem('LastPage').length);
                    var pageName6 = $A.get("$Label.c.url_attentiontest_page6").substring($A.get("$Label.c.url_attentiontest_page6").lastIndexOf("/") + 1, $A.get("$Label.c.url_attentiontest_page6").length);
                    if (lastBrain != pageName6 && lastBrain != $A.get("$Label.c.url_attentiontestcomplete")) {
                        console.log("last my page: ", localStorage.getItem('LastPage'));
                        window.location.href = localStorage.getItem('LastPage');
                    }
                    else if (localStorage.getItem('attentionpage6') == 'true') {
                        localStorage.setItem('LastPage', document.URL);
                        if (elMainContent) {
                            elMainContent.classList.remove('opacity');
                        }
                    }
                    else {
                        window.location.href = localStorage.getItem('LastPage');
                    }
                }

            } else {
                localStorage.setItem('LastPage', $A.get("$Label.c.Community_Url") + "/s/" + $A.get("$Label.c.url_attentiontestcomplete"));
                if (elMainContent) {
                    elMainContent.classList.remove('opacity');
                }
            }
        }

        document.documentElement.addEventListener('keydown', function (e) {
            if ((e.keycode || e.which) == 32) {
                helper.allowLeaving();
                window.location.href = $A.get("$Label.c.Community_Url") + "/s/" + $A.get("$Label.c.url_memorytest_page_1");
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
                window.location.href = $A.get("$Label.c.Community_Url") + "/s/" + $A.get("$Label.c.url_memorytest_page_1");
                e.preventDefault();
            }

        }, false);

        document.getElementById("datablock").innerHTML = '<div class="title">' + $A.get("$Label.c.Dltrs_Game_Text_26_a") + '</div>' +
            '<div class="title">' + $A.get("$Label.c.Dltrs_Game_Text_26_b") + '</div>' +
            '<div class="title">' + $A.get("$Label.c.Dltrs_Game_Text_26_c") + '</div>' +
            '<p class="mb10 centers s-b-instraction">' + $A.get("$Label.c.games_spacebar_text_1") + '</p>'

    }

})