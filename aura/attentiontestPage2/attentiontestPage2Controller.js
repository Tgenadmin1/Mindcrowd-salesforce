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
                var pageName1 = $A.get("$Label.c.url_attentiontest_page1").substring($A.get("$Label.c.url_attentiontest_page1").lastIndexOf("/") + 1, $A.get("$Label.c.url_attentiontest_page1").length);
                var pageName2 = $A.get("$Label.c.url_attentiontest_page2").substring($A.get("$Label.c.url_attentiontest_page2").lastIndexOf("/") + 1, $A.get("$Label.c.url_attentiontest_page2").length);
                if (lastBrain != pageName1 && lastBrain != pageName2) {
                    window.location.href = localStorage.getItem('LastPage');
                }
                else if (localStorage.getItem('currentScreent') == 1) {
                    helper.lastStepUpdateInPGI(component);
                    localStorage.setItem('LastPage', document.URL);
                    localStorage.setItem('currentScreent', 2);
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
                var roundTotalTimeNext = localStorage.getItem('roundTotalTime');
                roundTotalTime = parseInt(roundTotalTime) + parseInt(roundTotalTimeNext);
                localStorage.setItem('roundTotalTime', roundTotalTime);
                window.location.href = $A.get("$Label.c.Community_Url") + "/s/" + $A.get("$Label.c.url_attentiontest_page3");
                e.preventDefault();
            }
        }, false);

        let image_path = $A.get("$Label.c.Community_Url") + "/resource/mindcrowd_style/images/";
        //==========================getting contactID and Ip from the Cookies.

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
                window.location.href = $A.get("$Label.c.Community_Url") + "/s/" + $A.get("$Label.c.url_attentiontest_page3");
                e.preventDefault();
            }
        }, false);
        const configdata = [
            {
                screen: "2", startDuration: -1, endDuration: 999998000, isTouch: true, content: '<div class="title">  <span> ' + $A.get("$Label.c.games_instruction_text") + ' </span> </div>' +
                    '<div class="title">' + $A.get("$Label.c.Dltrs_Game_Text_12_a") + '   </div>' +
                    '<div class="title">' + $A.get("$Label.c.Dltrs_Game_Text_12_b") + '   </div>' +
                    '<div class="title"><span class="intractions-ball"><img src="' + image_path + 'sphere.png"></span></div>' +
                    '<div class="title">' + $A.get("$Label.c.Dltrs_Game_Text_13") + '</div>' +
                    '<p class="mb10 centers s-b-instraction">' + $A.get("$Label.c.games_spacebar_text_1") + '</p>', command: [32, 32]
            }
        ]
        document.getElementById("datablock").innerHTML = configdata[0].content;

    },

})