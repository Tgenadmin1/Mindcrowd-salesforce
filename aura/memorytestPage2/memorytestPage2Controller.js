({
    myAction: function (component, event, helper) {
        helper.preventLeaving();
        if(!window.location.toString().includes("live-preview")){
        if(localStorage.getItem('consent') != "true"){
            window.location.href = $A.get("$Label.c.Community_Url") + "/s/" + $A.get("$Label.c.url_testlanguage");
        }else if(localStorage.getItem('c__id') == '' && localStorage.getItem('consent') == "true"){
            window.location.href = $A.get("$Label.c.Community_Url") + "/s/" + $A.get("$Label.c.url_aboutyourbrain");
        }else{
           var lastBrain = localStorage.getItem('LastPage').substring(localStorage.getItem('LastPage').lastIndexOf("/") + 1, localStorage.getItem('LastPage').length);
           var pageName1 = $A.get("$Label.c.url_memorytest_page_1" ).substring($A.get("$Label.c.url_memorytest_page_1" ).lastIndexOf("/") + 1, $A.get("$Label.c.url_memorytest_page_1" ).length);
           var pageName2 = $A.get("$Label.c.url_memorytest_page_2" ).substring($A.get("$Label.c.url_memorytest_page_2" ).lastIndexOf("/") + 1, $A.get("$Label.c.url_memorytest_page_2" ).length);
          if(lastBrain!=pageName1 && lastBrain!=pageName2) {    
              console.log("last my page: ", localStorage.getItem('LastPage'));
              window.location.href = localStorage.getItem('LastPage');
          }
          else if(localStorage.getItem('currentScreent') == 1){
            localStorage.setItem('currentScreent', 2);
            helper.lastStepUpdateInPGI(component);
              localStorage.setItem('LastPage',  document.URL);
              document.getElementById('mainContent').classList.remove('opacity');
          }else{
            document.getElementById('mainContent').classList.remove('opacity');
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
                var roundTotalTimeNext = localStorage.getItem('roundTotalTime');//.split('=');
                roundTotalTime=parseInt(roundTotalTime)+parseInt(roundTotalTimeNext);
                localStorage.setItem('roundTotalTime', roundTotalTime);
                window.location.href = $A.get("$Label.c.Community_Url") + "/s/"+ $A.get("$Label.c.url_memorytest_page_3");
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
            if(macTouch == 'true' && device == "DESKTOP"){
                    device = 'TABLET';     
            }

    }

        document.getElementById('mainContent').addEventListener('click', function (e) {
            if(!isKeyboad){
                let timedata = new Date();
                helper.allowLeaving();
                roundTotalTime = timedata-roundStartTime;
                localStorage.setItem('roundTotalTime',roundTotalTime);
                window.location.href = $A.get("$Label.c.Community_Url") + "/s/"+ $A.get("$Label.c.url_memorytest_page_3");
                e.preventDefault();
         }
           
        }, false);

        //-----Gettung gameId from the apex function------------------
 
        let image_path = $A.get("$Label.c.Community_Url") + "/resource/mindcrowd_style/images/";
        var gameName = $A.get("$Label.c.Memory_Game_Text_00");
        var gameTime = '5 minutes';

        

        
    //====ended "participant game info" varriable creation=====================


        //---configdata start here----------------------
        const configdata = [ 
            {
                screen: "2", startDuration: -1, endDuration: 99999920000, isTouch: true, content: '<div class="title"><span>' + $A.get("$Label.c.Memory_Game_instruction_text") + '</span></div>'
                    + '<div class="title">' + $A.get("$Label.c.memory_Game_Text_1") + '</div>'
                    + '<div class="title">' + $A.get("$Label.c.Memory_Game_text_2") + '</div>'
                    + '<p class="centers example-row"> <span class="example-box">'+$A.get("$Label.c.Memory_Game_Name")+ ' | '+ $A.get("$Label.c.Memory_Game_clean")+'</span> </p>'
                    + '<div class="title">' + $A.get("$Label.c.Memory_Game_text_3") + '</div>'
                    + '<p class="centers mb10 s-b-instraction">' + $A.get("$Label.c.Memory_Game_spacebar_text_1") + '</p>', command: [32, 32]
            }

        ]
        document.getElementById("datablock_pairedGame").innerHTML = configdata[0].content;
        
    }

})