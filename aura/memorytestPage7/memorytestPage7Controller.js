({
    //myAction is called from the component. PAIREDGAME execution is working inside this.
    myAction: function (component, event, helper) {

        //Error handling---------------
        window.addEventListener('error', function (e) {
            let stacktrace = e.stack;
            if (!stacktrace && e.error) {
                stacktrace = e.error.stack;
            }
            //alert('error: '+e.message + ', File Name: ' + e.filename + ', Line no: ' + e.lineno + ': col no: ' + e.colno);
            let description = e.message + ' Line No: ' + e.lineno;
            helper.logError(component, description);
            // For now, just print the error
            //alert('error out: '+e.message + ', ' + e.filename + 'Error, ' + e.lineno + ':' + e.colno);
            /* if (stacktrace) {
              alert('Stacktrace: ' + stacktrace);
            } */
        });

        helper.preventLeaving();
        var gamerun = false;
        if (!window.location.toString().includes("live-preview")) {
            if (localStorage.getItem('consent') != "true") {
                window.location.href = $A.get("$Label.c.Community_Url") + "/s/" + $A.get("$Label.c.url_testlanguage");
            } else if (localStorage.getItem('c__id') == '' && localStorage.getItem('consent') == "true") {
                window.location.href = $A.get("$Label.c.Community_Url") + "/s/" + $A.get("$Label.c.url_aboutyourbrain");
            } else {
                var lastBrain = localStorage.getItem('LastPage').substring(localStorage.getItem('LastPage').lastIndexOf("/") + 1, localStorage.getItem('LastPage').length);
                var pageName6 = $A.get("$Label.c.url_memorytest_page_6").substring($A.get("$Label.c.url_memorytest_page_6").lastIndexOf("/") + 1, $A.get("$Label.c.url_memorytest_page_6").length);
                var pageName7 = $A.get("$Label.c.url_memorytest_page_7").substring($A.get("$Label.c.url_memorytest_page_7").lastIndexOf("/") + 1, $A.get("$Label.c.url_memorytest_page_7").length);
                const elMainContent = document.getElementById('mainContent');
                if (lastBrain != pageName6 && lastBrain != pageName7) {
                    window.location.href = localStorage.getItem('LastPage');

                //    gamerun = true;
                //    localStorage.setItem('memoryGame7', false);
                //    helper.lastStepUpdateInPGI(component);
                //    localStorage.setItem('LastPage', document.URL);
                //    if (elMainContent) {
                //        elMainContent.classList.remove('opacity');
                //    }
                }
                else {
                    gamerun = true;
                    localStorage.setItem('memoryGame7', false);
                    helper.lastStepUpdateInPGI(component);
                    localStorage.setItem('LastPage', document.URL);
                    if (elMainContent) {
                        elMainContent.classList.remove('opacity');
                    }
                }
            }
        }
        document.documentElement.addEventListener('keydown', function (e) {
            if ((e.keycode || e.which) == 32) {
                e.preventDefault();
            }
        }, false);
        //-----Gettung gameId from the apex function------------------
        var gameName = $A.get("$Label.c.Memory_Game_Text_00");
        var gameTime = '5 minutes';


        const urlParams = new URLSearchParams(document.location.search.substring(1));
        const cs = urlParams.get('cs');
        
        let currentScreent = parseInt(localStorage.getItem('currentScreent'));
        currentScreent = currentScreent - 1;
        if (cs != null) {
            currentScreent = Number(cs);
        }
        console.log('currentScreent test2 = ', currentScreent);
        //--------------PAIRED game JS-----------------
        let resultData = {}
        // let currentScreent = 0;
        let intervalTime = null
        let timedata = new Date();
        let pageLoadStartTime = null;
        let result_time = 0;
        let command_value = 0;
        let inputdata = "";
        var keyCount = 0;
        var inputkeyPress = "";
        let roundTotalTime = null;
        let roundStartTime = null;
        let pauseGame = false;
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



        console.log('currentScreent test3 = ', currentScreent);
        //creating participant game info record.
        //==========================getting contactID and Ip from the localStorage.
        var contactId = null;
        var product = localStorage.getItem('c__id');
        if (product != null) {
            contactId = atob(product);
        }
        var gameId = null;
        var pGameId = localStorage.getItem('pGameId');
        if (pGameId != null) {
            gameId = atob(pGameId);
        }
        var participantGameInfoId = null;
        var pGameInfoCreated = localStorage.getItem('pGameInfoCreated');
        if (pGameInfoCreated != null) {
            participantGameInfoId = atob(pGameInfoCreated);
        }
        //====ended "participant game info" varriable creation=====================
        //Configuration of data parts.
        const configdata = [

            //Inisial data
            {
                screen: "1", startDuration: -1, endDuration: 9999920000, isTouch: true, content: '<div class="title ">' + $A.get("$Label.c.Memory_Game_screen_text") + ' <span> ' + gameName + '! </span> ' + '</h1>'
                    + '<div class="title">' + $A.get("$Label.c.Memory_Game_screen_text_2") + ' <span> ' + gameTime + ' </span> ' + $A.get("$Label.c.Memory_Game_screen_text_3") + '</div>'
                    + '<div class="title">' + $A.get("$Label.c.Memory_Game_started_text_1") + ' </div>'
                    + '<p class="centers mb10 s-b-instraction">' + $A.get("$Label.c.Memory_Game_spacebar_text_1") + ' </p>'
                    + '<span class="game-lang">English</span> ', command: [32, 32]
            },
            {
                screen: "2", startDuration: -1, endDuration: 99999920000, isTouch: true, content: '<div class="title "><span>' + $A.get("$Label.c.Memory_Game_instruction_text") + '</span></div>'
                    + '<div class="title">' + $A.get("$Label.c.memory_Game_Text_1") + '</div>'
                    + '<div class="title">' + $A.get("$Label.c.Memory_Game_text_2") + '</div>'
                    + '<p class="centers example-row"> <span class="example-box">name | clean</span> </p>'
                    + '<div class="title">' + $A.get("$Label.c.Memory_Game_text_3") + '</div>'
                    + '<p class="centers mb10 s-b-instraction">' + $A.get("$Label.c.Memory_Game_spacebar_text_1") + '</p>', command: [32, 32]
            },

            {
                screen: "3", startDuration: -1, endDuration: 99999920000, isTouch: false, content: '<div class="title ">  <span> ' + $A.get("$Label.c.Memory_Game_instruction_text") + ' </span> </div>'
                    + '<div class="title">' + $A.get("$Label.c.Memory_Game_text_5") + '</div>'
                    + '<div class="title">' + $A.get("$Label.c.Memory_Game_text_6") + '</div>'
                    + '<p class="centers example-row" > <span class="example-box">name | <input autocomplete="off" readonly=true type="text" name="solution" class="pointerEvent-none txt_input wp-animation"/> <span class="centers magenta-btn  btn-xlarge" ><a type="button"   class="slds-button" label="Skip Game"  >Enter</a></span>  </span> </p>'
                    + '<p class="centers mb10 s-b-instraction">' + $A.get("$Label.c.Memory_Game_spacebar_text_1") + '</p>', command: [32, 32]
            },

            {
                screen: "4", startDuration: -1, endDuration: 99999920000, isTouch: true, content: '<div class="title">' + $A.get("$Label.c.Memory_Game_text_8") + ' </div>' +
                    '<div class="title "> <span>' + $A.get("$Label.c.Memory_Game_text_9") + '</span> </div>' +
                    '<p class="centers mb10 s-b-instraction">' + $A.get("$Label.c.Memory_Game_spacebar_text_2") + '</p>', command: [32, 32]
            },

            { screen: "5", startDuration: 0, endDuration: 500, content: '<p class="centers"></p>' },

            { screen: "6", startDuration: 0, endDuration: 500, content: '<p class="centers"></p>' },

            {
                screen: "7", startDuration: 0, endDuration: 2500, content: '<p class="title3">' + $A.get("$Label.c.Memory_Game_text_0a") + '</p>'
                    + '<p class="centers example-row marginT20"> <span class="example-box">friend | house</span></p>'
            },

            { screen: "8", startDuration: 0, endDuration: 500, content: '<p class="title3">' + $A.get("$Label.c.Memory_Game_text_0a") + '</p><p class="centers"></p>' },
            {
                screen: "9", startDuration: 0, endDuration: 2500, content: '<p class="title3">' + $A.get("$Label.c.Memory_Game_text_0a") + '</p>'
                    + '<p class="centers example-row marginT20"> <span class="example-box">clean | socks</span></p>'
            },
            { screen: "10", startDuration: 0, endDuration: 500, content: '<p class="title3">' + $A.get("$Label.c.Memory_Game_text_0a") + '</p><p class="centers"></p>' },
            {
                screen: "11", startDuration: 0, endDuration: 2500, content: '<p class="title3">' + $A.get("$Label.c.Memory_Game_text_0a") + '</p>'
                    + '<p class="centers example-row marginT20"> <span class="example-box">money | duck</span></p>'
            },
            { screen: "12", startDuration: 0, endDuration: 500, content: '<p class="title3">' + $A.get("$Label.c.Memory_Game_text_0a") + '</p><p class="centers"></p>' },

            { screen: "13", startDuration: 0, endDuration: 5000, content: '<div class="title">' + $A.get("$Label.c.Memory_Game_text_0b") + '</div>' },

            { screen: "14", startDuration: 0, endDuration: 500, content: '<p class="title3">' + $A.get("$Label.c.Memory_Game_text_0a") + '</p><p class="centers"></p>' },
            // ss
            {
                screen: "15", startDuration: 1, endDuration: 8000, content: '<p class="title3">' + $A.get("$Label.c.Memory_Game_text_0a") + '</p>'
                    + '<p class="centers example-row"> <span class="example-box">friend | <input autocomplete="off" type="text" name="solution" id="inputsolution" class="txt_input"/> <span class="centers magenta-btn  btn-xlarge"><button id="enterBtn" class="slds-button" label="Skip Game"  >' + $A.get("$Label.c.Memory_Game_Text_18") + '</button></span>  </span> </p>', command: [13, 13], result: true, answer: "house", question: 1, isPractice: true
            },
            { screen: "16", startDuration: 0, endDuration: 500, content: '<p class="title3">' + $A.get("$Label.c.Memory_Game_text_0a") + '</p><p class="centers"></p>' },
            {
                screen: "17", startDuration: 1, endDuration: 8000, content: '<p class="title3">' + $A.get("$Label.c.Memory_Game_text_0a") + '</p>'
                    + '<p class="centers example-row"> <span class="example-box">money | <input autocomplete="off" type="text" name="solution" id="inputsolution" class="txt_input"/> <span class="centers magenta-btn  btn-xlarge"><button id="enterBtn" class="slds-button" label="Skip Game"  >' + $A.get("$Label.c.Memory_Game_Text_18") + '</button></span>  </span> </p>', command: [13, 13], result: true, answer: "duck", question: 2, isPractice: true
            },
            { screen: "18", startDuration: 0, endDuration: 500, content: '<p class="title3">' + $A.get("$Label.c.Memory_Game_text_0a") + '</p>' },
            {
                screen: "19", startDuration: 1, endDuration: 8000, content: '<p class="title3">' + $A.get("$Label.c.Memory_Game_text_0a") + '</p>'
                    + '<p class="centers example-row"> <span class="example-box">clean | <input autocomplete="off" type="text" name="solution" id="inputsolution" class="txt_input"/> <span class="centers magenta-btn  btn-xlarge"><button id="enterBtn" class="slds-button" label="Skip Game"  >' + $A.get("$Label.c.Memory_Game_Text_18") + '</button></span>  </span> </p>', command: [13, 13], result: true, answer: "socks", question: 3, isPractice: true
            },
            { screen: "20", startDuration: 0, endDuration: 500, content: '<p class="centers"></p>' },

            { screen: "21a", startDuration: 1, endDuration: 500, content: '' },

            { screen: "22", startDuration: 0, endDuration: 2500, content: '<div class="title "> <span>' + $A.get("$Label.c.Memory_Game_text_23") + '</span></div>' },

            {
                screen: "23", startDuration: 0, endDuration: 2500, content: '<p class="title3">' + $A.get("$Label.c.Memory_Game_text_23") + '</p>'
                    + '<p class="centers example-row marginT20"> <span class="example-box">' + $A.get("$Label.c.Memory_Game_care") + ' | ' + $A.get("$Label.c.Memory_Game_door") + '</span></p>'
            },
            { screen: "24", startDuration: 0, endDuration: 500, content: '<p class="title3">' + $A.get("$Label.c.Memory_Game_text_23") + '</p><p class="centers"></p>' },
            {
                screen: "25", startDuration: 0, endDuration: 2500, content: '<p class="title3">' + $A.get("$Label.c.Memory_Game_text_23") + '</p>'
                    + '<p class="centers example-row marginT20"> <span class="example-box">' + $A.get("$Label.c.Memory_Game_public") + ' | ' + $A.get("$Label.c.Memory_Game_hard") + '</span></p>'
            },
            { screen: "26", startDuration: 0, endDuration: 500, content: '<p class="title3">' + $A.get("$Label.c.Memory_Game_text_23") + '</p><p class="centers"></p>' },
            {
                screen: "27", startDuration: 0, endDuration: 2500, content: '<p class="title3">' + $A.get("$Label.c.Memory_Game_text_23") + '</p>'
                    + '<p class="centers example-row marginT20"> <span class="example-box">' + $A.get("$Label.c.Memory_Game_under") + ' | ' + $A.get("$Label.c.Memory_Game_life") + '</span></p>'
            },
            { screen: "28", startDuration: 0, endDuration: 500, content: '<p class="title3">' + $A.get("$Label.c.Memory_Game_text_23") + '</p><p class="centers"></p>' },
            {
                screen: "29", startDuration: 0, endDuration: 2500, content: '<p class="title3">' + $A.get("$Label.c.Memory_Game_text_23") + '</p>'
                    + '<p class="centers example-row marginT20"> <span class="example-box">' + $A.get("$Label.c.Memory_Game_hair") + ' | ' + $A.get("$Label.c.Memory_Game_write") + '</span></p>'
            },
            { screen: "30", startDuration: 0, endDuration: 500, content: '<p class="title3">' + $A.get("$Label.c.Memory_Game_text_23") + '</p><p class="centers"></p>' },
            {
                screen: "31", startDuration: 1, endDuration: 2500, content: '<p class="title3">' + $A.get("$Label.c.Memory_Game_text_23") + '</p>'
                    + '<p class="centers example-row marginT20"> <span class="example-box">' + $A.get("$Label.c.Memory_Game_candle") + ' | ' + $A.get("$Label.c.Memory_Game_spoon") + '</span></p>'
            },
            { screen: "32", startDuration: 0, endDuration: 500, content: '<p class="title3">' + $A.get("$Label.c.Memory_Game_text_23") + '</p><p class="centers"></p>' },
            {
                screen: "33", startDuration: 0, endDuration: 2500, content: '<p class="title3">' + $A.get("$Label.c.Memory_Game_text_23") + '</p>'
                    + '<p class="centers example-row marginT20"> <span class="example-box">' + $A.get("$Label.c.Memory_Game_ride") + ' | ' + $A.get("$Label.c.Memory_Game_horse") + '</span></p>'
            },

            { screen: "34", startDuration: 0, endDuration: 500, content: '<p class="title3">' + $A.get("$Label.c.Memory_Game_text_23") + '</p><p class="centers"></p>' },
            {
                screen: "35", startDuration: 0, endDuration: 2500, content: '<p class="title3">' + $A.get("$Label.c.Memory_Game_text_23") + '</p>'
                    + '<p class="centers example-row marginT20"> <span class="example-box">' + $A.get("$Label.c.Memory_Game_garden") + ' | ' + $A.get("$Label.c.Memory_Game_grass") + '</span></p>'
            },
            { screen: "36", startDuration: 0, endDuration: 500, content: '<p class="title3">' + $A.get("$Label.c.Memory_Game_text_23") + '</p><p class="centers"></p>' },
            {
                sscreen: "37", startDuration: 0, endDuration: 2500, content: '<p class="title3">' + $A.get("$Label.c.Memory_Game_text_23") + '</p>'
                    + '<p class="centers example-row marginT20"> <span class="example-box">' + $A.get("$Label.c.Memory_Game_dress") + ' | ' + $A.get("$Label.c.Memory_Game_boat") + '</span></p>'
            },
            { screen: "38", startDuration: 0, endDuration: 500, content: '<p class="title3">' + $A.get("$Label.c.Memory_Game_text_23") + '</p><p class="centers"></p>' },
            {
                screen: "39", startDuration: 0, endDuration: 2500, content: '<p class="title3">' + $A.get("$Label.c.Memory_Game_text_23") + '</p>'
                    + '<p class="centers example-row marginT20"> <span class="example-box">' + $A.get("$Label.c.Memory_Game_mouth") + ' | ' + $A.get("$Label.c.Memory_Game_time") + '</span></p>'
            },
            { screen: "40", startDuration: 0, endDuration: 500, content: '<p class="title3">' + $A.get("$Label.c.Memory_Game_text_23") + '</p><p class="centers"></p>' },
            {
                screen: "41", startDuration: 0, endDuration: 2500, content: '<p class="title3">' + $A.get("$Label.c.Memory_Game_text_23") + '</p>'
                    + '<p class="centers example-row marginT20"> <span class="example-box">' + $A.get("$Label.c.Memory_Game_poor") + ' | ' + $A.get("$Label.c.Memory_Game_green") + '</span></p>'
            },
            { screen: "42", startDuration: 0, endDuration: 500, content: '<p class="title3">' + $A.get("$Label.c.Memory_Game_text_23") + '</p><p class="centers"></p>' },
            {
                screen: "43", startDuration: 0, endDuration: 2500, content: '<p class="title3">' + $A.get("$Label.c.Memory_Game_text_23") + '</p>'
                    + '<p class="centers example-row marginT20"> <span class="example-box">' + $A.get("$Label.c.Memory_Game_apple") + ' | ' + $A.get("$Label.c.Memory_Game_eat") + '</span></p>'
            },
            { screen: "44", startDuration: 0, endDuration: 500, content: '<p class="title3">' + $A.get("$Label.c.Memory_Game_text_23") + '</p><p class="centers"></p>' },
            {
                screen: "45", startDuration: 0, endDuration: 2500, content: '<p class="title3">' + $A.get("$Label.c.Memory_Game_text_23") + '</p>'
                    + '<p class="centers example-row marginT20"> <span class="example-box">' + $A.get("$Label.c.Memory_Game_night") + ' | ' + $A.get("$Label.c.Memory_Game_fast") + '</span></p>'
            },
            { screen: "46", startDuration: 0, endDuration: 5000, content: '<div class="title">' + $A.get("$Label.c.Memory_Game_text_0b") + '</div>' },
            //-----------round one start----------------------------
            {
                screen: "47", startDuration: 1, endDuration: 8000, content: '<p class="title3">' + $A.get("$Label.c.Memory_Game_text_23") + '</p>'
                    + '<p class="centers example-row"> <span class="example-box">' + $A.get("$Label.c.Memory_Game_care") + ' | <input autocomplete="off" type="text" name="solution" id="inputsolution" class="txt_input txt_placeholder"/> <span class="centers magenta-btn  btn-xlarge"><button id="enterBtn" class="slds-button" >' + $A.get("$Label.c.Memory_Game_Text_18") + '</button></span></span> </p>', command: [13, 13], result: true, answer: $A.get("$Label.c.Memory_Game_door"), question: 1, isPractice: false, round: 1, timeToFirstKeyStroke: 0
            },
            { screen: "48", startDuration: 0, endDuration: 500, content: '<p class="title3">' + $A.get("$Label.c.Memory_Game_text_23") + '</p><p class="centers"></p>' },
            {
                screen: "49", startDuration: 1, endDuration: 8000, content: '<p class="title3">' + $A.get("$Label.c.Memory_Game_text_23") + '</p>'
                    + '<p class="centers example-row"> <span class="example-box">' + $A.get("$Label.c.Memory_Game_public") + ' | <input autocomplete="off" type="text" name="solution" id="inputsolution" class="txt_input txt_placeholder"/> <span class="centers magenta-btn  btn-xlarge"><button id="enterBtn" class="slds-button" >' + $A.get("$Label.c.Memory_Game_Text_18") + '</button></span></span> </p>', command: [13, 13], result: true, answer: $A.get("$Label.c.Memory_Game_hard"), question: 2, isPractice: false, round: 1, timeToFirstKeyStroke: 0
            },
            { screen: "50", startDuration: 0, endDuration: 500, content: '<p class="title3">' + $A.get("$Label.c.Memory_Game_text_23") + '</p><p class="centers"></p>' },
            {
                screen: "51", startDuration: 1, endDuration: 8000, content: '<p class="title3">' + $A.get("$Label.c.Memory_Game_text_23") + '</p>'
                    + '<p class="centers example-row"> <span class="example-box">' + $A.get("$Label.c.Memory_Game_under") + ' | <input autocomplete="off" type="text" name="solution" id="inputsolution" class="txt_input txt_placeholder"/> <span class="centers magenta-btn  btn-xlarge"><button id="enterBtn" class="slds-button" >' + $A.get("$Label.c.Memory_Game_Text_18") + '</button></span></span> </p>', command: [13, 13], result: true, answer: $A.get("$Label.c.Memory_Game_life"), question: 3, isPractice: false, round: 1, timeToFirstKeyStroke: 0
            },
            { screen: "52", startDuration: 0, endDuration: 500, content: '<p class="title3">' + $A.get("$Label.c.Memory_Game_text_23") + '</p><p class="centers"></p>' },
            {
                screen: "53", startDuration: 1, endDuration: 8000, content: '<p class="title3">' + $A.get("$Label.c.Memory_Game_text_23") + '</p>'
                    + '<p class="centers example-row"> <span class="example-box">' + $A.get("$Label.c.Memory_Game_hair") + ' | <input autocomplete="off" type="text" name="solution" id="inputsolution" class="txt_input txt_placeholder"/> <span class="centers magenta-btn  btn-xlarge"><button id="enterBtn" class="slds-button" >' + $A.get("$Label.c.Memory_Game_Text_18") + '</button></span></span> </p>', command: [13, 13], result: true, answer: $A.get("$Label.c.Memory_Game_write"), question: 4, isPractice: false, round: 1, timeToFirstKeyStroke: 0
            },
            { screen: "54", startDuration: 0, endDuration: 500, content: '<p class="title3">' + $A.get("$Label.c.Memory_Game_text_23") + '</p><p class="centers"></p>' },
            {
                screen: "55", startDuration: 1, endDuration: 8000, content: '<p class="title3">' + $A.get("$Label.c.Memory_Game_text_23") + '</p>'
                    + '<p class="centers example-row"> <span class="example-box">' + $A.get("$Label.c.Memory_Game_candle") + '  | <input autocomplete="off" type="text" name="solution" id="inputsolution" class="txt_input txt_placeholder"/> <span class="centers magenta-btn  btn-xlarge"><button id="enterBtn" class="slds-button" >' + $A.get("$Label.c.Memory_Game_Text_18") + '</button></span></span> </p>', command: [13, 13], result: true, answer: $A.get("$Label.c.Memory_Game_spoon"), question: 5, isPractice: false, round: 1, timeToFirstKeyStroke: 0
            },
            { screen: "56", startDuration: 0, endDuration: 500, content: '<p class="title3">' + $A.get("$Label.c.Memory_Game_text_23") + '</p><p class="centers"></p>' },
            {
                screen: "57", startDuration: 1, endDuration: 8000, content: '<p class="title3">' + $A.get("$Label.c.Memory_Game_text_23") + '</p>'
                    + '<p class="centers example-row"> <span class="example-box">' + $A.get("$Label.c.Memory_Game_ride") + ' | <input autocomplete="off" type="text" name="solution" id="inputsolution" class="txt_input txt_placeholder"/> <span class="centers magenta-btn  btn-xlarge"><button id="enterBtn" class="slds-button" >' + $A.get("$Label.c.Memory_Game_Text_18") + '</button></span></span> </p>', command: [13, 13], result: true, answer: $A.get("$Label.c.Memory_Game_horse"), question: 6, isPractice: false, round: 1, timeToFirstKeyStroke: 0
            },
            { screen: "58", startDuration: 0, endDuration: 500, content: '<p class="title3">' + $A.get("$Label.c.Memory_Game_text_23") + '</p><p class="centers"></p>' },
            {
                screen: "59", startDuration: 1, endDuration: 8000, content: '<p class="title3">' + $A.get("$Label.c.Memory_Game_text_23") + '</p>'
                    + '<p class="centers example-row"> <span class="example-box">' + $A.get("$Label.c.Memory_Game_garden") + ' | <input autocomplete="off" type="text" name="solution" id="inputsolution" class="txt_input txt_placeholder"/> <span class="centers magenta-btn  btn-xlarge"><button id="enterBtn" class="slds-button" >' + $A.get("$Label.c.Memory_Game_Text_18") + '</button></span></span> </p>', command: [13, 13], result: true, answer: $A.get("$Label.c.Memory_Game_grass"), question: 7, isPractice: false, round: 1, timeToFirstKeyStroke: 0
            },
            { screen: "60", startDuration: 0, endDuration: 500, content: '<p class="title3">' + $A.get("$Label.c.Memory_Game_text_23") + '</p><p class="centers"></p>' },
            {
                screen: "61", startDuration: 1, endDuration: 8000, content: '<p class="title3">' + $A.get("$Label.c.Memory_Game_text_23") + '</p>'
                    + '<p class="centers example-row"> <span class="example-box">' + $A.get("$Label.c.Memory_Game_dress") + ' | <input autocomplete="off" type="text" name="solution" id="inputsolution" class="txt_input txt_placeholder"/> <span class="centers magenta-btn  btn-xlarge"><button id="enterBtn" class="slds-button" >' + $A.get("$Label.c.Memory_Game_Text_18") + '</button></span></span> </p>', command: [13, 13], result: true, answer: $A.get("$Label.c.Memory_Game_boat"), question: 8, isPractice: false, round: 1, timeToFirstKeyStroke: 0
            },
            { screen: "62", startDuration: 0, endDuration: 500, content: '<p class="title3">' + $A.get("$Label.c.Memory_Game_text_23") + '</p><p class="centers"></p>' },
            {
                screen: "63", startDuration: 1, endDuration: 8000, content: '<p class="title3">' + $A.get("$Label.c.Memory_Game_text_23") + '</p>'
                    + '<p class="centers example-row"> <span class="example-box">' + $A.get("$Label.c.Memory_Game_mouth") + ' | <input autocomplete="off" type="text" name="solution" id="inputsolution" class="txt_input txt_placeholder"/> <span class="centers magenta-btn  btn-xlarge"><button id="enterBtn" class="slds-button" >' + $A.get("$Label.c.Memory_Game_Text_18") + '</button></span></span> </p>', command: [13, 13], result: true, answer: $A.get("$Label.c.Memory_Game_time"), question: 9, isPractice: false, round: 1, timeToFirstKeyStroke: 0
            },
            { screen: "64", startDuration: 0, endDuration: 500, content: '<p class="title3">' + $A.get("$Label.c.Memory_Game_text_23") + '</p><p class="centers"></p>' },
            {
                screen: "65", startDuration: 1, endDuration: 8000, content: '<p class="title3">' + $A.get("$Label.c.Memory_Game_text_23") + '</p>'
                    + '<p class="centers example-row"> <span class="example-box">' + $A.get("$Label.c.Memory_Game_poor") + ' | <input autocomplete="off" type="text" name="solution" id="inputsolution" class="txt_input txt_placeholder"/> <span class="centers magenta-btn  btn-xlarge"><button id="enterBtn" class="slds-button" >' + $A.get("$Label.c.Memory_Game_Text_18") + '</button></span></span> </p>', command: [13, 13], result: true, answer: $A.get("$Label.c.Memory_Game_green"), question: 10, isPractice: false, round: 1, timeToFirstKeyStroke: 0
            },
            { screen: "66", startDuration: 0, endDuration: 500, content: '<p class="title3">' + $A.get("$Label.c.Memory_Game_text_23") + '</p><p class="centers"></p>' },
            {
                screen: "67", startDuration: 1, endDuration: 8000, content: '<p class="title3">' + $A.get("$Label.c.Memory_Game_text_23") + '</p>'
                    + '<p class="centers example-row"> <span class="example-box">' + $A.get("$Label.c.Memory_Game_apple") + ' | <input autocomplete="off" type="text" name="solution" id="inputsolution" class="txt_input txt_placeholder"/> <span class="centers magenta-btn  btn-xlarge"><button id="enterBtn" class="slds-button" >' + $A.get("$Label.c.Memory_Game_Text_18") + '</button></span></span> </p>', command: [13, 13], result: true, answer: $A.get("$Label.c.Memory_Game_eat"), question: 11, isPractice: false, round: 1, timeToFirstKeyStroke: 0
            },
            { screen: "68", startDuration: 0, endDuration: 500, content: '<p class="title3">' + $A.get("$Label.c.Memory_Game_text_23") + '</p><p class="centers"></p>' },
            {
                screen: "69", startDuration: 1, endDuration: 8000, content: '<p class="title3">' + $A.get("$Label.c.Memory_Game_text_23") + '</p>'
                    + '<p class="centers example-row"> <span class="example-box">' + $A.get("$Label.c.Memory_Game_night") + ' | <input autocomplete="off" type="text" name="solution" id="inputsolution" class="txt_input txt_placeholder"/> <span class="centers magenta-btn  btn-xlarge"><button id="enterBtn" class="slds-button" >' + $A.get("$Label.c.Memory_Game_Text_18") + '</button></span></span> </p>', command: [13, 13], result: true, answer: $A.get("$Label.c.Memory_Game_fast"), question: 12, isPractice: false, round: 1, timeToFirstKeyStroke: 0
            },

            { screen: "70", startDuration: 0, endDuration: 2500, content: '<div class="title "> <span>' + $A.get("$Label.c.Memory_Game_text_26") + '</span></div>' },

            {
                screen: "169", startDuration: 1, endDuration: 999999998000, content: ' ', command: [13, 13], result: true, answer: "eat", question: 36, isPractice: false, gameEnd: true
            }
        ]

        //This saveData function is used for creating record in ParticipantGameresponse object.
        function saveData(gameName, questionNumber, userInputData, isCorrect, reactionTime, isPracticeQuestion, correctAnswer, timeToFirstKeyStroke, round) {
            helper.recorData(component, event, helper, contactId, gameId, questionNumber, userInputData, isCorrect, reactionTime, isPracticeQuestion, correctAnswer, participantGameInfoId, inputkeyPress, timeToFirstKeyStroke, round);
            keyCount = 0;
            inputkeyPress = "";
            console.log('reactionTime = ', reactionTime );

        }
        let tempData = "";
        let resetTimer = false;
        //Inisilize the page processing
        function changeScreen() {
            resetTimer = false;
            console.log('currentScreent = ', currentScreent);
           pageLoadStartTime = timedata;
            //Changes for touch
            if (typeof (document.getElementById("inputsolution")) != 'undefined' && document.getElementById("inputsolution") != null) {
                tempData = document.getElementById("inputsolution").value;
            }
            if (currentScreent == 22) {
                roundStartTime = timedata;
            }
            if (currentScreent == 69) {
                helper.allowLeaving();
                roundTotalTime = timedata - roundStartTime;
                let roundTotalTimeNext = localStorage.getItem('roundTotalTime');//.split('=');
                let totalTimeForRoundZero = parseInt(roundTotalTime) + parseInt(roundTotalTimeNext);
                helper.participantGameInfoUpdateTotalTimeRoundOne(component, event, helper, contactId, gameId, participantGameInfoId, totalTimeForRoundZero, currentScreent);

            }
            if (currentScreent != 69) {
                document.getElementById("datablock_pairedGame").innerHTML = configdata[currentScreent].content;
                if ((currentScreent > 45 && currentScreent < 69 &&  currentScreent % 2 === 0)) {
                    if (isKeyboad || document.getElementsByTagName("html")[0].getAttribute("lang")=='es') {
                        document.getElementById("inputsolution").addEventListener('keyup', resetPlaceholderSize);
                    }
                    let placeholder = $A.get("$Label.c.catchment_placeholder");
                    document.getElementById("inputsolution").setAttribute("placeholder", placeholder);
                }
            }
            if (!isKeyboad) {
                document.getElementById("datablock_pairedGame").removeEventListener('click', gotoNextScreen, false);
                if (configdata[currentScreent].hasOwnProperty('isTouch')) {
                    document.getElementById("datablock_pairedGame").addEventListener('click', gotoNextScreen, false);
                }
            }
            //end changes for touch goto  function  gotoNextScreen
            let inputstr = document.getElementById("inputsolution");
            if (typeof (inputstr) != 'undefined' && inputstr != null) { inputstr.focus(); resetTimer = true; }

            if (currentScreent > 0) {
                let isResult = configdata[currentScreent - 1].hasOwnProperty("result") ? true : false;
                let lastdata = document.getElementById("d_title").innerHTML;
                if (inputdata == "" || inputdata == null) {
                    tempData = "No Response"
                    result_time = configdata[currentScreent - 1].endDuration;
                } else {
                    result_time = new Date() - timedata;
                }
                if (lastdata.length <= 0 && isResult == true) {

                    //Result Data
                    resultData[configdata[currentScreent - 1].screen] = {
                        "duration": configdata[currentScreent - 1].endDuration,
                        "status": (configdata[currentScreent - 1].answer.toLowerCase().trim() == tempData.toLowerCase().trim()) ? "true" : "false",
                        "data": tempData,
                        "question": configdata[currentScreent - 1].question,
                        "isPractice": configdata[currentScreent - 1].isPractice,
                        "correctAnswer": configdata[currentScreent - 1].answer,
                        "timeToFirstKeyStroke": configdata[currentScreent - 1].timeToFirstKeyStroke,
                        "round": configdata[currentScreent - 1].round
                    }

                    //Save Output Events
                    saveData(
                        "PAIRED",
                        resultData[configdata[currentScreent - 1].screen]["question"],
                        resultData[configdata[currentScreent - 1].screen]["data"],
                        resultData[configdata[currentScreent - 1].screen]["status"],
                        resultData[configdata[currentScreent - 1].screen]["duration"],
                        resultData[configdata[currentScreent - 1].screen]["isPractice"],
                        resultData[configdata[currentScreent - 1].screen]["correctAnswer"],
                        resultData[configdata[currentScreent - 1].screen]["timeToFirstKeyStroke"],
                        resultData[configdata[currentScreent - 1].screen]["round"]
                    );

                    //Front Result Output Data
                    document.getElementById("d_title").innerHTML = "Result";
                    document.getElementById("d_txt").innerHTML = configdata[currentScreent - 1].endDuration + " ms";
                    document.getElementById("d_status").innerHTML = resultData[configdata[currentScreent - 1].screen]["status"];
                    setTimeout(clearResult, 1000);
                }
            }

            //Change New Screen Default
            if ((configdata.length - 1) > currentScreent) {
                console.log('endDuration2', configdata[currentScreent].endDuration);
                intervalTime = setTimeout(function () {
                    if (pauseGame == false) {
                        changeScreen();
                    }
                }, configdata[currentScreent].endDuration);
                currentScreent = currentScreent + 1;

            } else {
                console.log('test2', pauseGame);
                clearInterval(intervalTime);
            }
            inputdata = "";

            if (document.getElementById("enterBtn") != null) {
                document.getElementById("enterBtn").addEventListener("click", gamePlay, false);
            }
            timedata = new Date();
            pageLoadStartTime = timedata;
            localStorage.setItem('currentScreent', currentScreent);
            console.log('currentScreent in cookies: ', localStorage.getItem('currentScreent'));
        }
        //Event Control System
        window.addEventListener('keyup', gamePlayOnEntrBtn, false);
        document.addEventListener('keyup', function (e) {
            if (e.target && e.target.name == 'solution' && device == "DESKTOP") {
                console.log('e.target.name ==', e.target.name);
                if (resetTimer) {
                    clearTimeout(intervalTime);
                    intervalTime = setTimeout(changeScreen, configdata[currentScreent - 1].endDuration);
                }
                inputdata = e.target.value ? e.target.value : '';
                keyCount++;
                if (keyCount <= 1) {
                    let timeTillFirstStroke = new Date();
                    configdata[currentScreent - 1].timeToFirstKeyStroke = timeTillFirstStroke - pageLoadStartTime;
                    console.log(' timeTillFirstStroke=  ',  timeTillFirstStroke , ' pageLoadStartTime = ', pageLoadStartTime , 'total =', configdata[currentScreent - 1].timeToFirstKeyStroke);
                    pageLoadStartTime = '';
                    timeTillFirstStroke = '';

                    

                }
                if (keyCount <= 3) {
                    if (e.key.match(new RegExp("[a-z]", 'gi')) && e.key.length <= 1) {
                        inputkeyPress = inputkeyPress + e.key;
                    } else {
                        inputkeyPress = inputkeyPress + '{' + e.key + '}';
                    }
                }
            } else  if (e.target && e.target.name == 'solution'){
                console.log('e.target.name123 ==', e.target.name);
                if (resetTimer) {
                    clearTimeout(intervalTime);
                    intervalTime = setTimeout(changeScreen, configdata[currentScreent - 1].endDuration);
                }
                inputdata = e.target.value ? e.target.value : '';
                keyCount++;
                if (keyCount <= 1) {
                    let timeTillFirstStroke = new Date();
                    configdata[currentScreent - 1].timeToFirstKeyStroke = timeTillFirstStroke - pageLoadStartTime;
                    pageLoadStartTime = '';
                    timeTillFirstStroke = '';
                }
                if (keyCount <= 3) {
                    if (inputdata.match(new RegExp("[a-z]", 'gi')) && inputdata <= 1) {
                        inputkeyPress = inputkeyPress + inputdata.substring(0, 3);

                    } else {
                        inputkeyPress = inputdata.substring(0, 3);
                    }
                }
            }
        });

        //Inisilize the page processing
        if (gamerun) {
            changeScreen();
        }
        function gamePlay(e) {
            command_value = e.keyCode;
            console.log('command_value = ', command_value);
            if(command_value === undefined && inputkeyPress.length <3){
                inputkeyPress = inputkeyPress + '{Tap}';
            }
            let startDurations = configdata[currentScreent - 1].startDuration;
            //Press spacific key command
            if (startDurations == -1) {
                if (configdata[currentScreent - 1].hasOwnProperty("command") && command_value >= configdata[currentScreent - 1].command[0] && command_value <= configdata[currentScreent - 1].command[1]) {
                    clearInterval(intervalTime);
                    changeScreen();
                }
            }
            else if (startDurations == 0) {
            }
            //In between process to go executed
            else if (startDurations > 0) {

                let endDurations = configdata[currentScreent - 1].endDuration;
                let isResult = configdata[currentScreent - 1].hasOwnProperty("result") ? true : false;
                result_time = new Date() - timedata;
                //Block before click
                if (result_time < startDurations) return false;
                //Result Calculation
                if (isResult) {
                    if (!resultData.hasOwnProperty(configdata[currentScreent - 1].screen)) {
                        resultData[configdata[currentScreent - 1].screen] = {
                            "duration": "0",
                            "status": "false",
                            "data": "",
                            "question": configdata[currentScreent - 1].question,
                            "isPractice": configdata[currentScreent - 1].isPractice,
                            "correctAnswer": configdata[currentScreent - 1].answer,
                            "timeToFirstKeyStroke": configdata[currentScreent - 1].timeToFirstKeyStroke,
                            "round": configdata[currentScreent - 1].round
                        }
                    }
                }
                if (result_time >= startDurations) {
                    if (configdata[currentScreent - 1].hasOwnProperty("command")) {
                        //Command Value Match Data
                        if ((command_value >= configdata[currentScreent - 1].command[0] && command_value <= configdata[currentScreent - 1].command[1]) || command_value === undefined) {
                            //Result Calculation
                            if (isResult) {
                                resultData[configdata[currentScreent - 1].screen]["data"] = document.getElementById("inputsolution").value;
                                resultData[configdata[currentScreent - 1].screen]["duration"] = result_time;
                                if (configdata[currentScreent - 1].answer.toLowerCase().trim() == document.getElementById("inputsolution").value.toLowerCase().trim()) {
                                    resultData[configdata[currentScreent - 1].screen]["status"] = "true";
                                } else {
                                    resultData[configdata[currentScreent - 1].screen]["status"] = "false";
                                }
                                //Save Output Events
                                saveData(
                                    "PAIRED",
                                    resultData[configdata[currentScreent - 1].screen]["question"],
                                    resultData[configdata[currentScreent - 1].screen]["data"],
                                    resultData[configdata[currentScreent - 1].screen]["status"],
                                    resultData[configdata[currentScreent - 1].screen]["duration"],
                                    resultData[configdata[currentScreent - 1].screen]["isPractice"],
                                    resultData[configdata[currentScreent - 1].screen]["correctAnswer"],
                                    resultData[configdata[currentScreent - 1].screen]["timeToFirstKeyStroke"],
                                    resultData[configdata[currentScreent - 1].screen]["round"]
                                );

                                document.getElementById("d_title").innerHTML = "Result";
                                document.getElementById("d_txt").innerHTML = result_time + " ms";
                                document.getElementById("d_status").innerHTML = resultData[configdata[currentScreent - 1].screen]["status"];
                            }
                            //Clear Results
                            setTimeout(clearResult, 1500);
                            //Reset Screent Interval
                            clearInterval(intervalTime);
                            //Next Screen Show
                            changeScreen();
                        }
                    }
                }
            }
        }
        function clearResult() {
            document.getElementById("d_title").innerHTML = "";
            document.getElementById("d_txt").innerHTML = "";
            document.getElementById("d_status").innerHTML = "";
        }
        //chnages for touch
        function gotoNextScreen(e) {
            gamePlay({ keyCode: 32 });
        }
        //chnages for touch end
        function gamePlayOnEntrBtn(e) {
            if (e.keyCode == 13) {
                gamePlay({ keyCode: 13 });
            }
        }
        function resetPlaceholderSize() {
            let inputstr = document.getElementById("inputsolution");
            let inputstrval = inputstr.value;
            if (inputstrval == null || inputstrval == '') {                 
                if (!inputstr.classList.contains('txt_placeholder'))
                {inputstr.className += ' txt_placeholder';}
            }
            else{                
                if (inputstr.classList.contains('txt_placeholder'))
                {inputstr.className = inputstr.className.replace('txt_placeholder', '');}
            }            
          }          
    }


});