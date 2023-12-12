public class BatchGameResultDashboardBeanGameAVG implements Database.Batchable<sObject>,Database.Stateful, Schedulable{
       Decimal leftHandTotal=0;
       Decimal rightHandTotal=0;
       Decimal leftTotalMax=0;
       Decimal rightTotalMax=0;
       Integer beanCount=0;
    
       public void execute(SchedulableContext sc) {
        BatchGameResultDashboardBeanGameAVG ResultAVG = new BatchGameResultDashboardBeanGameAVG();
        Database.executeBatch(ResultAVG);
       }
    
       public Database.QueryLocator start(Database.BatchableContext context) {
                return Database.getQueryLocator([SELECT Id,Left_Hand_Average__c,Right_Hand_Average__c FROM Bean_Game__c                                                
        ]);
    }

    public void execute(Database.BatchableContext context, List<Bean_Game__c> beanGames) {   
        for(Bean_Game__c bean : beanGames) {            
            leftHandTotal += bean.Left_Hand_Average__c;
            rightHandTotal += bean.Right_Hand_Average__c;
            leftTotalMax = bean.Left_Hand_Average__c > leftTotalMax ? bean.Left_Hand_Average__c : leftTotalMax; 
            rightTotalMax = bean.Right_Hand_Average__c > rightTotalMax ? bean.Right_Hand_Average__c : rightTotalMax; 
            beanCount++;
        }        
   }

    public void finish(Database.BatchableContext context) {
     	
        Decimal  overallLeftTime = (leftHandTotal)/beanCount;
        Decimal  overallRightTime = (rightHandTotal)/beanCount;
        
    	List<Participant_Dashboard__c> gameStatsToUpdate=[SELECT Data_Name__c,Data_Value__c,Game_Detail__r.Name FROM Participant_Dashboard__c
                                                         WHERE Game_Detail__r.Name ='Bean Game'];
        for(Participant_Dashboard__c gameOverAvg: gameStatsToUpdate){
            if(gameOverAvg.Data_Name__c=='Overall Average Right Hand'){
                gameOverAvg.Data_Value__c = overallRightTime;
            }
            if(gameOverAvg.Data_Name__c=='Overall Average Left Hand'){
                gameOverAvg.Data_Value__c = overallLeftTime;
            }
                                                              
         }
   
        Game_Detail__c beanGame=[SELECT Max_Score__c,Max_Score_2__c FROM Game_Detail__c WHERE name='Bean Game'];
        beanGame.Max_Score__c = leftTotalMax;
        beanGame.Max_Score_2__c = rightTotalMax;
        
		update gameStatsToUpdate; 
        update beanGame;
    }
 
}