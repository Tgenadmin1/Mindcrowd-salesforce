({
    myAction: function (component, event, helper) {

        helper.preventLeaving();
        var roundStartTime = null;
        var roundTotalTime = null;
        roundStartTime = new Date();
        if (!window.location.toString().includes("live-preview")) {
            if (localStorage.getItem('consent') != "true") {
                window.location.href = $A.get("$Label.c.Community_Url") + "/s/" + $A.get("$Label.c.url_testlanguage");
            }
            else if (localStorage.getItem('c__id') == '' && localStorage.getItem('consent') == "true") {
                window.location.href = $A.get("$Label.c.Community_Url") + "/s/" + $A.get("$Label.c.url_aboutyourbrain");
            }
            else {
                const elMainContent = document.getElementById('mainContent');
                var lastBrain = localStorage.getItem('LastPage').substring(localStorage.getItem('LastPage').lastIndexOf("/") + 1, localStorage.getItem('LastPage').length);
                var pageName4 = $A.get("$Label.c.url_attentiontest_page4").substring($A.get("$Label.c.url_attentiontest_page4").lastIndexOf("/") + 1, $A.get("$Label.c.url_attentiontest_page4").length);
                var pageName5 = $A.get("$Label.c.url_attentiontest_page5").substring($A.get("$Label.c.url_attentiontest_page5").lastIndexOf("/") + 1, $A.get("$Label.c.url_attentiontest_page5").length);

                if (lastBrain != pageName4 && lastBrain != pageName5) {
                    window.location.href = localStorage.getItem('LastPage');
                }
                else if (localStorage.getItem('attentionPage4') == 'true') {
                    helper.lastStepUpdateInPGI(component);
                    localStorage.setItem('LastPage', document.URL);
                    localStorage.setItem('currentScreent', 23);
                    if(elMainContent){
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
                let timedata = new Date();
                roundTotalTime = timedata - roundStartTime;
                localStorage.setItem('roundTotalTime', roundTotalTime);
                helper.allowLeaving();
                window.location.href = $A.get("$Label.c.Community_Url") + "/s/" + $A.get("$Label.c.url_attentiontest_page6");
                e.preventDefault();
            }
        }, false);
        var device = helper.getDeviceType();
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
                let timedata = new Date();
                helper.allowLeaving();
                roundTotalTime = timedata - roundStartTime;
                localStorage.setItem('roundTotalTime', roundTotalTime);
                window.location.href = $A.get("$Label.c.Community_Url") + "/s/" + $A.get("$Label.c.url_attentiontest_page6");
                e.preventDefault();
            }
        });
        const configdata = [{
            screen: "23", startDuration: -1, endDuration: 999998000, isTouch: true, content: '<div class="title">' + $A.get("$Label.c.Dltrs_Game_Text_20a_1") + '</div>' +
                '<div class="title">' + $A.get("$Label.c.Dltrs_Game_Text_20a_2") + '</div>' +
                '<div class="title"><span>' + $A.get("$Label.c.Dltrs_Game_Text_20_a") + '</span></div>' +
                '<p class="mb10 centers s-b-instraction">' + $A.get("$Label.c.games_spacebar_text_1") + '</p>', command: [32, 32]
        }
        ]
        document.getElementById("datablock").innerHTML = configdata[0].content;
    }
})