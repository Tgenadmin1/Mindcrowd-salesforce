({
    userDetails: function(component, event, helper,currentUserId) 
    { 
        console.log('step 1');
        var ConList = component.get("c.getProfileName");
        ConList.setParams({"currentUserId":currentUserId});
        console.log('step 2');
        ConList.setCallback(this, function(a) 
                                    {
                                        console.log('step 3');
                                        var state = a.getState();
                                        if (state === "SUCCESS") {
                                            console.log('step 4');
                                            var name = a.getReturnValue();
                                            console.log('profileName',name);
                                         //   component.set("v.profileName",name);  
                                            
                                            if(name === 'Customer Community Login User Custom'){
                                                console.log('profileName test',name);
                                                   // window.location = $A.get("$Label.c.Community_Url")+'/s/games' ;
                                                   component.set('v.showConfirmDialog', true);
                                                  // window.location = $A.get("$Label.c.Community_Url")+'/s/'+$A.get("$Label.c.url_dashboard") ;
                                            }
                                        }
                                        else if(state==="ERROR"){
                                            let message='';
                                            let errors = response.getError();
                                            if (errors && Array.isArray(errors) && errors.length > 0) {
                                                message = errors[0].message;
                                            }
                                            console.error(message);
                                        }
                                    });
        $A.enqueueAction(ConList);
    }

    
})