({    
    participantGameInfo: function (component) { 
        console.log('pgi: '+ JSON.stringify(component.get("v.partGameInfo")));        
        var action = component.get("c.participantGameInfoUpdate1");
        action.setParams({
            "sobj": component.get("v.partGameInfo")
        });
        action.setCallback(this, function (a) {
            var state = a.getState();
            if (state === "SUCCESS") {
                var name = a.getReturnValue();
                component.set("v.participantGameid", name);
            } else if (state === "ERROR") {
                let message = '';
                let errors = a.getError();
                if (errors && Array.isArray(errors) && errors.length > 0) {
                    message = errors[0].message;
                }
                console.error(message);
            }
        });

        $A.enqueueAction(action);
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
    }
})