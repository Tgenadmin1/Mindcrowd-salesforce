public with sharing class AWSConfigController {
    @AuraEnabled
    public static Map<String, String> getAWSConfig() {
        Map<String, String> config = new Map<String, String>();
        
        // Retrieve AWS custom settings
        Amazon_S3__c settings = Amazon_S3__c.getInstance('AmazonS3');
        
        if (settings != null) {
            config.put('awsAccessKey', settings.Access_key__c);
            config.put('awsSecretKey', settings.Secret_access_key__c);
            config.put('awsRegion', settings.AWS_Region__c);
            config.put('s3BucketName1', settings.S3_Bucket_Name_1__c);
            config.put('s3BucketName2', settings.S3_Bucket_Name_2__c);
        }
        
        return config;
    }
}