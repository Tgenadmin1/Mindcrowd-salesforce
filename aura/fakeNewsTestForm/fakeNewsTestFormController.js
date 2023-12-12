({
    myAction: function(component, event, helper) {
        var pgiObj = {
            "sobjectType": "Participant_Game_Info__c",
            "Id": component.get("v.participantGameid"),
            "Fake_News_Ball_Cost_in_Cents__c": "",
            "Fake_News_Time_to_Make_100_Widgets__c": "",
            "Fake_News_Days_to_Cover_Half_Lake__c": "",
            "Fake_News_Area_Type_Lives__c": "",
            "Fake_News_Social_Media_Engagement__c": "",
            "Fake_News_Spending_Hours_for_News_Week__c": "",
            "Fake_News_Supporting_Political_Allaince__c": "",
            "Fake_News_Trust_in_Federal_Government__c": ""
        }; 
        component.set("v.partGameInfo", pgiObj);
        helper.preventLeaving();
    },

    myvalidate: function(cmp, event, helper) {
        var fieldnumber = cmp.find('mynumber');
        var number = fieldnumber.get('v.value');
        console.log('number: ' + number);
        var regex = /^[0-9]+(\.[0-9]+)?$/;
        var found = number.match(regex);
        console.log(found);
        if (!found) {
            console.log('erreur');
            fieldnumber.set('v.value', '');
            fieldnumber.set('v.messageWhenBadInput', 'Please enter a valid number.');
            fieldnumber.focus();
        }
    },

    handleInputChange: function(component, event, helper) {
        let fieldname = event.getSource().get("v.name");
        let fieldvalue = event.getSource().get("v.value");
        let pgiObj = component.get("v.partGameInfo"); 
        if(fieldname=="ballcost"){
            pgiObj.Fake_News_Ball_Cost_in_Cents__c = fieldvalue; 
        }
        else if(fieldname=="widget"){
            pgiObj.Fake_News_Time_to_Make_100_Widgets__c = fieldvalue;
        }    
        else if(fieldname=="halflake"){
            pgiObj.Fake_News_Days_to_Cover_Half_Lake__c = fieldvalue;
        }  
        component.set("v.partGameInfo", pgiObj); 
    },

    handlePolAffiliation: function(component, event, helper) {
        let fieldvalue = event.target.value;
        let pgiObj = component.get("v.partGameInfo"); 
        if(fieldvalue =="Other (please specify)"){
            component.set('v.isInputDisabled', false);
        }        
        else {
            component.set('v.isInputDisabled', true);
            pgiObj.Fake_News_Supporting_Political_Allaince__c=fieldvalue;
        }   
        component.set("v.partGameInfo", pgiObj);
    },

    handlePolAffiliationOther: function(component, event, helper) {  
        let fieldvalue = event.getSource().get("v.value");
        let pgiObj = component.get("v.partGameInfo"); 
        pgiObj.Fake_News_Supporting_Political_Allaince__c=fieldvalue;
        component.set("v.partGameInfo", pgiObj); 
    },

    handleArea: function (component, event, helper) {
        let fieldvalue = event.target.value;
        let pgiObj = component.get("v.partGameInfo"); 
        pgiObj.Fake_News_Area_Type_Lives__c=fieldvalue; 
        component.set("v.partGameInfo", pgiObj);
    },

    handleNews: function(component, event, helper) {
        let fieldvalue = event.target.value;
        let pgiObj = component.get("v.partGameInfo"); 
        pgiObj.Fake_News_Spending_Hours_for_News_Week__c=fieldvalue; 
        component.set("v.partGameInfo", pgiObj);  
    },

    handleSocialMedia: function(component, event, helper) {
        let fieldvalue = event.target.value;
        let pgiObj = component.get("v.partGameInfo"); 
        pgiObj.Fake_News_Social_Media_Engagement__c=fieldvalue; 
        component.set("v.partGameInfo", pgiObj);  
    },

    handleTrustGovernment: function(component, event, helper) {
        let fieldvalue = event.target.value;
        let pgiObj = component.get("v.partGameInfo"); 
        pgiObj.Fake_News_Trust_in_Federal_Government__c=fieldvalue; 
        component.set("v.partGameInfo", pgiObj);  
    },
        
    goToScreen2: function(component, event, helper) {
        component.set("v.currentScreen", "screen2");
    },

    goToScreen3: function(component, event, helper) {
        console.log('pgi: '+ JSON.stringify(component.get("v.partGameInfo")));     
        component.set("v.currentScreen", "screen3");
    },

    goToNextPage: function(component, event, helper) {
        helper.participantGameInfo(component);
        var url =  $A.get("$Label.c.Community_Url") + "/s/" + $A.get("$Label.c.url_dashboard");
        helper.allowLeaving();
        window.location.href = url;
    },

    goToMyResultsPage: function(component, event, helper) {
        helper.participantGameInfo(component);
        var url =  $A.get("$Label.c.Community_Url") + "/s/" + $A.get("$Label.c.url_myresults");
        helper.allowLeaving();
        window.location.href = url;
    },

    closeModel: function(component, event, helper) {
        window.location.href = $A.get("$Label.c.Community_Url") + '/s/' + $A.get("$Label.c.url_dashboard");
    },
  
})