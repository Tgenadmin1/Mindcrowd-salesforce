@isTest
private class BatchGameResultDashboardAVGTest {

   @testSetup
	static void createTestData() {
    List<Contact> contacts = new List<Contact>();
    List<Game_Detail__c> gameDetails = new List<Game_Detail__c>();
    List<Participant_Game_Info__c> participantGameInfos = new List<Participant_Game_Info__c>();
    List<Participant_Game_Response__c> participantGameResponses = new List<Participant_Game_Response__c>();
    List<People_Like_You_Data__c> plys = new List<People_Like_You_Data__c>();
    List<Game_Detail__c> games = new List<Game_Detail__c>();
    List<Participant_Game_Info__c> pgis = new List<Participant_Game_Info__c>();
    List<Participant_Game_Info__c> pgis2 = new List<Participant_Game_Info__c>();
    List<Participant_Game_Response__c> pgrs = new List<Participant_Game_Response__c>();
    List<Game_Detail__c> exgames = [SELECT Id, Max_Score__c FROM Game_Detail__c];

    // Create contacts
    for (Integer i = 0; i < 13; i++) {
        Contact c = new Contact(
            LastName = 'test contact' + i,
            Email = 'Test' + i + '@test.com', 
            Sex__c = 'Male',
            Age__c = 34,
            Highest_level_of_education_completed__c = 'High School Diploma (Baccalaureate)',
            Language__c = 'English',
            Flanker__c = 'Completed',
            Verbal_Paired_Associates__c = 'Completed',
            Letter_Number_Sequencing__c = 'Completed',
            Deary_Simple_And_Complex_Reaction_Time__c = 'Completed',
            Keep_Track__c = 'Completed',
            Object_Recognition_And_Similarity__c = 'Completed',
            Object_Discrimination__c = 'Completed',
            Object_Temporal__c = 'Completed',
            Face_Name_Associates__c = 'Completed',
            Object_Spatial__c = 'Completed',
            Fake_News__c = 'Completed',
            Digits__c = 'Completed',
            This_That__c = 'Completed'
        );
        contacts.add(c);
    }
    insert contacts;

    // Create game details
    List<String> gameNames = new List<String>{'Flanker', 'Letter-Number Sequencing', 'Keep Track', 'Deary Simple And Complex Reaction Time','Object Discrimination', 'Object Temporal', 'Face-Name Associates', 'Object Spatial', 'Digits', 'Camel & Cactus','Verbal Paired Associates', 'Object Recognition And Similarity', 'Fake News'};
    for (String name : gameNames) {
        Game_Detail__c gd = new Game_Detail__c(Name = name);
        gameDetails.add(gd);
    }
    insert gameDetails;
        
        List<Participant_Dashboard__c> participantDashboards = new List<Participant_Dashboard__c>();
for (String name : gameNames) {
    participantDashboards.add(new Participant_Dashboard__c(
        Data_Name__c = 'Overall Average',
        Data_Value__c = 0, // Initial value
        Game_Detail__r = new Game_Detail__c(Name = name)
    ));
}
insert participantDashboards;

    // Create participant game infos
    for (Integer i = 0; i < 13; i++) {
        Participant_Game_Info__c pgi = new Participant_Game_Info__c(
            Contact_Name__c = contacts[i].Id,
            Game_Name__c = gameDetails[i].Id,
            Game_Play_Status__c = 'Completed'
        );
        participantGameInfos.add(pgi);
    }
    insert participantGameInfos;

    // Create participant game responses
    for (Integer i = 0; i < 13; i++) {
        Participant_Game_Response__c pgr = new Participant_Game_Response__c(
            Contact_Name__c = contacts[i].Id, 
            Game_Name__c = gameDetails[i].Id, 
            Reaction_Time_in_ms__c = 5000, 
            Is_Correct__c = true, 
            Is_Practice_Question__c = false,  
            Participant_Game_InfoID__c = participantGameInfos[i].Id, 
            Participant_Response__c = 'Test', 
            Question_Number__c = '1', 
            Right_Answer__c = 'Test'
        );
        participantGameResponses.add(pgr);
    }
    insert participantGameResponses;

    // Create People_Like_You_Data__c records
    for (Game_Detail__c gameDetail : gameDetails) {
        People_Like_You_Data__c ply = new People_Like_You_Data__c(
            Age__c = 90,
            Education__c = 2,
            Game_Name__c = gameDetail.Id,
            High_Average__c = 49,
            Low_Average__c = 1,
            Sex__c = 'Male'
        );
        plys.add(ply);
    }
    insert plys;

    // Update existing games if any
    if (!exgames.isEmpty()) {
        for (Game_Detail__c exgame : exgames) {
            exgame.Max_Score__c = 100;
        }
        update exgames;
    }

    // Create new games
    for (String gameName : gameNames) {
        Game_Detail__c gd = new Game_Detail__c(
            Name = gameName,
            Max_Score__c = 100
        );
        games.add(gd);
    }
    insert games;

    // Insert Participant_Game_Info__c records for new games
    Map<String, Datetime> gameToCreatedDateMap = new Map<String, Datetime>{
        'Flanker' => DateTime.newInstance(2023, 04, 24),
        'Letter-Number Sequencing' => DateTime.newInstance(2023, 04, 24),
        'Keep Track' => DateTime.newInstance(2023, 04, 24),
        'Deary Simple And Complex Reaction Time' => DateTime.newInstance(2023, 04, 24),
        'Object Discrimination' => DateTime.newInstance(2023, 01, 22),
        'Object Temporal' => DateTime.newInstance(2023, 01, 22),
        'Face-Name Associates' => DateTime.newInstance(2023, 01, 22),
        'Object Spatial' => DateTime.newInstance(2023, 01, 22)
        // Add more game names and their corresponding created dates if needed
    };

    for (Game_Detail__c game : games) {
        String gameName = game.Name;
        if (gameToCreatedDateMap.containsKey(gameName)) {
            Datetime createdDate = gameToCreatedDateMap.get(gameName);
            Participant_Game_Info__c pgi = new Participant_Game_Info__c(
                Contact_Name__c = contacts[0].Id,
                Game_Name__c = game.Id,
                User_Device__c = 'DESKTOP',
                Game_Play_Status__c = 'Completed',
                Count_Of_No_Of_Correct_Answered__c = 20,
                Count_Of_No_of_Question_Attempted__c = 30,
                Count_Of_Total_Reaction_Time__c = 1000,
                CreatedDate = createdDate
            );
            pgis.add(pgi);
        } else {
            // Handle the case where no created date is found for the game
            System.debug('No created date found for game: ' + gameName);
        }
    }
    insert pgis;

    // Insert Participant_Game_Response__c records for Participant_Game_Info__c records
    for (Participant_Game_Info__c pgi : pgis) {
        Participant_Game_Response__c res1 = new Participant_Game_Response__c(
            Contact_Name__c = contacts[0].Id,
            Game_Name__c = pgi.Game_Name__c,
            Reaction_Time_in_ms__c = 5000,
            Is_Correct__c = true,
            Is_Practice_Question__c = false,  
            Participant_Game_InfoID__c = pgi.Id,
            Participant_Response__c = 'Test',
            Question_Number__c = '1',
            Right_Answer__c = 'Test'
        );
        pgrs.add(res1);
    }
    insert pgrs;
}
    @isTest
    static void testInitializeMaps() {
        BatchGameResultDashboardAVG batch = new BatchGameResultDashboardAVG();
    }
    
