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
        console.log('sssssssssssssssssssurlParams = ', urlParams);
        const showConformModal = urlParams.get('done');
        //console.log('sssssssssssssssssssurlParams = ', contact);
        if(showConformModal){
            component.set("v.isModalForValidEmail", true);
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