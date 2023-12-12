// Created By: {Girikon(Shweta Khunteta)}
// Created On: 07/09/2021(DD/MM/YYYY
// Description/Purpose: [TM-185]-USED TO schedule Batch class(BatchOfGames)
// Methods: {Methods name in class}
// Test Class: {ScheduleBatchOfGamesTest} {88%}

global class ScheduleBatchOfGames implements Schedulable{
    
@ReadOnly 
 
global void execute (SchedulableContext ctx){ 
// List<AggregateResult> query = [SELECT MAX(CreatedDate) createddate,Game_Name__c gm,Contact_Name__c cnid 
//                               from Participant_Game_Info__c 
//                               where (createddate.addDays(2) < TODAY) AND  Game_Name__r.Name IN ('Deary Simple And Complex Reaction Time','Verbal Paired Associates')
                             
//                               AND (Contact_Name__r.Verbal_Paired_Associates__c ='Completed' OR Contact_Name__r.Deary_Simple_And_Complex_Reaction_Time__c='Completed') 
//                               GROUP BY Game_Name__c, Contact_Name__c]; 
// Map<String, Community_Info__c> mcs = Community_Info__c.getAll();
// Community_Info__c mc= new Community_Info__c() ;
//     if(mcs!=null && mcs.ContainsKey('Community Settings'))
//     { 
//        mc= mcs.get('Community Settings');
      
    
//     }
//     Integer activationdays=Integer.valueOf(mc.Games_Reactivation_Days__c);
    

//List<AggregateResult> query =[SELECT MAX(CreatedDate) createddate,Game_Name__c gm,Contact_Name__c cnid 
//                            from Participant_Game_Info__c 
//where unlock_game__c = true AND Game_Play_Status__c ='Completed' GROUP BY Game_Name__c, Contact_Name__c];  
                            
 

BatchOfGames bg = new BatchOfGames(); 
Database.executeBatch(bg); 
} 

}