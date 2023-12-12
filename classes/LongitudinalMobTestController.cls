public without sharing class LongitudinalMobTestController {
    @AuraEnabled 
    public static ChartData getGraphdData ()
    {        
        try{
            Id contactId;
            if(!Test.isRunningTest()){
                //contactId = [SELECT ContactId From User where Id =: UserInfo.getUserId() AND ContactId != null].ContactId; 
            }
            else{
                contactId = '0038G00000YESnyQAH';
            }           
            contactId = '0038G00000YESnyQAH';//Sibi delete later
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
            List<String> xAxisLabels = new List<String>(); 
            Map<String, Object> scoreData = new Map<String, Object>();
            Map<String, Map<String, Object>> mapPlyAverageValues = new  Map<String, Map<String, Object>>();
            Map<Integer, Map<String, Object>> mapOtherData =  new Map<Integer, Map<String, Object>>();
            List<Map<String, Object>> listOtherData =  new List<Map<String, Object>>();
            Map<String, Integer> overallAverage =  new Map<String, Integer>();
            String AttemptLabel = System.Label.AttemptLabel;
            Integer flkAtt=0,keeptrackAtt=0,faceNameAtt=0,objectsAtt=0,objectSpaceAtt=0,objectTimeAtt=0,reactAtt=0,shapesAtt=0,
                    switchingAtt=0,wordPairAtt=0;
            Decimal yourScore,correctAnswers,reactionTime;
       
            List<Participant_Game_Info__c> recordsPGI =  [SELECT Count_Of_No_Of_Correct_Answered__c, Count_Of_Total_Reaction_Time__c,
                                                  No_Of_Correct_Answered__c,No_of_Question_Attempted__c,Total_Reaction_Time__c,
                                                  User_Device__c,Game_Attempt__c,Game_Name__r.Name,Count_Of_No_of_Question_Attempted__c,
                                                  Game_Name__r.Max_Score__c
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
            Contact objCon = [SELECT Sex__c,Age__c,Education_Attainment__c FROM Contact
                              //WHERE Id='0038G00000YESnyQAH'
                              WHERE Id = : contactId
                             ];
            System.debug('objCon: '+ objCon);
            Decimal age = objCon.Age__c;
            age = age == null ? 18 : age;
            age = age < 18 ? 18 : age;
            age = age > 90 ? 90 : age;
            Decimal edu_att = objCon.Education_Attainment__c;
            edu_att = edu_att == null ? 1 : edu_att;
            System.debug('age: '+ age);
            System.debug('edu_att: '+ edu_att);
            
            List<String> games = new List<String>{'Flanker','Keep Track','Object Discrimination','Object Spatial','Object Temporal',
                							      'Deary Simple And Complex Reaction Time','Object Recognition And Similarity',
                								  'Letter-Number Sequencing','Verbal Paired Associates','Face-Name Associates'};
            
            System.debug('peopleLikeYouData-Switching: '+ [SELECT Education__c,Sex__c, Age__c,Average__c,High_Average__c,Low_Average__c,Game_Name__r.Max_Score__c
                FROM People_Like_You_Data__c
                WHERE Game_Name__r.Name = 'Letter-Number Sequencing' 
                AND Sex__c =:objCon.Sex__c AND Education__c>=: edu_att
                AND Age__c =:age Order BY Education__c ASC LIMIT 1]);                                          
            for(String gameName: games)
            {
                List<People_Like_You_Data__c> objLikeYouList = [SELECT Education__c,Sex__c, Age__c,Average__c,High_Average__c,Low_Average__c,Game_Name__r.Max_Score__c
                FROM People_Like_You_Data__c
                WHERE Game_Name__r.Name =:gameName 
                AND Sex__c =:objCon.Sex__c AND Education__c>=: edu_att
                AND Age__c =:age Order BY Education__c ASC LIMIT 1]; 
                for(People_Like_You_Data__c peopleLikeYouData : objLikeYouList){
                    System.debug('Max_Score__c for '+gameName+':'+peopleLikeYouData.Game_Name__r.Max_Score__c);
                    Decimal multiplyFactor = 100.0/Integer.valueOf(peopleLikeYouData.Game_Name__r.Max_Score__c);
                    multiplyFactor = multiplyFactor.setScale(2, RoundingMode.HALF_UP);
                    System.debug('Integer value of Max_Score__c for '+gameName+':'+Integer.valueOf(peopleLikeYouData.Game_Name__r.Max_Score__c));
                    System.debug('multiplyFactor for '+gameName+' before If:'+multiplyFactor);
                    if(gameName =='Deary Simple And Complex Reaction Time')
                    {                        
                        mapPlyAverageValues.put(gameName,new map<String,Object>{'PeopleLikeYou'=>Integer.valueOf(peopleLikeYouData.Average__c),
                        'LowAverage'=>Integer.valueOf(peopleLikeYouData.Low_Average__c) ,'HighAverage'=> Integer.valueOf(peopleLikeYouData.High_Average__c),
                        'MaxValue'=>Integer.valueOf(peopleLikeYouData.Game_Name__r.Max_Score__c)});
                    }
                    else{
                        System.debug('multiplyFactor for '+gameName+':'+multiplyFactor);
                        mapPlyAverageValues.put(gameName,new map<String,Object>{'PeopleLikeYou'=>Integer.valueOf(peopleLikeYouData.Average__c)*multiplyFactor,
                        'LowAverage'=>Integer.valueOf(peopleLikeYouData.Low_Average__c)*multiplyFactor ,'HighAverage'=> Integer.valueOf(peopleLikeYouData.High_Average__c)*multiplyFactor,
                        'MaxValue'=>100});
                    }
               } 
            }
            
            System.debug('mapPlyAverageValues: '+ mapPlyAverageValues.get('Letter-Number Sequencing'));
            
            for(Participant_Dashboard__c objDashboard:[SELECT Data_Name__c,Data_Category__c, Data_Value__c,Game_Detail__r.Name,
                                                       Game_Detail__r.Max_Score__c FROM Participant_Dashboard__c 
                                                       WHERE Data_Name__c ='Overall Average'
                                                       ]){
                Decimal multiplyFactor = 100.0/Integer.valueOf(objDashboard.Game_Detail__r.Max_Score__c);
                multiplyFactor = multiplyFactor.setScale(2, RoundingMode.HALF_UP);                                           
                if(mapPlyAverageValues.containsKey(objDashboard.Game_Detail__r.Name)){
                    if(objDashboard.Game_Detail__r.Name =='Deary Simple And Complex Reaction Time'){
                        mapPlyAverageValues.get(objDashboard.Game_Detail__r.Name).put('overallAverage',Integer.valueOf(objDashboard.Data_Value__c));
                    }
                    else{
                        mapPlyAverageValues.get(objDashboard.Game_Detail__r.Name).put('overallAverage',Integer.valueOf(objDashboard.Data_Value__c)*multiplyFactor);
                    }                    
            	} 
            }            
            
            System.debug('recordsPGI'+ recordsPGI);
            System.debug('recordsPGI size: '+ recordsPGI.size());
            if(recordsPGI.size()>0)
            {
                for(Participant_Game_Info__c recPG: recordsPGI){
                    Integer userDevice = recPG.User_Device__c=='DESKTOP'?0:1;
                    Decimal multiplyFactor = 100.0/Integer.valueOf(recPG.Game_Name__r.Max_Score__c);
                    multiplyFactor = multiplyFactor.setScale(2, RoundingMode.HALF_UP);
                    if(recPG.Game_Name__r.Name =='Deary Simple And Complex Reaction Time'){
                        yourScore = Integer.valueOf(recPG.Count_Of_Total_Reaction_Time__c/recPG.Count_Of_No_of_Question_Attempted__c);
                        correctAnswers = Integer.valueOf(recPG.Count_Of_No_Of_Correct_Answered__c);
                        Integer graceValue = 400 ;
                        reactionTime = Integer.valueOf(recPG.Count_Of_Total_Reaction_Time__c/recPG.Count_Of_No_of_Question_Attempted__c);
                        Integer reactLowAverage=(Integer)mapPlyAverageValues.get(recPG.Game_Name__r.Name).get('LowAverage');
                        Integer reactHighAverage=(Integer)mapPlyAverageValues.get(recPG.Game_Name__r.Name).get('HighAverage');
                        Integer reactMaxValue = (Integer)mapPlyAverageValues.get(recPG.Game_Name__r.Name).get('MaxValue');
                        Integer reactoverallAverage = (Integer)mapPlyAverageValues.get(recPG.Game_Name__r.Name).get('overallAverage');
                        Integer reactPeopleLikeYou = (Integer)mapPlyAverageValues.get(recPG.Game_Name__r.Name).get('PeopleLikeYou');
                        if(userDevice==1){
                            reactoverallAverage =reactoverallAverage+graceValue;
                            reactPeopleLikeYou =reactPeopleLikeYou+graceValue;
                            if(reactLowAverage+graceValue>reactMaxValue){
                           		 reactLowAverage = reactMaxValue;                     
                            }
                            else{
                                reactLowAverage =reactLowAverage+graceValue;
                            }
                            if(reactHighAverage+graceValue>reactMaxValue){
                                 reactHighAverage = reactMaxValue;                     
                            }
                            else{
                                reactHighAverage =reactHighAverage+graceValue;
                            }
							mapPlyAverageValues.get(recPG.Game_Name__r.Name).put('PeopleLikeYou',reactPeopleLikeYou);
                            mapPlyAverageValues.get(recPG.Game_Name__r.Name).put('LowAverage',reactLowAverage);
                            mapPlyAverageValues.get(recPG.Game_Name__r.Name).put('HighAverage',reactHighAverage);
                            mapPlyAverageValues.get(recPG.Game_Name__r.Name).put('overallAverage',reactoverallAverage);                        
                        }
                    }
                    else{
                        yourScore = Integer.valueOf(recPG.Count_Of_Total_Reaction_Time__c/recPG.Count_Of_No_of_Question_Attempted__c)*multiplyFactor;
                        correctAnswers = Integer.valueOf(recPG.Count_Of_No_Of_Correct_Answered__c)*multiplyFactor;
                        reactionTime = Integer.valueOf(recPG.Count_Of_Total_Reaction_Time__c/recPG.Count_Of_No_of_Question_Attempted__c)*multiplyFactor;                        
                    }
         
                    Boolean isGamePlayed = true;                                        
                    scoreData = new Map<String, Object>{'YourScore'=>yourScore,'CorrectAnswers'=>correctAnswers,
                            'ReactionTime'=>reactionTime,'isGamePlayed'=>isGamePlayed,'UserDevice'=>userDevice}; 
                   if(recPG.Game_Name__r.Name =='Flanker'){	
                            flkAtt=flkAtt+1; 
                            String attempt = AttemptLabel+flkAtt;
                            Map<String, Object> dataItem = new Map<String, Object>{'x' => attempt,'y' => correctAnswers};
                            flankerdataList.add(dataItem);
                            if(mapOtherData.containsKey(flkAtt)){                                
                                mapOtherData.get(flkAtt).put('flanker',scoreData);                                                              
                            }
                            else{
                                mapOtherData.put(flkAtt,new Map<String, Object>{'flanker'=>scoreData});
                            }
                            Map<String, Object> attemptMap = mapOtherData.get(flkAtt);
                            ((Map<String, Object>)attemptMap.get('flanker')).putAll(mapPlyAverageValues.get('Flanker'));                            
                        }        
                    
                        if(recPG.Game_Name__r.Name =='Keep Track' )
                        {
                            keeptrackAtt=keeptrackAtt+1;
                            String attempt = AttemptLabel+keeptrackAtt;
                            Map<String, Object> dataItem = new Map<String, Object>{'x' => attempt,'y' => correctAnswers};              
                            keepTrackdataList.add(dataItem);
                            if(mapOtherData.containsKey(keeptrackAtt)){                                
                                mapOtherData.get(keeptrackAtt).put('keeptrack',scoreData);                                                               
                            }
                            else{
                                mapOtherData.put(keeptrackAtt,new Map<String, Object>{'keeptrack'=>scoreData});
                            }
                            Map<String, Object> attemptMap = mapOtherData.get(keeptrackAtt);
                            ((Map<String, Object>)attemptMap.get('keeptrack')).putAll(mapPlyAverageValues.get('Keep Track'));                            
                        }    
                    
                    	if(recPG.Game_Name__r.Name =='Face-Name Associates' )
                        {
                            faceNameAtt=faceNameAtt+1;
                            String attempt = AttemptLabel+faceNameAtt;
                            Map<String, Object> dataItem = new Map<String, Object>{'x' => attempt,'y' => correctAnswers};              
                            FaceNameList.add(dataItem);
                            if(mapOtherData.containsKey(faceNameAtt)){                                
                                mapOtherData.get(faceNameAtt).put('facename',scoreData);                                                               
                            }
                            else{
                                mapOtherData.put(faceNameAtt,new Map<String, Object>{'facename'=>scoreData});
                            }
                            Map<String, Object> attemptMap = mapOtherData.get(faceNameAtt);
                            ((Map<String, Object>)attemptMap.get('facename')).putAll(mapPlyAverageValues.get('Face-Name Associates'));                            
                        }  
                    
                    	if(recPG.Game_Name__r.Name =='Object Discrimination' )
                        {
                            objectsAtt=objectsAtt+1;
                            String attempt = AttemptLabel+objectsAtt;
                            Map<String, Object> dataItem = new Map<String, Object>{'x' => attempt,'y' => correctAnswers};              
                            objectsdataList.add(dataItem);
                            if(mapOtherData.containsKey(objectsAtt)){                                
                                mapOtherData.get(objectsAtt).put('objects',scoreData);                                                               
                            }
                            else{
                                mapOtherData.put(objectsAtt,new Map<String, Object>{'objects'=>scoreData});
                            }
                            Map<String, Object> attemptMap = mapOtherData.get(objectsAtt);
                            ((Map<String, Object>)attemptMap.get('objects')).putAll(mapPlyAverageValues.get('Object Discrimination'));                            
                        }  
                        
                        if(recPG.Game_Name__r.Name =='Object Spatial' )
                            {
                                objectSpaceAtt=objectSpaceAtt+1;
                                String attempt = AttemptLabel+objectSpaceAtt;
                                Map<String, Object> dataItem = new Map<String, Object>{'x' => attempt,'y' => correctAnswers};              
                                objectSpacedataList.add(dataItem);
                                if(mapOtherData.containsKey(objectSpaceAtt)){                                
                                    mapOtherData.get(objectSpaceAtt).put('objectspace',scoreData);                                                                   
                                }
                                else{
                                    mapOtherData.put(objectSpaceAtt,new Map<String, Object>{'objectspace'=>scoreData});
                                }
                                Map<String, Object> attemptMap = mapOtherData.get(objectSpaceAtt);
                                ((Map<String, Object>)attemptMap.get('objectspace')).putAll(mapPlyAverageValues.get('Object Spatial'));                            
                            } 
                    
                    		if(recPG.Game_Name__r.Name =='Object Temporal' )
                            {
                                objectTimeAtt=objectTimeAtt+1;
                                String attempt = AttemptLabel+objectTimeAtt;
                                Map<String, Object> dataItem = new Map<String, Object>{'x' => attempt,'y' => correctAnswers};              
                                objectTimedataList.add(dataItem);
                                if(mapOtherData.containsKey(objectTimeAtt)){                                
                                    mapOtherData.get(objectTimeAtt).put('objecttime',scoreData);                                                                   
                                }
                                else{
                                    mapOtherData.put(objectTimeAtt,new Map<String, Object>{'objecttime'=>scoreData});
                                }
                                Map<String, Object> attemptMap = mapOtherData.get(objectTimeAtt);
                                ((Map<String, Object>)attemptMap.get('objecttime')).putAll(mapPlyAverageValues.get('Object Temporal'));                            
                            } 
                    
                    		if(recPG.Game_Name__r.Name =='Deary Simple And Complex Reaction Time' )
                            {
                                reactAtt=reactAtt+1;
                                String attempt = AttemptLabel+reactAtt;
                                Map<String, Object> dataItem = new Map<String, Object>{'x' => attempt,'y' => reactionTime};              
                                reactdataList.add(dataItem);
                                if(mapOtherData.containsKey(reactAtt)){                                
                                    mapOtherData.get(reactAtt).put('react',scoreData);                                                                   
                                }
                                else{
                                    mapOtherData.put(reactAtt,new Map<String, Object>{'react'=>scoreData});
                                }
                                Map<String, Object> attemptMap = mapOtherData.get(reactAtt);
                                ((Map<String, Object>)attemptMap.get('react')).putAll(mapPlyAverageValues.get('Deary Simple And Complex Reaction Time'));                            
                            } 
                    
                   			if(recPG.Game_Name__r.Name =='Object Recognition And Similarity' )
                            {
                                shapesAtt=shapesAtt+1;
                                String attempt = AttemptLabel+shapesAtt;
                                Map<String, Object> dataItem = new Map<String, Object>{'x' => attempt,'y' => correctAnswers};              
                                shapesdataList.add(dataItem);
                                if(mapOtherData.containsKey(shapesAtt)){                                
                                    mapOtherData.get(shapesAtt).put('shapes',scoreData);                                                                   
                                }
                                else{
                                    mapOtherData.put(shapesAtt,new Map<String, Object>{'shapes'=>scoreData});
                                }
                                Map<String, Object> attemptMap = mapOtherData.get(shapesAtt);
                                ((Map<String, Object>)attemptMap.get('shapes')).putAll(mapPlyAverageValues.get('Object Recognition And Similarity'));                            
                            } 
                    		
                    		if(recPG.Game_Name__r.Name =='Letter-Number Sequencing' )
                            {
                                switchingAtt=switchingAtt+1;
                                String attempt = AttemptLabel+switchingAtt;
                                Map<String, Object> dataItem = new Map<String, Object>{'x' => attempt,'y' => correctAnswers};              
                                switchingdataList.add(dataItem);
                                if(mapOtherData.containsKey(switchingAtt)){                                
                                    mapOtherData.get(switchingAtt).put('switching',scoreData);                                                                   
                                }
                                else{
                                    mapOtherData.put(switchingAtt,new Map<String, Object>{'switching'=>scoreData});
                                }
                                Map<String, Object> attemptMap = mapOtherData.get(switchingAtt);
                                ((Map<String, Object>)attemptMap.get('switching')).putAll(mapPlyAverageValues.get('Letter-Number Sequencing'));                            
                            } 
                    		
                    		if(recPG.Game_Name__r.Name =='Verbal Paired Associates' )
                            {
                                wordPairAtt=wordPairAtt+1;
                                String attempt = AttemptLabel+wordPairAtt;
                                Map<String, Object> dataItem = new Map<String, Object>{'x' => attempt,'y' => correctAnswers};              
                                wordPairsdataList.add(dataItem);
                                if(mapOtherData.containsKey(wordPairAtt)){                                
                                    mapOtherData.get(wordPairAtt).put('wordpairs',scoreData);                                                                   
                                }
                                else{
                                    mapOtherData.put(wordPairAtt,new Map<String, Object>{'wordpairs'=>scoreData});
                                }
                                Map<String, Object> attemptMap = mapOtherData.get(wordPairAtt);
                                ((Map<String, Object>)attemptMap.get('wordpairs')).putAll(mapPlyAverageValues.get('Verbal Paired Associates'));                            
                            } 
                    }
            }       
             
            Integer maxNum = Math.max(flkAtt, Math.max(keeptrackAtt, Math.max(faceNameAtt, Math.max(objectsAtt, 
                             Math.max(objectSpaceAtt, Math.max(objectTimeAtt, Math.max(reactAtt, Math.max(shapesAtt, 
                             Math.max(switchingAtt, wordPairAtt)))))))));
            for(Integer i=1; i<=maxNum; i++){
                    xAxisLabels.add(AttemptLabel+' '+i); 
            }
           System.debug('maxNum: '+ maxNum);
           System.debug('xAxisLabels'+ xAxisLabels); 
           ChartData chartData = new ChartData();
           chartData.gamedataList = new Map<String,Object>{'flankerdataList'=>flankerdataList,'keepTrackdataList'=>keepTrackdataList,
                'FaceNameList'=>FaceNameList,'objectsdataList'=>objectsdataList,'objectSpacedataList'=>objectSpacedataList,
                'objectTimedataList'=>objectTimedataList,'reactdataList'=>reactdataList,'shapesdataList'=>shapesdataList,
                'switchingdataList'=>switchingdataList,'wordPairsdataList'=>wordPairsdataList};
           System.debug('chartData'+ chartData); 
           chartData.xAxisLabels = xAxisLabels;
           if(!mapOtherData.isEmpty())
           {
               Integer i;
               system.debug('List size: '+mapOtherData.keySet().size());
               system.debug('map: '+mapOtherData);
               for(i=0; i<mapOtherData.keySet().size(); i++){
                   system.debug('i: '+i);
                   system.debug('mapOtherData.get(i+1)' + mapOtherData.get(i+1));
                   listOtherData.add(mapOtherData.get(i+1));
               }
           }
           chartData.listOtherData = listOtherData;
           return chartData;           
        }
        catch(Exception e){
            //return 'Failed';
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
        public List<String> xAxisLabels; 
        @AuraEnabled
        public List<Map<String, Object>> listOtherData;
    }


}