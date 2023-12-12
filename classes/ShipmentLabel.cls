// Created By: {Girikon(Shweta Khunteta)}
// Created On: 12/07/2021
// Description/Purpose: Why and where it is used [TM-115]-It was created to  call  the  eVS Label API from 
// USPS It has the code which parse the USPS  eVS Label API.
// Methods: {buildShipmentLabelURLString,getLabelFromUSPS,parseUSPSLabelResponseXML,getLabel}
// Test Class: {ShipmentLabelTest} {Code Coverage:99%}

public with sharing class ShipmentLabel 
{
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
    //public  static String userid=integrationsettings.UserId__c;
    //System.debug('---user id--'+integrationsettings.UserId__c);
    public static string ZipCode5 ;
    public static string ZipCode4 ;
    public static string ZipCode ;
    public static String userid=ShipmentLabel.integrationsettings.UserId__c;
    public static String LabelServiceApi=ShipmentLabel.integrationsettings.Label_Service_Api__c;
    public static String UspsUrl=ShipmentLabel.integrationsettings.eVSLabelUrl__c;
    public static String MindcrowdName= ShipmentLabel.integrationsettings.MindCrowdName__c;
    public static String MindcrowdFirmName=ShipmentLabel.integrationsettings.MindCrowdFirmName__c;
    public static String MindcrowdAddress2=ShipmentLabel.integrationsettings.MindCrowdAddress2__c;
    public static String MindcrowdCity=ShipmentLabel.integrationsettings.MindCrowdCity__c;
    public static String MindcrowdState=ShipmentLabel.integrationsettings.MindCrowdState__c;
    public static Integer MindcrowdZip = Integer.valueOf(ShipmentLabel.integrationsettings.MindCrowdZip5__c);
    public static String MindcrowdPhone='6023438400';//ShipmentLabel.integrationsettings.MindCrowdPhone__c;
    public static String MindCrowdImageParam= ShipmentLabel.integrationsettings.Image_Parameters__c;
    
    //method to build a request URL FOR EVS Label api which accepts id,contact Address and the campaign type  
    public static String buildShipmentLabelURLString(String Ids,Address addr,Research_Campaign__c campaign,String contactName) 
    {  
        
        if(addr.Postalcode!=null){
           ZipCode = addr.Postalcode;
            if(ZipCode.contains('-')){
                List<String> splitString = ZipCode.split('-');
                ZipCode5 = splitString.get(0);
                ZipCode4 = splitString.get(1);
            }
            else{
                ZipCode5 = addr.Postalcode;
            }
        }
        //custom settings
        String ReturnValue='';
        //below variables are stored in custom settings.
        
        System.debug('---user id--'+integrationsettings.UserId__c);
        system.debug('---ZipCode5--'+ZipCode5);
        //---------------------------------
        // String userid=integrationsettings.UserId__c;
        // System.debug('---user id--'+integrationsettings.UserId__c);
        // String LabelServiceApi=ShipmentLabel.integrationsettings.Label_Service_Api__c;
        // String UspsUrl=ShipmentLabel.integrationsettings.eVSLabelUrl__c;
        // String MindcrowdName= ShipmentLabel.integrationsettings.MindCrowdName__c;
        // String MindcrowdFirmName=ShipmentLabel.integrationsettings.MindCrowdFirmName__c;
        // String MindcrowdAddress2=ShipmentLabel.integrationsettings.MindCrowdAddress2__c;
        // String MindcrowdCity=ShipmentLabel.integrationsettings.MindCrowdCity__c;
        // String MindcrowdState=ShipmentLabel.integrationsettings.MindCrowdState__c;
        // Integer MindcrowdZip = Integer.valueOf(ShipmentLabel.integrationsettings.MindCrowdZip5__c);
        // String MindcrowdPhone=ShipmentLabel.integrationsettings.MindCrowdPhone__c;
        //--------------------------------------------------------------------
        // Integer weight= Integer.valueOf(ShipmentLabel.integrationsettings.Weight__c);
        // String evsservicetype =ShipmentLabel.integrationsettings.eVSLabel_Service__c;
        System.debug('uspsurl '+UspsUrl);
        
        String BaseURL =UspsUrl + '?API='+LabelServiceApi+'&XML=';
        ReturnValue = '<'+LabelServiceApi+'Request USERID="'+userid+'">';
        // ReturnValue+= '<ImageParameters><ImageParameter>4X6LABELP</ImageParameter></ImageParameters>';
        ReturnValue+= '<ImageParameters><ImageParameter>'+MindCrowdImageParam+'</ImageParameter></ImageParameters>';
        ReturnValue+='<FromName>'+MindcrowdName+'</FromName>';
        ReturnValue+='<FromFirm>'+MindcrowdFirmName+'</FromFirm>';
        ReturnValue+='<FromAddress1/>';
        ReturnValue+='<FromAddress2>'+MindcrowdAddress2+'</FromAddress2>';
        ReturnValue+='<FromCity>'+MindcrowdCity+'</FromCity>';
        ReturnValue+='<FromState>'+MindcrowdState+'</FromState>';
        ReturnValue+='<FromZip5>'+MindcrowdZip+'</FromZip5>';
        ReturnValue+='<FromZip4/>';
        // ReturnValue+='<FromPhone>6023438400</FromPhone>';
        ReturnValue+='<FromPhone>'+MindcrowdPhone+'</FromPhone>';
        // // ReturnValue+='<Number>'+USPS_ERROR_CODE+'</Number>';
        //  ReturnValue+='<Source>'+USPS_ERROR_SOURCE+'</Source>';
        //  ReturnValue+='<Description>'+USPS_ERROR_DESC+'</Description>';
        
        
        
        
        
        
        ReturnValue+='<ToName>'+contactName+'</ToName>';
        ReturnValue+='<ToFirm>'+contactName+'</ToFirm>';
        ReturnValue+='<ToAddress1/>';
        ReturnValue+='<ToAddress2>'+addr.Street+'</ToAddress2>';
        ReturnValue+='<ToCity>'+addr.City+'</ToCity>';
        ReturnValue+='<ToState>'+addr.StateCode+'</ToState>';
        ReturnValue+='<ToZip5>'+ZipCode5+'</ToZip5>';
        if(ZipCode4!=null){
            ReturnValue+='<ToZip4>'+ZipCode4+'</ToZip4>';
        }else{
            ReturnValue+='<ToZip4/>';
        }
        
        ReturnValue+='<ToPhone>2125551234</ToPhone>';
        ReturnValue+='<WeightInOunces>'+campaign.Weight_in_Ounces__c+'</WeightInOunces>';
        ReturnValue+='<ServiceType>'+campaign.Usps_Service_Type__c+'</ServiceType>';
        ReturnValue+='<ImageType>TIF</ImageType>';
        ReturnValue+='<NineDigitRoutingZip/></'+LabelServiceApi+'Request>';
        ReturnValue = EncodingUtil.urlEncode(ReturnValue, 'UTF-8');
        ReturnValue = BaseURL + ReturnValue; 
        return ReturnValue;
        
    }
    public static String buildReturnShipmentURLString (String Ids,Address addr,Research_Campaign__c campaign, String contactName) 
    {
        
        String ReturnValue='';
        String BaseURL =UspsUrl + '?API='+LabelServiceApi+'&XML=';
        ReturnValue = '<'+LabelServiceApi+'Request USERID="'+userid+'">';
        // ReturnValue+= '<ImageParameters><ImageParameter>4X6LABELP</ImageParameter></ImageParameters>';
        ReturnValue+= '<ImageParameters><ImageParameter>'+MindCrowdImageParam+'</ImageParameter></ImageParameters>';
        ReturnValue+='<FromName>'+contactName+'</FromName>';
        ReturnValue+='<FromFirm>'+contactName+'</FromFirm>';
        ReturnValue+='<FromAddress1/>';
        ReturnValue+='<FromAddress2>'+addr.Street+'</FromAddress2>';
        ReturnValue+='<FromCity>'+addr.City+'</FromCity>';
        ReturnValue+='<FromState>'+addr.StateCode+'</FromState>';
        ReturnValue+='<FromZip5>'+addr.PostalCode+'</FromZip5>';
        ReturnValue+='<FromZip4/>';
        ReturnValue+='<FromPhone>6023438400</FromPhone>';
        ReturnValue+='<ToName>'+MindcrowdName+'</ToName>';
        ReturnValue+='<ToFirm>'+MindcrowdFirmName+'</ToFirm>';
        ReturnValue+='<ToAddress1/>';
        ReturnValue+='<ToAddress2>'+MindcrowdAddress2+'</ToAddress2>';
        ReturnValue+='<ToCity>'+MindcrowdCity+'</ToCity>';
        ReturnValue+='<ToState>'+MindcrowdState+'</ToState>';
        ReturnValue+='<ToZip5>'+MindcrowdZip+'</ToZip5>';
        ReturnValue+='<ToZip4 />';
        //  ReturnValue+='<ToPhone>2125551234</ToPhone>';
        ReturnValue+='<ToPhone>'+MindcrowdPhone+'</ToPhone>';
        ReturnValue+='<WeightInOunces>'+campaign.Weight_in_Ounces__c+'</WeightInOunces>';
        ReturnValue+='<ServiceType>'+campaign.Usps_Service_Type__c+'</ServiceType>';
        ReturnValue+='<ImageType>TIF</ImageType>';
        ReturnValue+='<NineDigitRoutingZip/></'+LabelServiceApi+'Request>';
        ReturnValue = EncodingUtil.urlEncode(ReturnValue, 'UTF-8');
        ReturnValue = BaseURL + ReturnValue; 
        return ReturnValue;
        
    }
    
    public static string getLabelFromUSPS(String url) 
    {
        string ReturnValue = '';  
        HttpRequest USPSRequest = new HttpRequest();
        Http USPSHttp = new Http();
        USPSRequest.setMethod('GET');
        USPSRequest.setEndpoint(url);
        HttpResponse USPSResponse = USPSHttp.send(USPSRequest);
        ReturnValue = USPSResponse.getBody();  
        //system.debug('XML Response was: ' + ReturnValue);
        // system.debug('-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-');
        return ReturnValue;
    }
    
    //function to parse the response return by evsLabel API.
    public static USPSLabel parseUSPSLabelResponseXML(String XMLToParse, Boolean isReturnLabel) 
    {   
        Pattern p = Pattern.compile('\n');
        Matcher m = p.matcher(XMLToParse);
        XMLToParse = m.replaceAll('');
        System.debug('xml to parse-----104------'+XMLToParse);
        USPSLabel ReturnLabel = new USPSLabel();
        // parse the response
        
        XMLStreamReader USPSXMLReader = new XMLStreamReader(XMLToParse);
        while (USPSXMLReader.hasNext()) 
        {
            
            if (USPSXMLReader.getEventType() == XmlTag.START_ELEMENT) 
            {
                System.debug('evs certify===>'+USPSXMLReader.getLocalName());
                System.debug('evs XmlTag.LabelServiceApi===>'+ShipmentLabel.integrationsettings.Label_Service_Api__c);
                if (ShipmentLabel.integrationsettings.Label_Service_Api__c+'Response' == USPSXMLReader.getLocalName()) 
                {    
                    USPSXMLReader.next();
                    while (USPSXMLReader.hasNext()) 
                    {
                        if (USPSXMLReader.getEventType() == XmlTag.END_ELEMENT) 
                        {
                            if (ShipmentLabel.integrationsettings.Label_Service_Api__c+'Response' == USPSXMLReader.getLocalName()) 
                            {
                                // quit parsing when we hit the end of this record            
                                break;
                            }
                        } 
                        else  if ('ToAddress1' == USPSXMLReader.getLocalName() && !isReturnLabel) 
                        {
                            System.debug('ToAddress1');
                            USPSXMLReader.next();
                            if (USPSXMLReader.getEventType() == XmlTag.CHARACTERS) 
                            {
                                system.Debug('ToAddress1: ' +  USPSXMLReader.getText());            
                                ReturnLabel.ToAddress1 = USPSXMLReader.getText();
                            }           
                        } 
                        else  if ('ToAddress2' == USPSXMLReader.getLocalName() && !isReturnLabel) 
                        {
                            System.debug('ToAddress2 ');
                            USPSXMLReader.next();
                            if (USPSXMLReader.getEventType() == XmlTag.CHARACTERS) 
                            {
                                system.Debug('ToAddress2: ' +  USPSXMLReader.getText());            
                                ReturnLabel.ToAddress2 = USPSXMLReader.getText();
                            }           
                        } 
                        else  if ('ToCity' == USPSXMLReader.getLocalName() && !isReturnLabel) 
                        {
                            System.debug('ToCity');
                            USPSXMLReader.next();
                            if (USPSXMLReader.getEventType() == XmlTag.CHARACTERS) 
                            {
                                system.Debug('ToCity: ' +  USPSXMLReader.getText());            
                                ReturnLabel.ToCity = USPSXMLReader.getText();
                            }           
                        } 
                        else  if ('ToState' == USPSXMLReader.getLocalName() && !isReturnLabel) 
                        {
                            System.debug('ToState');
                            USPSXMLReader.next();
                            if (USPSXMLReader.getEventType() == XmlTag.CHARACTERS) 
                            {
                                system.Debug('ToState: ' +  USPSXMLReader.getText());            
                                ReturnLabel.ToState = USPSXMLReader.getText();
                            }           
                        } 
                        else  if ('ToZip5' == USPSXMLReader.getLocalName() && !isReturnLabel) 
                        {
                            System.debug('ToZip5');
                            USPSXMLReader.next();
                            if (USPSXMLReader.getEventType() == XmlTag.CHARACTERS) 
                            {
                                system.Debug('ToZip5: ' +  USPSXMLReader.getText());            
                                ReturnLabel.ToZip5 = USPSXMLReader.getText();
                            }           
                        } 
                        else  if ('ToZip4' == USPSXMLReader.getLocalName() && !isReturnLabel) 
                        {
                            System.debug('ToZip4');
                            USPSXMLReader.next();
                            if (USPSXMLReader.getEventType() == XmlTag.CHARACTERS) 
                            {
                                system.Debug('ToZip4: ' +  USPSXMLReader.getText());            
                                ReturnLabel.ToZip4 = USPSXMLReader.getText();
                            }           
                        } 
                        else  if ('RDC' == USPSXMLReader.getLocalName()) 
                        {
                            System.debug('RDC');
                            USPSXMLReader.next();
                            if (USPSXMLReader.getEventType() == XmlTag.CHARACTERS) 
                            {
                                system.Debug('RDC: ' +  USPSXMLReader.getText());            
                                ReturnLabel.RDC = USPSXMLReader.getText();
                            }           
                        } 
                        else  if ('CarrierRoute' == USPSXMLReader.getLocalName()) 
                        {
                            System.debug('CarrierRoute');
                            USPSXMLReader.next();
                            if (USPSXMLReader.getEventType() == XmlTag.CHARACTERS) 
                            {
                                system.Debug('CarrierRoute: ' +  USPSXMLReader.getText());            
                                ReturnLabel.CarrierRoute = USPSXMLReader.getText();
                            }           
                        } 
                        else  if ('BarcodeNumber' == USPSXMLReader.getLocalName()) 
                        {
                            System.debug('barcode number');
                            USPSXMLReader.next();
                            if (USPSXMLReader.getEventType() == XmlTag.CHARACTERS) 
                            {
                                system.Debug('Barcode: ' +  USPSXMLReader.getText());            
                                ReturnLabel.BarcodeNumber = USPSXMLReader.getText();
                            }           
                        } 
                        else  if ('LabelImage' == USPSXMLReader.getLocalName()) 
                        {
                            System.debug('label image');
                            USPSXMLReader.next();
                            if (USPSXMLReader.getEventType() == XmlTag.CHARACTERS) 
                            {
                                system.Debug('Label Image:---144--- ' +  USPSXMLReader.getText());
                                ReturnLabel.LabelImage = USPSXMLReader.getText();
                            }               
                        } 
                        else if ('Postage' == USPSXMLReader.getLocalName()) 
                        {
                            System.debug('in postage');
                            USPSXMLReader.next();
                            if (USPSXMLReader.getEventType() == XmlTag.CHARACTERS) 
                            {
                                system.Debug('Postage: ' +  USPSXMLReader.getText());            
                                ReturnLabel.Postage = USPSXMLReader.getText();
                            }
                        } 
                        USPSXMLReader.next();
                    }                          
                }  
                if ('Error' == USPSXMLReader.getLocalName())  {
                    System.debug('in postage');
                    USPSXMLReader.next();
                    while (USPSXMLReader.hasNext()) 
                    {
                        if (USPSXMLReader.getEventType() == XmlTag.END_ELEMENT) 
                        {
                            if ('Error' == USPSXMLReader.getLocalName()) 
                            {
                                // quit parsing when we hit the end of this record            
                                break;
                            }
                        } 
                        
                        else if ('Number' == USPSXMLReader.getLocalName()) 
                        {
                            System.debug('in Number');
                            USPSXMLReader.next();
                            if (USPSXMLReader.getEventType() == XmlTag.CHARACTERS) 
                            {
                                system.Debug('Number: ' +  USPSXMLReader.getText());            
                                ReturnLabel.USPS_ERROR_CODE = USPSXMLReader.getText();
                            }
                        }    
                        else if ('Description' == USPSXMLReader.getLocalName()) 
                        {
                            System.debug('in Description');
                            USPSXMLReader.next();
                            if (USPSXMLReader.getEventType() == XmlTag.CHARACTERS) 
                            {
                                system.Debug('Description: ' +  USPSXMLReader.getText());            
                                ReturnLabel.USPS_ERROR_DESC = USPSXMLReader.getText();
                            }
                        }    
                        else if ('Source' == USPSXMLReader.getLocalName()) 
                        {
                            System.debug('in Source');
                            USPSXMLReader.next();
                            if (USPSXMLReader.getEventType() == XmlTag.CHARACTERS) 
                            {
                                system.Debug('Source: ' +  USPSXMLReader.getText());            
                                ReturnLabel.USPS_ERROR_SOURCE = USPSXMLReader.getText();
                            }
                        } 
                        USPSXMLReader.next();
                    }  
                } 
                
            } 
            USPSXMLReader.next();
        }
        return ReturnLabel;
    } 
    
    public static Boolean getLabel(Map<String,Address> IdAddressMap, Map<String,Research_Campaign__c> IdCampaignMap, Map<String,String> idContactNameMap)
    {
        System.debug('values of selected id with contact info from vf are--'+IdAddressMap);
        System.debug('values of selected id with research campaign info from vf are--'+IdCampaignMap);
        USPSLabel ResponseLabel = new USPSLabel();
        USPSLabel ReturnLabelResponse= new USPSLabel();
        Map<ID,USPSLabel> idResponseMap = new Map<ID,USPSLabel>();
        //------poc for return label---
        Map<Id,USPSLabel> idReturnResponseMap = new Map<Id,USPSLabel>();
        //------------------------------
        for (String shipId : IdAddressMap.keySet()) 
        {
            // for(String shipIdCampaign:IdCampaignMap.keySet())
            // {   
            System.debug('values of idcampaign map are---'+IdCampaignMap.values());
            System.debug('values of idcampaign map are---'+IdCampaignMap.get(shipId));
            Research_Campaign__c rc=IdCampaignMap.get(shipId);
            System.debug('---return value---'+rc.isReturnLabelNeeded__c);
            
            String USPSLabelURL = buildShipmentLabelURLString(shipId,IdAddressMap.get(shipId),IdCampaignMap.get(shipId),idContactNameMap.get(shipId));
            System.debug('url is ---'+USPSLabelURL);
            string XMLLabelResponse = getLabelFromUSPS(USPSLabelURL);
            System.debug('---getLabelFromUSPS--180--'+XMLLabelResponse);
            ResponseLabel = parseUSPSLabelResponseXML(XMLLabelResponse,false);
            System.debug('parsed response FOR ONE WAY---'+ResponseLabel);
            //this map holds the value of shipping id as key and corresponding response label as value.
            idResponseMap.put(shipId, ResponseLabel);
            //------------------ to test for two labels redundant code--------
            System.debug('Map response--'+idResponseMap);
            // for(Id id :idResponseMap.keySet())
            // {
            //     USPSLabel mapValue=idResponseMap.get(id);
            //     System.debug(id);
            //     System.debug(idResponseMap.get(id));
            //     if (mapValue.USPS_Returned_Error == true) 
            //         {
            //             system.debug('USPS_ERROR_CODE: ' + mapValue.USPS_ERROR_CODE);
            //             system.debug('USPS_ERROR_DESC: ' + mapValue.USPS_ERROR_DESC);
            //             system.debug('USPS_ERROR_SOURCE: ' + mapValue.USPS_ERROR_SOURCE);
            //         }  
            //     else{    
            //     ShippingDetailsController.changeShipmentStatusToCreateLabel(id,mapValue.BarcodeNumber,mapValue.Postage,mapValue.LabelImage);
            //     }
            // }
            
            //---------------------------------------------------------------------------            
            if(rc.isReturnLabelNeeded__c==true){
                String USPSLabelReturnURL=buildReturnShipmentURLString(shipId,IdAddressMap.get(shipId),IdCampaignMap.get(shipId),idContactNameMap.get(shipId));
                System.debug('----Return label url ---'+USPSLabelReturnURL);
                String XMLReturnLabelResponse= getLabelFromUSPS(USPSLabelReturnURL);
                ReturnLabelResponse=parseUSPSLabelResponseXML(XMLReturnLabelResponse,true); 
                // System.debug('parsed  response FOR RETURN LABEL---'+XMLReturnLabelResponse);   
            }
            idReturnResponseMap.put(shipId,ReturnLabelResponse);
            
            //}   
        }
        
        System.debug('Map response--'+idResponseMap);
        System.debug('return label Map response---'+idReturnResponseMap);    
        
        for(Id id :idResponseMap.keySet())
        {
            USPSLabel mapValue=idResponseMap.get(id);
            System.debug(id);
            System.debug(idResponseMap.get(id));
            System.debug('  mapValue.USPS_Returned_Error response---'+ mapValue.USPS_Returned_Error);
            if (mapValue.ToAddress2 == '')
            {
                system.debug('USPS_ERROR_CODE: ' + mapValue.USPS_ERROR_CODE);
                system.debug('USPS_ERROR_DESC: ' + mapValue.USPS_ERROR_DESC);
                system.debug('USPS_ERROR_SOURCE: ' + mapValue.USPS_ERROR_SOURCE);
                ShippingDetailsController.changeShipmentStatusToFail(id,mapValue.USPS_ERROR_CODE,mapValue.USPS_ERROR_DESC,mapValue.USPS_ERROR_SOURCE);
            }  
            else{    
                ShippingDetailsController.changeShipmentStatusToCreateLabel(id,
                                                                            mapValue.ToAddress1,
                                                                            mapValue.ToAddress2,
                                                                            mapValue.ToCity,
                                                                            mapValue.ToState,
                                                                            mapValue.ToZip5,
                                                                            mapValue.ToZip4,
                                                                            mapValue.RDC,
                                                                            mapValue.CarrierRoute,
                                                                            mapValue.BarcodeNumber,mapValue.Postage,mapValue.LabelImage);
            }
        }
        
        //-------------------for poc return label-------
        for(Id id :idReturnResponseMap.keySet())
        {
            USPSLabel returnmapValue=idReturnResponseMap.get(id);
            System.debug(id);
            System.debug(idReturnResponseMap.get(id));
            if (returnmapValue.ToAddress2 == '') 
            {
                system.debug('USPS_ERROR_CODE: ' + returnmapValue.USPS_ERROR_CODE);
                system.debug('USPS_ERROR_DESC: ' + returnmapValue.USPS_ERROR_DESC);
                system.debug('USPS_ERROR_SOURCE: ' + returnmapValue.USPS_ERROR_SOURCE);
                //ShippingDetailsController.changeShipmentStatusToFail(id,returnmapValue.USPS_ERROR_CODE,returnmapValue.USPS_ERROR_DESC,returnmapValue.USPS_ERROR_SOURCE);
            }  
            else{    
                ShippingDetailsController.changeShipmentStatusToCreateReturnLabel(id,
                                                                                  returnmapValue.RDC,
                                                                                  returnmapValue.CarrierRoute,        
                                                                                  returnmapValue.BarcodeNumber,returnmapValue.Postage,returnmapValue.LabelImage);
            }
        }
        //------------------------------------------------------
        
        return true;
        
    } 
}