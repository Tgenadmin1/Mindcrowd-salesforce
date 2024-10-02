// Created By: {Girikon(ShwetaKhunteta)}
// Created On: 07/08/2021
// Description/Purpose:
// Methods: {UpdateShippingDetails,UpdateTrackingDetails,getTrackingIdByRecordId,changeShipmentStatusToCreateLabel,
//  changeShipmentStatusToCreateReturnLabel}
// Apex Class: {ShippingDetailsController)}
@isTest
public with sharing class ShippingDetailsControllerTest 
{
    public ShippingDetailsControllerTest() 
    {

    }
    @testSetup static void setup() 
    {
        // Create common test shipping.
        List<Contact> testContact = new List<Contact>();
        for(Integer i=0;i<1;i++) 
        {
            testContact.add(new Contact (LastName = 'TestContact'+i));
        }
        insert testContact; 
        Research_Campaign__c res= new Research_Campaign__c();
            res.Name='Covid';
            res.Weight_in_Ounces__c=3;
            res.Usps_Service_Type__c='FIRST CLASS';
            insert res;
        Shipping_Detail__c testShipping1 = new Shipping_Detail__c();
        
            
            testShipping1.Campaign__c=res.Id;
            testShipping1.Contact_Id__c=testContact[0].id;
            testShipping1.Tracking_Id__c='9400111298370071281345';
            testShipping1.Return_TrackingId__c='LY715967151CN';
            testShipping1.Shipment_Status__c='Sent'; 
            testShipping1.Price__c=3.0;
            testShipping1.USPSLabelImage__c='dffddfdkjfdjfkdfjdkfjdkfdjkfkdj';

        Shipping_Detail__c testShipping2 = new Shipping_Detail__c();
    
            testShipping2.Contact_Id__c=testContact[0].id;
            testShipping2.Campaign__c=res.Id;
            testShipping2.Tracking_Id__c='9400111298370071281345';
            testShipping2.Return_TrackingId__c='LY715967151CN';
            testShipping2.Shipment_Status__c='Delivered'; 
            testShipping2.Price__c=3.0;
			
		Shipping_Detail__c testShipping3 = new Shipping_Detail__c();
    
            testShipping3.Contact_Id__c=testContact[0].id;
            testShipping3.Campaign__c=res.Id;
            testShipping3.Tracking_Id__c='9400111298370071281345';
            testShipping3.Return_TrackingId__c='LY715967151CN';
            testShipping3.Shipment_Status__c='Created'; 
            testShipping3.Price__c=3.0;
            //testShipping3.Barcode__c='SM03BAT7UmCD';
                      
            testShipping2.USPSLabelImage__c='dffddfdkjfdjfkdfjdkfjdkfdjkfkdj';
            List<Shipping_Detail__c> myList = new List<Shipping_Detail__c>();
            myList.add(testShipping1);
            myList.add(testShipping2);
			myList.add(testShipping3);
    
            insert myList; 
            myList = [select Id, Name,Barcode__c from Shipping_Detail__c];
            System.debug('i am in setup--'+myList[0].Barcode__c) ;
            System.debug('record id of shipping detail object is--'+myList[0].id);
    
    }

@isTest  
public static void updateshipdetail()
    {
        Test.startTest();  
        List<Shipping_Detail__c> lst1 = [SELECT Id, Barcode__c,Shipment_Status__c FROM Shipping_Detail__c where Shipment_Status__c = 'Created' OR Shipment_Status__c = 'Sent' OR Shipment_Status__c = 'Delivered'];
        system.debug('lst1::'+lst1);
        List<String> barcodelist= new List<String>();
        barcodelist.add(lst1[2].Barcode__c);        
        //insert barcodelist;
        
        ApexPages.StandardController stdcon = new ApexPages.StandardController(lst1[0]);
        ShippingDetailsController std = new ShippingDetailsController(stdcon);
		        
        ApexPages.StandardSetController sc = new ApexPages.StandardSetController(lst1);
        ShippingDetailsController sd = new ShippingDetailsController(sc);
        System.debug('list is::'+lst1);  
		
        PageReference pref = new ApexPages.StandardController(lst1[0]).view();
		pref.getParameters().put('id',lst1[0].Id);
		Test.setCurrentPage(pref);
		
        ShippingDetailsController.UpdateShippingDetails(lst1[0].Barcode__c);
        ShippingDetailsController.UpdateShippingDetails(lst1[1].Barcode__c);
        ShippingDetailsController.updateShipmentStatusToSent(barcodelist);      
        sd.redirectTrackShipment();
        Test.stopTest(); 
    }
@isTest  
public static void updatetrackdetail()
    {
        Test.startTest();  
        List<Shipping_Detail__c> lsttrack = [SELECT Id,Barcode__c,Shipment_Sent_Date__c,
        Shipment_Status__c,Return_TrackingId__c,USPS_Status_Code__c,Return_Status__c,USPS_Status__c,
        Return_Status_Code__c,Return_Track_Summary__c,Tracking_Id__c,Track_Summary__c
        FROM Shipping_Detail__c
        ];
        ShippingDetailsController.UpdateTrackingDetails(lsttrack[0].Tracking_Id__c,
                                                    lsttrack[0].Return_TrackingId__c,
                                                    lsttrack[0].USPS_Status__c,
                                                    lsttrack[0].USPS_Status_Code__c,
                                                    lsttrack[0].Track_Summary__c,
                                                    lsttrack[0].Id);
        ShippingDetailsController.UpdateTrackingDetails(lsttrack[1].Tracking_Id__c,
                                                    lsttrack[1].Return_TrackingId__c,
                                                    lsttrack[1].USPS_Status__c,
                                                    lsttrack[1].USPS_Status_Code__c,
                                                    lsttrack[1].Track_Summary__c,
                                                    lsttrack[1].Id);
        Test.stopTest(); 
    }


    @isTest  
    public static void getTrackId()
    {
        Test.startTest();
        List<Shipping_Detail__c> lsttrackid = [SELECT Id, Barcode__c,Tracking_Id__c FROM Shipping_Detail__c];
        ShippingDetailsController.getTrackingIdByRecordId(lsttrackid[0].id);
        system.assertequals('9400111298370071281345','9400111298370071281345'); 
        Test.stopTest(); 
    }
    @isTest
    public static void createLabelTest()
    {
        Test.startTest();
		List<Shipping_Detail__c> sdList = new List<Shipping_Detail__c>();
        List<Shipping_Detail__c> labellist = [SELECT Id,Barcode__c,Return_TrackingId__c,Address__Street__s,Address__City__s,Address__StateCode__s,Address__PostalCode__s,
                          rdc__c,carrierRoute__c,
                                            Tracking_Id__c,Price__c,USPSReturnLabelImage__c,
                                            USPSLabelImage__c FROM Shipping_Detail__c
                                            ];
        sdList = [SELECT Id,Name,Campaign__r.Name,Return_TrackingId__c,returnRdc__c,returnCarrierRoute__c, Shipment_Status__c,USPSLabelImage__c,Price__c,USPSReturnLabelImage__c FROM Shipping_Detail__c limit 100];
		
        string labelId=labellist[0].Id;
        String ToAddress1='';
        String ToAddress2='';
        ShippingDetailsController.changeShipmentStatusToCreateLabel(labelId,ToAddress1,ToAddress2,
                                                                    labellist[0].Address__Street__s,
                                                                    labellist[0].Address__City__s,
                                                                    labellist[0].Address__StateCode__s,
                                                                    labellist[0].Address__PostalCode__s,
                                                                    labellist[0].rdc__c,
                                                                      labellist[0].carrierRoute__c,
                                                                labellist[0].Tracking_Id__c,
                                                              String.valueOf(labellist[0].Price__c),
                                                                labellist[0].USPSLabelImage__c);
         
        ShippingDetailsController.changeShipmentStatusToCreateReturnLabel(labellist[0].Id,ToAddress1,ToAddress2,
                                                                labellist[0].Return_TrackingId__c,
                                                              String.valueOf(labellist[0].Price__c),
                                                                labellist[0].USPSReturnLabelImage__c);
        ShippingDetailsController.changeShipmentStatusToCreateReturnLabel(sdList[0].Id,sdList[0].returnRdc__c,sdList[0].returnCarrierRoute__c,sdList[0].Return_TrackingId__c,sdList[0].Shipment_Status__c,sdList[0].USPSReturnLabelImage__c);
        ShippingDetailsController.changeShipmentStatusToFail(sdList[0].Id,sdList[0].returnRdc__c,sdList[0].returnCarrierRoute__c,sdList[0].Return_TrackingId__c);
        
        Test.stopTest();
    }
}