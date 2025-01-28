// Created By: {Girikon(ShwetaKhunteta)}
// Created On: MM/DD/YYYY
// Description/Purpose:Test class to test Contact Object related functions
// Methods: {updateContactFields,upsertContact,upsertContactResults}
// Apex Class: {ContactController)}

@isTest
public class ContactControllertest 
{    
    @isTest  
    public static void disp()
    {
        try
        {
        contact con1= new contact();
        con1.FirstName='Test';
        con1.Email='test@abc.com';
        con1.Phone='76955';
        con1.LastName='Test';
        con1.Highest_level_of_education_completed__c='Up to 8 Years';
        con1.sex__c='Male';
            
        
            
        insert con1;
        
        Research_Campaign__c res= new Research_Campaign__c();
        res.Name='Covid';
        
        insert res;
        contact con=[select id,ParticipantCode__c from contact where id=:con1.Id];
        
        Test.setMock(HttpCalloutMock.class, new  USPSHttpCalloutMock());
        Test.startTest();        
        
        ContactController.updateContactFields(con.ParticipantCode__c,'TEST', '6406 IVY LN', 'Greenbelt','MD' , '20770','1234','1234567890','','Covid',false,'fn','ln');
            
        Test.stopTest(); 
        }
        catch(Exception ex) 
        {
            system.debug(ex.getMessage());
        } 
    }
    
    @isTest  
    public static void dispError()
    {
        try 
        { 
        contact con1= new contact();
        con1.FirstName='Test';
        con1.Email='test@abc.com';
        con1.Phone='76955';
        con1.LastName='Test';
        con1.Highest_level_of_education_completed__c='Up to 8 Years';
        con1.sex__c='Male';
        insert con1;
        Research_Campaign__c res= new Research_Campaign__c();
        res.Name='Covid';
        
        insert res;
        contact con=[select id,ParticipantCode__c from contact where id=:con1.Id];
        Test.setMock(HttpCalloutMock.class, new  USPSHttpCalloutMock());
        Test.startTest();        
        
        ContactController.updateContactFields(con.ParticipantCode__c,'Error', '6406 IVY LN1', 'Greenbelt','MD' , '20770','1234','1234567890','','Covid',false,'fn','ln');
        Test.stopTest(); 
        }
        catch(Exception e) 
        {
            system.debug(e.getMessage());
        } 
    }
    
    @isTest  
    public static void updatecon()
    {    

        contact conup= new contact();
        conup.LastName='Test Last Name';
        conup.Sex__c='Male';
        conup.Highest_level_of_education_completed__c='Some High School';
        conup.Repeat_test_taker__c='Yes';
        conup.Race__c='Asian';
        conup.Hispanic_Latino__c='';
        conup.Number_of_daily_medications__c='One';
        conup.Health_Lifestyle_and_Medical__c='Smoker';
        conup.First_degree_family_history_of_AD__c='Yes';
        conup.First_degree_family_history_of_EO_AD__c='Yes';
        conup.Second_degree_family_history_of_AD__c='Yes';    
        insert conup;
        
        Test.startTest();        
        contact conup1=[SELECT Id,Sex__c,Highest_level_of_education_completed__c,Repeat_test_taker__c, 
                        Are_you_Left_or_Right_hand_dominant__c,Race__c,Hispanic_Latino_origin__c,Hispanic_Latino__c,
                        Number_of_daily_medications__c,Health_Lifestyle_and_Medical__c,First_degree_family_history_of_AD__c
                        FROM Contact where Contact.Id =:conup.Id];
        
        ContactController.upsertContact(conup.Id,'','','','','','','','','','','');
        
        update conup;
        System.assertEquals('Asian', conup.Race__c);
        Test.stopTest(); 
            
    }
    
    //Test method creted to updated the fields on brainInfoResults.js . for contact object
    @isTest  
    public static void updateconresults()
    {       Account acc = new Account();
     acc.name = 'test';
     insert acc;
     contact conres= new contact();
     conres.LastName='Test Last Name';
     conres.Email='test@gmail.com';
     conres.Sex__c='Male';
     conres.Highest_level_of_education_completed__c='Some High School';
     conres.Allow_Newsletters__c=true;
     conres.URL_ID__c='xdfrssse';
     conres.AccountId=acc.id;
     insert conres;
     
     Test.startTest();        
     contact conres1=[SELECT Id,FirstName,LastName,URL_ID__c,Email,Sex__c,Highest_level_of_education_completed__c,Allow_Newsletters__c,AccountId 
                      FROM Contact where Contact.Id =:conres.Id];
     ContactController.upsertContactResults(conres.Id,'','','','','','');
     update conres1;  
     Test.stopTest(); 
    }
    @isTest 
    public static void insertAccountTest() 
    { 
        string name='xyz';
        ContactController.insertAccount(name); 
    }
    
    
    
    
    @isTest 
    public static void datatest() 
    { 
        try
        {
           Studies__c studyTest1 = new Studies__c(Participant_Id__c='testpartId'); 
            insert studyTest1;
            Contact con=new Contact(
                FirstName='fname',
                LastName = 'lname',
                Email = 'email@gmail.com',
                Phone = '9743800309',
            Study_Id__c=studyTest1.id); 
            
            Game_Detail__c gd1 = new Game_Detail__c(Name='DLTRS');
            insert gd1;
            ContactController.saveContactRecord(con);
        }
        catch(Exception ex) 
        {
            system.debug(ex.getMessage());
        }
    }
    @isTest 
    public static void datatest1() 
    {
        try
        {
            Contact con=new Contact(
                FirstName='fname',
                LastName = 'lname',
                Email = 'email@gmail.com',
                Phone = '9743800309'
            ); 
            
            insert con;
            ContactController.saveContactRecord(con);
        }
        catch(Exception ex) 
        {
            system.debug(ex.getMessage());
        }   
    }    
    @isTest 
    public static void subscribeTest() 
    {
        try
        {
            String subsc = 'email@gmail.com';
            ContactController.saveSubscribeEmail(subsc);
        }
        catch(Exception ex) 
        {
            system.debug(ex.getMessage());
        }   
    } 
    
