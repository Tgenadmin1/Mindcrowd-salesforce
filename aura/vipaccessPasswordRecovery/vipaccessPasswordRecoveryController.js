({
    
    handleForgotPassword: function (component, event, helpler) {
        helpler.handleForgotPassword(component, event, helpler);
    },

    onKeyUp: function(component, event, helpler){
    //checks for "enter" key
        if (event.getParam('keyCode')===13) {
            helpler.handleForgotPassword(component, event, helpler);
        }
    },
    
    setExpId: function (component, event, helper) {
   
        var expId = event.getParam('expid');
        if (expId) {
            component.set("v.expid", expId);
        }
        helper.setBrandingCookie(component, event, helper);
    },

    initialize: function(component, event, helper) {
        
        const urlParams = new URLSearchParams(document.location.search.substring(1));
        console.log('urlParams = ', urlParams);
        const showConformModal = urlParams.get('done');
        const Email = urlParams.get('Email');
        const participantcode = urlParams.get('participantcode');
        //console.log('sssssssssssssssssssurlParams = ', contact);
        if(showConformModal){
            component.set("v.isModalForValidEmail", true);
        }
        if(Email){
            component.set("v.username", Email);
            component.set("v.disabled", true);            
        }
        else if(participantcode){
            helper.fetchContact(component,participantcode);
        }
        $A.get("e.siteforce:registerQueryEventMap").setParams({"qsToEvent" : helper.qsToEventMap}).fire();
    },
    closeModel: function(component, event, helper) {
        // Set isModalOpen attribute to false  
        component.set("v.isModalOpen", false);
     },
     closeModelForValidEmail: function(component, event, helper) {
        // Set isModalOpen attribute to false  
        component.set("v.isModalForValidEmail", false);
       // helper.handleForgotPassword(component, event, helper);
     },
})