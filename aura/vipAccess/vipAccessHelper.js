({

    qsToEventMap: {
        'startURL': 'e.c:setStartUrl'

    },

    qsToEventMap2: {
        'expid': 'e.c:setExpId'
    },

    handleLogin: function (component, event, helpler) {
        if ("ontouchstart" in document.documentElement) {
            document.cookie = 'macTouch = ' + true;
        } else {
            document.cookie = 'macTouch = ' + false;
        }
        var username = component.find("username").get("v.value");
        var password = component.find("password").get("v.value");
        var action = component.get("c.routeCommunityPage");
        var startUrl = component.get("v.startUrl");
        var userError = component.get("v.Login_User_Error");
        var emailError = component.get("v.Login_Email_Error");
        var passwordError = component.get("v.Login_Password_Error");
        startUrl = decodeURIComponent(startUrl);
        console.log('startUrl', startUrl);
        console.log('username', username);
        action.setParams({ username: username, password: password, startUrl: startUrl });
        action.setCallback(this, function (a) {
            var rtnValue = a.getReturnValue();
            console.log('rtnValue:', rtnValue);
            if (rtnValue !== null) {
                //window.location.href=rtnValue;

                if ('Enter a value in the User Name field.' === rtnValue) {
                    console.log('userError:', userError);
                    rtnValue = userError;
                    component.set("v.errorMessage", rtnValue);
                    component.set("v.isModalOpen", true);
                }
                if ('Your login attempt has failed. Make sure the username and password are correct.' === rtnValue) {
                    rtnValue = emailError;
                    component.set("v.errorMessage", rtnValue);
                    component.set("v.isModalOpen", true);
                }
                if ('Enter a value in the Password field.' === rtnValue) {
                    rtnValue = passwordError;
                    component.set("v.errorMessage", rtnValue);
                    component.set("v.isModalOpen", true);
                }

            }
        });
        $A.enqueueAction(action);
    },

    getIsUsernamePasswordEnabled: function (component, event, helpler) {
        var action = component.get("c.getIsUsernamePasswordEnabled");
        action.setCallback(this, function (a) {
            var rtnValue = a.getReturnValue();
            if (rtnValue !== null) {
                component.set('v.isUsernamePasswordEnabled', rtnValue);
                console.log('rtn value :', rtnValue);
            }
        });
        $A.enqueueAction(action);
    },

    getIsSelfRegistrationEnabled: function (component, event, helpler) {
        var action = component.get("c.getIsSelfRegistrationEnabled");
        action.setCallback(this, function (a) {
            var rtnValue = a.getReturnValue();
            if (rtnValue !== null) {
                component.set('v.isSelfRegistrationEnabled', rtnValue);
            }
        });
        $A.enqueueAction(action);
    },

    getCommunityForgotPasswordUrl: function (component, event, helpler) {
        var action = component.get("c.getForgotPasswordUrl");
        action.setCallback(this, function (a) {
            var rtnValue = a.getReturnValue();
            if (rtnValue !== null) {
                component.set('v.communityForgotPasswordUrl', rtnValue);
            }
        });
        $A.enqueueAction(action);
    },

    getCommunitySelfRegisterUrl: function (component, event, helpler) {
        var action = component.get("c.getSelfRegistrationUrl");
        action.setCallback(this, function (a) {
            var rtnValue = a.getReturnValue();
            if (rtnValue !== null) {
                component.set('v.communitySelfRegisterUrl', rtnValue);
            }
        });
        $A.enqueueAction(action);
    },

    setBrandingCookie: function (component, event, helpler) {
        var expId = component.get("v.expid");
        if (expId) {
            var action = component.get("c.setExperienceId");
            action.setParams({ expId: expId });
            action.setCallback(this, function (a) { });
            $A.enqueueAction(action);
        }
    }
})