@isTest
public class USPSLabelAccessTokenTest {
    @isTest
    static void testRequestAccessToken() {
        // Setup mock callout
        Test.setMock(HttpCalloutMock.class, new USPSLabelAccessTokenMock());
        
        // Define test variables
        String grantType = 'client_credentials';
        String clientId = 'test_client_id';
        String clientSecret = 'test_client_secret';
        String endPoint = 'https://api.usps.com/auth/token';
        
        // Call the method
        String accessToken = USPSLabelAccessToken.requestAccessToken(grantType, clientId, clientSecret, endPoint);
        
        // Verify the result
        System.assertEquals('mock_access_token', accessToken);
    }
}