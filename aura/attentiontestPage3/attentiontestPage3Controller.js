({
    myAction: function (component, event, helper) {
        helper.preventLeaving();
        var roundStartTime = null;
        var roundTotalTime = null;
        roundStartTime = new Date();
        if (!window.location.toString().includes("live-preview")) {
            if (localStorage.getItem('consent') != "true") {
                window.location.href = $A.get("$Label.c.Community_Url") + "/s/" + $A.get("$Label.c.url_testlanguage");
            } else if (localStorage.getItem('c__id') == '' && localStorage.getItem('consent') == "true") {
                window.location.href = $A.get("$Label.c.Community_Url") + "/s/" + $A.get("$Label.c.url_aboutyourbrain");
            } else {
                const elMainContent = document.getElementById('mainContent');
                var lastBrain = localStorage.getItem('LastPage').substring(localStorage.getItem('LastPage').lastIndexOf("/") + 1, localStorage.getItem('LastPage').length);
                var pageName2 = $A.get("$Label.c.url_attentiontest_page2").substring($A.get("$Label.c.url_attentiontest_page2").lastIndexOf("/") + 1, $A.get("$Label.c.url_attentiontest_page2").length);
                var pageName3 = $A.get("$Label.c.url_attentiontest_page3").substring($A.get("$Label.c.url_attentiontest_page3").lastIndexOf("/") + 1, $A.get("$Label.c.url_attentiontest_page3").length);
                if (lastBrain != pageName2 && lastBrain != pageName3) {
                    window.location.href = localStorage.getItem('LastPage');
                }
                else if (localStorage.getItem('currentScreent') == 2) {
                    helper.lastStepUpdateInPGI(component);
                    localStorage.setItem('LastPage', document.URL);
                    localStorage.setItem('currentScreent', 4);
                    if(elMainContent){
                        elMainContent.classList.remove('opacity');
                    }
                } else {
                    if(elMainContent){
                        elMainContent.classList.remove('opacity');
                    }
                }
            }
        }
        document.documentElement.addEventListener('keydown', function (e) {
            if ((e.keycode || e.which) == 32) {
                let timedata = new Date();
                helper.allowLeaving();
                roundTotalTime = timedata - roundStartTime;
                var roundTotalTimeNext = localStorage.getItem('roundTotalTime');//.split('=');
                roundTotalTime = parseInt(roundTotalTime) + parseInt(roundTotalTimeNext);
                localStorage.setItem('roundTotalTime', roundTotalTime);
                window.location.href = $A.get("$Label.c.Community_Url") + "/s/" + $A.get("$Label.c.url_attentiontest_page4");
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
                let timedata = new Date();
                helper.allowLeaving();
                roundTotalTime = timedata - roundStartTime;
                localStorage.setItem('roundTotalTime', roundTotalTime);
                window.location.href = $A.get("$Label.c.Community_Url") + "/s/" + $A.get("$Label.c.url_attentiontest_page4");
                e.preventDefault();
            }
        });
        const configdata = [
            {
                screen: "3", startDuration: -1, endDuration: 999998000, isTouch: true, content: '<div class="title">' + $A.get("$Label.c.Dltrs_Game_Text_18") + '</div>' +
                    '<div class="title">' + $A.get("$Label.c.Dltrs_Game_Text_19") + '</div>' +
                    '<div class="title"> <span>' + $A.get("$Label.c.Dltrs_Game_Text_20") + '</span> </div>' +
                    '<p class="mb10 centers s-b-instraction">' + $A.get("$Label.c.games_spacebar_text_2") + '</p>', command: [32, 32]
            }

        ]
        document.getElementById("datablock").innerHTML = configdata[0].content;
    }

})