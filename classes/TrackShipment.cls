// Created By: {Girikon(Shweta Khunteta)}
// Created On: 29/06/2021
// Description/Purpose: Why and where it is used [TM-85]-It was created to  call  the  Tracking API from 
// USPS It has the code which parse the USPS API. passes the status returned by TrackAPI 
// 
// Methods: {BuildTrackShipmentURLString,GetTrackStatusFromUSPS,ParseUSPSResponseXML,ParseUSPSStatusSummaryXML
//ParseUSPSTrackSummaryXML,ParserUSPSTrackErrorXML,GetTrackingDetails}
// Test Class: {TrackShipmentTest,TrackHttpCallOutMock} {Code Coverage:100%}

public without sharing class TrackShipment 
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
     public static String password=integrationsettings.Password__c;
     public static String uspsurl=integrationsettings.USPS_URL__c;  
     public static String clientip=integrationsettings.Client_Ip__c;
     public static String sourceid=integrationsettings.Source_Id__c;
     public static String grantType= ShipmentLabel.integrationsettings.grant_type__c;
     public static String clientId= ShipmentLabel.integrationsettings.client_id__c;
     public static String clientSecret= ShipmentLabel.integrationsettings.client_secret__c;
     public static String endPointAccessToken= ShipmentLabel.integrationsettings.AccessToken_url__c;
     public static String trackingURL= ShipmentLabel.integrationsettings.TrackingURL__c;
   //METHOD created to build a URL
    /*public static string BuildTrackShipmentURLString(USPSTrack ShipmentToTrack,String USPS_UID,String trackId) 
    { 
        
        //String BaseURL = 'https://secure.shippingapis.com/ShippingAPI.dll?API=TrackV2&XML=';
        String BaseURL = uspsurl+'?API=TrackV2&XML=';
    
        String ReturnValue = '<TrackFieldRequest USERID="'+userid+'" PASSWORD="' + password + '">';     
        ReturnValue+= '<Revision>1</Revision>';
      //  ReturnValue+='<ClientIp>122.3.3</ClientIp>';
      ReturnValue+='<ClientIp>'+clientip+'</ClientIp>';
     //   ReturnValue+='<SourceId>XYZ Corp</SourceId>';
     ReturnValue+='<SourceId>'+sourceid+'</SourceId>';

        ReturnValue += '<TrackID ID="'+trackId+'"></TrackID>';
        ReturnValue += '</TrackFieldRequest>';
        ReturnValue = EncodingUtil.urlEncode(ReturnValue, 'UTF-8');
        ReturnValue = BaseURL + ReturnValue; 
        System.debug('----returned url is--'+ReturnValue);
        return ReturnValue;
        
    } // BuildTrackShipmentString closed
    public static string GetTrackStatusFromUSPS(string USPSURLtoQuery) 
    {

        string ReturnValue = '';  
        HttpRequest USPSRequest = new HttpRequest();
        Http USPSHttp = new Http();
        USPSRequest.setMethod('GET');
        USPSRequest.setEndpoint(USPSURLtoQuery);
        HttpResponse USPSResponse = USPSHttp.send(USPSRequest);
        ReturnValue = USPSResponse.getBody();  
        system.debug('XML Response was: ' + ReturnValue);
        system.debug('-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-');
        
        return ReturnValue;
   
    } 
//METHOD created to parse the response of XML NODE BY NODE
    public static USPSTrack ParseUSPSResponseXML(String XMLToParse) 
    {
        USPSTrack ReturnTracking = new USPSTrack();
        // parse the response
        XMLStreamReader USPSXMLReader = new XMLStreamReader(XMLToParse);
        while (USPSXMLReader.hasNext()) 
        {
                if (USPSXMLReader.getEventType() == XmlTag.START_ELEMENT) 
                {
                if ('TrackResponse' == USPSXMLReader.getLocalName()) 
                {
                    USPSXMLReader.next();
                    if ('TrackInfo' == USPSXMLReader.getLocalName()) 
                    {
                        ReturnTracking = ParseUSPSStatusSummaryXML(USPSXMLReader);
                    } 
                } 
                }       
            
                USPSXMLReader.next();
                        
        } // loop thru UPS XML Reader
        System.debug('I am in parse response xml--'+ReturnTracking);
        return ReturnTracking;
    }
    //PARSE the status category node
    private static USPSTrack ParseUSPSStatusSummaryXML(XMLStreamReader USPSTrackingXMLReader) 
    {
        USPSTrack trackingObj = new USPSTrack();

        while(USPSTrackingXMLReader.hasNext()) {
            if (USPSTrackingXMLReader.getEventType() == XmlTag.END_ELEMENT) {
                if ('TrackInfo' == USPSTrackingXMLReader.getLocalName()) {
                    // quit parsing when we hit the end of this record              
                    break;
                } // check for address ending tag
            } else if ('Error' == USPSTrackingXMLReader.getLocalName()) {
                system.Debug('API Returned an error!');
                
                trackingObj = ParserUSPSTrackErrorXML(USPSTrackingXMLReader);
                trackingObj.USPS_Returned_Error = true;
            } else if ('StatusCategory' == USPSTrackingXMLReader.getLocalName()) {
                System.debug('i am in status category');
                USPSTrackingXMLReader.next();
                
                if (USPSTrackingXMLReader.getEventType() == XmlTag.CHARACTERS) {
                    system.Debug('StaTUS category--: ' +  USPSTrackingXMLReader.getText());             
                    trackingObj.StatusCategory = USPSTrackingXMLReader.getText();
                } // check
            }
            else if ('StatusSummary' == USPSTrackingXMLReader.getLocalName()) {
                System.debug('i am in status summary');
                USPSTrackingXMLReader.next();
                
                if (USPSTrackingXMLReader.getEventType() == XmlTag.CHARACTERS) {
                    system.Debug('StaTUS summary--: ' +  USPSTrackingXMLReader.getText());              
                    trackingObj.StatusSummary = USPSTrackingXMLReader.getText();
                } // check
            }
            else if ('TrackSummary' == USPSTrackingXMLReader.getLocalName()) {
                System.debug('i am in status summary');
                trackingObj.EventCode= ParseUSPSTrackSummaryXML(USPSTrackingXMLReader);
                
            }
            
            USPSTrackingXMLReader.next();
            
            } 

            return trackingObj;    
    } // ParseUSPSAddressXML

    private static String ParseUSPSTrackSummaryXML(XMLStreamReader USPSTrackingXMLReader) 
    {
        String eventCode ='';
        while(USPSTrackingXMLReader.hasNext()) {
            if (USPSTrackingXMLReader.getEventType() == XmlTag.END_ELEMENT) {
                if ('TrackSummary' == USPSTrackingXMLReader.getLocalName()) {
                    // quit parsing when we hit the end of this record              
                    break;
                } // check for address ending tag
            
            } else if ('EventCode' == USPSTrackingXMLReader.getLocalName()) {
                System.debug('i am in event code');
                USPSTrackingXMLReader.next();
                
                if (USPSTrackingXMLReader.getEventType() == XmlTag.CHARACTERS) {
                    system.Debug('--event code--: ' +  USPSTrackingXMLReader.getText());                
                    eventCode= USPSTrackingXMLReader.getText();
                } // check
            }
            
            USPSTrackingXMLReader.next();
            
            } // loop thru XML reader

            return eventCode;    
    } 
    private static USPSTrack ParserUSPSTrackErrorXML(XMLStreamReader USPSErrorXMLReader) 
    {

        USPSTrack ReturnTracking = new USPSTrack();
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
                    ReturnTracking.USPS_ERROR_CODE = USPSErrorXMLReader.getText();
                } // check for data
            } else if ('Description' == USPSErrorXMLReader.getLocalName()) 
                {
                
                USPSErrorXMLReader.next();
                
                if (USPSErrorXMLReader.getEventType() == XmlTag.CHARACTERS) 
                {
                    system.Debug('Error Description: ' + USPSErrorXMLReader.getText());             
                    ReturnTracking.USPS_ERROR_DESC = USPSErrorXMLReader.getText();
                } 
            } 
            
            USPSErrorXMLReader.next();
            
            } 

        return ReturnTracking;      

    }*/ // ParserUSPSTrackErrorXML
