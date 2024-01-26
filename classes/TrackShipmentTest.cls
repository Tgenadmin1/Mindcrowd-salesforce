// Created By: {Girikon(ShwetaKhunteta)}
// Created On: 07/08/2021 (dd/mm/yyyy)
// Description/Purpose:created to test the GetTrackingDetails function {TM-85}
// Methods: {GetTrackingDetails}
// Apex Class: {TrackShipment)}
@isTest
public with sharing class TrackShipmentTest 
{
    public TrackShipmentTest() 
    {

    }

static testMethod void trackShipment_Test() 
{
    Integration_Settings__c ints1 = new Integration_Settings__c();
    ints1.Name='test';
    ints1.UserId__c='548GIRIK0509';
    ints1.Password__c = '752HH00UA860';
    ints1.USPS_URL__c='https://secure.shippingapis.com/ShippingAPI.dll';
    insert ints1;
    TrackShipment.integrationsettings=ints1;
    
    Test.StartTest();
    Test.setMock(HttpCalloutMock.class, new  TrackHttpCallOutTest());
    TrackShipment.GetTrackingDetails('LY715000151CN');
    TrackShipment.GetTrackingDetails('9400100000000000000000');
    Test.StopTest();
} 
    
   
}