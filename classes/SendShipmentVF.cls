// Created By: {Girikon(Shweta Khunteta)}
// Created On: 16/08/2021
// Description/Purpose: Why and where it is used [TM-73]-It was created to  select multiple Shipping ids  and send to the 
//ShippingDetailsController to update their shipment status
// 
// Methods: {sendshippingId}
// Test Class: {SendShipmentVFTest} {93%}
public with sharing class SendShipmentVF {
    public List<Shipping_Detail__c> selShipLst;
    public List<String> barCodes{get;set;}
    public String barCode{get;set;}
    public SendShipmentVF(ApexPages.StandardSetController cntlr) 
    {
        try{
            
            selShipLst = cntlr.getSelected(); //get selected records from shippingdetail list view
             System.debug('--selected shipping id are--'+selShipLst);
             selShipLst = [select  Barcode__c from Shipping_Detail__c
                            where id = :selShipLst];
             System.DEBUG('SELECTED SHIPPING ID WITH BARCODES TO SEND---'+selShipLst);               
            barCodes= new List<String>();
            barCode='';
            for (Shipping_Detail__c shipDetailObj : selShipLst)
            {
                barCodes.add(shipDetailObj.Barcode__c);
            }
            System.debug('barcodes selected are--'+barCodes);
            barCode = JSON.serialize(barCodes);
            }
        catch(Exception e)
            {
                System.debug('Exception ->'+e.getMessage()+' on line number-->'+e.getLineNumber());
            }
    } 
public PageReference sendshippingId()
    {
        ShippingDetailsController.updateShipmentStatusToSent(barCodes); 
        return null;  
    }

}