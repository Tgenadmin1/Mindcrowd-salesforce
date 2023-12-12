/*
 * 
  Created By: {Girikon(Pramod Kumar)}
  Created On: 07/29/2021
  Description/Purpose:Query on Contact to fetch value of progress count[ticket No-: TM-125]
  Methods--(progressCount,ProgressBarController_TEST)
  Apex Class-- ProgressBarController(Code Coverage 75%)
  Modification log --
  Modified By: {Girikon(Pramod Kumar)} 
  Modified On: 07/31/2021

  Test Class for ProgressBarController
  *
  */
@isTest
public class ProgressBar_Test 
{
    //Test Method
    @isTest
    
    public static void progressCount()
    {  
     	Database.SaveResult dsr;
        Contact drContact;
        drContact=new Contact();
        dsr=Database.insert(drContact,false);
        Test.startTest();
        ProgressBarController.getProgressMap();
        Test.stopTest();
    }
}