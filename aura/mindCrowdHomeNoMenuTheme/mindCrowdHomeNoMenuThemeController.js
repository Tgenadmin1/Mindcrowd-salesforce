({

    doInit: function (component, event, helper) {

        component.set('v.resultUrl', window.location);

       // window.addEventListener('beforeunload', function (e) {
        // window.addEventListener('beforeunload', (event) => {
        //    event.preventDefault();
        //    event.returnValue = "";
        //     //window.location.href = $A.get("$Label.c.Community_Url") + '/s/';
        // });
        var today = new Date();
        var varyear = today.getFullYear();
       // console.log('currentYear = ', varyear);
        component.set('v.year', varyear);
        var debugConsole = $A.get("$Label.c.debugConsole");
        if (debugConsole === 'false') {
            if ( typeof(window.console) === 'undefined') { window.console = {}; }
            window.console.log = function () {};
        }

    },
    afterSave: function(component, event, helper) {
        helper.allowLeaving();
    },
    openEmail: function (component, event, helper) {
        var url = 'mailto:name@rapidtables.com?subject=The%20subject%20of%20the%20mail';
        window.location.href = url;
    },
    copyClassic: function (component, event, helper) {

        var urlClassic = document.getElementById('urlClassic');
        urlClassic.select();
        document.queryCommandSupported('copy');
        document.execCommand('copy');
        //urlClassic.remove();

        var source = event.getSource();
        source.set('v.label', 'COPIED!');
        setTimeout(function () {
            source.set('v.label', 'Copy');
        }, 2000);
    },
    handleClick: function (component, event, helper) {
        // component.find("navService").navigate({
        //     type: "standard__webPage",
        //     attributes: {
        //         url: $A.get("$Label.c.Community_Url") + '/s/consent',
        //         "isredirect": false
        //     }
        // });
        window.location.href = $A.get("$Label.c.Community_Url") + '/s/consent';
    },
    openMobileNav: function (component, event, helper) {
        const nav = document.querySelector('.slds-builder-header');

        if (nav.classList.contains('m-hide')) {
            event.getSource().set("v.iconName", "utility:close");
        }
        else {
            event.getSource().set("v.iconName", "utility:rows");
        }
        nav.classList.toggle('m-hide');
        //d-none
    },
    handleRouteChange: function (component, event, helper) {
        const nav = document.querySelector('.slds-builder-header');
      //  var comName = component.get('v.customSettingValue');
        if (component.find("navicon")) {
            component.find("navicon").set("v.iconName", "utility:rows");
            nav.classList.add('m-hide');
        }
        component.set("v.isLoginShow", true);
        let currentUserId = $A.get("$SObjectType.CurrentUser.Id");
        helper.userDetails(component, event, helper, currentUserId);
       // helper.openGames(component, event, helper, currentUserId);
    },
    clickLogin: function (component, event, helper) {
      //  var comName = component.get('v.customSettingValue');
        component.find("navService").navigate({
            type: "standard__webPage",
            attributes: {
                url: $A.get("$Label.c.Community_Url") + '/s/login',
                "isredirect": false
            }
        });
    },
    closeModel: function (component, event, helper) {
       // window.location = $A.get("$Label.c.Community_Url")+'/s/'+$A.get("$Label.c.url_dashboard") ;
      // window.location = $A.get("$Label.c.Community_Url")+'/secur/logout.jsp?retUrl='+$A.get("$Label.c.Community_Url") ;
       //window.location =  $A.get("$Label.c.Community_Url"+'/secur/logout.jsp?retUrl='+$Label.c.Community_Url
},
gameNav: function (component, event, helper) {
    component.find("navService").navigate({
        type: "standard__webPage",
        attributes: {
            url: $A.get("$Label.c.Community_Url") + '/s/'+$A.get("$Label.c.url_dashboard")
        }
    })
}
})