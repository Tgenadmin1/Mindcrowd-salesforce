({
    oneMethod : function(component, event, helper) {

        var myPageRef = window.location.href;
        var actionGame = component.get("c.getCurrentContact");
            var pageUrl=myPageRef.split('/s/');
            //-----Gettung gameId from the apex function------------------
            var gameNameScientific = $A.get("$Label.c.scientific_game_objectRecognitionAndSimilarity");
            console.log('gameNameScientific values :--',gameNameScientific); 
            helper.gameDetails(component, event, helper, gameNameScientific);
            var gameId;
            var participantGameInfoId;
            var ipAddress;
            var browserName;
            helper.getIpAddress(component, event, helper);
            helper.printBrowser(component, event, helper);
            var device = $A.get("$Browser.formFactor");
    
            // Gettin contact id from the current loggedin user.
            let currentUserId = $A.get("$SObjectType.CurrentUser.Id");
            helper.userDetails(component, event, helper, currentUserId);
            var userContactId;
        
        actionGame.setCallback(this,function(a) 
        {      
            console.log('myPageRef value22222222222222222 :');
            var state = a.getState();
                if (state === "SUCCESS") {
                    var valueReturn = actionGame.getReturnValue(); 
                    console.log('contact values :--',valueReturn,valueReturn['Object_Recognition_And_Similarity__c']);
                    if(valueReturn['Object_Recognition_And_Similarity__c']=='Locked' && pageUrl[1]== $A.get("$Label.c.url_me_shapesgame")) 
                    {
                        console.log('sssss');
                       component.set('v.showConfirmDialog', true);
                    }
                    else if(valueReturn['Object_Recognition_And_Similarity__c']=='Completed' && pageUrl[1]==  $A.get("$Label.c.url_me_shapesgame")) 
                    {
                        console.log('dddddd');
                       component.set('v.showConfirmDialog', true);
                    }
                    // full game code is started from else part.===========================
                    else{
                        component.set('v.showConfirmDialog', false);
                        helper.preventLeaving();
                        document.documentElement.addEventListener('keydown', function (e) {
                            if ((e.keycode || e.which) == 32) {
                                e.preventDefault();
                            }
                        }, false);
                
                      
                        const urlParams = new URLSearchParams(document.location.search.substring(1));
                        const  cs = urlParams.get('cs');

                        let currentScreent = 0;
                        if(cs!=null){
                            console.log("cs1=", cs)
                            currentScreent = Number(cs);
                        }
                        console.log("111111111111111111111111111111111")
                        let screenWaitTime=2000;
                        let resultData = {};
                       // let currentScreent = 0;
                        let intervalTime = null;
                        let intervalImageTime = null;
                        let blockevents = 0;
                        let timedata = new Date();
                        let result_time = 0;
                        let command_value = 0;
                        let inputdata = "";
                        let lastdatatitle = "";
                        //mdtt_Set_1_practice_images 
                        //mdtt_Set_1_test_images (001.jpg to 231.jpg)
                        //mdtt_Set_2_test_images (232.jpg to 390.jpg)
                        let image_path = $A.get("$Label.c.Community_Url")+"/resource/mindGamesImages/objects/";
                        let image_path2 = $A.get("$Label.c.Community_Url") + "/resource/mindcrowd_style/images/";
                        let image_path_PR =  $A.get("$Label.c.Community_Url") + "/resource/mdtt_Set_1_practice_images/";
                        let image_path_set1 =  $A.get("$Label.c.Community_Url") + "/resource/";
                        
                        let errormsg = null;
                        let imagedata = null;
                        let imagedata1 = null;
                        var gameName = $A.get("$Label.c.object_game_text_28");
                        var gameTime = '15 minutes';
                        let white = false;
                        //creating participant game info record.
                        if (currentScreent == 0) {
                            var startDateTime = new Date();
                            var gamePlayStatus = "Not-Completed";
                            helper.participantGameInfo(component, event, helper, userContactId, gameId, startDateTime, gamePlayStatus);
                            console.log('participantGameInfo :',userContactId, gameId, startDateTime, gamePlayStatus);
                        }
                        else {
                            console.log('screens are changing');
                        }
                
                      
                        
                
                
                        //Configuration of data parts.
                        console.log("222222222222222222222222222222222");
                var configdataWithoutInst = [];
                var testData = [];
                var studyData = [];
                var prData = [];
                var prTest1 = [];
                var prStudy2 = [];
                var prTest2 = [];
                var prStudy3 = [];
                var prTest3 = [];
                var masterImagePairs = [];
                var finalTestArr = [];
                var finalStudyArr = [];
                var preloadImageArray=[];
                var finalStudyScrCnt = 0;
                var prScore = 0;
                var perCount = 0;
                let prctCount=0;
                var prTestResultscreen = 0;
                var prSuccessCount = 0;
                
                var leftImages = [{name:'1L_blob_LA_NM_028b_fill_JKL_0.png'}, {name:'2L_blob_LA_NM_001_fill_JKL_0.png'}, {name:'3L_blob_LA_NM_031a_outer_JKL_0.png'}, {name:'4L_square_LA_NM_esize21_pos1_65.png'}, {name:'5L_blob_HA_M_006_outer_EFG_0.png'}, {name:'6L_square_HA_NM_size33_pos1_165.png'}, {name:'7L_blob_HA_M_008a_fill_EFG_0.png'}, {name:'8L_blob_HA_NM_022_outer_ABC_0.png'}, {name:'9L_square_HA_NM_size12xxx_pos1_130.png'}, {name:'10L_square_LA_M_esize04x_pos1_115.png'}, {name:'11L_blob_HA_M_005_inner_EFG_0.png'}, {name:'12L_blob_HA_NM_007_outer_ABC_0.png'}, {name:'13L_blob_HA_M_003_outer_EFG_0.png'}, {name:'14L_square_LA_M_esize36x_pos1_130.png'}, {name:'15L_square_HA_M_size22x_pos1_110.png'}, {name:'16L_blob_LA_M_015_inner_PQR_0.png'}, {name:'17L_square_HA_NM_size07x_pos1_125.png'}, {name:'18L_square_LA_NM_esize11x_pos1_65.png'}, {name:'19L_blob_HA_NM_033_outer_ABC_0.png'}, {name:'20L_square_LA_NM_esize31x_pos1_15.png'}, {name:'21L_blob_LA_NM_025a_low_JKL_0.png'}, {name:'22L_square_HA_NM_size23xxx_pos1_35.png'}, {name:'23L_square_HA_M_size36x_pos1_110.png'}, {name:'24L_blob_LA_M_015_low_PQR_0.png'},
                    {name:'25L_blob_HA_M_004_outer_EFG_0.png'}, {name:'26L_square_LA_M_esize08_pos1_110.png'}, {name:'27L_square_HA_M_size10_pos1_100.png'}, {name:'28L_blob_HA_NM_032_outer_ABC_0.png'}, {name:'29L_blob_LA_NM_029b_low_JKL_0.png'}, {name:'30L_blob_LA_M_015_fill_PQR_0.png'}, {name:'31L_blob_LA_M_005_fill_PQR_0.png'}, {name:'32L_blob_HA_M_010b_fillinner_EFG_0.png'}, {name:'33L_square_HA_NM_size01x_pos1_95.png'}, {name:'34L_blob_LA_NM_022_low_JKL_0.png'}, {name:'35L_blob_HA_M_009b_fillinner_EFG_0.png'}, {name:'36L_blob_LA_NM_011_fill_JKL_0.png'}, {name:'37L_square_LA_NM_esize19xxx_pos1_160.png'}, {name:'38L_square_HA_NM_size29xxx_pos1_145.png'}, {name:'39L_blob_HA_M_016_outer_EFG_0.png'}, {name:'40L_square_LA_M_esize32_pos1_105.png'}, {name:'41L_blob_LA_NM_027a_low_JKL_0.png'}, {name:'42L_squae_HA_M_size24x_pos1_135.png'}, {name:'43L_blob_HA_NM_008x1_fill_ABC_0.png'}, {name:'44L_square_LA_M_esize28_pos1_115.png'}, {name:'45L_square_HA_M_size32x_pos1_145.png'}, {name:'46L_blob_LA_NM_012_fill_JKL_0.png'}, {name:'47L_square_HA_M_size34x_pos1_40.png'}, {name:'48L_square_LA_NM_esize30xxx_pos1_55.png'}, 
                    {name:'49L_blob_LA_M_011_low_PQR_0.png'}, {name:'50L_square_LA_M_esize10_pos1_130.png'}, {name:'51L_square_LA_NM_esize06xxx_pos1_55.png'}, {name:'52L_blob_HA_M_001_inner_EFG_0.png'}, {name:'53L_blob_LA_M_012_outer_PQR_0.png'}, {name:'54L_square_LA_M_esize08x_pos1_110.png'}, {name:'55L_blob_LA_M_007_fill_PQR_0.png'}, {name:'56L_blob_HA_M_008_outer_EFG_0.png'}, {name:'57L_blob_LA_M_015_outer_PQR_0.png'}, {name:'58L_blob_HA_NM_008x2_fill_ABC_0.png'}, {name:'59L_blob_HA_NM_008a_fill_ABC_0.png'}, {name:'60L_square_LA_NM_esize29xxx_pos1_110.png'}, {name:'61L_blob_HA_NM_037x2_fill_ABC_0.png'}, {name:'62L_blob_HA_M_010_outer_EFG_0.png'}, {name:'63L_blob_HA_NM_030_outer_ABC_0.png'}, {name:'64L_blob_LA_M_013_low_PQR_0.png'}, {name:'65L_blob_LA_M_007_low_PQR_0.png'}, {name:'66L_square_HA_NM_size16xxx_pos1_135.png'}, {name:'67L_square_HA_NM_size18xxx_pos1_70.png'}, {name:'68L_blob_HA_NM_021_outer_ABC_0.png'}, {name:'69L_blob_LA_NM_007_low_JKL_0.png'}, {name:'70L_square_LA_M_esize20_pos1_150.png'}, {name:'71L_square_HA_NM_size15xxx_pos1_120.png'}, {name:'72L_square_LA_NM_esize03_pos1_120.png'}, 
                    {name:'73L_square_LA_M_esize02_pos1_20.png'}, {name:'74L_blob_LA_NM_004_low_JKL_0.png'}, {name:'75L_blob_LA_NM_013_fill_JKL_0.png'}, {name:'76L_blob_HA_NM_024_outer_ABC_0.png'}, {name:'77L_square_HA_M_size30x_pos1_35.png'}, {name:'78L_blob_LA_M_008_inner_PQR_0.png'}, {name:'79L_blob_LA_M_005_low_PQR_0.png'}, {name:'80L_square_HA_NM_size21xxx_pos1_95.png'}, {name:'81L_blob_HA_NM_027a_fill_ABC_0.png'}, {name:'82L_blob_LA_M_009_outer_PQR_0.png'}, {name:'83L_square_LA_NM_esize34xxx_pos1_120.png'}, {name:'84L_blob_HA_NM_025_inner_ABC_0.png'}, {name:'85L_square_LA_M_esize30_pos1_120.png'}, {name:'86L_square_LA_NM_esize03xxx_pos1_40.png'}, {name:'87L_square_LA_M_esize24_pos1_10.png'}, {name:'88L_square_LA_M_esize06x_pos1_100.png'}, {name:'89L_square_LA_M_esize06_pos1_100.png'}, {name:'90L_blob_HA_M_010a_fill_EFG_0.png'}, {name:'91L_square_HA_M_size08x_pos1_145.png'}, {name:'92L_blob_LA_M_010_low_PQR_0.png'}, {name:'93L_square_HA_NM_size31_pos1_50.png'}, {name:'94L_blob_HA_NM_037x1_fill_ABC_0.png'}, {name:'95L_square_HA_NM_size11_pos1_115.png'}, {name:'96L_square_LA_M_esize24x_pos1_10.png'},
                    {name:'97L_square_LA_M_esize04_pos1_115.png'}, {name:'98L_blob_LA_NM_004_fill_JKL_0.png'}, {name:'99L_square_HA_NM_size29x_pos1_125.png'}, {name:'100L_blob_HA_NM_003_outer_ABC_0.png'}, {name:'101L_blob_LA_M_003_fill_PQR_0.png'}, {name:'102L_blob_HA_M_000_inner_EFG_0.png'}, {name:'103L_blob_HA_NM_008b_fill_ABC_0.png'}, {name:'104L_square_LA_M_esize10x_pos1_130.png'}, {name:'105L_blob_HA_NM_032_fill_ABC_0.png'}, {name:'106L_blob_HA_M_014_inner_EFG_0.png'}, {name:'107L_square_HA_M_size02x_pos1_145.png'}, {name:'108L_blob_LA_NM_003_low_JKL_0.png'}, {name:'109L_square_HA_M_size14_pos1_120.png'}, {name:'110L_blob_LA_NM_023_low_JKL_0.png'}, {name:'111L_blob_LA_M_013_outer_PQR_0.png'}, {name:'112L_square_HA_NM_size13x_pos1_165.png'}, {name:'113L_square_HA_M_size08_pos1_145.png'}, {name:'114L_square_LA_NM_esize29x_pos1_25.png'}, {name:'115L_square_LA_NM_esize28xxx_pos1_70.png'}, {name:'116L_blob_LA_M_009_low_PQR_0.png'}, {name:'117L_blob_HA_NM_029a_inner_ABC_0.png'}, {name:'118L_square_LA_M_esize36_pos1_130.png'}, {name:'119L_square_HA_NM_size19xx_pos1_110.png'}, {name:'120L_blob_HA_M_003_inner_EFG_0.png'},
                    {name:'121L_square_LA_M_esize12_pos1_155.png'}, {name:'122L_square_HA_NM_size31x_pos1_50.png'}, {name:'123L_blob_HA_NM_025_outer_ABC_0.png'}, {name:'124L_square_HA_M_size34_pos1_40.png'}, {name:'125L_square_HA_M_size14x_pos1_120.png'}, {name:'126L_square_LA_NM_esize05_pos1_75.png'}, {name:'127L_square_LA_M_esize12x_pos1_155.png'}, {name:'128L_square_HA_M_size12x_pos1_130.png'}, {name:'129L_blob_HA_M_004_inner_EFG_0.png'}, {name:'130L_blob_LA_NM_011_outer_JKL_0.png'}, {name:'131L_blob_HA_NM_023_outer_ABC_0.png'}, {name:'132L_square_HA_M_size36_pos1_110.png'}, {name:'133L_square_LA_M_esize14x_pos1_105.png'}, {name:'134L_square_HA_NM_size25xxx_pos1_140.png'}, {name:'135L_square_LA_NM_esize33x_pos1_170.png'}, {name:'136L_blob_LA_NM_002_low_JKL_0.png'}, {name:'137L_square_HA_NM_size05_pos1_25.png'}, {name:'138L_blob_HA_M_007_outer_EFG_0.png'}, {name:'139L_square_HA_NM_size19x_pos1_135.png'}, {name:'140L_blob_HA_M_019_outer_EFG_0.png'}, {name:'141L_square_LA_M_esize32x_pos1_105.png'}, {name:'142L_square_HA_M_size26x_pos1_115.png'}, {name:'143L_square_LA_NM_esize35_pos1_50.png'}, {name:'144L_square_HA_NM_size19xxx_pos1_60.png'},
                    {name:'145L_blob_LA_NM_030b_inner_JKL_0.png'}, {name:'146L_blob_LA_M_000_low_PQR_0.png'}, {name:'147L_blob_HA_NM_010_inner_ABC_0.png'}, {name:'148L_blob_HA_M_010_inner_EFG_0.png'}, {name:'149L_blob_HA_M_002x_fill_EFG_0.png'}, {name:'150L_square_HA_M_size04x_pos1_75.png'}, {name:'151L_square_LA_NM_esize03x_pos1_120.png'}, {name:'152L_square_HA_NM_size05xxx_pos1_65.png'}, {name:'153L_sqaure_LA_NM_esize19xx_pos1_40.png'}, {name:'154L_square_HA_NM_size13xxx_pos1_145.png'}, {name:'155L_square_LA_NM_esize02xxx_pos1_110.png'}, {name:'156L_blob_HA_NM_059_fill_ABC_0.png'}, {name:'157L_square_HA_M_size28_pos1_100.png'}, {name:'158L_square_LA_M_esize30x_pos1_120.png'}, {name:'159L_blob_LA_NM_022_fill_JKL_0.png'}, {name:'160L_square_LA_M_esize26_pos1_140.png'}, {name:'161L_square_LA_M_esize28x_pos1_115.png'}, {name:'162L_blob_LA_M_013_fill_PQR_0.png'}, {name:'163L_blob_LA_NM_031b_outer_JKL_0.png'}, {name:'164L_blob_LA_NM_001_low_JKL_0.png'}, {name:'165L_square_LA_NM_esize17_pos1_100.png'}, {name:'166L_square_LA_NM_esize01_pos1_30.png'}, {name:'167L_blob_LA_NM_010_low_JKL_0.png'}, {name:'168L_blob_HA_M_007_inner_EFG_0.png'}, 
                    {name:'169L_blob_LA_M_003_low_PQR_0.png'}, {name:'170L_square_LA_NM_esize07xxx_pos1_60.png'}, {name:'171L_blob_HA_NM_003_inner_ABC_0.png'}, {name:'172L_square_HA_M_size30_pos1_35.png'}, {name:'173L_square_HA_M_size18_pos1_150.png'}, {name:'174L_square_LA_M_esize34_pos1_140.png'}, {name:'175L_square_LA_NM_esize04xxx_pos1_100.png'}, {name:'176L_blob_HA_NM_028b_inner_ABC_0.png'}, {name:'177L_blob_LA_M_004_low_PQR_0.png'}, {name:'178L_blob_LA_M_012_low_PQR_0.png'}, {name:'179L_blob_LA_NM_031_inner_JKL_0.png'}, {name:'180L_square_LA_NM_esize27x_pos1_135.png'}, {name:'181L_square_HA_M_size10x_pos1_100.png'}, {name:'182L_blob_LA_M_004_fill_PQR_0.png'}, {name:'183L_blob_LA_M_006_fill_PQR_0.png'}, {name:'184L_blob_HA_M_008b_fillinner_EFG_0.png'}, {name:'185L_blob_LA_M_002_outer_PQR_0.png'}, {name:'186L_blob_HA_NM_004_outer_ABC_0.png'}, {name:'187L_blob_LA_NM_029a_outer_JKL_0.png'}, {name:'188L_square_LA_M_esize26x_pos1_140.png'}, {name:'189L_square_LA_M_esize18x_pos1_40.png'}, {name:'190L_square_HA_NM_size19_pos1_135.png'}, {name:'191L_blob_LA_NM_003_fill_JKL_0.png'}, {name:'192L_blob_HA_M_017_outer_EFG_0.png'},
                    {name:'193L_square_LA_NM_esize22xxx_pos1_125.png'}, {name:'194L_square_HA_M_size20x_pos1_140.png'}, {name:'195L_blob_HA_M_000_outer_EFG_0.png'}, {name:'196L_square_LA_NM_esize32xxx_pos1_30.png'}, {name:'197L_blob_LA_M_014_low_PQR_0.png'}, {name:'198L_square_HA_M_size18x_pos1_150.png'}, {name:'199L_square_HA_NM_size28xxx_pos1_100.png'}, {name:'200L_square_HA_NM_size09_pos1_70.png'}];
                var prLeftImages = [{name:'1L_blob_HA_NM_018_inner_ABC_0.png'}, {name:'2L_blob_HA_NM_010a_fill_ABC_0.png'}, {name:'3L_blob_HA_M_018_inner_EFG_0.png'}, {name:'4L_square_HA_NM_size01xx_pos1_40.png'}, {name:'5L_square_HA_M_size04xx_pos1_25.png'}, {name:'6L_square_HA_NM_size03xx_pos1_120.png'}, {name:'7L_square_LA_NM_esize03xx_pos1_55.png'}, {name:'8L_square_LA_NM_esize05xx_pos1_60.png'}, {name:'9L_square_LA_NM_esize07xx_pos1_40.png'}, {name:'10L_blob_LA_NM_018_low_JKL_0.png'}, {name:'11L_blob_LA_NM_000_low_JKL_0.png'}, {name:'12L_blob_LA_M_019_fill_PQR_0.png'}, {name:'13L_blob_HA_M_018_fill_EFG_0.png'}, {name:'14L_blob_HA_NM_037x3_fill_ABC_0.png'}, {name:'15L_blob_HA_NM_020_outer_ABC_0.png'}, {name:'16L_square_HA_M_size02xx_pos1_110.png'}, {name:'17L_square_HA_NM_size05xx_pos1_75.png'}, {name:'18L_square_HA_NM_size25_pos1_65.png'}, {name:'19L_square_LA_M_esize02xx_pos1_125.png'}, {name:'20L_square_LA_M_esize04xx_pos1_100.png'}, {name:'21L_square_LA_NM_esize01xx_pos1_110.png'}, {name:'22L_blob_LA_M_018_low_PQR_0.png'}, {name:'23L_blob_LA_NM_021_low_JKL_0.png'}, {name:'24L_blob_LA_NM_019_fill_JKL_0.png'}];
                
                var rightImages = [{name:'1R_blob_LA_NM_028b_fill_MNO_65.png'}, {name:'2R_blob_LA_NM_001_fill_MNO_140.png'}, {name:'3R_blob_LA_NM_031a_outer_MNO_120.png'}, {name:'4R_square_LA_NM_esize21_pos3_110.png'}, {name:'5R_blob_HA_M_006_outer_EFG_150.png'}, {name:'6R_square_HA_NM_size33_pos3_130.png'}, {name:'7R_blob_HA_M_008a_fill_EFG_150.png'}, {name:'8R_blob_HA_NM_022_outer_ABD_110.png'}, {name:'9R_square_HA_NM_size12xxx_pos3_155.png'}, {name:'10R_square_LA_M_esize04x_pos1_75.png'}, {name:'11R_blob_HA_M_005_inner_EFG_30.png'}, {name:'12R_blob_HA_NM_007_outer_ABD_160.png'}, {name:'13R_blob_HA_M_003_outer_EFG_60.png'}, {name:'14R_square_LA_M_esize36x_pos1_75.png'}, {name:'15R_square_HA_M_size22x_pos1_50.png'}, {name:'16R_blob_LA_M_015_inner_PQR_150.png'}, {name:'17R_square_HA_NM_size07x_pos2_65.png'}, {name:'18R_square_LA_NM_esize11x_pos2_115.png'}, {name:'19R_blob_HA_NM_033_outer_ABD_80.png'}, {name:'20R_square_LA_NM_esize31x_pos3_150.png'}, {name:'21R_blob_LA_NM_025a_low_MNO_25.png'}, {name:'22R_square_HA_NM_size23xxx_pos2_155.png'}, {name:'23R_square_HA_M_size36x_pos1_145.png'}, {name:'24R_blob_LA_M_015_low_PQR_65.png'},
                    {name:'25R_blob_HA_M_004_outer_EFG_80.png'}, {name:'26R_square_LA_M_esize08_pos1_160.png'}, {name:'27R_square_HA_M_size10_pos1_40.png'}, {name:'28R_blob_HA_NM_032_outer_ABD_160.png'}, {name:'29R_blob_LA_NM_029b_low_MNO_35.png'}, {name:'30R_blob_LA_M_015_fill_PQR_125.png'}, {name:'31R_blob_LA_M_005_fill_PQR_130.png'}, {name:'32R_blob_HA_M_010b_fillinner_EFG_160.png'}, {name:'33R_square_HA_NM_size01x_pos2_130.png'}, {name:'34R_blob_LA_NM_022_low_MNO_125.png'}, {name:'35R_blob_HA_M_009b_fillinner_EFG_150.png'}, {name:'36R_blob_LA_NM_011_fill_MNO_70.png'}, {name:'37R_square_LA_NM_esize19xxx_pos2_135.png'}, {name:'38R_square_HA_NM_size29xxx_pos2_95.png'}, {name:'39R_blob_HA_M_016_outer_EFG_50.png'}, {name:'40R_square_LA_M_esize32_pos1_35.png'}, {name:'41R_blob_LA_NM_027a_low_MNO_100.png'}, {name:'42R_square_HA_M_size24x_pos1_75.png'}, {name:'43R_blob_HA_NM_008x1_fill_ABD_85.png'}, {name:'44R_square_LA_M_esize28_pos1_155.png'}, {name:'45R_square_HA_M_size32x_pos1_85.png'}, {name:'46R_blob_LA_NM_012_fill_MNO_145.png'}, {name:'47R_square_HA_M_size34x_pos1_95.png'}, {name:'48R_square_LA_NM_esize30xxx_pos2_160.png'},
                    {name:'49R_blob_LA_M_011_low_PQR_120.png'}, {name:'50R_square_LA_M_esize10_pos1_95.png'}, {name:'51R_square_LA_NM_esize06xxx_pos3_95.png'}, {name:'52R_blob_HA_M_001_inner_EFG_70.png'}, {name:'53R_blob_LA_M_012_outer_PQR_155.png'}, {name:'54R_square_LA_M_esize08x_pos1_160.png'}, {name:'55R_blob_LA_M_007_fill_PQR_110.png'}, {name:'56R_blob_HA_M_008_outer_EFG_80.png'}, {name:'57R_blob_LA_M_015_outer_PQR_85.png'}, {name:'58R_blob_HA_NM_008x2_fill_ABD_110.png'}, {name:'59R_blob_HA_NM_008a_fill_ABD_60.png'}, {name:'60R_square_LA_NM_esize29xxx_pos1_140.png'}, {name:'61R_blob_HA_NM_037x2_fill_ABD_140.png'}, {name:'62R_blob_HA_M_010_outer_EFG_95.png'}, {name:'63R_blob_HA_NM_030_outer_ABD_105.png'}, {name:'64R_blob_LA_M_013_low_PQR_70.png'}, {name:'65R_blob_LA_M_007_low_PQR_150.png'}, {name:'66R_square_HA_NM_size16xxx_pos3_75.png'}, {name:'67R_square_HA_NM_size18xxx_pos3_100.png'}, {name:'68R_blob_HA_NM_021_outer_ABD_75.png'}, {name:'69R_blob_LA_NM_007_low_MNO_95.png'}, {name:'70R_square_LA_M_esize20_pos1_85.png'}, {name:'71R_square_HA_NM_size15xxx_pos3_85.png'}, {name:'72R_square_LA_NM_esize03_pos3_150.png'},
                    {name:'73R_square_LA_M_esize02_pos1_65.png'}, {name:'74R_blob_LA_NM_004_low_MNO_50.png'}, {name:'75R_blob_LA_NM_013_fill_MNO_100.png'}, {name:'76R_blob_HA_NM_024_outer_ABD_145.png'}, {name:'77R_square_HA_M_size30x_pos1_60.png'}, {name:'78R_blob_LA_M_008_inner_PQR_60.png'}, {name:'79R_blob_LA_M_005_low_PQR_110.png'}, {name:'80R_square_HA_NM_size21xxx_pos3_50.png'}, {name:'81R_blob_HA_NM_027a_fill_ABD_50.png'}, {name:'82R_blob_LA_M_009_outer_PQR_115.png'}, {name:'83R_square_LA_NM_esize34xxx_pos3_65.png'}, {name:'84R_blob_HA_NM_025_inner_ABD_85.png'}, {name:'85R_square_LA_M_esize30_pos1_70.png'}, {name:'86R_square_LA_NM_esize03xxx_pos2_75.png'}, {name:'87R_square_LA_M_esize24_pos1_125.png'}, {name:'88R_square_LA_M_esize06x_pos1_50.png'}, {name:'89R_square_LA_M_esize06_pos1_50.png'}, {name:'90R_blob_HA_M_010a_fill_EFG_130.png'}, {name:'91R_square_HA_M_size08x_pos1_85.png'}, {name:'92R_blob_LA_M_010_low_PQR_50.png'}, {name:'93R_square_HA_NM_size31_pos2_75.png'}, {name:'94R_blob_HA_NM_037x1_fill_ABD_75.png'}, {name:'95R_square_HA_NM_size11_pos2_65.png'}, {name:'96R_square_LA_M_esize24x_pos1_125.png'}, 
                    {name:'97R_square_LA_M_esize04_pos1_75.png'}, {name:'98R_blob_LA_NM_004_fill_MNO_100.png'}, {name:'99R_square_HA_NM_size29x_pos2_85.png'}, {name:'100R_blob_HA_NM_003_outer_ABD_160.png'}, {name:'101R_blob_LA_M_003_fill_PQR_120.png'}, {name:'102R_blob_HA_M_000_inner_EFG_150.png'}, {name:'103R_blob_HA_NM_008b_fill_ABD_140.png'}, {name:'104R_square_LA_M_esize10x_pos1_95.png'}, {name:'105R_blob_HA_NM_032_fill_ABD_75.png'}, {name:'106R_blob_HA_M_014_inner_EFG_110.png'}, {name:'107R_square_HA_M_size02x_pos1_85.png'}, {name:'108R_blob_LA_NM_003_low_MNO_150.png'}, {name:'109R_square_HA_M_size14_pos1_75.png'}, {name:'110R_blob_LA_NM_023_low_MNO_160.png'}, {name:'111R_blob_LA_M_013_outer_PQR_110.png'}, {name:'112R_sqaure_HA_NM_size13x_pos3_20.png'}, {name:'113R_square_HA_M_size08_pos1_85.png'}, {name:'114R_square_LA_NM_esize29x_pos2_80.png'}, {name:'115R_square_LA_NM_esize28xxx_pos3_115.png'}, {name:'116R_blob_LA_M_009_low_PQR_100.png'}, {name:'117R_blob_HA_NM_029a_inner_ABD_135.png'}, {name:'118R_square_LA_M_esize36_pos1_75.png'}, {name:'119R_square_HA_NM_size19xx_pos2_165.png'}, {name:'120R_blob_HA_M_003_inner_EFG_110.png'},
                    {name:'121R_square_LA_M_esize12_pos1_25.png'}, {name:'122R_square_HA_NM_size31x_pos2_75.png'}, {name:'123R_blob_HA_NM_025_outer_ABD_145.png'}, {name:'124R_square_HA_M_size34_pos1_95.png'}, {name:'125R_square_HA_M_size14x_pos1_75.png'}, {name:'126R_square_LA_NM_esize05_pos2_120.png'}, {name:'127R_square_LA_M_esize12x_pos1_25.png'}, {name:'128R_square_HA_M_size12x_pos1_80.png'}, {name:'129R_blob_HA_M_004_inner_EFG_130.png'}, {name:'130R_blob_LA_NM_011_outer_MNO_40.png'}, {name:'131R_blob_HA_NM_023_outer_ABD_125.png'}, {name:'132R_square_HA_M_size36_pos1_145.png'}, {name:'133R_square_LA_M_esize14x_pos1_40.png'}, {name:'134R_square_HA_NM_size25xxx_pos2_20.png'}, {name:'135R_square_LA_NM_esize33x_pos2_95.png'}, {name:'136R_blob_LA_NM_002_low_MNO_60.png'}, {name:'137R_square_HA_NM_size05_pos2_165.png'}, {name:'138R_blob_HA_M_007_outer_EFG_70.png'}, {name:'139R_square_HA_NM_size19x_pos3_160.png'}, {name:'140R_blob_HA_M_019_outer_EFG_70.png'}, {name:'141R_square_LA_M_esize32x_pos1_35.png'}, {name:'142R_square_HA_M_size26x_pos1_150.png'}, {name:'143R_square_LA_NM_esize35_pos2_160.png'}, {name:'144R_square_HA_NM_size19xxx_pos2_25.png'}, 
                    {name:'145R_blob_LA_NM_030b_inner_MNO_140.png'}, {name:'146R_blob_LA_M_000_low_PQR_50.png'}, {name:'147R_blob_HA_NM_010_inner_ABD_145.png'}, {name:'148R_blob_HA_M_010_inner_EFG_60.png'}, {name:'149R_blob_HA_M_002x_fill_EFG_120.png'}, {name:'150R_square_HA_M_size04x_pos1_85.png'}, {name:'151R_square_LA_NM_esize03x_pos3_150.png'}, {name:'152R_square_HA_NM_size05xxx_pos2_115.png'}, {name:'153R_square_LA_NM_esize19xx_pos2_85.png'}, {name:'154L_square_HA_NM_size13xxx_pos1_145.png'}, {name:'155R_square_LA_NM_esize02xxx_pos2_70.png'}, {name:'156R_blob_HA_NM_059_fill_ABC_115.png'}, {name:'157R_square_HA_M_size28_pos1_75.png'}, {name:'158R_square_LA_M_esize30x_pos1_70.png'}, {name:'159R_blob_LA_NM_022_fill_MNO_150.png'}, {name:'160R_square_LA_M_esize26_pos1_95.png'}, {name:'161R_square_LA_M_esize28x_pos1_155.png'}, {name:'162R_blob_LA_M_013_fill_PQR_140.png'}, {name:'163R_blob_LA_NM_031b_outer_MNO_65.png'}, {name:'164R_blob_LA_NM_001_low_MNO_140.png'}, {name:'165R_square_LA_NM_esize17_pos3_140.png'}, {name:'166R_square_LA_NM_esize01_pos3_50.png'}, {name:'167R_blob_LA_NM_010_low_MNO_75.png'}, {name:'168R_blob_HA_M_007_inner_EFG_40.png'},
                    {name:'169R_blob_LA_M_003_low_PQR_70.png'}, {name:'170R_square_LA_NM_esize07xxx_pos3_115.png'}, {name:'171R_blob_HA_NM_003_inner_ABD_80.png'}, {name:'172R_square_HA_M_size30_pos1_60.png'}, {name:'173R_square_HA_M_size18_pos1_85.png'}, {name:'174R_square_LA_M_esize34_pos1_75.png'}, {name:'175R_square_LA_NM_esize04xxx_pos2_150.png'}, {name:'176R_blob_HA_NM_028b_inner_ABD_55.png'}, {name:'177R_blob_LA_M_004_low_PQR_110.png'}, {name:'178R_blob_LA_M_012_low_PQR_50.png'}, {name:'179R_blob_LA_NM_031_inner_MNO_140.png'}, {name:'180R_square_LA_NM_esize27x_pos2_85.png'}, {name:'181R_square_HA_M_size10x_pos1_40.png'}, {name:'182R_blob_LA_M_004_fill_PQR_140.png'}, {name:'183R_blob_LA_M_006_fill_PQR_50.png'}, {name:'184R_blob_HA_M_008b_fillinner_EFG_120.png'}, {name:'185R_blob_LA_M_002_outer_PQR_120.png'}, {name:'186R_blob_HA_NM_004_outer_ABD_140.png'}, {name:'187R_blob_LA_NM_029a_outer_MNO_160.png'}, {name:'188R_square_LA_M_esize26x_pos1_95.png'}, {name:'189R_square_LA_M_esize18x_pos1_75.png'}, {name:'190R_square_HA_NM_size19_pos3_160.png'}, {name:'191R_blob_LA_NM_003_fill_MNO_70.png'}, {name:'192R_blob_HA_M_017_outer_EFG_80.png'},
                    {name:'193R_square_LA_NM_esize22xxx_pos2_70.png'}, {name:'194R_square_HA_M_size20x_pos1_20.png'}, {name:'195R_blob_HA_M_000_outer_EFG_50.png'}, {name:'196R_square_LA_NM_esize32xxx_pos2_85.png'}, {name:'197R_blob_LA_M_014_low_PQR_120.png'}, {name:'198R_square_HA_M_size18x_pos1_85.png'}, {name:'199R_square_HA_NM_size28xxx_pos2_150.png'}, {name:'200R_square_HA_NM_size09_pos3_135.png'}];
                var prRightImages = [{name:'1R_blob_HA_NM_018_inner_ABD_145.png'}, {name:'2R_blob_HA_NM_010a_fill_ABD_160.png'}, {name:'3R_blob_HA_M_018_inner_EFG_75.png'}, {name:'4R_square_HA_NM_size01xx_pos3_80.png'}, {name:'5R_square_HA_M_size04xx_pos1_65.png'}, {name:'6R_square_HA_NM_size03xx_pos3_70.png'}, {name:'7R_square_LA_NM_esize03xx_pos3_95.png'}, {name:'8R_square_LA_NM_esize05xx_pos2_20.png'}, {name:'9R_square_LA_NM_esize07xx_pos3_160.png'}, {name:'10R_blob_LA_NM_018_low_MNO_110.png'}, {name:'11R_blob_LA_NM_000_low_MNO_100.png'}, {name:'12R_blob_LA_M_019_fill_PQR_95.png'}, {name:'13R_blob_HA_M_018_fill_EFG_110.png'}, {name:'14R_blob_HA_NM_037x3_fill_ABD_60.png'}, {name:'15R_blob_HA_NM_020_outer_ABD_75.png'}, {name:'16R_square_HA_M_size02xx_pos1_70.png'}, {name:'17R_square_HA_NM_size05xx_pos2_130.png'}, {name:'18R_square_HA_NM_size25_pos3_130.png'}, {name:'19R_square_LA_M_esize02xx_pos1_75.png'}, {name:'20R_square_LA_M_esize04xx_pos1_35.png'}, {name:'21R_square_LA_NM_esize01xx_pos3_160.png'}, {name:'22R_blob_LA_M_018_low_PQR_55.png'}, {name:'23R_blob_LA_NM_021_low_MNO_50.png'}, {name:'24R_blob_LA_NM_019_fill_MNO_125.png'}];
                var testAnswers = [  'j', 'j', 'f', 'j', 'f', 'j', 'j', 'j', 'j', 'j', 'j', 'f', 'f', 'j', 'j', 'f', 'j', 'j', 'f', 'f', 'j', 'f', 'j', 'j', 'j', 'j', 'j', 'j', 'f', 'j', 'f', 'j', 'j', 'f', 'f', 'j', 'f', 'f', 'f', 'f', 'j', 'j', 'j', 'j', 'j', 'j', 'f', 'f', 'f', 'f', 'f', 'j', 'j', 'f', 'f', 'f', 'j', 'j', 'f', 'j', 'j', 'j', 'f', 'f', 'j', 'f', 'j', 'f', 'f', 'j', 'f', 'j',
                                    'f', 'f', 'j', 'f', 'f', 'f', 'f', 'f', 'f', 'j', 'j', 'j', 'j', 'f', 'j', 'f', 'f', 'j', 'j', 'j', 'j', 'f', 'j', 'j', 'f', 'j', 'j', 'j', 'f', 'f', 'f', 'j', 'j', 'f', 'j', 'j', 'f', 'j', 'f', 'f', 'f', 'f', 'f', 'f', 'j', 'j', 'j', 'f', 'f', 'j', 'j', 'j', 'f', 'f', 'j', 'f', 'j', 'f', 'f', 'j', 'f', 'j', 'f', 'j', 'f', 'j', 'j', 'f', 'j', 'f', 'j', 'f', 'f', 'j', 'j', 'f',
                                    'f', 'j', 'f', 'f', 'f', 'j', 'j', 'f', 'f', 'j', 'j', 'j', 'j', 'f', 'j', 'f', 'f', 'f', 'j', 'j', 'j', 'f', 'j', 'f', 'f', 'f', 'j', 'j', 'j', 'j', 'j', 'j', 'f', 'f', 'j', 'f', 'f', 'f', 'j', 'j', 'j', 'j', 'j', 'f', 'f', 'j', 'j', 'f', 'f', 'f', 'j', 'j', 'f', 'f', 'j', 'j', 'f', 'f', 'f', 'f', 'f', 'j', 'j', 'f', 'f', 'j', 'j', 'f', 'j', 'f', 'f', 'j', 'f', 'f', 'j', 'j']                   
               var configdata = [
                   { 
                    screen: "0", startDuration: -1, endDuration: 9999920000, isTouch:true, content: '<div class="title ">' + $A.get("$Label.c.game_first_screen_text_a") + ' <span> ' + gameName + ' </span>' +'</div>'
                    + '<div class="title">'+ $A.get("$Label.c.game_first_screen_text_2") + ' <span> ' + gameTime + ' </span> ' + $A.get("$Label.c.game_first_screen_text_3_a") + '</div>'
                    + '<div class="title">'+ $A.get("$Label.c.game_first_screen_text_3_b") +' </div>'
                    + '<div class="title">'+ $A.get("$Label.c.games_get_started_text_1") +' </div>'
                    + '<p class="centers mb10 s-b-instraction">'+ $A.get("$Label.c.games_spacebar_text_3") +' </p>'
                    + '<span class="game-lang">English</span> ', instructionsLeft:true, command: [32, 32]
                    },
                    { screen:"1", startDuration:-1, endDuration:0, isTouch:true, content:'<div class="title ">  <span> ' + $A.get("$Label.c.games_instruction_text") + ' </span> </div>'+
                    '<div class="title">'+ $A.get("$Label.c.object_game_text_0_a") +'</div>'+
                    '<div class="title">'+ $A.get("$Label.c.object_game_text_0_b") +'</div>'+
                    '<div class="title ">'+ $A.get("$Label.c.object_game_text_1") +'</div>'+ 
                    '<div class="centers arrowdt"><div class="w50"><span class="n-g-box ">blobs</span> <ul class="blobsimg marginT24"><li class="bl1_2" style="background-image:url('+image_path+'blobs1_2.png?v=3);"></li></ul></div>'+
                    '<div class="w50"><span class="n-g-box ">squares</span><ul class="sqrimg marginT24"><li class="bl1_2" style="background-image:url('+image_path+'sqr1_2.png?v=3);"></li></ul></div></div>'+ 
                
                    '<p class="centers s-b-instraction">'+ $A.get("$Label.c.games_spacebar_text_1") +' </p>' , instructionsLeft:true, command: [32,32]},
                
                    { screen:"2", startDuration:-1, endDuration:0, isTouch:true, content:
                    '<div class="centers arrowdt"><div class="w50"><span class="n-g-box ">blobs</span> <ul class="blobsimg marginT24"><li class="bl1_2" style="background-image:url('+image_path+'blobs1_2.png?v=3);"></li></ul></div>'+
                    '<div class="w50"><span class="n-g-box ">squares</span><ul class="sqrimg marginT24"><li class="bl1_2" style="background-image:url('+image_path+'sqr1_2.png?v=3);"></li></ul></div></div>'+ 
                    '<div class="title">'+ $A.get("$Label.c.object_game_text_2") +'</div>'+
                    '<div class="title">'+ $A.get("$Label.c.object_game_text_2a") +'</div>'+  
                    '<p class="centers s-b-instraction">'+ $A.get("$Label.c.games_spacebar_text_1") +' </p>' , instructionsLeft:true, command: [32,32]},
                
                
                    { screen:"3", startDuration:-1, endDuration:0, isTouch:true, content:'<div class="title">'+ $A.get("$Label.c.object_game_text_10") +'</div>'+
                    '<div class="title">'+ $A.get("$Label.c.object_game_text_10_a") +'</div>'+
                    '<div class="centers arrowdt"><div class="w100"><ul class="blobsimg2"><li class="bl1_2" style="background-image:url('+image_path+'ppattern_3.png?v=3);"></li></ul></div></div>'+ 
                    '<div class="title">'+ $A.get("$Label.c.object_game_text_9") +'</div>'+
                    '<div class="title">'+ $A.get("$Label.c.object_game_text_9_a") +'</div>'+
                    '<p class=" centers s-b-instraction">'+ $A.get("$Label.c.games_spacebar_text_1") +' </p>' , instructionsLeft:true, command: [32,32]},
                
                
                    { screen:"4", startDuration:-1, endDuration:0, isTouch:true, content:'<div class="title">'+ $A.get("$Label.c.object_game_text_12") +'</div>'+ 
                    '<div class="centers arrowdt mb20"><div class="w100"><ul class="cenimg"><li class="sqi1_2" style="background-image:url('+image_path+'sqr1_2.png?v=3);"></li></ul></div></div>'+
                    '<div class="title">'+ $A.get("$Label.c.object_game_text_13") +'</div>'+ 
                    '<p class=" centers s-b-instraction">'+ $A.get("$Label.c.games_spacebar_text_1") +' </p>', instructionsLeft:true, command: [32,32]
                    },
                
                    { screen:"5", startDuration:-1, endDuration:0, isTouch:true, content:'<div class="title">'+ $A.get("$Label.c.object_game_text_8") +'</div>'+
                    '<div class="title">'+ $A.get("$Label.c.object_game_text_14") +'</div>'+
                    '<div class="title">'+ $A.get("$Label.c.object_game_text_15") +'</div>'+
                    '<ul class="j-center"><li><span class="n-g-box big">F</span><br> <span>Same</span></li><li>         <span class="n-g-box big">J</span><br><span>Different</span></li></ul>'+
                    '<p class=" centers s-b-instraction">'+ $A.get("$Label.c.games_spacebar_text_2") +' </p>', instructionsLeft:true, command: [32,32]
                    },
                
                    { screen:"6", startDuration:-1, endDuration:0, isTouch:true, content:
                    '<ul class="j-center"><li><span class="n-g-box big">F</span><br> <span>Same</span></li><li>         <span class="n-g-box big">J</span><br><span>Different</span></li></ul>'+
                
                    '<div class="title">'+ $A.get("$Label.c.object_game_text_16") +'</div>'+
                    '<div class="title">'+ $A.get("$Label.c.object_game_text_16_a") +'</div>'+
                    '<div class="title">'+ $A.get("$Label.c.object_game_text_16_b") +'</div>'+
                    '<div class="title">'+ $A.get("$Label.c.object_game_text_22") +'</div>'+ 
                    '<div class="title">'+ $A.get("$Label.c.object_game_text_23") +'</div>'+
                    '<p class=" centers s-b-instraction">'+ $A.get("$Label.c.games_spacebar_text_2") +' </p>', instructionsLeft:true, command: [32,32]
                    },
                
                
                    { screen:"7", startDuration:1, endDuration:0, content:'<p id="resulttxt" class="centers"></p>'+
                    '<div class="objque"><ul>'+
                    '<li class="objbox" style="background-image:url('+image_path+'S_2_2/24/1L_blob_HA_NM_018_inner_ABC_0.png?v=3);"></li>'+
                    '<li class="objbox" style="background-image:url('+image_path+'S_2_2/24/1R_blob_HA_NM_018_inner_ABD_145.png?v=3);"></li>'+
                    '</ul></div>'+
                    '<div class="btninputbox"><ul class="btninputbx">' +
                    '<li><div class="btninputf objectInput" data-input="F" data-key="70"></div></li>'+
                    '<li><div class="btninputj objectInput" data-input="J" data-key="74"></div></li>'+
                    '</ul></div>',
                    command: [70,74],
                    result: true,
                    answer: 'j',
                    black: true,
                    question: 1,
                    isPractice: true,
                    round: 0,
                    Limage: '1L_blob_HA_NM_018_inner_ABC_0.png',
                    Rimage: '1R_blob_HA_NM_018_inner_ABD_145.png'
                    }
                
                ];
                
               
                
                function preparePRImages(){
                    
                    for(var i=0; i<24; i++){
                       // preloadImageArray.push(image_path_PR + array[i].name);
                        prData.push({
                            screen: "2", startDuration: 1, endDuration: 0, content: '<p id="resulttxt" class="centers"></p>'+
                            '<div class="objque"><ul>'+
                            '<li class="objbox" style="background-image:url('+image_path+'S_2_2/24/'+prLeftImages[i]+'?v=3);"></li>'+
                            '<li class="objbox" style="background-image:url('+image_path+'S_2_2/24/'+prRightImages[i]+'?v=3);"></li>'+
                            '</ul></div>'+
                            '<div class="btninputbox"><ul class="btninputbx">' +
                            '<li><div class="btninputf objectInput" data-input="F" data-key="70"></div></li>'+
                            '<li><div class="btninputj objectInput" data-input="J" data-key="74"></div></li>'+
                            '</ul></div>',
                            command: [70, 74], result: true, answer: testAnswers[i], black: true, question: i+1, isPractice: true, isTest: false, round: 0,
                            Limage: prLeftImages[i], Rimage: prRightImages[i]   
                        });
                    }
                }

                function prepareMainImages(){
                    
                    for(var i=0; i<200; i++){
                       // preloadImageArray.push(image_path_PR + array[i].name);
                        finalTestArr.push({
                            screen: "2", startDuration: 1, endDuration: 5500, content: '<p id="resulttxt" class="centers"></p>'+
                            '<div class="objque"><ul>'+
                            '<li class="objbox" style="background-image:url('+image_path+'S_2_2/24/'+leftImages[i]+'?v=3);"></li>'+
                            '<li class="objbox" style="background-image:url('+image_path+'S_2_2/24/'+rightImages[i]+'?v=3);"></li>'+
                            '</ul></div>'+
                            '<div class="btninputbox"><ul class="btninputbx">' +
                            '<li><div class="btninputf objectInput" data-input="F" data-key="70"></div></li>'+
                            '<li><div class="btninputj objectInput" data-input="J" data-key="74"></div></li>'+
                            '</ul></div>',
                            command: [70, 74], result: true, answer: testAnswers[i+24], black: true, question: i+1, isPractice: false, isTest: true, round: 1,
                            Limage: leftImages[i], Rimage: rightImages[i]   
                        });
                    }
                }
                
                //prepare main Study
                
                function prepareMainStudy(array, mainStudyCount){
                    console.log("in main study");
                    for(var i=0; i<32; i++){
                        preloadImageArray.push(image_path_set1 + array[i].name);
                        finalStudyArr.push({
                            screen: "2", startDuration: 1, endDuration: screenWaitTime, content: '<p id="resulttxt" class="centers"></p>' +
                            '<div class="objque">' +
                            '<div class="objbox" id="imagedata" style="background-image:url(' + image_path_set1 + array[i].name +');"></div>' +
                            
                            '<div class="btninputbox"><ul class="btninputbx">' +
                            '<li>Indoor<div class="btninput img-f">F</div></li>' +
                            '<li>Outdoor<div class="btninput img-j">J</div></li>' +
                            '</ul></div>' +
                            '</div>',
                            command: [70, 74], result: true, answer: 'f', question: 1, isPractice: true, white:true, trial: 'Main_Study_'+mainStudyCount+'', isTest: false, round: 0,
                            name: array[i].name   
                        });
                    }
                }
                
                //prepare prTest array
                function preparePRTest(array, toArray, testCount){ 
                    console.log('testCount : ', testCount);
                    let trial = 'prtest_1';
                    if(testCount == 0){
                        console.log('testCount : ', testCount);
                        trial = 'prtest_1';
                    }else if(testCount == 4){
                        console.log('testCount : ', testCount);
                        trial = 'prtest_2';
                    }else if(testCount == 8){
                        console.log('testCount : ', testCount);
                        trial = 'prtest_3';
                    }
                    for(var i=0; i<4; i++){
                        //preloadImageArray.push(image_path_PR + array[prTestLgc[i].left+testCount].name );
                        toArray.push({
                            screen: "2", startDuration: 1, endDuration: screenWaitTime, content: '<p id="resulttxt" class="centers"></p>' +
                            '<div class="objque">' +
                            '<div class="objbox image-left" id="imagedata" style="background-image:url(' + image_path_PR + array[prTestLgc[i].left+testCount].name +');"></div>' +
                             '<div class="objbox image-right" id="imagedata1" style="background-image:url(' + image_path_PR + array[prTestLgc[i].right+testCount].name +');"></div>' +
                            '<div class="btninputbox"><ul class="btninputbx">' +
                            '<li>Left<div class="btninput img-f">F</div></li>' +
                            '<li>Right<div class="btninput img-j">J</div></li>' +
                            '</ul></div>' +
                            '</div>',
                            command: [70, 74], result: true, answer: prTestLgc[i].answer, question: 1, isPractice: true, white:true, trial: trial, isTest: true,
                            leftImageName: array[prTestLgc[i].left+testCount].name, rightImageName: array[prTestLgc[i].right+testCount].name, round: 0,
                            leftImagePosition: prTestLgc[i].left+testCount, rightImagePosition: prTestLgc[i].right+testCount, lagCategory: prTestLgc[i].lagCategory  
                        });
                
                    }
                    
                }
                
                //Prepare master array for temporal game.
                
                function prepareMasterArray(array, subArrayLimit){
                    let elmntCount = 0;
                    var imageSet = [];
                    var subImgSet = [];
                    for(var i=0; i<10; i++){
                        for(var j=elmntCount; j<elmntCount+subArrayLimit; j++){
                        subImgSet.push(array[j]);
                        }
                        elmntCount = (i+1)*subArrayLimit;
                        imageSet.push(subImgSet);
                        subImgSet = [];
                    }
                    console.log("masterImages : ", imageSet);
                    return imageSet;
                }
                
                function prepareMainStudyAndTest(mainArray){
                    for(var i=0; i<3; i++){
                        prepareContentScreen(configdata, 'finalStudy', i+1);
                        prepareMainStudy(mainArray[i],i+1);
                        addingItemsToConfigData(finalStudyArr, configdata, true, true);
                        finalStudyArr = [];
                        
                        prepareMainTest(mainArray[i], i+1);
                        arrayOfRandomImages(finalTestArr);
                        prepareContentScreen(configdata, 'finalTest');
                        prepareContentScreen(configdata, 'finalTest1');
                        addingItemsToConfigData(finalTestArr, configdata, true, false);
                        finalTestArr = [];
                    }
                    
                }
                
                //Function for preparing final test.
                
                /* function prepareMainStudy(array){
                    for(var i=0; i<array.length; i++){
                        configdata.push({
                            screen: "2", startDuration: 1, endDuration: screenWaitTime, content: '<p id="resulttxt" class="centers"></p>' +
                            '<div class="objque">' +
                            '<div class="objbox image-left" id="imagedata" style="background-image:url(' + image_path_set1 + array[i].name +');"></div>' +
                             '<div class="objbox image-right" id="imagedata" style="background-image:url(' + image_path_set1 + array[i].name +');"></div>' +
                            '<div class="btninputbox"><ul class="btninputbx">' +
                            '<li>Old<div class="btninput img-f">F</div></li>' +
                            '<li>New<div class="btninput img-j">J</div></li>' +
                            '</ul></div>' +
                            '</div>',
                            command: [70, 74], result: true, answer: finalTestLgc[i].answer, question: 1, isPractice: false, white:true,
                                name: array[i].name
                        });
                } */
                
                //Function for preparing final test.
                
                function prepareMainTest(array, mainTestCount){
                    for(var i=0; i<16; i++){
                        finalTestArr.push({
                            screen: "2", startDuration: 1, endDuration: screenWaitTime, content: '<p id="resulttxt" class="centers"></p>' +
                            '<div class="objque">' +
                            '<div class="objbox image-left" id="imagedata" style="background-image:url(' + image_path_set1 + array[finalTestLgc[i].left].name +');"></div>' +
                             '<div class="objbox image-right" id="imagedata1" style="background-image:url(' + image_path_set1 + array[finalTestLgc[i].right].name +');"></div>' +
                            '<div class="btninputbox"><ul class="btninputbx">' +
                            '<li>Left<div class="btninput img-f">F</div></li>' +
                            '<li>Right<div class="btninput img-j">J</div></li>' +
                            '</ul></div>' +
                            '</div>',
                            command: [70, 74], result: true, answer: finalTestLgc[i].answer, question: 1, isPractice: false, white:true, trial: 'Main_Test_'+mainTestCount+'',
                            leftImageName: array[finalTestLgc[i].left].name, rightImageName: array[finalTestLgc[i].right].name, isTest: true, round: mainTestCount,
                                leftImagePosition: finalTestLgc[i].left, rightImagePosition: finalTestLgc[i].right, lagCategory: finalTestLgc[i].lagCategory     
                        });
                    }
                }	
                
                
                
                
                //Preparing content screen.
                function prepareContentScreen(destinationArray, instrScrTyp, fianlTestCount){
                    let screenNo = destinationArray.length.toString();
                   // let perCount = '40%';
                    if(instrScrTyp == 'prTestInst'){
                        destinationArray.push({
                
                            screen: screenNo , startDuration: -1, endDuration: 0, isTouch:true, content:'<div class="title"><span>PRACTICE TEST </span></div><div class="title">  <span> ' + $A.get("$Label.c.mst_text_8") + ' </span> </div>'+
                                    '<div class="title">' + $A.get("$Label.c.mst_text_9_b") + '</div>' +
                                    '<div class="title">' + $A.get("$Label.c.games_ready_text") + '</div>' +
                                    '<p class="centers s-b-instraction">' + $A.get("$Label.c.games_spacebar_text_2") + '</p>', instructionsLeft:true, command: [32, 32]
                
                        });
                
                    }else if(instrScrTyp == 'finalStudy'){
                        prctCount=fianlTestCount;
                        let customLabelformstreal="";
                        let customLabelformstrealRound="";
                        if(prctCount==1){
                            customLabelformstreal=$A.get("$Label.c.objTimefinalStudy01");
                            customLabelformstrealRound=$A.get("$Label.c.objTimefinalStudy04");
                        }
                        else if(prctCount==2){
                            customLabelformstreal=$A.get("$Label.c.objTimefinalStudy01a");
                            customLabelformstrealRound=$A.get("$Label.c.objTimefinalStudy04a");
                        }
                        else if(prctCount==3){
                            customLabelformstreal=$A.get("$Label.c.objTimefinalStudy01b");
                            customLabelformstrealRound=$A.get("$Label.c.objTimefinalStudy04b");
                        }
                        destinationArray.push({
                
                            /* screen: screenNo , startDuration: -1, endDuration: 0, isTouch:true, content:'<div class="title"><span> STUDY  '+fianlTestCount+'/3</span></div><div class="title">  <span> ' + $A.get("$Label.c.mst_text_8") + ' </span> </div>'+
                                    '<div class="title">' + $A.get("$Label.c.mst_text_9") + '</div>' +
                                    '<div class="title">' + $A.get("$Label.c.games_ready_text") + '</div>' +
                                    '<p class="centers s-b-instraction">' + $A.get("$Label.c.games_spacebar_text_2") + '</p>', command: [32, 32]
                 */
                                screen: screenNo, startDuration: -1, endDuration: 0, isTouch:true, content: '<div  class="title">' + customLabelformstreal + '</div>' +
                                '<div  class="title">' + $A.get("$Label.c.objTimefinalStudy02") + '</div>' +
                                '<div  class="title">' + $A.get("$Label.c.objTimefinalStudy03") + '</div>' +
                                '<div  class="title">' + customLabelformstrealRound + '</div>' +
                                '<div  class="title">' + $A.get("$Label.c.mst_text_9_0") + '</div>' +
                                '<div  class="title">' + $A.get("$Label.c.mst_text_9_1") + '</div>' +
                                '<div class="title">' + $A.get("$Label.c.games_ready_text") + '</div>' +
                                '<p class="centers s-b-instraction">' + $A.get("$Label.c.games_spacebar_text_2") + '</p>', instructionsLeft:true, command: [32, 32]
                        });
                if(finalStudyScrCnt==0){
                
                     //   finalStudyScrCnt = configdata.length + destinationArray.length-1;
                     finalStudyScrCnt =  destinationArray.length-1;
                        console.log('finalStudyScrCnt : ', finalStudyScrCnt);
                        console.log('screenNo : ', screenNo);
                    }
                    }else if(instrScrTyp == 'finalTest'){
                        destinationArray.push({
                
                            /* screen: screenNo , startDuration: -1, endDuration: 0, isTouch:true, content:'<div class="title"><span> TEST </span></div><div class="title">  <span> ' + $A.get("$Label.c.mst_text_8") + ' </span> </div>'+
                                    '<div class="title">' + $A.get("$Label.c.mst_text_9_b") + '</div>' +
                                    '<div class="title">' + $A.get("$Label.c.games_ready_text") + '</div>' +
                                    '<p class="centers s-b-instraction">' + $A.get("$Label.c.games_spacebar_text_2") + '</p>', command: [32, 32]
                 */
                                screen: screenNo, startDuration: -1, endDuration: 0, isTouch:true, content: '<div class="title  ">  <span> ' + $A.get("$Label.c.games_instruction_text") + ' </span> </div>'+
                                '<div  class="title">' + $A.get("$Label.c.mst_text_time_12a") + '</div>' +
                                '<div  class="title">' + $A.get("$Label.c.mst_text_13_t_1") + '</div>' +
                                '<div  class="title">' + $A.get("$Label.c.mst_text_13_t_2") + '</div>' +
                                '<div  class="title">' + $A.get("$Label.c.mst_text_13_t_3") + '</div>' +
                                '<p class="centers s-b-instraction">' + $A.get("$Label.c.games_spacebar_text_1") + '</p>', instructionsLeft:true, command: [32, 32]
                        });
                
                    }else if(instrScrTyp == 'finalTest1'){
                        destinationArray.push({
                
                            screen: screenNo, startDuration: -1, endDuration: 0, isTouch:true, content: '<div class="title  ">  <span> ' + $A.get("$Label.c.games_instruction_text") + ' </span> </div>'+
                            '<div  class="title">' + $A.get("$Label.c.mst_text_21_t_1") + '</div>' +
                            '<div  class="title">' + $A.get("$Label.c.mst_text_21_t_2") + '</div>' +
                            '<div class="title">' + $A.get("$Label.c.games_ready_text") + '</div>' +
                            '<p class="centers s-b-instraction">' + $A.get("$Label.c.games_spacebar_text_2") + '</p>', instructionsLeft:true, command: [32, 32]
                        });
                
                    }else if(instrScrTyp == 'percentScreen'){
                        destinationArray.push({
                
                            screen: screenNo , startDuration: -1, endDuration: 0, isTouch:true, content:'<div class="title display-flex j-center ">  <div> You got </div> <div id="perCount" style="padding-left:5px; padding-right:5px; font-weight:bold;">' + perCount + '% </div> correct! </div> </div>'+
                            '<p class="centers s-b-instraction">' + $A.get("$Label.c.games_spacebar_text_1") + '</p>',  command: [32, 32]
                        });
                        prTestResultscreen =  destinationArray.length;
                        console.log('prTestResultscreen : ', prTestResultscreen);
                    }else if(instrScrTyp == 'endScreen'){
                        destinationArray.push({
                            screen: screenNo , startDuration: -1, endDuration: 0, isTouch:true, content: '<div class="title">' + $A.get("$Label.c.game_thanks_text_1") + ' <span> ' + gameName  + '. </span> ' + '</div>'+
                            '<div class="title ">' + $A.get("$Label.c.object_game_text_27") + '</div>'+                
                            '<div class="title">' + $A.get("$Label.c.game_thanks_text_2") + '</div>' , gameComplete:true, instructionsLeft:true, command: [32, 32]
                            // screen: screenNo , startDuration: -1, endDuration: 0, isTouch:true, content:'<div class="title">' + $A.get("$Label.c.mst_text_19_b") + '</div>' +
                            // '<p class="mb10 centers s-b-instraction">' + $A.get("$Label.c.games_spacebar_text_1") + '</p>', command: [32, 32],gameEnd:true
                        });
                
                    }else if(instrScrTyp == 'prStudyScreen'){
                        prctCount=fianlTestCount;
                        let customLabelformst="";
                        if(prctCount==1){
                            customLabelformst=$A.get("$Label.c.mst_text_8");
                        }
                        else if(prctCount==2){
                            customLabelformst=$A.get("$Label.c.mst_text_8a");;
                        }
                        else if(prctCount==3){
                            customLabelformst=$A.get("$Label.c.mst_text_8b");;
                        }
                        destinationArray.push({
                
                            //screen: screenNo , startDuration: -1, endDuration: 0, isTouch:true, content:'<div class="title"><span>PRACTICE '+fianlTestCount+' <br> STUDY </span></div>' +
                            //'<p class="mb10 centers s-b-instraction">' + $A.get("$Label.c.games_spacebar_text_1") + '</p>', command: [32, 32]
                            screen: screenNo, startDuration: -1, endDuration: 0, isTouch:true, content: '<div  class="title">' + customLabelformst + '</div>' +
                            '<div  class="title">' + $A.get("$Label.c.mst_text_9_0") + '</div>' +
                            '<div  class="title">' + $A.get("$Label.c.mst_text_9_1") + '</div>' +
                            '<div class="title">' + $A.get("$Label.c.games_ready_text") + '</div>' +
                            '<p class="centers s-b-instraction">' + $A.get("$Label.c.games_spacebar_text_2") + '</p>', instructionsLeft:true, command: [32, 32]
                        });
                
                    }else if(instrScrTyp == 'prTestScreen'){
                        destinationArray.push({
                
                           // screen: screenNo , startDuration: -1, endDuration: 0, isTouch:true, content:'<div class="title"><span>PRACTICE '+fianlTestCount+' <br> TEST </span></div>' +
                           // '<p class="mb10 centers s-b-instraction">' + $A.get("$Label.c.games_spacebar_text_1") + '</p>', command: [32, 32]
                           screen: screenNo, startDuration: -1, endDuration: 0, isTouch:true, content: '<div class="title  ">  <span> ' + $A.get("$Label.c.games_instruction_text") + ' </span> </div>'+
                           '<div  class="title">' + $A.get("$Label.c.mst_text_12") + '</div>' +
                           '<div  class="title">' + $A.get("$Label.c.mst_text_13_t_1") + '</div>' +
                           '<div  class="title">' + $A.get("$Label.c.mst_text_13_t_2") + '</div>' +
                           '<div  class="title">' + $A.get("$Label.c.mst_text_13_t_3") + '</div>' +
                           '<p class="centers s-b-instraction">' + $A.get("$Label.c.games_spacebar_text_1") + '</p>', instructionsLeft:true, command: [32, 32]
                        });
                
                    }else if(instrScrTyp == 'prTestScreen1'){
                        destinationArray.push({
                
                            //screen: screenNo , startDuration: -1, endDuration: 0, isTouch:true, content:'<div class="title"><span>PRACTICE '+fianlTestCount+' <br> TEST </span></div>' +
                            //'<p class="mb10 centers s-b-instraction">' + $A.get("$Label.c.games_spacebar_text_1") + '</p>', command: [32, 32]
                            screen: screenNo, startDuration: -1, endDuration: 0, isTouch:true, content: '<div class="title  ">  <span> ' + $A.get("$Label.c.games_instruction_text") + ' </span> </div>'+
                           '<div  class="title">' + $A.get("$Label.c.mst_text_21_t_1") + '</div>' +
                           '<div  class="title">' + $A.get("$Label.c.mst_text_21_t_2") + '</div>' +
                           '<div class="title">' + $A.get("$Label.c.games_ready_text") + '</div>' +
                           '<p class="centers s-b-instraction">' + $A.get("$Label.c.games_spacebar_text_2") + '</p>', instructionsLeft:true, command: [32, 32]
                        });
                
                    }
                    
                
                }
                
                
                //Adding elements to Study and Test arrays
                // function addingItems(array , count , startIndex , imagePath1, imagePath2, isStudy){
                    
                // 	let max = startIndex+count;
                // 	var temp = {  screen: "2", startDuration: 1, endDuration: screenWaitTime, content: '',
                //     command: [70, 74], result: true, answer: 'f', question: 1, isPractice: true, white:true,
                //     name: ''
                //     };
                    
                //     //const elmnt = temp;
                    
                // 	if(isStudy){
                // 		for(var i=startIndex; i<max; i++){
                        
                       
                //         temp = array[i].name;
                //        // console.log('test 123', temp);
                //         //console.log('test 123', elmnt.name);
                //         //configdata.push(elmnt);
                //         preloadImageArray.push(imagePath1 + temp);
                //         studyData.push({
                //             screen: "2", startDuration: 1, endDuration: screenWaitTime, content: '<p id="resulttxt" class="centers"></p>' +
                //             '<div class="objque">' +
                //             '<div class="objbox" id="imagedata" style="background-image:url(' + imagePath1 + temp +');"></div>' +
                //             '<div class="btninputbox"><ul class="btninputbx">' +
                //             '<li>Indoor<div id="img-f" class="btninput img-f">F</div></li>' +
                //             '<li>Outdoor<div class="btninput img-j">J</div></li>' +
                //             '</ul></div>' +
                //             '</div>',
                //             command: [70, 74], result: true, answer: 'j', question: 1, isPractice: true, white:true,
                //             name: array[i].name   
                //         });
                        
                // 		let bDElmntName = array[i].name.replace("a_", "b_");   
                //         preloadImageArray.push(imagePath2 + bDElmntName);
                //         testData.push({
                //             screen: "2", startDuration: 1, endDuration: screenWaitTime, content: '<p id="resulttxt" class="centers"></p>' +
                //             '<div class="objque">' +
                //             '<div class="objbox" id="imagedata" style="background-image:url(' + imagePath2 + bDElmntName +');"></div>' +
                //             '<div class="btninputbox"><ul class="btninputbx">' +
                //             '<li>Old<div class="btninput img-f">F</div></li>' +
                //             '<li>New<div class="btninput img-j">J</div></li>' +
                //             '</ul></div>' +
                //             '</div>',
                //             command: [70, 74], result: true, answer: 'f', question: 1, isPractice: false, white:true,
                //                 name: array[i].name.replace("a_", "b_")
                //         });
                
                // 		//testData.push(elmnt);
                
                            
                // 		}
                        
                // 	}else{
                // 		for(var i=startIndex; i<max; i++){
                        
                // 		let tempName = array[i].name.replace("a_", "b_");
                //         preloadImageArray.push(imagePath1 +tempName);
                //         testData.push({
                //             screen: "2", startDuration: 1, endDuration: screenWaitTime, content: '<p id="resulttxt" class="centers"></p>' +
                //             '<div class="objque">' +
                //             '<div class="objbox" id="imagedata" style="background-image:url(' + imagePath1 +tempName+');"></div>' +
                //             '<div class="btninputbox"><ul class="btninputbx">' +
                //             '<li>Old<div class="btninput img-f">F</div></li>' +
                //             '<li>New<div class="btninput img-j">J</div></li>' +
                //             '</ul></div>' +
                //             '</div>',
                //             command: [70, 74], result: true, answer: 'j', question: 1, isPractice: false, white:true,
                //                 name: array[i].name.replace("a_", "b_")
                //         });
                // 		//testData.push(elmnt);
                // 		}
                // 	}
                        
                // }
                
                function addingItemsToConfigData(arr, toArray, isBlankScreen, isStudy){
                    let screenCount = toArray.length;
                    let blankScreen = { screen: "blank", startDuration: 0, endDuration: 500, content: '<p  class="centers"></p>' +
                    '<div class="objque">' +
                    '<div class="objbox" ></div>' +
                    '<div class="btninputbox"><ul class="btninputbx">' +
                    '<li>Indoor<div id="img-f" class="btninput img-f">F</div></li>' +
                    '<li>Outdoor<div class="btninput img-j">J</div></li>' +
                    '</ul></div>' +
                    '</div>',white:true };
                    if(!isStudy){
                        blankScreen = { screen: "blank", startDuration: 0, endDuration: 500, content: '<p  class="centers"></p>' +
                    '<div class="objque">' +
                    '<div class="objbox" ></div>' +
                    '<div class="btninputbox"><ul class="btninputbx">' +
                    '<li>Left<div id="img-f" class="btninput img-f">F</div></li>' +
                    '<li>Right<div class="btninput img-j">J</div></li>' +
                    '</ul></div>' +
                    '</div>',white:true };
                    }
                    for(var i= 0; i<arr.length; i++){
                        arr[i].screen = screenCount + i;
                        //arr[i].question = screenCount + i;
                        arr[i].question =  i+1;
                        arr[i].screen = arr[i].screen.toString();
                        toArray.push(arr[i]);
                        if(isBlankScreen){
                            blankScreen.screen = i+2;
                            toArray.push(blankScreen);
                        }
                    }
                }
                
                //making images Random.
                function randomValue(array){
                    
                    return Math.floor(Math.random()*(array.length-1));
                    }
                    
                    
                    function arrayOfRandomImages(array){
                        for(var i=0; i<array.length; i++){
                           // console.log('sssssssssssss', i);
                            let itemNumber = randomValue(array);
                            //console.log('sssssssssssss', itemNumber);
                            let item = array[i];
                            array[i] = array[itemNumber];
                            array[itemNumber] = item;
                        }
                    }
                
                //Preparing practice data
                console.log("before data prepared");
                preparePRImages();
               // prepareContentScreen(configdata, 'prStudyScreen', 1);
                addingItemsToConfigData(prData, configdata, true, true);
                console.log(prData);
                //prepareContentScreen(configdata, 'prTestScreen', 1);
                console.log("after practice");
                
                prepareMainImages();
                addingItemsToConfigData(finalTestArr, configdata, true, false );
                console.log(finalTestArr);
                console.log("after Test");
                prepareContentScreen(configdata, 'endScreen', 0);
                //prepareContentScreen(configdata, 'percentScreen', 0);
                //var prTestResultscreen1 = prTestResultscreen;
                
                /* preparePRStudy(prImages, prStudy2, 4, 4);
                prepareContentScreen(configdata, 'prStudyScreen', 2);
                addingItemsToConfigData(prStudy2, configdata, true, true);
                console.log(prStudy2);
                prepareContentScreen(configdata, 'prTestScreen', 2);
                prepareContentScreen(configdata, 'prTestScreen1', 2);
                //prepareContentScreen(configdata, 'prTestInst', 0);
                
                preparePRTest(prImages, prTest2, 4);
                addingItemsToConfigData(prTest2, configdata, true, false);
                console.log(prTest2);
                prepareContentScreen(configdata, 'percentScreen', 0);
                var prTestResultscreen2 = prTestResultscreen;
                
                preparePRStudy(prImages, prStudy3, 8, 4);
                prepareContentScreen(configdata, 'prStudyScreen', 3);
                addingItemsToConfigData(prStudy3, configdata, true, true);
                console.log(prStudy3);
                prepareContentScreen(configdata, 'prTestScreen', 3);
                prepareContentScreen(configdata, 'prTestScreen1', 3);
                //prepareContentScreen(configdata, 'prTestInst', 0);
                
                preparePRTest(prImages, prTest3, 8);
                addingItemsToConfigData(prTest3, configdata, true, false);
                console.log(prTest3);
                prepareContentScreen(configdata, 'percentScreen', 0);
                var prTestResultscreen3 = prTestResultscreen;
                
                
                //Creating the array with list of arrays having 32 images each.
                
                masterImagePairs = prepareMasterArray(imgs, 32);
                
                arrayOfRandomImages(masterImagePairs);
                
                prepareMainStudyAndTest(masterImagePairs); */
                
                
               
                
                
                console.log('configdata = ', configdata);
                let bgimages = [];
                let bgimages2 = [];
                var imgContainer = document.getElementById('imgContainer');
                
                console.log('preloadImageArray = ', preloadImageArray);
                function preloadImage(imgdata) {
                    for (var i = 0; i <= imgdata.length-1; i++) {
                        bgimages[i] = new Image();
                        bgimages[i].src = imgdata[i];
                        imgContainer.appendChild(bgimages[i]);
                    }  
                    
                    console.log('image load' , bgimages[1].src);
                }
                function preloadImage2(imgdata) {
                    
                    for (var i = 0; i <= imgdata.length-1; i++) {
                        bgimages2[i] = new Image();
                        bgimages2[i].src = imgdata[i];
                        imgContainer.appendChild(bgimages2[i]);
                        console.log('image load' , bgimages2[i].src);
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
                
                //console.log('fffffffffffffffffffffffffffffff : ');
                
                
                
                
                //configdata = JSON.stringify(configdata);
                //console.log('configdata = '+configdata[0]);
                //console.log('testData = '+testData[0]);
                 //This saveData function is used for creating record in ParticipantGameresponse object.
                 
                 function saveData(gameName, questionNumber, response, isCorrect, reactionTime, isPracticeQuestion, correctAnswer, trial,imageName, leftImagePosition, rightImagePosition, lagCategory, round) 
                 { 
                     console.log("Input Results all fields: ", userContactId, gameId, questionNumber, response, isCorrect, reactionTime, isPracticeQuestion, correctAnswer, participantGameInfoId, trial,imageName, leftImagePosition, rightImagePosition, lagCategory, round);
                       helper.recorData(component, event, helper, userContactId, gameId, questionNumber, response, isCorrect, reactionTime, isPracticeQuestion, correctAnswer, participantGameInfoId, trial,imageName, leftImagePosition, rightImagePosition, lagCategory, round);
                 }
                //save data for no responce
                /* function saveData(gameName, questionNumber, response, isCorrect, reactionTime, isPracticeQuestion, correctAnswer, trial, name) {
                    helper.recorData(component, event, helper, userContactId, gameId, questionNumber, response, isCorrect, reactionTime, isPracticeQuestion, correctAnswer, participantGameInfoId);
                   console.log('inside save data');
                    //questionNumber
                    // if (questionNumber == 192) {
                    //     document.getElementById("nextBtton").classList.remove("slds-hide");
                    // }
                    console.log("Input Results , trial,name ", gameName, questionNumber, response, isCorrect, reactionTime, isPracticeQuestion, new Date(), trial, name );
                } */
                
                //This startGame function get the gameid and create a participantGameInfo record and return record ID.
                function updateGameNameInParticipantGameInfo(gameId, participantGameInfoId, ipAddress, browserName, device) {
                    helper.gameNameInParticipantGameInfo(component, event, helper, userContactId, gameId, participantGameInfoId, ipAddress, browserName, device);//helper method calling here
                    console.log('gameNameInParticipantGameInfo :',userContactId, gameId, participantGameInfoId, ipAddress, browserName, device);
                }
                
                // This ensgame function works for the update participant gameInfo record like as end date time.
                function endGame(gameId, participantGameInfoId) {
                    var endDateTime = new Date();
                    var gamePlayStatus = "Completed";
                    helper.participantGameInfoUpdate(component, event, helper, userContactId, gameId, endDateTime, gamePlayStatus, participantGameInfoId);//helper method calling here.
                }
                
                
                //this function works for initialize processing.
                function changeScreen() {
                    
                    gameId = component.get("v.myAttribute");
                    userContactId = component.get("v.mycontactId");
                    ipAddress = component.get("v.ipAddress");
                    browserName = component.get("v.browser");
                
                    participantGameInfoId = component.get("v.participantGameid");//participantGameInfoId holds the participantgameinfo record id.
                
                    window.removeEventListener('keyup', gamePlay, false);
                    window.addEventListener('keyup', gamePlay, false);
                
                    timedata = new Date();
                   
                    //Remove below after prScore made dynamic.
                    //if(prTestResultscreen1 == currentScreent){
                      //  prScore = 60;
                    //}
                  //  console.log('prTestResultscreen1 ----- : ', prTestResultscreen1, ' currentScreent = ', currentScreent);
                    if(prTestResultscreen1==currentScreent || prTestResultscreen2==currentScreent ||
                        prTestResultscreen3==currentScreent    ){
                            // prScore = (prSuccessCount/4)*100;
                            console.log('prTestResultscreen1 --inside--- : ', prTestResultscreen1, ' currentScreent = ', currentScreent);
                          //  console.log('prScore : ', prScore, ' finalStudyScrCnt = ', finalStudyScrCnt);
                            if(prScore >= 60 ){
                                console.log('inside more 60');
                                currentScreent = finalStudyScrCnt;
                            }
                            prSuccessCount = 0;
                            perCount = 0;
                            prScore = 0; 
                    }
                    //console.log('currentScreent : ', configdata[currentScreent].content);
                    document.getElementById("datablock_mst").innerHTML = configdata[currentScreent].content;
                    if (configdata[currentScreent].gameComplete == true) {
                        document.getElementById("nextBtton").classList.remove("slds-hide");
                    }
                    if(prTestResultscreen1==currentScreent+1 || prTestResultscreen2==currentScreent+1 ||
                        prTestResultscreen3==currentScreent+1    ){
                        document.getElementById("perCount").innerHTML = prScore + '%';
                    }
                    //alligning the instruction content to left.
                    if (configdata[currentScreent].instructionsLeft == true) {
                        document.getElementById("gameMainContent").classList.add("instructionsLeft");
                    }else{
                        document.getElementById("gameMainContent").classList.remove("instructionsLeft"); 
                    }
                     //Changes for touch
                     if(device !="DESKTOP"){
                        document.getElementById("datablock_mst").removeEventListener('click',gotoNextScreen,false);     
                        if(configdata[currentScreent].hasOwnProperty('isTouch')){
                            document.getElementById("datablock_mst").addEventListener('click',gotoNextScreen,false);
                        }
                    }
                
                    if(configdata[currentScreent].hasOwnProperty('white')){
                        document.getElementById("gameBox").classList.add("white");
                     }else{
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
                
                        console.log('outside data isResult ',isResult);
                        if (lastdata.length <= 0 && isResult == true) {
                            console.log('inside result changescr ',configdata[currentScreent - 1].isTest);
                            //Result Data
                            if(configdata[currentScreent - 1].isTest){
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
                            }else{
                                console.log('in else', configdata[currentScreent - 1].question);
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
                                //console.log('precount logic : ', inputdata.toLowerCase() == configdata[currentScreent - 1].answer);
                                 resultData[configdata[currentScreent - 1].screen]["status"] = "true";
                                
                             } else {
                                 resultData[configdata[currentScreent - 1].screen]["status"] = "false";
                             }

                
                            //Save Output Events
                            let currentgamedata = resultData[configdata[currentScreent - 1].screen];
                            console.log('configdata[currentScreent - 1].isTest :', configdata[currentScreent - 1].isTest);
                            let imgName = {};
                            if(configdata[currentScreent - 1].isTest){
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
                            }else{
                               // console.log("in else round: ", currentgamedata.round);
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
                
                    //Initial and end Game
                    if (currentScreent == 6) {
                        updateGameNameInParticipantGameInfo(gameId, participantGameInfoId, ipAddress, browserName, device);
                        console.log('updateGameNameInParticipantGameInfo :',gameId, participantGameInfoId, ipAddress, browserName, device);
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
                            //console.log('ddddddddddddddd')
                            lastdatatitle = "";
                        currentScreent = currentScreent + 1;
                    } else {
                       // console.log('sssssssssssssssssssssssss')
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
                        window.location.href = $A.get("$Label.c.Community_Url")+"/s/me-objects-spatial";
                    }
                    
                    command_value = e.keyCode;
                    inputdata = e.key;
                    let startDurations = configdata[currentScreent - 1].startDuration;
                
                    console.log(inputdata);
                    if(inputdata.toLocaleLowerCase() == 'f' && document.getElementById('imgf') != null){
                        document.getElementById('imgf').classList.add("img-f-select");
                    }
                    if(inputdata.toLocaleLowerCase() == 'j' && document.getElementById('imgj') !=null){
                        document.getElementById('imgj').classList.add("img-f-select");
                    }
                    window.setTimeout(
                        $A.getCallback(function() {
                            if(document.getElementById('imgj') !=null){
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
                            console.log('inside result calc ', configdata[currentScreent - 1].trial);
                            if (!resultData.hasOwnProperty(configdata[currentScreent - 1].screen)) {
                                
                                //console.log('inside result calc ', configdata[currentScreent - 1].trial);
                                if(configdata[currentScreent - 1].isTest){
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
                                }else{
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
                                            if (configdata[currentScreent - 1].isPractice && configdata[currentScreent - 1].isTest ) {
                                                perCount++;
                                                prScore = (perCount/4)*100;
                                            }
                                           
                                        } else {
                                            resultData[configdata[currentScreent - 1].screen]["status"] = "false";
                                        }
                                        console.log('perCount = ', perCount);
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
                              
                                        if( configdata[currentScreent - 1].isPractice){
                                          //  lastdatatitle="Result";
                                          //  setTimeout(clearResult,(screenWaitTime-result_time)+4);
                
                                        }
                                        else{
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
                                    else{
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
                    console.log('f-key-press');
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
                function gotoNextScreen(e){
                    gamePlay({keyCode:32});
                }
                 //chnages for touch end


                }

                }
                else if(state==="ERROR"){
                    let message='';
                    let errors = response.getError();
                    if (errors && Array.isArray(errors) && errors.length > 0) {
                        message = errors[0].message;
                    }
                    console.error(message);
                }
                else{
                    console.log('else part');
                }
            });
            $A.enqueueAction(actionGame);

},

// this function works for 'goto next page' when the game reach to the last question.
// this function works for 'goto next page' when the game reach to the last question.
goToNextPage: function (component, event, helper) {
const urlParams = new URLSearchParams(document.location.search.substring(1));
const product = urlParams.get('c__id');
// window.location.href = "/research/s/complete" + '?' + 'id=' + product;
helper.allowLeaving();
window.location.href = $A.get("$Label.c.Community_Url")+"/s/"+ $A.get("$Label.c.url_dashboard");
},
goToMyResultsPage: function (component, event, helper) {
const urlParams = new URLSearchParams(document.location.search.substring(1));
const product = urlParams.get('c__id');
// window.location.href = "/research/s/complete" + '?' + 'id=' + product;
helper.allowLeaving();
window.location.href = $A.get("$Label.c.Community_Url") + "/s/"+ $A.get("$Label.c.url_myresults");
},
closeModel : function(component, event, helper) {
    console.log('No');
   // component.set('v.showConfirmDialog', false);
    window.location.href = $A.get("$Label.c.Community_Url") + '/s/'+$A.get("$Label.c.url_dashboard");
}


})