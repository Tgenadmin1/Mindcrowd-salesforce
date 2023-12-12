({
	checkBrowser: function(component) {
        var urlString = window.location.href;
        var baseURL = urlString.substring(0, urlString.indexOf("/s"));
        component.set("v.baseUrl",baseURL);

        var device = $A.get("$Browser.formFactor");
        console.log("You are using a " + device);
    },

})