global class BatchSurveyStatusUpdate implements Database.Batchable<SObject> {

    global Database.QueryLocator start(Database.BatchableContext bc) {   
        return Database.getQueryLocator([SELECT Id, Contact_Name__c FROM HealthMedical_Survey__c WHERE Contact_Name__c != null]);
    }

    global void execute(Database.BatchableContext bc, List<HealthMedical_Survey__c> scope) {
        Set<Id> contactIds = new Set<Id>();

        // Gather Contact Ids from HealthMedical_Survey__c records
        for (HealthMedical_Survey__c hm : scope) {
            contactIds.add(hm.Contact_Name__c);
        }

        // Query Contacts based on the gathered Contact Ids
        List<Contact> contUpd = [SELECT Id, HEALTH_MEDICAL__c FROM Contact WHERE Id IN :contactIds];

        // Update Contact field if necessary
        for (HealthMedical_Survey__c hm : scope) {
            for (Contact con : contUpd) {
                if (con.Id == hm.Contact_Name__c && con.HEALTH_MEDICAL__c != 'Opened') {
                    con.HEALTH_MEDICAL__c = 'Opened';
                }
            }
        }

        // Update contacts using database.update
        if (!contUpd.isEmpty()) {
            Database.update(contUpd);
        }
    }

    global void finish(Database.BatchableContext context) {
        System.debug('---IN FINISH');
        
        BatchClassSurveyStatus2 batchSES = new BatchClassSurveyStatus2();
        Database.executeBatch(batchSES);
    }
}