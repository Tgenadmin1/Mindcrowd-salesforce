({
    saveSignature : function(component, newData, gameName) {
        var action = component.get("c.saveSign");
        var vSplit=document.getElementById(newData).toDataURL().replace(/^data:image\/(png|jpg);base64,/, "");
        document.getElementById(newData).remove();
        //console.log('ssssssssssssssssssssssssssssssssssssssssssss', vSplit.length);
        if(vSplit.length > 6){
            action.setParams({                                  
                base64Data: vSplit, //encodeURIComponent(test),
                contentType:"image.png",
                currentUserId: component.get("v.contactId"),
                gameName:gameName
           });
           action.setCallback(this, function(e) {          
               if(e.getState()=='SUCCESS'){
                 // alert('Signature Saved Successfully!')
               }  
               else{
                   console.log('JSON.stringify(e.getError())', JSON.stringify(e.getError()));
               }
           });
          // $A.enqueueAction(action); 
           $A.getCallback(function() {
               $A.enqueueAction(action);
           })();
            
        }
    },

    saveSignatureAttension : function(component, event, helper){
        let action1 = component.get('c.getDashboardData');

        action1.setParams({
            contactId :component.get("v.contactId"),
            gameName: 'DLTRS'///component.get("v.gameName")
            
        }); 
        action1.setCallback(this, function(response) {
            let temp = response.getReturnValue();
            if (response.getState() === 'SUCCESS' && response.getReturnValue()) {
                //console.log('temp1--raj1', response.getReturnValue());
                //console.log('Raj YourScore1 =',temp.mapOtherData['CorrectAnswers']);
                // temp.mapOtherData['YourScore'] = 100;
                component.set('v.attScore',  temp.mapOtherData['YourScore'] + " MS");
               // attScore = temp.mapOtherData['YourScore'];
                
               if(temp.mapOtherData['YourScore'] < 200){
                 //when chart needal is in the Green and less 200
                component.set('v.attImg', "/sfsites/c/resource/resultsScoreIimages/results-score-attention-test-1.png");
               }else if( temp.mapOtherData['YourScore'] < temp.mapPlyAverageValuesData['LowAverage'] ){
                //when chart needal is in the Green
                component.set('v.attImg', "/sfsites/c/resource/resultsScoreIimages/results-score-attention-test-2.png");

               }else if( temp.mapOtherData['YourScore'] < temp.mapPlyAverageValuesData['HighAverage'] ){
                   //when chart needal is in the Orange
                component.set('v.attImg', "/sfsites/c/resource/resultsScoreIimages/results-score-attention-test-3.png");

               }else{
                   //when chart needal is in the Red
                component.set('v.attImg', "/sfsites/c/resource/resultsScoreIimages/results-score-attention-test-4.png");
               }
            this.createAttention(component, event, helper);
            }

        });
        $A.getCallback(function () {
            $A.enqueueAction(action1);
        })();
    },
    createAttention : function(component, event, helper) {
        jQuery("document").ready(function(){
            var getCanvas1; // global variable
            var element1 = $("#pngBoxAttention"); // global variable
            html2canvas(element1, {
                onrendered: function (canvas) {   
                        $("#previewImage").append(canvas);
                        getCanvas1 = canvas;
                        getCanvas1.id ="attentionPNG";
                            var test = getCanvas1.toDataURL("image/png");
                            var test = test.replace(/^data:image\/png/, "data:application/octet-stream");
                            var newData = 'attentionPNG'; //imgageData.replace(/^data:image\/png/, "data:application/octet-stream");              
                            var gameName = "DLTRS";
                            if(newData != null || newData != ""){     
                                
                            helper.saveSignature(component, newData, gameName);
                           // console.log('f console for hide', $('#pngBoxAttentionBox'));  
                            $('#pngBoxAttentionBox').hide();
                        }
                        else{
                            // alert('Please Sign in the box');
                        }   
                    }
            });
        });
    },
    saveSignatureMemory : function(component, event, helper){
        let action2 = component.get('c.getDashboardData'); 
        action2.setParams({
            contactId :component.get("v.contactId"),
            gameName: 'PAIRED GAME'///component.get("v.gameName")
        }); 
        action2.setCallback(this, function(response) {
            let temp = response.getReturnValue();
            if (response.getState() === 'SUCCESS' && response.getReturnValue()) {
                //console.log('temp1--raj2', response.getReturnValue());
                //console.log('Raj YourScore2 =',temp.mapOtherData['CorrectAnswers']);     
                component.set('v.memScore',  temp.mapOtherData['CorrectAnswers']+"/"+ temp.mapPlyAverageValuesData['MaxValue']);
                if(temp.mapPlyAverageValuesData['LowAverage'] > temp.mapOtherData['CorrectAnswers']){
                    //when chart needal is in the Red
                    component.set('v.memImg', "/sfsites/c/resource/resultsScoreIimages/results-score-memory-test-4.png");
                }else if(temp.mapPlyAverageValuesData['HighAverage'] > temp.mapOtherData['CorrectAnswers']){
                     //when chart needal is in the Orange
                    component.set('v.memImg', "/sfsites/c/resource/resultsScoreIimages/results-score-memory-test-3.png");
                }else if(temp.mapPlyAverageValuesData['MaxValue'] > temp.mapOtherData['CorrectAnswers']){
                     //when chart needal is in the Green
                    component.set('v.memImg', "/sfsites/c/resource/resultsScoreIimages/results-score-memory-test-2.png");
                }else{
                     //when chart needal is in the 36/36
                    component.set('v.memImg', "/sfsites/c/resource/resultsScoreIimages/results-score-memory-test-1.png");     
                }
                this.createMemory(component, event, helper);
            }
        });
        $A.getCallback(function () {
            $A.enqueueAction(action2);
        })();
    },
    createMemory : function(component, event, helper) {
        jQuery("document").ready(function(){
            var getCanvas2;
            var element2 = $("#pngBoxMemory"); // global variable
            html2canvas(element2, {
                    onrendered: function (canvas) {
                           $("#previewImage").append(canvas);
                           getCanvas2 = canvas;
                           getCanvas2.id ="memoryPNG";
                           var newData = 'memoryPNG';
                          var gameName = "PAIRED GAME"
                         if(newData != null || newData != ""){               
                             helper.saveSignature(component, newData, gameName);
                             $('#pngBoxMemoryBox').hide();
                         }
                         else{
                            // alert('Please Sign in the box');
                         }
                        
                    }
            });
        });
    }
})