// Created By: {Girikon(Shweta Khunteta)}
// Created On: 14/07/2021
// Description/Purpose: Why and where it is used [TM-115]-It was created to  send the selectedShipping ids to the 
//ShipmentLabel class to call eVS Label API 
// 
// Methods: {shippingId}
// Test Class: {95%} {Code Coverage:}

public with sharing class PassShippingIdToVF 
{
    public List<Shipping_Detail__c> selShipLst{get;set;}  
    public List<Shipping_Detail__c> labelgenerationList{get;set;}  
    public Map<String,Address> idAddressMap{get;set;}
    public Map<String,Research_Campaign__c> idCampaignMap{get;set;}
    public Map<String,String> idContactNameMap{get;set;}

// Constructor
    public PassShippingIdToVF(ApexPages.StandardSetController cntlr)
    {
        try
        {   
            selShipLst = new List<Shipping_Detail__c>();  
            selShipLst = cntlr.getSelected(); //get selected records from shippingdetail list view
            System.debug('--selected shipping id are--'+selShipLst);
             //LIST to fetch contact address(look up) for the selected shipping records.
            labelgenerationList=[Select Id,Barcode__c,Campaign__r.Name,Campaign__r.Usps_Service_Type__c,
                                Campaign__r.Weight_in_Ounces__c,Campaign__r.Length_in_Inches__c,Campaign__r.Width_in_Inches__c,
                                Campaign__r.Height_in_Inches__c,Campaign__r.Girth_in_Inches__c,Campaign__r.Shape__c,Campaign__r.Packaging_Type__c,
                                Contact_Id__c,Campaign__r.isReturnLabelNeeded__c,
                                Contact_Id__r.Name,Contact_Id__r.MailingCountry, Contact_Id__r.MailingStateCode,Address__c,
                                Contact_Id__r.MailingCity,Contact_Id__r.MailingStreet,Contact_Id__r.MailingPostalCode
                                from Shipping_Detail__c where Id IN:selShipLst];
            System.debug('label list id---'+labelgenerationList[0].Contact_Id__r.MailingCountry);
            System.debug(' campaign name---'+labelgenerationList[0].Campaign__r.Name);
            //map consists of shipping id as key and contact object as value
            this.idAddressMap  = new Map<String,Address>();
            this.idCampaignMap  = new Map<String,Research_Campaign__c>();
            this.idContactNameMap = new Map<String,String>();
            for(Shipping_Detail__c s:labelgenerationList)
            {
                this.idAddressMap.put(s.Id,s.Address__c);
                this.idContactNameMap.put(s.Id,s.Contact_Id__r.Name);
                System.debug('---'+idAddressMap.get(s.Id));
                this.idCampaignMap.put(s.Id,s.Campaign__r);
                System.debug('-ID FOR CAMAPIGN MAP--'+idCampaignMap.get(s.Id));
                Research_Campaign__c rc= idCampaignMap.get(s.Id);
                System.debug('-cAMPAIGN TYPE map--'+rc.Name);
                //System.debug('-cAMPAIGN TYPE map with service TYPR--'+rc.Usps_Service_Type__c);
                System.debug('-----CAMPAIGN RETURN LABEL NEEDED OR NOT---'+rc.isReturnLabelNeeded__c);
            }
        }
        catch(Exception e)
        {
            System.debug('Exception ->'+e.getMessage()+' on line number-->'+e.getLineNumber());
        }
    } 

    public PageReference shippingId()
        {
            // System.debug('pagereference--'+selShipLst);
            System.debug('label generation id with address---'+idAddressMap);
            USPSShipmentLabel.getLabel(idAddressMap,idCampaignMap,idContactNameMap); 
            return null;        
        }   
}