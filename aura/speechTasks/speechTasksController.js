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
                    //This saveData function is used for creating record in ParticipantGameresponse object.
                    /*function saveData(gameName, questionNumber, response, isCorrect, reactionTime, isPracticeQuestion, correctAnswer, round) {    
                        if(!(response == 'j' || response == 'f'|| response == 'J' || response == 'F')){
                            response  = "No Response";
                        }
                        helper.recorData(component, event, helper, userContactId, gameId, questionNumber, response, isCorrect, reactionTime, isPracticeQuestion, correctAnswer, participantGameInfoId, round);
                        console.log("Input Results", gameName, questionNumber, response, isCorrect, reactionTime, isPracticeQuestion, round);
                    }*/
                    // This ensgame function works for the update participant gameInfo record like as end date time.
                    function endGame(gameId, participantGameInfoId) {
                        var endDateTime = new Date();
                        var gamePlayStatus = "Completed";
                        var screenResolution = {"height" :screenHeight, "width" :screenWidth };                        
                        helper.participantGameInfoUpdate(component, event, helper, userContactId,language, gameId, endDateTime, gamePlayStatus, participantGameInfoId, screenResolution,null,null,null);//helper method calling here.
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
                        if (currentScreent-1 == 4 || currentScreent-1 == 7 ) { 
                            console.log('otherlanguage: ' + document.querySelector('input[name="otherlanguage"]').checked);
                            component.set('v.otherlanguage',document.querySelector('input[name="otherlanguage"]').checked);
                            component.set('v.othervoices',document.querySelector('input[name="othervoices"]').checked);
                            component.set('v.loudnoices',document.querySelector('input[name="loudnoices"]').checked);
                            //component.set('v.delete',document.querySelector('input[name="delete"]').checked);
                        }
                        if (currentScreent-1 == 5 || currentScreent-1 == 8 ) { 
                            component.set('v.delete',document.querySelector('input[name="delete"]').checked);
                        }                        
                        document.getElementById("datablock").innerHTML = configdata[currentScreent].content;
                        let userenterbtn= document.getElementById("enterbtn");
                        console.log('userenterbtn: '+userenterbtn);
                        console.log('typeof(userenterbtn): '+typeof(userenterbtn));
                        if(typeof(userenterbtn) != 'undefined' && userenterbtn != null){                       
                             userenterbtn.removeEventListener('click',gamePlayEnter,false);
                             userenterbtn.addEventListener('click',gamePlayEnter,false);
                        }
                        //if condition is checking whether the last screen is reached, then it will display My games/ My result buton
                        if (currentScreent == configdata.length-1) {
                            document.getElementById("nextBtton").classList.remove("slds-hide");
                            //document.getElementById("nextBtton2").classList.add("slds-hide");
                            window.removeEventListener('keyup', gamePlay, false);
                        }
                        if (configdata[currentScreent].instructionsLeft == true) {
                            document.getElementById("gameMainContent").classList.add("instructionsLeft");
                        } else {
                            document.getElementById("gameMainContent").classList.remove("instructionsLeft");
                        }
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
                        if(currentScreent == 1 || currentScreent == 3 || currentScreent == 6){
                            console.log('inside 136'); 
                            //document.getElementById("speechtask").classList.remove("slds-hide");  
                            let startButton= document.getElementById("startButton");
                             if(typeof(startButton) != 'undefined' && startButton != null){                       
                                startButton.removeEventListener('click',startRecording,false);
                                startButton.addEventListener('click',startRecording,false); 
                            } 
                            let nextBtton2 = document.getElementById('nextBtton2');
                            nextBtton2.classList.add("slds-hide");
                            if(currentScreent == 3 || currentScreent == 6){
                                //document.getElementById("recordingindicator").classList.add("slds-hide");
                                let startrecording= document.getElementById("Startrecording");
                                console.log(startrecording);
                                if(typeof(startrecording) != 'undefined' && startrecording != null){   
                                    console.log('inside startrecording');                    
                                    startrecording.removeEventListener('click',startRecording,false);
                                    startrecording.addEventListener('click',startRecording,false); 
                                }
                                /*const recordingContainer = document.getElementById('recording');
                                const existingAudioElement = recordingContainer.querySelector('audio');
                                if (existingAudioElement) {
                                    // Remove the existing audio element
                                    recordingContainer.removeChild(existingAudioElement);                        
                                }
                                document.getElementById("timer").classList.remove("slds-hide");*/
                            }
                        }
                       else{
                            //document.getElementById("speechtask").classList.add("slds-hide");   
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
                        if (currentScreent == 6 ) {                   
                            helper.saveAudioToSalesforce(component,component.get("v.participantGameid"), component.get("v.speechTaskRec"),1, 
                            component.get('v.otherlanguage'),component.get('v.othervoices'),component.get('v.loudnoices'),component.get('v.delete'));
                        }
                        if (currentScreent == 9 ) {
                            helper.saveAudioToSalesforce(component,component.get("v.participantGameid"), component.get("v.speechTaskRec"),2, 
                            component.get('v.otherlanguage'),component.get('v.othervoices'),component.get('v.loudnoices'),component.get('v.delete'));
                        }
                        // end game function is updating the record of participant gameInfo like endDateTime.
                        if ((configdata.length - 1) == currentScreent) {                
                            //helper.saveAudioToSalesforce(component,component.get("v.participantGameid"), component.get("v.speechTaskRec"));
                            endGame(gameId, participantGameInfoId);
                            clearInterval(intervalTime);
                            return false;
                        }
                        //Change New Screen Default
                        if ((configdata.length - 1) > currentScreent) {
                            console.log('inside change New Screen Default');
                            if (configdata[currentScreent].endDuration != 0)
                                intervalTime = setTimeout(changeScreen, configdata[currentScreent].endDuration);

                            currentScreent = currentScreent + 1;
                            console.log('currentScreent after update'+currentScreent);
                        } else {
                            clearInterval(intervalTime);
                        }
                        inputdata = "";
                    }
                   changeScreen();
                   const delayprocess = ms => new Promise(res => setTimeout(res, ms));
                   function gamePlayEnter(){ 
                        console.log('inside gamePlayEnter');
                        //keybuttonEvent = true;
                        gamePlay({keyCode:13});                 
                    }                    
                    function gamePlay(e) {
                        command_value = e.keyCode;
                        inputdata = e.key;
                        totalKeyStrokesInRound = totalKeyStrokesInRound + 1;
                        let startDurations = configdata[currentScreent - 1].startDuration;
                        console.log('screen: '+ currentScreent);
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

                                if(currentScreent == 5 || currentScreent == 6 || currentScreent == 8 || currentScreent == 9){
                                    if(validateRadio(currentScreent)){
                                        document.getElementById("errormessage").classList.add("slds-hide");
                                        changeScreen();
                                    }else{
                                        document.getElementById("errormessage").classList.remove("slds-hide");
                                    }
                                
                                }
                                else{
                                    changeScreen();
                                }                             
                                
                            }                             
                        }
                    }
                    function startRecording() {      
                        const timerDisplay = document.getElementById("timer");                              
                        if(timerDisplay == null ){
                            /*const recordingContainer = document.getElementById('recording');
                            const existingAudioElement = recordingContainer.querySelector('audio');
                            if (existingAudioElement) {
                                recordingContainer.removeChild(existingAudioElement);                        
                            }*/
                            let canvas = document.getElementById('canvas');  
                            if (canvas.hasChildNodes()) {
                                canvas.removeChild(canvas.firstChild);
                            }
                            let micmessage = document.getElementById('micmessage');  
                            if (micmessage.hasChildNodes()) {
                                micmessage.removeChild(micmessage.firstChild);
                            }
                            console.log('inside timerDisplay == null');
                        }
                            let startTime;
                            let countdownId;
                            let secondsRemaining = 10; // 4 minutes
                            
                      
                            var RecordRTC = window.RecordRTC;                                
                                navigator.mediaDevices.getUserMedia({
                                    audio: true
                                }).then(function (stream) {
                                    if(stream){
                                        const audioTracks = stream.getAudioTracks();
                                        if (audioTracks.length > 0) {
                                            const audioTrack = audioTracks[0];
                                            const MicId = audioTrack.getSettings().deviceId;
                                            const MicLabel = audioTrack.label;
                                            console.log("Microphone Device ID: " + MicId);
                                            console.log("Microphone Label: " + MicLabel);
                                            component.set('v.MicId',MicId);
                                            component.set('v.MicLabel',MicLabel);
                                            let recorder = RecordRTC(stream, {
                                                type: 'audio'
                                            });
                                            recorder.startRecording();
                                            let volumesuff = 0;
                                            if(document.getElementById("timer") == null ){
                                                var startButton = document.getElementById("startButton");
                                                startButton.disabled = true;
                                                const audioContext = new AudioContext();
                                                const analyser = audioContext.createAnalyser();
                                                const microphone = audioContext.createMediaStreamSource(stream);

                                                // Connect the microphone to the analyser
                                                microphone.connect(analyser);

                                                // Set up the analyser to get frequency data
                                                analyser.fftSize = 256;
                                                const bufferLength = analyser.frequencyBinCount;
                                                const dataArray = new Uint8Array(bufferLength);

                                                // Function to update the volume level
                                                function updateVolume() {
                                                    analyser.getByteFrequencyData(dataArray);
                                                    const average = dataArray.reduce((acc, val) => acc + val, 0) / bufferLength;
                                                    console.log('Volume level:', average);

                                                    // Check if the volume level is at least 25%
                                                    if (average >= 25) {
                                                        console.log('Mic volume is sufficient.');
                                                        volumesuff++;
                                                    } else {
                                                        console.warn('Mic volume is below 25%. Please increase the volume.');
                                                        //errorRecording("You weren't loud enough, please move closer to your device and speak louder")
                                                    }
                                                }

                                                // Set up an interval to update the volume level periodically
                                                const intervalId = setInterval(updateVolume, 1000);
                                                setTimeout(() => {
                                                    clearInterval(intervalId); // Clear interval after 10 seconds
                                                  }, 10000)
                                                // new code form here for recording visualizer
                                                // Initialize the Web Audio API
                                                /*const audioContext = new AudioContext();
                                                const source = audioContext.createMediaStreamSource(stream);
                                                const analyser = audioContext.createAnalyser();
                                                source.connect(analyser);*/   
                           
                                                const canvas = document.createElement('canvas');
                                                canvas.width = 200;
                                                canvas.height = 100;
                                
                                                const canvasCtx = canvas.getContext('2d');
                                                document.getElementById("canvas").appendChild(canvas);
    
                                            function draw() {
                                                    const bufferLength = analyser.frequencyBinCount;
                                                    const dataArray = new Uint8Array(bufferLength);
                                                    analyser.getByteTimeDomainData(dataArray);
                                                    canvasCtx.fillStyle = 'rgb(106,103,151)';
                                                    canvasCtx.fillRect(0, 0, canvas.width, canvas.height);
                                                    canvasCtx.lineWidth = 2;
                                                    canvasCtx.strokeStyle = 'rgb(255,255,255)';
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
                                            }
                                            let time = 11000;
                                            if(document.getElementById("timer") != null){
                                                time = 10000;
                                                startTimer();
                                                //time = 240000;
                                                var Startrecording = document.getElementById("Startrecording");
                                                Startrecording.disabled = true;    
                                                Startrecording.innerHTML = "RECORDING IN PROGRESS!"; // Change the button text
                                                Startrecording.style.pointerEvents = 'none';  
                                                //Startrecording.style.backgroundColor = 'blue';
                                               // Startrecording.style.borderColor = 'blue';
                                                let Startrecordingdiv = document.getElementById("Startrecordingdiv");  
                                                Startrecordingdiv.classList.remove('magenta-btn');
                                                Startrecordingdiv.classList.add('magenta-btn-blue'); 
                                                console.log('isKeyboad' + isKeyboad);
                                                /*if (!isKeyboad) {                                                    
                                                    var clickEvent = new Event("click");
                                                    Startrecording.dispatchEvent(clickEvent);
                                                }*/
                                                               
                                            }
                                            /*else{
                                                document.getElementById("canvas").classList.remove("slds-hide");  
                                            }*/
                                            console.log(time);
                                            
                                            //document.getElementById("recordingindicator").classList.remove("slds-hide");                                    
                        
                                            function sleep(m) {
                                                return new Promise(function (resolve) {
                                                    setTimeout(resolve, m);
                                                });
                                            }
                        
                                            sleep(time).then(function () {
                                                recorder.stopRecording(function () {
                                                    //document.getElementById("recordingindicator").classList.add("slds-hide");                                        
                                                    let audioBlob = recorder.getBlob();                                            
                                                    const reader = new FileReader();
                                                    if(time == 10000){
                                                        var Startrecording = document.getElementById("Startrecording");                   
                                                        Startrecording.innerHTML = "RECORDING COMPLETE";  
                                                        Startrecording.style.pointerEvents = 'none';  
                                                        let Startrecordingdiv = document.getElementById("Startrecordingdiv");  
                                                        Startrecordingdiv.style.backgroundColor = 'green';
                                                        Startrecordingdiv.style.borderColor = 'green'; 
                                                        
                                                        console.log('isKeyboad' + isKeyboad);
                                                        /*if (!isKeyboad) {
                                                            const touchStartEvent = new Event('touchstart', { bubbles: true });
                                                            Startrecording.dispatchEvent(touchStartEvent);
                                                        } */                                                                                                
                                                        reader.onload = function (event) {
                                                            const base64Audio = event.target.result.split(',')[1];
                                                            component.set("v.speechTaskRec", base64Audio);
                                                            //console.log('base64Audio: ' + base64Audio);
                                                        // console.log('Speech task: ' + component.get("v.speechTaskRec"));
                                                        };
                                                        let nextBtton2 = document.getElementById('nextBtton2');
                                                        nextBtton2.classList.remove("slds-hide");    
                                                }
                                                else{
                                                        //document.getElementById("canvas").classList.add("slds-hide"); 
                                                        let canvas = document.getElementById('canvas');   
                                                        if (canvas.hasChildNodes()) {
                                                            canvas.removeChild(canvas.firstChild);
                                                        }
                                                        /*
                                                        startButton.disabled = false;
                                                        const audioUrl = URL.createObjectURL(audioBlob);                                            
                                                        const audioElement = document.createElement('audio');
                                                        audioElement.controls = true;
                                                        audioElement.src = audioUrl;
                                                        /*
                                                        /*const recordingContainer = document.getElementById('recording');
                                                        const existingAudioElement = recordingContainer.querySelector('audio');
                                                        if (existingAudioElement) {
                                                            // Remove the existing audio element
                                                            recordingContainer.removeChild(existingAudioElement);
                                                        }*/              
                                                        //document.getElementById('recording').appendChild(audioElement); 
                                                        //canvas.appendChild(audioElement);
                                                        console.log(volumesuff);
                                                        if(volumesuff<5){
                                                            errorRecording("You weren't loud enough, please move closer to your device and speak louder");
                                                        }
                                                        else{
                                                            let micImage = document.getElementById('micImage');
                                                            if(typeof(micImage) != 'undefined' && micImage != null){                       
                                                                micImage.src = '../resource/mindGamesImages/speechtask/Mic_success.png';  
                                                            } 
                                                            let nextBtton2 = document.getElementById('nextBtton2');
                                                            nextBtton2.classList.remove("slds-hide");    
                                                        }

                                                }
                                                    reader.onerror = function (event) {
                                                        console.error('Error reading Blob:', event.target.error);
                                                    };
                        
                                                    reader.readAsDataURL(audioBlob);
                                                });
                                            });
                                        } 
                                        else{
                                            console.error("No audio tracks available in the stream.");
                                            errorRecording("We didn't detect any sound - make sure your mic is on and unmuted");
                                        }
                                    }
                                    else{
                                        console.error("No stream available. Check your microphone and permissions."); 
                                        errorRecording("We didn't detect any sound - make sure your mic is on and unmuted");
                                    }
                            })
                                .catch(function (error) {
                                    console.error('Error starting recording:', error);
                                    errorRecording("We didn't detect any sound - make sure your mic is on and unmuted");
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

                            function errorRecording(msg) {
                                let micImage = document.getElementById('micImage');
                                if(typeof(micImage) != 'undefined' && micImage != null){                       
                                    micImage.src = '../resource/mindGamesImages/speechtask/Mic_error.png';  
                                    let micmessage = document.getElementById('micmessage');   
                                    /*if (canvaselement.hasChildNodes()) {
                                        canvaselement.removeChild(canvaselement.firstChild);
                                    }*/                                              
                                    micmessage.innerHTML=msg; 
                                    var startButton = document.getElementById("startButton");
                                    startButton.disabled = false;
                                } 
                            }
                               
                    }
                    function validateRadio(currScreent) {
                        let isValid = true;
                        console.log('inside validateRadio');
                        const radio71 = document.getElementById("radio-71");
                        const radio72 = document.getElementById("radio-72");  
                        console.log(radio71);                  

                        if (radio71.checked || radio72.checked) {       
                            //radio71.setCustomValidity('');     
                            console.log("Radio button 71 is checked");  
                            radio71.classList.remove('slds-has-error');
                            radio72.classList.remove('slds-has-error');  
                                      
                        } else {    
                            //radio71.setCustomValidity('Required'); 
                            //radio71.reportValidity();
                            isValid = false;
                            radio71.classList.add('slds-has-error');
                            radio72.classList.add('slds-has-error');
                        }

                        if(currScreent == 5 || currScreent == 8){
                            const radio73 = document.getElementById("radio-73");
                            const radio74 = document.getElementById("radio-74");
                            const radio75 = document.getElementById("radio-75");
                            const radio76 = document.getElementById("radio-76");
                            if (radio73.checked || radio74.checked) {       
                                //radio73.setCustomValidity('');     
                                console.log("Radio button 73 is checked");
                                radio73.classList.remove('slds-has-error');
                                radio74.classList.remove('slds-has-error');           
                            } else {    
                                //radio73.setCustomValidity('Required'); 
                                //radio73.reportValidity();
                                isValid = false;
                                radio73.classList.add('slds-has-error');
                                radio74.classList.add('slds-has-error');
                            }
                            if (radio75.checked || radio76.checked) {       
                                //radio75.setCustomValidity('');     
                                console.log("Radio button 75 is checked");   
                                radio75.classList.remove('slds-has-error');
                                radio76.classList.remove('slds-has-error');           
                            } else {    
                                //radio75.setCustomValidity('Required'); 
                                //radio75.reportValidity();
                                isValid = false;
                                radio75.classList.add('slds-has-error');
                                radio76.classList.add('slds-has-error');
                            }
                        }
                        console.log('isValid: '+isValid);
                        return isValid;
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
    },

    onMicrophoneSelect: function(component, event, helper) {
        component.set("v.selectedMicrophone", event.getSource().get("v.value"));
    }
})