// Created By: {Girikon(Shweta Khunteta)}
// Created On: 20/08/2021 (DD/MM/YYYY)
// Description/Purpose: A batch class created to execute large number of records for tracking their
//  Shipment status. [TM-216]]
// Methods: {start, execute, finish}
// Test Class: {BatchTrackShipment} {100%}


global class BatchTrackShipment implements Database.Batchable<SObject>,Database.AllowsCallouts,Database.Stateful
{
   global Database.QueryLocator start(Database.BatchableContext bc)
   {
            
    return Database.getQueryLocator('Select Id,Shipment_Status__c ,USPS_Status_Code__c,Return_Status_Code__c,Tracking_Id__c,Return_TrackingId__c FROM Shipping_Detail__c where (Shipment_Status__c=\'Sent\' and USPS_Status_Code__c!=\'01\' and Tracking_Id__c!=null) OR (Shipment_Status__c=\'Delivered\' and Return_Status_Code__c!=\'01\'and Return_TrackingId__c!=null)');
       
   }
   global void execute(Database.BatchableContext bc, List<Shipping_Detail__c > scope)
    {   
       List<Shipping_Detail__c> lstToUpdateSD=new List<Shipping_Detail__c>();
        System.debug('batchable context--'+bc);
        Integer size= scope.size();
        System.debug('### size of scope---'+size);
        for(Shipping_Detail__c sd:scope)
        {
            
            //String trackID= (String)scope.get(i).get('sd.Tracking_Id__c');
            // String recordid= (String)scope.get(i).get('Shipping_Details__r.Id');
            // System.debug('record id in batchof shipping detail record--'+recordid);
           USPSTrack ResponseTrack= new USPSTrack();
            USPSTrackResponse uspsTrack = new USPSTrackResponse();
           ResponseTrack= TrackShipment.GetTrackingDetails(sd.Tracking_Id__c);
            uspsTrack = USPSTrackShipment.trackingDetails(sd.Tracking_Id__c);
            System.debug('Tracking Id..'+uspsTrack);
			Shipping_Detail__c shipDetails=new Shipping_Detail__c();
            system.debug('RESPONSE IS---'+ResponseTrack);
            shipDetails=BatchTrackShipmentHandler.UpdateTrackingDetails(ResponseTrack.TrackID,ResponseTrack.TrackID,ResponseTrack.StatusCategory,ResponseTrack.EventCode,ResponseTrack.TrackSummary,sd.id);
        	system.debug('shipDetails--->'+shipDetails);
            lstToUpdateSD.add(shipDetails);
        }
        if(lstToUpdateSD.size()>0){
            update lstToUpdateSD;
        }
        
        
    }
    global void finish(Database.BatchableContext BC)
    {
    }  
}