public without sharing class LongitudinalGraphController {
    @AuraEnabled 
    public static ChartData getGraphdData ()
    {        
        try{
            Id contactId = [SELECT ContactId From User where Id =: UserInfo.getUserId() AND ContactId != null].ContactId;             
            List<Map<String, Object>> flankerdataList = new List<Map<String, Object>>();
            List<Map<String, Object>> keepTrackdataList = new List<Map<String, Object>>();
            List<Map<String, Object>> FaceNameList = new List<Map<String, Object>>();
            List<Map<String, Object>> objectsdataList = new List<Map<String, Object>>();
            List<Map<String, Object>> objectSpacedataList = new List<Map<String, Object>>();
            List<Map<String, Object>> objectTimedataList = new List<Map<String, Object>>();
            List<Map<String, Object>> reactdataList = new List<Map<String, Object>>();
            List<Map<String, Object>> shapesdataList = new List<Map<String, Object>>();
            List<Map<String, Object>> switchingdataList = new List<Map<String, Object>>();
            List<Map<String, Object>> wordPairsdataList = new List<Map<String, Object>>();
            List<Map<String, Object>> fakenewsdataList = new List<Map<String, Object>>();
            List<Map<String, Object>> beangameleftdataList = new List<Map<String, Object>>();
            List<Map<String, Object>> beangamerightdataList = new List<Map<String, Object>>();
            List<String> xAxisLabelsflanker = new List<String>(); 
            List<String> xAxisLabelskeepTrack = new List<String>(); 
            List<String> xAxisLabelsFaceName = new List<String>(); 
            List<String> xAxisLabelsobjects = new List<String>(); 
            List<String> xAxisLabelsobjectSpace = new List<String>(); 
            List<String> xAxisLabelsobjectTime = new List<String>(); 
            List<String> xAxisLabelsreact = new List<String>(); 
            List<String> xAxisLabelsshapes = new List<String>(); 
            List<String> xAxisLabelsswitching = new List<String>(); 
            List<String> xAxisLabelswordPairs = new List<String>(); 
            List<String> xAxisLabelsfakenews = new List<String>(); 
            List<String> xAxisLabelsbeangame = new List<String>(); 
            Map<String, Object> scoreData = new Map<String, Object>();
            Integer flkAtt=1,keeptrackAtt=1,faceNameAtt=1,objectsAtt=1,objectSpaceAtt=1,objectTimeAtt=1,reactAtt=1,shapesAtt=1,
                    switchingAtt=1,wordPairAtt=1,fakenewsAtt=1,beangameAtt=1;
            Decimal yourScore,correctAnswers,reactionTime;
       
            List<Participant_Game_Info__c> recordsPGI =  [SELECT Count_Of_No_Of_Correct_Answered__c, Count_Of_Total_Reaction_Time__c,
                                                  No_Of_Correct_Answered__c,No_of_Question_Attempted__c,Total_Reaction_Time__c,
                                                  User_Device__c,Game_Name__r.Name,Count_Of_No_of_Question_Attempted__c,
                                                  Game_Name__r.Max_Score__c, CreatedDate
                                                  FROM Participant_Game_Info__c 
                                                  //WHERE Contact_Name__c = '0038G00000YESnyQAH' 
                                                  WHERE Contact_Name__c = : contactId  
                                                  AND Count_Of_No_Of_Correct_Answered__c != null
                                                  AND Count_Of_No_of_Question_Attempted__c != null
                                                  AND Count_Of_Total_Reaction_Time__c != null
                                                  AND Count_Of_No_Of_Correct_Answered__c >0
                                                  AND Count_Of_No_of_Question_Attempted__c >0
                                                  AND Count_Of_Total_Reaction_Time__c >0
                                                  ORDER BY CreatedDate ASC
                                                  ];
            system.debug('recordsPGI: '+recordsPGI);
            if(recordsPGI.size()>0)
            {
                for(Participant_Game_Info__c recPG: recordsPGI){
                    Integer userDevice = recPG.User_Device__c=='DESKTOP'?0:1;
                    //Decimal multiplyFactor = 100.0/Integer.valueOf(recPG.Game_Name__r.Max_Score__c);
                    //multiplyFactor = multiplyFactor.setScale(2, RoundingMode.HALF_UP);
                    /*if(recPG.Game_Name__r.Name =='Deary Simple And Complex Reaction Time'){
                        yourScore = Integer.valueOf(recPG.Count_Of_Total_Reaction_Time__c/recPG.Count_Of_No_of_Question_Attempted__c);
                        correctAnswers = Integer.valueOf(recPG.Count_Of_No_Of_Correct_Answered__c);
                        Integer graceValue = 400 ;
                        reactionTime = Integer.valueOf(recPG.Count_Of_Total_Reaction_Time__c/recPG.Count_Of_No_of_Question_Attempted__c);
                    }
                    else{
                        yourScore = Integer.valueOf(recPG.Count_Of_Total_Reaction_Time__c/recPG.Count_Of_No_of_Question_Attempted__c)*multiplyFactor;
                        correctAnswers = Integer.valueOf(recPG.Count_Of_No_Of_Correct_Answered__c)*multiplyFactor;
                        reactionTime = Integer.valueOf(recPG.Count_Of_Total_Reaction_Time__c/recPG.Count_Of_No_of_Question_Attempted__c)*multiplyFactor;                        
                    }*/
                    yourScore = Integer.valueOf(recPG.Count_Of_Total_Reaction_Time__c/recPG.Count_Of_No_of_Question_Attempted__c);
                    correctAnswers = Integer.valueOf(recPG.Count_Of_No_Of_Correct_Answered__c);
                    reactionTime = Integer.valueOf(recPG.Count_Of_Total_Reaction_Time__c/recPG.Count_Of_No_of_Question_Attempted__c);
                    Boolean isGamePlayed = true;                                        
                    scoreData = new Map<String, Object>{'YourScore'=>yourScore,'CorrectAnswers'=>correctAnswers,
                            'ReactionTime'=>reactionTime,'isGamePlayed'=>isGamePlayed,'UserDevice'=>userDevice}; 
                   if(recPG.Game_Name__r.Name =='Flanker'){	                            
                       		Map<String, Object> dataItem = new Map<String, Object>();
                            if(xAxisLabelsflanker.size()>0){
                                if(xAxisLabelsflanker.contains(recPG.CreatedDate.format('MMM-dd-yyyy')) ){
                                    flkAtt=flkAtt+1;
                                    xAxisLabelsflanker.add(recPG.CreatedDate.format('MMM-dd-yyyy')+'('+flkAtt+')');
                                    dataItem.put('x', recPG.CreatedDate.format('MMM-dd-yyyy')+'('+flkAtt+')');
                            		//dataItem.put('y', correctAnswers);
                            		dataItem.put('y', reactionTime);
                                }
                                else{
                                    flkAtt=1;
                                    xAxisLabelsflanker.add(recPG.CreatedDate.format('MMM-dd-yyyy'));
                                    dataItem.put('x', recPG.CreatedDate.format('MMM-dd-yyyy'));
                            		//dataItem.put('y', correctAnswers);
                            		dataItem.put('y', reactionTime);
                                }
                            }
                       		else{
                            xAxisLabelsflanker.add(recPG.CreatedDate.format('MMM-dd-yyyy'));
                            dataItem.put('x', recPG.CreatedDate.format('MMM-dd-yyyy'));
                            //dataItem.put('y', correctAnswers);
                            dataItem.put('y', reactionTime);
                       		}                       
                       		flankerdataList.add(dataItem);                       
                        }        
                    
                        if(recPG.Game_Name__r.Name =='Keep Track' )
                        {                            
                           	Map<String, Object> dataItem = new Map<String, Object>{'x' => recPG.CreatedDate.format('MMM-dd-yyyy'),'y' => correctAnswers};              
                            if(xAxisLabelskeepTrack.size()>0){
                                if(xAxisLabelskeepTrack.contains(recPG.CreatedDate.format('MMM-dd-yyyy')) ){
                                    keeptrackAtt=keeptrackAtt+1;
                                    xAxisLabelskeepTrack.add(recPG.CreatedDate.format('MMM-dd-yyyy')+'('+keeptrackAtt+')');
                                    dataItem.put('x', recPG.CreatedDate.format('MMM-dd-yyyy')+'('+keeptrackAtt+')');
                            		dataItem.put('y', correctAnswers);
                                }
                                else{
                                    keeptrackAtt=1;
                                    xAxisLabelskeepTrack.add(recPG.CreatedDate.format('MMM-dd-yyyy'));
                                    dataItem.put('x', recPG.CreatedDate.format('MMM-dd-yyyy'));
                            		dataItem.put('y', correctAnswers);
                                }
                            }
                       		else{
                            xAxisLabelskeepTrack.add(recPG.CreatedDate.format('MMM-dd-yyyy'));
                            dataItem.put('x', recPG.CreatedDate.format('MMM-dd-yyyy'));
                            dataItem.put('y', correctAnswers);
                       		}                                   
                            keepTrackdataList.add(dataItem);                           
                        }    
                    
                    	if(recPG.Game_Name__r.Name =='Face-Name Associates' )
                        {
                            Map<String, Object> dataItem = new Map<String, Object>{'x' => recPG.CreatedDate.format('MMM-dd-yyyy'),'y' => correctAnswers};              
                            if(xAxisLabelsFaceName.size()>0){
                                if(xAxisLabelsFaceName.contains(recPG.CreatedDate.format('MMM-dd-yyyy')) ){
                                    faceNameAtt=faceNameAtt+1;
                                    xAxisLabelsFaceName.add(recPG.CreatedDate.format('MMM-dd-yyyy')+'('+faceNameAtt+')');
                                    dataItem.put('x', recPG.CreatedDate.format('MMM-dd-yyyy')+'('+faceNameAtt+')');
                            		dataItem.put('y', correctAnswers);
                                }
                                else{
                                    faceNameAtt=1;
                                    xAxisLabelsFaceName.add(recPG.CreatedDate.format('MMM-dd-yyyy'));
                                    dataItem.put('x', recPG.CreatedDate.format('MMM-dd-yyyy'));
                            		dataItem.put('y', correctAnswers);
                                }
                            }
                       		else{
                            xAxisLabelsFaceName.add(recPG.CreatedDate.format('MMM-dd-yyyy'));
                            dataItem.put('x', recPG.CreatedDate.format('MMM-dd-yyyy'));
                            dataItem.put('y', correctAnswers);
                       		}               
                            FaceNameList.add(dataItem);                          
                        }  
                    
                    	if(recPG.Game_Name__r.Name =='Object Discrimination' )
                        {
                            Map<String, Object> dataItem = new Map<String, Object>{'x' => recPG.CreatedDate.format('MMM-dd-yyyy'),'y' => correctAnswers};              
                            if(xAxisLabelsobjects.size()>0){
                                if(xAxisLabelsobjects.contains(recPG.CreatedDate.format('MMM-dd-yyyy')) ){
                                    objectsAtt=objectsAtt+1;
                                    xAxisLabelsobjects.add(recPG.CreatedDate.format('MMM-dd-yyyy')+'('+objectsAtt+')');
                                    dataItem.put('x', recPG.CreatedDate.format('MMM-dd-yyyy')+'('+objectsAtt+')');
                            		dataItem.put('y', correctAnswers);
                                }
                                else{
                                    objectsAtt=1;
                                    xAxisLabelsobjects.add(recPG.CreatedDate.format('MMM-dd-yyyy'));
                                    dataItem.put('x', recPG.CreatedDate.format('MMM-dd-yyyy'));
                            		dataItem.put('y', correctAnswers);
                                }
                            }
                       		else{
                            xAxisLabelsobjects.add(recPG.CreatedDate.format('MMM-dd-yyyy'));
                            dataItem.put('x', recPG.CreatedDate.format('MMM-dd-yyyy'));
                            dataItem.put('y', correctAnswers);
                       		}                                   
                            objectsdataList.add(dataItem);                        
                        }  
                        
                        if(recPG.Game_Name__r.Name =='Object Spatial' )
                            {
                                Map<String, Object> dataItem = new Map<String, Object>{'x' => recPG.CreatedDate.format('MMM-dd-yyyy'),'y' => correctAnswers};              
                                if(xAxisLabelsobjectSpace.size()>0){
                                    if(xAxisLabelsobjectSpace.contains(recPG.CreatedDate.format('MMM-dd-yyyy')) ){
                                        objectSpaceAtt=objectSpaceAtt+1;
                                        xAxisLabelsobjectSpace.add(recPG.CreatedDate.format('MMM-dd-yyyy')+'('+objectSpaceAtt+')');
                                        dataItem.put('x', recPG.CreatedDate.format('MMM-dd-yyyy')+'('+objectSpaceAtt+')');
                                        dataItem.put('y', correctAnswers);
                                    }
                                    else{
                                        objectSpaceAtt=1;
                                        xAxisLabelsobjectSpace.add(recPG.CreatedDate.format('MMM-dd-yyyy'));
                                        dataItem.put('x', recPG.CreatedDate.format('MMM-dd-yyyy'));
                                        dataItem.put('y', correctAnswers);
                                    }
                                }
                                else{
                                xAxisLabelsobjectSpace.add(recPG.CreatedDate.format('MMM-dd-yyyy'));
                                dataItem.put('x', recPG.CreatedDate.format('MMM-dd-yyyy'));
                                dataItem.put('y', correctAnswers);
                                }                                       
                                objectSpacedataList.add(dataItem);                        
                            } 
                    
                    		if(recPG.Game_Name__r.Name =='Object Temporal' )
                            {
                                Map<String, Object> dataItem = new Map<String, Object>{'x' => recPG.CreatedDate.format('MMM-dd-yyyy'),'y' => correctAnswers};              
                                if(xAxisLabelsobjectTime.size()>0){
                                    if(xAxisLabelsobjectTime.contains(recPG.CreatedDate.format('MMM-dd-yyyy')) ){
                                        objectTimeAtt=objectTimeAtt+1;
                                        xAxisLabelsobjectTime.add(recPG.CreatedDate.format('MMM-dd-yyyy')+'('+objectTimeAtt+')');
                                        dataItem.put('x', recPG.CreatedDate.format('MMM-dd-yyyy')+'('+objectTimeAtt+')');
                                        dataItem.put('y', correctAnswers);
                                    }
                                    else{
                                        objectTimeAtt=1;
                                        xAxisLabelsobjectTime.add(recPG.CreatedDate.format('MMM-dd-yyyy'));
                                        dataItem.put('x', recPG.CreatedDate.format('MMM-dd-yyyy'));
                                        dataItem.put('y', correctAnswers);
                                    }
                                }
                                else{
                                xAxisLabelsobjectTime.add(recPG.CreatedDate.format('MMM-dd-yyyy'));
                                dataItem.put('x', recPG.CreatedDate.format('MMM-dd-yyyy'));
                                dataItem.put('y', correctAnswers);
                                }                                       
                                objectTimedataList.add(dataItem);                          
                            } 
                    
                    		if(recPG.Game_Name__r.Name =='Deary Simple And Complex Reaction Time' )
                            {
                                Map<String, Object> dataItem = new Map<String, Object>{'x' => recPG.CreatedDate.format('MMM-dd-yyyy'),'y' => reactionTime};              
                                if(xAxisLabelsreact.size()>0){
                                    if(xAxisLabelsreact.contains(recPG.CreatedDate.format('MMM-dd-yyyy')) ){
                                        reactAtt=reactAtt+1;
                                        xAxisLabelsreact.add(recPG.CreatedDate.format('MMM-dd-yyyy')+'('+reactAtt+')');
                                        dataItem.put('x', recPG.CreatedDate.format('MMM-dd-yyyy')+'('+reactAtt+')');
                                        dataItem.put('y', reactionTime);
                                    }
                                    else{
                                        reactAtt=1;
                                        xAxisLabelsreact.add(recPG.CreatedDate.format('MMM-dd-yyyy'));
                                        dataItem.put('x', recPG.CreatedDate.format('MMM-dd-yyyy'));
                                        dataItem.put('y', reactionTime);
                                    }
                                }
                                else{
                                xAxisLabelsreact.add(recPG.CreatedDate.format('MMM-dd-yyyy'));
                                dataItem.put('x', recPG.CreatedDate.format('MMM-dd-yyyy'));
                                dataItem.put('y', reactionTime);
                                }                                       
                                reactdataList.add(dataItem);                        
                            } 
                    
                   			if(recPG.Game_Name__r.Name =='Object Recognition And Similarity' )
                            {
                                Map<String, Object> dataItem = new Map<String, Object>{'x' => recPG.CreatedDate.format('MMM-dd-yyyy'),'y' => correctAnswers};              
                                if(xAxisLabelsshapes.size()>0){
                                    if(xAxisLabelsshapes.contains(recPG.CreatedDate.format('MMM-dd-yyyy')) ){
                                        shapesAtt=shapesAtt+1;
                                        xAxisLabelsshapes.add(recPG.CreatedDate.format('MMM-dd-yyyy')+'('+shapesAtt+')');
                                        dataItem.put('x', recPG.CreatedDate.format('MMM-dd-yyyy')+'('+shapesAtt+')');
                                        dataItem.put('y', correctAnswers);
                                    }
                                    else{
                                        shapesAtt=1;
                                        xAxisLabelsshapes.add(recPG.CreatedDate.format('MMM-dd-yyyy'));
                                        dataItem.put('x', recPG.CreatedDate.format('MMM-dd-yyyy'));
                                        dataItem.put('y', correctAnswers);
                                    }
                                }
                                else{
                                xAxisLabelsshapes.add(recPG.CreatedDate.format('MMM-dd-yyyy'));
                                dataItem.put('x', recPG.CreatedDate.format('MMM-dd-yyyy'));
                                dataItem.put('y', correctAnswers);
                                }                                       
                                shapesdataList.add(dataItem);                            
                            } 
                    		
                    		if(recPG.Game_Name__r.Name =='Letter-Number Sequencing' )
                            {
                                Map<String, Object> dataItem = new Map<String, Object>{'x' => recPG.CreatedDate.format('MMM-dd-yyyy'),'y' => correctAnswers};              
                                if(xAxisLabelsswitching.size()>0){
                                    if(xAxisLabelsswitching.contains(recPG.CreatedDate.format('MMM-dd-yyyy')) ){
                                        switchingAtt=switchingAtt+1;
                                        xAxisLabelsswitching.add(recPG.CreatedDate.format('MMM-dd-yyyy')+'('+switchingAtt+')');
                                        dataItem.put('x', recPG.CreatedDate.format('MMM-dd-yyyy')+'('+switchingAtt+')');
                                        dataItem.put('y', correctAnswers);
                                    }
                                    else{
                                        switchingAtt=1;
                                        xAxisLabelsswitching.add(recPG.CreatedDate.format('MMM-dd-yyyy'));
                                        dataItem.put('x', recPG.CreatedDate.format('MMM-dd-yyyy'));
                                        dataItem.put('y', correctAnswers);
                                    }
                                }
                                else{
                                xAxisLabelsswitching.add(recPG.CreatedDate.format('MMM-dd-yyyy'));
                                dataItem.put('x', recPG.CreatedDate.format('MMM-dd-yyyy'));
                                dataItem.put('y', correctAnswers);
                                }                                       
                                switchingdataList.add(dataItem);                          
                            } 
                    		
                    		if(recPG.Game_Name__r.Name =='Verbal Paired Associates' )
                            {
                                Map<String, Object> dataItem = new Map<String, Object>{'x' => recPG.CreatedDate.format('MMM-dd-yyyy'),'y' => correctAnswers};              
                                if(xAxisLabelswordPairs.size()>0){
                                    if(xAxisLabelswordPairs.contains(recPG.CreatedDate.format('MMM-dd-yyyy')) ){
                                        wordPairAtt=wordPairAtt+1;
                                        xAxisLabelswordPairs.add(recPG.CreatedDate.format('MMM-dd-yyyy')+'('+wordPairAtt+')');
                                        dataItem.put('x', recPG.CreatedDate.format('MMM-dd-yyyy')+'('+wordPairAtt+')');
                                        dataItem.put('y', correctAnswers);
                                    }
                                    else{
                                        wordPairAtt=1;
                                        xAxisLabelswordPairs.add(recPG.CreatedDate.format('MMM-dd-yyyy'));
                                        dataItem.put('x', recPG.CreatedDate.format('MMM-dd-yyyy'));
                                        dataItem.put('y', correctAnswers);
                                    }
                                }
                                else{
                                xAxisLabelswordPairs.add(recPG.CreatedDate.format('MMM-dd-yyyy'));
                                dataItem.put('x', recPG.CreatedDate.format('MMM-dd-yyyy'));
                                dataItem.put('y', correctAnswers);
                                }                                       
                                wordPairsdataList.add(dataItem);                         
                            } 
                    		if(recPG.Game_Name__r.Name =='Fake News Test' )
                            {
                                Map<String, Object> dataItem = new Map<String, Object>{'x' => recPG.CreatedDate.format('MMM-dd-yyyy'),'y' => correctAnswers};              
                                if(xAxisLabelsfakenews.size()>0){
                                    if(xAxisLabelsfakenews.contains(recPG.CreatedDate.format('MMM-dd-yyyy')) ){
                                        fakenewsAtt=fakenewsAtt+1;
                                        xAxisLabelsfakenews.add(recPG.CreatedDate.format('MMM-dd-yyyy')+'('+fakenewsAtt+')');
                                        dataItem.put('x', recPG.CreatedDate.format('MMM-dd-yyyy')+'('+fakenewsAtt+')');
                                        dataItem.put('y', correctAnswers);
                                    }
                                    else{
                                        fakenewsAtt=1;
                                        xAxisLabelsfakenews.add(recPG.CreatedDate.format('MMM-dd-yyyy'));
                                        dataItem.put('x', recPG.CreatedDate.format('MMM-dd-yyyy'));
                                        dataItem.put('y', correctAnswers);
                                    }
                                }
                                else{
                                xAxisLabelsfakenews.add(recPG.CreatedDate.format('MMM-dd-yyyy'));
                                dataItem.put('x', recPG.CreatedDate.format('MMM-dd-yyyy'));
                                dataItem.put('y', correctAnswers);
                                }                                       
                                fakenewsdataList.add(dataItem);                         
                            } 
                    }
            } 
            List<Bean_Game__c> bean = [SELECT Id,Left_Hand_Average__c,Right_Hand_Average__c,CreatedDate FROM Bean_Game__c 
                                       where Contact__c = :contactId];
            for(Bean_Game__c beangame: bean){
                 //Decimal leftHandAvg= Decimal.valueOf(beangame.Left_Hand_Average__c.split(':')[0])*60+Decimal.valueOf(beangame.Left_Hand_Average__c.split(':')[1]);
                 //Decimal rightHandAvg = Decimal.valueOf(beangame.Right_Hand_Average__c.split(':')[0])*60+Decimal.valueOf(beangame.Right_Hand_Average__c.split(':')[1]);
                 Decimal leftHandAvg= beangame.Left_Hand_Average__c;
                 Decimal rightHandAvg = beangame.Right_Hand_Average__c;
                 Map<String, Object> dataItemLeft = new Map<String, Object>{'x' => beangame.CreatedDate.format('MMM-dd-yyyy'),'y' =>leftHandAvg};  
                 Map<String, Object> dataItemRight = new Map<String, Object>{'x' => beangame.CreatedDate.format('MMM-dd-yyyy'),'y' => rightHandAvg};              
                                if(xAxisLabelsbeangame.size()>0){
                                    if(xAxisLabelsbeangame.contains(beangame.CreatedDate.format('MMM-dd-yyyy')) ){
                                        beangameAtt=beangameAtt+1;
                                        xAxisLabelsbeangame.add(beangame.CreatedDate.format('MMM-dd-yyyy')+'('+beangameAtt+')');
                                        dataItemLeft.put('x', beangame.CreatedDate.format('MMM-dd-yyyy')+'('+beangameAtt+')');
                                        dataItemLeft.put('y', leftHandAvg);
                                        dataItemRight.put('x', beangame.CreatedDate.format('MMM-dd-yyyy')+'('+beangameAtt+')');
                                        dataItemRight.put('y', rightHandAvg);
                                    }
                                    else{
                                        beangameAtt=1;
                                        xAxisLabelsbeangame.add(beangame.CreatedDate.format('MMM-dd-yyyy'));
                                        dataItemLeft.put('x', beangame.CreatedDate.format('MMM-dd-yyyy'));
                                        dataItemLeft.put('y', leftHandAvg);
                                        dataItemRight.put('x', beangame.CreatedDate.format('MMM-dd-yyyy'));
                                        dataItemRight.put('y', rightHandAvg);
                                    }
                                }
                                else{
                                xAxisLabelsbeangame.add(beangame.CreatedDate.format('MMM-dd-yyyy'));
                                dataItemLeft.put('x', beangame.CreatedDate.format('MMM-dd-yyyy'));
                                dataItemLeft.put('y', leftHandAvg);
                                dataItemRight.put('x', beangame.CreatedDate.format('MMM-dd-yyyy'));
                                dataItemRight.put('y', rightHandAvg);
                                }                                       
                                beangameleftdataList.add(dataItemLeft);  
               					beangamerightdataList.add(dataItemRight);  
            }
           ChartData chartData = new ChartData();
           chartData.gamedataList = new Map<String,Object>{'flankerdataList'=>flankerdataList,'keepTrackdataList'=>keepTrackdataList,
                'FaceNameList'=>FaceNameList,'objectsdataList'=>objectsdataList,'objectSpacedataList'=>objectSpacedataList,
                'objectTimedataList'=>objectTimedataList,'reactdataList'=>reactdataList,'shapesdataList'=>shapesdataList,
                'switchingdataList'=>switchingdataList,'wordPairsdataList'=>wordPairsdataList,'fakenewsdataList'=>fakenewsdataList,
               'beangameleftdataList'=>beangameleftdataList,'beangamerightdataList'=>beangamerightdataList};
           chartData.xAxisLabelsflanker = xAxisLabelsflanker;
           chartData.xAxisLabelskeepTrack = xAxisLabelskeepTrack;
           chartData.xAxisLabelsFaceName = xAxisLabelsFaceName;
           chartData.xAxisLabelsobjects = xAxisLabelsobjects; 
           chartData.xAxisLabelsobjectSpace = xAxisLabelsobjectSpace;
           chartData.xAxisLabelsobjectTime = xAxisLabelsobjectTime;
           chartData.xAxisLabelsreact = xAxisLabelsreact;
           chartData.xAxisLabelsshapes = xAxisLabelsshapes;
           chartData.xAxisLabelsswitching = xAxisLabelsswitching;
           chartData.xAxisLabelswordPairs = xAxisLabelswordPairs;
           chartData.xAxisLabelsfakenews = xAxisLabelsfakenews;
           chartData.xAxisLabelsbeangame = xAxisLabelsbeangame;
           return chartData;           
        }
        catch(Exception e){
            System.debug('Exception caught: ' + e.getMessage());
            System.debug('Line Num: ' + e.getLineNumber());
            return new chartData();
        }
    }
    
    public class ChartData
    {
		@AuraEnabled
        public Map<String, Object> gamedataList; 
		@AuraEnabled
        public List<String> xAxisLabelsflanker;
        @AuraEnabled
        public List<String> xAxisLabelskeepTrack;
        @AuraEnabled
        public List<String> xAxisLabelsFaceName;
        @AuraEnabled
        public List<String> xAxisLabelsobjects;
        @AuraEnabled
        public List<String> xAxisLabelsobjectSpace;
        @AuraEnabled
        public List<String> xAxisLabelsobjectTime;
        @AuraEnabled
        public List<String> xAxisLabelsreact;
        @AuraEnabled
        public List<String> xAxisLabelsshapes;
        @AuraEnabled
        public List<String> xAxisLabelsswitching;
        @AuraEnabled
        public List<String> xAxisLabelswordPairs;
        @AuraEnabled
        public List<String> xAxisLabelsfakenews;
        @AuraEnabled
        public List<String> xAxisLabelsbeangame;
        
    }
}