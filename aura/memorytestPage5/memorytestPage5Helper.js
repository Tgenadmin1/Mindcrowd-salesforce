({ // helper.recorData(component,event,helper,contactId,gameId,questionNumber,userInputData,isCorrect,reactionTime,isPracticeQuestion);
    recorData: function (component, event, helper, contactId, gameId, questionNumber, response, isCorrect, reactionTime, isPracticeQuestion, correctAnswer, participantGameInfoId, inputkeyPress, timeToFirstKeyStroke, round) {
        // alert('inputkeyPress = ' + inputkeyPress);
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
                let errors = a.getError();

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





    //this function update the gameid into the participantGameinfo object.
    gameNameInParticipantGameInfo: function (component, event, helper, contactId, gameId, participantGameInfoId, ipAddress, currentScreent) {
        let data = {
            Contact_Name__c: contactId,
            Game_Name__c: gameId,
            Id: participantGameInfoId,
            IP_Address__c: ipAddress,
            Last_Step__c: '4'
        };
        var action = component.get("c.gameNameInParticipantGameInfoUpdate");
        action.setParams({ "sobj": JSON.stringify(data) });
        $A.enqueueAction(action);
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

        if (currentScreent == '19') {
            data = {
                Contact_Name__c: contactId,
                Game_Name__c: gameId,
                Id: participantGameInfoId,
                Total_Time_for_Round_0__c: totalTimeForRoundZero,
                Total_KeyStrokes_In_Round_0__c: totalKeyStrokesInRound
            };
        }
        var action = component.get("c.participantGameInfoUpdate");
        action.setParams({ "sobj": JSON.stringify(data) });
        action.setCallback(this, function (a) {
            var state = a.getState();
            if (state === "SUCCESS") {
                localStorage.setItem('memoryGame5', true);
                window.location.href = $A.get("$Label.c.Community_Url") + "/s/" + $A.get("$Label.c.url_memorytest_page_6");
                var name = a.getReturnValue();
                component.set("v.participantGameid", name);
            }
        });
        try {
            // $A.enqueueAction(action);
            $A.getCallback(function () {
                $A.enqueueAction(action);
            })();
        }
        catch (e) {
            console.error(e);
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

    getLocalStorageItem: function (key) {
        try {
            let data = JSON.parse(localStorage.getItem(key));
            if (!data) { return false; }
            if (Date.now() > data.TTL) {
                localStorage.removeItem(key);
                return false;
            }
            else {
                return localStorage.getItem(key);
            }
        }
        catch (e) {
            console.error(e);
        }
    },
    setLocalStorageItem: function (key, value, expiry) {
        let data = JSON.parse(value);
        data.TTL = Date.now() + (expiry * 1000);
        localStorage.setItem(key, JSON.stringify(data));
    },

    httpGetAsync: function (component, event, url) {
        let self = this;
        let data = self.getLocalStorageItem('ipdata');
        if (!data) {
            var xmlHttp = new XMLHttpRequest();
            xmlHttp.onreadystatechange = function () {
                if (xmlHttp.readyState === 4) {
                    if (xmlHttp.status === 200) {
                        self.setLocalStorageItem('ipdata', xmlHttp.responseText, 1800);//pass expiry in second
                        self.setApiData(component, xmlHttp.responseText, event, self);
                    }
                    else {
                        self.printBrowser(component, event, self);
                    }
                }
            }
            xmlHttp.open("GET", url, true); // true for asynchronous
            xmlHttp.send(null);
        }
        else {
            self.setApiData(component, data, event, self);
        }
    },
    setApiData: function (component, data, event, self) {
        var ipData = JSON.parse(data);
        var ipstr = ipData.ip;
        var timeZone = ipData.time_zone;
        var latitude = ipData.latitude;
        var longitude = ipData.longitude;
        var city = ipData.city;
        var country = ipData.country_name;
        var region = ipData.region;
        var zip = ipData.postal;
        var fullIpData = JSON.stringify(ipData);
        component.set("v.ipAddress", ipstr);
        component.set('v.timeZone', timeZone.offset);
        component.set('v.latitude', latitude);
        component.set('v.longitude', longitude);
        component.set('v.city', city);
        component.set('v.country', country);
        component.set('v.region', region);
        component.set('v.zip', zip);
        component.set('v.fullIpData', fullIpData);
        localStorage.setItem('cip', btoa(ipstr));
        self.printBrowser(component, event, self);

    },
    printBrowser: function (component, event, self) {
        navigator.sayswho = (function () {
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
            component.set("v.browser", browser);

        })();

        let startDateTime = new Date();
        let gamePlayStatus = "Not-Completed";
        var browserName = component.get("v.browser");//navigator.sayswho;
        var ipAddress = component.get("v.ipAddress");
        var timeZone = component.get("v.timeZone");
        var latitude = component.get("v.latitude");
        var longitude = component.get("v.longitude");
        var city = component.get("v.city");
        var country = component.get("v.country");
        var region = component.get("v.region");
        var zip = component.get("v.zip");
        var fullIpData = component.get("v.fullIpData");
        var device = self.getDeviceType();
        var screenHeight = window.screen.availHeight;
        var screenWidth = window.screen.availWidth;
        var macTouch = localStorage.getItem('macTouch');
        var ua = window.navigator.userAgent;
        var iOS = !!ua.match(/Mac OS/i);
        if (iOS) {
            if (macTouch == 'true' && device == "DESKTOP") {
                device = 'TABLET';
            }
        }
        else {
            if (macTouch == 'true' && device == "DESKTOP") {
                device = 'TABLET';
            }
        }
        var keystrokeCount = 0;
        var screenResolution = { "height": screenHeight, "width": screenWidth };
        self.gameNameInParticipantGameInfo(component, startDateTime, gamePlayStatus, ipAddress, browserName, device, keystrokeCount, screenResolution, timeZone, latitude, longitude, city, country, zip, region, fullIpData);
    },
    //this function update the gameid into the participantGameinfo object.
    gameNameInParticipantGameInfo: function (component, startDateTime, gamePlayStatus, ipAddress, browserName, device, keystrokeCount, screenResolution, timeZone, latitude, longitude, city, country, zip, region, fullIpData) {
        var participantGameInfoId = atob(localStorage.getItem('pGameInfoCreated'));
        let data = {
            IP_Address__c: ipAddress,
            Id: participantGameInfoId,
            Last_Step__c: 5,
            Start_Date_Time__c: startDateTime,
            Game_Play_Status__c: gamePlayStatus,
            Browser_User_Agent__c: browserName,
            User_Device__c: device,
            User_Agent__c: navigator.userAgent,
            Total_Keystrokes_in_Practice__c: keystrokeCount,
            Device_Screen_Size__c: JSON.stringify(screenResolution),
            Time_Zone_Offset__c: timeZone,
            Geolocation__Longitude__s: longitude,
            Geolocation__Latitude__s: latitude,
            City__c: city,
            Country__c: country,
            Region__c: region,
            IP_Data__c: fullIpData,
            Zip_Code__c: zip
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
                let errors = a.getError();
                if (errors && Array.isArray(errors) && errors.length > 0) {
                    message = errors[0].message;
                }
                console.error(message);
            }
        });
        $A.getCallback(function () {
            $A.enqueueAction(action);
        })();
    },
    logError: function (component, description) {
        let data = {
            Class__c: "GamesController",
            Method__c: "memorytestPage5-change-screen",
            Description__c: description
        };

        var logAction = component.get("c.logError");
        logAction.setParams({ "className": data.Class__c, 'methodName': data.Method__c, 'description': data.Description__c });
        logAction.setCallback(this, function (a) {
            var state = a.getState();
            if (state === "SUCCESS") {
                var name = a.getReturnValue();
            }
            else if (state === "ERROR") {
                let message = '';
                let errors = a.getError();

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