// Created By: {Girikon(Shweta Khunteta)}
// Created On: 05/06/2021
// Description/Purpose: Why and where it is used [TM-98]-It was created to validate and call  the API from 
//participationconsentform (LWC component) to Contact Object.
// Methods: {}
// Test Class: {USPSAddress_Test} {}

// A wrapper class
public with sharing class USPSAddress 
{
    @AuraEnabled public String Address1 {get;set;}
    @AuraEnabled public string Address2 {get; set;}
    @AuraEnabled public string City {get; set;}
    @AuraEnabled public string State {get; set;}
    @AuraEnabled public string Zip5 {get; set;}
    @AuraEnabled public string Zip4 {get; set;}
    @AuraEnabled public boolean USPS_Returned_Error {get; set;}
	@AuraEnabled public string USPS_ERROR_CODE {get; set;}
	@AuraEnabled public string USPS_ERROR_DESC {get; set;}
	@AuraEnabled public string USPS_ERROR_SOURCE {get; set;}

    public USPSAddress() 
    {
        Address1='';
			Address2='';
			City='';
			State='';
			Zip5='';
			Zip4='';
			
			USPS_Returned_Error = false;
			USPS_ERROR_CODE = '';
			USPS_ERROR_DESC = '';
			USPS_ERROR_SOURCE = '';	

    }

   
    public string getZip() 
    {
        string ReturnValue = Zip5;    
        if (Zip4 != null && Zip4 != '') {
            ReturnValue += '-' + Zip4;
        }
        
        return ReturnValue;
    }
    
   public  boolean HasData() 
   {
        // this will return false if everything was defaulted.
        boolean ReturnValue = false;
        
        if (Address1 !='') {
            ReturnValue = true;
        } else if (Address2 !='') {
            ReturnValue = true;
        } else if (City !='') {
            ReturnValue = true;
        } else if (State !='') {
            ReturnValue = true;
        } else if (Zip5 !='') {
            ReturnValue = true;
        } else if (Zip4 !='') {
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
    } // H

}