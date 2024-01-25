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
       for (Integer i = 0; i < 10; i++) {
            testContacts.add(new Contact(
                FirstName = 'TestFirstName' + i,
                LastName = 'TestLastName' + i,
                Email = 'testemail' + i + '@example.com',
                Enrolled_in_Paid_Campaign__c = True,
                Tremendous_Award_Sent__c = False,
                Verbal_Paired_Associates__c = 'Completed', Deary_Simple_And_Complex_Reaction_Time__c = 'Completed',
                Object_Recognition_And_Similarity__c = 'Completed',Flanker__c = 'Completed', Face_Name_Associates__c = 'Completed',
                Fake_News_Test__c = 'Completed', Bean_Game__c = 'Completed', 
                Letter_Number_Sequencing__c = 'Completed', Keep_Track__c = 'Completed', Object_Discrimination__c = 'Completed',
                Object_Temporal__c = 'Completed', Object_Spatial__c = 'Completed', Speech_Task__c = 'Completed',Language__c=i==8?'English':'Spanish'
               
            ));
        }
        insert testContacts;
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