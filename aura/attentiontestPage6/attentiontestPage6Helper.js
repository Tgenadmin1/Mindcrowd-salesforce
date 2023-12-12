({ //this method works for insert record in participantgameresponcse object.
    recorData: function (component, event, helper, contactId, gameId, questionNumber, response, isCorrect, reactionTime, isPracticeQuestion, correctAnswer, participantGameInfoId, round) {
        let data = {
            Contact_Name__c: contactId,
            Game_Name__c: gameId,
            Question_Number__c: questionNumber,
            Participant_Response__c: response,
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
                //console.error(message);
            }
        });
        $A.getCallback(function () {
            $A.enqueueAction(action);
        })();
    },
    //this fucntion update the participantgameinfo record's field like as endDatetime.
    participantGameInfoUpdate: function (component, event, helper, contactId, gameId, endDateTime, gamePlayStatus, participantGameInfoId, keystrokeCount) {
        let data = {
            End_Date_Time__c: endDateTime,
            Game_Play_Status__c: gamePlayStatus,
            Id: participantGameInfoId,
            Total_Keystrokes_in_Test__c: keystrokeCount
        };
        var action = component.get("c.participantGameInfoUpdate");
        action.setParams({ "sobj": JSON.stringify(data) });
        action.setCallback(this, function (a) {
            var state = a.getState();
            if (state === "SUCCESS") {
                helper.allowLeaving();
                localStorage.setItem('attentionpage6', true);
                window.location.href = $A.get("$Label.c.Community_Url") + "/s/" + $A.get("$Label.c.url_attentiontestcomplete");
                var name = a.getReturnValue();
                component.set("v.participantGameid", name);
            }
            else if (state === "ERROR") {
                let message = '';
                let errors = response.getError();
                if (errors && Array.isArray(errors) && errors.length > 0) {
                    message = errors[0].message;
                }
                //console.error(message);
            }
            else {
                //console.log('else part');
            }
        });
        $A.getCallback(function () {
            $A.enqueueAction(action);
        })();
    },
    //this function update the gameid into the participantGameinfo object.
    lastStepUpdateInPGI: function(component) {
        var participantGameInfoId=null;
        var pGameInfoCreated = localStorage.getItem('pGameInfoCreated');
        if(pGameInfoCreated!=null){
            participantGameInfoId = atob(pGameInfoCreated);
        } 
            let data = {
                Last_Step__c:6,
                Id:participantGameInfoId 
            };
            var action = component.get("c.participantGameInfoUpdate");
            action.setParams({"sobj":JSON.stringify(data)});
            action.setCallback(this,function(a) 
                {      
                var state = a.getState();
                        if (state === "SUCCESS") {
                            var name = a.getReturnValue();         
                        }
                        else if(state==="ERROR"){
                            let message='';
                            let errors = response.getError();
                            if (errors && Array.isArray(errors) && errors.length > 0) {
                                message = errors[0].message;
                            }
                        }
            });
        $A.getCallback(function() {
            $A.enqueueAction(action);
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
    //this fucntion is updating some fields like "Total_Time_for_Round_1__c"  in "participantGameInfo" object.
    participantGameInfoUpdateTotalTimeRoundOne: function (component, event, helper, contactId, gameId, participantGameInfoId, totalTimeForRoundZero, totalKeyStrokesInRound, currentScreent) {
        let data = {};
        data = {
            Contact_Name__c: contactId,
            Game_Name__c: gameId,
            Id: participantGameInfoId,
            Total_Time_for_Round_1__c: totalTimeForRoundZero,
            Total_KeyStrokes_In_Round_1__c: totalKeyStrokesInRound
        };
        var action = component.get("c.participantGameInfoUpdate");
        action.setParams({ "sobj": JSON.stringify(data) });
        action.setCallback(this, function (a) {
            var state = a.getState();
            if (state === "SUCCESS") {
                var endDateTime = new Date();
                var gamePlayStatus = "Completed";
                helper.participantGameInfoUpdate(component, event, helper, contactId, gameId, endDateTime, gamePlayStatus, participantGameInfoId);//helper method calling here.
                var name = a.getReturnValue();
                component.set("v.participantGameid", name);
            }
            else if (state === "ERROR") {
                let message = '';
                let errors = response.getError();
                if (errors && Array.isArray(errors) && errors.length > 0) {
                    message = errors[0].message;
                }
                console.error(message);
            }
            else {
                console.log('error');
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
    getDeviceType: function (component, event, helper) {
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
          Method__c: "attentiontestPage6-change-screen",
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
              if (errors && Array.isArray(errors) && errors.length > 0) {
                  message = errors[0].message;
              }
              //console.error(message);
          }
      });
      $A.getCallback(function () {
          $A.enqueueAction(logAction);
      })();
  }
})