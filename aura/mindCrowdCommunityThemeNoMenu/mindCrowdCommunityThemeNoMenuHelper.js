({
    helperMethod : function() {

    },
    leaveHandler: function(event) {
             console.log('ssss');
             event.returnValue = "Are you sure you want to leave? All changes will be lost!";
            //confirm("Do you Really want to save this Form");
    },
    preventLeaving: function(event) {
      
        //console.log('aaaa');
        window.addEventListener("beforeunload", this.leaveHandler);
    },
    allowLeaving: function(event) {
        console.log('ffff');
           window.removeEventListener("beforeunload", this.leaveHandler);
    }
})