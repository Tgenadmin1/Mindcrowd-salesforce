({
    myAction: function (component, event, helper) {
        helper.preventLeaving();
        var roundStartTime = null;
        var roundTotalTime = null;
        roundStartTime = new Date();
        
        
        if(!window.location.toString().includes("live-preview")){
        if (localStorage.getItem('consent') != 'true' ) {
            window.location.href = $A.get("$Label.c.Community_Url") + "/s/" + $A.get("$Label.c.url_testlanguage");
        } else if ((localStorage.getItem('c__id') == '' || localStorage.getItem('c__id') == undefined) && localStorage.getItem('consent') == "true") {
            window.location.href = $A.get("$Label.c.Community_Url") + "/s/" + $A.get("$Label.c.url_aboutyourbrain");
        } else {
            var lastBrain = localStorage.getItem('LastPage').substring(localStorage.getItem('LastPage').lastIndexOf("/") + 1, localStorage.getItem('LastPage').length);
            var pageName1 = $A.get("$Label.c.url_attentiontest_page1" ).substring($A.get("$Label.c.url_attentiontest_page1" ).lastIndexOf("/") + 1, $A.get("$Label.c.url_attentiontest_page1" ).length);
            const elMainContent = document.getElementById('mainContent');
           if (lastBrain != $A.get("$Label.c.url_aboutyourbrain") && lastBrain != pageName1) {
                window.location.href = localStorage.getItem('LastPage');
            } else if (lastBrain == $A.get("$Label.c.url_aboutyourbrain")) {
                helper.lastStepUpdateInPGI(component);
                localStorage.setItem('LastPage', document.URL);
                localStorage.setItem('currentScreent', 1);                
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
                roundTotalTime = timedata - roundStartTime;
                localStorage.setItem('roundTotalTime', roundTotalTime);
                helper.allowLeaving();
                window.location.href = $A.get("$Label.c.Community_Url") + "/s/" + $A.get("$Label.c.url_attentiontest_page2");
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
                roundTotalTime = timedata - roundStartTime;
                localStorage.setItem('roundTotalTime', roundTotalTime);
                helper.allowLeaving();
                window.location.href = $A.get("$Label.c.Community_Url") + "/s/" + $A.get("$Label.c.url_attentiontest_page2");
            }

        }, false);
        //-----Gettung gameId from the apex function------------------
        var gameName = $A.get("$Label.c.Dltrs_Game_Text_1");
        var gameTime = '3';
        //---configdata start here----------------------
        const configdata = [
            {
                // screen: "1", startDuration: -1, endDuration: 9999920000, isTouch: true, content: '<div class="title">' + $A.get("$Label.c.Dltrs_Game_Text_001") + ' <span> ' + gameName + '</span> ' + '</div>'
                //     + '<div class="title">' + $A.get("$Label.c.game_first_screen_text_2") + ' <span> ' + gameTime + ' </span> ' + $A.get("$Label.c.game_first_screen_text_3_a") + '</div>'
                //     + '<div class="title">' + $A.get("$Label.c.game_first_screen_text_3_b") + ' </div>'
                //     + '<div class="title">' + $A.get("$Label.c.games_get_started_text_1") + ' </div>'
                //     + '<p class="centers mb10 s-b-instraction">' + $A.get("$Label.c.games_spacebar_text_3") + ' </p>'
                //     + '<span class="game-lang">English</span> ', instructionsLeft: true, command: [32, 32]
                screen: "1", startDuration: -1, endDuration: 9999920000, isTouch: true, content: '<div class="title">' + $A.get("$Label.c.Dltrs_Game_Text_001") + ' <span> ' + gameName + '</span> ' + '</div>'
                + '<div class="title">' + $A.get("$Label.c.Dltrs_Game_Text_002") + ' <span> ' + gameTime + ' </span> ' + $A.get("$Label.c.Dltrs_Game_Text_003") + '</div>'
                + '<div class="title">' + $A.get("$Label.c.Dltrs_Game_Text_004") + ' </div>'
                + '<div class="title"><span>' + $A.get("$Label.c.Dltrs_Game_Text_005") + '<span> </div>'
                + '<p class="centers mb10 s-b-instraction">' + $A.get("$Label.c.Dltrs_Game_Text_006") + ' </p>'
                + '<span class="game-lang">English</span> ', instructionsLeft: true, command: [32, 32]
            }

        ]

        document.getElementById("datablock").innerHTML = configdata[0].content;
        window.dispatchEvent(new Event('click'));
    }


})