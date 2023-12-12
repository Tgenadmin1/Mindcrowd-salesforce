@isTest  public class GamesControllerTest 
{
    static testMethod void errorGameTest() 
    {
            String className='testingErrorr';
            String methodName='ErrorTest';
            String description='We are not getting any email.';
         Test.startTest();
         GamesController.logError( className,  methodName,  description);
         Test.stopTest();
    }
    @IsTest
static void testLogErrorException() {
    // Test a scenario where an exception is thrown
    Test.startTest();
    String className = 'TestClassName';
    String methodName = 'TestMethodName';
    String description = 'Test Description';
    
    // Simulate an exception by passing invalid parameters
    String result = GamesController.logError(null, null, null);
    Test.stopTest();
    
    // Assert that the result is 'error'
    System.assertEquals('error', result, 'Expected error result');
}
  
    @IsTest
static void testLogErrorExceptionHandling() {

    Test.startTest();
    String className = 'TestClassName';
    String methodName = 'TestMethodName';
    String description = 'Test Description';
    GamesController.logError(className, methodName, description);
    Test.stopTest();
}
   @IsTest
static void saveGameResponseTest() {
     Contact con= new contact(lastname='Test1');
        insert con;
        Game_Detail__c game =new Game_Detail__c(Name='DLTRS');
        insert game;
        
        Game_Detail__c game2 =new Game_Detail__c(Name='PAIRED GAME');
        insert game2;
        
        
        string data ='{"Contact_Name__c":"'+con.Id+'", "Game_Name__c":"'+game.Id+'", "Question_Number__c":1, "Participant_Response__c":"d", "Is_Correct__c":"true", "Reaction_Time_in_ms__c":1515, "Is_Practice_Question__c":true}';    
        GamesController.saveGameResponse(data);
        data ='{"Contact_Name__c":"'+con.Id+'", "Game_Name__c":"'+game.Id+'", "Question_Number__c":1, "Participant_Response__c":"d", "Is_Correct__c":"pramod", "Reaction_Time_in_ms__c":1515, "Is_Practice_Question__c":true}';    
        GamesController.saveGameResponse(data);
        string gameName='xyz';
        GamesController.getGameId(gameName);
        GamesController.createPGI(con.id);
        GamesController.createPGI(con.id);
        GamesController.getContactId(con.id);
        GamesController.getProfileName(UserInfo.getUserId());
        string data2='{"Contact_Name__c":"'+con.Id+'", "Game_Name__c":"'+game.Id+'", "Question_Number__c":1, "Participant_Response__c":"d", "Is_Correct__c":"true", "Reaction_Time_in_ms__c":1515, "Is_Practice_Question__c":true}';
        GamesController.participantGameInfoDetail(data2);
        data2='{"Contact_Name__c":"'+con.Id+'", "Game_Name__c":"'+game.Id+'", "Game_Play_Status__c": "true"}';
        GamesController.participantGameInfoDetail(data2);
        string data3='{"Contact_Name__c":"'+con.Id+'", "Game_Name__c":"'+game.Id+'", "Game_Play_Status__c": "Completed"}';
        
        Participant_Game_Info__c pGI = new Participant_Game_Info__c();
            pGI.Contact_Name__c=con.Id;
            pGI.Game_Name__c=game.Id;
            pGI.IP_Address__c='103.147.0.90';
            pGI.Geolocation__Latitude__s=28.6328;
            pGI.Geolocation__Longitude__s=77.2204;
            //pGI.Time_Zone_Offset__c='+0530';
        insert pGI;
        
        string data4='{"Id":"'+pGI.Id+'","Contact_Name__c":"'+con.Id+'", "Game_Name__c":"'+game.Id+'", "Game_Play_Status__c": "Completed", "IP_Address__c":"103.147.0.222", "Geolocation__Latitude__s":"28.6328", "Geolocation__Longitude__s": "77.2204", "Time_Zone_Offset__c": "+0530", "City__c":"Mumbai", "Country__c":"India", "Region__c":"Maharashtra", "Zip_Code__c":"400070" }';
       // string results ='{\n    \"ip\": \"103.147.0.141\",\n    \"is_eu\": false,\n    \"city\": \"New Delhi\",\n    \"region\": \"National Capital Territory of Delhi\",\n    \"region_code\": \"DL\",\n    \"country_name\": \"India\",\n    \"country_code\": \"IN\",\n    \"continent_name\": \"Asia\",\n    \"continent_code\": \"AS\",\n    \"latitude\": 28.6328,\n    \"longitude\": 77.2204,\n    \"postal\": \"110001\",\n    \"calling_code\": \"91\",\n    \"flag\": \"https://ipdata.co/flags/in.png\",\n    \"emoji_flag\": \"\\ud83c\\uddee\\ud83c\\uddf3\",\n    \"emoji_unicode\": \"U+1F1EE U+1F1F3\",\n    \"languages\": [\n        {\n            \"name\": \"Hindi\",\n            \"native\": \"\\u0939\\u093f\\u0928\\u094d\\u0926\\u0940\"\n        },\n        {\n            \"name\": \"English\",\n            \"native\": \"English\"\n        }\n    ],\n    \"currency\": {\n        \"name\": \"Indian Rupee\",\n        \"code\": \"INR\",\n        \"symbol\": \"Rs\",\n        \"native\": \"\\u099f\\u0995\\u09be\",\n        \"plural\": \"Indian rupees\"\n    },\n    \"time_zone\": {\n        \"name\": \"Asia/Kolkata\",\n        \"abbr\": \"IST\",\n        \"offset\": \"+0530\",\n        \"is_dst\": false,\n        \"current_time\": \"2021-08-17T14:04:54.651393+05:30\"\n    },\n    \"threat\": {\n        \"is_tor\": false,\n        \"is_proxy\": false,\n        \"is_anonymous\": false,\n        \"is_known_attacker\": false,\n        \"is_known_abuser\": false,\n        \"is_threat\": false,\n        \"is_bogon\": false\n    },\n    \"count\": \"2\"\n}"}';
     
        string data8='{"Contact_Name__c":"'+con.Id+'", "Game_Name__c":"'+game.Id+'", "Id":"'+pGI.Id+'"}';
        GamesController.participantGameInfoUpdate(data8);
        GamesController.updatePGI(data8);
        
        IpAddressData__c IPD= new IpAddressData__c();
        IPD.Name='userOne';
        IPD.apiKey__c='8289ac328847197b92c5fa681c2168959470f6c0345d44c353e3cccd';
        IPD.url__c='https://api.ipdata.co/';
        insert IPD;
        
     	Test.startTest();    
        Test.setMock(HttpCalloutMock.class, new MockHttpResponseGenerator());
        GamesController.gameNameInParticipantGameInfoUpdate(data4);
        Test.stopTest();

    // Test a scenario where an exception is thrown when deserializing JSON
    Test.startTest();
    GamesController.saveGameResponse('Invalid JSON');
    Test.stopTest();

    // Test a scenario where the database query returns records
    Test.startTest();
    // Create a Participant_Game_Response__c record with matching attributes
    Participant_Game_Response__c testRecord = new Participant_Game_Response__c(
        Game_Name__c = game.Id,
        Question_Number__c = '1', 
        Participant_Game_InfoID__c = pGI.Id,
        Round__c = 'Round 1',
        Right_Answer__c = 'd'
    );
    insert testRecord;
    // Attempt to insert a new record with the same attributes
    string data1 = '{"Game_Name__c":"' + game.Id + '", "Question_Number__c":"1", "Participant_Game_InfoID__c":"' + String.valueOf(pGI.Id) + '", "Round__c":"Round 1", "Right_Answer__c":"d"}';
    GamesController.saveGameResponse(data1);
    Test.stopTest();
}

    public static testmethod void getIpCustomLoginUserTest() 
    {
        Test.startTest();
        GamesController.getIpCustomLoginUser();
        //GamesController.getExternalIp();
        Test.stopTest();
    }
    
    public static testmethod void getParticipantContactID_Test() 
    {
        contact con1= new contact();
        con1.FirstName='Test';
        con1.Email='test@abc.com';
        con1.Phone='769551';
        con1.LastName='Test';
        con1.Highest_level_of_education_completed__c='Up to 8 Years';
        con1.sex__c='Male';
        insert con1;
        Test.startTest();        
        contact con=[select id,ParticipantCode__c from contact where id=:con1.Id];
        GamesController.getParticipantContactID(con.ParticipantCode__c);     
        Test.stopTest(); 
    }
    
    public static testmethod void createBeanGameRecord_Test()
    {
        contact con1= new contact();
        con1.FirstName='Test';
        con1.Email='test@abc.com';
        con1.Phone='769551';
        con1.LastName='Test';
        con1.Highest_level_of_education_completed__c='Up to 8 Years';
        con1.sex__c='Male';
        insert con1;
            Bean_Game__c bean1=new Bean_Game__c();
            bean1.Contact__c=con1.id;
            bean1.DryRunTime__c='4:52.31';
            bean1.LeftHand_1_ExerciseDrops__c=1;
            bean1.LeftHand_1_ExerciseGoing__c='Yes, I forgot';
            bean1.LeftHand_1_ExerciseTime__c='4:52.31';
            bean1.LeftHand_2_ExerciseDrops__c=1;
            bean1.LeftHand_2_ExerciseGoing__c='Yes, I forgot';
            bean1.LeftHand_2_ExerciseTime__c='4:52.31';
            bean1.LeftHand_3_ExerciseDrops__c=1;
            bean1.LeftHand_3_ExerciseGoing__c='Yes, I forgot';
            bean1.LeftHand_3_ExerciseTime__c='4:52.31';
            bean1.LeftHand_4_ExerciseDrops__c=1;
            bean1.LeftHand_4_ExerciseGoing__c='Yes, I forgot';
            bean1.LeftHand_4_ExerciseTime__c='4:52.31';
            bean1.RightHand_1_ExerciseDrops__c=1;
            bean1.RightHand_1_ExerciseGoing__c='Yes, I forgot';
            bean1.RightHand_1_ExerciseTime__c='4:52.31';
            bean1.RightHand_2_ExerciseDrops__c=1;
            bean1.RightHand_2_ExerciseGoing__c='Yes, I forgot';
            bean1.RightHand_2_ExerciseTime__c='4:52.31';
            bean1.RightHand_3_ExerciseDrops__c=1;
            bean1.RightHand_3_ExerciseGoing__c='Yes, I forgot';
            bean1.RightHand_3_ExerciseTime__c='4:52.31';
            bean1.RightHand_4_ExerciseDrops__c=1;
            bean1.RightHand_4_ExerciseGoing__c='Yes, I forgot';
            bean1.RightHand_4_ExerciseTime__c='4:52.31';
            bean1.OneLastThing__c='I timed myself';
            //insert bean1;           
        Test.startTest();
        GamesController.createBeanGameRecord(bean1);     
        Test.stopTest(); 
    }
    @isTest
    public static void LoginTest(){
        
        Id p = [select id from profile where name='Customer Community Login User Custom'].id;
        
        Account testAccount = new Account();
        testAccount.Name='Test Account' ;
        insert testAccount;

        contact con1= new contact();
        con1.FirstName='Test';
        con1.Email='test@abc.com';
        con1.Phone='76955';
        con1.LastName='Test';
        con1.Highest_level_of_education_completed__c='Up to 8 Years';
        con1.AccountId=testAccount.id;
        con1.sex__c='Male';
        insert con1;
        
        User user = new User(alias = 'test123', email='test123@noemail.com',
                    emailencodingkey='UTF-8', lastname='Testing', languagelocalekey='en_US',
                    localesidkey='en_US', profileid = p, country='United States',IsActive =true,
                    ContactId = con1.Id,
                    timezonesidkey='America/Los_Angeles', username='tester@noemail.com');
        insert user;
        test.startTest();
         system.runAs(user) {
             GamesController.getCurrentContact(); 
        }    
        test.stopTest();
    }    
}