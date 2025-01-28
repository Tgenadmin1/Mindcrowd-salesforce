({//this function is used forcreating the games record for every slide.
    recorData: function(component, event,helper,userContactId,gameId,questionNumber,userInput,isCorrect,reactionTime,isPracticeQuestion,correctAnswer,participantGameInfoId,round,Limage,Rimage){
       let images={};
       images['leftImage'] = Limage;
       images['rightImage'] = Rimage;
       var userResponseString=JSON.stringify(images);
        let data = {
            Contact_Name__c:userContactId,
            Game_Name__c:gameId,
            Question_Number__c:questionNumber,
            Participant_Response__c:userInput,
            Is_Correct__c:isCorrect,
            Reaction_Time_in_ms__c:reactionTime,
            Is_Practice_Question__c:isPracticeQuestion,
            Right_Answer__c:correctAnswer,
            Participant_Game_InfoID__c:participantGameInfoId,
            Round__c:round,
            ImageName__c:userResponseString
        };
        //console.log('data is : ',data);
        var action = component.get("c.saveGameResponse");
        action.setParams({"sobj":JSON.stringify(data)}); 
        //console.log('question: ' + questionNumber +' responce: '+ userInput +' correct: '+ isCorrect +'time: '+reactionTime);
     
        action.setCallback(this,function(Response) {            
            var state = Response.getState();
            //console.log('hi i am in setcallback-------');
            if (state === "SUCCESS") {
                var name = Response.getReturnValue();   
                //console.log('name:=========',name);
            }
            else if(state==="ERROR"){
                let message='';
                let errors = Response.getError();
                //console.log('record data value',errors);
                if (errors && Array.isArray(errors) && errors.length > 0) {
                    message = errors[0].message;
                }
                //console.error(message);
            }
        });
        // $A.enqueueAction(action); 

        $A.getCallback(function() {
            $A.enqueueAction(action);
        })();

    },

    //this function get the game id from the server.
    gameDetails: function(component, event, helper,gameNameScientific) {
        var ConList = component.get("c.getGameId");
        ConList.setParams({"gameName":gameNameScientific}); 
        ConList.setCallback(this, function(a) 
                                    {
                                        var state = a.getState();
                                        if (state === "SUCCESS") {
                                            var name = a.getReturnValue();
                                            component.set("v.myAttribute",name);     
                                        }
                                        else if(state==="ERROR"){
                                            let message='';
                                            let errors = a.getError();
                                            if (errors && Array.isArray(errors) && errors.length > 0) {
                                                message = errors[0].message;
                                            }
                                            //console.error(message);
                                        }
                                    });
        // $A.enqueueAction(ConList);
        $A.getCallback(function() {
            $A.enqueueAction(ConList);
        })();
    },
    //this function is used for getting the contactID using the userid.
    userDetails: function(component, event, helper,currentUserId) 
    { 
        var ConList = component.get("c.getContactId");
        ConList.setParams({"currentUserid":currentUserId});
        ConList.setCallback(this, function(a) 
                                    {
                                        var state = a.getState();
                                        if (state === "SUCCESS") {
                                            var name = a.getReturnValue();
                                            component.set("v.mycontactId",name);      
                                        }
                                        else if(state==="ERROR"){
                                            let message='';
                                            let errors = a.getError();
                                            if (errors && Array.isArray(errors) && errors.length > 0) {
                                                message = errors[0].message;
                                            }
                                            //console.error(message);
                                        }
                                    });
        // $A.enqueueAction(ConList);
        $A.getCallback(function() {
            $A.enqueueAction(ConList);
        })();
    },

    //this function create the participantgameinfo record.
        participantGameInfo: function(component,event,helper,userContactId,language,gameId,startDateTime,gamePlayStatus,ipAddress,browserName,device, screenResolution) {
            console.log('browserName = ', browserName, " device = ", device, "deviceResol = ", screenResolution);
            let data = {
                Contact_Name__c:userContactId,
                Game_Name__c:gameId,
                Language__c:language,
                Start_Date_Time__c:startDateTime,
                Game_Play_Status__c:gamePlayStatus,
                Browser_User_Agent__c:browserName,
                IP_Address__c:ipAddress,
                User_Device__c:device,
                User_Agent__c: navigator.userAgent,
                Device_Screen_Size__c: JSON.stringify(screenResolution)            
            };
        var action = component.get("c.participantGameInfoDetail");
        action.setParams({"sobj":JSON.stringify(data)});
        action.setCallback(this,function(a) 
            {    
                var state = a.getState();
                    if (state === "SUCCESS") {
                        var name = a.getReturnValue(); 
                        component.set("v.participantGameid",name);
                        var participantGameInfoId=name;  
                        this.gameNameInParticipantGameInfo(component, event, helper, userContactId, gameId, participantGameInfoId, ipAddress, browserName, device);
                        //console.log('participant game info id------:',name,state);       
                    }
                    else if(state==="ERROR"){
                        let message='';
                        let errors = a.getError();
                        if (errors && Array.isArray(errors) && errors.length > 0) {
                            message = errors[0].message;
                        }
                        //console.error(message);
                    }
                    else{
                        //console.log('else part');
                    }
            });
        try{
            $A.getCallback(function() {
                $A.enqueueAction(action);
            })();
            // $A.enqueueAction(action);

        }
        catch( e){
            //console.log(e.message);
        }
        
    },

     //this function update the gameid into the participantGameinfo object.
    gameNameInParticipantGameInfo: function(component,event,helper,userContactId,gameId,participantGameInfoId,ipAddress,browserName,device) {  
        console.log('browserName = ', browserName, " device = ", device);
        let data = {
            Contact_Name__c:userContactId,
            Game_Name__c:gameId,
            Id:participantGameInfoId,
            Browser_User_Agent__c:browserName,
            IP_Address__c:ipAddress,
            User_Device__c:device,
            User_Agent__c: navigator.userAgent
        };
        var action = component.get("c.gameNameInParticipantGameInfoUpdate");
        action.setParams({"sobj":JSON.stringify(data)});
        action.setCallback(this,function(a) 
        {      
        var state = a.getState();
                if (state === "SUCCESS") {
                    var name = a.getReturnValue();   
                    //console.error('success: ');        
                }
                else if(state==="ERROR"){
                    let message='';
                    let errors = a.getError();
                    if (errors && Array.isArray(errors) && errors.length > 0) {
                        message = errors[0].message;
                    }
                    //console.error(message);
                }
                else{
                    //console.log('error');
                }
        });
        try{
            $A.getCallback(function() {
                $A.enqueueAction(action);
            })();
            // $A.enqueueAction(action);
        }
        catch( e){
            //console.log(e.message);
        }
    },
    
     //this fucntion update the participantgameinfo record's field like as endDatetime.
    participantGameInfoUpdate: function(component,event,helper,userContactId,language,gameId,endDateTime,gamePlayStatus,participantGameInfoId,screenResolution) {
        let data = {
            Contact_Name__c:userContactId,
            Game_Name__c:gameId,
            Language__c:language,
            End_Date_Time__c:endDateTime,
            Game_Play_Status__c:gamePlayStatus,
            Id:participantGameInfoId,
            Device_Screen_Size__c: JSON.stringify(screenResolution)    
        };
        var action = component.get("c.participantGameInfoUpdate");
        action.setParams({"sobj":JSON.stringify(data)});
        action.setCallback(this,function(a) 
            {      
            var state = a.getState();
                    if (state === "SUCCESS") {
                        var name = a.getReturnValue(); 
                        component.set("v.participantGameid",name);            
                    }
                    else if(state==="ERROR"){
                        let message='';
                        let errors = a.getError();
                        if (errors && Array.isArray(errors) && errors.length > 0) {
                            message = errors[0].message;
                        }
                        //console.error(message);
                    }
                    else{
                        //console.log('error');
                    }
        });
        try{
            // $A.enqueueAction(action);
            $A.getCallback(function() {
                $A.enqueueAction(action);
            })();
        }
        catch( e){
            //console.log(e.message);
        }
    },
    //This function getting the ip address of gueat user devise.
    getIpAddress: function(component, event, helper){
        var action = component.get('c.getIpCustomLoginUser');
            action.setCallback(this, function(response) {
                var state = response.getState();
                if (state === "SUCCESS") {
                    var ipAdd = response.getReturnValue();
                    component.set("v.ipAddress",ipAdd);
                }
                else if (state === "INCOMPLETE") {
                    //console.log("Unknown error");
                }
                else if (state === "ERROR") {
                    var errors = response.getError();
                    if (errors) {
                        if (errors[0] && errors[0].message) {
                                //console.log("Error message: " + errors[0].message);
                        }
                        } else {
                            //console.log("Unknown error");
                            }
                }
            });
        // $A.enqueueAction(action);
        $A.getCallback(function() {
            $A.enqueueAction(action);
        })();
    },
    //this function is user to getting the type of user device.
    printBrowser: function(component, event, helper) {
       
        // navigator.sayswho = (function() {
        //     console.log('navigator.sayswho = ', navigator.userAgent);
        //     var ua = navigator.userAgent,
        //         tem,
        //         M = ua.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || [];
        //     if (/trident/i.test(M[1])) {
        //         tem = /\brv[ :]+(\d+)/g.exec(ua) || [];
        //         return 'IE ' + (tem[1] || '');
        //     }
        //     if (M[1] === 'Chrome') {
        //         tem = ua.match(/\b(OPR|Edge)\/(\d+)/);
        //         if (tem != null) return tem.slice(1).join(' ').replace('OPR', 'Opera');
        //     }
        //     M = M[2] ? [ M[1], M[2] ] : [ navigator.appName, navigator.appVersion, '-?' ];
        //     if ((tem = ua.match(/version\/(\d+)/i)) != null) M.splice(1, 1, tem[1]);
        //     return M.join(' ');
        // })();
        // component.set("v.browser",navigator.sayswho);
        navigator.sayswho = (function() {
            
            const userAgent = navigator.userAgent;
            let browser = "unkown";
            // Detect browser name
            browser = (/ucbrowser/i).test(userAgent) ? 'UCBrowser' : browser;
            browser = (/edg/i).test(userAgent) ? 'Edge' : browser;
            browser = (/googlebot/i).test(userAgent) ? 'GoogleBot' : browser;
            browser = (/chromium/i).test(userAgent) ? 'Chromium' : browser;
            browser = (/firefox|fxios/i).test(userAgent) && !(/seamonkey/i).test(userAgent) ? 'Firefox' : browser;
            browser = (/; msie|trident/i).test(userAgent) && !(/ucbrowser/i).test(userAgent) ? 'IE' : browser;
            browser = (/chrome|crios/i).test(userAgent) && !(/opr|opera|chromium|edg|ucbrowser|googlebot/i).test(userAgent) ? 'Chrome' : browser;;
            browser = (/safari/i).test(userAgent) && !(/chromium|edg|ucbrowser|chrome|crios|opr|opera|fxios|firefox/i).test(userAgent) ? 'Safari' : browser;
            browser = (/opr|opera/i).test(userAgent) ? 'Opera' : browser;
            
             component.set("v.browser",browser);
         })();
        
    },
    leaveHandler: function(event) {
    event.returnValue = "Are you sure you want to leave? All changes will be lost!";
    },
    preventLeaving: function() {
        window.addEventListener("beforeunload", this.leaveHandler);
    },
    allowLeaving: function() {
        window.removeEventListener("beforeunload", this.leaveHandler);
    },
    //this fucntion is updating some fields like "Total_Time_for_Round_1__c"  in "participantGameInfo" object.
    participantGameInfoUpdateTotalTimeRoundOne: function(component,event,helper,userContactId,gameId,participantGameInfoId,totalTimeForRound,totalKeyStrokesInRound,currentScreent) {
        let data = {};

        if(currentScreent=='42'){
            data = {
                Contact_Name__c:userContactId,
                Game_Name__c:gameId,
                Id:participantGameInfoId,
                Total_Time_for_Round_0__c:totalTimeForRound,
                Total_KeyStrokes_In_Round_0__c: totalKeyStrokesInRound
            };
        }
        else if(currentScreent=='243'){
            //console.log('i am in 243 screen end game');
            data = {
                Contact_Name__c:userContactId,
                Game_Name__c:gameId,
                Id:participantGameInfoId,
                Total_Time_for_Round_1__c:totalTimeForRound,
                Total_KeyStrokes_In_Round_1__c: totalKeyStrokesInRound
            };
        }
        var action = component.get("c.participantGameInfoUpdate");
        action.setParams({"sobj":JSON.stringify(data)});
        action.setCallback(this,function(a) 
            {      
            var state = a.getState();
                    if (state === "SUCCESS") {
                        var name = a.getReturnValue(); 
                        component.set("v.participantGameid",name);            
                    }
                    else if(state==="ERROR"){
                        let message='';
                        let errors = a.getError();
                        if (errors && Array.isArray(errors) && errors.length > 0) {
                            message = errors[0].message;
                        }
                        //console.error(message);
                    }
                    else{
                        //console.log('error');
                    }
        });
        try{
            $A.getCallback(function() {
                $A.enqueueAction(action);
            })();
            // $A.enqueueAction(action);
        }
        catch( e){
            //console.log(e.message);
        }
    },
    
    getDeviceType: function(component, event, helper) {
        const ua = window.navigator.userAgent;
       // alert('ua = ' + ua);
        //var iOS = !!ua.match(/Mac OS/i);
        if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua)) {
          return "TABLET";
        }
        if (
          /Mobile|iP(hone|od)|Android|BlackBerry|IEMobile|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(
            ua
          )
        ) {
          return "PHONE";
        }
        return "DESKTOP";
      }

})