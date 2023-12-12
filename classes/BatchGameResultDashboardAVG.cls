public class BatchGameResultDashboardAVG implements Database.Batchable<sObject>,Database.Stateful, Schedulable{
        Map<String, Decimal> sumCorrectAnswers;
        Map<String, Integer> countGames;
        Decimal reactTimeMax;
    
       public void execute(SchedulableContext sc) {
        BatchGameResultDashboardAVG ResultAVG = new BatchGameResultDashboardAVG();
        Database.executeBatch(ResultAVG);
       }
    
       public BatchGameResultDashboardAVG() {
            initializeMaps();
        }   
       public Database.QueryLocator start(Database.BatchableContext context) {
        return Database.getQueryLocator([
            SELECT Game_Name__r.Name, User_Device__c, Count_Of_No_Of_Correct_Answered__c,Count_Of_No_of_Question_Attempted__c, 
            Count_Of_Total_Reaction_Time__c
            FROM Participant_Game_Info__c
            WHERE Contact_Name__r.Age__c > 0
            AND Contact_Name__r.Sex__c != ''
            AND Contact_Name__r.Education_Attainment__c != null
            AND Count_Of_No_Of_Correct_Answered__c > 0
            AND Count_Of_No_of_Question_Attempted__c > 0
            AND Count_Of_Total_Reaction_Time__c >0            
        ]);
    }

    public void execute(Database.BatchableContext context, List<Participant_Game_Info__c> gameInfoList) {   
        System.debug('No. of records: '+gameInfoList.size());
        for(Participant_Game_Info__c gameInfo : gameInfoList) {               
            String gameName = gameInfo.Game_Name__r.Name;
            if(gameName == 'Flanker' || gameName == 'DLTRS' || gameName == 'Deary Simple And Complex Reaction Time'){
                Decimal reactionTimeTotal = gameInfo.Count_Of_Total_Reaction_Time__c;  
                Decimal questionsCount = gameInfo.Count_Of_No_of_Question_Attempted__c;  
                Decimal reactionTime = (questionsCount > 0) ? reactionTimeTotal/questionsCount : 0;    
                System.debug('Current Reaction Time: '+reactionTime+ ' / Previous Reaction Time of '+gameInfo.Id+': '+reactTimeMax);
                sumCorrectAnswers.put(gameName, (Decimal)sumCorrectAnswers.get(gameName) + reactionTime);
                if(gameName == 'Flanker'){
                    reactTimeMax = (reactTimeMax == null || reactionTime > reactTimeMax) ? reactionTime : reactTimeMax; 
                }
            }
            else{
                Decimal correctAnswerCount = gameInfo.Count_Of_No_Of_Correct_Answered__c;
                sumCorrectAnswers.put(gameName,  (Decimal)sumCorrectAnswers.get(gameName) + correctAnswerCount);                
            }
            	countGames.put(gameName, countGames.get(gameName) + 1);
        }
   }

    public void finish(Database.BatchableContext context) {  
        Map<String, Decimal> averageCorrectAnswers = new Map<String, Decimal>();
        for (String key : sumCorrectAnswers.keySet()) {
            Decimal sum = sumCorrectAnswers.get(key);
            Integer count = countGames.get(key);
            Decimal average = (count > 0) ? sum/count : 0;
            averageCorrectAnswers.put(key, average);
        }    
    	List<Participant_Dashboard__c> gameStatsToUpdate=[SELECT Data_Value__c,Game_Detail__r.Name FROM Participant_Dashboard__c
                                                         WHERE Data_Name__c ='Overall Average'];

        for (Participant_Dashboard__c gameStat : gameStatsToUpdate) {
            for (String key : averageCorrectAnswers.keySet()) {
                if (gameStat.Game_Detail__r.Name == key){
                     gameStat.Data_Value__c = (Integer)Math.round(averageCorrectAnswers.get(key));
                         break;
                    }
                }
            }     
        Game_Detail__c flankerGame=[SELECT Max_Score__c FROM Game_Detail__c WHERE name='Flanker'];
        flankerGame.Max_Score__c = (Integer)Math.round(reactTimeMax);
        
		update gameStatsToUpdate; 
        update flankerGame;
    }
       private void initializeMaps() {
        sumCorrectAnswers = new Map<String, Decimal>();
        countGames = new Map<String, Integer>();
        List<Game_Detail__c> gameDetails = [SELECT Name from Game_Detail__c where name !='Speech Tasks' and name !='Bean Game'];  
        for (Game_Detail__c gameDetail : gameDetails) {
            sumCorrectAnswers.put(gameDetail.Name, 0);
            countGames.put(gameDetail.Name, 0);
        }
    }
}