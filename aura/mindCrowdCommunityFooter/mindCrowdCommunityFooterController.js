({
    doInit : function(component, event, helper) {
        var svgUrl = $A.get('$Resource.twitter');
        component.set('v.svgUrl', svgUrl);
 
        var action = component.get("c.getCurrentUser");
        action.setCallback(this, function(response) {
            var state = response.getState();
            if (state === "SUCCESS") {
                var storeResponse = response.getReturnValue();
                component.set("v.ContactId", storeResponse.ContactId);
               
            }
        });
        $A.enqueueAction(action);
        var today = new Date();
        var varyear = today.getFullYear();
       // console.log('currentYear = ', varyear);
        component.set('v.year', varyear);
        
    },
      handleRouteChange: function(component, event, helper) {
        const nav = document.querySelector('.slds-builder-header');
        if(component.find("navicon")){
            component.find("navicon").set("v.iconName","utility:rows");
            nav.classList.add('m-hide');
        }        
    },
    notificationNav : function(component, event, helper) {      
        //  component.find("navService").navigate({ 
        //      type: "standard__webPage", 
        //      attributes: { 
        //         url: '/research/s/notifications' 
        //      } 
             
        //  }); 
        //alert('test');
       //this.querySelector(".unsNotificationsCounter").setAttribute('id', 'opportunity');
        // console.log('notification Nav Click 1' + document.getElementsByClassName("unsNotificationsCounter"));
       // component.getElementsByClassName("unsNotificationsCounter")[0].click();
       //var notification = document.getElementById("notification").
      // console.log('notification Nav Click 2' + component.get("c.getCurrentUser").getState());       
      // test.click(); // this will trigger the click event
      //component.find('notifLib').getElementsByClassName("unsNotificationsCounter")[0].click();
      
    },
    gameNav : function(component, event, helper) {      
        // component.find("navService").navigate({ 
        //     type: "standard__webPage", 
        //     attributes: { 
        //         url: '/research/s/games' ,
        //         "isredirect" :false
        //     } 
        // });
        // document.getElementsByClassName("m-menu-btn")[0].click();
        var address = $A.get("$Label.c.Community_Url")+'/s/'+$A.get("$Label.c.url_dashboard");
         var urlEvent = $A.get("e.force:navigateToURL");
         urlEvent.setParams({
            "url": address,
            "isredirect" :false
         });
         urlEvent.fire(); 
        
    },
    myprofileNav: function(component, event, helper) { 
        var ContactId=component.get("v.ContactId");
        console.log("ContactId",ContactId);
     //   var userId = $A.get("$SObjectType.CurrentUser.Id");
     //   console.log('Hi'+userId);
        component.find("navService").navigate({ 
            type: "standard__webPage", 
            attributes: { 
                url: $A.get("$Label.c.Community_Url")+'/s/profile/'+ContactId
            } 
        });
    },
    myresults: function(component, event, helper) { 
        var ContactId=component.get("v.ContactId");
        console.log("ContactId",ContactId);
     //   var userId = $A.get("$SObjectType.CurrentUser.Id");
     //   console.log('Hi'+userId);
        component.find("navService").navigate({ 
            type: "standard__webPage", 
            attributes: { 
                url: $A.get("$Label.c.Community_Url")+'/s/myresults/'
            } 
        });
    },

})