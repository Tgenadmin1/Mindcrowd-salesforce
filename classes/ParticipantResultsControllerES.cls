// Created By: {Girikon(Manikumar Meruva)}
// Created On: 17/08/2021
// Description/Purpose: Why and where it is used [TM-203]-It was Created for Catchment and Expanded Game Users Dashboards
// Methods: {getMyGameDetails,getDashboardDataForloggedInUser,getGuestUserGameDetails,getDashboardData}
// Test Class: {ParticipantResultsController_Test} {Code Coverage:96%}
/**
* Controller for catchment results page and Expanded myResults page
* Modify By : {ManiKumar Meruva}
* 
*/
public without sharing class ParticipantResultsControllerES
{    
    
    @AuraEnabled(cacheable=true)
    public static DashboardData getDashboardDataForloggedInUser (String gameName)
    {
        List<User> lstUsers = [SELECT Id,ContactId 
                               From User 
                               where Id =: UserInfo.getUserId()
                               AND ContactId != null];
        String ContactId = lstUsers[0].ContactId;
        return getDashboardData(ContactId, gameName);
    }
    
    @AuraEnabled(cacheable=true) 
    public static DashboardData getDashboardData (String contactId, String gameName)
    {
        
        Map<String, Integer> mapOtherData = new Map<String, Integer>();
        Map<String, Integer> mapWhatHappendWithAgeData = new Map<String, Integer>();
        Map<String, Integer> mapPlyAverageValuesData = new Map<String, Integer>();
        Map<String, Integer> overaallAvgMap = new Map<String, Integer>{'DLTRS'=>498,'Deary Simple And Complex Reaction Time'=>498,
            'Face-Name Associates'=>28,'Keep Track'=>14,'Letter-Number Sequencing'=>89,'Object Discrimination'=>22,
            'Object Recognition And Similarity'=>92,'Object Spatial'=>22,'Object Temporal'=>22,'PAIRED GAME'=>17,'Flanker'=>23,
            'Verbal Paired Associates'=>17};
        
        mapOtherData.put('YourScore',0);
        mapOtherData.put('isGamePlayed',0); 
        mapOtherData.put('CorrectAnswers',0); 
        mapOtherData.put('ReactionTime',0); 
        
        DashboardData objDashboardData = new DashboardData();
        
        for(Participant_Game_Info__c objInfo:[SELECT 
                                              /*Added three fields to remove dependency PGR from PGI*/
                                              /* Added on 27/07/2022 */
                                              Count_Of_No_Of_Correct_Answered__c,
                                              Count_Of_No_of_Question_Attempted__c,
                                              Count_Of_Total_Reaction_Time__c,
                                              No_Of_Correct_Answered__c,
                                              No_of_Question_Attempted__c,
                                              Total_Reaction_Time__c,
                                              User_Device__c                                        
                                              FROM Participant_Game_Info__c 
                                              WHERE Contact_Name__c =: contactId  
                                              AND Game_Name__r.Name =:gameName 
                                              ORDER BY CreatedDate DESC LIMIT 1])
        {
            System.debug(objInfo.No_of_Question_Attempted__c);
            System.debug(objInfo.No_Of_Correct_Answered__c );
            System.debug(objInfo.Total_Reaction_Time__c);
            /*changes was made to remove dependency of RollUp summary fields on PGI
              Commented below lines on 27/07/2022*/
            //if(objInfo.No_Of_Correct_Answered__c != null && objInfo.No_of_Question_Attempted__c != null   && objInfo.Total_Reaction_Time__c != null &&  Integer.valueOf(objInfo.No_of_Question_Attempted__c) >0 &&  Integer.valueOf(objInfo.No_Of_Correct_Answered__c)>0 && Integer.valueOf(objInfo.Total_Reaction_Time__c)>0)  
             if(objInfo.Count_Of_No_Of_Correct_Answered__c != null && objInfo.Count_Of_No_of_Question_Attempted__c != null   && objInfo.Count_Of_Total_Reaction_Time__c != null &&  Integer.valueOf(objInfo.Count_Of_No_of_Question_Attempted__c) >0 &&  Integer.valueOf(objInfo.Count_Of_No_Of_Correct_Answered__c)>0 && Integer.valueOf(objInfo.Count_Of_Total_Reaction_Time__c)>0)                             
            {
                mapOtherData.put('isGamePlayed',1);
                //mapOtherData.put('YourScore', Integer.valueOf(objInfo.Total_Reaction_Time__c/objInfo.No_of_Question_Attempted__c));
                //mapOtherData.put('CorrectAnswers', Integer.valueOf(objInfo.No_Of_Correct_Answered__c));
                //mapOtherData.put('ReactionTime', Integer.valueOf(objInfo.Total_Reaction_Time__c / objInfo.No_of_Question_Attempted__c));
                mapOtherData.put('YourScore', Integer.valueOf(objInfo.Count_Of_Total_Reaction_Time__c/objInfo.Count_Of_No_of_Question_Attempted__c));
                mapOtherData.put('CorrectAnswers', Integer.valueOf(objInfo.Count_Of_No_Of_Correct_Answered__c));
                mapOtherData.put('ReactionTime', Integer.valueOf(objInfo.Count_Of_Total_Reaction_Time__c / objInfo.Count_Of_No_of_Question_Attempted__c));
                mapOtherData.put('UserDevice', objInfo.User_Device__c=='DESKTOP'?0:1);
                
            }else
            {
                mapOtherData.put('CorrectAnswers',0); 
                mapOtherData.put('ReactionTime',0);
                
            }
        }
        Contact objCon = [SELECT Sex__c,Age__c,Education_Attainment__c FROM Contact WHERE Id=:contactId ];
        System.debug('contactId: '+contactId+ ' ,age: '+ objCon.Age__c);
        Decimal age = objCon.Age__c;
        age = age == null ? 18 : age;
        age = age < 18 ? 18 : age;
        age = age > 90 ? 90 : age;
        Decimal edu_att = objCon.Education_Attainment__c;
        edu_att = edu_att == null ? 1 : edu_att;
      //  edu_att = edu_att <= 2 ? 3 : edu_att;
      //  String sexData = objCon.Sex__c;
     //   sexData = sexData == '' ? 'Female' : sexData;
      //  sexData = sexData == null ? 'Female' : sexData;

        List<People_Like_You_Data__c> objLikeYouList = [SELECT Education__c,Sex__c, Age__c,Average__c,High_Average__c,Low_Average__c,Game_Name__r.Max_Score__c
            FROM People_Like_You_Data__c
            WHERE Game_Name__r.Name =:gameName 
            AND Sex__c =:objCon.Sex__c AND Education__c>=: edu_att
            AND Age__c =:age Order BY Education__c ASC LIMIT 1];
            for(People_Like_You_Data__c peopleLikeYouData : objLikeYouList){
                //People_Like_You_Data__c peopleLikeYouData=new People_Like_You_Data__c();
                mapOtherData.put ('People Like You', Integer.valueOf(peopleLikeYouData.Average__c));
                mapPlyAverageValuesData.put ('LowAverage', Integer.valueOf(peopleLikeYouData.Low_Average__c));
                mapPlyAverageValuesData.put ('HighAverage', Integer.valueOf(peopleLikeYouData.High_Average__c));
                mapPlyAverageValuesData.put ('MaxValue', Integer.valueOf(peopleLikeYouData.Game_Name__r.Max_Score__c));
                System.debug('People Like You');          
            }      
            
        
        // for(People_Like_You_Data__c objLikeYou : [SELECT Education__c,Sex__c, Age__c,Average__c,High_Average__c,Low_Average__c,Game_Name__r.Max_Score__c
        //                                           FROM People_Like_You_Data__c
        //                                           WHERE Game_Name__r.Name =:gameName 
        //                                           AND Sex__c =:objCon.Sex__c AND Education__c =: objCon.Education_Attainment__c
        //                                           AND Age__c =: objCon.Age__c])
        // {
            
        //     if(String.isNotblank(objCon.Sex__c)  
        //        && objCon.Education_Attainment__c != null
        //        && null !=  objCon.Age__c 
        //       )
        //     {
                
        //         mapOtherData.put ('People Like You', Integer.valueOf(objLikeYou.Average__c));
        //         mapPlyAverageValuesData.put ('LowAverage', Integer.valueOf(objLikeYou.Low_Average__c));
        //         mapPlyAverageValuesData.put ('HighAverage', Integer.valueOf(objLikeYou.High_Average__c));
        //         mapPlyAverageValuesData.put ('MaxValue', Integer.valueOf(objLikeYou.Game_Name__r.Max_Score__c));
        //         System.debug('People Like You');
        //     }
            
        // } 
        // for(People_Like_You_Data__c objLikeYou1 : [SELECT Education__c,Sex__c, Age__c,Average__c,High_Average__c,Low_Average__c,Game_Name__r.Max_Score__c
        //                                            FROM People_Like_You_Data__c
        //                                            WHERE Game_Name__r.Name =:gameName 
        //                                            AND Sex__c =:objCon.Sex__c AND Education__c =: objCon.Education_Attainment__c
        //                                            AND Age__c =: 18]) 
        // {
        //     //System.debug('Age<18 contactId: '+contactId+ ' ,age: '+ objCon.Age__c);
            
        //     if(objCon.Age__c <18)
        //     {
        //         mapOtherData.put ('People Like You', Integer.valueOf(objLikeYou1.Average__c));
        //         mapPlyAverageValuesData.put ('LowAverage', Integer.valueOf(objLikeYou1.Low_Average__c));
        //         mapPlyAverageValuesData.put ('HighAverage', Integer.valueOf(objLikeYou1.High_Average__c));
        //         mapPlyAverageValuesData.put ('MaxValue', Integer.valueOf(objLikeYou1.Game_Name__r.Max_Score__c));
        //     }
        // }
        //     for(People_Like_You_Data__c objLikeYou2 : [SELECT Education__c,Sex__c, Age__c,Average__c,High_Average__c,Low_Average__c,Game_Name__r.Max_Score__c
        //                                                FROM People_Like_You_Data__c
        //                                                WHERE Game_Name__r.Name =:gameName 
        //                                                AND Sex__c =:objCon.Sex__c AND Education__c =: objCon.Education_Attainment__c
        //                                                AND Age__c =: 90]) 
        //     {   
        //         //System.debug('Age>90 contactId: '+contactId+ ' ,age: '+ objCon.Age__c);
        //         if(objCon.Age__c >90)
        //         {               
        //             mapOtherData.put ('People Like You', Integer.valueOf(objLikeYou2.Average__c));
        //             mapPlyAverageValuesData.put ('LowAverage', Integer.valueOf(objLikeYou2.Low_Average__c));
        //             mapPlyAverageValuesData.put ('HighAverage', Integer.valueOf(objLikeYou2.High_Average__c));
        //             mapPlyAverageValuesData.put ('MaxValue', Integer.valueOf(objLikeYou2.Game_Name__r.Max_Score__c));
                    
        //         }
        //     }
        
        /*for(Participant_Dashboard__c objDashboard:[SELECT Data_Name__c,Data_Category__c, Data_Value__c 
                                                   FROM Participant_Dashboard__c 
                                                   WHERE Data_Name__c ='Overall Average'
                                                   AND Game_Detail__r.Name =:gameName
                                                  ])
        {
            mapOtherData.put('Overall Average', Integer.valueOf(objDashboard.Data_Value__c));
            System.debug('Overall Average');  
        }*/
         mapOtherData.put('Overall Average', overaallAvgMap.get(gameName));
        
        objDashboardData.mapOtherData = mapOtherData;
        // objDashboardData.age = objCon.Age__c != null ?Integer.valueOf(objCon.Age__c):null;
        // objDashboardData.mapWhatHappendWithAgeData = mapWhatHappendWithAgeData;
        objDashboardData.mapPlyAverageValuesData = mapPlyAverageValuesData;
        return objDashboardData;
    }
        @AuraEnabled 
    public static void saveSign(String base64Data, String contentType, String currentUserId, String gameName) {
        List<Participant_Game_Info__c> lstPartGameInfo=[SELECT Id, Game_Name__c, participantFeatureImageURL__c, Contact_Name__c, Game_Play_Status__c FROM Participant_Game_Info__c Where Participant_Game_Info__c.Contact_Name__c=:currentUserId];  
        List<ContentDocument> condocvar=new List<ContentDocument>();
        List<Participant_Game_Info__c> updateListPaticipantGameInfo =new List<Participant_Game_Info__c>();
         for(Participant_Game_Info__c objDashboard:lstPartGameInfo)
         {
            Game_Detail__c gName=[SELECT Name, Id FROM Game_Detail__c where id=:objDashboard.Game_Name__c];  
           // ContentDocumentLink checkDocLink=[SELECT ContentDocumentId, LinkedEntityId FROM ContentDocumentLink where LinkedEntityId=:objDashboard.Id LIMIT 1];
            if((gName.Name==gameName) && (objDashboard.participantFeatureImageURL__c==null || objDashboard.participantFeatureImageURL__c=='')){
                    // String yourFiles = 'Lets assume this is your binary string of the files';
                    ContentVersion conVer = new ContentVersion();
                    conVer.ContentLocation = 'S'; // S specify this document is in SF, use E for external files
                    conVer.PathOnClient = contentType;//'ionicLogo1.png'; // The files name, extension is very important here which will help the file in preview.
                    conVer.Title = gameName +'.png'; // Display name of the files
                    conVer.VersionData =  EncodingUtil.base64Decode(base64Data); //EncodingUtil.base64Decode(base64Data); // converting your binary string to Blog
                    insert conVer;
                    //Get Content Documents
                    Id conDoc = [SELECT ContentDocumentId FROM ContentVersion WHERE Id =:conVer.Id].ContentDocumentId;
                    //Create ContentDocumentLink
                    ContentDocumentLink cDe = new ContentDocumentLink();
                    cDe.ContentDocumentId = conDoc;
                    cDe.LinkedEntityId = objDashboard.Id; // you can use objectId,GroupId etc
                    cDe.ShareType = 'I'; // Inferred permission, checkout description of ContentDocumentLink object for more details
                    //cDe.Visibility = 'InternalUsers';
                    cDe.Visibility = 'AllUsers';
                    insert cDe;
                    //Create ContentDistribution
                    system.debug('conVer.Title 1:'+conVer.Title);
                    system.debug('conVer.Id:'+conVer.Id);
                    Participant_Game_Info__c partiGameInfo=[SELECT Id, Game_Name__c,participantFeatureImageURL__c, Contact_Name__c, Game_Play_Status__c FROM Participant_Game_Info__c where Id=:objDashboard.id];
                    partiGameInfo.participantFeatureImageURL__c=conDoc;
                    update partiGameInfo;
                    system.debug('partiGameInfo:'+partiGameInfo);  
                    updateListPaticipantGameInfo.add(partiGameInfo);
            }
         }
         //update updateListPaticipantGameInfo;
     }
    public class DashboardData
    {
        @AuraEnabled
        public Map<String, Integer> mapOtherData;
        /* @AuraEnabled
        public Integer age;
        @AuraEnabled
        public Map<String, Integer> mapWhatHappendWithAgeData; */
        @AuraEnabled
        public Map<String,Integer> mapPlyAverageValuesData;     
    }
  
}