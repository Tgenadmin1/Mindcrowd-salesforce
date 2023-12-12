({
    myAction: function (component, event, helper) {

    },
    handleRouteChange: function (component, event, helper) {
        // setTimeout(function () {
        //     window.scroll({ top: 0, left: 0, });
        // }, 500);

    },
    changesLanguage: function (component, event, helper) {
        const urlParams = document.location.href.split('?');
        var tempLang = "";
        if (document.getElementsByTagName("html")[0].getAttribute("lang") == 'en-US') {
            tempLang = 'es';
        } else {
            tempLang = 'en_US';
        }
        console.log('tempLang = ', tempLang);
       // window.location = urlParams[0] + '?language=' + tempLang;
        // console.log('changesLanguage = ', urlParams[0]);
        // console.log('langulage = ', document.getElementsByTagName("html")[0].getAttribute("lang"))

    },


})