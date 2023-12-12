/*
* 
Created By: {Girikon(Pramod Kumar)}
Created On: 12/07/2021
Description/Purpose:Handler class for Community User Creation trigger on updation of Contact[ticket No-: TM-103]
Method Name-- CreateCommunityUser
Test Class--CommunityUser_Test
Trigger--CommunityUserCreation_Trigger
*
*/

//Handler class for Community User Creation trigger on updation of Contact
public without sharing class CommunityUserHandler {
    public static Set<String> createCommunityUser(Map<Id,Contact> conMap, List<String> emailList){
        String strProfile='';
        String strUserNameSuffix='';
        String userId;
        
        //Get values from custom settings
        
        Community_Info__c mc = Community_Info__c.getValues('Community Settings');        
        if(String.isNotBlank(mc.User_Next_Suffix__c)){
            strUserNameSuffix = mc.User_Next_Suffix__c;
        }
        
        //check contact and user in system
        Map<Id,Contact> existingContacts = new Map<Id,Contact>([SELECT Id,AccountId,Email,Language__c,FirstName,LastName,Activation_Date__c FROM Contact WHERE Email IN: emailList AND Id NOT IN:conMap.keySet() AND Parent_Contact__c=null]);
        System.debug('Exisitng Contact: '+JSON.serialize(existingContacts));
        List<User> existingUsers = [SELECT Id,ContactId,Email FROM User WHERE ContactId In:existingContacts.keySet()];
        System.debug('Exisitng User: '+JSON.serialize(existingUsers));
        
        Map<Id,Contact> contacToCreateUser = new Map<Id,Contact>();
        List<Contact> contacToUpdate = new List<Contact>();
        
        Map<String,Id> contEmailIdMap = new Map<String,Id>();
        Set<Id> idListThatUpdate = new Set<Id>();
        
        //account list that will be create for contact if there is AccountId blank 
        Map<String,Account> contEmailAccMap = new Map<String,Account>();
        
        for(User userObj: existingUsers){
            contEmailIdMap.put(userObj.Email,userObj.ContactId);
        }
        
        Map<String,Contact> emailContactMap = new Map<String,Contact>();
        for(Contact con : conMap.values()){
            emailContactMap.put(con.Email, con);
        }


        //Create a list for existing contact that does not enabled as community user
        for(Contact con : existingContacts.values()){
            if(!contEmailIdMap.containsKey(con.Email)){
                con.Activation_Date__c = System.today();
                //System.debug('URL ID '+emailContactMap.get(con.Email).URL_Id__c);
                con.URL_Id__c = emailContactMap.containsKey(con.Email)?emailContactMap.get(con.Email).URL_Id__c:'';

                contacToCreateUser.put(con.Id,con);
                
                if(!String.isNotBlank(con.AccountId)){
                    String accName = String.isNotBlank(con.FirstName)?con.FirstName+' '+con.LastName:con.LastName;
                    contEmailAccMap.put(con.Email,new Account(Name = accName, Email__c=con.Email));
                }
                
                //add in this map because it will be a user 
                contEmailIdMap.put(con.Email,con.Id);
            }
        }
        
        //if only one contact and user not exist then create a user
        //if user found, then update parent contact and activation date
        for(Contact cont : conMap.values()){
            if(!contEmailIdMap.containsKey(cont.Email)){
                contacToCreateUser.put(cont.Id,cont);
                if(!String.isNotBlank(cont.AccountId)){
                    String accName = String.isNotBlank(cont.FirstName)?cont.FirstName+' '+cont.LastName:cont.LastName;
                    contEmailAccMap.put(cont.Email,new Account(Name = accName, Email__c=cont.Email));
                }
            }
            else {
                //URL_ID__c=EncodingUtil.base64Encode(Blob.valueOf(cont.Id)),
                //set parent contact id on child contact
                //contacToUpdate.add(new Contact(Id=cont.Id,Email=cont.Email,Parent_Contact__c = contEmailIdMap.get(cont.Email)));  
                contacToUpdate.add(new Contact(Id=cont.Id,Email=cont.Email,Parent_Contact__c = contEmailIdMap.get(cont.Email)));      
                //set activation date for parent contact
                idListThatUpdate.add(cont.Id);

                if(existingContacts.containsKey(contEmailIdMap.get(cont.Email))  && existingContacts.get(contEmailIdMap.get(cont.Email)).Activation_Date__c==null){
                    contacToUpdate.add(new Contact(Id=contEmailIdMap.get(cont.Email),Activation_Date__c=System.today()));                    
                    idListThatUpdate.add(contEmailIdMap.get(cont.Email));
                }
            }
        }
        
        Map<String,String> emailAccIdMap = new Map<String,String>();
        //Insert account before user creation
        if(!contEmailAccMap.isEmpty()){            
            List<Account>  accL = contEmailAccMap.values();
            Insert accL; 
            for(Account obj : accL){
                emailAccIdMap.put(obj.Email__c,obj.Id);
            }
            List<Contact> conListToUpdateAccount = new List<Contact>();
            for(Contact cont: contacToCreateUser.values())
            {
                if(emailAccIdMap.containsKey(cont.Email)){                    
                    conListToUpdateAccount.add(new Contact(Id=cont.Id,AccountId=emailAccIdMap.get(cont.Email)));
                }
            }
            
            //Update contact before user create
            if(!conListToUpdateAccount.isEmpty()){
                update conListToUpdateAccount;
            }
        }
        
        System.debug('Contact to create user: '+JSON.serialize(contacToCreateUser));
        // Get List of Users
        List<User> lstUsr = new List<User>();        
        for(Contact cont: contacToCreateUser.values())
        {
            System.debug('cont: '+JSON.serialize(cont));
            String fname = String.isNotBlank(cont.firstName)?cont.firstName:'M';
            // prepare portal user
            User newUser = new User();
            newUser.Email = cont.Email;            
            newUser.firstname = cont.firstName; 
            newUser.lastname = cont.lastname;            
            newUser.contactId = cont.Id;
            newUser.alias = fname.substring(0,1) + cont.lastname.substring(0,1);            
            newUser.username = cont.Email+ strUserNameSuffix;
            
            
            newUser.IsActive = true;
            newUser.Profileid = mc.Profile_Id__c;
            system.debug('language==>'+cont.Language__c);
            if(cont.Language__c=='Español'){
                 newUser.languagelocalekey = 'es';
            	 newUser.localesidkey = 'es';
                //newUser.Profileid = mc.Spanish_Profile_Id__c;
            }else{
                newUser.languagelocalekey = 'en_US';
            	newUser.localesidkey = 'en_US';
                
            }
            
            newUser.timezonesidkey = 'America/Phoenix';
            newUser.emailencodingkey = 'UTF-8';
            
            lstUsr.add(newUser);
        }
        
        //store contact email that linked with user 
        Set<String> contactEmailList = new Set<String>();
        
        // create portal user
        List<Contact> conlst = new List<Contact>();
        Set<String> userIds = new Set<String>();
        if(!lstUsr.isEmpty()){            
            Insert lstUsr;            
            for(User obj : lstUsr){                
                contactEmailList.add(obj.Email);
                Id idVar = obj.ContactId;
                userIds.add(String.valueOf(obj.Id));
                if(contacToCreateUser.containsKey(idVar) && !idListThatUpdate.contains(idVar)){                    
                    conlst.add(new Contact(Id=idVar,Activation_Date__c=System.Today(),URL_ID__c=contacToCreateUser.get(idVar).Url_Id__c));
                }
            }                        
        }
        conlst.addAll(contacToUpdate);
        System.debug('Contact to update: '+JSON.serialize(conlst));
        if(!conlst.isEmpty())
        {
            Update conlst;
        }
        sendEmail(contacToUpdate,contactEmailList);
        return userIds;           
    }
    
    /**
    *@purpose : Send Mail to contact
    *@param   : contList list of contact
    *@return  : no return
    **/
    public static void sendEmail(List<Contact> contList,Set<String> contactEmailList){
       //EmailTemplate et = [SELECT Id FROM EmailTemplate WHERE DeveloperName='Email_Template_for_Repeat_Test_taker' LIMIT 1];
       EmailTemplate et = [SELECT Id FROM EmailTemplate WHERE DeveloperName='Email_Template_for_Repeat_test' LIMIT 1];

        System.debug('Email Temp: '+et);
        System.debug('contList: '+contList);
        List<Messaging.SingleEmailMessage> emailList = new List<Messaging.SingleEmailMessage>();
        //Email send only if there is OrgWideEmailAddress setting exist and that email address set in custom setting(Community_Info__c)
        Community_Info__c mc = Community_Info__c.getValues('Community Settings');
        
        if(String.isNotBlank(mc.OrgWideEmailAddress__c)){
            List<OrgWideEmailAddress> owd = [Select Id from OrgWideEmailAddress where Address =:mc.OrgWideEmailAddress__c];
            System.debug('ContactEmailList '+contactEmailList);
            if(!owd.isEmpty())
            {
                for (Contact cont : contList){
                    //send email to only child contact that have parent contact
                    System.debug('values:'+contactEmailList+'Email: '+cont.Email);
                     System.debug('Parent values:'+cont.Parent_Contact__c);
                    if(cont.Parent_Contact__c!=null && !contactEmailList.contains(cont.Email)){
                        //Initializing for Sending Mails(Written Single because of in a loop)
                        Messaging.SingleEmailMessage email = new Messaging.SingleEmailMessage();            
                        //email.setSenderDisplayName('MindCrowd');
                        email.setOrgWideEmailAddressId(owd[0].Id);
                        email.optOutPolicy = 'FILTER';
                        //Setting the Template and Target Ids            
                        email.setTargetObjectId(cont.Id);
                        email.setTemplateId(et.Id);
                        emailList.add(email);
                    }
                } 
            }
        }
        //Sending the Mail
        if(!emailList.isEmpty()){
            Messaging.sendEmail(emailList);
        }
    }
}