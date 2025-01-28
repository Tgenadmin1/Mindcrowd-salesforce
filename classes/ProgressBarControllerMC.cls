/*
Created By: {Girikon(Sunil Kumar)}
Created On: 07/20/2022
Description/Purpose:Query on Contact to fetch value of progress count.
Test Class-- ProgressBar_Test
*/

public without sharing class ProgressBarControllerMC {
    
    public Map<String, String> rtMap{get;set;}
    public String language {get;set;}
    public ProgressBarControllerMC() {
        
        rtMap = new  Map<String, String>();
        
        String url = site.getPathPrefix();
        system.debug('url===>'+url);
        
        String mindCrowd = Label.MindCrowd_English;
        String mindCrowdES = Label.MindCrowd_Spanish;
        if(url.contains(mindCrowd)){
            language = 'en_US';
            system.debug('MindCrowd===>'+mindCrowd);
        }
        
        if(url.contains(mindCrowdES)){
            language = 'es';
            system.debug('MindCrowdES===>'+mindCrowdES);
        }
        system.debug('language===>'+language);
        
        AggregateResult ar =[Select count(id) From Contact];
        double count=double.valueOf(ar.get('expr0'));
        //double count = 5016641;
        String retValue= String.valueOf(count);
        double countK=0;
        countK=double.valueOf(count);
        retValue = String.valueOf(countK);
        //Percentage Calculation
        //String calcPrcnt=String.valueOf((Math.log10(count)/Math.log10(1000000))*100);
        String calcPrcnt=String.valueOf((count/1000000)*100);
        rtMap.put('count',retValue);
        rtMap.put('Percentage',calcPrcnt);
        
    }
}