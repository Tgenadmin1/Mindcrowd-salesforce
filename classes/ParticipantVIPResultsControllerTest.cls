// Created By: {Girikon(Manikumar Meruva)}
// Created On: 27/08/2021
// Description/Purpose:Test class created for Catchment and Expanded Game User dashboards.{TM-85}
// Methods: {createUser,getDashboardDataForloggedInUserTest,getGuestUserGameDetailsTest,getMyGameDetailsTest}
// Apex Class: {ParticipantVIPResultsController}

@isTest
public class ParticipantVIPResultsControllerTest
{
    @testSetup
    public static void createUser()
    {
       Account objAcc = new Account(Name ='Test Company');
        insert objAcc;
        Contact c = new Contact();
        c.LastName= 'test last name';
        c.Email = 'Test@test.com';
        c.AccountId =objAcc.Id;
        c.Sex__c = 'Male';
        c.Age__c = 34;
        c.Highest_level_of_education_completed__c = 'High School Diploma (Baccalaureate)';
        Insert c;
        
        Contact c1 = new Contact();
        c1.LastName= 'test1 last name';
        c1.Email = 'Test1@test.com';
        c1.AccountId =objAcc.Id;
        c1.Sex__c = 'Male';
        c1.Age__c = 15;
        c1.Highest_level_of_education_completed__c = 'High School Diploma (Baccalaureate)';
        Insert c1;
        
        Contact c2 = new Contact();
        c2.LastName= 'test2 last name';
        c2.Email = 'Test2@test.com';
        c2.AccountId =objAcc.Id;
        c2.Sex__c = 'Male';
        c2.Age__c = 95;
        c2.Highest_level_of_education_completed__c = 'High School Diploma (Baccalaureate)';
        Insert c2;
        
          
        Game_Detail__c gd = new Game_Detail__c();
        gd.Name = 'PAIRED GAME';
        gd.Name = 'DLTRS';
        insert gd;
        
        //Start : "People Like You Data" creation
        People_Like_You_Data__c ply = new People_Like_You_Data__c();
        ply.Age__c = 18;
        ply.Education__c = 2;
        ply.Game_Name__c = gd.Id;
        ply.High_Average__c =49;
        //ply.Average__c =25;
        ply.Low_Average__c =1;
        ply.Sex__c ='Male';
        insert ply; 
        
        People_Like_You_Data__c ply1 = new People_Like_You_Data__c();
        ply1.Age__c = 90;
        ply1.Education__c = 2;
        ply1.Game_Name__c = gd.Id;
        ply1.High_Average__c =49;
        //ply1.Average__c =25;
        ply1.Low_Average__c =1;
        ply1.Sex__c ='Male';
        insert ply1;
        
        People_Like_You_Data__c ply2 = new People_Like_You_Data__c();
        ply2.Age__c = 95;
        ply2.Education__c = 2;
        ply2.Game_Name__c = gd.Id;
        ply2.High_Average__c =49;
        //ply2.Average__c =25;
        ply2.Low_Average__c =1;
        ply2.Sex__c ='Male';
        insert ply2;
        //End : "People Like You Data" creation     
        
        
        Participant_Game_Info__c pgi = new Participant_Game_Info__c();
        pgi.Contact_Name__c = c.Id;
        pgi.Game_Name__c = gd.Id;
        pgi.Game_Play_Status__c = 'Completed';
        insert pgi;
        Participant_Game_Response__c res1 = new Participant_Game_Response__c();
        res1.Contact_Name__c= c.Id;
        res1.Game_Name__c = gd.Id;
        res1.Reaction_Time_in_ms__c = 5000;
        res1.Is_Correct__c = true;
        res1.Is_Practice_Question__c = false;  
        res1.Participant_Game_InfoID__c = pgi.Id;
        res1.Participant_Response__c = 'Test';
        res1.Question_Number__c = '1';
        res1.Right_Answer__c = 'Test';
        insert res1;
        
        Participant_Game_Response__c res2 = new Participant_Game_Response__c();
        res2.Contact_Name__c= c.Id;
        res2.Game_Name__c = gd.Id;
        res2.Reaction_Time_in_ms__c = 0;
        res2.Is_Correct__c = false;
        res2.Is_Practice_Question__c = true; 
        res2.Participant_Game_InfoID__c = pgi.Id;
        res2.Participant_Response__c = 'Test2';
        res2.Question_Number__c = '2';
        res2.Right_Answer__c = 'Test2';
        insert res2;
        
        String orgId = UserInfo.getOrganizationId();  
        Id profileId = [Select Id From Profile Where Name ='Customer Community Login User Custom'].Id;
        
        String dateString =   
        String.valueof(Datetime.now()).replace(' ','').replace(':','').replace('-','');  
        Integer randomInt = Integer.valueOf(math.rint(math.random()*1000000));  
        String uniqueName = orgId + dateString + randomInt;  
        User tempUser = new User(  
            FirstName = c.LastName,  
            LastName = c.LastName,  
            ContactId = c.Id,
            email = uniqueName + '@sfdc' + orgId + '.org',  
            Username = uniqueName + '@sfdc' + orgId + '.org',  
            EmailEncodingKey = 'ISO-8859-1',  
            Alias = uniqueName.substring(18, 23),  
            TimeZoneSidKey = 'America/Los_Angeles',  
            LocaleSidKey = 'en_US',  
            LanguageLocaleKey = 'en_US',  
            ProfileId = profileId
        );            
        insert tempUser;   
    } 
    