@AuraEnabled
public static USPSTrack GetTrackingDetails(String trackId) 
{
        System.debug('--I am in get TRacking details--');
        //line no -----------TO BE REMOVED BEFORE PRODUCTION-------------------------------
        //cLASS Name: TrackShipment
        //Tracking id is hardcoded because tracking id returned by EVSlABEL api is not trackable.
        //taking tracking id as default tracking id:= 9400111298370071281345
       // trackId='9400111298370071281345';
       // --------------------------------------------
       // String USERID='255IZOOT6301'; 
      
        
    
       String userid;
        USPSTrack ShipmentToTrack;  
        USPSTrack ResponseTrack = new USPSTrack();
       
        // Organization org = [SELECT Id, IsSandbox FROM Organization LIMIT 1];
        //     if (org.IsSandbox == true || Test.isRunningTest()) 
        //     {
        //         System.debug('SANDBOX VALUE IS-----'+org.IsSandbox);
        //         trackId='9400111298370071281345';
              
        //     } 
                // string USPSURL = BuildTrackShipmentURLString(ShipmentToTrack,userid,trackId);
                // string XMLResponse = GetTrackStatusFromUSPS(USPSURL);
                // ResponseTrack = ParseUSPSResponseXML(XMLResponse);
        
        //Following code line should only be un-commented for specific testing
        //Always keep it commented to avoid to move un-commented code to Production.
        //trackId='9400111298370071281345';
    
        /*string USPSURL = BuildTrackShipmentURLString(ShipmentToTrack,userid,trackId);
        string XMLResponse = GetTrackStatusFromUSPS(USPSURL);
        ResponseTrack = ParseUSPSResponseXML(XMLResponse);*/
    
        // Fetch access token
        String accessToken = USPSLabelAccessToken.requestAccessToken(grantType, clientId, clientSecret, endPointAccessToken);
        System.debug('AccessToken: ' + accessToken);
    
        HttpResponse httpTrackingAPIresp;
        try{ 
            httpTrackingAPIresp = USPSTrackingAPI(trackId,accessToken);
        }
        catch(Exception e){
            ResponseTrack.USPS_Returned_Error = true;
            ResponseTrack.USPS_ERROR_DESC = 'Error in Tracking';
            ResponseTrack.USPS_ERROR_SOURCE = 'Tracking Error';
            ResponseTrack.USPS_ERROR_CODE = '-1';
        }
    
           if (httpTrackingAPIresp != null && httpTrackingAPIresp.getStatusCode() == 200) {
               System.debug('uspsAddResp: ' + httpTrackingAPIresp.getBody());
               Map<String, Object> uspsTrackRespm =  (Map<String, Object>) JSON.deserializeUntyped(httpTrackingAPIresp.getBody());
               String statusCategory =  (String)uspsTrackRespm.get('statusCategory');
               String trackingNumber =  (String)uspsTrackRespm.get('trackingNumber');
               String statusSummary =  (String)uspsTrackRespm.get('statusSummary');
               //List<Map<String, Object>> trackingEvents=  (List<Map<String, Object>>)uspsTrackRespm.get('trackingEvents');
               List<Object> trackingEventsRaw = (List<Object>)uspsTrackRespm.get('trackingEvents');
               ResponseTrack.StatusCategory = statusCategory;
               ResponseTrack.TrackID = trackingNumber;
               ResponseTrack.StatusSummary = statusSummary; 
               ResponseTrack.TrackSummary = statusSummary; 
               String eventCode = '';
               if (trackingEventsRaw != null && trackingEventsRaw.size() > 0) {
                    Map<String, Object> firstEvent = (Map<String, Object>) trackingEventsRaw[0];
                    eventCode = (String)firstEvent.get('eventCode');
                }
               ResponseTrack.EventCode = eventCode;
               System.debug('ResponseTrack: ' + ResponseTrack);
           }
      else{
           System.debug('uspsAddErrResp: ' + httpTrackingAPIresp.getBody());
           Map<String, Object> uspsAddErrRespm =  (Map<String, Object>) JSON.deserializeUntyped(httpTrackingAPIresp.getBody());
           Map<String, Object> error =  (Map<String, Object>)uspsAddErrRespm.get('error');
           ResponseTrack.USPS_Returned_Error = true;
           ResponseTrack.USPS_ERROR_DESC =  (String)error.get('message');
           ResponseTrack.USPS_ERROR_SOURCE = 'API';
           ResponseTrack.USPS_ERROR_CODE = (String)error.get('code');
        
            /*if (ResponseTrack.USPS_Returned_Error == true) {
                system.debug('USPS_ERROR_CODE: ' + ResponseTrack.USPS_ERROR_CODE);
                system.debug('USPS_ERROR_DESC: ' + ResponseTrack.USPS_ERROR_DESC);
                system.debug('USPS_ERROR_SOURCE: ' + ResponseTrack.USPS_ERROR_SOURCE);
            }*/ // check for error code
      }
       return ResponseTrack;
    } 
    
    private static HttpResponse USPSTrackingAPI(String trackId,String accessToken){ 
        trackingURL=trackingURL+EncodingUtil.urlEncode(trackId, 'UTF-8')+'?expand=DETAIL';
		HttpRequest USPSRequest = new HttpRequest();
        Http USPSHttp = new Http();
        USPSRequest.setMethod('GET');
        USPSRequest.setEndpoint(trackingURL);
        USPSRequest.setHeader('Accept','application/json');
        USPSRequest.setHeader('Authorization','Bearer ' + accessToken);
        HttpResponse USPSResponse = USPSHttp.send(USPSRequest);
        return USPSResponse;
    }
}