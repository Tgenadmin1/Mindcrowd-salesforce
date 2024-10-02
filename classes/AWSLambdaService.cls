public class AWSLambdaService {
    @AuraEnabled
    public static Map<String, Object> getUploadURL(String bucketName, String fileName, String namedCredential) {
        HttpRequest req = new HttpRequest();        
        req.setEndpoint(namedCredential);
        req.setMethod('POST');
        req.setHeader('Content-Type', 'application/json');
        req.setTimeout(120000);

        String requestBody = JSON.serialize(new Map<String, String>{
            'bucketName' => bucketName,
            'fileName' => fileName
        });
        req.setBody(requestBody);
        Http http = new Http();
        HttpResponse res = http.send(req);

        if (res.getStatusCode() == 200) {
            Map<String, Object> responseBody = (Map<String, Object>) JSON.deserializeUntyped(res.getBody());
            //return (String) responseBody.get('uploadURL');
            System.debug(responseBody);
            return responseBody;
        } else {
            throw new CalloutException('Error making callout: ' + res.getStatusCode() + ' - ' + res.getBody());
        }
    }
}