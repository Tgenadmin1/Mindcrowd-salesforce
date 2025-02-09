({
    myAction: function (component, event, helper) {
            var timeS = new Date().getTime();
            const url = new URL(window.location.href);
            const resourceUrl = $A.get("$Label.c.Community_Url")+$A.get("$Label.c.fakeNewsTest_game_config_url")+'?test='+timeS;
            window.fetch(resourceUrl)
                .then($A.getCallback((response) => {
                    if (!response.ok) {
                        throw new Error(`HTTP error, status = ${response.status}`);
                    }
                response.json()
                    .then($A.getCallback((data) => {
                        let configdata = data.fakeNewsTask;
                        let fakenewsButton = data.fakenewsButtons;
                        let realHeadLines =  data.realHeadLines;
                        let fakeHeadLines =  data.fakeHeadLines; 
                        let generalinstrs =  data.fakenewsInstrPage.genericinstructions;
                let firstset; 
                let secondset; 
                let firstSetType;
                const intermedcontent = '<div id="imgContainer" class="centers fakenewsimage" ><img src="../resource/fakeNewsTaskSR/blank.jpg?" alt="blank"></img></div>';
                if(Math.random() < 0.5){
                    firstset = fakenewsButton.accuracybuttons;
                    secondset = fakenewsButton.sharingbuttons;
                    firstSetType = 'accuracy';
                }
                else{
                    firstset = fakenewsButton.sharingbuttons;
                    secondset = fakenewsButton.accuracybuttons;
                    firstSetType = 'sharing';
                }                 
                           
                function shuffleArray(array) {
                    let currentIndex = array.length,  randomIndex;                  
                    while (currentIndex > 0) {
                      randomIndex = Math.floor(Math.random() * currentIndex);
                      currentIndex--;
                      [array[currentIndex], array[randomIndex]] = [
                        array[randomIndex], array[currentIndex]];
                    }                  
                    return array;
                  }                  

                let realHeadLinesRandomFirstSet= shuffleArray(realHeadLines, 12).slice(0, 12);
                let fakeHeadLinesRandomFirstSet = shuffleArray(fakeHeadLines, 12).slice(0, 12);
                let realHeadLinesRandomSecondSet =  JSON.parse(JSON.stringify(realHeadLinesRandomFirstSet));
                let fakeHeadLinesRandomSecondSet = JSON.parse(JSON.stringify(fakeHeadLinesRandomFirstSet));    
                
                
                realHeadLinesRandomFirstSet.forEach(item => {
                    item.content = item.content + firstset;
                    if(firstSetType == 'sharing'){
                        //item.isPractice = true;
                        item.answer.fld1 = '';
                        item.answer.fld2 = '';
                    }        
                });
                fakeHeadLinesRandomFirstSet.forEach(item => {
                     item.content = item.content + firstset;
                     if(firstSetType == 'sharing'){
                        //item.isPractice = true;
                        item.answer.fld1 = '';
                        item.answer.fld2 = '';
                    } 
                });
                realHeadLinesRandomSecondSet.forEach(item => {
                    item.content = item.content + secondset;
                    if(firstSetType != 'sharing'){
                        //item.isPractice = true;
                        item.answer.fld1 = '';
                        item.answer.fld2 = '';
                    }
                  });
                fakeHeadLinesRandomSecondSet.forEach(item => {
                    item.content = item.content + secondset;   
                    if(firstSetType != 'sharing'){
                        //item.isPractice = true;
                        item.answer.fld1 = '';
                        item.answer.fld2 = '';
                    }
                });                
               

                let headllinesFirstSet = [...realHeadLinesRandomFirstSet, ...fakeHeadLinesRandomFirstSet];
                let headllinesSecondSet = [...realHeadLinesRandomSecondSet, ...fakeHeadLinesRandomSecondSet];

                //console.log('headllinesFirstSet: ' + headllinesFirstSet);
                //console.log('headllinesSecondSet: ' + headllinesSecondSet);

                let headllinesFirstSetRandom = shuffleArray(headllinesFirstSet);
                let headllinesSecondSetRandom = shuffleArray(headllinesSecondSet);

                let headllinesRandom = [...headllinesFirstSetRandom, ...headllinesSecondSetRandom];                
                let j=0;
                for (let i = 4; i < configdata.length; i++) {
                    if(i==52){
                        configdata[i].content = generalinstrs;
                    }
                    else if(i % 2 == 0){
                        configdata[i].content = headllinesRandom[j].content;
                        configdata[i].answer = headllinesRandom[j].answer; 
                        j++;
                    } else if(i==53 || i==101){

                    }
                    else{
                        if(firstSetType == 'accuracy' && i<53 || firstSetType != 'accuracy' && i>53){
                            configdata[i].content = intermedcontent+fakenewsButton.accuracybuttons;  
                        }
                        else{
                            configdata[i].content = intermedcontent+fakenewsButton.sharingbuttons;
                        }
                    }                                     
                }    
        //console.log('configdata: ' + JSON.stringify(configdata));
        for(let i=2; i<=101; i=i+2){
            document.getElementById("divcontainer").innerHTML = configdata[i].content;
        }
        document.getElementById("divcontainer").innerHTML = '';
        var myPageRef = window.location.href;
        var actionGame = component.get("c.getCurrentContact");
        var pageUrl = myPageRef.split('/s/');
        var gameNameScientific = $A.get("$Label.c.scientific_game_fakeNewsTest");
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
                if (name['Fake_News__c'] == 'Locked' && pageUrl[1] == $A.get("$Label.c.url_me_fakeNewsTest")) {
                    component.set('v.showConfirmDialog', true);
                }
                else if (name['Fake_News__c'] == 'Completed' && pageUrl[1] == $A.get("$Label.c.url_me_fakeNewsTest")) {
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
                    let pageLoadStartTime = null;    
                    let roundStartTime = null;
                    let round = 0;
                    let timedata = new Date();
                    let result_time = 0;
                    let inputdata = {};
                    let lastdatatitle = "";
                    var gameName = $A.get("$Label.c.fakeNews_text");
                    var totalTrialTime = 0;
                    var orderOffUserInput = [];
                    var timeForCategories = {};
                    var firstThreeKeys = [];   
                    var timeTest;
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
                        gameId = component.get("v.myAttribute");
                        userContactId = component.get("v.mycontactId");
                        ipAddress = component.get("v.ipAddress");
                        browserName = component.get("v.browser");
                        participantGameInfoId = component.get("v.participantGameid");//participantGameInfoId holds the participantgameinfo record id.
                        timedata = new Date();
                        pageLoadStartTime = timedata;
                        document.getElementById("datablock_fakeNewsGame").innerHTML = configdata[currentScreent].content; 

                        if (configdata[currentScreent].screen == '98'){
                            document.getElementById("continue").classList.remove('slds-hide');
                        } 
                        if (configdata[currentScreent].screen == '1') {                        
                            roundStartTime = timedata;
                        }

                        //Changes for touch
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
                        //end changes for touch goto  function  gotoNextScreen
                        if (configdata[currentScreent].instructionsLeft == true) {
                            document.getElementById("gameMainContent").classList.add("instructionsLeft");
                        }else{
                            document.getElementById("gameMainContent").classList.remove("instructionsLeft"); 
                        }

                        let userinputbtn = document.querySelectorAll(".inputbtn");
                        if (typeof (userinputbtn) != 'undefined' && userinputbtn != null) {
                            userinputbtn.forEach(item => { item.addEventListener('click', userInputResponse, false); });
                        }

                        let userenterbtn= document.getElementById("enterbtn");
                        if(typeof(userenterbtn) != 'undefined' && userenterbtn != null){                       
                             userenterbtn.removeEventListener('click',gamePlayEnter,false);
                             userenterbtn.addEventListener('click',gamePlayEnter,false);                          
                            
                        }

                       if (currentScreent == 1) {                          
                            var startDateTime = new Date();
                            var gamePlayStatus = "Not-Completed";
                            var screenResolution = {"height" :screenHeight, "width" :screenWidth };                           
                            helper.participantGameInfo(component, event, helper, userContactId,language, gameId, startDateTime, gamePlayStatus,ipAddress,browserName,device,screenResolution);
                        }
                        else {                            
                        }

                        // end game function is updating the record of participant gameInfo like endDateTime.
                        if ((configdata.length - 1) == currentScreent) {
                            //endGame(gameId, participantGameInfoId);
                            clearTimeout(intervalTime);
                            return false;
                        }

                        //Change New Screen Default
                        if ((configdata.length - 1) > currentScreent) {
                            if (configdata[currentScreent].endDuration != 0)
                                intervalTime = setTimeout(changeScreen, configdata[currentScreent].endDuration);
                            currentScreent = currentScreent + 1;
                        } else {
                            clearTimeout(intervalTime);
                        }
                        inputdata = {};
                        document.getElementById("gameMainContent").style = "pointer-events:unset";
                    }   
                    window.addEventListener('keyup', gamePlay, false);
                    function userInputResponse(e) {
                        if (configdata[currentScreent - 1].hasOwnProperty("answer")) {
                            let content =  configdata[currentScreent - 1].content;                            
                            let regex = /\/([^\/?]+)\?/; 
                            let match = content.match(regex);
                            let imageName='';
                            let question;
                            if (match && match[1]) {
                                imageName = match[1];
                              }
                            if(imageName.includes('SR')){
                                question = 'Real News';
                            }
                            else{
                                question = 'Fake News';
                            }
                            result_time = new Date() - timedata;
                            let isCorrect = false;
                            let userInput =  e.target.closest('button').value;              
                            let correctAnswer='';                     
                            if(userInput== configdata[currentScreent - 1].answer.fld1 || userInput == configdata[currentScreent - 1].answer.fld2){
                                isCorrect = true;                                
                            }   
                            if(configdata[currentScreent - 1].answer["fld1"] !=null || configdata[currentScreent - 1].answer["fld1"] !='')
                            {
                                correctAnswer = configdata[currentScreent - 1].answer["fld1"]+','+configdata[currentScreent - 1].answer["fld2"]; 
                            }                        
                            saveData(
                                "FAKENEWSTEST",
                                configdata[currentScreent - 1].question,
                                userInput,
                                isCorrect,
                                result_time,
                                configdata[currentScreent - 1].isPractice,
                                correctAnswer,
                                imageName,
                                question
                            );

                            setTimeout(clearResult, 1500);
                            totalTrialTime = 0;
                            orderOffUserInput = [];
                            timeForCategories = {};
                            firstThreeKeys = [];

                            if(configdata[currentScreent - 1].isPractice){                               
                                resetError2(0);
                                setTimeout(() => { 
                                    resetError2();
                                    changeScreen(); 
                                   
                            }, 1000);

                            }else{
                                changeScreen();
                            }
                        } else {
                            resetError(0);
                            setTimeout(resetError, 1500);                           
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

                    function gamePlayEnter(){ 
                        gamePlay({keyCode:13});     
                   }

                    function gamePlay(e) {
                        //console.log('inside gamePlay');
                        let startDurations = configdata[currentScreent - 1].startDuration;
                        let command_value = e.keyCode;
                        if (startDurations == -1) {
                            if (configdata[currentScreent - 1].hasOwnProperty("command") && command_value >= configdata[currentScreent - 1].command[0] && command_value <= configdata[currentScreent - 1].command[1]) {
                                clearTimeout(intervalTime); //Move the code 9 July
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
                    function saveData(gameName, questionNumber, userInput, isCorrect, reactionTime, isPracticeQuestion, correctAnswer,imageNames,question) {
                    helper.recorData(component, event, helper, userContactId, gameId, questionNumber, userInput, isCorrect, reactionTime, isPracticeQuestion, correctAnswer, participantGameInfoId, totalTrialTime, orderOffUserInput, timeTest, round, imageNames,question);
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
    goToSurveys: function (component, event, helper) {
        document.getElementById("datablock_fakeNewsGame").innerHTML = '';
        document.getElementById("continue").classList.add('slds-hide');
        helper.allowLeaving();
        component.set('v.showSurvey',true);
    },
    closeModel: function (component, event, helper) {
        window.location.href = $A.get("$Label.c.Community_Url") + '/s/' + $A.get("$Label.c.url_dashboard");
    }
})