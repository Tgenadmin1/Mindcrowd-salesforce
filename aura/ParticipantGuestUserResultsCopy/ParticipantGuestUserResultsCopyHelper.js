({
    helperMethod : function() {

    }, 
    preventLeaving: function () {      
        console.log('inside preventLeaving');  
        window.addEventListener("beforeunload", this.leaveHandler);
    },
    leaveHandler: function (event) {
        console.log('inside leavehandler');
        event.returnValue = "Are you sure you want to leave? All changes will be lost!";
    },
    allowLeaving: function () {
        console.log('inside allowLeaving');
        window.removeEventListener("beforeunload", this.leaveHandler);
    },
    navigate: function () {
        console.log('inside navigate');
        var navService = cmp.find("navService");
        // Sets the route to /lightning/o/Account/home
        var pageReference = {
            type: 'standard__component',
            attributes: {
                componentName: 'c__ParticipantGuestUserResultsCopy'
            },
            state: {}
        };
        cmp.set("v.pageReference", pageReference);
        // Set the URL on the link or use the default if there's an error
        var defaultUrl = "#";
        navService.generateUrl(pageReference)
            .then($A.getCallback(function(url) {
                cmp.set("v.url", url ? url : defaultUrl);
            }), $A.getCallback(function(error) {
                cmp.set("v.url", defaultUrl);
            }));
    },
    messageChan: function () {
        var empApi = component.find('empApi');
        var channel = '/event/DisableLeaveSitePopup__e'; // Replace with your message channel API name
        empApi.subscribe(channel, -1, $A.getCallback(function(message) {
            // Disable the Leave Site popup logic
            window.onbeforeunload = null; // Disable Leave Site popup
        }));
    }
})