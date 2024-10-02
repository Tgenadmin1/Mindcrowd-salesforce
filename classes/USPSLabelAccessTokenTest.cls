@IsTest
public class USPSLabelAccessTokenTest {

    @IsTest
    static void testRequestAccessTokenSuccess() {
        // Setup test endpoint
        String testEndPoint = 'https://test.salesforce.com/services/oauth2/token';

        // Mock response
        String jsonResponse = '{"access_token": "mockAccessToken"}';

        // Create a mock HTTP response
        HttpResponse mockResponse = new HttpResponse();
        mockResponse.setHeader('Content-Type', 'application/json');
        mockResponse.setBody(jsonResponse);
        mockResponse.setStatusCode(200);

        // Mock HTTP callout
        Test.startTest();
        HttpMockImpl mock = new HttpMockImpl(mockResponse);
        Test.setMock(HttpCalloutMock.class, mock);

        String accessToken = USPSLabelAccessToken.requestAccessToken('client_credentials', 'mockClientId', 'mockClientSecret', testEndPoint);
        Test.stopTest();

        // Verify the results
        System.assertEquals('mockAccessToken', accessToken, 'The access token should match the mock value.');
    }

    @IsTest
    static void testRequestAccessTokenError() {
        // Setup test endpoint
        String testEndPoint = 'https://test.salesforce.com/services/oauth2/token';

        // Mock error response
        String jsonResponse = '{"error": "invalid_client"}';

        // Create a mock HTTP response with an error status code
        HttpResponse mockResponse = new HttpResponse();
        mockResponse.setHeader('Content-Type', 'application/json');
        mockResponse.setBody(jsonResponse);
        mockResponse.setStatusCode(401);

        // Mock HTTP callout
        Test.startTest();
        HttpMockImpl mock = new HttpMockImpl(mockResponse);
        Test.setMock(HttpCalloutMock.class, mock);

        String accessToken = USPSLabelAccessToken.requestAccessToken('client_credentials', 'mockClientId', 'mockClientSecret', testEndPoint);
        Test.stopTest();

        // Verify the results
        System.assertEquals(null, accessToken, 'The access token should be null on error.');
    }

    // Mock implementation of the HTTP Callout for testing
    private class HttpMockImpl implements HttpCalloutMock {
        private HttpResponse response;

        public HttpMockImpl(HttpResponse response) {
            this.response = response;
        }

        public HttpResponse respond(HttpRequest req) {
            return response;
        }
    }
}