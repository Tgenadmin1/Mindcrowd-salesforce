public class USPSTrackShipment {
    
    public static Integration_Settings__c integrationsettings=new Integration_Settings__c();
    static 
    {
        Map<String,Integration_Settings__c> intSettings= Integration_Settings__c.getAll();
        System.debug(intSettings);
        if(intSettings!=null && intSettings.ContainsKey('Integration Settings'))
        {
            integrationsettings = intSettings.get('Integration Settings');   
        }
    }
    public static String grantType= ShipmentLabel.integrationsettings.grant_type__c;
    public static String clientId= ShipmentLabel.integrationsettings.client_id__c;
    public static String clientSecret= ShipmentLabel.integrationsettings.client_secret__c;
    public static String endPointAccessToken= ShipmentLabel.integrationsettings.AccessToken_url__c;
    
    public static USPSTrackResponse getTrackingDetails(String url){
        String accessToken = USPSLabelAccessToken.requestAccessToken(grantType,clientId,clientSecret,endPointAccessToken);
        System.debug('AccessToken...:'+accessToken);
        Http p = new Http();
        HttpRequest request = new HttpRequest();
        request.setEndpoint(url);
        request.setMethod('GET');
        request.setHeader('Content-Type', 'application/json');
        request.setHeader('authorizationCode','Bearer ' + accessToken);
        HttpResponse response = p.send(request);
        if(response.getStatusCode()==200){
            String responseBody = response.getBody();
            System.debug('Response Body....:'+responseBody);
            USPSTrackResponse uspsResponse = (USPSTrackResponse)JSON.deserialize(responseBody, USPSTrackResponse.class);
            System.debug('Parsed USPS Response...:'+uspsResponse);
            return uspsResponse;
            
        }else{
            System.debug('Error in HTTP request:'+response.getStatusCode()+''+response.getStatus());
            return null;
        }
    }
    public static USPSTrackResponse trackingDetails(String trackId) {
    USPSTrackResponse response = USPSTrackShipment.getTrackingDetails('https://api-cat.usps.com/tracking/v3/tracking/{420890749200190306026099990572}');
        System.debug('Response url...:'+response);
    if(response != null){
    System.debug('trackingNumber: ' + response.trackingNumber);
    System.debug('expectedDeliveryDate: ' + response.expectedDeliveryDate);
    System.debug('expectedDeliveryTime ' + response.expectedDeliveryTime);
    System.debug('guaranteedDeliveryDate ' + response.guaranteedDeliveryDate);
    System.debug('eventSummaries ' + response.eventSummaries);

    }
        return response;
    }

}