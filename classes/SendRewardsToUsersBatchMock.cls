@isTest
global class SendRewardsToUsersBatchMock implements HttpCalloutMock {

    global HTTPResponse respond(HTTPRequest req) {
        // Create a mock HTTP response
        HttpResponse res = new HttpResponse();
        res.setHeader('Content-Type', 'application/json');
        res.setBody('{"status":"Success","message":"Mock response"}');
        res.setStatusCode(200);
        if (req.getEndpoint()=='wrong') {
               res.setStatusCode(500);
            res.setBody('Error message');
        }
        return res;
    }
}