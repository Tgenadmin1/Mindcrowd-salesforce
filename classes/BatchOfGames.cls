// Created By: {Girikon(Shweta Khunteta)}
// Created On: 01/09/2021(DD/MM/YYYY
// Description/Purpose: [TM-185]-USED TO schedule the games after 365 days and send email to contacts whose 
// Verbal Paired Associate game and Deary Simple And Complex Reaction Time staus in contact Object is completed.
// Methods: {Methods name in class}
// Test Class: {BatchOfGames} {86%}



global class BatchOfGames implements Database.Batchable<SObject>,Database.Stateful
{
    public Integer activationdays;
    global List<AggregateResult> queryresult; 
    global BatchOfGames(List<AggregateResult> queryresult)
    { 
    this.queryresult = queryresult; 
    } 

global Database.QueryLocator start(Database.BatchableContext bc)
{
    System.debug('-----in start');
    System.debug(this.queryresult);
    List<String>  conidlist=new List<String>(); 
    
    for(AggregateResult ar : queryresult)
    { 
        String conid;
        conid = (String)ar.get('cnid');
        conidlist.add(conid);
    } 
    System.debug('-CONID LIST is--'+conidlist);

   // String conidStr=String.join(conidlist, ',');
    
    // String q= 'select Id,Email from Contact where Id IN ('+conidStr+')';
    // System.debug(q);
    list<Contact> lstcon=new List<Contact>();
    System.debug('lstcon--->'+lstcon);
    String q= 'select Id,Email from Contact where Id IN:conidlist';
    lstcon=Database.query(q);
    System.debug(lstcon);
    return Database.getQueryLocator([select Id,Email from Contact where Id IN:conidlist]);  
        
}
global void execute(Database.BatchableContext bc, List<Contact> scope)
{   
    System.debug('in execute method');
    System.debug('batchable context--'+scope);
    Integer size= scope.size();
    System.debug('### size of scope---'+size);
    for(Contact con:scope)
    {
     con.Deary_Simple_And_Complex_Reaction_Time__c ='Opened';
     con.Verbal_Paired_Associates__c ='Opened';
     System.debug('contact name to be updated is---');
    }
   update scope;
    system.debug('scope'+scope);
    Set<String>  recsIds=new Set<String>();
    List<User> IdUser =[SELECT Username, ContactId, Id FROM User Where ContactId=:scope];
    system.debug('IdUser'+IdUser);
    for(User ur:IdUser){
                recsIds.Add(ur.Id);      
            }
    mindCrowdCustomNotificationController.notifyUserfrombatch(recsIds);
    Messaging.Email[] messages = new Messaging.Email[0];
    EmailTemplate emt=[Select Id from EmailTemplate where Name = 'Invitation for Playing Games'];
    for(Contact objC : scope)
    {

        Messaging.SingleEmailMessage mail = new Messaging.SingleEmailMessage();
        mail.setTargetObjectId(objC.Id);
        mail.setSenderDisplayName('System Admin');
        mail.setTemplateId(emt.Id);
        messages.add(mail);
        System.debug('Email sent to ----' +objC.Id);
    }
    if( Test.IsRunningTest() == false){
        system.debug('>>>>');
    
    Messaging.sendEmail(messages);
    }
 }
global void finish(Database.BatchableContext BC)
{
        System.debug('---IN FINISH');
        
}  

}