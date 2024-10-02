// Created By: {Girikon(Sunil Kumar)}
// Updated On: 08/09/2022
// Description/Purpose: [TM-185]-It will be used for updating PGI records where IP address is avaible.
// Test Class: {BatchUpdatePGI_Test} {100%}

global class BatchUpdatePGI implements Database.Batchable<SObject>,Database.AllowsCallouts,Database.Stateful
{
    global Database.QueryLocator start(Database.BatchableContext bc)
    {
             
     return Database.getQueryLocator('SELECT Id, Contact_Name__c, IP_Address__c, Geolocation__Longitude__s, Geolocation__Latitude__s,Zip_Code__c,Region__c,Country__c,City__c, Time_Zone_Offset__c,createdDate, IP_Data__c FROM Participant_Game_Info__c where createdDate>=2022-06-01T23:19:06.000+0000 and Geolocation__Latitude__s=null and IP_Address__c!=null order by createdDate desc');
        
    }
    global void execute(Database.BatchableContext bc, List<Participant_Game_Info__c > scope)
     {   
        List <Participant_Game_Info__c> toUpdatePGI = new List <Participant_Game_Info__c> ();
         System.debug('batchable context--'+bc);
         try{
            for(Participant_Game_Info__c pgi:scope){
                Participant_Game_Info__c pgiObj=new Participant_Game_Info__c();
                String ipAddress=pgi.IP_Address__c;
                system.debug('ipAddress==>'+ipAddress);
                Map<String, Object> results=WebServiceForIpData.getIPData(ipAddress);
      
                if(results !=null)
                 {
                    System.debug('longitude--'+decimal.valueOf(JSON.serialize(results.get('longitude'))));
                     Map<String, Object> lmap =(Map<String, Object>) results.get('time_zone');
                     pgiObj.Time_Zone_Offset__c=(String)lmap.get('offset');
                     pgiObj.City__c=string.valueOf(JSON.serialize(results.get('city'))).replace('"','');
                     pgiObj.Country__c=string.valueOf(JSON.serialize(results.get('country_name'))).replace('"','');
                     pgiObj.Region__c=string.valueOf(JSON.serialize(results.get('region'))).replace('"','');
                     pgiObj.IP_Data__c=JSON.serialize(results);
                     pgiObj.Zip_Code__c=string.valueOf(JSON.serialize(results.get('postal'))).replace('"','');
                     pgiObj.Geolocation__Longitude__s= decimal.valueOf(JSON.serialize(results.get('longitude')));
                     pgiObj.ID= pgi.id;
                     pgiObj.Geolocation__Latitude__s= decimal.valueOf(JSON.serialize(results.get('latitude')));
                 }
                toUpdatePGI.Add(pgiObj);   
            }
            if(toUpdatePGI.size()>0){
                update toUpdatePGI;
            }      
         }
         catch(Exception ex){
                  System.debug('exception here:'+ex);
         }
        
        
     }
     global void finish(Database.BatchableContext BC)
     {
     }  
}