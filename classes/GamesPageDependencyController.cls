// Created By: (Sunil Kumar)
// Updated On: 25/08/2021
// Description/Purpose: This Apex class control and update the contact's game field as per the participant game information.
//TestClass:GamesPageDependencyControllerTest(Coverage=85%)
public without sharing class GamesPageDependencyController {
    public static void triggerForUpdateContactGamesField(String sobj)
    {

        Participant_Game_Info__c obj= (Participant_Game_Info__c)JSON.deserialize(sobj, Participant_Game_Info__c.class);
        List<Game_Detail__c> gameLst= [select name, id from Game_Detail__c where id =: obj.Game_Name__c];
        String Game1; 
        if(gameLst !=null && gameLst.size() >0)
        {
            Game_Detail__c gameReffrence =gameLst[0];
             Game1 = gameReffrence.name;
        }
        List <Contact> upConList = new List <Contact>();
        For (Contact con: [SELECT Id, Object_Temporal__c, Object_Spatial__c, Object_Discrimination__c, Keep_Track__c, Letter_Number_Sequencing__c, Face_Name_Associates__c, Flanker__c, Object_Recognition_And_Similarity__c, Verbal_Paired_Associates__c, Deary_Simple_And_Complex_Reaction_Time__c,Fake_News__c,Tell_Me__c,Tell_Me_More__c,Digits__c,This_That__c FROM Contact WHERE id=:obj.Contact_Name__c]) 
            {      
                if(Game1 == System.Label.scientific_game_dearySimpleAndComplexReactionTime)
                {
                    con.Deary_Simple_And_Complex_Reaction_Time__c ='Completed';
             
                }   
                if(Game1 == System.Label.scientific_game_verbalPairedAssociates)
                {
                    con.Verbal_Paired_Associates__c ='Completed';
       
                }             
                if(Game1 == System.Label.scientific_game_objectRecognitionAndSimilarity)
                {
                    con.Object_Recognition_And_Similarity__c ='Completed';
        
                } 
                if(Game1 == System.Label.scientific_game_flanker)
                {
                    con.Flanker__c ='Completed';   
             
                }
                if(Game1 == System.Label.scientific_game_faceNameAssociates)
                {
                    con.Face_Name_Associates__c ='Completed'; 
         
                }
                if(Game1 == System.Label.scientific_game_letterNumberSequencing)
                {
                    con.Letter_Number_Sequencing__c ='Completed'; 
          
                }
                if(Game1 == System.Label.scientific_game_keepTrack)
                {
                    con.Keep_Track__c ='Completed';
           
                }
                if(Game1 == System.Label.scientific_game_objectDiscrimination)
                {
                    con.Object_Discrimination__c ='Completed';
         
                }    
                if(Game1 == System.Label.scientific_game_objectTemporal)
                {
                    con.Object_Temporal__c ='Completed';
               
                } 
                if(Game1 == System.Label.scientific_game_objectSpatial)
                {
                    con.Object_Spatial__c ='Completed';
             
                }  
                if(Game1 == System.Label.scientific_game_fakeNewsTest)
                {
                    con.Fake_News__c ='Completed';
             
                } 
                if(Game1 == System.Label.scientific_game_Tell_me)
                {
                    con.Tell_Me__c ='Completed';
             
                } 
                if(Game1 == System.Label.scientific_game_Tell_me_more)
                {
                    con.Tell_Me_More__c ='Completed';
             
                } 
                if(Game1 == System.Label.scientific_game_digitsymbolmatchingtest)
                {
                    con.Digits__c ='Completed';
             
                } 
                if(Game1 == System.Label.scientific_game_This_That)
                {
                    con.This_That__c ='Completed';
             
                }
               upConList.add(con); 
            } 
            If (upConList.size ()> 0)
            {
                update upConList;
            }  
        
        // List will contain all those game which need to set opened for current contact
        List<String> lstGameToSetOpened = new List<String>();

        //Get all game depedent on cuurent game played by test-taker
        List<Game_Detail__c> lstAllGames=[SELECT Id, Name, Dependency__c FROM Game_Detail__c where IsDeleted=false AND Dependency__c includes (:Game1)];

        //Prepare list of other games on which above games are dependent
        List<String> lstOtherGameDependecny=new List<String>();
        for(Game_Detail__c g:lstAllGames)
        {
            //Get dependecy of game
            String gameDependecy=g.Dependency__c !=null? g.Dependency__c : '';                                      
            if(String.isNotBlank(gameDependecy))
            {
                //Split to get all colon separated values
                string[] gameDependecyArr=gameDependecy.split(';');                     
                for(integer i=0;i<gameDependecyArr.size();i++)
                {
                    //Dont add in list if value already exists i.e. once added already
                    if(!lstOtherGameDependecny.Contains(gameDependecyArr[i]))
                        lstOtherGameDependecny.Add(gameDependecyArr[i]);
                }
            }
        }

        if(lstOtherGameDependecny!=null && lstOtherGameDependecny.size()>0)
        {
            //Check whether current contact has played all dependent games or not
            List<Participant_Game_Info__c> lstPGI=[Select Id,Game_Name__r.Name From Participant_Game_Info__c where Game_Name__r.Name IN :lstOtherGameDependecny AND Contact_Name__c =:obj.Contact_Name__c];
            //Prepare the list of completed games (by cuurent contact) among dependent games
            List<String> lstCompletedGames=new List<String>();  
            for(Participant_Game_Info__c pgi: lstPGI)
                lstCompletedGames.Add(pgi.Game_Name__r.Name.toUpperCase());
            if(lstCompletedGames!=null && lstCompletedGames.size()>0)
            {
                for(Game_Detail__c g:lstAllGames)
                {
                    String gameDependecy=g.Dependency__c !=null? g.Dependency__c : '';                                              
                    if(String.isNotBlank(gameDependecy))
                    {
                        string[] gameDependecyArr=gameDependecy.split(';');
                        Boolean allCompleted=false;
                        for(integer i=0;i<gameDependecyArr.size();i++)
                        {
                            //Check whether current contact has completed dependent game or not
                            if(lstCompletedGames.Contains(gameDependecyArr[i].toUpperCase()))
                                allCompleted=true;
                            else
                            {
                                allCompleted=false; //Test is properly
                                break; 
                            }
                        }
                        if(allCompleted)
                            lstGameToSetOpened.Add(g.Name);
                    }
                }
                System.debug('listof lstGameToSetOpened'+lstGameToSetOpened);
            }
        }
        if(lstGameToSetOpened!=null && lstGameToSetOpened.size()>0)
        {
            //mark all games of lstGameToSetOpened opended in Current Contact
            for(String strGame : lstGameToSetOpened)
            {
                //Mark current contact
                Contact con=new Contact(Id=obj.Contact_Name__c);
                        if(strGame == System.Label.scientific_game_dearySimpleAndComplexReactionTime)
                        {
                            con.Deary_Simple_And_Complex_Reaction_Time__c ='Opened';
                            update con; 
                            mindCrowdCustomNotificationController.notifyUserOtherGames(obj.Contact_Name__c,strGame);
                        }   
                        if(strGame == System.Label.scientific_game_verbalPairedAssociates)
                        {
                            con.Verbal_Paired_Associates__c ='Opened';
                            update con; 
                            mindCrowdCustomNotificationController.notifyUserOtherGames(obj.Contact_Name__c,strGame);
                        }             
                        if(strGame == System.Label.scientific_game_objectRecognitionAndSimilarity)
                        {
                            con.Object_Recognition_And_Similarity__c ='Opened';
                            update con; 
                            mindCrowdCustomNotificationController.notifyUserOtherGames(obj.Contact_Name__c,strGame);
                        } 
                        if(strGame == System.Label.scientific_game_flanker)
                        {
                            con.Flanker__c ='Opened'; 
                            update con; 
                             mindCrowdCustomNotificationController.notifyUserOtherGames(obj.Contact_Name__c,strGame);
                        }
                        if(strGame == System.Label.scientific_game_faceNameAssociates)
                        {
                            con.Face_Name_Associates__c ='Opened'; 
                            update con; 
                             mindCrowdCustomNotificationController.notifyUserOtherGames(obj.Contact_Name__c,strGame);
                        }
                        if(strGame == System.Label.scientific_game_letterNumberSequencing)
                        {
                            con.Letter_Number_Sequencing__c ='Opened'; 
                            update con; 
                              mindCrowdCustomNotificationController.notifyUserOtherGames(obj.Contact_Name__c,strGame);
                        }
                        if(strGame == System.Label.scientific_game_keepTrack)
                        {
                            con.Keep_Track__c ='Opened';
                            update con; 
                             mindCrowdCustomNotificationController.notifyUserOtherGames(obj.Contact_Name__c,strGame);
                        }
                        if(strGame == System.Label.scientific_game_objectDiscrimination)
                        {
                            con.Object_Discrimination__c ='Opened';
                            update con; 
                             mindCrowdCustomNotificationController.notifyUserOtherGames(obj.Contact_Name__c,strGame);
                        }     
                        if(strGame == System.Label.scientific_game_objectTemporal)
                        {
                            con.Object_Temporal__c ='Opened';
                            update con; 
                             mindCrowdCustomNotificationController.notifyUserOtherGames(obj.Contact_Name__c,strGame);
                        }  
                        if(strGame == System.Label.scientific_game_objectSpatial)
                        {
                            con.Object_Spatial__c ='Opened';
                            update con; 
                            mindCrowdCustomNotificationController.notifyUserOtherGames(obj.Contact_Name__c,strGame);
                        }           
                        //update con; 
            }                
        }        
    }
}