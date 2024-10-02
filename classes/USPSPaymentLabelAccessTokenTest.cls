@isTest
public class USPSPaymentLabelAccessTokenTest {
    @isTest
    static void testRequestPaymentToken_Success() {
        // Define the mock response
        Test.startTest();
        Test.setMock(HttpCalloutMock.class, new USPSPaymentLabelAccessTokenMock(200, '{"paymentAuthorizationToken":"mockToken123"}'));
        
        String accessToken = 'testAccessToken';
        String CRID = 'testCRID';
        String payerRoleName = 'payer';
        String labelOwnerRoleName = 'labelOwner';
        String MID = 'testMID';
        String manifestMID = 'testManifestMID';
        String accountType = 'testAccountType';
        String accountNumber = 'testAccountNumber';
        String endPoint = 'https://api.usps.com/paymentToken';

        String token = USPSPaymentLabelAccessToken.requestPaymentToken(
            accessToken, CRID, payerRoleName, labelOwnerRoleName, MID, 
            manifestMID, accountType, accountNumber, endPoint
        );

        // Verify the response
        System.assertEquals('mockToken123', token, 'The payment authorization token should be "mockToken123".');
        Test.stopTest();
    }

    @isTest
    static void testRequestPaymentToken_Failure() {
        // Define the mock response for failure
        Test.startTest();
        Test.setMock(HttpCalloutMock.class, new USPSPaymentLabelAccessTokenMock(400, 'Internal Server Error'));
        
        String accessToken = 'testAccessToken';
        String CRID = 'testCRID';
        String payerRoleName = 'payer';
        String labelOwnerRoleName = 'labelOwner';
        String MID = 'testMID';
        String manifestMID = 'testManifestMID';
        String accountType = 'testAccountType';
        String accountNumber = 'testAccountNumber';
        String endPoint = 'https://api.usps.com/paymentToken';

        String token = USPSPaymentLabelAccessToken.requestPaymentToken(
            accessToken, CRID, payerRoleName, labelOwnerRoleName, MID, 
            manifestMID, accountType, accountNumber, endPoint
        );

        // Verify the response is null due to failure
        System.assertEquals(null, token, 'The payment authorization token should be null when there is an error.');
        Test.stopTest();
    }
    @isTest
    static void testRequestPaymentToken_Exception() {
        // Define the mock response for an exception
        Test.startTest();
        Test.setMock(HttpCalloutMock.class, new USPSPaymentLabelAccessTokenMock(200, '{ "paymentAuthorizationToken": null }'));
        
        // Simulate an exception scenario
        String accessToken = 'testAccessToken';
        String CRID = 'testCRID';
        String payerRoleName = 'payer';
        String labelOwnerRoleName = 'labelOwner';
        String MID = 'testMID';
        String manifestMID = 'testManifestMID';
        String accountType = 'testAccountType';
        String accountNumber = 'testAccountNumber';
        String endPoint = 'https://api.usps.com/paymentToken';

        // Here, we use the mocked response to simulate an exceptional case
        String token = USPSPaymentLabelAccessToken.requestPaymentToken(
            accessToken, CRID, payerRoleName, labelOwnerRoleName, MID, 
            manifestMID, accountType, accountNumber, endPoint
        );

        // Verify the response is null due to the exception
        System.assertEquals(null, token, 'The payment authorization token should be null when an exception occurs.');
        Test.stopTest();
    }
}