@isTest
public class LongitudinalGraphControllerTest {  
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
    private static void testgetGraphdData()
    {     
        User tempUser = [Select Id From User Where Username Like '%sfdc%' limit 1]; 

        Game_Detail__c gd = new Game_Detail__c();
        gd.Name = 'WORD PAIR GAME';
        insert gd;
        
        
        System.runAs(tempUser)
        {
            ParticipantResultsController.getDashboardDataForloggedInUser(gd.Name);
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
        ParticipantResultsController.getDashboardData(c.Id,gd.Name);
        
        Contact c1 = [Select Id,Sex__c,Age__c,Highest_level_of_education_completed__c,Education_Attainment__c from Contact Where Age__c=15 limit 1];
        ParticipantResultsController.getDashboardData(c1.Id,gd.Name);
      
        Contact c2 = [Select Id,Sex__c,Age__c,Highest_level_of_education_completed__c,Education_Attainment__c from Contact Where  Age__c=95 limit 1];
        ParticipantResultsController.getDashboardData(c2.Id,gd.Name);
    } 
     @isTest
    private static void saveSignTest()
    {    
        Contact d1 = new Contact();
        d1.LastName= 'test20 last name';
        d1.Sex__c = 'Male';
        d1.Age__c = 87;
        Insert d1;
        Game_Detail__c gd = new Game_Detail__c();
        //gd.Name = 'PAIRED GAME';
        gd.Name = 'DLTRS';
        insert gd;
        Participant_Game_Info__c pGI=new Participant_Game_Info__c();
        pGI.Game_Name__c=gd.id;
        pGI.participantFeatureImageURL__c='';
        pGI.Contact_Name__c=d1.id;
        pGI.Game_Play_Status__c='Completed';
        Insert pGI;
        String base64Data='Hi this is MindCrowd';
        String contentType='image.png';
        String currentUserId=d1.id;
        String gameName='DLTRS';
       // List<Participant_Game_Info__c> lstPartGameInfo=[SELECT Id, Game_Name__c, participantFeatureImageURL__c, Contact_Name__c, Game_Play_Status__c FROM Participant_Game_Info__c Where Participant_Game_Info__c.Contact_Name__c=:currentUserId]; 
        ParticipantResultsController.saveSign(base64Data, contentType, currentUserId, gameName);
    }
}