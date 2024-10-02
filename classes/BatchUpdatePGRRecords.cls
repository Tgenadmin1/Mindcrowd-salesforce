public class BatchUpdatePGRRecords implements Database.Batchable<sObject> {
    private Integer startMin;
    private Integer endmin;
    public BatchUpdatePGRRecords(Integer startMin, Integer endmin){
        this.startMin = startMin;
        this.endmin = endmin;
    }
    public Database.QueryLocator start(Database.BatchableContext BC) {
        DateTime startTime = Datetime.now().addMinutes(startMin);
        DateTime endTime = Datetime.now().addMinutes(endmin);
        return Database.getQueryLocator([
            SELECT Id, Version__c,Participant_Game_InfoID__r.Version__c
            FROM Participant_Game_Response__c
            WHERE CreatedDate >=: startTime
            AND CreatedDate <=: endTime
            AND Version__c = null
        ]);
    }
    
    public void execute(Database.BatchableContext BC, List<Participant_Game_Response__c> scope) {
        for (Participant_Game_Response__c obj : scope) {
                obj.Version__c = obj.Participant_Game_InfoID__r.Version__c;
        	}
        Database.update(scope,false);
    }
    
    public void finish(Database.BatchableContext BC) {
    }
}