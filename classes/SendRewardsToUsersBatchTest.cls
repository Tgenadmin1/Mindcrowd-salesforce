@isTest
private class SendRewardsToUsersBatchTest {
    @testSetup
static void setupTestData() {
    // Create custom setting records
  
  TremendousSetting__c  customSettingRecords = new TremendousSetting__c();
    customSettingRecords.Name ='RewardsSetting';
    customSettingRecords.Authorization__c='Bearer';
    customSettingRecords.AuthToken__c='TEST_5n1O4iBqt--GrYym0iu2LBgOZgZ_NvV2QgnSM2YUjHl';
    customSettingRecords.CampaignId__c='NBCOGE73UBCZ';
    customSettingRecords.FundingSourceId__c = 'BALANCE';
    customSettingRecords.EndpointURL__c = 'https://testflight.tremendous.com/api/v2/ping';
    customSettingRecords.Denomination__c = 50;
    customSettingRecords.DeliveryMethod__c = 'Email';
    customSettingRecords.ContentType__c = 'application/json';
    customSettingRecords.RestMethod__c= 'POST';
    insert customSettingRecords; 
      List<Contact> testContacts = new List<Contact>();
       for (Integer i = 0; i < 1; i++) {
            testContacts.add(new Contact(
                FirstName = 'TestFirstName' + i,
                LastName = 'TestLastName' + i,
                Email = 'testemail' + i + '@example.com',
                Enrolled_in_Paid_Campaign__c = True,
                Tremendous_Award_Sent__c = False,
                Language__c='English',
                Activation_Date__c = System.today()
               
            ));
        }
    
        insert testContacts;
    Research_Campaign__c rc = new Research_Campaign__c(Name = 'DBS');
    insert rc;
    Shipping_Detail__c sd = new Shipping_Detail__c(Shipment_Status__c = 'Received', Campaign__c=rc.Id,contact_Id__c=testContacts[0].Id);
    insert sd;
       
    List<Game_Detail__c> games = new List<Game_Detail__c>();
    List<String> gameNames = new List<String>{'Flanker', 'Letter-Number Sequencing', 'Keep Track', 'Object Spatial', 'Deary Simple And Complex Reaction Time', 'Object Discrimination', 'Object Temporal', 'Face-Name Associates', 'Verbal Paired Associates', 'Object Recognition And Similarity'};
        for(String gameName: gameNames){
            Game_Detail__c game = new Game_Detail__c();
            game.Name = gameName;
			games.add(game);           
        } 
    insert games;
    
    List<Participant_Game_Info__c> pgis = new List<Participant_Game_Info__c>();
    for(Game_Detail__c game: [Select Id, Name from Game_Detail__c]){
        Participant_Game_Info__c pgi = new Participant_Game_Info__c();
            pgi.Contact_Name__c = testContacts[0].Id;
            pgi.Game_Name__c = game.Id;
            pgi.Game_Play_Status__c = 'Completed';
            pgi.Count_Of_No_Of_Correct_Answered__c = 10;
            pgi.Count_Of_No_of_Question_Attempted__c = 10;
            pgi.Count_Of_Total_Reaction_Time__c = 10;
            pgi.Count_Of_No_Of_Correct_Answered__c = 10;
            pgi.Count_Of_No_of_Question_Attempted__c = 10;
            pgi.Count_Of_Total_Reaction_Time__c = 10;
			pgis.add(pgi);
		}
    insert pgis;
}

    @isTest
    static void testSendRewardsBatch() {
       

        
         // Set up the mock callout class
        Test.setMock(HttpCalloutMock.class, new SendRewardsToUsersBatchMock());

        // Schedule the batch job
        Test.startTest();
        SendRewardsToUsersBatch sendRewardBatch = new SendRewardsToUsersBatch();
        
        String jobId = System.schedule('SendRewardsBatchTest', '0 0 0 15 3 ?', sendRewardBatch);
        Test.stopTest();

        // Check if the batch job ran successfully
        //AsyncApexJob job = [SELECT Id, Status, NumberOfErrors FROM AsyncApexJob WHERE Id = :jobId];
        //System.assertEquals('Completed', job.Status);
        //System.assertEquals(0, job.NumberOfErrors);

    }
    @isTest
    static void testSendRewardsBatch1_WrongPayload() {
    TremendousSetting__c  customSettingRecords = [Select id,EndpointURL__c from TremendousSetting__c limit 1];
        customSettingRecords.EndpointURL__c='wrong';
        update customSettingRecords;
         // Create test data
     
         // Set up the mock callout class
        Test.setMock(HttpCalloutMock.class, new SendRewardsToUsersBatchMock());

        // Schedule the batch job
        Test.startTest();
        SendRewardsToUsersBatch sendRewardBatch = new SendRewardsToUsersBatch();
        
        String jobId = System.schedule('SendRewardsBatchTest', '0 0 0 15 3 ?', sendRewardBatch);
        Test.stopTest();

        
        }
     @isTest
    static void testSendRewardsBatch1_CatchError() {
    TremendousSetting__c  customSettingRecords = [Select id,EndpointURL__c from TremendousSetting__c limit 1];
        customSettingRecords.EndpointURL__c=NULL;
        update customSettingRecords;
       
        
        
         // Set up the mock callout class
        Test.setMock(HttpCalloutMock.class, new SendRewardsToUsersBatchMock());

        // Schedule the batch job
        Test.startTest();
        SendRewardsToUsersBatch sendRewardBatch = new SendRewardsToUsersBatch();
        
        String jobId = System.schedule('SendRewardsBatchTest', '0 0 0 15 3 ?', sendRewardBatch);
        Test.stopTest();

        
        }
}