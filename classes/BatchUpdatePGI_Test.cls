// Created By: {Girikon(Sunil kumar)}
// Created On: 08/09/2022
// Description/Purpose: test class for testing BatchUpdatePGI
// Apex Class: {BatchOfGames}
@isTest
public with sharing class BatchUpdatePGI_Test {
    Static testMethod void testBatchExecuteMethod()
    { 
        Account acc=new Account();
        acc.Name='Test Account';
        insert acc;
        Contact con=new Contact();
        con.FirstName='Test';
        con.LastName='Contact';
        con.AccountId=acc.Id;
        insert con;
        Game_Detail__c gd=new Game_Detail__c();
        gd.Name='DLTRS';
        gd.Reactivation_Days__c=365;
        insert gd;
       
        Participant_Game_Info__c insertPGI=new Participant_Game_Info__c();
        insertPGI.Contact_Name__c=con.Id;
        insertPGI.IP_Address__c='103.147.0.90';
        insertPGI.Game_Name__c=gd.Id;
        insert insertPGI;
         IpAddressData__c IPD= new IpAddressData__c();
        IPD.Name='userOne';
        IPD.apiKey__c='8289ac328847197b92c5fa681c2168959470f6c0345d44c353e3cccd';
        IPD.url__c='https://api.ipdata.co/';
        insert IPD;
        String ipAddre='103.147.0.90';

        Map<String, Object> results=new Map<String, Object>();
        results.put('ID',insertPGI.Id);

        Test.startTest();
        Test.setMock(HttpCalloutMock.class, new MockHttpResponseGenerator());
        BatchUpdatePGI buPgi = new BatchUpdatePGI();
        database.executeBatch(buPgi);
        Test.stopTest();

     }
}