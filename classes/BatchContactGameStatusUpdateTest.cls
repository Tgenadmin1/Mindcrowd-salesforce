//Apex Class BatchContactGameStatusUpdate

@IsTest
public with sharing class BatchContactGameStatusUpdateTest {
    
    @IsTest
    static void testBatch() {
        // Create test data
        List<Contact> contacts = new List<Contact>();
        for (Integer i = 0; i < 10; i++) {
            Contact c = new Contact(FirstName = 'Santhosh',Language__c = 'English', LastName = 'Nookilla' + i);
            contacts.add(c);
        }
        insert contacts;
        
        List<Participant_Game_Info__c> pgis = new List<Participant_Game_Info__c>();
        for (Contact c : contacts) {
            pgis.add(new Participant_Game_Info__c(
                Contact_Name__c = c.Id,
                Game_Name__c = 'a028G000002Sg4cQAC',
                Count_Of_No_Of_Correct_Answered__c = 5,
                Count_Of_No_of_Question_Attempted__c = 10,
                Count_Of_Total_Reaction_Time__c = 100
            ));
        }
        insert pgis;
        
        // Call batch
        Test.startTest();
        Database.executeBatch(new BatchContactGameStatusUpdate(), 10);
        Test.stopTest();
        
        // Verify results
        List<Contact> updatedContacts = [SELECT Id, Flanker__c FROM Contact WHERE Id IN :contacts];
        for (Contact c : updatedContacts) {
        System.assertEquals('Opened', c.Flanker__c);
        }
    }
}