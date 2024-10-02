// Created By: {Miraclesoft(Kotesam)}
// Created On: 27/08/2024
// Description/Purpose: [TSS-261] It was created to get the Access Token from USPS Label
public class USPSLabelAccessToken {    
    public static String requestAccessToken(String grantType, String clientId, String clientSecret, String endPoint) {
        try {
            Http http = new Http();
            HttpRequest httpRequest = new HttpRequest();
            httpRequest.setEndpoint(endPoint);
            httpRequest.setMethod('POST');
            httpRequest.setHeader('Content-Type', 'application/json');            
            AuthTokenRequest authTokenReq = new AuthTokenRequest();
            authTokenReq.client_id = clientId;
            authTokenReq.client_secret = clientSecret;
            authTokenReq.grant_type = grantType;            
            httpRequest.setBody(JSON.serialize(authTokenReq));
            HttpResponse response = http.send(httpRequest);            
            if (response.getStatusCode() != 200) {
                ExceptionLogHandler.logException(null, 'USPSLabelAccessToken', 'requestAccessToken', 'Error: ' + response.getStatusCode() + ' - ' + response.getBody());
                return null;
            } else {
                Map<String, Object> resultMap = (Map<String, Object>) JSON.deserializeUntyped(response.getBody());
                return (String) resultMap.get('access_token');
            }
        } catch (Exception e) {
            ExceptionLogHandler.logException(null, 'USPSLabelAccessToken', 'requestAccessToken', e.getMessage());
            return null;
        }
    }
    private class AuthTokenRequest {
        public String client_id;
        public String client_secret;
        public String grant_type;
    }
}