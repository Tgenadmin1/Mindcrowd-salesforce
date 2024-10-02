/*
   Created By: {Girikon(Vicky Kumar||Anjali Bhatt)}
   Created On: 16/05/2020
   Description/Purpose:An apex page controller that exposes the site login functionality
   Apex Class: {CommunitiesLoginController} [TM-14]
  An apex page controller that exposes the site login functionality
 */
global with sharing class CommunitiesLoginController {

    global CommunitiesLoginController () {}
    
    // Code we will invoke on page load.
    global PageReference forwardToAuthPage() {
    	String startUrl = System.currentPageReference().getParameters().get('startURL');
        system.debug('startUrl=====>'+startUrl);
    	String displayType = System.currentPageReference().getParameters().get('display');
        return Network.forwardToAuthPage(startUrl, displayType);
    }
    
}