({
    //myAction is called from the component. PAIREDGAME execution is working inside this.
    myAction: function (component, event, helper) {
        helper.preventLeaving();
        document.documentElement.addEventListener('keydown', function (e) {
            if ((e.keycode || e.which) == 32) {
                e.preventDefault();
            }
        }, false);

        //-----Gettung gameId from the apex function------------------
        var gameName = 'PAIRED GAME';
        helper.gameDetails(component, event, helper, gameName);
        var gameId;
        var participantGameInfoId;
        var ipAddress=null;
        var browserName;
        helper.printBrowser(component, event, helper);
   
        var device = $A.get("$Browser.formFactor");
        var gameName = $A.get("$Label.c.paired_Game_Text_00");
        var gameTime = '5 minutes';

        //------Getting contactid from the url---------------

        //  var urlParam=window.location.href;
        // const urlParams = new URLSearchParams(document.location.search.substring(1));
        // const product = urlParams.get('c__id');
        // console.log('product', product);
        // var contactId = null;
        // if (product != null && product != undefined) {
        //     contactId = JSON.parse(atob(product));
        //     console.log('my contactId', contactId);
        // }
        // else {
        //     console.log('contactid does not found.');
        // }

        //=============================stopp
        //  console.log('contactId is ?');

        // var sPageURL = decodeURIComponent(window.location.search.substring(1));
        // var sURLVariables = sPageURL.split('&');
        // var product =sURLVariables[1].split('=');
        // var forUserIp =sURLVariables[2].split('=');
        // console.log('product does not found.',product[1]);
        // console.log('forUserIp does not found.',forUserIp[1]);
        // var contactId = null;
        // contactId = JSON.parse(atob(product[1]));   
        // console.log('contactId does not found.',contactId); 
        // ipAddress = atob(forUserIp[1]); 
        // component.set("v.ipAddress",ipAddress);  
        // console.log('ipAddress does not found.',ipAddress); 



        //================

        var contactId = null;
        var product = getCookie('c__id');
        console.log('contactId does not found.',product);
        if(product!=null){
            contactId = JSON.parse(atob(product));
        }
        console.log('contactId does not found.',contactId); 
        
        var ipAddress=null;     
        var forUserIp = getCookie('cip');
        if(forUserIp!=null){
            console.log('NOT ipAddress found.',ipAddress);
            ipAddress = atob(forUserIp);
        }  
        console.log('ipAddress does not found.',ipAddress); 
        component.set("v.ipAddress",ipAddress);
        //==========================
        function getCookie (name) {
            var cookieString = "; " + document.cookie;
            var parts = cookieString.split("; " + name + "=");
            if (parts.length === 2) {
                return parts.pop().split(";").shift();
            }
            return null;
        }

        const urlParams = new URLSearchParams(document.location.search.substring(1));
       const  cs = urlParams.get('cs');
       let currentScreent = 0;
       if(cs!=null){
           console.log("cs1=", cs)
           currentScreent = Number(cs);
       }

        //--------------PAIRED game JS-----------------
        let resultData = {}
       // let currentScreent = 0;
        let intervalTime = null
        let timedata = new Date();
        let result_time = 0;
        let command_value = 0;
        let inputdata = "";
        let gameEnd = false;
        let image_path = $A.get("$Label.c.Community_Url") + "/resource/mindcrowd_style/images/";
        var keyCount = 0;
        var inputkeyPress ="";

        //creating participant game info record.
        if (currentScreent == 0) {
            var startDateTime = new Date();
            var gamePlayStatus = "Not-Completed";
            helper.participantGameInfo(component, event, helper, contactId, gameId, startDateTime, gamePlayStatus);
            console.log("Game Start", startDateTime, gamePlayStatus);
        }
        else {
            console.log('screens are changing');
        }

        //Configuration of data parts.

        const configdata = [

            //Inisial data
            {
                screen: "1", startDuration: -1, endDuration: 9999920000, isTouch: true, content: '<h3 class="title font34">' + $A.get("$Label.c.game_first_screen_text") + ' <span> ' + gameName + '! </span> ' + '</h1>'
                    + '<h3 class="title">' + $A.get("$Label.c.game_first_screen_text_2") + ' <span> ' + gameTime + ' </span> ' + $A.get("$Label.c.game_first_screen_text_3") + '</h3>'
                    + '<h3 class="title">' + $A.get("$Label.c.games_get_started_text_1") + ' </h3>'
                    + '<p class="centers mb10 s-b-instraction">' + $A.get("$Label.c.games_spacebar_text_1") + ' </p>'
                    + '<span class="game-lang">English</span> ', command: [32, 32]
            },
            {
                screen: "2", startDuration: -1, endDuration: 99999920000, isTouch: true, content: '<h3 class="title font34"><span>' + $A.get("$Label.c.games_instruction_text") + '</span></h3>'
                    + '<h3 class="title">' + $A.get("$Label.c.word_pairs_game_text_1") + '</h3>'
                    + '<h3 class="title">' + $A.get("$Label.c.word_pairs_game_text_2") + '</h3>'
                    + '<p class="centers example-row"> <span class="example-box">name | clean</span> </p>'
                    + '<h3 class="title">' + $A.get("$Label.c.word_pairs_game_text_3") + '</h3>'
                    + '<p class="centers mb10 s-b-instraction">' + $A.get("$Label.c.games_spacebar_text_1") + '</p>', command: [32, 32]
            },

            {
                screen: "3", startDuration: -1, endDuration: 99999920000, isTouch: false, content: '<h3 class="title font34">  <span> ' + $A.get("$Label.c.games_instruction_text") + ' </span> </hh3>'
                    + '<h3 class="title">' + $A.get("$Label.c.word_pairs_game_text_5") + '</h3>'
                    + '<h3 class="title">' + $A.get("$Label.c.word_pairs_game_text_6") + '</h3>'
                    + '<p class="centers example-row" > <span class="example-box">name | <input autocomplete="off" readonly=true type="text" name="solution" class="pointerEvent-none txt_input wp-animation"/> <span class="centers magenta-btn  btn-xlarge" ><a type="button"   class="slds-button" label="Skip Game" title="Next" >Enter</a></span>  </span> </p>'
                    + '<p class="centers mb10 s-b-instraction">' + $A.get("$Label.c.games_spacebar_text_1") + '</p>', command: [32, 32]
            },

            {
                screen: "4", startDuration: -1, endDuration: 99999920000, isTouch: true, content: '<h3 class="title">' + $A.get("$Label.c.word_pairs_game_text_8") + ' </h3>' +
                    '<h3 class="title font34"> <span>' + $A.get("$Label.c.word_pairs_game_text_9") + '</span> </h3>' +
                    '<p class="centers mb10 s-b-instraction">' + $A.get("$Label.c.games_spacebar_text_2") + '</p>', command: [32, 32]
            },

            //{ screen:"4", startDuration:0, endDuration:2500, content:'<p class="centers example-row "> <span class="example-box">' + $A.get("$Label.c.paired_Game_Text_22") +' </span> </p>'},
            { screen: "5", startDuration: 0, endDuration: 500, content: '<p class="centers"></p>' },

            //{ screen:"6", startDuration:0, endDuration:2500, content:'<h3 class="title font34"> <span>' + $A.get("$Label.c.word_pairs_game_text_12") +'</span> </h3>'},
            { screen: "6", startDuration: 0, endDuration: 500, content: '<p class="centers"></p>' },

            {
                screen: "7", startDuration: 0, endDuration: 2500, content: '<p class="title3">' + $A.get("$Label.c.word_pairs_game_text_0a") + '</p>'
                    + '<p class="centers example-row marginT20"> <span class="example-box">friend | house</span></p>'
            },

            { screen: "8", startDuration: 0, endDuration: 500, content: '<p class="title3">' + $A.get("$Label.c.word_pairs_game_text_0a") + '</p><p class="centers"></p>' },
            {
                screen: "9", startDuration: 0, endDuration: 2500, content: '<p class="title3">' + $A.get("$Label.c.word_pairs_game_text_0a") + '</p>'
                    + '<p class="centers example-row marginT20"> <span class="example-box">clean | socks</span></p>'
            },
            { screen: "10", startDuration: 0, endDuration: 500, content: '<p class="title3">' + $A.get("$Label.c.word_pairs_game_text_0a") + '</p><p class="centers"></p>' },
            {
                screen: "11", startDuration: 0, endDuration: 2500, content: '<p class="title3">' + $A.get("$Label.c.word_pairs_game_text_0a") + '</p>'
                    + '<p class="centers example-row marginT20"> <span class="example-box">money | duck</span></p>'
            },
            { screen: "12", startDuration: 0, endDuration: 500, content: '<p class="title3">' + $A.get("$Label.c.word_pairs_game_text_0a") + '</p><p class="centers"></p>' },

            { screen: "13", startDuration: 0, endDuration: 5000, content: '<h3 class="title">' + $A.get("$Label.c.word_pairs_game_text_0b") + '</h3>' },

            { screen: "14", startDuration: 0, endDuration: 500, content: '<p class="title3">' + $A.get("$Label.c.word_pairs_game_text_0a") + '</p><p class="centers"></p>' },
            // ss
            {
                screen: "15", startDuration: 1, endDuration: 8000, content: '<p class="title3">' + $A.get("$Label.c.word_pairs_game_text_0a") + '</p>'
                    + '<p class="centers example-row"> <span class="example-box">friend | <input autocomplete="off" type="text" name="solution" id="inputsolution" class="txt_input"/> <span class="centers magenta-btn  btn-xlarge"><button id="enterBtn" class="slds-button" label="Skip Game" title="Next" >' + $A.get("$Label.c.paired_Game_Text_18") + '</button></span>  </span> </p>', command: [13, 13], result: true, answer: "house", question: 1, isPractice: true
            },
            { screen: "16", startDuration: 0, endDuration: 500, content: '<p class="title3">' + $A.get("$Label.c.word_pairs_game_text_0a") + '</p><p class="centers"></p>' },
            {
                screen: "17", startDuration: 1, endDuration: 8000, content: '<p class="title3">' + $A.get("$Label.c.word_pairs_game_text_0a") + '</p>'
                    + '<p class="centers example-row"> <span class="example-box">money | <input autocomplete="off" type="text" name="solution" id="inputsolution" class="txt_input"/> <span class="centers magenta-btn  btn-xlarge"><button id="enterBtn" class="slds-button" label="Skip Game" title="Next" >' + $A.get("$Label.c.paired_Game_Text_18") + '</button></span>  </span> </p>', command: [13, 13], result: true, answer: "duck", question: 2, isPractice: true
            },
            { screen: "18", startDuration: 0, endDuration: 500, content: '<p class="title3">' + $A.get("$Label.c.word_pairs_game_text_0a") + '</p>' },
            {
                screen: "19", startDuration: 1, endDuration: 8000, content: '<p class="title3">' + $A.get("$Label.c.word_pairs_game_text_0a") + '</p>'
                    + '<p class="centers example-row"> <span class="example-box">clean | <input autocomplete="off" type="text" name="solution" id="inputsolution" class="txt_input"/> <span class="centers magenta-btn  btn-xlarge"><button id="enterBtn" class="slds-button" label="Skip Game" title="Next" >' + $A.get("$Label.c.paired_Game_Text_18") + '</button></span>  </span> </p>', command: [13, 13], result: true, answer: "socks", question: 3, isPractice: true
            },
            { screen: "20", startDuration: 0, endDuration: 500, content: '<p class="centers"></p>' },

            {
                screen: "21", startDuration: -1, endDuration: 99999920000, isTouch: true, content: '<h3 class="title font34"><span> ' + $A.get("$Label.c.word_pairs_game_text_22") + '</span></h3>' +
                    '<h3 class="title">' + $A.get("$Label.c.word_pairs_game_text_19") + '</h3>' +
                    '<h3 class="title">' + $A.get("$Label.c.word_pairs_game_text_20") + '</h3>' +
                    '<p class="centers s-b-instraction">' + $A.get("$Label.c.games_spacebar_text_2") + '</p>', command: [32, 32]
            },
            { screen: "22", startDuration: 0, endDuration: 2500, content: '<h3 class="title font34"> <span>' + $A.get("$Label.c.word_pairs_game_text_23") + '</span></h3>' },



            {
                screen: "23", startDuration: 0, endDuration: 2500, content: '<p class="title3">' + $A.get("$Label.c.word_pairs_game_text_23") + '</p>'
                    + '<p class="centers example-row marginT20"> <span class="example-box">care | door</span></p>'
            },
            { screen: "24", startDuration: 0, endDuration: 500, content: '<p class="title3">' + $A.get("$Label.c.word_pairs_game_text_23") + '</p><p class="centers"></p>' },
            {
                screen: "25", startDuration: 0, endDuration: 2500, content: '<p class="title3">' + $A.get("$Label.c.word_pairs_game_text_23") + '</p>'
                    + '<p class="centers example-row marginT20"> <span class="example-box">public | hard</span></p>'
            },
            { screen: "26", startDuration: 0, endDuration: 500, content: '<p class="title3">' + $A.get("$Label.c.word_pairs_game_text_23") + '</p><p class="centers"></p>' },
            {
                screen: "27", startDuration: 0, endDuration: 2500, content: '<p class="title3">' + $A.get("$Label.c.word_pairs_game_text_23") + '</p>'
                    + '<p class="centers example-row marginT20"> <span class="example-box">under | life</span></p>'
            },
            { screen: "28", startDuration: 0, endDuration: 500, content: '<p class="title3">' + $A.get("$Label.c.word_pairs_game_text_23") + '</p><p class="centers"></p>' },
            {
                screen: "29", startDuration: 0, endDuration: 2500, content: '<p class="title3">' + $A.get("$Label.c.word_pairs_game_text_23") + '</p>'
                    + '<p class="centers example-row marginT20"> <span class="example-box">hair | write</span></p>'
            },
            { screen: "30", startDuration: 0, endDuration: 500, content: '<p class="title3">' + $A.get("$Label.c.word_pairs_game_text_23") + '</p><p class="centers"></p>' },
            {
                screen: "31", startDuration: 0, endDuration: 2500, content: '<p class="title3">' + $A.get("$Label.c.word_pairs_game_text_23") + '</p>'
                    + '<p class="centers example-row marginT20"> <span class="example-box">candle | spoon</span></p>'
            },
            { screen: "32", startDuration: 0, endDuration: 500, content: '<p class="title3">' + $A.get("$Label.c.word_pairs_game_text_23") + '</p><p class="centers"></p>' },
            {
                screen: "33", startDuration: 0, endDuration: 2500, content: '<p class="title3">' + $A.get("$Label.c.word_pairs_game_text_23") + '</p>'
                    + '<p class="centers example-row marginT20"> <span class="example-box">ride | horse</span></p>'
            },

            { screen: "34", startDuration: 0, endDuration: 500, content: '<p class="title3">' + $A.get("$Label.c.word_pairs_game_text_23") + '</p><p class="centers"></p>' },
            {
                screen: "35", startDuration: 0, endDuration: 2500, content: '<p class="title3">' + $A.get("$Label.c.word_pairs_game_text_23") + '</p>'
                    + '<p class="centers example-row marginT20"> <span class="example-box">garden | grass</span></p>'
            },
            { screen: "36", startDuration: 0, endDuration: 500, content: '<p class="title3">' + $A.get("$Label.c.word_pairs_game_text_23") + '</p><p class="centers"></p>' },
            {
                screen: "37", startDuration: 0, endDuration: 2500, content: '<p class="title3">' + $A.get("$Label.c.word_pairs_game_text_23") + '</p>'
                    + '<p class="centers example-row marginT20"> <span class="example-box">dress | boat</span></p>'
            },
            { screen: "38", startDuration: 0, endDuration: 500, content: '<p class="title3">' + $A.get("$Label.c.word_pairs_game_text_23") + '</p><p class="centers"></p>' },
            {
                screen: "39", startDuration: 0, endDuration: 2500, content: '<p class="title3">' + $A.get("$Label.c.word_pairs_game_text_23") + '</p>'
                    + '<p class="centers example-row marginT20"> <span class="example-box">mouth | time</span></p>'
            },
            { screen: "40", startDuration: 0, endDuration: 500, content: '<p class="title3">' + $A.get("$Label.c.word_pairs_game_text_23") + '</p><p class="centers"></p>' },
            {
                screen: "41", startDuration: 0, endDuration: 2500, content: '<p class="title3">' + $A.get("$Label.c.word_pairs_game_text_23") + '</p>'
                    + '<p class="centers example-row marginT20"> <span class="example-box">poor | green</span></p>'
            },
            { screen: "42", startDuration: 0, endDuration: 500, content: '<p class="title3">' + $A.get("$Label.c.word_pairs_game_text_23") + '</p><p class="centers"></p>' },
            {
                screen: "43", startDuration: 0, endDuration: 2500, content: '<p class="title3">' + $A.get("$Label.c.word_pairs_game_text_23") + '</p>'
                    + '<p class="centers example-row marginT20"> <span class="example-box">apple | eat</span></p>'
            },
            // { screen:"45", startDuration:0, endDuration:500, content:'<p class="title3">' + $A.get("$Label.c.paired_Game_Text_35") +'</p><p class="centers"></p>'},
            { screen: "44", startDuration: 0, endDuration: 500, content: '<p class="title3">' + $A.get("$Label.c.word_pairs_game_text_23") + '</p><p class="centers"></p>' },
            {
                screen: "45", startDuration: 0, endDuration: 2500, content: '<p class="title3">' + $A.get("$Label.c.word_pairs_game_text_23") + '</p>'
                    + '<p class="centers example-row marginT20"> <span class="example-box">night | fast</span></p>'
            },
            { screen: "46", startDuration: 0, endDuration: 5000, content: '<h3 class="title">' + $A.get("$Label.c.word_pairs_game_text_0b") + '</h3>' },



            {
                screen: "47", startDuration: 1, endDuration: 8000, content: '<p class="title3">' + $A.get("$Label.c.word_pairs_game_text_23") + '</p>'
                    + '<p class="centers example-row"> <span class="example-box">care | <input autocomplete="off" type="text" name="solution" id="inputsolution" class="txt_input"/> <span class="centers magenta-btn  btn-xlarge"><button id="enterBtn" class="slds-button" >' + $A.get("$Label.c.paired_Game_Text_18") + '</button></span></span> </p>', command: [13, 13], result: true, answer: "door", question: 1, isPractice: false
            },
            { screen: "48", startDuration: 0, endDuration: 500, content: '<p class="title3">' + $A.get("$Label.c.word_pairs_game_text_23") + '</p><p class="centers"></p>' },
            {
                screen: "49", startDuration: 1, endDuration: 8000, content: '<p class="title3">' + $A.get("$Label.c.word_pairs_game_text_23") + '</p>'
                    + '<p class="centers example-row"> <span class="example-box">public | <input autocomplete="off" type="text" name="solution" id="inputsolution" class="txt_input"/> <span class="centers magenta-btn  btn-xlarge"><button id="enterBtn" class="slds-button" >' + $A.get("$Label.c.paired_Game_Text_18") + '</button></span></span> </p>', command: [13, 13], result: true, answer: "hard", question: 2, isPractice: false
            },
            { screen: "50", startDuration: 0, endDuration: 500, content: '<p class="title3">' + $A.get("$Label.c.word_pairs_game_text_23") + '</p><p class="centers"></p>' },
            {
                screen: "51", startDuration: 1, endDuration: 8000, content: '<p class="title3">' + $A.get("$Label.c.word_pairs_game_text_23") + '</p>'
                    + '<p class="centers example-row"> <span class="example-box">under | <input autocomplete="off" type="text" name="solution" id="inputsolution" class="txt_input"/> <span class="centers magenta-btn  btn-xlarge"><button id="enterBtn" class="slds-button" >' + $A.get("$Label.c.paired_Game_Text_18") + '</button></span></span> </p>', command: [13, 13], result: true, answer: "life", question: 3, isPractice: false
            },
            { screen: "52", startDuration: 0, endDuration: 500, content: '<p class="title3">' + $A.get("$Label.c.word_pairs_game_text_23") + '</p><p class="centers"></p>' },
            {
                screen: "53", startDuration: 1, endDuration: 8000, content: '<p class="title3">' + $A.get("$Label.c.word_pairs_game_text_23") + '</p>'
                    + '<p class="centers example-row"> <span class="example-box">hair | <input autocomplete="off" type="text" name="solution" id="inputsolution" class="txt_input"/> <span class="centers magenta-btn  btn-xlarge"><button id="enterBtn" class="slds-button" >' + $A.get("$Label.c.paired_Game_Text_18") + '</button></span></span> </p>', command: [13, 13], result: true, answer: "write", question: 4, isPractice: false
            },
            { screen: "54", startDuration: 0, endDuration: 500, content: '<p class="title3">' + $A.get("$Label.c.word_pairs_game_text_23") + '</p><p class="centers"></p>' },
            {
                screen: "55", startDuration: 1, endDuration: 8000, content: '<p class="title3">' + $A.get("$Label.c.word_pairs_game_text_23") + '</p>'
                    + '<p class="centers example-row"> <span class="example-box">candle  | <input autocomplete="off" type="text" name="solution" id="inputsolution" class="txt_input"/> <span class="centers magenta-btn  btn-xlarge"><button id="enterBtn" class="slds-button" >' + $A.get("$Label.c.paired_Game_Text_18") + '</button></span></span> </p>', command: [13, 13], result: true, answer: "spoon", question: 5, isPractice: false
            },
            { screen: "56", startDuration: 0, endDuration: 500, content: '<p class="title3">' + $A.get("$Label.c.word_pairs_game_text_23") + '</p><p class="centers"></p>' },
            {
                screen: "57", startDuration: 1, endDuration: 8000, content: '<p class="title3">' + $A.get("$Label.c.word_pairs_game_text_23") + '</p>'
                    + '<p class="centers example-row"> <span class="example-box">ride | <input autocomplete="off" type="text" name="solution" id="inputsolution" class="txt_input"/> <span class="centers magenta-btn  btn-xlarge"><button id="enterBtn" class="slds-button" >' + $A.get("$Label.c.paired_Game_Text_18") + '</button></span></span> </p>', command: [13, 13], result: true, answer: "horse", question: 6, isPractice: false
            },
            { screen: "58", startDuration: 0, endDuration: 500, content: '<p class="title3">' + $A.get("$Label.c.word_pairs_game_text_23") + '</p><p class="centers"></p>' },
            {
                screen: "59", startDuration: 1, endDuration: 8000, content: '<p class="title3">' + $A.get("$Label.c.word_pairs_game_text_23") + '</p>'
                    + '<p class="centers example-row"> <span class="example-box">garden | <input autocomplete="off" type="text" name="solution" id="inputsolution" class="txt_input"/> <span class="centers magenta-btn  btn-xlarge"><button id="enterBtn" class="slds-button" >' + $A.get("$Label.c.paired_Game_Text_18") + '</button></span></span> </p>', command: [13, 13], result: true, answer: "grass", question: 7, isPractice: false
            },
            { screen: "60", startDuration: 0, endDuration: 500, content: '<p class="title3">' + $A.get("$Label.c.word_pairs_game_text_23") + '</p><p class="centers"></p>' },
            {
                screen: "61", startDuration: 1, endDuration: 8000, content: '<p class="title3">' + $A.get("$Label.c.word_pairs_game_text_23") + '</p>'
                    + '<p class="centers example-row"> <span class="example-box">dress | <input autocomplete="off" type="text" name="solution" id="inputsolution" class="txt_input"/> <span class="centers magenta-btn  btn-xlarge"><button id="enterBtn" class="slds-button" >' + $A.get("$Label.c.paired_Game_Text_18") + '</button></span></span> </p>', command: [13, 13], result: true, answer: "boat", question: 8, isPractice: false
            },
            { screen: "62", startDuration: 0, endDuration: 500, content: '<p class="title3">' + $A.get("$Label.c.word_pairs_game_text_23") + '</p><p class="centers"></p>' },
            {
                screen: "63", startDuration: 1, endDuration: 8000, content: '<p class="title3">' + $A.get("$Label.c.word_pairs_game_text_23") + '</p>'
                    + '<p class="centers example-row"> <span class="example-box">mouth | <input autocomplete="off" type="text" name="solution" id="inputsolution" class="txt_input"/> <span class="centers magenta-btn  btn-xlarge"><button id="enterBtn" class="slds-button" >' + $A.get("$Label.c.paired_Game_Text_18") + '</button></span></span> </p>', command: [13, 13], result: true, answer: "time", question: 9, isPractice: false
            },
            { screen: "64", startDuration: 0, endDuration: 500, content: '<p class="title3">' + $A.get("$Label.c.word_pairs_game_text_23") + '</p><p class="centers"></p>' },
            {
                screen: "65", startDuration: 1, endDuration: 8000, content: '<p class="title3">' + $A.get("$Label.c.word_pairs_game_text_23") + '</p>'
                    + '<p class="centers example-row"> <span class="example-box">poor | <input autocomplete="off" type="text" name="solution" id="inputsolution" class="txt_input"/> <span class="centers magenta-btn  btn-xlarge"><button id="enterBtn" class="slds-button" >' + $A.get("$Label.c.paired_Game_Text_18") + '</button></span></span> </p>', command: [13, 13], result: true, answer: "green", question: 10, isPractice: false
            },
            { screen: "66", startDuration: 0, endDuration: 500, content: '<p class="title3">' + $A.get("$Label.c.word_pairs_game_text_23") + '</p><p class="centers"></p>' },
            {
                screen: "67", startDuration: 1, endDuration: 8000, content: '<p class="title3">' + $A.get("$Label.c.word_pairs_game_text_23") + '</p>'
                    + '<p class="centers example-row"> <span class="example-box">apple | <input autocomplete="off" type="text" name="solution" id="inputsolution" class="txt_input"/> <span class="centers magenta-btn  btn-xlarge"><button id="enterBtn" class="slds-button" >' + $A.get("$Label.c.paired_Game_Text_18") + '</button></span></span> </p>', command: [13, 13], result: true, answer: "eat", question: 11, isPractice: false
            },
            { screen: "68", startDuration: 0, endDuration: 500, content: '<p class="title3">' + $A.get("$Label.c.word_pairs_game_text_23") + '</p><p class="centers"></p>' },
            {
                screen: "69", startDuration: 1, endDuration: 8000, content: '<p class="title3">' + $A.get("$Label.c.word_pairs_game_text_23") + '</p>'
                    + '<p class="centers example-row"> <span class="example-box">night | <input autocomplete="off" type="text" name="solution" id="inputsolution" class="txt_input"/> <span class="centers magenta-btn  btn-xlarge"><button id="enterBtn" class="slds-button" >' + $A.get("$Label.c.paired_Game_Text_18") + '</button></span></span> </p>', command: [13, 13], result: true, answer: "fast", question: 12, isPractice: false
            },

            { screen: "70", startDuration: 0, endDuration: 2500, content: '<h3 class="title font34"> <span>' + $A.get("$Label.c.word_pairs_game_text_26") + '</span></h3>' },


            {
                screen: "71", startDuration: 0, endDuration: 2500, content: '<p class="title3">' + $A.get("$Label.c.word_pairs_game_text_26") + '</p>' +
                    '<p class="centers example-row marginT20"> <span class="example-box">ride | horse</span></p>'
            },
            { screen: "72", startDuration: 0, endDuration: 500, content: '<p class="title3">' + $A.get("$Label.c.word_pairs_game_text_26") + '</p> <p class="centers"></p>' },
            {
                screen: "73", startDuration: 0, endDuration: 2500, content: '<p class="title3">' + $A.get("$Label.c.word_pairs_game_text_26") + '</p>' +
                    '<p class="centers example-row marginT20"> <span class="example-box">hair | write</span></p>'
            },
            { screen: "74", startDuration: 0, endDuration: 500, content: '<p class="title3">' + $A.get("$Label.c.word_pairs_game_text_26") + '</p><p class="centers"></p>' },
            {
                screen: "75", startDuration: 0, endDuration: 2500, content: '<p class="title3">' + $A.get("$Label.c.word_pairs_game_text_26") + '</p>' +
                    '<p class="centers example-row marginT20"> <span class="example-box">dress | boat</span></p>'
            },
            { screen: "76", startDuration: 0, endDuration: 500, content: '<p class="title3">' + $A.get("$Label.c.word_pairs_game_text_26") + '</p><p class="centers"></p>' },
            {
                screen: "77", startDuration: 0, endDuration: 2500, content: '<p class="title3">' + $A.get("$Label.c.word_pairs_game_text_26") + '</p>' +
                    '<p class="centers example-row marginT20"> <span class="example-box">care | door</span></p>'
            },
            { screen: "78", startDuration: 0, endDuration: 500, content: '<p class="title3">' + $A.get("$Label.c.word_pairs_game_text_26") + '</p><p class="centers"></p>' },
            {
                screen: "79", startDuration: 0, endDuration: 2500, content: '<p class="title3">' + $A.get("$Label.c.word_pairs_game_text_26") + '</p>' +
                    '<p class="centers example-row marginT20"> <span class="example-box">public | hard</span></p>'
            },
            { screen: "80", startDuration: 0, endDuration: 500, content: '<p class="title3">' + $A.get("$Label.c.word_pairs_game_text_26") + '</p><p class="centers"></p>' },
            {
                screen: "81", startDuration: 0, endDuration: 2500, content: '<p class="title3">' + $A.get("$Label.c.word_pairs_game_text_26") + '</p>' +
                    '<p class="centers example-row marginT20"> <span class="example-box">garden | grass</span></p>'
            },
            { screen: "82", startDuration: 0, endDuration: 500, content: '<p class="title3">' + $A.get("$Label.c.word_pairs_game_text_26") + '</p><p class="centers"></p>' },
            {
                screen: "83", startDuration: 0, endDuration: 2500, content: '<p class="title3">' + $A.get("$Label.c.word_pairs_game_text_26") + '</p>' +
                    '<p class="centers example-row marginT20"> <span class="example-box">candle | spoon</span></p>'
            },
            { screen: "84", startDuration: 0, endDuration: 500, content: '<p class="title3">' + $A.get("$Label.c.word_pairs_game_text_26") + '</p><p class="centers"></p>' },
            {
                screen: "85", startDuration: 0, endDuration: 2500, content: '<p class="title3">' + $A.get("$Label.c.word_pairs_game_text_26") + '</p>' +
                    '<p class="centers example-row marginT20"> <span class="example-box">apple | eat</span></p>'
            },
            { screen: "86", startDuration: 0, endDuration: 500, content: '<p class="title3">' + $A.get("$Label.c.word_pairs_game_text_26") + '</p><p class="centers"></p>' },
            {
                screen: "87", startDuration: 0, endDuration: 2500, content: '<p class="title3">' + $A.get("$Label.c.word_pairs_game_text_26") + '</p>' +
                    '<p class="centers example-row marginT20"> <span class="example-box">night | fast</span></p>'
            },
            { screen: "88", startDuration: 0, endDuration: 500, content: '<p class="title3">' + $A.get("$Label.c.word_pairs_game_text_26") + '</p><p class="centers"></p>' },
            {
                screen: "89", startDuration: 0, endDuration: 2500, content: '<p class="title3">' + $A.get("$Label.c.word_pairs_game_text_26") + '</p>' +
                    '<p class="centers example-row marginT20"> <span class="example-box">mouth | time</span></p>'
            },
            { screen: "90", startDuration: 0, endDuration: 500, content: '<p class="title3">' + $A.get("$Label.c.word_pairs_game_text_26") + '</p><p class="centers"></p>' },
            {
                screen: "91", startDuration: 0, endDuration: 2500, content: '<p class="title3">' + $A.get("$Label.c.word_pairs_game_text_26") + '</p>' +
                    '<p class="centers example-row marginT20"> <span class="example-box">under | life</span></p>'
            },
            { screen: "92", startDuration: 0, endDuration: 500, content: '<p class="title3">' + $A.get("$Label.c.word_pairs_game_text_26") + '</p><p class="centers"></p>' },
            {
                screen: "93", startDuration: 0, endDuration: 2500, content: '<p class="title3">' + $A.get("$Label.c.word_pairs_game_text_26") + '</p>' +
                    '<p class="centers example-row marginT20"> <span class="example-box">poor | green</span></p>'
            },
            { screen: "94", startDuration: 0, endDuration: 500, content: '<p class="title3">' + $A.get("$Label.c.word_pairs_game_text_26") + '</p><p class="centers"></p>' },

            { screen: "95", startDuration: 0, endDuration: 5000, content: '<h3 class="title">' + $A.get("$Label.c.word_pairs_game_text_0b") + '</h3>' },

            {
                screen: "96", startDuration: 1, endDuration: 8000, content: '<p class="title3">' + $A.get("$Label.c.word_pairs_game_text_26") + '</p>' +
                    '<p class="centers example-row"> <span class="example-box">ride | <input autocomplete="off" type="text" name="solution" id="inputsolution" class="txt_input"/> <span class="centers magenta-btn  btn-xlarge"><button id="enterBtn" class="slds-button" >' + $A.get("$Label.c.paired_Game_Text_18") + '</button></span></span> </p>', command: [13, 13], result: true, answer: "horse", question: 13, isPractice: false
            },
            { screen: "97", startDuration: 0, endDuration: 500, content: '<p class="title3">' + $A.get("$Label.c.word_pairs_game_text_26") + '</p><p class="centers"></p>' },
            {
                screen: "98", startDuration: 1, endDuration: 8000, content: '<p class="title3">' + $A.get("$Label.c.word_pairs_game_text_26") + '</p>' +
                    '<p class="centers example-row"> <span class="example-box">hair | <input autocomplete="off" type="text" name="solution" id="inputsolution" class="txt_input"/> <span class="centers magenta-btn  btn-xlarge"><button id="enterBtn" class="slds-button" >' + $A.get("$Label.c.paired_Game_Text_18") + '</button></span></span> </p>', command: [13, 13], result: true, answer: "write", question: 14, isPractice: false
            },
            { screen: "99", startDuration: 0, endDuration: 500, content: '<p class="title3">' + $A.get("$Label.c.word_pairs_game_text_26") + '</p><p class="centers"></p>' },
            {
                screen: "100", startDuration: 1, endDuration: 8000, content: '<p class="title3">' + $A.get("$Label.c.word_pairs_game_text_26") + '</p>' +
                    '<p class="centers example-row"> <span class="example-box">dress | <input autocomplete="off" type="text" name="solution" id="inputsolution" class="txt_input"/> <span class="centers magenta-btn  btn-xlarge"><button id="enterBtn" class="slds-button" >' + $A.get("$Label.c.paired_Game_Text_18") + '</button></span></span> </p>', command: [13, 13], result: true, answer: "boat", question: 15, isPractice: false
            },
            { screen: "101", startDuration: 0, endDuration: 500, content: '<p class="title3">' + $A.get("$Label.c.word_pairs_game_text_26") + '</p><p class="centers"></p>' },
            {
                screen: "102", startDuration: 1, endDuration: 8000, content: '<p class="title3">' + $A.get("$Label.c.word_pairs_game_text_26") + '</p>' +
                    '<p class="centers example-row"> <span class="example-box">care | <input autocomplete="off" type="text" name="solution" id="inputsolution" class="txt_input"/> <span class="centers magenta-btn  btn-xlarge"><button id="enterBtn" class="slds-button" >' + $A.get("$Label.c.paired_Game_Text_18") + '</button></span></span> </p>', command: [13, 13], result: true, answer: "door", question: 16, isPractice: false
            },
            { screen: "103", startDuration: 0, endDuration: 500, content: '<p class="title3">' + $A.get("$Label.c.word_pairs_game_text_26") + '</p><p class="centers"></p>' },
            {
                screen: "104", startDuration: 1, endDuration: 8000, content: '<p class="title3">' + $A.get("$Label.c.word_pairs_game_text_26") + '</p>' +
                    '<p class="centers example-row"> <span class="example-box">public | <input autocomplete="off" type="text" name="solution" id="inputsolution" class="txt_input"/> <span class="centers magenta-btn  btn-xlarge"><button id="enterBtn" class="slds-button" >' + $A.get("$Label.c.paired_Game_Text_18") + '</button></span></span> </p>', command: [13, 13], result: true, answer: "hard", question: 17, isPractice: false
            },
            { screen: "105", startDuration: 0, endDuration: 500, content: '<p class="title3">' + $A.get("$Label.c.word_pairs_game_text_26") + '</p><p class="centers"></p>' },
            {
                screen: "106", startDuration: 1, endDuration: 8000, content: '<p class="title3">' + $A.get("$Label.c.word_pairs_game_text_26") + '</p>' +
                    '<p class="centers example-row"> <span class="example-box">garden | <input autocomplete="off" type="text" name="solution" id="inputsolution" class="txt_input"/> <span class="centers magenta-btn  btn-xlarge"><button id="enterBtn" class="slds-button" >' + $A.get("$Label.c.paired_Game_Text_18") + '</button></span></span> </p>', command: [13, 13], result: true, answer: "grass", question: 18, isPractice: false
            },
            { screen: "107", startDuration: 0, endDuration: 500, content: '<p class="title3">' + $A.get("$Label.c.word_pairs_game_text_26") + '</p><p class="centers"></p>' },
            {
                screen: "108", startDuration: 1, endDuration: 8000, content: '<p class="title3">' + $A.get("$Label.c.word_pairs_game_text_26") + '</p>' +
                    '<p class="centers example-row"> <span class="example-box">candle | <input autocomplete="off" type="text" name="solution" id="inputsolution" class="txt_input"/> <span class="centers magenta-btn  btn-xlarge"><button id="enterBtn" class="slds-button" >' + $A.get("$Label.c.paired_Game_Text_18") + '</button></span></span> </p>', command: [13, 13], result: true, answer: "spoon", question: 19, isPractice: false
            },
            { screen: "109", startDuration: 0, endDuration: 500, content: '<p class="title3">' + $A.get("$Label.c.word_pairs_game_text_26") + '</p><p class="centers"></p>' },
            {
                screen: "110", startDuration: 1, endDuration: 8000, content: '<p class="title3">' + $A.get("$Label.c.word_pairs_game_text_26") + '</p>' +
                    '<p class="centers example-row"> <span class="example-box">apple | <input autocomplete="off" type="text" name="solution" id="inputsolution" class="txt_input"/> <span class="centers magenta-btn  btn-xlarge"><button id="enterBtn" class="slds-button" >' + $A.get("$Label.c.paired_Game_Text_18") + '</button></span></span> </p>', command: [13, 13], result: true, answer: "eat", question: 20, isPractice: false
            },
            { screen: "111", startDuration: 0, endDuration: 500, content: '<p class="title3">' + $A.get("$Label.c.word_pairs_game_text_26") + '</p><p class="centers"></p>' },
            {
                screen: "112", startDuration: 1, endDuration: 8000, content: '<p class="title3">' + $A.get("$Label.c.word_pairs_game_text_26") + '</p>' +
                    '<p class="centers example-row"> <span class="example-box">night | <input autocomplete="off" type="text" name="solution" id="inputsolution" class="txt_input"/> <span class="centers magenta-btn  btn-xlarge"><button id="enterBtn" class="slds-button" >' + $A.get("$Label.c.paired_Game_Text_18") + '</button></span></span> </p>', command: [13, 13], result: true, answer: "fast", question: 21, isPractice: false
            },
            { screen: "113", startDuration: 0, endDuration: 500, content: '<p class="title3">' + $A.get("$Label.c.word_pairs_game_text_26") + '</p><p class="centers"></p>' },
            {
                screen: "114", startDuration: 1, endDuration: 8000, content: '<p class="title3">' + $A.get("$Label.c.word_pairs_game_text_26") + '</p>' +
                    '<p class="centers example-row"> <span class="example-box">mouth | <input autocomplete="off" type="text" name="solution" id="inputsolution" class="txt_input"/> <span class="centers magenta-btn  btn-xlarge"><button id="enterBtn" class="slds-button" >' + $A.get("$Label.c.paired_Game_Text_18") + '</button></span></span> </p>', command: [13, 13], result: true, answer: "time", question: 22, isPractice: false
            },
            { screen: "115", startDuration: 0, endDuration: 500, content: '<p class="title3">' + $A.get("$Label.c.word_pairs_game_text_26") + '</p><p class="centers"></p>' },
            {
                screen: "116", startDuration: 1, endDuration: 8000, content: '<p class="title3">' + $A.get("$Label.c.word_pairs_game_text_26") + '</p>' +
                    '<p class="centers example-row"> <span class="example-box">under | <input autocomplete="off" type="text" name="solution" id="inputsolution" class="txt_input"/> <span class="centers magenta-btn  btn-xlarge"><button id="enterBtn" class="slds-button" >' + $A.get("$Label.c.paired_Game_Text_18") + '</button></span></span> </p>', command: [13, 13], result: true, answer: "life", question: 23, isPractice: false
            },
            { screen: "117", startDuration: 0, endDuration: 500, content: '<p class="title3">' + $A.get("$Label.c.word_pairs_game_text_26") + '</p><p class="centers"></p>' },
            {
                screen: "118", startDuration: 1, endDuration: 8000, content: '<p class="title3">' + $A.get("$Label.c.word_pairs_game_text_26") + '</p>' +
                    '<p class="centers example-row"> <span class="example-box">poor | <input autocomplete="off" type="text" name="solution" id="inputsolution" class="txt_input"/> <span class="centers magenta-btn  btn-xlarge"><button id="enterBtn" class="slds-button" >' + $A.get("$Label.c.paired_Game_Text_18") + '</button></span></span> </p>', command: [13, 13], result: true, answer: "green", question: 24, isPractice: false
            },
            { screen: "119", startDuration: 0, endDuration: 2500, content: '<h3 class="title font34"> <span>' + $A.get("$Label.c.word_pairs_game_text_27") + '</span></h3>' },



            {
                screen: "120", startDuration: 0, endDuration: 2500, content: '<p class="title3">' + $A.get("$Label.c.word_pairs_game_text_27") + '</p>' +
                    '<p class="centers example-row marginT20"> <span class="example-box">dress | boat</span></p>'
            },
            { screen: "121", startDuration: 0, endDuration: 500, content: '<p class="title3">' + $A.get("$Label.c.word_pairs_game_text_27") + '</p><p class="centers"></p>' },
            {
                screen: "122", startDuration: 0, endDuration: 2500, content: '<p class="title3">' + $A.get("$Label.c.word_pairs_game_text_27") + '</p>' +
                    '<p class="centers example-row marginT20"> <span class="example-box">candle | spoon</span></p>'
            },
            { screen: "123", startDuration: 0, endDuration: 500, content: '<p class="title3">' + $A.get("$Label.c.word_pairs_game_text_27") + '</p><p class="centers"></p>' },
            {
                screen: "124", startDuration: 0, endDuration: 2500, content: '<p class="title3">' + $A.get("$Label.c.word_pairs_game_text_27") + '</p>' +
                    '<p class="centers example-row marginT20"> <span class="example-box">ride | horse</span></p>'
            },
            { screen: "125", startDuration: 0, endDuration: 500, content: '<p class="title3">' + $A.get("$Label.c.word_pairs_game_text_27") + '</p><p class="centers"></p>' },
            {
                screen: "126", startDuration: 0, endDuration: 2500, content: '<p class="title3">' + $A.get("$Label.c.word_pairs_game_text_27") + '</p>' +
                    '<p class="centers example-row marginT20"> <span class="example-box">night | fast</span></p>'
            },
            { screen: "127", startDuration: 0, endDuration: 500, content: '<p class="title3">' + $A.get("$Label.c.word_pairs_game_text_27") + '</p><p class="centers"></p>' },
            {
                screen: "128", startDuration: 0, endDuration: 2500, content: '<p class="title3">' + $A.get("$Label.c.word_pairs_game_text_27") + '</p>' +
                    '<p class="centers example-row marginT20"> <span class="example-box">poor | green</span></p>'
            },
            { screen: "129", startDuration: 0, endDuration: 500, content: '<p class="title3">' + $A.get("$Label.c.word_pairs_game_text_27") + '</p><p class="centers"></p>' },
            {
                screen: "130", startDuration: 0, endDuration: 2500, content: '<p class="title3">' + $A.get("$Label.c.word_pairs_game_text_27") + '</p>' +
                    '<p class="centers example-row marginT20"> <span class="example-box">garden | grass</span></p>'
            },
            { screen: "131", startDuration: 0, endDuration: 500, content: '<p class="title3">' + $A.get("$Label.c.word_pairs_game_text_27") + '</p><p class="centers"></p>' },
            {
                screen: "132", startDuration: 0, endDuration: 2500, content: '<p class="title3">' + $A.get("$Label.c.word_pairs_game_text_27") + '</p>' +
                    '<p class="centers example-row marginT20"> <span class="example-box">hair | write</span></p>'
            },
            { screen: "133", startDuration: 0, endDuration: 500, content: '<p class="title3">' + $A.get("$Label.c.word_pairs_game_text_27") + '</p><p class="centers"></p>' },
            {
                screen: "134", startDuration: 0, endDuration: 2500, content: '<p class="title3">' + $A.get("$Label.c.word_pairs_game_text_27") + '</p>' +
                    '<p class="centers example-row marginT20"> <span class="example-box">under | life</span></p>'
            },
            { screen: "135", startDuration: 0, endDuration: 500, content: '<p class="title3">' + $A.get("$Label.c.word_pairs_game_text_27") + '</p><p class="centers"></p>' },
            {
                screen: "136", startDuration: 0, endDuration: 2500, content: '<p class="title3">' + $A.get("$Label.c.word_pairs_game_text_27") + '</p>' +
                    '<p class="centers example-row marginT20"> <span class="example-box">apple | eat</span></p>'
            },
            { screen: "137", startDuration: 0, endDuration: 500, content: '<p class="title3">' + $A.get("$Label.c.word_pairs_game_text_27") + '</p><p class="centers"></p>' },
            {
                screen: "138", startDuration: 0, endDuration: 2500, content: '<p class="title3">' + $A.get("$Label.c.word_pairs_game_text_27") + '</p>' +
                    '<p class="centers example-row marginT20"> <span class="example-box">care | door</span></p>'
            },
            { screen: "139", startDuration: 0, endDuration: 500, content: '<p class="title3">' + $A.get("$Label.c.word_pairs_game_text_27") + '</p><p class="centers"></p>' },
            {
                screen: "140", startDuration: 0, endDuration: 2500, content: '<p class="title3">' + $A.get("$Label.c.word_pairs_game_text_27") + '</p>' +
                    '<p class="centers example-row marginT20"> <span class="example-box">mouth | time</span></p>'
            },
            { screen: "141", startDuration: 0, endDuration: 500, content: '<p class="title3">' + $A.get("$Label.c.word_pairs_game_text_27") + '</p><p class="centers"></p>' },
            {
                screen: "142", startDuration: 0, endDuration: 2500, content: '<p class="title3">' + $A.get("$Label.c.word_pairs_game_text_27") + '</p>' +
                    '<p class="centers example-row marginT20"> <span class="example-box">public | hard</span></p>'
            },
            { screen: "143", startDuration: 0, endDuration: 500, content: '<p class="centers"></p>' },

            { screen: "144", startDuration: 0, endDuration: 5000, content: '<h3 class="title">' + $A.get("$Label.c.word_pairs_game_text_0b") + '</h3>' },

            {
                screen: "145", startDuration: 1, endDuration: 8000, content: '<p class="title3">' + $A.get("$Label.c.word_pairs_game_text_27") + '</p>' +
                    '<p class="centers example-row"> <span class="example-box">care | <input autocomplete="off" type="text" name="solution" id="inputsolution" class="txt_input"/> <span class="centers magenta-btn  btn-xlarge"><button id="enterBtn" class="slds-button" >' + $A.get("$Label.c.paired_Game_Text_18") + '</button></span></span> </p>', command: [13, 13], result: true, answer: "door", question: 25, isPractice: false
            },
            { screen: "146", startDuration: 0, endDuration: 500, content: '<p class="title3">' + $A.get("$Label.c.word_pairs_game_text_27") + '</p><p class="centers"></p>' },
            {
                screen: "147", startDuration: 1, endDuration: 8000, content: '<p class="title3">' + $A.get("$Label.c.word_pairs_game_text_27") + '</p>' +
                    '<p class="centers example-row"> <span class="example-box">night | <input autocomplete="off" type="text" name="solution" id="inputsolution" class="txt_input"/> <span class="centers magenta-btn  btn-xlarge"><button id="enterBtn" class="slds-button" >' + $A.get("$Label.c.paired_Game_Text_18") + '</button></span></span> </p>', command: [13, 13], result: true, answer: "fast", question: 26, isPractice: false
            },
            { screen: "148", startDuration: 0, endDuration: 500, content: '<p class="title3">' + $A.get("$Label.c.word_pairs_game_text_27") + '</p><p class="centers"></p>' },
            {
                screen: "149", startDuration: 1, endDuration: 8000, content: '<p class="title3">' + $A.get("$Label.c.word_pairs_game_text_27") + '</p>' +
                    '<p class="centers example-row"> <span class="example-box">under | <input autocomplete="off" type="text" name="solution" id="inputsolution" class="txt_input"/> <span class="centers magenta-btn  btn-xlarge"><button id="enterBtn" class="slds-button" >' + $A.get("$Label.c.paired_Game_Text_18") + '</button></span></span> </p>', command: [13, 13], result: true, answer: "life", question: 27, isPractice: false
            },
            { screen: "150", startDuration: 0, endDuration: 500, content: '<p class="title3">' + $A.get("$Label.c.word_pairs_game_text_27") + '</p><p class="centers"></p>' },
            {
                screen: "151", startDuration: 1, endDuration: 8000, content: '<p class="title3">' + $A.get("$Label.c.word_pairs_game_text_27") + '</p>' +
                    '<p class="centers example-row"> <span class="example-box">dress | <input autocomplete="off" type="text" name="solution" id="inputsolution" class="txt_input"/> <span class="centers magenta-btn  btn-xlarge"><button id="enterBtn" class="slds-button" >' + $A.get("$Label.c.paired_Game_Text_18") + '</button></span></span> </p>', command: [13, 13], result: true, answer: "boat", question: 28, isPractice: false
            },
            { screen: "152", startDuration: 0, endDuration: 500, content: '<p class="title3">' + $A.get("$Label.c.word_pairs_game_text_27") + '</p><p class="centers"></p>' },
            {
                screen: "153", startDuration: 1, endDuration: 8000, content: '<p class="title3">' + $A.get("$Label.c.word_pairs_game_text_27") + '</p>' +
                    '<p class="centers example-row"> <span class="example-box">ride | <input autocomplete="off" type="text" name="solution" id="inputsolution" class="txt_input"/> <span class="centers magenta-btn  btn-xlarge"><button id="enterBtn" class="slds-button" >' + $A.get("$Label.c.paired_Game_Text_18") + '</button></span></span> </p>', command: [13, 13], result: true, answer: "horse", question: 29, isPractice: false
            },
            { screen: "154", startDuration: 0, endDuration: 500, content: '<p class="title3">' + $A.get("$Label.c.word_pairs_game_text_27") + '</p><p class="centers"></p>' },
            {
                screen: "155", startDuration: 1, endDuration: 8000, content: '<p class="title3">' + $A.get("$Label.c.word_pairs_game_text_27") + '</p>' +
                    '<p class="centers example-row"> <span class="example-box">hair | <input autocomplete="off" type="text" name="solution" id="inputsolution" class="txt_input"/> <span class="centers magenta-btn  btn-xlarge"><button id="enterBtn" class="slds-button" >' + $A.get("$Label.c.paired_Game_Text_18") + '</button></span></span> </p>', command: [13, 13], result: true, answer: "write", question: 30, isPractice: false
            },
            { screen: "156", startDuration: 0, endDuration: 500, content: '<p class="title3">' + $A.get("$Label.c.word_pairs_game_text_27") + '</p><p class="centers"></p>' },
            {
                screen: "157", startDuration: 1, endDuration: 8000, content: '<p class="title3">' + $A.get("$Label.c.word_pairs_game_text_27") + '</p>' +
                    '<p class="centers example-row"> <span class="example-box">mouth | <input autocomplete="off" type="text" name="solution" id="inputsolution" class="txt_input"/> <span class="centers magenta-btn  btn-xlarge"><button id="enterBtn" class="slds-button" >' + $A.get("$Label.c.paired_Game_Text_18") + '</button></span></span> </p>', command: [13, 13], result: true, answer: "time", question: 31, isPractice: false
            },
            { screen: "158", startDuration: 0, endDuration: 500, content: '<p class="title3">' + $A.get("$Label.c.word_pairs_game_text_27") + '</p><p class="centers"></p>' },
            {
                screen: "159", startDuration: 1, endDuration: 8000, content: '<p class="title3">' + $A.get("$Label.c.word_pairs_game_text_27") + '</p>' +
                    '<p class="centers example-row"> <span class="example-box">public | <input autocomplete="off" type="text" name="solution" id="inputsolution" class="txt_input"/> <span class="centers magenta-btn  btn-xlarge"><button id="enterBtn" class="slds-button" >' + $A.get("$Label.c.paired_Game_Text_18") + '</button></span></span> </p>', command: [13, 13], result: true, answer: "hard", question: 32, isPractice: false
            },
            { screen: "160", startDuration: 0, endDuration: 500, content: '<p class="title3">' + $A.get("$Label.c.word_pairs_game_text_27") + '</p><p class="centers"></p>' },
            {
                screen: "161", startDuration: 1, endDuration: 8000, content: '<p class="title3">' + $A.get("$Label.c.word_pairs_game_text_27") + '</p>' +
                    '<p class="centers example-row"> <span class="example-box">poor | <input autocomplete="off" type="text" name="solution" id="inputsolution" class="txt_input"/> <span class="centers magenta-btn  btn-xlarge"><button id="enterBtn" class="slds-button" >' + $A.get("$Label.c.paired_Game_Text_18") + '</button></span></span> </p>', command: [13, 13], result: true, answer: "green", question: 33, isPractice: false
            },
            { screen: "162", startDuration: 0, endDuration: 500, content: '<p class="title3">' + $A.get("$Label.c.word_pairs_game_text_27") + '</p><p class="centers"></p>' },
            {
                screen: "163", startDuration: 1, endDuration: 8000, content: '<p class="title3">' + $A.get("$Label.c.word_pairs_game_text_27") + '</p>' +
                    '<p class="centers example-row"> <span class="example-box">garden | <input autocomplete="off" type="text" name="solution" id="inputsolution" class="txt_input"/> <span class="centers magenta-btn  btn-xlarge"><button id="enterBtn" class="slds-button" >' + $A.get("$Label.c.paired_Game_Text_18") + '</button></span></span> </p>', command: [13, 13], result: true, answer: "grass", question: 34, isPractice: false
            },
            { screen: "164", startDuration: 0, endDuration: 500, content: '<p class="title3">' + $A.get("$Label.c.word_pairs_game_text_27") + '</p><p class="centers"></p>' },
            {
                screen: "165", startDuration: 1, endDuration: 8000, content: '<p class="title3"> ' + $A.get("$Label.c.word_pairs_game_text_27") + '</p>' +
                    '<p class="centers example-row"> <span class="example-box">candle | <input autocomplete="off" type="text" name="solution" id="inputsolution" class="txt_input"/> <span class="centers magenta-btn  btn-xlarge"><button id="enterBtn" class="slds-button" >' + $A.get("$Label.c.paired_Game_Text_18") + '</button></span></span> </p>', command: [13, 13], result: true, answer: "spoon", question: 35, isPractice: false
            },
            { screen: "166", startDuration: 0, endDuration: 500, content: '<p class="title3">' + $A.get("$Label.c.word_pairs_game_text_27") + '</p><p class="centers"></p>' },
            {
                screen: "167", startDuration: 1, endDuration: 8000, content: '<p class="title3">' + $A.get("$Label.c.word_pairs_game_text_27") + '</p>' +
                    '<p class="centers example-row"> <span class="example-box">apple | <input autocomplete="off" type="text" name="solution" id="inputsolution" class="txt_input"/> <span class="centers magenta-btn  btn-xlarge"><button id="enterBtn" class="slds-button" >' + $A.get("$Label.c.paired_Game_Text_18") + '</button></span></span> </p>', command: [13, 13], result: true, answer: "eat", question: 36, isPractice: false
            },
            { screen: "168", startDuration: 0, endDuration: 500, content: '<p class="centers"></p>' },

            //     { screen:"168", startDuration:0, endDuration:50000, content:'<h1 class="title">' + $A.get("$Label.c.paired_Game_Text_62") +'</h1>'
            //     +'<p class="bolds centers s-b-instraction">' + $A.get("$Label.c.games_spacebar_text_1") +'</p>'
            // },
            {
                // screen: "169", startDuration: 1, endDuration: 999999998000, content: '<h3 class="title">' + $A.get("$Label.c.paired_Game_Text_62") + '</h3>' +

                //     '<p class="bolds centers s-b-instraction">' + $A.get("$Label.c.games_spacebar_text_1") + '</p>', command: [13, 13], result: true, answer: "eat", question: 36, isPractice: false, gameEnd: true

                screen: "169", startDuration: 1, endDuration: 999999998000, content: ' ', command: [13, 13], result: true, answer: "eat", question: 36, isPractice: false, gameEnd: true
            },

            // {screen: "168", startDuration: -1, endDuration: 999998000,isTouch:true, content: '<h3 class="title">' + $A.get("$Label.c.paired_Game_Text_62") +'</h3>' +

            // '<p class="bolds centers s-b-instraction">' + $A.get("$Label.c.games_spacebar_text_1") +'</p>', command: [32, 32],question:37,isPractice:false},


        ]

        //This saveData function is used for creating record in ParticipantGameresponse object.
        function saveData(gameName, questionNumber, userInputData, isCorrect, reactionTime, isPracticeQuestion, correctAnswer) {
            console.log('inputkeyPress save = ', inputkeyPress, userInputData);
            helper.recorData(component, event, helper, contactId, gameId, questionNumber, userInputData, isCorrect, reactionTime, isPracticeQuestion, correctAnswer, participantGameInfoId,inputkeyPress);
            //question number
            console.log(component, event, helper, contactId, gameId, questionNumber, userInputData, isCorrect, reactionTime, isPracticeQuestion, correctAnswer, participantGameInfoId)
            // if(questionNumber == 36){
            //     document.getElementById("nextBtton").classList.remove("slds-hide");
            // }
            keyCount =0;
            inputkeyPress = "";
        }

        //This startGame function get the gameid and create a participantGameInfo record and return record ID.
        function updateGameNameInParticipantGameInfo(gameId, participantGameInfoId, ipAddress, browserName, device) {
            helper.gameNameInParticipantGameInfo(component, event, helper, contactId, gameId, participantGameInfoId, ipAddress, browserName, device);
        }

        // end game function is updating the record of participant gameInfo like endDateTime.
        function endGame(gameId, participantGameInfoId) {
            var endDateTime = new Date();
            var gamePlayStatus = "Completed";
            helper.participantGameInfoUpdate(component, event, helper, contactId, gameId, endDateTime, gamePlayStatus, participantGameInfoId);
        }


        //Inisilize the page processing
        function changeScreen() {
            gameId = component.get("v.myAttribute");//gameid holds the gamedetails record id.
            browserName = component.get("v.browser");
            participantGameInfoId = component.get("v.participantGameid");//participantGameInfoId holds the participantgameinfo record id.

            timedata = new Date();
            //document.getElementById("enterBtn").addEventListener('click',gamePlay,false);
            document.getElementById("datablock_pairedGame").innerHTML = configdata[currentScreent].content;
            //Changes for touch
            if (currentScreent == 1) {
                document.getElementById("steps").classList.add('opacity0');
            } 

            if (device == "PHONE") {
                document.getElementById("datablock_pairedGame").removeEventListener('click', gotoNextScreen, false);
                if (configdata[currentScreent].hasOwnProperty('isTouch')) {
                    document.getElementById("datablock_pairedGame").addEventListener('click', gotoNextScreen, false);
                }
            }
            //end changes for touch goto  function  gotoNextScreen
            let inputstr = document.getElementById("inputsolution");
            if (typeof (inputstr) != 'undefined' && inputstr != null) inputstr.focus();

            if (currentScreent > 0) {
                let isResult = configdata[currentScreent - 1].hasOwnProperty("result") ? true : false;
                let lastdata = document.getElementById("d_title").innerHTML;
                if (lastdata.length <= 0 && isResult == true) {

                    //Result Data
                    resultData[configdata[currentScreent - 1].screen] = {
                        "duration": configdata[currentScreent - 1].endDuration,
                        "status": (configdata[currentScreent - 1].answer == inputdata) ? "true" : "false",
                        "data": inputdata,
                        "question": configdata[currentScreent - 1].question,
                        "isPractice": configdata[currentScreent - 1].isPractice,
                        "correctAnswer": configdata[currentScreent - 1].answer
                    }

                    //Save Output Events
                    saveData(
                        "PAIRED",
                        resultData[configdata[currentScreent - 1].screen]["question"],
                        resultData[configdata[currentScreent - 1].screen]["data"],
                        resultData[configdata[currentScreent - 1].screen]["status"],
                        resultData[configdata[currentScreent - 1].screen]["duration"],
                        resultData[configdata[currentScreent - 1].screen]["isPractice"],
                        resultData[configdata[currentScreent - 1].screen]["correctAnswer"]
                    );

                    //Front Result Output Data
                    document.getElementById("d_title").innerHTML = "Result";
                    document.getElementById("d_txt").innerHTML = configdata[currentScreent - 1].endDuration + " ms";
                    document.getElementById("d_status").innerHTML = resultData[configdata[currentScreent - 1].screen]["status"];
                    setTimeout(clearResult, 1000);
                }
            }

            //Initial and end Game
            if (currentScreent == 3) {
                //console.log('my testcode updateGameNameInParticipantGameInfo :',gameId,participantGameInfoId,ipAddress,browserName,device);
                updateGameNameInParticipantGameInfo(gameId, participantGameInfoId, ipAddress, browserName, device);
            }
            if (currentScreent == 1) {

                document.title = "MindCrowd Memory test Instructions Page 2"
            }
            if (currentScreent == 3) {

                document.title = "MindCrowd Memory test Instructions Page 3"
            }

            if (currentScreent == 4) {
                
                document.title = "MindCrowd Memory Game • Practice 1"
                var meta = document.createElement("meta");
              meta.setAttribute("name", "description");
              meta.setAttribute("content", "Let's play the MindCrowd Memory Game starting with Practice 1");
              document.getElementsByTagName('head')[0].appendChild(meta);
            }
            if (currentScreent == 20) {

                document.title = "MindCrowd Memory test Instructions Page 4"
            }
            if (currentScreent == 21) {
                
                document.title = "MindCrowd Memory Game • Round 1"

            }
            if (currentScreent == 69) {
                
                document.title = "MindCrowd Memory Game • Round 2"

            }
            if (currentScreent == 118) {
                
                document.title = "MindCrowd Memory Game • Round 3"

            }

            
            if (currentScreent == 168) {
                helper.allowLeaving();
                window.location.href = $A.get("$Label.c.Community_Url") + "/s/"+ $A.get("$Label.c.url_memorytestcompleted");
                document.title = "MindCrowd Memory Game • Completed"
                var meta = document.createElement("meta");
              meta.setAttribute("name", "description");
              meta.setAttribute("content", "We finished playing all rounds of the MindCrowd Memory Game. ");
              document.getElementsByTagName('head')[0].appendChild(meta);
            }
            console.log('currentScreent = ', currentScreent);
            // end game function for updating the endDateTime.
            if ((configdata.length - 1) == currentScreent) {
                endGame(gameId, participantGameInfoId);
                clearInterval(intervalTime);
                return false;
            }

            //Change New Screen Default
            if ((configdata.length - 1) > currentScreent) {
                intervalTime = setTimeout(changeScreen, configdata[currentScreent].endDuration);
                currentScreent = currentScreent + 1;
            } else {
                clearInterval(intervalTime);
            }
            inputdata = "";

            if (document.getElementById("enterBtn") != null) {
                document.getElementById("enterBtn").addEventListener("click", gamePlay, false);
                //console.log('document.getElementById("enterBtn")== ', document.getElementById("enterBtn"))
                // document.getElementById("enterBtn").addEventListener('click', function (e) {
                //     if (e.target && e.target.name == 'solution') {
                //         inputdata = e.target.value
                //         console.log('e.target.value = ', e.target.value)
                //     }
   
                // });
            }

        }

        //Event Control System
        window.addEventListener('keyup', gamePlay, false);

        document.addEventListener('keyup', function (e) {
            if (e.target && e.target.name == 'solution') {
                clearTimeout(intervalTime);
                intervalTime = setTimeout(changeScreen, configdata[currentScreent - 1].endDuration);
                inputdata = e.target.value
                inputdata = e.target.value
                keyCount++;
                //console.log('e.target = ', e.key);
                if(keyCount <=3){
                    if(  e.key.match(new RegExp( "[a-z]",'gi')) && e.key.length<=1){
                        inputkeyPress = inputkeyPress + e.key;
                    }else{
                        inputkeyPress = inputkeyPress + '{' + e.key + '}';
                    }

                    // if(e.key == 'Backspace'){
                    //     inputkeyPress = inputkeyPress + '{' + e.key + '}';
                    // }else{ 
                    //     inputkeyPress = inputkeyPress + e.key;
                    // }
                    
                   // console.log('length = ', e.target.value.length, ' value = ', inputkeyPress );
                }
            }
        });

        //Inisilize the page processing
        changeScreen();




        


        function gamePlay(e) {
            // alert('ssss' + configdata[currentScreent].gameEnd)
            if (configdata[currentScreent].gameEnd) {
                // const urlParams = new URLSearchParams(document.location.search.substring(1));
                // const product = urlParams.get('c__id');
                // window.location.href = $A.get("$Label.c.Community_Url") + "/s/complete" + '?' + 'id=' + product;
               // window.location.href = $A.get("$Label.c.Community_Url") + "/s/complete";
            }
            command_value = e.keyCode;
            //command_value=e.key.charCodeAt(0);
            //console.log("ppp",inputdata);
            let startDurations = configdata[currentScreent - 1].startDuration;

            //Press spacific key command
            if (startDurations == -1) {
                if (configdata[currentScreent - 1].hasOwnProperty("command") && command_value >= configdata[currentScreent - 1].command[0] && command_value <= configdata[currentScreent - 1].command[1]) {
                    clearInterval(intervalTime);
                    changeScreen();
                }
            } else if (startDurations == 0) {
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
                            "correctAnswer": configdata[currentScreent - 1].answer
                        }
                    }
                }

                if (result_time >= startDurations) {
                    if (configdata[currentScreent - 1].hasOwnProperty("command")) {
                        //Command Value Match Data

                        if ((command_value >= configdata[currentScreent - 1].command[0] && command_value <= configdata[currentScreent - 1].command[1]) || command_value === undefined) {
                            //Result Calculation
                            // console.log('ssssss');
                            if (isResult) {
                                resultData[configdata[currentScreent - 1].screen]["data"] = inputdata;
                                resultData[configdata[currentScreent - 1].screen]["duration"] = result_time;
                                if (startDurations <= result_time && result_time <= endDurations && configdata[currentScreent - 1].answer == inputdata.toLowerCase()) {
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
                                    resultData[configdata[currentScreent - 1].screen]["correctAnswer"]
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
            console.log('e', e);
        }
        //chnages for touch end
    }

    // this function works for 'goto next page' when the game reach to the last question.
    // goToNextPage: function (component, event, helper) {
    //     const urlParams = new URLSearchParams(document.location.search.substring(1));
    //     const product = urlParams.get('c__id');
    //     window.location.href = $A.get("$Label.c.Community_Url") + "/s/complete" + '?' + 'id=' + product;
    // }

});