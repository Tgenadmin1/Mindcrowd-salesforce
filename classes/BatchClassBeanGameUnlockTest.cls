@isTest
public class BatchClassBeanGameUnlockTest {

    @testSetup
    static void setup() {
        // Create test data as needed for your test, including Bean_Game__c and Contact records
        // For example, create Contact and Bean_Game__c records
        List<Contact> testContacts = new List<Contact>();
        List<Bean_Game__c> testBeanGames = new List<Bean_Game__c>();

        // Create test Contacts with CreatedDate within the last 365 days
        Date oneYearAgo = Date.today().addDays(-365);

        for (Integer i = 0; i < 10; i++) {
            testContacts.add(new Contact(LastName = 'Test Contact ' + i, CreatedDate = oneYearAgo));
        }
        insert testContacts;

        // Create test Bean_Game__c records associated with Contacts
        for (Contact con : testContacts) {
            testBeanGames.add(new Bean_Game__c(Contact__c = con.Id));
        }
        insert testBeanGames;
    }

    @isTest
    static void testBatchClassBeanGameUnlock() {
        
        Test.startTest();
        // Run the batch
        BatchClassBeanGameUnlock batchGU = new BatchClassBeanGameUnlock();
        String jobId = System.schedule('Test Batch', '0 0 23 * * ?', batchGU);

        Test.stopTest();

        // Verify the results by querying the Contacts and checking Bean_Game__c field values
        List<Contact> updatedContacts = [SELECT Id, Bean_Game__c FROM Contact];

        for (Contact con : updatedContacts) {
            // Verify that the Bean_Game__c field is updated to 'Opened' for the appropriate Contacts
            System.assertEquals('Opened', con.Bean_Game__c);
        }
    }

   @isTest
    static void testExecuteMethod() {
        // Create a test scope
        List<Bean_Game__c> testScope = new List<Bean_Game__c>();
        
        // Create a test Contact record
        Contact testContact = new Contact(LastName = 'Test Contact');
        insert testContact;

        // Create a related Bean_Game__c record associated with the test Contact
        Bean_Game__c testBeanGame = new Bean_Game__c(Contact__c = testContact.Id);
        insert testBeanGame;

        testScope.add(testBeanGame);

        Test.startTest();

        // Instantiate the batch class
        BatchClassBeanGameUnlock batchJob = new BatchClassBeanGameUnlock();

        // Execute the 'execute' method directly
        batchJob.execute(null, testScope);

        Test.stopTest();

        // Verify the results
        // Query the Contact record to check if the 'Bean_Game__c' field is updated as expected
        testContact = [SELECT Id, Bean_Game__c FROM Contact WHERE Id = :testContact.Id];
        System.assertEquals('Opened', testContact.Bean_Game__c);
    }
}