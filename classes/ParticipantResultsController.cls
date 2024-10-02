/* Created By: Sibi dahy
** Created On: 17/08/2021
** Description/Purpose: Why and where it is used [TM-203]-It was Created for Catchment and Expanded Game Users Dashboards
** Methods: {getMyGameDetails,getDashboardDataForloggedInUser,getGuestUserGameDetails,getDashboardData}
** Test Class: {ParticipantResultsController_Test} {Code Coverage:96%}
** Controller for catchment results page and Expanded myResults page
** Modify By : Sibi Sathyan for Longitudinal Requirement 
*/
public without sharing class ParticipantResultsController
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
        String userDevice;
        Id currPGIId;        
        mapOtherData.put('YourScore',0);
        mapOtherData.put('isGamePlayed',0); 
        mapOtherData.put('CorrectAnswers',0); 
        mapOtherData.put('ReactionTime',0); 
        mapOtherData.put ('People Like You', 0);
        mapPlyAverageValuesData.put ('LowAverage', 0);
        mapPlyAverageValuesData.put ('HighAverage', 0); 
        DashboardData objDashboardData = new DashboardData();
        
        List<Participant_Game_Info__c> pgis = [SELECT 
                                              /*Added three fields to remove dependency PGR from PGI*/
                                              /* Added on 27/07/2022 */
                                              Count_Of_No_Of_Correct_Answered__c, Count_Of_No_of_Question_Attempted__c,
                                              Count_Of_Total_Reaction_Time__c, No_Of_Correct_Answered__c,
                                              No_of_Question_Attempted__c,Total_Reaction_Time__c, User_Device__c,Id,CreatedDate
                                              FROM Participant_Game_Info__c 
                                              WHERE Contact_Name__c =: contactId  
                                              AND Game_Name__r.Name =:gameName                                              
                                              ORDER BY CreatedDate DESC LIMIT 1];
        if(pgis.size()>0){
            for(Participant_Game_Info__c pgi : pgis){
                if(pgi.CreatedDate.Date() >= Date.Today()-1){
                	pgi.Count_Of_No_of_Question_Attempted__c = pgi.No_of_Question_Attempted__c;
                    pgi.Count_Of_No_Of_Correct_Answered__c = pgi.No_Of_Correct_Answered__c;
                    pgi.Count_Of_Total_Reaction_Time__c = pgi.Total_Reaction_Time__c;
            	}  
            }                      
        } 
        
        for(Participant_Game_Info__c objInfo:pgis)
        {
            userDevice = objInfo.User_Device__c;
            currPGIId= objInfo.Id;
            //changes was made to remove dependency of RollUp summary fields on PGI 
             if(objInfo.Count_Of_No_Of_Correct_Answered__c != null && objInfo.Count_Of_No_of_Question_Attempted__c != null   && objInfo.Count_Of_Total_Reaction_Time__c != null &&  Integer.valueOf(objInfo.Count_Of_No_of_Question_Attempted__c) >0 &&  Integer.valueOf(objInfo.Count_Of_No_Of_Correct_Answered__c)>0 && Integer.valueOf(objInfo.Count_Of_Total_Reaction_Time__c)>0)                             
            {
                mapOtherData.put('isGamePlayed',1);
                mapOtherData.put('YourScore', Integer.valueOf(objInfo.Count_Of_Total_Reaction_Time__c/objInfo.Count_Of_No_of_Question_Attempted__c));
                mapOtherData.put('CorrectAnswers', Integer.valueOf(objInfo.Count_Of_No_Of_Correct_Answered__c));
                mapOtherData.put('ReactionTime', Integer.valueOf(objInfo.Count_Of_Total_Reaction_Time__c / objInfo.Count_Of_No_of_Question_Attempted__c));
                mapOtherData.put('UserDevice', objInfo.User_Device__c=='DESKTOP'?0:1); 
            }
        }
        Contact objCon = [SELECT Sex__c,Age__c,Education_Attainment__c FROM Contact WHERE Id=:contactId ];
        Decimal age = objCon.Age__c;
        Decimal pluage,lowage,highage; 
        if(age>85){
            lowage = 80;
            highage = 115;
        }
        else if(age<18){
            lowage = 18;
            highage = 28;
        }
        else if(age<28){
            lowage = 18;
            highage = age+10;
        }
        else{
            lowage = age-10;
            highage = age+10;
        }        
        pluage = age == null ? 18 : age;
        pluage = pluage < 18 ? 18 : pluage;
        pluage = pluage > 90 ? 90 : pluage;
        Decimal edu_att = objCon.Education_Attainment__c;
        edu_att = edu_att == null ? 1 : edu_att;
        String sex = objCon.Sex__c;
        
        mapPlyAverageValuesData.put ('MaxValue', Integer.valueOf([SELECT Max_Score__c FROM Game_Detail__c where Name=:gameName LIMIT 1].Max_Score__c) );
        List<Participant_Game_Info__c> peopleLikeYouPGIList = [SELECT Count_Of_Total_Reaction_Time__c ,Count_Of_No_of_Question_Attempted__c,Count_Of_No_Of_Correct_Answered__c
                                           FROM Participant_Game_Info__c 
                                           WHERE Contact_Name__r.Age__c > 0
                                           AND Contact_Name__r.Age__c >= :lowage
                                           AND Contact_Name__r.Age__c <= :highage
                                           AND User_Device__c != ''
                                           AND Contact_Name__r.Sex__c != ''
                                           AND Contact_Name__r.Sex__c =:sex
                                           AND Contact_Name__r.Education_Attainment__c =:edu_att
                                           AND Count_Of_No_Of_Correct_Answered__c >0
                                           AND Count_Of_No_of_Question_Attempted__c >0
                                           AND Count_Of_Total_Reaction_Time__c >0
                                           AND Game_Name__r.Name =: gameName
                                           AND Id != :currPGIId
                                           Order by CreatedDate DESC
                                           LIMIT 49990];
        List<Decimal> quartileValues = new List<Decimal>();
        system.debug('First Query:'+peopleLikeYouPGIList.size());
        if(peopleLikeYouPGIList !=null && peopleLikeYouPGIList.size() < 25){
            peopleLikeYouPGIList = [SELECT Count_Of_Total_Reaction_Time__c ,Count_Of_No_of_Question_Attempted__c,Count_Of_No_Of_Correct_Answered__c
                                           FROM Participant_Game_Info__c 
                                           WHERE Contact_Name__r.Age__c > 0
                                           AND Contact_Name__r.Age__c >= :lowage
                                           AND Contact_Name__r.Age__c <= :highage
                                           AND User_Device__c != ''
                                           AND Contact_Name__r.Sex__c != ''
                                    	   AND Contact_Name__r.Sex__c =:sex
                                           AND Contact_Name__r.Education_Attainment__c != null
                                           AND Count_Of_No_Of_Correct_Answered__c >0
                                           AND Count_Of_No_of_Question_Attempted__c >0
                                           AND Count_Of_Total_Reaction_Time__c >0
                                           AND Game_Name__r.Name =: gameName
                                           AND Id != :currPGIId
                                           Order by CreatedDate DESC
                                           LIMIT 49990];
                    system.debug('Second Query:'+peopleLikeYouPGIList.size());
                    if(peopleLikeYouPGIList !=null && peopleLikeYouPGIList.size() < 25){
                    peopleLikeYouPGIList = [SELECT Count_Of_Total_Reaction_Time__c ,Count_Of_No_of_Question_Attempted__c,Count_Of_No_Of_Correct_Answered__c
                                           FROM Participant_Game_Info__c 
                                           WHERE Contact_Name__r.Age__c > 0
                                           AND Contact_Name__r.Age__c >= :lowage
                                           AND Contact_Name__r.Age__c <= :highage
                                           AND User_Device__c != ''
                                           AND Contact_Name__r.Sex__c != ''
                                           AND Contact_Name__r.Education_Attainment__c != null
                                           AND Count_Of_No_Of_Correct_Answered__c >0
                                           AND Count_Of_No_of_Question_Attempted__c >0
                                           AND Count_Of_Total_Reaction_Time__c >0
                                           AND Game_Name__r.Name =: gameName
                                           AND Id != :currPGIId
                                           Order by CreatedDate DESC
                                           LIMIT 49990];
                        system.debug('Third Query:'+peopleLikeYouPGIList.size());
        		}
        }
        if(peopleLikeYouPGIList !=null && peopleLikeYouPGIList.size() >= 25){ 
            if(gameName == 'DLTRS' || gameName == 'Deary Simple And Complex Reaction Time' || gameName == 'Flanker'){
                        Decimal sumReationTime = 0;
                        List<Decimal> reacttimeList = new List<Decimal>();
                        for (Participant_Game_Info__c peopleLikeYouPGI : peopleLikeYouPGIList) {
                            Decimal reactTime = peopleLikeYouPGI.Count_Of_Total_Reaction_Time__c / peopleLikeYouPGI.Count_Of_No_of_Question_Attempted__c;
                            sumReationTime += reactTime;
                            reacttimeList.add(reactTime);      
                        }
                        Decimal reactTimeAvg =   sumReationTime / peopleLikeYouPGIList.size();
                        if(reactTimeAvg != null){
                            mapOtherData.put ('People Like You', Integer.valueOf(reactTimeAvg));
                        }
                		quartileValues.addAll(reacttimeList);
                	}
            else{      
                        Decimal sumcorrAnswer = 0;    
                        Decimal corrAnswerMax = 0;
                        List<Decimal> corrAnswersList = new List<Decimal>();
                        for (Participant_Game_Info__c peopleLikeYouPGI : peopleLikeYouPGIList) { 
                            Decimal corrAnswer = peopleLikeYouPGI.Count_Of_No_Of_Correct_Answered__c;
                            sumcorrAnswer += corrAnswer;
                            corrAnswersList.add(corrAnswer);
                        }
                        Decimal corrAnswerAvg =   sumcorrAnswer / peopleLikeYouPGIList.size();
                        if(corrAnswerAvg != null){
                            mapOtherData.put ('People Like You', Integer.valueOf(corrAnswerAvg));
                        }  
                		quartileValues.addAll(corrAnswersList);
                	}            
                      	quartileValues.sort();                
                        Integer dataSize = quartileValues.size();
                        Integer q1Index = Math.ceil((dataSize + 1) / 4.0).intValue();
                        Integer q2Index = Math.ceil((dataSize + 1) / 2.0).intValue();
                        Integer q3Index = Math.ceil(3 * (dataSize + 1) / 4.0).intValue();
                        
                        if (dataSize > 0) {
                            Integer lowAverage = Integer.valueOf(quartileValues[q1Index - 1]);
                            Integer highAverage = Integer.valueOf(quartileValues[q3Index - 1]);
                            if(lowAverage != null){
                                mapPlyAverageValuesData.put ('LowAverage', lowAverage);
                            }
                            if(highAverage != null){
                                mapPlyAverageValuesData.put ('HighAverage', highAverage);                                      
                            }
                        }
        	}
        	else{
            List<People_Like_You_Data__c> objLikeYouList = [SELECT Education__c,Sex__c, Age__c,Average__c,High_Average__c,Low_Average__c,Game_Name__r.Max_Score__c
            FROM People_Like_You_Data__c
            WHERE Game_Name__r.Name =:gameName 
            AND Sex__c =:objCon.Sex__c AND Education__c>=: edu_att
            AND Age__c =:pluage Order BY Education__c ASC LIMIT 1];
            for(People_Like_You_Data__c peopleLikeYouData : objLikeYouList){
                if(gameName=='Flanker'){
                	mapPlyAverageValuesData.put ('LowAverage', 564);
                	mapPlyAverageValuesData.put ('HighAverage', 963);    
                }
                else
                {
                    mapPlyAverageValuesData.put ('LowAverage', Integer.valueOf(peopleLikeYouData.Low_Average__c));
                    mapPlyAverageValuesData.put ('HighAverage', Integer.valueOf(peopleLikeYouData.High_Average__c)); 
                }  
            } 
           }
      List<Participant_Dashboard__c> partDashboard = [SELECT Data_Value__c FROM Participant_Dashboard__c WHERE Game_Detail__r.Name=:gameName LIMIT 1];
            if(partDashboard !=null && partDashboard.size()>0){
            	mapOtherData.put('Overall Average', Integer.valueOf(partDashboard[0].Data_Value__c));
            }
            else{
                mapOtherData.put('Overall Average', 0);
            }
        objDashboardData.mapOtherData = mapOtherData;
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