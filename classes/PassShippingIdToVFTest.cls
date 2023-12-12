// Created By: {Girikon(ShwetaKhunteta)}
// Created On: 27/07/2021 DD/MM/YYYY
// Description/Purpose:A Test class for PassShippingIdToVF
// Methods: {}
// Apex Class: {PassShippingIdToVF}

@isTest
public with sharing class PassShippingIdToVFTest 
{
    public PassShippingIdToVFTest() 
    {

    }
@isTest  
    public static void testShippingId() 
    {	Integration_Settings__c ints1 = new Integration_Settings__c();
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
       // ints1.MindCrowdPhone__c='6023438400';
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
        Research_Campaign__c res= new Research_Campaign__c();
        res.Name='Covid';
        res.Weight_in_Ounces__c=3;
        res.Usps_Service_Type__c='FIRST CLASS';
         res.isReturnLabelNeeded__c=true;
        insert res;
        
       
        List <Shipping_Detail__c> lstShipping = new List<Shipping_Detail__c>();

        Shipping_Detail__c testshippingbarcode = new Shipping_Detail__c();
        testshippingbarcode.Shipment_Status__c='Consented';
        testshippingbarcode.Campaign__c=res.Id;
        testshippingbarcode.Contact_Id__c=con.Id;
        lstShipping.add(testshippingbarcode);
        System.debug(lstShipping);
        
        insert  lstShipping;
        System.debug('---after insert---'+lstShipping);
     Test.setMock(HttpCalloutMock.class, new LabelHttpCallOutMock());
        Test.startTest();
        Test.setCurrentPage(Page.GetUSPSLabelVFPage);
        ApexPages.StandardSetController stdSetController = new ApexPages.StandardSetController(lstShipping);
        stdSetController.setSelected(lstShipping);
        PassShippingIdToVF ext = new PassShippingIdToVF(stdSetController);
        ext.shippingId();
        Test.stopTest();
    }

}