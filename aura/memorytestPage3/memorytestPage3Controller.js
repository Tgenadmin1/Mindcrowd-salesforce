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
           var pageName2 = $A.get("$Label.c.url_memorytest_page_2" ).substring($A.get("$Label.c.url_memorytest_page_2" ).lastIndexOf("/") + 1, $A.get("$Label.c.url_memorytest_page_2" ).length);
           var pageName3 = $A.get("$Label.c.url_memorytest_page_3" ).substring($A.get("$Label.c.url_memorytest_page_3" ).lastIndexOf("/") + 1, $A.get("$Label.c.url_memorytest_page_3" ).length);
          if(lastBrain!=pageName2 && lastBrain!=pageName3) {    
              window.location.href = localStorage.getItem('LastPage');
          }
          else if(localStorage.getItem('currentScreent')==2){
              localStorage.setItem('currentScreent', 3);
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
                window.location.href = $A.get("$Label.c.Community_Url") + "/s/"+ $A.get("$Label.c.url_memorytest_page_4");
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
                localStorage.setItem('roundTotalTime', roundTotalTime);
                window.location.href = $A.get("$Label.c.Community_Url") + "/s/"+ $A.get("$Label.c.url_memorytest_page_4");
                e.preventDefault();
         }
           
        }, false);

        

        //---configdata start here----------------------
        const configdata = [ 
            {
                screen: "3", startDuration: -1, endDuration: 99999920000, isTouch: false, content: '<div class="title">  <span> ' + $A.get("$Label.c.Memory_Game_instruction_text") + ' </span> </div>'
                    + '<div class="title">' + $A.get("$Label.c.Memory_Game_text_5_a") + '</div>'
                    + '<div class="title">' + $A.get("$Label.c.Memory_Game_text_5_b") + '</div>'
                    + '<div class="title">' + $A.get("$Label.c.Memory_Game_text_6") + '</div>'
                    + '<p class="centers example-row pointerEvent-none" > <span class="example-box">'+ $A.get("$Label.c.Memory_Game_Name")+ ' | '+ '<input autocomplete="off" id="wpAni"  type="text" readonly name="solution" class="pointerEvent-none txt_input wp-animation2"/> <span class="centers magenta-btn  btn-xlarge" ><a type="button"   class="slds-button" label="Skip Game"  >' + $A.get("$Label.c.Memory_Game_Text_18") + '</a></span>  </span> </p>'
                    + '<p class="centers mb10 s-b-instraction">' + $A.get("$Label.c.Memory_Game_spacebar_text_1") + '</p>', command: [32, 32]
            }

        ]
        document.getElementById("datablock_pairedGame").innerHTML = configdata[0].content;
        document.getElementById("wpAni").focus();
         var aniWord = $A.get("$Label.c.Memory_Game_clean").split("");//['c','l','e','a','n'];
        var count = 0;
        setInterval(function () {
            if(count < aniWord.length  ){
                document.getElementById("wpAni").value  = document.getElementById("wpAni").value + aniWord[count];
                count++;
               
            }else{
                document.getElementById("wpAni").value  = "";
                count = 0;
               
            }
        
        }, 1000);

        
    }

})