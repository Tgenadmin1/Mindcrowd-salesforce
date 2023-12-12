({
    doInit : function(component, event, helper) {
        
        var today = $A.localizationService.formatDate(new Date(), "YYYY-MM-DD");
        component.set("v.maxDate", today);
        let otherColors =[
            'rgba(255, 99, 132, 1.2)',
            'rgba(204, 0, 204,1.2)',
            'rgba(255, 205, 86,1.2)',
            'rgba(153, 0, 255,1.2)',
            'rgba(204, 0, 204,1.2)'
            
        ];
        component.set('v.otherColors',otherColors);
        
        
        let result = new Date();
        result.setDate(result.getDate() - 30);
        console.log('result Date Time is: ' +result);
        component.set("v.startDate", result.toISOString().split('T')[0]);
        component.set("v.endDate", new Date().toISOString().split('T')[0]);
        helper.getCampaignNamesHelper(component);
        //helper.chartHelper(component);
    },
    
    ShowCharts : function(component, event, helper) {
        component.set("v.displayTabs", false);
        let startDate = component.find("startDate").get("v.validity");
        console.log(startDate.valid);
        let endDate = component.find("endDate").get("v.validity");
        console.log(endDate.valid);
        let stDate = component.find("startDate");
        let eDate = component.find("endDate");
        const d1 =new Date(stDate.get("v.value"));
        const d2 =new Date(eDate.get("v.value"));
        console.log('d1: ' +d1);
        console.log('d2: ' +d2);
        if(d1 > d2){
            stDate.setCustomValidity("From Date Should not be greater than To Date");
            stDate.reportValidity(); 
        }
        if (endDate.valid && startDate.valid) {
            console.log('show Charts');
            component.set("v.displayTabs", true);
            helper.chartHelper(component);
        }
    },
    shipmentChange : function(component,event, helper){
        var selected = event.getParam("value");
        console.log('selected--->',selected);
        component.set("v.value", selected);
        helper.chartHelper(component); 
        /*
        let shipmentType =event.getSource().get("v.value");
        console.log('shipmentType-->',shipmentType);
        component.set("v.value", shipmentType);
        if(shipmentType == 'Other'){
            helper.otherChartHelper(component);     
        }else{
			 helper.chartHelper(component);            
        }*/
    }
})