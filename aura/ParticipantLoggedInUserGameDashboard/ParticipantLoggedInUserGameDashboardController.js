({
    doInit: function(component, event, helper) {
        component.set('v.peopleLikeYouNoDataLabel',$A.get("$Label.c.PeopleLikeYouNoDataLabel"));
        const gameName = component.get("v.gameName");
        console.log('print game name',gameName);
        if(gameName != "Bean  Game"){
        	helper.getCompleteGame(component,helper);
        }
       if(gameName == "Bean  Game"){
             helper.getBeanGame(component,helper);
        } 
    }
})