   @isTest
    static void testBatchExecution() {
        // Test the execution of the batch class
        Test.startTest();

        // Set up test data if needed

        // Schedule the batch job
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

        String jobId = System.schedule('Test Batch Job', cronExpression, new BatchGameResultDashboardAVG());

        Test.stopTest();

        // Add assertions if needed
    }
    
    @isTest
    static void testFinishMethod() {
        // Test the finish method of the batch class
        Test.startTest();

        // Set up test data
        // Insert a single Flanker game record
        Game_Detail__c flankerGame = new Game_Detail__c(Name = 'Flanker', Max_Score__c = 0);
        insert flankerGame;

        // Insert Participant Dashboard records
        List<Participant_Dashboard__c> participantDashboards = new List<Participant_Dashboard__c>();
        for (String gameName : new List<String>{'Flanker', 'Letter-Number Sequencing'}) {
            participantDashboards.add(new Participant_Dashboard__c(
                Data_Name__c = 'Overall Average',
                Data_Value__c = 0, // Initial value
                Game_Detail__c = flankerGame.Id
            ));
        }
        insert participantDashboards;

        // Instantiate the batch class
        BatchGameResultDashboardAVG batch = new BatchGameResultDashboardAVG();

        // Call the finish method
        batch.finish(null);

        Test.stopTest();

        // Verify the expected changes
        List<Participant_Dashboard__c> updatedDashboards = [SELECT Data_Value__c FROM Participant_Dashboard__c WHERE Game_Detail__c = :flankerGame.Id];
        System.assertEquals(1, updatedDashboards.size(), 'There should be only one Participant Dashboard record for Flanker game.');
        Decimal expectedAverage = 0; // Set your expected average value here
        System.assertEquals(expectedAverage, updatedDashboards[0].Data_Value__c, 'The average value should be updated.');
        
        Game_Detail__c updatedFlankerGame = [SELECT Max_Score__c FROM Game_Detail__c WHERE Name = 'Flanker'];
        System.assertNotEquals(0, updatedFlankerGame.Max_Score__c, 'The Max Score should be updated.');

        // Add more assertions if needed
    }
}