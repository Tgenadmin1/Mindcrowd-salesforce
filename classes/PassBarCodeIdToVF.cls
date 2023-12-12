// Created By: {Girikon(Shweta Khunteta)}
// Created On: 14/07/2021
// Description/Purpose: Why and where it is used [TM-22]-It was created to  send the selectedShipping ids by
//                      clicking on GenerateBarcode button and pass to barCodeGenerator (LWC Component) 
// 
// Methods: {}
// Test Class: {92%} {Code Coverage:}
public with sharing class PassBarCodeIdToVF 
{
    public List<String> barCodes{get;set;}
    public String barCode{get;set;}
    public PassBarCodeIdToVF(ApexPages.StandardSetController cntlr) 
    {
        try{
            
            List<Shipping_Detail__c> selShipLst = cntlr.getSelected(); //get selected records from shippingdetail list view
             System.debug('--selected shipping id are--'+selShipLst);

             selShipLst = [select  Barcode__c from Shipping_Detail__c
                            where id = :selShipLst];
                barCodes= new List<String>();
                barCode='';
                for (Shipping_Detail__c shipDetailObj : selShipLst) {
                        barCodes.add(shipDetailObj.Barcode__c);
                       // barCode+=shipDetailObj.Barcode__c;
                        
                 }
                 System.debug('barcodes selected are--'+barCodes);
                
                 barCode = JSON.serialize(barCodes);
                //  System.debug('barcode selected inserialized form--'+barCode);
               
             }
             catch(Exception e){
                 System.debug('Exception ->'+e.getMessage()+' on line number-->'+e.getLineNumber());
             }
        } 

    }