/*
@author            : Santhosh Nookilla
@description       : Test Class for Unlocking Surveys
@class        	   : BatchSurveyStatusUpdate
*/

@isTest
public class BatchSurveyStatusUpdateTest {

    @testSetup
    static void createTestData() {
        
        List<Contact> contacts = new List<Contact>();
        List<HealthMedical_Survey__c> hmSurveys = new List<HealthMedical_Survey__c>();
        List<SES__c> sesSurveys = new List<SES__c>();
    
        Datetime oneYearAgo = Datetime.now().addDays(-365);
    
        for (Integer i = 1; i < 3; i++) {
    
            Contact contact = new Contact(
                LastName = 'Test Contact ' + i,
                Sex__c = 'Male',
                HEALTH_MEDICAL__c = 'Locked',
                SES__c = 'Locked'
            );
            insert contact; 
            
    
            HealthMedical_Survey__c hmSurvey = new HealthMedical_Survey__c(
                Contact_Name__c = contact.Id,
                CreatedDate = oneYearAgo
            );
            hmSurveys.add(hmSurvey);
    
            SES__c sesSurvey = new SES__c(
                Contact_Name__c = contact.Id,
                CreatedDate = oneYearAgo
            );
            sesSurveys.add(sesSurvey);
    
            contacts.add(contact);
        }
    
        system.debug('Contacts: ' + contacts);
        system.debug('HealthMedical_Surveys: ' + hmSurveys);
        system.debug('SES_Surveys: ' + sesSurveys);
    
        insert hmSurveys;
        insert sesSurveys;
    }


    @isTest
    static void testBatchExecute_SESSurvey() {
        Test.startTest();
    
        
        Datetime currentTime = Datetime.now();
        
        
        Integer minutesFromNow = 1; 
        Datetime scheduledTime = currentTime.addMinutes(minutesFromNow);
    
        
        String cronExpression = scheduledTime.second() + ' ' +
                                scheduledTime.minute() + ' ' +
                                scheduledTime.hour() + ' ' +
                                scheduledTime.day() + ' ' +
                                scheduledTime.month() + ' ' +
                                '?' + ' ' +
                                scheduledTime.year();
    
        
        String jobId = System.schedule('Test Batch Job', cronExpression, new BatchSurveyStatusUpdate('SES__c', 'Contact_Name__c', 'SES__c'));
 
        
        List<Contact> updatedContacts = [SELECT Id, SES__c FROM Contact WHERE Id IN (SELECT Contact_Name__c FROM SES__c)];
        System.assertEquals(2, updatedContacts.size());
    
        Test.stopTest();
    }
}