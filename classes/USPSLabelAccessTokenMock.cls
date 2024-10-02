public class USPSLabelAccessTokenMock implements HttpCalloutMock {
    public HttpResponse respond(HttpRequest req) {
        HttpResponse response = new HttpResponse();
        response.setHeader('Content-Type', 'application/json');
        response.setStatusCode(200);
        
        // Mock response body
        String jsonResponse = '{"access_token": "mock_access_token"}';
        response.setBody(jsonResponse);
        
        return response;
    }
}