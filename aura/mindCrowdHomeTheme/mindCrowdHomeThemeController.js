({

    doInit: function (component, event, helper) {

        component.set('v.resultUrl', window.location);
        var test = window.location.pathname.substring(0, 1);
        var myPageRef = window.location.href;
        var pageUrl = myPageRef.split('/');
        let obj = pageUrl.find(o => o === 'login');
        // console.log('url = ', obj);
        if (obj == "login/" || obj == "login") {
            window.location.href = $A.get("$Label.c.Community_Url") + '/s/' + $A.get("$Label.c.url_login");
        }
        helper.printBrowser(component, event, helper);
        console.log('browser = ', component.get("v.browser"));
        //get subid value for Tapjoy
        var subitem1 = localStorage.getItem('subIdToStoreLocal');
        //console.log('subitem1==>'+subitem1);
        //const queryString = window.location.search;
		// console.log(queryString);
        //var tapjoyUrl = $A.get("$Label.c.tapjoy_url");
        //var urlParams = new URLSearchParams(queryString);
        //console.log('tjcookieurl: '+tjcookieurl);
        const urlParams1 =new URLSearchParams(window.location.search);
        const campaign = urlParams1.get('campaign');
        if(campaign=='historical'){
            localStorage.setItem('campaigncode',campaign);
            localStorage.setItem('utmsource','Email'); 
            let email = urlParams1.get('Email');               
            if(email){
                localStorage.setItem('utmmedium',email);        
            }
            else {
                const participantcode = urlParams1.get('participantcode');
                if(participantcode){
                        helper.fetchContact(component,participantcode);
                }
            }         
        }
        if(tjcookieurl){
            const urlParams = getURLParameters(tjcookieurl);
            if(urlParams){
                    localStorage.setItem('subIdToStoreLocal', urlParams.utm_term ? urlParams.utm_term : '');
                    localStorage.setItem('campaigncode', urlParams.utm_campaign ? urlParams.utm_campaign : '');
                    localStorage.setItem('utmsource', urlParams.utm_source ? urlParams.utm_source : '');
                    localStorage.setItem('utmmedium', urlParams.utm_medium ? urlParams.utm_medium : '');
                    localStorage.setItem('utmappName', urlParams.appname ? urlParams.appname : '');
            }            
        }       
        
        var subitem = localStorage.getItem('subIdToStoreLocal');
        // console.log('subitem==>'+subitem);

        
        // ----- changes done by sourabh--- Line 16-32-----//


        var debugConsole = $A.get("$Label.c.debugConsole");

        if (debugConsole === 'false') {
            if (typeof (window.console) === 'undefined') { window.console = {}; }
            window.console.log = function () { };
        }
        
        var tempurl = $A.get("$Label.c.Community_Url") + '/s/'+$A.get("$Label.c.url_testlanguage");

        function getURLParameters(url) {
            let decodeurl = decodeURIComponent(url);
            //console.log('decodeurl: '+decodeurl);            
            const urlParts = decodeurl.split('?');
            if (urlParts.length < 2) {
              return {}; // No query string parameters
            }
            const queryString = urlParts[1];
            const params = {};
            queryString.split('&').forEach(param => {
              const [key, value] = param.split('=');
              params[key] = value;
            });
            return params;
          }

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
        // var comName = component.get('v.customSettingValue');
        if (component.find("navicon")) {
            component.find("navicon").set("v.iconName", "utility:rows");
            nav.classList.add('m-hide');
        }
        component.set("v.isLoginShow", true);
        let currentUserId = $A.get("$SObjectType.CurrentUser.Id");
        helper.userDetails(component, event, helper, currentUserId);

    },
    closeModel : function(component, event, helper) {
        //console.log('No');
        component.set("v.isModalOpenFR", false );
    },

})