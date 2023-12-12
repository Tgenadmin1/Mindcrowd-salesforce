@isTest
public class MindCrowdStudiesTest {

    @isTest  
    public static void updatecon(){
        Studies__c std=new Studies__c();
        std.Name='std4567899876';
        std.Participant_Id__c='prt56783987633';
        insert std;
        Studies__c std1=new Studies__c();
        std1.Name='';
        std1.Participant_Id__c='prt56783984433';
        insert std1;
        Studies__c std2=new Studies__c();
        std2.Name='std45678933376';
        std2.Participant_Id__c='';
        insert std2;
        Studies__c std3=new Studies__c();
        std3.Name='';
        std3.Participant_Id__c='';
        insert std3; 
        Studies__c std4=new Studies__c();
        std4.Name='std4567899876';
        std4.Participant_Id__c='prt56783987633';
         
        
        
        MindCrowdStudies.studies(std);
        MindCrowdStudies.studies(std1);
        MindCrowdStudies.studies(std2);
        MindCrowdStudies.studies(std3);
        MindCrowdStudies.studies(std4);
        MindCrowdStudies.studiesIDSelect();
        MindCrowdStudies.eventIDSelect();
        MindCrowdStudies.eventIDSelect1();
        MindCrowdStudies.eventIDSelect2();
        MindCrowdStudies.eventIDSelect3();
        MindCrowdStudies.eventIDSelect4();
        MindCrowdStudies.eventIDSelect5();
         MindCrowdStudies.studiesUsingText(std);
        MindCrowdStudies.studiesUsingText(std1);
        MindCrowdStudies.studiesUsingText(std2);
        MindCrowdStudies.studiesUsingText(std3);
        MindCrowdStudies.studiesUsingText(std4);
    } 
}