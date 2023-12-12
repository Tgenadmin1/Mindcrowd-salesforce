@isTest
public with sharing class PrintLabelControllerTest 
{
    public PrintLabelControllerTest() 
    {

    }
    @isTest
    public static void doSomethingTest()
    {
        Contact c= new Contact();
        c.FirstName='MindCrowd';
        c.LastName='Research';
        insert c;
        Research_Campaign__c rcampaign= new Research_Campaign__c();
        rcampaign.Name='Covid';
        insert rcampaign;
        List <Shipping_Detail__c> printlabeltestlist = new List<Shipping_Detail__c>();

        Shipping_Detail__c testshipping = new Shipping_Detail__c();
        testshipping.Campaign__c= rcampaign.Id;
        testshipping.Contact_Id__c= c.Id;
        printlabeltestlist.add(testshipping);
        insert printlabeltestlist;
       
        Test.startTest();
        Test.setCurrentPage(Page.PrintLabelVF);
        ApexPages.StandardSetController stdSetController = new ApexPages.StandardSetController(printlabeltestlist);
        stdSetController.setSelected(printlabeltestlist);
        PrintLabelController ext = new PrintLabelController(stdSetController);        
        Test.stopTest();
    }
}