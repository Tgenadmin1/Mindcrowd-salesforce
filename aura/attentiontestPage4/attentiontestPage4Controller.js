({
    myAction: function (component, event, helper) {
        //Error handling---------------
        window.addEventListener('error', function (e) {
            let stacktrace = e.stack;
            if (!stacktrace && e.error) {
                stacktrace = e.error.stack;
            }
           // alert('error: ' + e.message + ', File Name: ' + e.filename + ', Line no: ' + e.lineno + ': col no: ' + e.colno);
            let description = e.message + ' Line No: ' + e.lineno;
            helper.logError(component, description);
            // For now, just print the error
           // alert('error out: ' + e.message + ', ' + e.filename + 'Error, ' + e.lineno + ':' + e.colno);
            /* if (stacktrace) {
              alert('Stacktrace: ' + stacktrace);
            } */
        });

        helper.preventLeaving();
        if (!window.location.toString().includes("live-preview")) {
            if (localStorage.getItem('consent') != "true") {
                window.location.href = $A.get("$Label.c.Community_Url") + "/s/" + $A.get("$Label.c.url_testlanguage");
            }
            else if (localStorage.getItem('c__id') == '' && localStorage.getItem('consent') == "true") {
                window.location.href = $A.get("$Label.c.Community_Url") + "/s/" + $A.get("$Label.c.url_aboutyourbrain");
            }
            else {
                const elMainContent = document.getElementById('mainContent');
                var lastBrain = localStorage.getItem('LastPage').substring(localStorage.getItem('LastPage').lastIndexOf("/") + 1, localStorage.getItem('LastPage').length);
                var pageName3 = $A.get("$Label.c.url_attentiontest_page3").substring($A.get("$Label.c.url_attentiontest_page3").lastIndexOf("/") + 1, $A.get("$Label.c.url_attentiontest_page3").length);
                var pageName4 = $A.get("$Label.c.url_attentiontest_page4").substring($A.get("$Label.c.url_attentiontest_page4").lastIndexOf("/") + 1, $A.get("$Label.c.url_attentiontest_page4").length);
                if (lastBrain != pageName3 && lastBrain != pageName4) {
                    window.location.href = localStorage.getItem('LastPage');
                }
                else if (lastBrain == pageName3) {
                    localStorage.setItem('attentionPage4', false);
                    localStorage.setItem('LastPage', document.URL);
                    var url = "https://api.ipdata.co/?api-key=" + $A.get("$Label.c.DataAPIKey");
                    helper.httpGetAsync(component, event, url);
                    if(elMainContent){
                        elMainContent.classList.remove('opacity');
                    }
                }
                else {
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
        //-----Gettung gameId from the apex function---------------
        var gameName = 'DLTRS';
        const urlParams = new URLSearchParams(document.location.search.substring(1));
        const cs = urlParams.get('cs');
        let currentScreent = localStorage.getItem('currentScreent');
        if (cs != null) {
            currentScreent = Number(cs);
        }
        //---------DLRTS game JS-----------------
        let inputValue = "";
        let resultData = {};
        let intervalTime = null;
        let timedata = new Date();
        let result_time = 0;
        let command_value = 0;
        let image_path = $A.get("$Label.c.Community_Url") + "/resource/mindcrowd_style/images/";
        let clicked = false;
        var gameName = $A.get("$Label.c.Dltrs_Game_Text_1");
        var gameTime = '3 minutes';
        var device = helper.getDeviceType();
        var totalKeyCount = [];
        let roundTotalTime = null;
        let roundStartTime = null;
        let totalKeyStrokesInRound = 0;
        let blockevents = 0;
        //creating participant game info record.
        var contactId = null;
        var product = localStorage.getItem('c__id');//.split('=');
        if (product != null) {
            contactId = atob(product);
        }
        var gameId = null;
        var pGameId = null
        var participantGameInfoId = null;
        var pGameInfoCreated = null;
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
        //Configuration of data parts.
        const configdata = [
            {
                screen: "1", startDuration: -1, endDuration: 9999920000, isTouch: true, content: '<div class="title font34">' + $A.get("$Label.c.Dltrs_Game_Text_001") + ' <span> ' + gameName + '! </span> ' + '</div>'
                    + '<div class="title">' + $A.get("$Label.c.game_first_screen_text_2") + ' <span> ' + gameTime + ' </span> ' + $A.get("$Label.c.game_first_screen_text_3") + '</div>'
                    + '<div class="title">' + $A.get("$Label.c.games_get_started_text_1") + ' </div>'
                    + '<p class="centers mb10 s-b-instraction">' + $A.get("$Label.c.games_spacebar_text_3") + ' </p>'
                    + '<span class="game-lang">English</span> ', command: [32, 32]
            },

            {
                screen: "2", startDuration: -1, endDuration: 999998000, isTouch: true, content: '<div class="title font34">  <span> ' + $A.get("$Label.c.games_instruction_text") + ' </span> </div>' +
                    '<div class="title">' + $A.get("$Label.c.Dltrs_Game_Text_12") + '   </div>' +
                    '<div class="title"><span class="intractions-ball"><img src="' + image_path + 'sphere.png"></span></div>' +
                    '<div class="title">' + $A.get("$Label.c.Dltrs_Game_Text_13") + '</div>' +
                    '<p class="mb10 centers s-b-instraction">' + $A.get("$Label.c.games_spacebar_text_1") + '</p>', command: [32, 32]
            },

            {
                screen: "3", startDuration: -1, endDuration: 999998000, isTouch: true, content: '<div class="title">' + $A.get("$Label.c.Dltrs_Game_Text_18") + '</div>' +
                    '<div class="title">' + $A.get("$Label.c.Dltrs_Game_Text_19") + '</div>' +
                    '<div class="title font34"> <span>' + $A.get("$Label.c.Dltrs_Game_Text_20") + '</span> </div>' +
                    '<p class="mb10 centers s-b-instraction">' + $A.get("$Label.c.games_spacebar_text_2") + '</p>', command: [32, 32]
            },

            { screen: "4", startDuration: 0, endDuration: 1000, auto: true, content: '<p class="centers pinkImage"></p>' },
            { screen: "4a", startDuration: 0, endDuration: 5000, auto: true, content: '<p class="centers pinkImage"></p>' },
            { screen: "5", startDuration: 150, endDuration: 1500, auto: false, content: '<p id="resulttxt" class="centers"></p>' + '<p class="centers pinkImage"><img id="pinkImage" src="' + image_path + 'sphere.png"></p>', command: [65, 90], correctAnswer: "a-z", result: true, question: 1, isPractice: true, round: 0 },
            { screen: "6", startDuration: 0, endDuration: 1980, auto: true, content: '<p class="centers pinkImage"></p>' },
            { screen: "7", startDuration: 150, endDuration: 1500, auto: false, content: '<p id="resulttxt" class="centers"></p><p class="centers pinkImage"><img id="pinkImage" src="' + image_path + 'sphere.png"></p>', command: [65, 90], correctAnswer: "a-z", result: true, question: 2, isPractice: true, round: 0 },
            { screen: "8", startDuration: 0, endDuration: 1870, auto: true, content: '<p class="centers pinkImage"></p>' },
            { screen: "9", startDuration: 150, endDuration: 1500, auto: false, content: '<p id="resulttxt" class="centers"></p><p class="centers pinkImage"><img id="pinkImage" src="' + image_path + 'sphere.png"></p>', command: [65, 90], correctAnswer: "a-z", result: true, question: 3, isPractice: true, round: 0 },
            { screen: "10", startDuration: 0, endDuration: 1280, auto: true, content: '<p class="centers pinkImage"></p>' },
            { screen: "11", startDuration: 150, endDuration: 1500, auto: false, content: '<p id="resulttxt" class="centers"></p><p class="centers pinkImage"><img id="pinkImage" src="' + image_path + 'sphere.png"></p>', command: [65, 90], correctAnswer: "a-z", result: true, question: 4, isPractice: true, round: 0 },
            { screen: "12", startDuration: 0, endDuration: 2720, auto: true, content: '<p class="centers pinkImage"></p>' },
            { screen: "13", startDuration: 150, endDuration: 1500, auto: false, content: '<p id="resulttxt" class="centers"></p><p class="centers pinkImage"><img id="pinkImage" src="' + image_path + 'sphere.png"></p>', command: [65, 90], correctAnswer: "a-z", result: true, question: 5, isPractice: true, round: 0 },
            { screen: "14", startDuration: 0, endDuration: 2820, auto: true, content: '<p class="centers pinkImage"></p>' },
            { screen: "15", startDuration: 150, endDuration: 1500, auto: false, content: '<p id="resulttxt" class="centers"></p><p class="centers pinkImage"><img id="pinkImage" src="' + image_path + 'sphere.png"></p>', command: [65, 90], correctAnswer: "a-z", result: true, question: 6, isPractice: true, round: 0 },
            { screen: "16", startDuration: 0, endDuration: 1050, auto: true, content: '<p class="centers pinkImage "></p>' },
            { screen: "17", startDuration: 150, endDuration: 1500, auto: false, content: '<p id="resulttxt" class="centers"></p><p class="centers pinkImage"><img id="pinkImage" src="' + image_path + 'sphere.png"></p>', command: [65, 90], correctAnswer: "a-z", result: true, question: 7, isPractice: true, round: 0 },
            { screen: "18", startDuration: 0, endDuration: 2980, auto: true, content: '<p class="centers pinkImage"></p>' },
            { screen: "19", startDuration: 150, endDuration: 1500, auto: false, content: '<p id="resulttxt" class="centers"></p><p class="centers pinkImage"><img id="pinkImage" src="' + image_path + 'sphere.png"></p>', command: [65, 90], correctAnswer: "a-z", result: true, question: 8, isPractice: true, round: 0 },
            { screen: "20", startDuration: 0, endDuration: 1820, auto: true, content: '<p class="centers pinkImage"></p>' },
            { screen: "21", startDuration: 150, endDuration: 1500, auto: false, content: '<p id="resulttxt" class="centers"></p><p class="centers pinkImage"><img id="pinkImage" src="' + image_path + 'sphere.png"></p>', command: [65, 90], correctAnswer: "a-z", result: true, question: 9, isPractice: true, round: 0 },
            // { screen: "21", startDuration: 0, endDuration: 3000, content: '<p class="centers"></p><p class="txtmsg centers">' + $A.get("$Label.c.Dltrs_Game_Text_17") +'</p>' },
            { screen: "22", startDuration: 0, endDuration: 1000, auto: true, content: '<p class="centers pinkImage"></p>' },

            {
                screen: "23", startDuration: -1, endDuration: 999998000, isTouch: true, content: '<div class="title">' + $A.get("$Label.c.Dltrs_Game_Text_20a") + '</div>' +

                    '<p class="mb10 centers s-b-instraction">' + $A.get("$Label.c.games_spacebar_text_1") + '</p>', command: [32, 32]
            },
            { screen: "24", startDuration: 0, endDuration: 1000, content: '<p class="centers"></p>', command: [100, 100] },

            
        ]

        //This saveData function is used for creating record in ParticipantGameresponse object.
        function saveData(gameName, questionNumber, response, isCorrect, reactionTime, isPracticeQuestion, correctAnswer, round) {
            if (pGameInfoCreated == null) {
                pGameId = localStorage.getItem('pGameId');
                pGameInfoCreated = localStorage.getItem('pGameInfoCreated');
                gameId = atob(pGameId);
                participantGameInfoId = atob(pGameInfoCreated);
            }
            helper.recorData(component, event, helper, contactId, gameId, questionNumber, response, isCorrect, reactionTime, isPracticeQuestion, correctAnswer, participantGameInfoId, round);
            localStorage.setItem('currentScreent', currentScreent);
        }
        //this function works for initialize processing.
        function changeScreen() {
            timedata = new Date();
            if (currentScreent == 5) {
                roundStartTime = timedata;
                totalKeyStrokesInRound = 0;
            }
            if (currentScreent == 22) {
                helper.allowLeaving();
                roundTotalTime = timedata - roundStartTime;
                let roundTotalTimeNext = localStorage.getItem('roundTotalTime');//.split('=');
                let totalTimeForRoundZero = parseInt(roundTotalTime) + parseInt(roundTotalTimeNext);
                helper.participantGameInfoUpdateTotalTimeRoundOne(component, event, helper, contactId, gameId, participantGameInfoId, totalTimeForRoundZero, totalKeyStrokesInRound, currentScreent);
            }
            if (currentScreent == 63) {
                helper.allowLeaving();
                window.location.href = $A.get("$Label.c.Community_Url") + "/s/" + $A.get("$Label.c.url_attentiontestcomplete");
            }
            if (currentScreent != 23) {
                document.getElementById("datablock").innerHTML = configdata[currentScreent].content;
            }
            //Changes for touch
            if (!isKeyboad) {
                document.getElementById("datablock").removeEventListener('click', gotoNextScreen, false);
                if (configdata[currentScreent].hasOwnProperty('isTouch')) {
                    document.getElementById("datablock").addEventListener('click', gotoNextScreen, false);
                }
            }
            console.log("configdata[currentScreent - 1].screen: ", configdata[currentScreent - 1].screen, currentScreent);
            if (currentScreent > 0) {
                let isResult = configdata[currentScreent - 1].hasOwnProperty("result") ? true : false;
                let lastdata = document.getElementById("d_title").innerHTML;
                if (lastdata.length <= 0 && isResult == true) {
                    document.getElementById("d_title").innerHTML = "Result";
                    document.getElementById("d_txt").innerHTML = configdata[currentScreent - 1].endDuration;
                    document.getElementById("d_status").innerHTML = "false";
                    setTimeout(clearResult, 1000);
                    //Result Data
                    resultData[configdata[currentScreent - 1].screen] = {
                        "duration": configdata[currentScreent - 1].endDuration,
                        "status": "false",
                        "screenName": configdata[currentScreent - 1].screen,
                        "question": configdata[currentScreent - 1].question,
                        "isPractice": configdata[currentScreent - 1].isPractice,
                        "userInput": "No Response",
                        "correctAnswer": configdata[currentScreent - 1].correctAnswer,
                        "round": configdata[currentScreent - 1].round
                    }
                    //Save Output Events
                    saveData(
                        "XQUIZ",
                        resultData[configdata[currentScreent - 1].screen]["question"],
                        resultData[configdata[currentScreent - 1].screen]["userInput"],
                        resultData[configdata[currentScreent - 1].screen]["status"],
                        resultData[configdata[currentScreent - 1].screen]["duration"],
                        resultData[configdata[currentScreent - 1].screen]["isPractice"],
                        resultData[configdata[currentScreent - 1].screen]["correctAnswer"],
                        resultData[configdata[currentScreent - 1].screen]["round"]
                    );
                }
            }
            // console.log('auto =', configdata[currentScreent-1].endDuration, 'currentScreent = ', currentScreent);
            //Change New Screen Default
            if ((configdata.length - 1) > currentScreent) {
                if (configdata[currentScreent].auto == true) {
                    intervalTime = setTimeout(changeScreen, configdata[currentScreent].endDuration);
                    currentScreent++;
                } else {
                    currentScreent++;
                }
            } else {
                clearInterval(intervalTime);
            }
            //Event Control System
            window.addEventListener('keyup', gamePlay, false);
            clicked = false;
            if (document.getElementById("pinkImage") != null) {
                document.getElementById("main_content").addEventListener("click", gamePlay, false);
            } else {
                document.getElementById("main_content").removeEventListener("click", gamePlay, false);
            }
        }
        //Inisilize the page processing 
        changeScreen();
        function gamePlay(e) {
            inputValue = e.key;
            totalKeyCount.push(inputValue);
            totalKeyStrokesInRound = totalKeyCount.length;
            command_value = e.keyCode;
            let startDurations = configdata[currentScreent - 1].startDuration;
            let endDurations = configdata[currentScreent - 1].endDuration;
            let isResult = configdata[currentScreent - 1].hasOwnProperty("result") ? true : false;
            if (startDurations == -1) {
                clearInterval(intervalTime);
                if (command_value >= configdata[currentScreent - 1].command[0] && command_value <= configdata[currentScreent - 1].command[1]) {
                    changeScreen();
                }
            }
            else if (startDurations >= 150) {
                result_time = new Date() - timedata;
                //Block before click
                if (result_time < startDurations) return false;
                if (clicked == true) return false;
                clicked = true;
                window.removeEventListener('keyup', function (e) { });
                //Result Calculation
                if (isResult) {
                    document.getElementById("d_title").innerHTML = "Result";
                    document.getElementById("d_txt").innerHTML = result_time + " ms";
                    if (!resultData.hasOwnProperty(configdata[currentScreent - 1].screen)) {
                        resultData[configdata[currentScreent - 1].screen] = {}
                    }
                    if (resultData[configdata[currentScreent - 1].screen].hasOwnProperty("duration")) {
                        resultData[configdata[currentScreent - 1].screen]["duration"] = result_time;
                    } else {
                        resultData[configdata[currentScreent - 1].screen] = { "duration": result_time, "status": "false" };
                    }
                    if (e.key != undefined && inputValue.match(new RegExp("[a-z]", 'gi')) && inputValue.length <= 1) {

                        resultData[configdata[currentScreent - 1].screen]["userInput"] = e.key;

                    } else if (e.key == undefined) {
                        resultData[configdata[currentScreent - 1].screen]["userInput"] = 'Tap';
                    } else {
                        if (resultData[configdata[currentScreent - 1].screen]["status"] == "false") {

                            document.getElementById("resulttxt").innerHTML = $A.get("$Label.c.game_first_screen_Invalid_key");
                            blockKeyEvent();
                            return false;
                        } else {
                            document.getElementById("resulttxt").innerHTML = "Correct Response";
                        }
                    }
                    resultData[configdata[currentScreent - 1].screen]["screenName"] = configdata[currentScreent - 1].screen;
                    resultData[configdata[currentScreent - 1].screen]["question"] = configdata[currentScreent - 1].question;
                    resultData[configdata[currentScreent - 1].screen]["isPractice"] = configdata[currentScreent - 1].isPractice;
                    resultData[configdata[currentScreent - 1].screen]["correctAnswer"] = configdata[currentScreent - 1].correctAnswer;
                    resultData[configdata[currentScreent - 1].screen]["round"] = configdata[currentScreent - 1].round;
                    //Clear Results
                    setTimeout(clearResult, 1500);
                }
                if (result_time >= startDurations) {
                    if (configdata[currentScreent - 1].hasOwnProperty("command")) {

                        if ((command_value >= configdata[currentScreent - 1].command[0] && command_value <= configdata[currentScreent - 1].command[1]) || command_value === undefined) {
                            if (isResult) {
                                document.getElementById("d_status").innerHTML = "true";
                                resultData[configdata[currentScreent - 1].screen]["status"] = "true";
                                //Save Output Events
                                saveData(
                                    "XQUIZ",
                                    resultData[configdata[currentScreent - 1].screen]["question"],
                                    resultData[configdata[currentScreent - 1].screen]["userInput"],
                                    resultData[configdata[currentScreent - 1].screen]["status"],
                                    resultData[configdata[currentScreent - 1].screen]["duration"],
                                    resultData[configdata[currentScreent - 1].screen]["isPractice"],
                                    resultData[configdata[currentScreent - 1].screen]["correctAnswer"],
                                    resultData[configdata[currentScreent - 1].screen]["round"]
                                );
                            }
                            //Reset Screent Interval
                            clearInterval(intervalTime);
                            //Next Screen Show
                            changeScreen();
                        }
                        else {
                            if (isResult) {
                                document.getElementById("d_status").innerHTML = "false";
                                resultData[configdata[currentScreent - 1].screen]["status"] = "false";
                                //Save Output Events
                                saveData(
                                    "XQUIZ",
                                    resultData[configdata[currentScreent - 1].screen]["question"],
                                    resultData[configdata[currentScreent - 1].screen]["userInput"],
                                    resultData[configdata[currentScreent - 1].screen]["status"],
                                    resultData[configdata[currentScreent - 1].screen]["duration"],
                                    resultData[configdata[currentScreent - 1].screen]["isPractice"],
                                    resultData[configdata[currentScreent - 1].screen]["correctAnswer"],
                                    resultData[configdata[currentScreent - 1].screen]["round"]
                                );
                            }
                            //Reset Screent Interval
                            clearInterval(intervalTime);
                            //Next Screen Show
                            changeScreen();
                        }
                    }
                    else {
                        if (isResult) {
                            document.getElementById("d_status").innerHTML = (startDurations <= result_time && result_time <= endDurations) ? "true" : "false";
                            resultData[configdata[currentScreent - 1].screen]["status"] = document.getElementById("d_status").innerHTML;
                            //Save Output Events
                            saveData(
                                "XQUIZ",
                                resultData[configdata[currentScreent - 1].screen]["question"],
                                resultData[configdata[currentScreent - 1].screen]["userInput"],
                                resultData[configdata[currentScreent - 1].screen]["status"],
                                resultData[configdata[currentScreent - 1].screen]["duration"],
                                resultData[configdata[currentScreent - 1].screen]["isPractice"],
                                resultData[configdata[currentScreent - 1].screen]["correctAnswer"],
                                resultData[configdata[currentScreent - 1].screen]["round"]
                            );
                        }
                        //Reset Screent Interval
                        clearInterval(intervalTime);
                        //Next Screen Show
                        changeScreen();
                    }
                }
                else {
                    if (isResult) {
                        document.getElementById("d_status").innerHTML = (startDurations <= result_time && result_time <= endDurations) ? "true" : "false";
                        resultData[configdata[currentScreent - 1].screen]["status"] = document.getElementById("d_status").innerHTML;
                        //Save Output Events
                        saveData(
                            "XQUIZ",
                            resultData[configdata[currentScreent - 1].screen]["question"],
                            resultData[configdata[currentScreent - 1].screen]["userInput"],
                            resultData[configdata[currentScreent - 1].screen]["status"],
                            resultData[configdata[currentScreent - 1].screen]["duration"],
                            resultData[configdata[currentScreent - 1].screen]["isPractice"],
                            resultData[configdata[currentScreent - 1].screen]["correctAnswer"],
                            resultData[configdata[currentScreent - 1].screen]["round"]
                        );
                    }
                    //Reset Screent Interval
                    clearInterval(intervalTime);
                    changeScreen();
                }
            }
        }
        function blockKeyEvent() {
            clearInterval(blockevents);
            blockevents = setTimeout(function () {
                document.getElementById("resulttxt").innerHTML = "";
                window.addEventListener('keyup', gamePlay, false);
                clicked = false;
                return true;
            }, 1500);
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
    }

});