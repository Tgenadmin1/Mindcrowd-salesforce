@isTest
private class BatchUpdatePGIRecordsTest {
    
    static testMethod void testBatchUpdatePGIRecords() {
        // Create test data
        List<Participant_Game_Info__c> testRecords = new List<Participant_Game_Info__c>();
        List<Participant_Game_Response__c> testPGRRecords = new List<Participant_Game_Response__c>();        
        for(Integer i=0; i<10; i++) {
            testRecords.add(new Participant_Game_Info__c(Game_Play_Status__c = 'Completed'));
        }
        insert testRecords;
        for(Participant_Game_Info__c pgi: [select createddate, id, Version__c from Participant_Game_Info__c]) {
            Test.setCreatedDate(pgi.Id,DateTime.newInstance(2024,03,13));
            testPGRRecords.add(new Participant_Game_Response__c(Participant_Game_InfoID__c = pgi.Id, Version__c=null));
        }
        insert testPGRRecords;
        for(Participant_Game_Response__c pgr: [select createddate, id from Participant_Game_Response__c]) {
            Test.setCreatedDate(pgr.Id, DateTime.newInstance(2024,03,13));           
        }       

        Test.startTest();
        String jobId = System.schedule('Test Batch Job', 
                                        '0 0 23 * * ?', 
                                        new BatchUpdatePGIRecords(-1440,0));
        Test.stopTest();
        System.assertEquals(1, [SELECT count() FROM CronTrigger WHERE Id = :jobId]);
    }
}