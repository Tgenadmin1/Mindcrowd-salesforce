({   
    /*doInit : function(component, event, helper) {
      
    },*/
    handleValuePass : function(component, event, helper) {
        console.log('Value from LWC'+JSON.stringify(event.getParam('result'))); 
        try {   
        let result = event.getParam('result');  
        if(!result.haserror && Object.values(result.gamedataList).length > 0) {
            let listOtherData = result.listOtherData; 
            listOtherData = listOtherData.reverse();
            component.set('v.attempts', listOtherData.length);
            component.set('v.resultMap', listOtherData);            
            console.log('v.attempts: ' + component.get('v.attempts'));
            console.log(component.get('v.resultMap'));              
          } 
        }    
          catch (e) {
            console.log('Error setting resultMap: ' + e);
        }      
    }    
})