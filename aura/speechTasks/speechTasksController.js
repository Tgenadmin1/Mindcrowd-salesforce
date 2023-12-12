({
    myAction: function (component, event, helper) {
        var timeS = new Date().getTime();
        const url = new URL(window.location.href); 
        const resourceUrl = $A.get("$Label.c.Community_Url")+ $A.get("$Label.c.speechTask_config_url")+'?test='+timeS;
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
        var gameNameScientific = $A.get("$Label.c.scientific_speech_tasks");    
        console.log(gameNameScientific);     
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
        console.log('currentUserId: '+currentUserId);
        helper.userDetails(component, event, helper, currentUserId);
        var userContactId;
        actionGame.setCallback(this, function (a) {
            var state = a.getState();
            if (state === "SUCCESS") {
                var name = a.getReturnValue();
                console.log('name: '+name);
                var language = name['Language__c'];
                if (name['Speech_Task__c'] == 'Locked' && pageUrl[1] == $A.get("$Label.c.url_me_speechTask")) {
                    component.set('v.showConfirmDialog', true);
                }
                else if (name['Speech_Task__c'] == 'Completed' && pageUrl[1] == $A.get("$Label.c.url_me_speechTask")) {
                    component.set('v.showConfirmDialog', true);
                }
                // full game code is started from else part.===========================
                else if (name['Speech_Task__c'] == 'Opened' && pageUrl[1] == $A.get("$Label.c.url_me_speechTask")) {
                    component.set('v.showConfirmDialog', false);
                    helper.preventLeaving();
                    document.documentElement.addEventListener('keydown', function (e) {
                        if ((e.keycode || e.which) == 32) {
                            e.preventDefault();
                        }
                    }, false);
                    const urlParams = new URLSearchParams(document.location.search.substring(1));
                    const cs = urlParams.get('cs');
                    console.log('urlParams: '+urlParams);
                    console.log('cs: '+urlParams);
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

                   /* let bgimages = [];
                    var imgContainer = document.getElementById('imgContainer');
                    function preloadImage(imgdata) {
                        for (var i = 0; i < imgdata.length; i++) {
                            console.log('inside preload image');
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
                    )*/
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
                        component.set('v.currScreen', currentScreent);
                        console.log('currentScreent: '+ currentScreent);
                        gameId = component.get("v.myAttribute");
                        userContactId = component.get("v.mycontactId");
                        ipAddress = component.get("v.ipAddress");
                        browserName = component.get("v.browser");
                        participantGameInfoId = component.get("v.participantGameid");//participantGameInfoId holds the participantgameinfo record id.
                        timedata = new Date();
                        //Showing the content from static resource. currentScreent is the key variable to know the screen 
                        document.getElementById("datablock").innerHTML = configdata[currentScreent].content;
                        let userenterbtn= document.getElementById("enterbtn");
                        if(typeof(userenterbtn) != 'undefined' && userenterbtn != null){                       
                             userenterbtn.removeEventListener('click',gamePlayEnter,false);
                             userenterbtn.addEventListener('click',gamePlayEnter,false);                          
                            
                        }
                        //if condition is checking whether the last screen is reached, then it will display My games/ My result buton
                        if (currentScreent == configdata.length-1) {
                            document.getElementById("nextBtton").classList.remove("slds-hide");
                            document.getElementById("nextBtton2").classList.add("slds-hide");
                            window.removeEventListener('keyup', gamePlay, false);
                        }
                        //Changes for touch
                        /*if (!isKeyboad) {
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
                        }*/
                        //end changes for touch goto  function  gotoNextScreen
                        /*let uflankerinputbtn = document.querySelectorAll(".flankerInput");                        
                        if (typeof (uflankerinputbtn) != 'undefined' && uflankerinputbtn != null) {                            
                            uflankerinputbtn.forEach((e) => {
                                console.log('uflankerinputbtn: '+JSON.stringify(uflankerinputbtn));
                                e.addEventListener('click', flankerEventQuery, false);
                            });
                        }*/
                        if (configdata[currentScreent].instructionsLeft == true) {
                            document.getElementById("gameMainContent").classList.add("instructionsLeft");
                        } else {
                            document.getElementById("gameMainContent").classList.remove("instructionsLeft");
                        }
                        /*errormsg = document.getElementById("resulttxt");
                        if (typeof (errormsg) != 'undefined' && errormsg != null) { } else { errormsg = null; }
                        errorarrow = document.getElementById("centericon");
                        if (typeof (errorarrow) != 'undefined' && errorarrow != null) { } else { errorarrow = null; }*/
                        /*if (currentScreent > 0) {
                            let isResult = configdata[currentScreent - 1].hasOwnProperty("result") ? true : false;
                            let lastdata = lastdatatitle;
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
                        }*/
                        /*if (currentScreent == '0' || currentScreent == '14') {
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
                        }*/
                        //creating participant game info record.  
                        if (currentScreent == 0 ) {                            
                            let nextBtton2 = document.getElementById('nextBtton2');
                            const checkbox = document.getElementById('checkbox-unique-id-83');
                            nextBtton2.classList.add("slds-hide");
                            //myInput.disabled = true;
                            console.log('inside currentScreent0');
                            checkbox.addEventListener('click', function() {                                             
                                if (checkbox.checked) {
                                    nextBtton2.classList.remove("slds-hide");
                                    // Perform actions when the checkbox is checked
                                } else {
                                    nextBtton2.classList.add("slds-hide");
                                    // Perform actions when the checkbox is unchecked
                                }
                            });   
                        }                     
                        if(currentScreent == 1 || currentScreent == 4 || currentScreent == 7){
                            document.getElementById("speechtask").classList.remove("slds-hide");   
                            if(currentScreent == 4 || currentScreent == 7){
                                document.getElementById("recordingindicator").classList.add("slds-hide");  
                                const recordingContainer = document.getElementById('recording');
                                const existingAudioElement = recordingContainer.querySelector('audio');
                                if (existingAudioElement) {
                                    // Remove the existing audio element
                                    recordingContainer.removeChild(existingAudioElement);                        
                                }
                                document.getElementById("timer").classList.remove("slds-hide");   
                            }
                        }
                       else{
                            document.getElementById("speechtask").classList.add("slds-hide");   
                        }
                        if (currentScreent == 2 ) {
                            var startDateTime = new Date();
                            var gamePlayStatus = "Not-Completed";
                            var screenResolution = {"height" :screenHeight, "width" :screenWidth };
                            helper.participantGameInfo(component, event, helper, userContactId,language, gameId, startDateTime, gamePlayStatus, ipAddress, browserName, device, screenResolution);
                            console.log('inside speech task html'); 
                            //document.getElementById("speechtask").classList.remove("slds-hide");                               
                            //doMicInit();   
                        }
                        // end game function is updating the record of participant gameInfo like endDateTime.
                        if ((configdata.length - 1) == currentScreent) {
                            helper.saveAudioToSalesforce(component,component.get("v.participantGameid"), component.get("v.speechTasks"));
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
                    //window.addEventListener('keyup', gamePlay, false);Sibi
                    /*function resetError(msgstatus = 1) {
                        document.getElementById("errorblock").style = (msgstatus == 1) ? "display:none" : "display:inline";
                        document.getElementById("datablock").style = (msgstatus == 1) ? "display:inline" : "display:none";
                    }*/
                    //Inisilize the page processing
                   changeScreen();
                   const delayprocess = ms => new Promise(res => setTimeout(res, ms));
                   function gamePlayEnter(){ 
                    //console.log("clicked enter button");
                    //console.log('test 1');
                        keybuttonEvent = true;
                        gamePlay({keyCode:13});                 
                    }                    
                    function gamePlay(e) {
                        command_value = e.keyCode;
                        inputdata = e.key;
                        totalKeyStrokesInRound = totalKeyStrokesInRound + 1;
                        let startDurations = configdata[currentScreent - 1].startDuration;
                        console.log('startDurations: '+ startDurations);
                        console.log('currentScreent-gameplay: '+ currentScreent);
                        //Press spacific key command
                        if (startDurations == -1) {
                            if (configdata[currentScreent - 1].hasOwnProperty("command") && command_value >= configdata[currentScreent - 1].command[0] && command_value <= configdata[currentScreent - 1].command[1]) {
                                clearInterval(intervalTime);
                                changeScreen();
                            }
                        } else if (startDurations == 0) {
                        }
                        else if (startDurations > 0) {
                            if (configdata[currentScreent - 1].hasOwnProperty("command") && command_value >= configdata[currentScreent - 1].command[0] && command_value <= configdata[currentScreent - 1].command[1]) {
                                clearInterval(intervalTime);
                                changeScreen();
                            }
                            console.log('currentScreent: '+currentScreent); 
                        }
                        // In between process to go executed
                        /*else if (startDurations > 0) {
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
                        }*/
                    }
                    function doMicInit() {
                    // Fetch available microphones and populate the microphones attribute
                    // Use browser APIs to fetch available microphones
                    console.log('OnInit');
                    navigator.mediaDevices.getUserMedia({ audio: true })
                    .then(stream => {
                        // User has granted permission, you can now access the microphone
                        // Use the stream to handle recording or other audio-related tasks

                        navigator.mediaDevices.enumerateDevices()
                        .then(devices => {
                            console.log('inside devices');
                            const microphones = devices.filter(device => device.kind === 'audioinput');
                            component.set("v.microphones", microphones);
                            const defaultMicrophone = microphones[0]; 
                            console.log(defaultMicrophone);
                            console.log(defaultMicrophone.deviceId);
                            component.find("microphoneSelect").set("v.value",defaultMicrophone.deviceId);
                            document.getElementById("speechtask").classList.remove("slds-hide");
                        })
                        .catch(error => {
                            console.error('Error fetching microphones:', error);
                        });
                    })
                    .catch(error => {
                        // User has denied permission or an error occurred
                        console.error('Error getting user media:', error);
                    });
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
                    /*function successKeyEvent() {
                        clearInterval(blockevents);
                        window.removeEventListener('keyup', gamePlay, false);
                        blockevents = setTimeout(function () {
                            errorarrow.classList.remove("ok");
                            errorarrow.classList.remove("fail");
                            errormsg.innerHTML = "";
                            window.addEventListener('keyup', gamePlay, false);
                        }, 1500);
                    }*/
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
    },

    onMicrophoneSelect: function(component, event, helper) {
        component.set("v.selectedMicrophone", event.getSource().get("v.value"));
    },

    startRecording: function(component, event, helper) {
        const recordingContainer = document.getElementById('recording');
            const existingAudioElement = recordingContainer.querySelector('audio');
            if (existingAudioElement) {
                // Remove the existing audio element
                recordingContainer.removeChild(existingAudioElement);                        
            }

        let startTime;
        let countdownId;
        let secondsRemaining = 10; // 4 minutes
        const timerDisplay = document.getElementById("timer");

        console.log('inside testMicrophone');
        component.set("v.isRecording", true);
        //component.set('v.speechTextspanish','');
        component.set('v.speechTexteng', '');
        //const microphoneId = component.find("microphoneSelect").get("v.value");
        //console.log(microphoneId);
        //navigator.mediaDevices.getUserMedia({ audio: { deviceId: { exact: microphoneId } } })
        /*navigator.mediaDevices.getUserMedia({ audio: true }) 
            .then(stream => {
              
                const mediaRecorder = new MediaRecorder(stream);
                const recordedChunks = [];

                mediaRecorder.ondataavailable = event => {
                    if (event.data.size > 0) {
                        console.log('inside on data available');
                        recordedChunks.push(event.data);
                    }
                };

                mediaRecorder.onstop = () => {
                    document.getElementById("recordingindicator").classList.add("slds-hide");                      
                    const audioBlob = new Blob(recordedChunks, { type: 'audio/wav' });
               
                    const audioUrl = URL.createObjectURL(audioBlob);        
                    component.set("v.recordedAudioUrl", audioUrl);
                    component.set("v.isRecording", false);
                    console.log('audioUrl:', audioUrl);

                    const audioElement = document.createElement('audio');
                    audioElement.controls = true;
                    audioElement.src = audioUrl;
                    const recordingContainer = document.getElementById('recording');
                    const existingAudioElement = recordingContainer.querySelector('audio');
                    if (existingAudioElement) {
                        // Remove the existing audio element
                        recordingContainer.removeChild(existingAudioElement);                        
                    }

                    document.getElementById('recording').appendChild(audioElement);                   

                    //recognition.stop();
                  
                    const reader = new FileReader();        
                    reader.onload = function(event) {
                        const base64Audio = event.target.result.split(',')[1];
                        let speechTasks =  component.get("v.speechTasks");
                        speechTasks.push(base64Audio);
                        component.set("v.speechTasks",speechTasks);
                        console.log('Speech task List: '+ component.get("v.speechTasks"));
                        //helper.saveAudioToSalesforce(component,component.get("v.participantGameid"), base64Audio);
                        //console.log('Blob Contents:', contents);
                    };                    
                    reader.onerror = function(event) {
                        console.error('Error reading Blob:', event.target.error);
                    };
                    
                    reader.readAsDataURL(audioBlob);
                };

                mediaRecorder.start();
                startTimer();
                document.getElementById("recordingindicator").classList.remove("slds-hide");   
                setTimeout(() => {
                    console.log('Stopping recording');
                    mediaRecorder.stop();   
                                              
                }, 10000); // Record for 10 seconds


            })
            .catch(error => {
                console.error('Error starting recording:', error);
                component.set("v.isRecording", false);
            });*/
            var RecordRTC = window.RecordRTC;
            /*console.log(RecordRTC);            
            navigator.mediaDevices.getUserMedia({ audio: true })
                .then(function (stream) {
                    let recorder = RecordRTC(stream, {
                        type: 'audio'
                    });
            
                    recorder.startRecording();
            
                    function sleep(m) {
                        return new Promise(function (resolve) {
                            setTimeout(resolve, m);
                        });
                    }
            
                    sleep(3000)
                        .then(function () {
                            recorder.stopRecording(function () {
                                let blob = recorder.getBlob();
                                //invokeSaveAsDialog(blob);
                            });
                        });
                });*/
                
                navigator.mediaDevices.getUserMedia({
                    audio: true
                }).then(function (stream) {
                    let recorder = RecordRTC(stream, {
                        type: 'audio'
                    });

                    // new code form here for recording visualizer
                    const audioContext = new AudioContext();
                    const source = audioContext.createMediaStreamSource(stream);
                    const analyser = audioContext.createAnalyser();
                    source.connect(analyser);
                
                    // Visualization Setup
                    const canvas = document.createElement('canvas');
                    canvas.width = 300;
                    canvas.height = 100;
                    document.body.appendChild(canvas);
                    const canvasCtx = canvas.getContext('2d');
                
                    // Styling
                    canvas.style.background = "#6a6797";
                
                    function draw() {
                        const bufferLength = analyser.frequencyBinCount;
                        const dataArray = new Uint8Array(bufferLength);
                        analyser.getByteTimeDomainData(dataArray);
                        canvasCtx.fillStyle = 'rgba(255, 255, 255, 0.3)';
                        canvasCtx.fillRect(0, 0, canvas.width, canvas.height);
                        canvasCtx.lineWidth = 2;
                        canvasCtx.strokeStyle = 'rgb(255, 255, 255)';
                        canvasCtx.beginPath();
                        const sliceWidth = canvas.width * 1.0 / bufferLength;
                        let x = 0;
                        for (let i = 0; i < bufferLength; i++) {
                            const v = dataArray[i] / 128.0;
                            const y = v * canvas.height / 2;
                            if (i === 0) {
                                canvasCtx.moveTo(x, y);
                            } else {
                                canvasCtx.lineTo(x, y);
                            }
                            x += sliceWidth;
                        }
                        canvasCtx.lineTo(canvas.width, canvas.height / 2);
                        canvasCtx.stroke();
                        requestAnimationFrame(draw);
                    }
                
                    draw(); // Start the visualization
                    // end of new code for recording visualizer

                    recorder.startRecording();
                    console.log('timer: '+ document.getElementById("timer"));
                    if(document.getElementById("timer")){
                        startTimer();
                    }
                    
                    document.getElementById("recordingindicator").classList.remove("slds-hide");

                    function sleep(m) {
                        return new Promise(function (resolve) {
                            setTimeout(resolve, m);
                        });
                    }

                    sleep(10000).then(function () {
                        recorder.stopRecording(function () {
                            document.getElementById("recordingindicator").classList.add("slds-hide");
                            let audioBlob = recorder.getBlob();
                            const audioUrl = URL.createObjectURL(audioBlob);
                            const audioElement = document.createElement('audio');
                            audioElement.controls = true;
                            audioElement.src = audioUrl;
                            const recordingContainer = document.getElementById('recording');
                            const existingAudioElement = recordingContainer.querySelector('audio');
                            if (existingAudioElement) {
                                // Remove the existing audio element
                                recordingContainer.removeChild(existingAudioElement);
                            }

                            document.getElementById('recording').appendChild(audioElement);
                            const reader = new FileReader();
                            reader.onload = function (event) {
                                const base64Audio = event.target.result.split(',')[1];
                                let speechTasks = component.get("v.speechTasks");
                                speechTasks.push(base64Audio);
                                component.set("v.speechTasks", speechTasks);
                                console.log('Speech task List: ' + component.get("v.speechTasks"));
                                //helper.saveAudioToSalesforce(component, component.get("v.participantGameid"), base64Audio);
                                //console.log('Blob Contents:', contents);
                            };
                            reader.onerror = function (event) {
                                console.error('Error reading Blob:', event.target.error);
                            };

                            reader.readAsDataURL(audioBlob);
                            //invokeSaveAsDialog(blob);
                        });
                    });
                })
                .catch(function (error) {
                    console.error('Error starting recording:', error);
                    component.set("v.isRecording", false);
                });



            function startTimer() {
                if (!startTime) {
                    startTime = performance.now();
                    updateTimer();
                }
            }
    
            function updateTimer() {
                const currentTime = performance.now();
    
                const elapsedTime = (currentTime - startTime) / 1000; // Convert to seconds
                const remainingTime = Math.max(0, secondsRemaining - elapsedTime);
    
                const minutes = Math.floor(remainingTime / 60);
                const seconds = Math.floor(remainingTime % 60);
    
                const minutesDisplay = String(minutes).padStart(2, '0');
                const secondsDisplay = String(seconds).padStart(2, '0');
    
                timerDisplay.textContent = `${minutesDisplay}:${secondsDisplay}`;
    
                if (remainingTime <= 0) {
                    document.getElementById("startButton").disabled = false;
                } else {
                    countdownId = requestAnimationFrame(updateTimer);
                }
            }
               
    }
    /*,

    /playRecording: function(component, event, helper) {
        component.set("v.isPlaying", true);

        const audioPlayer = component.find("audioPlayer");
        const audioSource = component.find("audioSource");
        const audioUrl = component.get("v.recordedAudioUrl");

        audioSource.set("v.src", audioUrl);
        audioPlayer.getElement().load(); // Reload the audio element to play new audio
        audioPlayer.getElement().play()
            .then(() => {
                component.set("v.isPlaying", false);
            })
            .catch(error => {
                console.error('Error playing recorded audio:', error);
                component.set("v.isPlaying", false);
            });
    },*/

    /*saveMicrophone: function(component, event, helper) {
        // You can directly use the selectedMicrophone attribute for further processing or UI updates
    }*/
})