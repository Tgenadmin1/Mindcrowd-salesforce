public with sharing class USPSSanthosh {

    public static Integration_Settings__c integrationsettings = new Integration_Settings__c();
    static 
    {
        Map<String,Integration_Settings__c> intSettings= Integration_Settings__c.getAll();
        System.debug(intSettings);
        if(intSettings!=null && intSettings.ContainsKey('Integration Settings'))
        {
            integrationsettings = intSettings.get('Integration Settings');   
        }
    }
    public static String userid=integrationsettings.UserId__c;
    public static String uspsurl=integrationsettings.USPS_URL__c;
    public static String grantType= ShipmentLabel.integrationsettings.grant_type__c;
    public static String clientId= ShipmentLabel.integrationsettings.client_id__c;
    public static String clientSecret= ShipmentLabel.integrationsettings.client_secret__c;
    public static String endPointAccessToken= ShipmentLabel.integrationsettings.AccessToken_url__c;

    private static String BuildAddressQueryJSONString(USPSAddress AddressToQuery) {   
        // Define the base URL for the USPS API
        String BaseURL = uspsurl;
    
        // Create a JSON object for the request
        Map<String, Object> addressDetails = new Map<String, Object>();
        addressDetails.put('ID', '0');
        addressDetails.put('Address1', AddressToQuery.Address1);
        addressDetails.put('Address2', AddressToQuery.Address2);
        addressDetails.put('City', AddressToQuery.City);
        addressDetails.put('State', AddressToQuery.State);
        addressDetails.put('Zip5', AddressToQuery.Zip5);
        addressDetails.put('Zip4', AddressToQuery.Zip4 != null ? AddressToQuery.Zip4 : '');
    
        // Wrap in a request map
        Map<String, Object> requestMap = new Map<String, Object>();
        requestMap.put('USERID', userid);
        requestMap.put('Address', new List<Map<String, Object>>{addressDetails});
    
        // Serialize the request map to JSON
        String jsonRequest = JSON.serialize(requestMap);
        System.debug('JSON Request Payload: ' + jsonRequest);
    
        return jsonRequest;
    }
	
    private static USPSAddressResponse GetStandardizedAddressFromUSPS(String jsonRequest) {
        // Fetch access token
        String accessToken = USPSLabelAccessToken.requestAccessToken(grantType, clientId, clientSecret, endPointAccessToken);
        System.debug('AccessToken: ' + accessToken);
    
        // Set up HTTP request
        HttpRequest USPSRequest = new HttpRequest();
        USPSRequest.setEndpoint(uspsurl);
        USPSRequest.setMethod('GET');
        USPSRequest.setHeader('Content-Type', 'application/json');
        USPSRequest.setHeader('Authorization', 'Bearer ' + accessToken);
        USPSRequest.setBody(jsonRequest);
    
        // Send HTTP request
        HttpResponse USPSResponse = new Http().send(USPSRequest);
        System.debug('HTTP Response Status: ' + USPSResponse.getStatus());
    
        // Check for successful response
        if (USPSResponse.getStatusCode() == 200) {
            String responseBody = USPSResponse.getBody();
            System.debug('Response Body: ' + responseBody);
    
            // Deserialize JSON response
            USPSAddressResponse addressResponse = (USPSAddressResponse) JSON.deserialize(responseBody, USPSAddressResponse.class);
            System.debug('Parsed USPS Response: ' + addressResponse);
            return addressResponse;
        } else {
            System.debug('Error in HTTP request: ' + USPSResponse.getStatusCode() + ' ' + USPSResponse.getStatus());
            return null;
        }
    }
  
    private static USPSAddress ParseUSPSResponseXML(String XMLToParse) 
    {
        USPSAddress ReturnAddress = new USPSAddress();
        // parse the response
        XMLStreamReader USPSXMLReader = new XMLStreamReader(XMLToParse);
        while (USPSXMLReader.hasNext()) 
        {
            if (USPSXMLReader.getEventType() == XmlTag.START_ELEMENT) 
            {
                if ('AddressValidateResponse' == USPSXMLReader.getLocalName()) 
                {
                    USPSXMLReader.next();
                    if ('Address' == USPSXMLReader.getLocalName()) 
                    {
                        ReturnAddress = ParseUSPSAddressXML(USPSXMLReader);
                    } 
                } 
            }         
            
            USPSXMLReader.next();
            
        } 
        if (ReturnAddress.HasData() == false) 
        {
            // if parsing comes back totally blank then indicate an unknown / parsing error to the caller / requestor
            system.Debug('ReturnAddress.HasData() == false');
            ReturnAddress.USPS_Returned_Error = true;
            ReturnAddress.USPS_ERROR_DESC = 'Unknown Error parsing XML Response';
            ReturnAddress.USPS_ERROR_SOURCE = 'Salesforce XML Parsing';
            ReturnAddress.USPS_ERROR_CODE = '-1';
        } 
        return ReturnAddress;
    } 
    private static USPSAddress ParseUSPSAddressXML(XMLStreamReader USPSAddressXMLReader) 
    {
        USPSAddress ReturnAddress = new USPSAddress();
        while(USPSAddressXMLReader.hasNext()) 
        {
            if (USPSAddressXMLReader.getEventType() == XmlTag.END_ELEMENT) 
            {
                if ('Address' == USPSAddressXMLReader.getLocalName())
                {
                    // quit parsing when we hit the end of this record	        	
                    break;
                } // check for address ending tag
            } else if ('Error' == USPSAddressXMLReader.getLocalName()) 
            {
                system.Debug('API Returned an error!');
                ReturnAddress = ParseUSPSErrorXML(USPSAddressXMLReader);
                ReturnAddress.USPS_Returned_Error = true;
            } else if ('Address1' == USPSAddressXMLReader.getLocalName()) 
            {
                USPSAddressXMLReader.next();
                if (USPSAddressXMLReader.getEventType() == XmlTag.CHARACTERS) 
                {
                    system.Debug('Address1: ' +  USPSAddressXMLReader.getText());	        	
                    ReturnAddress.Address1 = USPSAddressXMLReader.getText();
                } // check for data
            } else if ('Address2' == USPSAddressXMLReader.getLocalName()) 
            {
                USPSAddressXMLReader.next();
                if (USPSAddressXMLReader.getEventType() == XmlTag.CHARACTERS) 
                {
                    system.Debug('Address2: ' +  USPSAddressXMLReader.getText());	        	
                    ReturnAddress.Address2 = USPSAddressXMLReader.getText();
                } // check for data
            } else if ('City' == USPSAddressXMLReader.getLocalName()) 
            {
                USPSAddressXMLReader.next();
                if (USPSAddressXMLReader.getEventType() == XmlTag.CHARACTERS) 
                {
                    system.Debug('City: ' +  USPSAddressXMLReader.getText());	        	
                    ReturnAddress.City = USPSAddressXMLReader.getText();
                } // check for data
            } else if ('State' == USPSAddressXMLReader.getLocalName()) 
            {
                USPSAddressXMLReader.next();
                if (USPSAddressXMLReader.getEventType() == XmlTag.CHARACTERS) 
                {
                    system.Debug('State: ' +  USPSAddressXMLReader.getText());	        	
                    ReturnAddress.State = USPSAddressXMLReader.getText();
                } // check for data
            } else if ('Zip5' == USPSAddressXMLReader.getLocalName()) 
            {
                USPSAddressXMLReader.next();
                if (USPSAddressXMLReader.getEventType() == XmlTag.CHARACTERS) 
                {
                    system.Debug('Zip5: ' +  USPSAddressXMLReader.getText());	        	
                    ReturnAddress.Zip5 = USPSAddressXMLReader.getText();
                } // check for data
            } else if ('Zip4' == USPSAddressXMLReader.getLocalName())
            {
                
                USPSAddressXMLReader.next();
                
                if (USPSAddressXMLReader.getEventType() == XmlTag.CHARACTERS) {
                    system.Debug('Zip4: ' +  USPSAddressXMLReader.getText());	        	
                    ReturnAddress.Zip4 = USPSAddressXMLReader.getText();
                }         
            }
            USPSAddressXMLReader.next();
            
        } 
        
        return ReturnAddress;		
    } // ParseUSPSAddressXML
    private static USPSAddress ParseUSPSErrorXML(XMLStreamReader USPSErrorXMLReader) {
        
        USPSAddress ReturnAddress = new USPSAddress();
        
        while(USPSErrorXMLReader.hasNext()) {
            if (USPSErrorXMLReader.getEventType() == XmlTag.END_ELEMENT) {
                if ('Error' == USPSErrorXMLReader.getLocalName()) {
                    // quit parsing when we hit the end of this record
                    break;
                }
            } else if ('Number' == USPSErrorXMLReader.getLocalName()) {
                
                USPSErrorXMLReader.next();
                
                if (USPSErrorXMLReader.getEventType() == XmlTag.CHARACTERS) {
                    system.Debug('Error Number / Code: ' +  USPSErrorXMLReader.getText());	        	
                    ReturnAddress.USPS_ERROR_CODE = USPSErrorXMLReader.getText();
                } // check for data
            } else if ('Source' == USPSErrorXMLReader.getLocalName()) {
                
                USPSErrorXMLReader.next();
                
                if (USPSErrorXMLReader.getEventType() == XmlTag.CHARACTERS) {
                    system.Debug('Error Source: ' + USPSErrorXMLReader.getText());	        	
                    ReturnAddress.USPS_ERROR_SOURCE = USPSErrorXMLReader.getText();
                } 
            } else if ('Description' == USPSErrorXMLReader.getLocalName()) {
                
                USPSErrorXMLReader.next();
                
                if (USPSErrorXMLReader.getEventType() == XmlTag.CHARACTERS) {
                    system.Debug('Error Description: ' + USPSErrorXMLReader.getText());	        	
                    ReturnAddress.USPS_ERROR_DESC = USPSErrorXMLReader.getText();
                } 
                
            } 
            
            USPSErrorXMLReader.next();
            
        } 
        
        return ReturnAddress;		
        
        
    } 
    
    @AuraEnabled
    public static USPSAddress CheckAddress(String Address1, String Address2, String City, String State, String Zip5, String Zip4) {
        // Prepare address object
        USPSAddress addressToCheck = new USPSAddress();
        addressToCheck.Address1 = Address1;
        addressToCheck.Address2 = Address2;
        addressToCheck.City = City;
        addressToCheck.State = State;
        addressToCheck.Zip5 = Zip5;
        addressToCheck.Zip4 = Zip4;
    
        // Build JSON request
        String jsonRequest = BuildAddressQueryJSONString(addressToCheck);
    
        // Get standardized address from USPS
        USPSAddressResponse response = GetStandardizedAddressFromUSPS(jsonRequest);
    
        // Validate and return the standardized address
        if (response == null || response.Address == null || response.Address.isEmpty()) {
            System.debug('Error: Invalid or empty response from USPS');
            return new USPSAddress(); // Return an empty address in case of error
        }
    
        // Fetch the first address in the list
        USPSAddressResponse.Address standardizedAddress = response.getStandardizedAddress();
    
        // Check if there was an error in the response
        if (standardizedAddress.hasError()) {
            System.debug('Error in USPS Address Response: ' + standardizedAddress.Error);
            return new USPSAddress();
        }
    
        // Create a new USPSAddress object with standardized values
        USPSAddress standardizedResult = new USPSAddress();
        standardizedResult.Address1 = standardizedAddress.Address1;
        standardizedResult.Address2 = standardizedAddress.Address2;
        standardizedResult.City = standardizedAddress.City;
        standardizedResult.State = standardizedAddress.State;
        standardizedResult.Zip5 = standardizedAddress.Zip5;
        standardizedResult.Zip4 = standardizedAddress.Zip4;
    
        return standardizedResult;
    }    
}