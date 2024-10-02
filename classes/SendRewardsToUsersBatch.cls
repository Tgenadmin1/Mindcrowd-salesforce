public class SendRewardsToUsersBatch implements Database.Batchable<SObject>, Schedulable, Database.AllowsCallouts {
    
    public void execute(SchedulableContext sc) {
        SendRewardsToUsersBatch sendReward = new SendRewardsToUsersBatch();
        Database.executeBatch(sendReward, 100);
    }

    public Database.QueryLocator start(Database.BatchableContext bc) {
        return Database.getQueryLocator([
            SELECT Id, FirstName, Email, Language__c FROM Contact 
            WHERE Tremendous_Award_Sent__c = False 
            AND Enrolled_in_Paid_Campaign__c = True
            AND Parent_Contact__c = null
            AND Email != null
            AND Activation_Date__c != null
        ]);
    }

    public void execute(Database.BatchableContext bc, List<Contact> cons) {        
        List<Contact> contListUpd = new List<Contact>();
        try { 
            Map <Id, Contact> contMap = new Map <Id, Contact>(cons);  
            Set<Id> contIdSet = contMap.keySet();
            Set<Id> shipContIdSet = new Set<Id>();            
            Set<Contact> contsEligible = new Set<Contact>();
            System.debug('contIdSet: '+contIdSet);
          
            List<Shipping_Detail__c> shipList =  [select contact_Id__c, Shipment_Status__c,Campaign__r.Name
                                                 from Shipping_Detail__c 
                                                 where Shipment_Status__c = 'Received'
                                                 and Campaign__r.Name in ('APOE','DBS')
                                                 and contact_Id__c in : contIdSet];            
           
            for(Shipping_Detail__c ship: shipList){
                shipContIdSet.add(ship.contact_Id__c);
            }
            System.debug('shipContIdSet: '+shipContIdSet);

            Map<Id, Game_Detail__c> gamesMap =  new Map<Id, Game_Detail__c>([SELECT Id from Game_Detail__c where Name not in ('Bean Game')]);
            System.debug('gameCount: '+ gamesMap.keyset().size());
                                  
            AggregateResult[] pgiAggResults =    [SELECT Contact_Name__c, COUNT_DISTINCT(Game_Name__c)
            									 FROM Participant_Game_Info__c
            								     WHERE Game_Play_Status__c = 'Completed'
                                                 AND Contact_Name__c in : contIdSet            									 
            									 AND Game_Name__c IN : gamesMap.keyset()
                                                 AND Contact_Name__c IN : shipContIdSet 
            									 GROUP BY Contact_Name__c
            									 HAVING COUNT_DISTINCT(Game_Name__c) =: gamesMap.keyset().size()];            
            System.debug('pgiAggResults: '+pgiAggResults);
                       
                      
            for (AggregateResult result : pgiAggResults) {                    
                    contsEligible.add(contMap.get((Id)result.get('Contact_Name__c'))); 
            }            
            System.debug('contsEligible: '+contsEligible);
            
            TremendousSetting__c trmAPI = TremendousSetting__c.getValues('RewardsSetting');
            for (Contact con : contsEligible) {
                contListUpd.add(con);
                system.debug('count--->' + contsEligible.size());
                con.Tremendous_Award_Sent__c = true;                
                SendRewardRequestWrapper request = new SendRewardRequestWrapper();           
                request.payment = new SendRewardRequestWrapper.Payment();
                request.payment.funding_source_id = trmAPI.FundingSourceId__c;    
                request.rewards = new List<SendRewardRequestWrapper.Rewards>();
                SendRewardRequestWrapper.Rewards reward = new SendRewardRequestWrapper.Rewards();
                reward.value = new SendRewardRequestWrapper.Value();
                reward.value.denomination = trmAPI.Denomination__c;
                reward.value.currency_code = trmAPI.CurrencyCode__c;    
                reward.delivery = new SendRewardRequestWrapper.Delivery();
                reward.delivery.method = trmAPI.DeliveryMethod__c;    
                reward.recipient = new SendRewardRequestWrapper.Recipient();
                reward.recipient.name = con.FirstName;
                reward.recipient.email = con.Email;                   
                if (con.Language__c == 'Español') {
                    reward.campaign_id = trmAPI.Spanish_CampaignId__c;                    
                } else {
                    reward.campaign_id = trmAPI.CampaignId__c;
                } 
                request.rewards.add(reward);
                String payload = JSON.serialize(request);
                system.debug('payload--->' + payload);
                HttpRequest req = new HttpRequest();
                req.setMethod(trmAPI.RestMethod__c);
                req.setEndpoint(trmAPI.EndpointURL__c);
                req.setHeader('Content-Type', trmAPI.ContentType__c);
                req.setHeader('Authorization', trmAPI.Authorization__c+' ' + trmAPI.AuthToken__c);
                req.setBody(payload);
                Http httpHeader = new Http();
                HttpResponse res = new HttpResponse();
                try{
                    res = httpHeader.send(req);
                }
                catch(Exception ex){
                    System.debug('inside second catch Exception');
                    ExceptionLogHandler.logException(ex, 'SendRewardsToconsBatch', 'Execute', 'Contact Id: ' +con.Id + ', Exception in Tremendous API '
                                                     +' Error Message: '+ex.getMessage());
                }                
                system.debug('res--->' + res.getBody());
                system.debug('statuscode--->' + res.getStatusCode());
                if (res.getStatusCode() != 200 && res.getStatusCode() != 202) {
                    System.debug('inside respose exception handling');
                    String errorDetails = 'Tremendous API Error - Respose Code: ' + res.getStatusCode() + ', Contact Id: ' +con.Id + ', Error Response: ' + res.getBody();
                    ExceptionLogHandler.logException(null, 'SendRewardsToconsBatch', 'Execute', errorDetails);
                }
            }
            if(contListUpd.size()>0){
                system.debug('inside update contact');
                Database.update(contListUpd, false);
            }                
        } 
        catch (Exception ex) {
            ExceptionLogHandler.logException(ex, 'SendRewardsToconsBatch', 'Execute', 'Exception in Tremendous API for Contact '
                                             +' Error Message: '+ex.getMessage());
            if(contListUpd.size()>0){
                system.debug('inside exception update contact');
                Database.update(contListUpd, false);
            }
        }
     }
    
    public void finish(Database.BatchableContext context) {
    }
}