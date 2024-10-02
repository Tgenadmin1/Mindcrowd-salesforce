({    
    participantGameInfo: function (component,reactionTime, questionnum) { 
        //console.log('pgi: '+ JSON.stringify(component.get("v.partGameInfo")));        
        var action = component.get("c.participantGameInfoUpdate1");
        action.setParams({
            "sobj": component.get("v.partGameInfo")
        });
        action.setCallback(this, function (a) {
            var state = a.getState();
            if (state === "SUCCESS") {
                var name = a.getReturnValue();
                this.recorData(component, reactionTime, questionnum);
                //component.set("v.participantGameid", name);
            } else if (state === "ERROR") {
                let message = '';
                let errors = a.getError();
                if (errors && Array.isArray(errors) && errors.length > 0) {
                    message = errors[0].message;
                }
                console.error(message);
            }
        });

        $A.enqueueAction(action);
    },
    recorData: function (component, reactionTime, questionnum) {
         let data = {
             Contact_Name__c: component.get('v.userContactId'),
             Game_Name__c: component.get('v.gameId'),
             Participant_Game_InfoID__c: component.get('v.participantGameid'),
             Reaction_Time_in_ms__c: reactionTime,
             Question_Number__c: questionnum,
             Round__c: 0,
             Right_Answer__c: ''
         };
         //console.log('data is : ',data);
         var action = component.get("c.saveGameResponse");
         action.setParams({ "sobj": JSON.stringify(data) });
         //console.log('question: ' + questionNumber +' responce: '+ userInputData +' correct: '+ isCorrect +'time: '+reactionTime);
         action.setCallback(this, function (a) {
             var state = a.getState();
             if (state === "SUCCESS") {
                 var name = a.getReturnValue();
             }
             else if (state === "ERROR") {
                 let message = '';
                 let errors = response.getError();
                 //console.log('record data value',errors);
                 if (errors && Array.isArray(errors) && errors.length > 0) {
                     message = errors[0].message;
                 }
                 //console.error(message);
             }
         });
         // $A.enqueueAction(action);  
         $A.getCallback(function () {
             $A.enqueueAction(action);
         })();
     },
    preventLeaving: function () {      
        //console.log('inside preventLeaving');  
        window.addEventListener("beforeunload", this.leaveHandler);
    },
    leaveHandler: function (event) {
        //console.log('inside leavehandler');
        event.returnValue = "Are you sure you want to leave? All changes will be lost!";
    },
    allowLeaving: function () {
        //console.log('inside allowLeaving');
        window.removeEventListener("beforeunload", this.leaveHandler);
    }
})