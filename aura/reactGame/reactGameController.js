({
        //myAction is called from the component. DLTRS game execution is working inside this.
        myAction: function (component, event, helper) {


                var timeS = new Date().getTime();
                const url = new URL(window.location.href);
                //const resourceRelPath = $A.get("$Label.c.react_game_config_url")+'?test='+timeS;
                const resourceUrl = $A.get("$Label.c.Community_Url")+ $A.get("$Label.c.react_game_config_url")+'?test='+timeS;
                console.log('resourceUrl = ' , resourceUrl);
               // const configdata="";
                window.fetch(resourceUrl)
                    .then($A.getCallback((response) => {
                        if (!response.ok) {
                            throw new Error(`HTTP error, status = ${response.status}`);
                        }
                        response.json()
                            .then($A.getCallback((data) => {
                                let configdata = data;
                               
                var myPageRef = window.location.href;
                var actionGame = component.get("c.getCurrentContact");
                var pageUrl = myPageRef.split('/s/');
                //-----Gettung gameId from the apex function------------------
                var gameNameScientific = $A.get("$Label.c.scientific_game_dearySimpleAndComplexReactionTime");
                helper.gameDetails(component, event, helper, gameNameScientific);
                var gameId;
                var participantGameInfoId;
                var ipAddress;
                var browserName;
                helper.getIpAddress(component, event, helper);
                helper.printBrowser(component, event, helper);
                //helper.getDeviceType(component, event, helper);
                // var device = $A.get("$Browser.formFactor");
                var device = helper.getDeviceType(component, event, helper);



                // Gettin contact id from the current loggedin user.
                let currentUserId = $A.get("$SObjectType.CurrentUser.Id");
                helper.userDetails(component, event, helper, currentUserId);
                var userContactId;
                actionGame.setCallback(this, function (a) {
                        let test = Math.floor((Math.random() * 10) + 1);
                        //console.log('myPageRef value22222222222222222 :', test);
                        var state = a.getState();
                        if (state === "SUCCESS") {
                                var name = a.getReturnValue();
                                var language = name['Language__c'];
               
                                console.log('language second',language);
                               
                                // if(name['Deary_Simple_And_Complex_Reaction_Time__c']=='Locked' && pageUrl[1]== $A.get("$Label.c.url_me_reactgame")) {
                                if (name['Deary_Simple_And_Complex_Reaction_Time__c'] == 'Locked') {
                                        component.set('v.showConfirmDialog', true);
                                }
                                //else if(name['Deary_Simple_And_Complex_Reaction_Time__c']=='Completed' && pageUrl[1]==  $A.get("$Label.c.url_me_reactgame")) {
                                else if (name['Deary_Simple_And_Complex_Reaction_Time__c'] == 'Completed') {
                                        component.set('v.showConfirmDialog', true);
                                }
                                // full game code is started from here (else part).===========================
                                else if (name['Deary_Simple_And_Complex_Reaction_Time__c'] == 'Opened') {
                                        name['Deary_Simple_And_Complex_Reaction_Time__c'] = '';
                                        component.set('v.showConfirmDialog', false);
                                        helper.preventLeaving();
                                        document.documentElement.addEventListener('keydown', function (e) {
                                                if ((e.keycode || e.which) == 32) {
                                                        e.preventDefault();
                                                }
                                        }, false);
                                        //---------DLRTS game JS-------------
                                        const urlParams = new URLSearchParams(document.location.search.substring(1));
                                        const cs = urlParams.get('cs');
                                        let currentScreent = 0;
                                        if (cs != null) {
                                                //console.log("cs1=", cs)
                                                currentScreent = Number(cs);
                                        }
                                        let resultData = {};
                                        let intervalTime = null;
                                        let pageLoadStartTime = null;
                                        let roundTotalTime = null;
                                        let roundStartTime = null;
                                        let totalKeyStrokesInRound = 0;
                                        let timedata = new Date();
                                        let result_time = 0;
                                        let command_value = 0;
                                        let inputValue = '';
                                        let image_path = $A.get("$Label.c.Community_Url") + "/resource/mindcrowd_style/images/";
                                        let clicked = false;
                                        var gameName = $A.get("$Label.c.game_name_2");
                                        var gameTime = $A.get("$Label.c.games_time_5_minute");
                                        let macTouch = getCookie('macTouch');
                                        var ua = window.navigator.userAgent;
                                        var iOS = !!ua.match(/Mac OS/i);
                                        var screenHeight = window.screen.availHeight;
                                        var screenWidth = window.screen.availWidth;
                                        // var isMac = ua.match(/Mac OS/i);
                                        var isKeyboad;
                                        // alert('iOS = '+ iOS);
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
                                        function getCookie(name) {
                                                var cookieString = "; " + document.cookie;
                                                cookieString = cookieString.replace('LSKey-c$', '');
                                                var parts = cookieString.split("; " + name + "=");
                                                if (parts.length === 2) {
                                                        return parts.pop().split(";").shift();
                                                }
                                                return null;
                                        }

                                        // alert('device = '+ device);





                                        //Configuration of data parts.

                                        // instruction changes for the tab and mobile devices.
                                        var react_game_text_1 = "";
                                        var react_game_text_1_a = "";
                                        var react_game_text_4 = "";
                                        var react_game_text_11 = "";
                                        var react_game_text_16 = "";
                                        var react_game_text_18 = "";
                                        var react_game_text_18_a = "";

                                        // if(device != "DESKTOP" || (device == "" && macTouch == 'true')){
                                        //

                                        if (!isKeyboad) {
                                                react_game_text_1 = $A.get("$Label.c.react_game_text_1_tap");
                                                react_game_text_1_a = $A.get("$Label.c.react_game_text_1_a_tap");
                                                react_game_text_4 = $A.get("$Label.c.react_game_text_4_tap");
                                                react_game_text_11 = $A.get("$Label.c.react_game_text_11_tap");
                                                react_game_text_16 = $A.get("$Label.c.react_game_text_16_tap");
                                                react_game_text_18 = $A.get("$Label.c.react_game_text_18_tap");
                                                react_game_text_18_a = $A.get("$Label.c.react_game_text_18_a_tap");

                                        } else {
                                                react_game_text_1 = $A.get("$Label.c.react_game_text_1");
                                                react_game_text_1_a = $A.get("$Label.c.react_game_text_1_a");
                                                react_game_text_4 = $A.get("$Label.c.react_game_text_4");
                                                react_game_text_11 = $A.get("$Label.c.react_game_text_11");
                                                react_game_text_16 = $A.get("$Label.c.react_game_text_16");
                                                react_game_text_18 = $A.get("$Label.c.react_game_text_18");
                                                react_game_text_18_a = $A.get("$Label.c.react_game_text_18_a");
                                                // component.set('v.tapScreen', false);
                                        }

                                                configdata  = configdata.map(obj => {	
                                                obj.content = obj.content.replace('react_game_text_1', react_game_text_1);
                                                obj.content = obj.content.replace('1_a_react_game_text', react_game_text_1_a);
                                                obj.content = obj.content.replace('react_game_text_4', react_game_text_4);
                                                obj.content = obj.content.replace('11_react_game_text', react_game_text_11);
                                                obj.content = obj.content.replace('16_react_game_text', react_game_text_16); 
                                                obj.content = obj.content.replace('18_react_game_text', react_game_text_18); 
                                                obj.content = obj.content.replace('18a_react_game_text', react_game_text_18_a);
                                                return obj;
                                          });
                                          //console.log('New configdata: '+JSON.stringify(configdata));

                                       
                                        //console.log('configdata1 = ', configdata[1].content.replace("#react_game_text_1#", "W3Schools"));
                                        
                                        // for(var i=0; i < configdata.length; i++){
                                        //         configdata[i].content =   configdata[i].content.replace("#react_game_text_1#", react_game_text_1);
                                        //         configdata[i].content =   configdata[i].content.replace("#react_game_text_1_a#", react_game_text_1_a);
                                        //         configdata[i].content =   configdata[i].content.replace("#react_game_text_4#", react_game_text_4);
                                        //         configdata[i].content =   configdata[i].content.replace("#react_game_text_11#", react_game_text_11);
                                        //         configdata[i].content =   configdata[i].content.replace("#react_game_text_16#", react_game_text_16);
                                        //         configdata[i].content =   configdata[i].content.replace("#react_game_text_18#", react_game_text_18);
                                        //         configdata[i].content =   configdata[i].content.replace("#react_game_text_18_a#", react_game_text_18_a);
                                        // }

                                        console.log('config Data = ', configdata);      
                                        //This saveData function is used for creating record in ParticipantGameresponse object.
                                        function saveData(gameName, questionNumber, response, isCorrect, reactionTime, isPracticeQuestion, correctAnswer, round) {
                                                helper.recorData(component, event, helper, userContactId, gameId, questionNumber, response, isCorrect, reactionTime, isPracticeQuestion, correctAnswer, participantGameInfoId, round);
                                                //questionNumber
                                                // if (questionNumber == 40) {
                                                //         document.getElementById("nextBtton").classList.remove("slds-hide");
                                                // }
                                                // console.log('dddddddddddd = ', helper, userContactId, gameId, questionNumber, response, isCorrect, reactionTime, isPracticeQuestion, correctAnswer, participantGameInfoId,round);
                                        }
                                        function endGame(gameId, participantGameInfoId) {
                                                var endDateTime = new Date();
                                                var gamePlayStatus = "Completed";
                                                helper.participantGameInfoUpdate(component, event, helper, userContactId,language, gameId, endDateTime, gamePlayStatus, participantGameInfoId);//helper method calling here.
                                        }

                                        //this function works for initialize processing.
                                        function changeScreen() {
                                                //console.log('browser Name = ', helper.getBrowser());
                                                gameId = component.get("v.myAttribute");
                                                userContactId = component.get("v.mycontactId");
                                                ipAddress = component.get("v.ipAddress");
                                                browserName = component.get("v.browser");
                                                participantGameInfoId = component.get("v.participantGameid");//participantGameInfoId holds the participantgameinfo record id.
                                                timedata = new Date();
                                                document.getElementById("datablock_reactGame").innerHTML = configdata[currentScreent].content;
                                                //console.log("current screen : ", configdata[currentScreent].screen );


                                                if (configdata[currentScreent].endGame2 == true) {
                                                        document.getElementById("nextBtton").classList.remove("slds-hide");
                                                }

                                                if (configdata[currentScreent].screen == '1' || configdata[currentScreent].screen == '26'
                                                        || configdata[currentScreent].screen == '69' || configdata[currentScreent].screen == '92') {
                                                        roundStartTime = timedata;
                                                        totalKeyStrokesInRound = 0;
                                                }
                                                if (configdata[currentScreent].screen == '22' || configdata[currentScreent].screen == '66'
                                                        || configdata[currentScreent].screen == '91' || configdata[currentScreent].screen == '172') {
                                                        roundTotalTime = timedata - roundStartTime;
                                                        if (configdata[currentScreent].screen == '22') {
                                                                let totalTimeForRoundZero = roundTotalTime;
                                                                helper.participantGameInfoUpdateTotalTimeRoundOne(component, event, helper, userContactId, gameId, participantGameInfoId, totalTimeForRoundZero, totalKeyStrokesInRound, configdata[currentScreent].screen);
                                                        }
                                                        else if (configdata[currentScreent].screen == '66') {
                                                                let totalTimeForRoundOne = roundTotalTime;
                                                                helper.participantGameInfoUpdateTotalTimeRoundOne(component, event, helper, userContactId, gameId, participantGameInfoId, totalTimeForRoundOne, totalKeyStrokesInRound, configdata[currentScreent].screen);
                                                        }
                                                        else if (configdata[currentScreent].screen == '91') {
                                                                let totalTimeForRoundTwo = roundTotalTime;
                                                                helper.participantGameInfoUpdateTotalTimeRoundOne(component, event, helper, userContactId, gameId, participantGameInfoId, totalTimeForRoundTwo, totalKeyStrokesInRound, configdata[currentScreent].screen);
                                                        }
                                                        else if (configdata[currentScreent].screen == '172') {
                                                                let totalTimeForRoundThree = roundTotalTime;
                                                                helper.participantGameInfoUpdateTotalTimeRoundOne(component, event, helper, userContactId, gameId, participantGameInfoId, totalTimeForRoundThree, totalKeyStrokesInRound, configdata[currentScreent].screen);
                                                        }
                                                }
                                                //Changes for touch
                                                //  console.log('macTouch = ', macTouch);
                                                if (!isKeyboad) {

                                                        document.getElementById("touchEvent").removeEventListener('click', gotoNextScreen, false);
                                                        if (configdata[currentScreent].hasOwnProperty('isTouch')) {
                                                                document.getElementById("touchEvent").addEventListener('click', gotoNextScreen, false);
                                                        }

                                                        let tabButtons = document.querySelectorAll(".tabButtons");
                                                        if (tabButtons != 'undefined' && tabButtons != null) {
                                                                tabButtons.forEach((e) => {
                                                                        e.classList.remove("slds-hide");
                                                                        e.addEventListener('click', reactEventQuery, false);
                                                                });
                                                        }
                                                        let inputBox = document.querySelectorAll(".inputBox ");
                                                        if (inputBox != 'undefined' && inputBox != null) {
                                                                inputBox.forEach((e) => {
                                                                        e.classList.remove("slds-hide");
                                                                });
                                                        }



                                                }
                                                //end changes for touch goto  function  gotoNextScreen
                                                let ureactinputbtn = document.querySelectorAll(".reactInput");
                                                if (typeof (ureactinputbtn) != 'undefined' && ureactinputbtn != null) {
                                                        ureactinputbtn.forEach((e) => {
                                                                e.addEventListener('click', reactEventQuery, false);
                                                        });
                                                }
                                                //left aligning the instructions pages
                                                if (configdata[currentScreent].instructionsLeft == true) {
                                                        document.getElementById("gameMainContent").classList.add("instructionsLeft");
                                                } else {
                                                        document.getElementById("gameMainContent").classList.remove("instructionsLeft");
                                                }
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
                                                //creating participant game info record.
                                                if (currentScreent == 1) {
                                                        var startDateTime = new Date();
                                                        var gamePlayStatus = "Not-Completed";
                                                        var screenResolution = {"height" :screenHeight, "width" :screenWidth };
                                                        helper.participantGameInfo(component, event, helper, userContactId,language, gameId, startDateTime, gamePlayStatus, ipAddress, browserName, device,screenResolution);
                                                }
                                                else {
                                                        ////console.log('screens are changing');
                                                }
                                                // end game function is updating the record of participant gameInfo like endDateTime.
                                                if ((configdata.length - 1) == currentScreent) {
                                                        endGame(gameId, participantGameInfoId);
                                                        // //console.log('my testcode:',gameId,participantGameInfoId);
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
                                                //Event Control System
                                                window.addEventListener('keyup', gamePlay, false);
                                                clicked = false;
                                        }
                                        //Inisilize the page processing
                                        changeScreen();
                                        function gamePlay(e) {

                                                command_value = e.keyCode;
                                                inputValue = e.key;

                                                //console.log('ssssssssssss1', command_value);
                                                totalKeyStrokesInRound = totalKeyStrokesInRound + 1;
                                                let startDurations = configdata[currentScreent - 1].startDuration;
                                                let endDurations = configdata[currentScreent - 1].endDuration;
                                                let isResult = configdata[currentScreent - 1].hasOwnProperty("result") ? true : false;
                                                if (startDurations == -1) {
                                                        clearInterval(intervalTime);
                                                        if (command_value >= configdata[currentScreent - 1].command[0] && command_value <= configdata[currentScreent - 1].command[1]) {
                                                                changeScreen();
                                                        }
                                                }
                                                else if (startDurations > 0) {

                                                        result_time = new Date() - timedata;
                                                        //Block before click
                                                        // console.log('result_time1= ', result_time, 'startDurations1 = ', startDurations);
                                                        if (result_time < startDurations) return false;
                                                        if (clicked == true) return false;
                                                        // console.log('result_time2= ', result_time, 'startDurations2 = ', startDurations);
                                                        if (isResult) {
                                                                if (configdata[currentScreent - 1].hasOwnProperty("allowKey")) {
                                                                        if (inputValue.match(new RegExp(configdata[currentScreent - 1].allowKey, 'gi')) && inputValue.length <= 1) {
                                                                                //console.log('inputvalue9=---', inputValue);
                                                                        }
                                                                        else {
                                                                                //console.log('inputvalue9=---');
                                                                                //  console.log('result_time3= ', result_time, 'startDurations3 = ', startDurations);
                                                                                return false;
                                                                        }
                                                                }
                                                        }

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
                                                                resultData[configdata[currentScreent - 1].screen]["userInput"] = e.key;
                                                                resultData[configdata[currentScreent - 1].screen]["screenName"] = configdata[currentScreent - 1].screen;
                                                                resultData[configdata[currentScreent - 1].screen]["question"] = configdata[currentScreent - 1].question;
                                                                resultData[configdata[currentScreent - 1].screen]["isPractice"] = configdata[currentScreent - 1].isPractice;
                                                                resultData[configdata[currentScreent - 1].screen]["correctAnswer"] = configdata[currentScreent - 1].correctAnswer;
                                                                resultData[configdata[currentScreent - 1].screen]["round"] = configdata[currentScreent - 1].round;
                                                                //Clear Results
                                                                setTimeout(clearResult, 1500);
                                                        }

                                                        if (result_time >= startDurations) {
                                                                //console.log('result_time4= ', result_time, 'startDurations4 = ', startDurations);
                                                                if (configdata[currentScreent - 1].hasOwnProperty("command")) {
                                                                        if (command_value >= configdata[currentScreent - 1].command[0] && command_value <= configdata[currentScreent - 1].command[1]) {
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
                                                // if (e.pointerType === "mouse") {
                                                //         // clicked with mouse
                                                //         alert('mouse click');
                                                //         userTouch =false;

                                                //       } else {
                                                //         alert('mouse touch');  
                                                //         userTouch =true;
                                                //         gamePlay({ keyCode: 32, key: '' });   
                                                //         // probably touch
                                                //       }
                                                gamePlay({ keyCode: 32, key: '' });

                                        }
                                        function reactEventQuery(e) {
                                                gamePlay({ key: e.currentTarget.getAttribute("data-input"), keyCode: e.currentTarget.getAttribute("data-key") });
                                        }
                                        //chnages for touch end
                                }
                                $A.get('e.refreshView').fire();
                        }
                        else if (state === "ERROR") {
                                let message = '';
                                let errors = response.getError();
                                if (errors && Array.isArray(errors) && errors.length > 0) {
                                        message = errors[0].message;
                                }
                                //console.error(message);
                        }
                        else {
                                //console.log('else part');
                        }
                });
                // $A.enqueueAction(actionGame);
                $A.getCallback(function () {
                        $A.enqueueAction(actionGame);
                })()
                }));
        }))
        .catch($A.getCallback((error) => {
        console.error('Fetch Error :-S', error);
        }));
        },
        // this function works for 'goto next page' when the game reach to the last question.
        goToNextPage: function (component, event, helper) {
                helper.allowLeaving();
                window.location.href = $A.get("$Label.c.Community_Url") + "/s/" + $A.get("$Label.c.url_dashboard");
        },
        goToMyResultsPage: function (component, event, helper) {
                helper.allowLeaving();
                window.location.href = $A.get("$Label.c.Community_Url") + "/s/" + $A.get("$Label.c.url_myresults");
        },
        closeModel: function (component, event, helper) {
                window.location.href = $A.get("$Label.c.Community_Url") + '/s/' + $A.get("$Label.c.url_dashboard");
        },

});