global class BecomeVIPEmailBatch implements Database.Batchable<SObject>, Schedulable {
    
    global void execute(SchedulableContext sc) {
        BecomeVIPEmailBatch becomeVIPEmail = new BecomeVIPEmailBatch();
        Database.executeBatch(becomeVIPEmail);
    }
    
    global Database.QueryLocator start(Database.BatchableContext bc) {   
        /*return Database.getQueryLocator([Select Id, Email FROM Contact 
                                         where Consent_Signed_On__c = null 
                                         AND Parent_Contact__c = ''
                                         AND Email != ''
                                         AND Unsubscribe__c != true
                                         AND (CreatedDate = N_DAYS_AGO:100 
                                              OR CreatedDate = N_DAYS_AGO:200 
                                              OR CreatedDate = N_DAYS_AGO:300) LIMIT 5000]);*/
                return Database.getQueryLocator([Select Id, Email,Language__c FROM Contact 
                                         where email in ('sibisathyangs@gmail.com', 'mindcrowdtestuser@gmail.com')]);//For testing have to delete
    }

    global void execute(Database.BatchableContext bc, List<Contact> scope) {       
        String emailTempEngId;
        String emailTempESId;
        //OrgWideEmailAddress owa =  [select id, DisplayName from OrgWideEmailAddress where DisplayName='Mindcrowd Admin 2'];
        List<EmailTemplate> emailTemplates =[Select Id,name from EmailTemplate 
                                             where name in ('Become VIP Reminder Template English','Become VIP Reminder Template Spanish')];
        
        if(emailTemplates != null && emailTemplates.size()==2){
            if(emailTemplates[0].name == 'Become VIP Reminder Template'){
                emailTempEngId = emailTemplates[0].Id;
                emailTempESId = emailTemplates[1].Id;
            }            
            else{
            emailTempEngId = emailTemplates[1].Id;
            emailTempESId = emailTemplates[0].Id;
         	}
        }

        for (Contact cont : scope) {
            if(cont.Language__c == 'Español'){
                 BecomeVIPEmailBatch.sendEmail(cont,emailTempESId);
            }
            else{
                 BecomeVIPEmailBatch.sendEmail(cont,emailTempEngId);
            }            
        }    
	}

	global void finish(Database.BatchableContext context) {
      
    }
    
    public static void sendEmail(Contact cont, Id EmailTempId ){
        	System.debug('cont: '+cont);
            System.debug('EmailTempId: '+ EmailTempId);
            Messaging.SingleEmailMessage message = new Messaging.SingleEmailMessage();
            message.setTargetObjectId(cont.Id);            
            //message.setOrgWideEmailAddressId(owa.Id);
            message.setSaveAsActivity(false);
            message.setTemplateID(EmailTempId);
            message.setWhatId(cont.Id); 
            message.toAddresses = new String[] { cont.email};                
            Messaging.SingleEmailMessage[] messages = new  List<Messaging.SingleEmailMessage> {message};
            Messaging.SendEmailResult[] results =   Messaging.sendEmail(messages);
            
            if (results[0].success)
            {
                System.debug('The email was sent successfully.'+results[0]);
                System.debug('results: '+results);
            }
            else
            {
                System.debug('The email failed to send:' + results[0].errors[0].message);
            }
        }     
}