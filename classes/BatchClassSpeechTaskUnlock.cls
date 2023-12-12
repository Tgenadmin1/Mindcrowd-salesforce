global class BatchClassSpeechTaskUnlock implements Database.Batchable<SObject>, Schedulable {
    
    global void execute(SchedulableContext sc) {
        BatchClassSpeechTaskUnlock SpeechTaskUn = new BatchClassSpeechTaskUnlock();
        Database.executeBatch(SpeechTaskUn);
    }

    // Step - 1: Get All the Bean Game records / contacts
    global Database.QueryLocator start(Database.BatchableContext bc) {
        return Database.getQueryLocator([Select id, Game_Name__r.Name,Contact_Name__r.Id, Contact_Name__c, Game_Name__c
										FROM Participant_Game_Info__c 
										WHERE Game_Name__r.Name = 'Speech Tasks' AND CreatedDate = N_DAYS_AGO:365]);
    }

    global void execute(Database.BatchableContext bc, List<Participant_Game_Info__c> scope) {
        // Step - 2: In the execute method, get All unique contact Ids from scope and store in the below variable List<Id> contIds;

        Set<Id> contactIds = new Set<Id>();
        for (Participant_Game_Info__c pgi : scope) {
            contactIds.add(pgi.Contact_Name__r.id);
        }

        // Step - 3: Run a query to get all contacts with all 10 game status fields using above contactIds
        List<Id> contIds = new List<Id>(contactIds); // Changed from Set to List
        List<Contact> contUpd = [SELECT Id, Speech_Task__c FROM Contact WHERE Id IN :contIds];

        // Step - 4: Update the contacts
        for (Participant_Game_Info__c pgi : scope) {
            for (Contact con : contUpd) {
                if (con.Id == pgi.Contact_Name__r.id) {
                    if (con.Speech_Task__c != 'Opened') {
                        con.Speech_Task__c = 'Opened';
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