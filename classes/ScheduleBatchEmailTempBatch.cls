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
    public Map<string,contact> email100dayFireToMap = new Map<string,contact>();
    public Map<string,contact> email200dayFireToMap = new Map<string,contact>();
    public Map<string,contact> email300dayFireToMap = new Map<string,contact>();
    public String email1dayFireLst;
    public String email7dayFireLst;
    public String email45dayFireToLst;
    public String email100dayFireToLst;
    public String email200dayFireToLst;
    public String email300dayFireToLst;
    // start method to get the list of contact whose consent sign on is null and it had been 1,7 or 45 days
    
    public Database.QueryLocator start(Database.BatchableContext bc)
    {
        if(!test.isRunningTest())
        {
            return Database.getQueryLocator('SELECT Id, Days__c,Consent_Signed_On__c FROM Contact WHERE Unsubscribe__c=false AND Consent_Signed_On__c = null and email !=null AND User_Id__c = null AND (Days__c = 1 OR Days__c = 7 OR Days__c = 45 OR Days__c = 100 OR Days__c = 200 OR Days__c = 300)'); 
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
        Set<Id> conIdBecomeVIP = new Set<Id>();  
        for(Contact con : ConLst)
        {             
            // createing map to get the contact for which password is getting reset 
            if(con.Days__c == 1){ email1dayFiremap.put(con.id,con);  conId.add(con.id);   }
            if(con.Days__c == 7) {   email7dayFireMap.put(con.id,con);    conId.add(con.id);   }
            if(con.Days__c == 45) {  email45dayFireToMap.put(con.id,con); conId.add(con.id); }
            if(con.Days__c == 100) {  email100dayFireToMap.put(con.id,con); conIdBecomeVIP.add(con.id); }
            if(con.Days__c == 200) {  email200dayFireToMap.put(con.id,con); conIdBecomeVIP.add(con.id); }
            if(con.Days__c == 300) {  email300dayFireToMap.put(con.id,con); conIdBecomeVIP.add(con.id); }
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
        
        List<User> usrLstbecomeVIP = [SELECT Id,LanguageLocaleKey  FROM USER WHERE ContactId IN :conIdBecomeVIP AND IsActive  =  true];
        for(User u : usrLstbecomeVIP)
        {
            // using salesforce standard resetting the password of the user 
            if(u.LanguageLocaleKey == 'es'){
                system.resetPasswordWithEmailTemplate(u.id, true,'Become_VIP_Reminder_Template_Spanish');  
            }
            else{
                system.resetPasswordWithEmailTemplate(u.id, true,'Become_VIP_Reminder_Template_English');  
            }
                 
      
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