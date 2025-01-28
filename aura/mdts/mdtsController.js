({
    oneMethod: function (component, event, helper) {

        var timeS = new Date().getTime();
        const resourceUrl = $A.get("$Label.c.Community_Url") + $A.get("$Label.c.mdts_game_config_url") + '?test=' + timeS;
        console.log('resourceUrl = ', resourceUrl);
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
                        var gameNameScientific = $A.get("$Label.c.scientific_game_objectSpatial");
                        //console.log('gameNameScientific values :--',gameNameScientific);
                        helper.gameDetails(component, event, helper, gameNameScientific);
                        var gameId;
                        var participantGameInfoId;
                        var ipAddress;
                        var browserName;
                        helper.getIpAddress(component, event, helper);
                        helper.printBrowser(component, event, helper);
                        //   var device = $A.get("$Browser.formFactor");
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

                                console.log('language second', language);
                                //console.log('contact values :--',name,name['Object_Spatial__c']);  
                                ////console.log('$A.get("$Label.c.url_wordpairsgame")=', $A.get("$Label.c.url_me_wordpairsgame"))
                                if (name['Object_Spatial__c'] == 'Locked' && pageUrl[1] == $A.get("$Label.c.url_Objects_Space")) {
                                    // url_wordpairsgame
                                    //console.log('Object_Spatial__c game in locked');
                                    // alert('You are not authorized to play this game.');
                                    component.set('v.showConfirmDialog', true);
                                }
                                else if (name['Object_Spatial__c'] == 'Completed' && pageUrl[1] == $A.get("$Label.c.url_Objects_Space")) {
                                    //console.log('Object_Spatial__c game in completed');
                                    // alert('You are not authorized to play this game.');
                                    component.set('v.showConfirmDialog', true);
                                }
                                // full game code is started from else part.===========================
                                //else if(name['Object_Spatial__c']=='Opened' && pageUrl[1]==  $A.get("$Label.c.url_Objects_Space")){
                                else if (name['Object_Spatial__c'] == 'Opened') {
                                    component.set('v.showConfirmDialog', false);
                                    helper.preventLeaving();
                                    document.documentElement.addEventListener('keydown', function (e) {
                                        if ((e.keycode || e.which) == 32) {
                                            e.preventDefault();
                                        }
                                    }, false);
                                    ////console.log('test');


                                    //MST game js -----------
                                    const urlParams = new URLSearchParams(document.location.search.substring(1));
                                    const cs = urlParams.get('cs');
                                    let currentScreent = 0;
                                    if (cs != null) {
                                        ////console.log("cs1=", cs)
                                        currentScreent = Number(cs);
                                    }

                                    let screenWaitTime = 2000;
                                    // let screenWaitTime=100;
                                    let resultData = {};
                                    // let currentScreent = 0;
                                    let intervalTime = null;
                                    let intervalImageTime = null;
                                    let blockevents = 0;
                                    let timedata = new Date();
                                    let result_time = 0;
                                    let command_value = "";
                                    let roundTotalTime = null;
                                    let roundStartTime = null;
                                    let totalKeyStrokesInRound = 0;
                                    let inputdata = null;
                                    let lastdatatitle = "";
                                    let image_path = $A.get("$Label.c.Community_Url") + "/resource/mindGamesImagesMST/mst/";
                                    let image_path2 = $A.get("$Label.c.Community_Url") + "/resource/mindcrowd_style/images/";
                                    let image_path_PR = $A.get("$Label.c.Community_Url") + "/resource/mdts_PR/";
                                    let imagePath = $A.get("$Label.c.Community_Url") + "/resource";
                                    let errormsg = null;
                                    let imagedata = null;
                                    var gameName = $A.get("$Label.c.game_name_10");
                                    var screenHeight = window.screen.availHeight;
                                    var screenWidth = window.screen.availWidth;
                                    var gameTime = '5';
                                    let white = false;
                                    let responseCount = 0;

                                    let macTouch = getCookie('macTouch');
                                    var ua = window.navigator.userAgent;
                                    var iOS = !!ua.match(/Mac OS/i);
                                    // var isMac = ua.match(/Mac OS/i);
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
                                        //alert(' component.get("v.browser")')
                                        if (macTouch == 'true' && device == "DESKTOP") {
                                            device = 'TABLET';
                                        }

                                    }
                                    function getCookie(name) {
                                        var cookieString = "; " + document.cookie;
                                        cookieString = cookieString.replace('LSKey-c$', '');
                                        var parts = cookieString.split("; " + name + "=");
                                        if (parts.length === 2) {
                                            return parts.pop().split(";").shift();
                                        }
                                        return null;
                                    }

                                    var mst_text_1_a = "";
                                    var mst_text_1_b = "";
                                    var mst_text_20_a_1 = "";
                                    var mst_text_9_1 = "";
                                    var mst_text_21_s_1 = "";
                                    var mst_text_21_s_2 = "";

                                    if (!isKeyboad) {
                                        mst_text_1_a = $A.get("$Label.c.mst_space_indoor_object_tap");
                                        mst_text_1_b = $A.get("$Label.c.mst_space_outdoor_object_tap");
                                        mst_text_20_a_1 = $A.get("$Label.c.mst_space_index_fingers_tap");
                                        mst_text_9_1 = $A.get("$Label.c.mst_text_space_remember_2_tap");
                                        mst_text_21_s_1 = $A.get("$Label.c.mst_text_21_s_1_tap");
                                        mst_text_21_s_2 = $A.get("$Label.c.mst_text_21_s_2_tap");
                                    } else {
                                        mst_text_1_a = $A.get("$Label.c.mst_space_indoor_object");
                                        mst_text_1_b = $A.get("$Label.c.mst_space_outdoor_object");
                                        mst_text_20_a_1 = $A.get("$Label.c.mst_space_index_fingers");
                                        mst_text_9_1 = $A.get("$Label.c.mst_text_space_remember_2");
                                        mst_text_21_s_1 = $A.get("$Label.c.mst_text_21_s_1");
                                        mst_text_21_s_2 = $A.get("$Label.c.mst_text_21_s_2");
                                    }
                                    
                                    ins_configdata =ins_configdata.map(obj => {	
                                        obj.content = obj.content.replace('mst_text_1_a', mst_text_1_a);
                                        obj.content = obj.content.replace('mst_text_1_b', mst_text_1_b);
                                        obj.content = obj.content.replace('mst_text_20_a_1', mst_text_20_a_1);
                                        obj.content = obj.content.replace('mst_text_9_1', mst_text_9_1);
                                        obj.content = obj.content.replace('mst_text_21_s_1', mst_text_21_s_1); 
                                        obj.content = obj.content.replace('mst_text_21_s_2', mst_text_21_s_2); 
                                        return obj;
                                  });
                                  //console.log('New ins_configdata: '+JSON.stringify(ins_configdata));



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
                                    var finalStudy = [];
                                    var finalTest = [];
                                    var finalImageMovementPercent = [];
                                    var preloadImageArray = [];
                                    var finalStudyScrCnt = 0;
                                    var prScore = 0;
                                    var perCount = 0;
                                    let prctCount = 0;
                                    var prTestResultscreen = 0;
                                    var prSuccessCount = 0;
                                    var gameComplete = false;
                                    /* var a_1 = [{name:'004a_1.jpg'},{name:'006a_1.jpg'},{name:'008a_1.jpg'},{name:'009a_1.jpg'},{name:'011a_1.jpg'},{name:'013a_1.jpg'},{name:'015a_1.jpg'},{name:'016a_1.jpg'},{name:'017a_1.jpg'},{name:'018a_1.jpg'},{name:'020a_1.jpg'},{name:'025a_1.jpg'},{name:'026a_1.jpg'},{name:'028a_1.jpg'},{name:'030a_1.jpg'},{name:'032a_1.jpg'},{name:'036a_1.jpg'},{name:'037a_1.jpg'},{name:'041a_1.jpg'},{name:'043a_1.jpg'},{name:'045a_1.jpg'},{name:'047a_1.jpg'},{name:'048a_1.jpg'},{name:'049a_1.jpg'},{name:'050a_1.jpg'},{name:'051a_1.jpg'},{name:'053a_1.jpg'},{name:'057a_1.jpg'},{name:'059a_1.jpg'},{name:'060a_1.jpg'},{name:'061a_1.jpg'},{name:'065a_1.jpg'},{name:'066a_1.jpg'},{name:'067a_1.jpg'},{name:'071a_1.jpg'},{name:'072a_1.jpg'},{name:'075a_1.jpg'},{name:'078a_1.jpg'},{name:'079a_1.jpg'},{name:'081a_1.jpg'},{name:'082a_1.jpg'},{name:'083a_1.jpg'},{name:'084a_1.jpg'},{name:'086a_1.jpg'},{name:'088a_1.jpg'},{name:'089a_1.jpg'},{name:'090a_1.jpg'},{name:'092a_1.jpg'},{name:'094a_1.jpg'},{name:'096a_1.jpg'},{name:'097a_1.jpg'},{name:'098a_1.jpg'},{name:'102a_1.jpg'},{name:'103a_1.jpg'},{name:'104a_1.jpg'},{name:'105a_1.jpg'},{name:'108a_1.jpg'},{name:'109a_1.jpg'},{name:'111a_1.jpg'},{name:'112a_1.jpg'},{name:'114a_1.jpg'},{name:'119a_1.jpg'},{name:'120a_1.jpg'},{name:'122a_1.jpg'},{name:'123a_1.jpg'},{name:'125a_1.jpg'},{name:'126a_1.jpg'},{name:'131a_1.jpg'},{name:'133a_1.jpg'},{name:'137a_1.jpg'},{name:'138a_1.jpg'},{name:'139a_1.jpg'},{name:'143a_1.jpg'},{name:'144a_1.jpg'},{name:'145a_1.jpg'},{name:'148a_1.jpg'},{name:'152a_1.jpg'},{name:'158a_1.jpg'},{name:'159a_1.jpg'},{name:'160a_1.jpg'},{name:'161a_1.jpg'},{name:'164a_1.jpg'},{name:'165a_1.jpg'},{name:'168a_1.jpg'},{name:'170a_1.jpg'},{name:'175a_1.jpg'},{name:'176a_1.jpg'},{name:'179a_1.jpg'},{name:'180a_1.jpg'},{name:'181a_1.jpg'},{name:'183a_1.jpg'},{name:'184a_1.jpg'},{name:'185a_1.jpg'},{name:'187a_1.jpg'},{name:'190a_1.jpg'},{name:'193a_1.jpg'},{name:'194a_1.jpg'},{name:'195a_1.jpg'},{name:'196a_1.jpg'},{name:'197a_1.jpg'}];
                                    var a_2 = [{name:'001a_2.jpg'},{name:'002a_2.jpg'},{name:'003a_2.jpg'},{name:'005a_2.jpg'},{name:'007a_2.jpg'},{name:'010a_2.jpg'},{name:'012a_2.jpg'},{name:'014a_2.jpg'},{name:'019a_2.jpg'},{name:'021a_2.jpg'},{name:'022a_2.jpg'},{name:'023a_2.jpg'},{name:'024a_2.jpg'},{name:'027a_2.jpg'},{name:'029a_2.jpg'},{name:'031a_2.jpg'},{name:'033a_2.jpg'},{name:'034a_2.jpg'},{name:'035a_2.jpg'},{name:'038a_2.jpg'},{name:'039a_2.jpg'},{name:'040a_2.jpg'},{name:'042a_2.jpg'},{name:'044a_2.jpg'},{name:'046a_2.jpg'},{name:'052a_2.jpg'},{name:'054a_2.jpg'},{name:'055a_2.jpg'},{name:'056a_2.jpg'},{name:'058a_2.jpg'},{name:'062a_2.jpg'},{name:'063a_2.jpg'},{name:'064a_2.jpg'},{name:'068a_2.jpg'},{name:'069a_2.jpg'},{name:'070a_2.jpg'},{name:'073a_2.jpg'},{name:'074a_2.jpg'},{name:'076a_2.jpg'},{name:'077a_2.jpg'},{name:'080a_2.jpg'},{name:'085a_2.jpg'},{name:'087a_2.jpg'},{name:'091a_2.jpg'},{name:'093a_2.jpg'},{name:'095a_2.jpg'},{name:'099a_2.jpg'},{name:'100a_2.jpg'},{name:'101a_2.jpg'},{name:'106a_2.jpg'},{name:'107a_2.jpg'},{name:'110a_2.jpg'},{name:'113a_2.jpg'},{name:'115a_2.jpg'},{name:'116a_2.jpg'},{name:'117a_2.jpg'},{name:'118a_2.jpg'},{name:'121a_2.jpg'},{name:'124a_2.jpg'},{name:'127a_2.jpg'},{name:'128a_2.jpg'},{name:'129a_2.jpg'},{name:'130a_2.jpg'},{name:'132a_2.jpg'},{name:'134a_2.jpg'},{name:'135a_2.jpg'},{name:'136a_2.jpg'},{name:'140a_2.jpg'},{name:'141a_2.jpg'},{name:'142a_2.jpg'},{name:'146a_2.jpg'},{name:'147a_2.jpg'},{name:'149a_2.jpg'},{name:'150a_2.jpg'},{name:'151a_2.jpg'},{name:'153a_2.jpg'},{name:'154a_2.jpg'},{name:'155a_2.jpg'},{name:'156a_2.jpg'},{name:'157a_2.jpg'},{name:'162a_2.jpg'},{name:'163a_2.jpg'},{name:'166a_2.jpg'},{name:'167a_2.jpg'},{name:'169a_2.jpg'},{name:'171a_2.jpg'},{name:'172a_2.jpg'},{name:'173a_2.jpg'},{name:'174a_2.jpg'},{name:'177a_2.jpg'},{name:'178a_2.jpg'},{name:'182a_2.jpg'},{name:'186a_2.jpg'},{name:'188a_2.jpg'},{name:'189a_2.jpg'},{name:'191a_2.jpg'},{name:'192a_2.jpg'},{name:'198a_2.jpg'},{name:'199a_2.jpg'},{name:'200a_2.jpg'}];
                                    var b_1 = [{name:'004b_1.jpg'},{name:'006b_1.jpg'},{name:'008b_1.jpg'},{name:'009b_1.jpg'},{name:'011b_1.jpg'},{name:'013b_1.jpg'},{name:'015b_1.jpg'},{name:'016b_1.jpg'},{name:'017b_1.jpg'},{name:'018b_1.jpg'},{name:'020b_1.jpg'},{name:'025b_1.jpg'},{name:'026b_1.jpg'},{name:'028b_1.jpg'},{name:'030b_1.jpg'},{name:'032b_1.jpg'},{name:'036b_1.jpg'},{name:'037b_1.jpg'},{name:'041b_1.jpg'},{name:'043b_1.jpg'},{name:'045b_1.jpg'},{name:'047b_1.jpg'},{name:'048b_1.jpg'},{name:'049b_1.jpg'},{name:'050b_1.jpg'},{name:'051b_1.jpg'},{name:'053b_1.jpg'},{name:'057b_1.jpg'},{name:'059b_1.jpg'},{name:'060b_1.jpg'},{name:'061b_1.jpg'},{name:'065b_1.jpg'},{name:'066b_1.jpg'},{name:'067b_1.jpg'},{name:'071b_1.jpg'},{name:'072b_1.jpg'},{name:'075b_1.jpg'},{name:'078b_1.jpg'},{name:'079b_1.jpg'},{name:'081b_1.jpg'},{name:'082b_1.jpg'},{name:'083b_1.jpg'},{name:'084b_1.jpg'},{name:'086b_1.jpg'},{name:'088b_1.jpg'},{name:'089b_1.jpg'},{name:'090b_1.jpg'},{name:'092b_1.jpg'},{name:'094b_1.jpg'},{name:'096b_1.jpg'},{name:'097b_1.jpg'},{name:'098b_1.jpg'},{name:'102b_1.jpg'},{name:'103b_1.jpg'},{name:'104b_1.jpg'},{name:'105b_1.jpg'},{name:'108b_1.jpg'},{name:'109b_1.jpg'},{name:'111b_1.jpg'},{name:'112b_1.jpg'},{name:'114b_1.jpg'},{name:'119b_1.jpg'},{name:'120b_1.jpg'},{name:'122b_1.jpg'},{name:'123b_1.jpg'},{name:'125b_1.jpg'},{name:'126b_1.jpg'},{name:'131b_1.jpg'},{name:'133b_1.jpg'},{name:'137b_1.jpg'},{name:'138b_1.jpg'},{name:'139b_1.jpg'},{name:'143b_1.jpg'},{name:'144b_1.jpg'},{name:'145b_1.jpg'},{name:'148b_1.jpg'},{name:'152b_1.jpg'},{name:'158b_1.jpg'},{name:'159b_1.jpg'},{name:'160b_1.jpg'},{name:'161b_1.jpg'},{name:'164b_1.jpg'},{name:'165b_1.jpg'},{name:'168b_1.jpg'},{name:'170b_1.jpg'},{name:'175b_1.jpg'},{name:'176b_1.jpg'},{name:'179b_1.jpg'},{name:'180b_1.jpg'},{name:'181b_1.jpg'},{name:'183b_1.jpg'},{name:'184b_1.jpg'},{name:'185b_1.jpg'},{name:'187b_1.jpg'},{name:'190b_1.jpg'},{name:'193b_1.jpg'},{name:'194b_1.jpg'},{name:'195b_1.jpg'},{name:'196b_1.jpg'},{name:'197b_1.jpg'}];
                                    var b_2 = [{name:'001b_2.jpg'},{name:'002b_2.jpg'},{name:'003b_2.jpg'},{name:'005b_2.jpg'},{name:'007b_2.jpg'},{name:'010b_2.jpg'},{name:'012b_2.jpg'},{name:'014b_2.jpg'},{name:'019b_2.jpg'},{name:'021b_2.jpg'},{name:'022b_2.jpg'},{name:'023b_2.jpg'},{name:'024b_2.jpg'},{name:'027b_2.jpg'},{name:'029b_2.jpg'},{name:'031b_2.jpg'},{name:'033b_2.jpg'},{name:'034b_2.jpg'},{name:'035b_2.jpg'},{name:'038b_2.jpg'},{name:'039b_2.jpg'},{name:'040b_2.jpg'},{name:'042b_2.jpg'},{name:'044b_2.jpg'},{name:'046b_2.jpg'},{name:'052b_2.jpg'},{name:'054b_2.jpg'},{name:'055b_2.jpg'},{name:'056b_2.jpg'},{name:'058b_2.jpg'},{name:'062b_2.jpg'},{name:'063b_2.jpg'},{name:'064b_2.jpg'},{name:'068b_2.jpg'},{name:'069b_2.jpg'},{name:'070b_2.jpg'},{name:'073b_2.jpg'},{name:'074b_2.jpg'},{name:'076b_2.jpg'},{name:'077b_2.jpg'},{name:'080b_2.jpg'},{name:'085b_2.jpg'},{name:'087b_2.jpg'},{name:'091b_2.jpg'},{name:'093b_2.jpg'},{name:'095b_2.jpg'},{name:'099b_2.jpg'},{name:'100b_2.jpg'},{name:'101b_2.jpg'},{name:'106b_2.jpg'},{name:'107b_2.jpg'},{name:'110b_2.jpg'},{name:'113b_2.jpg'},{name:'115b_2.jpg'},{name:'116b_2.jpg'},{name:'117b_2.jpg'},{name:'118b_2.jpg'},{name:'121b_2.jpg'},{name:'124b_2.jpg'},{name:'127b_2.jpg'},{name:'128b_2.jpg'},{name:'129b_2.jpg'},{name:'130b_2.jpg'},{name:'132b_2.jpg'},{name:'134b_2.jpg'},{name:'135b_2.jpg'},{name:'136b_2.jpg'},{name:'140b_2.jpg'},{name:'141b_2.jpg'},{name:'142b_2.jpg'},{name:'146b_2.jpg'},{name:'147b_2.jpg'},{name:'149b_2.jpg'},{name:'150b_2.jpg'},{name:'151b_2.jpg'},{name:'153b_2.jpg'},{name:'154b_2.jpg'},{name:'155b_2.jpg'},{name:'156b_2.jpg'},{name:'157b_2.jpg'},{name:'162b_2.jpg'},{name:'163b_2.jpg'},{name:'166b_2.jpg'},{name:'167b_2.jpg'},{name:'169b_2.jpg'},{name:'171b_2.jpg'},{name:'172b_2.jpg'},{name:'173b_2.jpg'},{name:'174b_2.jpg'},{name:'177b_2.jpg'},{name:'178b_2.jpg'},{name:'182b_2.jpg'},{name:'186b_2.jpg'},{name:'188b_2.jpg'},{name:'189b_2.jpg'},{name:'191b_2.jpg'},{name:'192b_2.jpg'},{name:'198b_2.jpg'},{name:'199b_2.jpg'},{name:'200b_2.jpg'}];
                                    var PR_Set_1 = [{name:'PR_Set_1_foil_077a.jpg'},{name:'PR_Set_1_foil_140b.jpg'},{name:'PR_Set_1_low_134a.jpg'},{name:'PR_Set_1_low_134b.jpg'},{name:'PR_Set_1_low_135a.jpg'},{name:'PR_Set_1_low_135b.jpg'},{name:'PR_Set_1_target_076a.jpg'},{name:'PR_Set_1_target_076b.jpg'}];
                                    var PR_Set_2 = [{name:'PR_Set_2_foil_104b.jpg'},{name:'PR_Set_2_foil_105a.jpg'},{name:'PR_Set_2_low_043a.jpg'},{name:'PR_Set_2_low_043b.jpg'},{name:'PR_Set_2_low_179a.jpg'},{name:'PR_Set_2_low_179b.jpg'},{name:'PR_Set_2_target_095a.jpg'},{name:'PR_Set_2_target_095b.jpg'}];
                                    var PR_Set_3 = [{name:'PR_Set_3_foil_137a.jpg'},{name:'PR_Set_3_foil_153b.jpg'},{name:'PR_Set_3_low_110a.jpg'},{name:'PR_Set_3_low_110b.jpg'},{name:'PR_Set_3_low_121a.jpg'},{name:'PR_Set_3_low_121b.jpg'},{name:'PR_Set_3_target_183a.jpg'},{name:'PR_Set_3_target_183b.jpg'}];
                                     */

                                    var imgs = [{ name: "/mdts_1/001.jpg" }, { name: "/mdts_1/002.jpg" }, { name: "/mdts_1/003.jpg" }, { name: "/mdts_1/004.jpg" }, { name: "/mdts_1/005.jpg" }, { name: "/mdts_1/006.jpg" }, { name: "/mdts_1/007.jpg" }, { name: "/mdts_1/008.jpg" }, { name: "/mdts_1/009.jpg" }, { name: "/mdts_1/010.jpg" }, { name: "/mdts_1/011.jpg" }, { name: "/mdts_1/012.jpg" }, { name: "/mdts_1/013.jpg" }, { name: "/mdts_1/014.jpg" }, { name: "/mdts_1/015.jpg" }, { name: "/mdts_1/016.jpg" }, { name: "/mdts_1/017.jpg" }, { name: "/mdts_1/018.jpg" }, { name: "/mdts_1/019.jpg" }, { name: "/mdts_1/020.jpg" }, { name: "/mdts_1/021.jpg" }, { name: "/mdts_1/022.jpg" }, { name: "/mdts_1/023.jpg" }, { name: "/mdts_1/024.jpg" }, { name: "/mdts_1/025.jpg" }, { name: "/mdts_1/026.jpg" }, { name: "/mdts_1/027.jpg" }, { name: "/mdts_1/028.jpg" }, { name: "/mdts_1/029.jpg" }, { name: "/mdts_1/030.jpg" }, { name: "/mdts_1/031.jpg" }, { name: "/mdts_1/032.jpg" }, { name: "/mdts_1/033.jpg" }, { name: "/mdts_1/034.jpg" }, { name: "/mdts_1/035.jpg" }, { name: "/mdts_1/036.jpg" }, { name: "/mdts_1/037.jpg" }, { name: "/mdts_1/038.jpg" }, { name: "/mdts_1/039.jpg" }, { name: "/mdts_1/040.jpg" }, { name: "/mdts_1/041.jpg" }, { name: "/mdts_1/042.jpg" }, { name: "/mdts_1/043.jpg" }, { name: "/mdts_1/044.jpg" }, { name: "/mdts_1/045.jpg" }, { name: "/mdts_1/046.jpg" }, { name: "/mdts_1/047.jpg" }, { name: "/mdts_1/048.jpg" }, { name: "/mdts_1/049.jpg" }, { name: "/mdts_1/050.jpg" }, { name: "/mdts_1/051.jpg" }, { name: "/mdts_1/052.jpg" }, { name: "/mdts_1/053.jpg" }, { name: "/mdts_1/054.jpg" }, { name: "/mdts_1/055.jpg" }, { name: "/mdts_1/056.jpg" }, { name: "/mdts_1/057.jpg" }, { name: "/mdts_1/058.jpg" }, { name: "/mdts_1/059.jpg" }, { name: "/mdts_1/060.jpg" },
                                    { name: "/mdts_1/061.jpg" }, { name: "/mdts_1/062.jpg" }, { name: "/mdts_1/063.jpg" }, { name: "/mdts_1/064.jpg" }, { name: "/mdts_1/065.jpg" }, { name: "/mdts_1/066.jpg" }, { name: "/mdts_1/067.jpg" }, { name: "/mdts_1/068.jpg" }, { name: "/mdts_1/069.jpg" }, { name: "/mdts_1/070.jpg" }, { name: "/mdts_1/071.jpg" }, { name: "/mdts_1/072.jpg" }, { name: "/mdts_1/073.jpg" }, { name: "/mdts_1/074.jpg" }, { name: "/mdts_1/075.jpg" }, { name: "/mdts_1/076.jpg" }, { name: "/mdts_1/077.jpg" }, { name: "/mdts_1/078.jpg" }, { name: "/mdts_1/079.jpg" }, { name: "/mdts_1/080.jpg" }, { name: "/mdts_1/081.jpg" }, { name: "/mdts_1/082.jpg" }, { name: "/mdts_1/083.jpg" }, { name: "/mdts_1/084.jpg" }, { name: "/mdts_1/085.jpg" }, { name: "/mdts_1/086.jpg" }, { name: "/mdts_1/087.jpg" }, { name: "/mdts_1/088.jpg" }, { name: "/mdts_1/089.jpg" }, { name: "/mdts_1/090.jpg" }, { name: "/mdts_1/091.jpg" }, { name: "/mdts_1/092.jpg" }, { name: "/mdts_1/093.jpg" }, { name: "/mdts_1/094.jpg" }, { name: "/mdts_1/095.jpg" }, { name: "/mdts_1/096.jpg" }, { name: "/mdts_1/097.jpg" }, { name: "/mdts_1/098.jpg" }, { name: "/mdts_1/099.jpg" }, { name: "/mdts_1/100.jpg" },
                                    { name: "/mdts_1/101.jpg" }, { name: "/mdts_1/102.jpg" }, { name: "/mdts_1/103.jpg" }, { name: "/mdts_1/104.jpg" }, { name: "/mdts_1/105.jpg" }, { name: "/mdts_1/106.jpg" }, { name: "/mdts_1/107.jpg" }, { name: "/mdts_1/108.jpg" }, { name: "/mdts_1/109.jpg" }, { name: "/mdts_1/110.jpg" }, { name: "/mdts_1/111.jpg" }, { name: "/mdts_1/112.jpg" }, { name: "/mdts_1/113.jpg" }, { name: "/mdts_1/114.jpg" }, { name: "/mdts_1/115.jpg" }, { name: "/mdts_1/116.jpg" }, { name: "/mdts_1/117.jpg" }, { name: "/mdts_1/118.jpg" }, { name: "/mdts_1/119.jpg" }, { name: "/mdts_1/120.jpg" }, { name: "/mdts_1/121.jpg" }, { name: "/mdts_1/122.jpg" }, { name: "/mdts_1/123.jpg" }, { name: "/mdts_1/124.jpg" }, { name: "/mdts_1/125.jpg" }, { name: "/mdts_1/126.jpg" }, { name: "/mdts_1/127.jpg" }, { name: "/mdts_1/128.jpg" }, { name: "/mdts_1/129.jpg" }, { name: "/mdts_1/130.jpg" }, { name: "/mdts_1/131.jpg" }, { name: "/mdts_1/132.jpg" }, { name: "/mdts_1/133.jpg" }, { name: "/mdts_1/134.jpg" }, { name: "/mdts_1/135.jpg" }, { name: "/mdts_1/136.jpg" }, { name: "/mdts_1/137.jpg" },
                                    { name: "/mdts_1/138.jpg" }, { name: "/mdts_1/139.jpg" }, { name: "/mdts_1/140.jpg" }, { name: "/mdts_1/141.jpg" }, { name: "/mdts_1/142.jpg" }, { name: "/mdts_1/143.jpg" }, { name: "/mdts_1/144.jpg" }, { name: "/mdts_1/145.jpg" }, { name: "/mdts_1/146.jpg" }, { name: "/mdts_1/147.jpg" }, { name: "/mdts_1/148.jpg" }, { name: "/mdts_1/149.jpg" }, { name: "/mdts_1/150.jpg" }, { name: "/mdts_1/151.jpg" }, { name: "/mdts_1/152.jpg" }, { name: "/mdts_1/153.jpg" }, { name: "/mdts_1/154.jpg" }, { name: "/mdts_1/155.jpg" }, { name: "/mdts_1/156.jpg" }, { name: "/mdts_1/157.jpg" }, { name: "/mdts_1/158.jpg" }, { name: "/mdts_1/159.jpg" }, { name: "/mdts_1/160.jpg" }, { name: "/mdts_2/161.jpg" }, { name: "/mdts_2/162.jpg" }, { name: "/mdts_2/163.jpg" }, { name: "/mdts_2/164.jpg" }, { name: "/mdts_2/165.jpg" }, { name: "/mdts_2/166.jpg" }, { name: "/mdts_2/167.jpg" }, { name: "/mdts_2/168.jpg" }, { name: "/mdts_2/169.jpg" }, { name: "/mdts_2/170.jpg" }, { name: "/mdts_2/171.jpg" }, { name: "/mdts_2/172.jpg" }, { name: "/mdts_2/173.jpg" }, { name: "/mdts_2/174.jpg" },
                                    { name: "/mdts_2/175.jpg" }, { name: "/mdts_2/176.jpg" }, { name: "/mdts_2/177.jpg" }, { name: "/mdts_2/178.jpg" }, { name: "/mdts_2/179.jpg" }, { name: "/mdts_2/180.jpg" }, { name: "/mdts_2/181.jpg" }, { name: "/mdts_2/182.jpg" }, { name: "/mdts_2/183.jpg" }, { name: "/mdts_2/184.jpg" }, { name: "/mdts_2/185.jpg" }, { name: "/mdts_2/186.jpg" }, { name: "/mdts_2/187.jpg" }, { name: "/mdts_2/188.jpg" }, { name: "/mdts_2/189.jpg" }, { name: "/mdts_2/190.jpg" }, { name: "/mdts_2/191.jpg" }, { name: "/mdts_2/192.jpg" }, { name: "/mdts_2/193.jpg" }, { name: "/mdts_2/194.jpg" }, { name: "/mdts_2/195.jpg" }, { name: "/mdts_2/196.jpg" }, { name: "/mdts_2/197.jpg" }, { name: "/mdts_2/198.jpg" }, { name: "/mdts_2/199.jpg" }, { name: "/mdts_2/200.jpg" },
                                    { name: "/mdts_2/201.jpg" }, { name: "/mdts_2/202.jpg" }, { name: "/mdts_2/203.jpg" }, { name: "/mdts_2/204.jpg" }, { name: "/mdts_2/205.jpg" }, { name: "/mdts_2/206.jpg" }, { name: "/mdts_2/207.jpg" }, { name: "/mdts_2/208.jpg" }, { name: "/mdts_2/209.jpg" }, { name: "/mdts_2/210.jpg" }, { name: "/mdts_2/211.jpg" }, { name: "/mdts_2/212.jpg" }, { name: "/mdts_2/213.jpg" }, { name: "/mdts_2/214.jpg" }, { name: "/mdts_2/215.jpg" }, { name: "/mdts_2/216.jpg" }, { name: "/mdts_2/217.jpg" }, { name: "/mdts_2/218.jpg" }, { name: "/mdts_2/219.jpg" }, { name: "/mdts_2/220.jpg" }, { name: "/mdts_2/221.jpg" }, { name: "/mdts_2/222.jpg" }, { name: "/mdts_2/223.jpg" }, { name: "/mdts_2/224.jpg" }, { name: "/mdts_2/225.jpg" }, { name: "/mdts_2/226.jpg" },
                                    { name: "/mdts_2/227.jpg" }, { name: "/mdts_2/228.jpg" }, { name: "/mdts_2/229.jpg" }, { name: "/mdts_2/230.jpg" }, { name: "/mdts_2/231.jpg" }, { name: "/mdts_2/232.jpg" }, { name: "/mdts_2/233.jpg" }, { name: "/mdts_2/234.jpg" }, { name: "/mdts_2/235.jpg" }, { name: "/mdts_2/236.jpg" }, { name: "/mdts_2/237.jpg" }, { name: "/mdts_2/238.jpg" }, { name: "/mdts_2/239.jpg" }, { name: "/mdts_2/240.jpg" }, { name: "/mdts_2/241.jpg" }, { name: "/mdts_2/242.jpg" }, { name: "/mdts_2/243.jpg" }, { name: "/mdts_2/244.jpg" }, { name: "/mdts_2/245.jpg" }, { name: "/mdts_2/246.jpg" }, { name: "/mdts_2/247.jpg" }, { name: "/mdts_2/248.jpg" }, { name: "/mdts_2/249.jpg" }, { name: "/mdts_2/250.jpg" }, { name: "/mdts_2/251.jpg" }, { name: "/mdts_2/252.jpg" },
                                    { name: "/mdts_2/253.jpg" }, { name: "/mdts_2/254.jpg" }, { name: "/mdts_2/255.jpg" }, { name: "/mdts_2/256.jpg" }, { name: "/mdts_2/257.jpg" }, { name: "/mdts_2/258.jpg" }, { name: "/mdts_2/259.jpg" }, { name: "/mdts_2/260.jpg" }, { name: "/mdts_2/261.jpg" }, { name: "/mdts_2/262.jpg" }, { name: "/mdts_2/263.jpg" }, { name: "/mdts_2/264.jpg" }, { name: "/mdts_2/265.jpg" }, { name: "/mdts_2/266.jpg" }, { name: "/mdts_2/267.jpg" }, { name: "/mdts_2/268.jpg" }, { name: "/mdts_2/269.jpg" }, { name: "/mdts_2/270.jpg" }, { name: "/mdts_2/271.jpg" }, { name: "/mdts_2/272.jpg" }, { name: "/mdts_2/273.jpg" }, { name: "/mdts_2/274.jpg" }, { name: "/mdts_2/275.jpg" }, { name: "/mdts_2/276.jpg" }, { name: "/mdts_2/277.jpg" }, { name: "/mdts_2/278.jpg" }, { name: "/mdts_2/279.jpg" }, { name: "/mdts_2/280.jpg" }, { name: "/mdts_2/281.jpg" }, { name: "/mdts_2/282.jpg" }, { name: "/mdts_2/283.jpg" }, { name: "/mdts_2/284.jpg" }, { name: "/mdts_2/285.jpg" }, { name: "/mdts_2/286.jpg" }, { name: "/mdts_2/287.jpg" }, { name: "/mdts_2/288.jpg" }, { name: "/mdts_2/289.jpg" }, { name: "/mdts_2/290.jpg" }, { name: "/mdts_2/291.jpg" }, { name: "/mdts_2/292.jpg" }, { name: "/mdts_2/293.jpg" }, { name: "/mdts_2/294.jpg" }, { name: "/mdts_2/295.jpg" }, { name: "/mdts_2/296.jpg" }, { name: "/mdts_2/297.jpg" }, { name: "/mdts_2/298.jpg" }, { name: "/mdts_2/299.jpg" }, { name: "/mdts_2/300.jpg" }, { name: "/mdts_2/301.jpg" }, { name: "/mdts_2/302.jpg" }, { name: "/mdts_2/303.jpg" }, { name: "/mdts_2/304.jpg" }, { name: "/mdts_2/305.jpg" }, { name: "/mdts_2/306.jpg" }, { name: "/mdts_2/307.jpg" }, { name: "/mdts_2/308.jpg" }, { name: "/mdts_2/309.jpg" }, { name: "/mdts_2/310.jpg" }, { name: "/mdts_2/311.jpg" }, { name: "/mdts_2/312.jpg" }, { name: "/mdts_2/313.jpg" }, { name: "/mdts_2/314.jpg" }, { name: "/mdts_2/315.jpg" }, { name: "/mdts_2/316.jpg" }, { name: "/mdts_2/317.jpg" }, { name: "/mdts_2/318.jpg" }, { name: "/mdts_2/319.jpg" }, { name: "/mdts_2/320.jpg" }, { name: "/mdts_2/321.jpg" }, { name: "/mdts_2/322.jpg" }, { name: "/mdts_2/323.jpg" }, { name: "/mdts_2/324.jpg" }, { name: "/mdts_2/325.jpg" }, { name: "/mdts_2/326.jpg" }, { name: "/mdts_2/327.jpg" }, { name: "/mdts_2/328.jpg" }, { name: "/mdts_2/329.jpg" }, { name: "/mdts_2/330.jpg" }, { name: "/mdts_2/331.jpg" }, { name: "/mdts_2/332.jpg" }, { name: "/mdts_2/333.jpg" }, { name: "/mdts_2/334.jpg" }, { name: "/mdts_2/335.jpg" }, { name: "/mdts_2/336.jpg" }, { name: "/mdts_2/337.jpg" }, { name: "/mdts_2/338.jpg" }];


                                    var prImages = [{ name: 'PR_033a.jpg' }, { name: 'PR_045b.jpg' }, { name: 'PR_054a.jpg' }, { name: 'PR_059a.jpg' }, { name: 'PR_066a.jpg' }, { name: 'PR_067b.jpg' }, { name: 'PR_073a.jpg' }, { name: 'PR_077a.jpg' }, { name: 'PR_086a.jpg' }, { name: 'PR_101b.jpg' }, { name: 'PR_128b.jpg' }, { name: 'PR_149a.jpg' }];
                                    var imageMovementPercent = [{ studyX: '0', studyY: '0', testX: '80', testY: '80', isPositionChanged: 'j', trialType: 'crnr' },
                                    { studyX: '20', studyY: '20', testX: '20', testY: '40', isPositionChanged: 'j', trialType: 'small' },
                                    { studyX: '60', studyY: '40', testX: '60', testY: '80', isPositionChanged: 'j', trialType: 'large' },
                                    { studyX: '40', studyY: '40', testX: '40', testY: '40', isPositionChanged: 'f', trialType: 'same' },
                                    { studyX: '0', studyY: '80', testX: '80', testY: '0', isPositionChanged: 'j', trialType: 'crnr' },
                                    { studyX: '20', studyY: '80', testX: '20', testY: '60', isPositionChanged: 'j', trialType: 'small' },
                                    { studyX: '40', studyY: '20', testX: '40', testY: '60', isPositionChanged: 'j', trialType: 'large' },
                                    { studyX: '60', studyY: '0', testX: '60', testY: '0', isPositionChanged: 'f', trialType: 'same' },
                                    { studyX: '60', studyY: '20', testX: '60', testY: '40', isPositionChanged: 'j', trialType: 'small' },
                                    { studyX: '80', studyY: '70', testX: '80', testY: '20', isPositionChanged: 'j', trialType: 'large' },
                                    { studyX: '80', studyY: '80', testX: '0', testY: '0', isPositionChanged: 'j', trialType: 'crnr' },
                                    { studyX: '70', studyY: '70', testX: '70', testY: '70', isPositionChanged: 'f', trialType: 'same' }];

                                    var configdata = [

                                        ins_configdata[0],
                                        ins_configdata[1],
                                        ins_configdata[2]

                                    ];

                                    // Spiral game functions


                                    function preparePRStudy(array, toArray, startIndex, count, position) {
                                        let trial = 'prstudy';
                                        let rnd = 0;
                                        if (startIndex == 0) {
                                            // //console.log('testCount : ', testCount);
                                            trial = 'prstudy_1';
                                            rnd = 0;
                                        } else if (startIndex == 4) {
                                            //  //console.log('testCount : ', testCount);
                                            trial = 'prstudy_2';
                                            rnd = 2;
                                        } else if (startIndex == 8) {
                                            // //console.log('testCount : ', testCount);
                                            trial = 'prstudy_3';
                                            rnd = 4;
                                        }
                                        let max = startIndex + count;
                                        for (var i = startIndex; i < max; i++) {
                                            preloadImageArray.push(image_path_PR + array[i].name);
                                            toArray.push({
                                                screen: "2", startDuration: 1, endDuration: screenWaitTime, content: '<p id="resulttxt" class="centers"></p>' +
                                                    '<div class="objque">' +
                                                    '<div class="imageDiv">' +
                                                    '<div class="objbox" id="imagedata" style="top:' + position[i].studyX + '%; left:' + position[i].studyY + '%;  background-image:url(' + image_path_PR + array[i].name + ');"></div></div>' +
                                                    '<div class="btninputbox"><ul class="btninputbx two-button-set">' +
                                                    '<li>' + $A.get("$Label.c.mst_text_Indoor") + '<div class="btninput img-f tabButtons" data-input="f" data-key="70">F</div></li>' +
                                                    '<li>' + $A.get("$Label.c.mst_text_Outdoor") + '<div class="btninput img-j tabButtons" data-input="j" data-key="74">J</div></li>' +
                                                    '</ul></div>' +
                                                    '</div>',
                                                command: [70, 74], result: true, answer: 'f', question: 1, isPractice: true, white: true, trialType: position[i].trialType, isTest: false,
                                                name: array[i].name, studyPositionX: position[i].studyX, studyPositionY: position[i].studyY, trial: trial, round: rnd,
                                                testPositionX: position[i].testX, testPositionY: position[i].testY, isPositionChanged: imageMovementPercent[i].isPositionChanged
                                            });
                                        }
                                    }

                                    function preparePRTest(array, toArray, testCount) {
                                        let trial = 'pr';
                                        let rnd = 1;
                                        if (testCount == 0) {
                                            // //console.log('testCount : ', testCount);
                                            trial = 'prtest_1';
                                            rnd = 1;
                                        } else if (testCount == 4) {
                                            //  //console.log('testCount : ', testCount);
                                            trial = 'prtest_2';
                                            rnd = 3;
                                        } else if (testCount == 8) {
                                            // //console.log('testCount : ', testCount);
                                            trial = 'prtest_3';
                                            rnd = 5;
                                        }

                                        for (var i = 0; i < array.length; i++) {
                                            toArray.push({
                                                screen: "2", startDuration: 1, endDuration: screenWaitTime, content: '<p id="resulttxt" class="centers"></p>' +
                                                    '<div class="objque">' +
                                                    '<div class="imageDiv">' +
                                                    '<div class="objbox" id="imagedata" style="top:' + array[i].testPositionX + '%; left:' + array[i].testPositionY + '%;  background-image:url(' + image_path_PR + array[i].name + ');"></div></div>' +
                                                    '<div class="btninputbox"><ul class="btninputbx two-button-set">' +
                                                    '<li>' + $A.get("$Label.c.mst_text_space_same") + '<div class="btninput img-f tabButtons" data-input="f" data-key="70">F</div></li>' +
                                                    '<li>' + $A.get("$Label.c.mst_text_space_New") + '<div class="btninput img-j tabButtons" data-input="j" data-key="74">J</div></li>' +
                                                    '</ul></div>' +
                                                    '</div>',
                                                command: [70, 74], result: true, answer: array[i].isPositionChanged, question: 1, isPractice: true, white: true, trialType: array[i].trialType, isTest: true,
                                                name: array[i].name, studyPositionX: array[i].studyPositionX, studyPositionY: array[i].studyPositionY, trial: trial, round: rnd,
                                                testPositionX: array[i].testPositionX, testPositionY: array[i].testPositionY, isPositionChanged: array[i].isPositionChanged
                                            });
                                        }

                                    }

                                    function prepareMainStudy(array, toArray) {

                                        for (var i = 0; i < 48; i++) {
                                            preloadImageArray.push(imagePath + array[i].name);

                                            toArray.push({
                                                screen: "2", startDuration: 1, endDuration: screenWaitTime, content: '<p id="resulttxt" class="centers"></p>' +
                                                    '<div class="objque">' +
                                                    '<div class="imageDiv">' +
                                                    '<div class="objbox" id="imagedata" style="top:' + finalImageMovementPercent[i].studyX + '%; left:' + finalImageMovementPercent[i].studyY + '%;   background-image:url(' + imagePath + array[i].name + ');"></div></div>' +
                                                    '<div class="btninputbox"><ul class="btninputbx two-button-set">' +
                                                    '<li>' + $A.get("$Label.c.mst_text_Indoor") + '<div class="btninput img-f tabButtons" data-input="f" data-key="70">F</div></li>' +
                                                    '<li>' + $A.get("$Label.c.mst_text_Outdoor") + '<div class="btninput img-j tabButtons" data-input="j" data-key="74">J</div></li>' +
                                                    '</ul></div>' +
                                                    '</div>',
                                                command: [70, 74], result: true, answer: 'f', question: 1, isPractice: true, white: true, trialType: finalImageMovementPercent[i].trialType, isTest: false,
                                                name: array[i].name, studyPositionX: finalImageMovementPercent[i].studyX, studyPositionY: finalImageMovementPercent[i].studyY, trial: 'study_main', round: 6,
                                                testPositionX: finalImageMovementPercent[i].testX, testPositionY: finalImageMovementPercent[i].testY, isPositionChanged: finalImageMovementPercent[i].isPositionChanged
                                            });
                                        }
                                    }

                                    function prepateMainTest(array, toArray) {
                                        for (var i = 0; i < array.length; i++) {
                                            toArray.push({
                                                screen: "2", startDuration: 1, endDuration: screenWaitTime, content: '<p id="resulttxt" class="centers"></p>' +
                                                    '<div class="objque">' +
                                                    '<div class="imageDiv">' +
                                                    '<div class="objbox" id="imagedata" style="top:' + array[i].testPositionX + '%; left:' + array[i].testPositionY + '%;  background-image:url(' + imagePath + array[i].name + ');"></div></div>' +
                                                    '<div class="btninputbox"><ul class="btninputbx two-button-set">' +
                                                    '<li>' + $A.get("$Label.c.mst_text_space_same") + '<div class="btninput img-f tabButtons" data-input="f" data-key="70">F</div></li>' +
                                                    '<li>' + $A.get("$Label.c.mst_text_space_New") + '<div class="btninput img-j tabButtons" data-input="j" data-key="74">J</div></li>' +
                                                    '</ul></div>' +
                                                    '</div>',
                                                command: [70, 74], result: true, answer: array[i].isPositionChanged, question: 1, isPractice: false, white: true, trialType: array[i].trialType, isTest: true,
                                                name: array[i].name, studyPositionX: array[i].studyPositionX, studyPositionY: array[i].studyPositionY, trial: 'test_main', round: 7,
                                                testPositionX: array[i].testPositionX, testPositionY: array[i].testPositionY, isPositionChanged: array[i].isPositionChanged
                                            });

                                        }
                                    }

                                    function prepareImageMovementPercent(array, toArray) {
                                        ////console.log('in prepareImageMovementPercent');
                                        for (var i = 0; i < 4; i++) {
                                            for (var j = 0; j < array.length; j++) {
                                                toArray.push(array[j]);
                                            }
                                        }
                                        ////console.log('toArray : ', toArray);
                                    }

                                    //--------------------------------------------------------------------------------------------------------

                                    //Preparing the practice images.

                                    function preparePracticeTestImages(array, destination, imagePath) {
                                        for (var i = 0; i < array.length; i++) {
                                            if ((array[i].name.includes("_foil_") && array[i].name.includes("a.jpg")) ||
                                                (!array[i].name.includes("_foil_") && array[i].name.includes("b.jpg"))) {
                                                preloadImageArray.push(imagePath + array[i].name);
                                                destination.push({
                                                    screen: "2", startDuration: 1, endDuration: screenWaitTime, content: '<p id="resulttxt" class="centers"></p>' +
                                                        '<div class="objque">' +
                                                        '<div class="objbox" id="imagedata" style="background-image:url(' + imagePath + array[i].name + ');"></div>' +
                                                        '<div class="btninputbox"><ul class="btninputbx two-button-set">' +
                                                        '<li>' + $A.get("$Label.c.mst_text_space_same") + '<div class="btninput img-f tabButtons" data-input="f" data-key="70">F</div></li>' +
                                                        '<li>' + $A.get("$Label.c.mst_text_space_New") + '<div class="btninput img-j tabButtons" data-input="j" data-key="74">J</div></li>' +
                                                        '</ul></div>' +
                                                        '</div>',
                                                    command: [70, 74], result: true, answer: 'f', question: 1, isPractice: false, white: true,
                                                    name: array[i].name
                                                });
                                            }

                                        }


                                    }

                                    function preparePracticeStudyImages(array, destination, imagePath) {

                                        for (var i = 0; i < array.length; i++) {
                                            if (!array[i].name.includes("_foil_")
                                                && array[i].name.includes("a.jpg")) {
                                                preloadImageArray.push(imagePath + array[i].name);
                                                destination.push({
                                                    screen: "2", startDuration: 1, endDuration: screenWaitTime, content: '<p id="resulttxt" class="centers"></p>' +
                                                        '<div class="objque">' +
                                                        '<div class="objbox" id="imagedata" style="background-image:url(' + imagePath + array[i].name + ');"></div>' +
                                                        '<div class="btninputbox"><ul class="btninputbx two-button-set">' +
                                                        '<li>' + $A.get("$Label.c.mst_text_Indoor") + '<div class="btninput img-f tabButtons" data-input="f" data-key="70">F</div></li>' +
                                                        '<li>' + $A.get("$Label.c.mst_text_Outdoor") + '<div class="btninput img-j tabButtons" data-input="j" data-key="74">J</div></li>' +
                                                        '</ul></div>' +
                                                        '</div>',
                                                    command: [70, 74], result: true, answer: 'f', question: 1, isPractice: true, white: true,
                                                    name: array[i].name
                                                });
                                            }
                                        }
                                    }

                                    //Preparing content screen.
                                    function prepareContentScreen(destinationArray, instrScrTyp, fianlTestCount) {
                                        let screenNo = destinationArray.length.toString();
                                        //let perCount = '40%';
                                        if (instrScrTyp == 'prTestInst') {
                                            destinationArray.push({

                                                screen: screenNo, startDuration: -1, endDuration: 0, isTouch: true, content: 'sss 4<div class="title">  <span> PRACTICE TEST</span> </div> <div class="title">  <span>' + $A.get("$Label.c.mst_space_text_practice") + ' </span> </div>' +
                                                    '<div class="title">' + $A.get("$Label.c.mst_text_9_c") + '</div>' +
                                                    '<div class="title">' + $A.get("$Label.c.mst_text_sapce_ready") + '</div>' +
                                                    '<p class="centers s-b-instraction">' + $A.get("$Label.c.games_spacebar_text_2") + '</p>', instructionsLeft: true, command: [32, 32]

                                            });

                                        } else if (instrScrTyp == 'finalStudy') {
                                            destinationArray.push(
                                                ins_configdata[9]

                                            );
                                            if (finalStudyScrCnt == 0) {
                                                finalStudyScrCnt = destinationArray.length - 1;
                                            }
                                            ////console.log('finalStudyScrCnt : ', finalStudyScrCnt);
                                        } else if (instrScrTyp == 'finalTest') {
                                            destinationArray.push(
                                                ins_configdata[10]
                                            );


                                        } else if (instrScrTyp == 'finalTest1') {
                                            destinationArray.push(
                                                ins_configdata[11]
                                            );

                                        } else if (instrScrTyp == 'percentScreen') {
                                            destinationArray.push(
                                                ins_configdata[6]
                                            );
                                            prTestResultscreen = destinationArray.length;
                                            ////console.log('prTestResultscreen : ', prTestResultscreen);
                                        } else if (instrScrTyp == 'endScreen') {
                                            destinationArray.push(
                                                ins_configdata[12]
                                            );

                                        } else if (instrScrTyp == 'prStudyScreen') {
                                            prctCount = fianlTestCount;
                                            let customLabelformst = "";
                                            if (prctCount == 1) {
                                                // customLabelformst = $A.get("$Label.c.mst_space_text_practice");
                                                destinationArray.push(
                                                    ins_configdata[3]
                                                )
                                            }
                                            else if (prctCount == 2) {
                                                // customLabelformst = $A.get("$Label.c.mst_text_8a");
                                                destinationArray.push(
                                                    ins_configdata[7]
                                                )
                                            }
                                            else if (prctCount == 3) {
                                                //customLabelformst = $A.get("$Label.c.mst_space_last_time");
                                                destinationArray.push(
                                                    ins_configdata[8]
                                                )
                                            }

                                        } else if (instrScrTyp == 'prTestScreen') {
                                            destinationArray.push(
                                                ins_configdata[4]
                                            );

                                        } else if (instrScrTyp == 'prTestScreen1') {
                                            destinationArray.push(
                                                ins_configdata[5]

                                            );

                                        }


                                    }


                                    //Adding elements to Study and Test arrays
                                    function addingItems(array, count, startIndex, imagePatdiv, imagePath2, isStudy) {

                                        let max = startIndex + count;
                                        var temp = {
                                            screen: "2", startDuration: 1, endDuration: screenWaitTime, content: '',
                                            command: [70, 74], result: true, answer: 'f', question: 1, isPractice: true, white: true,
                                            name: ''
                                        };

                                        //const elmnt = temp;

                                        if (isStudy) {
                                            for (var i = startIndex; i < max; i++) {


                                                temp = array[i].name;
                                                // //console.log('test 123', temp);
                                                ////console.log('test 123', elmnt.name);
                                                //configdata.push(elmnt);
                                                preloadImageArray.push(imagePatdiv + temp);
                                                studyData.push({
                                                    screen: "2", startDuration: 1, endDuration: screenWaitTime, content: '<p id="resulttxt" class="centers"></p>' +
                                                        '<div class="objque">' +
                                                        '<div class="objbox" id="imagedata" style="background-image:url(' + imagePatdiv + temp + ');"></div>' +
                                                        '<div class="btninputbox"><ul class="btninputbx two-button-set">' +
                                                        '<li>' + $A.get("$Label.c.mst_text_Indoor") + '<div class="btninput img-f tabButtons" data-input="f" data-key="70">F</div></li>' +
                                                        '<li>' + $A.get("$Label.c.mst_text_Outdoor") + '<div class="btninput img-j tabButtons" data-input="j" data-key="74">J</div></li>' +
                                                        '</ul></div>' +
                                                        '</div>',
                                                    command: [70, 74], result: true, answer: 'j', question: 1, isPractice: true, white: true,
                                                    name: array[i].name
                                                });

                                                let bDElmntName = array[i].name.replace("a_", "b_");
                                                preloadImageArray.push(imagePath2 + bDElmntName);
                                                testData.push({
                                                    screen: "2", startDuration: 1, endDuration: screenWaitTime, content: '<p id="resulttxt" class="centers"></p>' +
                                                        '<div class="objque">' +
                                                        '<div class="objbox" id="imagedata" style="background-image:url(' + imagePath2 + bDElmntName + ');"></div>' +
                                                        '<div class="btninputbox"><ul class="btninputbx two-button-set">' +
                                                        '<li>' + $A.get("$Label.c.mst_text_Old") + '<div class="btninput img-f tabButtons" data-input="f" data-key="70">F</div></li>' +
                                                        '<li>' + $A.get("$Label.c.mst_text_space_New") + '<div class="btninput img-j tabButtons" data-input="j" data-key="74">J</div></li>' +
                                                        '</ul></div>' +
                                                        '</div>',
                                                    command: [70, 74], result: true, answer: 'f', question: 1, isPractice: false, white: true,
                                                    name: array[i].name.replace("a_", "b_")
                                                });

                                                //testData.push(elmnt);


                                            }

                                        } else {
                                            for (var i = startIndex; i < max; i++) {

                                                let tempName = array[i].name.replace("a_", "b_");
                                                preloadImageArray.push(imagePatdiv + tempName);
                                                testData.push({
                                                    screen: "2", startDuration: 1, endDuration: screenWaitTime, content: '<p id="resulttxt" class="centers"></p>' +
                                                        '<div class="objque">' +
                                                        '<div class="objbox" id="imagedata" style="background-image:url(' + imagePatdiv + tempName + ');"></div>' +
                                                        '<div class="btninputbox"><ul class="btninputbx two-button-set">' +
                                                        '<li>' + $A.get("$Label.c.mst_text_Old") + '<div class="btninput img-f tabButtons" data-input="f" data-key="70">F</div></li>' +
                                                        '<li>' + $A.get("$Label.c.mst_text_space_New") + '<div class="btninput img-j tabButtons" data-input="j" data-key="74">J</div></li>' +
                                                        '</ul></div>' +
                                                        '</div>',
                                                    command: [70, 74], result: true, answer: 'j', question: 1, isPractice: false, white: true,
                                                    name: array[i].name.replace("a_", "b_")
                                                });
                                                //testData.push(elmnt);
                                            }
                                        }

                                    }

                                    function addingItemsToConfigData(arr, toArray, isBlankScreen, isStudy) {
                                        let screenCount = toArray.length;
                                        let blankScreen = {
                                            screen: "blank", startDuration: 0, endDuration: 1000, content: '<p  class="centers"></p>' +
                                                '<div class="objque">' +
                                                '<div class="objbox" ></div>' +
                                                '<div class="btninputbox"><ul class="btninputbx two-button-set">' +
                                                '<li>' + $A.get("$Label.c.mst_text_Indoor") + '<div class="btninput img-f tabButtons" data-input="f" data-key="70">F</div></li>' +
                                                '<li>' + $A.get("$Label.c.mst_text_Outdoor") + '<div class="btninput img-j tabButtons" data-input="j" data-key="74">J</div></li>' +
                                                '</ul></div>' +
                                                '</div>', white: true
                                        };
                                        if (!isStudy) {
                                            blankScreen = {
                                                screen: "blank", startDuration: 0, endDuration: 1000, content: '<p  class="centers"></p>' +
                                                    '<div class="objque">' +
                                                    '<div class="objbox" ></div>' +
                                                    '<div class="btninputbox"><ul class="btninputbx two-button-set">' +
                                                    '<li>' + $A.get("$Label.c.mst_text_space_same") + '<div class="btninput img-f tabButtons" data-input="f" data-key="70">F</div></li>' +
                                                    '<li>' + $A.get("$Label.c.mst_text_space_New") + '<div class="btninput img-j tabButtons" data-input="j" data-key="74">J</div></li>' +
                                                    '</ul></div>' +
                                                    '</div>', white: true
                                            };
                                        }
                                        for (var i = 0; i < arr.length; i++) {
                                            arr[i].screen = screenCount + i;
                                            // arr[i].question = screenCount + i;
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
                                    arrayOfRandomImages(imgs);
                                    arrayOfRandomImages(prImages);


                                    ////console.log('imageMovementPercent :', imageMovementPercent);

                                    ////console.log('prImages : ', prImages);

                                    preparePRStudy(prImages, prStudy1, 0, 4, imageMovementPercent);
                                    ////console.log('prStudy1 : ', prStudy1);
                                    prepareContentScreen(configdata, 'prStudyScreen', 1);

                                    addingItemsToConfigData(prStudy1, configdata, true, true);

                                    prepareContentScreen(configdata, 'prTestScreen', 1);
                                    prepareContentScreen(configdata, 'prTestScreen1', 0);
                                    preparePRTest(prStudy1, prTest1, 0);
                                    arrayOfRandomImages(prTest1);
                                    ////console.log('prTest1 : ', prTest1);

                                    addingItemsToConfigData(prTest1, configdata, true, false);
                                    prepareContentScreen(configdata, 'percentScreen', 0);
                                    var prTestResultscreen1 = prTestResultscreen;

                                    preparePRStudy(prImages, prStudy2, 4, 4, imageMovementPercent);
                                    ////console.log('prStudy2 : ', prStudy2);
                                    prepareContentScreen(configdata, 'prStudyScreen', 2);
                                    addingItemsToConfigData(prStudy2, configdata, true, true);

                                    prepareContentScreen(configdata, 'prTestScreen', 2);
                                    prepareContentScreen(configdata, 'prTestScreen1', 0);
                                    preparePRTest(prStudy2, prTest2, 4);
                                    arrayOfRandomImages(prTest2);
                                    ////console.log('prTest2 : ', prTest2);

                                    addingItemsToConfigData(prTest2, configdata, true, false);
                                    prepareContentScreen(configdata, 'percentScreen', 0);
                                    var prTestResultscreen2 = prTestResultscreen;


                                    preparePRStudy(prImages, prStudy3, 8, 4, imageMovementPercent);
                                    ////console.log('prStudy3 : ', prStudy3);
                                    prepareContentScreen(configdata, 'prStudyScreen', 3);
                                    addingItemsToConfigData(prStudy3, configdata, true, true);

                                    prepareContentScreen(configdata, 'prTestScreen', 3);
                                    prepareContentScreen(configdata, 'prTestScreen1', 0);
                                    preparePRTest(prStudy3, prTest3, 8);
                                    arrayOfRandomImages(prTest3);
                                    ////console.log('prTest3 : ', prTest3);

                                    addingItemsToConfigData(prTest3, configdata, true, false);
                                    prepareContentScreen(configdata, 'percentScreen', 0);
                                    var prTestResultscreen3 = prTestResultscreen;


                                    prepareImageMovementPercent(imageMovementPercent, finalImageMovementPercent);
                                    ////console.log('finalImageMovementPercent : ', finalImageMovementPercent);

                                    prepareMainStudy(imgs, finalStudy);
                                    prepareContentScreen(configdata, 'finalStudy', 0);
                                    addingItemsToConfigData(finalStudy, configdata, true, true);
                                    ////console.log('finalStudy : ', finalStudy);


                                    prepareContentScreen(configdata, 'finalTest', 0);
                                    prepareContentScreen(configdata, 'finalTest1', 0);
                                    //changing the co-ordinates for the test array elements. 
                                    prepateMainTest(finalStudy, finalTest);
                                    arrayOfRandomImages(finalTest);
                                    addingItemsToConfigData(finalTest, configdata, true, false);
                                    //console.log('configdata : ', configdata);
                                    prepareContentScreen(configdata, 'endScreen', 0);


                                    /*arrayOfRandomImages(PR_Set_1);
                                    arrayOfRandomImages(PR_Set_2);
                                    arrayOfRandomImages(PR_Set_3);
                                    
                                    //Random images for study1
                                     preparePracticeStudyImages(PR_Set_1, prstudy1, image_path_PR);
                                     //console.log("prstudy1 : ", prstudy1);
                                     addingItemsToConfigData(prstudy1, configdata);
                                     prepareContentScreen(configdata, 'prTestInst');
                                      //console.log("-------------------");
                                      
                                     //Random images for test1 
                                     preparePracticeTestImages(PR_Set_1, prtest1, image_path_PR);
                                     //console.log("prtest1 : ", prtest1);
                                     addingItemsToConfigData(prtest1, configdata);
                                     prepareContentScreen(configdata, 'percentScreen');
                                     var prTestResultscreen1 = prTestResultscreen;
                                     //console.log("-------------------");
                                     
                                     //Random images for study2
                                     preparePracticeStudyImages(PR_Set_2, prstudy2, image_path_PR);
                                      //console.log("prstudy2 : ", prstudy2);
                                      addingItemsToConfigData(prstudy2, configdata);
                                      prepareContentScreen(configdata, 'prTestInst');
                                      //console.log("-------------------");
                                      
                                     //Random images for test2 
                                     preparePracticeTestImages(PR_Set_2, prtest2, image_path_PR);
                                      //console.log("prtest2 : ", prtest2);
                                      addingItemsToConfigData(prtest2, configdata);
                                      prepareContentScreen(configdata, 'percentScreen');
                                      var prTestResultscreen2 = prTestResultscreen;
                                    
                                     //console.log("-------------------");
                                    
                                     //Random images for study3
                                     preparePracticeStudyImages(PR_Set_3, prstudy3, image_path_PR);
                                      //console.log("prstudy3 : ", prstudy3);
                                      //addingItemsToConfigData(prstudy3, configdata);
                                      prepareContentScreen(configdata, 'prTestInst');
                                      //console.log("-------------------");
                                      
                                     //Random images for test3 
                                     preparePracticeTestImages(PR_Set_3, prtest3, image_path_PR);
                                      //console.log("prtest3 : ", prtest3);
                                      addingItemsToConfigData(prtest3, configdata);
                                      prepareContentScreen(configdata, 'percentScreen');
                                      var prTestResultscreen3 = prTestResultscreen;
                                     //console.log("-------------------");
                                    
                                    
                                    // Making arrays a_1 and a_2 random.     
                                    arrayOfRandomImages(a_2);
                                    arrayOfRandomImages(a_1);
                                    //console.log('a_1 : ', a_1);
                                    //console.log('a_2 : ', a_2);
                                    
                                    //adding Random image data to the configdata array.
                                    ////console.log('a_2 = ', )
                                    //Data for study
                                    addingItems(a_2,40,0, image_path_a2, image_path_b2 , true);
                                    addingItems(a_1,40,0, image_path_a1, image_path_b1, true);
                                    addingItems(a_2,20,40, image_path_a2, image_path_b2, true);
                                    addingItems(a_1,20,40, image_path_a1, image_path_b1, true);
                                    
                                    //Data for test
                                    addingItems(a_1,20,60, image_path_b1, image_path_b1, false);
                                    addingItems(a_2,20,60, image_path_b2, image_path_b2, false);
                                    
                                    //Adding study and test elements to Configdata.
                                    prepareContentScreen(configdataWithoutInst, 'finalStudy');
                                    addingItemsToConfigData(studyData, configdataWithoutInst);
                                    prepareContentScreen(configdataWithoutInst, 'finalTest');
                                    addingItemsToConfigData(testData, configdataWithoutInst);
                                    //console.log('studyData = ', studyData);
                                    //console.log('testData = ', testData);
                                    //Making final images random.
                                    //arrayOfRandomImages(configdataWithoutInst);
                                    
                                    
                                    //Adding the final images to Configdata with instructions.
                                    
                                    addingItemsToConfigData(configdataWithoutInst, configdata);
                                    prepareContentScreen(configdata, 'endScreen');*/
                                    ////console.log('configdata = ', configdata);
                                    let bgimages = [];
                                    let bgimages2 = [];
                                    var imgContainer = document.getElementById('imgContainer');

                                    ////console.log('preloadImageArray = ', preloadImageArray);
                                    function preloadImage(imgdata) {
                                        for (var i = 0; i <= imgdata.length - 1; i++) {
                                            bgimages[i] = new Image();
                                            bgimages[i].src = imgdata[i];
                                            imgContainer.appendChild(bgimages[i]);
                                        }

                                        ////console.log('image load' , bgimages[1].src);
                                    }
                                    function preloadImage2(imgdata) {

                                        for (var i = 0; i <= imgdata.length - 1; i++) {
                                            bgimages2[i] = new Image();
                                            bgimages2[i].src = imgdata[i];
                                            imgContainer.appendChild(bgimages2[i]);
                                            ////console.log('image load' , bgimages2[i].src);
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




                                    console.log('configdata =', configdata);


                                    //This saveData function is used for creating record in ParticipantGameresponse object.

                                    function saveData(gameName, questionNumber, response, isCorrect, reactionTime, isPracticeQuestion, correctAnswer, name, trial, studyPositionX, studyPositionY, testPositionX, testPositionY, trialType, round) {
                                        let studyPosition = {};
                                        studyPosition['studyPositionX'] = studyPositionX;
                                        studyPosition['studyPositionY'] = studyPositionY;
                                        let testPosition = {};
                                        testPosition['testPositionX'] = testPositionX;
                                        testPosition['testPositionY'] = testPositionY;

                                        if (!(response == 'j' || response == 'f' || response == 'J' || response == 'F')) {
                                            response = "No Response";
                                        }
                                        // response = 
                                        //console.log('participantGameInfoId', participantGameInfoId);
                                        //console.log("Input Results", userContactId, gameId, questionNumber,"response :", response, isCorrect, reactionTime, isPracticeQuestion, correctAnswer, participantGameInfoId, name, trial, studyPosition, testPosition, trialType, round);
                                        helper.recorData(component, event, helper, userContactId, gameId, questionNumber, response, isCorrect, reactionTime, isPracticeQuestion, correctAnswer, participantGameInfoId, name, trial, studyPosition, testPosition, trialType, round);
                                        if (isCorrect) {
                                            ////console.log('save data response : ',response );
                                            prSuccessCount = prSuccessCount + 1
                                        }
                                        //    if(configdata[currentScreent].gameComplete == true){

                                        // }
                                        // //console.log('gameComplete = ', gameComplete);
                                        //questionNumber
                                        // if (gameComplete == true) {
                                        //     document.getElementById("nextBtton").classList.remove("slds-hide");
                                        // }
                                        // //console.log("Input Results  name, trial, studyPositionX, studyPositionY, testPositionX, testPositionY, trialType", gameName, questionNumber, response, isCorrect, reactionTime, isPracticeQuestion, new Date(),  name, trial, studyPositionX, studyPositionY, testPositionX, testPositionY, trialType);
                                    }

                                    //This startGame function get the gameid and create a participantGameInfo record and return record ID.
                                    // function updateGameNameInParticipantGameInfo(gameId, participantGameInfoId, ipAddress, browserName, device) {
                                    //     helper.gameNameInParticipantGameInfo(component, event, helper, userContactId, gameId, participantGameInfoId, ipAddress, browserName, device);//helper method calling here
                                    //     ////console.log('gameNameInParticipantGameInfo :',userContactId, gameId, participantGameInfoId, ipAddress, browserName, device);
                                    // }

                                    // This ensgame function works for the update participant gameInfo record like as end date time.
                                    function endGame(gameId, participantGameInfoId) {
                                        var endDateTime = new Date();
                                        var gamePlayStatus = "Completed";
                                        var screenResolution = { "height": screenHeight, "width": screenWidth };
                                        helper.participantGameInfoUpdate(component, event, helper, userContactId, language, gameId, endDateTime, gamePlayStatus, participantGameInfoId, screenResolution);//helper method calling here.
                                    }


                                    //this function works for initialize processing.
                                    function changeScreen() {

                                        console.log('currentScreent : ', currentScreent);

                                        gameId = component.get("v.myAttribute");
                                        userContactId = component.get("v.mycontactId");
                                        ipAddress = component.get("v.ipAddress");
                                        browserName = component.get("v.browser");
                                        participantGameInfoId = component.get("v.participantGameid");//participantGameInfoId holds the participantgameinfo record id.
                                        ////console.log('currentScreent,gameId,userContactId,ipAddress,browserName,participantGameInfoId : ', currentScreent,gameId,userContactId,ipAddress,browserName,participantGameInfoId);

                                        window.removeEventListener('keyup', gamePlay, false);
                                        window.addEventListener('keyup', gamePlay, false);
                                        responseCount = 0;

                                        timedata = new Date();
                                        ////console.log('prSuccessCount : ', prSuccessCount);


                                        // if(prTestResultscreen1==currentScreent || prTestResultscreen2==currentScreent ||
                                        //     prTestResultscreen3==currentScreent    ){
                                        //         prScore = (prSuccessCount/4)*100;
                                        //         //console.log('prScore : ', prScore);
                                        //         if(prScore >= 60 ){
                                        //             currentScreent = finalStudyScrCnt;
                                        //         }
                                        //        // prSuccessCount = 0; 
                                        // }

                                        if (currentScreent == '1' || currentScreent == '12'  || currentScreent == '23' || currentScreent == '32' 
                                            || currentScreent == '43' || currentScreent == '52' || currentScreent == '63' || currentScreent == '162' 
                                            || currentScreent == '259') {
                                            
                                            roundStartTime = timedata;
                                            totalKeyStrokesInRound = 0;
                                        }
                                        
                                        
                                        if (currentScreent == '11' || currentScreent == '21' || currentScreent == '31' || currentScreent == '42' 
                                            || currentScreent == '51' || currentScreent == '61' || currentScreent == '159' || currentScreent == '258') {
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
                                            else if (currentScreent == '42') {
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
                                            else if (currentScreent == '159') {
                                            let totalTimeForRoundSix = roundTotalTime;
                                            helper.participantGameInfoUpdateTotalTimeRoundOne(component, event, helper, userContactId, gameId, participantGameInfoId, totalTimeForRoundSix,totalKeyStrokesInRound,currentScreent);
                                            }
                                            else if (currentScreent == '258') {
                                            let totalTimeForRoundSeven = roundTotalTime;
                                            helper.participantGameInfoUpdateTotalTimeRoundOne(component, event, helper, userContactId, gameId, participantGameInfoId, totalTimeForRoundSeven,totalKeyStrokesInRound,currentScreent);
                                            }
                                        }

                                        if (prTestResultscreen1 == currentScreent || prTestResultscreen2 == currentScreent ||
                                            prTestResultscreen3 == currentScreent) {
                                            // prScore = (prSuccessCount/4)*100;
                                            //console.log('prScore : ', prScore, ' finalStudyScrCnt = ', finalStudyScrCnt);
                                            if (prScore >= 60) {
                                                currentScreent = finalStudyScrCnt;
                                            }
                                            prSuccessCount = 0;
                                            perCount = 0;
                                            prScore = 0;
                                        }
                                        document.getElementById("datablock_mst").innerHTML = configdata[currentScreent].content;
                                        ////console.log('gameComplete = ', configdata[currentScreent].gameComplete );
                                        if (configdata[currentScreent].gameComplete == true) {
                                            document.getElementById("nextBtton").classList.remove("slds-hide");
                                        }

                                        //gameComplete = configdata[currentScreent].gameComplete;
                                        if (prTestResultscreen1 == currentScreent + 1 || prTestResultscreen2 == currentScreent + 1 ||
                                            prTestResultscreen3 == currentScreent + 1) {
                                            document.getElementById("perCount").innerHTML = prScore + '%';
                                        }
                                        // left alligning the instruction screens.
                                        if (configdata[currentScreent].instructionsLeft == true) {
                                            document.getElementById("gameMainContent").classList.add("instructionsLeft");
                                        } else {
                                            document.getElementById("gameMainContent").classList.remove("instructionsLeft");
                                        }

                                        //Changes for touch
                                        if (!isKeyboad) {
                                            document.getElementById("gameBox").removeEventListener('click', gotoNextScreen, false);
                                            if (configdata[currentScreent].hasOwnProperty('isTouch')) {
                                                document.getElementById("gameBox").addEventListener('click', gotoNextScreen, false);
                                            }
                                            /*  let tabButtons = document.querySelectorAll(".tabButtons");
                                             if (tabButtons != 'undefined' && tabButtons != null) {
                                                     tabButtons.forEach((e) => {
                                                            e.addEventListener('click', mdtoEventQuery, false);
                                                     });
                                             } */

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
                                                    e.addEventListener('click', mdtsEventQuery, false);
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
                                         if (typeof (imagedata) != 'undefined' && imagedata != null) {
                                            clearTimeout(intervalImageTime);
                                             intervalImageTime = setTimeout(function () { if (imagedata != null) imagedata.remove(); }, 2000);
                                     
                                         } else { imagedata = null; } */

                                        if (currentScreent > 0) {
                                            let isResult = configdata[currentScreent - 1].hasOwnProperty("result") ? true : false;
                                            let lastdata = lastdatatitle;
                                            ////console.log('isResult value: ',isResult, lastdata.length);

                                            if (lastdata.length <= 0 && isResult == true) {

                                                //Result Data
                                                resultData[configdata[currentScreent - 1].screen] = {
                                                    "duration": result_time,// configdata[currentScreent - 1].endDuration,
                                                    "status": "false",
                                                    "data": inputdata,
                                                    "question": configdata[currentScreent - 1].question,
                                                    "isPractice": configdata[currentScreent - 1].isPractice,
                                                    "correctAnswer": configdata[currentScreent - 1].answer,
                                                    "name": configdata[currentScreent - 1].name,
                                                    "trial": configdata[currentScreent - 1].trial,
                                                    "studyPositionX": configdata[currentScreent - 1].studyPositionX,
                                                    "studyPositionY": configdata[currentScreent - 1].studyPositionY,
                                                    "testPositionX": configdata[currentScreent - 1].testPositionX,
                                                    "testPositionY": configdata[currentScreent - 1].testPositionY,
                                                    "trialType": configdata[currentScreent - 1].trialType,
                                                    "round": configdata[currentScreent - 1].round
                                                };
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
                                                //console.log('before save change screen: ', prSuccessCount);
                                                saveData(
                                                    "MST",
                                                    currentgamedata.question,
                                                    currentgamedata.data,
                                                    currentgamedata.status,
                                                    currentgamedata.duration,
                                                    currentgamedata.isPractice,
                                                    currentgamedata.correctAnswer,
                                                    currentgamedata.name,
                                                    currentgamedata.trial,
                                                    currentgamedata.studyPositionX,
                                                    currentgamedata.studyPositionY,
                                                    currentgamedata.testPositionX,
                                                    currentgamedata.testPositionY,
                                                    currentgamedata.trialType,
                                                    currentgamedata.round
                                                );
                                                ////console.log('after save : ', prSuccessCount);

                                                //Front Result Output Data Intigration time comment or Remove 3 lines
                                                document.getElementById("d_title").innerHTML = "Result";
                                                document.getElementById("d_txt").innerHTML = configdata[currentScreent - 1].endDuration + " ms";
                                                document.getElementById("d_status").innerHTML = resultData[configdata[currentScreent - 1].screen]["status"];
                                                setTimeout(clearResult, 1000);
                                            }
                                        }

                                        //Initial and end Game
                                        // if (currentScreent == 6) {
                                        //     updateGameNameInParticipantGameInfo(gameId, participantGameInfoId, ipAddress, browserName, device);
                                        //     ////console.log('updateGameNameInParticipantGameInfo :',gameId, participantGameInfoId, ipAddress, browserName, device);
                                        // }
                                        //creating participant game info record.
                                        if (currentScreent == 1) {

                                            var startDateTime = new Date();
                                            var gamePlayStatus = "Not-Completed";
                                            var screenResolution = { "height": screenHeight, "width": screenWidth };
                                            //  console.log('========participantGameInfo :',userContactId, gameId, startDateTime, gamePlayStatus, ipAddress, browserName, device);
                                            helper.participantGameInfo(component, event, helper, userContactId, language, gameId, startDateTime, gamePlayStatus, ipAddress, browserName, device, screenResolution);
                                            ////console.log('participantGameInfo :',userContactId, gameId, startDateTime, gamePlayStatus);
                                        }
                                        else {
                                            ////console.log('screens are changing');
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
                                    ////console.log('gamePlay click');
                                    function gamePlay(e) {

                                        command_value = e.keyCode;
                                        inputdata = e.key;
                                        totalKeyStrokesInRound = totalKeyStrokesInRound + 1;
                                        let startDurations = configdata[currentScreent - 1].startDuration;

                                        ////console.log('document.getElementById("imgf") = ', document.getElementById('imgf'));
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
                                                if (!resultData.hasOwnProperty(configdata[currentScreent - 1].screen)) {
                                                    resultData[configdata[currentScreent - 1].screen] = {
                                                        "duration": "0",
                                                        "status": "false",
                                                        "data": "",
                                                        "question": configdata[currentScreent - 1].question,
                                                        "isPractice": configdata[currentScreent - 1].isPractice,
                                                        "correctAnswer": configdata[currentScreent - 1].answer,
                                                        "name": configdata[currentScreent - 1].name,
                                                        "trial": configdata[currentScreent - 1].trial,
                                                        "studyPositionX": configdata[currentScreent - 1].studyPositionX,
                                                        "studyPositionY": configdata[currentScreent - 1].studyPositionY,
                                                        "testPositionX": configdata[currentScreent - 1].testPositionX,
                                                        "testPositionY": configdata[currentScreent - 1].testPositionY,
                                                        "trialType": configdata[currentScreent - 1].trialType
                                                    };
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
                                                                ////console.log('precount logic : ', inputdata.toLowerCase() == configdata[currentScreent - 1].answer);
                                                                resultData[configdata[currentScreent - 1].screen]["status"] = "true";
                                                                //console.log('precount isPractice , isTest  : ', configdata[currentScreent - 1].isPractice, configdata[currentScreent - 1].isTest );
                                                                if (configdata[currentScreent - 1].isPractice && configdata[currentScreent - 1].isTest) {

                                                                    perCount++;
                                                                    prScore = (perCount / 4) * 100;
                                                                }
                                                            } else {
                                                                resultData[configdata[currentScreent - 1].screen]["status"] = "false";
                                                            }


                                                            ////console.log('perCount = ', perCount);
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
                                                            //lastdatatitle = "Result";

                                                            //Save Output Events
                                                            let currentgamedata = resultData[configdata[currentScreent - 1].screen];
                                                            //console.log('before save game play: ', currentgamedata);

                                                            // saveData(
                                                            //     "MST",
                                                            //     currentgamedata.question,
                                                            //     currentgamedata.data,
                                                            //     currentgamedata.status,
                                                            //     currentgamedata.duration,
                                                            //     currentgamedata.isPractice,
                                                            //     currentgamedata.correctAnswer,
                                                            //     currentgamedata.name,
                                                            //     currentgamedata.trial,
                                                            //     currentgamedata.studyPositionX,
                                                            //     currentgamedata.studyPositionY,
                                                            //     currentgamedata.testPositionX,
                                                            //     currentgamedata.testPositionY,
                                                            //     currentgamedata.trialType
                                                            // );

                                                            //Out put result Intigration time comment or Remove 3 lines
                                                            document.getElementById("d_title").innerHTML = "Result";
                                                            document.getElementById("d_txt").innerHTML = result_time + " ms";
                                                            document.getElementById("d_status").innerHTML = resultData[configdata[currentScreent - 1].screen]["status"];
                                                        }

                                                        //Clear Results

                                                        if (isResult) {
                                                            ////console.log('configdata[currentScreent - 1].isPractice = ', configdata[currentScreent - 1].isPractice)
                                                            if (configdata[currentScreent - 1].isPractice) {
                                                                // lastdatatitle="Result";
                                                                //  setTimeout(clearResult,(screenWaitTime-result_time)+4);

                                                            }
                                                            else {
                                                                //Reset Screent Interval
                                                                // setTimeout(clearResult, 1500);
                                                                clearTimeout(intervalTime);
                                                                //Next Screen Show
                                                                changeScreen();
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
                                        ////console.log('f-key-press');
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
                                    //chnages for touch 
                                    function mdtsEventQuery(e) {
                                        responseCount++;
                                        if (responseCount == 1) {
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