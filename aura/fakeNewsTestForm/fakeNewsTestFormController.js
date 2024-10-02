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
            "Fake_News_Trust_in_Federal_Government__c": "",
            "Fake_News_Political_Orientation__c": ""
        }; 
        component.set("v.partGameInfo", pgiObj);
        component.set("v.currentDate",  new Date());
        console.log('init date: '+ component.get("v.currentDate"));
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
        let pgiObj = component.get("v.partGameInfo");
        if (fieldname === "ballcost") {
            pgiObj.Fake_News_Ball_Cost_in_Cents__c = component.get('v.ballCost'); 
        } else if (fieldname === "widget") {
            pgiObj.Fake_News_Time_to_Make_100_Widgets__c = component.get('v.widget'); 
        } else if (fieldname === "halflake") {
            pgiObj.Fake_News_Days_to_Cover_Half_Lake__c = component.get('v.halflake'); 
        }
        component.set("v.partGameInfo", pgiObj);

        // Clear previous errors for the field
        let errors = component.get("v.errors") || {};
        errors[fieldname] = null;
        component.set("v.errors", errors);
    },


    handleRangeChange: function(component, event, helper) {
        // Retrieve the new value of the slider
        var newValue = event.getParam("value");
        
        // Set the new value to the attribute
        component.set("v.sliderValue", newValue);
    },
    
    handlePolAffiliation: function(component, event, helper) {
        let fieldvalue = event.target.value;
        let pgiObj = component.get("v.partGameInfo"); 
        if(fieldvalue =="Other (please specify)"){
            component.set('v.isInputVisible', true); 
            component.set('v.isInputDisabled', false);
            pgiObj.Fake_News_Supporting_Political_Allaince__c='';
        } else {
            component.set('v.isInputVisible', false);
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

    handlePolOrientation : function(component, event, helper) { 
        let fieldvalue = event.target.value;       
        let pgiObj = component.get("v.partGameInfo");
        console.log('Pol Orientation: '+fieldvalue);
        pgiObj.Fake_News_Political_Orientation__c = fieldvalue;
        component.set("v.partGameInfo", pgiObj);
    },

    handleNews: function(component, event, helper) {        
        let pgiObj = component.get("v.partGameInfo"); 
        pgiObj.Fake_News_Spending_Hours_for_News_Week__c=component.get('v.newsHours'); 
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
        let pgiObj = component.get("v.partGameInfo");
        let errors = {};

        console.log("Value of pgiObj :", JSON.stringify(pgiObj));

        if (!pgiObj.Fake_News_Supporting_Political_Allaince__c ) {
            errors["handlePolAffiliation"] = $A.get("$Label.c.Fake_News_Test_Form_8_Error");
        }
        if (!pgiObj.Fake_News_Area_Type_Lives__c) {
            errors["handleArea"] = $A.get("$Label.c.Fake_News_Test_Form_9_Error");
        }
        if (!pgiObj.Fake_News_Political_Orientation__c) {
            errors["handlePolOrientation"] = $A.get("$Label.c.Fake_News_Test_Form_10_Error");
        }

        if (Object.keys(errors).length > 0) {
            // Set errors attribute to display error messages
            component.set("v.errors", errors);
        } else {            
            const reactiontime = new Date() - component.get("v.currentDate");
            helper.recorData(component, event, helper, reactiontime, 49);
            component.set("v.currentScreen", "screen2");
            component.set("v.currentDate",  new Date());
            console.log('new date Screen 1: '+ component.get("v.currentDate"));
            console.log('Reaction Time Screen 1: '+ reactiontime);
    }
    },

    goToScreen3: function(component, event, helper) {
        let pgiObj = component.get("v.partGameInfo");
        let errors = {};
        
        console.log("Value of pgiObj :", JSON.stringify(pgiObj));
   
        // Perform validation for required fields
        if (!pgiObj.Fake_News_Spending_Hours_for_News_Week__c ||
            pgiObj.Fake_News_Spending_Hours_for_News_Week__c < 0 ||
            pgiObj.Fake_News_Spending_Hours_for_News_Week__c > 168) {
            errors["handleNews"] = $A.get("$Label.c.Fake_News_Test_Form_5_Error");
        }
        if (!pgiObj.Fake_News_Social_Media_Engagement__c) {
            errors["handleSocialMedia"] = $A.get("$Label.c.Fake_News_Test_Form_6_Error");
        }
        if (!pgiObj.Fake_News_Trust_in_Federal_Government__c) {
            errors["handleTrustGovernment"] = $A.get("$Label.c.Fake_News_Test_Form_7_Error");
        }
    
        // Set errors if any found
        if (Object.keys(errors).length > 0) {
            // Set errors attribute to display error messages
            component.set("v.errors", errors);
        } else {
            // Reset errors if no validation errors
            component.set("v.errors", {});
            const reactiontime = new Date() - component.get("v.currentDate");
            helper.recorData(component, event, helper, reactiontime, 50);
            component.set("v.currentScreen", "screen3");
            component.set("v.currentDate",  new Date());
            console.log('new date Screen 2: '+ component.get("v.currentDate"));
            console.log('Reaction Time Screen 2: '+ reactiontime);
        }
    },

    goToScreen4: function(component, event, helper) {
        let pgiObj = component.get("v.partGameInfo");
        let errors = {};
    
        // Perform validation for required fields
        if (!pgiObj.Fake_News_Ball_Cost_in_Cents__c || 
            pgiObj.Fake_News_Ball_Cost_in_Cents__c < 0) {
            errors["ballcost"] = $A.get("$Label.c.Fake_News_Test_Form_2_Error");
        }
        if (!pgiObj.Fake_News_Time_to_Make_100_Widgets__c || 
            pgiObj.Fake_News_Time_to_Make_100_Widgets__c < 0) {
            errors["widget"] = $A.get("$Label.c.Fake_News_Test_Form_3_Error");
        }
        if (!pgiObj.Fake_News_Days_to_Cover_Half_Lake__c || 
            pgiObj.Fake_News_Days_to_Cover_Half_Lake__c < 0) {
            errors["halflake"] = $A.get("$Label.c.Fake_News_Test_Form_4_Error");
        }
    
        // Set errors if any found
        if (Object.keys(errors).length > 0) {
            component.set("v.errors", errors);
        } else {
            const reactiontime = new Date() - component.get("v.currentDate");
            helper.recorData(component, event, helper, reactiontime, 51);
            component.set("v.currentScreen", "screen4");
            component.set("v.currentDate",  new Date());
            console.log('new date Screen 3: '+ component.get("v.currentDate"));
            console.log('Reaction Time Screen 3: '+ reactiontime);
        }
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