    @isTest
    private static void getDashboardDataForloggedInUserTest()
    {     
        User tempUser = [Select Id From User Where Username Like '%sfdc%' limit 1]; 

        Game_Detail__c gd = new Game_Detail__c();
        gd.Name = 'WORD PAIR GAME';
        insert gd;
        
        
        System.runAs(tempUser)
        {
            ParticipantVIPResultsController.getDashboardDataForloggedInUser(gd.Name);
        }       
    }
  
    @isTest
    private static void getDashboardDataTest()
    {        
        Game_Detail__c gd = [Select Id,Name From Game_Detail__c Where Name='DLTRS' limit 1];
        Participant_Dashboard__c objDashboard = new Participant_Dashboard__c();
        objDashboard.Data_Value__c = 20;
        objDashboard.Game_Detail__c =gd.Id;
        objDashboard.Data_Category__c = 'Other';
        objDashboard.Data_Name__c = 'Overall Average';
        insert objDashboard;
        
        Contact c = [Select Id,Sex__c,Age__c,Highest_level_of_education_completed__c,Education_Attainment__c from Contact Where Email='Test@test.com' limit 1];
        ParticipantVIPResultsController.getDashboardData(c.Id,gd.Name);
        
        Contact c1 = [Select Id,Sex__c,Age__c,Highest_level_of_education_completed__c,Education_Attainment__c from Contact Where Age__c=15 limit 1];
        ParticipantVIPResultsController.getDashboardData(c1.Id,gd.Name);
      
        Contact c2 = [Select Id,Sex__c,Age__c,Highest_level_of_education_completed__c,Education_Attainment__c from Contact Where  Age__c=95 limit 1];
        ParticipantVIPResultsController.getDashboardData(c2.Id,gd.Name);
    } 
  
