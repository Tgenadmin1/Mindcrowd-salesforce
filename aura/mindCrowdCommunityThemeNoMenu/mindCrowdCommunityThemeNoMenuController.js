({
    doInit : function(component, event, helper) {
		let currentUserId = $A.get("$SObjectType.CurrentUser.Id");
        console.log('currentUserId = ' + currentUserId);
      //  helper.openGames(component, event, helper, currentUserId);
      var debugConsole = $A.get("$Label.c.debugConsole");
        if (debugConsole === 'false') {
            if ( typeof(window.console) === 'undefined') { window.console = {}; }
            window.console.log = function () {};
        }
        if(currentUserId){
            component.set("v.isLoginTrue",true);
        }else{
            component.set("v.isLoginTrue",false);
            var address = $A.get("$Label.c.Community_Url")+'/s/'+$A.get("$Label.c.url_login");
            var urlEvent = $A.get("e.force:navigateToURL");
            urlEvent.setParams({
                "url": address,
                "isredirect" :false
            });
            urlEvent.fire();
        }
		// history.pushState(null, null, 'no-back-button');
        // window.addEventListener('popstate', function(event) {
        // //history.pushState(null, null, 'no-back-button');
        
        // });
        // console.log('test test test');
        // window.history.pushState(null, null, window.location.href);
        // window.onpopstate = function () {
        //     window.history.go(1);
        // }
        // helper.preventLeaving();
        

        


	},
    
    handleRouteChange: function(component, event, helper) {
        const nav = document.querySelector('.slds-builder-header');
        if(component.find("navicon")){
            component.find("navicon").set("v.iconName","utility:rows");
            nav.classList.add('m-hide');
        } 

    },
    // afterSave: function(component, event, helper) {
    //     helper.allowLeaving();
    // }

    
})