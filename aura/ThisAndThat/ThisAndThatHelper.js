({
    recorData: function (component, event, helper, userContactId, gameId, questionNumber, userInputData, isCorrect, reactionTime, isPracticeQuestion, correctAnswer, participantGameInfoId, round) {
        let data = {
            Contact_Name__c: userContactId,
            Game_Name__c: gameId,
            Question_Number__c: questionNumber,
            Participant_Response__c: userInputData,
            Is_Correct__c: isCorrect,
            Reaction_Time_in_ms__c: reactionTime,
            Is_Practice_Question__c: isPracticeQuestion,
            Right_Answer__c: correctAnswer,
            Participant_Game_InfoID__c: participantGameInfoId,
            Round__c: round
        };  
        var action = component.get("c.saveGameResponse");
        action.setParams({ "sobj": JSON.stringify(data) });        
        action.setCallback(this, function (a) {
            var state = a.getState();
            if (state === "SUCCESS") {
                var name = a.getReturnValue();
            }
            else if (state === "ERROR") {
                let message = '';
                let errors = response.getError();
                if (errors && Array.isArray(errors) && errors.length > 0) {
                    message = errors[0].message;
                }
            }
        }); 
        $A.getCallback(function () {
            $A.enqueueAction(action);
        })();
    },
    gameDetails: function (component, event, helper, gameNameScientific) {   
        var ConList = component.get("c.getGameId");
        ConList.setParams({ "gameName": gameNameScientific });
        ConList.setCallback(this, function (a) {
            var state = a.getState();
            if (state === "SUCCESS") {
                var name = a.getReturnValue(); 
                component.set("v.myAttribute", name);                
            }
            else if (state === "ERROR") {
                let message = '';
                let errors = response.getError();
                if (errors && Array.isArray(errors) && errors.length > 0) {
                    message = errors[0].message;
                } 
            }
        });
        $A.getCallback(function () {
            $A.enqueueAction(ConList);
        })();
    },
    userDetails: function (component, event, helper, currentUserId) {
        var ConList = component.get("c.getContactId");
        ConList.setParams({ "currentUserid": currentUserId });
        ConList.setCallback(this, function (a) {
            var state = a.getState();
            if (state === "SUCCESS") {
                var name = a.getReturnValue();  
                component.set("v.mycontactId", name);
            }
            else if (state === "ERROR") {
                let message = '';
                let errors = response.getError();
                if (errors && Array.isArray(errors) && errors.length > 0) {
                    message = errors[0].message;
                }
            }
        });
        $A.getCallback(function () {
            $A.enqueueAction(ConList);
        })();
    },
    participantGameInfo: function (component, event, helper, contactId,language, gameId, startDateTime, gamePlayStatus,ipAddress,browserName,device,screenResolution) {
        let data = {
            Contact_Name__c: contactId,
            Language__c:language,
            Game_Name__c: gameId,
            Start_Date_Time__c: startDateTime,
            Game_Play_Status__c: gamePlayStatus,
            Browser_User_Agent__c:browserName,
            IP_Address__c:ipAddress,
            User_Device__c:device,
            User_Agent__c: navigator.userAgent,
            Device_Screen_Size__c: JSON.stringify(screenResolution)
        };
        var action = component.get("c.participantGameInfoDetail");
        action.setParams({ "sobj": JSON.stringify(data) });
        action.setCallback(this, function (a) {
            var state = a.getState();
            if (state === "SUCCESS") {
                var name = a.getReturnValue();
                component.set("v.participantGameid", name);
                var participantGameInfoId=name;
                this.gameNameInParticipantGameInfo(component,event,helper,contactId,gameId,participantGameInfoId,ipAddress,browserName,device);                       
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
        try {
            $A.getCallback(function () {
                $A.enqueueAction(action);
            })();

        }
        catch (e) {
        }
    },
    gameNameInParticipantGameInfo: function (component, event, helper, contactId, gameId, participantGameInfoId, ipAddress, browserName, device) {
        let data = {
            Contact_Name__c: contactId,
            Game_Name__c: gameId,
            Id: participantGameInfoId,
            Browser_User_Agent__c: browserName,
            IP_Address__c: ipAddress,
            User_Device__c: device,
            User_Agent__c: navigator.userAgent
        };   
        var action = component.get("c.gameNameInParticipantGameInfoUpdate");
        action.setParams({ "sobj": JSON.stringify(data) });
        try {   
            $A.getCallback(function () {
                $A.enqueueAction(action);
            })();
        }
        catch (e) {
        }
    },
    participantGameInfoUpdate: function (component, event, helper, contactId, language,gameId, endDateTime, gamePlayStatus, participantGameInfoId,screenResolution) {
        let data = {
            Contact_Name__c: contactId,
            Language__c:language,
            Game_Name__c: gameId,
            End_Date_Time__c: endDateTime,
            Game_Play_Status__c: gamePlayStatus,
            Id: participantGameInfoId,
            Device_Screen_Size__c: JSON.stringify(screenResolution)	
        };
        var action = component.get("c.participantGameInfoUpdate");
        action.setParams({ "sobj": JSON.stringify(data) });        
        action.setCallback(this, function (a) {
            var state = a.getState();
            if (state === "SUCCESS") {
                var name = a.getReturnValue();                
                component.set("v.participantGameid", name);
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
        try {       
            $A.getCallback(function () {
                $A.enqueueAction(action);
            })();
        }
        catch (e) {         
        }
    },
    getIpAddress: function (component, event, helper) {
        var action = component.get('c.getIpCustomLoginUser');
        action.setCallback(this, function (response) {
            var state = response.getState();
            if (state === "SUCCESS") {
                var ipAdd = response.getReturnValue();
                component.set("v.ipAddress", ipAdd);
            }
            else if (state === "INCOMPLETE") {          
            }
            else if (state === "ERROR") {
                var errors = response.getError();
                if (errors) {
                    if (errors[0] && errors[0].message) {                        
                    }
                } else {                   
                }
            }
        });
        $A.getCallback(function () {
            $A.enqueueAction(action);
        })();
    },
    printBrowser: function (component, event, helper) {
        navigator.sayswho = (function() {
            const userAgent = navigator.userAgent;
            let browser = "unkown";
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
    leaveHandler: function (event) {
        event.returnValue = "Are you sure you want to leave? All changes will be lost!";
    },
    preventLeaving: function () {
        window.addEventListener("beforeunload", this.leaveHandler);
    },
    allowLeaving: function () {
        window.removeEventListener("beforeunload", this.leaveHandler);
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
      }
})