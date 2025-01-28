/*
@author            : Santhosh Nookilla
@description       : Schedulable Batch Class for Unlocking Surveys
@test class        : BatchSurveyStatusUpdateTest
*/

global class BatchSurveyStatusUpdate implements Database.Batchable<SObject>, Schedulable {

    public String objectName;
    public String fieldName;
    public String conFieldName;
    
    global BatchSurveyStatusUpdate() {
    }

    global BatchSurveyStatusUpdate(String objectName, String fieldName, String conFieldName) {
        this.objectName = objectName;
        this.fieldName = fieldName;
        this.conFieldName = conFieldName;
    }

    global Database.QueryLocator start(Database.BatchableContext bc) {
        String query = 'SELECT Id, ' + fieldName + ' FROM ' + objectName + ' WHERE CreatedDate = N_DAYS_AGO:365';
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
                if (contact.Id.equals(obj.get(fieldName)) && contact.get(conFieldName) != 'Opened') {
                    contact.put(conFieldName, 'Opened');
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
        
        BatchSurveyStatusUpdate surveyHM = new BatchSurveyStatusUpdate('HealthMedical_Survey__c', 'Contact_Name__c', 'HEALTH_MEDICAL__c');
		Database.executeBatch(surveyHM);

		BatchSurveyStatusUpdate surveySES = new BatchSurveyStatusUpdate('SES__c', 'Contact_Name__c', 'SES__c');
		Database.executeBatch(surveySES);
        
        BatchSurveyStatusUpdate surveyWH = new BatchSurveyStatusUpdate('Womens_Health__c', 'Contact_Name__c', 'WOMENS_HEALTH__c');
		Database.executeBatch(surveyWH);
        
        BatchSurveyStatusUpdate surveySE = new BatchSurveyStatusUpdate('Subjective_English_Survey__c', 'Contact_Name__c', 'SUBJECTIVE_ENGLISH__c');
		Database.executeBatch(surveySE);

		BatchSurveyStatusUpdate surveyADL = new BatchSurveyStatusUpdate('ADL_Survey__c', 'Contact_Name__c', 'ADL__c');
		Database.executeBatch(surveyADL);

        BatchSurveyStatusUpdate surveyDIET = new BatchSurveyStatusUpdate('Diet__c', 'Contact_Name__c', 'DIET__c');
		Database.executeBatch(surveyDIET);
        
        BatchSurveyStatusUpdate surveySWLS = new BatchSurveyStatusUpdate('Swls_Survey__c', 'Contact_Name__c', 'SWLS__c');
		Database.executeBatch(surveySWLS);
        
        BatchSurveyStatusUpdate surveyQPAR = new BatchSurveyStatusUpdate('QPAR__c', 'Contact_Name__c', 'QPAR__c');
		Database.executeBatch(surveyQPAR);
        
        BatchSurveyStatusUpdate surveySOCSTR = new BatchSurveyStatusUpdate('Social_Stressor_Survey__c', 'Contact_Name__c', 'SOCIAL_STRESSOR__c');
		Database.executeBatch(surveySOCSTR);
        
        BatchSurveyStatusUpdate surveySOCSUP = new BatchSurveyStatusUpdate('Social_Support_Survey__c', 'Contact_Name__c', 'SOCIAL_SUPPORT__c');
		Database.executeBatch(surveySOCSUP);
        
        BatchSurveyStatusUpdate surveyCANCER = new BatchSurveyStatusUpdate('Cancer__c', 'Contact_Name__c', 'CANCER__c');
		Database.executeBatch(surveyCANCER);
        
        BatchSurveyStatusUpdate surveyCOVID = new BatchSurveyStatusUpdate('COVID_Survey__c', 'Contact__c', 'COVID__c');
		Database.executeBatch(surveyCOVID);
        
        BatchSurveyStatusUpdate surveyBRAIN = new BatchSurveyStatusUpdate('Personal_and_Family_History_of_Brain__c', 'Contact__c', 'BRAIN_DISEASE__c');
		Database.executeBatch(surveyBRAIN);
        
        BatchSurveyStatusUpdate surveyFHAD = new BatchSurveyStatusUpdate('FHAD_Survey__c', 'Contact__c', 'FHAD__c');
		Database.executeBatch(surveyFHAD);
        
        BatchSurveyStatusUpdate surveySLEEP = new BatchSurveyStatusUpdate('Sleep_Survey__c', 'Contact__c', 'SLEEP__c');
		Database.executeBatch(surveySLEEP);
        
        BatchSurveyStatusUpdate surveyPERSTR = new BatchSurveyStatusUpdate('Perceived_Stress_Scale__c', 'Contact__c', 'PERCEIVED_STRESS__c');
		Database.executeBatch(surveyPERSTR);
        
        BatchSurveyStatusUpdate surveyANXIETY = new BatchSurveyStatusUpdate('Anxiety_Survey__c', 'Contact__c', 'ANXIETY__c');
		Database.executeBatch(surveyANXIETY);
		
		BatchSurveyStatusUpdate surveyGLUCOSAMINE = new BatchSurveyStatusUpdate('Glucosamine__c', 'Contact__c', 'GLUCOSAMINE__c');
		Database.executeBatch(surveyGLUCOSAMINE);
		
		BatchSurveyStatusUpdate surveyECOG12 = new BatchSurveyStatusUpdate('ECog_12__c', 'Contact__c', 'ECog_12__c');
		Database.executeBatch(surveyECOG12);

    }
}