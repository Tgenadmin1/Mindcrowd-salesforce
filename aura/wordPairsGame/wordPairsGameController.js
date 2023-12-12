({
    //myAction is called from the component. PAIREDGAME execution is working inside this.
    doInit: function (component, event, helper) {

        var timeS = new Date().getTime();
        const url = new URL(window.location.href);
       // const resourceRelPath = $A.get("$Label.c.wordPairs_game_config_url")+'?test='+timeS;
        const resourceUrl = $A.get("$Label.c.Community_Url")+ $A.get("$Label.c.wordPairs_game_config_url")+'?test='+timeS;
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
            var pageUrl=myPageRef.split('/s/');
            //-----Gettung gameId from the apex function------------------
            var gameNameScientific = $A.get("$Label.c.scientific_game_verbalPairedAssociates");
            helper.gameDetails(component, event, helper, gameNameScientific); 
            var gameId;
            var participantGameInfoId;
            var ipAddress;
            var browserName;
            helper.getIpAddress(component, event, helper);
            helper.printBrowser(component, event, helper);
            //var device = $A.get("$Browser.formFactor");
            var device = helper.getDeviceType(component, event, helper);
            // Gettin contact id from the current loggedin user.
            let currentUserId = $A.get("$SObjectType.CurrentUser.Id");
            helper.userDetails(component, event, helper, currentUserId);
            var userContactId;
        console.log('userContactId',userContactId)

        actionGame.setCallback(this,function(a) 
        {  
            var state = a.getState();
            if (state === "SUCCESS") {
                var name = a.getReturnValue();
                var language = name['Language__c'];
               
                console.log('language second',language);
                
    
                if(name['Verbal_Paired_Associates__c']=='Locked' && pageUrl[1]== $A.get("$Label.c.url_me_wordpairsgame")) {
                  component.set('v.showConfirmDialog', true);
                }
                else if(name['Verbal_Paired_Associates__c']=='Completed' && pageUrl[1]==  $A.get("$Label.c.url_me_wordpairsgame")) {
                  component.set('v.showConfirmDialog', true);
                }
                // full game code is started from else part.===========================
                else{
                    component.set('v.showConfirmDialog', false);
                    helper.preventLeaving();
                    document.documentElement.addEventListener('keydown', function (e) {
                        if ((e.keycode || e.which) == 32) {
                            e.preventDefault();
                        }
                    }, false);

                    //--------------PAIRED game JS-----------------
                    const urlParams = new URLSearchParams(document.location.search.substring(1));
                    const  cs = urlParams.get('cs');
                    let currentScreent = 0;
                    if(cs!=null){
                        //console.log("cs1=", cs)
                        currentScreent = Number(cs);
                    }

                    let resultData = {};
                    let intervalTime = null;
                    let pageLoadStartTime = null;
                    let roundTotalTime = null;
                    let roundStartTime = null;
                    let timedata = new Date();
                    let result_time = 0;
                    let command_value = 0;
                    let inputdata = "";
                    var gameTime = $A.get("$Label.c.word_pairs_game_5_minutes");
                    var keyCount = 0;
                    var screenHeight = window.screen.availHeight;
                    var screenWidth = window.screen.availWidth;
                    var gameName = $A.get("$Label.c.word_pairs_game_text_25");
                    var inputkeyPress ="";
                    let macTouch = getCookie('macTouch');
                    var ua = window.navigator.userAgent;
                    var iOS = !!ua.match(/Mac OS/i);
                    // var isMac = ua.match(/Mac OS/i);
                    var isKeyboad;
                    if (iOS) {
                        isKeyboad = (macTouch == 'false');
                        if(macTouch == 'true' && device == "DESKTOP"){
                                device = 'TABLET'   ;     
                        }
                } else if (device == "DESKTOP" && macTouch != 'true') {
                        isKeyboad = true;
                } else {
                        isKeyboad = false;
                       //alert(' component.get("v.browser")')
                        if(macTouch == 'true' && device == "DESKTOP"){
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
                        


                        var word_pairs_game_text_5_b = "";
                        var word_pairs_game_text_0b = "";
                        if (!isKeyboad) {
                            word_pairs_game_text_5_b = $A.get("$Label.c.word_pairs_game_text_5_b_tap");
                            word_pairs_game_text_0b = $A.get("$Label.c.word_pairs_game_text_0b_tap");
                        } else {
                            word_pairs_game_text_5_b = $A.get("$Label.c.word_pairs_game_text_5_b");
                            word_pairs_game_text_0b = $A.get("$Label.c.word_pairs_game_text_0b");
                        }

                            configdata = configdata.map(obj => {	
                            obj.content = obj.content.replace('word_pairs_game_text_5_b', word_pairs_game_text_5_b);
                            obj.content = obj.content.replace('word_pairs_game_text_0b', word_pairs_game_text_0b);
                            return obj;
                      });
                      //console.log('New ins_configdata: '+JSON.stringify(configdata));

       
       

        console.log(configdata);

        //This saveData function is used for creating record in ParticipantGameresponse object.
        function saveData(gameName, questionNumber, userInputData, isCorrect, reactionTime, isPracticeQuestion, correctAnswer, timeToFirstKeyStroke,round) {
            console.log('inputkeyPress save = ', userContactId, gameId, questionNumber, userInputData, isCorrect, reactionTime, isPracticeQuestion, correctAnswer, participantGameInfoId,inputkeyPress,timeToFirstKeyStroke,round);
            helper.recorData(component, event, helper, userContactId, gameId, questionNumber, userInputData, isCorrect, reactionTime, isPracticeQuestion, correctAnswer, participantGameInfoId,inputkeyPress,timeToFirstKeyStroke,round);
            //question number
            if (questionNumber == 36) {
                document.getElementById("nextBtton").classList.remove("slds-hide");
            }
            // keyCount =0;
             inputkeyPress = "";
        }
        // end game function is updating the record of participant gameInfo like endDateTime.
        function endGame(gameId, participantGameInfoId) {
            var endDateTime = new Date();
            var gamePlayStatus = "Completed";
            helper.participantGameInfoUpdate(component, event, helper, userContactId,language, gameId, endDateTime, gamePlayStatus, participantGameInfoId);
        }
        //Inisilize the page processing
        let animation = null;
        let tempData="";
        let resetTimer=false;
        function changeScreen() {
            resetTimer=false;
            gameId = component.get("v.myAttribute");
            userContactId = component.get("v.mycontactId");
            ipAddress = component.get("v.ipAddress");
            browserName = component.get("v.browser");    
            participantGameInfoId = component.get("v.participantGameid");//participantGameInfoId holds the participantgameinfo record id.
            timedata = new Date();
            pageLoadStartTime = timedata;
            keyCount =0;
            if (typeof (document.getElementById("inputsolution")) != 'undefined' && document.getElementById("inputsolution") != null) {
                tempData = document.getElementById("inputsolution").value;
            }
            
            document.getElementById("datablock_wordPairsGame").innerHTML = configdata[currentScreent].content;
            
            if(configdata[currentScreent].screen == '1'){
                var aniWord = $A.get("$Label.c.word_pairs_game_bring").split("");//['b','r','i','n','g'];
                var count = 0;
                animation = setInterval(function () {
                    console.log('sssss');
                    if(count < aniWord.length  ){
                        document.getElementById("wpAni").value  = document.getElementById("wpAni").value + aniWord[count];
                        count++;
                       }else{
                        document.getElementById("wpAni").value  = "";
                        count = 0;
                       }
                
                }, 1000);
            }else{
                clearInterval(animation);
                
            }
            //setting focus to mobile for iphone and ipad.
            
            //console.log('current screen : ', configdata[currentScreent].screen);
            if(configdata[currentScreent].screen == '0' || configdata[currentScreent].screen == '19'
                || configdata[currentScreent].screen == '70' || configdata[currentScreent].screen == '120'){
                    roundStartTime = timedata;
                    //console.log('round start time: ', roundStartTime);
                }
            if(configdata[currentScreent].screen == '18' || configdata[currentScreent].screen == '69'
                || configdata[currentScreent].screen == '119' || configdata[currentScreent].screen == '168'){
                    roundTotalTime = timedata - roundStartTime;

                    if(configdata[currentScreent].screen == '18'){
                        let totalTimeForRoundZero=roundTotalTime;
                        helper.participantGameInfoUpdateTotalTimeRoundOne(component,event,helper,userContactId,gameId,participantGameInfoId,totalTimeForRoundZero,configdata[currentScreent].screen);
                    }
                    else if(configdata[currentScreent].screen == '69'){
                        let totalTimeForRoundOne=roundTotalTime;
                        helper.participantGameInfoUpdateTotalTimeRoundOne(component,event,helper,userContactId,gameId,participantGameInfoId,totalTimeForRoundOne,configdata[currentScreent].screen);
                    }
                    else if(configdata[currentScreent].screen == '119'){
                        let totalTimeForRoundTwo=roundTotalTime;
                        helper.participantGameInfoUpdateTotalTimeRoundOne(component,event,helper,userContactId,gameId,participantGameInfoId,totalTimeForRoundTwo,configdata[currentScreent].screen);
                    }
                    else if(configdata[currentScreent].screen == '168'){
                        let totalTimeForRoundThree=roundTotalTime;
                        helper.participantGameInfoUpdateTotalTimeRoundOne(component,event,helper,userContactId,gameId,participantGameInfoId,totalTimeForRoundThree,configdata[currentScreent].screen);
                    }
                }    
            
            //Changes for touch
           // if(device=="PHONE"){
            if(!isKeyboad){
                document.getElementById("touchEvent").removeEventListener('click',gotoNextScreen,false);     
                if(configdata[currentScreent].hasOwnProperty('isTouch')){
                    document.getElementById("touchEvent").addEventListener('click',gotoNextScreen,false);
                }
                let inputstr1 = document.getElementById("inputsolution");
            if (typeof (inputstr1) != 'undefined' && inputstr1 != null) {
                //alert("input field");
                inputstr1.addEventListener('click', function() {
                    //inputstr1.setAttribute('autofocus', 'autofocus');
                    inputstr1.focus();
               });
               inputstr1.click();
 
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

            
              //end changes for touch goto  function  gotoNextScreen
            let inputstr = document.getElementById("inputsolution");
            if (typeof (inputstr) != 'undefined' && inputstr != null) inputstr.focus();

            if (currentScreent > 0) {
                let isResult = configdata[currentScreent - 1].hasOwnProperty("result") ? true : false;
                let lastdata = document.getElementById("d_title").innerHTML;
                if(inputdata == "" || inputdata == null){
                    inputdata = "No Response"
                }
                
                if (lastdata.length <= 0 && isResult == true) {
                    //Result Data
                    //result_time = new Date() - timedata;
                    console.log('test = ', tempData);
                    resultData[configdata[currentScreent - 1].screen] = {
                        "duration": result_time + configdata[currentScreent - 1].endDuration,
                        "status": (configdata[currentScreent - 1].answer == tempData.toLowerCase().trim()) ? "true" : "false",
                        "data": inputdata,
                       
                        "question": configdata[currentScreent - 1].question,
                        "isPractice": configdata[currentScreent - 1].isPractice,
                        "correctAnswer": configdata[currentScreent - 1].answer,
                        "timeToFirstKeyStroke":configdata[currentScreent - 1].timeToFirstKeyStroke,
                        "round":configdata[currentScreent-1].round
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
                    
                   
                    console.log('result_time = ', result_time);
                    //Front Result Output Data
                    document.getElementById("d_title").innerHTML = "Result";
                    document.getElementById("d_txt").innerHTML = configdata[currentScreent - 1].endDuration + " ms";
                    document.getElementById("d_status").innerHTML = resultData[configdata[currentScreent - 1].screen]["status"];
                    setTimeout(clearResult, 1000);
                }
            }

            //Initial and end Game
            if (currentScreent == 1) {
                var startDateTime = new Date();
                var gamePlayStatus = "Not-Completed";
                var screenResolution = {"height" :screenHeight, "width" :screenWidth };

                //console.log('sp  check-----',component,event,helper,userContactId,gameId,startDateTime,gamePlayStatus,ipAddress,browserName,device);
                            
                helper.participantGameInfo(component,event,helper,userContactId,language,gameId,startDateTime,gamePlayStatus,ipAddress,browserName,device,screenResolution);
            }
            else {
                //console.log('screens are changing');
            }
            // end game function for updating the endDateTime.
            if ((configdata.length - 1) == currentScreent) {
                endGame(gameId, participantGameInfoId);
                clearInterval(intervalTime);
                return false;
            }

            //Change New Screen Default
            if ((configdata.length - 1) > currentScreent) {
                intervalTime = setTimeout(changeScreen, configdata[currentScreent].endDuration);
                result_time = '';//new Date() - timedata;
                currentScreent = currentScreent + 1;
            } else {
                clearInterval(intervalTime);
            }
            inputdata = "";

            if (document.getElementById("enterBtn") != null) {
                document.getElementById("enterBtn").addEventListener("click", gamePlay, false);
            }
        }

        //Event Control System
        window.addEventListener('keyup', gamePlay, false);

        document.addEventListener('keyup', function (e) {
            
            // if (e.target && e.target.name == 'solution') {
            //     clearTimeout(intervalTime);
            //     intervalTime = setTimeout(changeScreen, configdata[currentScreent-1].endDuration);
            //     inputdata = e.target.value
            //    // alert('CCC = ' + e.);
            //     keyCount++;
            //     if(keyCount<=1){
            //         let timeTillFirstStroke = new Date();
            //         configdata[currentScreent-1].timeToFirstKeyStroke = timeTillFirstStroke - pageLoadStartTime;
            //         //console.log('time till first stroke : ', configdata[currentScreent-1].timeToFirstKeyStroke);
            //         pageLoadStartTime = '';
            //         timeTillFirstStroke = '';
            //     }
            //      if(keyCount <=3){
            //         if(e.key.match(new RegExp( "[A-Z]",'gi')) && e.key.length<=1){
            //             inputkeyPress = inputkeyPress + e.key;

            //            inputkeyPress = inputdata;
            //            // alert('ffff = ' + inputkeyPress);
            //         }else{
            //             if(e.key == 'undefined' || e.key == 'Unidentified'){
            //                 inputkeyPress = e.target.value.substring(0, 3);
            //                // alert('fffff = ' + inputkeyPress);
            //             }else{
            //                 inputkeyPress = inputkeyPress + '{' + e.key + '}';
            //               //  alert('ddddd = ' + inputkeyPress);
            //             }
                        
            //           //  alert('ddddd = ' + inputkeyPress);
            //         }
                   
            //     } 

            // }
           
            if (e.target && e.target.name == 'solution' && device =="DESKTOP") {
               // alert('1');
               
                // clearTimeout(intervalTime);
                // intervalTime = setTimeout(changeScreen, configdata[currentScreent - 1].endDuration);
                if(resetTimer){
                    clearTimeout(intervalTime);
                    intervalTime = setTimeout(changeScreen, configdata[currentScreent - 1].endDuration);
                }
                inputdata = e.target.value
                keyCount++;
               // console.log('e.target1 = ', e.code , keyCount);
                if(keyCount<=1){
                    let timeTillFirstStroke = new Date();
                    configdata[currentScreent-1].timeToFirstKeyStroke = timeTillFirstStroke - pageLoadStartTime;
                    pageLoadStartTime = '';
                    timeTillFirstStroke = '';
                   // console.log('e.target1 = ',  configdata[currentScreent-1].timeToFirstKeyStroke);
                }
                if(keyCount <=3){
                   // console.log('e.target2 = ');
                    if(  e.key.match(new RegExp( "[a-z]",'gi')) && e.key.length<=1){
                        inputkeyPress = inputkeyPress + e.key;
                    }else{
                        inputkeyPress = inputkeyPress + '{' + e.key + '}';
                    }
                }
            }else{
               
                // clearTimeout(intervalTime);
                // intervalTime = setTimeout(changeScreen, configdata[currentScreent - 1].endDuration);
                if(resetTimer){
                    clearTimeout(intervalTime);
                    intervalTime = setTimeout(changeScreen, configdata[currentScreent - 1].endDuration);
                }
                inputdata = e.target.value
               // console.log('e.target2 = ', e.code);
                keyCount++;
                if(keyCount<=1){
                    let timeTillFirstStroke = new Date();
                    configdata[currentScreent-1].timeToFirstKeyStroke = timeTillFirstStroke - pageLoadStartTime;
                    pageLoadStartTime = '';
                    timeTillFirstStroke = '';
                }
                if(keyCount <=3){
                    if(inputdata.match(new RegExp( "[a-z]",'gi')) && inputdata<=1){
                        
                        inputkeyPress = inputkeyPress + inputdata.substring(0, 3);
                        
                    }else{
                        
                        inputkeyPress =  inputdata.substring(0, 3); //inputkeyPress + '{' + e.target.value + '}';
                        //alert('inputkeyPress = ' + inputkeyPress);
                    }
                }
            }
        
        });
        
        //Inisilize the page processing
        changeScreen();

        function gamePlay(e) {
            command_value = e.keyCode;
            console.log('sssssssssssssss');
            //alert(e.key);
            //command_value=e.key.charCodeAt(0);
           
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
                            "data": "",
                            "question": configdata[currentScreent - 1].question,
                            "isPractice": configdata[currentScreent - 1].isPractice,
                            "correctAnswer": configdata[currentScreent - 1].answer,
                            "timeToFirstKeyStroke": configdata[currentScreent - 1].timeToFirstKeyStroke,
                            "round":configdata[currentScreent-1].round
                        }
                    }
                }
                if (result_time >= startDurations) {
                    if (configdata[currentScreent - 1].hasOwnProperty("command")) {
                        //Command Value Match Data
                       // if (command_value >= configdata[currentScreent - 1].command[0] && command_value <= configdata[currentScreent - 1].command[1]) {
                        if ((command_value >= configdata[currentScreent - 1].command[0] && command_value <= configdata[currentScreent - 1].command[1]) || command_value === undefined) {
                            //Result Calculation
                            if (isResult) {
                                resultData[configdata[currentScreent - 1].screen]["data"] = document.getElementById("inputsolution").value;
                                resultData[configdata[currentScreent - 1].screen]["duration"] = result_time;
                                
                                if (startDurations <= result_time && configdata[currentScreent - 1].answer == document.getElementById("inputsolution").value.toLowerCase().trim()) {
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
        function gotoNextScreen(e)
        {
            gamePlay({keyCode:32});
            //console.log('e',e);
        }
         //chnages for touch end
    }
        //  game code end.===========================
    $A.get('e.refreshView').fire();
    }
        else if(state==="ERROR"){
            let message='';
            let errors = response.getError();
            if (errors && Array.isArray(errors) && errors.length > 0) {
                message = errors[0].message;
            }
            //console.error(message);
        }
        else{
            //console.log('else part');
        }
    });
    // $A.enqueueAction(actionGame);
    $A.getCallback(function() {
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
        helper.allowLeaving();
        window.location.href = $A.get("$Label.c.Community_Url")+"/s/"+ $A.get("$Label.c.url_dashboard");
    },
    goToMyResultsPage: function (component, event, helper) {
        helper.allowLeaving();
        window.location.href = $A.get("$Label.c.Community_Url") + "/s/"+ $A.get("$Label.c.url_myresults");
    },
    closeModel : function(component, event, helper) {
        //console.log('No');
        window.location.href = $A.get("$Label.c.Community_Url") + '/s/'+$A.get("$Label.c.url_dashboard");
    },

});