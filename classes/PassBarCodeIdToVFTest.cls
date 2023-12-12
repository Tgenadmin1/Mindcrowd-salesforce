@isTest
public with sharing class PassBarCodeIdToVFTest 
{
    public PassBarCodeIdToVFTest() 
    {

    }
    @isTest  
    public static void testMethod1() 
    {
        Contact con= new Contact();
        con.FirstName='Shweta';
        con.LastName='khunteta';
        insert con;
        System.debug(con);
        Research_Campaign__c res= new Research_Campaign__c();
        res.Name='Covid';
        insert res;
        List <Shipping_Detail__c> lstShipping = new List<Shipping_Detail__c>();

        Shipping_Detail__c testshippingbarcode = new Shipping_Detail__c();
        testshippingbarcode.Shipment_Status__c='Consented' ;
        testshippingbarcode.Contact_Id__c=con.Id;
        testshippingbarcode.Campaign__c=res.Id;
        lstShipping.add(testshippingbarcode);
        System.debug(lstShipping);
        //  Shipping_Detail__c testshippingbarcode1 = new Shipping_Detail__c();
        //  testshippingbarcode1.Shipment_Status__c='Consented' ;
        //  testshippingbarcode1.Contact_Id__c=con.Id;
        //  lstShipping.add(testshippingbarcode1);

        insert  lstShipping;

        Test.startTest();
        Test.setCurrentPage(Page.BarcodePrintForm);
        ApexPages.StandardSetController stdSetController = new ApexPages.StandardSetController(lstShipping);
        stdSetController.setSelected(lstShipping);
        PassBarCodeIdToVF ext = new PassBarCodeIdToVF(stdSetController);
        Test.stopTest();
    }
   
}