({
    myAction: function (component, event, helper) {
        var timeS = new Date().getTime();
        const url = new URL(window.location.href);
        const resourceUrl = $A.get("$Label.c.Community_Url")+ $A.get("$Label.c.speechTask2_config_url")+'?test='+timeS;
        console.log(resourceUrl);
       
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
        var gameNameScientific = $A.get("$Label.c.scientific_speech_task2");    
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
                console.log('name: '+JSON.stringify(name));
                var language = name['Language__c'];
                if (name['Tell_Me_More__c'] == 'Locked' && pageUrl[1] == $A.get("$Label.c.url_me_speechTaskTellMeMore")) {
                    component.set('v.showConfirmDialog', true);
                }
                else if (name['Tell_Me_More__c'] == 'Completed' && pageUrl[1] == $A.get("$Label.c.url_me_speechTaskTellMeMore")) {
                    component.set('v.showConfirmDialog', true);
                }
                // full game code is started from else part.===========================
                else if (name['Tell_Me_More__c'] == 'Opened' && pageUrl[1] == $A.get("$Label.c.url_me_speechTaskTellMeMore")) {
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
                    let intervalTime = null;
                    let timedata = new Date();
                    let command_value = 0;
                    let inputdata = "";
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

                    let bgimages = [];
                    var imgContainer = document.getElementById('imgContainer');
                    function preloadImage(imgdata) {
                        for (var i = 0; i < imgdata.length; i++) {
                            bgimages[i] = new Image();
                            bgimages[i].src = '../s/sfsites/c/resource/mindGamesImages/speechtask/' + imgdata[i];
                            imgContainer.appendChild(bgimages[i]);
                        }
                    }
                    //Loading Game related Images.
                    preloadImage([
                        "Mic_click.png",
                        "Mic_error.png",
                        "Mic_success.png"
                    ]
                    );

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
                        if (currentScreent-1 == 4) { 
                            console.log('otherlanguage: ' + document.querySelector('input[name="otherlanguage"]').checked);
                            component.set('v.otherlanguage',document.querySelector('input[name="otherlanguage"]').checked);
                            component.set('v.othervoices',document.querySelector('input[name="othervoices"]').checked);
                            component.set('v.loudnoices',document.querySelector('input[name="loudnoices"]').checked);
                        }
                        if (currentScreent-1 == 5) { 
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
                        if (currentScreent == configdata.length-1) {
                            document.getElementById("nextBtton").classList.remove("slds-hide");
                            window.removeEventListener('keyup', gamePlay, false);
                        }
                        if (configdata[currentScreent].instructionsLeft == true) {
                            document.getElementById("gameMainContent").classList.add("instructionsLeft");
                        } else {
                            document.getElementById("gameMainContent").classList.remove("instructionsLeft");
                        }
                        if (currentScreent == 0 ) {                            
                            let nextBtton2 = document.getElementById('nextBtton2');
                            const checkbox = document.getElementById('checkbox-unique-id-83');
                            //nextBtton2.style.display = "none";
                            //nextBtton2.classList.add("slds-hide");
                            nextBtton2.classList.toggle("hidden", true);
                            console.log('inside currentScreent0');
                            checkbox.addEventListener('click', function() { 
                                nextBtton2.classList.toggle("hidden", !checkbox.checked);
                                //nextBtton2.style.display = checkbox.checked ? "block" : "none";                                            
                               /* if (checkbox.checked) {
                                    nextBtton2.classList.remove("slds-hide");
                                } else {
                                    nextBtton2.classList.add("slds-hide");
                                }*/
                            });   
                        }                     
                        if(currentScreent == 1 || currentScreent == 3){
                            console.log('inside 136');  
                            let startButton= document.getElementById("startButton");
                             if(typeof(startButton) != 'undefined' && startButton != null){                       
                                startButton.removeEventListener('click',startRecording,false);
                                startButton.addEventListener('click',startRecording,false); 
                            } 
                            let nextBtton2 = document.getElementById('nextBtton2');
                            nextBtton2.classList.add("slds-hide");
                            if(currentScreent == 3){
                                let startrecording= document.getElementById("Startrecording");
                                console.log(startrecording);
                                if(typeof(startrecording) != 'undefined' && startrecording != null){   
                                    console.log('inside startrecording');                    
                                    startrecording.removeEventListener('click',startRecording,false);
                                    startrecording.addEventListener('click',startRecording,false); 
                                }
                            }
                        }
                       else{  
                        }
                        if (currentScreent == 2 ) {
                            var startDateTime = new Date();
                            var gamePlayStatus = "Not-Completed";
                            var screenResolution = {"height" :screenHeight, "width" :screenWidth };
                            helper.participantGameInfo(component, event, helper, userContactId,language, gameId, startDateTime, gamePlayStatus, ipAddress, browserName, device, screenResolution);
                            console.log('inside speech task html');   
                        }
                        if (currentScreent == 6 ) {                   
                            helper.saveAudioToSalesforce(component,component.get("v.participantGameid"), component.get("v.speechTaskRec"),'Memory', 
                            component.get('v.otherlanguage'),component.get('v.othervoices'),component.get('v.loudnoices'),component.get('v.delete'));
                        }
                        if ((configdata.length - 1) == currentScreent) {   
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

                                if(currentScreent == 5 || currentScreent == 6){
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
                            let secondsRemaining = 90; // 4 minutes                            
                      
                            //var RecordRTC = window.RecordRTC;   
                            //console.log('RecordRTC: '+RecordRTC);                             
                                navigator.mediaDevices.getUserMedia({
                                    audio: true
                                }).then(function (stream) {
                                    console.log('inside getUserMedia');
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
                                            let recorder = window.RecordRTC(stream, {
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
                                                    clearInterval(intervalId); // Clear interval after 5 seconds
                                                  }, 5000) 
                           
                                                const canvas = document.createElement('canvas');
                                                canvas.width = 200;
                                                canvas.height = 100;
                                
                                                const canvasCtx = canvas.getContext('2d');
                                                const micImage = document.getElementById('micImage');
                                                if(typeof(micImage) != 'undefined' && micImage != null &&  micImage.src !='../resource/mindGamesImages/speechtask/Mic_click.png'){                       
                                                    micImage.src = '../resource/mindGamesImages/speechtask/Mic_click.png';  
                                                }                                                 
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
                                            let time = 5000;
                                            if(document.getElementById("timer") != null){
                                                time = 90000;
                                                startTimer();
                                                var Startrecording = document.getElementById("Startrecording");
                                                Startrecording.disabled = true;    
                                                Startrecording.innerHTML = "RECORDING IN PROGRESS!"; // Change the button text
                                                Startrecording.style.pointerEvents = 'none';  
                                                let Startrecordingdiv = document.getElementById("Startrecordingdiv");  
                                                Startrecordingdiv.classList.remove('magenta-btn');
                                                Startrecordingdiv.classList.add('magenta-btn-blue'); 
                                                console.log('isKeyboad' + isKeyboad);                                                               
                                            }                                 
                        
                                            function sleep(m) {
                                                return new Promise(function (resolve) {
                                                    setTimeout(resolve, m);
                                                });
                                            }
                        
                                            sleep(time).then(function () {
                                                recorder.stopRecording(function () {                                       
                                                    let audioBlob = recorder.getBlob();                                            
                                                    const reader = new FileReader();
                                                    if(time == 90000){
                                                        var Startrecording = document.getElementById("Startrecording");                   
                                                        Startrecording.innerHTML = "RECORDING COMPLETE";  
                                                        Startrecording.style.pointerEvents = 'none';  
                                                        let Startrecordingdiv = document.getElementById("Startrecordingdiv");  
                                                        Startrecordingdiv.style.backgroundColor = 'green';
                                                        Startrecordingdiv.style.borderColor = 'green'; 
                                                        
                                                        console.log('isKeyboad' + isKeyboad);                                                                                              
                                                        reader.onload = function (event) {
                                                            const base64Audio = event.target.result.split(',')[1];
                                                            component.set("v.speechTaskRec", base64Audio);
                                                        };
                                                        let nextBtton2 = document.getElementById('nextBtton2');
                                                        nextBtton2.classList.remove("slds-hide");                                                          
                                                }
                                                else{
                                                        let canvas = document.getElementById('canvas');   
                                                        if (canvas.hasChildNodes()) {
                                                            canvas.removeChild(canvas.firstChild);
                                                        }
                                                        console.log(volumesuff);
                                                        if(volumesuff<3){
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
                                    micmessage.innerHTML=msg; 
                                    var startButton = document.getElementById("startButton");
                                    startButton.disabled = false;
                                } 
                            }                               
                    }

                    function validateRadio(currScreent) {
                        let isValid = true;
                        const radio71 = document.getElementById("radio-71");
                        const radio72 = document.getElementById("radio-72");  
        
                        if (!radio71.checked && !radio72.checked) {       
                            isValid = false;                                      
                        }

                        if(currScreent == 5){
                            const radio73 = document.getElementById("radio-73");
                            const radio74 = document.getElementById("radio-74");
                            const radio75 = document.getElementById("radio-75");
                            const radio76 = document.getElementById("radio-76");
                            if (!radio73.checked && !radio74.checked) {       
                                isValid = false;                                      
                            }    
                            if (!radio75.checked && !radio76.checked) {       
                                isValid = false;                                      
                            }    
                        }
                        return isValid;
                    }                    
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