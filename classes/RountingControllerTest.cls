@isTest
public class RountingControllerTest {
    @isTest static void test() {
        Profile prof = [select id from profile where name LIKE '%Customer Community Login User Custom%'];
        Contact con = new Contact();
        con.FirstName = 'test1';
        con.LastName = 'test2';
        insert con;
        String orgId = UserInfo.getOrganizationId();  
        String dateString =   
        String.valueof(Datetime.now()).replace(' ','').replace(':','').replace('-','');  
        Integer randomInt = Integer.valueOf(math.rint(math.random()*1000000));  
        String uniqueName = orgId + dateString + randomInt; 
        
        User tempUser = new User(  
            FirstName = 'test',  
            LastName = 'user',  
            email = uniqueName + '@sfdc' + orgId + '.org',  
            Username = uniqueName + '@sfdc' + orgId + '.org',  
            EmailEncodingKey = 'ISO-8859-1',  
            Alias = uniqueName.substring(18, 23),  
            TimeZoneSidKey = 'America/Los_Angeles',  
            LocaleSidKey = 'en_US',  
            LanguageLocaleKey = 'en_US',  
            ProfileId = prof.id,
            ContactId = con.id
            //UserRoleId = 'Manager'
        );   
        
        insert tempUser;
        
        test.startTest();
        system.runAs(tempUser){
            RountingController rc = new RountingController();
            String url = rc.RountingPath();
            test.stopTest();
        }
    }
}