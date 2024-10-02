({   
    doInit : function(component) {
        let action = component.get('c.getGraphdData');     
        action.setCallback(this, function(response) {                      
            if (response.getState() === 'SUCCESS' && response.getReturnValue()) {                 
                 let graphData = response.getReturnValue();
                 let chartNames =[];
                 //console.log('graphData in Parent: ' + graphData);
                 if(graphData.gamedataList.flankerdataList.length>0){
                    chartNames.push($A.get("$Label.c.game_name_4"));
                 }
                 else{
                    delete graphData.gamedataList.flankerdataList;
                 }
                 if(graphData.gamedataList.keepTrackdataList.length>0){
                    chartNames.push($A.get("$Label.c.game_name_7"));
                 }
                 else{
                    delete graphData.gamedataList.keepTrackdataList;
                 }
                 if(graphData.gamedataList.FaceNameList.length>0){
                    chartNames.push($A.get("$Label.c.face_name_game_text_0b"));
                 }
                 else{
                    delete graphData.gamedataList.FaceNameList;
                 }
                 if(graphData.gamedataList.objectsdataList.length>0){
                    chartNames.push($A.get("$Label.c.game_name_8"));
                 }
                 else{
                    delete graphData.gamedataList.objectsdataList;
                 }
                 if(graphData.gamedataList.objectSpacedataList.length>0){
                    chartNames.push($A.get("$Label.c.game_name_10"));
                 }
                 else{
                    delete graphData.gamedataList.objectSpacedataList;
                 }
                 if(graphData.gamedataList.objectTimedataList.length>0){
                    chartNames.push($A.get("$Label.c.game_name_9"));
                 }
                 else{
                    delete graphData.gamedataList.objectTimedataList;
                 }
                 if(graphData.gamedataList.reactdataList.length>0){
                    chartNames.push($A.get("$Label.c.game_name_2"));
                 }
                 else{
                    delete graphData.gamedataList.reactdataList;
                 }
                 if(graphData.gamedataList.shapesdataList.length>0){
                    chartNames.push($A.get("$Label.c.game_name_3"));
                 }
                 else{
                    delete graphData.gamedataList.shapesdataList;
                 }
                 if(graphData.gamedataList.switchingdataList.length>0){
                    chartNames.push($A.get("$Label.c.game_name_6"));
                 }
                 else{
                    delete graphData.gamedataList.switchingdataList;
                 }
                 if(graphData.gamedataList.wordPairsdataList.length>0){
                    chartNames.push($A.get("$Label.c.game_name_1"));
                 }
                 else{
                    delete graphData.gamedataList.wordPairsdataList;
                 }
                 if(graphData.gamedataList.fakenewsdataList.length>0){
                    chartNames.push($A.get("$Label.c.game_name_14"));
                 }
                 else{
                    delete graphData.gamedataList.fakenewsdataList;
                 }
                 if(graphData.gamedataList.digitSymboldataList.length>0){
                  chartNames.push($A.get("$Label.c.game_name_17"));
                 }
                 else{
                  delete graphData.gamedataList.digitSymboldataList;
                 }
                 if(graphData.gamedataList.camelandcactusdataList.length>0){
                  chartNames.push($A.get("$Label.c.game_name_18"));
                 }
                 else{
                  delete graphData.gamedataList.camelandcactusdataList;
                 }
                 if(graphData.gamedataList.beangamerightdataList.length>0 && graphData.gamedataList.beangameleftdataList.length>0){
                    chartNames.push($A.get("$Label.c.game_name_11"));
                 }
                 else{
                    delete graphData.gamedataList.beangamerightdataList;
                    delete graphData.gamedataList.beangameleftdataList;
                 }
                 component.set('v.chartNames',chartNames);
                 component.set('v.graphData',graphData);
            }
            else{
               let errors = response.getError();
               if (errors && Array.isArray(errors) && errors.length > 0) {
                   message = errors[0].message;
                   //console.log('Error: '+message);
               }
            }
        });
        $A.enqueueAction(action);      
    },
})