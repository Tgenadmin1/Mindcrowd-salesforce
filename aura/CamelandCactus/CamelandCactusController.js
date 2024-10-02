({
    myAction: function (component, event, helper) {
        var timeS = new Date().getTime();
                const url = new URL(window.location.href);
                const resourceUrl = $A.get("$Label.c.Community_Url")+  $A.get("$Label.c.camelandcactus_game_config_url")+'?test='+timeS;
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
        var gameNameScientific = $A.get("$Label.c.scientific_game_CamelandCactus");
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
                if (name['Camel_and_Cactus__c'] == 'Locked' && pageUrl[1] == $A.get("$Label.c.url_me_CamelandCactus")) {
                    component.set('v.showConfirmDialog', true);
                }
                else if (name['Camel_and_Cactus__c'] == 'Completed' && pageUrl[1] == $A.get("$Label.c.url_me_CamelandCactus")) {
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

                    function changeScreen() {
                        console.log('currentScreent',currentScreent);
                        gameId = component.get("v.myAttribute");
                        userContactId = component.get("v.mycontactId");
                        ipAddress = component.get("v.ipAddress");
                        browserName = component.get("v.browser");
                        participantGameInfoId = component.get("v.participantGameid");

                        timedata = new Date();           
                        document.getElementById("datablock_camel_cact_Game").innerHTML = configdata[currentScreent].content;
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
                    for(let i=0; i<configdata.length; i++){
                        if (configdata[i].hasOwnProperty('content')){
                            document.getElementById("divcontainer").innerHTML = configdata[i].content;     
                        }                        
                    }
                    document.getElementById("divcontainer").innerHTML = '';
                    function userInputResponse(e) {
                        const altText = e.currentTarget.querySelector("img").getAttribute('alt');
                        if (configdata[currentScreent - 1].hasOwnProperty("answer")) {
                            if(!configdata[currentScreent - 1].isPractice){
                                round = 1;
                            } 
                           let isCor = altText == configdata[currentScreent - 1].answer.fld1 ? "true" : "false"; 
                            result_time = new Date() - timedata;
                            resultData[configdata[currentScreent - 1].screen] = {
                                "duration": result_time,
                                "status": { res_sts1: isCor },
                                "data": { "fld1": altText },
                                "question": configdata[currentScreent - 1].question,
                                "isPractice": configdata[currentScreent - 1].isPractice,
                                "correctAnswer": configdata[currentScreent - 1].answer                               
                            };                  
                            let currentgamedata = resultData[configdata[currentScreent - 1].screen];
                            Object.keys(currentgamedata.status).forEach((vv, kk) => {
                                saveData(
                                    "Camel & Cactus",
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
                            }, 4000);
                            }else{
                                changeScreen();
                            }
                        } else {

                        }
                    }

                    function resetError2(msgstatus = 1) {                   
                    let questionNo = configdata[currentScreent - 1].question; 
                      if (questionNo == 1) {
                        document.getElementById("errorblock2").style = (msgstatus == 1) ? "display:none" : "display:inline";
                      }
                      if (questionNo == 2) {
                        document.getElementById("errorblock3").style = (msgstatus == 1) ? "display:none" : "display:inline";
                      }
                      if (questionNo == 3) {
                        document.getElementById("errorblock4").style = (msgstatus == 1) ? "display:none" : "display:inline";
                      }       
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
                        document.getElementById("d_title").innerHTML = "";
                        document.getElementById("d_txt").innerHTML = "";
                        document.getElementById("d_status").innerHTML = "";
                    }

                    function gotoNextScreen(e) {
                        gamePlay({ keyCode: 32 });
                    }

                    function saveData(gameName, questionNumber, userInput, isCorrect, reactionTime, isPracticeQuestion, correctAnswer,round) {
                       helper.recorData(component, event, helper, userContactId, gameId, questionNumber, userInput, isCorrect, reactionTime, isPracticeQuestion, correctAnswer, participantGameInfoId, round);
                        if (questionNumber ==35) {
                            document.getElementById("nextBtton").classList.remove("slds-hide");
                        }                        
                    }

                    function endGame(gameId, participantGameInfoId) {
                        var endDateTime = new Date();
                        var gamePlayStatus = "Completed";
                        var screenResolution = {"height" :screenHeight, "width" :screenWidth };
                        helper.participantGameInfoUpdate(component, event, helper, userContactId,language, gameId, endDateTime, gamePlayStatus, participantGameInfoId,screenResolution);//helper method calling here.
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