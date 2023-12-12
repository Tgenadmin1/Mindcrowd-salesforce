({ 
    // helper.recorData(component,event,helper,contactId,gameId,questionNumber,userInputData,isCorrect,reactionTime,isPracticeQuestion);
    leaveHandler: function(event) {
        event.returnValue = "Are you sure you want to leave? All changes will be lost!";
    },
    preventLeaving: function() {
        window.addEventListener("beforeunload", this.leaveHandler);
    },
    allowLeaving: function() {
        window.removeEventListener("beforeunload", this.leaveHandler);
    },

    //this function update the gameid into the participantGameinfo object.
    gameNameInParticipantGameInfo: function(component) {
        var contactId = null;
        var product = localStorage.getItem('c__id');//.split('=');
        if (product != null) {
            contactId = atob(product);
        }

        var action = component.get("c.createPGI");
        action.setParams({contId:contactId});
        action.setCallback(this,function(a){    
            var state = a.getState();
            if (state === "SUCCESS") {
                component.set("v.isPGICreated",true); 
                // localStorage.setItem('LastPage', document.URL);               
                let obj = a.getReturnValue();            
                localStorage.setItem('pGameInfoCreated', btoa(obj.pgiId));
                localStorage.setItem('pGameId',  btoa(obj.gameId));
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
        $A.getCallback(function() {
            $A.enqueueAction(action);
        })();     
    },
    getDeviceType: function(component, event, helper) {
        const ua = navigator.userAgent;
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
    },
    logError: function (component, description) 
    {
        let data = {
            Class__c: "GamesController",
            Method__c: "memorytestPage1-change-screen",
            Description__c: description            
        };
        console.log('data is : ',data);
        var logAction = component.get("c.logError");
        logAction.setParams({ "className": data.Class__c , 'methodName': data.Method__c, 'description': data.Description__c });
        logAction.setCallback(this, function (a) {
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
            $A.enqueueAction(logAction);
        })();      
    }
})