// Created By: {Girikon(Sunil)}
// Created On: 20/10/2021
// Description/Purpose: 
public with sharing class PassQRCodeToVF
{
    public List<String> QRCodes{get;set;}
    public String QRCode{get;set;}
    public List<String> barCodes{get;set;}
    public String barCode{get;set;}
    public PassQRCodeToVF(ApexPages.StandardSetController cntlr) 
    {
        try{
            
            List<Shipping_Detail__c> selShipLst = cntlr.getSelected(); 
             System.debug('--selected shipping id are--'+selShipLst);

                selShipLst = [select  QR_Code__c,Barcode__c from Shipping_Detail__c where id = :selShipLst And QR_Code__c!=null];
                QRCodes= new List<String>();
                QRCode='';
                barCodes= new List<String>();
                barCode='';
                for (Shipping_Detail__c shipDetailObj : selShipLst) {
                    QRCodes.add(shipDetailObj.QR_Code__c);
                    QRCodes.add(shipDetailObj.Barcode__c);                
                 }
                 //System.debug('qrcodes selected are--'+QRCodes);
                 //System.debug('barcodes selected are--'+barCodes);
                 QRCode = JSON.serialize(QRCodes);
             }
             catch(Exception e){
                 System.debug('Exception ->'+e.getMessage()+' on line number-->'+e.getLineNumber());
             }
        } 

    }