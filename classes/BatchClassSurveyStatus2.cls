global class BatchClassSurveyStatus2 implements Database.Batchable<SObject> {

    global Database.QueryLocator start(Database.BatchableContext bc) {   
        return Database.getQueryLocator([SELECT Id, Contact_Name__c FROM SES__c WHERE Contact_Name__c != null]);
    }

    global void execute(Database.BatchableContext bc, List<SES__c> scope) {
        Set<Id> contactIds = new Set<Id>();

        // Gather Contact Ids from SES__c records
        for (SES__c ses : scope) {
            contactIds.add(ses.Contact_Name__c);
        }

        // Query Contacts based on the gathered Contact Ids
        List<Contact> contUpd = [SELECT Id, SES__c FROM Contact WHERE Id IN :contactIds];

        // Update Contact field if necessary
        for (SES__c ses : scope) {
            for (Contact con : contUpd) {
                if (con.Id == ses.Contact_Name__c && con.SES__c != 'Opened') {
                    con.SES__c = 'Opened';
                }
            }
        }

        // Update contacts using database.update
        if (!contUpd.isEmpty()) {
            Database.update(contUpd);
        }
    }

    global void finish(Database.BatchableContext context) {
        System.debug('---IN SES FINISH');
        //  Add next survey for chain process 
    }
}