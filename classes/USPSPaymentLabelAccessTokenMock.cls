public class USPSPaymentLabelAccessTokenMock  implements HttpCalloutMock{
    private Integer statusCode;
    private String responseBody;
    public USPSPaymentLabelAccessTokenMock(Integer statusCode, String responseBody) {
    	this.statusCode = statusCode;
        this.responseBody = responseBody;
    }
	//public HttpResponse MockHttpResponse(){
    // Implement the respond method to simulate the HTTP response
    public HttpResponse respond(HttpRequest req) {
    	// Create a new HTTP response
        HttpResponse res = new HttpResponse();
        // Set the status code
        res.setStatusCode(statusCode);
        // Set the response body
        res.setBody(responseBody);
        //res.setBody('{"paymentAuthorizationToken": "mockToken12345"}');
        return res;
    }
    //}
}