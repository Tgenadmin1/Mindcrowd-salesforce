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
        insert gd;
        
        Game_Detail__c gd2 = new Game_Detail__c();
        gd2.Name = 'Bean Game';
        gd2.Max_score__c = 200;
        insert gd2;
        
        Game_Detail__c gd3 = new Game_Detail__c();
        gd3.Name = 'DLTRS';
        insert gd3;
        
        Game_Detail__c gd4 = new Game_Detail__c();
        gd4.Name = 'Flanker';
        insert gd4;
        
         Game_Detail__c gd15 = new Game_Detail__c();
        gd15.Name = 'Flanker';
        insert gd15;
        
        Game_Detail__c gd5 = new Game_Detail__c();
        gd5.Name = 'Keep Track';
        insert gd5;
        
        Game_Detail__c gd16 = new Game_Detail__c();
        gd16.Name = 'Keep Track';
        insert gd16;
        
        Game_Detail__c gd6 = new Game_Detail__c();
        gd6.Name = 'Face-Name Associates';
        insert gd6;
             
        Game_Detail__c gd7 = new Game_Detail__c();
        gd7.Name = 'Object Discrimination';
        insert gd7;
        
          Game_Detail__c gd18 = new Game_Detail__c();
       gd18.Name = 'Object Discrimination';
        insert gd18;
        
         Game_Detail__c gd17 = new Game_Detail__c();
        gd17.Name = 'Face-Name Associates';
        insert gd17;
        
        Game_Detail__c gd8 = new Game_Detail__c();
        gd8.Name = 'Object Spatial';
        insert gd8;
        
        Game_Detail__c gd19= new Game_Detail__c();
        gd19.Name = 'Object Spatial';
        insert gd19;
        
        Game_Detail__c gd9 = new Game_Detail__c();
        gd9.Name = 'Object Temporal';
        insert gd9;
             Game_Detail__c gd20 = new Game_Detail__c();
        gd20.Name = 'Object Temporal';
        insert gd20;
        
       Game_Detail__c gd10 = new Game_Detail__c();
        gd10.Name = 'Deary Simple And Complex Reaction Time';
        insert gd10;
        
          
       Game_Detail__c gd21 = new Game_Detail__c();
        gd21.Name = 'Deary Simple And Complex Reaction Time';
        insert gd21;
        
        Game_Detail__c gd11 = new Game_Detail__c();
        gd11.Name = 'Object Recognition And Similarity';
        insert gd11;
        
        Game_Detail__c gd22 = new Game_Detail__c();
        gd22.Name = 'Object Recognition And Similarity';
        insert gd22;
        
        Game_Detail__c gd12 = new Game_Detail__c();
        gd11.Name = 'Fake News Test';
        insert gd12;
        
            Game_Detail__c gd23 = new Game_Detail__c();
        gd23.Name = 'Fake News Test';
        insert gd23;
        
        
        Game_Detail__c gd13 = new Game_Detail__c();
        gd13.Name = 'Verbal Paired Associates';
        insert gd13;    
        
         Game_Detail__c gd14 = new Game_Detail__c();
        gd14.Name = 'Letter-Number Sequencing';
        insert gd14;
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
        ply1.Game_Name__c = gd2.Id;
        ply1.High_Average__c =49;
        //ply1.Average__c =25;
        ply1.Low_Average__c =1;
        ply1.Sex__c ='Male';
        insert ply1;
        
        People_Like_You_Data__c ply2 = new People_Like_You_Data__c();
        ply2.Age__c = 95;
        ply2.Education__c = 2;
        ply2.Game_Name__c = gd3.Id;
        ply2.High_Average__c =49;
        //ply2.Average__c =25;
        ply2.Low_Average__c =1;
        ply2.Sex__c ='Male';
        insert ply2;
        //End : "People Like You Data" creation     
        
        People_Like_You_Data__c plyf = new People_Like_You_Data__c();
        plyf.Age__c = 34;
        plyf.Education__c = 1;
        plyf.Game_Name__c = gd4.Id;
        plyf.High_Average__c =34;
        //ply1.Average__c =25;
        plyf.Low_Average__c =1;
        plyf.Sex__c ='Male';
        insert plyf;
        Participant_Game_Info__c pgi3 = new Participant_Game_Info__c();
            pgi3.Contact_Name__c = c.Id;
            pgi3.Game_Name__c = gd4.Id;
            pgi3.Game_Play_Status__c = 'Completed';
            pgi3.Count_Of_No_Of_Correct_Answered__c = 10;
            pgi3.Count_Of_No_of_Question_Attempted__c = 10;
            pgi3.Count_Of_Total_Reaction_Time__c = 10;
            pgi3.Count_Of_No_Of_Correct_Answered__c = 10;
            pgi3.Count_Of_No_of_Question_Attempted__c = 10;
            pgi3.Count_Of_Total_Reaction_Time__c = 10;
            insert pgi3;
        
        
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
        
        List<Participant_Game_Info__c> pgis = new List<Participant_Game_Info__c>();
        for(Game_Detail__c game: [select id from Game_Detail__c]){
            Participant_Game_Info__c pgi2 = new Participant_Game_Info__c();
            pgi2.Contact_Name__c = c.Id;
            pgi2.Game_Name__c = game.Id;
            pgi2.Game_Play_Status__c = 'Completed';
            pgi2.Count_Of_No_Of_Correct_Answered__c = 10;
            pgi2.Count_Of_No_of_Question_Attempted__c = 10;
            pgi2.Count_Of_Total_Reaction_Time__c = 10;
            pgi2.Count_Of_No_Of_Correct_Answered__c = 10;
            pgi2.Count_Of_No_of_Question_Attempted__c = 10;
            pgi2.Count_Of_Total_Reaction_Time__c = 10;
            pgis.add(pgi2);
        }
        
        insert pgis;
        
        Participant_Game_Response__c res2 = new Participant_Game_Response__c();
        res2.Contact_Name__c= c.Id;
        res2.Game_Name__c = gd3.Id;
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
        
              User tempUser2 = new User(  
            FirstName = c1.LastName,  
            LastName = c1.LastName,  
            ContactId = c1.Id,
            email = uniqueName + '@sfdc1' + orgId + '.org',  
            Username = uniqueName + '@sfdc1' + orgId + '.org',  
            EmailEncodingKey = 'ISO-8859-1',  
            Alias = uniqueName.substring(18, 23),  
            TimeZoneSidKey = 'America/Los_Angeles',  
            LocaleSidKey = 'en_US',  
            LanguageLocaleKey = 'en_US',  
            ProfileId = profileId
        );            
        insert tempUser2;  
        
                      User tempUser3 = new User(  
            FirstName = c2.LastName,  
            LastName = c2.LastName,  
            ContactId = c2.Id,
            email = uniqueName + '@sfdc2' + orgId + '.org',  
            Username = uniqueName + '@sfdc2' + orgId + '.org',  
            EmailEncodingKey = 'ISO-8859-1',  
            Alias = uniqueName.substring(18, 23),  
            TimeZoneSidKey = 'America/Los_Angeles',  
            LocaleSidKey = 'en_US',  
            LanguageLocaleKey = 'en_US',  
            ProfileId = profileId
        );            
        insert tempUser3;   


        
          

