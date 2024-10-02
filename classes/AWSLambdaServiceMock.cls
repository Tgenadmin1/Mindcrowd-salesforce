public class AWSLambdaServiceMock implements HttpCalloutMock{
    //public HttpResponse MockHttpResponse(){
        // Implement the respond method to simulate the HTTP response
        public HttpResponse respond(HttpRequest req) {
            // Create a new HTTP response
            HttpResponse res = new HttpResponse();
            // Set the status code
            res.setStatusCode(200);
            // Set the response body
            res.setBody('{"uploadURL":"https://s3.amazonaws.com/example-bucket/example-file"}');
            return res;
        }
    //}
}