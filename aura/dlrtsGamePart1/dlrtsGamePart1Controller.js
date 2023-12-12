({
    //myAction is called from the component. DLTRS game execution is working inside this.
    myAction: function (component, event, helper) {
        // document.cookie = 'cip=' + "";
        helper.preventLeaving();
        document.documentElement.addEventListener('keydown', function (e) {
            if ((e.keycode || e.which) == 32) {
                e.preventDefault();
            }
        }, false);

        //-----Gettung gameId from the apex function------------------

        
        var gameName = 'DLTRS';
        helper.gameDetails(component, event, helper, gameName);
        var gameId;
        var participantGameInfoId=null;
        var browserName;
        helper.printBrowser(component, event, helper);
        var device = $A.get("$Browser.formFactor");
        
        //==========================getting contactID and Ip from the Cookies.
        var contactId = null;
        var product = getCookie('c__id');//.split('=');
        console.log('contactId found.',product);
        if(product!=null){
            contactId = JSON.parse(atob(product));
        }
        console.log('contactId found.',contactId); 
        //contactId = atob(product);

        var ipAddress=null;     
        var forUserIp = getCookie('cip');//.split('=');
        console.log('forUserIp found.',forUserIp); 
        if(forUserIp!=null){
            console.log('NOT ipAddress found.',ipAddress);
            ipAddress = atob(forUserIp);
        }  

        console.log(' ipAddress found.',ipAddress); 
        //====================
        console.log('document.cookie rrrrrrrrrr = ', document.cookie);
        console.log('ipAddress found.',ipAddress); 
        component.set("v.ipAddress",ipAddress);

         //==========================
         function getCookie (name) {
            var cookieString = "; " + document.cookie;
            var parts = cookieString.split("; " + name + "=");
            if (parts.length === 2) {
                return parts.pop().split(";").shift();
            }
            return null;
        }
        
       // var urlParams = new URLSearchParams(document.location.search.substring(1));
       const urlParams = new URLSearchParams(document.location.search.substring(1));
       const  cs = urlParams.get('cs');
       let currentScreent = 0;
       if(cs!=null){
           console.log("cs1=", cs)
           currentScreent = Number(cs);
       }


        
        

        //---------DLRTS game JS-----------------
        let inputValue = "";
        let resultData = {}
        //let currentScreent = 0;
        let intervalTime = null
        let timedata = new Date();
        let result_time = 0;
        let command_value = 0;
        let image_path = $A.get("$Label.c.Community_Url")+"/resource/mindcrowd_style/images/";
        let clicked = false;
        var gameName = $A.get("$Label.c.Dltrs_Game_Text_1");
        var gameTime = '3 minutes';
        var startDateTime ;
        var gamePlayStatus ;
        var endDateTime ;

        //creating participant game info record.
        if (currentScreent == 0) {
             startDateTime = new Date();
             gamePlayStatus = "Not-Completed";
            helper.participantGameInfo(component, event, helper, contactId, gameId, startDateTime, gamePlayStatus);    
        } 

        //Configuration of data parts.
        const configdata = [ 
            {
                screen: "1", startDuration: -1, endDuration: 9999920000, isTouch:true, content: '<h3 class="title font34">' + $A.get("$Label.c.Dltrs_Game_Text_001") + ' <span> ' + gameName + '! </span> ' +'</h3>'
                    + '<h3 class="title">'+ $A.get("$Label.c.game_first_screen_text_2") + ' <span> ' + gameTime + ' </span> ' + $A.get("$Label.c.game_first_screen_text_3") + '</h3>'
                    + '<h3 class="title">'+ $A.get("$Label.c.games_get_started_text_1") +' </h3>'
                    + '<p class="centers mb10 s-b-instraction">'+ $A.get("$Label.c.games_spacebar_text_3") +' </p>'
                    + '<span class="game-lang">English</span> ', command: [32, 32]
            },

            {
                screen: "2", startDuration: -1, endDuration: 999998000,isTouch:true, content: '<h3 class="title font34">  <span> ' + $A.get("$Label.c.games_instruction_text") + ' </span> </h3>'+
                    '<h3 class="title">' + $A.get("$Label.c.Dltrs_Game_Text_12") +'   </h3>' +
                    '<h3 class="title"><span class="intractions-ball"><img src="' + image_path + 'sphere.png"></span></h3>'+
                    '<h3 class="title">' + $A.get("$Label.c.Dltrs_Game_Text_13") +'</h3>' +
                    '<p class="mb10 centers s-b-instraction">' + $A.get("$Label.c.games_spacebar_text_1") +'</p>', command: [32, 32]
            },
             
            {screen: "3", startDuration: -1, endDuration: 999998000,isTouch:true, content: '<h3 class="title">' + $A.get("$Label.c.Dltrs_Game_Text_18") +'</h3>' +
                    '<h3 class="title">' + $A.get("$Label.c.Dltrs_Game_Text_19") +'</h3>'+
                    '<h3 class="title font34"> <span>' + $A.get("$Label.c.Dltrs_Game_Text_20") +'</span> </h3>' +
                    '<p class="mb10 centers s-b-instraction">' + $A.get("$Label.c.games_spacebar_text_2") +'</p>', command: [32, 32] },


            { screen: "4", startDuration: 0, endDuration: 1000, content: '<p class="centers pinkImage"></p>' },
            { screen: "5", startDuration: 150, endDuration: 1500, content: '<p class="centers pinkImage"><img id="pinkImage" src="' + image_path + 'sphere.png"></p>', command: [65, 90], correctAnswer: "a-z", result: true, question: 1, isPractice: true },
            { screen: "6", startDuration: 0, endDuration: 1980, content: '<p class="centers pinkImage"></p>' },
            { screen: "7", startDuration: 150, endDuration: 1500, content: '<p class="centers pinkImage"><img id="pinkImage" src="' + image_path + 'sphere.png"></p>', command: [65, 90], correctAnswer: "a-z", result: true, question: 2, isPractice: true },
            { screen: "8", startDuration: 0, endDuration: 1870, content: '<p class="centers pinkImage"></p>' },
            { screen: "9", startDuration: 150, endDuration: 1500, content: '<p class="centers pinkImage"><img id="pinkImage" src="' + image_path + 'sphere.png"></p>', command: [65, 90], correctAnswer: "a-z", result: true, question: 3, isPractice: true },
            { screen: "10", startDuration: 0, endDuration: 1280, content: '<p class="centers pinkImage"></p>' },
            { screen: "11", startDuration: 150, endDuration: 1500, content: '<p class="centers pinkImage"><img id="pinkImage" src="' + image_path + 'sphere.png"></p>', command: [65, 90], correctAnswer: "a-z", result: true, question: 4, isPractice: true },
            { screen: "12", startDuration: 0, endDuration: 2720, content: '<p class="centers pinkImage"></p>' },
            { screen: "13", startDuration: 150, endDuration: 1500, content: '<p class="centers pinkImage"><img id="pinkImage" src="' + image_path + 'sphere.png"></p>', command: [65, 90], correctAnswer: "a-z", result: true, question: 5, isPractice: true },
            { screen: "14", startDuration: 0, endDuration: 2820, content: '<p class="centers pinkImage"></p>' },
            { screen: "15", startDuration: 150, endDuration: 1500, content: '<p class="centers pinkImage"><img id="pinkImage" src="' + image_path + 'sphere.png"></p>', command: [65, 90], correctAnswer: "a-z", result: true, question: 6, isPractice: true },
            { screen: "16", startDuration: 0, endDuration: 1050, content: '<p class="centers pinkImage "></p>' },
            { screen: "17", startDuration: 150, endDuration: 1500, content: '<p class="centers pinkImage"><img id="pinkImage" src="' + image_path + 'sphere.png"></p>', command: [65, 90], correctAnswer: "a-z", result: true, question: 7, isPractice: true },
            { screen: "18", startDuration: 0, endDuration: 2980, content: '<p class="centers pinkImage"></p>' },
            { screen: "19", startDuration: 150, endDuration: 1500, content: '<p class="centers pinkImage"><img id="pinkImage" src="' + image_path + 'sphere.png"></p>', command: [65, 90], correctAnswer: "a-z", result: true, question: 8, isPractice: true },
            { screen: "20", startDuration: 0, endDuration: 1820, content: '<p class="centers pinkImage"></p>' },
            { screen: "21", startDuration: 150, endDuration: 1500, content: '<p class="centers pinkImage"><img id="pinkImage" src="' + image_path + 'sphere.png"></p>', command: [65, 90], correctAnswer: "a-z", result: true, question: 9, isPractice: true },
            // { screen: "21", startDuration: 0, endDuration: 3000, content: '<p class="centers"></p><p class="txtmsg centers">' + $A.get("$Label.c.Dltrs_Game_Text_17") +'</p>' },
            { screen: "22", startDuration: 0, endDuration: 1000, content: '<p class="centers pinkImage"></p>' },
            
            {screen: "23", startDuration: -1, endDuration: 999998000,isTouch:true, content: '<h3 class="title">' + $A.get("$Label.c.Dltrs_Game_Text_20a") +'</h3>' +
                   
                    '<p class="mb10 centers s-b-instraction">' + $A.get("$Label.c.games_spacebar_text_1") +'</p>', command: [32, 32] },
            { screen: "24", startDuration: 0, endDuration: 1000, content: '<p class="centers"></p>', command: [100, 100] },

            // { screen: "25", startDuration: -1, endDuration: 999998000,isTouch:true, content: '<p class="centers"></p><p class="txtmsg centers">' + $A.get("$Label.c.Dltrs_Game_Text_23") +' </p>',command: [32, 32] },


            { screen: "26", startDuration: 150, endDuration: 1500, content: '<p class="centers pinkImage"><img id="pinkImage" src="' + image_path + 'sphere.png"></p>', command: [65, 90], correctAnswer: "a-z", result: true, question: 1, isPractice: false },
            { screen: "27", startDuration: 0, endDuration: 1980, content: '<p class="centers pinkImage"></p>' },
            { screen: "28", startDuration: 150, endDuration: 1500, content: '<p class="centers pinkImage"><img id="pinkImage" src="' + image_path + 'sphere.png"></p>', command: [65, 90], correctAnswer: "a-z", result: true, question: 2, isPractice: false },
            { screen: "29", startDuration: 0, endDuration: 1980, content: '<p class="centers pinkImage"></p>' },
            { screen: "30", startDuration: 150, endDuration: 1500, content: '<p class="centers  pinkImage"><img id="pinkImage" src="' + image_path + 'sphere.png"></p>', command: [65, 90], correctAnswer: "a-z", result: true, question: 3, isPractice: false },
            { screen: "31", startDuration: 0, endDuration: 1980, content: '<p class="centers pinkImage"></p>' },
            { screen: "32", startDuration: 150, endDuration: 1500, content: '<p class="centers pinkImage"><img id="pinkImage" src="' + image_path + 'sphere.png"></p>', command: [65, 90], correctAnswer: "a-z", result: true, question: 4, isPractice: false },
            { screen: "33", startDuration: 0, endDuration: 1980, content: '<p class="centers pinkImage"></p>' },
            { screen: "34", startDuration: 150, endDuration: 1500, content: '<p class="centers pinkImage"><img id="pinkImage" src="' + image_path + 'sphere.png"></p>', command: [65, 90], correctAnswer: "a-z", result: true, question: 5, isPractice: false },
            { screen: "35", startDuration: 0, endDuration: 1980, content: '<p class="centers pinkImage"></p>' },
            { screen: "36", startDuration: 150, endDuration: 1500, content: '<p class="centers pinkImage"><img id="pinkImage" src="' + image_path + 'sphere.png"></p>', command: [65, 90], correctAnswer: "a-z", result: true, question: 6, isPractice: false },
            { screen: "37", startDuration: 0, endDuration: 1980, content: '<p class="centers pinkImage"></p>' },
            { screen: "38", startDuration: 150, endDuration: 1500, content: '<p class="centers pinkImage"><img id="pinkImage" src="' + image_path + 'sphere.png"></p>', command: [65, 90], correctAnswer: "a-z", result: true, question: 7, isPractice: false },
            { screen: "39", startDuration: 0, endDuration: 1980, content: '<p class="centers pinkImage"></p>' },
            { screen: "40", startDuration: 150, endDuration: 1500, content: '<p class="centers pinkImage"><img id="pinkImage" src="' + image_path + 'sphere.png"></p>', command: [65, 90], correctAnswer: "a-z", result: true, question: 8, isPractice: false },
            { screen: "41", startDuration: 0, endDuration: 1980, content: '<p class="centers pinkImage"></p>' },
            { screen: "42", startDuration: 150, endDuration: 1500, content: '<p class="centers pinkImage"><img id="pinkImage" src="' + image_path + 'sphere.png"></p>', command: [65, 90], correctAnswer: "a-z", result: true, question: 9, isPractice: false },
            { screen: "43", startDuration: 0, endDuration: 1980, content: '<p class="centers pinkImage"></p>' },
            { screen: "44", startDuration: 150, endDuration: 1500, content: '<p class="centers pinkImage"><img id="pinkImage" src="' + image_path + 'sphere.png"></p>', command: [65, 90], correctAnswer: "a-z", result: true, question: 10, isPractice: false },
            { screen: "45", startDuration: 0, endDuration: 1980, content: '<p class="centers pinkImage"></p>' },
            { screen: "46", startDuration: 150, endDuration: 1500, content: '<p class="centers pinkImage"><img id="pinkImage" src="' + image_path + 'sphere.png"></p>', command: [65, 90], correctAnswer: "a-z", result: true, question: 11, isPractice: false },
            { screen: "47", startDuration: 0, endDuration: 1980, content: '<p class="centers pinkImage"></p>' },
            { screen: "48", startDuration: 150, endDuration: 1500, content: '<p class="centers pinkImage"><img id="pinkImage" src="' + image_path + 'sphere.png"></p>', command: [65, 90], correctAnswer: "a-z", result: true, question: 12, isPractice: false },
            { screen: "49", startDuration: 0, endDuration: 1980, content: '<p class="centers pinkImage"></p>' },
            { screen: "50", startDuration: 150, endDuration: 1500, content: '<p class="centers pinkImage"><img id="pinkImage" src="' + image_path + 'sphere.png"></p>', command: [65, 90], correctAnswer: "a-z", result: true, question: 13, isPractice: false },
            { screen: "51", startDuration: 0, endDuration: 1980, content: '<p class="centers pinkImage"></p>' },
            { screen: "52", startDuration: 150, endDuration: 1500, content: '<p class="centers pinkImage"><img id="pinkImage" src="' + image_path + 'sphere.png"></p>', command: [65, 90], correctAnswer: "a-z", result: true, question: 14, isPractice: false },
            { screen: "53", startDuration: 0, endDuration: 1980, content: '<p class="centers pinkImage"></p>' },
            { screen: "54", startDuration: 150, endDuration: 1500, content: '<p class="centers pinkImage"><img id="pinkImage" src="' + image_path + 'sphere.png"></p>', command: [65, 90], correctAnswer: "a-z", result: true, question: 15, isPractice: false },
            { screen: "55", startDuration: 0, endDuration: 1980, content: '<p class="centers pinkImage"></p>' },
            { screen: "56", startDuration: 150, endDuration: 1500, content: '<p class="centers pinkImage"><img id="pinkImage" src="' + image_path + 'sphere.png"></p>', command: [65, 90], correctAnswer: "a-z", result: true, question: 16, isPractice: false },
            { screen: "57", startDuration: 0, endDuration: 1980, content: '<p class="centers pinkImage"></p>' },
            { screen: "58", startDuration: 150, endDuration: 1500, content: '<p class="centers pinkImage"><img id="pinkImage" src="' + image_path + 'sphere.png"></p>', command: [65, 90], correctAnswer: "a-z", result: true, question: 17, isPractice: false },
            { screen: "59", startDuration: 0, endDuration: 1980, content: '<p class="centers pinkImage"></p>' },
            { screen: "60", startDuration: 150, endDuration: 1500, content: '<p class="centers pinkImage"><img id="pinkImage" src="' + image_path + 'sphere.png"></p>', command: [65, 90], correctAnswer: "a-z", result: true, question: 18, isPractice: false },
            { screen: "61", startDuration: 0, endDuration: 1980, content: '<p class="centers pinkImage"></p>' },
            { screen: "62", startDuration: 150, endDuration: 1500, content: '<p class="centers pinkImage"><img id="pinkImage" src="' + image_path + 'sphere.png"></p>', command: [65, 90], correctAnswer: "a-z", result: true, question: 19, isPractice: false },
            { screen: "63", startDuration: 0, endDuration: 1980, content: '<p class="centers pinkImage"></p>' },
            { screen: "64", startDuration: 150, endDuration: 1500, content: '<p class="centers pinkImage"><img id="pinkImage" src="' + image_path + 'sphere.png"></p>', command: [65, 90], correctAnswer: "a-z", result: true, question: 20, isPractice: false },
           

            // {screen: "65", startDuration: -1, endDuration: 999998000,isTouch:true, content: '<h3 class="title">' + $A.get("$Label.c.Dltrs_Game_Text_26") +'</h3>' +
                   
            //         '<p class="mb10 centers s-b-instraction">' + $A.get("$Label.c.games_spacebar_text_1") +'</p>', command: [32, 32],gameEnd:true }
            {screen: "65", startDuration: -1, endDuration: 999998000,isTouch:true, content: ' ', command: [32, 32],gameEnd:true }
        ]

        //This saveData function is used for creating record in ParticipantGameresponse object.
        function saveData(gameName, questionNumber, response, isCorrect, reactionTime, isPracticeQuestion, correctAnswer) {
            helper.recorData(component, event, helper, contactId, gameId, questionNumber, response, isCorrect, reactionTime, isPracticeQuestion, correctAnswer, participantGameInfoId);
            //questionNumber
            console.log('test', component, event, helper, contactId, gameId, questionNumber, response, isCorrect, reactionTime, isPracticeQuestion, correctAnswer, participantGameInfoId)
            // if (questionNumber == 20) {
            //     document.getElementById("nextBtton").classList.remove("slds-hide");
            // }
        }

        //This startGame function get the gameid and create a participantGameInfo record and return record ID.
        function updateGameNameInParticipantGameInfo(gameId,participantGameInfoId,ipAddress,browserName,device) {
            helper.gameNameInParticipantGameInfo(component, event, helper, contactId, gameId,participantGameInfoId,ipAddress,browserName,device);//helper method calling here
            console.log('updateGameNameInParticipantGameInfo : ',gameId,participantGameInfoId,ipAddress,browserName,device);
        }

        // This ensgame function works for the update participant gameInfo record like as end date time.
        function endGame(gameId, participantGameInfoId) {
            
             endDateTime = new Date();
             gamePlayStatus = "Completed";
             console.log('endgame_=========== : ',contactId, gameId, endDateTime, gamePlayStatus, participantGameInfoId);
            helper.participantGameInfoUpdate(component, event, helper, contactId, gameId, endDateTime, gamePlayStatus, participantGameInfoId);//helper method calling here.
        }

        //this function works for initialize processing.
        function changeScreen() {
            console.log('hi testing====================');
            
            gameId = component.get("v.myAttribute");//gameid holds the gamedetails record id.
            browserName=component.get("v.browser");
            participantGameInfoId = component.get("v.participantGameid");//participantGameInfoId holds the participantgameinfo record id.
            console.log('participantGameInfoId  = ',participantGameInfoId);
            if (currentScreent == 1) {  
                //console.log('ssssssssssssss');  
                document.getElementById("steps").classList.add('opacity0');
               // document.getElementsByTagName("title") = "sssssssssssssssssss";
              document.title = "MindCrowd Attention Game Instructions • Page 2"
             
            } 
            if (currentScreent == 2) {

                document.title = "MindCrowd Attention Game Instructions • Page 3"
            }
            if (currentScreent == 3) {

                document.title = "MindCrowd Attention Test • Game "
            }
            if (currentScreent == 22) {

                document.title = "MindCrowd Attention Game Instructions • Page 4"
            }
            if (currentScreent == 23) {

                document.title = "MindCrowd Attection Test • Real Round "
            }
            if (currentScreent == 63) {
                helper.allowLeaving();
                window.location.href = $A.get("$Label.c.Community_Url")+"/s/"+$A.get("$Label.c.url_attentiontestcomplete");
                
            // document.title = "MindCrowd Attection Test Complete"
            // var meta = document.createElement("meta");
            //   meta.setAttribute("name", "description");
            //   meta.setAttribute("content", "Participant has completd the MindCrowd Attention Test.");
            //   document.getElementsByTagName('head')[0].appendChild(meta);
           // document.getElementById("datablock").addClass('slds-hide');
           
            }

            console.log('currentScreent = ', currentScreent);
            timedata = new Date();
            document.getElementById("datablock").innerHTML = configdata[currentScreent].content;
                //Changes for touch
            if(device=="PHONE"){
                console.log('devise',device);
                document.getElementById("datablock").removeEventListener('click',gotoNextScreen,false);     
                if(configdata[currentScreent].hasOwnProperty('isTouch')){
                    document.getElementById("datablock").addEventListener('click',gotoNextScreen,false);
                }
            }
            console.log('devise',device);

            // document.getElementById("datablock").removeEventListener('touchstart',gotoNextScreen,false);     
            // if(configdata[currentScreent].hasOwnProperty('isTouch')){
            //     document.getElementById("datablock").addEventListener('touchstart',gotoNextScreen,false);
            // }
            //pinkImage
            // document.getElementsByClassName("pinkImage").addEventListener("click", gamePlay, false);
            //end changes for touch goto  function  gotoNextScreen
            if (currentScreent > 0) {
                let isResult = configdata[currentScreent - 1].hasOwnProperty("result") ? true : false;
                let lastdata = document.getElementById("d_title").innerHTML;
                if (lastdata.length <= 0 && isResult == true) {
                    document.getElementById("d_title").innerHTML = "Result";
                    document.getElementById("d_txt").innerHTML = configdata[currentScreent - 1].endDuration;
                    document.getElementById("d_status").innerHTML = "false";
                    setTimeout(clearResult, 1000);
                    //Result Data
                    resultData[configdata[currentScreent - 1].screen] = {
                        "duration": configdata[currentScreent - 1].endDuration,
                        "status": "false",
                        "screenName": configdata[currentScreent - 1].screen,
                        "question": configdata[currentScreent - 1].question,
                        "isPractice": configdata[currentScreent - 1].isPractice,
                        "userInput": "No Response",
                        "correctAnswer": configdata[currentScreent - 1].correctAnswer
                    }
                    //Save Output Events
                    saveData(
                        "XQUIZ",
                        resultData[configdata[currentScreent - 1].screen]["question"],
                        resultData[configdata[currentScreent - 1].screen]["userInput"],
                        resultData[configdata[currentScreent - 1].screen]["status"],
                        resultData[configdata[currentScreent - 1].screen]["duration"],
                        resultData[configdata[currentScreent - 1].screen]["isPractice"],
                        resultData[configdata[currentScreent - 1].screen]["correctAnswer"]
                    );
                }
            }

            if (currentScreent == 4) {
                updateGameNameInParticipantGameInfo(gameId,participantGameInfoId,ipAddress,browserName,device);   
                console.log('ip address in component ',ipAddress,browserName,device, participantGameInfoId);
            }

            // end game function is updating the record of participant gameInfo like endDateTime.
            if ((configdata.length - 1) == currentScreent) {
                console.log('endgame_=========calling== : ',gameId, participantGameInfoId);
                endGame(gameId, participantGameInfoId);
                clearInterval(intervalTime);
                return false;
            }

            //Change New Screen Default
            if ((configdata.length - 1) > currentScreent) {
                intervalTime = setTimeout(changeScreen, configdata[currentScreent].endDuration);
                currentScreent = currentScreent + 1;
            } else {
                clearInterval(intervalTime);
            }

            //Event Control System
            window.addEventListener('keyup', gamePlay, false);
            clicked = false;
           
           // document.getElementById("pinkImage").removeEventListener("click", gamePlay, false);
           if(document.getElementById("pinkImage") !=null){
            //console.log('pinkImage sssssss =test  ');
            document.getElementById("pinkImage").addEventListener("click", gamePlay, false);
           }
           
        }
        
       
        //Inisilize the page processing 
        changeScreen();

        function gamePlay(e) {
           
        //console.log('fff = ')
        inputValue=e.key;

           if (configdata[currentScreent].gameEnd && e.keyCode == 32) {
           // if (configdata[currentScreent].gameEnd) {
                const urlParams = new URLSearchParams(document.location.search.substring(1));
                const product = urlParams.get('c__id');
               // const ipAddress = component.get("v.ipAddress");
                window.location.href = $A.get("$Label.c.Community_Url")+"/s/memorytest";
               // console.log('ssss = ',  configdata.length - 1, '==', currentScreent);
               document.title = "MindCrowd Attention Test Complete"
               var meta = document.createElement("meta");
                 meta.setAttribute("name", "description");
                 meta.setAttribute("content", "Participant has completd the MindCrowd Attention Test.");
                 document.getElementsByTagName('head')[0].appendChild(meta);


            }
            command_value = e.keyCode;
            let startDurations = configdata[currentScreent - 1].startDuration;
            let endDurations = configdata[currentScreent - 1].endDuration;
            let isResult = configdata[currentScreent - 1].hasOwnProperty("result") ? true : false;
            if (startDurations == -1) {
                clearInterval(intervalTime);
                if (command_value >= configdata[currentScreent - 1].command[0] && command_value <= configdata[currentScreent - 1].command[1]) {
                    changeScreen();
                }
            }
            else if (startDurations > 0) {
               // alert('sss')
              
                result_time = new Date() - timedata;

                //Block before click
                if (result_time < startDurations) return false;
                if (clicked == true) return false;
                
                //   if(isResult){     
                //                           console.log('inputValue = ', inputValue.match(new RegExp( "[a-z]",'gi')));
                //                           if((inputValue.match(new RegExp( "[a-z]",'gi'))  && inputValue.length<=1) || inputValue == undefined) {

                //                                   console.log('inputvalue9=---',inputValue);
                //                           }
                //                           else{
                //                             console.log('inputvalue9=-  invalid--',inputValue); 
                //                                   return false;
                                             
                //                           }
                //     }
                    console.log('sssrrrrrrrrrrr', e.key);
                clicked = true;
                window.removeEventListener('keyup', function (e) { });

                //Result Calculation
                if (isResult) {
                   // alert('sss')
                    document.getElementById("d_title").innerHTML = "Result";
                    document.getElementById("d_txt").innerHTML = result_time + " ms";
                    if (!resultData.hasOwnProperty(configdata[currentScreent - 1].screen)) {
                        resultData[configdata[currentScreent - 1].screen] = {}
                    }
                    if (resultData[configdata[currentScreent - 1].screen].hasOwnProperty("duration")) {
                        resultData[configdata[currentScreent - 1].screen]["duration"] = result_time;
                    } else {
                        resultData[configdata[currentScreent - 1].screen] = { "duration": result_time, "status": "false" };
                    }
                    //console.log('sss', e.key);
                    if(e.key != undefined &&  inputValue.match(new RegExp( "[a-z]",'gi')) && inputValue.length<=1){
                        
                        resultData[configdata[currentScreent - 1].screen]["userInput"] = e.key;
                    }else  if(e.key == undefined){
                        resultData[configdata[currentScreent - 1].screen]["userInput"] = 'Tap';
                    }else{
                        return false; 
                    }
                    
                    resultData[configdata[currentScreent - 1].screen]["screenName"] = configdata[currentScreent - 1].screen;
                    resultData[configdata[currentScreent - 1].screen]["question"] = configdata[currentScreent - 1].question;
                    resultData[configdata[currentScreent - 1].screen]["isPractice"] = configdata[currentScreent - 1].isPractice;
                    resultData[configdata[currentScreent - 1].screen]["correctAnswer"] = configdata[currentScreent - 1].correctAnswer;

                    //Clear Results
                    setTimeout(clearResult, 1500);
                }
                if (result_time >= startDurations) {
                    if (configdata[currentScreent - 1].hasOwnProperty("command")) {
                        
                        if ((command_value >= configdata[currentScreent - 1].command[0] && command_value <= configdata[currentScreent - 1].command[1]) || command_value === undefined) {
                            console.log('command_value = ', command_value);
                            if (isResult) {
                                document.getElementById("d_status").innerHTML = "true";
                                resultData[configdata[currentScreent - 1].screen]["status"] = "true";

                                //Save Output Events
                                saveData(
                                    "XQUIZ",
                                    resultData[configdata[currentScreent - 1].screen]["question"],
                                    resultData[configdata[currentScreent - 1].screen]["userInput"],
                                    resultData[configdata[currentScreent - 1].screen]["status"],
                                    resultData[configdata[currentScreent - 1].screen]["duration"],
                                    resultData[configdata[currentScreent - 1].screen]["isPractice"],
                                    resultData[configdata[currentScreent - 1].screen]["correctAnswer"]
                                );
                            }
                            //Reset Screent Interval
                            clearInterval(intervalTime);
                            //Next Screen Show
                            changeScreen();
                        } 
                        else {
                            if (isResult) {
                                document.getElementById("d_status").innerHTML = "false";
                                resultData[configdata[currentScreent - 1].screen]["status"] = "false";

                                //Save Output Events
                                saveData(
                                    "XQUIZ",
                                    resultData[configdata[currentScreent - 1].screen]["question"],
                                    resultData[configdata[currentScreent - 1].screen]["userInput"],
                                    resultData[configdata[currentScreent - 1].screen]["status"],
                                    resultData[configdata[currentScreent - 1].screen]["duration"],
                                    resultData[configdata[currentScreent - 1].screen]["isPractice"],
                                    resultData[configdata[currentScreent - 1].screen]["correctAnswer"]
                                );
                            }
                            //Reset Screent Interval
                            clearInterval(intervalTime);
                            //Next Screen Show
                            changeScreen();
                        }
                    } 
                    else {

                        if (isResult) {
                            document.getElementById("d_status").innerHTML = (startDurations <= result_time && result_time <= endDurations) ? "true" : "false";
                            resultData[configdata[currentScreent - 1].screen]["status"] = document.getElementById("d_status").innerHTML;

                            //Save Output Events
                            saveData(
                                "XQUIZ",
                                resultData[configdata[currentScreent - 1].screen]["question"],
                                resultData[configdata[currentScreent - 1].screen]["userInput"],
                                resultData[configdata[currentScreent - 1].screen]["status"],
                                resultData[configdata[currentScreent - 1].screen]["duration"],
                                resultData[configdata[currentScreent - 1].screen]["isPractice"],
                                resultData[configdata[currentScreent - 1].screen]["correctAnswer"]
                            );
                        }

                        //Reset Screent Interval
                        clearInterval(intervalTime);
                        //Next Screen Show
                        changeScreen();
                    }
                } 
                else {
                    if (isResult) {
                        document.getElementById("d_status").innerHTML = (startDurations <= result_time && result_time <= endDurations) ? "true" : "false";
                        resultData[configdata[currentScreent - 1].screen]["status"] = document.getElementById("d_status").innerHTML;

                        //Save Output Events
                        saveData(
                            "XQUIZ",
                            resultData[configdata[currentScreent - 1].screen]["question"],
                            resultData[configdata[currentScreent - 1].screen]["userInput"],
                            resultData[configdata[currentScreent - 1].screen]["status"],
                            resultData[configdata[currentScreent - 1].screen]["duration"],
                            resultData[configdata[currentScreent - 1].screen]["isPractice"],
                            resultData[configdata[currentScreent - 1].screen]["correctAnswer"]
                        );
                    }
                    //Reset Screent Interval
                    clearInterval(intervalTime);
                    //Next Screen Show
                    changeScreen();
                }
            }
        }

        function clearResult() {
            document.getElementById("d_title").innerHTML = "";
            document.getElementById("d_txt").innerHTML = "";
            document.getElementById("d_status").innerHTML = "";
        }
        //chnages for touch
        function gotoNextScreen(e){
           
            gamePlay({keyCode:32});
          console.log('e',e);
        }
         //chnages for touch end
        
    },

    
    // this function works for 'goto next page' when the game reach to the last question.
    goToNextPage: function (component, event, helper) {
        const urlParams = new URLSearchParams(document.location.search.substring(1));
        const product = urlParams.get('c__id');
        const ipAddress = component.get("v.ipAddress");
        window.location.href = $A.get("$Label.c.Community_Url")+"/s/memorytest" + '?' + 'c__id=' + product +'&cip=' + btoa(ipAddress);
        document.title = "MindCrowd Attection Test Complete"
               var meta = document.createElement("meta");
                 meta.setAttribute("name", "description");
                 meta.setAttribute("content", "Participant has completd the MindCrowd Attention Test.");
                 document.getElementsByTagName('head')[0].appendChild(meta);
    }
   

});