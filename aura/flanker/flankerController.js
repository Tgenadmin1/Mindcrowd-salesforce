({
    myAction: function (component, event, helper) {


        var timeS = new Date().getTime();
        const url = new URL(window.location.href); 
        const resourceUrl = $A.get("$Label.c.Community_Url")+ $A.get("$Label.c.focus_game_config_url")+'?test='+timeS;
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
        var gameNameScientific = $A.get("$Label.c.scientific_game_flanker"); 
        helper.gameDetails(component, event, helper, gameNameScientific);
        var gameId;
        var participantGameInfoId;
        var ipAddress;
        var browserName;
        helper.getIpAddress(component, event, helper);
        helper.printBrowser(component, event, helper);
        var device = helper.getDeviceType(component, event, helper);
        // Gettin contact id from the current loggedin user.
        let currentUserId = $A.get("$SObjectType.CurrentUser.Id");
        helper.userDetails(component, event, helper, currentUserId);
        var userContactId;
        actionGame.setCallback(this, function (a) {
            var state = a.getState();
            if (state === "SUCCESS") {
                var name = a.getReturnValue();
                var language = name['Language__c'];
                if (name['Flanker__c'] == 'Locked' && pageUrl[1] == $A.get("$Label.c.url_me_flankergame")) {
                    component.set('v.showConfirmDialog', true);
                }
                else if (name['Flanker__c'] == 'Completed' && pageUrl[1] == $A.get("$Label.c.url_me_flankergame")) {
                    component.set('v.showConfirmDialog', true);
                }
                // full game code is started from else part.===========================
                else if (name['Flanker__c'] == 'Opened' && pageUrl[1] == $A.get("$Label.c.url_me_flankergame")) {
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
                        currentScreent = Number(cs);
                    }
                    let resultData = {};
                    let intervalTime = null;
                    let blockevents = 0;
                    let timedata = new Date();
                    let result_time = 0;
                    let command_value = 0;
                    let inputdata = "";
                    let lastdatatitle = "";
                    let image_path = $A.get("$Label.c.Community_Url") + "/resource/mindcrowdGameImages/flanker/";
                    let errormsg = null;
                    let errorarrow = null;
                    var gameName = $A.get("$Label.c.flanker_game_text_19");
                    var gameTime = '3 ';
                    let roundTotalTime = null;
                    let roundStartTime = null;
                    let totalKeyStrokesInRound = 0;
                    let macTouch = getCookie('macTouch');
                    var ua = window.navigator.userAgent;
                    var iOS = !!ua.match(/Mac OS/i);
                    var screenHeight = window.screen.availHeight;
                    var screenWidth = window.screen.availWidth;
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
                    function getCookie(name) {
                        var cookieString = "; " + document.cookie;
                        cookieString = cookieString.replace('LSKey-c$', '');
                        var parts = cookieString.split("; " + name + "=");
                        if (parts.length === 2) {
                            return parts.pop().split(";").shift();
                        }
                        return null;
                    }
                    var flanker_game_text_4_a = "";
                    var flanker_game_text_4_b = "";
                    var flanker_game_text_7 = "";
                    var flanker_game_text_8 = "";
                    var flanker_game_text_13 = "";
                    var flanker_game_text_16 = "";
                    var flanker_game_text_16_a = "";
                    if (!isKeyboad) {
                        flanker_game_text_4_a = $A.get("$Label.c.flanker_game_text_4_a_tap");
                        flanker_game_text_4_b = $A.get("$Label.c.flanker_game_text_4_b_tap");
                        flanker_game_text_7 = $A.get("$Label.c.flanker_game_text_7_tap");
                        flanker_game_text_8 = $A.get("$Label.c.flanker_game_text_8_tap");
                        flanker_game_text_13 = $A.get("$Label.c.flanker_game_text_13_tap");
                        flanker_game_text_16 = $A.get("$Label.c.flanker_game_text_16_tap");
                        flanker_game_text_16_a = $A.get("$Label.c.flanker_game_text_16_a_tap");
                    } else {
                        flanker_game_text_4_a = $A.get("$Label.c.flanker_game_text_4_a");
                        flanker_game_text_4_b = $A.get("$Label.c.flanker_game_text_4_b");
                        flanker_game_text_7 = $A.get("$Label.c.flanker_game_text_7");
                        flanker_game_text_8 = $A.get("$Label.c.flanker_game_text_8");
                        flanker_game_text_13 = $A.get("$Label.c.flanker_game_text_13");
                        flanker_game_text_16 = $A.get("$Label.c.flanker_game_text_16");
                        flanker_game_text_16_a = $A.get("$Label.c.flanker_game_text_16_a");
                    }

                    configdata =configdata.map(obj => {	
                        obj.content = obj.content.replace('flanker_game_text_4_a', flanker_game_text_4_a);
                        obj.content = obj.content.replace('flanker_game_text_4_b', flanker_game_text_4_b);
                        obj.content = obj.content.replace('flanker_game_text_7', flanker_game_text_7);
                        obj.content = obj.content.replace('flanker_game_text_8', flanker_game_text_8);
                        obj.content = obj.content.replace('flanker_game_text_13', flanker_game_text_13); 
                        obj.content = obj.content.replace('flanker_game_text_16', flanker_game_text_16); 
                        obj.content = obj.content.replace('flanker_game_text_16_a', flanker_game_text_16_a); 
                        return obj;
                  });
                  //console.log('New configdata: '+JSON.stringify(configdata));

                    let bgimages = [];
                    var imgContainer = document.getElementById('imgContainer');
                    function preloadImage(imgdata) {
                        for (var i = 0; i < imgdata.length; i++) {
                            bgimages[i] = new Image();
                            bgimages[i].src = '../s/sfsites/c/resource/mindcrowdGameImages/flanker/' + imgdata[i];
                            imgContainer.appendChild(bgimages[i]);
                        }
                    }
                    //Loading Game related Images.
                    preloadImage([
                        "bl.svg",
                        "br.svg",
                        "rl.svg",
                        "rr.svg",
                        "star.svg",
                        "rr.gif",
                        "rl.gif",
                        "gr.svg",
                        "gl.svg"

                    ]
                    )
                /*Commenting this code as business doesn't want randomization-TSS-5-Flanker Game Change Set-01FEB2022-Sibi
                //ConfigData is Suffling by the given code.
                    const myConfigDataUpdateOne=[];
                    for(let i=15; i<configdata.length; i++){
                        if(configdata[i].question){
                            myConfigDataUpdateOne.push(configdata[i]);
                        }
                    }
                    for(let i=0; i<myConfigDataUpdateOne.length; i++){
                        let j = Math.floor(Math.random() * (i+1));
                        let temp = myConfigDataUpdateOne[i];
                        myConfigDataUpdateOne[i] = myConfigDataUpdateOne[j];
                        myConfigDataUpdateOne[j] = temp;
                    }
                    const myConfigDataUpdateTwo=[];
                    for(let i=0; i<myConfigDataUpdateOne.length;i++){
                        myConfigDataUpdateOne[i].question=i+1;
                        myConfigDataUpdateTwo.push(myConfigDataUpdateOne[i]);
                        if(myConfigDataUpdateOne.length-i>1){
                            myConfigDataUpdateTwo.push({
                                screen: "999", startDuration: 0, endDuration: 1000, content: '<p class="centers "></p>' +
                                    '<div class="arrowdt"><div class="starbox staricon"></div></div>' +
                                    '<div class="btninputbox"><ul class="btninputbx">' +
                                    '<li><div class="btninput img-f tabButtons slds-hide" data-input="f" data-key="70">F</div></li>' +
                                    '<li><div class="btninput img-j tabButtons slds-hide" data-input="j" data-key="74">J</div></li>' +
                                    '</ul></div>', command: [32, 32]
                            });
                        }
                        else if(myConfigDataUpdateOne.length-i==1 && language=='English')
                        {
                            myConfigDataUpdateTwo.push({
                                "screen": "165",
                                "startDuration": 0,
                                "endDuration": 9999920000,
                                "content": "<div class=\"title\">Thank you for playing <span> Focus</span> </div><div class=\"title\">Your results have been recorded.</div><div class=\"title\">Click or tap the <span>My Results </span> button below to view your results.</div><div class=\"title\">Or, click or tap the <span>My Games </span> button below to return to the menu of games.</div>",
                                "instructionsLeft": true
                                    });
                        } 
                        else if(myConfigDataUpdateOne.length-i==1 && language=='Español')
                        {
                            myConfigDataUpdateTwo.push({
                                "screen": "165",
                                "startDuration": 0,
                                "endDuration": 9999920000,
                                "content": "<div class=\"title\">Gracias por tomar el Test de <span> Concentración</span> </div><div class=\"title\">Tus respuestas han sido grabadas.</div><div class=\"title\">Haz clic o toca el botón<span> Mis Resultados</span> para ver tus resultados.</div><div class=\"title\">O bien, haz clic o toca el botón <span> Mis Juegos </span> para regresar al menú de juegos.</div>",
                                "instructionsLeft": true
                                    });
                        } 
                    }
                    //console.log('myConfigDataUpdateTwo:',myConfigDataUpdateTwo);
                    Array.prototype.splice.apply(configdata, [15, myConfigDataUpdateTwo.length].concat(myConfigDataUpdateTwo));
                    //console.log('configdataSunil:',configdata);
                //ConfigData suffling is Ended here. 
                End - Commenting this code as business doesn't want randomization-01FEB2022-Sibi*/
                    //This saveData function is used for creating record in ParticipantGameresponse object.
                    function saveData(gameName, questionNumber, response, isCorrect, reactionTime, isPracticeQuestion, correctAnswer, round) {    
                        if(!(response == 'j' || response == 'f'|| response == 'J' || response == 'F')){
                            response  = "No Response";
                        }
                        helper.recorData(component, event, helper, userContactId, gameId, questionNumber, response, isCorrect, reactionTime, isPracticeQuestion, correctAnswer, participantGameInfoId, round);
                        console.log("Input Results", gameName, questionNumber, response, isCorrect, reactionTime, isPracticeQuestion, round);
                    }
                    // This ensgame function works for the update participant gameInfo record like as end date time.
                    function endGame(gameId, participantGameInfoId) {
                        var endDateTime = new Date();
                        var gamePlayStatus = "Completed";
                        var screenResolution = {"height" :screenHeight, "width" :screenWidth };
                        helper.participantGameInfoUpdate(component, event, helper, userContactId,language, gameId, endDateTime, gamePlayStatus, participantGameInfoId, screenResolution);//helper method calling here.
                    }
                    //this function works for initialize processing.
                    function changeScreen() {
                        gameId = component.get("v.myAttribute");
                        userContactId = component.get("v.mycontactId");
                        ipAddress = component.get("v.ipAddress");
                        browserName = component.get("v.browser");
                        participantGameInfoId = component.get("v.participantGameid");//participantGameInfoId holds the participantgameinfo record id.
                        timedata = new Date();
                        document.getElementById("datablock").innerHTML = configdata[currentScreent].content;
                        if (currentScreent == configdata.length-1) {
                            document.getElementById("nextBtton").classList.remove("slds-hide");
                            window.removeEventListener('keyup', gamePlay, false);
                        }
                        //Changes for touch
                        if (!isKeyboad) {
                            document.getElementById("touchEvent").removeEventListener('click', gotoNextScreen, false);
                            if (configdata[currentScreent].hasOwnProperty('isTouch')) {
                                document.getElementById("touchEvent").addEventListener('click', gotoNextScreen, false);
                            }
                            let tabButtons = document.querySelectorAll(".tabButtons");
                            if (tabButtons != 'undefined' && tabButtons != null) {
                                tabButtons.forEach((e) => {
                                    e.classList.remove("slds-hide");
                                    e.addEventListener('click', flankerEventQuery, false);
                                });
                            }
                        }
                        //end changes for touch goto  function  gotoNextScreen
                        let uflankerinputbtn = document.querySelectorAll(".flankerInput");
                        if (typeof (uflankerinputbtn) != 'undefined' && uflankerinputbtn != null) {
                            uflankerinputbtn.forEach((e) => {
                                e.addEventListener('click', flankerEventQuery, false);
                            });
                        }
                        if (configdata[currentScreent].instructionsLeft == true) {
                            document.getElementById("gameMainContent").classList.add("instructionsLeft");
                        } else {
                            document.getElementById("gameMainContent").classList.remove("instructionsLeft");
                        }
                        errormsg = document.getElementById("resulttxt");
                        if (typeof (errormsg) != 'undefined' && errormsg != null) { } else { errormsg = null; }
                        errorarrow = document.getElementById("centericon");
                        if (typeof (errorarrow) != 'undefined' && errorarrow != null) { } else { errorarrow = null; }
                        if (currentScreent > 0) {
                            let isResult = configdata[currentScreent - 1].hasOwnProperty("result") ? true : false;
                            let lastdata = lastdatatitle
                            if (lastdata.length <= 0 && isResult == true) {
                                //Result Data
                                resultData[configdata[currentScreent - 1].screen] = {
                                    "duration": configdata[currentScreent - 1].endDuration,
                                    "status": "false",
                                    "data": inputdata,
                                    "question": configdata[currentScreent - 1].question,
                                    "isPractice": configdata[currentScreent - 1].isPractice,
                                    "correctAnswer": configdata[currentScreent - 1].answer,
                                    "round": configdata[currentScreent - 1].round
                                };
                                lastdatatitle = "Result";
                                //Save Output Events
                                let currentgamedata = resultData[configdata[currentScreent - 1].screen];
                                saveData(
                                    "FLUNKER",
                                    currentgamedata.question,
                                    currentgamedata.data,
                                    currentgamedata.status,
                                    currentgamedata.duration,
                                    currentgamedata.isPractice,
                                    currentgamedata.correctAnswer,
                                    currentgamedata.round
                                );
                                setTimeout(clearResult, 1000);
                            }
                        }
                        if (currentScreent == '0' || currentScreent == '14') {
                            roundStartTime = timedata;
                            totalKeyStrokesInRound = 0;
                        }
                        if (currentScreent == '13' || currentScreent == '114') {
                            roundTotalTime = timedata - roundStartTime;
                            if (currentScreent == '13') {
                                let totalTimeForRoundZero = roundTotalTime;
                                //console.log('Hi i am in screenZero1',configdata[currentScreent].screen,totalTimeForRoundZero,totalKeyStrokesInRound);
                                helper.participantGameInfoUpdateTotalTimeRoundOne(component, event, helper, userContactId, gameId, participantGameInfoId, totalTimeForRoundZero, totalKeyStrokesInRound, currentScreent);
                            }
                            else if (currentScreent == '114') {
                                let totalTimeForRoundOne = roundTotalTime;
                                //console.log('Hi i am in screenOne',configdata[currentScreent].screen,totalTimeForRoundOne,totalKeyStrokesInRound);
                                helper.participantGameInfoUpdateTotalTimeRoundOne(component, event, helper, userContactId, gameId, participantGameInfoId, totalTimeForRoundOne, totalKeyStrokesInRound, currentScreent);
                            }
                        }
                        //creating participant game info record.
                        if (currentScreent == 1 ) {
                            var startDateTime = new Date();
                            var gamePlayStatus = "Not-Completed";
                            var screenResolution = {"height" :screenHeight, "width" :screenWidth };
                            helper.participantGameInfo(component, event, helper, userContactId,language, gameId, startDateTime, gamePlayStatus, ipAddress, browserName, device, screenResolution);
                        }
                        // end game function is updating the record of participant gameInfo like endDateTime.
                        if ((configdata.length - 1) == currentScreent) {
                            endGame(gameId, participantGameInfoId);
                            clearInterval(intervalTime);
                            return false;
                        }
                        //Change New Screen Default
                        if ((configdata.length - 1) > currentScreent) {
                            if (configdata[currentScreent].endDuration != 0)
                                intervalTime = setTimeout(changeScreen, configdata[currentScreent].endDuration);

                            currentScreent = currentScreent + 1;
                        } else {
                            clearInterval(intervalTime);
                        }
                        inputdata = "";
                    }
                    //Event Control System
                    window.addEventListener('keyup', gamePlay, false);
                    function resetError(msgstatus = 1) {
                        document.getElementById("errorblock").style = (msgstatus == 1) ? "display:none" : "display:inline";
                        document.getElementById("datablock").style = (msgstatus == 1) ? "display:inline" : "display:none";
                    }
                    //Inisilize the page processing
                    changeScreen();
                    const delayprocess = ms => new Promise(res => setTimeout(res, ms));
                    function gamePlay(e) {
                        command_value = e.keyCode;
                        inputdata = e.key;
                        totalKeyStrokesInRound = totalKeyStrokesInRound + 1;
                        let startDurations = configdata[currentScreent - 1].startDuration;
                        //Press spacific key command
                        if (startDurations == -1) {
                            if (configdata[currentScreent - 1].hasOwnProperty("command") && command_value >= configdata[currentScreent - 1].command[0] && command_value <= configdata[currentScreent - 1].command[1]) {
                                clearInterval(intervalTime);
                                changeScreen();
                            }
                        } else if (startDurations == 0) {
                        }
                        // In between process to go executed
                        else if (startDurations > 0) {
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
                                        "round": configdata[currentScreent - 1].round
                                    };
                                }
                            }
                            if (result_time >= startDurations) {
                                if (configdata[currentScreent - 1].hasOwnProperty("command")) {
                                     if (command_value == configdata[currentScreent - 1].command[0] || command_value == configdata[currentScreent - 1].command[1]) {
                                        //Result Calculation
                                        if (isResult) {
                                            if (inputdata.toLowerCase() == configdata[currentScreent - 1].answer) {
                                                resultData[configdata[currentScreent - 1].screen]["status"] = "true";
                                            } else {
                                                resultData[configdata[currentScreent - 1].screen]["status"] = "false";
                                            }
                                            if (configdata[currentScreent - 1].isPractice == true) {
                                                if (resultData[configdata[currentScreent - 1].screen]["status"] == "false") {
                                                    errorarrow.classList.remove("ok");
                                                    errorarrow.classList.remove("fail");
                                                    errorarrow.classList.add("fail");
                                                    errormsg.innerHTML = $A.get("$Label.c.flanker_errorText");
                                                    blockKeyEvent();
                                                    return false;
                                                } else {
                                                    errorarrow.classList.remove("ok");
                                                    errorarrow.classList.remove("fail");
                                                    errorarrow.classList.add("ok");
                                                    errormsg.innerHTML = $A.get("$Label.c.flanker_correctText");
                                                    delayprocess(1500);
                                                }
                                            }
                                            resultData[configdata[currentScreent - 1].screen]["data"] = inputdata;
                                            resultData[configdata[currentScreent - 1].screen]["duration"] = result_time;
                                            lastdatatitle = "Result";
                                            //Save Output Events
                                            let currentgamedata = resultData[configdata[currentScreent - 1].screen];
                                            saveData(
                                                "FLUNKER",
                                                currentgamedata.question,
                                                currentgamedata.data,
                                                currentgamedata.status,
                                                currentgamedata.duration,
                                                currentgamedata.isPractice,
                                                currentgamedata.correctAnswer,
                                                currentgamedata.round
                                            );
                                        }
                                        //Clear Results
                                        setTimeout(clearResult, 1500);
                                        // Raj: TM-247 updated this for showing correct ans text with green color
                                        // changeScreen();
                                        if (configdata[currentScreent - 1].isPractice == true && errormsg.innerHTML == $A.get("$Label.c.flanker_correctText")) {
                                            let tabButtons = document.querySelectorAll(".tabButtons");
                                            if (tabButtons != 'undefined' && tabButtons != null) {
                                                tabButtons.forEach((e) => {
                                                    e.removeEventListener('click', flankerEventQuery, false);
                                                });
                                            }
                                            setTimeout(function () { clearInterval(intervalTime); changeScreen(); }, 1200);
                                        } else {
                                            clearInterval(intervalTime);
                                            changeScreen();
                                        }
                                    }
                                }
                            }
                        }
                    }
                    function blockKeyEvent() {
                        clearInterval(blockevents);
                        window.removeEventListener('keyup', gamePlay, false);
                        blockevents = setTimeout(function () {
                            errorarrow.classList.remove("ok");
                            errorarrow.classList.remove("fail");
                            errormsg.innerHTML = "";
                            window.addEventListener('keyup', gamePlay, false);
                        }, 1500);
                    }
                    function successKeyEvent() {
                        clearInterval(blockevents);
                        window.removeEventListener('keyup', gamePlay, false);
                        blockevents = setTimeout(function () {
                            errorarrow.classList.remove("ok");
                            errorarrow.classList.remove("fail");
                            errormsg.innerHTML = "";
                            window.addEventListener('keyup', gamePlay, false);
                        }, 1500);
                    }
                    function clearResult() {
                        lastdatatitle = "";
                    }
                    //chnages for touch
                    function gotoNextScreen(e) {
                        gamePlay({ keyCode: 32 });
                    }
                    function flankerEventQuery(e) {
                        gamePlay({ key: e.currentTarget.getAttribute("data-input"), keyCode: e.currentTarget.getAttribute("data-key") });
                    }
                    //chnages for touch end
                }
                helper.ristrictAutoRun(component, event, helper);
            }
            else if (state === "ERROR") {
                let message = '';
                let errors = response.getError();
                if (errors && Array.isArray(errors) && errors.length > 0) {
                    message = errors[0].message;
                }
            }
            else {
                //console.log('else part');
            }
            $A.get('e.refreshView').fire();
        });
        $A.getCallback(function () {
            $A.enqueueAction(actionGame);
        })();
    }));
}))
.catch($A.getCallback((error) => {
    console.error('Fetch Error :-S', error);
}));
    },
    // this function works for 'goto next page' when the game reach to the last question.
    goToNextPage: function (component, event, helper) {
        const urlParams = new URLSearchParams(document.location.search.substring(1));
        const product = urlParams.get('c__id');
        helper.allowLeaving();
        window.location.href = $A.get("$Label.c.Community_Url") + "/s/" + $A.get("$Label.c.url_dashboard");
    },
    goToMyResultsPage: function (component, event, helper) {
        const urlParams = new URLSearchParams(document.location.search.substring(1));
        const product = urlParams.get('c__id');
        helper.allowLeaving();
        window.location.href = $A.get("$Label.c.Community_Url") + "/s/" + $A.get("$Label.c.url_myresults");
    },
    closeModel: function (component, event, helper) {
        window.location.href = $A.get("$Label.c.Community_Url") + '/s/' + $A.get("$Label.c.url_dashboard");
    }
})