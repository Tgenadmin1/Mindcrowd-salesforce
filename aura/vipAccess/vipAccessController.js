({
    initialize: function(component, event, helper) {
        $A.get("e.siteforce:registerQueryEventMap").setParams({"qsToEvent" : helper.qsToEventMap}).fire();    
        $A.get("e.siteforce:registerQueryEventMap").setParams({"qsToEvent" : helper.qsToEventMap2}).fire();
        component.set('v.isUsernamePasswordEnabled', helper.getIsUsernamePasswordEnabled(component, event, helper));
        component.set("v.isSelfRegistrationEnabled", helper.getIsSelfRegistrationEnabled(component, event, helper));
        component.set("v.communityForgotPasswordUrl", helper.getCommunityForgotPasswordUrl(component, event, helper));
        component.set("v.communitySelfRegisterUrl", helper.getCommunitySelfRegisterUrl(component, event, helper));
        localStorage.setItem('vipresult', 'false');
        localStorage.setItem('recentresult', 'false');
        localStorage.setItem('longraph', 'false');
        localStorage.setItem('firstclick', 'false');
       
    },
    
    // myAction: function (component, event, helper) {
    //     console.log('sssst = ', document.getElementsByClassName('link'));
    //     document.getElementById('sfdc_password_container').attributes('title', 'dddddddddddddddd');


    // },


    handleLogin: function (component, event, helper) {
        helper.handleLogin(component, event, helper);
    },
    
    setStartUrl: function (component, event, helper) {
        var startUrl = event.getParam('startURL');
        console.log('startUrl===>',startUrl);
        if(startUrl) {
            component.set("v.startUrl", startUrl);
        }
    },
    
    setExpId: function (component, event, helper) {
        var expId = event.getParam('expid');
        if (expId) {
            component.set("v.expid", expId);
        }
        helper.setBrandingCookie(component, event, helper);
    },
    
    onKeyUp: function(component, event, helper){
        //checks for "enter" key
        if (event.getParam('keyCode')===13) {
            helper.handleLogin(component, event, helper);
        }
    },
    
    navigateToForgotPassword: function(cmp, event, helper) {
        var forgotPwdUrl = cmp.get("v.communityForgotPasswordUrl");
        if ($A.util.isUndefinedOrNull(forgotPwdUrl)) {
            forgotPwdUrl = cmp.get("v.forgotPasswordUrl");
        }
        var startUrl = cmp.get("v.startUrl");
        if(startUrl){
            if(forgotPwdUrl.indexOf("?") === -1) {
                forgotPwdUrl = forgotPwdUrl + '?startURL=' + decodeURIComponent(startUrl);
            } else {
                forgotPwdUrl = forgotPwdUrl + '&startURL=' + decodeURIComponent(startUrl);
            }
        }
        var attributes = { url: forgotPwdUrl };
        $A.get("e.force:navigateToURL").setParams(attributes).fire();
    },
    
    navigateToSelfRegister: function(cmp, event, helper) {
        var selfRegUrl = cmp.get("v.communitySelfRegisterUrl");
        if (selfRegUrl == null) {
            selfRegUrl = cmp.get("v.selfRegisterUrl");
        }
        var startUrl = cmp.get("v.startUrl");
        if(startUrl){
            if(selfRegUrl.indexOf("?") === -1) {
                selfRegUrl = selfRegUrl + '?startURL=' + decodeURIComponent(startUrl);
            } else {
                selfRegUrl = selfRegUrl + '&startURL=' + decodeURIComponent(startUrl);
            }
        }
        var attributes = { url: selfRegUrl };
        $A.get("e.force:navigateToURL").setParams(attributes).fire();
    },
    closeModel: function(component, event, helper) {
        // Set isModalOpen attribute to false  
        component.set("v.isModalOpen", false);
     },
})