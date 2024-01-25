public class SendRewardsToUsersBatch implements Database.Batchable<SObject>, Schedulable, Database.AllowsCallouts {
    
    public void execute(SchedulableContext sc) {
        SendRewardsToUsersBatch sendReward = new SendRewardsToUsersBatch();
        Database.executeBatch(sendReward, 100);
    }

    public Database.QueryLocator start(Database.BatchableContext bc) {
        return Database.getQueryLocator([
            SELECT Id, Contact.FirstName, Contact.Email, Language__c
            FROM Contact 
            WHERE Tremendous_Award_Sent__c = False 
            AND Enrolled_in_Paid_Campaign__c = True 
            AND Verbal_Paired_Associates__c = 'Completed' 
            AND Deary_Simple_And_Complex_Reaction_Time__c = 'Completed' 
            AND Object_Recognition_And_Similarity__c = 'Completed' 
            AND Flanker__c = 'Completed' 
            AND Face_Name_Associates__c = 'Completed' 
            AND Letter_Number_Sequencing__c = 'Completed' 
            AND Keep_Track__c = 'Completed' 
            AND Object_Discrimination__c = 'Completed' 
            AND Object_Temporal__c = 'Completed' 
            AND Object_Spatial__c = 'Completed' 
        ]);
    }

    public void execute(Database.BatchableContext bc, List<Contact> cons) {
        try {
            for (Contact con : cons) {
                system.debug('count--->' + cons.size());
                con.Tremendous_Award_Sent__c = true;
                TremendousSetting__c trmAPI = TremendousSetting__c.getValues('RewardsSetting');
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
                    ExceptionLogHandler.logException(ex, 'SendRewardsToconsBatch', 'Execute', 'Exception in Tremendous API '
                                                     +' Error Message: '+ex.getMessage());
                }                
                system.debug('res--->' + res.getBody());
                system.debug('statuscode--->' + res.getStatusCode());
                if (res.getStatusCode() != 200 && res.getStatusCode() != 202) {
                    String errorDetails = 'API Error - Status Code: ' + res.getStatusCode() + 'Contact Id: ' +con.Id + ', Error Response: ' + res.getBody();
                    ExceptionLogHandler.logException(null, 'SendRewardsToconsBatch', 'ProcessAPIResponse', errorDetails);
                }
            }
            if(cons.size()>0){
                update cons;
            }                
        } 
        catch (Exception ex) {
            ExceptionLogHandler.logException(ex, 'SendRewardsToconsBatch', 'Execute', 'Exception in Tremendous API for Contact '
                                             +' Error Message: '+ex.getMessage());
            if(cons.size()>0){
                update cons;
            }
        }
     }
    
    public void finish(Database.BatchableContext context) {
    }
}