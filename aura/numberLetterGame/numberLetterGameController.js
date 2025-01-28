({

    myAction: function (component, event, helper) {


        var timeS = new Date().getTime();
        const url = new URL(window.location.href);
        // const resourceRelPath = $A.get("$Label.c.numberLetter_game_config_url")+'?test='+timeS;
        const resourceUrl = $A.get("$Label.c.Community_Url") + $A.get("$Label.c.numberLetter_game_config_url") + '?test=' + timeS;
        console.log('resourceUrl = ', resourceUrl);
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
                        var gameNameScientific = $A.get("$Label.c.scientific_game_letterNumberSequencing");
                        helper.gameDetails(component, event, helper, gameNameScientific);
                        var gameId;
                        var participantGameInfoId;
                        var ipAddress;
                        var browserName;
                        helper.getIpAddress(component, event, helper);
                        helper.printBrowser(component, event, helper);
                        //  var device = $A.get("$Browser.formFactor");
                        var device = helper.getDeviceType(component, event, helper);
                        var language = name['Language__c'];

                        // Gettin contact id from the current loggedin user.
                        let currentUserId = $A.get("$SObjectType.CurrentUser.Id");
                        helper.userDetails(component, event, helper, currentUserId);
                        var userContactId;

                        actionGame.setCallback(this, function (a) {
                            var state = a.getState();
                            if (state === "SUCCESS") {
                                var name = a.getReturnValue();
                                var language = name['Language__c'];

                                console.log('language second', language);

                                if (name['Letter_Number_Sequencing__c'] == 'Locked' && pageUrl[1] == $A.get("$Label.c.url_me_switchinggame")) {
                                    component.set('v.showConfirmDialog', true);
                                }
                                else if (name['Letter_Number_Sequencing__c'] == 'Completed' && pageUrl[1] == $A.get("$Label.c.url_me_switchinggame")) {
                                    component.set('v.showConfirmDialog', true);
                                }
                                // full game code is started from else part.===========================
                                else if (name['Letter_Number_Sequencing__c'] == 'Opened') {
                                    component.set('v.showConfirmDialog', false);
                                    helper.preventLeaving();
                                    document.documentElement.addEventListener('keydown', function (e) {
                                        if ((e.keycode || e.which) == 32) {
                                            e.preventDefault();
                                        }
                                    }, false);



                                    const urlParams = new URLSearchParams(document.location.search.substring(1));
                                    const cs = urlParams.get('cs');
                                    let currentScreent = 0;
                                    if (cs != null) {
                                        //console.log("cs1=", cs)
                                        currentScreent = Number(cs);
                                    }

                                    //-----------------numberLetter game-------------------------
                                    let resultData = {};
                                    //let currentScreent = 0;
                                    let intervalTime = null
                                    let timedata = new Date();
                                    let totalKeyStrokesInRound = 0;
                                    let result_time = 0;
                                    let command_value = 0;
                                    let clicked = false;
                                    let userInput = "";
                                    var screenHeight = window.screen.availHeight;
                                    var screenWidth = window.screen.availWidth;
                                    var gameName = $A.get("$Label.c.game_name_6");
                                    var gameTime = $A.get("$Label.c.numberLetterGame_time");
                                    let roundTotalTime = null;
                                    let roundStartTime = null;
                                    let endGameTrue = false;


                                    let bgimages = [];
                                    var imgContainer = document.getElementById('imgContainer');
                                    function preloadImage(imgdata) {

                                        for (var i = 0; i < imgdata.length; i++) {
                                            bgimages[i] = new Image();
                                            bgimages[i].src = imgdata[i];

                                            imgContainer.appendChild(bgimages[i]);
                                        }
                                    }

                                    let macTouch = getCookie('macTouch');
                                    var ua = window.navigator.userAgent;
                                    var iOS = !!ua.match(/Mac OS/i);
                                    // var isMac = ua.match(/Mac OS/i);
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
                                    function getCookie(name) {
                                        var cookieString = "; " + document.cookie;
                                        cookieString = cookieString.replace('LSKey-c$', '');
                                        var parts = cookieString.split("; " + name + "=");
                                        if (parts.length === 2) {
                                            return parts.pop().split(";").shift();
                                        }
                                        return null;
                                    }
                                    preloadImage([
                                        "../sfsites/c/resource/mindcrowd_style/images/odd_key.png?t=1",
                                        "../sfsites/c/resource/mindcrowd_style/images/even_key.png?t=1",
                                        "../sfsites/c/resource/mindcrowd_style/images/consonant_key.png?t=1",
                                        "../sfsites/c/resource/mindcrowd_style/images/vowel_key.png?t=1"
                                    ]
                                    )

                                    
                                    var numberLetterGame_text_4 = "";
                                    var numberLetterGame_text_12 = "";
                                    var numberLetterGame_text_15 = "";
                                    var numberLetterGame_text_22 = "";
                                    var numberLetterGame_text_26_a = "";
                                    var numberLetterGame_text_27 = "";
                                    var numberLetterGame_text_28 = "";
                                    var numberLetterGame_text_9 = "";

                                    if (!isKeyboad) {
                                            numberLetterGame_text_4 = $A.get("$Label.c.numberLetterGame_text_4_tap");
                                            numberLetterGame_text_12 = $A.get("$Label.c.numberLetterGame_text_12_tap");
                                            numberLetterGame_text_15 = $A.get("$Label.c.numberLetterGame_text_15_tap");
                                            numberLetterGame_text_22 = $A.get("$Label.c.numberLetterGame_text_22_tap");
                                            numberLetterGame_text_26_a = $A.get("$Label.c.numberLetterGame_text_26_a_tap");
                                            numberLetterGame_text_27 = $A.get("$Label.c.numberLetterGame_text_27_tap");
                                            numberLetterGame_text_28 = $A.get("$Label.c.numberLetterGame_text_28_tap");
                                            numberLetterGame_text_9 = $A.get("$Label.c.numberLetterGame_text_9_tap");
                                    } else {
                                            numberLetterGame_text_4 = $A.get("$Label.c.numberLetterGame_text_4");
                                            numberLetterGame_text_12 = $A.get("$Label.c.numberLetterGame_text_12");
                                            numberLetterGame_text_15 = $A.get("$Label.c.numberLetterGame_text_15");
                                            numberLetterGame_text_22 = $A.get("$Label.c.numberLetterGame_text_22");
                                            numberLetterGame_text_26_a = $A.get("$Label.c.numberLetterGame_text_26_a");
                                            numberLetterGame_text_27 = $A.get("$Label.c.numberLetterGame_text_27");
                                            numberLetterGame_text_28 = $A.get("$Label.c.numberLetterGame_text_28");
                                            numberLetterGame_text_9 = $A.get("$Label.c.numberLetterGame_text_9");
                                    }

                                    configdata  = configdata.map(obj => {	
                                        obj.content = obj.content.replace('numberLetterGame_text_4', numberLetterGame_text_4);
                                        obj.content = obj.content.replace('numberLetterGame_text_12', numberLetterGame_text_12);
                                        obj.content = obj.content.replace('numberLetterGame_text_15', numberLetterGame_text_15);
                                        obj.content = obj.content.replace('numberLetterGame_text_22', numberLetterGame_text_22);
                                        obj.content = obj.content.replace('numberLetterGame_text_26_a', numberLetterGame_text_26_a); 
                                        obj.content = obj.content.replace('numberLetterGame_text_27', numberLetterGame_text_27); 
                                        obj.content = obj.content.replace('numberLetterGame_text_28', numberLetterGame_text_28);
                                        obj.content = obj.content.replace('numberLetterGame_text_9', numberLetterGame_text_9);
                                        return obj;
                                  });

                                  //console.log('New configdata: '+JSON.stringify(configdata));



                                    // window
                                    //     .matchMedia('(orientation: portrait)')
                                    //     .addListener(function (m) {
                                    //         if (m.matches) {
                                    //         } else {
                                    //         }
                                    //         let documentHeight = window.innerHeight - 110;
                                    //         let mainContentInnerHeight = document.querySelectorAll(".main-content-inner");
                                    //         if (typeof (mainContentInnerHeight) != 'undefined' && mainContentInnerHeight != null) {
                                    //             mainContentInnerHeight.forEach((e) => {
                                    //                 if(documentHeight < 420){
                                    //                     e.setAttribute("style", "min-height:420px");
                                    //                 }else{
                                    //                     e.setAttribute("style", "min-height:" + documentHeight + 'px');
                                    //                 }
                                                    
                                    //             });
                                    //         }

                                    //     });


                                    //Configuration of data parts.
                                    // console.log('config Data = ', configdata); 
                                    //console.log(configData);

                                    function saveData(gameName, questionNumber, userInput, isCorrect, reactionTime, isPracticeQuestion, correctAnswer, round) {
                                        if (currentScreent < 88) {
                                            if (!(userInput == 'j' || userInput == 'k' || userInput == 'J' || userInput == 'K')) {
                                                userInput = "No Response";
                                            }
                                        } else if (currentScreent < 175) {
                                            if (!(userInput == 'd' || userInput == 'f' || userInput == 'D' || userInput == 'F')) {
                                                userInput = "No Response";
                                            }
                                        } else {
                                            if (!(userInput == 'j' || userInput == 'f' || userInput == 'J' || userInput == 'F' ||
                                                userInput == 'd' || userInput == 'k' || userInput == 'D' || userInput == 'K')) {
                                                userInput = "No Response";
                                            }
                                        }
                                        helper.recorData(component, event, helper, userContactId, gameId, questionNumber, userInput, isCorrect, reactionTime, isPracticeQuestion, correctAnswer, participantGameInfoId, round);
                                        //questionNumber

                                        //console.log("Input Results", gameName, questionNumber, userInput, isCorrect, reactionTime, isPracticeQuestion,correctAnswer,correctAnswer,participantGameInfoId,round);

                                    }

                                    //This startGame function get the gameid and create a participantGameInfo record and return record ID.
                                    // function updateGameNameInParticipantGameInfo(gameId,participantGameInfoId,ipAddress,browserName,device){
                                    //     helper.gameNameInParticipantGameInfo(component,event,helper,userContactId,gameId,participantGameInfoId,ipAddress,browserName,device);//helper method calling here
                                    // }

                                    // This ensgame function works for the update participant gameInfo record like as end date time.
                                    function endGame(gameId, participantGameInfoId) {
                                        var endDateTime = new Date();
                                        var gamePlayStatus = "Completed";
                                        var screenResolution = { "height": screenHeight, "width": screenWidth };
                                        helper.participantGameInfoUpdate(component, event, helper, userContactId, language, gameId, endDateTime, gamePlayStatus, participantGameInfoId, screenResolution);//helper method calling here.

                                    }


                                    function changeScreen() {

                                        gameId = component.get("v.myAttribute");
                                        userContactId = component.get("v.mycontactId");
                                        ipAddress = component.get("v.ipAddress");
                                        browserName = component.get("v.browser");
                                        participantGameInfoId = component.get("v.participantGameid");//participantGameInfoId holds the participantgameinfo record id.
                                        timedata = new Date();
                                        document.getElementById("datablock_numberLetterGame").innerHTML = configdata[currentScreent].content;

                                        // let documentHeight = window.innerHeight - 110;
                                        //     let mainContentInnerHeight = document.querySelectorAll(".main-content-inner");
                                        //     if (typeof (mainContentInnerHeight) != 'undefined' && mainContentInnerHeight != null) {
                                        //         mainContentInnerHeight.forEach((e) => {
                                        //             if(documentHeight < 420){
                                        //                 e.setAttribute("style", "min-height:420px");
                                        //             }else{
                                        //                 e.setAttribute("style", "min-height:" + documentHeight + 'px');
                                        //             }
                                                    
                                        //         });
                                        //     }



                                        if (configdata[currentScreent].endGameTrue == true) {
                                            document.getElementById("nextBtton").classList.remove("slds-hide");
                                        }
                                        if (!isKeyboad) {
                                            document.getElementById("gameMainContent").removeEventListener('click', gotoNextScreen, false);
                                            if (configdata[currentScreent].hasOwnProperty('isTouch')) {
                                                document.getElementById("gameMainContent").addEventListener('click', gotoNextScreen, false);
                                            }
                                        }
                                        //console.log('currentScreent : ',configdata[currentScreent].screen);
                                        //end changes for touch goto  function  gotoNextScreen

                                        let uletterinputbtn = document.querySelectorAll(".numberLetterInput");
                                        if (typeof (uletterinputbtn) != 'undefined' && uletterinputbtn != null) {
                                            uletterinputbtn.forEach((e) => {
                                                e.addEventListener('click', letterEventQuery, false);
                                            });
                                        }
                                        if (configdata[currentScreent].instructionsLeft == true) {
                                            document.getElementById("gameMainContent").classList.add("instructionsLeft");
                                        }
                                        else {
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
                                                    "userInput": userInput,
                                                    "correctAnswer": configdata[currentScreent - 1].correctAnswer,
                                                    "round": configdata[currentScreent - 1].round
                                                }
                                                //Save Output Events
                                                saveData(
                                                    "NumberLetter",
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
                                        // this is finding totalTimeForRound as per screenwise.
                                        if (configdata[currentScreent].screen == '-1' || configdata[currentScreent].screen == '24' || configdata[currentScreent].screen == '89'
                                            || configdata[currentScreent].screen == '112' || configdata[currentScreent].screen == '177' || configdata[currentScreent].screen == '203') {
                                            roundStartTime = timedata;
                                            totalKeyStrokesInRound = 0;
                                        }
                                        if (configdata[currentScreent].screen == '23' || configdata[currentScreent].screen == '88' || configdata[currentScreent].screen == '111'
                                            || configdata[currentScreent].screen == '176' || configdata[currentScreent].screen == '202' || configdata[currentScreent].screen == '460') {
                                            roundTotalTime = timedata - roundStartTime;
                                            if (configdata[currentScreent].screen == '23') {
                                                let totalTimeForRound = roundTotalTime;
                                                console.log('Time'+totalTimeForRound);
                                                helper.participantGameInfoUpdateTotalTimeRoundOne(component, event, helper, userContactId, gameId, participantGameInfoId, totalTimeForRound, totalKeyStrokesInRound, configdata[currentScreent].screen);
                                            }
                                            else if (configdata[currentScreent].screen == '88') {
                                                let totalTimeForRound = roundTotalTime;
                                                console.log('Time'+totalTimeForRound);
                                                console.log('Real R1'+totalKeyStrokesInRound);
                                                helper.participantGameInfoUpdateTotalTimeRoundOne(component, event, helper, userContactId, gameId, participantGameInfoId, totalTimeForRound, totalKeyStrokesInRound, configdata[currentScreent].screen);
                                            }
                                            else if (configdata[currentScreent].screen == '111') {
                                                let totalTimeForRound = roundTotalTime;
                                                helper.participantGameInfoUpdateTotalTimeRoundOne(component, event, helper, userContactId, gameId, participantGameInfoId, totalTimeForRound, totalKeyStrokesInRound, configdata[currentScreent].screen);
                                            }
                                            else if (configdata[currentScreent].screen == '176') {
                                                let totalTimeForRound = roundTotalTime;
                                                console.log('Real R2'+totalKeyStrokesInRound);
                                                helper.participantGameInfoUpdateTotalTimeRoundOne(component, event, helper, userContactId, gameId, participantGameInfoId, totalTimeForRound, totalKeyStrokesInRound, configdata[currentScreent].screen);
                                            }
                                            else if (configdata[currentScreent].screen == '202') {
                                                let totalTimeForRound = roundTotalTime;
                                                helper.participantGameInfoUpdateTotalTimeRoundOne(component, event, helper, userContactId, gameId, participantGameInfoId, totalTimeForRound, totalKeyStrokesInRound, configdata[currentScreent].screen);
                                            }
                                            else if (configdata[currentScreent].screen == '460') {
                                                let totalTimeForRoundOne = roundTotalTime;
                                                helper.participantGameInfoUpdateTotalTimeRoundOne(component, event, helper, userContactId, gameId, participantGameInfoId, totalTimeForRoundOne, totalKeyStrokesInRound, configdata[currentScreent].screen);
                                            }
                                        }
                                        //creating participant game info record.
                                        if (currentScreent == 1) {
                                            var startDateTime = new Date();
                                            var gamePlayStatus = "Not-Completed";
                                            var screenResolution = { "height": screenHeight, "width": screenWidth };

                                            //console.log('checking...',userContactId,gameId,startDateTime,gamePlayStatus,ipAddress,browserName,device);
                                            helper.participantGameInfo(component, event, helper, userContactId, language, gameId, startDateTime, gamePlayStatus, ipAddress, browserName, device, screenResolution);
                                            //component,event,helper,
                                        }
                                        else {
                                            //console.log('screens are changing');
                                        }


                                        //     if(currentScreent==3){
                                        //        updateGameNameInParticipantGameInfo(gameId,participantGameInfoId,ipAddress,browserName,device);
                                        //     }

                                        // end game function is updating the record of participant gameInfo like endDateTime.
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

                                        //Event Control System
                                        window.addEventListener('keyup', gamePlay, false);
                                        clicked = false;
                                        userInput = "";
                                    }

                                    //Inisilize the page processing
                                    changeScreen();


                                    function gamePlay(e) {

                                        command_value = e.keyCode;//Changed this from "Which" to "KeyCode" 
    									if ((configdata[currentScreent].screen >4 && configdata[currentScreent].screen <=23) ||
    										(configdata[currentScreent].screen >25 && configdata[currentScreent].screen <=88) ||
    										(configdata[currentScreent].screen >92 && configdata[currentScreent].screen <=111) ||
    										(configdata[currentScreent].screen >113 && configdata[currentScreent].screen <=176) ||
    										(configdata[currentScreent].screen >179 && configdata[currentScreent].screen <=202) ||
    										(configdata[currentScreent].screen >204 && configdata[currentScreent].screen <=331) ||
                                       		(configdata[currentScreent].screen >334 && configdata[currentScreent].screen <=460)){
    											totalKeyStrokesInRound = totalKeyStrokesInRound + 1;
										}
    									
                                        userInput = e.key;
                                        let startDurations = configdata[currentScreent - 1].startDuration;
                                        let endDurations = configdata[currentScreent - 1].endDuration;
                                        let isResult = configdata[currentScreent - 1].hasOwnProperty("result") ? true : false;
                                        if (startDurations == -1) {
                                            if (command_value >= configdata[currentScreent - 1].command[0] && command_value <= configdata[currentScreent - 1].command[1]) {

                                                clearInterval(intervalTime);
                                                changeScreen();
                                            }
                                        }
                                        else if (startDurations > 0) {

                                            result_time = new Date() - timedata;
                                            if (result_time < startDurations) return false;
                                            if (clicked == true) return false;


                                            if (isResult) {
                                                if (configdata[currentScreent - 1].hasOwnProperty("allowKey")) {
                                                    if (userInput.match(new RegExp(configdata[currentScreent - 1].allowKey, 'gi')) && userInput.length <= 1) {
                                                        //console.log('inputvalue9=---', userInput);
                                                    }
                                                    else {
                                                        return false;
                                                    }
                                                }
                                            }





                                            //Result Calculation
                                            if (isResult) {
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
                                            }
                                            if (result_time >= startDurations) {
                                                if (configdata[currentScreent - 1].hasOwnProperty("command")) {
                                                    //Real Game Score Input
                                                    if (configdata[currentScreent - 1].isPractice == false) {
                                                        //Block Continues press
                                                        clicked = true;
                                                        window.removeEventListener('keyup', function (e) { });
                                                        document.getElementById("d_title").innerHTML = "Result";
                                                        document.getElementById("d_txt").innerHTML = result_time + " ms";
                                                        if (isResult) {
                                                            resultData[configdata[currentScreent - 1].screen]["status"] = (userInput.toLowerCase() == configdata[currentScreent - 1].correctAnswer) ? "true" : "false";
                                                            document.getElementById("d_status").innerHTML = resultData[configdata[currentScreent - 1].screen]["status"];
                                                            //Save Output Events
                                                            saveData(
                                                                "NumberLetter",
                                                                resultData[configdata[currentScreent - 1].screen]["question"],
                                                                resultData[configdata[currentScreent - 1].screen]["userInput"],
                                                                resultData[configdata[currentScreent - 1].screen]["status"],
                                                                resultData[configdata[currentScreent - 1].screen]["duration"],
                                                                resultData[configdata[currentScreent - 1].screen]["isPractice"],
                                                                resultData[configdata[currentScreent - 1].screen]["correctAnswer"],
                                                                resultData[configdata[currentScreent - 1].screen]["round"]
                                                            );
                                                        }
                                                        setTimeout(clearResult, 1500);
                                                        //Reset Screent Interval
                                                        clearInterval(intervalTime);
                                                        //Next Screen Show
                                                        changeScreen();
                                                    } else {
                                                        //Practice Game 
                                                        if (command_value >= configdata[currentScreent - 1].command[0] && command_value <= configdata[currentScreent - 1].command[1]) {
                                                            //Block Continues press
                                                            clicked = true;
                                                            window.removeEventListener('keyup', function (e) { });

                                                            document.getElementById("d_title").innerHTML = "Result";
                                                            document.getElementById("d_txt").innerHTML = result_time + " ms";

                                                            if (isResult) {
                                                                document.getElementById("d_status").innerHTML = "true";
                                                                resultData[configdata[currentScreent - 1].screen]["status"] = "true";
                                                                //Save Output Events
                                                                saveData(
                                                                    "NumberLetter",
                                                                    resultData[configdata[currentScreent - 1].screen]["question"],
                                                                    resultData[configdata[currentScreent - 1].screen]["userInput"],
                                                                    resultData[configdata[currentScreent - 1].screen]["status"],
                                                                    resultData[configdata[currentScreent - 1].screen]["duration"],
                                                                    resultData[configdata[currentScreent - 1].screen]["isPractice"],
                                                                    resultData[configdata[currentScreent - 1].screen]["correctAnswer"],
                                                                    resultData[configdata[currentScreent - 1].screen]["round"]
                                                                );
                                                            }

                                                            setTimeout(clearResult, 1500);

                                                            //Reset Screent Interval
                                                            clearInterval(intervalTime);
                                                            //Next Screen Show
                                                            // changeScreen();
                                                            if (configdata[currentScreent - 1].isPractice == true) {
                                                                document.getElementById("errormsg_numberLetterGame").innerHTML = (configdata[currentScreent - 1].correctAnswer == "1" || configdata[currentScreent - 1].correctAnswer == "2") ? $A.get("$Label.c.numberLetterGame_text_correct") : $A.get("$Label.c.numberLetterGame_text_correct");
                                                                setTimeout(() => { document.getElementById("errormsg_numberLetterGame").innerHTML = ""; }, 1000);
                                                                setTimeout(function () { changeScreen(); }, 1000);
                                                            } else {
                                                                if (command_value == configdata[currentScreent - 1].command[0] || command_value == configdata[currentScreent - 1].command[1]) {
                                                                    changeScreen();
                                                                }

                                                            }
                                                        } else {
                                                            // document.getElementById("errormsg_numberLetterGame").innerHTML = (configdata[currentScreent - 1].correctAnswer == "1" || configdata[currentScreent - 1].correctAnswer == "2") ? "Is this number even or odd?" : "Is this letter a vowel or a consonant?";
                                                            document.getElementById("errormsg_numberLetterGame").innerHTML = (configdata[currentScreent - 1].correctAnswer == "1" || configdata[currentScreent - 1].correctAnswer == "2") ? $A.get("$Label.c.numberLetterGame_text_incorrect") : $A.get("$Label.c.numberLetterGame_text_incorrect");
                                                            setTimeout(() => { document.getElementById("errormsg_numberLetterGame").innerHTML = ""; }, 1500);
                                                        }
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
                                    function letterEventQuery(e) {
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
                        })();
                    }));
            }))
            .catch($A.getCallback((error) => {
                console.error('Fetch Error :-S', error);
            }));
    },
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