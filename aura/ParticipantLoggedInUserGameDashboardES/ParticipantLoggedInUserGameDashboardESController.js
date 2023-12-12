({
    doInit: function(component, event, helper) {
        const gameName = component.get("v.gameName");
        let action = component.get('c.getDashboardDataForloggedInUser');
        action.setParams({
            gameName: component.get("v.gameName")
        });
       
        action.setCallback(this, function(response) {
            console.log('temp1--', response.getReturnValue());
            
            if (response.getState() === 'SUCCESS' && response.getReturnValue()) {
                 let temp = response.getReturnValue();
                let multiplyFactor = 1;
                if(!component.get('v.isScoreReactionTime')){
                   multiplyFactor = 100/temp.mapPlyAverageValuesData['MaxValue'];
                }
                console.log('multiplyFactor', component.get("v.gameName"), multiplyFactor);
               
            	//component.set('v.age', temp.age);
                component.set('v.lValue', temp.mapPlyAverageValuesData['LowAverage']*multiplyFactor);
                component.set('v.hValue', temp.mapPlyAverageValuesData['HighAverage']*multiplyFactor);
                component.set('v.mValue', temp.mapPlyAverageValuesData['MaxValue']*multiplyFactor);
            	//console.log('Your Score',temp.mapOtherData['YourScore']);
             	//component.set('v.yourScore', temp.mapOtherData['YourScore']);
             	component.set('v.peopleLikeYou', temp.mapOtherData['People Like You']*multiplyFactor);
                component.set('v.correctAnswers', temp.mapOtherData['CorrectAnswers']*multiplyFactor);
                component.set('v.reactionTime', temp.mapOtherData['ReactionTime']*multiplyFactor);
                component.set('v.overallAverage', temp.mapOtherData['Overall Average']*multiplyFactor);
                component.set('v.isGamePlayed', temp.mapOtherData['isGamePlayed'] != 0);
                component.set('v.userDevice', temp.mapOtherData['UserDevice']);
                component.set('v.scoreBasedCaption', ' ');
                
                if(temp.mapOtherData['UserDevice']==1 && component.get('v.isScoreReactionTime')){
                        var graceValue = 400 ;
                        component.set('v.mValue', temp.mapPlyAverageValuesData['MaxValue']); 
                        component.set('v.lValue', temp.mapPlyAverageValuesData['LowAverage']+graceValue > temp.mapPlyAverageValuesData['MaxValue'] ? 
                                      temp.mapPlyAverageValuesData['MaxValue'] : temp.mapPlyAverageValuesData['LowAverage']+graceValue);
                        component.set('v.hValue', temp.mapPlyAverageValuesData['HighAverage']+graceValue > temp.mapPlyAverageValuesData['MaxValue'] ? 
                                      temp.mapPlyAverageValuesData['MaxValue'] : temp.mapPlyAverageValuesData['HighAverage']+graceValue);
                        component.set('v.peopleLikeYou', temp.mapOtherData['People Like You']+graceValue);
                        component.set('v.overallAverage', temp.mapOtherData['Overall Average']+graceValue); 
                }
                
                
                if(!component.get('v.isScoreReactionTime')){
                    if(component.get('v.correctAnswers') == component.get('v.mValue')){
                        component.set('v.scoreBasedCaption', $A.get("$Label.c.Catcme_text_4"));
                    } else if(component.get('v.correctAnswers') >= component.get('v.lValue')){
                        component.set('v.scoreBasedCaption', $A.get("$Label.c.Catcme_text_5"));
						//component.set('v.scoreBasedCaption', 'Not everyone excels verbal memory test. You may be better at other types of memory');
                    } else { 
                        component.set('v.scoreBasedCaption',$A.get("$Label.c.Catcme_text_6"));
                    }
                    console.log('scoreBasedCaption='+component.get('v.scoreBasedCaption'));
                    component.set('v.chartLabel', component.get('v.chartLabel') +''
                                  +component.get('v.scoreBasedCaption'));
                    console.log('chartLabel='+component.get('v.chartLabel'));
                } 
                //For testing : In case you want to all Games Charts even if it is not played
               // component.set('v.isGamePlayed', true);
              // component.set('v.showCharts', true);
            }
        });
        $A.enqueueAction(action);
    }
})