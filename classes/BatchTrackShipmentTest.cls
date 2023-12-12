// Created By: {Girikon(Shweta Khunteta)}
// Created On: 24/08/2021(DD/MM/YYYY)
// Description/Purpose: test class for testing BatchTrackShipment
// Methods: {Methods name in class}
// Apex Class: {BatchTrackShipment}


@isTest
public with sharing class BatchTrackShipmentTest 
{
    
    @testSetup static void setup() 
    {
        
        Integration_Settings__c ints1 = new Integration_Settings__c();
        ints1.Name='test';
        ints1.UserId__c='548GIRIK0509';
        ints1.USPS_URL__c='https://secure.shippingapis.com/ShippingAPI.dll';
        insert ints1;
        TrackShipment.integrationsettings=ints1;
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

            List<Shipping_Detail__c> myList = new List<Shipping_Detail__c>();
            myList.add(testShipping1);
            insert myList; 
            myList = [select Id, Name,Barcode__c from Shipping_Detail__c];
        }
 @isTest
public static void testBatch()
{
        Test.startTest();
        Test.setMock(HttpCalloutMock.class, new  TrackHttpCallOutTest());
        BatchTrackShipment obj = new BatchTrackShipment();
        DataBase.executeBatch(obj); 
        Test.stopTest();
}

        
       
}