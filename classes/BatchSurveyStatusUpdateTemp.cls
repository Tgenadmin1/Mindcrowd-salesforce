/*
@author            : Santhosh Nookilla
@description       : Schedulable Batch Class for Unlocking Surveys
@test class        : BatchSurveyStatusUpdateTempTest
*/

global class BatchSurveyStatusUpdateTemp implements Database.Batchable<SObject>, Schedulable {

    public String objectName;
    public String fieldName;
    public String conFieldName;

    global BatchSurveyStatusUpdateTemp(String objectName, String fieldName, String conFieldName) {
        this.objectName = objectName;
        this.fieldName = fieldName;
        this.conFieldName = conFieldName;
    }

    global Database.QueryLocator start(Database.BatchableContext bc) {
        String query = 'SELECT Id, ' + fieldName + ' FROM ' + objectName + ' WHERE CreatedDate <= N_DAYS_AGO:365 AND CreatedDate >= N_DAYS_AGO:389';
        return Database.getQueryLocator(query);
    }

    global void execute(Database.BatchableContext bc, List<SObject> scope) {
        Set<Id> recordIds = new Set<Id>();

        for (SObject obj : scope) {
            recordIds.add((Id)obj.get(fieldName));
        }              

        String dynamicQuery = 'SELECT Id, ' + conFieldName + ' FROM Contact WHERE Id IN :recordIds AND isProject2_Participant__c != true';
        List<Contact> contactsToUpdate = Database.query(dynamicQuery); 
        
        for (SObject obj : scope) {
            for (Contact contact : contactsToUpdate) {
                if (contact.Id.equals(obj.get(fieldName)) && contact.get(conFieldName) == 'Opened') {
                    contact.put(conFieldName, 'Completed');
                }
            }
        }

        if (!contactsToUpdate.isEmpty()) {
            update contactsToUpdate;
        }
        
        System.debug('No of Surey Records: '+recordIds.size());
        System.debug('No of contactsToUpdate: '+contactsToUpdate.size());
    }

    global void finish(Database.BatchableContext context) {
    }

    global void execute(SchedulableContext sc) {
        
        BatchSurveyStatusUpdateTemp surveyHM = new BatchSurveyStatusUpdateTemp('HealthMedical_Survey__c', 'Contact_Name__c', 'HEALTH_MEDICAL__c');
		Database.executeBatch(surveyHM);

		BatchSurveyStatusUpdateTemp surveySES = new BatchSurveyStatusUpdateTemp('SES__c', 'Contact_Name__c', 'SES__c');
		Database.executeBatch(surveySES);
        
        BatchSurveyStatusUpdateTemp surveyWH = new BatchSurveyStatusUpdateTemp('Womens_Health__c', 'Contact_Name__c', 'WOMENS_HEALTH__c');
		Database.executeBatch(surveyWH);
        
        BatchSurveyStatusUpdateTemp surveySE = new BatchSurveyStatusUpdateTemp('Subjective_English_Survey__c', 'Contact_Name__c', 'SUBJECTIVE_ENGLISH__c');
		Database.executeBatch(surveySE);

		BatchSurveyStatusUpdateTemp surveyADL = new BatchSurveyStatusUpdateTemp('ADL_Survey__c', 'Contact_Name__c', 'ADL__c');
		Database.executeBatch(surveyADL);

        BatchSurveyStatusUpdateTemp surveyDIET = new BatchSurveyStatusUpdateTemp('Diet__c', 'Contact_Name__c', 'DIET__c');
		Database.executeBatch(surveyDIET);
        
        BatchSurveyStatusUpdateTemp surveySWLS = new BatchSurveyStatusUpdateTemp('Swls_Survey__c', 'Contact_Name__c', 'SWLS__c');
		Database.executeBatch(surveySWLS);
        
        BatchSurveyStatusUpdateTemp surveyQPAR = new BatchSurveyStatusUpdateTemp('QPAR__c', 'Contact_Name__c', 'QPAR__c');
		Database.executeBatch(surveyQPAR);
        
        BatchSurveyStatusUpdateTemp surveySOCSTR = new BatchSurveyStatusUpdateTemp('Social_Stressor_Survey__c', 'Contact_Name__c', 'SOCIAL_STRESSOR__c');
		Database.executeBatch(surveySOCSTR);
        
        BatchSurveyStatusUpdateTemp surveySOCSUP = new BatchSurveyStatusUpdateTemp('Social_Support_Survey__c', 'Contact_Name__c', 'SOCIAL_SUPPORT__c');
		Database.executeBatch(surveySOCSUP);
        
        BatchSurveyStatusUpdateTemp surveyCANCER = new BatchSurveyStatusUpdateTemp('Cancer__c', 'Contact_Name__c', 'CANCER__c');
		Database.executeBatch(surveyCANCER);
        
        BatchSurveyStatusUpdateTemp surveyCOVID = new BatchSurveyStatusUpdateTemp('COVID_Survey__c', 'Contact__c', 'COVID__c');
		Database.executeBatch(surveyCOVID);
        
        BatchSurveyStatusUpdateTemp surveyBRAIN = new BatchSurveyStatusUpdateTemp('Personal_and_Family_History_of_Brain__c', 'Contact__c', 'BRAIN_DISEASE__c');
		Database.executeBatch(surveyBRAIN);
        
        BatchSurveyStatusUpdateTemp surveyFHAD = new BatchSurveyStatusUpdateTemp('FHAD_Survey__c', 'Contact__c', 'FHAD__c');
		Database.executeBatch(surveyFHAD);
        
        BatchSurveyStatusUpdateTemp surveySLEEP = new BatchSurveyStatusUpdateTemp('Sleep_Survey__c', 'Contact__c', 'SLEEP__c');
		Database.executeBatch(surveySLEEP);
        
        BatchSurveyStatusUpdateTemp surveyPERSTR = new BatchSurveyStatusUpdateTemp('Perceived_Stress_Scale__c', 'Contact__c', 'PERCEIVED_STRESS__c');
		Database.executeBatch(surveyPERSTR);
        
        BatchSurveyStatusUpdateTemp surveyANXIETY = new BatchSurveyStatusUpdateTemp('Anxiety_Survey__c', 'Contact__c', 'ANXIETY__c');
		Database.executeBatch(surveyANXIETY);

    }
}