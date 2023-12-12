public class BatchTrackShipmentHandler {
    
    public static Shipping_Detail__c UpdateTrackingDetails(String trackingId,String returnTrackingId,String uspsstatus,
                                                           String uspsstatuscode,String tracksummary,String recordId) 
        
    {
        Shipping_Detail__c shipDetails=new Shipping_Detail__c();
        system.debug('tracking id  is----'+trackingId);
        List<Shipping_Detail__c> shipmenttoTrack=  [SELECT Id,Barcode__c,Shipment_Sent_Date__c,
                                                    Shipment_Status__c,Return_TrackingId__c,Campaign__r.Name,
                                                    USPS_Status_Code__c,Return_Status__c,
                                                    Return_Status_Code__c,Return_Track_Summary__c,
                                                    Tracking_Id__c,Track_Summary__c
                                                    FROM Shipping_Detail__c
                                                    where Id =:recordId];
        
        for(Shipping_Detail__c sdTrack:shipmenttoTrack){
            if(sdTrack.Shipment_Status__c=='Sent' ){
                sdTrack.USPS_Status__c = uspsstatus;
                System.debug('apex value of status--'+uspsstatus);
                sdTrack.USPS_Status_Code__c = uspsstatuscode;
                sdTrack.Track_Summary__c = tracksummary;
                if(sdTrack.USPS_Status_Code__c =='01'){
                    sdTrack.Shipment_Status__c='Delivered';
                    sdTrack.USPS_Status_Code__c = uspsstatuscode; 
                    System.debug(' apex value of status--'+uspsstatuscode);
                    sdTrack.Track_Summary__c = tracksummary;
                    System.debug(' apex value of summary--'+tracksummary);
                }
                System.debug('value of summary--'+tracksummary);
                System.debug('I am in track shipment--');
                
            }
            else if (sdTrack.USPS_Status_Code__c!='01') {
                sdTrack.Track_Summary__c = tracksummary;
                
            }
            else if(sdTrack.Shipment_Status__c=='Delivered')
            {
                sdTrack.Return_Status__c = uspsstatus;
                sdTrack.Return_Status_Code__c = uspsstatuscode; 
                sdTrack.Return_Track_Summary__c = tracksummary;
                System.debug('value of return summary--'+tracksummary);
            }
            shipDetails=sdTrack;
            }
            
        
        
        /*if(!shipmenttoTrack.isEmpty())
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
            //return true;
        }*/
        //return true;
        return shipDetails;
    }
}