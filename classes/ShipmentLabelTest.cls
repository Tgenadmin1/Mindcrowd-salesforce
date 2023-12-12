// Created By: {Girikon(ShwetaKhunteta)}
// Created On: 05/08/2021 (dd/mm/yyyy)
// Description/Purpose:created to test the ShipmentLabel class
// Methods: {getLabel}
// Apex Class: {ShipmentLabel)}
@isTest
public with sharing class ShipmentLabelTest 
{   
   @isTest
    public static void getLabelTest() 
    {    
        Integration_Settings__c ints1 = new Integration_Settings__c();
        ints1.Name='test';
        ints1.UserId__c='548GIRIK0509';
        ints1.Label_Service_Api__c='eVSCertify';
        ints1.eVSLabelUrl__c='https://stg-secure.shippingapis.com/ShippingAPI.dll';
        ints1.MindCrowdName__c='TGen headquarters';
        ints1.MindCrowdFirmName__c='TGen';
        ints1.MindCrowdAddress2__c='445 N 5TH ST';
        ints1.MindCrowdCity__c='Phoenix';
        ints1.MindCrowdState__c='AZ';
        ints1.MindCrowdZip5__c= 85004;
        //ints1.MindCrowdPhone__c='6023438400';
        insert ints1;
        ShipmentLabel.integrationsettings=ints1;
        
        Contact con= new Contact();
        con.FirstName='Adam';
        con.LastName='Smith';
        con.MailingStreet='PO Box 100';
        con.MailingCity='Washington';
        con.MailingStateCode='DC';
        con.MailingPostalCode='20260';
        insert con;
        System.debug(con);
        
        Research_Campaign__c res= new Research_Campaign__c();
        res.Name='Covid';
        res.Weight_in_Ounces__c=3;
        res.isReturnLabelNeeded__c=true;
        res.Usps_Service_Type__c='FIRST CLASS';
        insert res;
        
        List <Shipping_Detail__c> lstShipping = new List<Shipping_Detail__c>();
        Shipping_Detail__c testshippingbarcode = new Shipping_Detail__c();
        testshippingbarcode.Shipment_Status__c='Consented';
        testshippingbarcode.Campaign__c=res.Id;
        testshippingbarcode.Contact_Id__c=con.Id;
 
        Address ard=new Address();
           // ard.Address__Street__s='';
           // ard.Address__StateCode__s='';
           // ard.Address__CountryCode__s='';
           // ard.Address__City__s='';
           // ard.Address__PostalCode__s='';
           // insert ard;
       // testshippingbarcode.Address__c.add(ard);
        lstShipping.add(testshippingbarcode);
        System.debug(lstShipping);
        insert lstShipping;
        String strid=testshippingbarcode.Id;
        String stridConName= 'james';
 
        Map<String,Address> idAddressMap = new Map<String,Address>();
        Map<String,Research_Campaign__c> campaignTestMap = new Map<String,Research_Campaign__c>();
        Map<String,String> idContactName = new Map<String,String>();
        idAddressMap.put(strid,ard);
        campaignTestMap.put(strid,res);
        idContactName.put(strid,stridConName);
        
        Test.setMock(HttpCalloutMock.class, new LabelHttpCallOutMock());
        Test.StartTest();
        ShipmentLabel.getLabel(idAddressMap,campaignTestMap,idContactName);
        Test.StopTest();
    } 

}