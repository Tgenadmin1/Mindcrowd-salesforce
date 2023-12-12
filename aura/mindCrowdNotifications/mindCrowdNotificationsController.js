({
	doInit : function(component, event, helper) {
		let currentUserId = $A.get("$SObjectType.CurrentUser.Id");
        console.log('currentUserId = ' + currentUserId);
        if(currentUserId){
            component.set("v.isLoginTrue",true);
        }
        else{
            component.set("v.isLoginTrue",false);
            var address = $A.get("$Label.c.Community_Url")+'/s/'+$A.get("$Label.c.url_login");
            var urlEvent = $A.get("e.force:navigateToURL");
            urlEvent.setParams({
                "url": address,
                "isredirect" :false
            });
            urlEvent.fire();
        }
        var debugConsole = $A.get("$Label.c.debugConsole");
        if (debugConsole === 'false') {
            if ( typeof(window.console) === 'undefined') { window.console = {}; }
            window.console.log = function () {};
        }

		
	},
    macTouch: function(component, event, helper){

       // alert('sssss');
        if ("ontouchstart" in document.documentElement){
            // alert('mouse macTouch');
             document.cookie = 'macTouch = ' + true;
            
            }else{
            // alert('mouse click');
             document.cookie = 'macTouch = ' + false;
    
            }
    },
	openMobileNav: function(component, event, helper){
        const nav = document.querySelector('.slds-builder-header');
        
        if(nav.classList.contains('m-hide')){
            event.getSource().set("v.iconName","utility:close");
        }
        else{
            event.getSource().set("v.iconName","utility:rows");
        }
        nav.classList.toggle('m-hide');
        //d-none
    },
    handleRouteChange: function(component, event, helper) {
        const nav = document.querySelector('.slds-builder-header');
        if(component.find("navicon")){
            component.find("navicon").set("v.iconName","utility:rows");
            nav.classList.add('m-hide');
        }        
    }

	
	
	
})