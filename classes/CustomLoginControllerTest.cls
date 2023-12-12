@isTest
public class CustomLoginControllerTest {
@isTest
    public static void LoginTest(){
        
        Id p = [select id from profile where name='Customer Community Login User Custom'].id;
        
        Account testAccount = new Account();
        testAccount.Name='Test Account' ;
        insert testAccount;

        contact con1= new contact();
        con1.FirstName='Test';
        con1.Email='test@abc.com';
        con1.Phone='76955';
        con1.LastName='Test';
        con1.Highest_level_of_education_completed__c='Up to 8 Years';
        con1.AccountId=testAccount.id;
        con1.sex__c='Male';
        insert con1;
        
        User user = new User(alias = 'test123', email='test123@noemail.com',
                    emailencodingkey='UTF-8', lastname='Testing', languagelocalekey='en_US',
                    localesidkey='en_US', profileid = p, country='United States',IsActive =true,
                    ContactId = con1.Id,
                    timezonesidkey='America/Los_Angeles', username='tester@noemail.com');
       // User ur=new user(Username='sun@gmail.com.dev',firstname='sunil',ContactId=con1.id,LastName='singh', Email='sunil@gmail.com', Alias='sunsingh', TimeZoneSidKey='America/Los_Angeles', LocaleSidKey='en_US', EmailEncodingKey='UTF-8', ProfileId='00e01000000QLFDAA4', LanguageLocaleKey='en_US',UserRoleID='00E5e000000LgdKEAS');
        insert user;
        test.startTest();
       // CustomLoginController controller = new CustomLoginController();
        CustomLoginController.changePassword('xyz','xyz','xyzy');
        CustomLoginController.getFeedItem();
        CustomLoginController.getCurrentUser();
        CustomLoginController.getCurrentProfile();
         system.runAs(user) {
             CustomLoginController.getCurrentContact(); 
             RountingController rc = new RountingController();
            String url = rc.RountingPath();
        }    
        test.stopTest();
    }
       @isTest  
    public static void updatecon()
    {       
        contact conup= new contact();
         conup.LastName='Test Last Name';
        conup.Health_Lifestyle_and_Medical__c='Smoker';
        conup.First_degree_family_history_of_AD__c='Yes';
        conup.First_degree_family_history_of_EO_AD__c='Yes';
        conup.Second_degree_family_history_of_AD__c='Yes';    
        insert conup;
        
        Test.startTest();        
        contact conup1=[SELECT Id,Health_Lifestyle_and_Medical__c,First_degree_family_history_of_AD__c
        FROM Contact where Contact.Id =:conup.Id];
       
        CustomLoginController.upsertContact1(conup1);
        
        update conup;
        System.assertEquals('Smoker', conup.Health_Lifestyle_and_Medical__c);
        Test.stopTest(); 
    }
    
    @isTest  
    public static void restrictExpandedGamesTest()
    {       
			System.assert(!CustomLoginController.restrictExpandedGames('670674'), 'Success');
    }
    
}