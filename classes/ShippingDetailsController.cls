// Created By: {Girikon(Shweta Khunteta)}
// Created On: 22/06/2021
// Description/Purpose: Why and where it is used [TM-85],[TM-73],[TM-115]-It was created to save the values from 
// SendShipment,ReceiveShipment (Aura component) to ShippingDetail Object.
// Methods: {UpdateShippingDetails,UpdateTrackingDetails,getTrackingIdByRecordId}
// Test Class: {ShippingDetailsControllerTest} {86%}
public without sharing class ShippingDetailsController 
{  
    public static ApexPages.StandardController trackshipment {get;set;}
    public ShippingDetailsController(ApexPages.StandardController stdController1) 
    { 
        trackshipment=stdController1;
    }
    
    public ApexPages.StandardSetController selShipmentlst {get; set;}
    public static Boolean err{get;set;}
    public String currentRecordId {get; set;}
    public static string barId;
    public static ApexPages.StandardSetController selShipmentlst;
    public ShippingDetailsController(ApexPages.StandardSetController stdController) 
    {
        selShipmentlst = stdController; 
        System.debug(selShipmentlst.getSelected());
    }
    //------------------------------
    @AuraEnabled
    public static boolean updateShipmentStatusToSent(List<String> barcode)
    {
        system.debug('barcode ids are---- in update send status methid---'+barcode);
        List<Shipping_Detail__c> shipmenttoSend=  [SELECT Id,Barcode__c,Shipment_Sent_Date__c,
                                                   Shipment_Status__c,
                                                   Shipment_Received_Date__c,USPS_Status_Code__c
                                                   FROM Shipping_Detail__c
                                                   where Barcode__c =: barcode];
        System.debug('---shipmenttosend------'+shipmenttoSend);                                       
         if(!shipmenttoSend.isEmpty()&& shipmenttoSend[0].Shipment_Status__c=='Created')
        {  //it is checked when SendShipment button is clicked to update status and date.
            for(Shipping_Detail__c b:shipmenttoSend)
            {   
                barId = b.Barcode__c;
                for(String BarInfo:barcode){
                     if(barId.equals(BarInfo)){
                        if(b.Shipment_Status__c=='Created'){
                            b.Shipment_Sent_Date__c=System.today();
                            b.Shipment_Status__c='Sent';
                        }
                }
                }
               
                
            }
            update shipmenttoSend;
            return true;
        }
        return true;
    }
    
    public PageReference redirectTrackShipment()
    {
        currentRecordId =  ApexPages.CurrentPage().getparameters().get('id');
        List<Shipping_Detail__c> recordtotrack=  [SELECT Id,Return_TrackingId__c,
                                                  Tracking_Id__c,
                                                  Shipment_Status__c
                                                  FROM Shipping_Detail__c
                                                  where Id =:currentRecordId];
        system.debug('recordtotrack==>'+recordtotrack[0].Tracking_Id__c);
        string trackingRecord = recordtotrack[0].Tracking_Id__c;
        pagereference cl1=new pagereference('https://tools.usps.com/go/TrackConfirmAction');
        cl1.getParameters().put('tRef','fullpage');
        cl1.getParameters().put('tLc','2&text28777=');
        cl1.getParameters().put('tLabels',trackingRecord);
        cl1.getParameters().put('tABt','false');
        cl1.setRedirect(true);
        return cl1;
    }
    
    @AuraEnabled
    public static boolean UpdateShippingDetails(String barcode) 
    {
        system.debug('barcode ids are----'+barcode);
        List<Shipping_Detail__c> shipmenttoSend=  [SELECT Id,Barcode__c,Shipment_Sent_Date__c,
                                                   Shipment_Status__c,
                                                   Shipment_Received_Date__c,USPS_Status_Code__c
                                                   FROM Shipping_Detail__c
                                                   where Barcode__c =: barcode];
        
        if(!shipmenttoSend.isEmpty())
        {  //it is checked when SendShipment button is clicked to update status and date.
            
            if(shipmenttoSend.size()>1){
                for(Shipping_Detail__c shipDetail:shipmenttoSend){
                    barId = shipDetail.Barcode__c;
                    if(barId.equals(barcode)){
                        if(shipDetail.Shipment_Status__c=='Created' || shipDetail.Shipment_Status__c=='Delivered')
                        {
                            shipDetail.Shipment_Received_Date__c=System.today();
                            shipDetail.Shipment_Status__c='Received';
                            System.debug('i am in receive');
                        }
                        else if(shipDetail.Shipment_Status__c =='Sent')
                        {
                            shipDetail.Shipment_Received_Date__c = System.today();
                            shipDetail.Shipment_Status__c='Received';  
                            System.debug('I am in receive--');    
                        }
                        else if(shipDetail.Shipment_Status__c=='Created')
                        {
                            shipDetail.Shipment_Sent_Date__c=System.today();
                            shipDetail.Shipment_Status__c='Sent';
                            System.debug('already updated the status of shipment');
                        }
                    }
                }
               
            }else{
                barId = shipmenttoSend[0].Barcode__c;
                if(!barId.equals(barcode)){
                    return false;
                }
                if(shipmenttoSend[0].Shipment_Status__c=='Created' || shipmenttoSend[0].Shipment_Status__c=='Delivered')
                {
                    shipmenttoSend[0].Shipment_Received_Date__c=System.today();
                    shipmenttoSend[0].Shipment_Status__c='Received';
                    System.debug('i am in receive');
                }
                // it is checked when Receive Shipment button is clicked to update shipment status and date.
                else if(shipmenttoSend[0].Shipment_Status__c =='Sent')
                {
                    shipmenttoSend[0].Shipment_Received_Date__c = System.today();
                    shipmenttoSend[0].Shipment_Status__c='Received';  
                    System.debug('I am in receive--');    
                }
                
                else if(shipmenttoSend[0].Shipment_Status__c=='Created')
                {
                    shipmenttoSend[0].Shipment_Sent_Date__c=System.today();
                    shipmenttoSend[0].Shipment_Status__c='Sent';
                    System.debug('already updated the status of shipment');
                }
                
                
            }    
            update shipmenttoSend;
            return true;
        }
        
        
        System.debug('Shipment updated');
        return false;
    }
    //  Function created to update ShippingDetail Object so that it updates values returned by Track api. 
    @AuraEnabled
    public static boolean UpdateTrackingDetails(String trackingId,String returnTrackingId,String uspsstatus,
                                                String uspsstatuscode,String tracksummary,String recordId) 
    {
        system.debug('tracking id  is----'+trackingId);
        List<Shipping_Detail__c> shipmenttoTrack=  [SELECT Id,Barcode__c,Shipment_Sent_Date__c,
                                                    Shipment_Status__c,Return_TrackingId__c,Campaign__r.Name,
                                                    USPS_Status_Code__c,Return_Status__c,
                                                    Return_Status_Code__c,Return_Track_Summary__c,
                                                    Tracking_Id__c,Track_Summary__c
                                                    FROM Shipping_Detail__c
                                                    where Id =:recordId];
        
        if(!shipmenttoTrack.isEmpty())
        {
            System.debug('--in if statement--'+shipmenttoTrack[0].Shipment_Status__c);
            if(shipmenttoTrack[0].Shipment_Status__c=='Sent' )
            {
                shipmenttoTrack[0].USPS_Status__c = uspsstatus;
                System.debug('apex value of status--'+uspsstatus);
                shipmenttoTrack[0].USPS_Status_Code__c = uspsstatuscode; 
                shipmenttoTrack[0].Track_Summary__c = tracksummary;
                if(shipmenttoTrack[0].USPS_Status_Code__c=='01')
                {
                    shipmenttoTrack[0].Shipment_Status__c='Delivered';
                    shipmenttoTrack[0].USPS_Status_Code__c = uspsstatuscode; 
                    System.debug(' apex value of status--'+uspsstatuscode);
                    shipmenttoTrack[0].Track_Summary__c = tracksummary;
                    System.debug(' apex value of summary--'+tracksummary);
                }
                System.debug('value of summary--'+tracksummary);
                System.debug('I am in track shipment--');
                
            }
            else if (shipmenttoTrack[0].USPS_Status_Code__c!='01') {
                shipmenttoTrack[0].Track_Summary__c = tracksummary;
                
            }
            else if(shipmenttoTrack[0].Shipment_Status__c=='Delivered')
            {
                shipmenttoTrack[0].Return_Status__c = uspsstatus;
                shipmenttoTrack[0].Return_Status_Code__c = uspsstatuscode; 
                shipmenttoTrack[0].Return_Track_Summary__c = tracksummary;
                System.debug('value of return summary--'+tracksummary);
            }
            update shipmenttoTrack;
            System.debug('Tracking details updated');
            return true;
        }
        return true;
        
    }
    @AuraEnabled
    public static  List<Shipping_Detail__c> getTrackingIdByRecordId(String recordId)
    {
        List<Shipping_Detail__c> recordtotrack=  [SELECT Id,Return_TrackingId__c,
                                                  Tracking_Id__c,
                                                  Shipment_Status__c
                                                  FROM Shipping_Detail__c
                                                  where Id =:recordId];
        return recordtotrack;
    }
    //fUNCTION CREATED TO change the ShipmentStatus to "Created" and save the Tracking id and postage in database.
    @AuraEnabled
    public static void changeShipmentStatusToCreateLabel(String Idsforlabelcreation,
                                                         String ToAddress1,
                                                         String ToAddress2,
                                                         String ToCity,
                                                         String ToState,
                                                         String ToZip5,
                                                         String ToZip4,
                                                         String RDC,
                                                         String CarrierRoute,
                                                         String BarcodeNumber,
                                                         String Postage,
                                                         String LabelImage)
    {
        try{
            List<Shipping_Detail__c> idsForLabelList = new List<Shipping_Detail__c>();
            idsForLabelList =  [SELECT Id,Name,Campaign__r.Name,Price__c,Address__Street__s,Address__City__s,Address__StateCode__s,Address__PostalCode__s,
                                rdc__c,carrierRoute__c,Shipment_Status__c,USPSLabelImage__c,USPSReturnLabelImage__c FROM Shipping_Detail__c
                                where Id =:Idsforlabelcreation];
            
            if(!idsForLabelList.isEmpty())
            {
                for(Shipping_Detail__c labelid :idsForLabelList)
                {
                    labelid.Address__Street__s=ToAddress2+' '+ToAddress1;
                    labelid.Address__City__s=ToCity;
                    labelid.Address__StateCode__s=ToState;
                    if(ToZip4!=null){
                       labelid.Address__PostalCode__s=ToZip5+'-'+ToZip4;
                    }else{
                        labelid.Address__PostalCode__s=ToZip5;
                    }
                    
                    labelid.rdc__c=RDC;
                    labelid.carrierRoute__c=CarrierRoute;
                    
                    labelid.Shipment_Status__c='Created';
                    
                    labelid.Tracking_Id__c=BarcodeNumber;
                    
                    System.debug('postage is--'+Postage);
                    labelid.Price__c=Double.valueOf(Postage);
                    labelid.USPSLabelImage__c=LabelImage;
                    System.debug('labelimage is'+LabelImage);
                    
                }
                update idsForLabelList;
                
            } 
            // return true;
        }
        catch(Exception e)
        {
            System.debug('Exception ->'+e.getMessage()+' on line number-->'+e.getLineNumber());
        }
    }
    
    
    ////sunil c
    @AuraEnabled
    public static void changeShipmentStatusToFail(String Idsforlabelcreation,String USPSERRORCODE,String USPSERRORDESC, String USPSERRORSOURCE)
    {
        try{
            List<Shipping_Detail__c> idsForLabelList = new List<Shipping_Detail__c>();
            idsForLabelList =  [SELECT Id, Shipment_Status__c,Track_Summary__c  FROM Shipping_Detail__c
                                where Id =:Idsforlabelcreation];
            
            if(!idsForLabelList.isEmpty())
            {
                for(Shipping_Detail__c labelid :idsForLabelList)
                {
                    system.debug('error values: '+labelid.Shipment_Status__c);
                    labelid.Shipment_Status__c='Failed';
                    labelid.Track_Summary__c=USPSERRORCODE+'; '+USPSERRORDESC+'; '+USPSERRORSOURCE;        
                }
                update idsForLabelList;  
                system.debug('error values: '+idsForLabelList[0].Track_Summary__c);
            } 
            // return true;
        }
        catch(Exception e)
        {
            System.debug('Exception ->'+e.getMessage()+' on line number-->'+e.getLineNumber());
        }
    }
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    //--------------poc return label------------
    @AuraEnabled
    public static void changeShipmentStatusToCreateReturnLabel(String Idsforlabelcreation,
                                                               String RDC,
                                                               String CarrierRoute, 
                                                               String BarcodeNumber,String Postage,String LabelImage)
    {
        try{
            List<Shipping_Detail__c> idsForReturnLabelList = new List<Shipping_Detail__c>();
            idsForReturnLabelList=  [SELECT Id,Name,Campaign__r.Name,Price__c,returnRdc__c,returnCarrierRoute__c,
                                     Shipment_Status__c,USPSLabelImage__c,USPSReturnLabelImage__c FROM Shipping_Detail__c
                                     where Id =:Idsforlabelcreation];
            System.debug('--list'+idsForReturnLabelList);
            if(!idsForReturnLabelList.isEmpty())
            {
                for(Shipping_Detail__c labelid :idsForReturnLabelList)
                {
                    labelid.returnRdc__c=RDC;
                    labelid.returnCarrierRoute__c=CarrierRoute;
                    
                    labelid.Shipment_Status__c='Created';
                    
                    labelid.Return_TrackingId__c=BarcodeNumber;
                    System.debug('return tracking id:---'+BarcodeNumber);
                    System.debug('postage is--'+Postage);
                    //labelid.Price__c=Double.valueOf(Postage);
                    //labelid.USPSLabelImage__c=LabelImage;
                    System.debug('Reurn labelimage is'+LabelImage);
                    labelid.USPSReturnLabelImage__c=LabelImage;
                }
                update idsForReturnLabelList;           
            } 
            // return true;
        }
        catch(Exception e)
        {
            System.debug('Exception ->'+e.getMessage()+' on line number-->'+e.getLineNumber());
        }
    }
    
    /***
* @param data [List of shipping detail record]
* @param type [simple or return label]
*/
    private static void addDocument(Shipping_Detail__c sd,String type){      
        /*
ContentVersion cv = new ContentVersion();
cv.Title = type;
cv.PathOnClient =sd.Name+ '.tiff';
if(type=='Shipping Label'){
cv.VersionData = EncodingUtil.base64Decode(sd.USPSLabelImage__c);
}
else if(type=='Shipping Return Label'){
cv.VersionData = EncodingUtil.base64Decode(sd.USPSReturnLabelImage__c);
}
System.debug('sd.USPSLabelImage__c: '+sd.USPSLabelImage__c);
System.debug('sd.USPSReturnLabelImage__c: '+sd.USPSReturnLabelImage__c);
cv.IsMajorVersion = true;
if(cv.VersionData!=null){
insert cv;
}

//Get Content Document Id
if(cv.Id!=null){
Id conDocId = [SELECT ContentDocumentId FROM ContentVersion WHERE Id =:cv.Id].ContentDocumentId;
//Create ContentDocumentLink 

ContentDocumentLink cdl = New ContentDocumentLink();
cdl.LinkedEntityId = sd.Id;
cdl.ContentDocumentId = conDocId;
cdl.shareType = 'V';
insert cdl;    
}*/
    }
}