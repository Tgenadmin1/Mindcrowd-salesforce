({
    myAction: function (component, event, helper) {
        //Error handling---------------
        window.addEventListener('error', function (e) {
            let stacktrace = e.stack;
            if (!stacktrace && e.error) {
                stacktrace = e.error.stack;
            }
            let description = e.message + ' Line No: ' + e.lineno;
            helper.logError(component, description);
        });

        helper.preventLeaving();
        var roundStartTime = null;
        var roundTotalTime = null;
        roundStartTime = new Date();
        
        document.documentElement.addEventListener('keydown', function (e) {
            if (((e.keycode || e.which) == 32) && component.get("v.isPGICreated")) {
                e.preventDefault();
                let timedata = new Date();
                helper.allowLeaving();
                roundTotalTime = timedata - roundStartTime;
                localStorage.setItem('roundTotalTime', roundTotalTime);
                window.location.href = $A.get("$Label.c.Community_Url") + "/s/" + $A.get("$Label.c.url_memorytest_page_2");                
            }
        }, false);

        if (!window.location.toString().includes("live-preview")) {
            if (localStorage.getItem('consent') != "true") {
                window.location.href = $A.get("$Label.c.Community_Url") + "/s/" + $A.get("$Label.c.url_testlanguage");
            } else if (localStorage.getItem('c__id') == '' && localStorage.getItem('consent') == "true") {
                window.location.href = $A.get("$Label.c.Community_Url") + "/s/" + $A.get("$Label.c.url_aboutyourbrain");
            } else {
                var lastBrain = localStorage.getItem('LastPage').substring(localStorage.getItem('LastPage').lastIndexOf("/") + 1, localStorage.getItem('LastPage').length);
                var pageName1 = $A.get("$Label.c.url_memorytest_page_1" ).substring($A.get("$Label.c.url_memorytest_page_1" ).lastIndexOf("/") + 1, $A.get("$Label.c.url_memorytest_page_1" ).length);
                const elMainContent = document.getElementById('mainContent');
                if (lastBrain != $A.get("$Label.c.url_attentiontestcomplete")  && lastBrain != pageName1) {
                    window.location.href = localStorage.getItem('LastPage');
                }
                else if (lastBrain == $A.get("$Label.c.url_attentiontestcomplete")) {
                    localStorage.setItem('currentScreent', 1);
                    localStorage.setItem('LastPage', document.URL);
                    localStorage.setItem('InMemoryGame', true);
                    localStorage.setItem('pGameId', '');
                    localStorage.setItem('pGameInfoCreated', '');
                    helper.gameNameInParticipantGameInfo(component);
                    if(elMainContent){
                        elMainContent.classList.remove('opacity');
                    }
                } 
                else {
                    let gameId = localStorage.getItem('pGameId');
                    let pgiId = localStorage.getItem('pGameInfoCreated');
                    if(gameId && pgiId){
                        component.set("v.isPGICreated",true);
                    }
                    else{
                        helper.gameNameInParticipantGameInfo(component);
                    }
                    if(elMainContent){
                        elMainContent.classList.remove('opacity');
                    }
                }
            }
        }
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
            //alert(' component.get("v.browser")')
            if (macTouch == 'true' && device == "DESKTOP") {
                device = 'TABLET';
            }

        }
        document.getElementById('mainContent').addEventListener('click', function (e) {            
            if (!isKeyboad && component.get("v.isPGICreated")) {
                e.preventDefault();
                let timedata = new Date();
                helper.allowLeaving();
                roundTotalTime = timedata - roundStartTime;
                localStorage.setItem('roundTotalTime', roundTotalTime);
                window.location.href = $A.get("$Label.c.Community_Url") + "/s/" + $A.get("$Label.c.url_memorytest_page_2");                
            }
        }, false);

        //-----Gettung gameId from the apex function------------------
        var gameName = $A.get("$Label.c.Memory_Game_Text_00");
        var gameTime = '5';

        //---configdata start here----------------------
        const configdata = [
            {
                screen: "1", startDuration: -1, endDuration: 9999920000, isTouch: true, content: '<div class="title">' + $A.get("$Label.c.Memory_Game_Text_001") + ' <span> ' + gameName + ' </span> ' + '</div>'
                    + '<div class="title">' + $A.get("$Label.c.Memory_Game_Text_002") + ' <span> ' + gameTime + ' </span> ' + $A.get("$Label.c.Memory_Game_Text_003") + '</div>'
                    + '<div class="title">' + $A.get("$Label.c.Memory_Game_Text_004") + ' </div>'
                    + '<div class="title"><span>' + $A.get("$Label.c.Memory_Game_Text_005") + '</span> </div>'
                    + '<p class="centers mb10 s-b-instraction">' + $A.get("$Label.c.Memory_Game_Text_006") + ' </p>'
                    + '<span class="game-lang">English</span> ', command: [32, 32]
            }

        ]
        document.getElementById("datablock_pairedGame").innerHTML = configdata[0].content;
    }

})