({
    oneMethod: function (component, event, helper) {

        
        var timeS = new Date().getTime();
        const resourceUrl = $A.get("$Label.c.Community_Url")+ $A.get("$Label.c.mdtt_game_config_url")+'?test='+timeS;
        console.log('resourceUrl = ' , resourceUrl);
       // const configdata="";
        window.fetch(resourceUrl)
            .then($A.getCallback((response) => {
                if (!response.ok) {
                    throw new Error(`HTTP error, status = ${response.status}`);
                }
                response.json()
                    .then($A.getCallback((data) => {
                        let ins_configdata = data;

                        console.log('ins_configdata =', ins_configdata);

        var myPageRef = window.location.href;
        var actionGame = component.get("c.getCurrentContact");
        //console.log('myPageRef value1111111111111111 :',myPageRef);
        var pageUrl = myPageRef.split('/s/');
        //console.log('myPageRef spliting :',pageUrl[1]);

        //-----Gettung gameId from the apex function------------------
        var gameNameScientific = $A.get("$Label.c.scientific_game_objectTemporal");
        //console.log('gameNameScientific values :--',gameNameScientific); 
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
            //console.log('myPageRef value22222222222222222 :');
            var state = a.getState();
            if (state === "SUCCESS") {
                var name = a.getReturnValue();
                var language = name['Language__c'];
                
                 console.log('language second',language);
                //console.log('contact values :--',name,name['Object_Temporal__c']);  
                ////console.log('$A.get("$Label.c.url_wordpairsgame")=', $A.get("$Label.c.url_me_wordpairsgame"))
                if (name['Object_Temporal__c'] == 'Locked' && pageUrl[1] == $A.get("$Label.c.url_me_Objects_Time")) {
                    component.set('v.showConfirmDialog', true);
                }
                else if (name['Object_Temporal__c'] == 'Completed' && pageUrl[1] == $A.get("$Label.c.url_me_Objects_Time")) {
                    component.set('v.showConfirmDialog', true);
                }
                // full game code is started from else part.===========================
                else if (name['Object_Temporal__c'] == 'Opened') {
                    component.set('v.showConfirmDialog', false);
                    helper.preventLeaving();
                    document.documentElement.addEventListener('keydown', function (e) {
                        if ((e.keycode || e.which) == 32) {
                            e.preventDefault();
                        }
                    }, false);
                    //MST game js -----------
                    const urlParams = new URLSearchParams(document.location.search.substring(1));
                    const cs = urlParams.get('cs');
                    let currentScreent = 0;
                    if (cs != null) {
                        //console.log("cs1=", cs)
                        currentScreent = Number(cs);
                    }

                    let screenWaitTime = 2000;
                    let resultData = {};
                    // let currentScreent = 0;
                    let intervalTime = null;
                    let intervalImageTime = null;
                    let blockevents = 0;
                    let roundTotalTime = null;
                    let roundStartTime = null;
                    let totalKeyStrokesInRound = 0;                    
                    let timedata = new Date();
                    let result_time = 0;
                    let command_value = 0;
                    let inputdata = "";
                    let lastdatatitle = "";
                    //mdtt_Set_1_practice_images 
                    //mdtt_Set_1_test_images (001.jpg to 231.jpg)
                    //mdtt_Set_2_test_images (232.jpg to 390.jpg)
                    let image_path = $A.get("$Label.c.Community_Url") + "/resource/mindGamesImagesMST/mst/";
                    let image_path2 = $A.get("$Label.c.Community_Url") + "/resource/mindcrowd_style/images/";
                    let image_path_PR = $A.get("$Label.c.Community_Url") + "/resource/mdtt_Set_1_practice_images/";
                    let image_path_set1 = $A.get("$Label.c.Community_Url") + "/resource/";

                    let errormsg = null;
                    let imagedata = null;
                    let imagedata1 = null;
                    var gameName = $A.get("$Label.c.game_name_9");
                    var screenHeight = window.screen.availHeight;
                    var screenWidth = window.screen.availWidth;
                    var gameTime = '10';
                    let white = false;
                  

                    //Configuration of data parts.

                    var configdataWithoutInst = [];
                    var testData = [];
                    var studyData = [];
                    var prStudy1 = [];
                    var prTest1 = [];
                    var prStudy2 = [];
                    var prTest2 = [];
                    var prStudy3 = [];
                    var prTest3 = [];
                    var masterImagePairs = [];
                    var finalTestArr = [];
                    var primacyTestArray = [];
                    var nonPrimacyTestArray = [];
                    var finalStudyArr = [];
                    var preloadImageArray = [];
                    var finalStudyScrCnt = 0;
                    var prScore = 0;
                    var perCount = 0;
                    let prctCount = 0;
                    var prTestResultscreen = 0;
                    var prSuccessCount = 0;
                    let responseCount = 0;

                    function getCookie (name) {
                        var cookieString = "; " + document.cookie;
                        cookieString = cookieString.replace('LSKey-c$','');
                        var parts = cookieString.split("; " + name + "=");
                        if (parts.length === 2) {
                            return parts.pop().split(";").shift();
                        }
                        return null;
                    }

                    let macTouch = getCookie('macTouch');
                    var ua = window.navigator.userAgent;
                    var iOS = !!ua.match(/Mac OS/i);
                    var isKeyboad;
                    if (iOS) {
                        isKeyboad = (macTouch == 'false');
                        if (macTouch == 'true' && device == "DESKTOP") {
                            device = 'TABLET';
                        }
                    } else if (device == "DESKTOP" && macTouch != 'true') {
                        isKeyboad = true;
                    } else {
                        isKeyboad = false;
                        if (macTouch == 'true' && device == "DESKTOP") {
                            device = 'TABLET';
                        }

                    }

                        var mst_text_1_a = "";
                        var mst_text_1_b = "";
                        var mst_text_20_a_1 = "";
                        var mst_text_9_1 = "";
                        var mst_text_21_t_1 = "";
                        var mst_text_21_t_2 = "";

                        if(!isKeyboad){
                            mst_text_1_a= $A.get("$Label.c.mst_text_indoor_object_tap");
                            mst_text_1_b =$A.get("$Label.c.mst_text_outdoor_object_tap");
                            mst_text_20_a_1 =$A.get("$Label.c.mst_text_20_a_1_tap");
                            mst_text_9_1 =$A.get("$Label.c.mst_text_object_Remember2_tap");
                            mst_text_21_t_1 =$A.get("$Label.c.mst_text_21_t_1_tap");
                            mst_text_21_t_2 =$A.get("$Label.c.mst_text_21_t_2_tap");
                        }else{
                            mst_text_1_a= $A.get("$Label.c.mst_text_indoor_object");
                            mst_text_1_b =$A.get("$Label.c.mst_text_outdoor_object");
                            mst_text_20_a_1 =$A.get("$Label.c.mst_text_20_a_1");
                            mst_text_9_1 =$A.get("$Label.c.mst_text_object_Remember2");
                            mst_text_21_t_1 =$A.get("$Label.c.mst_text_21_t_1");
                            mst_text_21_t_2 =$A.get("$Label.c.mst_text_21_t_2");
                        }

                        ins_configdata =ins_configdata.map(obj => {	
                            obj.content = obj.content.replace('mst_text_1_a', mst_text_1_a);
                            obj.content = obj.content.replace('mst_text_1_b', mst_text_1_b);
                            obj.content = obj.content.replace('mst_text_20_a_1', mst_text_20_a_1);
                            obj.content = obj.content.replace('mst_text_9_1', mst_text_9_1);
                            obj.content = obj.content.replace('mst_text_21_t_1', mst_text_21_t_1); 
                            obj.content = obj.content.replace('mst_text_21_t_2', mst_text_21_t_2); 
                            return obj;
                      });
                      //console.log('New ins_configdata: '+JSON.stringify(ins_configdata));


                    var imgs = [{ name: 'mdtt_Set_1_test_images/001.jpg' }, { name: 'mdtt_Set_1_test_images/002.jpg' }, { name: 'mdtt_Set_1_test_images/003.jpg' }, { name: 'mdtt_Set_1_test_images/004.jpg' }, { name: 'mdtt_Set_1_test_images/005.jpg' }, { name: 'mdtt_Set_1_test_images/006.jpg' }, { name: 'mdtt_Set_1_test_images/007.jpg' }, { name: 'mdtt_Set_1_test_images/008.jpg' }, { name: 'mdtt_Set_1_test_images/009.jpg' }, { name: 'mdtt_Set_1_test_images/010.jpg' }, { name: 'mdtt_Set_1_test_images/011.jpg' }, { name: 'mdtt_Set_1_test_images/012.jpg' }, { name: 'mdtt_Set_1_test_images/013.jpg' }, { name: 'mdtt_Set_1_test_images/014.jpg' }, { name: 'mdtt_Set_1_test_images/015.jpg' }, { name: 'mdtt_Set_1_test_images/016.jpg' }, { name: 'mdtt_Set_1_test_images/017.jpg' }, { name: 'mdtt_Set_1_test_images/018.jpg' }, { name: 'mdtt_Set_1_test_images/019.jpg' }, { name: 'mdtt_Set_1_test_images/020.jpg' }, { name: 'mdtt_Set_1_test_images/021.jpg' }, { name: 'mdtt_Set_1_test_images/022.jpg' }, { name: 'mdtt_Set_1_test_images/023.jpg' }, { name: 'mdtt_Set_1_test_images/024.jpg' }, { name: 'mdtt_Set_1_test_images/025.jpg' }, { name: 'mdtt_Set_1_test_images/026.jpg' }, { name: 'mdtt_Set_1_test_images/027.jpg' }, { name: 'mdtt_Set_1_test_images/028.jpg' }, { name: 'mdtt_Set_1_test_images/029.jpg' }, { name: 'mdtt_Set_1_test_images/030.jpg' }, { name: 'mdtt_Set_1_test_images/031.jpg' }, { name: 'mdtt_Set_1_test_images/032.jpg' }, { name: 'mdtt_Set_1_test_images/033.jpg' }, { name: 'mdtt_Set_1_test_images/034.jpg' }, { name: 'mdtt_Set_1_test_images/035.jpg' }, { name: 'mdtt_Set_1_test_images/036.jpg' }, { name: 'mdtt_Set_1_test_images/037.jpg' }, { name: 'mdtt_Set_1_test_images/038.jpg' }, { name: 'mdtt_Set_1_test_images/039.jpg' }, { name: 'mdtt_Set_1_test_images/040.jpg' }, { name: 'mdtt_Set_1_test_images/041.jpg' }, { name: 'mdtt_Set_1_test_images/042.jpg' }, { name: 'mdtt_Set_1_test_images/043.jpg' }, { name: 'mdtt_Set_1_test_images/044.jpg' }, { name: 'mdtt_Set_1_test_images/045.jpg' }, { name: 'mdtt_Set_1_test_images/046.jpg' }, { name: 'mdtt_Set_1_test_images/047.jpg' }, { name: 'mdtt_Set_1_test_images/048.jpg' }, { name: 'mdtt_Set_1_test_images/049.jpg' }, { name: 'mdtt_Set_1_test_images/050.jpg' }, { name: 'mdtt_Set_1_test_images/051.jpg' }, { name: 'mdtt_Set_1_test_images/052.jpg' }, { name: 'mdtt_Set_1_test_images/053.jpg' }, { name: 'mdtt_Set_1_test_images/054.jpg' }, { name: 'mdtt_Set_1_test_images/055.jpg' }, { name: 'mdtt_Set_1_test_images/056.jpg' }, { name: 'mdtt_Set_1_test_images/057.jpg' }, { name: 'mdtt_Set_1_test_images/058.jpg' }, { name: 'mdtt_Set_1_test_images/059.jpg' }, { name: 'mdtt_Set_1_test_images/060.jpg' },
                    { name: 'mdtt_Set_1_test_images/061.jpg' }, { name: 'mdtt_Set_1_test_images/062.jpg' }, { name: 'mdtt_Set_1_test_images/063.jpg' }, { name: 'mdtt_Set_1_test_images/064.jpg' }, { name: 'mdtt_Set_1_test_images/065.jpg' }, { name: 'mdtt_Set_1_test_images/066.jpg' }, { name: 'mdtt_Set_1_test_images/067.jpg' }, { name: 'mdtt_Set_1_test_images/068.jpg' }, { name: 'mdtt_Set_1_test_images/069.jpg' }, { name: 'mdtt_Set_1_test_images/070.jpg' }, { name: 'mdtt_Set_1_test_images/071.jpg' }, { name: 'mdtt_Set_1_test_images/072.jpg' }, { name: 'mdtt_Set_1_test_images/073.jpg' }, { name: 'mdtt_Set_1_test_images/074.jpg' }, { name: 'mdtt_Set_1_test_images/075.jpg' }, { name: 'mdtt_Set_1_test_images/076.jpg' }, { name: 'mdtt_Set_1_test_images/077.jpg' }, { name: 'mdtt_Set_1_test_images/078.jpg' }, { name: 'mdtt_Set_1_test_images/079.jpg' }, { name: 'mdtt_Set_1_test_images/080.jpg' }, { name: 'mdtt_Set_1_test_images/081.jpg' }, { name: 'mdtt_Set_1_test_images/082.jpg' }, { name: 'mdtt_Set_1_test_images/083.jpg' }, { name: 'mdtt_Set_1_test_images/084.jpg' }, { name: 'mdtt_Set_1_test_images/085.jpg' }, { name: 'mdtt_Set_1_test_images/086.jpg' }, { name: 'mdtt_Set_1_test_images/087.jpg' }, { name: 'mdtt_Set_1_test_images/088.jpg' }, { name: 'mdtt_Set_1_test_images/089.jpg' }, { name: 'mdtt_Set_1_test_images/090.jpg' }, { name: 'mdtt_Set_1_test_images/091.jpg' }, { name: 'mdtt_Set_1_test_images/092.jpg' }, { name: 'mdtt_Set_1_test_images/093.jpg' }, { name: 'mdtt_Set_1_test_images/094.jpg' }, { name: 'mdtt_Set_1_test_images/095.jpg' }, { name: 'mdtt_Set_1_test_images/096.jpg' }, { name: 'mdtt_Set_1_test_images/097.jpg' }, { name: 'mdtt_Set_1_test_images/098.jpg' }, { name: 'mdtt_Set_1_test_images/099.jpg' }, { name: 'mdtt_Set_1_test_images/100.jpg' }, { name: 'mdtt_Set_1_test_images/101.jpg' }, { name: 'mdtt_Set_1_test_images/102.jpg' }, { name: 'mdtt_Set_1_test_images/103.jpg' }, { name: 'mdtt_Set_1_test_images/104.jpg' }, { name: 'mdtt_Set_1_test_images/105.jpg' }, { name: 'mdtt_Set_1_test_images/106.jpg' }, { name: 'mdtt_Set_1_test_images/107.jpg' }, { name: 'mdtt_Set_1_test_images/108.jpg' }, { name: 'mdtt_Set_1_test_images/109.jpg' }, { name: 'mdtt_Set_1_test_images/110.jpg' }, { name: 'mdtt_Set_1_test_images/111.jpg' }, { name: 'mdtt_Set_1_test_images/112.jpg' }, { name: 'mdtt_Set_1_test_images/113.jpg' }, { name: 'mdtt_Set_1_test_images/114.jpg' }, { name: 'mdtt_Set_1_test_images/115.jpg' }, { name: 'mdtt_Set_1_test_images/116.jpg' }, { name: 'mdtt_Set_1_test_images/117.jpg' }, { name: 'mdtt_Set_1_test_images/118.jpg' }, { name: 'mdtt_Set_1_test_images/119.jpg' }, { name: 'mdtt_Set_1_test_images/120.jpg' },
                    { name: 'mdtt_Set_1_test_images/121.jpg' }, { name: 'mdtt_Set_1_test_images/122.jpg' }, { name: 'mdtt_Set_1_test_images/123.jpg' }, { name: 'mdtt_Set_1_test_images/124.jpg' }, { name: 'mdtt_Set_1_test_images/125.jpg' }, { name: 'mdtt_Set_1_test_images/126.jpg' }, { name: 'mdtt_Set_1_test_images/127.jpg' }, { name: 'mdtt_Set_1_test_images/128.jpg' }, { name: 'mdtt_Set_1_test_images/129.jpg' }, { name: 'mdtt_Set_1_test_images/130.jpg' }, { name: 'mdtt_Set_1_test_images/131.jpg' }, { name: 'mdtt_Set_1_test_images/132.jpg' }, { name: 'mdtt_Set_1_test_images/133.jpg' }, { name: 'mdtt_Set_1_test_images/134.jpg' }, { name: 'mdtt_Set_1_test_images/135.jpg' }, { name: 'mdtt_Set_1_test_images/136.jpg' }, { name: 'mdtt_Set_1_test_images/137.jpg' }, { name: 'mdtt_Set_1_test_images/138.jpg' }, { name: 'mdtt_Set_1_test_images/139.jpg' }, { name: 'mdtt_Set_1_test_images/140.jpg' }, { name: 'mdtt_Set_1_test_images/141.jpg' }, { name: 'mdtt_Set_1_test_images/142.jpg' }, { name: 'mdtt_Set_1_test_images/143.jpg' }, { name: 'mdtt_Set_1_test_images/144.jpg' }, { name: 'mdtt_Set_1_test_images/145.jpg' }, { name: 'mdtt_Set_1_test_images/146.jpg' }, { name: 'mdtt_Set_1_test_images/147.jpg' }, { name: 'mdtt_Set_1_test_images/148.jpg' }, { name: 'mdtt_Set_1_test_images/149.jpg' }, { name: 'mdtt_Set_1_test_images/150.jpg' }, { name: 'mdtt_Set_1_test_images/151.jpg' }, { name: 'mdtt_Set_1_test_images/152.jpg' }, { name: 'mdtt_Set_1_test_images/153.jpg' }, { name: 'mdtt_Set_1_test_images/154.jpg' }, { name: 'mdtt_Set_1_test_images/155.jpg' }, { name: 'mdtt_Set_1_test_images/156.jpg' }, { name: 'mdtt_Set_1_test_images/157.jpg' }, { name: 'mdtt_Set_1_test_images/158.jpg' }, { name: 'mdtt_Set_1_test_images/159.jpg' }, { name: 'mdtt_Set_1_test_images/160.jpg' }, { name: 'mdtt_Set_1_test_images/161.jpg' }, { name: 'mdtt_Set_1_test_images/162.jpg' }, { name: 'mdtt_Set_1_test_images/163.jpg' }, { name: 'mdtt_Set_1_test_images/164.jpg' }, { name: 'mdtt_Set_1_test_images/165.jpg' }, { name: 'mdtt_Set_1_test_images/166.jpg' }, { name: 'mdtt_Set_1_test_images/167.jpg' }, { name: 'mdtt_Set_1_test_images/168.jpg' }, { name: 'mdtt_Set_1_test_images/169.jpg' }, { name: 'mdtt_Set_1_test_images/170.jpg' }, { name: 'mdtt_Set_1_test_images/171.jpg' }, { name: 'mdtt_Set_1_test_images/172.jpg' }, { name: 'mdtt_Set_1_test_images/173.jpg' }, { name: 'mdtt_Set_1_test_images/174.jpg' }, { name: 'mdtt_Set_1_test_images/175.jpg' }, { name: 'mdtt_Set_1_test_images/176.jpg' }, { name: 'mdtt_Set_1_test_images/177.jpg' }, { name: 'mdtt_Set_1_test_images/178.jpg' }, { name: 'mdtt_Set_1_test_images/179.jpg' }, { name: 'mdtt_Set_1_test_images/180.jpg' },
                    { name: 'mdtt_Set_1_test_images/181.jpg' }, { name: 'mdtt_Set_1_test_images/182.jpg' }, { name: 'mdtt_Set_1_test_images/183.jpg' }, { name: 'mdtt_Set_1_test_images/184.jpg' }, { name: 'mdtt_Set_1_test_images/185.jpg' }, { name: 'mdtt_Set_1_test_images/186.jpg' }, { name: 'mdtt_Set_1_test_images/187.jpg' }, { name: 'mdtt_Set_1_test_images/188.jpg' }, { name: 'mdtt_Set_1_test_images/189.jpg' }, { name: 'mdtt_Set_1_test_images/190.jpg' }, { name: 'mdtt_Set_1_test_images/191.jpg' }, { name: 'mdtt_Set_1_test_images/192.jpg' }, { name: 'mdtt_Set_1_test_images/193.jpg' }, { name: 'mdtt_Set_1_test_images/194.jpg' }, { name: 'mdtt_Set_1_test_images/195.jpg' }, { name: 'mdtt_Set_1_test_images/196.jpg' }, { name: 'mdtt_Set_1_test_images/197.jpg' }, { name: 'mdtt_Set_1_test_images/198.jpg' }, { name: 'mdtt_Set_1_test_images/199.jpg' }, { name: 'mdtt_Set_1_test_images/200.jpg' }, { name: 'mdtt_Set_1_test_images/201.jpg' }, { name: 'mdtt_Set_1_test_images/202.jpg' }, { name: 'mdtt_Set_1_test_images/203.jpg' }, { name: 'mdtt_Set_1_test_images/204.jpg' }, { name: 'mdtt_Set_1_test_images/205.jpg' }, { name: 'mdtt_Set_1_test_images/206.jpg' }, { name: 'mdtt_Set_1_test_images/207.jpg' }, { name: 'mdtt_Set_1_test_images/208.jpg' }, { name: 'mdtt_Set_1_test_images/209.jpg' }, { name: 'mdtt_Set_1_test_images/210.jpg' }, { name: 'mdtt_Set_1_test_images/211.jpg' }, { name: 'mdtt_Set_1_test_images/212.jpg' }, { name: 'mdtt_Set_1_test_images/213.jpg' }, { name: 'mdtt_Set_1_test_images/214.jpg' }, { name: 'mdtt_Set_1_test_images/215.jpg' }, { name: 'mdtt_Set_1_test_images/216.jpg' }, { name: 'mdtt_Set_1_test_images/217.jpg' }, { name: 'mdtt_Set_1_test_images/218.jpg' }, { name: 'mdtt_Set_1_test_images/219.jpg' }, { name: 'mdtt_Set_1_test_images/220.jpg' }, { name: 'mdtt_Set_1_test_images/221.jpg' }, { name: 'mdtt_Set_1_test_images/222.jpg' }, { name: 'mdtt_Set_1_test_images/223.jpg' }, { name: 'mdtt_Set_1_test_images/224.jpg' }, { name: 'mdtt_Set_1_test_images/225.jpg' }, { name: 'mdtt_Set_1_test_images/226.jpg' }, { name: 'mdtt_Set_1_test_images/227.jpg' }, { name: 'mdtt_Set_1_test_images/228.jpg' }, { name: 'mdtt_Set_1_test_images/229.jpg' }, { name: 'mdtt_Set_1_test_images/230.jpg' }, { name: 'mdtt_Set_1_test_images/231.jpg' }, { name: 'mdtt_Set_2_test_images/232.jpg' }, { name: 'mdtt_Set_2_test_images/233.jpg' }, { name: 'mdtt_Set_2_test_images/234.jpg' }, { name: 'mdtt_Set_2_test_images/235.jpg' }, { name: 'mdtt_Set_2_test_images/236.jpg' }, { name: 'mdtt_Set_2_test_images/237.jpg' }, { name: 'mdtt_Set_2_test_images/238.jpg' }, { name: 'mdtt_Set_2_test_images/239.jpg' }, { name: 'mdtt_Set_2_test_images/240.jpg' },
                    { name: 'mdtt_Set_2_test_images/241.jpg' }, { name: 'mdtt_Set_2_test_images/242.jpg' }, { name: 'mdtt_Set_2_test_images/243.jpg' }, { name: 'mdtt_Set_2_test_images/244.jpg' }, { name: 'mdtt_Set_2_test_images/245.jpg' }, { name: 'mdtt_Set_2_test_images/246.jpg' }, { name: 'mdtt_Set_2_test_images/247.jpg' }, { name: 'mdtt_Set_2_test_images/248.jpg' }, { name: 'mdtt_Set_2_test_images/249.jpg' }, { name: 'mdtt_Set_2_test_images/250.jpg' }, { name: 'mdtt_Set_2_test_images/251.jpg' }, { name: 'mdtt_Set_2_test_images/252.jpg' }, { name: 'mdtt_Set_2_test_images/253.jpg' }, { name: 'mdtt_Set_2_test_images/254.jpg' }, { name: 'mdtt_Set_2_test_images/255.jpg' }, { name: 'mdtt_Set_2_test_images/256.jpg' }, { name: 'mdtt_Set_2_test_images/257.jpg' }, { name: 'mdtt_Set_2_test_images/258.jpg' }, { name: 'mdtt_Set_2_test_images/259.jpg' }, { name: 'mdtt_Set_2_test_images/260.jpg' }, { name: 'mdtt_Set_2_test_images/261.jpg' }, { name: 'mdtt_Set_2_test_images/262.jpg' }, { name: 'mdtt_Set_2_test_images/263.jpg' }, { name: 'mdtt_Set_2_test_images/264.jpg' }, { name: 'mdtt_Set_2_test_images/265.jpg' }, { name: 'mdtt_Set_2_test_images/266.jpg' }, { name: 'mdtt_Set_2_test_images/267.jpg' }, { name: 'mdtt_Set_2_test_images/268.jpg' }, { name: 'mdtt_Set_2_test_images/269.jpg' }, { name: 'mdtt_Set_2_test_images/270.jpg' }, { name: 'mdtt_Set_2_test_images/271.jpg' }, { name: 'mdtt_Set_2_test_images/272.jpg' }, { name: 'mdtt_Set_2_test_images/273.jpg' }, { name: 'mdtt_Set_2_test_images/274.jpg' }, { name: 'mdtt_Set_2_test_images/275.jpg' }, { name: 'mdtt_Set_2_test_images/276.jpg' }, { name: 'mdtt_Set_2_test_images/277.jpg' }, { name: 'mdtt_Set_2_test_images/278.jpg' }, { name: 'mdtt_Set_2_test_images/279.jpg' }, { name: 'mdtt_Set_2_test_images/280.jpg' }, { name: 'mdtt_Set_2_test_images/281.jpg' }, { name: 'mdtt_Set_2_test_images/282.jpg' }, { name: 'mdtt_Set_2_test_images/283.jpg' }, { name: 'mdtt_Set_2_test_images/284.jpg' }, { name: 'mdtt_Set_2_test_images/285.jpg' }, { name: 'mdtt_Set_2_test_images/286.jpg' }, { name: 'mdtt_Set_2_test_images/287.jpg' }, { name: 'mdtt_Set_2_test_images/288.jpg' }, { name: 'mdtt_Set_2_test_images/289.jpg' }, { name: 'mdtt_Set_2_test_images/290.jpg' }, { name: 'mdtt_Set_2_test_images/291.jpg' }, { name: 'mdtt_Set_2_test_images/292.jpg' }, { name: 'mdtt_Set_2_test_images/293.jpg' }, { name: 'mdtt_Set_2_test_images/294.jpg' }, { name: 'mdtt_Set_2_test_images/295.jpg' }, { name: 'mdtt_Set_2_test_images/296.jpg' }, { name: 'mdtt_Set_2_test_images/297.jpg' }, { name: 'mdtt_Set_2_test_images/298.jpg' }, { name: 'mdtt_Set_2_test_images/299.jpg' }, { name: 'mdtt_Set_2_test_images/300.jpg' },
                    { name: 'mdtt_Set_2_test_images/301.jpg' }, { name: 'mdtt_Set_2_test_images/302.jpg' }, { name: 'mdtt_Set_2_test_images/303.jpg' }, { name: 'mdtt_Set_2_test_images/304.jpg' }, { name: 'mdtt_Set_2_test_images/305.jpg' }, { name: 'mdtt_Set_2_test_images/306.jpg' }, { name: 'mdtt_Set_2_test_images/307.jpg' }, { name: 'mdtt_Set_2_test_images/308.jpg' }, { name: 'mdtt_Set_2_test_images/309.jpg' }, { name: 'mdtt_Set_2_test_images/310.jpg' }, { name: 'mdtt_Set_2_test_images/311.jpg' }, { name: 'mdtt_Set_2_test_images/312.jpg' }, { name: 'mdtt_Set_2_test_images/313.jpg' }, { name: 'mdtt_Set_2_test_images/314.jpg' }, { name: 'mdtt_Set_2_test_images/315.jpg' }, { name: 'mdtt_Set_2_test_images/316.jpg' }, { name: 'mdtt_Set_2_test_images/317.jpg' }, { name: 'mdtt_Set_2_test_images/318.jpg' }, { name: 'mdtt_Set_2_test_images/319.jpg' }, { name: 'mdtt_Set_2_test_images/320.jpg' }, { name: 'mdtt_Set_2_test_images/321.jpg' }, { name: 'mdtt_Set_2_test_images/322.jpg' }, { name: 'mdtt_Set_2_test_images/323.jpg' }, { name: 'mdtt_Set_2_test_images/324.jpg' }, { name: 'mdtt_Set_2_test_images/325.jpg' }, { name: 'mdtt_Set_2_test_images/326.jpg' }, { name: 'mdtt_Set_2_test_images/327.jpg' }, { name: 'mdtt_Set_2_test_images/328.jpg' }, { name: 'mdtt_Set_2_test_images/329.jpg' }, { name: 'mdtt_Set_2_test_images/330.jpg' }, { name: 'mdtt_Set_2_test_images/331.jpg' }, { name: 'mdtt_Set_2_test_images/332.jpg' }, { name: 'mdtt_Set_2_test_images/333.jpg' }, { name: 'mdtt_Set_2_test_images/334.jpg' }, { name: 'mdtt_Set_2_test_images/335.jpg' }, { name: 'mdtt_Set_2_test_images/336.jpg' }, { name: 'mdtt_Set_2_test_images/337.jpg' }, { name: 'mdtt_Set_2_test_images/338.jpg' }, { name: 'mdtt_Set_2_test_images/339.jpg' }, { name: 'mdtt_Set_2_test_images/340.jpg' }, { name: 'mdtt_Set_2_test_images/341.jpg' }, { name: 'mdtt_Set_2_test_images/342.jpg' }, { name: 'mdtt_Set_2_test_images/343.jpg' }, { name: 'mdtt_Set_2_test_images/344.jpg' }, { name: 'mdtt_Set_2_test_images/345.jpg' }, { name: 'mdtt_Set_2_test_images/346.jpg' }, { name: 'mdtt_Set_2_test_images/347.jpg' }, { name: 'mdtt_Set_2_test_images/348.jpg' }, { name: 'mdtt_Set_2_test_images/349.jpg' }, { name: 'mdtt_Set_2_test_images/350.jpg' }, { name: 'mdtt_Set_2_test_images/351.jpg' }, { name: 'mdtt_Set_2_test_images/352.jpg' }, { name: 'mdtt_Set_2_test_images/353.jpg' }, { name: 'mdtt_Set_2_test_images/354.jpg' }, { name: 'mdtt_Set_2_test_images/355.jpg' }, { name: 'mdtt_Set_2_test_images/356.jpg' }, { name: 'mdtt_Set_2_test_images/357.jpg' }, { name: 'mdtt_Set_2_test_images/358.jpg' }, { name: 'mdtt_Set_2_test_images/359.jpg' }, { name: 'mdtt_Set_2_test_images/360.jpg' },
                    { name: 'mdtt_Set_2_test_images/361.jpg' }, { name: 'mdtt_Set_2_test_images/362.jpg' }, { name: 'mdtt_Set_2_test_images/363.jpg' }, { name: 'mdtt_Set_2_test_images/364.jpg' }, { name: 'mdtt_Set_2_test_images/365.jpg' }, { name: 'mdtt_Set_2_test_images/366.jpg' }, { name: 'mdtt_Set_2_test_images/367.jpg' }, { name: 'mdtt_Set_2_test_images/368.jpg' }, { name: 'mdtt_Set_2_test_images/369.jpg' }, { name: 'mdtt_Set_2_test_images/370.jpg' }, { name: 'mdtt_Set_2_test_images/371.jpg' }, { name: 'mdtt_Set_2_test_images/372.jpg' }, { name: 'mdtt_Set_2_test_images/373.jpg' }, { name: 'mdtt_Set_2_test_images/374.jpg' }, { name: 'mdtt_Set_2_test_images/375.jpg' }, { name: 'mdtt_Set_2_test_images/376.jpg' }, { name: 'mdtt_Set_2_test_images/377.jpg' }, { name: 'mdtt_Set_2_test_images/378.jpg' }, { name: 'mdtt_Set_2_test_images/379.jpg' }, { name: 'mdtt_Set_2_test_images/380.jpg' }, { name: 'mdtt_Set_2_test_images/381.jpg' }, { name: 'mdtt_Set_2_test_images/382.jpg' }, { name: 'mdtt_Set_2_test_images/383.jpg' }, { name: 'mdtt_Set_2_test_images/384.jpg' }, { name: 'mdtt_Set_2_test_images/385.jpg' }, { name: 'mdtt_Set_2_test_images/386.jpg' }, { name: 'mdtt_Set_2_test_images/387.jpg' }, { name: 'mdtt_Set_2_test_images/388.jpg' }, { name: 'mdtt_Set_2_test_images/389.jpg' }, { name: 'mdtt_Set_2_test_images/390.jpg' }];
                    var prImages = [{ name: 'PR_009a.jpg' }, { name: 'PR_016a.jpg' }, { name: 'PR_028a.jpg' }, { name: 'PR_030b.jpg' }, { name: 'PR_039a.jpg' }, { name: 'PR_046a.jpg' }, { name: 'PR_049a.jpg' }, { name: 'PR_070b.jpg' }, { name: 'PR_073b.jpg' }, { name: 'PR_098a.jpg' }, { name: 'PR_106a.jpg' }, { name: 'PR_109a.jpg' }];
                    //var finalTestLgc = [{left : 29 , right : 1 , answer : 'j' }, {left : 0 , right : 30 , answer : 'f' }, {left : 31, right : 2 , answer : 'j' }, {left : 3 , right : 28 , answer : 'f' }, {left : 27 , right : 20 , answer : 'j' },{left : 26 , right : 19 , answer : 'j' },{left : 18 , right : 25 , answer : 'f' },{left : 8 , right : 17 , answer : 'f' },{left : 9 , right : 10 , answer : 'f' },{left : 12 , right : 11 , answer : 'j' },{left : 14 , right : 13 , answer : 'j' },{left : 15 , right : 16 , answer : 'f' },{left : 21 , right : 4 , answer : 'j' },{left : 5 , right : 22 , answer : 'f' },{left : 6 , right :23 , answer : 'f' },{left : 24 , right : 7 , answer : 'j' }];
                    var finalTestLgc = [{ left: 29, right: 1, answer: 'j', lagCategory: 'primacyRecency' }, { left: 0, right: 30, answer: 'f', lagCategory: 'primacyRecency' }, { left: 31, right: 2, answer: 'j', lagCategory: 'primacyRecency' }, { left: 3, right: 28, answer: 'f', lagCategory: 'primacyRecency' },
                    { left: 27, right: 20, answer: 'j', lagCategory: 'eightish' }, { left: 26, right: 19, answer: 'j', lagCategory: 'eightish' }, { left: 18, right: 25, answer: 'f', lagCategory: 'eightish' }, { left: 8, right: 17, answer: 'f', lagCategory: 'eightish' },
                    { left: 9, right: 10, answer: 'f', lagCategory: 'adjacent' }, { left: 12, right: 11, answer: 'j', lagCategory: 'adjacent' }, { left: 14, right: 13, answer: 'j', lagCategory: 'adjacent' }, { left: 15, right: 16, answer: 'f', lagCategory: 'adjacent' },
                    { left: 21, right: 4, answer: 'j', lagCategory: 'sixteenish' }, { left: 5, right: 22, answer: 'f', lagCategory: 'sixteenish' }, { left: 6, right: 23, answer: 'f', lagCategory: 'sixteenish' }, { left: 24, right: 7, answer: 'j', lagCategory: 'sixteenish' }];
                    var prTestLgc = [{ left: 0, right: 3, answer: 'f', lagCategory: 'longDistance' }, { left: 0, right: 2, answer: 'f', lagCategory: 'midDistance' }, { left: 3, right: 1, answer: 'j', lagCategory: 'midDistance' }, { left: 2, right: 1, answer: 'j', lagCategory: 'adjacent' }];

                    console.log('ins_configdata =', ins_configdata[0]);
                    var configdata = [
                        // {
                        //     screen: "0", startDuration: -1, endDuration: 9999920000, isTouch: true, content: '<div class="title">' + $A.get("$Label.c.mst_object_time_welcometo") + ' ' + $A.get("$Label.c.mst_object_time_welcome") + '</div>'
                        //         + '<div class="title">' + $A.get("$Label.c.mst_text_time_take") + ' <span> ' + gameTime + ' </span> ' + $A.get("$Label.c.mst_text_complete") + '</div>'
                        //         + '<div class="title">' + $A.get("$Label.c.mst_text_location") + '</div>'
                        //         + '<div class="title">' + $A.get("$Label.c.mst_object_time_get_started") + '</div>'
                        //         + '<p class="centers s-b-instraction"> ' + $A.get("$Label.c.games_spacebar_text_1") + '</p>'
                        //         + '<span class="game-lang">English</span> ', instructionsLeft: true, command: [32, 32]
                        // },
                        
                        // {
                        //     screen: "1", startDuration: -1, endDuration: 0, isTouch: true, content: '<div class="title  ">  <span> ' + $A.get("$Label.c.games_instruction_text") + ' </span> </div>' +
                        //         '<div  class="title">' + $A.get("$Label.c.mst_text_different_objects") + '</div>' +
                        //         '<div  class="title">' + $A.get("$Label.c.mst_text_indicate") + '</div>' +
                        //         '<div class="title">' + mst_text_1_a + '</div>' +
                        //         '<div class="title">' + mst_text_1_b + '</div>' +
                        //         '<p class="centers s-b-instraction">' + $A.get("$Label.c.games_spacebar_text_1") + '</p>', instructionsLeft: true, command: [32, 32]
                        // },

                        // {
                        //     screen: "2", startDuration: -1, endDuration: 0, isTouch: true, content: '<div class="title  ">  <span> ' + $A.get("$Label.c.games_instruction_text") + ' </span> </div>' +
                        //         '<div  class="title">' + mst_text_20_a_1 + '</div>' +
                        //         '<div  class="title">' + $A.get("$Label.c.mst_text_20_a_2") + '</div>' +
                        //         '<div  class="title">' + $A.get("$Label.c.mst_text_20_a_3") + '</div>' +
                        //         '<div  class="title">' + $A.get("$Label.c.mst_text_20_a_4") + '</div>' +
                        //         // '<div class="title">' + $A.get("$Label.c.mst_text_sapce_ready") + '</div>' +
                        //         '<p class="centers s-b-instraction">' + $A.get("$Label.c.games_spacebar_text_1") + '</p>', instructionsLeft: true, command: [32, 32]
                        // }
                        ins_configdata[0],
                        ins_configdata[1],
                        ins_configdata[2]

                    ];


                    //prepare prStudy arrays

                    function preparePRStudy(array, toArray, startIndex, count) {
                        let max = startIndex + count;
                        let rnd = 0;
                        let trial = 'prstudy';
                        if (startIndex == 0) {
                            trial = 'prstudy_1';
                            rnd = 0;
                        } else if (startIndex == 4) {
                            trial = 'prstudy_2';
                            rnd = 2;
                        } else if (startIndex == 8) {
                            trial = 'prstudy_3';
                            rnd = 4;
                        }
                        for (var i = startIndex; i < max; i++) {
                            preloadImageArray.push(image_path_PR + array[i].name);
                            toArray.push({
                                screen: "2", startDuration: 1, endDuration: screenWaitTime, content: '<p id="resulttxt" class="centers"></p>' +
                                    '<div class="objque">' +
                                    '<div class="objbox" id="imagedata" style="background-image:url(' + image_path_PR + array[i].name + ');"></div>' +

                                    '<div class="btninputbox"><ul class="btninputbx two-button-set">' +
                                    '<li>' + $A.get("$Label.c.mst_text_Indoor") + '<div class="btninput tabButtons img-f" data-input="f" data-key="70">F</div></li>' +
                                    '<li>' + $A.get("$Label.c.mst_text_Outdoor") + '<div class="btninput tabButtons img-j" data-input="j" data-key="74">J</div></li>' +
                                    '</ul></div>' +
                                    '</div>',
                                command: [70, 74], result: true, answer: 'f', question: 1, isPractice: true, white: true, trial: trial, isTest: false, round: rnd,
                                name: array[i].name
                            });
                        }
                    }

                    //prepare main Study

                    function prepareMainStudy(array, mainStudyCount, rndCnt) {
                        //console.log("in main study");
                        for (var i = 0; i < 32; i++) {
                            preloadImageArray.push(image_path_set1 + array[i].name);
                            finalStudyArr.push({
                                screen: "2", startDuration: 1, endDuration: screenWaitTime, content: '<p id="resulttxt" class="centers"></p>' +
                                    '<div class="objque">' +
                                    '<div class="objbox" id="imagedata" style="background-image:url(' + image_path_set1 + array[i].name + ');"></div>' +

                                    '<div class="btninputbox"><ul class="btninputbx two-button-set">' +
                                    '<li>' + $A.get("$Label.c.mst_text_Indoor") + '<div class="btninput tabButtons img-f" data-input="f" data-key="70">F</div></li>' +
                                    '<li>' + $A.get("$Label.c.mst_text_Outdoor") + '<div class="btninput tabButtons img-j" data-input="j" data-key="74">J</div></li>' +
                                    '</ul></div>' +
                                    '</div>',
                                command: [70, 74], result: true, answer: 'f', question: 1, isPractice: true, white: true, trial: 'Main_Study_' + mainStudyCount + '', isTest: false, round: rndCnt,
                                name: array[i].name
                            });
                        }
                    }

                    //prepare prTest array
                    function preparePRTest(array, toArray, testCount) {
                        //console.log('testCount : ', testCount);
                        let trial = 'prtest_1';
                        let rnd = 1;
                        if (testCount == 0) {
                            //console.log('testCount : ', testCount);
                            trial = 'prtest_1';
                            rnd = 1;
                        } else if (testCount == 4) {
                            //console.log('testCount : ', testCount);
                            trial = 'prtest_2';
                            rnd = 3;
                        } else if (testCount == 8) {
                            //console.log('testCount : ', testCount);
                            trial = 'prtest_3';
                            rnd = 5;
                        }
                        for (var i = 0; i < 4; i++) {
                            //preloadImageArray.push(image_path_PR + array[prTestLgc[i].left+testCount].name );
                            toArray.push({
                                screen: "2", startDuration: 1, endDuration: screenWaitTime, content: '<p id="resulttxt" class="centers"></p>' +
                                    '<div class="objque">' +
                                    '<div class="objbox image-left" id="imagedata" style="background-image:url(' + image_path_PR + array[prTestLgc[i].left + testCount].name + ');"></div>' +
                                    '<div class="objbox image-right" id="imagedata1" style="background-image:url(' + image_path_PR + array[prTestLgc[i].right + testCount].name + ');"></div>' +
                                    '<div class="btninputbox"><ul class="btninputbx two-button-set">' +
                                    '<li>' + $A.get("$Label.c.mst_text_Left") + ' <div class="btninput tabButtons img-f" data-input="f" data-key="70">F</div></li>' +
                                    '<li>' + $A.get("$Label.c.mst_text_Right") + ' <div class="btninput tabButtons img-j" data-input="j" data-key="74">J</div></li>' +
                                    '</ul></div>' +
                                    '</div>',
                                command: [70, 74], result: true, answer: prTestLgc[i].answer, question: 1, isPractice: true, white: true, trial: trial, isTest: true,
                                leftImageName: array[prTestLgc[i].left + testCount].name, rightImageName: array[prTestLgc[i].right + testCount].name, round: rnd,
                                leftImagePosition: prTestLgc[i].left + testCount, rightImagePosition: prTestLgc[i].right + testCount, lagCategory: prTestLgc[i].lagCategory
                            });

                        }

                    }

                    //Prepare master array for temporal game.

                    function prepareMasterArray(array, subArrayLimit) {
                        let elmntCount = 0;
                        var imageSet = [];
                        var subImgSet = [];
                        for (var i = 0; i < 10; i++) {
                            for (var j = elmntCount; j < elmntCount + subArrayLimit; j++) {
                                subImgSet.push(array[j]);
                            }
                            elmntCount = (i + 1) * subArrayLimit;
                            imageSet.push(subImgSet);
                            subImgSet = [];
                        }
                        //console.log("masterImages : ", imageSet);
                        return imageSet;
                    }

                    function prepareMainStudyAndTest(mainArray) {
                        let rndCnt = 6;
                        for (var i = 0; i < 3; i++) {
                            prepareContentScreen(configdata, 'finalStudy', i + 1);
                            prepareMainStudy(mainArray[i], i + 1, rndCnt);
                            addingItemsToConfigData(finalStudyArr, configdata, true, true);
                            finalStudyArr = [];
                            rndCnt++;

                            prepareMainTest(mainArray[i], i + 1, rndCnt);
                            // adding code to change the final test array to have all primacy type at the start of the list and remaining categories later.
                            arrayOfRandomImages(primacyTestArray);
                            arrayOfRandomImages(nonPrimacyTestArray);
                            for(var j=0; j<4; j++){
                                finalTestArr.push(primacyTestArray[j]);
                            }
                            for(var k=0; k<12; k++){
                                finalTestArr.push(nonPrimacyTestArray[k]);
                            }
                            primacyTestArray = [];
                            nonPrimacyTestArray = [];
                            rndCnt++;
                            //arrayOfRandomImages(finalTestArr);
                            prepareContentScreen(configdata, 'finalTest');
                            prepareContentScreen(configdata, 'finalTest1');
                            addingItemsToConfigData(finalTestArr, configdata, true, false);
                            finalTestArr = [];
                        }

                    }

                    //Function for preparing final test.

                    function prepareMainTest(array, mainTestCount, rndCnt) {
                        for (var i = 0; i < 16; i++) {
                            if(i<4){
                                primacyTestArray.push({
                                    screen: "2", startDuration: 1, endDuration: screenWaitTime, content: '<p id="resulttxt" class="centers"></p>' +
                                        '<div class="objque">' +
                                        '<div class="objbox image-left" id="imagedata" style="background-image:url(' + image_path_set1 + array[finalTestLgc[i].left].name + ');"></div>' +
                                        '<div class="objbox image-right" id="imagedata1" style="background-image:url(' + image_path_set1 + array[finalTestLgc[i].right].name + ');"></div>' +
                                        '<div class="btninputbox"><ul class="btninputbx two-button-set">' +
                                        '<li>' + $A.get("$Label.c.mst_text_Left") + ' <div class="btninput tabButtons img-f"  data-input="f" data-key="70">F</div></li>' +
                                        '<li>' + $A.get("$Label.c.mst_text_Right") + ' <div class="btninput tabButtons img-j" data-input="j" data-key="74">J</div></li>' +
                                        '</ul></div>' +
                                        '</div>',
                                    command: [70, 74], result: true, answer: finalTestLgc[i].answer, question: 1, isPractice: false, white: true, trial: 'Main_Test_' + mainTestCount + '',
                                    leftImageName: array[finalTestLgc[i].left].name, rightImageName: array[finalTestLgc[i].right].name, isTest: true, round: rndCnt,
                                    leftImagePosition: finalTestLgc[i].left, rightImagePosition: finalTestLgc[i].right, lagCategory: finalTestLgc[i].lagCategory
                                });
                            }else{
                                nonPrimacyTestArray.push({
                                    screen: "2", startDuration: 1, endDuration: screenWaitTime, content: '<p id="resulttxt" class="centers"></p>' +
                                        '<div class="objque">' +
                                        '<div class="objbox image-left" id="imagedata" style="background-image:url(' + image_path_set1 + array[finalTestLgc[i].left].name + ');"></div>' +
                                        '<div class="objbox image-right" id="imagedata1" style="background-image:url(' + image_path_set1 + array[finalTestLgc[i].right].name + ');"></div>' +
                                        '<div class="btninputbox"><ul class="btninputbx two-button-set">' +
                                        '<li>' + $A.get("$Label.c.mst_text_Left") + ' <div class="btninput tabButtons img-f" data-input="f" data-key="70">F</div></li>' +
                                        '<li>' + $A.get("$Label.c.mst_text_Right") + ' <div class="btninput tabButtons img-j" data-input="j" data-key="74">J</div></li>' +
                                        '</ul></div>' +
                                        '</div>',
                                    command: [70, 74], result: true, answer: finalTestLgc[i].answer, question: 1, isPractice: false, white: true, trial: 'Main_Test_' + mainTestCount + '',
                                    leftImageName: array[finalTestLgc[i].left].name, rightImageName: array[finalTestLgc[i].right].name, isTest: true, round: rndCnt,
                                    leftImagePosition: finalTestLgc[i].left, rightImagePosition: finalTestLgc[i].right, lagCategory: finalTestLgc[i].lagCategory
                                });

                            }
                            
                        }
                    }

                    //Preparing content screen.
                    function prepareContentScreen(destinationArray, instrScrTyp, fianlTestCount) {
                        let screenNo = destinationArray.length.toString();
                        // let perCount = '40%';
                        console.log('screenNo =', screenNo);
                        if (instrScrTyp == 'prTestInst') {
                            
                            destinationArray.push({
                                screen: screenNo, startDuration: -1, endDuration: 0, isTouch: true, content: '<div class="title"><span>PRACTICE TEST </span></div><div class="title">  <span> ' + $A.get("$Label.c.mst_text_practice") + ' </span> </div>' +
                                    '<div class="title">' + $A.get("$Label.c.mst_text_object_Remember") + '</div>' +
                                    '<div class="title">' + $A.get("$Label.c.mst_text_sapce_ready") + '</div>' +
                                    '<p class="centers s-b-instraction">' + $A.get("$Label.c.games_spacebar_text_2") + '</p>', instructionsLeft: true, command: [32, 32]

                            });

                        } else if (instrScrTyp == 'finalStudy') {
                            prctCount = fianlTestCount;
                            let customLabelformstreal = "";
                            let customLabelformstrealRound = "";
                            if (prctCount == 1) {
                               // customLabelformstreal = $A.get("$Label.c.mst_text_play_game");
                               // customLabelformstrealRound = $A.get("$Label.c.mst_object_time_three_rounds");
                               destinationArray.push(ins_configdata[15]);

                            }
                            else if (prctCount == 2) {
                               // customLabelformstreal = $A.get("$Label.c.objTimefinalStudy01a");
                               // customLabelformstrealRound = $A.get("$Label.c.mst_object_time_three_rounds");
                               destinationArray.push(ins_configdata[18]);
                            }
                            else if (prctCount == 3) {
                                //customLabelformstreal = $A.get("$Label.c.objTimefinalStudy01b");
                               // customLabelformstrealRound = $A.get("$Label.c.mst_object_time_last_round");
                               destinationArray.push(ins_configdata[21]);
                            }
                            // destinationArray.push({
                            //     screen: screenNo, startDuration: -1, endDuration: 0, isTouch: true, content: '<div  class="title">' + customLabelformstreal + '</div>' +
                            //         '<div  class="title">' + $A.get("$Label.c.mst_object_time_practice_round") + '</div>' +
                            //         '<div  class="title">' + $A.get("$Label.c.mst_object_time_50_pictures") + '</div>' +
                            //         '<div  class="title">' + customLabelformstrealRound + '</div>' +
                            //         '<div  class="title">' + $A.get("$Label.c.mst_text_object_remember_3") + '</div>' +
                            //         '<div  class="title">' + mst_text_9_1 + '</div>' +
                            //         '<div class="title">' + $A.get("$Label.c.mst_text_sapce_ready") + '</div>' +
                            //         '<p class="centers s-b-instraction">' + $A.get("$Label.c.games_spacebar_text_2") + '</p>', instructionsLeft: true, command: [32, 32]
                            // });
                            if (finalStudyScrCnt == 0) {
                                finalStudyScrCnt = destinationArray.length - 1;
                            }
                        } else if (instrScrTyp == 'finalTest') {
                            destinationArray.push(
                            //     {
                            //     screen: screenNo, startDuration: -1, endDuration: 0, isTouch: true, content: '<div class="title  ">  <span> ' + $A.get("$Label.c.games_instruction_text") + ' </span> </div>' +
                            //         '<div  class="title">' + $A.get("$Label.c.mst_object_time_final_part") + '</div>' +
                            //         '<div  class="title">' + $A.get("$Label.c.mst_object_time_two_pictures") + '</div>' +
                            //         '<div  class="title">' + $A.get("$Label.c.mst_object_time_picture_on_left") + '</div>' +
                            //         '<div  class="title">' + $A.get("$Label.c.mst_object_time_picture_on_right") + '</div>' +
                            //         '<p class="centers s-b-instraction">' + $A.get("$Label.c.games_spacebar_text_1") + '</p>', instructionsLeft: true, command: [32, 32]
                            // }
                            ins_configdata[16]
                            );

                        } else if (instrScrTyp == 'finalTest1') {
                            destinationArray.push(
                            //     {

                            //     screen: screenNo, startDuration: -1, endDuration: 0, isTouch: true, content: '<div class="title  ">  <span> ' + $A.get("$Label.c.games_instruction_text") + ' </span> </div>' +
                            //         '<div  class="title">' + mst_text_21_t_1 + '</div>' +
                            //         '<div  class="title">' + mst_text_21_t_2 + '</div>' +
                            //         '<div class="title">' + $A.get("$Label.c.mst_text_sapce_ready") + '</div>' +
                            //         '<p class="centers s-b-instraction">' + $A.get("$Label.c.games_spacebar_text_2") + '</p>', instructionsLeft: true, command: [32, 32]
                            // }
                            ins_configdata[17]
                            );

                        } else if (instrScrTyp == 'percentScreen') {
                            destinationArray.push(
                            //     {

                            //     screen: screenNo, startDuration: -1, endDuration: 0, isTouch: true, content: 'ssssssssssss<div class="title display-flex j-center ">  <div> ' + $A.get("$Label.c.mst_text_you_got") + ' </div> <div id="perCount" style="padding-left:5px; padding-right:5px; font-weight:bold;">' + perCount + '% </div> ' + $A.get("$Label.c.mst_text_correct") + '  </div> </div>' +
                            //         '<p class="centers s-b-instraction">' + $A.get("$Label.c.games_spacebar_text_1") + '</p>', command: [32, 32]
                            // }
                            ins_configdata[6]
                            );
                            prTestResultscreen = destinationArray.length;
                        } else if (instrScrTyp == 'endScreen') {
                            destinationArray.push(
                            //     {
                            //     screen: screenNo, startDuration: -1, endDuration: 0, isTouch: true, content: '<div class="title">' + $A.get("$Label.c.mst_object_time_thank_you") + ' ' + $A.get("$Label.c.mst_object_time_end") + '</div>' +
                            //         '<div class="title ">' + $A.get("$Label.c.object_game_text_27") + '</div>' +
                            //         '<div class="title">' + $A.get("$Label.c.game_thanks_text_2") + '</div>', gameComplete: true, instructionsLeft: true, command: [32, 32]
                            // }
                            ins_configdata[22]
                            );

                        } else if (instrScrTyp == 'prStudyScreen') {
                            prctCount = fianlTestCount;
                            let customLabelformst = "";
                            // if (prctCount == 1) {
                            //     customLabelformst = $A.get("$Label.c.mst_text_practice");
                            // }
                            // else if (prctCount == 2) {
                            //     customLabelformst = $A.get("$Label.c.mst_object_time_play_again");
                            // }
                            // else if (prctCount == 3) {
                            //     customLabelformst = $A.get("$Label.c.mst_text_last_time");
                            // }
                            // destinationArray.push(
                            //     // {
                            //     // screen: screenNo, startDuration: -1, endDuration: 0, isTouch: true, content: '<div  class="title">' + customLabelformst + '</div>' +
                            //     //     '<div  class="title">' + $A.get("$Label.c.mst_text_object_remember_3") + '</div>' +
                            //     //     '<div  class="title">' + mst_text_9_1 + '</div>' +
                            //     //     '<div class="title">' + $A.get("$Label.c.mst_text_sapce_ready") + '</div>' +
                            //     //     '<p class="centers s-b-instraction">' + $A.get("$Label.c.games_spacebar_text_2") + '</p>', instructionsLeft: true, command: [32, 32]
                            //     // },
                            //     ins_configdata[3]
                            // );
                            if (prctCount == 1) {
                                //customLabelformst = $A.get("$Label.c.mst_text_practice");
                                destinationArray.push(
                                    ins_configdata[3]
                                );
                            }
                            else if (prctCount == 2) {
                                //customLabelformst = $A.get("$Label.c.mst_object_time_play_again");
                                destinationArray.push(
                                    ins_configdata[7]
                                );
                            }
                            else if (prctCount == 3) {
                                //customLabelformst = $A.get("$Label.c.mst_text_last_time");
                                destinationArray.push(
                                    ins_configdata[11]
                                );
                            }

                        } else if (instrScrTyp == 'prTestScreen') {
                            destinationArray.push(
                            //     {
                            //     screen: screenNo, startDuration: -1, endDuration: 0, isTouch: true, content: 'ssss<div class="title  ">  <span> ' + $A.get("$Label.c.games_instruction_text") + ' </span> </div>' +
                            //         '<div  class="title">' + $A.get("$Label.c.mst_object_time_next_part") + '</div>' +
                            //         '<div  class="title">' + $A.get("$Label.c.mst_object_time_two_pictures") + '</div>' +
                            //         '<div  class="title">' + $A.get("$Label.c.mst_object_time_picture_on_left") + '</div>' +
                            //         '<div  class="title">' + $A.get("$Label.c.mst_object_time_picture_on_right") + '</div>' +
                            //         '<p class="centers s-b-instraction">' + $A.get("$Label.c.games_spacebar_text_1") + '</p>', instructionsLeft: true, command: [32, 32]
                            // }
                            ins_configdata[8]

                            );

                        } else if (instrScrTyp == 'prTestScreen1') {
                            destinationArray.push(
                            //     {
                            //     screen: screenNo, startDuration: -1, endDuration: 0, isTouch: true, content: 'aaaa<div class="title  ">  <span> ' + $A.get("$Label.c.games_instruction_text") + ' </span> </div>' +
                            //         '<div  class="title">' + mst_text_21_t_1 + '</div>' +
                            //         '<div  class="title">' + mst_text_21_t_2 + '</div>' +
                            //         '<div class="title">' + $A.get("$Label.c.mst_text_sapce_ready") + '</div>' +
                            //         '<p class="centers s-b-instraction">' + $A.get("$Label.c.games_spacebar_text_2") + '</p>', instructionsLeft: true, command: [32, 32]
                            // }
                            ins_configdata[9]
                            );

                        }


                    }


                    //Adding elements to Study and Test arrays

                    function addingItemsToConfigData(arr, toArray, isBlankScreen, isStudy) {
                        let screenCount = toArray.length;
                        let blankScreen = {
                            screen: "blank", startDuration: 0, endDuration: 1000, content: '<p  class="centers"></p>' +
                                '<div class="objque">' +
                                '<div class="objbox" ></div>' +
                                '<div class="btninputbox"><ul class="btninputbx two-button-set">' +
                                '<li>' + $A.get("$Label.c.mst_text_Indoor") + '<div id="img-f" class="btninput img-f">F</div></li>' +
                                '<li>' + $A.get("$Label.c.mst_text_Outdoor") + '<div class="btninput img-j">J</div></li>' +
                                '</ul></div>' +
                                '</div>', white: true
                        };
                        if (!isStudy) {
                            blankScreen = {
                                screen: "blank", startDuration: 0, endDuration: 1000, content: '<p  class="centers"></p>' +
                                    '<div class="objque">' +
                                    '<div class="objbox" ></div>' +
                                    '<div class="btninputbox"><ul class="btninputbx two-button-set">' +
                                    '<li>' + $A.get("$Label.c.mst_text_Left") + ' <div id="img-f" class="btninput img-f">F</div></li>' +
                                    '<li>' + $A.get("$Label.c.mst_text_Right") + ' <div class="btninput img-j">J</div></li>' +
                                    '</ul></div>' +
                                    '</div>', white: true
                            };
                        }
                        for (var i = 0; i < arr.length; i++) {
                            arr[i].screen = screenCount + i;
                            //arr[i].question = screenCount + i;
                            arr[i].question = i + 1;
                            arr[i].screen = arr[i].screen.toString();
                            toArray.push(arr[i]);
                            if (isBlankScreen) {
                                //blankScreen.screen = i + 2;
                                toArray.push(blankScreen);
                            }
                        }
                    }

                    //making images Random.
                    function randomValue(array) {

                        return Math.floor(Math.random() * (array.length - 1));
                    }


                    function arrayOfRandomImages(array) {
                        for (var i = 0; i < array.length; i++) {
                            // //console.log('sssssssssssss', i);
                            let itemNumber = randomValue(array);
                            ////console.log('sssssssssssss', itemNumber);
                            let item = array[i];
                            array[i] = array[itemNumber];
                            array[itemNumber] = item;
                        }
                    }

                    //Preparing practice data
                    //Making practice sets random.
                    arrayOfRandomImages(prImages);
                    arrayOfRandomImages(imgs);

                    //console.log('prImages : ', prImages);

                    preparePRStudy(prImages, prStudy1, 0, 4);
                    prepareContentScreen(configdata, 'prStudyScreen', 1);
                    addingItemsToConfigData(prStudy1, configdata, true, true);
                    //console.log(prStudy1);
                    prepareContentScreen(configdata, 'prTestScreen', 1);
                    prepareContentScreen(configdata, 'prTestScreen1', 1);
                    //prepareContentScreen(configdata, 'prTestInst', 0);

                    preparePRTest(prImages, prTest1, 0);
                    addingItemsToConfigData(prTest1, configdata, true, false);
                    //console.log(prTest1);
                    prepareContentScreen(configdata, 'percentScreen', 0);
                    var prTestResultscreen1 = prTestResultscreen;

                    preparePRStudy(prImages, prStudy2, 4, 4);
                    prepareContentScreen(configdata, 'prStudyScreen', 2);
                    addingItemsToConfigData(prStudy2, configdata, true, true);
                    //console.log(prStudy2);
                    prepareContentScreen(configdata, 'prTestScreen', 2);
                    prepareContentScreen(configdata, 'prTestScreen1', 2);
                    //prepareContentScreen(configdata, 'prTestInst', 0);

                    preparePRTest(prImages, prTest2, 4);
                    addingItemsToConfigData(prTest2, configdata, true, false);
                    //console.log(prTest2);
                    prepareContentScreen(configdata, 'percentScreen', 0);
                    var prTestResultscreen2 = prTestResultscreen;

                    preparePRStudy(prImages, prStudy3, 8, 4);
                    prepareContentScreen(configdata, 'prStudyScreen', 3);
                    addingItemsToConfigData(prStudy3, configdata, true, true);
                    //console.log(prStudy3);
                    prepareContentScreen(configdata, 'prTestScreen', 3);
                    prepareContentScreen(configdata, 'prTestScreen1', 3);
                    //prepareContentScreen(configdata, 'prTestInst', 0);

                    preparePRTest(prImages, prTest3, 8);
                    addingItemsToConfigData(prTest3, configdata, true, false);
                    //console.log(prTest3);
                    prepareContentScreen(configdata, 'percentScreen', 0);
                    var prTestResultscreen3 = prTestResultscreen;


                    //Creating the array with list of arrays having 32 images each.

                    masterImagePairs = prepareMasterArray(imgs, 32);
                    arrayOfRandomImages(masterImagePairs);
                    prepareMainStudyAndTest(masterImagePairs);
                    prepareContentScreen(configdata, 'endScreen', 0);
                    //console.log('configdata = ', configdata);
                    let bgimages = [];
                    let bgimages2 = [];
                    var imgContainer = document.getElementById('imgContainer');

                    //console.log('preloadImageArray = ', preloadImageArray);
                    function preloadImage(imgdata) {
                        for (var i = 0; i <= imgdata.length - 1; i++) {
                            bgimages[i] = new Image();
                            bgimages[i].src = imgdata[i];
                            imgContainer.appendChild(bgimages[i]);
                        }

                        //console.log('image load' , bgimages[1].src);
                    }
                    function preloadImage2(imgdata) {

                        for (var i = 0; i <= imgdata.length - 1; i++) {
                            bgimages2[i] = new Image();
                            bgimages2[i].src = imgdata[i];
                            imgContainer.appendChild(bgimages2[i]);
                            //console.log('image load' , bgimages2[i].src);
                        }


                    }
                    preloadImage2([
                        '/sfsites/c/resource/mindcrowd_style/images/F.png',
                        '/sfsites/c/resource/mindcrowd_style/images/j.png'
                        // 'v.png?t=1',
                        // 'bk.png?t=1',
                        // 'n.png?t=1'
                    ])
                    preloadImage(preloadImageArray);

                    console.log('configdata = ', configdata);

                    //configdata = JSON.stringify(configdata);
                    //This saveData function is used for creating record in ParticipantGameresponse object.

                    function saveData(gameName, questionNumber, response, isCorrect, reactionTime, isPracticeQuestion, correctAnswer, trial, imageName, leftImagePosition, rightImagePosition, lagCategory, round) {
                         if(!(response == 'j' || response == 'f'|| response == 'J' || response == 'F')){
                            response  = "No Response";
                        }
                        //console.log("Input Results all fields: ", userContactId, gameId, questionNumber,"response: ", response, isCorrect, reactionTime, isPracticeQuestion, correctAnswer, participantGameInfoId, trial,imageName, leftImagePosition, rightImagePosition, lagCategory, round);
                        helper.recorData(component, event, helper, userContactId, gameId, questionNumber, response, isCorrect, reactionTime, isPracticeQuestion, correctAnswer, participantGameInfoId, trial, imageName, leftImagePosition, rightImagePosition, lagCategory, round);
                    }
                    //save data for no responce

                    // This ensgame function works for the update participant gameInfo record like as end date time.
                    function endGame(gameId, participantGameInfoId) {
                        var endDateTime = new Date();
                        var gamePlayStatus = "Completed";
                        var screenResolution = {"height" :screenHeight, "width" :screenWidth };
                        helper.participantGameInfoUpdate(component, event, helper, userContactId, language, gameId, endDateTime, gamePlayStatus, participantGameInfoId, screenResolution);//helper method calling here.
                    }


                    //this function works for initialize processing.
                    function changeScreen() {
						console.log('currentScreent@::', currentScreent);
                        gameId = component.get("v.myAttribute");
                        userContactId = component.get("v.mycontactId");
                        ipAddress = component.get("v.ipAddress");
                        browserName = component.get("v.browser");

                        participantGameInfoId = component.get("v.participantGameid");//participantGameInfoId holds the participantgameinfo record id.

                        window.removeEventListener('keyup', gamePlay, false);
                        window.addEventListener('keyup', gamePlay, false);

                        responseCount = 0;

                        timedata = new Date();

                        if (currentScreent == '1' || currentScreent == '12' || currentScreent == '23' || currentScreent == '32' 
                            || currentScreent == '43' || currentScreent == '52' || currentScreent == '63' || currentScreent == '130' 
                            || currentScreent == '162' || currentScreent == '229' || currentScreent == '261' || currentScreent == '328' || currentScreent == '360') {
                            
                            roundStartTime = timedata;
                            totalKeyStrokesInRound = 0;
                        }
                        if (currentScreent == '11' || currentScreent == '21' || currentScreent == '31' || currentScreent == '41' 
                            || currentScreent == '51' || currentScreent == '61' || currentScreent == '127' || currentScreent == '161' 
                            || currentScreent == '226' || currentScreent == '260' || currentScreent == '325' || currentScreent == '359' ) {
                            
                            roundTotalTime = timedata - roundStartTime;
                            
                            if (currentScreent == '11') {
                                let totalTimeForRoundZero = roundTotalTime;
                                helper.participantGameInfoUpdateTotalTimeRoundOne(component, event, helper, userContactId, gameId, participantGameInfoId, totalTimeForRoundZero,totalKeyStrokesInRound,currentScreent);
                            }
                            else if (currentScreent == '21') {
                                let totalTimeForRoundOne = roundTotalTime;
                                helper.participantGameInfoUpdateTotalTimeRoundOne(component, event, helper, userContactId, gameId, participantGameInfoId, totalTimeForRoundOne,totalKeyStrokesInRound,currentScreent);
                            }
                            else if (currentScreent == '31') {
                                let totalTimeForRoundTwo = roundTotalTime;
                                helper.participantGameInfoUpdateTotalTimeRoundOne(component, event, helper, userContactId, gameId, participantGameInfoId, totalTimeForRoundTwo,totalKeyStrokesInRound,currentScreent);
                            }
                            else if (currentScreent == '41') {
                                let totalTimeForRoundThree = roundTotalTime;
                                helper.participantGameInfoUpdateTotalTimeRoundOne(component, event, helper, userContactId, gameId, participantGameInfoId, totalTimeForRoundThree,totalKeyStrokesInRound,currentScreent);
                            }
                            else if (currentScreent == '51') {
                                let totalTimeForRoundFour = roundTotalTime;
                                helper.participantGameInfoUpdateTotalTimeRoundOne(component, event, helper, userContactId, gameId, participantGameInfoId, totalTimeForRoundFour,totalKeyStrokesInRound,currentScreent);
                            }
                            else if (currentScreent == '61') {
                                let totalTimeForRoundFive = roundTotalTime;
                                helper.participantGameInfoUpdateTotalTimeRoundOne(component, event, helper, userContactId, gameId, participantGameInfoId, totalTimeForRoundFive,totalKeyStrokesInRound,currentScreent);
                            }
                            else if (currentScreent == '127') {
                                let totalTimeForRoundSix = roundTotalTime;
                                helper.participantGameInfoUpdateTotalTimeRoundOne(component, event, helper, userContactId, gameId, participantGameInfoId, totalTimeForRoundSix,totalKeyStrokesInRound,currentScreent);
                            }
                            else if (currentScreent == '161') {
                                let totalTimeForRoundSeven = roundTotalTime;
                                helper.participantGameInfoUpdateTotalTimeRoundOne(component, event, helper, userContactId, gameId, participantGameInfoId, totalTimeForRoundSeven,totalKeyStrokesInRound,currentScreent);
                            }
                            else if (currentScreent == '226') {
                                let totalTimeForRoundEight = roundTotalTime;
                                helper.participantGameInfoUpdateTotalTimeRoundOne(component, event, helper, userContactId, gameId, participantGameInfoId, totalTimeForRoundEight,totalKeyStrokesInRound,currentScreent);
                            }
                            else if (currentScreent == '260') {
                                let totalTimeForRoundNine = roundTotalTime;
                                helper.participantGameInfoUpdateTotalTimeRoundOne(component, event, helper, userContactId, gameId, participantGameInfoId, totalTimeForRoundNine,totalKeyStrokesInRound,currentScreent);
                            }
                            else if (currentScreent == '325') {
                                let totalTimeForRoundTen = roundTotalTime;
                                helper.participantGameInfoUpdateTotalTimeRoundOne(component, event, helper, userContactId, gameId, participantGameInfoId, totalTimeForRoundTen,totalKeyStrokesInRound,currentScreent);
                            }
                            else if (currentScreent == '359') {
                                let totalTimeForRoundEleven = roundTotalTime;
                                helper.participantGameInfoUpdateTotalTimeRoundOne(component, event, helper, userContactId, gameId, participantGameInfoId, totalTimeForRoundEleven,totalKeyStrokesInRound,currentScreent);
                            }
                        }

                        //Remove below after prScore made dynamic.
                        //if(prTestResultscreen1 == currentScreent){
                        //  prScore = 60;
                        //}
                        //  //console.log('prTestResultscreen1 ----- : ', prTestResultscreen1, ' currentScreent = ', currentScreent);
                        if (prTestResultscreen1 == currentScreent || prTestResultscreen2 == currentScreent ||
                            prTestResultscreen3 == currentScreent) {
                            // prScore = (prSuccessCount/4)*100;
                            //console.log('prTestResultscreen1 --inside--- : ', prTestResultscreen1, ' currentScreent = ', currentScreent);
                            //  //console.log('prScore : ', prScore, ' finalStudyScrCnt = ', finalStudyScrCnt);
                            if (prScore >= 60) {
                                //console.log('inside more 60');
                                currentScreent = finalStudyScrCnt;
                            }
                            prSuccessCount = 0;
                            perCount = 0;
                            prScore = 0;
                        }
                        ////console.log('currentScreent : ', configdata[currentScreent].content);
                        document.getElementById("datablock_mst").innerHTML = configdata[currentScreent].content;
                        if (configdata[currentScreent].gameComplete == true) {
                            document.getElementById("nextBtton").classList.remove("slds-hide");
                        }
                        if (prTestResultscreen1 == currentScreent + 1 || prTestResultscreen2 == currentScreent + 1 ||
                            prTestResultscreen3 == currentScreent + 1) {
                            document.getElementById("perCount").innerHTML = prScore + '%';
                        }
                        //alligning the instruction content to left.
                        if (configdata[currentScreent].instructionsLeft == true) {
                            document.getElementById("gameMainContent").classList.add("instructionsLeft");
                        } else {
                            document.getElementById("gameMainContent").classList.remove("instructionsLeft");
                        }
                        //Changes for touch
                        if (!isKeyboad) {
                            document.getElementById("datablock_mst").removeEventListener('click', gotoNextScreen, false);
                            if (configdata[currentScreent].hasOwnProperty('isTouch')) {
                                document.getElementById("datablock_mst").addEventListener('click', gotoNextScreen, false);
                            }
                            // enabling buttons for mobile devices.
                            let tabButtons = document.querySelectorAll(".tabButtons");
                            let tabButtonBox = document.querySelectorAll(".ins-btn");
                            if (tabButtonBox != 'undefined' && tabButtonBox != null) {
                                tabButtonBox.forEach((e) => {
                                    e.classList.remove("slds-hide");
                                });
                            }
                            if (tabButtons != 'undefined' && tabButtons != null) {
                                    tabButtons.forEach((e) => {
                                        e.classList.remove("slds-hide");
                                        e.classList.remove("slds-hide");
                                        e.addEventListener('click', mdttEventQuery, false);
                                    });
                            }
                        }

                        if (configdata[currentScreent].hasOwnProperty('white')) {
                            document.getElementById("gameBox").classList.add("white");
                        } else {
                            document.getElementById("gameBox").classList.remove("white");
                        }



                        //end changes for touch goto  function  gotoNextScreen

                        errormsg = document.getElementById("resulttxt");
                        if (typeof (errormsg) != 'undefined' && errormsg != null) { } else { errormsg = null; }
                        // commenting the code as blank screen added to configdata after images. 
                        /*  imagedata = document.getElementById("imagedata");
                         imagedata1 = document.getElementById("imagedata1");
                     
                         if ((typeof (imagedata) != 'undefined' && imagedata != null) || (typeof (imagedata1) != 'undefined' && imagedata1 != null)) {
                            clearTimeout(intervalImageTime);
                             intervalImageTime = setTimeout(function () { if (imagedata != null) imagedata.remove(); if (imagedata1 != null) imagedata1.remove();}, 2000);
                     
                         } else { imagedata = null;  imagedata1 = null; } */

                        if (currentScreent > 0) {
                            let isResult = configdata[currentScreent - 1].hasOwnProperty("result") ? true : false;
                            let lastdata = lastdatatitle;

                            //console.log('outside data isResult ',isResult);
                            if (lastdata.length <= 0 && isResult == true) {
                                //console.log('inside result changescr ',configdata[currentScreent - 1].isTest);
                                //Result Data
                                if (configdata[currentScreent - 1].isTest) {
                                    resultData[configdata[currentScreent - 1].screen] = {
                                        "duration": result_time,// configdata[currentScreent - 1].endDuration,
                                        "status": "false",
                                        "data": inputdata,
                                        "question": configdata[currentScreent - 1].question,
                                        "isPractice": configdata[currentScreent - 1].isPractice,
                                        "correctAnswer": configdata[currentScreent - 1].answer,
                                        "trial": configdata[currentScreent - 1].trial,
                                        "leftImageName": configdata[currentScreent - 1].leftImageName,
                                        "rightImageName": configdata[currentScreent - 1].rightImageName,
                                        "leftImagePosition": configdata[currentScreent - 1].leftImagePosition,
                                        "rightImagePosition": configdata[currentScreent - 1].rightImagePosition,
                                        "lagCategory": configdata[currentScreent - 1].lagCategory,
                                        "round": configdata[currentScreent - 1].round
                                    };
                                } else {
                                    //console.log('in else', configdata[currentScreent - 1].question);
                                    resultData[configdata[currentScreent - 1].screen] = {
                                        "duration": configdata[currentScreent - 1].endDuration,
                                        "status": "false",
                                        "data": inputdata,
                                        "question": configdata[currentScreent - 1].question,
                                        "isPractice": configdata[currentScreent - 1].isPractice,
                                        "correctAnswer": configdata[currentScreent - 1].answer,
                                        "trial": configdata[currentScreent - 1].trial,
                                        "name": configdata[currentScreent - 1].name,
                                        "leftImagePosition": "",
                                        "rightImagePosition": "",
                                        "lagCategory": "",
                                        "round": configdata[currentScreent - 1].round
                                    };
                                }

                                lastdatatitle = "Result";


                                if (inputdata.toLowerCase() == configdata[currentScreent - 1].answer) {
                                    // perCount++ ;
                                    ////console.log('precount logic : ', inputdata.toLowerCase() == configdata[currentScreent - 1].answer);
                                    resultData[configdata[currentScreent - 1].screen]["status"] = "true";

                                } else {
                                    resultData[configdata[currentScreent - 1].screen]["status"] = "false";
                                }


                                //Save Output Events
                                let currentgamedata = resultData[configdata[currentScreent - 1].screen];
                                //console.log('configdata[currentScreent - 1].isTest :', configdata[currentScreent - 1].isTest);
                                let imgName = {};
                                if (configdata[currentScreent - 1].isTest) {
                                    imgName["leftImageName"] = currentgamedata.leftImageName;
                                    imgName["rightImageName"] = currentgamedata.rightImageName;
                                    saveData(
                                        "MST",
                                        currentgamedata.question,
                                        currentgamedata.data,
                                        currentgamedata.status,
                                        currentgamedata.duration,
                                        currentgamedata.isPractice,
                                        currentgamedata.correctAnswer,
                                        currentgamedata.trial,
                                        imgName,
                                        currentgamedata.leftImagePosition,
                                        currentgamedata.rightImagePosition,
                                        currentgamedata.lagCategory,
                                        currentgamedata.round
                                    );
                                } else {
                                    // //console.log("in else round: ", currentgamedata.round);
                                    imgName["leftImageName"] = currentgamedata.name;
                                    saveData(
                                        "MST",
                                        currentgamedata.question,
                                        currentgamedata.data,
                                        currentgamedata.status,
                                        currentgamedata.duration,
                                        currentgamedata.isPractice,
                                        currentgamedata.correctAnswer,
                                        currentgamedata.trial,
                                        imgName,
                                        currentgamedata.leftImagePosition,
                                        currentgamedata.rightImagePosition,
                                        currentgamedata.lagCategory,
                                        currentgamedata.round
                                    );
                                }


                                //Front Result Output Data Intigration time comment or Remove 3 lines
                                document.getElementById("d_title").innerHTML = "Result";
                                document.getElementById("d_txt").innerHTML = configdata[currentScreent - 1].endDuration + " ms";
                                document.getElementById("d_status").innerHTML = resultData[configdata[currentScreent - 1].screen]["status"];
                                setTimeout(clearResult, 1000);
                            }
                        }
                        //console.log('===========participantGameInfo------------- :',currentScreent);
                            //creating participant game info record.
                        if (currentScreent == 1) {
                            var startDateTime = new Date();
                            var gamePlayStatus = "Not-Completed";
                            //console.log('===========participantGameInfo------------- :',userContactId, gameId, startDateTime, gamePlayStatus, ipAddress, browserName, device);
                            var screenResolution = {"height" :screenHeight, "width" :screenWidth };
                            helper.participantGameInfo(component, event, helper, userContactId, language, gameId, startDateTime, gamePlayStatus, ipAddress, browserName, device, screenResolution);

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
                            ////console.log('ddddddddddddddd')
                            lastdatatitle = "";
                            currentScreent = currentScreent + 1;
                        } else {
                            // //console.log('sssssssssssssssssssssssss')
                            clearTimeout(intervalTime);
                        }
                        inputdata = "No Response";
                        result_time = configdata[currentScreent - 1].endDuration;
                    }

                    //Event Control System
                    //window.addEventListener('keyup', gamePlay, false);

                    //Inisilize the page processing
                    changeScreen();

                    const delayprocess = ms => new Promise(res => setTimeout(res, ms));

                    function gamePlay(e) {

                        if (configdata[currentScreent].gameEnd && e.keyCode == 32) {
                            helper.allowLeaving();
                            window.location.href = $A.get("$Label.c.Community_Url") + "/s/me-objects-spatial";
                        }

                        command_value = e.keyCode;
                        inputdata = e.key;
                        totalKeyStrokesInRound = totalKeyStrokesInRound + 1;
                        let startDurations = configdata[currentScreent - 1].startDuration;

                        //console.log(inputdata);
                        if (inputdata == 'f' && document.getElementById('imgf') != null) {
                            document.getElementById('imgf').classList.add("img-f-select");
                        }
                        if (inputdata == 'j' && document.getElementById('imgj') != null) {
                            document.getElementById('imgj').classList.add("img-f-select");
                        }
                        window.setTimeout(
                            $A.getCallback(function () {
                                if (document.getElementById('imgj') != null) {
                                    document.getElementById('imgf').classList.remove("img-f-select");
                                    document.getElementById('imgj').classList.remove("img-f-select");
                                }
                            }), 500
                        );

                        //Press spacific key command
                        if (startDurations == -1) {
                            if (configdata[currentScreent - 1].hasOwnProperty("command") && command_value >= configdata[currentScreent - 1].command[0] && command_value <= configdata[currentScreent - 1].command[1]) {
                                clearTimeout(intervalTime);
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
                                //console.log('inside result calc ', configdata[currentScreent - 1].trial);
                                if (!resultData.hasOwnProperty(configdata[currentScreent - 1].screen)) {

                                    ////console.log('inside result calc ', configdata[currentScreent - 1].trial);
                                    if (configdata[currentScreent - 1].isTest) {
                                        resultData[configdata[currentScreent - 1].screen] = {
                                            "duration": "0",
                                            "status": "false",
                                            "data": "",
                                            "question": configdata[currentScreent - 1].question,
                                            "isPractice": configdata[currentScreent - 1].isPractice,
                                            "correctAnswer": configdata[currentScreent - 1].answer,
                                            "trial": configdata[currentScreent - 1].trial,
                                            "leftImageName": configdata[currentScreent - 1].leftImageName,
                                            "rightImageName": configdata[currentScreent - 1].rightImageName,
                                            "leftImagePosition": configdata[currentScreent - 1].leftImagePosition,
                                            "rightImagePosition": configdata[currentScreent - 1].rightImagePosition,
                                            "lagCategory": configdata[currentScreent - 1].lagCategory,
                                            "round": configdata[currentScreent - 1].round
                                        };
                                    } else {
                                        resultData[configdata[currentScreent - 1].screen] = {
                                            "duration": "0",
                                            "status": "false",
                                            "data": "",
                                            "question": configdata[currentScreent - 1].question,
                                            "isPractice": configdata[currentScreent - 1].isPractice,
                                            "correctAnswer": configdata[currentScreent - 1].answer,
                                            "trial": configdata[currentScreent - 1].trial,
                                            "leftImageName": configdata[currentScreent - 1].name,
                                            "leftImagePosition": "",
                                            "rightImagePosition": "",
                                            "lagCategory": "",
                                            "round": configdata[currentScreent - 1].round
                                        };
                                    }

                                }
                            }

                            if (result_time >= startDurations) {

                                if (configdata[currentScreent - 1].hasOwnProperty("command")) {
                                    //Command Value Match Data
                                    if (
                                        (configdata[currentScreent - 1].command.length == 2 && (command_value == configdata[currentScreent - 1].command[0] || command_value == configdata[currentScreent - 1].command[1])) ||
                                        (configdata[currentScreent - 1].command.length == 3 && (command_value == configdata[currentScreent - 1].command[0] || command_value == configdata[currentScreent - 1].command[1] || command_value == configdata[currentScreent - 1].command[2]))
                                    ) {

                                        //Result Calculation
                                        if (isResult) {

                                            if (inputdata.toLowerCase() == configdata[currentScreent - 1].answer) {
                                                // perCount++ ;
                                                resultData[configdata[currentScreent - 1].screen]["status"] = "true";
                                                if (configdata[currentScreent - 1].isPractice && configdata[currentScreent - 1].isTest) {
                                                    perCount++;
                                                    prScore = (perCount / 4) * 100;
                                                }

                                            } else {
                                                resultData[configdata[currentScreent - 1].screen]["status"] = "false";
                                            }
                                            //console.log('perCount = ', perCount);
                                            // if (configdata[currentScreent - 1].isPractice == true) {
                                            //     if (resultData[configdata[currentScreent - 1].screen]["status"] == "false") {
                                            //         errormsg.innerHTML = "Incorrect Response. Please try again.";
                                            //         blockKeyEvent();
                                            //         return false;
                                            //     } else {
                                            //         errormsg.innerHTML = "Correct";
                                            //         blockKeyEvent(1000);
                                            //         // await delayprocess(1000);
                                            //     }
                                            // }

                                            window.removeEventListener('keyup', gamePlay, false);

                                            resultData[configdata[currentScreent - 1].screen]["data"] = inputdata;
                                            resultData[configdata[currentScreent - 1].screen]["duration"] = result_time;
                                            //  lastdatatitle = "Result";

                                            //Save Output Events
                                            let currentgamedata = resultData[configdata[currentScreent - 1].screen];
                                            // saveData(
                                            //     "MST",
                                            //     currentgamedata.question,
                                            //     currentgamedata.data,
                                            //     currentgamedata.status,
                                            //     currentgamedata.duration,
                                            //     currentgamedata.isPractice,
                                            //     currentgamedata.correctAnswer,
                                            //     currentgamedata.trial,
                                            //     currentgamedata.leftImageName,
                                            //     currentgamedata.rightImageName,
                                            //     currentgamedata.leftImagePosition,
                                            //     currentgamedata.rightImagePosition,
                                            //     currentgamedata.lagCategory
                                            // );

                                            //Out put result Intigration time comment or Remove 3 lines
                                            document.getElementById("d_title").innerHTML = "Result";
                                            document.getElementById("d_txt").innerHTML = result_time + " ms";
                                            document.getElementById("d_status").innerHTML = resultData[configdata[currentScreent - 1].screen]["status"];
                                        }

                                        //Clear Results

                                        if (isResult) {

                                            if (configdata[currentScreent - 1].isPractice) {
                                                //  lastdatatitle="Result";
                                                //  setTimeout(clearResult,(screenWaitTime-result_time)+4);

                                            }
                                            else {
                                                clearTimeout(intervalTime);
                                                //Next Screen Show
                                                changeScreen();
                                                //Reset Screent Interval
                                                //  setTimeout(clearResult, 1500);
                                                // clearTimeout(intervalTime);
                                                //Next Screen Show
                                                // changeScreen();
                                            }
                                        }
                                        else {
                                            //Reset Screent Interval
                                            setTimeout(clearResult, 1500);
                                            clearTimeout(intervalTime);
                                            //Next Screen Show
                                            changeScreen();
                                        }

                                        //    if(configdata[currentScreent-1].isPractice==true){
                                        //     setTimeout(function(){ changeScreen(); }, 1500);                      
                                        //     }else{
                                        //         changeScreen();
                                        //     }

                                    }
                                }
                            }
                        }
                    }

                    function checkkey(e) {
                        //console.log('f-key-press');
                    }

                    function blockKeyEvent(bkey = 1500) {
                        clearTimeout(blockevents);
                        window.removeEventListener('keyup', gamePlay, false);
                        blockevents = setTimeout(function () {
                            errormsg.innerHTML = "";
                            window.addEventListener('keyup', gamePlay, false);
                            // window.addEventListener('keypress', checkkey, false);
                        }, bkey);
                    }

                    function clearResult() {
                        lastdatatitle = "";

                        //Front Result Output Data Intigration time comment or Remove 3 lines
                        // document.getElementById("d_title").innerHTML = "";
                        // document.getElementById("d_txt").innerHTML = "";
                        // document.getElementById("d_status").innerHTML = "";
                    }

                    //chnages for touch
                    function gotoNextScreen(e) {
                        gamePlay({ keyCode: 32 });
                    }
                    //chnages for touch end
                     function mdttEventQuery(e) {
                        responseCount++;
                        if(responseCount == 1){
                        gamePlay({ key: e.currentTarget.getAttribute("data-input"), keyCode: e.currentTarget.getAttribute("data-key") });
                        }
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