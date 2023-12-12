({
    getChartData : function(component) {
        let startDate = component.get("v.startDate");
        let endDate = component.get("v.endDate");
        
        let action = component.get("c.getGroupChartMap");
        let campaignId = component.get("v.value");
        console.log('campaignId-->',campaignId);
        action.setParams({startDate :startDate, endDate: endDate, campaignId:campaignId});
        action.setCallback(this, function(response){
            console.log('Type Chart--',response.getReturnValue());
            if(response.getState() === 'SUCCESS' && response.getReturnValue()){
                let temp = response.getReturnValue();
                component.set("v.showCharts",true);
                console.log('temp--',temp);
                /* let max = 10;
                for(let key in temp) {  
                    if(max < temp[key])
                    	max = temp[key];
                }
                if(max > 10)
                	component.set('v.maxScale',max+100); */
                component.set("v.showSpinner",false);
                component.set('v.chartData',temp);
                component.set("v.showCharts",true);
            }
            else{
                component.set("v.showSpinner",false);
            }
            
        });   
        
        $A.enqueueAction(action);	
    },
    chartHelper: function(component){
        component.set("v.showCharts",false);
        component.set("v.showSpinner",true);
        
        let startDate = component.find("startDate").get("v.value");
        let endDate = component.find("endDate").get("v.value");
        component.set("v.startDate", startDate);
        component.set("v.endDate", endDate);
        console.log('StartDate--' +startDate);
        console.log('endDate---'+endDate);
        this.getChartData(component);
        this.getOtherChartData(component);
    },
    otherChartHelper: function(component){
        
        component.set("v.showCharts",false);
        component.set("v.showSpinner",true);
        
        let startDate = component.find("startDate").get("v.value");
        let endDate = component.find("endDate").get("v.value");
        component.set("v.startDate", startDate);
        component.set("v.endDate", endDate);
        console.log('StartDate--' +startDate);
        console.log('endDate---'+endDate);
        this.getOtherChartData(component, startDate, endDate);
    },
    getOtherChartData : function(component) {
        let startDate = component.get("v.startDate");
        let endDate = component.get("v.endDate");
        
        
        let action = component.get("c.getOtherGroupChartMap");
        action.setParams({startDate :startDate, endDate: endDate});
        action.setCallback(this, function(response){
            console.log('OtherCharts--',response.getReturnValue());
            if(response.getState() === 'SUCCESS' && response.getReturnValue()){
                let temp = response.getReturnValue();
               // console.log('temp--',temp);
                /* let max = 20;
                for(let key in temp) {  
                    if(max < temp[key])
                        max = temp[key];
                }
                if(max > 20)
                	component.set('v.maxScaleOther',max+100); */
                
                component.set("v.showSpinner",false);
                component.set('v.otherChartData',temp);
                component.set("v.showCharts",true);
            }
            else{
                component.set("v.showSpinner",false);
            }
            
            
        });   
        
        $A.enqueueAction(action);	
    },
    getCampaignNamesHelper : function(component) {
        let action = component.get("c.getResearchCampaigns");
        action.setCallback(this, function(response){
            console.log('Campaigns',response.getReturnValue());
            if(response.getState() === 'SUCCESS' && response.getReturnValue()){
                let temp = response.getReturnValue();
                component.set("v.options",temp);
                component.set("v.value",temp[0].value);
            }
            this.chartHelper(component);
        }); 
        $A.enqueueAction(action);	
    }
})