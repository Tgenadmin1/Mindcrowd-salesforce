public class TestResultsController 
{
    
   private static Map<String, Integer> getChartMap(String type)
   {
        Map<String, Integer> mapBaseData = new Map<String, Integer>();
        
        for(Test_Result__c objDashboard:[SELECT Data_Name__c,Data_Category__c,
                                         Data_Value__c 
                                         FROM Test_Result__c
                                         WHERE Data_Category__c =:type
                                        ]){
                                            if(String.isNotblank(objDashboard.Data_Name__c))
                                            {                                                
                                                mapBaseData.put(objDashboard.Data_Name__c, Integer.valueOf(objDashboard.Data_Value__c));                                                
                                            }                                            
                                        }
        return mapBaseData;
    }
    
    private static Map<String, List<Integer>> getGroupChartMap()
    {
        Map<String, List<Integer>> mapGroupData = new Map<String, List<Integer>>();
      
        for(Test_Result__c objDashboard:[SELECT Data_Name__c,Data_Category__c,
                                         Data_Value__c 
                                         FROM Test_Result__c
                                         WHERE Data_Category__c <> 'Other'
                                         AND Data_Category__c <> 'subscription'
                                         ORDER BY Order__c ASC, Data_Name__c DESC
                                        ]){
                                            if(String.isNotblank(objDashboard.Data_Name__c) && null != objDashboard.Data_Value__c)
                                            {
                                                if(!mapGroupData.containsKey(objDashboard.Data_Name__c))
                                                {
                                                    mapGroupData.put(objDashboard.Data_Name__c, new List<Integer>());
                                                }
                                                mapGroupData.get(objDashboard.Data_Name__c).add(Integer.valueOf(objDashboard.Data_Value__c));
                                                
                                            }
                                        }
        
        return mapGroupData;
    }
    
    @AuraEnabled
    public static ResultsboardData getResultsDashboardData()
    {
        ResultsboardData data =  new ResultsboardData();
        data.mapKitData = getGroupChartMap();
        data.mapSubData = getChartMap('subscription');
        data.mapOtherData = getChartMap('Other');
        return data;   
    }
     public class ResultsboardData
     {
        @AuraEnabled
        public Map<String, List<Integer>> mapKitData;
        @AuraEnabled
        public Map<String, Integer> mapSubData;
        @AuraEnabled
        public Map<String, Integer> mapOtherData;
    }
}