public without sharing class MindCrowdStudies {
    @AuraEnabled
    public static String[] studies(Studies__c study){
        try {
            System.Debug('study : ' +study);
            System.Debug('study : ' +study.Name);
            System.Debug('study : ' +study.Participant_Id__c);
            List<Studies__c> lstStudies;
            if(study.Name != null && study.Name != '' && study.Name != 'undefined')
            {
                lstStudies =[SELECT Id, Name, Participant_Id__c FROM Studies__c Where Name=:study.Name AND Participant_Id__c=:study.Participant_Id__c ];
            }
            else
            {
                lstStudies =[SELECT Id, Name, Participant_Id__c FROM Studies__c Where Participant_Id__c=:study.Participant_Id__c ];
            }
            
            //Boolean msg=false;
            //Boolean[] myval = new Boolean[2];
            String[] myStudyValues = new String[4];
            System.Debug('lstStudies : ' +lstStudies);
     
            If(lstStudies!=null && lstStudies.Size()>0){
                for(Studies__c std: lstStudies){
                     System.Debug('std.Name : ' +std.Name);
                    if(std.Name == study.Name || study.Name == null || study.Name == '' || study.Name == 'undefined'){
                        myStudyValues[0] = std.Name;
                        System.Debug('myStudyValues[0] : ' +myStudyValues[0]);
                        if(std.Participant_Id__c==study.Participant_Id__c){
                            myStudyValues[1] = std.Participant_Id__c;
                            myStudyValues[2] = std.Id;
                        }
                        else{
                            myStudyValues[1] = '';
                            myStudyValues[2] = '';
                        }  
                    }
                    else if (std.Participant_Id__c==study.Participant_Id__c) {
                        myStudyValues[0] = '';
                        myStudyValues[1] = std.Participant_Id__c;
                        myStudyValues[2] = '';
                    }
                    else{
                        myStudyValues[0] = '';
                        myStudyValues[1] = '';
                        myStudyValues[2] = '';
                    }
                }
            }
            System.Debug('myStudyValues : ' +myStudyValues);
            return myStudyValues;
        } 
        catch (Exception exp) {
            System.Debug('MindCrowdStudies Exception: ' +exp.getMessage());
            return null;
        }      
    }
    @AuraEnabled
    public static List<AggregateResult> studiesIDSelect(){
        list<AggregateResult> lstStudies = [SELECT Name, COUNT(Id) FROM Studies__c GROUP BY Name];
        return lstStudies;
    }
    @AuraEnabled
    public static list<Event__c> eventIDSelect(){
        list<Event__c> lstEvent = [SELECT Event_Id__c FROM Event__c];
        return lstEvent;
    }
    @AuraEnabled
    public static list<Event__c> eventIDSelect1(){
        list<Event__c> lstEvent1 = [SELECT Event_Id__c FROM Event__c];
        return lstEvent1;
    }
    @AuraEnabled
    public static list<Event__c> eventIDSelect2(){
        list<Event__c> lstEvent2 = [SELECT Event_Id__c FROM Event__c];
        return lstEvent2;
    }
    @AuraEnabled
    public static list<Event__c> eventIDSelect3(){
        list<Event__c> lstEvent3 = [SELECT Event_Id__c FROM Event__c];
        return lstEvent3;
    }
    @AuraEnabled
    public static list<Event__c> eventIDSelect4(){
        list<Event__c> lstEvent4 = [SELECT Event_Id__c FROM Event__c];
        return lstEvent4;
    }
    @AuraEnabled
    public static list<Event__c> eventIDSelect5(){
        list<Event__c> lstEvent5 = [SELECT Event_Id__c FROM Event__c];
        return lstEvent5;
    }
    @AuraEnabled
    public static String[] studiesUsingText(Studies__c study){
        try {
            System.Debug('study : ' +study);
           // System.Debug('study : ' +study.Name);
            System.Debug('study : ' +study.Participant_Id__c);
            List<Studies__c> lstStudies =[SELECT Id, Name, Participant_Id__c FROM Studies__c Where Participant_Id__c=:study.Participant_Id__c ];
            //Boolean msg=false;
            //Boolean[] myval = new Boolean[2];
            String[] myStudyValues = new String[3];
            System.Debug('lstStudies : ' +lstStudies);
     
            If(lstStudies!=null && lstStudies.Size()>0){
                for(Studies__c std: lstStudies){     
                    if (std.Participant_Id__c==study.Participant_Id__c) {
                        myStudyValues[0] = '';
                        myStudyValues[1] = std.Participant_Id__c;
                        myStudyValues[2] = std.Id;
                    }
                    else{
                        myStudyValues[0] = '';
                        myStudyValues[1] = '';
                        myStudyValues[2] = '';
                    }
                }
            }
            System.Debug('myStudyValues : ' +myStudyValues);
            return myStudyValues;
        } 
        catch (Exception exp) {
            System.Debug('MindCrowdStudies Exception: ' +exp.getMessage());
            return null;
        }      
    }
}