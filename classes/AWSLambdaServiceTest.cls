@isTest
private class AWSLambdaServiceTest {
    
    
    // Test method to test the getUploadURL method
    @isTest
    static void testGetUploadURL() {
        Test.setMock(HttpCalloutMock.class, new AWSLambdaServiceMock());
        
        Map<String, Object> result = AWSLambdaService.getUploadURL('example-bucket', 'example-file.txt','callout:AWS_S3');
        
        // Verify the result
        System.assertEquals('https://s3.amazonaws.com/example-bucket/example-file', result.get('uploadURL'));
    }
}