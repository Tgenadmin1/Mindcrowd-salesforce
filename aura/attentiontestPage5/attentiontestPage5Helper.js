({
  leaveHandler: function (event) {
    event.returnValue = "Are you sure you want to leave? All changes will be lost!";
  },
  preventLeaving: function () {
    window.addEventListener("beforeunload", this.leaveHandler);
  },
  allowLeaving: function () {
    window.removeEventListener("beforeunload", this.leaveHandler);
  },

  getDeviceType: function () {
    const ua = navigator.userAgent;
    if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua)) {
      return "TABLET";
    }
    if (
      /Mobile|iP(hone|od)|Android|BlackBerry|IEMobile|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(
        ua
      )
    ) {
      return "PHONE";
    }
    return "DESKTOP";
  },
  lastStepUpdateInPGI: function(component) {
      
    var participantGameInfoId=null;
    var pGameInfoCreated = localStorage.getItem('pGameInfoCreated');
    if(pGameInfoCreated!=null){
        participantGameInfoId = atob(pGameInfoCreated);
    } 
        let data = {
            Last_Step__c:5,
            Id:participantGameInfoId 
        };
        var action = component.get("c.participantGameInfoUpdate");
        action.setParams({"sobj":JSON.stringify(data)});
        action.setCallback(this,function(a) 
            {      
            var state = a.getState();
                    if (state === "SUCCESS") {
                        var name = a.getReturnValue();         
                    }
                    else if(state==="ERROR"){
                        let message='';
                        let errors = response.getError();
                        if (errors && Array.isArray(errors) && errors.length > 0) {
                            message = errors[0].message;
                        }
                    }
        });
    $A.getCallback(function() {
        $A.enqueueAction(action);
    })();       
}
})