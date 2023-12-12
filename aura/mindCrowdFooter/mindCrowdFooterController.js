({    
    myAction: function (component, event, helper) 
    {
        //newsletter-email
      //  var cmpTarget = cmp.find('email2');
       // $A.util.addClass(cmpTarget, 'newsletter-email');

       var svgUrl = $A.get('$Resource.twitter');
       component.set('v.svgUrl', svgUrl);

       var lang = document.documentElement.lang;
       if(lang == 'en-US')
       {
        component.set('v.showRSS',true);
       }
		
        window.setTimeout(
            $A.getCallback(function() {
                var cmpTarget = component.find('email2');
                 $A.util.addClass(cmpTarget, 'newsletter-email');
            }), 2500
        );
        var today = new Date();
        var varyear = today.getFullYear();
       // console.log('currentYear = ', varyear);
        component.set('v.year', varyear);
    },
    
    // problem : function(component, event, helper) {
    //     //
    //    // alert('test = '+document.querySelector("body").classList.contains("comm-page-custom-test"))
    //     if (!document.querySelector("body").classList.contains("comm-page-home")){
    //         component.find("navService").navigate({ 
    //             type: "standard__webPage", 
    //             attributes: { 
    //                 url: $A.get("$Label.c.Community_Url")+'/s/#problem'
    //             } 
    //         });
              
    //         }
    // },
    // opportunity : function(component, event, helper) {
    //     if (!document.querySelector("body").classList.contains("comm-page-home")){
    //         component.find("navService").navigate({ 
    //             type: "standard__webPage", 
    //             attributes: { 
    //                 url: $A.get("$Label.c.Community_Url")+'/s/#opportunity'
    //             } 
    //         });
              
    //         }
    // },
    // project : function(component, event, helper) {
    //     if (!document.querySelector("body").classList.contains("comm-page-home")){
    //         component.find("navService").navigate({ 
    //             type: "standard__webPage", 
    //             attributes: { 
    //                 url: $A.get("$Label.c.Community_Url")+'/s/#project'
    //             } 
    //         });
              
    //         }
    // },
    // team : function(component, event, helper) {
    //     if (!document.querySelector("body").classList.contains("comm-page-home")){
    //         component.find("navService").navigate({ 
    //             type: "standard__webPage", 
    //             attributes: { 
    //                 url: $A.get("$Label.c.Community_Url")+'/s/#team'
    //             } 
    //         });
              
    //         }
    // },
    // faq : function(component, event, helper) {
       
    //         component.find("navService").navigate({ 
    //             type: "standard__webPage", 
    //             attributes: { 
    //                // url: '/research/s/#team'
    //                url: $A.get("$Label.c.Community_Url")+'/s/info-faq'
    //             } 
    //         });
      
    // },
    subscribeEmail : function(component,event,helper){
        var sEmail=component.find("email2").get("v.value");
        //console.log('sEmail = ', sEmail);
       // const emailRegex=/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
       const emailRegex = new RegExp('[a-z0-9]+@[a-z]+\.[a-z]{2,3}');
        if (!emailRegex.test(sEmail) || sEmail=="" || sEmail ==undefined) {
            component.set("v.isModalOpen", true);
            component.set("v.isModalOpenEmailSave", false);
            var cmpTarget = component.find("changeIt");
            $A.util.toggleClass(cmpTarget, 'slds-has-error');
        }
        else{
            component.set("v.isModalOpen", false);
            // component.set("v.isModalOpenEmailSave", true);
            console.log('vaof semail:',sEmail);
            var action = component.get("c.saveSubscribeEmail");
            action.setParams({"subsc" : sEmail});
            action.setCallback(this, function(response) {
            var state = response.getState();
            console.log('getting details'+response.getState());

            if(state === "SUCCESS") {
                //component.set("v.message", "Contact created successfully");
                console.log('inside state success'+response.getReturnValue());
                component.set("v.isModalOpenEmailSave", true);
                component.find("email2").set("v.value","");
            }
            else if (state === "ERROR") {
                console.log('Problem saving contact, response state:s ' + state);
                component.set("v.isModalOpenEmailSave", false);
                component.set("v.isModalOpen", true);
                var cmpTarget = component.find('email2');
                 $A.util.addClass(cmpTarget, 'slds-has-error');
              

            }
            else {
                console.log('Unknown problem, response state: ' + state);
                component.set("v.isModalOpenEmailSave", false);
                component.set("v.isModalOpen", true);
                // var cmpTarget = component.find('email2');
                //  $A.util.addClass(cmpTarget, 'slds-has-error');
            }
        });
            $A.enqueueAction(action);
        }   
    },
    closeModel: function(component, event, helper) {
        // Set isModalOpen attribute to false  
        component.set("v.isModalOpen", false);
        component.set("v.isModalOpenEmailSave", false);
    }

})