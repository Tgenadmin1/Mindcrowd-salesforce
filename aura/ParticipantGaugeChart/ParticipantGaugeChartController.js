({

    scriptsLoaded : function(component, event, helper) {
        //console.log(1);
       // console.log('minValue--->'+component.get("v.minValue"));
       // console.log('maxValue--->'+component.get("v.maxValue"));
       // console.log('breakPoint--->'+component.get("v.breakPoint"));
       //console.log('gaugeSize--->'+component.get("v.gaugeSize"));
        window.setTimeout($A.getCallback(function(){
            helper.setChartData(component);
        },2000));
    }
    
})