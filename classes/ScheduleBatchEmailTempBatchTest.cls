/*
* 
Created By: {Girikon(Rohit Dua)}
Created On: 30/5/2022
Description/Purpose: Test class for ScheduleBatchEmailTempBatch for email reminder 
Apex Class-- ScheduleBatchEmailTempBatch(Code Coverage--86%)

*
*/

@isTest
public class ScheduleBatchEmailTempBatchTest {
    
    
    Static testMethod void testBatchExecuteMethod()
    {
        contact c = new contact();
        c.FirstName = 'John Smith';
        c.LastName = 'Web';
        
        c.Email = 'Personal@test.com';
        
        insert c;
        
        UnsubscribeCtrl.backOff([Select Secure_GUID__c FROM Contact WHERE Id=:c.Id].Secure_GUID__c+''+c.Id);
        Test.startTest();
        
        ScheduleBatchEmailTempBatch batchTest = new ScheduleBatchEmailTempBatch ();
        Id jobid = Database.executeBatch(batchTest,5);
        
        Test.stopTest();
    }
    
}