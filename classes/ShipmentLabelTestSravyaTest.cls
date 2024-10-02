@isTest
public class ShipmentLabelTestSravyaTest {

//public class MockUSPSLabelAccessToken {
    public static String requestAccessToken(String grantType, String clientId, String clientSecret, String endPointAccessToken) {
        // Return a mock access token value
        return 'mockAccessTokenValue';
    }
//}
/*    
    @isTest
    static void testIntegrationSettingsInitialization() {
        // Create test Integration_Settings__c record
        Integration_Settings__c settings = new Integration_Settings__c(
            Name = 'Int Settings',
            UserId__c = 'testUser',
            Password__c = 'testPassword',
            Label_Service_Api__c = 'LabelServiceAPI',
            eVSLabelUrl__c = 'https://test.usps.com',
            MindCrowdName__c = 'Test Name',
            MindCrowdFirmName__c = 'Test Firm',
            MindCrowdAddress2__c = '123 Test St',
            MindCrowdCity__c = 'Test City',
            MindCrowdState__c = 'TS',
            //MindCrowdZip5__c = '12345',
            MindCrowdPhone__c = '6023438400',
            Image_Parameters__c = '4X6LABELP',
            grant_type__c = 'client_credentials',
            client_id__c = 'clientId',
            client_secret__c = 'clientSecret',
            AccessToken_url__c = 'https://test.access.token',
            CRID__c = 'testCRID',
            Role_Name_P__c = 'payerRole',
            Role_Name_LO__c = 'labelOwnerRole',
            MID__c = 'testMID',
            Manifest_MID__c = 'testManifestMID',
            Account_Type__c = 'Business',
            Account_Number__c = '123456789',
            Payment_Access_Token_URL__c = 'https://test.payment.token',
            USPS_Label_API_URL__c = 'https://test.usps.label.api',
            Packaging_Type__c = 'Package',
            Processing_Category__c = 'Processing'
        );
        insert settings;

        // Re-initialize the static variable to ensure it's loaded
        Test.startTest();
        ShipmentLabel.integrationsettings = Integration_Settings__c.getAll().get('Int Settings');
        Test.stopTest();
		
        // Validate that the static variables are initialized
        System.assertEquals('testUser', ShipmentLabel.userid);
        System.assertEquals('testPassword', ShipmentLabel.password);
        System.assertEquals('LabelServiceAPI', ShipmentLabel.LabelServiceApi);
        System.assertEquals('https://test.usps.com', ShipmentLabel.UspsUrl);
        
        //Contact Creation
        Contact con= new Contact();
        con.FirstName='Adam';
        con.LastName='Smith';
        con.MailingStreet='PO Box 100';
        con.MailingCity='Washington';
        con.MailingStateCode='DC';
        con.MailingPostalCode='20260';
        insert con;
        System.debug(con);
        
        //Insert Test Research Campaign
        Research_Campaign__c res= new Research_Campaign__c();
        res.Name='Covid';
        res.Weight_in_Ounces__c=3;
        res.isReturnLabelNeeded__c=true;
        res.Usps_Service_Type__c='FIRST CLASS';
        insert res;


    /*
    @isTest
    static void testGetLabelFromUSPS() {
        // Mock the HTTP response
        Test.startTest();
        HttpResponseMock mockResponse = new HttpResponseMock();
        mockResponse.setStatusCode(200);
        mockResponse.setBody('<Response><LabelImage>testImage</LabelImage></Response>');

        HttpMock.register(mockResponse);
        
        String response = ShipmentLabel.getLabelFromUSPS('https://test.usps.com');
        System.assertEquals('<Response><LabelImage>testImage</LabelImage></Response>', response);
        Test.stopTest();
    } */
   		
        /*
        // Create mock Address
        Address testAddress = new Address();
        testAddress.Street = '123 Test St';
        testAddress.City = 'Test City';
        testAddress.StateCode = 'TS';
        testAddress.PostalCode = '12345';  

        // Create mock Research Campaign
        Research_Campaign__c testCampaign = new Research_Campaign__c(
            Weight_in_Ounces__c = 10,
            Usps_Service_Type__c = 'Priority',
            isReturnLabelNeeded__c = false
        );
        insert testCampaign; 
        
		List <Shipping_Detail__c> lstShipping = new List<Shipping_Detail__c>();
        Shipping_Detail__c testshippingbarcode = new Shipping_Detail__c();
        testshippingbarcode.Shipment_Status__c='Consented';
        testshippingbarcode.Campaign__c=res.Id;
        testshippingbarcode.Contact_Id__c=con.Id;
        
        Address ard=new Address();
           // ard.Address__Street__s='';
           // ard.Address__StateCode__s='';
           // ard.Address__CountryCode__s='';
           // ard.Address__City__s='';
           // ard.Address__PostalCode__s='';
           // insert ard;
       // testshippingbarcode.Address__c.add(ard);
		lstShipping.add(testshippingbarcode);
        System.debug(lstShipping);
        insert lstShipping;
        String strid=testshippingbarcode.Id;
        String stridConName= 'james';
		        
        // Prepare test data
        Map<String, Address> idAddressMap = new Map<String, Address> ();
        idAddressMap.put(strid,ard);
        Map<String, Research_Campaign__c> idCampaignMap = new Map<String, Research_Campaign__c>();
        idCampaignMap.put(strid,res);
        Map<String, String> idContactNameMap = new Map<String, String>();
        idContactNameMap.put(strid,stridConName);

        // Call the getLabel method
        Test.setMock(HttpCalloutMock.class, new LabelHttpCallOutMock());
        Test.startTest();
        Boolean result = ShipmentLabel.getLabel(idAddressMap, idCampaignMap, idContactNameMap);
        Test.stopTest();

        System.assert(result);
    } */
}