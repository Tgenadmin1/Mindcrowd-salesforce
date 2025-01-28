// Created By: {Girikon(Shweta Khunteta)}
// Created On: 05/05/2021
// Description/Purpose: Why and where it is used [TM-98]-It was created to validate and call  the API from 
//participationconsentform (LWC component) to Contact Object.
// Methods: {}
// Test Class: {USPS_Test} {}


public with sharing class USPS 
{
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
    public static String addressURL= ShipmentLabel.integrationsettings.addressUrl__c;
    public static String addressZipcodeURL= ShipmentLabel.integrationsettings.AddressZipCodeURL__c;
    /*private static string BuildAddressQueryURLString(USPSAddress AddressToQuery,String USPS_UID) 
    {   
        //String BaseURL = 'https://secure.shippingapis.com/ShippingAPI.dll?API=Verify&XML=';
        String BaseURL = uspsurl+'?API=Verify&XML=';
        
        String ReturnValue = '<AddressValidateRequest USERID="' + userid + '"><Address ID="0">';
        ReturnValue += '<Address1>' + AddressToQuery.Address1 + '</Address1>';
        ReturnValue += '<Address2>' + AddressToQuery.Address2 + '</Address2>';
        ReturnValue += '<City>' + AddressToQuery.City + '</City>';
        ReturnValue += '<State>' + AddressToQuery.State + '</State>';
        ReturnValue += '<Zip5>' + AddressToQuery.Zip5 + '</Zip5>';
        if(AddressToQuery.Zip4!=null){
            ReturnValue += '<Zip4>' + AddressToQuery.Zip4 + '</Zip4>';
        }else{
            ReturnValue += '<Zip4/>';
        }
        ReturnValue += '</Address></AddressValidateRequest>';
        ReturnValue = EncodingUtil.urlEncode(ReturnValue, 'UTF-8');
        ReturnValue = BaseURL + ReturnValue; 
        System.debug('Address url is---'+ReturnValue);
        return ReturnValue;
        
    } 
    private static string GetStandardizedAddressFromUSPS(string USPSURLtoQuery) 
    {
        string ReturnValue = '';
        
        HttpRequest USPSRequest = new HttpRequest();
        Http USPSHttp = new Http();
        USPSRequest.setMethod('GET');
        USPSRequest.setEndpoint(USPSURLtoQuery);
        HttpResponse USPSResponse = USPSHttp.send(USPSRequest);
        ReturnValue = USPSResponse.getBody();  
        system.debug('XML Response was: ' + ReturnValue);
        
        return ReturnValue;
        
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
        
        
    }*/ 
    // @AuraEnabled
    
    // public static USPSAddress CheckAddress(USPSAddress Address2Check,String USERID) {
    //      USERID='255IZOOT6301';   
    //     USPSAddress ResponseAddress = new USPSAddress();
    
    //     // build the URL for the API call	
    //     //String USERID='255IZOOT6301';	
    //     string USPSURL = BuildAddressQueryURLString(Address2Check,USERID);
    
    //     // call the API and pullback the XML as a string
    //     string XMLResponse = GetStandardizedAddressFromUSPS(USPSURL);
    
    //     // send the XML reponse to the parser
    //     ResponseAddress = ParseUSPSResponseXML(XMLResponse);
    
    
    //     system.debug('-=-=-=-=-=-=- Results -=-=-=-=-=-=-');
    //     system.debug('Address1: ' + ResponseAddress.Address1);
    //     system.debug('Address2: ' + ResponseAddress.Address2);
    //     system.debug('City: ' + ResponseAddress.City);
    //     system.debug('State: ' + ResponseAddress.State);
    //     system.debug('Zip5: ' + ResponseAddress.Zip5);
    //     system.debug('Zip4: ' + ResponseAddress.Zip4);
    
    //     if (ResponseAddress.USPS_Returned_Error == true) {
    //         system.debug('USPS_ERROR_CODE: ' + ResponseAddress.USPS_ERROR_CODE);
    //         system.debug('USPS_ERROR_DESC: ' + ResponseAddress.USPS_ERROR_DESC);
    //         system.debug('USPS_ERROR_SOURCE: ' + ResponseAddress.USPS_ERROR_SOURCE);
    //     } // check for error code
    
    //     system.debug('-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-');		
    
    //     system.debug('-=-=-=-=-=-=- Searched -=-=-=-=-=-=-');
    //     system.debug('Address1: ' + Address2Check.Address1);
    //     system.debug('Address2: ' + Address2Check.Address2);
    //     system.debug('City: ' + Address2Check.City);
    //     system.debug('State: ' + Address2Check.State);
    //     system.debug('Zip5: ' + Address2Check.Zip5);
    //     system.debug('Zip4: ' + Address2Check.Zip4);
    //     system.debug('-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-');		
    
    
    //     return ResponseAddress;
    
    // } // CheckAddress
    @AuraEnabled
    public static USPSAddress CheckAddress(String Address1, String Address2,String City,String State,String Zip5,String Zip4) {
        
        String userid;
        System.debug('value of ziocode5 is'+Zip5);
        System.debug('value of ziocode4 is'+Zip4);
        System.debug('value of Address1 value==>'+Address1);
        USPSAddress ResponseAddress = new USPSAddress();
        USPSAddress Address2Check = new USPSAddress();
        Address2Check.Address1=Address1;
        System.debug('## APEX ---value of Address1 is'+Address2Check.Address1);
        Address2Check.Address2=Address2;
        System.debug('value of Address2 is'+Address2Check.Address2);
        Address2Check.City=City;
        System.debug('value of City is'+Address2Check.City);
        Address2Check.State=State;
        Address2Check.Zip5=Zip5;
        Address2Check.Zip4 = Zip4;
        System.debug('value of State is '+State);
        
        // Fetch access token
        String accessToken = USPSLabelAccessToken.requestAccessToken(grantType, clientId, clientSecret, endPointAccessToken);
        System.debug('AccessToken: ' + accessToken);
        
        if((State == null || State =='' || State == 'false') && Zip5 !=null && Zip5 !=''){
            USPSAddress ResponseGetStateAPI = new USPSAddress();
            HttpResponse httpzipcoderesp;
            try{ 
            	httpzipcoderesp = USPSGetStateAPI(Address2Check,accessToken);
            }
            catch(Exception e){    
            }
            if (httpzipcoderesp != null && httpzipcoderesp.getStatusCode() == 200) {
                Map<String, Object> responseMAp = (Map<String, Object>)JSON.deserializeUntyped(httpzipcoderesp.getBody());
                Address2Check.City = (String)responseMAp.get('city');
                Address2Check.State = (String)responseMAp.get('state');
                System.debug('responseMAp: ' + responseMAp);
                System.debug('Address2Check: ' + Address2Check);
            }
        }
        /*if(Address2Check.Address2 ==null || Address2Check.Address2 ==''){
            ResponseAddress.USPS_Returned_Error = true;
            ResponseAddress.USPS_ERROR_DESC = 'Address Not Found.';
            ResponseAddress.USPS_ERROR_SOURCE = 'User';
            ResponseAddress.USPS_ERROR_CODE = '-1';
        }
        else*/ if((Address2Check.State ==null || Address2Check.State =='')){
            ResponseAddress.USPS_Returned_Error = true;
            ResponseAddress.USPS_ERROR_DESC = 'Invalid State Code.';
            ResponseAddress.USPS_ERROR_SOURCE = 'User';
            ResponseAddress.USPS_ERROR_CODE = '-1';
        }
        else{
        /*string USPSURL = BuildAddressQueryURLString(Address2Check, USERID);
        System.debug('uspsurl-------'+USPSURL);*/
        HttpResponse httpaddressAPIresp;
        try{ 
            httpaddressAPIresp = USPSGetAddressAPI(Address2Check,accessToken);
        }
        catch(Exception e){
            ResponseAddress.USPS_Returned_Error = true;
            ResponseAddress.USPS_ERROR_DESC = 'Address Not Found.';
            ResponseAddress.USPS_ERROR_SOURCE = 'Unknown';
            ResponseAddress.USPS_ERROR_CODE = '-1';
        }
       
        //System.debug('uspsurl-------'+USPSURL);
        if (httpaddressAPIresp != null && httpaddressAPIresp.getStatusCode() == 200) {
           System.debug('uspsAddResp: ' + httpaddressAPIresp.getBody());
           USPSAPIAddressResp uspsAddResp = (USPSAPIAddressResp)JSON.deserialize(httpaddressAPIresp.getBody(), USPSAPIAddressResp.class);
           System.debug('USPSAPIAddressResp:' +uspsAddResp);
           ResponseAddress.Address1 = uspsAddResp.Address.streetAddress;
           ResponseAddress.City = uspsAddResp.Address.city;
           ResponseAddress.State = uspsAddResp.Address.state;
           ResponseAddress.Zip5 = uspsAddResp.Address.ZIPCode;
           ResponseAddress.Zip4 = uspsAddResp.Address.ZIPPlus4;
       }
      else{
           System.debug('uspsAddErrResp: ' + httpaddressAPIresp.getBody());
           Map<String, Object> uspsAddErrRespm =  (Map<String, Object>) JSON.deserializeUntyped(httpaddressAPIresp.getBody());
           Map<String, Object> error =  (Map<String, Object>)uspsAddErrRespm.get('error');
           ResponseAddress.USPS_Returned_Error = true;
           ResponseAddress.USPS_ERROR_DESC =  'Address Not Found.';
           ResponseAddress.USPS_ERROR_SOURCE = 'API';
           ResponseAddress.USPS_ERROR_CODE = (String)error.get('code');
        }
        // call the API and pullback the XML as a string
        //string XMLResponse = GetStandardizedAddressFromUSPS(USPSURL);
        
        // send the XML reponse to the parser
        //ResponseAddress = ParseUSPSResponseXML(XMLResponse);
        // system.debug('-=-=-=-=-=-=- Results -=-=-=-=-=-=-');
        // system.debug('Address1: ' + ResponseAddress.Address1);
        // system.debug('Address2: ' + ResponseAddress.Address2);
        
        
        /*if (ResponseAddress.USPS_Returned_Error == true) 
        {
            system.debug('USPS_ERROR_CODE: ' + ResponseAddress.USPS_ERROR_CODE);
            system.debug('USPS_ERROR_DESC: ' + ResponseAddress.USPS_ERROR_DESC);
            system.debug('USPS_ERROR_SOURCE: ' + ResponseAddress.USPS_ERROR_SOURCE);
        }*/ 
        // system.debug('-=-=-=-=-=-=- Searched -=-=-=-=-=-=-');
        // system.debug('Address1: ' + Address2Check.Address1);
        
        
        
        }
		return ResponseAddress;
    } 
    
    private static HttpResponse USPSGetAddressAPI(USPSAddress AddressToQuery,String accessToken) 
    {   
        String streetAddress;
        if(AddressToQuery.Address1 ==null ||AddressToQuery.Address1 =='null' || AddressToQuery.Address1 =='' ){
            streetAddress =AddressToQuery.Address2;
        }
        else{
            streetAddress =AddressToQuery.Address1;
        }
        addressURL=addressURL+'?streetAddress='+EncodingUtil.urlEncode(streetAddress, 'UTF-8')+'&state='+EncodingUtil.urlEncode(AddressToQuery.State, 'UTF-8');
        if(AddressToQuery.City !=null && AddressToQuery.City !=''){
            addressURL = addressURL+'&city='+EncodingUtil.urlEncode(AddressToQuery.City, 'UTF-8');
        }
        if(AddressToQuery.Zip5 !=null && AddressToQuery.Zip5 !=''){
            addressURL = addressURL+'&ZIPCode='+EncodingUtil.urlEncode(AddressToQuery.Zip5, 'UTF-8');
        }
        if(AddressToQuery.Zip4 !=null && AddressToQuery.Zip4 !=''){
            addressURL = addressURL+'&ZIPPlus4='+EncodingUtil.urlEncode(AddressToQuery.Zip4, 'UTF-8');
        }
        
     	HttpRequest USPSRequest = new HttpRequest();
        Http USPSHttp = new Http();
        USPSRequest.setMethod('GET');
        USPSRequest.setEndpoint(addressURL);
        USPSRequest.setHeader('Accept','application/json');
        USPSRequest.setHeader('Authorization','Bearer ' + accessToken);
        HttpResponse USPSResponse = USPSHttp.send(USPSRequest);
        return USPSResponse;
    } 
    
    private static HttpResponse USPSGetStateAPI(USPSAddress AddressToQuery,String accessToken){ 
        addressZipcodeURL=addressZipcodeURL+EncodingUtil.urlEncode(AddressToQuery.Zip5, 'UTF-8');
		HttpRequest USPSRequest = new HttpRequest();
        Http USPSHttp = new Http();
        USPSRequest.setMethod('GET');
        USPSRequest.setEndpoint(addressZipcodeURL);
        USPSRequest.setHeader('Accept','application/json');
        USPSRequest.setHeader('Authorization','Bearer ' + accessToken);
        HttpResponse USPSResponse = USPSHttp.send(USPSRequest);
        return USPSResponse;
    }
    
}