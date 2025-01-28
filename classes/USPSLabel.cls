// Created By: {Girikon(Shweta Khunteta)}
// Created On: 13/07/2021
// Description/Purpose: Why and where it is used [TM-115]-A wrapper class created for ShipmentLabel class
// Methods: {}
// Test Class: {} {Code Coverage:}
public with sharing class USPSLabel 
{
    public USPSLabel() 
    {
        ToAddress1='';
        ToAddress2='';
        ToCity='';
        ToState='';
        ToZip5='';
        ToZip4='';
        RDC='';
        CarrierRoute='';
        BarcodeNumber='';
        trackingNumber='';
        Postage='' ;
        LabelImage='';
        USPS_Returned_Error= false ;
		USPS_ERROR_CODE = '';
		USPS_ERROR_DESC = '';
		USPS_ERROR_SOURCE = '';	

    }
    @AuraEnabled public String ToAddress1 {get;set;}
    @AuraEnabled public String ToAddress2 {get;set;}
    @AuraEnabled public String ToCity {get;set;}
    @AuraEnabled public String ToState {get;set;}
    @AuraEnabled public String ToZip5 {get;set;}
    @AuraEnabled public String ToZip4 {get;set;}
    @AuraEnabled public String RDC {get;set;}
    @AuraEnabled public String CarrierRoute {get;set;}   
    @AuraEnabled public String BarcodeNumber {get;set;}
    @AuraEnabled public String trackingNumber {get;set;}
    @AuraEnabled public String Postage {get;set;}
    @AuraEnabled public String LabelImage {get;set;}
    @AuraEnabled public boolean USPS_Returned_Error {get; set;}
	@AuraEnabled public string USPS_ERROR_CODE {get; set;}
	@AuraEnabled public string USPS_ERROR_DESC {get; set;}
	@AuraEnabled public string USPS_ERROR_SOURCE {get; set;}

}