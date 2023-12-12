// Created By: {Girikon(Sunil)}
// Created On: 08/13/2021
// Apex Class: {WebServiceForIpData)}
@isTest
public with sharing class WebServiceForIpDataTest 
{ 
    @isTest
    public static void getIPDataTest()
    {
        //Create custom setting record
        IpAddressData__c IPD= new IpAddressData__c();
        IPD.Name='userOne';
        IPD.apiKey__c='8289ac328847197b92c5fa681c2168959470f6c0345d44c353e3cccd';
        IPD.url__c='https://api.ipdata.co/';
        insert IPD;
        String ipAddre='103.147.0.90';
        Test.startTest();
        Test.setMock(HttpCalloutMock.class, new MockHttpResponseGenerator());
        Map<String, Object> res = WebServiceForIpData.getIPData(ipAddre);
        Test.stopTest();
        //WebServiceForIpData.getIPData(ipAddre);
       // Test.stopTest();
        //System.assertNotEquals(null,result, 'The callout returned a null response.');
    }
}