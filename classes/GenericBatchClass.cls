global class GenericBatchClass implements Database.Batchable<SObject> {
    private String objectName;
    private String relatedFieldName;

    global GenericBatchClass(String objName, String relFieldName) {
        objectName = objName;
        relatedFieldName = relFieldName;
    }

    global Database.QueryLocator start(Database.BatchableContext bc) {
        String query = 'SELECT Id, ' + relatedFieldName + ' FROM ' + objectName + ' WHERE ' + relatedFieldName + ' != null';
        return Database.getQueryLocator(query);
    }

    global void execute(Database.BatchableContext bc, List<SObject> scope) {
        Set<Id> contactIds = new Set<Id>();

        // Gather Contact Ids from records
        for (SObject obj : scope) {
            contactIds.add((Id)obj.get(relatedFieldName));
        }

        // Query Contacts based on the gathered Contact Ids
        List<Contact> contUpd = [SELECT Id, SES__c, QPAR__c, ADL__c FROM Contact WHERE Id IN :contactIds];

        // Update Contact field if necessary
        for (SObject obj : scope) {
            Id contactId = (Id)obj.get(relatedFieldName);
            String objValue = (String)obj.get(objectName);

            for (Contact con : contUpd) {
                if (con.Id == contactId) {
                    if (objectName == 'SES__c' && con.SES__c != 'Opened') {
                        con.SES__c = 'Opened';
                    } else if (objectName == 'QPAR__c' && con.QPAR__c != 'Opened') {
                        con.QPAR__c = 'Opened';
                    } else if (objectName == 'ADL__c' && con.ADL__c != 'Opened') {
                        con.ADL__c = 'Opened';
                    }
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
        //  Add next survey for chain process 
    }
}