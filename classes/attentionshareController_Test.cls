/*
    @Author          :  Sunil Singh
    @Descriptoin     :  Test class for attentinshareController.
    
*/
@isTest
public class attentionshareController_Test{

    public static testMethod void unitTest(){
        
        Contact con = new Contact();
        con.LastName= 'test last name';
        con.Email = 'Test@test.com';
        Insert con;        
        
        Game_Detail__c gd = new Game_Detail__c();
        gd.Name ='DLTRS';       
        insert gd;
        
        Participant_Game_Info__c pg = new Participant_Game_Info__c();
        pg.Contact_Name__c = con.Id;
        pg.Game_Name__c = gd.Id;
        pg.Game_Play_Status__c = 'Completed';
        pg.participantFeatureImageURL__c = '069XXXXXXXX';
        insert pg;
        
        ApexPages.CurrentPage().getParameters().put('id', con.Id);
        ApexPages.CurrentPage().getParameters().put('gameName','DLTRS');
        
        
        attentinshareController cntrl = new attentinshareController();
        system.assertEquals('069XXXXXXXX', cntrl.contentDocumentId);
        
    }
}