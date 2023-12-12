public without sharing class WebServiceForIpData 
{
    public static Map<String, Object> getIPData(String ipAddress)
    {
        Http http = new Http();
        HttpRequest request = new HttpRequest();
        IpAddressData__c obj= IpAddressData__c.getValues('userOne'); 
        String apiKey=obj.apiKey__c;
        String url=obj.url__c;
        request.setEndpoint(url+ipAddress+'?api-key='+apiKey);
        request.setMethod('GET');
        System.debug('WebServiceForIpData requesting: '+request);
        HttpResponse response = http.send(request);
        Map<String, Object> addResult=new Map<String, Object>();
        // If the request is successful, parse the JSON response.
        if(response.getStatusCode() == 200) 
        {
            // Deserialize the JSON string into collections of primitive data types.
            Map<String, Object> results = (Map<String, Object>) JSON.deserializeUntyped(response.getBody());
            System.debug('WebServiceForIpData HttpResponse:'+results);
            return results;
        }
        else
        {
            String errorMessage= 'ERROR for ipAddress '+ipAddress+' in WebServiceForIpData & HttpResponse is:'+ response;
            UtilityMethods.ErrorReportToEmail(errorMessage);
            return null;
        }        
    } 
}