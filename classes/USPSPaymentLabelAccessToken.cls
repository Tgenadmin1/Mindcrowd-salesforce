// Created By: {Miraclesoft(Sravya Pericherla)}
// Created On: 27/08/2024
// Description/Purpose: [TSS-261] This class is used to get the Access Payment Token from USPS Label
public class USPSPaymentLabelAccessToken {  
    public static String requestPaymentToken(String accessToken, String CRID, String payerRoleName, String labelOwnerRoleName, 
                                      String MID, String manifestMID, String accountType, String accountNumber, String endPoint) {
        try {
            Http http = new Http();
            HttpRequest httpRequest = new HttpRequest();
            httpRequest.setEndpoint(endPoint);
            httpRequest.setMethod('POST');
            httpRequest.setHeader('Content-Type', 'application/json'); 
            httpRequest.setHeader('Authorization','Bearer ' + accessToken);
            PaymentTokenRequest paymentTokenReq = new PaymentTokenRequest();
            paymentTokenReq.roles = new List<Role>();
            paymentTokenReq.roles.add(createRole(payerRoleName, CRID, MID, manifestMID, accountType, accountNumber));
            paymentTokenReq.roles.add(createRole(labelOwnerRoleName, CRID, MID, manifestMID, accountType, accountNumber));
            httpRequest.setBody(JSON.serialize(paymentTokenReq));
            HttpResponse response = http.send(httpRequest);
            if (response.getStatusCode() != 200) {
                ExceptionLogHandler.logException(null, 'USPSPaymentLabelAccessToken', ' requestPaymentToken', 'Error: ' + response.getStatusCode() + ' - ' + response.getBody());
                return null;
            } else {
                Map<String, Object> resultMap = (Map<String, Object>) JSON.deserializeUntyped(response.getBody());
                return (String)resultMap.get('paymentAuthorizationToken');
            }
        } catch (Exception e) {
            ExceptionLogHandler.logException(null, 'USPSPaymentLabelAccessToken', ' requestPaymentToken', e.getMessage());
            return null;
        }
    }    
    private static Role createRole(String roleName, String CRID, String MID, String manifestMID, String accountType, String accountNumber) {
        Role role = new Role();
        role.roleName = roleName;
        role.CRID = CRID;
        role.MID = MID;
        role.manifestMID = manifestMID;
        role.accountType = accountType;
        role.accountNumber = accountNumber;
        return role;
    }    
    private class PaymentTokenRequest {
        public List<Role> roles;
    }  
    private class Role {
        public String roleName;
        public String CRID;
        public String MID;
        public String manifestMID;
        public String accountType;
        public String accountNumber;
    }
}