@isTest
public class ShipmentLabelMock implements HttpCalloutMock {
    public HttpResponse respond(HttpRequest req) {
        HttpResponse response = new HttpResponse();
        response.setHeader('Content-Type', 'application/json');
        
        // Simulate the access token response
        if (req.getEndpoint().contains('auth/token')) {
            response.setStatusCode(200);
            response.setBody('{"access_token": "mock_access_token"}');
        }
        // Simulate the payment token response
        else if (req.getEndpoint().contains('payment/token')) {
            response.setStatusCode(200);
            response.setBody('{"paymentAuthorizationToken": "mock_payment_auth_token"}');
        }
        // Simulate the USPS label creation response
        else if (req.getEndpoint().contains('v3/label')) {
            response.setStatusCode(200);
            response.setBody('{"labelAddress": {"streetAddress": "123 Main St", "city": "Sample City", "state": "SC", "ZIPCode": "12345"}, "routingInformation": "1234567890", "postage": 5.00, "labelImage": "http://example.com/label.png"}');
        } else {
            response.setStatusCode(404);
        }
        
        return response;
    }
}