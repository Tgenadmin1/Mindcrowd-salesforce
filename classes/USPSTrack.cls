// Created By: {Girikon(Shweta Khunteta)}
// Created On: 29/06/2021
// Description/Purpose: Why and where it is used [TM-85]-  A wrapper class for TrackShipment class

// Methods: {HasData}
// Test Class: {USPSTrackTest} {}


public with sharing class USPSTrack 
{
    @AuraEnabled public String TrackID {get;set;}
    @AuraEnabled public String ShipmentToTrack {get;set;}
    @AuraEnabled public String TrackSummary {get;set;}
    @AuraEnabled public String StatusSummary {get;set;}
    @AuraEnabled public String StatusCategory {get;set;}
    @AuraEnabled public String EventCode {get;set;}
    @AuraEnabled public boolean USPS_Returned_Error {get; set;}
	@AuraEnabled public string USPS_ERROR_CODE {get; set;}
	@AuraEnabled public string USPS_ERROR_DESC {get; set;}
	@AuraEnabled public string USPS_ERROR_SOURCE {get; set;}

    public USPSTrack() 
    {
        TrackID ='';
        ShipmentToTrack ='';
        TrackSummary='';
        StatusSummary='';
        StatusCategory='';
        EventCode ='';
        USPS_Returned_Error = false;
		USPS_ERROR_CODE = '';
		USPS_ERROR_DESC = '';
		USPS_ERROR_SOURCE = '';	
    }
    
//can be commented if not used------
    public  boolean HasData() 
    {
        // this will return false if everything was defaulted.
        boolean ReturnValue = false;
        
        if (EventCode !='') {
            ReturnValue = true;
        } else if (StatusCategory !='') {
            ReturnValue = true;
        
        } else if (USPS_Returned_Error !=false) {
            ReturnValue = true;
        } else if (USPS_ERROR_CODE !='') {
            ReturnValue = true;
        } else if (USPS_ERROR_DESC !='') {
            ReturnValue = true;
        } else if (USPS_ERROR_SOURCE !='') {
            ReturnValue = true;
        }

        return ReturnValue;
    } 

}