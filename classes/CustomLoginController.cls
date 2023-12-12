/*
*
@author            : Vicky kumar
@last modified on  : 06-05-2021
@modified by       : Shweta Khunteta
@description       : This is the Footer for the Research Guest/Community Login User.
@test class        : CustomLoginControllerTest
*  
*/

public with sharing class CustomLoginController {
    
    @AuraEnabled(cacheable=true)
    public static User getCurrentUser(){
        User u = [SELECT firstname,  ContactId, Profile.Name FROM User where id=:userinfo.getuserid()];
        
        return u;
    }
    @AuraEnabled
    public static Boolean upsertContact1(Contact con)
    {     
        
        try
        {         
            if(con!=null)
            {
                update con;   
                User currUser =[SELECT Username, Email, ContactId, Id FROM User Where ContactId=:con.id];
                if(currUser!=null){
                    currUser.Email=con.Email;
                    update currUser;
                }
                return true;
            }       
        } 
        catch (Exception e) 
        {
            System.debug('updateUsersFULL CONTACT error: ' + e.getMessage());
        } 
        return false;       
    }
    
    @AuraEnabled(cacheable=true)
    public static string  changePassword(String newPassword,string confirmNewPassword, String oldPassword){
        try{
            Pagereference qr= site.changePassword(newPassword,confirmNewPassword,oldPassword);
            System.debug('Pagereff :'+qr);
            if (qr != null) {
                return 'SUCCESS';
            } else {
                return null;
            }
        }
        catch (Exception ex) {
            System.debug(ex.getMessage());
            return null;
        }  
    }
    
    @AuraEnabled(cacheable=true)
    public static List<FeedItem> getFeedItem(){
        List<FeedItem> feeds=[Select id,body from FeedItem where parentId=:UserInfo.getUserId()];
        return feeds;
    }
    @AuraEnabled(cacheable=true)
    public static boolean getCurrentProfile(){
        Boolean communityUserProfile=false;
        Id profileId=userinfo.getProfileId();
        String profileName=[Select Id,Name from Profile where Id=:profileId].Name;
        system.debug('ProfileName'+profileName);
        if(profileName=='Customer Community Login User'){
            communityUserProfile=true;
        }
        return communityUserProfile;
    }
    
    @AuraEnabled(cacheable=true)
    public static Contact getCurrentContact()
    {
        User u = [SELECT firstname,  ContactId, Profile.Name FROM User where id=:userinfo.getuserid()];
        Contact con= new Contact();
        if(u!=null && u.ContactId!=null)
        {
            con=[SELECT Email,Unsubscribe__c, Phone,FirstName,LastName,Language__c,ParticipantCode__c,Deary_Simple_And_Complex_Reaction_Time__c
                     ,Verbal_Paired_Associates__c
                     ,Object_Recognition_And_Similarity__c
                     ,Flanker__c,Number_of_daily_medications__c,Gender__c
                     ,Face_Name_Associates__c,Most_fluent_language__c
                     ,Letter_Number_Sequencing__c,Number_of_fluent_languages_written__c
                     ,Keep_Track__c,Number_of_fluent_languages_spoken__c
                     ,Object_Discrimination__c,Object_Temporal__c,Object_Spatial__c,Bean_Game__c,Speech_Task__c,Fake_News_Test__c,MailingCity,MailingCountryCode,
                     MailingStreet,MailingStateCode,MailingPostalCode,Sex__c,Second_degree_family_history_of_AD__c,
                     First_degree_family_history_of_AD__c,First_degree_family_history_of_EO_AD__c,Age_at_second_spoken_language__c,
                     Health_Lifestyle_and_Medical__c ,Highest_level_of_education_completed__c, HEALTH_MEDICAL__c, COVID__c, BRAIN_DISEASE__c,
                     SES__c, FHAD__c, WOMENS_HEALTH__c, SUBJECTIVE_ENGLISH__c, SLEEP__c, ADL__c, DIET__c, PERCEIVED_STRESS__c, SWLS__c,
                     QPAR__c, SOCIAL_STRESSOR__c, ANXIETY__c, SOCIAL_SUPPORT__c, CANCER__c, Activation_Date__c FROM Contact where id=:u.ContactId];
        }
        return con;
    }
    //Added by Sibi on 28 Feb 2023 for TSS-31-Enable games in mobile based on Zip Codes
    @AuraEnabled
    public static Boolean restrictExpandedGames(String Zipcode){
        Boolean restrictGames = false;
        List<Zipcodes__mdt> Zipcodes = [SELECT Id FROM Zipcodes__mdt WHERE Zipcode__c = :Zipcode];
        if(Zipcodes !=null && Zipcodes.size()>0)
        {
            restrictGames = true;
        }     
        return restrictGames;
    }
}