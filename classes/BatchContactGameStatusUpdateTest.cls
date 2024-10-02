@isTest
public class BatchContactGameStatusUpdateTest {
    @testSetup
	static void createTestData() {
    List<Contact> contacts = new List<Contact>();
    List<Game_Detail__c> gameDetails = new List<Game_Detail__c>();
    List<Participant_Game_Info__c> participantGameInfos = new List<Participant_Game_Info__c>();
    List<Participant_Game_Response__c> participantGameResponses = new List<Participant_Game_Response__c>();

    Datetime oneYearAgo = Datetime.now().addDays(-365);
    Datetime sixMonthsAgo = Datetime.now().addDays(-183);
    Datetime threeMonthsAgo = Datetime.now().addDays(-91);

    // Create contacts
    for(Integer i = 0; i < 13; i++) {
        Contact c = new Contact();
        c.LastName = 'test contact' + i;
        c.Email = 'Test' + i + '@test.com'; 
        c.Sex__c = 'Male';
        c.Age__c = 34;
        c.Highest_level_of_education_completed__c = 'High School Diploma (Baccalaureate)';
        c.Language__c='English';
        c.Flanker__c = 'Completed';
        c.Verbal_Paired_Associates__c = 'Completed';
        c.Letter_Number_Sequencing__c = 'Completed';
        c.Deary_Simple_And_Complex_Reaction_Time__c = 'Completed';
        c.Keep_Track__c = 'Completed';
        c.Object_Recognition_And_Similarity__c = 'Completed';
        c.Object_Discrimination__c = 'Completed';
        c.Object_Temporal__c = 'Completed';
        c.Face_Name_Associates__c = 'Completed';
        c.Object_Spatial__c = 'Completed';
        c.Fake_News_Test__c = 'Completed';
        c.Digit_Symbol_Matching_Test__c = 'Completed';
        c.Camel_and_Cactus__c = 'Completed';
        contacts.add(c);
    }
    insert contacts;

    // Create game details
    List<String> gameNames = new List<String>{'Flanker', 'Letter-Number Sequencing', 'Keep Track', 'Deary Simple And Complex Reaction Time','Object Discrimination', 'Object Temporal', 'Face-Name Associates', 'Object Spatial', 'Digits','Verbal Paired Associates', 'Object Recognition And Similarity', 'Fake News', 'Camel & Cactus'};
    for(String name : gameNames) {
        Game_Detail__c gd = new Game_Detail__c();
        gd.Name = name;
        gameDetails.add(gd);
    }
    insert gameDetails;

    // Create participant game infos
    for(Integer i = 0; i < 13; i++) {
        Participant_Game_Info__c pgi = new Participant_Game_Info__c();
        pgi.Contact_Name__c = contacts[i].Id;
        pgi.Game_Name__c = gameDetails[i].Id;
        pgi.Game_Play_Status__c = 'Completed';
        if (i < 4) {
            pgi.CreatedDate = threeMonthsAgo;
        } else if (i >= 4 && i < 9) {
            pgi.CreatedDate = sixMonthsAgo;
        } else {
            pgi.CreatedDate = oneYearAgo;
        }
        
        participantGameInfos.add(pgi);
    }
    insert participantGameInfos;

    // Create participant game responses
    for(Integer i = 0; i < 13; i++) {
        Participant_Game_Response__c pgr = new Participant_Game_Response__c();
        pgr.Contact_Name__c = contacts[i].Id; 
        pgr.Game_Name__c = gameDetails[i].Id; 
        pgr.Reaction_Time_in_ms__c = 5000; 
        pgr.Is_Correct__c = true; 
        pgr.Is_Practice_Question__c = false;  
        pgr.Participant_Game_InfoID__c = participantGameInfos[i].Id; 
        pgr.Participant_Response__c = 'Test'; 
        pgr.Question_Number__c = '1'; 
        pgr.Right_Answer__c = 'Test'; 
        participantGameResponses.add(pgr);
    }
    insert participantGameResponses;

    // Debugging
    for(Integer i = 0; i < 3; i++) {
        system.debug('Contact ' + i + ': ' + contacts[i]);
        system.debug('PGI ' + i + ': ' + participantGameInfos[i]);
        system.debug('PGR ' + i + ': ' + participantGameResponses[i]);
    }
}

        
        @isTest
    	private static void testBatchClass() {     
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
    
        
        String jobId = System.schedule('Test Batch Job', cronExpression, new BatchContactGameStatusUpdate());
 
        
        List<Contact> updatedContacts = [SELECT Id, Flanker__c, Letter_Number_Sequencing__c, Keep_Track__c, Deary_Simple_And_Complex_Reaction_Time__c,
                                        Object_Discrimination__c, Object_Temporal__c, Face_Name_Associates__c, Object_Spatial__c,
                                        Verbal_Paired_Associates__c, Object_Recognition_And_Similarity__c, Fake_News_Test__c, Digit_Symbol_Matching_Test__c, Camel_and_Cactus__c FROM Contact];
        System.assertEquals(13, updatedContacts.size());
    
        Test.stopTest();
}
}