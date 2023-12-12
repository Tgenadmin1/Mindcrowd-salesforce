({
  userDetails: function (component, event, helper, currentUserId) {

    var ConList = component.get("c.getProfileName");
    ConList.setParams({ "currentUserId": currentUserId });
    ConList.setCallback(this, function (a) {
      // console.log('step 3');
      var state = a.getState();
      if (state === "SUCCESS") {
        // console.log('step 4');
        var name = a.getReturnValue();
        // console.log('profileName',name);
        // component.set("v.profileName",name);  

        if (name === 'Customer Community Login User Custom') {
          // console.log('profileName test',name);
          // window.location = $A.get("$Label.c.Community_Url")+'/s/'+$A.get("$Label.c.url_dashboard") ;
        }
      }
      else if (state === "ERROR") {
        let message = '';
        let errors = response.getError();
        if (errors && Array.isArray(errors) && errors.length > 0) {
          message = errors[0].message;
        }
        // console.error(message);
      }
    });
    $A.enqueueAction(ConList);
  },
  printBrowser: function (component, event, helper) {
    
    function getCookie(name) {
      var cookieString = "; " + document.cookie;
      cookieString = cookieString.replace('LSKey-c$', '');
      var parts = cookieString.split("; " + name + "=");
      if (parts.length === 2) {
          return parts.pop().split(";").shift();
      }
      return null;
  }

    navigator.sayswho = (function () {
      const userAgent = navigator.userAgent;
      var tempArray = $A.get("$Label.c.App_block_name").split(',');
      var mainURL = document.URL;
      console.log('test',   getCookie('BrowserId'));
     // alert('raj test = ' +  navigator.userAgent);
     // var appinfo = document.cookie.search('BrowserId');
     
      
      for (var i = 0; i < tempArray.length; i++) {
        if (userAgent.search(tempArray[i].trim()) > 1 && mainURL.search($A.get("$Label.c.url_testlanguage")) > 1) {
          component.set("v.isModalOpenFR", true);
        }

        // if ((userAgent.search(tempArray[i].trim()) > 1  || mainURLref.search(tempArray[i].trim()) > 1) && mainURL.search($A.get("$Label.c.url_testlanguage")) > 1) {
        //   component.set("v.isModalOpenFR", true);
        // }
      }
     // alert(document.referrer);
      
      //console.log('userAgent = ', userAgent);
     // console.log('sssssss = ', $A.get("$Label.c.url_testlanguage"));
     component.set("v.appError", $A.get("$Label.c.app_Error_iphone"));
      // if (userAgent.includes('iPhone')) {
      //   component.set("v.appError", $A.get("$Label.c.app_Error_iphone"));
      // } else {
      //   component.set("v.appError", $A.get("$Label.c.app_Error_Android"));
      // }
    })();
  },
 

})