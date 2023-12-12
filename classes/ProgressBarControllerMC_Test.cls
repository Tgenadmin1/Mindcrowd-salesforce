/*
  Created By: {Girikon(Sunil Kumar)}
  Created On: 07/20/2022
  Methods--(progressCount,ProgressBarController_TEST)
*/
@isTest
public with sharing class ProgressBarControllerMC_Test {
    //Test Method
    @isTest
    public static void progressCount()
    {  
     	Database.SaveResult dsr;
        Contact drContact;
        drContact=new Contact();
        dsr=Database.insert(drContact,false);
        Test.startTest();
        ProgressBarControllerMC MCclass=new ProgressBarControllerMC();
        Test.stopTest();
    }
}