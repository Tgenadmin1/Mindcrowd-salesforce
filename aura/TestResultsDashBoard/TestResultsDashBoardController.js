({
	doInit : function(component, event, helper) {
		let otherColors =[
          'rgba(255, 99, 132, 1.2)',
          'rgba(204, 0, 204,1.2)',
          'rgba(255, 205, 86,1.2)',
          'rgba(153, 0, 255,1.2)'
       ];
       component.set('v.otherColors',otherColors);
        let subColors =[
          'rgba(255, 99, 132, 1.2)',
          'rgba(0, 255, 0,1.2)',
          'rgba(255, 205, 86,1.2)',
          'rgba(0, 0, 204,1.2)',
            'rgba(153, 0, 255,1.2)'
            
       ];
       component.set('v.subColors',subColors);
        var grpColors = {};
        grpColors['COVID']= 'rgba(255, 99, 132, 1.2)';
        grpColors['DBS'] = 'rgba(255, 159, 64,1.2)';
        grpColors['BEAN GAME'] = 'rgba(75, 192, 192,1.2)';
      
       
       component.set('v.grpColors',grpColors);
        let action = component.get("c.getResultsDashboardData");
        action.setCallback(this, function(response){
            console.log('temp1--',response.getReturnValue());
            if(response.getState() === 'SUCCESS' && response.getReturnValue()){
                let temp = response.getReturnValue();
               // console.log('temp--',temp);
                component.set('v.subMap',temp.mapSubData);
                 component.set('v.grpMap',temp.mapKitData);
                 component.set('v.otherMap',temp.mapOtherData);
                 component.set('v.showCharts', true);
            }
        });   
        $A.enqueueAction(action);	
      
	}
})