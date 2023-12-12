// Created By: {Girikon(Ibadur Rahaman)}
// Created On: 11/07/2022
// Description/Purpose:Test class to test AB Testing Object related functions
// Methods: {setup,insertCustomSetting,insertData,update_AB_Testing_record}
// Apex Class: {ConsentFormController)}
// Last Modified By : {Girikon(Ibadur Rahaman)}
@isTest
public class ConsentFormControllerTest {
	@testSetup static void setup() {
        // Create common test accounts
        AB_Testing__c ab=new AB_Testing__c();
        ab.A_B_Variant__c='A';
        ab.Next_Page__c=true;
        insert  ab;     
    }
    @isTest
    public static void insertCustomSetting(){
        test.startTest();
        ConsentFormController.insertABTestingRecord('A');
        test.stopTest();
    }
    @isTest
    public static void insertData(){
        ABTesting__c cs = new ABTesting__c();
        cs.Name='Consent_Test';
        insert cs; 
        test.startTest();
        ConsentFormController.getformHandler();
        test.stopTest();
    }
    @isTest
    public static void update_AB_Testing_record(){
        AB_Testing__c ab=[SELECT id,Next_Page__c from AB_Testing__c limit 1];
        ab.Next_Page__c=false;
        update ab;
        test.startTest();
        ConsentFormController.updateABTestingRecord(ab.id);
        test.stopTest();
    }
}