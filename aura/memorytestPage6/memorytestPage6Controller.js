({
    myAction: function (component, event, helper) {

        helper.preventLeaving();
       
        let currentScreent; 
        if(!window.location.toString().includes("live-preview")){
        if(localStorage.getItem('consent') != "true"){
            window.location.href = $A.get("$Label.c.Community_Url") + "/s/" + $A.get("$Label.c.url_testlanguage");
        }else if(localStorage.getItem('c__id') == '' && localStorage.getItem('consent') == "true"){
            window.location.href = $A.get("$Label.c.Community_Url") + "/s/" + $A.get("$Label.c.url_aboutyourbrain");
        }else{
            var lastBrain = localStorage.getItem('LastPage').substring(localStorage.getItem('LastPage').lastIndexOf("/") + 1, localStorage.getItem('LastPage').length);
            var pageName5 = $A.get("$Label.c.url_memorytest_page_5" ).substring($A.get("$Label.c.url_memorytest_page_5" ).lastIndexOf("/") + 1, $A.get("$Label.c.url_memorytest_page_5" ).length);
            var pageName6 = $A.get("$Label.c.url_memorytest_page_6" ).substring($A.get("$Label.c.url_memorytest_page_6" ).lastIndexOf("/") + 1, $A.get("$Label.c.url_memorytest_page_6" ).length);
            if (lastBrain != pageName5 && lastBrain != pageName6) {
                console.log("last my page: ", localStorage.getItem('LastPage'));
                window.location.href = localStorage.getItem('LastPage');
            }
            else if (localStorage.getItem('memoryGame5') == 'true'){
                helper.lastStepUpdateInPGI(component);
                localStorage.setItem('LastPage', document.URL);
                currentScreent = 21;//localStorage.getItem('currentScreent');
                localStorage.setItem('currentScreent', currentScreent);
                document.getElementById('mainContent').classList.remove('opacity');
            }
            else {
                window.location.href = localStorage.getItem('LastPage');
            }
        }
    }
        var roundStartTime = null;
        var roundTotalTime = null;
        roundStartTime = new Date();
        document.documentElement.addEventListener('keydown', function (e) {
            if ((e.keycode || e.which) == 32) {
                let timedata = new Date();
                helper.allowLeaving();
                roundTotalTime = timedata-roundStartTime;
                // document.cookie = 'roundTotalTime = ' + roundTotalTime;
                localStorage.setItem('roundTotalTime', roundTotalTime);
                window.location.href = $A.get("$Label.c.Community_Url") + "/s/"+ $A.get("$Label.c.url_memorytest_page_7");
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
            if(macTouch == 'true' && device == "DESKTOP"){
                    device = 'TABLET'   ;     
            }
    } else if (device == "DESKTOP" && macTouch != 'true') {
            isKeyboad = true;
    } else {
            isKeyboad = false;
           //alert(' component.get("v.browser")')
            if(macTouch == 'true' && device == "DESKTOP"){
                    device = 'TABLET';     
            }

    }

        document.getElementById('mainContent').addEventListener('click', function (e) {
            if(!isKeyboad){
                let timedata = new Date();
                helper.allowLeaving();
                roundTotalTime = timedata-roundStartTime;
               // alert('roundTotalTime = ' + roundTotalTime);
                // document.cookie = 'roundTotalTime = ' + roundTotalTime;
                localStorage.setItem('roundTotalTime', roundTotalTime);
                window.location.href = $A.get("$Label.c.Community_Url") + "/s/"+ $A.get("$Label.c.url_memorytest_page_7");
                e.preventDefault();
         }
           
        }, false);

        //-----Gettung gameId from the apex function------------------
        let image_path = $A.get("$Label.c.Community_Url") + "/resource/mindcrowd_style/images/";
        var gameName = $A.get("$Label.c.Memory_Game_Text_00");
        var gameTime = '5 minutes';
        
        //==========================getting contactID and Ip from the Cookies.
        var contactId = null;
        var product = localStorage.getItem('c__id');//.split('=');
        if(product!=null){
            contactId = (atob(product));
        }
        var gameId = null;
        var pGameId = localStorage.getItem('pGameId');
        if(pGameId!=null){
            gameId = atob(pGameId);
        } 
        var participantGameInfoId=null;
        var pGameInfoCreated = localStorage.getItem('pGameInfoCreated');
        if(pGameInfoCreated!=null){
            participantGameInfoId = atob(pGameInfoCreated);
        } 
        var ipAddress=null;     
        var forUserIp = localStorage.getItem('cip');//.split('=');
        if(forUserIp!=null){ 
            ipAddress = atob(forUserIp);
        }
       
      
        //---configdata start here----------------------
        const configdata = [ 
            {
                screen: "21", startDuration: -1, endDuration: 99999920000, isTouch: true, content: '<div class="title "><span> ' + $A.get("$Label.c.Memory_Game_text_22") + '</span></div>' +
                    '<div class="title">' + $A.get("$Label.c.Memory_Game_text_19") + '</div>' +
                    '<div class="title">' + $A.get("$Label.c.Memory_Game_text_19_1") + '</div>' +
                    '<div class="title">' + $A.get("$Label.c.Memory_Game_text_19_a") + '</div>' +
                    '<div class="title">' + $A.get("$Label.c.Memory_Game_text_19_b") + '</div>' +
                    '<p class="centers s-b-instraction">' + $A.get("$Label.c.Memory_Game_spacebar_text_2") + '</p>', command: [32, 32]
            }

        ]
      
        document.getElementById("datablock_pairedGame").innerHTML = configdata[0].content;
    }

})