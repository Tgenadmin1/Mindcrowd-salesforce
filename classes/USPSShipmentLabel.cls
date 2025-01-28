// Created By: Sravya
// Created On: 09/25/2024
// Modified By: Sibi
// Description/Purpose:  USPS Label API to generate Labels
// Test Class: USPSShipmentLabelTest

public with sharing class USPSShipmentLabel 
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
    public static String MindcrowdPhone='6023438400';
    public static String MindCrowdImageParam= ShipmentLabel.integrationsettings.Image_Parameters__c;
    public static String grantType= ShipmentLabel.integrationsettings.grant_type__c;
    public static String clientId= ShipmentLabel.integrationsettings.client_id__c;
    public static String clientSecret= ShipmentLabel.integrationsettings.client_secret__c;
    public static String endPointAccessToken= ShipmentLabel.integrationsettings.AccessToken_url__c;
    public static String CRID= ShipmentLabel.integrationsettings.CRID__c;
    public static String payerRoleName= ShipmentLabel.integrationsettings.Role_Name_P__c;
    public static String labelOwnerRoleName= ShipmentLabel.integrationsettings.Role_Name_LO__c;
    public static String MID= ShipmentLabel.integrationsettings.MID__c;
    public static String manifestMID= ShipmentLabel.integrationsettings.Manifest_MID__c;
    public static String accountType= ShipmentLabel.integrationsettings.Account_Type__c;
    public static String accountNumber= ShipmentLabel.integrationsettings.Account_Number__c;
    public static String endPointPaymentToken= ShipmentLabel.integrationsettings.Payment_Access_Token_URL__c;
    public static String endUSPSLabelAPI= ShipmentLabel.integrationsettings.USPS_Label_API_URL__c;
    public static String ProcessingCategory = ShipmentLabel.integrationsettings.Processing_Category__c; 
    
    public static Boolean getLabel(Map<String,Address> IdAddressMap, Map<String,Research_Campaign__c> IdCampaignMap, Map<String,String> idContactNameMap)
    {
        System.debug('values of selected id with contact info from vf are--'+IdAddressMap);
        System.debug('values of selected id with research campaign info from vf are--'+IdCampaignMap);
        USPSLabel ResponseLabel = new USPSLabel();
        Map<ID,USPSLabel> idResponseMap = new Map<ID,USPSLabel>();
        String authToken = USPSLabelAccessToken.requestAccessToken(grantType,clientId,clientSecret,endPointAccessToken);
        System.debug('authToken=>' +authToken);
        String paymentToken=null;
        if(authToken !=null){
            paymentToken = USPSPaymentLabelAccessToken.requestPaymentToken(authToken, CRID, payerRoleName, labelOwnerRoleName, MID, manifestMID, accountType,accountNumber,endPointPaymentToken);
            System.debug('paymentToken=>' +paymentToken);
        }
        if(authToken !=null && paymentToken !=null){
            for (String shipId : IdAddressMap.keySet()) 
            {
                System.debug('values of idcampaign map are---'+IdCampaignMap.values());
                System.debug('values of idcampaign map are---'+IdCampaignMap.get(shipId));
                Research_Campaign__c rc=IdCampaignMap.get(shipId);
                ResponseLabel = CreateUSPSLabel(shipId,IdAddressMap.get(shipId),IdCampaignMap.get(shipId),
                                                        idContactNameMap.get(shipId),endUSPSLabelAPI,authToken,paymentToken);
                System.debug('parsed response FOR ONE WAY---'+ResponseLabel);
                idResponseMap.put(shipId, ResponseLabel);
                System.debug('Map response--'+idResponseMap); 
            }            
            System.debug('Map response--'+idResponseMap);
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

    	}
        return true;        
    }    
    
    public static USPSLabel CreateUSPSLabel(String Ids,Address addr,Research_Campaign__c campaign,String contactName, String endPoint, String authToken,
                                           String paymentToken) {
			try
			{
            USPSLabel ResponseLabel = new USPSLabel(); 
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
            Http http = new Http();
            HttpRequest httpRequest = new HttpRequest();
            httpRequest.setEndpoint(endPoint);
            httpRequest.setMethod('POST');
            httpRequest.setHeader('Content-Type', 'application/json');
            httpRequest.setHeader('Accept','application/vnd.usps.labels+json');
            httpRequest.setHeader('X-Payment-Authorization-Token', paymentToken);  
            httpRequest.setHeader('Authorization','Bearer ' + authToken);
            USPSLabelRequest uspsLabelrequest = new USPSLabelRequest();    
            USPSLabelRequest.ImageInfo imageInfo = new USPSLabelRequest.ImageInfo();
            imageInfo.imageType = 'SVG';
            imageInfo.labelType = MindCrowdImageParam;
            uspsLabelrequest.imageInfo = imageInfo;  
            USPSLabelRequest.ToAddress toAddress = new USPSLabelRequest.ToAddress();
            toAddress.streetAddress = addr.Street;
            toAddress.secondaryAddress = '';
            toAddress.city = addr.City;
            toAddress.state = addr.StateCode;
            toAddress.ZIPCode = ZipCode5;
            if(ZipCode4!=null){
                toAddress.ZIPPlus4 = ZipCode4;
            }else{
                toAddress.ZIPPlus4 = null;
            }
            toAddress.firstName = contactName;
            toAddress.lastName = contactName;
            toAddress.firm = contactName;
            toAddress.phone = '+15551234567';
            uspsLabelrequest.toAddress = toAddress;   
            USPSLabelRequest.FromAddress fromAddress = new USPSLabelRequest.FromAddress();
            fromAddress.streetAddress = MindcrowdAddress2;
            fromAddress.secondaryAddress = '';
            fromAddress.city = MindcrowdCity;
            fromAddress.state = MindcrowdState;
            fromAddress.ZIPCode = String.valueof(MindcrowdZip);
            fromAddress.ZIPPlus4 = null;
            fromAddress.firstName = MindcrowdName;
            fromAddress.lastName = MindcrowdName;
            fromAddress.firm = MindcrowdFirmName;
            fromAddress.phone = MindcrowdPhone;
            uspsLabelrequest.fromAddress = fromAddress;
            USPSLabelRequest.PackageDescription packageDescription = new USPSLabelRequest.PackageDescription();
            packageDescription.mailClass = campaign.Usps_Service_Type__c;
            packageDescription.weight = (campaign.Weight_in_Ounces__c)/16;
            packageDescription.length = campaign.Length_in_Inches__c;
            packageDescription.width = campaign.Width_in_Inches__c;
            packageDescription.height = campaign.Height_in_Inches__c;
			packageDescription.girth = campaign.Girth_in_Inches__c;                   
            packageDescription.shape = campaign.Shape__c;
            packageDescription.weightUOM = 'lb';
            packageDescription.dimensionsUOM = 'in';
            packageDescription.packagingType = campaign.Packaging_Type__c;
            packageDescription.processingCategory = processingCategory;
            DateTime dt = DateTime.now();
            DateTime dtAdd7 = dt.addDays(6);
			String formattedDate = dtAdd7.format('yyyy-MM-dd');
            packageDescription.mailingDate = formattedDate;
            packageDescription.destinationEntryFacilityType = 'NONE';
            uspsLabelrequest.packageDescription = packageDescription;
            httpRequest.setBody(JSON.serialize(uspsLabelrequest));
            HttpResponse httpresponse = http.send(httpRequest);
            if (httpresponse.getStatusCode() != 200) {
                /*USPSApiErrorResponse response = (USPSApiErrorResponse)JSON.deserialize(httpresponse.getBody(), USPSApiErrorResponse.class);            
                USPSApiErrorResponse.Error errorDetails = response.error;
                ResponseLabel.USPS_ERROR_CODE = errorDetails.code;
                ResponseLabel.USPS_ERROR_DESC = errorDetails.message;
                ResponseLabel.USPS_Returned_Error = true;
                List<USPSApiErrorResponse.Errors> errorList = errorDetails.errors;            
                if (errorList.size()>0) {
                    ResponseLabel.USPS_ERROR_SOURCE = errorList[0].source;
                }*/
				ResponseLabel.USPS_Returned_Error = true;
                if(httpresponse.getBody().length()>2000){
                    ResponseLabel.USPS_ERROR_DESC = httpresponse.getBody().substring(0, 2000);
                }
                else{
                    ResponseLabel.USPS_ERROR_DESC = httpresponse.getBody();
                }
                ResponseLabel.USPS_ERROR_CODE = 'INTERFACE_ERROR';
                ResponseLabel.USPS_ERROR_SOURCE = 'USPS Label API';
                return ResponseLabel;
            } 
            else {
                USPSLabelResponse labelRresponse = (USPSLabelResponse)JSON.deserialize(httpresponse.getBody(), USPSLabelResponse.class);
                USPSLabelResponse.LabelAddress labelAddress = labelRresponse.labelAddress;
                ResponseLabel.ToAddress1=labelAddress.secondaryAddress;
                ResponseLabel.ToAddress2=labelAddress.streetAddress;
                ResponseLabel.ToCity=labelAddress.city;
                ResponseLabel.ToState=labelAddress.state;
                ResponseLabel.ToZip5=labelAddress.ZIPCode;
                ResponseLabel.ToZip4=labelAddress.ZIPPlus4;
                ResponseLabel.BarcodeNumber=labelRresponse.routingInformation+labelRresponse.trackingNumber;
                ResponseLabel.Postage=String.valueof(labelRresponse.postage);
                ResponseLabel.LabelImage=labelRresponse.labelImage;
                return ResponseLabel;            
        	}
			}
			catch(Exception e){
              USPSLabel ResponseLabel = new USPSLabel();
              ResponseLabel.USPS_ERROR_DESC = e.getMessage();
              ResponseLabel.USPS_ERROR_CODE = 'INTERFACE_ERROR';
              ResponseLabel.USPS_ERROR_SOURCE = 'USPS Label API';
              return ResponseLabel;                                               
        }
      }
}