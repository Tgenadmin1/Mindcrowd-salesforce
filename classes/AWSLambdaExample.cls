public class AWSLambdaExample {
    public static void execute() {
        String bucketName = 'tellme-mindcrowd';
        String fileName = '123456.wav';

        try {
            Map<String, Object> responseBody  = AWSLambdaService.getUploadURL(bucketName, fileName);
            String uploadURL = (String) responseBody.get('uploadURL');
            String key = (String) responseBody.get('Key');
            System.debug('Generated upload URL: ' + uploadURL);
            System.debug('key: ' + key);
        } catch (CalloutException e) {
            System.debug('Error: ' + e.getMessage());
        }
    }
}