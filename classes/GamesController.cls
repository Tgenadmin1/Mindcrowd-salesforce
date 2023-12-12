// Created By: (Sunil Kumar)
// Updated On: 25/08/2021
// Updated On: 13/09/2022
// Description/Purpose: This Apex class control the game response and the handling the games component.
//TestClass: GamesControllerTest(81%) Coverage

public without sharing class GamesController 
{

    //Exception handling===============
    @AuraEnabled
    public static string logError(String className, String methodName, String description) 
    {  
        String str='';
        try
        {
             ExceptionLogHandler.logException(null,className,methodName,description);
            str='success';
        }  
        catch(Exception ex)
        {
            System.Debug('logError AuraHandledException: ' +ex.getMessage()+' at line number' +ex.getLineNumber());
            str='error';
        }
        return str;   
    }
    
     //this function works for saving game responces.
     @AuraEnabled
     public static string saveGameResponse(String sobj) 
     { 
         String str='';
         try
         {
            Participant_Game_Response__c obj= (Participant_Game_Response__c)JSON.deserialize(sobj, Participant_Game_Response__c.class);
            if(obj!=null){
                List<Participant_Game_Response__c> pgiTest=[SELECT Id, Name, Game_Name__c, Round__c, Question_Number__c, Participant_Game_InfoID__c FROM Participant_Game_Response__c where Question_Number__c=:obj.Question_Number__c And Participant_Game_InfoID__c =: obj.Participant_Game_InfoID__c And Round__c=:obj.Round__c And Game_Name__c=:obj.Game_Name__c And Right_Answer__c=:obj.Right_Answer__c];
                System.Debug('saveGameResponse pgiTest: '+pgiTest);    
                    if(pgiTest.size()==0){
                            insert obj;
                            System.debug('this is ipAddress:'+obj.id);
                            str='success';
                    }
                      
            }
            else{
                str='PGR obj is having null.';
            }
             return str;       
         }    
         catch(Exception ex)
         {
             System.Debug('saveGameResponse AuraHandledException: ' +ex.getMessage()+' at line number' +ex.getLineNumber());
             str='error';
             return str; 
         }
     }
 
     
    //this function works for getting game id from GAmeDetails Object.
    @AuraEnabled
    public static string getGameId(String gameName) 
    {     
        String str='';
        Game_Detail__c game =new Game_Detail__c();
        List<Game_Detail__c> gameLst= [select name, id from Game_Detail__c where Name =:gameName];       
        if(gameLst !=null && gameLst.size() >0) {
            game=gameLst[0];   
            str =game.id;
            system.debug('FakeNewsId..'+str);
        }
        else{
            str='Getting null gameLst.';    
        }
        return str;     
    }
    
    //this function retrurs the contactId using UserId.
    @AuraEnabled
    public static string getContactId(String currentUserid) 
    {       
        String str='';
        User  currentUser =new User ();
        List<User> userlst= [select firstname, ContactId, email, id FROM User where id =: currentUserid];
        if(userlst !=null && userlst.size() >0){
            currentUser=userlst[0]; 
            str =currentUser.ContactId;
            system.debug('Contact ID...'+str);
        }
        else{
            str='Getting null userlst.';
        }  
        return str;  
    }

    //this function works for creating participantGameInformation Id whenever participant start to play.
    @AuraEnabled
    public static String participantGameInfoDetail(String sobj) {
        String str='';
        System.debug('pgi creation'+sobj);
        try
        { 
            Participant_Game_Info__c obj= (Participant_Game_Info__c)JSON.deserialize(sobj, Participant_Game_Info__c.class);
            System.debug('pgi creation'+obj);
            if(obj!=null && !String.isBlank(obj.Contact_Name__c)){
                insert obj; 
                str=obj.id;
                system.debug('PGI Created...'+ str);
            }
            else{
                system.debug('PGi values null.');
            }
            return str;
        }    
        catch(Exception ex)
        {
            System.Debug('participantGameInfoDetail AuraHandledException: ' +ex.getMessage());
            str='PGi obj is reprsenting null.';
             return str; 
        }            
    }
    
    //Updated by Mukesh Start 
    @AuraEnabled
    public static Map<String,String> createPGI(String contId){
        try {
            List<Game_Detail__c> gameList =  [SELECT Id FROM Game_Detail__c WHERE Name='PAIRED GAME'];
            String gameId = '';
            List<Participant_Game_Info__c> pgiList = new List<Participant_Game_Info__c>();
        	List<Contact> contacToUpdate = new List<Contact>();
            //create PGI record
            Participant_Game_Info__c pgiObj = new Participant_Game_Info__c(Contact_Name__c = contId);
            //update to save language in PGI for Paired Game
            contacToUpdate = [select id,Language__c from contact where id =:contId];
            if(!gameList.isEmpty()){
                pgiObj.Game_Name__c = gameList[0].Id;
                pgiObj.language__C = contacToUpdate[0].Language__c;
                gameId = gameList[0].Id;

                //check is PGI record created for this contact
                pgiList = [SELECT Id FROM Participant_Game_Info__c WHERE Contact_Name__c=:contId AND Game_Name__c=:gameId LIMIT 1];
                system.debug('PGI record....'+ pgiList);
            }
                
            if(pgiList.isEmpty()){
                Insert pgiObj;
                system.debug('PGI record created...'+ pgiObj);
            }
            else{
                pgiObj = pgiList[0];
                system.debug('PGI record created_2...'+ pgiObj);
            }
            
            return new Map<String,String>{
                'pgiId'=>pgiObj.Id,
                'gameId'=>gameId
            };
        } 
        catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }

    @AuraEnabled
    public static String updatePGI(String sobj) {
        String str='';        
        try
        { 
            Participant_Game_Info__c obj= (Participant_Game_Info__c)JSON.deserialize(sobj, Participant_Game_Info__c.class);
            if(obj!=null){
                Update obj; 
                str=obj.id;
            }
            return str;
        }    
        catch(Exception ex)
        {
            logError('GamesController', 'update_PGI()', ex.getMessage()+', Data: '+sobj);
            throw new AuraHandledException(ex.getMessage());
        }            
    }
    //Updated by Mukesh End
    
    //this function works for the update the participantGameInfoRecord, When game is completed.
    @AuraEnabled
    public static String participantGameInfoUpdate(String sobj){
        string str='';
        try
        {       
            Participant_Game_Info__c obj= (Participant_Game_Info__c)JSON.deserialize(sobj, Participant_Game_Info__c.class);
            String pgiID=obj.Id;
            if(obj!=null && !String.isBlank(pgiID)){
                update obj; 
                str=obj.id;
            } 
            else{
                system.debug('PGi obj is reprsenting null.');
            }  
            return str;            
        }    
        catch(Exception ex)
        {
            logError('GamesController', 'update_PGI()', ex.getMessage()+', Data: '+sobj);
            System.Debug('participantGameInfoUpdate AuraHandledException: ' +ex.getMessage());
            return ('PGi obj is reprsenting null.');
        }       
    }

    //this function works for the update the gameName in PaticipantGameInfo object.
    @AuraEnabled
    public static void gameNameInParticipantGameInfoUpdate(String sobj)
    {
        String mailIp='';
        try
        {           
            Participant_Game_Info__c obj= (Participant_Game_Info__c)JSON.deserialize( sobj, Participant_Game_Info__c.class);
            System.Debug('PGI Data: '+obj);
           
            if(obj !=null)
            {
                mailIp=(obj.IP_Address__c).trim();
                if(!String.isBlank(obj.Id))
                {
                    Participant_Game_Info__c pgi=[Select id,Time_Zone_Offset__c,IP_Address__c from Participant_Game_Info__c where id=: obj.Id];
                    if(!String.isBlank(obj.IP_Address__c) && String.isBlank(pgi.Time_Zone_Offset__c))
                    {       
                        Map<String, Object> results = WebServiceForIpData.getIPData(mailIp);
                        system.debug('results==>'+results);
        
                        if(results !=null)
                        {
                            Map<String, Object> lmap =(Map<String, Object>) results.get('time_zone');
                            obj.Time_Zone_Offset__c=(String)lmap.get('offset');
                            obj.Geolocation__Longitude__s= decimal.valueOf(JSON.serialize(results.get('longitude')));
                            obj.Geolocation__Latitude__s= decimal.valueOf(JSON.serialize(results.get('latitude'))); 
                            obj.City__c=string.valueOf(JSON.serialize(results.get('city'))).replace('"','');
                            obj.Country__c=string.valueOf(JSON.serialize(results.get('country_name'))).replace('"','');
                            obj.Region__c=string.valueOf(JSON.serialize(results.get('region'))).replace('"','');
                            obj.IP_Data__c=JSON.serialize(results);
                            obj.Zip_Code__c=string.valueOf(JSON.serialize(results.get('postal'))).replace('"','');
                        }
                        else
                        {
                            System.Debug('WebServiceForIpData is throwing null or blank.');
                        } 
                    }
                    update obj;
                    system.debug('FakeNewstest'+ obj);
                }
            }         
        }
        catch(Exception ex)
        {
            String errorMessage= 'ERROR for IpAddress:'+ mailIp +'\n' + ex.getTypeName() + '\n'+ex.getMessage() + '\n' + ex.getLineNumber() + '\n' + ex.getStackTraceString();
            System.debug(ex.getStackTraceString());
            System.debug(ex.getMessage());
            UtilityMethods.ErrorReportToEmail(errorMessage);
        }  
        //make a webservice callout first and then save the request.
        //Marking Game complete at Contact level
        if(System.Label.GameControllerLockLabel=='true'){// this custom label is used for the locking games after played from the User's game tile.
            GamesPageDependencyController.triggerForUpdateContactGamesField(sobj);
        }
         
    }
    
    //this function gets the customLoginUser participant IPAddress.
    @AuraEnabled
    public static String getIpCustomLoginUser() 
    {
        String ip ='';
        if(!Test.isRunningTest())
        {
           Map<String,String> currentSessionAttributes = Auth.SessionManagement.getCurrentSession();
           ip = currentSessionAttributes.get('SourceIp');
        }
        return ip; 
    }
    //this function returns the contact using participantId.
    @AuraEnabled(cacheable=true)
    public static Contact getParticipantContactID(String participantId) 
    {        
        Contact con=[Select LastName, ParticipantCode__c, id, email FROM Contact Where Contact.ParticipantCode__c =: participantId];
        if(con!=null){
            return con;
        }
        else{
            System.debug('getParticipantContactID is having null.');
            return null;
        } 
    }
    //this function works for creating BeanGame record.
    @AuraEnabled
    public static void createBeanGameRecord(Bean_Game__c obj)
    {
       try 
       {
        if(obj!=null && obj.Contact__c!=null){
            System.debug('beanGame is created with id: '+obj.id);
            insert obj;   
            Contact cont = [select Bean_Game__c from Contact where Id=:obj.Contact__c];
            cont.Bean_Game__c='Completed';
            update cont;
        }
        else{
            System.debug('BeanGame OBJ is null.');
        }  
       } 
       catch (Exception e) 
       {
          System.debug('updateUsersFULL CONTACT error: ' + e.getMessage());
       }
    }
    
    //this function retrun the profileName on the behalf of UserId.
    @AuraEnabled
    public static string getProfileName(String currentUserId) 
    {        
        String strProfileName='';
        List<User> userlst= [select firstname, ContactId, email, Profile.Name, id FROM User where id =: currentUserId];       
        if(userlst !=null && userlst.size() >0) 
        {
            User currentUser=userlst[0]; 
            strProfileName=currentUser.Profile.Name;
        } 
        return strProfileName; 
    }
    //this function retrun the contact data on the behalf of loggedIn User.
    @AuraEnabled(cacheable=true)
    public static Contact getCurrentContact()
    {
        User u = [SELECT firstname,  ContactId, Profile.Name FROM User where id=:userinfo.getuserid()];
        Contact con= new Contact();
        if(u!=null && u.ContactId!=null)
        {
            con=[SELECT Email,FirstName,LastName,Language__c,Deary_Simple_And_Complex_Reaction_Time__c
                     ,Verbal_Paired_Associates__c
                     ,Object_Recognition_And_Similarity__c
                     ,Flanker__c,Number_of_daily_medications__c,Gender__c,Fake_News_Test__c
                     ,Face_Name_Associates__c,Most_fluent_language__c
                     ,Letter_Number_Sequencing__c,Number_of_fluent_languages_written__c
                     ,Keep_Track__c,Number_of_fluent_languages_spoken__c,
                     Object_Discrimination__c,Object_Temporal__c,Object_Spatial__c ,MailingCity,MailingCountryCode,
                     MailingStreet,MailingStateCode,MailingPostalCode,Sex__c,Second_degree_family_history_of_AD__c,
                     First_degree_family_history_of_AD__c,First_degree_family_history_of_EO_AD__c,
                     Health_Lifestyle_and_Medical__c ,Highest_level_of_education_completed__c,Speech_Task__c FROM Contact where id=:u.ContactId];
        }
        System.debug(con);
        return con;
    }
    
    @AuraEnabled
    public static String createAudioContentVersion(String parentId, List<String> speechTaskrecList) {
        /*System.debug('Inside');
        ContentVersion contentVersion = new ContentVersion();
        contentVersion.VersionData = EncodingUtil.base64Decode(binaryData);
        contentVersion.Title = 'Audio File'; // Set a tSiet the desired file name and extension (e.g., .wav).
        //contentVersion.ContentLocation = 'S';

        insert contentVersion; // Insert the ContentVersion record.

        // Create a ContentDocumentLink to link the ContentVersion to your custom object
        ContentDocumentLink contentLink = new ContentDocumentLink();
        contentLink.LinkedEntityId = parentId; // The ID of your custom object record
        contentLink.ContentDocumentId = contentVersion.ContentDocumentId;

        insert contentLink; // Insert the ContentDocumentLink record.

        return contentVersion.Id; // Return the ID of the created ContentVersion.*/
        
        //List<String> speechTaskrecList= (List<String>)binaryDataMap.values();
        //speechTaskrecList.add((String) binaryDataMap.get('speechTaskRec1'));
       // speechTaskrecList.add((String) binaryDataMap.get('speechTaskRec2'));
   		 System.debug('size: ' + speechTaskrecList.size());
    	 HttpResponse response = new HttpResponse();
         Map<String, Object> responseData = new Map<String, Object>();
         String authUrl = 'https://api.pcloud.com/userinfo?getauth=1&logout=1&{AUTHENTICATION}&username=sibisathyanks@gmail.com&password=Wolkswagon@007';
		 String uploadUrl = 'https://api.pcloud.com/uploadfile';
         String message='success';

        try {            
            response = sendHttpRequest('',authUrl,'GET','','',false,'','');
            if (response.getStatusCode() == 200) {
                responseData = (Map<String, Object>) JSON.deserializeUntyped(response.getBody());
                System.debug('responseData: ' + responseData);
                String authToken = (String) responseData.get('auth');
                System.debug('Authentication Token: ' + authToken);
                Participant_Game_Info__c pgi = [Select Speech_Task_1_Recording__c, Speech_Task_2_Recording__c from 
                    							Participant_Game_Info__c where Id =: parentId];
                for(Integer i=0; i<2 ; i++){                    
                    String fieldname = 'Speech_Task_'+(i+1)+'_Recording__c';
                    String filename = parentId+'_Task'+(i+1);
                     response = sendHttpRequest(speechTaskrecList.get(i), uploadUrl,'POST','audio/wav',authToken,true,filename,parentId);
                            if (response.getStatusCode() == 200) {
                         		//responseData = (Map<String, Object>) JSON.deserializeUntyped(response.getBody());
                        		System.debug('Upload response: ' + response.getBody());
                       		 } else {
                             System.debug('Error uploading file. Status code: ' + response.getStatusCode());
                             message = 'failure';
                        }
                }  
                
                pgi.Speech_Task_1_Recording__c = 'http://u.pc.cd/GlfrtalK';
                pgi.Speech_Task_2_Recording__c = 'http://u.pc.cd/GlfrtalK';
                update pgi;
            }
            else {
                System.debug('Error obtaining authentication token. Status code: ' + response.getStatusCode());
                message = 'failure';
            }
        }
         catch (System.CalloutException e) {
            // Handle the callout exception, e.g., log the error message
            System.debug('Callout Error: ' + e.getMessage());
        }        return message;
    }
    
   public static HttpResponse sendHttpRequest(String payload, String endpoint, String method, String contentType,
                                    String authtoken, Boolean isBlob, String filename, String parentId) { 
        Http http = new Http();
        HttpRequest request = new HttpRequest();
        HttpResponse response = new HttpResponse();        
        request.setMethod(method);
        if(authtoken !='' && authtoken !=null){            
            endpoint = endpoint+'?auth='+authtoken+'&'+'filename='+filename+'&path=/Mindcrowd';
            //endpoint = endpoint+'?auth='+authtoken+'&'+'filename='+filename+'&path=/Mindcrowd/'+parentId;            
            System.debug(endpoint);
            //https://api.pcloud.com/uploadfile?auth=9rOHoZzBEQ7ZlBwhVnFCShkNJqznB1eAsVgLeH77
            //request.setHeader('Authorization', 'Bearer ' + authtoken);
        }
        if(contentType !='' && contentType !=null){System.debug(contentType);request.setHeader('Content-Type', contentType);}        
        if(isBlob){
            System.debug(EncodingUtil.base64Decode(payload));
        	request.setBodyAsBlob(EncodingUtil.base64Decode(payload)); 
        }
        else if(payload !='' && payload !=null){
            System.debug(request);
            request.setBody(payload);
        }else{}
        request.setEndpoint(endpoint);
        response = http.send(request);     
        return response;                             
    }

    @AuraEnabled
    public static void participantGameInfoUpdate1(Participant_Game_Info__c sobj) {
        try {      
            if (sobj != null ) {
                update sobj;
            } else {
                System.debug('PGi object or field is null.');
            }
        } catch (Exception ex) {
            logError('GamesController', 'update_PGI()', ex.getMessage() + ', Data: ' + sobj);
            System.Debug('participantGameInfoUpdate1 AuraHandledException: ' + ex.getMessage());
        }
    }
}