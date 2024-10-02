// Created By: {Girikon(Manikumar Meruva)}
// Created On: 27/08/2021
// Description/Purpose:Test class created for Catchment and Expanded Game User dashboards.{TM-85}
// Methods: {createUser,getDashboardDataForloggedInUserTest,getGuestUserGameDetailsTest,getMyGameDetailsTest}
// Apex Class: {ParticipantVIPResultsController}

@isTest
public class BatchGameResultDashboardAVGTest
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
        Insert c;
        
        Contact c1 = new Contact();
        c1.LastName= 'test1 last name';
        c1.Email = 'Test1@test.com';
        c1.AccountId =objAcc.Id;
        c1.Sex__c = 'Male';
        c1.Age__c = 15;
        c1.Highest_level_of_education_completed__c = 'High School Diploma (Baccalaureate)';
        c1.Language__c='English';
        Insert c1;
        
        Contact c2 = new Contact();
        c2.LastName= 'test2 last name';
        c2.Email = 'Test2@test.com';
        c2.AccountId =objAcc.Id;
        c2.Sex__c = 'Male';
        c2.Age__c = 95;
        c2.Highest_level_of_education_completed__c = 'High School Diploma (Baccalaureate)';
        c2.Language__c='English';
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
    private static void testBatchClass()
    {     
        User tempUser = [Select Id,ContactId From User Where Username Like '%sfdc%' limit 1];
        Id contId = tempUser.ContactId;
        List<String> gameNames = new List<String>{'Face-Name Associates','Flanker','Keep Track','Object Discrimination','Object Spatial','Object Temporal','Deary Simple And Complex Reaction Time','Object Recognition And Similarity','Letter-Number Sequencing','Verbal Paired Associates'};
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
            Participant_Game_Info__c pgi = new Participant_Game_Info__c();
            pgi.Contact_Name__c = contId;
            pgi.Game_Name__c = game.Id;
            pgi.User_Device__c = 'DESKTOP';
            pgi.Game_Play_Status__c = 'Completed';
            pgi.Count_Of_No_Of_Correct_Answered__c = 20;
            pgi.Count_Of_No_of_Question_Attempted__c =30 ;
            pgi.Count_Of_Total_Reaction_Time__c =1000 ;
            pgi.CreatedDate = Date.today()-91;
            pgis.add(pgi);
    

		}
        insert plys; 
		insert pgis; 
        for(Participant_Game_Info__c pgi : [SELECT Id, CreatedDate,Game_Name__r.Name  from Participant_Game_Info__c ] ){
            if(pgi.Game_Name__r.Name == 'Flanker' || pgi.Game_Name__r.Name == 'Letter-Number Sequencing' || 
               pgi.Game_Name__r.Name == 'Keep Track' || pgi.Game_Name__r.Name == 'Deary Simple And Complex Reaction Time'){
                Test.setCreatedDate(pgi.Id,DateTime.newInstance(2023,04,24));
            }
            else if(pgi.Game_Name__r.Name == 'Object Discrimination' || pgi.Game_Name__r.Name == 'Object Temporal'||
                    pgi.Game_Name__r.Name == 'Face-Name Associates' || pgi.Game_Name__r.Name == 'Object Spatial'){
                Test.setCreatedDate(pgi.Id, DateTime.newInstance(2023,01,22));
            }
            else {
                Test.setCreatedDate(pgi.Id, DateTime.newInstance(2022,07,24));
            }
                   pgi.Count_Of_No_Of_Correct_Answered__c = 20;
                pgi.Count_Of_No_of_Question_Attempted__c =30 ;
                pgi.Count_Of_Total_Reaction_Time__c =1000 ;
            
        }
                     /*System.debug([Select id, Game_Name__r.Name,Contact_Name__r.Id, Contact_Name__c, Game_Name__c,createddate
										FROM Participant_Game_Info__c 
										WHERE
										Game_Name__r.Name IN ('Flanker')												
										AND CreatedDate >= N_DAYS_AGO:91
													AND Count_Of_No_Of_Correct_Answered__c != null
                                                  	AND Count_Of_No_of_Question_Attempted__c != null
                                                  	AND Count_Of_Total_Reaction_Time__c != null
                                                  	AND Count_Of_No_Of_Correct_Answered__c >0
                                                  	AND Count_Of_No_of_Question_Attempted__c >0
                                                  	AND Count_Of_Total_Reaction_Time__c >0
                                                    AND Contact_Name__r.Language__c='English'][0].createddate);*/
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
        Test.startTest();      
            BatchGameResultDashboardAVG batchClass = new BatchGameResultDashboardAVG();
            Database.executeBatch(batchClass,2000);
        Test.stopTest();     
    }
}