List<Bean_Game__c> beans = new List<Bean_Game__c>();      
        Bean_Game__c bean = new Bean_Game__c(RightHand_1_ExerciseTime__c='1:40', RightHand_2_ExerciseTime__c='1:40',
            RightHand_3_ExerciseTime__c='1:40',RightHand_4_ExerciseTime__c='1:40',LeftHand_1_ExerciseTime__c='2:40',
            LeftHand_2_ExerciseTime__c='2:40',LeftHand_3_ExerciseTime__c='2:40',LeftHand_4_ExerciseTime__c='2:40',Contact__c=c.Id);
        
                Bean_Game__c bean2 = new Bean_Game__c(RightHand_1_ExerciseTime__c='1:40', RightHand_2_ExerciseTime__c='1:40',
            RightHand_3_ExerciseTime__c='1:40',RightHand_4_ExerciseTime__c='1:40',LeftHand_1_ExerciseTime__c='2:40',
            LeftHand_2_ExerciseTime__c='2:40',LeftHand_3_ExerciseTime__c='2:40',LeftHand_4_ExerciseTime__c='2:40',Contact__c=c1.Id);
        
                        Bean_Game__c bean3 = new Bean_Game__c(RightHand_1_ExerciseTime__c='1:40', RightHand_2_ExerciseTime__c='1:40',
            RightHand_3_ExerciseTime__c='1:40',RightHand_4_ExerciseTime__c='1:40',LeftHand_1_ExerciseTime__c='2:40',
            LeftHand_2_ExerciseTime__c='2:40',LeftHand_3_ExerciseTime__c='2:40',LeftHand_4_ExerciseTime__c='2:40',Contact__c=c2.Id);
        
               Bean_Game__c bean4 = new Bean_Game__c(RightHand_1_ExerciseTime__c='1:40', RightHand_2_ExerciseTime__c='1:40',
            RightHand_3_ExerciseTime__c='1:40',RightHand_4_ExerciseTime__c='1:40',LeftHand_1_ExerciseTime__c='2:40',
            LeftHand_2_ExerciseTime__c='2:40',LeftHand_3_ExerciseTime__c='2:40',LeftHand_4_ExerciseTime__c='2:40',Contact__c=c.Id);
        
                        Bean_Game__c bean5 = new Bean_Game__c(RightHand_1_ExerciseTime__c='1:40', RightHand_2_ExerciseTime__c='1:40',
            RightHand_3_ExerciseTime__c='1:40',RightHand_4_ExerciseTime__c='1:40',LeftHand_1_ExerciseTime__c='2:40',
            LeftHand_2_ExerciseTime__c='2:40',LeftHand_3_ExerciseTime__c='2:40',LeftHand_4_ExerciseTime__c='2:40',Contact__c=c1.Id);
        
                        Bean_Game__c bean6 = new Bean_Game__c(RightHand_1_ExerciseTime__c='1:40', RightHand_2_ExerciseTime__c='1:40',
            RightHand_3_ExerciseTime__c='1:40',RightHand_4_ExerciseTime__c='1:40',LeftHand_1_ExerciseTime__c='2:40',
            LeftHand_2_ExerciseTime__c='2:40',LeftHand_3_ExerciseTime__c='2:40',LeftHand_4_ExerciseTime__c='2:40',Contact__c=c2.Id);
        
        
                        Bean_Game__c bean7 = new Bean_Game__c(RightHand_1_ExerciseTime__c='1:40', RightHand_2_ExerciseTime__c='1:40',
            RightHand_3_ExerciseTime__c='1:40',RightHand_4_ExerciseTime__c='1:40',LeftHand_1_ExerciseTime__c='2:40',
            LeftHand_2_ExerciseTime__c='2:40',LeftHand_3_ExerciseTime__c='2:40',LeftHand_4_ExerciseTime__c='2:40',Contact__c=c1.Id);
        
                        Bean_Game__c bean8 = new Bean_Game__c(RightHand_1_ExerciseTime__c='1:40', RightHand_2_ExerciseTime__c='1:40',
            RightHand_3_ExerciseTime__c='1:40',RightHand_4_ExerciseTime__c='1:40',LeftHand_1_ExerciseTime__c='2:40',
            LeftHand_2_ExerciseTime__c='2:40',LeftHand_3_ExerciseTime__c='2:40',LeftHand_4_ExerciseTime__c='2:40',Contact__c=c2.Id);
        
                Bean_Game__c bean9 = new Bean_Game__c(RightHand_1_ExerciseTime__c='1:40', RightHand_2_ExerciseTime__c='1:40',
            RightHand_3_ExerciseTime__c='1:40',RightHand_4_ExerciseTime__c='1:40',LeftHand_1_ExerciseTime__c='2:40',
            LeftHand_2_ExerciseTime__c='2:40',LeftHand_3_ExerciseTime__c='2:40',LeftHand_4_ExerciseTime__c='2:40',Contact__c=c.Id);
        
                Bean_Game__c bean10 = new Bean_Game__c(RightHand_1_ExerciseTime__c='1:40', RightHand_2_ExerciseTime__c='1:40',
            RightHand_3_ExerciseTime__c='1:40',RightHand_4_ExerciseTime__c='1:40',LeftHand_1_ExerciseTime__c='2:40',
            LeftHand_2_ExerciseTime__c='2:40',LeftHand_3_ExerciseTime__c='2:40',LeftHand_4_ExerciseTime__c='2:40',Contact__c=c1.Id);
        
                        Bean_Game__c bean11 = new Bean_Game__c(RightHand_1_ExerciseTime__c='1:40', RightHand_2_ExerciseTime__c='1:40',
            RightHand_3_ExerciseTime__c='1:40',RightHand_4_ExerciseTime__c='1:40',LeftHand_1_ExerciseTime__c='2:40',
            LeftHand_2_ExerciseTime__c='2:40',LeftHand_3_ExerciseTime__c='2:40',LeftHand_4_ExerciseTime__c='2:40',Contact__c=c2.Id);
        
               Bean_Game__c bean12 = new Bean_Game__c(RightHand_1_ExerciseTime__c='1:40', RightHand_2_ExerciseTime__c='1:40',
            RightHand_3_ExerciseTime__c='1:40',RightHand_4_ExerciseTime__c='1:40',LeftHand_1_ExerciseTime__c='2:40',
            LeftHand_2_ExerciseTime__c='2:40',LeftHand_3_ExerciseTime__c='2:40',LeftHand_4_ExerciseTime__c='2:40',Contact__c=c.Id);
        
                        Bean_Game__c bean13 = new Bean_Game__c(RightHand_1_ExerciseTime__c='1:40', RightHand_2_ExerciseTime__c='1:40',
            RightHand_3_ExerciseTime__c='1:40',RightHand_4_ExerciseTime__c='1:40',LeftHand_1_ExerciseTime__c='2:40',
            LeftHand_2_ExerciseTime__c='2:40',LeftHand_3_ExerciseTime__c='2:40',LeftHand_4_ExerciseTime__c='2:40',Contact__c=c1.Id);
        
                        Bean_Game__c bean14 = new Bean_Game__c(RightHand_1_ExerciseTime__c='1:40', RightHand_2_ExerciseTime__c='1:40',
            RightHand_3_ExerciseTime__c='1:40',RightHand_4_ExerciseTime__c='1:40',LeftHand_1_ExerciseTime__c='2:40',
            LeftHand_2_ExerciseTime__c='2:40',LeftHand_3_ExerciseTime__c='2:40',LeftHand_4_ExerciseTime__c='2:40',Contact__c=c2.Id);
        
        
                        Bean_Game__c bean15 = new Bean_Game__c(RightHand_1_ExerciseTime__c='1:40', RightHand_2_ExerciseTime__c='1:40',
            RightHand_3_ExerciseTime__c='1:40',RightHand_4_ExerciseTime__c='1:40',LeftHand_1_ExerciseTime__c='2:40',
            LeftHand_2_ExerciseTime__c='2:40',LeftHand_3_ExerciseTime__c='2:40',LeftHand_4_ExerciseTime__c='2:40',Contact__c=c1.Id);
        
                        Bean_Game__c bean16 = new Bean_Game__c(RightHand_1_ExerciseTime__c='1:40', RightHand_2_ExerciseTime__c='1:40',
            RightHand_3_ExerciseTime__c='1:40',RightHand_4_ExerciseTime__c='1:40',LeftHand_1_ExerciseTime__c='2:40',
            LeftHand_2_ExerciseTime__c='2:40',LeftHand_3_ExerciseTime__c='2:40',LeftHand_4_ExerciseTime__c='2:40',Contact__c=c2.Id);
     beans.add(bean);
     beans.add(bean2);
     beans.add(bean3);
             beans.add(bean4);
     beans.add(bean5);
     beans.add(bean6);
             beans.add(bean7);
     beans.add(bean8);
     beans.add(bean9);
             beans.add(bean10);
     beans.add(bean11);
     beans.add(bean12);
             beans.add(bean13);
     beans.add(bean14);
     beans.add(bean15);
           beans.add(bean16);
         insert beans;
        
        Participant_Dashboard__c objDashboard = new Participant_Dashboard__c();
        objDashboard.Data_Value__c = 20;
        objDashboard.Game_Detail__c =gd2.Id;
        objDashboard.Data_Category__c = 'Other';
        objDashboard.Data_Name__c = 'Overall Average Right Hand';
        insert objDashboard;
        Participant_Dashboard__c objDashboard2 = new Participant_Dashboard__c();
        objDashboard2.Data_Value__c = 20;
        objDashboard2.Game_Detail__c =gd2.Id;
        objDashboard2.Data_Category__c = 'Other';
        objDashboard2.Data_Name__c = 'Overall Average Left Hand';
        insert objDashboard2;
        
           System.runAs(tempUser)
        {
            ParticipantVIPResultsController.getDashboardDataForloggedInUser(gd.Name);
            LongitudinalGraphController.getGraphdData();
        } 
              System.runAs(tempUser2)
        {
       
            ParticipantVIPResultsController.getDashboardDataBeanGame('left');
       
           
        }   
        
                   System.runAs(tempUser2)
        {
       
            ParticipantVIPResultsController.getDashboardDataBeanGame('right');
       
           
        }

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
            ParticipantVIPResultsController.getDashboardDataForloggedInUser(gd.Name);
            ParticipantVIPResultsController.getDashboardDataBeanGame('left');
            ParticipantVIPResultsController.getDashboardDataBeanGame('right');
            LongitudinalGraphController.getGraphdData();
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
     /*@isTest
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
        ParticipantVIPResultsController.saveSign(base64Data, contentType, currentUserId, gameName);
    }*/
}