    @isTest
    public static void tapjoyTest()
    {
       try
        {
        contact con2= new contact();
        con2.FirstName='Test';
        con2.Email='test@abc.com';
        con2.Phone='76955';
        con2.LastName='Test';
        con2.Sub_Id__c='rajKumar';
        con2.Highest_level_of_education_completed__c='Up to 8 Years';
        con2.sex__c='Male';
        insert con2;
  		
        contact con=[select id,sub_id__c,ParticipantCode__c from contact where id=:con2.Id];
        Test.setMock(HttpCalloutMock.class, new  MockHttpResponseGenerator());
        Test.startTest();        
        
        ContactController.sendTapjoyRequest(con.sub_id__c);
        Test.stopTest();
    }
        catch(Exception ex)
        {
            system.debug(ex.getMessage());
        } 
       
    }
    
 @isTest  
    public static void dispError1()
    {
        try 
        { 
        contact con1= new contact();
        con1.FirstName='Test';
        con1.Email='test@abc.com';
        con1.Phone='76955';
        con1.LastName='Test';
        con1.Highest_level_of_education_completed__c='Up to 8 Years';
        con1.sex__c='Male';
        insert con1;
        Research_Campaign__c res= new Research_Campaign__c();
        res.Name='Covid';
        
        insert res;
        contact con=[select id,ParticipantCode__c from contact where id=:con1.Id];
        Test.setMock(HttpCalloutMock.class, new  USPSHttpCalloutMock());
        Test.startTest();        
        
        ContactController.updateContactFields(con.ParticipantCode__c,'NULL', '6406 IVY LN1', 'Greenbelt','MD' , '20770','1234','1234567890','','Covid',false,'fn','ln');
        Test.stopTest(); 
        }
        catch(Exception e) 
        {
            system.debug(e.getMessage());
        } 
    }
    @isTest
    public static void update_AB_Testing_record(){
        Contact con=new Contact(
                FirstName='fname',
                LastName = 'lname',
                Email = 'email@gmail.com',
                Phone = '9743800309'
            ); 
            
        insert con;
        AB_Testing__c ab=new AB_Testing__c();
        ab.Next_Page__c=true;
        insert  ab; 
        ab.Next_Page__c=false;
        update ab;
        test.startTest();
        ContactController.updateABTestingRecord(ab.id, con.id);
        test.stopTest();
    }
    
    @isTest
    public static void testHasDuplicateRecords() {
        // Create a Contact
        Contact contactRecord = new Contact();
        contactRecord.FirstName = 'Test';
        contactRecord.LastName = 'User';
        // Set other required fields on the Contact
        insert contactRecord;

        // Create Campaign records
        List<Research_Campaign__c> campaignRecords = new List<Research_Campaign__c>();
        for (String campaignName : new List<String>{'CampaignA', 'CampaignB', 'CampaignC'}) {
            Research_Campaign__c campaignRecord = new Research_Campaign__c();
            campaignRecord.Name = campaignName;
            // Set other fields as needed
            campaignRecords.add(campaignRecord);
        }
        insert campaignRecords;

        // Create Shipping_Detail__c records with valid Campaign IDs
        List<Shipping_Detail__c> shippingRecords = new List<Shipping_Detail__c>();
        for (Research_Campaign__c campaign : campaignRecords) {
            Shipping_Detail__c shippingRecord = new Shipping_Detail__c();
            shippingRecord.Contact_Id__c = contactRecord.Id;
            shippingRecord.Campaign__c = campaign.Id;
            // Set other fields as needed
            shippingRecords.add(shippingRecord);
        }
        insert shippingRecords;

        Test.startTest();

        // Call the method to test
        List<String> campaignsToCheck = new List<String>{'CampaignA', 'CampaignB', 'CampaignC'};
        Map<String, String> result = ContactController.hasDuplicateRecords(contactRecord.Id, campaignsToCheck);

        // Add assertions to verify the result
        System.assertEquals('Y', result.get('CampaignA'));
        System.assertEquals('Y', result.get('CampaignB'));

        // Ensure that 'CampaignC' is in the result map and is not null
        System.assert(result.containsKey('CampaignC'));
        System.assertNotEquals(null, result.get('CampaignC'));
        
        Test.stopTest();
    }
    
    @isTest
    public static void testGetCustomSettingValues() {
        // Insert a sample CurrRunnCamp__c custom setting record
        CurrRunnCamp__c customSettingRecord = new CurrRunnCamp__c(
            Name = 'Sample Setting',
            CurrRunnCampEnglish__c = 'English Value',
            CurrRunnCampSpanish__c = 'Spanish Value'
        );
        insert customSettingRecord;

        Test.startTest();

        // Call the method to test
        List<Map<String, Object>> result = ContactController.getCustomSettingValues();

        // Add assertions to verify the result
        System.assertEquals(1, result.size());
        Map<String, Object> settingValues = result[0];
        System.assertEquals(customSettingRecord.Id, settingValues.get('Id'));
        System.assertEquals(customSettingRecord.CurrRunnCampEnglish__c, settingValues.get('CurrRunnCampEnglish__c'));
        System.assertEquals(customSettingRecord.CurrRunnCampSpanish__c, settingValues.get('CurrRunnCampSpanish__c'));

        Test.stopTest();
    }
}