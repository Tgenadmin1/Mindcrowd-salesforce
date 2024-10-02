({
    myAction: function (component, event, helper) {
        var timeS = new Date().getTime();
        const url = new URL(window.location.href);
        const resourceUrl = $A.get("$Label.c.Community_Url")+ $A.get("$Label.c.speechTask2_config_url")+'?test='+timeS;
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
        var gameNameScientific = $A.get("$Label.c.scientific_game_Tell_me_more");
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
        const lang =document.getElementsByTagName("html")[0].getAttribute("lang");
        let userContactId,base64Audio,audioBlob;
        const speecherror1 = $A.get("$Label.c.speechTask_error_label");
        const speecherror2 = $A.get("$Label.c.speechTask_error_label2");
        const speechlabel1 = $A.get("$Label.c.speechTask_label_1");
        const speechlabel2 = $A.get("$Label.c.speechTask_label_2");
        actionGame.setCallback(this, function (a) {
            var state = a.getState();
            if (state === "SUCCESS") {
                var name = a.getReturnValue();                
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
                    let currentScreent = 0;
                    if (cs != null) {
                        currentScreent = Number(cs);
                    }
                    let intervalTime = null;
                    let timedata = new Date();
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
                  
                    preloadImage([
                        "Mic_click.png",
                        "Mic_error.png",
                        "Mic_success.png",
                        "Mic_click_ES.png",
                        "Mic_error_ES.png"]);

                   function endGame(gameId, participantGameInfoId) {
                        var endDateTime = new Date();
                        var gamePlayStatus = "Completed";
                        var screenResolution = {"height" :screenHeight, "width" :screenWidth };                        
                        helper.participantGameInfoUpdate(component, event, helper, userContactId,language, gameId, endDateTime, gamePlayStatus, participantGameInfoId, screenResolution);//helper method calling here.
                    }
                    //this function works for initialize processing.
                    function changeScreen() {
                        component.set('v.currScreen', currentScreent);
                        //console.log('currentScreent: '+ currentScreent);
                        gameId = component.get("v.myAttribute");
                        userContactId = component.get("v.mycontactId");
                        ipAddress = component.get("v.ipAddress");
                        browserName = component.get("v.browser");
                        participantGameInfoId = component.get("v.participantGameid");//participantGameInfoId holds the participantgameinfo record id.
                        timedata = new Date();                       
                        if (currentScreent == 5) { 
                            component.set('v.otherlanguage',document.getElementById("radio-71").checked);
                            component.set('v.othervoices',document.getElementById("radio-73").checked);
                            component.set('v.loudnoices',document.getElementById("radio-75").checked);
                        }
                        if (currentScreent != 6){
                            document.getElementById("datablock").innerHTML = configdata[currentScreent].content;
                        }                        
                        let userenterbtn= document.getElementById("enterbtn");
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
                            nextBtton2.classList.toggle("hidden", true);
                            checkbox.addEventListener('click', function() { 
                            nextBtton2.classList.toggle("hidden", !checkbox.checked);
                            });   
                        }                     
                        if(currentScreent == 1 || currentScreent == 3){
                            let startButton= document.getElementById("startButton");
                             if(typeof(startButton) != 'undefined' && startButton != null){                       
                                startButton.removeEventListener('click',startRecording,false);
                                startButton.addEventListener('click',startRecording,false); 
                            } 
                            let nextBtton2 = document.getElementById('nextBtton2');
                            nextBtton2.classList.add("slds-hide");
                            if(currentScreent == 3){
                                let startrecording= document.getElementById("Startrecording");
                            if(typeof(startrecording) != 'undefined' && startrecording != null){   
                                    //console.log('inside startrecording');                    
                                    startrecording.removeEventListener('click',startRecording,false);
                                    startrecording.addEventListener('click',startRecording,false); 
                                }
                            }
                        }
                        if (currentScreent == 2 ) {
                            var startDateTime = new Date();
                            var gamePlayStatus = "Not-Completed";
                            var screenResolution = {"height" :screenHeight, "width" :screenWidth };
                            helper.participantGameInfo(component, event, helper, userContactId,language, gameId, startDateTime, gamePlayStatus, ipAddress, browserName, device, screenResolution);
                        }
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
                    }
                   changeScreen();            
                   function gamePlayEnter(){                         
                        gamePlay({keyCode:13});                 
                    }                    
                    function gamePlay(e) {
                        command_value = e.keyCode;             
                            if (configdata[currentScreent - 1].hasOwnProperty("command") && command_value >= configdata[currentScreent - 1].command[0] && command_value <= configdata[currentScreent - 1].command[1]) {
                                clearInterval(intervalTime);
                                if(currentScreent == 5 || currentScreent == 6){
                                    if(validateRadio(currentScreent)){
                                        document.getElementById("errormessage").classList.add("slds-hide");
                                        if (currentScreent == 6 ) {         
                                            const isconsent = document.getElementById("radio-71").checked;             
                                            helper.updateSpeechTaskPGI(component,component.get("v.participantGameid"), 'Memory', 
                                            component.get('v.otherlanguage'),component.get('v.othervoices'),component.get('v.loudnoices'),isconsent,audioBlob,configdata);
                                        }
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
                    function startRecording() {      
                        const timerDisplay = document.getElementById("timer");                              
                        if(timerDisplay == null){
                            let canvas = document.getElementById('canvas');  
                            if (canvas.hasChildNodes()) {
                                canvas.removeChild(canvas.firstChild);
                            }
                            let micmessage = document.getElementById('micmessage');  
                            if (micmessage.hasChildNodes()) {
                                micmessage.removeChild(micmessage.firstChild);
                            }
                        }
                            let startTime;
                            let countdownId;
                            let secondsRemaining = 241; // 4 minutes   
                                navigator.mediaDevices.getUserMedia({
                                    audio: true
                                }).then(function (stream) {                                   
                                    if(stream){
                                        const audioTracks = stream.getAudioTracks();
                                        if (audioTracks.length > 0) {
                                            const audioTrack = audioTracks[0];
                                            const MicId = audioTrack.getSettings().deviceId;
                                            const MicLabel = audioTrack.label;                 
                                            component.set('v.MicId',MicId);
                                            component.set('v.MicLabel',MicLabel);
                                            let recorder = window.RecordRTC(stream, {
                                                type: 'audio',
                                                mimeType: 'audio/webm'
                                            });
                                            recorder.startRecording();
                                            let volumesuff = 0;
                                            if(document.getElementById("timer") == null ){
                                                var startButton = document.getElementById("startButton");
                                                startButton.disabled = true;
                                                const audioContext = new AudioContext();
                                                const analyser = audioContext.createAnalyser();
                                                const microphone = audioContext.createMediaStreamSource(stream);                                                
                                                microphone.connect(analyser);// Connect the microphone to the analyser                                                
                                                analyser.fftSize = 256;// Set up the analyser to get frequency data
                                                const bufferLength = analyser.frequencyBinCount;
                                                const dataArray = new Uint8Array(bufferLength);
                                                // Function to update the volume level
                                                function updateVolume() {
                                                    analyser.getByteFrequencyData(dataArray);
                                                    const average = dataArray.reduce((acc, val) => acc + val, 0) / bufferLength;
                                                    //console.log('Volume level:', average);                                                    
                                                    if (average >= 20) { // Check if the volume level is at least 25%                             
                                                        volumesuff++;
                                                    } else {
                                                        console.warn('Mic volume is below 25%. Please increase the volume.');
                                                        //errorRecording("You weren't loud enough, please move closer to your device and speak louder")
                                                    }
                                                }                                                
                                                const intervalId = setInterval(updateVolume, 1000);// Set up an interval to update the volume level periodically
                                                setTimeout(() => {
                                                    clearInterval(intervalId); // Clear interval after 5 seconds
                                                  }, 5000);
                                                const canvas = document.createElement('canvas');
                                                canvas.width = 200;
                                                canvas.height = 100;                                
                                                const canvasCtx = canvas.getContext('2d');
                                                const micImage = document.getElementById('micImage');
                                                if(typeof(micImage) != 'undefined' && micImage != null){      
                                                    if(lang == "es" && micImage.src !='../resource/mindGamesImages/speechtask/Mic_click_ES.png'){
                                                        micImage.src = '../resource/mindGamesImages/speechtask/Mic_click_ES.png';        
                                                    } 
                                                    if(lang == "en-US" && micImage.src !='../resource/mindGamesImages/speechtask/Mic_click.png'){
                                                        micImage.src = '../resource/mindGamesImages/speechtask/Mic_click.png'; 
                                                    } 
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
                                            }
                                            let time = 5000;
                                            if(document.getElementById("timer") != null || currentScreent == 3){
                                                time = 240000;
                                                startTime = null;
                                                startTimer();
                                                var Startrecording = document.getElementById("Startrecording");
                                                Startrecording.disabled = true;    
                                                Startrecording.innerHTML = speechlabel1; // Change the button text
                                                Startrecording.style.pointerEvents = 'none';  
                                                let Startrecordingdiv = document.getElementById("Startrecordingdiv");  
                                                Startrecordingdiv.classList.remove('magenta-btn');
                                                Startrecordingdiv.classList.add('magenta-btn-blue');                                                                                                             
                                            }   

                                            async function sleep(ms) {
                                                const startTime = Date.now();
                                                while (Date.now() - startTime < ms) {
                                                  await new Promise(resolve => setTimeout(resolve, 0));
                                                }
                                            }
                                            if(time == 5000){
                                                sleep(time).then(function () {
                                                    recorder.stopRecording(function () {                                       
                                                        audioBlob = recorder.getBlob();                                            
                                                        const reader = new FileReader();
                                                            let canvas = document.getElementById('canvas');   
                                                            if (canvas.hasChildNodes()) {
                                                                canvas.removeChild(canvas.firstChild);
                                                            }
                                                            //console.log(volumesuff);
                                                            if(volumesuff<2){
                                                                errorRecording(speecherror1);
                                                            }
                                                            else{
                                                                let micImage = document.getElementById('micImage');
                                                                micImage.src = '../resource/mindGamesImages/speechtask/Mic_success.png';
                                                                let nextBtton2 = document.getElementById('nextBtton2');
                                                                nextBtton2.classList.remove("slds-hide");                                                               
                                                            }                                                        
                                                        reader.onerror = function (event) {
                                                            console.error('Error reading Blob:', event.target.error);
                                                        };
                            
                                                        reader.readAsDataURL(audioBlob);
                                                    });
                                                });
                                            }

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
                                                    recorder.stopRecording(function () {                                       
                                                        audioBlob = recorder.getBlob();                                            
                                                        const reader = new FileReader();
                                                        var Startrecording = document.getElementById("Startrecording");                   
                                                        Startrecording.innerHTML = speechlabel2;  
                                                        Startrecording.style.pointerEvents = 'none';  
                                                        let Startrecordingdiv = document.getElementById("Startrecordingdiv");  
                                                        Startrecordingdiv.style.backgroundColor = 'green';
                                                        Startrecordingdiv.style.borderColor = 'green';                                                                                                                                                 
                                                        reader.onload = function (event) {
                                                            base64Audio = event.target.result.split(',')[1];                                                            
                                                        };
                                                        let nextBtton2 = document.getElementById('nextBtton2');
                                                        nextBtton2.classList.remove("slds-hide"); 
                                                        reader.onerror = function (event) {
                                                            console.error('Error reading Blob:', event.target.error);
                                                        };
                            
                                                        reader.readAsDataURL(audioBlob);
                                                    });
                                                } else {
                                                    countdownId = requestAnimationFrame(updateTimer);
                                                }
                                            }
                                        } 
                                        else{
                                            console.error("No audio tracks available in the stream.");
                                            errorRecording(speecherror2);
                                        }
                                    }
                                    else{
                                        console.error("No stream available. Check your microphone and permissions."); 
                                        errorRecording(speecherror2);
                                    }
                            })
                                .catch(function (error) {
                                    console.error('Error starting recording:', error);
                                    errorRecording(speecherror2);
                                });         

                            function errorRecording(msg) {
                                let micImage = document.getElementById('micImage');
                                if(typeof(micImage) != 'undefined' && micImage != null){    
                                    if(lang == "es"){
                                        micImage.src = '../resource/mindGamesImages/speechtask/Mic_error_ES.png';  
                                    }     
                                    else{
                                        micImage.src = '../resource/mindGamesImages/speechtask/Mic_error.png'; 
                                    }    
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