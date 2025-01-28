public class USPSPaymentLabelAccessTokenMock implements HttpCalloutMock {
    public HttpResponse respond(HttpRequest req) {
        HttpResponse response = new HttpResponse();
        response.setHeader('Content-Type', 'application/json');
        response.setStatusCode(200);
        
        // Mock response body
        String jsonResponse = '{"paymentAuthorizationToken": "mock_payment_auth_token"}';
        response.setBody(jsonResponse);
        
        return response;
    }
}