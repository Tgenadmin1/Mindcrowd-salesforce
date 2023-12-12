({
    qsToEventMap: {
        'expid'  : 'e.c:setExpId'
    },
    // checkForgotPassword: function (component, event, helpler) {
    //     var username = component.find("username").get("v.value");

        
    //     //console.log('sEmail = ', sEmail);
    //    // const emailRegex=/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    //     var emailRegex = new RegExp('[a-z0-9]+@[a-z]+\.[a-z]{2,3}');
    //     if (!emailRegex.test(username) || username=="" || username ==undefined) {
           
    //         component.set("v.isModalOpen",true);
            
    //     }else{
    //         component.set("v.isModalForValidEmail",true);
            
             
    //     }
       

    // },
    handleForgotPassword: function (component, event, helpler) {
        
        var username = component.find("username").get("v.value");
        var checkEmailUrl = component.get("v.checkEmailUrl");
        console.log('checkEmailUrl',checkEmailUrl);
        var action = component.get("c.forgotPassword");
        action.setParams({username:username, checkEmailUrl:checkEmailUrl});
        action.setCallback(this, function(a) {
            var rtnValue = a.getReturnValue();
            console.log('ddddd',rtnValue);
            if (rtnValue != null) {
               component.set("v.errorMessage",rtnValue);
              // component.set("v.showError",true);
               component.set("v.isModalOpen",true);
            }
            else{
                   // component.set("v.errorMessage",rtnValue);
                   // component.set("v.showError",true);
                   // component.set("v.isModalForValidEmail",true);
            }
       });
        $A.enqueueAction(action);
    },

    setBrandingCookie: function (component, event, helpler) {
        var expId = component.get("v.expid");
        if (expId) {
            var action = component.get("c.setExperienceId");
            action.setParams({expId:expId});
            action.setCallback(this, function(a){ });
            $A.enqueueAction(action);
        }
    }
})