// Created By: {Girikon(Ibadur Rahaman)}
// Created On: 11/07/2022
// Description/Purpose:-It was created to toggle the LWC template using custom setting in getformHandler method. 
//create new record to  AB Testing Onject in insertABTestingRecord.
//update the AB testing object record in updateABTestingRecord
// Methods: {getformHandler,insertABTestingRecord,updateABTestingRecord}
// Test Class: {ConsentFormControllerTest} {85%}
// Last Modified By : {Girikon(Ibadur Rahaman)}

public without sharing class ConsentFormController {
	@AuraEnabled
    public static String getformHandler() {
        ABTesting__c settings = ABTesting__c.getInstance('Consent_Test');
        DateTime currentTime = DateTime.now();
        Integer currentmilliseconds=currentTime.millisecond();
        if(currentTime >= settings.Start_Date__c && currentTime <= settings.End_Date__c){
            if(System.Math.mod(currentmilliseconds, 2) == 0){
               return 'A';
            }else{
                return 'B';
            }
        }else{
            return settings.Winner__c == 'A' ? 'C': 'D';
        }   
    } 
    @AuraEnabled
    public static String insertABTestingRecord(String variant){
        AB_Testing__c newrecord=new AB_Testing__c();
        newrecord.A_B_Variant__c=variant;
        newrecord.Next_Page__c=false;
        insert newrecord;
        return newrecord.id;
    }
    @AuraEnabled
    public static String updateABTestingRecord(String recid){
        AB_Testing__c newrecord1=new AB_Testing__c();
        newrecord1.id=recid;
        newrecord1.Next_Page__c=true;
        update newrecord1;
        return recid;
    }
}