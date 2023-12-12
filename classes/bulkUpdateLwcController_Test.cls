/*
 * 
  Created By: {Girikon(Rohit Dua)}
  Created On: 15/06/2022
  Description/Purpose:this class is to update APOE_Genotype__c of shipping details object based on barcode values ticket TM-942
  Test Class--bulkUpdateLwcControllerh  coverage 80 %
 *
 */
@isTest
public class bulkUpdateLwcController_Test {
    
    @testSetup static void setup() {
        
        Research_Campaign__c campObj = new Research_Campaign__c();
        campObj.Name = 'Test';
        insert campObj;
        
        List<Shipping_Detail__c> ShipLst = new List<Shipping_Detail__c>();
        for(Integer i=0;i<5;i++){
            Shipping_Detail__c ship = new Shipping_Detail__c();
            ship.APOE_Genotype__c = 'Testing!';
            ship.Campaign__c =    campObj.id;
            ShipLst.add(ship); 
        }
        System.debug('ShipLst-->'+ShipLst);
        insert ShipLst;
    }
    
    @isTest public static void bulkTest(){
        
        //List<Shipping_Detail__c> ShipLstt = [SELECT Barcode__c,APOE_Genotype__c,Campaign__c FROM Shipping_Detail__c]; 
        //System.debug('ShipLstt--->'+ShipLstt);
        //ShipLstt[0].APOE_Genotype__c = 'testi';
        //ShipLstt[1].APOE_Genotype__c = 'testi1';
        //update ShipLstt;
        Test.startTest(); 
        list<Shipping_Detail__c> shipDtlLst = new list<Shipping_Detail__c>();
        
        String str = JSON.serialize('Barcode__c,APOE_Genotype__c\r\nSM02BAtgbECD,HANII\r\nSM03BA8MtICD,KKKK\r\nSM03BA8OFrCD,AAAA\r\nSM03BA8S1kCD,\r\nSM03BASj8pCD,'); 
        System.debug('str--->'+str);
        
        String data  = JSON.deserializeUntyped(str).toString();
        System.System.debug('data-->'+data);
        list<String> lstCSVLines = data.split('\n');
        System.debug('lstCSVLines==>'+lstCSVLines);
        
        
        
       /* for(Integer i = 1; i < lstCSVLines.size(); i++){  
            String csvLine = lstCSVLines[i];
            System.debug('csvLine-->'+ csvLine);        
            string column = csvLine.deleteWhitespace();
            List<String> csvRowData = column.deleteWhitespace().split(',');
            System.debug('csvRowData-->'+csvRowData);*/
            /*for(Shipping_Detail__c shipDtl : [Select id, Barcode__c, APOE_Genotype__c From Shipping_Detail__c where Barcode__c IN: csvRowData ]){   
                if(shipDtl.Barcode__c == csvRowData[0] )
                    shipDtl.APOE_Genotype__c = csvRowData[1];
                shipDtlLst.add(shipDtl);  
            }*/
            
         /*  List<Shipping_Detail__c> shipDtlLst = [Select Barcode__c, APOE_Genotype__c From Shipping_Detail__c where Barcode__c IN: csvRowData ];
           shipDtl[0].APOE_Genotype__c = csvRowData[0];
            shipDtl[1].APOE_Genotype__c = csvRowData[];
            
        }
        Update shipDtlLst;*/
        
        
        
        string a = bulkUpdateLwcController.saveFile(str);
        Test.stopTest();
    } 
}