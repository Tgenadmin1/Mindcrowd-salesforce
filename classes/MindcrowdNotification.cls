/*
  Created By: {Girikon(Vicky Kumar)}
   Created On: 11/05/2020
   Description/Purpose:get Response from Notification in a salesforce.
   Apex Class: {MindcrowdNotification} [TM-37]
  */
//get Response from Notification in a salesforce.
 public without sharing class MindcrowdNotification 
 { 
   /* @AuraEnabled(cacheable=false)
    public static String getNotificationList()
    {
        String sfdcURL = URL.getSalesforceBaseUrl().toExternalForm();        
        String restAPIURL = sfdcURL + '/services/data/v49.0/connect/notifications';        
        HttpRequest httpRequest = new HttpRequest();        
        httpRequest.setMethod('GET');               
        httpRequest.setHeader('Authorization', 'Bearer  ' + UserInfo.getSessionID());        
        httpRequest.setEndpoint(restAPIURL);
        Http http = new Http();
        HttpResponse httpResponse = http.send(httpRequest);
        System.debug(httpResponse.getBody());
        return httpResponse.getBody();
    }
*/

    //Created by Mukesh Gupta[08 Jun, 2021] for testing
    @AuraEnabled
    public static String getUserNotifications()
    {
        HttpRequest req = new HttpRequest();
        req.setEndpoint('https://mindcrowd2--dev.my.salesforce.com/services/data/v50.0/connect/notifications');
        req.setMethod('GET');
        req.setHeader('Authorization', 'Bearer '+UserInfo.getSessionId());        
        req.setTimeout(120000);
        HttpResponse rep = new Http().send(req);
        System.debug(rep.getBody());
        return rep.getBody();
    }   
}