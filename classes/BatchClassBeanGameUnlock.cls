global class BatchClassBeanGameUnlock implements Database.Batchable<SObject>, Schedulable {
    
    global void execute(SchedulableContext sc) {
        BatchClassBeanGameUnlock BeanGameUn = new BatchClassBeanGameUnlock();
        Database.executeBatch(BeanGameUn);
    }

    // Step - 1: Get All the Bean Game records / contacts
    global Database.QueryLocator start(Database.BatchableContext bc) {
        return Database.getQueryLocator([SELECT Id, Contact__c, Contact__r.Id, Contact__r.Name FROM Bean_Game__c
											WHERE CreatedDate = N_DAYS_AGO:365]);
    }

    global void execute(Database.BatchableContext bc, List<Bean_Game__c> scope) {
        // Step - 2: In the execute method, get All unique contact Ids from scope and store in the below variable List<Id> contIds;

        Set<Id> contactIds = new Set<Id>();
        for (Bean_Game__c beanGame : scope) {
            contactIds.add(beanGame.Contact__r.id);
        }

        // Step - 3: Run a query to get all contacts with all 10 game status fields using above contactIds
        List<Id> contIds = new List<Id>(contactIds); // Changed from Set to List
        List<Contact> contUpd = [SELECT Id, Bean_Game__c FROM Contact WHERE Id IN :contIds];

        // Step - 4: Update the contacts
        for (Bean_Game__c beanGame : scope) {
            for (Contact con : contUpd) {
                if (con.Id == beanGame.Contact__r.id) {
                    if (con.Bean_Game__c != 'Opened') {
                        con.Bean_Game__c = 'Opened';
                    }
                }
            }
        }

        // Update the contacts after processing the Bean Game records
        database.update(contUpd);
    }

    global void finish(Database.BatchableContext context) {
        System.debug('---IN FINISH');
    }
}