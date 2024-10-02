@isTest
public class BatchProject2ContactGameStatusUpdateTest {
    @isTest
    public static void testBatchExecution() {
        // Create test data
        List<Contact> testContacts = new List<Contact>();
        for(Integer i = 0; i < 5; i++) {
            testContacts.add(new Contact(
                LastName = 'Test Contact ' + i,
                Project2_Enrollment_Date__c = Date.today().addDays(-730),
                Language__c = 'English',
                Flanker__c = 'Completed',
                Sex__c = 'Male',
                Verbal_Paired_Associates__c = 'Completed',
                Letter_Number_Sequencing__c = 'Completed',
                Deary_Simple_And_Complex_Reaction_Time__c = 'Completed',
                Keep_Track__c = 'Completed',
                Object_Recognition_And_Similarity__c = 'Completed',
                Object_Discrimination__c = 'Completed',
                Object_Temporal__c = 'Completed',
                Face_Name_Associates__c = 'Completed',
                Object_Spatial__c = 'Completed'
            ));
        }
        insert testContacts;
        Test.startTest();
        BatchProject2ContactGameStatusUpdate batchJob = new BatchProject2ContactGameStatusUpdate();
        Database.executeBatch(batchJob);
        Test.stopTest();
        // Verify that the fields have been updated
        for(Contact con : [SELECT Flanker__c, Letter_Number_Sequencing__c, Keep_Track__c, 
                            Deary_Simple_And_Complex_Reaction_Time__c, Object_Discrimination__c, 
                            Object_Temporal__c, Face_Name_Associates__c, Object_Spatial__c,
                            Verbal_Paired_Associates__c, Object_Recognition_And_Similarity__c 
                            FROM Contact WHERE Id IN :testContacts]) {
            System.assertEquals('Opened', con.Flanker__c);
            System.assertEquals('Opened', con.Letter_Number_Sequencing__c);
            System.assertEquals('Opened', con.Keep_Track__c);
            System.assertEquals('Opened', con.Deary_Simple_And_Complex_Reaction_Time__c);
            System.assertEquals('Opened', con.Object_Discrimination__c);
            System.assertEquals('Opened', con.Object_Temporal__c);
            System.assertEquals('Opened', con.Face_Name_Associates__c);
            System.assertEquals('Opened', con.Object_Spatial__c);
            System.assertEquals('Opened', con.Verbal_Paired_Associates__c);
            System.assertEquals('Opened', con.Object_Recognition_And_Similarity__c);
        }
        }
    }