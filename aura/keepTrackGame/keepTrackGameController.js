({
    myAction: function (component, event, helper) {

        var timeS = new Date().getTime();
                const url = new URL(window.location.href);
               // const resourceRelPath = $A.get("$Label.c.keep_track_game_config_url")+'?test='+timeS;
                const resourceUrl = $A.get("$Label.c.Community_Url")+  $A.get("$Label.c.keep_track_game_config_url")+'?test='+timeS;
                //console.log('resourceUrl = ' , resourceUrl);
               // const configdata="";
                window.fetch(resourceUrl)
                    .then($A.getCallback((response) => {
                        if (!response.ok) {
                            throw new Error(`HTTP error, status = ${response.status}`);
                        }
                        response.json()
                            .then($A.getCallback((data) => {
                                let configdata = data;


        var myPageRef = window.location.href;
        var actionGame = component.get("c.getCurrentContact");
        var pageUrl = myPageRef.split('/s/');

        //-----Gettung gameId from the apex function------------------
        var gameNameScientific = $A.get("$Label.c.scientific_game_keepTrack");
        helper.gameDetails(component, event, helper, gameNameScientific);
        var gameId;
        var participantGameInfoId;
        var ipAddress;
        var browserName;
        helper.getIpAddress(component, event, helper);
        helper.printBrowser(component, event, helper);
        // var device = $A.get("$Browser.formFactor");
        var device = helper.getDeviceType(component, event, helper);

        // Gettin contact id from the current loggedin user.
        let currentUserId = $A.get("$SObjectType.CurrentUser.Id");
        helper.userDetails(component, event, helper, currentUserId);
        var userContactId;


        actionGame.setCallback(this, function (a) {
            var state = a.getState();
            if (state === "SUCCESS") {
                var name = a.getReturnValue();
                 var language = name['Language__c'];     
                if (name['Keep_Track__c'] == 'Locked' && pageUrl[1] == $A.get("$Label.c.url_me_keeptrackgame")) {
                    component.set('v.showConfirmDialog', true);
                }
                else if (name['Keep_Track__c'] == 'Completed' && pageUrl[1] == $A.get("$Label.c.url_me_keeptrackgame")) {
                    component.set('v.showConfirmDialog', true);
                }
                // full game code is started from else part.===========================
                else {
                    component.set('v.showConfirmDialog', false);
                    helper.preventLeaving();
                    document.documentElement.addEventListener('keydown', function (e) {
                        if ((e.keycode || e.which) == 32) {
                            e.preventDefault();
                        }
                    }, false);

                    const urlParams = new URLSearchParams(document.location.search.substring(1));
                    const cs = urlParams.get('cs');
                    let currentScreent = 0;
                    if (cs != null) {
                        //console.log("cs1=", cs)
                        currentScreent = Number(cs);
                    }


                    let resultData = {};
                    //let currentScreent = 0;
                    let intervalTime = null;
                    let pageLoadStartTime = null;
                    let roundTotalTime = null;
                    let roundStartTime = null;
                    let round = 0;
                    var keyCount = 0;
                    let timedata = new Date();
                    let result_time = 0;
                    let command_value = 0;
                    let inputdata = {};
                    let lastdatatitle = "";
                    var gameName = $A.get("$Label.c.keep_track_game_text_14");
                    var gameTime = '15 minutes';
                    var fieldTotalTime1 = 0;
                    var fieldTotalTime2 = 0;
                    var fieldTotalTime3 = 0;
                    var fieldTotalTime4 = 0;
                    var totalTrialTime = 0;
                    var orderOffUserInput = [];
                    var timeForCategories = {};
                    var FieldOnFocus;
                    var firstThreeKeys = [];
                    let inp1 = "";
                    var timeTest;
                    let macTouch = getCookie('macTouch');
                    var ua = window.navigator.userAgent;
                    var iOS = !!ua.match(/Mac OS/i);
                     var screenHeight = window.screen.availHeight;
        			var screenWidth = window.screen.availWidth;        
                    // var isMac = ua.match(/Mac OS/i);
                    var isKeyboad;
                    //console.log('sssssssssss');
                    if (iOS) {
                        isKeyboad = (macTouch == 'false');
                        if (macTouch == 'true' && device == "DESKTOP") {
                            device = 'TABLET';
                        }
                    } else if (device == "DESKTOP" && macTouch != 'true') {
                        isKeyboad = true;
                    } else {
                        isKeyboad = false;
                        //alert(' component.get("v.browser")')
                        if (macTouch == 'true' && device == "DESKTOP") {
                            device = 'TABLET';
                        }

                    }

                    var keep_track_game_text_2 = "";
                    var keep_track_game_text_19 = "";

                    if (isKeyboad) {
                        keep_track_game_text_2 = $A.get("$Label.c.keep_track_game_text_2");
                        keep_track_game_text_19 = $A.get("$Label.c.keep_track_game_text_19");
                    } else {
                        keep_track_game_text_2 = $A.get("$Label.c.keep_track_game_text_2_tap");
                        keep_track_game_text_19 = $A.get("$Label.c.keep_track_game_text_19_tap");

                    }

                        configdata =configdata.map(obj => {	
                        obj.content = obj.content.replace('keep_track_game_text_2', keep_track_game_text_2);
                        obj.content = obj.content.replace('keep_track_game_text_19', keep_track_game_text_19);
                        return obj;
                  });
                  //console.log('New configdata: '+JSON.stringify(configdata));
                    
                    function getCookie (name) {
                        var cookieString = "; " + document.cookie;
                        cookieString = cookieString.replace('LSKey-c$','');
                        var parts = cookieString.split("; " + name + "=");
                        if (parts.length === 2) {
                            return parts.pop().split(";").shift();
                        }
                        return null;
                    }

                    //Configuration of data parts.

                   

                    //console.log('config Data = ', configdata); 




                    function changeScreen() {
                        console.log('currentScreent',currentScreent);
                        gameId = component.get("v.myAttribute");
                        userContactId = component.get("v.mycontactId");
                        ipAddress = component.get("v.ipAddress");
                        browserName = component.get("v.browser");
                        participantGameInfoId = component.get("v.participantGameid");//participantGameInfoId holds the participantgameinfo record id.
                        //console.log('gameId :',gameId,'userContactId:',userContactId, 'participantGameInfoId :',participantGameInfoId);
                       // console.log('change screen',configdata[currentScreent].screen);

                        timedata = new Date();
                        pageLoadStartTime = timedata;
                        document.getElementById("datablock_keepTrackGame").innerHTML = configdata[currentScreent].content;
                        if (currentScreent == 547) {
                            document.getElementById("nextBtton").classList.remove("slds-hide");
                        }
                        //adding event listeners fields in trial pages. 
                        if(!isKeyboad){
                            let userenterbtn= document.getElementById("enterBtn");
                           if(typeof(userenterbtn) != 'undefined' && userenterbtn != null){
                           // console.log('test');
                           userenterbtn.classList.remove("slds-hide");
                            userenterbtn.addEventListener('click',gamePlayEnter,false);
                               
                           }
                        }
                        if (configdata[currentScreent].screen == '112' || configdata[currentScreent].screen == '241'
                            || configdata[currentScreent].screen == '273' || configdata[currentScreent].screen == '305') {
                            let c2el1 = document.getElementById("inp1");
                            let c2el2 = document.getElementById("inp2");
                            let fieldStartTime1;
                            let fieldStartTime2;
                            let fieldEndTime1;
                            let fieldEndTime2;
                            let c2field1keycount = 0;
                            let c2field2keycount = 0;
                            let c2inputData1="";
                            let c2inputData2 ="";
                            if (configdata[currentScreent].screen == '112') {
                                round = 0;
                            } else {
                                round = 2;
                            }

                            c2el1.addEventListener('keyup', function (e) {
                                
                                if (e.target  && isKeyboad) {
                                    if(c2field1keycount <=2){
                                        if(  e.key.match(new RegExp( "[a-z]",'gi')) && e.key.length<=1){
                                            c2inputData1 = c2inputData1 + e.key;
                                            //console.log("value entered: ",c2inputData1);
                                        }else{
                                            if(e.key != "Enter"){
                                                c2inputData1 = c2inputData1 + '{' + e.key + '}';
                                            }
                                        }
                                        if(c2field1keycount == 1){
                                            orderOffUserInput.push("1");}
                                        if(c2field1keycount <= 2){
                                            configdata[currentScreent-1].firstResponse['inp1'] = c2inputData1;
                                            //console.log("appended to configdata: ",configdata[currentScreent-1].firstResponse['inp1']);
                                        }
                                    }
                                }else{
                                    if(c2field1keycount <=2){
                                        if(  e.target.value.match(new RegExp( "[a-z]",'gi')) && e.target.value<=1){
                                            c2inputData1 = c2inputData1 + e.target.value;
                                            
                                        }else{
                                            //c2inputData1 = e.target.value ; //inputkeyPress + '{' + e.target.value + '}';
                                            if(e.key == 'undefined' || e.key == 'Unidentified' || e.key == 'Process'){
                                                c2inputData1 = e.target.value ; //inputkeyPress + '{' + e.target.value + '}';
                                                //alert("c2inputData1: "+ c2inputData1);
                                            }else{
                                                c2inputData1 = c2inputData1 +  e.key ; 
                                            }
                                        }
                                        if(c2field1keycount == 1){
                                            orderOffUserInput.push("1");
                                        }
                                        if(c2field1keycount <= 2){
                                            //alert("c2inputData1: "+ c2inputData1);
                                            configdata[currentScreent-1].firstResponse['inp1'] = c2inputData1;
                                        }
                                    }
                                }
                                c2field1keycount++;
                            });
                            c2el2.addEventListener('keyup', function (e) {
                                
                                if (e.target  && isKeyboad) {
                                    if(c2field2keycount <=2){
                                        if(  e.key.match(new RegExp( "[a-z]",'gi')) && e.key.length<=1){
                                            c2inputData2 = c2inputData2 + e.key;
                                        }else{
                                            if(e.key != "Enter"){
                                                c2inputData2 = c2inputData2 + '{' + e.key + '}';
                                            }
                                        }
                                        if(c2field2keycount == 1){
                                            orderOffUserInput.push("2");
                                        }
                                        if(c2field2keycount <= 2){
                                            configdata[currentScreent-1].firstResponse['inp2'] = c2inputData2;
                                            //console.log("appended to configdata: ",configdata[currentScreent-1].firstResponse['inp2']);
                                        }
                                    }
                                }else{
                                    if(c2field2keycount <=2){
                                        if(  e.target.value.match(new RegExp( "[a-z]",'gi')) && e.target.value<=1){
                                            c2inputData2 = c2inputData2 + e.target.value;
                                            
                                        }else{
                                            if(e.key == 'undefined' || e.key == 'Unidentified' || e.key == 'Process'){
                                                c2inputData2 = e.target.value ; //inputkeyPress + '{' + e.target.value + '}';
                                                console.log("c2inputData2: ", c2inputData2);
                                            }else{
                                                c2inputData2 = c2inputData2 + e.key ; 
                                            }
                                            
                                        }
                                        if(c2field2keycount == 1){
                                            orderOffUserInput.push("2");
                                        }
                                        if(c2field2keycount <= 2){
                                            //alert("c2inputData2: "+ c2inputData2);
                                            configdata[currentScreent-1].firstResponse['inp2'] = c2inputData2;
                                        }
                                    }
                                }
                                c2field2keycount++;
                            });
                            c2el1.addEventListener('focus', function (e) {
                                fieldStartTime1 = new Date();
                                FieldOnFocus = c2el1;
                            });
                            c2el1.addEventListener('blur', function (e) {
                                fieldEndTime1 = new Date();
                                let temp1 = fieldEndTime1 - fieldStartTime1;
                                fieldTotalTime1 = fieldTotalTime1 + temp1;
                            });
                            c2el2.addEventListener('focus', function (e) {
                                fieldStartTime2 = new Date();
                                FieldOnFocus = c2el2;
                            });
                            c2el2.addEventListener('blur', function (e) {
                                fieldEndTime2 = new Date();
                                let temp2 = fieldEndTime2 - fieldStartTime2;
                                fieldTotalTime2 = fieldTotalTime2 + temp2;
                            });
                        }
                        
                        if (configdata[currentScreent].screen == '145' || configdata[currentScreent].screen == '177'
                            || configdata[currentScreent].screen == '209') {
                            let c1el1 = document.getElementById("inp1");
                            let c1fieldStartTime1;
                            let c1fieldEndTime1;
                            let c1field1keycount = 0;
                            let c1inputData1= '';
                            round = 1;
                            c1el1.addEventListener('keyup', function (e) {
                                if (e.target  && isKeyboad) {
                                    if(c1field1keycount <=2){
                                        if(  e.key.match(new RegExp( "[a-z]",'gi')) && e.key.length<=1){
                                            c1inputData1 = c1inputData1 + e.key;
                                        }else{
                                            if(e.key != "Enter"){
                                                c1inputData1 = c1inputData1 + '{' + e.key + '}';
                                            }
                                        }
                                        if(c1field1keycount == 1){
                                            orderOffUserInput.push("1");
                                        }
                                        if(c1field1keycount <= 2){
                                            configdata[currentScreent-1].firstResponse['inp1'] = c1inputData1;
                                            //console.log("appended to configdata: ",configdata[currentScreent-1].firstResponse['inp1']);
                                        }
                                    }
                                }else{
                                    if(c1field1keycount <=2){
                                        if(  e.target.value.match(new RegExp( "[a-z]",'gi')) && e.target.value<=1){
                                            c1inputData1 = c1inputData1 + e.target.value;
                                            
                                        }else{
                                           // c1inputData1 = e.target.value ; //inputkeyPress + '{' + e.target.value + '}';
                                            if(e.key == 'undefined' || e.key == 'Unidentified' || e.key == 'Process'){
                                                c1inputData1 = e.target.value ; //inputkeyPress + '{' + e.target.value + '}';
                                                console.log("c1inputData1: ", c1inputData1);
                                            }else{
                                                c1inputData1 = c1inputData1 + e.key ; 
                                            }
                                        }
                                        if(c1field1keycount == 1){
                                            orderOffUserInput.push("1");
                                        }
                                        if(c1field1keycount <= 2){
                                            //alert("c1inputData1: "+ c1inputData1);
                                            configdata[currentScreent-1].firstResponse['inp1'] = c1inputData1;
                                        }
                                    }
                                }
                                c1field1keycount++;
                            });
                            c1el1.addEventListener('focus', function (e) {
                                c1fieldStartTime1 = new Date();
                                FieldOnFocus = c1el1;

                            });
                            c1el1.addEventListener('blur', function (e) {
                                c1fieldEndTime1 = new Date();
                                let c1temp = c1fieldEndTime1 - c1fieldStartTime1;
                                fieldTotalTime1 = fieldTotalTime1 + c1temp;
                            });
                        }
                        if (configdata[currentScreent].screen == '337' || configdata[currentScreent].screen == '369'
                            || configdata[currentScreent].screen == '401') {
                            let c3el1 = document.getElementById("inp1");
                            let c3el2 = document.getElementById("inp2");
                            let c3el3 = document.getElementById("inp3");
                            let c3fieldStartTime1;
                            let c3fieldStartTime2;
                            let c3fieldStartTime3;
                            let c3fieldEndTime1;
                            let c3fieldEndTime2;
                            let c3fieldEndTime3;
                            let c3field1keycount = 0;
                            let c3field2keycount = 0;
                            let c3field3keycount = 0;
                            let c3inputData1 = "";
                            let c3inputData2 = "";
                            let c3inputData3 = "";
                            round = 3;
                            c3el1.addEventListener('keyup', function (e) {
                                
                                if (e.target  && isKeyboad) {
                                    if(c3field1keycount <=2){
                                        if(  e.key.match(new RegExp( "[a-z]",'gi')) && e.key.length<=1){
                                           c3inputData1 = c3inputData1 + e.key;
                                        }else{
                                            if(e.key != "Enter"){
                                                c3inputData1 = c3inputData1 + '{' + e.key + '}';
                                            }
                                        }
                                        if(c3field1keycount == 1){
                                            orderOffUserInput.push("1");}
                                        if(c3field1keycount <= 2){
                                            configdata[currentScreent-1].firstResponse['inp1'] = c3inputData1;
                                            //console.log("appended to configdata: ",configdata[currentScreent-1].firstResponse['inp1']);
                                        }
                                    }
                                }else{
                                    if(c3field1keycount <=2){
                                        if(  e.target.value.match(new RegExp( "[a-z]",'gi')) && e.target.value<=1){
                                            c3inputData1 = c3inputData1 + e.target.value;
                                            
                                        }else{
                                           // c3inputData1 = e.target.value ; //inputkeyPress + '{' + e.target.value + '}';
                                            if(e.key == 'undefined' || e.key == 'Unidentified' || e.key == 'Process'){
                                                c3inputData1 = e.target.value ; //inputkeyPress + '{' + e.target.value + '}';
                                                console.log("c3inputData1: ", c3inputData1);
                                            }else{
                                                c3inputData1 = c3inputData1 + e.key; 
                                            }
                                        }
                                        if(c3field1keycount == 1){
                                            orderOffUserInput.push("1");
                                        }
                                        if(c3field1keycount <= 2){
                                            //alert("c3inputData1: "+ c3inputData1);
                                            configdata[currentScreent-1].firstResponse['inp1'] = c3inputData1;
                                        }
                                    }
                                }
                                c3field1keycount++;
                            });
                            c3el2.addEventListener('keyup', function (e) {
                                if (e.target  && isKeyboad) {
                                    if(c3field2keycount <=2){
                                        if(  e.key.match(new RegExp( "[a-z]",'gi')) && e.key.length<=1){
                                           c3inputData2 = c3inputData2 + e.key;
                                        }else{
                                            if(e.key != "Enter"){
                                                c3inputData2 = c3inputData2 + '{' + e.key + '}';
                                            }
                                        }
                                        if(c3field2keycount == 1){
                                            orderOffUserInput.push("2");}
                                        if(c3field2keycount <= 2){
                                            configdata[currentScreent-1].firstResponse['inp2'] = c3inputData2;
                                            //console.log("appended to configdata: ",configdata[currentScreent-1].firstResponse['inp2']);
                                        }
                                    }
                                }else{
                                    if(c3field2keycount <=2){
                                        if(  e.target.value.match(new RegExp( "[a-z]",'gi')) && e.target.value<=1){
                                            c3inputData2 = c3inputData2 + e.target.value;
                                            
                                        }else{
                                            //c3inputData2 = e.target.value ; //inputkeyPress + '{' + e.target.value + '}';
                                            if(e.key == 'undefined' || e.key == 'Unidentified' || e.key == 'Process'){
                                                c3inputData2 = e.target.value ; //inputkeyPress + '{' + e.target.value + '}';
                                                console.log("c3inputData2: ", c3inputData2);
                                            }else{
                                                c3inputData2 = c3inputData2 +  e.key ; 
                                            }
                                        }
                                        if(c3field2keycount == 1){
                                            orderOffUserInput.push("2");
                                        }
                                        if(c3field2keycount <= 2){
                                            //alert("c3inputData2: "+ c3inputData2);
                                            configdata[currentScreent-1].firstResponse['inp2'] = c3inputData2;
                                        }
                                    }
                                }
                                c3field2keycount++;
                            });
                            c3el3.addEventListener('keyup', function (e) {
                                if (e.target  && isKeyboad) {
                                    if(c3field3keycount <=2){
                                        if(  e.key.match(new RegExp( "[a-z]",'gi')) && e.key.length<=1){
                                           c3inputData3 = c3inputData3 + e.key;
                                        }else{
                                            if(e.key != "Enter"){
                                                c3inputData3 = c3inputData3 + '{' + e.key + '}';
                                            }
                                        }
                                        if(c3field3keycount == 1){
                                            orderOffUserInput.push("3");}
                                        if(c3field3keycount <= 2){
                                            configdata[currentScreent-1].firstResponse['inp3'] = c3inputData3;
                                            //console.log("appended to configdata: ",configdata[currentScreent-1].firstResponse['inp3']);
                                        }
                                    }
                                }else{
                                    if(c3field3keycount <=2){
                                        if(  e.target.value.match(new RegExp( "[a-z]",'gi')) && e.target.value<=1){
                                            c3inputData3 = c3inputData3 + e.target.value;
                                            
                                        }else{
                                            //c3inputData3 = e.target.value ; //inputkeyPress + '{' + e.target.value + '}';
                                            if(e.key == 'undefined' || e.key == 'Unidentified' || e.key == 'Process'){
                                                c3inputData3 = e.target.value ; //inputkeyPress + '{' + e.target.value + '}';
                                                console.log("c3inputData3: ", c3inputData3);
                                            }else{
                                                c3inputData3 = c3inputData3 +  e.key ; 
                                            }
                                        }
                                        if(c3field3keycount == 1){
                                            orderOffUserInput.push("3");
                                        }
                                        if(c3field3keycount <= 2){
                                            //alert("c3inputData3: "+ c3inputData3);
                                            configdata[currentScreent-1].firstResponse['inp3'] = c3inputData3;
                                        }
                                    }
                                }
                      
                                c3field3keycount++;
                            });
                            c3el1.addEventListener('focus', function (e) {
                                c3fieldStartTime1 = new Date();
                                FieldOnFocus = c3el1;
                            });
                            c3el1.addEventListener('blur', function (e) {
                                c3fieldEndTime1 = new Date();
                                let c3temp1 = c3fieldEndTime1 - c3fieldStartTime1;
                                fieldTotalTime1 = fieldTotalTime1 + c3temp1;
                            });
                            c3el2.addEventListener('focus', function (e) {
                                c3fieldStartTime2 = new Date();
                                FieldOnFocus = c3el2;
                            });
                            c3el2.addEventListener('blur', function (e) {
                                c3fieldEndTime2 = new Date();
                                let c3temp2 = c3fieldEndTime2 - c3fieldStartTime2;
                                fieldTotalTime2 = fieldTotalTime2 + c3temp2;
                            });
                            c3el3.addEventListener('focus', function (e) {
                                c3fieldStartTime3 = new Date();
                                FieldOnFocus = c3el3;
                            });
                            c3el3.addEventListener('blur', function (e) {
                                c3fieldEndTime3 = new Date();
                                let c3temp3 = c3fieldEndTime3 - c3fieldStartTime3;
                                fieldTotalTime3 = fieldTotalTime3 + c3temp3;
                            });
                        }
                        if (configdata[currentScreent].screen == '433' || configdata[currentScreent].screen == '465'
                            || configdata[currentScreent].screen == '497') {
                            let c4el1 = document.getElementById("inp1");
                            let c4el2 = document.getElementById("inp2");
                            let c4el3 = document.getElementById("inp3");
                            let c4el4 = document.getElementById("inp4");
                            let c4fieldStartTime1;
                            let c4fieldStartTime2;
                            let c4fieldStartTime3;
                            let c4fieldStartTime4;
                            let c4fieldEndTime1;
                            let c4fieldEndTime2;
                            let c4fieldEndTime3;
                            let c4fieldEndTime4;
                            let c4field1keycount = 0;
                            let c4field2keycount = 0;
                            let c4field3keycount = 0;
                            let c4field4keycount = 0;
                            let c4inputData1 = "";
                            let c4inputData2 = "";
                            let c4inputData3 = "";
                            let c4inputData4 = "";
                            round = 4;
                            c4el1.addEventListener('keyup', function (e) {
                                if (e.target  && isKeyboad) {
                                    if(c4field1keycount <=2){
                                        if(  e.key.match(new RegExp( "[a-z]",'gi')) && e.key.length<=1){
                                           c4inputData1 = c4inputData1 + e.key;
                                        }else{
                                            if(e.key != "Enter"){
                                                c4inputData1 = c4inputData1 + '{' + e.key + '}';
                                            }
                                        }
                                        if(c4field1keycount == 1){
                                            orderOffUserInput.push("1");}
                                        if(c4field1keycount <= 2){
                                            configdata[currentScreent-1].firstResponse['inp1'] = c4inputData1;
                                            //console.log("appended to configdata: ",configdata[currentScreent-1].firstResponse['inp1']);
                                        }
                                    }
                                }else{
                                    if(c4field1keycount <=2){
                                        if(  e.target.value.match(new RegExp( "[a-z]",'gi')) && e.target.value<=1){
                                            c4inputData1 = c4inputData1 + e.target.value;
                                            
                                        }else{
                                            //c4inputData1 = e.target.value ; //inputkeyPress + '{' + e.target.value + '}';
                                            if(e.key == 'undefined' || e.key == 'Unidentified' || e.key == 'Process'){
                                                c4inputData1 = e.target.value ; //inputkeyPress + '{' + e.target.value + '}';
                                                console.log("c4inputData1: ", c4inputData1);
                                            }else{
                                                c4inputData1 = c4inputData1 +  e.key  ; 
                                            }
                                        }
                                        if(c4field1keycount == 1){
                                            orderOffUserInput.push("1");
                                        }
                                        if(c4field1keycount <= 2){
                                            //alert("c4inputData1: "+ c4inputData1);
                                            configdata[currentScreent-1].firstResponse['inp1'] = c4inputData1;
                                        }
                                    }
                                }
                                c4field1keycount++;
                            });
                            c4el2.addEventListener('keyup', function (e) {
                                if (e.target  && isKeyboad) {
                                    if(c4field2keycount <=2){
                                        if(  e.key.match(new RegExp( "[a-z]",'gi')) && e.key.length<=1){
                                           c4inputData2 = c4inputData2 + e.key;
                                        }else{
                                            if(e.key != "Enter"){
                                                c4inputData2 = c4inputData2 + '{' + e.key + '}';
                                            }
                                        }
                                        if(c4field2keycount == 1){
                                            orderOffUserInput.push("2");}
                                        if(c4field2keycount <= 2){
                                            configdata[currentScreent-1].firstResponse['inp2'] = c4inputData2;
                                            //console.log("appended to configdata: ",configdata[currentScreent-1].firstResponse['inp2']);
                                        }
                                    }
                                }else{
                                    if(c4field2keycount <=2){
                                        if(  e.target.value.match(new RegExp( "[a-z]",'gi')) && e.target.value<=1){
                                            c4inputData2 = c4inputData2 + e.target.value;
                                            
                                        }else{
                                            //c4inputData2 = e.target.value ; //inputkeyPress + '{' + e.target.value + '}';
                                            if(e.key == 'undefined' || e.key == 'Unidentified' || e.key == 'Process'){
                                                c4inputData2 = e.target.value ; //inputkeyPress + '{' + e.target.value + '}';
                                                console.log("c4inputData2: ", c4inputData2);
                                            }else{
                                                c4inputData2 = c4inputData2 + e.key ; 
                                            }
                                        }
                                        if(c4field2keycount == 1){
                                            orderOffUserInput.push("2");
                                        }
                                        if(c4field2keycount <= 2){
                                            //alert("c4inputData2: "+ c4inputData2);
                                            configdata[currentScreent-1].firstResponse['inp2'] = c4inputData2;
                                        }
                                    }
                                }
                                c4field2keycount++;
                            });
                            c4el3.addEventListener('keyup', function (e) {
                                if (e.target  && isKeyboad) {
                                    if(c4field3keycount <=2){
                                        if(  e.key.match(new RegExp( "[a-z]",'gi')) && e.key.length<=1){
                                           c4inputData3 = c4inputData3 + e.key;
                                        }else{
                                            if(e.key != "Enter"){
                                                c4inputData3 = c4inputData3 + '{' + e.key + '}';
                                            }
                                        }
                                        if(c4field3keycount == 1){
                                            orderOffUserInput.push("3");}
                                        if(c4field3keycount <= 2){
                                            configdata[currentScreent-1].firstResponse['inp3'] = c4inputData3;
                                            //console.log("appended to configdata: ",configdata[currentScreent-1].firstResponse['inp3']);
                                        }
                                    }
                                }else{
                                    if(c4field3keycount <=2){
                                        if(  e.target.value.match(new RegExp( "[a-z]",'gi')) && e.target.value<=1){
                                            c4inputData3 = c4inputData3 + e.target.value;
                                            
                                        }else{
                                            //c4inputData3 = e.target.value ; //inputkeyPress + '{' + e.target.value + '}';
                                            if(e.key == 'undefined' || e.key == 'Unidentified' || e.key == 'Process'){
                                                c4inputData3 = e.target.value ; //inputkeyPress + '{' + e.target.value + '}';
                                                console.log("c4inputData3: ", c4inputData3);
                                            }else{
                                                c4inputData3 = c4inputData3 + e.key ; 
                                            }
                                        }
                                        if(c4field3keycount == 1){
                                            orderOffUserInput.push("3");
                                        }
                                        if(c4field3keycount <= 2){
                                            //alert("c4inputData3: "+ c4inputData3);
                                            configdata[currentScreent-1].firstResponse['inp3'] = c4inputData3;
                                        }
                                    }
                                }
                                c4field3keycount++;
                            });
                            c4el4.addEventListener('keyup', function (e) {
                                if (e.target  && isKeyboad) {
                                    if(c4field4keycount <=2){
                                        if(  e.key.match(new RegExp( "[a-z]",'gi')) && e.key.length<=1){
                                           c4inputData4 = c4inputData4 + e.key;
                                        }else{
                                            if(e.key != "Enter"){
                                                c4inputData4 = c4inputData4 + '{' + e.key + '}';
                                            }
                                        }
                                        if(c4field4keycount == 1){
                                            orderOffUserInput.push("4");}
                                        if(c4field4keycount <= 2){
                                            configdata[currentScreent-1].firstResponse['inp4'] = c4inputData4;
                                            //console.log("appended to configdata: ",configdata[currentScreent-1].firstResponse['inp4']);
                                        }
                                    }
                                }else{
                                    if(c4field4keycount <=2){
                                        if(  e.target.value.match(new RegExp( "[a-z]",'gi')) && e.target.value<=1){
                                            c4inputData4 = c4inputData4 + e.target.value;
                                            
                                        }else{
                                            //c4inputData4 = e.target.value ; //inputkeyPress + '{' + e.target.value + '}';
                                            if(e.key == 'undefined' || e.key == 'Unidentified' || e.key == 'Process'){
                                                c4inputData4 = e.target.value ; //inputkeyPress + '{' + e.target.value + '}';
                                                console.log("c4inputData4: ", c4inputData4);
                                            }else{
                                                c4inputData4 = c4inputData4 + e.key ; 
                                            }
                                        }
                                        if(c4field4keycount == 1){
                                            orderOffUserInput.push("4");
                                        }
                                        if(c4field4keycount <= 2){
                                            //alert("c4inputData4: "+ c4inputData4);
                                            configdata[currentScreent-1].firstResponse['inp4'] = c4inputData4;
                                        }
                                    }
                                }
                                c4field4keycount++;
                            });
                            c4el1.addEventListener('focus', function (e) {
                                c4fieldStartTime1 = new Date();
                                FieldOnFocus = c4el1;
                            });
                            c4el1.addEventListener('blur', function (e) {
                                c4fieldEndTime1 = new Date();
                                let c4temp1 = c4fieldEndTime1 - c4fieldStartTime1;
                                fieldTotalTime1 = fieldTotalTime1 + c4temp1;
                            });
                            c4el2.addEventListener('focus', function (e) {
                                c4fieldStartTime2 = new Date();
                                FieldOnFocus = c4el2;
                            });
                            c4el2.addEventListener('blur', function (e) {
                                c4fieldEndTime2 = new Date();
                                let c4temp2 = c4fieldEndTime2 - c4fieldStartTime2;
                                fieldTotalTime2 = fieldTotalTime2 + c4temp2;
                            });
                            c4el3.addEventListener('focus', function (e) {
                                c4fieldStartTime3 = new Date();
                                FieldOnFocus = c4el3;
                            });
                            c4el3.addEventListener('blur', function (e) {
                                c4fieldEndTime3 = new Date();
                                let c4temp3 = c4fieldEndTime3 - c4fieldStartTime3;
                                fieldTotalTime3 = fieldTotalTime3 + c4temp3;
                            });
                            c4el4.addEventListener('focus', function (e) {
                                c4fieldStartTime4 = new Date();
                                FieldOnFocus = c4el4;
                            });
                            c4el4.addEventListener('blur', function (e) {
                                c4fieldEndTime4 = new Date();
                                let c4temp4 = c4fieldEndTime4 - c4fieldStartTime4;
                                fieldTotalTime4 = fieldTotalTime4 + c4temp4;
                            });
                        }
                        if (configdata[currentScreent].screen == '0' || configdata[currentScreent].screen == '73'
                            || configdata[currentScreent].screen == '114' || configdata[currentScreent].screen == '146'
                            || configdata[currentScreent].screen == '178' || configdata[currentScreent].screen == '210'
                            || configdata[currentScreent].screen == '242' || configdata[currentScreent].screen == '274'
                            || configdata[currentScreent].screen == '306' || configdata[currentScreent].screen == '338'
                            || configdata[currentScreent].screen == '370' || configdata[currentScreent].screen == '402'
                            || configdata[currentScreent].screen == '434' || configdata[currentScreent].screen == '466'
                            || configdata[currentScreent].screen == '498') {
                            if (configdata[currentScreent].screen == '73') {
                                //Practice Round 0
                                roundTotalTime = timedata - roundStartTime;
                                helper.participantGameInfoUpdateTotalTimeRoundOne(component, event, helper, userContactId, gameId, participantGameInfoId, roundTotalTime, configdata[currentScreent].screen);
                                roundTotalTime = 0;
                                //console.log("totalTimeForRoundZero : ", roundTotalTime);
                            } else if (configdata[currentScreent].screen == '114') {
                                // Practice trial category 2
                                //currently we are not capturing the total time for practice round. uncomment the helper method call if needed in future.
                                let practiceRoundTime = timedata - roundStartTime;

                                roundTotalTime = roundTotalTime + practiceRoundTime;
                                //console.log("totalTimeForRound Practice trial category 2  : ", roundTotalTime);
                               // helper.participantGameInfoUpdateTotalTimeRoundOne(component, event, helper, userContactId, gameId, participantGameInfoId, roundTotalTime, configdata[currentScreent].screen);
                                roundTotalTime = 0;
                            } else if (configdata[currentScreent].screen == '146') {
                                // category 1 trial 1

                                let c1t1TotalTime = timedata - roundStartTime;
                                roundTotalTime = roundTotalTime + c1t1TotalTime;
                                //console.log("totalTimeForRound category 1 trial 1  : ", roundTotalTime);
                            } else if (configdata[currentScreent].screen == '178') {
                                // category 1 trial 2

                                let c1t2TotalTime = timedata - roundStartTime;
                                roundTotalTime = roundTotalTime + c1t2TotalTime;
                                //console.log("totalTimeForRound category 1 trial 2 : ", roundTotalTime);
                            } else if (configdata[currentScreent].screen == '210') {
                                // category 1 trial 3

                                let c1t3TotalTime = timedata - roundStartTime;
                                roundTotalTime = roundTotalTime + c1t3TotalTime;
                                //console.log("totalTimeForRound category 1  : ", roundTotalTime);
                                helper.participantGameInfoUpdateTotalTimeRoundOne(component, event, helper, userContactId, gameId, participantGameInfoId, roundTotalTime, configdata[currentScreent].screen);
                                roundTotalTime = 0;
                            } else if (configdata[currentScreent].screen == '242') {
                                // category 2 trial 1

                                let c2t1TotalTime = timedata - roundStartTime;
                                roundTotalTime = roundTotalTime + c2t1TotalTime;
                                //console.log("totalTimeForRound category 2 trial 1 : ", roundTotalTime);
                            } else if (configdata[currentScreent].screen == '274') {
                                // category 2 trial 2

                                let c2t2TotalTime = timedata - roundStartTime;
                                roundTotalTime = roundTotalTime + c2t2TotalTime;
                                //console.log("totalTimeForRound category 2 trial 2 : ", roundTotalTime);
                            } else if (configdata[currentScreent].screen == '306') {
                                // category 2 trial 3

                                let c2t3TotalTime = timedata - roundStartTime;
                                roundTotalTime = roundTotalTime + c2t3TotalTime;
                                //console.log("totalTimeForRound category 2 trial 3 : ", roundTotalTime);
                                helper.participantGameInfoUpdateTotalTimeRoundOne(component, event, helper, userContactId, gameId, participantGameInfoId, roundTotalTime, configdata[currentScreent].screen);
                                roundTotalTime = 0;
                            } else if (configdata[currentScreent].screen == '338') {
                                // category 3 trial 1

                                let c3t1TotalTime = timedata - roundStartTime;
                                roundTotalTime = roundTotalTime + c3t1TotalTime;
                                //console.log("totalTimeForRound category 3 trial 1 : ", roundTotalTime);
                            } else if (configdata[currentScreent].screen == '370') {
                                // category 3 trial 2

                                let c3t2TotalTime = timedata - roundStartTime;
                                roundTotalTime = roundTotalTime + c3t2TotalTime;
                                //console.log("totalTimeForRound category 3 trial 2 : ", roundTotalTime);
                            } else if (configdata[currentScreent].screen == '402') {
                                // category 3 trial 3

                                let c3t3TotalTime = timedata - roundStartTime;
                                roundTotalTime = roundTotalTime + c3t3TotalTime;
                                //console.log("totalTimeForRound category 3 trial 3 : ", roundTotalTime);
                                helper.participantGameInfoUpdateTotalTimeRoundOne(component, event, helper, userContactId, gameId, participantGameInfoId, roundTotalTime, configdata[currentScreent].screen);
                                roundTotalTime = 0;
                            } else if (configdata[currentScreent].screen == '434') {
                                // category 4 trial 1

                                let c4t1TotalTime = timedata - roundStartTime;
                                roundTotalTime = roundTotalTime + c4t1TotalTime;
                                //console.log("totalTimeForRound category 4 trial 1 : ", roundTotalTime);
                            } else if (configdata[currentScreent].screen == '466') {
                                // category 4 trial 2

                                let c4t2TotalTime = timedata - roundStartTime;
                                roundTotalTime = roundTotalTime + c4t2TotalTime;
                                //console.log("totalTimeForRound category 4 trial 2 : ", roundTotalTime);
                            } else if (configdata[currentScreent].screen == '498') {
                                // category 4 trial 3

                                let c4t3TotalTime = timedata - roundStartTime;
                                roundTotalTime = roundTotalTime + c4t3TotalTime;
                                //console.log("totalTimeForRound category 4 trial 3 : ", roundTotalTime);
                                helper.participantGameInfoUpdateTotalTimeRoundOne(component, event, helper, userContactId, gameId, participantGameInfoId, roundTotalTime, configdata[currentScreent].screen);
                                roundTotalTime = 0;
                            }

                            roundStartTime = timedata;
                            //console.log('round start time: ', roundStartTime);
                        }

                        //Changes for touch
                        if (!isKeyboad) {
                            document.getElementById("gameMainContent").removeEventListener('click', gotoNextScreen, false);
                            if (configdata[currentScreent].hasOwnProperty('isTouch')) {
                                document.getElementById("gameMainContent").addEventListener('click', gotoNextScreen, false);
                            }
                             if(configdata[currentScreent].instructionsLeft != 'undefined' &&
                                     configdata[currentScreent].instructionsLeft){
                                window.scrollTo(0,0);
                            } 
                        }
                        //end changes for touch goto  function  gotoNextScreen
                        if (configdata[currentScreent].instructionsLeft == true) {
                            document.getElementById("gameMainContent").classList.add("instructionsLeft");
                        }else{
                            document.getElementById("gameMainContent").classList.remove("instructionsLeft"); 
                        }

                        let userinputbtn = document.querySelectorAll(".inputbtn");
                        if (typeof (userinputbtn) != 'undefined' && userinputbtn != null) {
                            userinputbtn.forEach(item => { item.addEventListener('click', userInputResponse, false); });
                        }

                        let userinputtexttwo = document.querySelectorAll(".inputtexttwo");
                        if (typeof (userinputtexttwo) != 'undefined' && userinputtexttwo != null && userinputtexttwo.length > 0) {
                            userinputtexttwo[0].focus();
                            userinputtexttwo.forEach(item => { item.addEventListener('keyup', userInputTwoResponse, false); });
                        }

                        if (currentScreent > 0) {
                            let isResult = configdata[currentScreent - 1].hasOwnProperty("result") ? true : false;
                            let lastdata = lastdatatitle
                            //let lastdata = document.getElementById("d_title").innerHTML;
                            if (lastdata.length <= 0 && isResult == true && !configdata[currentScreent - 1].isPractice) {
                                //console.log("End Data", configdata[currentScreent - 1].answer)
                                //Result Data
                                resultData[configdata[currentScreent - 1].screen] = {
                                    "duration": configdata[currentScreent - 1].endDuration,
                                    "status": { res_sts1: "false" },
                                    "data": inputdata,
                                    "question": configdata[currentScreent - 1].question,
                                    "isPractice": configdata[currentScreent - 1].isPractice,
                                    "correctAnswer": configdata[currentScreent - 1].answer,
                                    "firstResponse": configdata[currentScreent - 1].firstResponse
                                };
                                lastdatatitle = "Result";

                                //Save Output Events
                                let currentgamedata = resultData[configdata[currentScreent - 1].screen];
                                Object.keys(currentgamedata.status).forEach((vv, kk) => {
                                    console.log('count1:--------',vv,kk);
                                    let questionSaved =  currentgamedata.question;
                                    let dataSaved = currentgamedata.data["fld" + (kk + 1)];
                                    let resSaved = currentgamedata.status["res_sts" + (kk + 1)];
                                    let durationSaved = currentgamedata.duration;
                                    let ispracticeSaved = currentgamedata.isPractice;
                                    let answerSaved = currentgamedata.correctAnswer["fld" + (kk + 1)];                                    
                                    setTimeout(function() {
                                        saveData(
                                            "KEEPTRACK",
                                            questionSaved,
                                            dataSaved,
                                            resSaved,
                                            durationSaved,
                                            ispracticeSaved,
                                            answerSaved
                                        );        
                                    }, 1000);                                    
                                });

                                //Front Result Output Data Intigration time comment or Remove 3 lines
                                document.getElementById("d_title").innerHTML = "Result";
                                document.getElementById("d_txt").innerHTML = configdata[currentScreent - 1].endDuration + " ms";
                                document.getElementById("d_status").innerHTML = resultData[configdata[currentScreent - 1].screen]["status"];
                                setTimeout(clearResult, 1000);
                                totalTrialTime = 0;
                                orderOffUserInput = [];
                                timeForCategories = {};
                                firstThreeKeys = [];
                            }
                        }

                        //Initial and end Game
                        // if (currentScreent == 3) {
                        //     //console.log('change screen',currentScreent);
                        //     //console.log('my testcode updateGameNameInParticipantGameInfo :',gameId,participantGameInfoId,ipAddress,browserName,device);
                        //     updateGameNameInParticipantGameInfo(gameId, participantGameInfoId, ipAddress, browserName, device);
                        // }
                        if (currentScreent == 1) {
                            //console.log('change screen',currentScreent);
                            var startDateTime = new Date();
                            var gamePlayStatus = "Not-Completed";
                            var screenResolution = {"height" :screenHeight, "width" :screenWidth };
                           // console.log('participantGameInfo record create---------- screen 0',userContactId, gameId, startDateTime, gamePlayStatus,ipAddress,browserName,device);
                            helper.participantGameInfo(component, event, helper, userContactId,language, gameId, startDateTime, gamePlayStatus,ipAddress,browserName,device,screenResolution);
                            
                        }
                        else {
                            //console.log('screens are changing');
                        }

                        // end game function is updating the record of participant gameInfo like endDateTime.
                        if ((configdata.length - 1) == currentScreent) {
                            endGame(gameId, participantGameInfoId);
                            clearTimeout(intervalTime);
                            return false;
                        }

                        //Change New Screen Default
                        if ((configdata.length - 1) > currentScreent) {
                            if (configdata[currentScreent].endDuration != 0)
                                intervalTime = setTimeout(changeScreen, configdata[currentScreent].endDuration);

                            currentScreent = currentScreent + 1;
                        } else {
                            clearTimeout(intervalTime);
                        }
                        inputdata = {};
                        document.getElementById("gameMainContent").style = "pointer-events:unset";
                    }

                    //Event Control System
                    window.addEventListener('keyup', gamePlay, false);



                    function userInputResponse(e) {

                        if ((configdata[currentScreent - 1].hasOwnProperty("answer")) && e.target.value == configdata[currentScreent - 1].answer.fld1) {

                            result_time = new Date() - timedata;

                            resultData[configdata[currentScreent - 1].screen] = {
                                "duration": result_time,
                                "status": { res_sts1: "true" },
                                "data": { "fld1": e.target.value },
                                "question": configdata[currentScreent - 1].question,
                                "isPractice": configdata[currentScreent - 1].isPractice,
                                "correctAnswer": configdata[currentScreent - 1].answer,
                                "firstResponse": configdata[currentScreent- 1].firstResponse
                            };
                            lastdatatitle = "Result";

                            //Save Output Events
                            let currentgamedata = resultData[configdata[currentScreent - 1].screen];
                            Object.keys(currentgamedata.status).forEach((vv, kk) => {
                                console.log('count2:--------',vv,kk);
                                let questionSaved =  currentgamedata.question;
                                let dataSaved = currentgamedata.data["fld" + (kk + 1)];
                                let resSaved = currentgamedata.status["res_sts" + (kk + 1)];
                                let durationSaved = currentgamedata.duration;
                                let ispracticeSaved = currentgamedata.isPractice;
                                let answerSaved = currentgamedata.correctAnswer["fld" + (kk + 1)]; 
                                setTimeout(function() {
                                    saveData(
                                        "KEEPTRACK",
                                        questionSaved,
                                        dataSaved,
                                        resSaved,
                                        durationSaved,
                                        ispracticeSaved,
                                        answerSaved
                                    );        
                                }, 1000);
                            });

                            //Front Result Output Data Intigration time comment or Remove 3 lines
                            document.getElementById("d_title").innerHTML = "Result";
                            document.getElementById("d_txt").innerHTML = result_time + " ms";
                            document.getElementById("d_status").innerHTML = resultData[configdata[currentScreent - 1].screen]["status"];

                            setTimeout(clearResult, 1500);
                            totalTrialTime = 0;
                            orderOffUserInput = [];
                            timeForCategories = {};
                            firstThreeKeys = [];

                            if(configdata[currentScreent - 1].isPractice){
                               
                                resetError2(0);
                                //setTimeout(resetError2, 1500);
                                setTimeout(() => { 
                                    resetError2();
                                    changeScreen(); 
                                   
                            }, 1000);

                            }else{
                                changeScreen();
                            }
                        } else {
                            resetError(0);
                            setTimeout(resetError, 1500);
                        }
                    }

                    function resetError(msgstatus = 1) {
                        document.getElementById("errorblock").style = (msgstatus == 1) ? "display:none" : "display:inline";
                        //document.getElementById("datablock_keepTrackGame").style = (msgstatus == 1) ? "display:inline" : "display:none";
                    }
                    function resetError2(msgstatus = 1) {
                        document.getElementById("errorblock2").style = (msgstatus == 1) ? "display:none" : "display:inline";
                        document.getElementById("errorblock").style = "display:none";
                        document.getElementById("gameMainContent").style = "pointer-events:none";
                        
                        //document.getElementById("datablock_keepTrackGame").style = (msgstatus == 1) ? "display:inline" : "display:none";
                    }

                    function userInputTwoResponse(e) {
                        inputdata[e.target.name] = ((e.target.value).trimEnd()).toLowerCase();
                    }


                    //Inisilize the page processing
                    changeScreen();

                    function gamePlayEnter(){ 
                        //console.log("clicked enter button");
                        //console.log('test 1');
                       // keybuttonEvent = true;
                        gamePlay({keyCode:13});
                     
                       
                   }



                    function gamePlay(e) {

                        command_value = e.keyCode;
                        if (command_value == 13) {
                            FieldOnFocus.blur();
                            if (configdata[currentScreent - 1].screen == '112' || configdata[currentScreent - 1].screen == '241'
                                || configdata[currentScreent - 1].screen == '273' || configdata[currentScreent - 1].screen == '305') {
                                totalTrialTime = fieldTotalTime1 + fieldTotalTime2;
                                timeForCategories = { "fieldTotalTime1": fieldTotalTime1, "fieldTotalTime2": fieldTotalTime2 };

                                fieldTotalTime1 = 0;
                                fieldTotalTime2 = 0;

                            } else if (configdata[currentScreent - 1].screen == '145' || configdata[currentScreent - 1].screen == '177'
                                || configdata[currentScreent - 1].screen == '209') {
                                totalTrialTime = fieldTotalTime1;
                                timeForCategories = { "fieldTotalTime1": fieldTotalTime1 };

                                fieldTotalTime1 = 0;

                            } else if (configdata[currentScreent - 1].screen == '337' || configdata[currentScreent - 1].screen == '369'
                                || configdata[currentScreent - 1].screen == '401') {
                                totalTrialTime = fieldTotalTime1 + fieldTotalTime2 + fieldTotalTime3;
                                timeForCategories = { "fieldTotalTime1": fieldTotalTime1, "fieldTotalTime2": fieldTotalTime2, "fieldTotalTime3": fieldTotalTime3 };

                                fieldTotalTime1 = 0;
                                fieldTotalTime2 = 0;
                                fieldTotalTime3 = 0;

                            } else if (configdata[currentScreent - 1].screen == '433' || configdata[currentScreent - 1].screen == '465'
                                || configdata[currentScreent - 1].screen == '497') {
                                totalTrialTime = fieldTotalTime1 + fieldTotalTime2 + fieldTotalTime3 + fieldTotalTime4;
                                timeForCategories = { "fieldTotalTime1": fieldTotalTime1, "fieldTotalTime2": fieldTotalTime2, "fieldTotalTime3": fieldTotalTime3, "fieldTotalTime4": fieldTotalTime4 };


                                fieldTotalTime1 = 0;
                                fieldTotalTime2 = 0;
                                fieldTotalTime3 = 0;
                                fieldTotalTime4 = 0;


                            }

                        }
                        //  //console.log('command-',command_value);
                        let startDurations = configdata[currentScreent - 1].startDuration;

                        //Press spacific key command
                        if (startDurations == -1) {
                            if (configdata[currentScreent - 1].hasOwnProperty("command") && command_value >= configdata[currentScreent - 1].command[0] && command_value <= configdata[currentScreent - 1].command[1]) {
                                clearTimeout(intervalTime); //Move the code 9 July
                                changeScreen();
                            }
                        } else if (startDurations == 0) {

                        }
                        //In between process to go executed
                        else if (startDurations > 0) {

                            let isResult = configdata[currentScreent - 1].hasOwnProperty("result") ? true : false;

                            result_time = new Date() - timedata;

                            //Block before click
                            if (result_time < startDurations) return false;

                            //Result Calculation
                            if (isResult) {
                                if (!resultData.hasOwnProperty(configdata[currentScreent - 1].screen)) {
                                  
                                    resultData[configdata[currentScreent - 1].screen] = {
                                        "duration": "0",
                                        "status": { res_sts1: "false" },
                                        "data": "",
                                        "question": configdata[currentScreent - 1].question,
                                        "isPractice": configdata[currentScreent - 1].isPractice,
                                        "correctAnswer": configdata[currentScreent - 1].answer,
                                        "totalTimeForUserResponce": totalTrialTime,
                                        "orderOffUserInput": orderOffUserInput,
                                        "timeForCategories": timeForCategories
  
                                    };
                                    //console.log('count3:--------',resultData[configdata[currentScreent - 1].screen],timeForCategories);
                                }
                            }

                            if (result_time >= startDurations) {

                                if (configdata[currentScreent - 1].hasOwnProperty("command")) {
                                    //Command Value Match Data
                                    if (command_value >= configdata[currentScreent - 1].command[0] && command_value <= configdata[currentScreent - 1].command[1]) {

                                        //Result Calculation
                                        if (isResult) {

                                            resultData[configdata[currentScreent - 1].screen]["data"] = inputdata;
                                            resultData[configdata[currentScreent - 1].screen]["duration"] = result_time;
                                            let lengthofanwer = Object.keys(configdata[currentScreent - 1].answer).length;


                                            if (lengthofanwer == 1) {
                                                resultData[configdata[currentScreent - 1].screen]["status"]["res_sts1"] = "false";
                                                if (inputdata.hasOwnProperty("fld1")) {
                                                    if (configdata[currentScreent - 1].answer["fld1"] == inputdata["fld1"].toLowerCase())
                                                        resultData[configdata[currentScreent - 1].screen]["status"]["res_sts1"] = "true";
                                                } else {
                                                    inputdata["fld1"] = "";
                                                }

                                            } else if (lengthofanwer == 2) {
                                                resultData[configdata[currentScreent - 1].screen]["status"]["res_sts1"] = "false";
                                                resultData[configdata[currentScreent - 1].screen]["status"]["res_sts2"] = "false";
                                                if (inputdata.hasOwnProperty("fld1")) {
                                                    if (configdata[currentScreent - 1].answer["fld1"] == inputdata["fld1"].toLowerCase())
                                                        resultData[configdata[currentScreent - 1].screen]["status"]["res_sts1"] = "true";
                                                } else {
                                                    inputdata["fld1"] = "";
                                                }

                                                if (inputdata.hasOwnProperty("fld2")) {
                                                    if (configdata[currentScreent - 1].answer["fld2"] == inputdata["fld2"].toLowerCase())
                                                        resultData[configdata[currentScreent - 1].screen]["status"]["res_sts2"] = "true";
                                                } else {
                                                    inputdata["fld2"] = "";
                                                }


                                            } else if (lengthofanwer == 3) {
                                                resultData[configdata[currentScreent - 1].screen]["status"]["res_sts1"] = "false";
                                                resultData[configdata[currentScreent - 1].screen]["status"]["res_sts2"] = "false";
                                                resultData[configdata[currentScreent - 1].screen]["status"]["res_sts3"] = "false";

                                                if (inputdata.hasOwnProperty("fld1")) {
                                                    if (configdata[currentScreent - 1].answer["fld1"] == inputdata["fld1"].toLowerCase())
                                                        resultData[configdata[currentScreent - 1].screen]["status"]["res_sts1"] = "true";
                                                } else {
                                                    inputdata["fld1"] = "";
                                                }

                                                if (inputdata.hasOwnProperty("fld2")) {
                                                    if (configdata[currentScreent - 1].answer["fld2"] == inputdata["fld2"].toLowerCase())
                                                        resultData[configdata[currentScreent - 1].screen]["status"]["res_sts2"] = "true";
                                                } else {
                                                    inputdata["fld2"] = "";
                                                }

                                                if (inputdata.hasOwnProperty("fld3")) {
                                                    if (configdata[currentScreent - 1].answer["fld3"] == inputdata["fld3"].toLowerCase())
                                                        resultData[configdata[currentScreent - 1].screen]["status"]["res_sts3"] = "true";
                                                } else {
                                                    inputdata["fld3"] = "";
                                                }

                                            } else if (lengthofanwer == 4) {

                                                resultData[configdata[currentScreent - 1].screen]["status"]["res_sts1"] = "false";
                                                resultData[configdata[currentScreent - 1].screen]["status"]["res_sts2"] = "false";
                                                resultData[configdata[currentScreent - 1].screen]["status"]["res_sts3"] = "false";
                                                resultData[configdata[currentScreent - 1].screen]["status"]["res_sts4"] = "false";
                                                if (inputdata.hasOwnProperty("fld1")) {
                                                    if (configdata[currentScreent - 1].answer["fld1"] == inputdata["fld1"].toLowerCase())
                                                        resultData[configdata[currentScreent - 1].screen]["status"]["res_sts1"] = "true";
                                                } else {
                                                    inputdata["fld1"] = "";
                                                }

                                                if (inputdata.hasOwnProperty("fld2")) {
                                                    if (configdata[currentScreent - 1].answer["fld2"] == inputdata["fld2"].toLowerCase())
                                                        resultData[configdata[currentScreent - 1].screen]["status"]["res_sts2"] = "true";
                                                } else {
                                                    inputdata["fld2"] = "";
                                                }

                                                if (inputdata.hasOwnProperty("fld3")) {
                                                    if (configdata[currentScreent - 1].answer["fld3"] == inputdata["fld3"].toLowerCase())
                                                        resultData[configdata[currentScreent - 1].screen]["status"]["res_sts3"] = "true";
                                                } else {
                                                    inputdata["fld3"] = "";
                                                }

                                                if (inputdata.hasOwnProperty("fld4")) {
                                                    if (configdata[currentScreent - 1].answer["fld4"] == inputdata["fld4"].toLowerCase())
                                                        resultData[configdata[currentScreent - 1].screen]["status"]["res_sts4"] = "true";
                                                } else {
                                                    inputdata["fld4"] = "";
                                                }
                                            }

                                            resultData[configdata[currentScreent - 1].screen]["data"] = inputdata;
                                            lastdatatitle = "Result";

                                            //Save Output Events
                                            let currentgamedata = resultData[configdata[currentScreent - 1].screen];
                                            Object.keys(currentgamedata.status).forEach((vv, kk) => {
                                                console.log('count3:--------',vv,kk);
                                                let questionSaved =  currentgamedata.question;
                                                let dataSaved = currentgamedata.data["fld" + (kk + 1)];
                                                let resSaved = currentgamedata.status["res_sts" + (kk + 1)];
                                                let durationSaved = currentgamedata.duration;
                                                let ispracticeSaved = currentgamedata.isPractice;
                                                let answerSaved = currentgamedata.correctAnswer["fld" + (kk + 1)];
                                                let firstresponseSaved = configdata[currentScreent - 1].firstResponse["inp"+ (kk + 1)];                                                
                                                if(kk==0){
                                                    timeTest=timeForCategories.fieldTotalTime1;
                                                    saveData(
                                                        "KEEPTRACK",
                                                        questionSaved,
                                                        dataSaved,
                                                        resSaved,
                                                        durationSaved,
                                                        ispracticeSaved,
                                                        answerSaved,
                                                        firstresponseSaved
                                                    );
            
                                                }
                                                if(kk==1){
                                                    timeTest=timeForCategories.fieldTotalTime2;
                                                    setTimeout(function() {
                                                        saveData(
                                                            "KEEPTRACK",
                                                            questionSaved,
                                                            dataSaved,
                                                            resSaved,
                                                            durationSaved,
                                                            ispracticeSaved,
                                                            answerSaved,
                                                            firstresponseSaved
                                                        );
                                                    }, 1000);
                                                }
                                                if(kk==2){
                                                    timeTest=timeForCategories.fieldTotalTime3;
                                                    setTimeout(function() {
                                                        saveData(
                                                            "KEEPTRACK",
                                                            questionSaved,
                                                            dataSaved,
                                                            resSaved,
                                                            durationSaved,
                                                            ispracticeSaved,
                                                            answerSaved,
                                                            firstresponseSaved
                                                        );
                                                    }, 2000);
                                                }
                                                if(kk==3){
                                                    timeTest=timeForCategories.fieldTotalTime4;
                                                    setTimeout(function() {
                                                        saveData(
                                                            "KEEPTRACK",
                                                            questionSaved,
                                                            dataSaved,
                                                            resSaved,
                                                            durationSaved,
                                                            ispracticeSaved,
                                                            answerSaved,
                                                            firstresponseSaved
                                                        );
                                                    }, 3000);
                                                }                                                
                                            });

                                            //Out put result Intigration time comment or Remove 3 lines
                                            document.getElementById("d_title").innerHTML = "Result";
                                            document.getElementById("d_txt").innerHTML = result_time + " ms";
                                            document.getElementById("d_status").innerHTML = resultData[configdata[currentScreent - 1].screen]["status"];
                                            totalTrialTime = 0;
                                            orderOffUserInput = [];
                                            timeForCategories = {};
                                            firstThreeKeys = [];
                                        }

                                        //Clear Results
                                        setTimeout(clearResult, 1500);

                                        //Reset Screent Interval
                                        clearTimeout(intervalTime);
                                        //Next Screen Show
                                        changeScreen();



                                    }

                                }
                            }
                        }
                    }

                    function clearResult() {
                        lastdatatitle = "";
                        //Front Result Output Data Intigration time comment or Remove 3 lines
                        document.getElementById("d_title").innerHTML = "";
                        document.getElementById("d_txt").innerHTML = "";
                        document.getElementById("d_status").innerHTML = "";
                    }

                    //chnages for touch
                    function gotoNextScreen(e) {
                        gamePlay({ keyCode: 32 });
                        //console.log('e',e);
                    }
                    //chnages for touch end



                    function saveData(gameName, questionNumber, userInput, isCorrect, reactionTime, isPracticeQuestion, correctAnswer,firstResponse) {
                        console.log('my participantGameInfoId is testcode 4---:',participantGameInfoId,timeTest);
                        
                        helper.recorData(component, event, helper, userContactId, gameId, questionNumber, userInput, isCorrect, reactionTime, isPracticeQuestion, correctAnswer, participantGameInfoId, totalTrialTime, orderOffUserInput, timeTest, round, firstResponse);
                        //questionNumber
                        /*if (questionNumber == 49) {
                            document.getElementById("nextBtton").classList.remove("slds-hide");
                        }*/
                        console.log("Input Results", gameName, questionNumber, userInput, isCorrect, reactionTime, isPracticeQuestion,correctAnswer,correctAnswer,participantGameInfoId, totalTrialTime, orderOffUserInput, timeForCategories, round, firstThreeKeys);

                    }

                    //This startGame function get the gameid and create a participantGameInfo record and return record ID.
                    // function updateGameNameInParticipantGameInfo(gameId, participantGameInfoId, ipAddress, browserName, device) {
                    //     helper.gameNameInParticipantGameInfo(component, event, helper, userContactId, gameId, participantGameInfoId, ipAddress, browserName, device);//helper method calling here
                    //     //console.log('gameNameInParticipantGameInfo  screen 0fun',userContactId, gameId, participantGameInfoId, ipAddress, browserName, device);
                    // }

                    // This ensgame function works for the update participant gameInfo record like as end date time.
                    function endGame(gameId, participantGameInfoId) {
                        var endDateTime = new Date();
                        var gamePlayStatus = "Completed";
                        var screenResolution = {"height" :screenHeight, "width" :screenWidth };
                        helper.participantGameInfoUpdate(component, event, helper, userContactId,language, gameId, endDateTime, gamePlayStatus, participantGameInfoId,screenResolution);//helper method calling here.
                        //console.log('gameNameInParticipantGameInfo  screen 0',userContactId, gameId, endDateTime, gamePlayStatus, participantGameInfoId);

                    }
                }
                $A.get('e.refreshView').fire();
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
        // $A.enqueueAction(actionGame);
        $A.getCallback(function () {
            $A.enqueueAction(actionGame);
        })();
    }));
    }))
    .catch($A.getCallback((error) => {
        console.error('Fetch Error :-S', error);
    }));

    },
    // this function works for 'goto next page' when the game reach to the last question.
    goToNextPage: function (component, event, helper) {
        const urlParams = new URLSearchParams(document.location.search.substring(1));
        const product = urlParams.get('c__id');
        // window.location.href = "/research/s/complete" + '?' + 'id=' + product;
        helper.allowLeaving();
        window.location.href = $A.get("$Label.c.Community_Url") + "/s/" + $A.get("$Label.c.url_dashboard");
    },
    goToMyResultsPage: function (component, event, helper) {
        const urlParams = new URLSearchParams(document.location.search.substring(1));
        const product = urlParams.get('c__id');
        // window.location.href = "/research/s/complete" + '?' + 'id=' + product;
        helper.allowLeaving();
        window.location.href = $A.get("$Label.c.Community_Url") + "/s/" + $A.get("$Label.c.url_myresults");
    },
    closeModel: function (component, event, helper) {
        //console.log('No');
        // component.set('v.showConfirmDialog', false);
        window.location.href = $A.get("$Label.c.Community_Url") + '/s/' + $A.get("$Label.c.url_dashboard");
    }
})