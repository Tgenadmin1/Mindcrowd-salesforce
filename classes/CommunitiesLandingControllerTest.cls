/*
   Created By: {Girikon(Vicky Kumar||Anjali Bhatt)}
   Created On: 1/062020
   Description/Purpose:An apex page controller that takes the user to the right start page based on credentials or lack thereof
Test Class: {CommunitiesLandingControllerTest} {100%}

 An apex page controller that takes the user to the right start page based on credentials or lack thereof
 */
@IsTest public with sharing class CommunitiesLandingControllerTest {
    @IsTest public static void testCommunitiesLandingController() {
        // Instantiate a new controller with all parameters in the page
        
        CommunitiesLandingController controller = new CommunitiesLandingController();
        PageReference pageRef = controller.forwardToStartPage();
        system.debug('checking test:'+pageRef);
        //PageRef is either null or an empty object in test context
        if(pageRef != null){
            String url = pageRef.getUrl();
            if(url != null){
                System.assertEquals(false, String.isEmpty(url));
                //show up in perforce
            }
        }
    }
}