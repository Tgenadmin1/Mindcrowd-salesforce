public class AdminDashBoardcontroller 
{
    @AuraEnabled
    public static Map<String,Integer> getGroupChartMap(Date startDate, Date endDate, String campaignId)
    {
        Map<String,Integer> mapGroupData = new Map<String,Integer>();
        Map<String,Integer> mapOrdData = new Map<String,Integer>();
        System.debug('StartDate endDate'+startDate +' '+endDate +' '+ campaignId);
        Datetime startDateTime = startDate;
        Datetime endDateTime =endDate;
        Schema.DescribeFieldResult fieldDescription = Shipping_Detail__c.Shipment_Status__c.getDescribe();
        
        for (Schema.PicklistEntry entry : fieldDescription.getPicklistValues()) 
        {
            if(entry.isActive())
            {
                mapGroupData.put(entry.getLabel(), 0);
            }
        } 
        
        for (AggregateResult ar : [SELECT Shipment_Status__c, count(name)
                                   from Shipping_Detail__c
                                   where Campaign__c= :campaignId
                                   AND CreatedDate >= :startDateTime AND CreatedDate <= :endDateTime
                                   group by Shipment_Status__c])  
        {
            if(ar.get('Shipment_Status__c') != null)
                mapGroupData.put(String.valueOf(ar.get('Shipment_Status__c')), Integer.valueOf(ar.get('expr0')));
            
        }
        mapOrdData.put('Consented', mapGroupData.get('Consented'));
        mapOrdData.put('Created', mapGroupData.get('Created'));
        mapOrdData.put('Sent', mapGroupData.get('Sent'));
        mapOrdData.put('Delivered', mapGroupData.get('Delivered')); 
        mapOrdData.put('Received', mapGroupData.get('Received'));
        
        
        return mapOrdData;
    }
    
    @AuraEnabled
    public static Map<String,Integer> getOtherGroupChartMap(Date startDate, Date endDate)
    {
        Map<String,Integer> mapGroupData = new Map<String,Integer>();
        Map<String,Integer> mapRegData = new Map<String,Integer>();
        System.debug('StartDate endDate'+startDate +' '+endDate );
        
        Datetime startDateTime = startDate;
        Datetime endDateTime =endDate;
        
        for (AggregateResult ar : [SELECT Game_Play_Status__c, count(Name) FROM Participant_Game_Info__c 
                                   WHERE Game_Name__c  in (SELECT Id from Game_Detail__c WHERE Name ='DLTRS') 
                                   AND CreatedDate >= :startDateTime AND CreatedDate <= :endDateTime
                                   Group By Game_Play_Status__c])  
        {
            if(ar.get('Game_Play_Status__c') != null)
                mapGroupData.put(String.valueOf(ar.get('Game_Play_Status__c')) +' Game', Integer.valueOf(ar.get('expr0')));
            
        }
        List<AggregateResult>  lstResults = [SELECT Count(Id), Count(Email) FROM Contact Where Consent_Catchment__c = true 
                                             AND CreatedDate >= :startDateTime AND CreatedDate <= :endDateTime];
        if(lstResults != null && !lstResults.isEmpty())
        {
            mapGroupData.put('Enrolled People(Consents)', Integer.valueOf(lstResults[0].get('expr0')));
            mapGroupData.put('Email Addresses Collected', Integer.valueOf(lstResults[0].get('expr1')));
        }
        // Re-arrange the Data in shorting order as below
        mapRegData.put('Enrolled People(Consents)', mapGroupData.get('Enrolled People(Consents)'));
        mapRegData.put('Not-Completed Game', mapGroupData.get('Not-Completed Game'));
        mapRegData.put('Completed Game', mapGroupData.get('Completed Game'));
        mapRegData.put('Email Addresses Collected', mapGroupData.get('Email Addresses Collected'));
        
        return mapRegData;
    }
    
    @AuraEnabled
    public static List<Option> getResearchCampaigns()
    {
        List<Option> lstOptions = new List<Option>();
        for (Research_Campaign__c objCampaign : [SELECT Id, Name FROM Research_Campaign__c]){
            lstOptions.add(new Option(objCampaign.Name, objCampaign.Id));
        }
        return lstOptions;
    }
    public class Option
    {
        @AuraEnabled
        public String value;
        @AuraEnabled
        public String label;
        public Option(String label, String value)
        {
            this.label = label;
            this.value =value;
        }
    }
}