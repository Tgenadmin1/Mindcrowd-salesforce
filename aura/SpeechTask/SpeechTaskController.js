({
    doInit: function(component, event, helper) {
        // Fetch available microphones and populate the microphones attribute
        // Use browser APIs to fetch available microphones
        console.log('OnInit');
        navigator.mediaDevices.getUserMedia({ audio: true })
        .then(stream => {
            // User has granted permission, you can now access the microphone
            // Use the stream to handle recording or other audio-related tasks

            navigator.mediaDevices.enumerateDevices()
            .then(devices => {
                const microphones = devices.filter(device => device.kind === 'audioinput');
                component.set("v.microphones", microphones);
            })
            .catch(error => {
                console.error('Error fetching microphones:', error);
            });
        })
        .catch(error => {
            // User has denied permission or an error occurred
            console.error('Error getting user media:', error);
        });

    },

    onMicrophoneSelect: function(component, event, helper) {
        component.set("v.selectedMicrophone", event.getSource().get("v.value"));
    },

    testMicrophone: function(component, event, helper) {
        component.set("v.isRecording", true);
        component.set('v.speechTextspanish','');
        component.set('v.speechTexteng', '');

        navigator.mediaDevices.getUserMedia({ audio: true })
            .then(stream => {
                console.log('Inside testMicrophone');
                const recognition = new webkitSpeechRecognition();
                let lang = event.getSource().getLocalId();
                if(lang=='english')
                {
                    console.log(lang);
                    recognition.lang = 'en-US';
                }
                else{
                    console.log(lang);
                    recognition.lang = 'es'; 
                }
                
                recognition.continuous = true;
                const mediaRecorder = new MediaRecorder(stream);
                const recordedChunks = [];

                mediaRecorder.ondataavailable = event => {
                    if (event.data.size > 0) {
                        console.log('inside on data available');
                        recordedChunks.push(event.data);
                    }
                };

                mediaRecorder.onstop = () => {
                    const audioBlob = new Blob(recordedChunks, { type: 'audio/wav' });
                    const audioUrl = URL.createObjectURL(audioBlob);        
                    component.set("v.recordedAudioUrl", audioUrl);
                    component.set("v.isRecording", false);
                    console.log('audioUrl:', audioUrl);

                    recognition.stop();

                    const reader = new FileReader();        
                    reader.onload = function(event) {
                        const contents = event.target.result;
                        //console.log('Blob Contents:', contents);
                    };                    
                    reader.onerror = function(event) {
                        console.error('Error reading Blob:', event.target.error);
                    };
                    
                    reader.readAsText(audioBlob);

                };

                let speechTexteng;
                let speechTextspanish;
                
                recognition.onresult = event => {
                    const transcript = event.results[event.results.length - 1][0].transcript;
                    console.log('Real-time Transcript:', transcript);
                    if(lang=='english'){
                        speechTexteng = component.get('v.speechTexteng');
                        component.set('v.speechTexteng',speechTexteng+' '+transcript);
                    }
                    else{
                        speechTextspanish = component.get('v.speechTextspanish');
                        component.set('v.speechTextspanish',speechTextspanish+' '+transcript);
                    }
                    
                    
                    
                   
                      
                    // Handle the real-time transcript, e.g., update a component attribute
                    // component.set("v.realTimeTranscript", transcript);
                };

                recognition.onerror = event => {
                    console.error('Recognition error:', event.error);
                };

                mediaRecorder.start();
                recognition.start();
                setTimeout(() => {
                    console.log('Stopping recording');
                    mediaRecorder.stop();
                }, 60000); // Record for 10 seconds


            })
            .catch(error => {
                console.error('Error starting recording:', error);
                component.set("v.isRecording", false);
            });
    },

    playRecording: function(component, event, helper) {
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
    },

    saveMicrophone: function(component, event, helper) {
        // You can directly use the selectedMicrophone attribute for further processing or UI updates
    }
})