({
    doInit: function(component, event, helper) {
    component.set('v.peopleLikeYouNoDataLabel',$A.get("$Label.c.PeopleLikeYouNoDataLabel"));
        let action = component.get('c.getDashboardData');
       // alert(component.get("v.gameName"));
        action.setParams({
            contactId :component.get("v.contactId"),
            gameName: component.get("v.gameName")
        });
        action.setCallback(this, function(response) {
           // console.log('temp1--', response.getReturnValue());
            if (response.getState() === 'SUCCESS' && response.getReturnValue()) {
                console.log('temp1--', response.getReturnValue());
                let temp = response.getReturnValue();
                /*let bubbleScore;
                if(temp.mapWhatHappendWithAgeData['MemoryTestScore']){
                    bubbleScore = temp.mapWhatHappendWithAgeData['MemoryTestScore'];
                }
                if(temp.mapWhatHappendWithAgeData['AttentionTestScore']){
                    bubbleScore = temp.mapWhatHappendWithAgeData['AttentionTestScore'];
                } 
                
                console.log('bubbleScore',bubbleScore);
                component.set('v.bubbleScore', bubbleScore);
                component.set('v.age', temp.age);
                */
               console.log('window.width = ', window.innerWidth );
                // if(window.innerWidth < 767){
                //     component.set('v.Facebook_text', '<div class="facebook-btn"  target="_blank" aria-label="Link to Facebook" aria-hidden="false" data-av_icon="" data-av_iconfont="entypo-fontello" title="Facebook" rel="noopener"><span class="avia_hidden_link_text">Facebook</span></div>');
                //     component.set('v.Twitter_text', '<div  class="twitter-btn color-w" target="_blank" title="Twitter"><i class="fab fa-twitter color-w"></i></div>');
                // }else{
                //     component.set('v.Facebook_text', 'Share on Facebook');
                //     component.set('v.Twitter_text', 'Share on Twitter');
                // }
                
                if(window.innerWidth < 767){
                    component.set('v.Facebook_text', false)
                    component.set('v.Twitter_text', false);
                }else{
                    component.set('v.Facebook_text', true);
                    component.set('v.Twitter_text', true);
                }


                component.set('v.lValue', temp.mapPlyAverageValuesData['LowAverage']);
                component.set('v.hValue', temp.mapPlyAverageValuesData['HighAverage']);
                component.set('v.mValue', temp.mapPlyAverageValuesData['MaxValue']);
                console.log(temp.mapOtherData['YourScore']);
                console.log(temp.mapOtherData['People Like You']);
                console.log(temp.mapOtherData['Overall Average']);
               // component.set('v.yourScore', temp.mapOtherData['YourScore']);
                component.set('v.peopleLikeYou', temp.mapOtherData['People Like You']);
                component.set('v.overallAverage', temp.mapOtherData['Overall Average']);
                component.set('v.correctAnswers', temp.mapOtherData['CorrectAnswers']);
                component.set('v.reactionTime', temp.mapOtherData['ReactionTime']);
                component.set('v.userDevice', temp.mapOtherData['UserDevice']);
                //if(isScoreReactionTime)
                component.set('v.scoreBasedCaption', ' ');
                if(temp.mapOtherData['People Like You'] == 0){
                    component.set('v.showpeopleLikeYou', false);
                    console.log('inside plu check');
                }
                else{
                    component.set('v.showpeopleLikeYou', true);
                }
 
                    
                // if(temp.mapOtherData['UserDevice']==1 && component.get('v.isScoreReactionTime')){
                //     var graceValue = 400 ;
                //     component.set('v.reactionTime', temp.mapOtherData['ReactionTime']-graceValue); 
                // }
                if(temp.mapOtherData['UserDevice']==1 && component.get('v.isScoreReactionTime') && temp.mapOtherData['ReactionTime'] > 600){
                    var graceValue = 400 ;
                    component.set('v.reactionTime', temp.mapOtherData['ReactionTime']-graceValue); 
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

                 if(component.get('v.isScoreReactionTime')){
                    if(component.get('v.reactionTime') > component.get('v.hValue')){
                        component.set('v.scoreBasedCaption', $A.get("$Label.c.Catcme_text_7"));
                    } else if(component.get('v.reactionTime') > component.get('v.lValue')){
                        component.set('v.scoreBasedCaption', $A.get("$Label.c.Catcme_text_8"));
						//component.set('v.scoreBasedCaption', 'Not everyone excels verbal memory test. You may be better at other types of memory');
                    } else if(component.get('v.reactionTime')>1){  
                       component.set('v.scoreBasedCaption', $A.get("$Label.c.Catcme_text_9"));
                    }else if(component.get('v.reactionTime')==0){
                        component.set('v.scoreBasedCaption', $A.get("$Label.c.Catcme_text_10"));
                    }
                    console.log('scoreBasedCaption='+component.get('v.scoreBasedCaption'));
                    component.set('v.chartLabel', component.get('v.chartLabel') +''
                                  +component.get('v.scoreBasedCaption'));
                    console.log('chartLabel='+component.get('v.chartLabel'));
                //} 

                }
                
              /*  if(temp.length>0){
                    component.set("v.chart1",{
                        minValue:0,
                        maxValue:parseInt(maxValue),
                        breakPoint:parseInt(breakPoint),
                        chartTitle:'Test',
                        reportId:'report',
                        //reactionTime:reactionTime
                    });
                }*/
                component.set('v.showCharts', true);
            }
        });
        $A.enqueueAction(action);
    },
    ShareonFacebook: function(component, event, helper) {

        //alert('sss' + component.get("v.gameName"));
        //var tempFURL = "https://www.facebook.com/sharer/sharer.php?u="+$A.get('$Label.c.Community_Url'\)
        if(component.get("v.gameName") == "DLTRS"){
            window.open('https://www.facebook.com/sharer/sharer.php?u='+$A.get("$Label.c.Community_Url")+'/attentiontestshare?id='+component.get("v.contactId"),'targetWindow','toolbar=no,location=0,status=no,menubar=no,scrollbars=yes,resizable=yes,width=600,height=650'); return false;

        }else{
            
             window.open('https://www.facebook.com/sharer/sharer.php?u='+$A.get("$Label.c.Community_Url")+'/memorytestshare?id='+component.get("v.contactId"),'targetWindow','toolbar=no,location=0,status=no,menubar=no,scrollbars=yes,resizable=yes,width=600,height=650'); return false;

            //window.open('https://www.facebook.com/sharer/sharer.php?u=https://dev-mindcrowd-game.cs194.force.com/MindCrowd/s/sfsites/c/resource/FeaturedImages/mindcrowd-memory-game-home-page.png"','targetWindow','toolbar=no,location=0,status=no,menubar=no,scrollbars=yes,resizable=yes,width=600,height=650'); return false;
        }
    },
    ShareonTwiter: function(component, event, helper) {

       // alert('sss' +  $A.get("$Label.c.Community_Url"));
        if(component.get("v.gameName") == "DLTRS"){
            window.open('https://twitter.com/intent/tweet?&url='+$A.get("$Label.c.Community_Url")+'/attentiontestshare?id='+component.get("v.contactId"),'targetWindow','toolbar=no,location=0,status=no,menubar=no,scrollbars=yes,resizable=yes,width=600,height=650'); return false;
            
        }else{
            window.open('https://twitter.com/intent/tweet?&url='+$A.get("$Label.c.Community_Url")+'/memorytestshare?id='+component.get("v.contactId"),'targetWindow','toolbar=no,location=0,status=no,menubar=no,scrollbars=yes,resizable=yes,width=600,height=650'); return false;
        }
    }
    // createImageBitmap: function(){
        
        //gameName


    // }
})