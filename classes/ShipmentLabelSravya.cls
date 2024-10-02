// Created By: {Girikon(Shweta Khunteta)}
// Created On: 12/07/2021
// Description/Purpose: Why and where it is used [TM-115]-It was created to  call  the  eVS Label API from 
// USPS It has the code which parse the USPS  eVS Label API.
// Methods: {buildShipmentLabelURLString,getLabelFromUSPS,parseUSPSLabelResponseXML,getLabel}
// Test Class: {ShipmentLabelTest} {Code Coverage:99%}

public with sharing class ShipmentLabelSravya
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
    public static String password=ShipmentLabel.integrationsettings.Password__c;
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
        System.debug('---user id--'+integrationsettings.Password__c);
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
        ReturnValue = '<' + LabelServiceApi + 'Request USERID="' + userid + '" PASSWORD="' + password + '">';
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
        ReturnValue = '<'+LabelServiceApi+'Request USERID="'+userid+'" PASSWORD="' + password + '">';
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
    public static USPSLabelSravya getLabelFromUSPS(String url) 
    {
        USPSLabelSravya ReturnValue;
        //ShipmentLabelSravya1 ReturnValue;  
        HttpRequest USPSRequest = new HttpRequest();
        Http USPSHttp = new Http();
        USPSRequest.setMethod('GET');
        USPSRequest.setEndpoint(url);
        HttpResponse USPSResponse = USPSHttp.send(USPSRequest);
        System.debug('Response Body:: '+USPSResponse.getBody());
        ReturnValue = (USPSLabelSravya)JSON.deserialize(USPSResponse.getBody(), USPSLabelSravya.class);
        //ReturnValue = USPSResponse.getBody();  
        //system.debug('XML Response was: ' + ReturnValue);
        // system.debug('-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-');
        return ReturnValue;
    }
    public static Boolean getLabel(Map<String,Address> IdAddressMap, Map<String,Research_Campaign__c> IdCampaignMap, Map<String,String> idContactNameMap)
    {
        System.debug('values of selected id with contact info from vf are--'+IdAddressMap);
        System.debug('values of selected id with research campaign info from vf are--'+IdCampaignMap);
        USPSLabelSravya JSONReturnLabelResponse;
    	Map<ID,USPSLabelSravya> idResponseMap = new Map<ID,USPSLabelSravya>();
        //------poc for return label---
        Map<Id,USPSLabelSravya> idReturnResponseMap = new Map<Id,USPSLabelSravya>();
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
            USPSLabelSravya JSONLabelResponse = getLabelFromUSPS(USPSLabelURL);
            //System.debug('---getLabelFromUSPS--180--'+XMLLabelResponse);
            //ResponseLabel = parseUSPSLabelResponseXML(XMLLabelResponse,false);
            //System.debug('parsed response FOR ONE WAY---'+ResponseLabel);
            //this map holds the value of shipping id as key and corresponding response label as value.
            idResponseMap.put(shipId, JSONLabelResponse);
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
                JSONReturnLabelResponse= getLabelFromUSPS(USPSLabelReturnURL);
                //ReturnLabelResponse=parseUSPSLabelResponseXML(XMLReturnLabelResponse,true); 
                // System.debug('parsed  response FOR RETURN LABEL---'+XMLReturnLabelResponse);   
            }
            idReturnResponseMap.put(shipId,JSONReturnLabelResponse);
            
            //}   
        }
        
        System.debug('Map response--'+idResponseMap);
        System.debug('return label Map response---'+idReturnResponseMap);    
        
        for(Id id :idResponseMap.keySet())
        {
            USPSLabelSravya mapValue=idResponseMap.get(id);
            System.debug(id);
            System.debug(idResponseMap.get(id));
            System.debug('  mapValue.USPS_Returned_Error response---'+ mapValue.error.message);
            if (mapValue.labelMetadata.labelAddress.streetAddress == '')
            {
                system.debug('USPS_ERROR_CODE: ' + mapValue.error.code);
                system.debug('USPS_ERROR_DESC: ' + mapValue.error.errors);
                system.debug('USPS_ERROR_SOURCE: ' + mapValue.error.errors);
                ShippingDetailsController.changeShipmentStatusToFail(id,mapValue.error.code,mapValue.error.code,mapValue.error.code);
            }  
            else{    
                ShippingDetailsController.changeShipmentStatusToCreateLabel(id,
                                                                            mapValue.labelMetadata.labelAddress.streetAddress,
                                                                            mapValue.labelMetadata.labelAddress.secondaryAddress,
                                                                            mapValue.labelMetadata.labelAddress.city,
                                                                            mapValue.labelMetadata.labelAddress.state,
                                                                            mapValue.labelMetadata.labelAddress.ZIPCode,
                                                                            mapValue.labelMetadata.labelAddress.ZIPPlus4,
                                                                            mapValue.labelMetadata.SKU,
                                                                            mapValue.labelMetadata.routingInformation,
                                                                            mapValue.labelMetadata.trackingNumber,
                                                                            mapValue.labelMetadata.zone,
                                                                            mapValue.labelImage);
            }
        }
        
        //-------------------for poc return label-------
        for(Id id :idReturnResponseMap.keySet())
        {
            USPSLabelSravya returnmapValue=idReturnResponseMap.get(id);
            System.debug(id);
            System.debug(idReturnResponseMap.get(id));
            if (returnmapValue.labelMetadata.labelAddress.streetAddress == '') 
            {
                /*system.debug('USPS_ERROR_CODE: ' + returnmapValue.USPS_ERROR_CODE);
                system.debug('USPS_ERROR_DESC: ' + returnmapValue.USPS_ERROR_DESC);
                system.debug('USPS_ERROR_SOURCE: ' + returnmapValue.USPS_ERROR_SOURCE);*/
                system.debug('USPS_ERROR_CODE: ' + returnmapValue.error.code);
                system.debug('USPS_ERROR_DESC: ' + returnmapValue.error.errors);
                system.debug('USPS_ERROR_SOURCE: ' + returnmapValue.error.errors);
                //ShippingDetailsController.changeShipmentStatusToFail(id,returnmapValue.USPS_ERROR_CODE,returnmapValue.USPS_ERROR_DESC,returnmapValue.USPS_ERROR_SOURCE);
            }  
            else{    
                ShippingDetailsController.changeShipmentStatusToCreateReturnLabel(id,
                                                                                  returnmapValue.returnLabelMetadata.SKU,
                                                                                  returnmapValue.returnLabelMetadata.routingInformation,        
                                                                                  returnmapValue.returnLabelMetadata.trackingNumber,
                                                                                  returnmapValue.returnLabelMetadata.zone,
                                                                                  returnmapValue.returnLabelImage);
            }
        }
        //------------------------------------------------------
        
        return true;
        
    }
}