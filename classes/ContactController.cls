// Created By: {Girikon(Shweta Khunteta)}
// Created On: 05/05/2021
// Description/Purpose: Why and where it is used [TM-17],[TM-31],[TM-40]-It was created to save the values from 
//participationconsentform (LWC component) to Contact Object.& brainee, brainInfoResults to Contact object.
// Methods: {updateContactFields,upsertContact,upsertContactResults}
// Test Class: {ContactControllertest} {90%}

public without sharing class ContactController 
{  //method to update contact field using participant consent form.
    @AuraEnabled
    public static String updateContactFields(String participantcode,
                                              String mailingstreet,
                                              String mailingcountry,
                                              String mailingstate,
                                              String mailingcity,
                                              String mailingzipcode5,
                                              String mailingzipcode4,
                                              String phoneNumber,
                                              String shipmentconsent,
                                              String campaigntype)
    {
        try 
        {  
            List<Contact> con = [SELECT Id,ParticipantCode__c,Shipment_Consent__c,Shipping_Consent__c,Bean_Game__c FROM Contact 
                                 where ParticipantCode__c=:participantcode OR Secure_GUID__c =:participantcode];
            String BeanGameStat;
            string conID;
            string mailingzipcode;
            if(con.size()>1){
                for(Contact contactId:con){
                    String ParticipationID = contactId.ParticipantCode__c;
                    system.debug('ParticipationID====>'+ParticipationID);
                    if(ParticipationID.equals(participantcode)){
                        conID = contactId.id;
                        BeanGameStat = con[0].Bean_Game__c;
                        break;
                    }
                }
            }
            else{
                conID = con[0].id;
                BeanGameStat = con[0].Bean_Game__c;
            }
            List<Research_Campaign__c> campaignList=new List<Research_Campaign__c>();
            campaignList= [SELECT Id,Name FROM Research_Campaign__c where Name=:campaigntype];
            string mailingstreet2;
            system.debug('mailingzipcode5===>'+mailingzipcode5);
            if(mailingstreet.contains('undefined')){
                mailingstreet2 = mailingstreet.replace('undefined', '');
            }
            else{
                mailingstreet2 = mailingstreet;
            }
            USPSAddress ResponseAddress = USPS.CheckAddress(mailingstreet2, mailingcountry, mailingcity, mailingstate, mailingzipcode5,mailingzipcode4);
            system.debug('ResponseAddress Contact=====>'+ResponseAddress.Address1);
            //string conID=con[0].Id;
            system.debug('conID===>'+conID);
            if(mailingzipcode4!=null){
                mailingzipcode = mailingzipcode5+'-'+mailingzipcode4;
            }
            else{
                mailingzipcode = mailingzipcode5;
            }
            
            if(con.size()>0)
            { 
                system.debug('phoneNumber>>'+phoneNumber);
                if(phoneNumber != null && phoneNumber !='' ){
                    con[0].Phone=phoneNumber;
                }
                con[0].Shipping_Consent__c=shipmentconsent;
                update con;
                if ((ContactController.hasDuplicateRecord(conID,campaigntype) && campaigntype != 'bean game')) {
                    return 'DuplicateSD';
                  }
                else if(campaigntype == 'bean game' && BeanGameStat !='Opened'){
                    return 'DuplicateSD';
                  }
                else{
                if(ResponseAddress.Address1==''){
                    Shipping_Detail__c shiprecordcreate = new Shipping_Detail__c(
                        Campaign__c=campaignList[0].Id,
                        Contact_Id__c=conID,
                        Shipment_Status__c = 'Invalid Address',
                        Address__Street__s=mailingstreet2, 
                        Address__CountryCode__s=mailingcountry,
                        Address__StateCode__s=mailingstate,
                        Address__City__s=mailingcity,
                        Address__PostalCode__s=mailingzipcode      
                    );
                    insert shiprecordcreate;
                    
                }
                else{
                    
                    Shipping_Detail__c shiprecordcreate = new Shipping_Detail__c(
                        
                        Campaign__c=campaignList[0].Id,
                        Contact_Id__c=conID,
                        Address__Street__s=mailingstreet2, 
                        Address__CountryCode__s=mailingcountry,
                        Address__StateCode__s=mailingstate,
                        Address__City__s=mailingcity,
                        Address__PostalCode__s=mailingzipcode      
                    );
                    insert shiprecordcreate;
                }
                //creates a shipping record when participant gives the consent.
              }
                
                
                return 'success';
            }    
        } 
        catch (Exception e) 
        {
            System.debug('updateUsersFirstName error: ' + e.getMessage());
        }
        
        return 'failed';
    }
    //This method is used to update the values on contact object through brainee.js (LWC Component).
    @AuraEnabled 
    public static Boolean upsertContact(String contactId,String repeattesttaker,
                                        String handedness,String race ,String hispanic,
                                        String hispanicorigin,
                                        String medications,
                                        String health,String urlId,
                                        String firstdegree,
                                        String firstdegreeeo,
                                        String seconddegree)
    {
        try
        {
            List<Contact> con = [SELECT Id,sub_id__c,Repeat_test_taker__c, 
                                 Are_you_Left_or_Right_hand_dominant__c,Race__c,Hispanic_Latino__c,
                                 Hispanic_Latino_origin__c,
                                 Number_of_daily_medications__c,
                                 URL_ID__c,Secure_GUID__c,
                                 Health_Lifestyle_and_Medical__c,
                                 First_degree_family_history_of_AD__c,
                                 First_degree_family_history_of_EO_AD__c,
                                 Second_degree_family_history_of_AD__c
                                 FROM Contact 
                                 where Contact.Id =:contactId];
            if(!con.isEmpty())
            {
                

                // Set Tapjoy URL 
                
                    

                con[0].Repeat_test_taker__c = repeattesttaker;
                con[0].Are_you_Left_or_Right_hand_dominant__c = handedness;
                con[0].Race__c=race;
                con[0].Hispanic_Latino__c=hispanic;            
                con[0].Hispanic_Latino_origin__c=hispanicorigin;
                con[0].Number_of_daily_medications__c=medications;
                con[0].Health_Lifestyle_and_Medical__c= health;
                con[0].First_degree_family_history_of_AD__c=firstdegree;
                con[0].First_degree_family_history_of_EO_AD__c=firstdegreeeo;
                con[0].Second_degree_family_history_of_AD__c=seconddegree;
                con[0].URL_ID__c=urlId;
                if(!String.isNotBlank(con[0].Secure_GUID__c)){
                    con[0].Secure_GUID__c = UnsubscribeCtrl.newGuid();
                }
                update con;
                if(con[0].sub_id__c!=null){
                    sendTapjoyRequest(con[0].sub_id__c);
                }
                
                System.debug('contact updated');
                return true;
            }
            
        } 
        catch (Exception e) 
        {
            System.debug('updateUsersFULL CONTACT error: ' + e.getMessage());
        }
        
        return false; 
        
    }
    //This method is used to update the values on contact object through brainInfoResults.js (LWC Component).
    @Future(callout=true)
    public static void sendTapjoyRequest(String contactSubId){
        // Set Tapjoy URL
                
        if(contactSubId!=null){
            Tapjoy__c tapValues = Tapjoy__c.getValues('TApJoyURL');
            system.Debug('**Tapjoy URL*'+tapValues.URL__c);
            if(tapValues!=null){
                HttpRequest req = new HttpRequest();
                req.setEndpoint(tapValues.URL__c+contactSubId);
                req.setMethod('GET');
                Http http = new Http();
                HTTPResponse res = http.send(req);
                system.Debug('*Tapjoy REsponse value**'+res);
            }
        }
    }
    
    @AuraEnabled
    public static Boolean upsertContactResults(String contactId,String fname,String lname,
                                               String email,String accountName,String urlId, String phone
                                              )
    {
        try 
        {
            List<Contact> con = [SELECT Id,FirstName,LastName,Email,Phone,Allow_Newsletters__c,AccountId,URL_ID__c
                                 FROM Contact 
                                 where Contact.Id =:contactId];
            System.debug('query executed');
            
            if(!con.isEmpty())
            {      con[0].FirstName = fname;
             con[0].LastName = lname;
             con[0].Email = email;
             con[0].Phone = phone;
             con[0].AccountId = accountName;
             con[0].URL_ID__c=urlId;  
             update con;
             System.debug('contact updated');
             return true;
            }
            
        } 
        catch (Exception e) 
        {
            System.debug('updateUsersFULL CONTACT error: ' + e.getMessage());
        }
        
        return false;
    }
    
    //this function works for the account insert on braininforesult LWC component.(created by sunil singh)
    @AuraEnabled
    public static string insertAccount(String accNameParamInApex)
    {
        String str='';
        try 
        { 
            if(!String.isBlank(accNameParamInApex))
            {
                Account acc = new  Account();
                acc.Name=accNameParamInApex;
                insert acc; 
                str=acc.id;
            }        
        } 
        catch (Exception e) 
        {
            System.debug('updateUsersFULL CONTACT error: ' + e.getMessage());
            str='account insert not executed'; 
        }
        return str;
    }
    
    // this function works for creating the contact by brainInfo LWC component.(created by sunil singh)
    @AuraEnabled
    public static Map<String,String> saveContactRecord(Contact con){
        try{
            Insert con;
            
            List<Game_Detail__c> gameList =  [SELECT Id FROM Game_Detail__c WHERE Name='DLTRS'];
            String gameId = '';
            //create PGI record
            Participant_Game_Info__c pgiObj = new Participant_Game_Info__c(Contact_Name__c=con.Id,Language__c=con.Language__c);
            if(!gameList.isEmpty()){
                pgiObj.Game_Name__c = gameList[0].Id;
                gameId = gameList[0].Id;
            }
            Insert pgiObj;
            
            if(con.Study_Id__c!=null){
                List<Studies__c> stuConList = [SELECT Participant_Id__c FROM Studies__c Where Id =:con.Study_Id__c];
                if(!stuConList.isEmpty()){
                    con.Study_Participant_Id__c = stuConList[0].Participant_Id__c;
                    update con;
                }
            }
            
            return new Map<String,String>{
                'conId'=>con.id,
                    'pgiId'=>pgiObj.Id,
                    'gameId'=>gameId
                    };
                        }
        catch(Exception ex) {         
            throw new AuraHandledException(ex.getStackTraceString());
        }
    }
    
    @AuraEnabled
    public static String saveSubscribeEmail(String subsc)
    {
        System.debug('acc--'+subsc);
        Subscribe__c subscribe=new Subscribe__c();
        String email='';
        if(Subsc!=null){
            subscribe.Email__c=subsc;
            email=subsc;
        }
        insert subscribe;
        System.debug('email--'+email);
        return email;
    }
    @AuraEnabled
    public static String updateABTestingRecord(String recId, string contactId){
        AB_Testing__c newrecord1=new AB_Testing__c();
        newrecord1.id=recId;
        newrecord1.Contact_Id__c=contactId;
        update newrecord1;
        return recId;
    }
    
    @AuraEnabled(cacheable=true)
    public static Contact fetchContactFields1(String participantcode){
    	
        	Contact con = [SELECT Id,FirstName,LastName,Email,ParticipantCode__c,Bean_Game__c,Consent_signed_on__c FROM Contact 
                                 where ParticipantCode__c=:participantcode limit 1];
        return con;
    }
    @AuraEnabled
    Public static Boolean hasDuplicateRecord(string conId, String campaign){
        List<Shipping_Detail__c> existingRecords=[select id,
                                                  Contact_Id__c,
                                                  Shipment_Status__c 
                                                  from Shipping_Detail__c 
                                                  where Contact_Id__c=:conId
                                                  AND Campaign__r.Name=:campaign
                                                  AND Shipment_Status__c NOT IN('Invalid Address','Failed')];
        return existingRecords.size()>0?true:false;
        
    } 
    
    @AuraEnabled
    Public static Map<String, String> hasDuplicateRecords(string conId, List<String> campaign){
        List<Shipping_Detail__c> existingRecords=[select id,
                                                  Contact_Id__c,
                                                  Shipment_Status__c,
                                                  Campaign__r.Name
                                                  from Shipping_Detail__c 
                                                  where Contact_Id__c=:conId
                                                  AND Campaign__r.Name IN: campaign
                                                  AND Shipment_Status__c NOT IN('Invalid Address','Failed')];
        Map<String, String> campStatus = new Map<String, String>();
        for(String campName:  campaign){
                campStatus.put(campName, 'N');
        }
        for(Shipping_Detail__c sd: existingRecords){
            if(campaign.contains(sd.Campaign__r.Name)){
                campStatus.put(sd.Campaign__r.Name,'Y');
            }
        }
        return campStatus;
        
    } 

    @AuraEnabled(cacheable=true)
    public static List<Map<String, Object>> getCustomSettingValues() {
    List<Map<String, Object>> customSettingValues = new List<Map<String, Object>>();
    
    // Get all the fields for CurrRunnCamp__c
    Map<String, Schema.SObjectField> fieldMap = Schema.SObjectType.CurrRunnCamp__c.fields.getMap();
    String fieldsToQuery = 'Id'; // Always include Id
    
    // Add additional fields to the query
    for (String fieldName : new String[]{'CurrRunnCampEnglish__c', 'CurrRunnCampSpanish__c'}) {
        if (fieldMap.containsKey(fieldName)) {
            fieldsToQuery += ',' + fieldName;
        }
    }
    
    // Build the dynamic SOQL query
    String query = 'SELECT ' + fieldsToQuery + ' FROM CurrRunnCamp__c';
    
    // Execute the query
    List<CurrRunnCamp__c> existingRecords = Database.query(query);
    
    // Convert the records to a list of maps
    for (CurrRunnCamp__c record : existingRecords) {
        Map<String, Object> recordMap = new Map<String, Object>();
        recordMap.put('Id', record.Id);
        recordMap.put('CurrRunnCampEnglish__c', record.CurrRunnCampEnglish__c);
        recordMap.put('CurrRunnCampSpanish__c', record.CurrRunnCampSpanish__c);
        customSettingValues.add(recordMap);
    }
    
    System.debug('customSettingValues: ' + customSettingValues);
    return customSettingValues;
}
    @AuraEnabled
    public static String updateConsent(String participantcode) {
        String statuscode='';
        try{
            List<Contact> Cont = [select Id from Contact where ParticipantCode__c =: participantcode];
            if(Cont.size()>0){
                Cont[0].Consent_Signed_on__c = system.today();
                update Cont[0];
                statuscode='Success';            
           }       
        }
        catch(Exception e){
            statuscode='Failed';
        }        
        return statuscode;
    }
}