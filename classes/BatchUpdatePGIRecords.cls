public class BatchUpdatePGIRecords implements Database.Batchable<sObject>,Schedulable {
    private Integer startMin;
    private Integer endmin;
    public BatchUpdatePGIRecords(Integer startMin, Integer endmin){
        this.startMin = startMin;
        this.endmin = endmin;
    }
    public void execute(SchedulableContext sc) {
        BatchUpdatePGIRecords updPGI = new BatchUpdatePGIRecords(startMin,endmin);
        Database.executeBatch(updPGI,2000);
    }
    
    public Database.QueryLocator start(Database.BatchableContext BC) {
        DateTime startTime = Datetime.now().addMinutes(startMin);
        DateTime endTime = Datetime.now().addMinutes(endmin);
        return Database.getQueryLocator([
            SELECT Id, No_Of_Correct_Answered__c,No_of_Question_Attempted__c,Number_of_attempts_for_STACKS__c,
            Total_Reaction_Time__c,Total_correct_for_Round_0__c,Total_correct_for_Round_1__c,Total_correct_for_Round_2__c,
            Total_correct_for_Round_3__c,Total_correct_for_Round_4__c,Total_correct_for_Round_5__c,Total_correct_for_Round_6__c,
            Total_correct_for_Round_7__c,Total_correct_for_Round_8__c,Total_correct_for_Round_9__c,Total_correct_for_Round_10__c,
            Total_correct_for_Round_11__c,Count_Of_No_Of_Correct_Answered__c,Count_Of_No_of_Question_Attempted__c,
            Count_Of_Number_of_attempts_for_STACKS__c,Count_Of_Total_Reaction_Time__c,Count_Of_Total_correct_for_Round_0__c,
            Count_Of_Total_correct_for_Round_1__c,Count_Of_Total_correct_for_Round_2__c,Count_Of_Total_correct_for_Round_3__c,
            Count_Of_Total_correct_for_Round_4__c,Count_Of_Total_correct_for_Round_5__c,Count_Of_Total_correct_for_Round_6__c,
            Count_Of_Total_correct_for_Round_7__c,Count_Of_Total_correct_for_Round_8__c,Count_Of_Total_correct_for_Round_9__c,
            Count_Of_Total_correct_for_Round_10__c,Count_Of_Total_correct_for_Round_11__c,Version__c,Game_Name__r.Version__c
            FROM Participant_Game_Info__c            
            WHERE Version__c = null 
            AND CreatedDate >=: startTime
            AND CreatedDate <=: endTime
        ]);
    }
    
    public void execute(Database.BatchableContext BC, List<Participant_Game_Info__c> scope) {
        system.debug(scope);
        for (Participant_Game_Info__c obj : scope) {
                obj.Count_Of_No_Of_Correct_Answered__c = obj.No_Of_Correct_Answered__c;
                obj.Count_Of_No_of_Question_Attempted__c = obj.No_of_Question_Attempted__c;
                obj.Count_Of_Number_of_attempts_for_STACKS__c = obj.Number_of_attempts_for_STACKS__c;
                obj.Count_Of_Total_Reaction_Time__c = obj.Total_Reaction_Time__c;
                obj.Count_Of_Total_correct_for_Round_0__c = obj.Total_correct_for_Round_0__c;
                obj.Count_Of_Total_correct_for_Round_1__c = obj.Total_correct_for_Round_1__c;
                obj.Count_Of_Total_correct_for_Round_2__c = obj.Total_correct_for_Round_2__c;
                obj.Count_Of_Total_correct_for_Round_3__c = obj.Total_correct_for_Round_3__c;
                obj.Count_Of_Total_correct_for_Round_4__c = obj.Total_correct_for_Round_4__c;
                obj.Count_Of_Total_correct_for_Round_5__c = obj.Total_correct_for_Round_5__c;
                obj.Count_Of_Total_correct_for_Round_6__c = obj.Total_correct_for_Round_6__c;
                obj.Count_Of_Total_correct_for_Round_7__c = obj.Total_correct_for_Round_7__c;
                obj.Count_Of_Total_correct_for_Round_8__c = obj.Total_correct_for_Round_8__c;
                obj.Count_Of_Total_correct_for_Round_9__c = obj.Total_correct_for_Round_9__c;
                obj.Count_Of_Total_correct_for_Round_10__c = obj.Total_correct_for_Round_10__c;
                obj.Count_Of_Total_correct_for_Round_11__c = obj.Total_correct_for_Round_11__c;
            	obj.Version__c = obj.Game_Name__r.Version__c;
        	}
       Database.update(scope,false);
    }
    
    public void finish(Database.BatchableContext BC) {
        BatchUpdatePGRRecords updPGR = new BatchUpdatePGRRecords(startMin,endmin);
        Database.executeBatch(updPGR,2000);
    }
}