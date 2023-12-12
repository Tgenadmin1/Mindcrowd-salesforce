@isTest
public class BatchClassSpeechTaskUnlockTest {

    @testSetup
    static void setup() {
     
        List<Contact> testContacts = new List<Contact>();
        List<Participant_Game_Info__c> testpgis = new List<Participant_Game_Info__c>();

        // Create test Contacts with CreatedDate within the last 365 days
        Date oneYearAgo = Date.today().addDays(-365);

        for (Integer i = 0; i < 10; i++) {
            testContacts.add(new Contact(LastName = 'Test Contact ' + i, CreatedDate = oneYearAgo));
        }
        insert testContacts;

        for (Contact con : testContacts) {
            testpgis.add(new Participant_Game_Info__c(Contact_Name__c = con.Id));
        }
        insert testpgis;
    }

    @isTest
    static void testBatchClassSpeechTaskUnlock() {
        
        Test.startTest();
        // Run the batch
        BatchClassSpeechTaskUnlock batchGU = new BatchClassSpeechTaskUnlock();
        String jobId = System.schedule('Test Batch', '0 0 23 * * ?', batchGU);

        Test.stopTest();

        List<Contact> updatedContacts = [SELECT Id,Speech_Task__c  FROM Contact];

        for (Contact con : updatedContacts) {

            System.assertEquals('Opened', con.Speech_Task__c);
        }
    }

   @isTest
    static void testExecuteMethod() {
        // Create a test scope
        List<Participant_Game_Info__c> testScope = new List<Participant_Game_Info__c>();
        
        // Create a test Contact record
        Contact testContact = new Contact(LastName = 'Test Contact');
        insert testContact;

        // Create a related Bean_Game__c record associated with the test Contact
        Participant_Game_Info__c testpgi = new Participant_Game_Info__c(Contact_Name__c = testContact.Id);
        insert testpgi;

        testScope.add(testpgi);

        Test.startTest();

        // Instantiate the batch class
        BatchClassSpeechTaskUnlock batchJob = new BatchClassSpeechTaskUnlock();

        // Execute the 'execute' method directly
        batchJob.execute(null, testScope);

        Test.stopTest();

        // Verify the results
        // Query the Contact record to check if the 'Bean_Game__c' field is updated as expected
        testContact = [SELECT Id, Speech_Task__c  FROM Contact WHERE Id = :testContact.Id];
        System.assertEquals('Opened', testContact.Speech_Task__c);
    }
}