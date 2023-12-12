({
    //myAction is called from the component. DLTRS game execution is working inside this.
    myAction: function (component, event, helper) {
        //Error handling---------------
        window.addEventListener('error', function(e) {
            let stacktrace = e.stack;
            if (!stacktrace && e.error) {
              stacktrace = e.error.stack;
            }            
            let description = e.message+' Line No: '+ e.lineno;
            helper.logError(component, description );            
        });
          
        helper.preventLeaving();
        if(!window.location.toString().includes("live-preview")){
        if (localStorage.getItem('consent') != "true") {
            window.location.href = $A.get("$Label.c.Community_Url") + "/s/" + $A.get("$Label.c.url_testlanguage");
        } else if (localStorage.getItem('c__id') == '' && localStorage.getItem('consent') == "true") {
            window.location.href = $A.get("$Label.c.Community_Url") + "/s/" + $A.get("$Label.c.url_aboutyourbrain");
        } else {
            const elMainContent = document.getElementById('mainContent');
            var lastBrain = localStorage.getItem('LastPage').substring(localStorage.getItem('LastPage').lastIndexOf("/") + 1, localStorage.getItem('LastPage').length);
            var pageName5 = $A.get("$Label.c.url_attentiontest_page5" ).substring($A.get("$Label.c.url_attentiontest_page5" ).lastIndexOf("/") + 1, $A.get("$Label.c.url_attentiontest_page5" ).length);
            var pageName6 = $A.get("$Label.c.url_attentiontest_page6" ).substring($A.get("$Label.c.url_attentiontest_page6" ).lastIndexOf("/") + 1, $A.get("$Label.c.url_attentiontest_page6" ).length);
            if (lastBrain != pageName5 && lastBrain != pageName6) {
                window.location.href = localStorage.getItem('LastPage');
            }
            else {
                helper.lastStepUpdateInPGI(component);
                localStorage.setItem('attentionpage6', false);
                localStorage.setItem('LastPage', document.URL);
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
        var gamePlayStatus;
        var endDateTime;
        var gameName = 'DLTRS';
        var device = helper.getDeviceType(component, event, helper);
        var totalKeyCount = [];
        let roundTotalTime = null;
        let roundStartTime = null;
        let totalKeyStrokesInRound = 0;
        //==========================getting contactID and Ip from the Cookies.
        var contactId = null;
        var product = localStorage.getItem('c__id');//.split('=');
        if (product != null) {
            contactId =(atob(product));
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
        var ipAddress = null;
        var forUserIp = localStorage.getItem('cip');//.split('=');
        if (forUserIp != null) {
            ipAddress = atob(forUserIp);
        }
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
        //====ended "participant game info" varriable creation=====================
        
        if(currentScreent == 23){
            ++currentScreent;
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
            { screen: "4", startDuration: 0, endDuration: 1000, content: '<p class="centers pinkImage"></p>' },
            { screen: "5", startDuration: 150, endDuration: 1500, content: '<p class="centers pinkImage"><img id="pinkImage" src="' + image_path + 'sphere.png"></p>', command: [65, 90], correctAnswer: "a-z", result: true, question: 1, isPractice: true, round: 0 },
            { screen: "6", startDuration: 0, endDuration: 1980, content: '<p class="centers pinkImage"></p>' },
            { screen: "7", startDuration: 150, endDuration: 1500, content: '<p class="centers pinkImage"><img id="pinkImage" src="' + image_path + 'sphere.png"></p>', command: [65, 90], correctAnswer: "a-z", result: true, question: 2, isPractice: true, round: 0 },
            { screen: "8", startDuration: 0, endDuration: 1870, content: '<p class="centers pinkImage"></p>' },
            { screen: "9", startDuration: 150, endDuration: 1500, content: '<p class="centers pinkImage"><img id="pinkImage" src="' + image_path + 'sphere.png"></p>', command: [65, 90], correctAnswer: "a-z", result: true, question: 3, isPractice: true, round: 0 },
            { screen: "10", startDuration: 0, endDuration: 1280, content: '<p class="centers pinkImage"></p>' },
            { screen: "11", startDuration: 150, endDuration: 1500, content: '<p class="centers pinkImage"><img id="pinkImage" src="' + image_path + 'sphere.png"></p>', command: [65, 90], correctAnswer: "a-z", result: true, question: 4, isPractice: true, round: 0 },
            { screen: "12", startDuration: 0, endDuration: 2720, content: '<p class="centers pinkImage"></p>' },
            { screen: "13", startDuration: 150, endDuration: 1500, content: '<p class="centers pinkImage"><img id="pinkImage" src="' + image_path + 'sphere.png"></p>', command: [65, 90], correctAnswer: "a-z", result: true, question: 5, isPractice: true, round: 0 },
            { screen: "14", startDuration: 0, endDuration: 2820, content: '<p class="centers pinkImage"></p>' },
            { screen: "15", startDuration: 150, endDuration: 1500, content: '<p class="centers pinkImage"><img id="pinkImage" src="' + image_path + 'sphere.png"></p>', command: [65, 90], correctAnswer: "a-z", result: true, question: 6, isPractice: true, round: 0 },
            { screen: "16", startDuration: 0, endDuration: 1050, content: '<p class="centers pinkImage "></p>' },
            { screen: "17", startDuration: 150, endDuration: 1500, content: '<p class="centers pinkImage"><img id="pinkImage" src="' + image_path + 'sphere.png"></p>', command: [65, 90], correctAnswer: "a-z", result: true, question: 7, isPractice: true, round: 0 },
            { screen: "18", startDuration: 0, endDuration: 2980, content: '<p class="centers pinkImage"></p>' },
            { screen: "19", startDuration: 150, endDuration: 1500, content: '<p class="centers pinkImage"><img id="pinkImage" src="' + image_path + 'sphere.png"></p>', command: [65, 90], correctAnswer: "a-z", result: true, question: 8, isPractice: true, round: 0 },
            { screen: "20", startDuration: 0, endDuration: 1820, content: '<p class="centers pinkImage"></p>' },
            { screen: "21", startDuration: 150, endDuration: 1500, content: '<p class="centers pinkImage"><img id="pinkImage" src="' + image_path + 'sphere.png"></p>', command: [65, 90], correctAnswer: "a-z", result: true, question: 9, isPractice: true, round: 0 },
            { screen: "22", startDuration: 0, endDuration: 1000, content: '<p class="centers pinkImage"></p>' },
            {
                screen: "23", startDuration: -1, endDuration: 999998000, isTouch: true, content: '<div class="title">' + $A.get("$Label.c.Dltrs_Game_Text_20a") + '</div>' +
                    '<p class="mb10 centers s-b-instraction">' + $A.get("$Label.c.games_spacebar_text_1") + '</p>', command: [32, 32]
            },
            { screen: "24", startDuration: 0, endDuration: 1000, content: '<p class="centers"></p>', command: [100, 100] },
            { screen: "26", startDuration: 150, endDuration: 1500, content: '<p class="centers pinkImage"><img id="pinkImage" src="' + image_path + 'sphere.png"></p>', command: [65, 90], correctAnswer: "a-z", result: true, question: 1, isPractice: false, round: 1 },
            { screen: "27", startDuration: 0, endDuration: 1980, content: '<p class="centers pinkImage"></p>' },
            { screen: "28", startDuration: 150, endDuration: 1500, content: '<p class="centers pinkImage"><img id="pinkImage" src="' + image_path + 'sphere.png"></p>', command: [65, 90], correctAnswer: "a-z", result: true, question: 2, isPractice: false, round: 1 },
            { screen: "29", startDuration: 0, endDuration: 1980, content: '<p class="centers pinkImage"></p>' },
            { screen: "30", startDuration: 150, endDuration: 1500, content: '<p class="centers  pinkImage"><img id="pinkImage" src="' + image_path + 'sphere.png"></p>', command: [65, 90], correctAnswer: "a-z", result: true, question: 3, isPractice: false, round: 1 },
            { screen: "31", startDuration: 0, endDuration: 1980, content: '<p class="centers pinkImage"></p>' },
            { screen: "32", startDuration: 150, endDuration: 1500, content: '<p class="centers pinkImage"><img id="pinkImage" src="' + image_path + 'sphere.png"></p>', command: [65, 90], correctAnswer: "a-z", result: true, question: 4, isPractice: false, round: 1 },
            { screen: "33", startDuration: 0, endDuration: 1980, content: '<p class="centers pinkImage"></p>' },
            { screen: "34", startDuration: 150, endDuration: 1500, content: '<p class="centers pinkImage"><img id="pinkImage" src="' + image_path + 'sphere.png"></p>', command: [65, 90], correctAnswer: "a-z", result: true, question: 5, isPractice: false, round: 1 },
            { screen: "35", startDuration: 0, endDuration: 1980, content: '<p class="centers pinkImage"></p>' },
            { screen: "36", startDuration: 150, endDuration: 1500, content: '<p class="centers pinkImage"><img id="pinkImage" src="' + image_path + 'sphere.png"></p>', command: [65, 90], correctAnswer: "a-z", result: true, question: 6, isPractice: false, round: 1 },
            { screen: "37", startDuration: 0, endDuration: 1980, content: '<p class="centers pinkImage"></p>' },
            { screen: "38", startDuration: 150, endDuration: 1500, content: '<p class="centers pinkImage"><img id="pinkImage" src="' + image_path + 'sphere.png"></p>', command: [65, 90], correctAnswer: "a-z", result: true, question: 7, isPractice: false, round: 1 },
            { screen: "39", startDuration: 0, endDuration: 1980, content: '<p class="centers pinkImage"></p>' },
            { screen: "40", startDuration: 150, endDuration: 1500, content: '<p class="centers pinkImage"><img id="pinkImage" src="' + image_path + 'sphere.png"></p>', command: [65, 90], correctAnswer: "a-z", result: true, question: 8, isPractice: false, round: 1 },
            { screen: "41", startDuration: 0, endDuration: 1980, content: '<p class="centers pinkImage"></p>' },
            { screen: "42", startDuration: 150, endDuration: 1500, content: '<p class="centers pinkImage"><img id="pinkImage" src="' + image_path + 'sphere.png"></p>', command: [65, 90], correctAnswer: "a-z", result: true, question: 9, isPractice: false, round: 1 },
            { screen: "43", startDuration: 0, endDuration: 1980, content: '<p class="centers pinkImage"></p>' },
            { screen: "44", startDuration: 150, endDuration: 1500, content: '<p class="centers pinkImage"><img id="pinkImage" src="' + image_path + 'sphere.png"></p>', command: [65, 90], correctAnswer: "a-z", result: true, question: 10, isPractice: false, round: 1 },
            { screen: "45", startDuration: 0, endDuration: 1980, content: '<p class="centers pinkImage"></p>' },
            { screen: "46", startDuration: 150, endDuration: 1500, content: '<p class="centers pinkImage"><img id="pinkImage" src="' + image_path + 'sphere.png"></p>', command: [65, 90], correctAnswer: "a-z", result: true, question: 11, isPractice: false, round: 1 },
            { screen: "47", startDuration: 0, endDuration: 1980, content: '<p class="centers pinkImage"></p>' },
            { screen: "48", startDuration: 150, endDuration: 1500, content: '<p class="centers pinkImage"><img id="pinkImage" src="' + image_path + 'sphere.png"></p>', command: [65, 90], correctAnswer: "a-z", result: true, question: 12, isPractice: false, round: 1 },
            { screen: "49", startDuration: 0, endDuration: 1980, content: '<p class="centers pinkImage"></p>' },
            { screen: "50", startDuration: 150, endDuration: 1500, content: '<p class="centers pinkImage"><img id="pinkImage" src="' + image_path + 'sphere.png"></p>', command: [65, 90], correctAnswer: "a-z", result: true, question: 13, isPractice: false, round: 1 },
            { screen: "51", startDuration: 0, endDuration: 1980, content: '<p class="centers pinkImage"></p>' },
            { screen: "52", startDuration: 150, endDuration: 1500, content: '<p class="centers pinkImage"><img id="pinkImage" src="' + image_path + 'sphere.png"></p>', command: [65, 90], correctAnswer: "a-z", result: true, question: 14, isPractice: false, round: 1 },
            { screen: "53", startDuration: 0, endDuration: 1980, content: '<p class="centers pinkImage"></p>' },
            { screen: "54", startDuration: 150, endDuration: 1500, content: '<p class="centers pinkImage"><img id="pinkImage" src="' + image_path + 'sphere.png"></p>', command: [65, 90], correctAnswer: "a-z", result: true, question: 15, isPractice: false, round: 1 },
            { screen: "55", startDuration: 0, endDuration: 1980, content: '<p class="centers pinkImage"></p>' },
            { screen: "56", startDuration: 150, endDuration: 1500, content: '<p class="centers pinkImage"><img id="pinkImage" src="' + image_path + 'sphere.png"></p>', command: [65, 90], correctAnswer: "a-z", result: true, question: 16, isPractice: false, round: 1 },
            { screen: "57", startDuration: 0, endDuration: 1980, content: '<p class="centers pinkImage"></p>' },
            { screen: "58", startDuration: 150, endDuration: 1500, content: '<p class="centers pinkImage"><img id="pinkImage" src="' + image_path + 'sphere.png"></p>', command: [65, 90], correctAnswer: "a-z", result: true, question: 17, isPractice: false, round: 1 },
            { screen: "59", startDuration: 0, endDuration: 1980, content: '<p class="centers pinkImage"></p>' },
            { screen: "60", startDuration: 150, endDuration: 1500, content: '<p class="centers pinkImage"><img id="pinkImage" src="' + image_path + 'sphere.png"></p>', command: [65, 90], correctAnswer: "a-z", result: true, question: 18, isPractice: false, round: 1 },
            { screen: "61", startDuration: 0, endDuration: 1980, content: '<p class="centers pinkImage"></p>' },
            { screen: "62", startDuration: 150, endDuration: 1500, content: '<p class="centers pinkImage"><img id="pinkImage" src="' + image_path + 'sphere.png"></p>', command: [65, 90], correctAnswer: "a-z", result: true, question: 19, isPractice: false, round: 1 },
            { screen: "63", startDuration: 0, endDuration: 1980, content: '<p class="centers pinkImage"></p>' },
            { screen: "64", startDuration: 150, endDuration: 1500, content: '<p class="centers pinkImage"><img id="pinkImage" src="' + image_path + 'sphere.png"></p>', command: [65, 90], correctAnswer: "a-z", result: true, question: 20, isPractice: false, round: 1 },
            { screen: "63", startDuration: 0, endDuration: 1980, content: '<p class="centers pinkImage"></p>' },
            {
                screen: "65", startDuration: -1, endDuration: 999998000, isTouch: true, content: '<div class="title"></div>' +
                    '<p class="mb10 centers s-b-instraction"></p>', command: [32, 32], gameEnd: true
            },
        ]
        //This saveData function is used for creating record in ParticipantGameresponse object.
        function saveData(gameName, questionNumber, response, isCorrect, reactionTime, isPracticeQuestion, correctAnswer, round) {
            helper.recorData(component, event, helper, contactId, gameId, questionNumber, response, isCorrect, reactionTime, isPracticeQuestion, correctAnswer, participantGameInfoId, round);
            console.log('results = ', contactId, gameId, questionNumber, response, isCorrect, reactionTime, isPracticeQuestion, correctAnswer, participantGameInfoId, round)
            localStorage.setItem('currentScreent', currentScreent);
        }
        // This ensgame function works for the update participant gameInfo record like as end date time.
        function endGame(gameId, participantGameInfoId) {
            endDateTime = new Date();
            gamePlayStatus = "Completed";
            helper.participantGameInfoUpdate(component, event, helper, contactId, gameId, endDateTime, gamePlayStatus, participantGameInfoId);//helper method calling here.
            helper.allowLeaving();
            window.location.href = $A.get("$Label.c.Community_Url") + "/s/" + $A.get("$Label.c.url_attentiontestcomplete");
        }
        //this function works for initialize processing.
        function changeScreen() {
            timedata = new Date();
            if (currentScreent == 24) {
                roundStartTime = timedata;
                totalKeyStrokesInRound = 0;
            }
            if (currentScreent == 1) {
                document.getElementById("steps").classList.add('opacity0');
            }
            timedata = new Date();
            document.getElementById("datablock").innerHTML = configdata[currentScreent].content;
            if (!isKeyboad) {
                document.getElementById("datablock").removeEventListener('click', gotoNextScreen, false);
                if (configdata[currentScreent].hasOwnProperty('isTouch')) {
                    document.getElementById("datablock").addEventListener('click', gotoNextScreen, false);
                }
            }
            console.log("configdata[currentScreent - 1].screen: ", configdata[currentScreent - 1].screen);

            if (currentScreent > 0) {
                let isResult = configdata[currentScreent - 1].hasOwnProperty("result") ? true : false;
                let lastdata = document.getElementById("d_title").innerHTML;
                console.log('lastdata = ', lastdata);
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
            // end game function is updating the record of participant gameInfo like endDateTime.
            console.log(configdata.length , '====', currentScreent);
            if ((configdata.length - 1) == currentScreent) {
                roundTotalTime = timedata - roundStartTime;
                let roundTotalTimeNext = localStorage.getItem('roundTotalTime');//.split('=');
                let totalTimeForRoundZero = parseInt(roundTotalTime) + parseInt(roundTotalTimeNext);
                helper.participantGameInfoUpdateTotalTimeRoundOne(component, event, helper, contactId, gameId, participantGameInfoId, totalTimeForRoundZero, totalKeyStrokesInRound, currentScreent);
                clearInterval(intervalTime);
                return true;
            }
            //Change New Screen Default
            if ((configdata.length - 1) > currentScreent) {
                intervalTime = setTimeout(changeScreen, configdata[currentScreent].endDuration);
                currentScreent++;
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
            if (configdata[currentScreent].gamePlayStatus) {
                localStorage.setItem('gamePlayStatusCheck', configdata[currentScreent].gamePlayStatus);
                console.log('checking gamePlayStatusCheck ');
            }
            localStorage.setItem('gamePlayStatusCheck', configdata[currentScreent].gamePlayStatus);
            if (configdata[currentScreent].gameEnd && e.keyCode == 32) {
                const urlParams = new URLSearchParams(document.location.search.substring(1));
                const product = urlParams.get('c__id');
            }
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
            if (startDurations == -1) {
                clearInterval(intervalTime);
                if (command_value >= configdata[currentScreent - 1].command[0] && command_value <= configdata[currentScreent - 1].command[1]) {
                    changeScreen();
                }
            }
            else if (startDurations > 0) {
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
                        resultData[configdata[currentScreent - 1].screen]["userInput"] = e.key;
                        clearResult();
                        return false;
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
                    //Next Screen Show
                    changeScreen();
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
    }

});