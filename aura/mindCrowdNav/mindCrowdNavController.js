({
    doInit: function (component, event, helper) {
        console.log('document.cookie = ', document.cookie);
        var action = component.get("c.getCurrentUser");
        action.setCallback(this, function (response) {
            var state = response.getState();
            if (state === "SUCCESS") {
                var storeResponse = response.getReturnValue();
                component.set("v.ContactId", storeResponse.ContactId);
                console.log('storeResponse.Language__c = ', storeResponse.Language__c)
            }
            var macTouch = false;
            console.log('dddddddd = ', getCookie('macTouch'))
            if(getCookie('macTouch') != 'true'){
                macTouch = true;
                component.set('v.macTouch', true);
                console.log('macTouch11 =' + macTouch );
            }else{
                macTouch = false;
                component.set('v.macTouch', false);
                console.log('macTouch21 =' + macTouch );
            }

            function getCookie(name) {
                var cookieString = "; " + document.cookie;
                cookieString = cookieString.replace('LSKey-c$', '');
                var parts = cookieString.split("; " + name + "=");
                if (parts.length === 2) {
                    return parts.pop().split(";").shift();
                }
                return null;
            }


        });
        $A.enqueueAction(action);
        var actionOnLanguage = component.get("c.getCurrentContact");
        actionOnLanguage.setCallback(this, function (response) {
            var state = response.getState();
            if (state === "SUCCESS") {
                // console.log('the user corresponding language : ',response.getReturnValue());
               
                var storeResponse = response.getReturnValue();
                var language="";
                var tempEnLang="";
                const urlParams = document.location.href.split('?');
                if(storeResponse.Language__c=="Español"){
                    language="es";
                    tempEnLang="es";
                }else if(storeResponse.Language__c=="English"){
                    tempEnLang="en_US";
                    language="en-US";
                }else{
                     tempEnLang="en_US";
                     language="en-US";
                }
                if(!window.location.toString().includes("live-preview")){
                if(document.getElementsByTagName("html")[0].getAttribute("lang") ==language )
                {
                     this.tempEnLang= "en_US";
                }else{
                    window.location = $A.get("$Label.c.Community_language_Url") +'/s/'+ $A.get("$Label.c.url_dashboard_jump");
                   //console.log("dashboard_page_name_EN", $A.get("$Label.c.Community_language_Url") , $A.get("$Label.c.url_dashboard_jump"));
                }
            }
                component.set("v.Language", language);
            }
        });
        $A.enqueueAction(actionOnLanguage);


          //------Getting contactid from the url---------------
          var myPageRef = window.location.href;
          console.log('myPageRef value :',myPageRef);
        //   alert();
        //   var actionGame = component.get("c.getCurrentContact");
        //   actionGame.setCallback(this,function(a) 
        //     {      
        //          var state = a.getState();
        //             if (state === "SUCCESS") {
        //                 var name = a.getReturnValue(); 
        //                 console.log('contact values :--',name);        
        //             }
        //             else if(state==="ERROR"){
        //                 let message='';
        //                 let errors = response.getError();
        //                 if (errors && Array.isArray(errors) && errors.length > 0) {
        //                     message = errors[0].message;
        //                 }
        //                 console.error(message);
        //             }
        //             else{
        //                 console.log('else part');
        //             }
        //     });
        //     $A.enqueueAction(actionGame);
     

    },
    handleRouteChange: function (component, event, helper) {
        const nav = document.querySelector('.slds-builder-header');
        if (component.find("navicon")) {
            component.find("navicon").set("v.iconName", "utility:rows");
            nav.classList.add('m-hide');
        }
    },
    notificationNav: function (component, event, helper) {
        if ("ontouchstart" in document.documentElement){
            // alert('mouse macTouch');
             document.cookie = 'macTouch = ' + true;
            
            }else{
            // alert('mouse click');
             document.cookie = 'macTouch = ' + false;
    
            }
    },
    gameNav: function (component, event, helper) {
        var ContactId = component.get("v.ContactId");
        console.log("ContactId", ContactId);
        //   var userId = $A.get("$SObjectType.CurrentUser.Id");
        //   console.log('Hi'+userId);
        component.find("navService").navigate({
            type: "standard__webPage",
            attributes: {
                url: $A.get("$Label.c.Community_Url") + '/s/'+$A.get("$Label.c.url_dashboard")
            }
        });
       
    },
    myprofileNav: function (component, event, helper) {
        var ContactId = component.get("v.ContactId");
        console.log("ContactId", ContactId);
        //   var userId = $A.get("$SObjectType.CurrentUser.Id");
        //   console.log('Hi'+userId);
        component.find("navService").navigate({
            type: "standard__webPage",
            attributes: {
                url: $A.get("$Label.c.Community_Url") + '/s/'+$A.get("$Label.c.url_profile")+'/' + ContactId
            }
        });
    },
    myresults: function (component, event, helper) {
        var ContactId = component.get("v.ContactId");
        console.log("ContactId", ContactId);
        //   var userId = $A.get("$SObjectType.CurrentUser.Id");
        //   console.log('Hi'+userId);
        component.find("navService").navigate({
            type: "standard__webPage",
            attributes: {
                url: $A.get("$Label.c.Community_Url") + '/s/'+ $A.get("$Label.c.url_myresults")
            }
        });
    },
    surveysNav: function (component, event, helper) {
        var ContactId = component.get("v.ContactId");
        console.log("ContactId", ContactId);
        
        component.find("navService").navigate({
            type: "standard__webPage",
            attributes: {
                url: $A.get("$Label.c.Community_Url") + '/s/' + $A.get("$Label.c.url_surveys")
            }
        });
    }

})