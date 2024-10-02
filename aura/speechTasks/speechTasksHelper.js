({    
   saveAudioToSalesforce: function(component, participantGameInfoId, binaryData, taskNum,otherlanguage,othervoices,
        loudnoices,isdelete) {
        var action = component.get("c.createAudioContentVersion");
        //const binaryDataStr = JSON.stringify(binaryData);
        action.setParams({
            "parentId": participantGameInfoId, // The ID of your custom object record
            "speechTaskrec": binaryData,
            "taskNum" : taskNum,
            "otherlanguage" : otherlanguage,
            "othervoices" : othervoices,
            "loudnoices" : loudnoices,
            "isdelete" : !isdelete
        });
        console.log('othervoices: '+othervoices);   
        console.log('otherlanguage: '+otherlanguage);   
        console.log('loudnoices: '+loudnoices);    
        console.log('isdelete: '+isdelete);              
        action.setCallback(this, function(response) {
            console.log('inside');
            var state = response.getState();
            if (state == "SUCCESS") {
                // ContentVersion created successfully
                var contentVersionId = response.getReturnValue();
                console.log("Audio ContentVersion ID:", contentVersionId);
            } else {
                // Handle errors
                console.error("Error creating audio ContentVersion:", response.getError());
            }
        });
        $A.getCallback(function () {
            $A.enqueueAction(action);
        })();
        
        console.log('after');
    },
    

    //this function get the game id from the server.
    gameDetails: function (component, event, helper, gameNameScientific) {
        var ConList = component.get("c.getGameId");
        ConList.setParams({ "gameName": gameNameScientific });
        ConList.setCallback(this, function (a) {
            var state = a.getState();
            if (state === "SUCCESS") {
                var name = a.getReturnValue();
                console.log(name);
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
                console.log('name: '+name);
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

    //this function create the participantgameinfo record.
    participantGameInfo: function (component, event, helper, userContactId,language, gameId, startDateTime, gamePlayStatus, ipAddress, browserName, device, screenResolution) {
        let data = {
            Contact_Name__c: userContactId,
            Game_Name__c: gameId,
            Language__c:language,
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
                this.gameNameInParticipantGameInfo(component,event,helper,userContactId,gameId,participantGameInfoId,ipAddress,browserName,device);
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
        });
        try {
            $A.getCallback(function () {
                $A.enqueueAction(action);
            })();

        }
        catch (e) {
            //console.log(e.message);
        }

    },
        //this function update the gameid into the participantGameinfo object.
        gameNameInParticipantGameInfo: function (component, event, helper, userContactId, gameId, participantGameInfoId, ipAddress, browserName, device) {

            let data = {
                Contact_Name__c: userContactId,
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
                $A.enqueueAction(action);
            }
            catch (e) {
                //console.log(e.message);
            }
        },

    //this fucntion update the participantgameinfo record's field like as endDatetime.
    participantGameInfoUpdate: function (component, event, helper, userContactId,language, gameId, endDateTime, gamePlayStatus, participantGameInfoId, screenResolution) {
        let data;
            data = {
                Contact_Name__c: userContactId,
                Language__c:language,
                Game_Name__c: gameId,
                End_Date_Time__c: endDateTime,
                Game_Play_Status__c: gamePlayStatus,
                Id: participantGameInfoId,
                Device_Screen_Size__c: JSON.stringify(screenResolution),
                Mic_Id__c: component.get('v.MicId'),
                Mic_Label__c: component.get('v.MicLabel')
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
                //console.log('error');
            }
        });
        try {
            $A.enqueueAction(action);
        }
        catch (e) {
            //console.log(e.message);
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
        $A.enqueueAction(action);
    },
    printBrowser: function (component, event, helper) {
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
    leaveHandler: function (event) {
        event.returnValue = "Are you sure you want to leave? All changes will be lost!";
    },
    preventLeaving: function () {
        window.addEventListener("beforeunload", this.leaveHandler);
    },
    allowLeaving: function () {
        window.removeEventListener("beforeunload", this.leaveHandler);
    },
    ristrictAutoRun: function (component, event, helper) {
        console.log('beforerefresh');
        $A.get('event.force:refreshView'); 
        console.log('afterrefresh');
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