public with sharing class TestUtility {

    public static User createUser(String roleId, String profId, String firstName, String lastName){
        User tempUser = prepareUser(roleId, profId, firstName, lastName);
        
        return tempUser;
    }

    private static User prepareUser(String roleId, String profId, String firstName, String lastName) {  

        String orgId = UserInfo.getOrganizationId();  
        String dateString =   
        String.valueof(Datetime.now()).replace(' ','').replace(':','').replace('-','');  
        Integer randomInt = Integer.valueOf(math.rint(math.random()*1000000));  
        String uniqueName = orgId + dateString + randomInt;  
        User tempUser = new User(  
            FirstName = firstName,  
            LastName = lastName,  
            email = uniqueName + '@sfdc' + orgId + '.org',  
            Username = uniqueName + '@sfdc' + orgId + '.org',  
            EmailEncodingKey = 'ISO-8859-1',  
            Alias = uniqueName.substring(18, 23),  
            TimeZoneSidKey = 'America/Los_Angeles',  
            LocaleSidKey = 'en_US',  
            LanguageLocaleKey = 'en_US',  
            ProfileId = profId
        );    
        if( String.isBlank(roleId) == false ){
            tempUser.UserRoleId = roleId;
        }
        return tempUser;  
    }

    public static User createCommunityUser(String contactId, String profId, String firstName, String lastName) {
        User tempUser = prepareUser('', profId, firstName, lastName);
        tempUser.ContactId = contactId;
        insert tempUser; 
        return tempUser;
    }

    public static Account createAccount(String Name){
        Account portalAccount = new Account(name = Name );
        return portalAccount;
    }
    public static Contact createContact(String firstName, String lastName, String email, String accountId,String VerbalPairedAssociates,String KeepTrack,string ObjectDiscrimination,string LetterNumberSequencing,string FaceNameAssociates,string Flanker,string ObjectRecognitionAndSimilarity,string DearySimpleAndComplexReactionTime,string ObjectTemporal,string ObjectSpatial){
        Contact portalContact = new contact(
            FirstName = firstName, 
            LastName = lastName, 
            Email = email,
            Verbal_Paired_Associates__c= VerbalPairedAssociates,
            Keep_Track__c= KeepTrack,
            Object_Discrimination__c= ObjectDiscrimination,
            Letter_Number_Sequencing__c= LetterNumberSequencing, 
            Face_Name_Associates__c= FaceNameAssociates,
            Flanker__c= Flanker,
            Object_Recognition_And_Similarity__c= ObjectRecognitionAndSimilarity,
            Deary_Simple_And_Complex_Reaction_Time__c= DearySimpleAndComplexReactionTime, 
            Object_Temporal__c=ObjectTemporal,
            Object_Spatial__c=ObjectSpatial,
            AccountId = accountId
        );
        return portalContact;
    }
}