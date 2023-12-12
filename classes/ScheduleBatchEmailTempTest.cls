/*
 * 
  Created By: {Girikon(Rohit Dua)}
  Created On: 30/5/2022
  Description/Purpose: Test class for ScheduleBatchEmailTempBatch for email reminder 
  Apex Class-- ScheduleBatchEmailTemp(Code Coverage--100%)
  
 *
 */
@isTest
public class ScheduleBatchEmailTempTest {



   Static testMethod void testBatchExecuteMethod()
   {
     

     Test.startTest();

     ScheduleBatchEmailTemp batchTest = new ScheduleBatchEmailTemp ();
     String sch = '0 0 23 * * ?'; 
       system.schedule('Test Territory Check', sch, batchTest);
     Test.stopTest();
    }


}