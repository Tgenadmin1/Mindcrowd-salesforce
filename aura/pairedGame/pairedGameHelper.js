({ // helper.recorData(component,event,helper,contactId,gameId,questionNumber,userInputData,isCorrect,reactionTime,isPracticeQuestion);
    recorData: function(component, event,helper,contactId,gameId,questionNumber,response,isCorrect,reactionTime,isPracticeQuestion,correctAnswer,participantGameInfoId,inputkeyPress){
       
        let data = {
            Contact_Name__c:contactId,
            Game_Name__c:gameId,
            Question_Number__c:questionNumber,
            Participant_Response__c:response,
            Is_Correct__c:isCorrect,
            Reaction_Time_in_ms__c:reactionTime,
            Is_Practice_Question__c:isPracticeQuestion,
            Right_Answer__c:correctAnswer,
            Participant_Game_InfoID__c:participantGameInfoId,
            Participant_First_Response__c: inputkeyPress
        };
        var action = component.get("c.saveGameResponse");
        action.setParams({"sobj":JSON.stringify(data)}); 
       // console.log('question: ' + questionNumber +' responce: '+ userInput +' correct: '+ isCorrect +'time: '+reactionTime);
        action.setCallback(this,function(a) {            
            var state = a.getState();
           // alert('ok = ' + question +'---'+ responce +'---'+ correct +'---'+ time + 'state =' + state);
            if (state === "SUCCESS") {
                var name = a.getReturnValue(); 
                console.log('record data value',name);            
            }
            else if(state==="ERROR"){
                let message='';
                let errors = response.getError();
                console.log('record data value',errors);
                if (errors && Array.isArray(errors) && errors.length > 0) {
                    message = errors[0].message;
                }
                console.error(message);
            }
        });
        $A.enqueueAction(action);  
    },

    gameDetails: function(component, event, helper,gameName) {
        var ConList = component.get("c.getGameId");
        ConList.setParams({"gameName":gameName});
        ConList.setCallback(this, function(a) 
                                    {
                                        var state = a.getState();
                                        console.log('hi this is game in call back',state);
                                        if (state === "SUCCESS") {
                                            var name = a.getReturnValue();
                                            component.set("v.myAttribute",name);
                                            console.log('game details value',name);      
                                        }
                                        else if(state==="ERROR"){
                                            let message='';
                                            let errors = response.getError();
                                            if (errors && Array.isArray(errors) && errors.length > 0) {
                                                message = errors[0].message;
                                            }
                                            console.error(message);
                                        }
                                    });
        $A.enqueueAction(ConList);
    },

     //this function create the participantgameinfo record.
     participantGameInfo: function(component,event,helper,contactId,gameId,startDateTime,gamePlayStatus) {
        let data = {
            Contact_Name__c:contactId,
            Game_Name__c:gameId,
            Start_Date_Time__c:startDateTime,
            Game_Play_Status__c:gamePlayStatus         
        };
        var action = component.get("c.participantGameInfoDetail");
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
                        let errors = response.getError();
                        if (errors && Array.isArray(errors) && errors.length > 0) {
                            message = errors[0].message;
                        }
                        console.error(message);
                    }
                    else{
                        console.log('else part');
                    }
            });
        try{
            $A.enqueueAction(action);

        }
        catch( e){
            console.log(e.message);
        }
        
    },

    //this fucntion update the participantgameinfo record's field like as endDatetime.
    participantGameInfoUpdate: function(component,event,helper,contactId,gameId,endDateTime,gamePlayStatus,participantGameInfoId) {
        let data = {
            Contact_Name__c:contactId,
            Game_Name__c:gameId,
            End_Date_Time__c:endDateTime,
            Game_Play_Status__c:gamePlayStatus,
            Id:participantGameInfoId      
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
                        let errors = response.getError();
                        if (errors && Array.isArray(errors) && errors.length > 0) {
                            message = errors[0].message;
                        }
                        console.error(message);
                    }
                    else{
                        console.log('else part');
                    }
        });
        try{
            $A.enqueueAction(action);
        }
        catch( e){
            console.log(e.message);
        }
    },

    //this function update the gameid into the participantGameinfo object.
    gameNameInParticipantGameInfo: function(component,event,helper,contactId,gameId,participantGameInfoId,ipAddress,browserName,device) {
        let data = {
            Contact_Name__c:contactId,
            Game_Name__c:gameId,
            Id:participantGameInfoId,
            Browser_User_Agent__c:browserName,
            IP_Address__c:ipAddress,
            User_Device__c:device  
        };
        var action = component.get("c.gameNameInParticipantGameInfoUpdate");
        action.setParams({"sobj":JSON.stringify(data)});
        try{
            $A.enqueueAction(action);
        }
        catch( e){
            console.log(e.message);
        }
    },

    printBrowser: function(component, event, helper) {
        navigator.sayswho = (function() {
            var ua = navigator.userAgent,
                tem,
                M = ua.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || [];
            if (/trident/i.test(M[1])) {
                tem = /\brv[ :]+(\d+)/g.exec(ua) || [];
                return 'IE ' + (tem[1] || '');
            }
            if (M[1] === 'Chrome') {
                tem = ua.match(/\b(OPR|Edge)\/(\d+)/);
                if (tem != null) return tem.slice(1).join(' ').replace('OPR', 'Opera');
            }
            M = M[2] ? [ M[1], M[2] ] : [ navigator.appName, navigator.appVersion, '-?' ];
            if ((tem = ua.match(/version\/(\d+)/i)) != null) M.splice(1, 1, tem[1]);
            return M.join(' ');
        })();
        component.set("v.browser",navigator.sayswho);
    },
    leaveHandler: function(event) {
        event.returnValue = "Are you sure you want to leave? All changes will be lost!";
        },
        preventLeaving: function() {
            window.addEventListener("beforeunload", this.leaveHandler);
        },
        allowLeaving: function() {
            window.removeEventListener("beforeunload", this.leaveHandler);
        }
    
})