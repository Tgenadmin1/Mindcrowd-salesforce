/*
     * Name :=Vicky Kumar
     * 
     */
    public without sharing class mindCrowdCustomNotificationController {
   
        public static void notifyUserStartGames(Set<String> recipientsIds)
        {
            if(recipientsIds!=null && recipientsIds.size()>0)
            {
                String url='';
                String title=System.Label.notification_Games_Title;
                String body='';
                String addressTest = 
                    '' +
                    '    {' +
                    '        type: \'standard__webPage\', ' +
                    '        attributes: {' +
                    '          "url":"'+url+'"' +
                    '        }'+
                    '   }'+
                    ''; 
                
                // Get the Id for our custom notification type
                CustomNotificationType notificationType =  [SELECT Id, DeveloperName FROM CustomNotificationType WHERE DeveloperName='Custom_Notification'];
                // Create a new custom notification
                Messaging.CustomNotification notification = new Messaging.CustomNotification();        
                // Set the notification type and target
                notification.setTitle(title);
                if(notificationType!=null){
                    notification.setNotificationTypeId(notificationType.Id);
                }
                notification.setTargetPageRef(addressTest);
                List<User> ur1 = [SELECT Id, Username, Name, ContactId FROM User Where Id IN: recipientsIds];
                Contact conUser=new Contact();
                if(!ur1.isEmpty()){
                    conUser=[SELECT Id,Object_Temporal__c,Verbal_Paired_Associates__c,Deary_Simple_And_Complex_Reaction_Time__c,
                             Object_Spatial__c,Object_Discrimination__c, Keep_Track__c, Face_Name_Associates__c, 
                             Object_Recognition_And_Similarity__c, Flanker__c, 
                             Letter_Number_Sequencing__c FROM Contact Where Id=:ur1[0].ContactId];         
                }   
                System.debug('I am in conUser'+conUser);
                If(conUser.Flanker__c=='Opened'){
                    body=System.Label.notification_Body_Focus;
                    url=System.Label.url_me_flankergame;
                    addressTest = 
                    '' +
                    '    {' +
                    '        type: \'standard__webPage\', ' +
                    '        attributes: {' +
                    '          "url":"'+'/'+url+'"' +
                    '        }'+
                    '   }'+
                    ''; 
                    notification.setBody(body);
                    notification.setTargetPageRef(addressTest);
                    try {
                        notification.send(recipientsIds);              
                    }
                    catch (Exception e) {
                        System.debug('Problem sending notification: ' + e.getMessage()+ ' at line number '+e.getLineNumber());
                    }
                }
                If(conUser.Keep_Track__c=='Opened'){
                    body=System.Label.notification_Body_KeepTrack;
                    url=System.Label.url_me_keeptrackgame;
                    addressTest = 
                    '' +
                    '    {' +
                    '        type: \'standard__webPage\', ' +
                    '        attributes: {' +
                    '          "url":"'+'/'+url+'"' +
                    '        }'+
                    '   }'+
                    ''; 
                    notification.setBody(body);
                    notification.setTargetPageRef(addressTest);
                    try {
                        notification.send(recipientsIds);
                    }
                    catch (Exception e) {
                        System.debug('Problem sending notification: ' + e.getMessage()+ ' at line number '+e.getLineNumber());
                    }
                }
                If(conUser.Face_Name_Associates__c=='Opened'){
                    body=System.Label.notification_Body_FacesNames;
                    url=System.Label.url_me_namesandfacesgame;
                    addressTest = 
                    '' +
                    '    {' +
                    '        type: \'standard__webPage\', ' +
                    '        attributes: {' +
                    '          "url":"'+'/'+url+'"' +
                    '        }'+
                    '   }'+
                    ''; 
                    notification.setBody(body);
                    notification.setTargetPageRef(addressTest);
                    try {
                        notification.send(recipientsIds);              
                    }
                    catch (Exception e) {
                        System.debug('Problem sending notification: ' + e.getMessage()+ ' at line number '+e.getLineNumber());
                    }
                }
                If(conUser.Verbal_Paired_Associates__c=='Opened'){
                    body=System.Label.notification_Body_Word_Pairs;
                    url=System.Label.url_me_wordpairsgame;
                    addressTest = 
                    '' +
                    '    {' +
                    '        type: \'standard__webPage\', ' +
                    '        attributes: {' +
                    '          "url":"'+'/'+url+'"' +
                    '        }'+
                    '   }'+
                    ''; 
                    notification.setBody(body);
                    notification.setTargetPageRef(addressTest);      
                    try {
                        notification.send(recipientsIds);              
                    }
                    catch (Exception e) {
                        System.debug('Problem sending notification: ' + e.getMessage()+ ' at line number '+e.getLineNumber());
                    }
                }       
                If(conUser.Deary_Simple_And_Complex_Reaction_Time__c=='Opened'){
                    body=System.Label.notification_Body_React;
                    url=System.Label.url_me_reactgame;
                    addressTest = 
                    '' +
                    '    {' +
                    '        type: \'standard__webPage\', ' +
                    '        attributes: {' +
                    '          "url":"'+'/'+url+'"' +
                    '        }'+
                    '   }'+
                    ''; 
                    notification.setBody(body);
                    notification.setTargetPageRef(addressTest);
                    try {
                        notification.send(recipientsIds);
                    }
                    catch (Exception e) {
                        System.debug('Problem sending notification: ' + e.getMessage()+ ' at line number '+e.getLineNumber());
                    }
                }      
                If(conUser.Letter_Number_Sequencing__c=='Opened'){
                    body=System.Label.notification_Body_Switching;
                    url=System.Label.url_me_switchinggame;
                    addressTest = 
                    '' +
                    '    {' +
                    '        type: \'standard__webPage\', ' +
                    '        attributes: {' +
                    '          "url":"'+'/'+url+'"' +
                    '        }'+
                    '   }'+
                    ''; 
                    notification.setBody(body);
                    notification.setTargetPageRef(addressTest);
                    try {
                        notification.send(recipientsIds);
                    }
                    catch (Exception e) {
                        System.debug('Problem sending notification: ' + e.getMessage()+ ' at line number '+e.getLineNumber());
                    }
                }   
                If(conUser.Object_Recognition_And_Similarity__c=='Opened'){
                    body=System.Label.notification_Body_Shapes;
                    url=System.Label.url_me_shapesgame;
                    addressTest = 
                    '' +
                    '    {' +
                    '        type: \'standard__webPage\', ' +
                    '        attributes: {' +
                    '          "url":"'+'/'+url+'"' +
                    '        }'+
                    '   }'+
                    ''; 
                    notification.setBody(body);
                    notification.setTargetPageRef(addressTest);
                    try {
                        notification.send(recipientsIds);
                    }
                    catch (Exception e) {
                        System.debug('Problem sending notification: ' + e.getMessage()+ ' at line number '+e.getLineNumber());
                    }
                }
                If(conUser.Object_Discrimination__c=='Opened'){
                    body=System.Label.notification_Body_Objects;
                    url=System.Label.url_me_objects;
                    addressTest = 
                    '' +
                    '    {' +
                    '        type: \'standard__webPage\', ' +
                    '        attributes: {' +
                    '          "url":"'+'/'+url+'"' +
                    '        }'+
                    '   }'+
                    ''; 
                    notification.setBody(body);
                    notification.setTargetPageRef(addressTest);
                    try {
                        notification.send(recipientsIds);              
                    }
                    catch (Exception e) {
                        System.debug('Problem sending notification: ' + e.getMessage()+ ' at line number '+e.getLineNumber());
                    }
                }
                If(conUser.Object_Temporal__c=='Opened'){
                    body=System.Label.notification_Body_ObjectsTime;
                    url=System.Label.url_me_Objects_Time;
                    addressTest = 
                    '' +
                    '    {' +
                    '        type: \'standard__webPage\', ' +
                    '        attributes: {' +
                    '          "url":"'+'/'+url+'"' +
                    '        }'+
                    '   }'+
                    ''; 
                    notification.setBody(body);
                    notification.setTargetPageRef(addressTest);
                    try {
                        notification.send(recipientsIds);              
                    }
                    catch (Exception e) {
                        System.debug('Problem sending notification: ' + e.getMessage()+ ' at line number '+e.getLineNumber());
                    }
                }
                If(conUser.Object_Spatial__c=='Opened'){
                    body=System.Label.notification_Body_ObjectsSpace;
                    url=System.Label.url_Objects_Space;
                    addressTest = 
                    '' +
                    '    {' +
                    '        type: \'standard__webPage\', ' +
                    '        attributes: {' +
                    '          "url":"'+'/'+url+'"' +
                    '        }'+
                    '   }'+
                    ''; 
                    notification.setBody(body);
                    notification.setTargetPageRef(addressTest);
                    notification.setBody(body); 
                    try {
                        notification.send(recipientsIds);              
                    }
                    catch (Exception e) {
                        System.debug('Problem sending notification: ' + e.getMessage()+ ' at line number '+e.getLineNumber());
                    }
                }
            }      
        }  
        public static void notifyUserOtherGames(Id contactid, String gameName)
        {
            if(contactid!=null && gameName!=null)
            {
                Set<String>  recipientsIds=new Set<String>();
                List<User> currUser =[SELECT Username, ContactId, Id FROM User Where ContactId=:contactid];
                System.debug('currUser=================== : '+currUser);
                if(currUser!=null && currUser.size()>0){
                    for(User ur:currUser){
                        recipientsIds.Add(ur.Id);  
                        System.debug('recipientsIds=================== : '+recipientsIds);    
                    }
                }
               
                String url='';
                String title=System.Label.notification_Games_Title;
                String body='';
                String addressTest = 
                    '' +
                    '    {' +
                    '        type: \'standard__webPage\', ' +
                    '        attributes: {' +
                    '          "url":"'+'/'+url+'"' +
                    '        }'+
                    '   }'+
                    ''; 
                
                // Get the Id for our custom notification type
                CustomNotificationType notificationType =  [SELECT Id, DeveloperName FROM CustomNotificationType WHERE DeveloperName='Custom_Notification'];
                
                // Create a new custom notification
                Messaging.CustomNotification notification = new Messaging.CustomNotification();        
                // Set the notification type and target
                notification.setTitle(title);
                if(notificationType!=null){
                    notification.setNotificationTypeId(notificationType.Id);
                }
                notification.setTargetPageRef(addressTest);
                Contact conUser=[SELECT Object_Temporal__c,Verbal_Paired_Associates__c,Deary_Simple_And_Complex_Reaction_Time__c,Object_Spatial__c,Object_Discrimination__c, Keep_Track__c, Face_Name_Associates__c, Object_Recognition_And_Similarity__c, Flanker__c, Letter_Number_Sequencing__c, Id, Name FROM Contact Where Id=:contactid];
                
                System.debug('I am in gameName'+gameName);
                If(conUser.Keep_Track__c=='Opened' && gameName==System.Label.scientific_game_keepTrack){
                    body=System.Label.notification_Body_KeepTrack;
                    url=System.Label.url_me_keeptrackgame;
                    addressTest = 
                    '' +
                    '    {' +
                    '        type: \'standard__webPage\', ' +
                    '        attributes: {' +
                    '          "url":"'+'/'+url+'"' +
                    '        }'+
                    '   }'+
                    ''; 
                    notification.setBody(body);
                    notification.setTargetPageRef(addressTest);
                    try {
                        notification.send(recipientsIds);
                    }
                    catch (Exception e) {
                        System.debug('Problem sending notification: ' + e.getMessage()+ ' at line number '+e.getLineNumber());
                    }
                }
                If(conUser.Face_Name_Associates__c=='Opened' && gameName==System.Label.scientific_game_faceNameAssociates){
                    body=System.Label.notification_Body_FacesNames;
                    url=System.Label.url_me_namesandfacesgame;
                    addressTest = 
                    '' +
                    '    {' +
                    '        type: \'standard__webPage\', ' +
                    '        attributes: {' +
                    '          "url":"'+'/'+url+'"' +
                    '        }'+
                    '   }'+
                    ''; 
                    notification.setBody(body);
                    notification.setTargetPageRef(addressTest);
                    try {
                        notification.send(recipientsIds);              
                    }
                    catch (Exception e) {
                        System.debug('Problem sending notification: ' + e.getMessage()+ ' at line number '+e.getLineNumber());
                    }
                }
                If(conUser.Verbal_Paired_Associates__c=='Opened' && gameName==System.Label.scientific_game_verbalPairedAssociates){
                    body=System.Label.notification_Body_Word_Pairs;
                    url=System.Label.url_me_wordpairsgame;
                    addressTest = 
                    '' +
                    '    {' +
                    '        type: \'standard__webPage\', ' +
                    '        attributes: {' +
                    '          "url":"'+'/'+url+'"' +
                    '        }'+
                    '   }'+
                    ''; 
                    notification.setBody(body);
                    notification.setTargetPageRef(addressTest);      
                    try {
                        notification.send(recipientsIds);              
                    }
                    catch (Exception e) {
                        System.debug('Problem sending notification: ' + e.getMessage()+ ' at line number '+e.getLineNumber());
                    }
                }       
                If(conUser.Deary_Simple_And_Complex_Reaction_Time__c=='Opened' && gameName==System.Label.scientific_game_dearySimpleAndComplexReactionTime){
                    body=System.Label.notification_Body_React;
                    url=System.Label.url_me_reactgame;
                    addressTest = 
                    '' +
                    '    {' +
                    '        type: \'standard__webPage\', ' +
                    '        attributes: {' +
                    '          "url":"'+'/'+url+'"' +
                    '        }'+
                    '   }'+
                    ''; 
                    notification.setBody(body);
                    notification.setTargetPageRef(addressTest);
                    try {
                        notification.send(recipientsIds);
                    }
                    catch (Exception e) {
                        System.debug('Problem sending notification: ' + e.getMessage()+ ' at line number '+e.getLineNumber());
                    }
                }      
                If(conUser.Letter_Number_Sequencing__c=='Opened' && gameName==System.Label.scientific_game_letterNumberSequencing){
                    body=System.Label.notification_Body_Switching;
                    url=System.Label.url_me_switchinggame;
                    addressTest = 
                    '' +
                    '    {' +
                    '        type: \'standard__webPage\', ' +
                    '        attributes: {' +
                    '          "url":"'+'/'+url+'"' +
                    '        }'+
                    '   }'+
                    ''; 
                    notification.setBody(body);
                    notification.setTargetPageRef(addressTest);
                    try {
                        notification.send(recipientsIds);
                    }
                    catch (Exception e) {
                        System.debug('Problem sending notification: ' + e.getMessage()+ ' at line number '+e.getLineNumber());
                    }
                }   
                If(conUser.Object_Recognition_And_Similarity__c=='Opened' && gameName==System.Label.scientific_game_objectRecognitionAndSimilarity){
                    body=System.Label.notification_Body_Shapes;
                    url=System.Label.url_me_shapesgame;
                    addressTest = 
                    '' +
                    '    {' +
                    '        type: \'standard__webPage\', ' +
                    '        attributes: {' +
                    '          "url":"'+'/'+url+'"' +
                    '        }'+
                    '   }'+
                    ''; 
                    notification.setBody(body);
                    notification.setTargetPageRef(addressTest);
                    try {
                        notification.send(recipientsIds);
                    }
                    catch (Exception e) {
                        System.debug('Problem sending notification: ' + e.getMessage()+ ' at line number '+e.getLineNumber());
                    }
                }
                If(conUser.Flanker__c=='Opened' && gameName==System.Label.scientific_game_flanker){
                    body=System.Label.notification_Body_Focus;
                    url=System.Label.url_me_flankergame;
                    addressTest = 
                    '' +
                    '    {' +
                    '        type: \'standard__webPage\', ' +
                    '        attributes: {' +
                    '          "url":"'+'/'+url+'"' +
                    '        }'+
                    '   }'+
                    ''; 
                    notification.setBody(body);
                    notification.setTargetPageRef(addressTest);
                    try {
                        notification.send(recipientsIds);              
                    }
                    catch (Exception e) {
                        System.debug('Problem sending notification: ' + e.getMessage()+ ' at line number '+e.getLineNumber());
                    }
                }
                If(conUser.Object_Discrimination__c=='Opened' && gameName==System.Label.scientific_game_objectDiscrimination){
                    body=System.Label.notification_Body_Objects;
                    url=System.Label.url_me_objects;
                    addressTest = 
                    '' +
                    '    {' +
                    '        type: \'standard__webPage\', ' +
                    '        attributes: {' +
                    '          "url":"'+'/'+url+'"' +
                    '        }'+
                    '   }'+
                    ''; 
                    notification.setBody(body);
                    notification.setTargetPageRef(addressTest);
                    try {
                        notification.send(recipientsIds);              
                    }
                    catch (Exception e) {
                        System.debug('Problem sending notification: ' + e.getMessage()+ ' at line number '+e.getLineNumber());
                    }
                }
                If(conUser.Object_Temporal__c=='Opened' && gameName==System.Label.scientific_game_objectTemporal){
                    body=System.Label.notification_Body_ObjectsTime;
                    url=System.Label.url_me_Objects_Time;
                    addressTest = 
                    '' +
                    '    {' +
                    '        type: \'standard__webPage\', ' +
                    '        attributes: {' +
                    '          "url":"'+'/'+url+'"' +
                    '        }'+
                    '   }'+
                    ''; 
                    notification.setBody(body);
                    notification.setTargetPageRef(addressTest);
                    try {
                        notification.send(recipientsIds);              
                    }
                    catch (Exception e) {
                        System.debug('Problem sending notification: ' + e.getMessage()+ ' at line number '+e.getLineNumber());
                    }
                }
                If(conUser.Object_Spatial__c=='Opened' && gameName==System.Label.scientific_game_objectSpatial){
                    body=System.Label.notification_Body_ObjectsSpace;
                    url=System.Label.url_Objects_Space;
                    addressTest = 
                    '' +
                    '    {' +
                    '        type: \'standard__webPage\', ' +
                    '        attributes: {' +
                    '          "url":"'+'/'+url+'"' +
                    '        }'+
                    '   }'+
                    ''; 
                    notification.setBody(body);
                    notification.setTargetPageRef(addressTest);
                    notification.setBody(body); 
                    try {
                        notification.send(recipientsIds);              
                    }
                    catch (Exception e) {
                        System.debug('Problem sending notification: ' + e.getMessage()+ ' at line number '+e.getLineNumber());
                    }
                }
            }    
        }
       	public static void notifyUserfrombatch(Set<String> recipientsIds)
        {
            if(recipientsIds!=null && recipientsIds.size()>0){
                String url='/reactgame';
                String title=System.Label.notification_Games_Title;
                String body='';
                String addressTest = 
                    '' +
                    '    {' +
                    '        type: \'standard__webPage\', ' +
                    '        attributes: {' +
                    '          "url":"'+url+'"' +
                    '        }'+
                    '   }'+
                    ''; 
                
                // Get the Id for our custom notification type
                CustomNotificationType notificationType = [SELECT Id, DeveloperName FROM CustomNotificationType WHERE DeveloperName='Custom_Notification'];      
                // Create a new custom notification
                Messaging.CustomNotification notification = new Messaging.CustomNotification();        
                // Set the notification type and target
                notification.setTitle(title);
                if(notificationType!=null){
                    notification.setNotificationTypeId(notificationType.Id);
                }
                notification.setTargetPageRef(addressTest);
                List<User> ur=[SELECT Id, Username, Name, ContactId FROM User Where Id =: recipientsIds];
                Set<String> idSet1 = new Set<String>();
                if(ur!=null && ur.size()>0){
                    for(user usr:ur){
                        idSet1.add(usr.id);
                        idSet1.add(usr.ContactId);
                        idset1.add(usr.Username);
                    }
                } 
                list<Contact> conUser=[SELECT Verbal_Paired_Associates__c, Deary_Simple_And_Complex_Reaction_Time__c, Id FROM Contact Where Id in:idSet1];       
                System.debug('I am in conUser'+conUser);
                if(conUser!=null && conUser.size()>0){
                    for(Contact con1:conUser ){
                        If(con1.Verbal_Paired_Associates__c=='Opened'||con1.Deary_Simple_And_Complex_Reaction_Time__c=='Opened'){
                            body=System.Label.notification_Body_Word_Pairs;
                            notification.setBody(body); 
                            try {
                                notification.send(recipientsIds);              
                            }
                            catch (Exception e) {
                                System.debug('Problem sending notification: ' + e.getMessage()+ ' at line number '+e.getLineNumber());
                            }
                        }
                    }
                }  
            }      
        }    
    }