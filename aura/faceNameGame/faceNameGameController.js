({

    doInit: function (component, event, helper) {


        var timeS = new Date().getTime();
        const url = new URL(window.location.href);
       // const resourceRelPath = $A.get("$Label.c.Community_Url")+ '/s' +$A.get("$Label.c.facegame_config_url")+'?test='+timeS;
        const resourceUrl = $A.get("$Label.c.Community_Url") + $A.get("$Label.c.facegame_config_url")+'?test='+timeS;
        console.log('resourceUrl = ' , resourceUrl);
       // const configdata="";
        window.fetch(resourceUrl)
            .then($A.getCallback((response) => {
                if (!response.ok) {
                    throw new Error(`HTTP error, status = ${response.status}`);
                }
                response.json()
                    .then($A.getCallback((data) => {
                        let configdata = data;




           //-----Gettung gameId from the apex function------------------
           var gameNameScientific = $A.get("$Label.c.scientific_game_faceNameAssociates");
          helper.gameDetails(component, event, helper,gameNameScientific);
          var gameId;
          var participantGameInfoId='';
          var ipAddress;
          var browserName;
          helper.getIpAddress(component, event, helper);
          helper.printBrowser(component, event, helper);
          //var device = $A.get("$Browser.formFactor");
          var device = helper.getDeviceType(component, event, helper);
  
          // // Gettin contact id from the current loggedin user.
          let currentUserId = $A.get("$SObjectType.CurrentUser.Id");
          helper.userDetails(component, event, helper, currentUserId);
          var userContactId;
          var keybuttonEvent = false;

        var myPageRef = window.location.href;
    var actionGame = component.get("c.getCurrentContact");
        var pageUrl=myPageRef.split('/s/');
        //console.log('what value in pageUrl:',pageUrl,window.location.href);

        actionGame.setCallback(this,function(a) 
        {      
            var state = a.getState();
                if (state === "SUCCESS") {
                    var name = a.getReturnValue();
                    var language = name['Language__c'];
               
                	console.log('language second',language);
                    if(name['Face_Name_Associates__c']=='Locked' && pageUrl[1]== $A.get("$Label.c.url_me_namesandfacesgame")) {
                       // alert('You are not authorized to play this game.');
                       component.set('v.showConfirmDialog', true);
                    }
                    else if(name['Face_Name_Associates__c']=='Completed' && pageUrl[1]==  $A.get("$Label.c.url_me_namesandfacesgame")) {
                       // alert('You are not authorized to play this game.');
                       component.set('v.showConfirmDialog', true);
                    }
                    // full game code is started from else part.===========================
                    else{
                        component.set('v.showConfirmDialog', false);
                        helper.preventLeaving();
                        //    document.documentElement.addEventListener('keydown', function (e) {
                        //        if ((e.keycode || e.which) == 32) {
                        //            e.preventDefault();
                        //        }
                        //    }, false);
                   
                        
                          
                   //-----------------faceName game-------------------------
                          
                   //const urlParams = new URLSearchParams(document.location.search.substring(0));
                          // //console.log('what value in urlParams--------:',pageUrl[1].substring(2),urlParams,window.location.href);
                           
                           const urlParams = pageUrl[1].substring(2);
                           var pageUrltest=urlParams.split('=');
                         // //console.log('what value in urlParams---555555-----:',pageUrltest[1]);
                           const  cs = pageUrltest[1];
                           //console.log('what value in cs1---555555-----:',cs);
                           let currentScreen = 0;
                           if(cs!=null){
                               //console.log("cs1=", cs)
                               currentScreen = Number(cs);
                           }
                   
                           let lastdatatitle="";
                           let firstTime =0;
                           let isIgnore=false;
                           let intervalTime = null;
                           let timedata = new Date();
                           let totalKeyStrokesInRound = 0;
                          // let currentScreen = 0;
                           let image_path = $A.get("$Label.c.Community_Url")+"/resource/mindcrowdGameImages/faceName/";
                           let image_path2 = $A.get("$Label.c.Community_Url")+"/resource/";
                           let inputName = '';
                           let inputOccupation = '';
                           let inputdata = {}
                           let selectedVal = '';
                           let resultData = {}
                           let command_value=0;
                           let result_time=0;
                           var gameName = $A.get("$Label.c.face_name_game_text_0");
                           var gamePart ='';
                           var gameTime = '15 minutes';
                           var pkeyCount = 0;
                           var okeyCount = 0;
                           var pinputkeyPress =" ";
                           var oinputkeyPress =" ";
                           var saveCount = 0;
                           let roundTotalTime = null;
                           let roundStartTime = null;
                           let round = 0;
                           var firstThreeKeys = [];
                           var FieldOnFocus= null;
                           var nameStartTime= null;
                           var nameEndTime = null;
                           var occStartTime = null;
                           var occEndTime = null;
                           var occFieldTotalTime = 0;
                           var nameFieldTotalTime = 0;
                           var totalTimeForUserResponse = 0;
                           var orderOffUserInput = [];
                           var imageNames = '';
                           var pageLoadTime = 0;
                           var orderOfUserSltInp = [];
                           var userSltNameResp = 0;
                           var userSltOccResp = 0;
                           var finalNameField = "";
                           var finalOccField = "";
						   //var face_enter = $A.get("$Label.c.face_name_game_Enter");
							//var face_dontKnow = $A.get("$Label.c.face_name_game_Dont_Know");
                         
                           //document.getElementById("gameTitle").innerHTML = gameName;
                   
                           let currentGameScreen=0;
                           let intervalUserTime=null;
                           let handData='';
                           let value_data=null;
                           let current_user_box=null;
                           let totalDuration=600;
                           let gameScreenDuration =0;
                           let gameTotalSteps=0;
                           let stackTrailStartTime = null;
                           let stackTrialTillFirstMove = 0;
                           let macTouch = getCookie('macTouch');
                               var ua = window.navigator.userAgent;
                               var iOS = !!ua.match(/Mac OS/i);
                         var screenHeight = window.screen.availHeight;
                    	var screenWidth = window.screen.availWidth;
                              // var isMac = ua.match(/Mac OS/i);
                                var isKeyboad;
                                if (iOS) {
                                    isKeyboad = (macTouch == 'false');
                                    if(macTouch == 'true' && device == "DESKTOP"){
                                            device = 'TABLET'   ;     
                                    }
                            } else if (device == "DESKTOP" && macTouch != 'true') {
                                    isKeyboad = true;
                            } else {
                                    isKeyboad = false;
                                   //alert(' component.get("v.browser")')
                                    if(macTouch == 'true' && device == "DESKTOP"){
                                            device = 'TABLET';     
                                    }

                            }
                                function getCookie (name) {
                                        var cookieString = "; " + document.cookie;
                                        cookieString = cookieString.replace('LSKey-c$','');
                                        var parts = cookieString.split("; " + name + "=");
                                        if (parts.length === 2) {
                                            return parts.pop().split(";").shift();
                                        }
                                        return null;
                                    }

                            var face_name_game_text_5_a ="";
                            var face_name_game_text_12_a ="";
                            var face_name_game_text_7 ="";
                            var tower_of_London_text_2 ="";
                            var face_name_game_text_21_a ="";
                            var face_name_game_text_14a ="";
                            var face_name_game_text_23 ="";
                            var tower_of_London_text_4 = "";
							


                           
                            if(!isKeyboad){
                                face_name_game_text_5_a= $A.get("$Label.c.face_name_game_text_5_a_tap");
                                face_name_game_text_12_a =$A.get("$Label.c.face_name_game_text_12_a_tap");
                                face_name_game_text_7 =$A.get("$Label.c.face_name_game_text_7_tap");
                                tower_of_London_text_2 =$A.get("$Label.c.tower_of_London_text_2_tap");
                                face_name_game_text_21_a =$A.get("$Label.c.face_name_game_text_21_a_tap");
                                face_name_game_text_14a =$A.get("$Label.c.face_name_game_text_14a_tap");
                                face_name_game_text_23 =$A.get("$Label.c.face_name_game_text_23_tap");
                                tower_of_London_text_4 = $A.get("$Label.c.tower_of_London_text_4_tap");
                            }else{
                                face_name_game_text_5_a= $A.get("$Label.c.face_name_game_text_5_a");
                                face_name_game_text_12_a =$A.get("$Label.c.face_name_game_text_12_a");
                                face_name_game_text_7 =$A.get("$Label.c.face_name_game_text_7");
                                tower_of_London_text_2 =$A.get("$Label.c.tower_of_London_text_2");
                                face_name_game_text_21_a =$A.get("$Label.c.face_name_game_text_21_a");
                                face_name_game_text_14a =$A.get("$Label.c.face_name_game_text_14a");
                                face_name_game_text_23 =$A.get("$Label.c.face_name_game_text_23");
                                tower_of_London_text_4 = $A.get("$Label.c.tower_of_London_text_4");                                
                            }

                                configdata  = configdata.map(obj => {	
                                obj.content = obj.content.replace('face_name_game_text_5_a', face_name_game_text_5_a);
                                obj.content = obj.content.replace('face_name_game_text_12_a', face_name_game_text_12_a);
                                obj.content = obj.content.replace('face_name_game_text_7', face_name_game_text_7);
                                obj.content = obj.content.replace('tower_of_London_text_2', tower_of_London_text_2);
                                obj.content = obj.content.replace('face_name_game_text_21_a', face_name_game_text_21_a); 
                                obj.content = obj.content.replace('face_name_game_text_14a', face_name_game_text_14a); 
                                obj.content = obj.content.replace('face_name_game_text_23', face_name_game_text_23);
                                obj.content = obj.content.replace('tower_of_London_text_4', tower_of_London_text_4);
                                return obj;
                          });
                          //console.log('New configdata: '+JSON.stringify(configdata));
                           
                
                          // let participantGameInfoId="a0501000003G1qxAAC";
                   
                
                   
                   //changes
                   let bgimages = [];
                   let bgimages2 = [];
                   var imgContainer = document.getElementById('imgContainer');
                  
                   
                   
                   
                   function preloadImage(imgdata) {
                       
                    for (var i = 0; i < imgdata.length; i++) {
                        bgimages[i] = new Image();
                        bgimages[i].src = image_path+imgdata[i];
                        
                        imgContainer.appendChild(bgimages[i]);
                    }
                    //console.log('image load' , bgimages[1].src);
                }
                function preloadImage2(imgdata) {
                    
                    for (var i = 0; i < imgdata.length; i++) {
                        bgimages2[i] = new Image();
                        bgimages2[i].src = image_path2+imgdata[i];
                        
                        imgContainer.appendChild(bgimages2[i]);
                    }
                    //console.log('image load' , bgimages2[1].src);
                }
                preloadImage([
                    "m-intractions.png",
                    "face/face12.jpg",
                    "face/face1.jpg",
                    "face/face2.jpg",
                    "face/face3.jpg",
                    "face/face4.jpg",
                    "face/face5.jpg",
                    "face/face6.jpg",
                    "face/face7.jpg",
                    "face/face8.jpg",
                    "face/face9.jpg",
                    "face/face10.jpg",
                    "face/face11.jpg",
                    "famous/face1.jpg",
                    "famous/face2.jpg",
                    "famous/face3.jpg",
                    "famous/face4.jpg",
                    "famous/face5.jpg",
                    "famous/face6.jpg",
                    "famous/face7.jpg",
                    "famous/face8.jpg",
                    "famous/face9.jpg",
                    "famous/face10.jpg",
                    "famous/face11.jpg",
                    "famous/face12.jpg",
                    "face_3/face1.jpg",
                    "face_3/face2.jpg",
                    "face_3/face3.jpg",
                    "face_3/face4.jpg",
                    "face_3/face5.jpg",
                    "face_3/face6.jpg",
                    "face_3/face7.jpg",
                    "face_3/face8.jpg",
                    "face_3/face9.jpg",
                    "face_3/face10.jpg",
                    "face_3/face11.jpg",
                    "face_3/face12.jpg",
                    "face_3/face13.jpg",
                    "face_3/face14.jpg",
                    "face_3/face15.jpg",
                    "face_3/face16.jpg",
                    "face_3/face17.jpg",
                    "face_3/face18.jpg",
                    "face_3/face19.jpg",
                    "face_3/face20.jpg",
                    "face_3/face21.jpg",
                    "face_3/face22.jpg",
                    "face_3/face23.jpg",
                    "face_3/face24.jpg",
                    "face_3/face25.jpg",
                    "face_3/face26.jpg",
                    "face_3/face27.jpg",
                    "face_3/face28.jpg",
                    "face_3/face29.jpg",
                    "face_3/face30.jpg",
                    "face_3/face31.jpg",
                    "face_3/face32.jpg",
                    "face_3/face33.jpg",
                    "face_3/face34.jpg",
                    "face_3/face35.jpg",
                    "face_3/face36.jpg"
                   
                
                ]
                )
                
                preloadImage2([
                    "towerGame/stack-img.png?t=1",
                    "towerGame/stack-img_ES.png",
                    "towerGame/h2.png",
                    "towerGame/h.png",
                    "towerGame/b.png",
                    "towerGame/r.png",
                    "towerGame/g.png",
                    "towerGame/y.png",
                    "towerGame/c.png"
                    
                ]
                )      
                   
                   const towerconfigdata =[
                      
                       //Inisial data
                       { screen:"1", 
                           target:{"F":['g','r'],"S":[],"T":['b']},
                           user:{"F":[],"S":['b'],"T":['r','g']},
                           isGame:true,
                           question: 1,
                           isPractice: true
                       },
                       { screen:"2", 
                           target:{"F":[],"S":['g','b'],"T":['r']},
                           user:{"F":['r'],"S":['g','b'],"T":[]},
                           isGame:true,
                           question: 2,
                           isPractice: true
                       },
                       { screen:"3", 
                           target:{"F":[],"S":['r','g'],"T":['b']},
                           user:{"F":['g'],"S":['r','b'],"T":[]},
                           isGame:true,
                           question: 3,
                           isPractice: true
                       },
                       { screen:"4", 
                           target:{"F":['b'],"S":['g'],"T":['r']},
                           user:{"F":[],"S":['b','g'],"T":['r']},
                           isGame:true,
                           question: 4,
                           isPractice: true
                       },
                       { screen:"5", 
                           target:{"F":['b'],"S":[],"T":['r','g']},
                           user:{"F":[],"S":['r','b','g'],"T":[]},
                           isGame:true,
                           question: 5,
                           isPractice: true
                       },
                       { screen:"6", 
                           target:{"F":['b'],"S":['r','g'],"T":[]},
                           user:{"F":['g','r'],"S":['b'],"T":[]},
                           isGame:true, 
                           question: 6,
                           isPractice: true
                       },
                       { screen:"7", 
                           target:{"F":['g'],"S":['b'],"T":['r']},
                           user:{"F":[],"S":['g','b'],"T":['r']},
                           isGame:true,
                           question: 7,
                           isPractice: true
                       },
                       { screen:"8", 
                           target:{"F":['g','b'],"S":['r'],"T":[]},
                           user:{"F":['r'],"S":['b'],"T":['g']},
                           isGame:true,
                           question: 8,
                           isPractice: true
                       },
                       { screen:"9", 
                           target:{"F":[],"S":['b'],"T":['r','g']},
                           user:{"F":['r','g'],"S":['b'],"T":[]},
                           isGame:true,
                           question: 9,
                           isPractice: true
                       },
                       { screen:"10", 
                           target:{"F":['r'],"S":['b'],"T":['g','y']},
                           user:{"F":['g','y'],"S":['b','r'],"T":[]},
                           isGame:true,
                           question: 10,
                           isPractice: true
                       },
                       { screen:"11", 
                           target:{"F":['g'],"S":[],"T":['b','r','y']},
                           user:{"F":['r','g'],"S":['b','y'],"T":[]},
                           isGame:true,
                           question: 11,
                           isPractice: true
                           },
                       { screen:"12", 
                           target:{"F":['r'],"S":['g','b'],"T":['y']},
                           user:{"F":['b','r'],"S":['y','g'],"T":[]},
                           isGame:true,
                           question: 12,
                           isPractice: true
                          
                       },
                       { screen:"13", 
                           target:{"F":['g'],"S":['r','b'],"T":['y']},
                           user:{"F":[],"S":['r'],"T":['g','y','b']},
                           isGame:true,
                           question: 13,
                           isPractice: true
                       },
                       { screen:"14", 
                           target:{"F":['r'],"S":['b','g'],"T":['y']},
                           user:{"F":['y','g'],"S":['b','r'],"T":[]},
                           isGame:true,
                           question: 14,
                           isPractice: true
                       },
                       { screen:"15", 
                           target:{"F":['y'],"S":['r','g','b'],"T":[]},
                           user:{"F":['r'],"S":[],"T":['y','g','b']},
                           isGame:true,
                           question: 15,
                           isPractice: true
                       },
                       { screen:"16", 
                           target:{"F":['b','y'],"S":['r'],"T":['g']},
                           user:{"F":['r'],"S":['y','b'],"T":['g']},
                           isGame:true,
                           question: 16,
                           isPractice: true
                       },
                       { screen:"17", 
                           target:{"F":[],"S":['r'],"T":['y','g','b']},
                           user:{"F":['y'],"S":['b','g','r'],"T":[]},
                           isGame:true,
                           question: 17,
                           isPractice: true
                       },
                       { screen:"18", 
                           target:{"F":['g'],"S":[],"T":['r','y','b']},
                           user:{"F":['r','g'],"S":['y'],"T":['b']},
                           isGame:true,
                           question: 18,
                           isPractice: true
                       },
                       { screen:"19", 
                           target:{"F":[],"S":['y','g','b'],"T":['c','r']},
                           user:{"F":['c','r','g','y'],"S":[],"T":['b']},
                           isGame:true,
                           question: 19,
                           isPractice: true
                       },
                       { screen:"20", 
                           target:{"F":['b','r'],"S":['y','g'],"T":['c']},
                           user:{"F":['y'],"S":['b'],"T":['g','c','r']},
                           isGame:true,
                           question: 20,
                           isPractice: true
                       },
                       { screen:"21", 
                           target:{"F":['g','b'],"S":['y'],"T":['c','r']},
                           user:{"F":['b'],"S":['g'],"T":['y','r','c']},
                           isGame:true,
                            question: 21,
                            isPractice: true
                       },
                       { screen:"22", 
                           target:{"F":['b','y'],"S":['r','c'],"T":['g']},
                           user:{"F":['r','c'],"S":[],"T":['b','y','g']},
                           isGame:true,
                           question: 22,
                           isPractice: true
                       },
                       { screen:"23", 
                           target:{"F":['b'],"S":['y','r','g'],"T":['c']},
                           user:{"F":['g','r'],"S":['y','b'],"T":['c']},
                           isGame:true,
                            question: 23,
                            isPractice: true
                       },
                       { screen:"24", 
                           target:{"F":['g'],"S":['b'],"T":['y','c','r']},
                           user:{"F":[],"S":['r'],"T":['b','y','g','c']},
                           isGame:true,
                            question: 24,
                            isPractice: true
                       },
                       { screen:"25", 
                           target:{"F":['b','g'],"S":['y'],"T":['r','c']},
                           user:{"F":['g','r'],"S":['b','y'],"T":['c']},
                           isGame:true,
                            question: 25,
                            isPractice: true
                       },
                       { screen:"26", 
                           target:{"F":['b','r','y'],"S":[],"T":['c','g']},
                           user:{"F":['y','c','r'],"S":['b'],"T":['g']},
                           isGame:true,
                            question: 26,
                            isPractice: true
                       },
                       { screen:"27", 
                           target:{"F":['y'],"S":['g','c'],"T":['b','r']},
                           user:{"F":['r'],"S":['y','b'],"T":['g','c']},
                           isGame:true,
                            question: 27,
                            isPractice: true
                       },
                       
                        { screen:"28", 
                           target:{"F":[],"S":['r'],"T":['y','g','b']},
                           user:{"F":['y'],"S":['b','g','r'],"T":[]},
                           isGame:true,
                            question: 28,
                            isPractice: true
                       },
                       { screen:"29", 
                           target:{"F":['g'],"S":[],"T":['r','y','b']},
                           user:{"F":['r','g'],"S":['y'],"T":['b']},
                           isGame:true,
                            question: 29,
                            isPractice: true
                       },
                       { screen:"30", 
                           target:{"F":[],"S":['y','g','b'],"T":['c','r']},
                           user:{"F":['c','r','g','y'],"S":[],"T":['b']},
                           isGame:true,
                            question: 30,
                            isPractice: true
                       },
                       { screen:"31", 
                           target:{"F":['b','r'],"S":['y','g'],"T":['c']},
                           user:{"F":['y'],"S":['b'],"T":['g','c','r']},
                           isGame:true,
                          question: 31,
                          isPractice: true
                       },
                       { screen:"32", 
                           target:{"F":['g','b'],"S":['y'],"T":['c','r']},
                           user:{"F":['b'],"S":['g'],"T":['y','r','c']},
                           isGame:true,
                           question: 32,
                           isPractice: true
                       },
                       { screen:"33", 
                           target:{"F":['b','y'],"S":['r','c'],"T":['g']},
                           user:{"F":['r','c'],"S":[],"T":['b','y','g']},
                           isGame:true,
                           question: 33,
                           isPractice: true
                       },
                       { screen:"34", 
                           target:{"F":['b'],"S":['y','r','g'],"T":['c']},
                           user:{"F":['g','r'],"S":['y','b'],"T":['c']},
                           isGame:true,
                           question: 34,
                           isPractice: true
                       },
                       { screen:"35", 
                           target:{"F":['g'],"S":['b'],"T":['y','c','r']},
                           user:{"F":[],"S":['r'],"T":['b','y','g','c']},
                           isGame:true,
                           question: 35,
                           isPractice: true
                       },
                       { screen:"36", 
                           target:{"F":['b','g'],"S":['y'],"T":['r','c']},
                           user:{"F":['g','r'],"S":['b','y'],"T":['c']},
                           isGame:true,
                           question: 36,
                           isPractice: true
                       },
                       { screen:"37", 
                           target:{"F":['b','r','y'],"S":[],"T":['c','g']},
                           user:{"F":['y','c','r'],"S":['b'],"T":['g']},
                           isGame:true,
                           question: 37,
                           isPractice: true
                       },
                       { screen:"38", 
                           target:{"F":['y'],"S":['g','c'],"T":['b','r']},
                           user:{"F":['r'],"S":['y','b'],"T":['g','c']},
                           isGame:true,
                           question: 38,
                           isPractice: true
                       },
                        { screen:"39", 
                           target:{"F":['g','b'],"S":['y'],"T":['c','r']},
                           user:{"F":['b'],"S":['g'],"T":['y','r','c']},
                           isGame:true,
                           question: 39,
                           isPractice: true
                       },
                       { screen:"40", 
                           target:{"F":['b','y'],"S":['r','c'],"T":['g']},
                           user:{"F":['r','c'],"S":[],"T":['b','y','g']},
                           isGame:true,
                           question: 40,
                           isPractice: true
                       },
                       { screen:"41", 
                           target:{"F":['b'],"S":['y','r','g'],"T":['c']},
                           user:{"F":['g','r'],"S":['y','b'],"T":['c']},
                           isGame:true,
                           question: 41,
                           isPractice: true
                       },
                        { screen:"42", 
                           target:{"F":['g'],"S":[],"T":['r','y','b']},
                           user:{"F":['r','g'],"S":['y'],"T":['b']},
                           isGame:true,
                           question: 42,
                           isPractice: true
                       },
                       { screen:"43", 
                           target:{"F":[],"S":['y','g','b'],"T":['c','r']},
                           user:{"F":['c','r','g','y'],"S":[],"T":['b']},
                           isGame:true,
                           question: 43,
                           isPractice: true
                       },
                       { screen:"44", 
                           target:{"F":['b','r'],"S":['y','g'],"T":['c']},
                           user:{"F":['y'],"S":['b'],"T":['g','c','r']},
                           isGame:true,
                           question: 44,
                           isPractice: true
                       },
                       { screen:"45", 
                           target:{"F":['g','b'],"S":['y'],"T":['c','r']},
                           user:{"F":['b'],"S":['g'],"T":['y','r','c']},
                           isGame:true,
                           question: 45,
                           isPractice: true
                       },
                       { screen:"46", 
                           target:{"F":['b','y'],"S":['r','c'],"T":['g']},
                           user:{"F":['r','c'],"S":[],"T":['b','y','g']},
                           isGame:true,
                           question: 46,
                           isPractice: true
                       },
                       { screen:"47", 
                           target:{"F":['b'],"S":['y','r','g'],"T":['c']},
                           user:{"F":['g','r'],"S":['y','b'],"T":['c']},
                           isGame:true,
                           question: 47,
                           isPractice: true
                       },
                       { screen:"48", 
                           target:{"F":['b','g'],"S":['y'],"T":['r','c']},
                           user:{"F":['g','r'],"S":['b','y'],"T":['c']},
                           isGame:true,
                           question: 48,
                           isPractice: true
                       },
                       { screen:"49", 
                           target:{"F":['b','r','y'],"S":[],"T":['c','g']},
                           user:{"F":['y','c','r'],"S":['b'],"T":['g']},
                           isGame:true,
                           question: 49,
                           isPractice: true
                       },
                       { screen:"50", 
                           target:{"F":['y'],"S":['g','c'],"T":['b','r']},
                           user:{"F":['r'],"S":['y','b'],"T":['g','c']},
                           isGame:true,
                           question: 50,
                           isPractice: true
                       },
                        { screen:"51", 
                           target:{"F":['g','b'],"S":['y'],"T":['c','r']},
                           user:{"F":['b'],"S":['g'],"T":['y','r','c']},
                           isGame:true,
                           question: 51,
                           isPractice: true
                       },
                       { screen:"52", 
                           target:{"F":['b','y'],"S":['r','c'],"T":['g']},
                           user:{"F":['r','c'],"S":[],"T":['b','y','g']},
                           isGame:true,
                           question: 52,
                           isPractice: true
                       },
                       { screen:"53", 
                           target:{"F":['b'],"S":['y','r','g'],"T":['c']},
                           user:{"F":['g','r'],"S":['y','b'],"T":['c']},
                           isGame:true,
                           question: 53,
                           isPractice: true
                       },
                        { screen:"54", 
                           target:{"F":['g'],"S":[],"T":['r','y','b']},
                           user:{"F":['r','g'],"S":['y'],"T":['b']},
                           isGame:true,
                           question: 54,
                           isPractice: true
                       },
                       { screen:"55", 
                           target:{"F":[],"S":['y','g','b'],"T":['c','r']},
                           user:{"F":['c','r','g','y'],"S":[],"T":['b']},
                           isGame:true,
                           question: 55,
                           isPractice: true  
                       },
                       { screen:"56", 
                           target:{"F":['b','r'],"S":['y','g'],"T":['c']},
                           user:{"F":['y'],"S":['b'],"T":['g','c','r']},
                           isGame:true,
                           question: 56,
                           isPractice: true
                       },
                       { screen:"57", 
                           target:{"F":['b','y'],"S":['r','c'],"T":['g']},
                           user:{"F":['r','c'],"S":[],"T":['b','y','g']},
                           isGame:true,
                           question: 57,
                           isPractice: true
                       },
                       { screen:"58", 
                           target:{"F":['b'],"S":['y','r','g'],"T":['c']},
                           user:{"F":['g','r'],"S":['y','b'],"T":['c']},
                           isGame:true,
                           question: 58,
                           isPractice: true
                           },
                       { screen:"59", 
                           target:{"F":['b','g'],"S":['y'],"T":['r','c']},
                           user:{"F":['g','r'],"S":['b','y'],"T":['c']},
                           isGame:true,
                           question: 59,
                           isPractice: true
                       }, 
                       { screen:"60", 
                           target:{"F":['g','b'],"S":['y'],"T":['c','r']},
                           user:{"F":['b'],"S":['g'],"T":['y','r','c']},
                           isGame:true,
                           question: 60,
                           isPractice: true, round:8
                       },
                       { screen:"61", 
                           target:{"F":['b','y'],"S":['r','c'],"T":['g']},
                           user:{"F":['r','c'],"S":[],"T":['b','y','g']},
                           isGame:true,
                           question: 61,
                           isPractice: true, round:8
                       },
                       { screen:"62", 
                           target:{"F":['b'],"S":['y','r','g'],"T":['c']},
                           user:{"F":['g','r'],"S":['y','b'],"T":['c']},
                           isGame:true,
                           question: 62,
                           isPractice: true, round:8
                       },
                       { screen:"63", 
                           target:{"F":['b','g'],"S":['y'],"T":['r','c']},
                           user:{"F":['g','r'],"S":['b','y'],"T":['c']},
                           isGame:true,
                           question: 63,
                           isPractice: true, round:8
                       },
                       { screen:"64", 
                           target:{"F":['b','r','y'],"S":[],"T":['c','g']},
                           user:{"F":['y','c','r'],"S":['b'],"T":['g']},
                           isGame:true,
                           question: 64,
                           isPractice: true, round:8
                       },
                       { screen:"65", 
                           target:{"F":['y'],"S":['g','c'],"T":['b','r']},
                           user:{"F":['r'],"S":['y','b'],"T":['g','c']},
                           isGame:true,
                           question: 65,
                           isPractice: true, round:8
                       },
                           { screen:"66", 
                           target:{"F":['g','b'],"S":['y'],"T":['c','r']},
                           user:{"F":['b'],"S":['g'],"T":['y','r','c']},
                           isGame:true,
                           question: 66,
                           isPractice: true, round:8
                       },
                       { screen:"67", 
                           target:{"F":['b','y'],"S":['r','c'],"T":['g']},
                           user:{"F":['r','c'],"S":[],"T":['b','y','g']},
                           isGame:true,
                           question: 67,
                           isPractice: true, round:8
                       },
                       { screen:"68", 
                           target:{"F":['b'],"S":['y','r','g'],"T":['c']},
                           user:{"F":['g','r'],"S":['y','b'],"T":['c']},
                           isGame:true,
                           question: 68,
                           isPractice: true, round:8
                       },
                           { screen:"69", 
                           target:{"F":['g'],"S":[],"T":['r','y','b']},
                           user:{"F":['r','g'],"S":['y'],"T":['b']},
                           isGame:true,
                           question: 69,
                           isPractice: true, round:8
                       },
                       { screen:"70", 
                           target:{"F":[],"S":['y','g','b'],"T":['c','r']},
                           user:{"F":['c','r','g','y'],"S":[],"T":['b']},
                           isGame:true,
                           question: 70,
                           isPractice: true, round:8
                       },
                       { screen:"71", 
                           target:{"F":['b','r'],"S":['y','g'],"T":['c']},
                           user:{"F":['y'],"S":['b'],"T":['g','c','r']},
                           isGame:true,
                           question: 71,
                           isPractice: true, round:8
                       },
                       { screen:"72", 
                           target:{"F":['b','y'],"S":['r','c'],"T":['g']},
                           user:{"F":['r','c'],"S":[],"T":['b','y','g']},
                           isGame:true,
                           question: 72,
                           isPractice: true, round:8
                       },
                       { screen:"73", 
                           target:{"F":['b'],"S":['y','r','g'],"T":['c']},
                           user:{"F":['g','r'],"S":['y','b'],"T":['c']},
                           isGame:true,
                           question: 73,
                           isPractice: true, round:8
                           },
                       { screen:"74", 
                           target:{"F":['b','g'],"S":['y'],"T":['r','c']},
                           user:{"F":['g','r'],"S":['b','y'],"T":['c']},
                           isGame:true,
                           question: 74,
                           isPractice: true, round:8
                       }
                       // { screen:"60", content:'<div class="gcomplete">Game Commpleted</div>',
                       //     isGame:false
                       // }
                       
                   ];
                   
                   
                   
                   
                   
                   
                   
                   
                   console.log('config Data = ', configdata);  
                       
                       //Save data function for inserting participantgameresponse.
                       function saveData(gamePart, questionNumber, userInputData,correctAnswer, isCorrect, reactionTime, isPracticeQuestion, firstTime='', isIgnore='',inputkeyPress) {
                         if(saveCount == 0){
                            var inputkeyPress = pinputkeyPress;
                          }else{
                            var inputkeyPress = oinputkeyPress;
                          }
                          saveCount++;
                          let firstResponce = orderOffUserInput[0];
                          let indivisualTime={};
                          indivisualTime['timeForEnterName'] = nameFieldTotalTime;
                          indivisualTime['timeForEnterOccupation'] = occFieldTotalTime;
                          var indivisualInputTime=JSON.stringify(indivisualTime);
                        //   let firstSltResp = orderOfUserSltInp[0];
                           console.log('sunil123:save inside jscontroller =totalTimeForUserResponse===== ', userContactId, gameId, questionNumber, userInputData, correctAnswer, isCorrect, reactionTime, isPracticeQuestion,participantGameInfoId, firstTime,isIgnore,inputkeyPress,indivisualInputTime,totalTimeForUserResponse, firstResponce, imageNames, round );
                           helper.recorData(component, event, helper, userContactId, gameId, questionNumber, userInputData, correctAnswer, isCorrect, reactionTime, isPracticeQuestion,participantGameInfoId, 
                                             firstTime,isIgnore,inputkeyPress,indivisualInputTime,totalTimeForUserResponse, firstResponce, imageNames, round);
                           //questionNumber
                   
                               if (questionNumber == '84b') {
                                   document.getElementById("nextBtton").classList.remove("slds-hide");
                               }
                       }
                        //This startGame function get the gameid and create a participantGameInfo record and return record ID.
                    //    function updateGameNameInParticipantGameInfo(gameId,participantGameInfoId,ipAddress,browserName,device){
                    //        console.log('updateGameNameInParticipantGameInfo = ', userContactId,gameId,participantGameInfoId,ipAddress,browserName,device)
                    //        helper.gameNameInParticipantGameInfo(component,event,helper,userContactId,gameId,participantGameInfoId,ipAddress,browserName,device);//helper method calling here
                    //    }
                   
                       // This ensgame function works for the update participant gameInfo record like as end date time.
                     
                   
                   
                       function changeScreen() {
                        console.log('currentScreen@: ', currentScreen);
                        // pkeyCount =0;
                        // pinputkeyPress = "";
                        // okeyCount =0;
                        // oinputkeyPress = "";
                        //keybuttonEvent=false;
                           gameId = component.get("v.myAttribute");

                           userContactId = component.get("v.mycontactId");

                           ipAddress=component.get("v.ipAddress");
                           browserName=component.get("v.browser");
                           participantGameInfoId=component.get("v.participantGameid");//participantGameInfoId holds the participantgameinfo record id.
       
                       
                          // document.getElementById("gameTitle").innerHTML = gameName;
                          if(currentScreen == 84 || currentScreen == 85 || currentScreen == 86  || currentScreen == 87){
                               document.getElementById("gameTitle").innerHTML = $A.get("$Label.c.tower_of_London_text_0");
                          }else  if(currentScreen == 0 || currentScreen == 1){
                      
                               document.getElementById("gameTitle").innerHTML = $A.get("$Label.c.face_name_game_text_0");
                           }else{
                               document.getElementById("gameTitle").innerHTML = $A.get("$Label.c.face_name_game_text_0b");
                          }
                   
                          
              
                           timedata = new Date();   
                           pageLoadTime = timedata; 
                           document.getElementById("datablock_faceNameGame").innerHTML = configdata[currentScreen].content;
                         // console.log("current screen cd: ",configdata[currentScreen].screen);
                          if(document.getElementById("personname")){
                            //console.log('yes');
                            
                            let nameFld = document.getElementById("personname");
                            let occFld = document.getElementById("occupation");
                            nameFld.addEventListener('focus', function(e){
                                 //console.log("field in focus");
                                 nameStartTime = new Date();
                                 FieldOnFocus = nameFld;
                             });
                             nameFld.addEventListener('blur', function(e){
                                 //console.log("field out of focus");
                                 nameEndTime = new Date();
                                 let nameTemp = nameEndTime - nameStartTime;
                                 nameFieldTotalTime = nameFieldTotalTime+nameTemp;
                                 //console.log("name field time: ", nameFieldTotalTime);
                             });
                             occFld.addEventListener('focus', function(e){
                                 //console.log("field in focus");
                                 occStartTime = new Date();
                                 FieldOnFocus = occFld;
                             });
                             occFld.addEventListener('blur', function(e){
                                 //console.log("field out of focus");
                                 occEndTime = new Date();
                                 let occtemp = occEndTime - occStartTime;
                                 occFieldTotalTime = occFieldTotalTime+occtemp;
                                 //console.log("occupation field time: ", occFieldTotalTime);
                             });
                            }
                           if(configdata[currentScreen].screen == '3' || configdata[currentScreen].screen == '28'
                          || configdata[currentScreen].screen == '54' || configdata[currentScreen].screen == '67' 
                          || configdata[currentScreen].screen == '80' || configdata[currentScreen].screen == '82'){
                              roundStartTime = timedata;
                              //console.log('round start time: ', roundStartTime);
                              totalKeyStrokesInRound = 0;
                              if(configdata[currentScreen].screen == '3'){
                                  round = 0;
                              }else if(configdata[currentScreen].screen == '28'){
                                round = 1;
                            }else if(configdata[currentScreen].screen == '54'){
                                  round = 2;
                              }else if(configdata[currentScreen].screen == '67'){
                                round = 3;
                            }else if(configdata[currentScreen].screen == '80'){
                                round = 'STACKS';
                            }else if(configdata[currentScreen].screen == '82'){
                                round = 4;
                            }
                          }
                            if(configdata[currentScreen].screen == '27' || configdata[currentScreen].screen == '53'
                          || configdata[currentScreen].screen == '66' || configdata[currentScreen].screen == '79'
                           || configdata[currentScreen].screen == '81'  || configdata[currentScreen].screen == '118'){
                              roundTotalTime = timedata - roundStartTime;
          
                              if(configdata[currentScreen].screen == '27'){
                                  let totalTimeForRound=roundTotalTime;
                                  //console.log('totalTimeForRoundOne: ', totalTimeForRound);
                                  helper.participantGameInfoUpdateTotalTimeRoundOne(component,event,helper,userContactId,gameId,participantGameInfoId,totalTimeForRound,totalKeyStrokesInRound,configdata[currentScreen].screen);
                              }
                              else if(configdata[currentScreen].screen == '53'){
                                  let totalTimeForRound=roundTotalTime;
                                  //console.log('totalTimeForRoundTwo: ', totalTimeForRound);
                                  helper.participantGameInfoUpdateTotalTimeRoundOne(component,event,helper,userContactId,gameId,participantGameInfoId,totalTimeForRound,totalKeyStrokesInRound,configdata[currentScreen].screen);
                              }
                              else if(configdata[currentScreen].screen == '66'){
                                  let totalTimeForRound=roundTotalTime;
                                  //console.log('totalTimeForRoundThree: ', totalTimeForRound);
                                  helper.participantGameInfoUpdateTotalTimeRoundOne(component,event,helper,userContactId,gameId,participantGameInfoId,totalTimeForRound,totalKeyStrokesInRound,configdata[currentScreen].screen);
                              }
                              else if(configdata[currentScreen].screen == '79'){
                                  let totalTimeForRound=roundTotalTime;
                                  //console.log('totalTimeForRoundFour: ', totalTimeForRound);
                                  helper.participantGameInfoUpdateTotalTimeRoundOne(component,event,helper,userContactId,gameId,participantGameInfoId,totalTimeForRound,totalKeyStrokesInRound,configdata[currentScreen].screen);
                              }
                              else if(configdata[currentScreen].screen == '81'){
                                let totalTimeForRound=roundTotalTime;
                                //console.log('totalTimeForRoundstacks: ', totalTimeForRound);
                                helper.participantGameInfoUpdateTotalTimeRoundOne(component,event,helper,userContactId,gameId,participantGameInfoId,totalTimeForRound,null,configdata[currentScreen].screen);
                            }
                              else if(configdata[currentScreen].screen == '118'){
                                  let totalTimeForRound=roundTotalTime;
                                  //console.log('totalTimeForRoundFinal: ', totalTimeForRound);
                                  helper.participantGameInfoUpdateTotalTimeRoundOne(component,event,helper,userContactId,gameId,participantGameInfoId,totalTimeForRound,totalKeyStrokesInRound,configdata[currentScreen].screen);
                              }
                          } 


                           //Toer game initialize----------
                          if(configdata[currentScreen].hasOwnProperty('isGame')){
                           changeGameScreen();
                          }
                   
                   
                          

                           
                   
                           //Changes for touch
                           if(!isKeyboad){
                               document.getElementById("mainContent").removeEventListener('click',gotoNextScreen,false);     
                               if(configdata[currentScreen].hasOwnProperty('isTouch')){
                                   document.getElementById("mainContent").addEventListener('click',gotoNextScreen,false);
                               }
                               /* if(configdata[currentScreen].screen == "1" && configdata[currentScreen].instructionsLeft){
                                if('wakeLock' in navigator){
                                    alert("lock");
                                }
                                } */
                           }

                           if (configdata[currentScreen].fNameFirst){
                            imageNames = '';
                            imageNames = configdata[currentScreen].fNameFirst;
                            ////console.log("imageNames: ", imageNames);
                           }
                           if(configdata[currentScreen].fNameSecond){
                            imageNames = imageNames+';'+ configdata[currentScreen].fNameSecond+';'+configdata[currentScreen].fNameThird;
                            ////console.log("imageNames: ", imageNames);
                           }

                           if (configdata[currentScreen].instructionsLeft == true) {
                                document.getElementById("gameMainContent").classList.add("instructionsLeft");
                            }else{
                                document.getElementById("gameMainContent").classList.remove("instructionsLeft"); 
                            }
                            //end changes for touch goto  function  gotoNextScreen
                           let userselectresstr= document.querySelectorAll(".userselectres");
                           if(typeof(userselectresstr) != 'undefined' && userselectresstr != null){
                               userselectresstr.forEach(item=>{
                                   item.addEventListener('click',selectResponse,false);
                               });
                           }

 
                           let usrselectstr= document.querySelectorAll(".usrselect");
                           if(typeof(usrselectstr) != 'undefined' && usrselectstr != null){
                               usrselectstr.forEach(item=>{
                                   item.removeEventListener('click',selectUserInput,false);
         
                                   item.addEventListener('click',selectUserInput,false);
                               });
                           }  
                           //==changes
                           let userenterbtn= document.getElementById("enterbtn");
                               if(typeof(userenterbtn) != 'undefined' && userenterbtn != null){
                                setTimeout(function(){ 
                                    userenterbtn.removeEventListener('click',gamePlayEnter,false);
                                    userenterbtn.addEventListener('click',gamePlayEnter,false);
                                  },1000);
                                   
                               }
                               let useridintbtn= document.getElementById("idintbtn");
                               if(typeof(useridintbtn) != 'undefined' && useridintbtn != null){
                                   useridintbtn.style="opacity: 0; pointer-events: none;";
                                   useridintbtn.removeEventListener('click',gamePlayIgnore,false);
                                   useridintbtn.addEventListener('click',gamePlayIgnore,false);
                                   setTimeout(function(){ 
                                       useridintbtn.style="opacity:1; pointer-events: auto;"; 
                                   },8000);
                               }
                           //==
                   
                           
                           if (currentScreen > 0) {
                               let isResult = configdata[currentScreen - 1].hasOwnProperty("result") ? true : false;
                               let lastdata= lastdatatitle;
                               let result =null;
                               let solution=null;
                               
                               if (lastdata.length <= 0 && isResult == true) {
                                   if(!configdata[currentScreen - 1].answer.selected){
                                       var inputDat = {"name":"","occupation": ""};
                                       if(inputdata.hasOwnProperty("occupation") || inputdata.hasOwnProperty("name")){
                                           inputDat["name"]=inputdata["name"];
                                           inputDat["occupation"]=inputdata["occupation"];
                                       }
                                        result = {"name":"false","occupation": "false"};
                                        solution = {"name":configdata[currentScreen - 1].answer.name,"occupation":configdata[currentScreen - 1].answer.occupation};
                                   }else{
                                       var inputDat = "";
                                       result = "false";
                                       solution = configdata[currentScreen - 1].answer.selected;;
                                   }
                                   resultData[configdata[currentScreen - 1].screen] = {
                                       "duration": configdata[currentScreen - 1].endDuration,
                                       "status": "false"
                                   }
                                   resultData[configdata[currentScreen - 1].screen]["solution"] = solution;
                                   lastdatatitle="Result";
                
                                   if(configdata[currentScreen - 1].hasOwnProperty("command")){
                                        if((configdata[currentScreen - 1].answer.name).toLowerCase() == (inputDat["name"]).toLowerCase()){
                                            result.name= true;
                                        }
                                        else{
                                            result.name= false;
                                        }
                                        if((configdata[currentScreen - 1].answer.occupation).toLowerCase() == (inputDat["occupation"]).toLowerCase()){
                                            result.occupation = true;
                                        }
                                        else{
                                            result.occupation= false;
                                        }
                                        //console.log("sunil:before call save data ");
                                        let savedquestion = configdata[currentScreen - 1].question;                               
                                        let savedanswer = configdata[currentScreen - 1].answer.name;  
                                        let savedanswerOccuupation = configdata[currentScreen - 1].answer.occupation;
                                        let savedEndDuration = configdata[currentScreen-1].endDuration;
                                        let savedIsPractice = configdata[currentScreen - 1].isPractice; 
                                        let savedResultName = result.name;  
                                        let savedresultOccuupation = result.occupation; 
                                        let savedInputDataName = inputDat.name;
                                        let savedOccupation = inputDat.occupation;
                                        let savedpinputkeyPress = pinputkeyPress;
                                        let savedoinputkeyPress = oinputkeyPress;
                                        let savedFirstTime = firstTime;
                                        let savedIsIgnore = isIgnore;
                                        saveData('facename', savedquestion+'a', savedInputDataName,savedanswer,savedResultName,savedEndDuration,savedIsPractice, savedFirstTime,savedIsIgnore,  savedpinputkeyPress);
                                        setTimeout(function() {
                                            saveData('facename', savedquestion+'b', savedOccupation,savedanswerOccuupation,savedresultOccuupation,savedEndDuration, savedIsPractice, savedFirstTime,savedIsIgnore, savedoinputkeyPress ); 
                                        }, 1000);                                        
                                        //console.log("sunil:after call save data "); 
                                        
                                   }
                                   else if (configdata[currentScreen - 1].isButton){
                                     
                                       let inputString = ((configdata[currentScreen - 1].answer.selected) ? selectedVal : inputDat);
                                       //console.log("configdata[currentScreen - 1].answer.selected", configdata[currentScreen - 1].answer.selected);
                                       //console.log("selectedVal : ", selectedVal);
                                       //console.log("inputDat : ", inputDat);
                                        if(!configdata[currentScreen - 1].answer.selected){
                
                                        if(inputdata.hasOwnProperty("name") && (configdata[currentScreen - 1].answer.name).toLowerCase() == (inputdata.name).toLowerCase()){
                                            result.name = true;
                                        }
                                        else{
                                            result.name= false;
                                        }
                                        if(inputdata.hasOwnProperty("occupation") && (configdata[currentScreen - 1].answer.occupation).toLowerCase() == (inputdata.occupation).toLowerCase()){
                                            result.occupation = true;
                                        }  
                                        else{
                                            result.occupation= false;
                                        }
                                        let savedquestion = configdata[currentScreen - 1].question;                               
                                        let savedanswer = configdata[currentScreen - 1].answer.name;  
                                        let savedanswerOccuupation = configdata[currentScreen - 1].answer.occupation;
                                        let savedEndDuration = configdata[currentScreen-1].endDuration;
                                        let savedIsPractice = configdata[currentScreen - 1].isPractice; 
                                        let savedResultName = result.name;  
                                        let savedresultOccuupation = result.occupation; 
                                        let savedInputDataName = inputDat.name;
                                        let savedOccupation = inputDat.occupation;
                                        let savedFirstTime = firstTime;
                                        let savedIsIgnore = isIgnore;          
                                        saveData('facename', savedquestion+'a', savedInputDataName,savedanswer,savedResultName,savedEndDuration,savedIsPractice, savedFirstTime,savedIsIgnore );
                                        setTimeout(function() {
                                            saveData('facename', savedquestion+'b', savedOccupation,savedanswerOccuupation,savedresultOccuupation,savedEndDuration, savedIsPractice, savedFirstTime,savedIsIgnore );    
                                        }, 1000);                                        
                             
                                        }else{
                                            inputDat=inputString;
                                            if(configdata[currentScreen - 1].answer.selected == inputDat ){
                                              resultData[configdata[currentScreen - 1].screen]["result"]="true";
                                            }
                                            else{
                                                resultData[configdata[currentScreen - 1].screen]["result"]="false";
                                            }
                                            saveData('facename', configdata[currentScreen - 1].question, inputDat, resultData[configdata[currentScreen - 1].screen]["solution"],resultData[configdata[currentScreen - 1].screen]["result"], configdata[currentScreen-1].endDuration, configdata[currentScreen - 1].isPractice);
                
                                        }               
                                   }                    
                                   //save output
                                   
                                   setTimeout(clearResult,1000);
                               }
                           }

                            // end game function is updating the record of participant gameInfo like endDateTime.
                            if((configdata.length-1)==currentScreen){
                                     var endDateTime=new Date();
                                    var gamePlayStatus="Completed";
                                	var screenResolution = {"height" :screenHeight, "width" :screenWidth };
                                     helper.participantGameInfoUpdate(component,event,helper,userContactId,language,gameId,endDateTime,gamePlayStatus,participantGameInfoId,screenResolution);//helper method calling here. 
                                     //console.log('Sunil: after gamestatus completed fucntion');     
                                     //console.log('Sunil: after gamestatus completed fucntion',intervalTime);                        
                                     clearInterval(intervalTime);
                                  // return false;
                               }
                              //creating participant game info record.
                            if(currentScreen==0){
                                var startDateTime=new Date();
                                var gamePlayStatus="Not-Completed";
                                var screenResolution = {"height" :screenHeight, "width" :screenWidth };
                                 helper.participantGameInfo(component,event,helper,userContactId,language,gameId,startDateTime,gamePlayStatus,ipAddress,browserName,device,screenResolution);
                             }
                            else{
                                //console.log('screens are changing');
                            }
                            //clearing values after the trial.
                            firstThreeKeys = [];
                            orderOffUserInput = [];
                            occFieldTotalTime = 0;
                            nameFieldTotalTime = 0;
                            orderOfUserSltInp = [];
                            userSltNameResp = 0;
                            userSltOccResp = 0;
                          
                   
                           //Change New Screen Default
                           if ((configdata.length - 1) > currentScreen) {
                               intervalTime = setTimeout(changeScreen, configdata[currentScreen].endDuration);
                               currentScreen = currentScreen + 1;
                           } else {
                               clearInterval(intervalTime);
                           }
                           inputdata = {};
                           inputName = '';
                           inputOccupation = '';
                           selectedVal = '';
                           firstTime=0;
                           isIgnore=false;
                   
                           //raj
                           let inputstr = document.getElementById("personname");
                           if (typeof (inputstr) != 'undefined' && inputstr != null) inputstr.focus();
                
                           pkeyCount =0;
                           pinputkeyPress = "";
                           okeyCount =0;
                           oinputkeyPress = "";
                           saveCount = 0;
                   
                    }
                   
                       changeScreen();
                       //Event Control System
                
                
                      // window.addEventListener('keyup', gamePlay, false);
                      
                      window.addEventListener('keyup', function(e){
                        if(!configdata[currentScreen - 1].isButton){
                           // console.log('test 2');
                            if(!keybuttonEvent){
                                gamePlay(e);

                            }else{
                                keybuttonEvent=false;
                            }
                            
                          }

                      });
                
                
                
                         //==changes
                       function gamePlayEnter(){ 
                            //console.log("clicked enter button");
                            //console.log('test 1');
                            keybuttonEvent = true;
                            gamePlay({keyCode:13});
                         
                           
                       }
                   
                       function gamePlayIgnore(){
                        //console.log('test 3');
                        keybuttonEvent = true;
                           isIgnore=true;
                           if(inputdata.hasOwnProperty("occupation") || inputdata.hasOwnProperty("name")){
                               inputdata["ignore"]=true;
                           }else{
                               inputdata = {'name': "",'occupation': "","ignore":true}
                           }
                           gamePlay({keyCode:13});
                       }
                       //==
                   
                       function gamePlay(e) {
                           command_value = e.keyCode;
                           totalKeyStrokesInRound = totalKeyStrokesInRound + 1;					   
                           if(command_value == 13){
                            if(document.getElementById("personname")){ 
                                FieldOnFocus.blur();
                                totalTimeForUserResponse = occFieldTotalTime + nameFieldTotalTime;
                                //console.log("Total time to answer and press enter ", totalTimeForUserResponse); 
                            }
                        }
                           
                           let startDurations = configdata[currentScreen - 1].startDuration;
                           if (startDurations == -1) {
                              // clearInterval(intervalTime);
                               if (configdata[currentScreen - 1].hasOwnProperty("command") && command_value >= configdata[currentScreen - 1].command[0] && command_value <= configdata[currentScreen - 1].command[1]) {
                                
                                   clearInterval(intervalTime);
                                   changeScreen();
                               }
                           } else if (startDurations > 0) { 
                            
                               let endDurations = configdata[currentScreen - 1].endDuration;
                               let isResult = configdata[currentScreen - 1].hasOwnProperty("result") ? true : false;
                               var isCorrect = false;  
                               result_time = new Date() - timedata;
                               //Block before click
                               if (result_time < startDurations) return false;  
                               //Result Calculation
                               if (isResult) {
                                   if (!resultData.hasOwnProperty(configdata[currentScreen - 1].screen)) {
                                       resultData[configdata[currentScreen - 1].screen] = {
                                           "duration": "0",
                                           "result": {},
                                           "data": ""
                                       }
                                   }
                               }
                               //console.log('command_value1 = ', command_value);
                               if (result_time >= startDurations) {   
                                    if (configdata[currentScreen - 1].hasOwnProperty("command")) {     
                                       if (command_value >= configdata[currentScreen - 1].command[0] && command_value <= configdata[currentScreen - 1].command[1]) {      
                                           if (isResult) {
                                               resultData[configdata[currentScreen - 1].screen]["data"] = inputdata;
                                               resultData[configdata[currentScreen - 1].screen]["duration"] = result_time;
                                               var result = {"name":"false","occupation": "false"};
                                               var solution ={"name":configdata[currentScreen - 1].answer.name,"occupation":configdata[currentScreen - 1].answer.occupation}
                                               //changes=====
                                               if(!inputdata.hasOwnProperty("ignore")){
                                                  
                   
                   
                                                    
                                                   if(inputdata.hasOwnProperty("occupation") || inputdata.hasOwnProperty("name"))
                                                   {
                                                       if(inputdata.name.length>2 || inputdata.occupation.length>2){}else{
                                                           let usrselecterror= document.querySelectorAll(".text-input.mr5");
                                                           if(typeof(usrselecterror) != 'undefined' && usrselecterror != null){
                                                               usrselecterror.forEach(item=>{
                                                               item.style="border-color:#F00;"
                                                               });
                                                           } 
                                                           return false;
                                                       }
                                                   }
                                                   else{
                                                       let usrselecterror= document.querySelectorAll(".text-input.mr5");
                                                       if(typeof(usrselecterror) != 'undefined' && usrselecterror != null){
                                                           usrselecterror.forEach(item=>{
                                                           item.style="border-color:#F00;"
                                                           });
                                                       } 
                                                       return false;
                                                   }
                   
                   
                                               }
                                               //=== updating the values of name and occupation from the fields as it is failing from auto correct.
                                               inputdata.name = document.getElementById("personname").value.trim();
                                               inputdata.occupation = document.getElementById("occupation").value.trim();
                                               console.log('name =',(inputdata.name).toLowerCase(),'-------');
                                               if (startDurations <= result_time && result_time <= endDurations && ((inputdata.name && (configdata[currentScreen - 1].answer.name).toLowerCase() == (inputdata.name).toLowerCase())) || (inputdata.occupation && (configdata[currentScreen - 1].answer.occupation).toLowerCase() == (inputdata.occupation).toLowerCase())) {
                                                   
                                                   if((configdata[currentScreen - 1].answer.name).toLowerCase() == (inputdata.name).toLowerCase()){
                                                       result.name = true;
                                                   }
                                                   else{
                                                    result.name= false;
                                                   }
                                                   if((configdata[currentScreen - 1].answer.occupation).toLowerCase() == (inputdata.occupation).toLowerCase()){
                                                       result.occupation = true;
                                                   }
                                                   else{
                                                       result.occupation= false;
                                                   }   
                                                   resultData[configdata[currentScreen - 1].screen]["result"] = result;
                                               } else {
                                                   resultData[configdata[currentScreen - 1].screen]["result"] = result;
                                               }
                       
                                                resultData[configdata[currentScreen - 1].screen]["solution"] = solution;
                                                lastdatatitle="Result";
                                               //save output
                                               let savedquestion = configdata[currentScreen - 1].question;                                
                                               let savedanswer = configdata[currentScreen - 1].answer.name; 
                                               let savedanswerOccuupation = configdata[currentScreen - 1].answer.occupation;                                             
                                               let savedIsPractice = configdata[currentScreen - 1].isPractice;
                                               let savedInputDataName = inputdata.name;
                                               let savedOccupation = inputdata.occupation; 
                                               let savedResultName = result.name;  
                                               let savedresultOccuupation = result.occupation;  
                                               let savedResult_time = result_time;
                                               let savedFirstTime = firstTime;
                                               let savedIsIgnore = isIgnore;     
                                               saveData('facename', savedquestion+'a', savedInputDataName,savedanswer, savedResultName, savedResult_time, savedIsPractice, savedFirstTime ,savedIsIgnore);
                                               setTimeout(function() {
                                                saveData('facename',savedquestion+'b', savedOccupation,savedanswerOccuupation, savedresultOccuupation, savedResult_time, savedIsPractice, savedFirstTime ,savedIsIgnore);
                                               }, 1000);                                               
                                               
                                               setTimeout(clearResult,1000);
                                               
                                           }
                                           // //Reset Screent Interval
                                           clearInterval(intervalTime);
                                           //Next Screen Show
                                           changeScreen();
                                       }
                                   } else if (configdata[currentScreen - 1].isButton) {
                                        if (isResult) {
                                           resultData[configdata[currentScreen - 1].screen]["data"] = inputdata;
                                           resultData[configdata[currentScreen - 1].screen]["duration"] = result_time;
                                           var result,solution;
                                           if(!configdata[currentScreen - 1].answer.selected){
                                              result = {"name":"false","occupation": "false"};
                                              solution ={"name":configdata[currentScreen - 1].answer.name,"occupation":configdata[currentScreen - 1].answer.occupation}
                                           }else{
                                              result = "false";
                                              solution = configdata[currentScreen - 1].answer.selected;
                                           }
                                           if (startDurations <= result_time && result_time <= endDurations && (configdata[currentScreen - 1].answer.selected == selectedVal || (!configdata[currentScreen - 1].answer.selected && (configdata[currentScreen - 1].answer.name == inputdata.name || configdata[currentScreen - 1].answer.occupation == inputdata.occupation)))) {
                                               isCorrect = true;
                                               if(!configdata[currentScreen - 1].answer.selected){
                                                   if(configdata[currentScreen - 1].answer.name == inputdata.name){
                                                       result.name = true;
                                                   }
                                                   else{
                                                    result.name= false;
                                                   }
                                                   if(configdata[currentScreen - 1].answer.occupation == inputdata.occupation){
                                                       result.occupation = true;
                                                   }
                                                   else{
                                                       result.occupation= false;
                                                   }   
                                                   resultData[configdata[currentScreen - 1].screen]["result"] = result;
                                               }else{
                                                   result = "true";
                                                   resultData[configdata[currentScreen - 1].screen]["result"] = result; 
                                               }
                                           } else {
                                               if(!configdata[currentScreen - 1].answer.selected){
                                                   resultData[configdata[currentScreen - 1].screen]["result"] = result;
                                               }else{
                                                   resultData[configdata[currentScreen - 1].screen]["result"] = result; 
                                               }
                                           }
                                           resultData[configdata[currentScreen - 1].screen]["solution"] = solution;
                                           var input = ((configdata[currentScreen - 1].answer.selected) ? selectedVal : inputdata);    
                                           lastdatatitle="Result";               
                                       //save output
                                           if(!configdata[currentScreen - 1].answer.selected){
                                               let savedquestion = configdata[currentScreen - 1].question;                                
                                               let savedanswer = configdata[currentScreen - 1].answer.name; 
                                               let savedanswerOccuupation = configdata[currentScreen - 1].answer.occupation;                                             
                                               let savedIsPractice = configdata[currentScreen - 1].isPractice;
                                               let savedInputDataName = inputdata.name;
                                               let savedOccupation = inputdata.occupation; 
                                               let savedResultName = result.name;  
                                               let savedresultOccuupation = result.occupation;  
                                               let savedResult_time = result_time;  
                                               saveData('facename', savedquestion+'a', savedInputDataName,savedanswer, savedResultName, savedResult_time, savedIsPractice);
                                               setTimeout(function() {
                                                saveData('facename', savedquestion+'b', savedOccupation,savedanswerOccuupation, savedresultOccuupation, savedResult_time, savedIsPractice);   
                                               }, 1000);                                               
                                           }else{
                                               saveData('facename', configdata[currentScreen - 1].question, input, resultData[configdata[currentScreen - 1].screen]["solution"],resultData[configdata[currentScreen - 1].screen]["result"], result_time, configdata[currentScreen - 1].isPractice);
                                           }
                                           setTimeout(clearResult,1000);
                                       }
                                       //Reset Screent Interval
                                       clearInterval(intervalTime);
                                       //Next Screen Show
                                       changeScreen();
                                   }
                               }
                           }
                       }
                       
                       function clearResult() {
                           lastdatatitle="";
                           // document.getElementById("d_title").innerHTML = "";
                           // document.getElementById("d_txt").innerHTML = "";
                           // document.getElementById("d_result").innerHTML = "";
                           // document.getElementById("d_input").innerHTML = "";
                           // document.getElementById("d_sol").innerHTML = "";
                           // inputdata = {};
                           // inputName = '';
                           // inputOccupation = '';
                           // selectedVal = '';
                       }
                   
                       //chnages for touch
                       function gotoNextScreen(e){
                        
                           gamePlay({keyCode:32});
                         //console.log('e',e);
                       }
                        //chnages for touch end
                       
                       function selectResponse(e){
                           selectedVal = e.target.getAttribute("data-info");
                           let userSltResp = new Date() - pageLoadTime;
                           //console.log("userSltResp : ", userSltResp);
                           gamePlay(e);
                       }
                       function selectUserInput(e){    
                            let usrselectstr= document.querySelectorAll(".usrselect");
                           if(typeof(usrselectstr) != 'undefined' && usrselectstr != null){
                               usrselectstr.forEach(item=>{
                                   item.classList.remove("selected");
                               });
                           }  
                           
                        e.target.classList.add("selected");
                           inputdata = {};
                           if (e.target.getAttribute("data-info") == 1) {
                            userSltNameResp = new Date() - pageLoadTime;
                            //console.log("userSltNameResp : ", userSltNameResp);
                            orderOfUserSltInp.push("name");
                               inputName = e.target.getAttribute("data-value");
                               inputdata["name"]=inputName;
                
                             //  e.target.classList.add("uactive");
                           } else if (e.target.getAttribute("data-info") == 2) {
                            userSltOccResp = new Date() - pageLoadTime;
                            //console.log("userSltOccResp : ", userSltOccResp);
                            orderOfUserSltInp.push("occupation");
                               inputOccupation = e.target.getAttribute("data-value");
                               inputdata["occupation"]=inputOccupation;
                             //  e.target.classList.add("uactive");
                           }
                           if (inputName && inputOccupation) {
                               //alert("inputdata : "+ inputName);
                               inputdata = {
                                   'name': inputName,
                                   'occupation': inputOccupation
                               };
                              /// //console.log('sssssssssssssssssss');
                               gamePlay(e);
                           } 
                       }
                       document.addEventListener('keyup',function(e){
                        
                        if(e.target && e.target.name== 'personname'){
                            
                            clearTimeout(intervalTime);
                            intervalTime = setTimeout(changeScreen, configdata[currentScreen-1].endDuration);
                            if(firstTime=='') firstTime=new Date() - timedata;       
                            inputName=e.target.value;
                            e.target.style=""
                                                                     
                            pkeyCount++;
                            if(pkeyCount <=3){
                                if(  e.key.match(new RegExp( "[a-z]",'gi')) && e.key.length<=1){
                                    pinputkeyPress = pinputkeyPress + e.key;
                                   // pinputkeyPress = inputName;
                                }else{
                                    //pinputkeyPress = pinputkeyPress + '{' + e.key + '}';
                                    if(e.key == 'undefined' || e.key == 'Unidentified'){
                                        pinputkeyPress = e.target.value;
                                    }else{
                                        pinputkeyPress = pinputkeyPress + '{' + e.key + '}';
                                    }
                                }
                               
                            }    
                            if(pkeyCount ==2){
                                orderOffUserInput.push("name");
                            }     
                
                         }
                         if(e.target && e.target.name== 'occupation'){
                           
                            clearTimeout(intervalTime);
                            intervalTime = setTimeout(changeScreen, configdata[currentScreen-1].endDuration);
                            if(firstTime=='') firstTime=new Date() - timedata;
                            inputOccupation=e.target.value;
                            e.target.style=""
                
                                                  
                         okeyCount++;
                         if(okeyCount <=3){
                            if(  e.key.match(new RegExp( "[a-z]",'gi')) && e.key.length<=1){
                                oinputkeyPress = oinputkeyPress + e.key;
                               // oinputkeyPress = inputOccupation;
                            }else{
                                //oinputkeyPress = oinputkeyPress + '{' + e.key + '}';
                                if(e.key == 'undefined' || e.key == 'Unidentified'){
                                    oinputkeyPress = e.target.value;
                                }else{
                                    oinputkeyPress = oinputkeyPress + '{' + e.key + '}';
                                }
                            }
                            }
                            if(okeyCount ==2){
                                orderOffUserInput.push("occupation");
                               
                            }       
                         }
                                                                                             
                             
                         inputdata = {
                            'name': inputName,
                            'occupation': inputOccupation
                        }
                        //console.log("inputdata: ",inputdata);
                      
                     }); 
                   
                   
                   
                       //Tower Game method
                   
                       function changeGameScreen(){
                        
                            
                           if(currentGameScreen==0){
                               let uclientbtn = document.querySelectorAll(".uclick")
                               uclientbtn.forEach((e)=>{
                                   e.addEventListener('click', towerGamePlay, false);
                               // e.addEventListener('touchstart', towerGamePlay, false);
                               });
                   
                               document.getElementById("gameContinue").addEventListener('click', towerGamePlayContinue, false);
                           }
                          
                
                   
                           if(towerconfigdata[currentGameScreen].isGame){
                               //Circle Add
                               boxUser("target",'F',".target_box1",currentGameScreen);
                               boxUser("target",'S',".target_box2",currentGameScreen);
                               boxUser("target",'T',".target_box3",currentGameScreen);
                   
                               boxUser("user",'F',".user_boxF",currentGameScreen);
                               boxUser("user",'S',".user_boxS",currentGameScreen);
                               boxUser("user",'T',".user_boxT",currentGameScreen);
                               currentGameScreen++;
                               gameScreenDuration =new Date();
                               gameTotalSteps=0;

                               if(gameTotalSteps == 0){
                                stackTrailStartTime = new Date();
                                //console.log("stackTrailStartTime: ", stackTrailStartTime);
                                }
                   
                   
                   
                           }else{
                               changeScreen();
                               //document.getElementById("gameblock").innerHTML=towerconfigdata[currentGameScreen].content;
                           }
                   
                          
                       }
                   
                       function saveTowerGameData(reactionTime,userInputData,questionNumber,isPracticeQuestion, stackTrialTillFirstMove, round){
                           //console.log('Sunil: before stacks game data======',component, event, helper, userContactId, gameId, questionNumber, reactionTime,userInputData,participantGameInfoId,isPracticeQuestion, stackTrialTillFirstMove, round);
                           helper.recorDataTowerOfGame(component, event, helper,reactionTime,userInputData,questionNumber,userContactId, gameId,participantGameInfoId,isPracticeQuestion, stackTrialTillFirstMove, round);
                           //console.log('Sunil: after stacks game data======',component, event, helper, userContactId, gameId, questionNumber, reactionTime,userInputData,participantGameInfoId,isPracticeQuestion);
                       
                        }
                   
                   
                   
                       //Inisilize the game
                       //changeGameScreen();
                   
                       function userRemainingTime(){
                           totalDuration=totalDuration-1;
                           if(totalDuration<1){
                               clearInterval(intervalUserTime);
                               currentGameScreen=towerconfigdata.length-1;
                               changeGameScreen();
                           }else{
                               if(document.getElementById("user_time")!=undefined){
                                   document.getElementById("user_time").innerHTML=('0'+parseInt(totalDuration/60)).slice(-2)+":"+('0'+(totalDuration%60)).slice(-2);
                               }
                           }
                       }
                   
                       function boxUser(datakey,keyname,boxname,cgs){
                           document.querySelector(boxname).innerHTML="";
                           towerconfigdata[cgs][datakey][keyname].forEach((d,k)=>{
                               document.querySelector(boxname).innerHTML+='<div class="'+d+'bx" style="bottom:'+(2+(k*28))+'px;"></div>';
                           });
                       }
                   
                       function catchBox(boxcolor=""){
                           if(boxcolor.length>0)
                           {
                               document.getElementById("catch_box").innerHTML='<div class="'+boxcolor+'bx" style="bottom:14px"></div>';
                               
                           }
                           
                           else
                               document.getElementById("catch_box").innerHTML='';
                       }
                   
                       function towerGamePlayContinue(e){
                                   document.getElementById("gameContinue").style="display:none;";
                                   changeGameScreen(); 
                       }
                   
                       function towerGamePlay(e) { 
                           e.stopPropagation();
                           current_user_box=e.currentTarget.getAttribute("data-key");

                            if(gameTotalSteps == 0){
                                stackTrialTillFirstMove = new Date - stackTrailStartTime;
                                //console.log("stackTrialTillFirstMove: ", stackTrialTillFirstMove);
                            }
                       
                           value_data = towerconfigdata[currentGameScreen-1].user[current_user_box];
                           if(handData==''){
                               if(value_data.length>0){
                                   handData=value_data[value_data.length-1]
                                   catchBox(handData);
                                   value_data.pop();
                                   boxUser("user",current_user_box,".user_box"+current_user_box,currentGameScreen-1);
                   
                                   gameTotalSteps=gameTotalSteps+1;
                                   //console.log("gameTotalSteps: ", gameTotalSteps);
                               }
                           }else{
                               value_data.push(handData);
                               boxUser("user",current_user_box,".user_box"+current_user_box,currentGameScreen-1);
                               catchBox("");
                               handData="";
                               gameTotalSteps=gameTotalSteps+1;
                               //console.log("gameTotalSteps: ", gameTotalSteps);
                               
                   
                               if(JSON.stringify(towerconfigdata[currentGameScreen-1].target)==JSON.stringify(towerconfigdata[currentGameScreen-1].user))
                               {
                                //console.log("currentGameScreen: ", currentGameScreen);
                                //console.log("towerconfigdata.length: ", towerconfigdata.length);
                                   if(currentGameScreen<towerconfigdata.length){
                                   // changeGameScreen(towerconfigdata[currentGameScreen-1].isPractice);
                                   saveTowerGameData(new Date()-gameScreenDuration,gameTotalSteps,towerconfigdata[currentGameScreen-1].question,towerconfigdata[currentGameScreen-1].isPractice, stackTrialTillFirstMove, round);
                                   document.getElementById("gameContinue").style="display:flex;";
                                   stackTrialTillFirstMove = 0;
                                   }
                               }
                           }
                       }
                       //end method for towe game
                    }
                    $A.get('e.refreshView').fire();
                }
    else if(state==="ERROR"){
        let message='';
        let errors = response.getError();
        if (errors && Array.isArray(errors) && errors.length > 0) {
            message = errors[0].message;
        }
        //console.error(message);
    }
    else{
        //console.log('else part');
    }
    });
    // $A.enqueueAction(actionGame);
    $A.getCallback(function() {
        $A.enqueueAction(actionGame);
    })();

}));
}))
.catch($A.getCallback((error) => {
console.error('Fetch Error :-S', error);
}));


   },
   goToNextPage: function (component, event, helper) {
    helper.allowLeaving();
    window.location.href = $A.get("$Label.c.Community_Url")+"/s/"+ $A.get("$Label.c.url_dashboard");
   },
   goToMyResultsPage: function (component, event, helper) {
    helper.allowLeaving();
    window.location.href = $A.get("$Label.c.Community_Url") + "/s/"+ $A.get("$Label.c.url_myresults");
   },
   closeModel : function(component, event, helper) {
       window.location.href = $A.get("$Label.c.Community_Url") + '/s/'+$A.get("$Label.c.url_dashboard");
   }
});