        @isTest
    private static void testgetGraphdData()
    {     
        User tempUser = [Select Id,ContactId From User Where Username Like '%sfdc%' limit 1];
        Id contId = tempUser.ContactId;
        List<String> gameNames = new List<String>{'Face-Name Associates','Flanker','Keep Track','Object Discrimination','Object Spatial','Object Temporal','Deary Simple And Complex Reaction Time','Object Recognition And Similarity','Letter-Number Sequencing','Verbal Paired Associates','Digits','Fake News','This & That'};
		List<Game_Detail__c> games = new List<Game_Detail__c>();
		List<People_Like_You_Data__c> plys = new List<People_Like_You_Data__c>();
		List<Participant_Game_Info__c> pgis = new List<Participant_Game_Info__c>();
        List<Participant_Game_Info__c> pgis2 = new List<Participant_Game_Info__c>();
		List<Participant_Game_Response__c> pgrs = new List<Participant_Game_Response__c>();        
        List<Game_Detail__c> exgames = [select Id,Max_Score__c from Game_Detail__c];
        for(Game_Detail__c exgame: exgames)
        {
            exgame.Max_Score__c = 100;
        }
        update exgames;
		for(String gameName: gameNames){
			Game_Detail__c gd = new Game_Detail__c();
			gd.Name = gameName;
			gd.Max_Score__c = 100;
			games.add(gd);
		}
		insert games;
        system.debug('games: '+games);
		for(Game_Detail__c game: [select Id from Game_Detail__c where name in  : gameNames] )	
		{
			People_Like_You_Data__c ply = new People_Like_You_Data__c();
			ply.Age__c = 34;
			ply.Education__c = 2;
			ply.Game_Name__c = game.Id;
			ply.High_Average__c =49;
			ply.Low_Average__c =1;
			ply.Sex__c ='Male';
			plys.add(ply);
            for(Integer i=0;i<30;i++){
                Participant_Game_Info__c pgi = new Participant_Game_Info__c();
                pgi.Contact_Name__c = contId;
                pgi.Game_Name__c = game.Id;
                pgi.User_Device__c = 'DESKTOP';
                pgi.Game_Play_Status__c = 'Completed';
                pgi.Count_Of_No_Of_Correct_Answered__c = 20;
                pgi.Count_Of_No_of_Question_Attempted__c =30 ;
                pgi.Count_Of_Total_Reaction_Time__c =1000 ;
                pgis.add(pgi);
            }

		}
        insert plys; 
		insert pgis; 
        for(Game_Detail__c game: [select Id from Game_Detail__c where name in  : gameNames] )	
		{
			Participant_Game_Info__c pgi = new Participant_Game_Info__c();
			pgi.Contact_Name__c = contId;
			pgi.Game_Name__c = game.Id;
            pgi.User_Device__c = 'DESKTOP';
			pgi.Game_Play_Status__c = 'Completed';
			pgis2.add(pgi);
		}
        insert pgis2; 
		
		for(Participant_Game_Info__c pgi: [select Id,Game_Name__c from Participant_Game_Info__c] )	
		{
			Participant_Game_Response__c res1 = new Participant_Game_Response__c();
			res1.Contact_Name__c= contId;
			res1.Game_Name__c = pgi.Game_Name__c;
			res1.Reaction_Time_in_ms__c = 5000;
			res1.Is_Correct__c = true;
			res1.Is_Practice_Question__c = false;  
			res1.Participant_Game_InfoID__c = pgi.Id;
			res1.Participant_Response__c = 'Test';
			res1.Question_Number__c = '1';
			res1.Right_Answer__c = 'Test';
			pgrs.add(res1);
		}
			insert pgrs;       
        
        // Create a list of contact IDs for use in creating Bean_Game__c instances
List<Id> contactIds = new List<Id> {contId };

// Create a list to hold Bean_Game__c instances
List<Bean_Game__c> beans = new List<Bean_Game__c>();

// Define exercise time variables
String rightHandTime = '1:40';
String leftHandTime = '2:40';

// Loop through the list of contact IDs to create Bean_Game__c instances
for (Id contactId : contactIds) {
    // Create 5 instances per contactId
    for (Integer i = 0; i < 5; i++) {
        Bean_Game__c bean = new Bean_Game__c(
            RightHand_1_ExerciseTime__c = rightHandTime,
            RightHand_2_ExerciseTime__c = rightHandTime,
            RightHand_3_ExerciseTime__c = rightHandTime,
            RightHand_4_ExerciseTime__c = rightHandTime,
            LeftHand_1_ExerciseTime__c = leftHandTime,
            LeftHand_2_ExerciseTime__c = leftHandTime,
            LeftHand_3_ExerciseTime__c = leftHandTime,
            LeftHand_4_ExerciseTime__c = leftHandTime,
            Contact__c = contactId
        );
        beans.add(bean);
    }
}

// Insert all Bean_Game__c instances in a single operation
insert beans;

// Create a list to hold Participant_Dashboard__c instances
List<Participant_Dashboard__c> dashboards = new List<Participant_Dashboard__c>();
Game_Detail__c beangame = new Game_Detail__c();
        beangame.Name = 'Bean Game';
        insert beangame;
// Define common properties for dashboards
Integer dataValue = 20;
String dataCategory = 'Other';

// Create instances of Participant_Dashboard__c
Participant_Dashboard__c objDashboard1 = new Participant_Dashboard__c(
    Data_Value__c = dataValue,
    Game_Detail__c = beangame.id,
    Data_Category__c = dataCategory,
    Data_Name__c = 'Overall Average Right Hand'
);
dashboards.add(objDashboard1);

Participant_Dashboard__c objDashboard2 = new Participant_Dashboard__c(
    Data_Value__c = dataValue,
    Game_Detail__c = beangame.id,
    Data_Category__c = dataCategory,
    Data_Name__c = 'Overall Average Left Hand'
);
dashboards.add(objDashboard2);

// Insert all Participant_Dashboard__c instances in a single operation
insert dashboards;

        System.runAs(tempUser)
        {
            LongitudinalGraphController.getGraphdData();
            ParticipantVIPResultsController.getDashboardDataForloggedInUser('Flanker');
            ParticipantVIPResultsController.getDashboardDataForloggedInUser('Keep Track');
            //ParticipantResultsController.getDashboardDataForloggedInUser('Fake News');
            //ParticipantResultsController.getDashboardDataForloggedInUser('Keep Track');
            ParticipantVIPResultsController.getDashboardDataBeanGame('left');
            ParticipantVIPResultsController.getDashboardDataBeanGame('right');
        }       
    }
}