/*
   Created By: {Girikon(Vicky Kumar||Anjali Bhatt)}
   Created On: 11/05/2020
   Description/Purpose:An apex page controller that takes the user to the right start page based on credentials or lack thereof
   Apex Class: {CommunitiesLandingController} [TM-15]
 An apex page controller that takes the user to the right start page based on credentials or lack thereof
*/
public with sharing class CommunitiesLandingController 
{
    
    /*   // Code we will invoke on page load.
    public PageReference forwardToStartPage() 
    {
        return Network.communitiesLanding();
    }
    */
    
    // Code we will invoke on page load.
    public PageReference forwardToStartPage() 
    {
        String Url;
        Network net=[SELECT Id,  Name, Description, Status FROM Network where Name=:'MindCrowd'];
        if(net!=null)
        {
            Url=  Network.getLoginUrl(net.Id);
            system.debug('at17='+Url);
        }       
        Url = Url.replace('login','');
        system.debug('at17='+Url);
        String language = (CustomLoginController.getCurrentContact()).Language__c;
        if(language=='Español')
        {
            language='es';
        }
        else{
            language='en_US';
        }

        String communityUrl;
       // communityUrl = Url+'games'; //URL of new page      
         communityUrl = Url+System.Label.url_dashboard;//+'?language='+language; //URL of new page        
        return new PageReference(communityUrl);   
    }    
}