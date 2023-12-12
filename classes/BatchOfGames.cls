// Created By: {Girikon(Shweta Khunteta)}
// Created On: 01/09/2021(DD/MM/YYYY
// Description/Purpose: [TM-185]-USED TO schedule the games after 365 days and send email to contacts whose 
// Verbal Paired Associate game and Deary Simple And Complex Reaction Time staus in contact Object is completed.
// Methods: {Methods name in class}
// Test Class: {BatchOfGames} {86%}



global class BatchOfGames implements Database.Batchable<SObject>,Database.Stateful
{
    global Set<String>  GameNamelist=new Set<String>();
    global Map<String,List<String>>  ConIdsVsGameIds=new Map<String,List<String>>();
    global Map<String,String>  GameIdsVsName=new Map<String,String>();
    
    
    global Database.QueryLocator start(Database.BatchableContext bc)
    {   
        System.debug('---IN start');
        return Database.getQueryLocator([SELECT Name,Game_Name__c,Game_Name__r.Name,Contact_Name__c from Participant_Game_Info__c 
							where isActive__c = true AND Game_Play_Status__c ='Completed']);     
    }
    global void execute(Database.BatchableContext bc, List<Participant_Game_Info__c> scope)
    {  
        System.debug('---IN execute');
        for(Participant_Game_Info__c ar : scope)
        { 
            if(!ConIdsVsGameIds.containsKey((String)ar.get('Contact_Name__c'))){
                ConIdsVsGameIds.put((String)ar.get('Contact_Name__c'),new List<String>{(String)ar.get('Game_Name__c')});
            }else{
                ConIdsVsGameIds.get((String)ar.get('Contact_Name__c')).add((String)ar.get('Game_Name__c'));
            }
            GameNamelist.add((String)ar.get('Game_Name__c'));
        }
        
        List<Contact>  Conlist=new List<Contact>();
        for(Game_Detail__c gNames :[select id,Name from Game_Detail__c where Id =: GameNamelist]){
            GameIdsVsName.put(gNames.id, gNames.Name);
        }
        List<Contact> conlistrecord=[SELECT Id,Email from Contact where Id IN:ConIdsVsGameIds.keySet()];
        for(Contact con: conlistrecord){
            List<String> valueofMap=ConIdsVsGameIds.get(con.id);
            for(String gameid  : valueofMap){
                String gameName =GameIdsVsName.get(gameid);
                
                If(gameName == 'Flanker'){
                    con.Flanker__c='Opened';   
                    
                }else If(gameName == 'Verbal Paired Associates'){
                    con.Verbal_Paired_Associates__c='Opened'; 
                    
                }else If(gameName == 'Letter-Number Sequencing'){
                    con.Letter_Number_Sequencing__c='Opened'; 
                    
                }else If(gameName == 'Deary Simple And Complex Reaction Time'){
                    con.Deary_Simple_And_Complex_Reaction_Time__c='Opened';  
                    
                }else If(gameName == 'Keep Track'){
                    con.Keep_Track__c='Opened';   
                    
                }else If(gameName == 'Object Recognition And Similarity'){
                    con.Object_Recognition_And_Similarity__c='Opened';   
                    
                }else If(gameName == 'Object Discrimination'){
                    con.Object_Discrimination__c='Opened';  
                    
                }else If(gameName == 'Object Temporal'){
                    con.Object_Temporal__c='Opened';   
                    
                }else If(gameName == 'Face-Name Associates'){
                    con.Face_Name_Associates__c='Opened';      
                }else If(gameName == 'Object Spatial'){
                    con.Object_Spatial__c='Opened'; 
                }
                mindCrowdCustomNotificationController.notifyUserActivatedGames(con.id,gameName);
            }
            conlist.add(con);
            //System.debug('conlist120>>'+conlist);
        }
        update conlist;
        
        //system.debug('scope'+scope);
        Set<String>  recsIds=new Set<String>();
        List<User> IdUser =[SELECT Username, ContactId, Id FROM User Where ContactId=:conlistrecord];
        system.debug('IdUser>>>'+IdUser);
        for(User ur:IdUser){
            recsIds.Add(ur.Id);      
        }
        system.debug('recsIds>>>>>>>>>'+recsIds);
        
        //mindCrowdCustomNotificationController.notifyUserfrombatch(recsIds);
        //Id conidd = '0038G00000SLC79QAH';
        //mindCrowdCustomNotificationController.notifyUserActivatedGames(conidd,'Flanker');
        
        Messaging.Email[] messages = new Messaging.Email[0];
        EmailTemplate emt=[Select Id from EmailTemplate where Name = 'Invitation for Playing Games'];
        for(Contact objC : conlistrecord)
        {
            
            Messaging.SingleEmailMessage mail = new Messaging.SingleEmailMessage();
            mail.setTargetObjectId(objC.Id);
            mail.setSenderDisplayName('System Admin');
            mail.setTemplateId(emt.Id);
            messages.add(mail);
            System.debug('Email sent to ----' +objC.Id);
        }
        if( Test.IsRunningTest() == false){
            Messaging.sendEmail(messages);
        }
    }
    global void finish(Database.BatchableContext BC)
    {
        System.debug('---IN FINISH');
        
    }  
    
}