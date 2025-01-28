({
    recorData: function (component, event, helper, contactId, gameId, questionNumber, response, isCorrect, reactionTime, isPracticeQuestion, correctAnswer, participantGameInfoId, inputkeyPress, timeToFirstKeyStroke, round) {

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
            Participant_First_Response__c: inputkeyPress,
            Round__c: round,
            Time_To_First_Key_Stroke__c: timeToFirstKeyStroke
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
        if (currentScreent == '69') {
            data = {
                Contact_Name__c: contactId,
                Game_Name__c: gameId,
                Id: participantGameInfoId,
                Total_Time_for_Round_1__c: totalTimeForRoundZero,
                Total_KeyStrokes_In_Round_1__c: totalKeyStrokesInRound
            };
        }
        var action = component.get("c.participantGameInfoUpdate");
        action.setParams({ "sobj": JSON.stringify(data) });
        action.setCallback(this, function (a) {
            var state = a.getState();
            if (state === "SUCCESS") {
                localStorage.setItem('memoryGame7', true);
                window.location.href = $A.get("$Label.c.Community_Url") + "/s/" + $A.get("$Label.c.url_memorytest_page_8");
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
            $A.getCallback(function () {
                $A.enqueueAction(action);
            })();
        }
        catch (e) {
            //console.log(e.message);
        }
    },

    getDeviceType: function () {
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
    lastStepUpdateInPGI: function (component) {
        var participantGameInfoId = atob(localStorage.getItem('pGameInfoCreated'));
        let data = {
            Last_Step__c: 7,
            Id: participantGameInfoId
        };
        var action = component.get("c.participantGameInfoUpdate");
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
    logError: function (component, description) {
        let data = {
            Class__c: "GamesController",
            Method__c: "memorytestPage7-change-screen",
            Description__c: description
        };
        console.log('data is : ', data);
        var logAction = component.get("c.logError");
        logAction.setParams({ "className": data.Class__c, 'methodName': data.Method__c, 'description': data.Description__c });
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
            }
        });
        $A.getCallback(function () {
            $A.enqueueAction(logAction);
        })();
    }

})