/*
    @Author          :  Raj Kumar
    @Descriptoin     :  This class will be used to show game image.
    
*/

public without sharing class attentinshareController {
    public String contentDocumentId {get;set;}
    public attentinshareController() {
        contentDocumentId = null; 
        String conId = ApexPages.CurrentPage().getParameters().get('id');
        String gameName ='DLTRS'; // ApexPages.CurrentPage().getParameters().get('gameName');
        
        for(Participant_Game_Info__c obj : [SELECT id,participantFeatureImageURL__c FROM Participant_Game_Info__c 
                                            WHERE Contact_Name__c =: conId AND Game_Name__r.Name =: gameName AND participantFeatureImageURL__c != null limit 1]){
            contentDocumentId = obj.participantFeatureImageURL__c;
        }
    }
}