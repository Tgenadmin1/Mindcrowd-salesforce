@isTest
public class USPSPaymentLabelAccessTokenTest {
    @isTest
    static void testRequestPaymentToken() {
        // Setup mock callout
        Test.setMock(HttpCalloutMock.class, new USPSPaymentLabelAccessTokenMock());
        
        // Define test variables
        String accessToken = 'mock_access_token';
        String CRID = 'test_crid';
        String payerRoleName = 'payer_role';
        String labelOwnerRoleName = 'label_owner_role';
        String MID = 'test_mid';
        String manifestMID = 'test_manifest_mid';
        String accountType = 'test_account_type';
        String accountNumber = 'test_account_number';
        String endPoint = 'https://api.usps.com/payment/token';
        
        // Call the method
        String paymentToken = USPSPaymentLabelAccessToken.requestPaymentToken(
            accessToken,
            CRID,
            payerRoleName,
            labelOwnerRoleName,
            MID,
            manifestMID,
            accountType,
            accountNumber,
            endPoint
        );
        
        // Verify the result
        System.assertEquals('mock_payment_auth_token', paymentToken);
    }
}