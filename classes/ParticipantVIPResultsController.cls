/* Created By: Sibi dahy
** Created On: 17/08/2021
** Description/Purpose: Why and where it is used [TM-203]-It was Created for Catchment and Expanded Game Users Dashboards
** Methods: {getMyGameDetails,getDashboardDataForloggedInUser,getGuestUserGameDetails,getDashboardData}
** Test Class: {ParticipantResultsController_Test} {Code Coverage:96%}
** Controller for catchment results page and Expanded myResults page
** Modify By : Sibi Sathyan for Longitudinal Requirement 
*/
public without sharing class ParticipantVIPResultsController
{   
    @AuraEnabled(cacheable=true)
    public static DashboardData getDashboardDataForloggedInUser (String gameName)
    {
        List<User> lstUsers = [SELECT Id,ContactId From User where Id =: UserInfo.getUserId() AND ContactId != null];
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
        
        List<Participant_Game_Info__c> pgis = [SELECT Count_Of_No_Of_Correct_Answered__c, Count_Of_No_of_Question_Attempted__c,
                                              Count_Of_Total_Reaction_Time__c, No_Of_Correct_Answered__c,
                                              No_of_Question_Attempted__c,Total_Reaction_Time__c, User_Device__c,Id,CreatedDate
                                              FROM Participant_Game_Info__c 
                                              WHERE Contact_Name__c =: contactId  
                                              AND Game_Name__r.Name =:gameName
                                              AND ((Count_Of_No_Of_Correct_Answered__c != null
                                              AND Count_Of_No_of_Question_Attempted__c != null
                                              AND Count_Of_Total_Reaction_Time__c != null
                                              AND Count_Of_No_Of_Correct_Answered__c >0
                                              AND Count_Of_No_of_Question_Attempted__c >0
                                              AND Count_Of_Total_Reaction_Time__c >0) 
                                              OR (No_Of_Correct_Answered__c != null
                                              AND No_of_Question_Attempted__c != null
                                              AND Total_Reaction_Time__c != null
                                              AND No_Of_Correct_Answered__c >0
                                              AND No_of_Question_Attempted__c >0
                                              AND Total_Reaction_Time__c >0))
                                              AND Game_Play_Status__c = 'Completed'
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
                                           AND Contact_Name__r.Education_Attainment__c != null
                                           AND Count_Of_No_Of_Correct_Answered__c >0
                                           AND Count_Of_No_of_Question_Attempted__c >0
                                           AND Count_Of_Total_Reaction_Time__c >0
                                           AND Game_Name__r.Name =: gameName
                                           AND Id != :currPGIId
                                           Order by CreatedDate DESC
                                           LIMIT 49990];
        List<Decimal> quartileValues = new List<Decimal>();
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
                if(objLikeYouList.size()>0){
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
                else{
                    if(gameName=='Fake News') {
                        mapPlyAverageValuesData.put ('LowAverage', 8);
                        mapPlyAverageValuesData.put ('HighAverage', 16);   
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
    
    @AuraEnabled(cacheable=true)
    public static DashboardDataBean getDashboardDataBeanGame(String handSide){
        List<User> lstUsers = [SELECT Id,ContactId From User where Id =: UserInfo.getUserId() AND ContactId != null];
        String contactId = lstUsers[0].ContactId;
        //String contactId='0038G00000YESnyQAH';//Hardcoding for testing purpose
        String gameName = 'Bean Game';
        DashboardDataBean objDashboardData = new DashboardDataBean();
        Map<String, Decimal> mapOtherData = new Map<String, Decimal>();
        Map<String, Decimal> mapWhatHappendWithAgeData = new Map<String, Decimal>();
        Map<String, Decimal> mapPlyAverageValuesData = new Map<String, Decimal>();
        mapOtherData.put('YourScore',0);
        mapOtherData.put('isGamePlayed',0); 
        mapOtherData.put('CorrectAnswers',0); 
        mapOtherData.put('ReactionTime',0); 
        mapOtherData.put ('People Like You', 0);
        mapPlyAverageValuesData.put ('LowAverage', 0);
        mapPlyAverageValuesData.put ('HighAverage', 0); 
        
        List<Bean_Game__c> bean = [SELECT Right_Hand_Average__c,Left_Hand_Average__c,Contact__c 
            					  FROM Bean_Game__c where Contact__c = :contactId Order by CreatedDate DESC LIMIT 1];         
        if(bean.size()>0){
        	mapOtherData.put('isGamePlayed',1);  
            List<Participant_Dashboard__c> partDashboard;
            if(handSide == 'left'){
                mapOtherData.put('ReactionTime',bean[0].Left_Hand_Average__c);
                partDashboard = [SELECT Data_Value__c FROM Participant_Dashboard__c 
                                                        WHERE Game_Detail__r.Name=:gameName and 	
                                                        Data_Name__c='Overall Average Left Hand' LIMIT 1];
                mapPlyAverageValuesData.put('MaxValue', Integer.valueOf([SELECT Max_Score__c FROM Game_Detail__c 
                                                                         where Name=:gameName LIMIT 1].Max_Score__c));
            }
            else{
                mapOtherData.put('ReactionTime',bean[0].Right_Hand_Average__c);
                partDashboard = [SELECT Data_Value__c FROM Participant_Dashboard__c 
                                                        WHERE Game_Detail__r.Name=:gameName and 	
                                                        Data_Name__c='Overall Average Right Hand' LIMIT 1];
                mapPlyAverageValuesData.put('MaxValue', Integer.valueOf([SELECT Max_Score_2__c FROM Game_Detail__c 
                                                                         where Name=:gameName LIMIT 1].Max_Score_2__c));
            } 
            mapOtherData.put('Overall Average', Integer.valueOf(partDashboard[0].Data_Value__c)); 
            //Quartile calcualtion starts from here
            Contact objCon = [SELECT Sex__c,Age__c FROM Contact WHERE Id=:bean[0].Contact__c ];
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
            
            List<Bean_Game__c> beanPeopleLikeYou = [SELECT Right_Hand_Average__c,Left_Hand_Average__c 
                                                    FROM Bean_Game__c 
                                                    WHERE Contact__r.Age__c > 0
                                          			AND Contact__r.Age__c >= :lowage
                                           			AND Contact__r.Age__c <= :highage                                        
                                           			AND Contact__r.Sex__c != ''
                                           			AND Contact__r.Education_Attainment__c != null
                                                    AND  Id !=: bean[0].Id
                                                    Order by CreatedDate DESC
                                             	    LIMIT 49990];
            
             List<Decimal> quartileValues = new List<Decimal>();
             Decimal sumReationTime = 0;
             if(beanPeopleLikeYou !=null && beanPeopleLikeYou.size() > 0){//Check if 0 or 25                 
                  for (Bean_Game__c beangame : beanPeopleLikeYou) {
                      if(handSide == 'left'){
                        quartileValues.add(beangame.Left_Hand_Average__c);
                        sumReationTime += beangame.Left_Hand_Average__c;
                        
                    }
                    else{
                        quartileValues.add(beangame.Right_Hand_Average__c);
                        sumReationTime += beangame.Right_Hand_Average__c;
                    }
                  }
					mapOtherData.put ('People Like You', sumReationTime / beanPeopleLikeYou.size());                 
              }
              else {
                //Need to add if less numbers
              }        
        quartileValues.sort();                
        Decimal dataSize = quartileValues.size();
        Integer q1Index = Math.ceil((dataSize + 1) / 4.0).intValue();
        Integer q2Index = Math.ceil((dataSize + 1) / 2.0).intValue();
        Integer q3Index = Math.ceil(3 * (dataSize + 1) / 4.0).intValue();
        System.debug('q1Index: '+q1Index);
        System.debug('q2Index: '+q2Index);
        System.debug('q3Index: '+q3Index);
        System.debug('quartileValues: '+quartileValues);
          if (dataSize > 0) {
                            Decimal lowAverage = quartileValues[q1Index - 1].setScale(2, System.RoundingMode.HALF_UP);
                            Decimal highAverage = quartileValues[q3Index - 1].setScale(2, System.RoundingMode.HALF_UP);
                            if(lowAverage != null){
                                mapPlyAverageValuesData.put ('LowAverage', lowAverage);
                            }
                            if(highAverage != null){
                                mapPlyAverageValuesData.put ('HighAverage', highAverage);                                      
                            }
                        }
        }
		objDashboardData.mapOtherData = mapOtherData;    
        objDashboardData.mapPlyAverageValuesData = mapPlyAverageValuesData;
        return objDashboardData;
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
    
        public class DashboardDataBean
    {
        @AuraEnabled
        public Map<String, Decimal> mapOtherData;
        @AuraEnabled
        public Map<String,Decimal> mapPlyAverageValuesData;     
    }  
}