/*
 * 
  Created By: {Girikon(Rohit Dua)}
  Created On: 30/05/2022
  Description/Purpose:batch class to reset password of the user those who haven't set there password after 1st email to set password aslo to send list of user for which password is getting reset internally in finish method[]
  Test Class--ScheduleBatchEmailTempBatchTest
 *
 */

public class ScheduleBatchEmailTempBatch implements Database.Batchable<sObject>, Database.Stateful 
{    
    //variables to get the list of user for which password is getting reset     
    public Map<string,contact> email1dayFireMap = new Map<string,contact>();
    public Map<string,contact> email7dayFireMap = new Map<string,contact>();
    public Map<string,contact> email45dayFireToMap = new Map<string,contact>();
    public String email1dayFireLst;
    public String email7dayFireLst;
    public String email45dayFireToLst;
    // start method to get the list of contact whose consent sign on is null and it had been 1,7 or 45 days
    
    public Database.QueryLocator start(Database.BatchableContext bc)
    {
        if(!test.isRunningTest())
        {
            return Database.getQueryLocator('SELECT Id, Days__c,Consent_Signed_On__c FROM Contact WHERE Unsubscribe__c=false AND Consent_Signed_On__c = null and email !=null AND User_Id__c = null AND (Days__c = 1 OR Days__c = 7 OR Days__c = 45)'); 
        }
        else
        {
            return Database.getQueryLocator('SELECT Id, Days__c,Consent_Signed_On__c FROM Contact WHERE Consent_Signed_On__c = null');
        }
    }
    // execute  method to reset password of the use  whose contact  consent sign on is null and it had been 1,7 or 45 days    
    public void execute(Database.BatchableContext bc, List<Contact> ConLst)
    {
        Set<Id> conId = new Set<Id>();  
        system.debug('ConLst'+ConLst.size());
        for(Contact con : ConLst)
        {             
            // createing map to get the contact for which password is getting reset 
            if(con.Days__c == 1){ email1dayFiremap.put(con.id,con);  conId.add(con.id);   }
            if(con.Days__c == 7) {   email7dayFireMap.put(con.id,con);    conId.add(con.id);   }
            if(con.Days__c == 45) {  email45dayFireToMap.put(con.id,con); conId.add(con.id); }
        }
        List<User> usrLst = [SELECT Id,ContactId,Username,email  FROM USER WHERE ContactId IN :conId AND IsActive  =  true];
        for(User u : usrLst)
        {
            // using salesforce standard resetting the password of the user 
            system.resetPassword(u.id, true);
           // creating list of username for which password is getting reset 
            if(email1dayFiremap.containskey(u.ContactId)){email1dayFireLst = u.Username + ', '+( email1dayFireLst != null ? email1dayFireLst : '');}
            if(email7dayFireMap.containskey(u.ContactId)){email7dayFireLst = u.Username +', ' + (email7dayFireLst != null ? email7dayFireLst : ''); }
            if(email45dayFireToMap.containskey(u.ContactId)){ email45dayFireToLst = u.Username +', '+ (email45dayFireToLst != null ? email45dayFireToLst : ''); }          
      
        }       
        	
    }
    // finish method firring the email for which password is getting reset 
    public void finish(Database.BatchableContext bc){
        // Send Email
        Messaging.SingleEmailMessage mail = new Messaging.SingleEmailMessage();
        List<String> sendTo = new List<String>();
        //sendTo.add(UserInfo.getUserEmail());  
        sendTo.add( label.Email_address_for_password_reset_list );
        mail.setToAddresses(sendTo);       
        mail.setSubject('List of user for which password is reseted ');       
        String body = 'Hi,<br/>' 
    
        +'List of username to whome Emails are  fired and created 1 day before  :- <br/>'+  email1dayFireLst 
        +'<br/>List of username to whome Emails are  fired and created 7 days before  :- <br/>'+  email7dayFireLst 
        +'<br/>List of username to whome Emails are  fired and created 45 days before  :-<br/> '+  email45dayFireToLst ;    
        mail.setHtmlBody(body);
        string emailaddress   = label.Email_address_for_password_reset_list;
        if(emailaddress!= '' && emailaddress != null){
        Messaging.sendEmail(new list<Messaging.SingleEmailMessage> {mail} );
        }
    }
}