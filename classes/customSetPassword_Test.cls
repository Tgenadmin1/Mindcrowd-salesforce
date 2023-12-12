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
        s.ClosePopup=true;
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
        PageReference pg = s.saveTextValue();
    }
    @isTest
    public static void customSetPasswordDataTest4(){ 
        //contact con = [select id from contact limit 1];
         Id profileId = [Select Id From Profile Where Name ='Customer Community Login User'].Id;
        Account acc = createAccount('Test Account');
        insert acc;
        Contact con = createContact('test','Contact','test@gmail.com',acc.Id);
        insert con;
        User u = createCommunityUser(con.Id,profileId,'Amit','Singh');
        customSetPassword s = new customSetPassword();
        s.inputText1 = 'Test2323@gmail.com';
        s.inputText2 = 'Test2323@gmail.com';
        s.username =  u.username;
        s.checkbox1 = true;
        s.checkbox2 = true;
        //s.username ='sunitadua45@gmail.com.mindcrowd.dev';
        
       // system.runAs(user) {
            s.saveTextValue();
        s.ClosePopup();
           // s.changePassword();
       // }
      
    }
    public static Contact createContact(String firstName, String lastName, String email, String accountId){
        Contact portalContact = new contact(
            FirstName = firstName, 
            LastName = lastName, 
            Email = email, 
            AccountId = accountId
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
}