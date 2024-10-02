@isTest public class GamesPageDependencyControllerTest {
    public static testMethod void gamesPageDependencyTest() {
        Contact con=new Contact(); 
            con.Object_Discrimination__c='Locked';
            con.Keep_Track__c='Locked';
            con.Letter_Number_Sequencing__c='Locked'; 
            con.Face_Name_Associates__c='Locked';
            con.Flanker__c='Opened';
            con.Object_Recognition_And_Similarity__c='Locked'; 
            con.Verbal_Paired_Associates__c='Locked';
            con.Deary_Simple_And_Complex_Reaction_Time__c='Locked';
            con.Object_Temporal__c='Locked';
            con.Object_Spatial__c='Locked';
            con.LastName='xyz';
        insert con;
        
        Game_Detail__c game1=new Game_Detail__c(Name='Deary Simple And Complex Reaction Time',Reactivation_Days__c=10,Dependency__c='');
        insert game1;
        Game_Detail__c game2=new Game_Detail__c(Name='Verbal Paired Associates',Reactivation_Days__c=10,Dependency__c='');
            insert game2;
        Game_Detail__c game3=new Game_Detail__c(Name='Object Recognition And Similarity',Reactivation_Days__c=10,Dependency__c='');
            insert game3;
        Game_Detail__c game4=new Game_Detail__c(Name='Flanker',Reactivation_Days__c=10,Dependency__c='Object Recognition And Similarity');
            insert game4;
        Game_Detail__c game5=new Game_Detail__c(Name='Face-Name Associates',Reactivation_Days__c=10,Dependency__c='Object Recognition And Similarity');
            insert game5;
        Game_Detail__c game6=new Game_Detail__c(Name='Letter-Number Sequencing',Reactivation_Days__c=10,Dependency__c='Object Recognition And Similarity');
            insert game6;
        Game_Detail__c game7=new Game_Detail__c(Name='Keep Track',Reactivation_Days__c=10,Dependency__c='Object Recognition And Similarity');
            insert game7;
        Game_Detail__c game8=new Game_Detail__c(Name='Object Discrimination',Reactivation_Days__c=10,Dependency__c='Object Recognition And Similarity');
            insert game8;
         Game_Detail__c game9=new Game_Detail__c(Name='Object Temporal',Reactivation_Days__c=10,Dependency__c='Object Recognition And Similarity');
            insert game9;
         Game_Detail__c game10=new Game_Detail__c(Name='Object Spatial',Reactivation_Days__c=10,Dependency__c='Object Recognition And Similarity');
            insert game10;
         
        Participant_Game_Info__c pGameInfo1 = new  Participant_Game_Info__c(Contact_Name__c=con.id,Game_Name__c=game1.id);
            insert pGameInfo1;
        Participant_Game_Info__c pGameInfo2 = new  Participant_Game_Info__c(Contact_Name__c=con.id,Game_Name__c=game2.id);
            insert pGameInfo2;
        Participant_Game_Info__c pGameInfo3 = new  Participant_Game_Info__c(Contact_Name__c=con.id,Game_Name__c=game3.id);
            insert pGameInfo3;
            Participant_Game_Info__c pGameInfo4 = new  Participant_Game_Info__c(Contact_Name__c=con.id,Game_Name__c=game4.id);
            insert pGameInfo4;
            Participant_Game_Info__c pGameInfo5 = new  Participant_Game_Info__c(Contact_Name__c=con.id,Game_Name__c=game5.id);
            insert pGameInfo5;
            Participant_Game_Info__c pGameInfo6 = new  Participant_Game_Info__c(Contact_Name__c=con.id,Game_Name__c=game6.id);
            insert pGameInfo6;
            Participant_Game_Info__c pGameInfo7 = new  Participant_Game_Info__c(Contact_Name__c=con.id,Game_Name__c=game7.id);
            insert pGameInfo7;
            Participant_Game_Info__c pGameInfo8 = new  Participant_Game_Info__c(Contact_Name__c=con.id,Game_Name__c=game8.id);
            insert pGameInfo8;
        
        String data4='{"Contact_Name__c":"'+con.id+'", "Game_Name__c":"'+pGameInfo3.Game_Name__c+'","Game_Play_Status__c":"Not Completed"}';
        String data5='{"Contact_Name__c":"'+con.id+'", "Game_Name__c":"'+pGameInfo2.Game_Name__c+'","Game_Play_Status__c":"Not Completed"}';
        String data6='{"Contact_Name__c":"'+con.id+'", "Game_Name__c":"'+pGameInfo1.Game_Name__c+'","Game_Play_Status__c":"Not Completed"}';
        String data7='{"Contact_Name__c":"'+con.id+'", "Game_Name__c":"'+pGameInfo4.Game_Name__c+'","Game_Play_Status__c":"Not Completed"}';
        String data8='{"Contact_Name__c":"'+con.id+'", "Game_Name__c":"'+pGameInfo5.Game_Name__c+'","Game_Play_Status__c":"Not Completed"}';
        String data9='{"Contact_Name__c":"'+con.id+'", "Game_Name__c":"'+pGameInfo6.Game_Name__c+'","Game_Play_Status__c":"Not Completed"}';
        String data10='{"Contact_Name__c":"'+con.id+'", "Game_Name__c":"'+pGameInfo7.Game_Name__c+'","Game_Play_Status__c":"Not Completed"}';
        String data11='{"Contact_Name__c":"'+con.id+'", "Game_Name__c":"'+pGameInfo8.Game_Name__c+'","Game_Play_Status__c":"Not Completed"}';
 
        Test.startTest();
        GamesPageDependencyController.triggerForUpdateContactGamesField(data4);
         GamesPageDependencyController.triggerForUpdateContactGamesField(data5);
         GamesPageDependencyController.triggerForUpdateContactGamesField(data6);
         GamesPageDependencyController.triggerForUpdateContactGamesField(data7);
         GamesPageDependencyController.triggerForUpdateContactGamesField(data8);
         GamesPageDependencyController.triggerForUpdateContactGamesField(data9);
         GamesPageDependencyController.triggerForUpdateContactGamesField(data10);
         GamesPageDependencyController.triggerForUpdateContactGamesField(data11);
        Test.stopTest();
    }
}