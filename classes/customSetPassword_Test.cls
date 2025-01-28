@isTest
public class customSetPassword_Test {
    @testSetup
    public static void customSetPassword()
    {
        Account objAcc = new Account(Name ='Test Company');
        insert objAcc;
        Contact c = new Contact();
        c.LastName= 'test last name';
        c.Email = 'Test@test.com';
        c.AccountId =objAcc.Id;
        c.Consent_Signed_On__c = system.today();
        Insert c;
        
    }
    @isTest
    public static void customSetPasswordDataTest(){ 
        contact con = [select id from contact limit 1];
        customSetPassword s = new customSetPassword();
        s.inputText1 = 'test';
        s.inputText2 = 'fofoof';
        s.checkbox1 = false;
        s.checkbox2 = false;
        s.sendUserEmail = false;
        s.toPassData ='test';
        s.language ='en_US';
        s.ClosePopup=true;
        s.ExpConsentSigned=false;
        s.ClosePopup2();
        PageReference pg = s.saveTextValue();
        
    }
    @isTest
    public static void customSetPasswordDataTest2(){ 
        contact con = [select id from contact limit 1];
        customSetPassword s = new customSetPassword();
        s.inputText1 = 'test';
        s.inputText2 = 'test';
        s.checkbox1 = false;
        s.checkbox2 = false;
        s.language = 'en_US';
        s.ExpConsentSigned=true;
        PageReference pg = s.saveTextValue();
        
    }
    @isTest
    public static void customSetPasswordDataTest3(){ 
        contact con = [select id from contact limit 1];
        customSetPassword s = new customSetPassword();
        s.MyActionMethod();
        s.inputText1 = 'test';
        s.inputText2 = 'test';
        s.checkbox1 = true;
        s.checkbox2 = false;
        s.ExpConsentSigned=true;
        PageReference pg = s.saveTextValue();
    }
    @isTest
    public static void customSetPasswordDataTest4(){ 
        
         string strMsg='Successfull';
        try{
        //contact con = [select id from contact limit 1];
         Id profileId = [Select Id From Profile Where Name ='Customer Community Login User'].Id;
        Account acc = createAccount('Test Account');
        insert acc;
        Contact con = createContact('test','Contact','test@gmail.com',acc.Id);
        insert con;
        User u = createCommunityUser(con.Id,profileId,'Amit','Singh');
        System.debug('custom user>>>'+u);
        customSetPassword s = new customSetPassword();
        s.inputText1 = 'Test2323@gmail.com';
        s.inputText2 = 'Test2323@gmail.com';
        s.username =  u.username;
        s.checkbox1 = true;
        s.checkbox2 = true;
        s.ExpConsentSigned=false;
        //s.username ='sunitadua45@gmail.com.mindcrowd.dev';
        
       // system.runAs(user) {
        s.saveTextValue();
        s.ClosePopup();
           // s.changePassword();
        }catch(Exception ex){
            strMsg='error';
        }
      
    }

    @isTest
    public static void customSetPasswordDataTest6(){ 
        contact con = [select id from contact limit 1];
        customSetPassword s = new customSetPassword();
        s.MyActionMethod();
        s.inputText1 = 'test';
        s.inputText2 = 'test';
        s.checkbox1 = true;
        s.checkbox2 = false;
        s.ExpConsentSigned=false;
        PageReference pg = s.saveTextValue();
    }
    public static Contact createContact(String firstName, String lastName, String email, String accountId){
        Contact portalContact = new contact(
            FirstName = firstName, 
            LastName = lastName, 
            Email = email, 
            AccountId = accountId,
            Consent_Signed_On__c = System.today()
        );
        return portalContact;
    }
    public static Account createAccount(String Name){
        Account portalAccount = new Account(name = Name );
        return portalAccount;
    }
     public static User createCommunityUser(String contactId, String profId, String firstName, String lastName) {
        User tempUser = prepareUser('', profId, firstName, lastName);
        tempUser.ContactId = contactId;
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
    @isTest
    public static void customSetPasswordDataTest5(){ 
        contact con = [select id from contact limit 1];
        customSetPassword s = new customSetPassword();
        s.MyActionMethod();
        s.inputText1 = '';
        s.inputText2 = '';
        s.checkbox1 = true;
        s.checkbox2 = false;
        s.ExpConsentSigned=false;
        PageReference pg = s.saveTextValue();
    }

   
}