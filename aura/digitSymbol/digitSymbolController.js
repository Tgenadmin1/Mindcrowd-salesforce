({
    myAction: function (component, event, helper) {
        var timeS = new Date().getTime();
        const thresholdTime = 90000;   
        let elapsedTime = 0;
        let intervalId; 
        let startTime;
        const fixedAdjustment = 4000;   
        const resourceUrl = $A.get("$Label.c.Community_Url")+  $A.get("$Label.c.digitSymbol_game_config_url")+'?test='+timeS;
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
        var gameNameScientific = $A.get("$Label.c.scientific_game_digitsymbolmatchingtest");
        helper.gameDetails(component, event, helper, gameNameScientific);
        var gameId;
        var participantGameInfoId;
        var ipAddress;
        var browserName;
        helper.getIpAddress(component, event, helper);
        helper.printBrowser(component, event, helper);
        var device = helper.getDeviceType(component, event, helper);
        let currentUserId = $A.get("$SObjectType.CurrentUser.Id");
        helper.userDetails(component, event, helper, currentUserId);
        var userContactId;
        actionGame.setCallback(this, function (a) {
            var state = a.getState();
            if (state === "SUCCESS") {
                var name = a.getReturnValue();
                 var language = name['Language__c'];     
                if (name['Digit_Symbol_Matching_Test__c'] == 'Locked' && pageUrl[1] == $A.get("$Label.c.url_me_digitSymbol")) {
                    component.set('v.showConfirmDialog', true);
                }
                else if (name['Digit_Symbol_Matching_Test__c'] == 'Completed' && pageUrl[1] == $A.get("$Label.c.url_me_digitSymbol")) {
                    component.set('v.showConfirmDialog', true);
                }
                else {
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
                    let round = 0;
                    let timedata = new Date();
                    let result_time = 0;
                    let command_value = 0;
                    let lastdatatitle = "";
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
                    
                    function getCookie (name) {
                        var cookieString = "; " + document.cookie;
                        cookieString = cookieString.replace('LSKey-c$','');
                        var parts = cookieString.split("; " + name + "=");
                        if (parts.length === 2) {
                            return parts.pop().split(";").shift();
                        }
                        return null;
                    }

                    for(let i=0; i<configdata.length; i++){
                        if (configdata[i].hasOwnProperty('content')){
                            document.getElementById("divcontainer").innerHTML = configdata[i].content;     
                        }                        
                    }
                    document.getElementById("divcontainer").innerHTML = '';

                    let bgimages = [];
                    var imgContainer = document.getElementById('imgContainer');
                    function preloadImage(imgdata) {
                    for (var i = 0; i < imgdata.length; i++) {
                        bgimages[i] = new Image();
                        bgimages[i].src = '../s/sfsites/c/resource/DigitSymbolSR/' + imgdata[i];

                        imgContainer.appendChild(bgimages[i]);
                        }
                    }

                    preloadImage(["PDSKey.png","PDS1.png","PDS2.png","PDS3.png","DSKey.png","DS1.png","DS2.png","DS3.png",
                    "DS4.png","DS5.png","DS6.png","DS7.png","DS8.png","DS9.png","Page1.png","Page2.png","ESPage1.png","ESPage2.png","DSKeyES.png"]);

                    function changeScreen() {
                        if (configdata[currentScreent].screen === "8") {
                            console.log('startTime: ' + startTime);
                            startTime = performance.now(); 
                            intervalId = setInterval(() => {
                              const currentTime = performance.now();
                              elapsedTime = currentTime - startTime;
                              console.log('elapsedTime: ' + elapsedTime);
                              const adjustedThreshold = thresholdTime - fixedAdjustment + Math.floor (currentScreent / 2) * 1000;                          
                              if (elapsedTime >= adjustedThreshold) {
                                currentScreent = configdata.length - 1;
                                console.log('time done: ' + currentScreent);
                                clearInterval(intervalId);
                                changeScreen();
                              }
                              if (elapsedTime >= adjustedThreshold) {
                                document.getElementById("nextBtton").classList.remove("slds-hide");
                            }
                            }, 1000);
                        }
                        gameId = component.get("v.myAttribute");
                        userContactId = component.get("v.mycontactId");
                        ipAddress = component.get("v.ipAddress");
                        browserName = component.get("v.browser");
                        participantGameInfoId = component.get("v.participantGameid");
                        timedata = new Date();
                        document.getElementById("datablock_digitGame").innerHTML = configdata[currentScreent].content;
                        if (!isKeyboad) {
                            document.getElementById("gameMainContent").removeEventListener('click', gotoNextScreen, false);
                            if (configdata[currentScreent].hasOwnProperty('isTouch')) {
                                document.getElementById("gameMainContent").addEventListener('click', gotoNextScreen, false);
                            }
                             if(configdata[currentScreent].instructionsLeft != 'undefined' &&
                                     configdata[currentScreent].instructionsLeft){
                                window.scrollTo(0,0);
                            } 
                        }
                        if (configdata[currentScreent].instructionsLeft == true) {
                            document.getElementById("gameMainContent").classList.add("instructionsLeft");
                        }else{
                            document.getElementById("gameMainContent").classList.remove("instructionsLeft"); 
                        }
                        let userinputbtn = document.querySelectorAll(".inputbtn");
                        if (typeof (userinputbtn) != 'undefined' && userinputbtn != null) {
                            userinputbtn.forEach(item => { item.addEventListener('click', userInputResponse, false); });
                        }
                        if (currentScreent == 1) {
                            var startDateTime = new Date();
                            var gamePlayStatus = "Not-Completed";
                            var screenResolution = {"height" :screenHeight, "width" :screenWidth };
                            helper.participantGameInfo(component, event, helper, userContactId,language, gameId, startDateTime, gamePlayStatus,ipAddress,browserName,device,screenResolution);                            
                        }
                        if ((configdata.length - 1) == currentScreent) {
                            endGame(gameId, participantGameInfoId);
                            clearTimeout(intervalTime);
                            return false;
                        }
                        if ((configdata.length - 1) > currentScreent) {
                            if (configdata[currentScreent].endDuration != 0)
                                intervalTime = setTimeout(changeScreen, configdata[currentScreent].endDuration);
                            currentScreent = currentScreent + 1;
                        } else {
                            clearTimeout(intervalTime);
                        }
                        document.getElementById("gameMainContent").style = "pointer-events:unset";
                    }
                    window.addEventListener('keyup', gamePlay, false);
                    function userInputResponse(e) {
                            if (
                                (configdata[currentScreent - 1].hasOwnProperty("answer") &&
                                  e.target.value == configdata[currentScreent - 1].answer.fld1) ||
                                (configdata[currentScreent - 1].hasOwnProperty("answer") &&
                                  configdata[currentScreent - 1].hasOwnProperty("isPractice") &&
                                  configdata[currentScreent - 1].isPractice === false)
                              ) {
                                let isCor = e.target.value === configdata[currentScreent - 1].answer.fld1 ? "true" : "false";
                                if(!configdata[currentScreent - 1].isPractice){
                                    round = 1;
                                }                            
                                result_time = new Date() - timedata;
                            resultData[configdata[currentScreent - 1].screen] = {
                                "duration": result_time,
                                "status": { res_sts1: isCor },
                                "data": { "fld1": e.target.value },
                                "question": configdata[currentScreent - 1].question,
                                "isPractice": configdata[currentScreent - 1].isPractice,
                                "correctAnswer": configdata[currentScreent - 1].answer
                            };
                            lastdatatitle = "Result";
                            let currentgamedata = resultData[configdata[currentScreent - 1].screen];
                            Object.keys(currentgamedata.status).forEach((vv, kk) => {
                                saveData(
                                    "Digit Symbol Matching Test",
                                    currentgamedata.question,
                                    currentgamedata.data["fld" + (kk + 1)],
                                    currentgamedata.status["res_sts" + (kk + 1)],
                                    currentgamedata.duration,
                                    currentgamedata.isPractice,
                                    currentgamedata.correctAnswer["fld" + (kk + 1)],
                                    round
                                );
                            });
                            document.getElementById("d_title").innerHTML = "Result";
                            document.getElementById("d_txt").innerHTML = result_time + " ms";
                            document.getElementById("d_status").innerHTML = resultData[configdata[currentScreent - 1].screen]["status"];
                            setTimeout(clearResult, 1500);
                            if(configdata[currentScreent - 1].isPractice){                               
                                resetError2(0);
                                setTimeout(() => { 
                                    resetError2();
                                    changeScreen();
                            }, 1000);
                            }else{
                                changeScreen();
                            }
                        } else if(configdata[currentScreent - 1].hasOwnProperty("isPractice") &&
                                  configdata[currentScreent - 1].isPractice){
                            resetError(0);
                            setTimeout(resetError, 15000000);
                        }
                    }

                    function resetError(msgstatus = 1) {
                        document.getElementById("errorblock").style = (msgstatus == 1) ? "display:none" : "display:inline";
                    }
                    function resetError2(msgstatus = 1) {
                        document.getElementById("errorblock2").style = (msgstatus == 1) ? "display:none" : "display:inline";
                        document.getElementById("errorblock").style = "display:none";
                        document.getElementById("gameMainContent").style = "pointer-events:none";
                    }
                    changeScreen();
                    function gamePlay(e) {                        
                        command_value = e.keyCode;
                        let startDurations = configdata[currentScreent - 1].startDuration;
                        if (startDurations == -1) {
                            if (configdata[currentScreent - 1].hasOwnProperty("command") && command_value >= configdata[currentScreent - 1].command[0] && command_value <= configdata[currentScreent - 1].command[1]) {
                                clearTimeout(intervalTime);
                                changeScreen();
                            }
                        } 
                    }

                    function clearResult() {
                        lastdatatitle = "";
                        document.getElementById("d_title").innerHTML = "";
                        document.getElementById("d_txt").innerHTML = "";
                        document.getElementById("d_status").innerHTML = "";
                    }
                    function gotoNextScreen(e) {
                        gamePlay({ keyCode: 32 });
                    }
                    function saveData(gameName, questionNumber, userInput, isCorrect, reactionTime, isPracticeQuestion, correctAnswer,round) {                     
                        helper.recorData(component, event, helper, userContactId, gameId, questionNumber, userInput, isCorrect, reactionTime, isPracticeQuestion, correctAnswer, participantGameInfoId, round);
                        if (questionNumber == 94) {
                            clearInterval(intervalId);
                            document.getElementById("nextBtton").classList.remove("slds-hide");
                        }
                    }
                    function endGame(gameId, participantGameInfoId) {
                        var endDateTime = new Date();
                        var gamePlayStatus = "Completed";
                        var screenResolution = {"height" :screenHeight, "width" :screenWidth };
                        helper.participantGameInfoUpdate(component, event, helper, userContactId,language, gameId, endDateTime, gamePlayStatus, participantGameInfoId,screenResolution);
                    }
                }
                $A.get('e.refreshView').fire();
            }
            else if (state === "ERROR") {
                let message = '';
                let errors = response.getError();
                if (errors && Array.isArray(errors) && errors.length > 0) {
                    message = errors[0].message;
                }
            }
            else {
            }
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
    goToNextPage: function (component, event, helper) {
        const urlParams = new URLSearchParams(document.location.search.substring(1));
        helper.allowLeaving();
        window.location.href = $A.get("$Label.c.Community_Url") + "/s/" + $A.get("$Label.c.url_dashboard");
    },
    goToMyResultsPage: function (component, event, helper) {
        const urlParams = new URLSearchParams(document.location.search.substring(1));
        helper.allowLeaving();
        window.location.href = $A.get("$Label.c.Community_Url") + "/s/" + $A.get("$Label.c.url_myresults");
    },
    closeModel: function (component, event, helper) {
        window.location.href = $A.get("$Label.c.Community_Url") + '/s/' + $A.get("$Label.c.url_dashboard");
    }
})