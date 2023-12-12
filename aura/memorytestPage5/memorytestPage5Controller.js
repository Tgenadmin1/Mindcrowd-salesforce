({
    //myAction is called from the component. PAIREDGAME execution is working inside this.
    myAction: function (component, event, helper) {
        //Error handling---------------
        window.addEventListener('error', function (e) {
            let stacktrace = e.stack;
            if (!stacktrace && e.error) {
                stacktrace = e.error.stack;
            }
          
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
                var pageName4 = $A.get("$Label.c.url_memorytest_page_4" ).substring($A.get("$Label.c.url_memorytest_page_4" ).lastIndexOf("/") + 1, $A.get("$Label.c.url_memorytest_page_4" ).length);
                var pageName5 = $A.get("$Label.c.url_memorytest_page_5" ).substring($A.get("$Label.c.url_memorytest_page_5" ).lastIndexOf("/") + 1, $A.get("$Label.c.url_memorytest_page_5" ).length);
                var url = "https://api.ipdata.co/?api-key=" + $A.get("$Label.c.DataAPIKey");
                const elMainContent = document.getElementById('mainContent');
                if (lastBrain != pageName4 && lastBrain != pageName5) {
                    window.location.href = localStorage.getItem('LastPage');
                }
                else if (lastBrain == pageName4) {
                    gamerun = true;
                    localStorage.setItem('memoryGame5', 'false');
                    localStorage.setItem('LastPage', document.URL);
                    //For Dev                    
                    helper.httpGetAsync(component, event,  url);
                    if(elMainContent){
                        elMainContent.classList.remove('opacity');
                    }
                } else {
                    gamerun = true;
                    helper.httpGetAsync(component, event,  url);
                    if(elMainContent){
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
        let currentScreent = localStorage.getItem('currentScreent');
        if (cs != null) {
            currentScreent = Number(cs);
        }

        //--------------PAIRED game JS-----------------
        let resultData = {}
        // let currentScreent = 0;
        let intervalTime = null
        let timedata = new Date();
        let pageLoadStartTime = null;
        let result_time = 0;
        let command_value = 0;
        let inputdata = "";
        let gameEnd = false;
        let image_path = $A.get("$Label.c.Community_Url") + "/resource/mindcrowd_style/images/";
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

        //creating participant game info record.
        //==========================getting contactID and Ip from the Cookies.
        var contactId = null;
        var product = localStorage.getItem('c__id');
        if (product != null) {
            contactId = atob(product);
        }
        var gameId = null;
        var pGameId = null;
        var participantGameInfoId = null;
        var pGameInfoCreated = null;

        //Configuration of data parts.
        const configdata = [

            //Inisial data
            {
                screen: "1", startDuration: -1, endDuration: 9999920000, isTouch: true, content: '<div class="title font34">' + $A.get("$Label.c.Memory_Game_screen_text") + ' <span> ' + gameName + '! </span> ' + '</h1>'
                    + '<div class="title">' + $A.get("$Label.c.Memory_Game_screen_text_2") + ' <span> ' + gameTime + ' </span> ' + $A.get("$Label.c.Memory_Game_screen_text_3") + '</div>'
                    + '<div class="title">' + $A.get("$Label.c.Memory_Game_started_text_1") + ' </div>'
                    + '<p class="centers mb10 s-b-instraction">' + $A.get("$Label.c.Memory_Game_spacebar_text_1") + ' </p>'
                    + '<span class="game-lang">English</span> ', command: [32, 32]
            },
            {
                screen: "2", startDuration: -1, endDuration: 99999920000, isTouch: true, content: '<div class="title font34"><span>' + $A.get("$Label.c.Memory_Game_instruction_text") + '</span></div>'
                    + '<div class="title">' + $A.get("$Label.c.memory_Game_Text_1") + '</div>'
                    + '<div class="title">' + $A.get("$Label.c.Memory_Game_text_2") + '</div>'
                    + '<p class="centers example-row"> <span class="example-box">'+$A.get("$Label.c.Memory_Game_Name")+' | '+$A.get("$Label.c.Memory_Game_clean")+'</span> </p>'
                    + '<div class="title">' + $A.get("$Label.c.Memory_Game_text_3") + '</div>'
                    + '<p class="centers mb10 s-b-instraction">' + $A.get("$Label.c.Memory_Game_spacebar_text_1") + '</p>', command: [32, 32]
            },

            {
                screen: "3", startDuration: -1, endDuration: 99999920000, isTouch: false, content: '<div class="title font34">  <span> ' + $A.get("$Label.c.Memory_Game_instruction_text") + ' </span> </div>'
                    + '<div class="title">' + $A.get("$Label.c.Memory_Game_text_5") + '</div>'
                    + '<div class="title">' + $A.get("$Label.c.Memory_Game_text_6") + '</div>'
                    + '<p class="centers example-row" > <span class="example-box">'+$A.get("$Label.c.Memory_Game_Name")+' | <input autocomplete="off" readonly=true type="text" name="solution" class="pointerEvent-none txt_input wp-animation"/> <span class="centers magenta-btn  btn-xlarge" ><a type="button"   class="slds-button" label="Skip Game"  >Enter</a></span>  </span> </p>'
                    + '<p class="centers mb10 s-b-instraction">' + $A.get("$Label.c.Memory_Game_spacebar_text_1") + '</p>', command: [32, 32]
            },

            {
                screen: "4", startDuration: -1, endDuration: 99999920000, isTouch: true, content: '<div class="title">' + $A.get("$Label.c.Memory_Game_text_8") + ' </div>' +
                    '<div class="title font34"> <span>' + $A.get("$Label.c.Memory_Game_text_9") + '</span> </div>' +
                    '<p class="centers mb10 s-b-instraction">' + $A.get("$Label.c.Memory_Game_spacebar_text_2") + '</p>', command: [32, 32]
            },

            //{ screen:"4", startDuration:0, endDuration:2500, content:'<p class="centers example-row "> <span class="example-box">' + $A.get("$Label.c.paired_Game_Text_22") +' </span> </p>'},
            { screen: "5", startDuration: 0, endDuration: 500, content: '<p class="centers"></p>' },

            //{ screen:"6", startDuration:0, endDuration:2500, content:'<div class="title font34"> <span>' + $A.get("$Label.c.word_pairs_game_text_12") +'</span> </div>'},
            { screen: "6", startDuration: 0, endDuration: 500, content: '<p class="centers"></p>' },

            {
                screen: "7", startDuration: 0, endDuration: 2500, content: '<p class="title3">' + $A.get("$Label.c.Memory_Game_text_0a") + '</p>'
                    + '<p class="centers example-row marginT20"> <span class="example-box">'+$A.get("$Label.c.Memory_Game_friend")+' | '+$A.get("$Label.c.Memory_Game_house")+'</span></p>'
            },

            { screen: "8", startDuration: 0, endDuration: 500, content: '<p class="title3">' + $A.get("$Label.c.Memory_Game_text_0a") + '</p><p class="centers"></p>' },
            {
                screen: "9", startDuration: 0, endDuration: 2500, content: '<p class="title3">' + $A.get("$Label.c.Memory_Game_text_0a") + '</p>'
                    + '<p class="centers example-row marginT20"> <span class="example-box">'+$A.get("$Label.c.Memory_Game_clean")+' | '+$A.get("$Label.c.Memory_Game_socks")+'</span></p>'
            },
            { screen: "10", startDuration: 0, endDuration: 500, content: '<p class="title3">' + $A.get("$Label.c.Memory_Game_text_0a") + '</p><p class="centers"></p>' },
            {
                screen: "11", startDuration: 0, endDuration: 2500, content: '<p class="title3">' + $A.get("$Label.c.Memory_Game_text_0a") + '</p>'
                    + '<p class="centers example-row marginT20"> <span class="example-box">'+$A.get("$Label.c.Memory_Game_money")+' | '+$A.get("$Label.c.Memory_Game_duck")+'</span></p>'
            },
            { screen: "12", startDuration: 0, endDuration: 500, content: '<p class="title3">' + $A.get("$Label.c.Memory_Game_text_0a") + '</p><p class="centers"></p>' },

            { screen: "13", startDuration: 0, endDuration: 5000, content: '<div class="title">' + $A.get("$Label.c.Memory_Game_text_0b") + '</div>' },

            { screen: "14", startDuration: 0, endDuration: 500, content: '<p class="title3">' + $A.get("$Label.c.Memory_Game_text_0a") + '</p><p class="centers"></p>' },
            // ss
            {
                screen: "15", startDuration: 1, endDuration: 8000, content: '<p class="title3">' + $A.get("$Label.c.Memory_Game_text_0a") + '</p>'
                    + '<p class="centers example-row"> <span class="example-box">'+$A.get("$Label.c.Memory_Game_friend")+' | <input autocomplete="off" type="text" name="solution" id="inputsolution" class="txt_input txt_placeholder"/> <span class="centers magenta-btn  btn-xlarge"><button id="enterBtn" class="slds-button" label="Skip Game"  >' + $A.get("$Label.c.Memory_Game_Text_18") + '</button></span>  </span> </p>', command: [13, 13], result: true, answer: $A.get("$Label.c.Memory_Game_house"), question: 1, isPractice: true, round: 0, timeToFirstKeyStroke: 0
            },
            { screen: "16", startDuration: 0, endDuration: 500, content: '<p class="title3">' + $A.get("$Label.c.Memory_Game_text_0a") + '</p><p class="centers"></p>' },
            {
                screen: "17", startDuration: 1, endDuration: 8000, content: '<p class="title3">' + $A.get("$Label.c.Memory_Game_text_0a") + '</p>'
                    + '<p class="centers example-row"> <span class="example-box">'+$A.get("$Label.c.Memory_Game_money")+' | <input autocomplete="off" type="text" name="solution" id="inputsolution" class="txt_input txt_placeholder"/> <span class="centers magenta-btn  btn-xlarge"><button id="enterBtn" class="slds-button" label="Skip Game"  >' + $A.get("$Label.c.Memory_Game_Text_18") + '</button></span>  </span> </p>', command: [13, 13], result: true, answer: $A.get("$Label.c.Memory_Game_duck"), question: 2, isPractice: true, round: 0, timeToFirstKeyStroke: 0
            },
            { screen: "18", startDuration: 0, endDuration: 500, content: '<p class="title3">' + $A.get("$Label.c.Memory_Game_text_0a") + '</p>' },
            {
                screen: "19", startDuration: 1, endDuration: 8000, content: '<p class="title3">' + $A.get("$Label.c.Memory_Game_text_0a") + '</p>'
                    + '<p class="centers example-row"> <span class="example-box">'+$A.get("$Label.c.Memory_Game_clean")+' | <input autocomplete="off" type="text" name="solution" id="inputsolution" class="txt_input txt_placeholder"/> <span class="centers magenta-btn  btn-xlarge"><button id="enterBtn" class="slds-button" label="Skip Game"  >' + $A.get("$Label.c.Memory_Game_Text_18") + '</button></span>  </span> </p>', command: [13, 13], result: true, answer: $A.get("$Label.c.Memory_Game_socks"), question: 3, isPractice: true, round: 0, timeToFirstKeyStroke: 0
            },
            // { screen: "20", startDuration: 0, endDuration: 500, content: '<p class="centers"></p>' },
            {
                screen: "169", startDuration: 1, endDuration: 999999998000, content: ' ', command: [13, 13], result: true, answer: $A.get("$Label.c.Memory_Game_eat"), question: 36, isPractice: false, gameEnd: true
            }

        ]

       

        //This saveData function is used for creating record in ParticipantGameresponse object.
        function saveData(gameName, questionNumber, userInputData, isCorrect, reactionTime, isPracticeQuestion, correctAnswer, timeToFirstKeyStroke, round) {

            if (pGameInfoCreated == null) {

                pGameId = localStorage.getItem('pGameId');
                pGameInfoCreated = localStorage.getItem('pGameInfoCreated');
                gameId = atob(pGameId);
                participantGameInfoId = atob(pGameInfoCreated);
            }

            helper.recorData(component, event, helper, contactId, gameId, questionNumber, userInputData, isCorrect, reactionTime, isPracticeQuestion, correctAnswer, participantGameInfoId, inputkeyPress, timeToFirstKeyStroke, round);
            keyCount = 0;
            inputkeyPress = "";
        }

        let tempData = "";
        let resetTimer = false;
        //Inisilize the page processing
        function changeScreen() {
            resetTimer = false;
            // timedata = new Date();
            pageLoadStartTime = timedata;
            if (typeof (document.getElementById("inputsolution")) != 'undefined' && document.getElementById("inputsolution") != null) {
                tempData = document.getElementById("inputsolution").value;
            }
            if (currentScreent == 1) {
                document.getElementById("steps").classList.add('opacity0');
            }
            if (currentScreent == localStorage.getItem('currentScreent')) {
                roundStartTime = timedata;
            }
            if (currentScreent == 19) {

                helper.allowLeaving();
                roundTotalTime = timedata - roundStartTime;
                let roundTotalTimeNext = localStorage.getItem('roundTotalTime');//.split('=');
                let totalTimeForRoundZero = parseInt(roundTotalTime) + parseInt(roundTotalTimeNext);
                //  alert('roundTotalTimeNext, totalTimeForRoundZero :',roundTotalTimeNext,totalTimeForRoundZero);
                helper.participantGameInfoUpdateTotalTimeRoundOne(component, event, helper, contactId, gameId, participantGameInfoId, totalTimeForRoundZero, currentScreent);

            }
            if (currentScreent != 20) {
                document.getElementById("datablock_pairedGame").innerHTML = configdata[currentScreent].content;
                if (currentScreent == 14 || currentScreent == 16 || currentScreent == 18 ) {
                    if (isKeyboad || document.getElementsByTagName("html")[0].getAttribute("lang")=='es') {
                        document.getElementById("inputsolution").addEventListener('keyup', resetPlaceholderSize);                       
                    }
                    let placeholder = $A.get("$Label.c.catchment_placeholder");
                    document.getElementById("inputsolution").setAttribute("placeholder", placeholder);
                }
            }

            if (!isKeyboad && currentScreent != 20) {
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
                // intervalTime = setTimeout(changeScreen, configdata[currentScreent].endDuration);
                // currentScreent = currentScreent + 1;
                intervalTime = setTimeout(function () {
                    if (pauseGame == false) {
                        changeScreen();
                    }
                }, configdata[currentScreent].endDuration);
                currentScreent++;
            } else {
                clearInterval(intervalTime);
            }
            inputdata = "";

            if (document.getElementById("enterBtn") != null) {
                document.getElementById("enterBtn").addEventListener("click", gamePlay, false);
            }
            timedata = new Date();
            pageLoadStartTime = timedata;
            localStorage.setItem('currentScreent', currentScreent);

        }

        //Event Control System
        window.addEventListener('keyup', gamePlayOnEntrBtn, false);

        document.addEventListener('keyup', function (e) {

            if (e.target && e.target.name == 'solution' && device == "DESKTOP") {
                if (resetTimer) {
                    clearTimeout(intervalTime);
                    intervalTime = setTimeout(changeScreen, configdata[currentScreent - 1].endDuration);
                }
                inputdata = e.target.value?e.target.value:'';
                keyCount++;
                if (keyCount <= 1) {
                    let timeTillFirstStroke = new Date();
                    configdata[currentScreent - 1].timeToFirstKeyStroke = timeTillFirstStroke - pageLoadStartTime;
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
            } else if (e.target && e.target.name == 'solution'){

                if (resetTimer) {
                    clearTimeout(intervalTime);
                    intervalTime = setTimeout(changeScreen, configdata[currentScreent - 1].endDuration);
                }
                inputdata = e.target.value?e.target.value:'';
                // console.log('e.target = ', e.code);
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
                        inputkeyPress = inputdata.substring(0, 3); //inputkeyPress + '{' + e.target.value + '}';
                    }
                }
            }
        });

        //Inisilize the page processing
        // 
        if (gamerun) {
            changeScreen();
        }
        function gamePlay(e) {
            if (configdata[currentScreent].gameEnd) {
                // window.location.href = $A.get("$Label.c.Community_Url") + "/s/complete" + '?' + 'id=' + product;
                // window.location.href = $A.get("$Label.c.Community_Url") + "/s/complete";
            }
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
                            "data": "No Response",
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
                                resultData[configdata[currentScreent - 1].screen]["data"] = document.getElementById("inputsolution").value;;
                                resultData[configdata[currentScreent - 1].screen]["duration"] = result_time;
                                // if (startDurations <= result_time && result_time <= endDurations && configdata[currentScreent - 1].answer == document.getElementById("inputsolution").value.toLowerCase().trim()) {
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
            // console.log(e.keyCode);
            if (e.keyCode == 13) {
                gamePlay({ keyCode: 13 });
            }
            
            // gamePlay({ keyCode: 13 });
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